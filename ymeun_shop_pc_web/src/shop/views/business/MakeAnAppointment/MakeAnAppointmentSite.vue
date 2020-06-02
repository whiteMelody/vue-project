<template>
  <div class="MakeAnAppointmentSite" :style="'min-height: '+minHeight+'px;'">
        <div class="titles">
            <span>{{pagesTitle}}</span>
        </div>
        <div class="box" :style="'min-height: '+boxMaxHeight+'px;'">
         
            <div class="box_right">
                
                <div class="message_box">
                    <div class="message">
                        <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="100px">
                            <el-row :gutter="140">
                                <el-col :span="24">
                                    <el-form-item label="客户电话" prop="tel">
                                        <el-input type="text" v-model.trim="form.tel" maxlength="11" placeholder="请输入客户电话"  @input="telChange"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140" v-if="nameShow">
                                <el-col :span="24">
                                    <el-form-item label="客户姓名" prop="name">
                                        <el-input type="text" v-model.trim="form.name" placeholder="请输入客户姓名" ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            
                            <el-row :gutter="140" v-if="nameShow">
                                <el-col :span="24">
                                    <el-form-item label="客户性别" prop="sexRadio">
                                        <template v-for="[key, val] in _dictGender">
                                            <el-radio v-model.trim="form.sexRadio" :label="key">{{val}}</el-radio>
                                        </template>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row :gutter="140" v-if="clientExist">
                                <el-col :span="24">
                                    <el-form-item  prop="channelOne" label="来源渠道"  class="wb60 fl">
                                        <el-select v-model="form.channelOne" placeholder="请选择渠道" readonly clearable @change="form.channelTow = ''">
                                            <el-option v-for="item in $store.getters.channelList1Map" :key="item.key" :label="item.value"
                                                        :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item  prop="channelTow" v-if="form.channelOne" label-width="0" class="wb38 fr">
                                        <el-select v-model="form.channelTow" placeholder="选择下级项目类别" readonly clearable>
                                            <el-option v-for="item in $store.getters.channelList2Map(form.channelOne)" :key="item.key" :label="item.value"
                                                        :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row :gutter="140">
                                <el-col :span="24">
                                    <el-form-item label="项目"  class="wb56 fl">
                                        <el-select v-model="form.projectOne" placeholder="请选择项目" readonly="" clearable @change="form.projectTow = ''">
                                            <!-- <el-option key label="全部项目" value></el-option> -->
                                            <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                                        :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item  prop="projectTow" v-if="form.projectOne" label-width="0" class="wb35 fr">
                                        <el-select v-model="form.projectTow" placeholder="请选择下级项目" readonly="" clearable>
                                            <el-option v-for="item in $store.getters.projectList2Map(form.projectOne)" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140" class="row_box">
                                <el-col :span="24">
                                    <el-form-item :label="$store.getters.roleName.adviser" prop="counselor">
                                        <el-select v-model="form.counselor" :placeholder="'请选择'+$store.getters.roleName.adviser" readonly="" clearable class="wb100" :disabled="roleChoosable">
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
                            <el-row :gutter="140" v-if="form.technician">
                                <el-col :span="24">
                                    <el-form-item label="治疗时长" prop="duration">
                                        <el-input type='number' min='1' v-model.trim="form.duration" placeholder="请输入治疗时长">
                                            <template slot="append">分钟</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <!-- <el-row :gutter="140">
                                <el-col :span="24">
                                    <el-form-item label="预约类型" prop="duration">
                                        <el-input type="text" v-model.trim="form.duration" placeholder="请输入治疗时长" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row> -->
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
                    <div class="timer"><Schedule :scheduleData='scheduleData' v-show="form.technician"></Schedule></div>

                </div>
            </div>
        </div>


  </div>
</template>
<script>

