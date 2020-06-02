<template>
  <div class="MakeAnAppointmentList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>预约列表</header>
    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-form-item>
                    <auto-search-client @changed="myChanged"></auto-search-client>
                </el-form-item>
         
                <el-form-item class="w240px">
                  <el-date-picker
                    class="wb100"
                    v-model="daterangeTimer"
                    :clearable="false"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="condition.adviser_id" :placeholder="'选择'+$store.getters.roleName.adviser" readonly="" clearable :disabled="roleChoosable">
                    <el-option :key="''" :label="'全部'+$store.getters.roleName.adviser" :value="''"></el-option>
                      <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="condition.technician_id" :placeholder="'选择'+$store.getters.roleName.technician" readonly="" clearable :disabled="roleChoosable">
                    <el-option :key="''" :label="'全部'+$store.getters.roleName.technician" :value="''"></el-option>
                      <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item >
                  <el-select v-model="condition.channel_pid" placeholder="选择渠道" readonly="" clearable @change="condition.channel_id = ''">
                    <el-option :key="''" label="全部渠道" :value="''"></el-option>
                      <el-option v-for="item in $store.getters.channelList1Map" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="condition.channel_pid && condition.channel_pid !='0'">
                  <el-select v-model="condition.channel_id" placeholder="选择下级项目类别" readonly clearable v-if="condition.channel_pid">
                      <el-option v-for="item in $store.getters.channelList2Map(condition.channel_pid)" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                </el-form-item>

                 <el-form-item>
                  <el-button type="primary" @click="loadData" icon="el-icon-search" class="h32px"></el-button>
                 </el-form-item>
                 <el-form-item>
                  <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
                 </el-form-item>
          </el-form>

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="id" align="center" label="序号" width="50">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            
            <el-table-column prop="status" align="center" label="状态" width="100">
              <template slot-scope="scope">
                <div class="list_status">
                    <span class="zhifu" v-if="scope.row.status == 1">已到店</span>
                    <span class="weizhifu" v-else-if="scope.row.status == 0">未到店</span>
                    <span class="quxiao" v-else-if="scope.row.status == 3">已过期</span>
                    <span class="quxiao" v-else>已取消</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="渠道">
              <template slot-scope="scope">
                {{ scope.row.channelName }}
              </template>
            </el-table-column>
<!--            <el-table-column prop="mobile" align="center" label="跨店预约">-->
<!--              <template slot-scope="scope">-->
<!--                {{ scope.row.across_store }}-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column prop="mobile" align="center" label="预约日期">
              <template slot-scope="scope">
                {{ scope.row.appointment_time | _endTimeFormat}}
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="预约项目">
              <template slot-scope="scope">
                {{ scope.row.item_p != '' ?scope.row.item_p+'-'+scope.row.item : ''}}
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="客户姓名">
              <template slot-scope="scope">
                <el-link 
                    :underline="false" 
                    @click="$router.push({
                      name: 'ClientDel',
                      query:{ 
                        id: scope.row.customer_id, 
                        types:'2'
                        } 
                      })"
                    >{{ scope.row.customer_name }}
                </el-link>
                
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="性别" width="50">
              <template slot-scope="scope">
                {{ scope.row.sex }}
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="类型" width="70">
              <template slot-scope="scope">
                {{ scope.row.type }}
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" :label="$store.getters.roleName.adviser" width="100">
              <template slot-scope="scope">
                {{ scope.row.adviser_name }}
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" :label="$store.getters.roleName.technician" width="100">
              <template slot-scope="scope">
                {{ scope.row.technician_name }}
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="备注" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.content }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="160">
              <template slot-scope="scope">
                <p class="affirm" v-if="scope.row.status == 0">
                  <a class="buttonStyle_class" @click="goPageURL('MakeAnAppointmentAmend',scope.row.id,scope.row.customer_id)">修改预约</a>
                  <em></em>
                  <a class="buttonStyle_class" @click="cancelFn(scope.row.id)">取消预约</a>
                </p>
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>

    <div class="cancel_box">
            
        <el-dialog title="取消原因" :visible.sync="cancelPop">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="cancelText">
                    <el-input type="textarea" placeholder="请输入取消原因..." v-model="form.cancelText" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelPop = false;form.cancelText = ''">取 消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="cancelConfirmBtnFn">确 定</el-button>
                </template>
            </div>
        </el-dialog>
    </div>



  </div>
