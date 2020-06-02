<template>
  <div class="AddMakeAnAppointment" :style="'min-height: '+minHeight+'px;'">
        <div class="titles">
            <span>{{pagesTitle}}</span>
            <p><el-button type="danger" size="mini" @click="selectCounselor = true">跨店客户</el-button></p>
        </div>
        <div class="box" :style="'min-height: '+boxMaxHeight+'px;'">
            <div class="box_left">
                <h4>本店所有客户列表</h4>
                <div>
                    <auto-search-client @changed="myChanged"></auto-search-client>
                    <el-button type="primary" icon="el-icon-search" @click="customerDataSearch"></el-button>
                </div>
                <ul :style="'height: '+boxHeight+'px;'">
                    <li 
                        :class="{'active' : item.activeStatus == 1}" 
                        v-for="(item , index) in customerDataList" 
                        :key="index"
                        @click="customerPitchOn(index)"
                    >
                        <span>{{item.name}}</span>
                        <a>{{item.mobile}}</a>
                        <em></em>
                    </li>
                </ul>
            </div>
            <div class="box_right">
                <div class="box_titles">
                    <p class="pointer" @click="$router.push({name:'ClientDel',query:{id:customerDataActive.id,types:2}})">{{customerDataActive.name}}</p>
                    <span>{{customerDataActive.mobile}}</span>
                </div>
                <div class="message_box">
                    <div class="message">
                        <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">
                            <el-row :gutter="140">
                                <el-col :span="24">
                                    <el-form-item label="项目"  class="wb60 fl">
                                        <el-select v-model="form.projectOne" placeholder="请选择项目" readonly="" clearable @change="form.projectTow = ''">
                                            <!-- <el-option key label="全部项目" value></el-option> -->
                                            <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                                        :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item  prop="projectTow" v-if="form.projectOne" label-width="0" class="wb38 fr">
                                        <el-select v-model="form.projectTow" placeholder="请选择下级项目" readonly="" clearable>
                                            <el-option v-for="item in $store.getters.projectList2Map(form.projectOne)" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140">
                                <el-col :span="24">
                                    <el-form-item label="到店时间" prop="datetime">
                                        <el-date-picker
                                            v-model="form.datetime"
                                            :clearable="false"
                                            type="datetime"
                                            class="wb100"
                                            format="yyyy-MM-dd HH:mm"
                                            placeholder="选择日期时间"
                                            @change='datetimeChange'>
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140" class="row_box">
                                <el-col :span="24">
                                    <el-form-item :label="$store.getters.roleName.adviser" prop="counselor">
                                        <el-select v-model="form.counselor" :placeholder="`请选择${$store.getters.roleName.adviser}`" readonly="" clearable class="wb100" :disabled="roleChoosable">
                                            <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                                                    :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140" class="row_box">
                                <el-col :span="24">
                                    <el-form-item :label="$store.getters.roleName.technician" prop="technician">
                                        <el-select v-model="form.technician" :placeholder="`请选择${$store.getters.roleName.technician}`" readonly="" clearable class="wb100" @change='technicianChange'>
                                            <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                                                    :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <!-- 选择治疗间 -->
                            <el-row :gutter="140" class="row_box" v-if="form.technician">
                                <el-col :span="24">
                                    <el-form-item label="治疗间">
                                        <el-select v-model="form.roomId" placeholder="请选择治疗间" readonly="" clearable class="wb100">
                                            <!-- <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                                                    :value="item.key"></el-option> -->
                                            <el-option     
                                                v-for="item in roomList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                                v-show="item.status != 2 && item.open != 2">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140" v-if="form.technician">
                                <el-col :span="24">
                                    <el-form-item label="治疗时长" prop="duration">
                                        <el-input type='number' minlength='1' v-model.trim="form.duration" placeholder="请输入治疗时长">
                                            <template slot="append">分钟</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="备注" prop="remark">
                                        <el-input type="textarea" v-model.trim="form.remark" placeholder="请输入备注" clearable rows="8" class="lh40px"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div class="clear4"></div>
                            <div class="btn fr">
                                <template v-if="disabled">
                                    <el-button type="primary" disabled>提交中...</el-button>
                                </template>
                                <template v-else>
                                    <el-button type="primary" @click="handleSubmit">提交预约</el-button>
                                </template>
                            </div>
                        </el-form>
                    </div>
                    <div class="timer">
                        <Schedule :scheduleData='scheduleData' v-show="form.technician && form.datetime"></Schedule>
                    </div>
                </div>
            </div>
        </div>
   

        <el-dialog title="选择客户" :visible.sync="selectCounselor">
            <div class="select_counselor_search">

                <auto-search-client-stride @changed="myChanged2" class="wb100 mar10"></auto-search-client-stride>

                <!-- <el-button type="primary" icon="el-icon-search" @click="selectCounselorDataSearch"></el-button> -->
            </div>
            <ul v-if="selectCounselorList != ''">
                <li v-for="(item , index) in  selectCounselorList" :key="index" @click="selectCounselorListFn(index)">
                    <div class="name">
                        <p>{{item.name}}</p>
                        <i v-if="item.sex.value == 0" class="iconfont iconnv"></i>
                        <i v-else class="iconfont iconnan"></i>
                    </div>
                    <div class="text">
                        <p>门店：{{item.store.name}}</p>
                        <p>电话：{{item.mobile}}</p>
                        <p>{{$store.getters.roleName.adviser}}：{{item.adviser.name}}</p>
                    </div>
                    <b v-if="selectCounselorIndex == index"><img src="@/shop/assets/img/pitch_on.png" alt=""></b>
                    <b v-else><img src="@/shop/assets/img/unselected.png" alt=""></b>
                </li>
            </ul>

            <div slot="footer" class="dialog-footer">
                <el-button @click="selectCounselor = false">取 消</el-button>
                <el-button type="primary" @click="selectCounselorAffirmFn">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script>