import { PUBLIC_PHONE } from "@/shop/utils/Reg";
import Schedule from '@/shop/components/home/Schedule'
import { appointmentOccupy , getListByKeyword , triageScene } from "@/shop/assets/api/flow/makeAnAppointmentList"
export default {
  name: "MakeAnAppointmentSite",
  data() {
    return {
        roleChoosable:false,
        disabled:false,
        pagesTitle:'现场分诊',
        minHeight:0,
        boxMaxHeight:0,
        clientExist:false,
        nameShow:false,
        restaurants: [],
        form:{
            tel:'',
            name:'',
            sexRadio:"0",
            channelOne:'',
            channelTow:'',
            projectOne:'',
            projectTow:'',
            counselor:'',
            technician:'',
            duration:'',
            remark:'',
            continue:0
        },
        rules:{
            tel: [{ required: true, validator: PUBLIC_PHONE,  message: '请输入正确的电话号码', trigger: 'blur' },],
            name: [{ required: true, message: '请输入客户姓名', trigger: 'change' }],
            sexRadio: [{ required: true, message: '请选择性别', trigger: 'change' }],
            channelOne: [{ required: true, message: '请选择渠道', trigger: 'change' }],
            channelTow: [{ required: true, message: '请选择完整渠道', trigger: 'change' }],
            projectTow: [{ required: true, message: '请选择完整项目', trigger: 'change' }],
            counselor: [{ required: true, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: 'change' }],
            duration: [{ required: true, message: '请输入治疗时长', trigger: 'blur' }],
            remark: [{ required: false, message: '请输入备注', trigger: 'blur' }],
        },
        scheduleData:[],
        selectCounselor:false,
        selectCounselorSearch:'',
        selectCounselorIndex:null,
    };
  },
  components: {Schedule},
  methods: {

    //查询电话
    telChange(){
        // console.log(123132);

        if(this.form.tel.length == 11)
        {
            let postData = postData = {
                keyword:this.form.tel,
                crossStore: 1,
            }
            getListByKeyword(postData).then(res => {
                if(res.status == 0 && res.data.list.length > 0) {
                    this.form.name = res.data.list[0].name
                    this.form.tel = res.data.list[0].mobile
                    this.form.sexRadio = res.data.list[0].sex.value+""
                    this.clientExist = false
                }else{
                    this.clientExist = true
                }
                this.nameShow = true
            }).catch(error=>{
                console.log('getListByKeyword no');
                this.clientExist = true ;
                this.nameShow = true

            })
        }
        else
        {
            this.form.name = ""
        }
    },  
      //美容师占用时间条
    articleTime(){
        let postData = postData = {
            technicianId : this.form.technician,
            appointmentTime : this.$base.getDateScope(1).startTime.split(' ')[0],
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
        if(this.form.technician != undefined)
        {
            if(this.form.technician != '')this.articleTime()
        }
    },

    handleSubmit(){
        if( this.form.duration != '' && this.form.duration <= 0){
            this.$message({
                showClose: true,
                message: '治疗时间不能小于1',
                type: 'warning',
            });
            return;
        }
        this.$refs.form.validate((valid) => {
            if (valid) {
                if(this.form.technician == '')this.form.duration = '';
                
                let postData = {
                    mobile:this.form.tel,
                    name:this.form.name,
                    sex:this.form.sexRadio,
                    channelPid:this.form.channelOne,
                    channelId:this.form.channelTow,
                    itemPid:this.form.projectOne,
                    itemId:this.form.projectTow,
                    adviserId:this.form.counselor,
                    technicianId:this.form.technician,
                    yuyueOrderTime:this.form.duration,
                    content:this.form.remark,
                    continue: this.form.continue
                }
                this.disabled = true
                triageScene(postData).then(res => {
                    if(res.status == 0){
                        this.$message({
                            showClose: true,
                            message: '成功预约',
                            type: 'success',
                            onClose:()=>{
                                this.$router.go(-1)
                                // window.history.back()
                                this.disabled = false
                            }
                        });
                    }
                    else if(res.status == 40091){
                        this.$confirm("该客户今天已经分诊，确认需要再次分诊？", '提示', {
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
                }).catch(error=>{
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error',
                    });
                    this.disabled = false
                })
            } 
        })
    }
        
  },

  // 创建前状态
  beforeCreate() {}, 

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight - 124;
    this.boxMaxHeight = window.innerHeight - 280;
    let usersId = JSON.parse(localStorage.getItem('CURRENT_USER'))
    if(usersId.role_id == 3){
      this.roleChoosable = true;
        this.form.counselor = usersId.users_id
    }else{
      this.roleChoosable = false;
    }
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
.MakeAnAppointmentSite{
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
        .box_right{
            width: 60%;
            margin: 0 auto;
            .message_box{
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
.MakeAnAppointmentSite input[type='number']{
    padding-right: 0 !important;
}
</style>