<template>
  <div class="ScratchOperation">
    <div class="header">
      <div class="name pointer" @click="$router.push({name:'ClientDel',query:{id:userData.id,types:4}})">
        {{userData.name}}
        <span v-if="userData.sex.value == 0" class="iconfont iconnv"></span>
        <span v-else class="iconfont iconnan"></span>
      </div>
      <div class="mobile">
        电话：{{userData.mobile}}
        <span>门店： {{userData.store.name}}</span>
      </div>
    </div>

    <div class="box">
     
      <el-table slot="list" :data="demoList" border>

        <el-table-column prop="time" align="center" label="开单日期">
          <template slot-scope="scope">
            {{ scope.row.time | _endTimeFormat}}
          </template>
        </el-table-column>
        
        <el-table-column prop="store" align="center" label="项目所属">
          <template slot-scope="scope">
            {{ scope.row.store.name }}
          </template>
        </el-table-column>
        <el-table-column prop="items_name" align="center" label="项目名称">
          <template slot-scope="scope">
            {{ scope.row.items_name }}
          </template>
        </el-table-column>
        <el-table-column prop="code" align="center" label="消费单号">
          <template slot-scope="scope">
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column prop="number" align="center" label="总数量">
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column prop="yijing" align="center" label="已划扣数量">
          <template slot-scope="scope">
            {{ scope.row.yijing }}
          </template>
        </el-table-column>
        <el-table-column prop="shengyu" align="center" label="剩余数量">
          <template slot-scope="scope">
            {{ scope.row.shengyu }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.operationNum" :step="1" :max="scope.row.shengyu" :min="0" @change="inputNumberChage(scope.$index)"></el-input-number>
          </template>
        </el-table-column>

      </el-table>
      <div class="buttom">
        <el-button type="primary" @click="dialogTableVisiblePopFn">开单</el-button>
      </div>
    </div>

    <el-dialog title="开单信息" :visible.sync="dialogTableVisible">
      <div class="project_name">
        <span>项目名称</span>
        <ul>
          <li v-for="(item , index) in  demoList" :key="index" v-if="item.operationNum > 0">
            <p>{{item.items_name}}</p>
            <i>x{{item.operationNum}}</i>
          </li>
        </ul>
      </div>

      <el-form :inline="false" ref="form" :model="form" :rules="rules" class="add-form" label-width="110px">
        <div class="technician_select">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item prop="technician" :label="$store.getters.roleName.technician">
                    <el-select :disabled="cosmetologistDataShow" v-model="form.technician" :placeholder="`请选择${$store.getters.roleName.technician}`" readonly="" clearable class="wb100">
                        <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                                :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item prop="therapy" label="治疗间">
                    <el-select v-model="form.therapy" placeholder="请选择治疗间" readonly="" clearable class="wb100" popper-class="room_list">
                        <el-option v-for="(item,index) in therapyList" :key="index" :label="item.name"
                          :value="item.id"  v-show="item.status != 2 && item.open != 2">
                          <!-- :disabled="item.status == 2 && item.open == 1 || item.open == 2" -->
                            <div :class="{'room_list_type':true,'active': item.status == 2}">
                              <a>{{item.name}}</a>
                              <p>
                                <span v-if="item.status == 2 && item.open == 1 ">使用中 <i v-if="item.dis != ''">（剩余{{item.dis}}分钟）</i></span>
                                <b v-else>空闲</b>
                              </p>
                            </div>
                          </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item prop="dateTimer" label="预计治疗时长">
                    <el-input type='number' min='1' v-model="form.dateTimer" placeholder="预计治疗时长" class="therapy_date wb100">
                      <template slot="append">分钟</template>
                    </el-input>
                </el-form-item>
              </el-col>
            </el-row>
        </div>

        <div class="btns">
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <template v-if="disabled">
            <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="billingPop">确定</el-button>
          </template>
        </div>
      </el-form>
    </el-dialog>



    <!-- 有预约信息 -->
    
    <el-dialog title="提示" :visible.sync="isTips" width="21%">
      <!-- <span> </span> -->
      <div class="tips_content">
        <div class='text'>{{'当前客户预约房间“'+ cureRoomInFo.roomName +'”处于使用状态您可以选择更换治疗间或暂缓本次划扣'}}</div>
      </div>
      <div class="tipsButtom">
        <el-button type="danger" @click="$router.go(-1)">暂缓划扣</el-button>
        <el-button type="primary" @click="replace">更换治疗间</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAvailableItemList , getTherapeuticRoomAllList , postSave,AppCureRoom,closeApp } from "@/shop/assets/api/deduction/deduction";