import Schedule from '@/shop/components/home/Schedule'
import { customerList , appointmentOccupy , appointmentPostAdd , getListByKeyword } from "@/shop/assets/api/flow/makeAnAppointmentList"
import autoSearchClient from '@/shop/components/autocomplete/autoSearchClient'
import autoSearchClientStride from '@/shop/components/autocomplete/autoSearchClientStride'

import { getProject } from "@/shop/assets/api/common/common"

// 治疗间接口
import {CureRoomeList} from '@/shop/assets/api/cureRoom/cureRoom';
  
export default {
  name: "AddMakeAnAppointment",
  data() {
    return {
        roleChoosable:false,
        pagesTitle:'新增预约',
        minHeight:0,
        boxMaxHeight:0,
        boxHeight:0,
        user_name: '',
        search:'',
        customerDataList:'',
        customerDataListTow:'',
        customerDataActive:'',
        form:{
            projectOne:'',
            projectTow:'',
            datetime:'',
            counselor:'',
            technician:'',
            duration:'',
            roomId:'',
            remark:'',
            continue:0
        },
        rules:{
            datetime: [{ required: true, message: '请选择到店时间', trigger: 'change' }],
            projectTow: [{ required: true, message: '请选择完整项目', trigger: 'change' }],
            counselor: [{ required: true, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: 'change' }],
            duration: [{ required: true, message: '请输入治疗时长', trigger: 'blur' }],
            remark: [{ required: false, message: '请输入备注', trigger: 'blur' }],
        },
        selectCounselor:false,
        disabled:false,
        selectCounselorList:[],
        selectCounselorListTow:'',
        selectCounselorName: '',
        selectCounselorIndex:-1,
        scheduleData:[],
        roomList:[]
    };
  },
//   watch: {
//       'selectCounselor'(newData,oldData){
//           if (newData) {
//               this.getListByKeyword()
//           }
//       }
//   },
  components: {Schedule,autoSearchClient,autoSearchClientStride},
  methods: {
      // 选择治疗间
        CureRoomeList() {
            CureRoomeList().then(res => {
                if (res.status == 0) {
                    this.roomList = res.data;
                }
            });
        },

      myChanged(data){
          this.user_name = data.kw

          this.customerDataList = data.list
          this.customerDataList.map((item, index) => {
              item.activeStatus = 0
          })
      },

      myChanged2(data){
          this.selectCounselorName = data.kw
          console.log(data);
          this.selectCounselorList = data.list
          // console.log(data)
      },
    
    //美容师占用时间条
    articleTime(){
        let postData = {}
        if(this.form.datetime.indexOf(' ') == -1 ){
            postData = {
                technicianId : this.form.technician,
                appointmentTime : this.form.datetime,
            }
        }
        else{
            postData = {
                technicianId : this.form.technician,
                appointmentTime : this.form.datetime.split(' ')[0],
            }
        }

        appointmentOccupy(postData).then(res => {
            if(res.status == 0){
                this.scheduleData = res.data;
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
            }
        }).catch(error=>{
            this.$message({
                showClose: true,
                message: error,
                type: 'error',
            });
        })
    },

    //美容师切换
    technicianChange(value){
        this.form.technician = value;
        if(this.form.technician != undefined && this.form.datetime != null)
        {
            if(this.form.technician != '')this.articleTime()
        }
    },

    //到店时间
    datetimeChange(value){
        if(value != null)
        {
            let tmp = this.$base.dateTimeToDate(value,'date');
            this.form.datetime = tmp;
            if(this.form.technician != undefined)
            {
                if(this.form.technician != '')this.articleTime()
                
            }
        }
    },

    //新增提交
    handleSubmit() {
        if( this.form.duration != '' && this.form.duration <= 0){
            this.$message({
                showClose: true,
                message: '治疗时间不能小于1',
                type: 'warning',
            });
            return;
        }
        if(this.customerDataActive == ''){
            this.$message({
                showClose: true,
                message: "请选择客户",
                type: 'error',
            });
        }
        else{
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if(this.form.technician == '')this.form.duration = '';
                    let postData = {
                        customerId : this.customerDataActive.id,
                        itemPid : this.form.projectOne,
                        itemId : this.form.projectTow,
                        appointmentTime : this.form.datetime,
                        content : this.form.remark,
                        adviserId : this.form.counselor,
                        technicianId : this.form.technician,
                        yuyueOrderTime : this.form.duration,
                        roomId : this.form.roomId,
                        continue: this.form.continue
                    }
                    this.disabled = true
                    appointmentPostAdd(postData).then(res => {
                        if(res.status == 0){
                            this.$message({
                                showClose: true,
                                message: '新增成功',
                                type: 'success',
                                onClose:()=>{
                                    this.$router.push({  
                                        path: 'MakeAnAppointmentList',   
                                    })
                                    this.disabled = false
                                }
                            });
                        }
                        else if(res.status == 40091){
                            this.$confirm("该客户今天已经预约，确认需要再次预约？", '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.form.continue = 1
                                this.handleSubmit()
                                this.disabled = false
                            }).catch(() => {
                                this.disabled = false
                            });
                        }
                        else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                            this.disabled = false
                        }
                    }).catch((e)=>{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                        this.disabled = false
                    })
                } 
            })
        }
    },
    
    //确认选择跨店客户
    selectCounselorAffirmFn(){
        if(this.selectCounselorIndex == -1){
            this.$message({
                showClose: true,
                message: "请选择客户",
                type: 'error',
            });
        } 
        else{
            let customerId = this.selectCounselorList[this.selectCounselorIndex].id
     
            this.$router.push({  
                path: 'MakeAnAppointmentEid',   
                query: {  
                    customerId: customerId
                }
            })
        }
    },
    //选择跨店客户
    selectCounselorListFn(index){
        this.selectCounselorIndex = index
    },
    //搜索跨店客户
    selectCounselorDataSearch(){
        this.selectCounselorIndex = -1;
        if(this.selectCounselorName == '')
        {
            this.selectCounselorList = ''
        }
        else
        {

            console.log(this.selectCounselorListTow)

            let _tmp = this.selectCounselorListTow.filter(data =>{
                if(!this.$base.isNull(data.name)){
                    return data.name.toLowerCase().includes(this.selectCounselorName.toLowerCase())
                }
            })

            let _tmp2 = this.selectCounselorListTow.filter(data =>{
                if(!this.$base.isNull(data.mobile)){
                    return data.mobile.toLowerCase().includes(this.selectCounselorName.toLowerCase())
                }
            })

            console.log(_tmp, _tmp2)

            this.selectCounselorList =  _tmp.length ? _tmp : _tmp2
        }
    },

    //搜索客户
    customerDataSearch(){
        this.customerDataActive = '';
        // this.customerDataListTow.map((item,index) => {
        //     item.activeStatus = 0;
        // })
        // if(this.user_name == '')
        // {
        //     this.customerDataList = this.customerDataListTow
        // }
        // else
        // {
        //     this.customerDataList = this.customerDataListTow.filter(data => data.name.toLowerCase().includes(this.user_name.toLowerCase()))
        // }
    },
    //选择客户
    customerPitchOn(customerDataListIndex){
        this.customerDataList.map((item,index) => {
            if(customerDataListIndex == index)
            {
                item.activeStatus = 1;  
                this.customerDataActive = item;         
            }
            else
            {
                item.activeStatus = 0;             
            }
        })
        
    },

    //获取客户列表
    getCustomerList(){
        let postData = {
            kw:this.user_name,
            start:1,
            perpage:50
        }
        customerList(postData).then(res => {
            if(res.status == 0) {
                this.customerDataList = res.data.list
                this.customerDataList.map((item, index) => {
                    item.activeStatus = 0
                })
                this.customerDataListTow = JSON.parse(JSON.stringify(this.customerDataList))

            }
        }).catch(error=>{
            console.log("customerList no");
        })
    },

    //跨店客户列表
    getListByKeyword(){
        let postData = {
            crossStore:1,
            perpage: 99999
        }
        getListByKeyword(postData).then(res => {
            if(res.status ==0){
                this.selectCounselorListTow = res.data.list
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
            }
        }).catch(error=>{
            this.$message({
                showClose: true,
                message: error,
                type: 'error',
            });
        })
    },
   
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
      
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight - 124;
    this.boxMaxHeight = window.innerHeight - 280;
    this.boxHeight = window.innerHeight - 340;

    this.getCustomerList()

    this.getListByKeyword()
    this.CureRoomeList()
    let usersId = JSON.parse(localStorage.getItem('CURRENT_USER'))
    if(usersId.role_id == 3){
      this.roleChoosable = true;
      this.form.counselor = usersId.users_id
    }else{
      this.roleChoosable = false;
    }

    // 项目
    getProject({ start: 1, perpage: 999, itemsParmentId: 0 }).then(res => {
        if(res.status == 0){
        let _tmp = res.data.list
        let _tmp2 = JSON.parse(JSON.stringify(res.data.list))
        this.$store.commit('SET_PROJECTLIST1', res.data.list)

        for(let i=0; i<_tmp.length; i++){
            _tmp[i].children = []
            _tmp2[i].children = []
        }

        getProject({ start: 1, perpage: 9999,status:-1}).then(res2 => {
            if(res2.status == 0){
            let __tmp = res2.data.list
            for(let i=0; i<__tmp.length; i++){
                for(let j=0; j<_tmp.length; j++){
                if(__tmp[i].p_id == _tmp[j].id){
                    _tmp[j].children.push(__tmp[i])
                    if(__tmp[i].status.value == 1){
                    _tmp2[j].children.push(__tmp[i])
                    }
                }
                }
            }
            // 2019-11-15 15点15分 陈军修改
            this.$store.commit('SET_PROJECTALLLIST', _tmp)
            this.$store.commit('SET_PROJECTLIST', _tmp2)
            }
        })

        }else{
        this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
        });
        this.$store.commit('SET_PROJECTLIST', [])
        this.$store.commit('SET_PROJECTLIST1', [])
        }
    }).catch(error=>{
        this.$message({
        showClose: true,
        message: error,
        type: 'error',
        });
        this.$store.commit('SET_PROJECTLIST', [])
        this.$store.commit('SET_PROJECTLIST1', [])
    })



  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.AddMakeAnAppointment{
    margin: 20px;
    padding: 0 20px;
    background: #fff;
    .titles{
        border-bottom: 1px solid #E5E5E5;
        height: 50px;
        display: flex;
        align-items: center;
        span{
            flex: 1;
            font-size: 16px;
            color: #333;
        }
    }
    .box{
        display: flex;
        .box_left{
            border-right: 1px solid #E5E5E5;
            overflow-y: auto;
            width: 2.4rem;
            h4{
                font-size: 16px;
                color: #333;
                font-weight: normal;
                padding: .2rem 0 .16rem;
                border-bottom: 1px solid #E5E5E5;
            }
            div{
                display: flex;
                height: 80px;
                align-items: center;
                .el-button{
                    margin:0 .1rem;
                }
            }
            ul{
                margin-top: -.1rem;
                overflow-y: auto;
                li{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    font-size: 14px;
                    color: #666;
                    cursor: pointer;
                    span{
                        width: .8rem;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        padding-right: .1rem;
                    }
                    a{
                        flex: 1;
                    }
                }
                .active{
                    color: #0DC9E5;
                    em{
                        width: 2px;
                        height: 14px;
                        background: #0DC9E5;
                    }
                }
            }
        }
        .box_right{
            flex: 1;
            .box_titles{
                display: flex;
                padding-left: 1.9rem;
                height: 70px;
                background: #F0FDFF;
                align-items: center;
                p,span{
                    font-size: 22px;
                    color: #0DC9E5;
                }
                span{
                    padding-left: .4rem;
                }
            }
            .message_box{
                width: 80%;
                margin: .4rem auto 0;
                display: flex;
                .message{
                    width: 4.5rem;
                    .el-row{
                        margin-bottom: .1rem;
                    }
                }
                .timer{
                    flex: 1;
                    margin-left: 1rem;
                    display: flex;
                    height: 460px;
                }
            }
        }
    }
   
}
</style>
<style>
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog{
    width: 8.2rem;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body{
    padding: 0 20px;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body .select_counselor_search{
    display: flex;
    align-items: center;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body .select_counselor_search div{
    width: 100%;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul{
    max-height: 328px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul li{
    background: #F8F8F8;
    position: relative;
    width: 49%;
    height: 148px;
    margin-top: .16rem;
    border-radius:5px;
    cursor: pointer;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul li .name{
    display: flex;
    padding: .16rem .2rem .1rem;
    align-items: center;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul li .name p{
    font-size: 20px;
    color: #333;
    padding-right: .1rem;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul li .name i.iconnv{
    color: #EC414D;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul li .name i.iconnv{
    color: #EC414D;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul li .name i.iconnan{
    color: #2878ff;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul li .text{
    padding: 0 .2rem;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul li .text p{
    line-height: 28px;
    font-size: 14px;
    color: #666;
}
.AddMakeAnAppointment .el-dialog__wrapper .el-dialog .el-dialog__body ul li b{
    position: absolute;
    right: 0;
    top: 0;
}
.AddMakeAnAppointment input[type='number']{
    padding-right: 0 !important;
}
</style>



    