</template>
<script>
import { appointmentList,appointmentCancel } from "@/shop/assets/api/flow/makeAnAppointmentList"
import autoSearchClient from '@/shop/components/autocomplete/autoSearchClient'
export default {
  name: "MakeAnAppointmentList",
  data() {
    return {
        roleChoosable:false,
        disabled:false,
        appointmentId:'',
        boxMaxHeight:"",
        counselorName:"",
        counselor:{
            counselor:"",
        },
        channel: {
          one: '',
          tow: '',
        },
        condition: {
          adviser_id: '',
          channel_pid:'',
          channel_id:'',
          order:2,
          technician_id:"",
        },                                // 查询条件
        demoList: [],                      // table数组
        pageSearch: appointmentList,       // 分页查询api接口
        daterangeTimer:[],
        cancelPop:false,
        form:{
            cancelText:'',
        },
        rules:{
            cancelText: [{ required: true, message: '请填写原因', trigger: 'blur' }],
        },
    };
  },
  watch: {
      'daterangeTimer'(newData,oldData){
        this.condition.startTime = this.$base.dateTimeToDate(newData[0], "startTime");
        this.condition.endTime = this.$base.dateTimeToDate(newData[1], "endTime");
      },
      'channel': {
        deep: true,
        handler: function() {
          this.condition.channelId = this.channel.tow || this.channel.one;
          console.log(this.condition.channelId)
          // this.loadData();
        }
      }
  },

  components: {autoSearchClient},
  methods: {
    //导出Excel
    deriveExcel() {
      let params = this.$base.copySearchConditions(this.condition);
      let url = `http://${location.hostname}/post/export/appointment/getPrintInfo?start=0&perpage=999&downloadUserId=${this.$store.getters.currentUser.users_id}`;
      if (params.adviser_id) {
        url += `&adviser_id=${params.adviser_id}`
      }
      if (params.keyword) {
        url += `&keyword=${params.keyword}`
      }
      if (params.channel_pid) {
        url += `&channel_pid=${params.channel_pid}`
      }
      if (params.channel_id) {
        url += `&channel_id=${params.channel_id}`
      }
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      let startTime = year + "-" + month + "-01 00:00:00";
      let endTime = year + "-" + month + "-" + strDate + '23:59:59';
      if (params.startTime) {
        url += `&startTime=${params.startTime}`;
      } else {
        url += `&startTime=${startTime}`;
      }

      if (params.endTime) {
        url += `&endTime=${params.endTime}`;
      } else {
        url += `&endTime=${endTime}`;
      }
      window.location.href = url;
    },

    myChanged(data){
        this.condition.data = data.kw
    },
    //跳转页面
    goPageURL(str,appointmentId,counselorId){
        switch (str) {
            case "MakeAnAppointmentAmend":
                this.$router.push({  
                    path: 'MakeAnAppointmentAmend',   
                    query: {  
                      appointmentId: appointmentId,
                      counselorId: counselorId
                    }
                })
                break;
        
            default:
                break;
        }
    },

    loadData() {
      
      this.$refs.demoTable.loadData()
    },

    //取消按钮弹窗
    cancelFn(appointmentId){
        this.appointmentId = appointmentId;
        this.cancelPop = true
    },
    cancelConfirmBtnFn(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            let postData = {
                appointmentId : this.appointmentId,
                cause:this.form.cancelText
            }

            this.disabled = true

            appointmentCancel(postData).then(res => {
                if(res.status == 0){
                    this.$message({
                        showClose: true,
                        message: '取消成功',
                        duration:'1500',
                        type: 'success',
                        onClose:()=>{
                          window.history.go(0)
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
          } 
        })
        
        // this.cancelPop = false;
    },

    //确认到店
    confirmFn(){
        this.confirmPop = true
    }
  },

  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {

    this.boxMaxHeight = window.innerHeight - 100;
    var timerJson = this.$base.getDateScope(0)
    this.dateTime = [timerJson.startTime , timerJson.endTime];
    // this.condition.startTime = timerJson.startTime
    // this.condition.endTime = timerJson.endTime

    let usersId = JSON.parse(localStorage.getItem('CURRENT_USER'))
    if(usersId.role_id == 3){
      this.roleChoosable = true;
        this.adviser_id = usersId.users_id

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
.MakeAnAppointmentList {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #e5e5e5;
  }
  .box {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom:20px; 
  }
}
</style>

<style>
.MakeAnAppointmentList .affirm{
  display: flex;
  align-items: center;
  justify-content: center;
}
.MakeAnAppointmentList .affirm em{
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 .1rem;
}
.MakeAnAppointmentList .affirm a{
  cursor: pointer;
}
.MakeAnAppointmentList .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.MakeAnAppointmentList .list_status .zhifu{
    background: #9FDB9D;
}
.MakeAnAppointmentList .list_status .weizhifu{
    background: #FEB78C;
}
.MakeAnAppointmentList .list_status .quxiao{
    background: #D2D2D2;
}
.MakeAnAppointmentList .cancel_box .el-dialog,.MakeAnAppointmentDel .confirm_box .el-dialog{
    width: 4.2rem;
}
.MakeAnAppointmentList .cancel_box .el-dialog .el-dialog__body,.MakeAnAppointmentDel .confirm_box .el-dialog .el-dialog__body{
    padding: 10px 20px 0;
}
.MakeAnAppointmentList .cancel_box .el-dialog .el-dialog__body textarea{
    height: 90px;
}
</style>



    