export default {
  name: "ScratchOperation",
  data() {
    return {
      cosmetologistDataShow:false,
      userData:{
        sex:{},
        store:{}
      },
      counselor:{
        counselor:"",
      },
      condition: {
        customer_id: this.$route.query.id,
        status:0,
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getAvailableItemList,       // 分页查询api接口
      dialogTableVisible:false,
      isTips:false,
      disabled:false,
      form:{
        technician:"",
        room:"",
        dateTimer:'',
        therapy:'',
        // 预约id
        reserveId:''
      },
      popIndex:-1,
      rules: {
        dateTimer: [{required: false, message: '请输入治疗时长', trigger: 'blur'}],
        technician: [{required: true, message: `请选择${this.$store.getters.roleName.technician}`, trigger: 'change'}],
        therapy: [{required: false, message: '请选择治疗间', trigger: 'change'}],
      },
      therapyList:"",
      cureRoomInFo:{},
      isAppCancel:false
    };
  },
  components: {},
  methods: {
    // 从新选择治疗间
    replace() {
      this.isTips = false;
      this.dialogTableVisible = true;
      this.isAppCancel = true;
    },
      //划扣弹窗
    dialogTableVisiblePopFn(){
      let num = 0;
      this.demoList.map((item , index) => {
        if(item.operationNum > 0){
          num++
        }
      });
      if(num <= 0){
        this.$message({
          showClose: true,
          message: "请选择划扣项目",
          type: 'error',
        });
      }else{
        this.getAppCureRoom();
      }
    },

    // 治疗间预约信息
    getAppCureRoom() {
      AppCureRoom({customerId:this.$route.query.id}).then( res => {
        if (res.status == 0) {
          if (!res.data.length) {
            this.form.therapy = res.data.room_id;
            this.form.dateTimer = res.data.reserve_num;
          }
          this.dialogTableVisible = true;
        }else {
          if (!res.data.length) {
            this.form.reserveId = res.data.id;
          }
          this.cureRoomInFo = res.data;
          this.isTips = true;
        }
      }).catch(error => {
        console.log('AppCureRoom------no');
      });
    },
    //数量更改
    inputNumberChage(index){
      let shengyu = this.demoList[index].shengyu;
      let caozuo = this.demoList[index].operationNum;
      if(caozuo > shengyu)
      {
        this.$message({
            showClose: true,
            message: '操作数量不能大于剩余数量',
            type: 'warning',
        });
      }

    },
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //列表外赋值
    getLoaded(data){
      this.userData = data.customer
    },
    //划扣弹窗确定
    billingPop(){
      if(this.form.dateTimer != '' && this.form.dateTimer <= 0){
        this.$message({
            showClose: true,
            message: '治疗时间不能小于1',
            type: 'warning',
        });
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
            this.postSaveFn()
        } 
      })
          
    },
    //划扣开单
    postSaveFn(){
      if (this.isAppCancel) {
        closeApp({id:this.cureRoomInFo.id}).then(res => {
          if (res.status == 0) {
            console.log('取消成功');
          }
        }).catch(error=>{
          console.log('closeApp-------------------no');
        })
      }
      let postData = {
        customerId:this.$route.query.id,
        status:1,
        technicianId:this.form.technician,
        roomId:this.form.therapy,
        roomUseTime:this.form.dateTimer,
        data:[]
      }
      if (this.form.reserveId) {
        postData.reserveId = this.form.reserveId;
      }
      this.demoList.map((item , index) => {
        if(item.operationNum > 0){
          postData.data.push({
            num:item.operationNum,
            receipt_id:item.id
          })
        }
      })

      postData.data = JSON.stringify(postData.data)

      this.disabled = true

      postSave(postData).then(res => {
        if(res.status == 0){
            this.$message({
                showClose: true,
                message: '划扣成功',
                type: 'success',
                onClose:()=>{
                  window.history.back()
                  this.disabled = false
                }
            });
        }else{
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
    },
    //治疗间列表
    getTherapyListFn(){
      getTherapeuticRoomAllList({}).then(res => {
        if(res.status == 0) {
          this.therapyList = res.data
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
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.getTherapyListFn()
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {

    if(this.$store.getters.currentUser.role_id == 4){
      this.cosmetologistDataShow = true
      this.form.technician = this.$store.getters.currentUser.users_id 
    }

    getAvailableItemList(this.condition).then(res=>{
      if(res.status == 0){
        this.userData = res.data.customer;
        let arr = []
        res.data.list.map((item , index) => {
          item.operationNum = 0;
          if(item.shengyu > 0){
            arr.push(item)
          }
        })
   

        this.demoList = arr
      }
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
.ScratchOperation {
  margin: 24px 20px;
  .header {
    height: 80px;
    background-color: #ffffff;
    padding: 25px;
    display: flex;
    flex-direction: column;
    .name {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      position: relative;
      display: block !important;
      width: 100%;
      span {
        position: absolute;
        top: 15%;
      }
      .iconnan {
        color: #2878ff;
      }
      .iconnv {
        color: #ec414d;
      }
    }
    .mobile {
      display: block !important;
      width: 100%;
      margin-top: 24px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      span {
        margin-left: 71px;
      }
    }
  }
  .box {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    .buttom {
      text-align: right;
      margin-top: .7rem;
    }
  }
}
</style>

<style>
.ScratchOperation .el-dialog__wrapper .el-dialog{
  width: 525px;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__header{
  padding: 20px;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body{
  padding:0 20px;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body .project_name{
  border-top: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
  padding: .2rem 0;
  display: flex;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body .project_name span{
  color: #666666;
  flex: 1;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body .project_name ul li:last-of-type{
  padding: 0;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body .project_name ul li{
  display: flex;
  padding-bottom: .14rem;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body .project_name ul li p{
  color: #333;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body .project_name ul li i{
  color: #333;
  font-style: normal;
  padding-left: .3rem;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body .technician_select{
  padding-top: .3rem;
}
.room_list .room_list_type{
  display: flex;
}
.room_list .selected .room_list_type{
  font-weight: normal;
}
.room_list .selected .room_list_type a{
  color: #0DC9E5;
}
.room_list .room_list_type a{
  width: 1.2rem;
  padding-right: .1rem;
  color: #333;
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  white-space: nowrap;/*强制不换行*/
  overflow: hidden;
}
.room_list .room_list_type p{
  width: 1.2rem;
  padding-right: .1rem;
  color: #333;
}
.room_list .room_list_type p b{
  color: #0DC9E5;
  font-weight: normal;
}
.room_list .room_list_type p span{
  color: #FF5722;
}
.room_list .room_list_type p span i{
  color: #666;
  font-style: normal;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body .btns{
  display: flex;
  justify-content: flex-end;
  padding-bottom: .2rem;
}
.ScratchOperation .el-dialog__wrapper .el-dialog .el-dialog__body .therapy_date input{
  padding-right: 0;
}

.tips_content {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}

.tips_content>.text {
  font-size:.16rem;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:30px;
  text-align: center;
}

.tipsButtom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px .3rem;
}
</style>


    
