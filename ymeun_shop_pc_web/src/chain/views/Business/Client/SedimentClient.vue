<template>
  <div class="SedimentClient">
    <header>
      <p>沉淀客户列表</p>
      <el-button type="primary" size="mini" @click="$router.push({name:'DistributionList'})" >历史分配记录</el-button>
    </header>
    <div class="clear-f2"></div>
    <el-alert title="通过筛选搜索出符合条件的客户，可批量分配给员工做沉淀客户的回访" type="warning"></el-alert>
    <div class="box">
      <base-list
        ref="demoTable"
        :condition="condition"
        :datas.sync="demoList"
        :pageSearch="pageSearch"
        :isPaging="true"
        v-on:listLoaded="getLoaded"
      >
        <el-form
          :inline="true"
          :model="condition"
          class="search-form"
          slot="search"
          label-width="80px"
        >
          
          <el-form-item>
              <!-- <auto-search-client-stride @changed="myChanged"></auto-search-client-stride> -->
              <el-input v-model="condition.keyword" placeholder="请输入姓名或电话号码"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- <el-tooltip class="item" effect="light" content="选择时间段内生成创建的客户" placement="top"> -->
              <div class="timer">
                <div class="text">客户创建时间</div>
                <em></em>
                <div class="input">
                  <!-- <date-slot :dateTime.sync="dateTime"></date-slot> -->
                  <el-date-picker
                    class="w340px"
                    v-model="dateTime"
                    :clearable="false"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
          
              </div>
            <!-- </el-tooltip> -->
          </el-form-item>
          
          <el-form-item>
              <div class="xiao_fei">
                <div class="text">消费区间</div>
                <em></em>
                <div class="xiao_fei_box">
                  <p>
                    <i class="iconfont iconmoney fc-gray2"></i>
                    <el-input type="number" v-model="condition.consumptionLow" placeholder="输入金额" class="w120px"></el-input>
                  </p>
                  <b>至</b>
                  <p>
                    <i class="iconfont iconmoney fc-gray2"></i>
                    <el-input type="number" v-model="condition.consumptionHigh" placeholder="输入金额" class="w120px"></el-input>
                  </p>
                </div>
              </div>
          </el-form-item>

          <!-- 消费区间 
          <div class="xiaofeiBox">
            <div class="text">消费区间</div>
            <div class="input">
              <i class="iconfont iconmoney fc-gray2"></i>
              <input type="text" style="background:none" v-model="condition.consumptionLow">
            </div>
            <div class="text">至</div>
            <div class="input">
              <i class="iconfont iconmoney fc-gray2"></i>
              <input type="text" style="background:none" v-model="condition.consumptionHigh">
            </div>
          </div>-->

          <el-form-item>
            <el-select v-model="condition.customer_style" placeholder="选择客户类别" readonly clearable>
              <el-option v-for="[key,val] in _dictSpareCustomerTow" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>

           <el-form-item>
            <el-select v-model="condition.consume" placeholder="请选择划扣数量排序" readonly clearable>
              <el-option v-for="[key, val] in _dictMoneySortType" :key="key" :label="val"
                        :value="key"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="condition.advId" :placeholder="`请选择${$store.getters.roleName.adviser}`" readonly="" clearable class="wb100">
              <el-option :key="''" :value="''" :label="`全部${$store.getters.roleName.adviser}`"></el-option>
                <el-option v-for="item in doctorList" :key="item.users_id" :label="item.name" :value="item.users_id"></el-option>
            </el-select>
          </el-form-item>
            
            <el-form-item label>
                <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable @change="changeStore">
                    <el-option :key="''" label="全部门店" :value="''"></el-option>
                    <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item  label="">
                <el-select v-model="condition.channelPid" placeholder="选择渠道" readonly clearable @change="changeChannel" :disabled="!condition.storeId">
                    <el-option :key="''" label="全部渠道" :value="''"></el-option>
                    <el-option v-for="item in channelList" :key="item.id" :label="item.name"
                              :value="item.id"></el-option>
                </el-select>
                <el-select class="mal10" v-model="condition.channelId" placeholder="选择下级渠道类别" readonly clearable v-if="condition.channelPid" :disabled="!condition.storeId">
                    <el-option v-for="item in channelList2" :key="item.id" :label="item.name"
                              :value="item.id"></el-option>
                </el-select>
            </el-form-item>

          <el-form-item>
            <el-select v-model="condition.overdueId" placeholder="请选择活跃度" readonly="" clearable :disabled="!condition.storeId">
              <!-- 10.18--杨涛修改 -->
              <el-option v-for="(key, index) in customerActive" :key="index" :label="key.name" :value="key.val"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button class="h32px" @click="form = {};condition={};dateTime=[]">重置</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" class="h32px" @click="allocationBtn=true;loadData();"></el-button>
          </el-form-item>

          <template v-if="allocationBtn">
            <el-form-item>
              <el-button type="primary" class="h32px" @click="batchAllocationFn">批量分配</el-button>
            </el-form-item>
          </template>

            
        </el-form>

        <el-table slot="list" :data="demoList" border>
          <el-table-column prop="mobile" align="left" label="序号" width="50px">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="center" label="创建日期">
            <template slot-scope="scope">{{ scope.row.created_time | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column prop="name" align="left" label="姓名">
            <template slot-scope="scope">
              <!-- <el-link  :underline="false"  @click="$router.push({name: 'EssentialInformation',query:{ id: scope.row.id, } })">{{ scope.row.name }} </el-link> -->
              {{ scope.row.name }}
            </template>
          </el-table-column>

          <el-table-column prop="mobile" align="left" label="电话">
            <template slot-scope="scope">{{ scope.row.mobile }}</template>
          </el-table-column>
          
          <!-- 类别 -->
          <el-table-column prop="sex" align="left" label="客户类别">
            <template slot-scope="scope">{{ scope.row.style.label }}</template>
          </el-table-column>

          <el-table-column prop="consultation_id" align="left" :label="$store.getters.roleName.adviser">
            <template slot-scope="scope">{{ scope.row.advName }}</template>
          </el-table-column>

          <el-table-column prop="consumption" align="left" label="实际消费（元）">
            <template slot-scope="scope">{{ scope.row.consumption | _filterNumFormat }}</template>
          </el-table-column>

          <el-table-column prop="consume" align="left" label="剩余划扣数量（次）">
            <template slot-scope="scope">{{ scope.row.consume }}</template>
          </el-table-column>

          <el-table-column prop="store" align="left" label="门店">
            <template slot-scope="scope">{{ scope.row.store.name }}</template>
          </el-table-column>

          <el-table-column prop="channelName" align="left" label="渠道">
            <template slot-scope="scope">{{ scope.row.channelName }}</template>
          </el-table-column>

          <el-table-column prop="overdue" align="left" label="最近上门时间">
            <template slot-scope="scope">{{ scope.row.overdue | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column prop="store" align="left" label="操作" width="60px">
            <template slot-scope="scope">
              <p class="operation_btn">
                <span @click="soloAllocationFn(scope.row)">分配</span>
              </p>
            </template>
          </el-table-column>

        </el-table>
      </base-list>
    </div>


    <div class="dialog_box">
      <el-dialog title="分配客户" :visible.sync="dialogForm" :before-close="clearForm" width="366px">
        <div class="el_dialog_box">
          <h2></h2>
          <el-form ref="myForm" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="接收员工" prop="usersId">
                <el-select v-model="form.usersId" placeholder="请选择员工" readonly="" clearable class="wb100">
                  <el-option v-for="item in allocationList" :key="item.users_id" :label="item.name" :value="item.users_id"></el-option>
                </el-select>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="clearForm">取 消</el-button>
              <template v-if="disabled">
                  <el-button type="primary" disabled>提交中...</el-button>
              </template>
              <template v-else>
                  <el-button type="primary" @click="handleSubmit">确认</el-button>
              </template>
          </div>
        </div> 
      </el-dialog>
    </div>

    
    <div class="dialog_box">
      <el-dialog title="分配客户" :visible.sync="dialogFormTow" :before-close="clearForm" width="730px">
        <div class="el_dialog_box">
          <h4>请选择要分配的客户：</h4>
          <el-form ref="myForm" :model="form" :rules="rules2">
            <el-form-item>
               <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" 
                style="width: 100%" @selection-change="handleSelectionChange" height="340" 
                v-loading="loading">
                <el-table-column type="selection" label="全选" width="50px"></el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="电话">
                  <template slot-scope="scope">{{ scope.row.mobile }}</template>
                </el-table-column>
                <el-table-column :label="$store.getters.roleName.adviser">
                  <template slot-scope="scope">{{ scope.row.advName }}</template>
                </el-table-column>
                <el-table-column label="门店">
                  <template slot-scope="scope">{{ scope.row.store.name }}</template>
                </el-table-column>
              </el-table>
              <div class="pagination" v-if="disabledTotal >= 15">
                <el-pagination
                    @size-change="upPage"
                    @current-change="nextPage"
                    :current-page="1"
                    :page-sizes="[5, 10, 15, 20, 100]"
                    :page-size="15"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="disabledTotal"
                    :hide-on-single-page="false">
                </el-pagination>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="clear bd-b1 bd-gray"></div>
            </el-form-item>
            <el-form-item label="接收员工" prop="usersId" label-width="80px">
              <el-select v-model="form.usersId" placeholder="请选择员工" readonly="" clearable class="wb100">
                <el-option v-for="item in allocationList" :key="item.users_id" :label="item.name" :value="item.users_id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="clearForm">取 消</el-button>
              <template v-if="disabledTow">
                  <el-button type="primary" disabled>提交中...</el-button>
              </template>
              <template v-else>
                  <el-button type="primary" @click="handleSubmit">确认</el-button>
              </template>
          </div>
        </div> 
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { customerAnalysisList,settingList , reviewAdd } from "@/chain/assets/api/client/client";
import {  getListChannel  } from "@/chain/assets/api/channelManagement/channelManagement"

//日期范围组件
// import dateSlot from '@/chain/components/date/dateSlot'
//客户电话姓名
import autoSearchClientStride from '@/chain/components/autocomplete/autoSearchClientStride'

export default {
  name: "SedimentClient",
  data() {
    return {
      allocationBtn:false,
      dateTime: [ '', ''],
      condition: {
        // start: 1,
        // perpage: 15,
        // keyword:"",
        // consumptionStart:"",
        // consumptionEnd:"",
        // consumptionLow:"",
        // consumptionHigh:"",
        // customer_style:"",
        // consume:"",
        // advId:"",
        // storeId:"",
        // overdueId:"",
        channelPid: '',
        channelId: '',
      }, // 查询条件
      perpage: 15,
      demoList: [], // table数组
      pageSearch: customerAnalysisList, // 分页查询api接口
      customerLevel:[], //活跃度
      customerActive:[],//活跃度
      storeList:[], //门店
      channelList: [], //渠道
      channelList2: [], //渠道
      doctorList:[], //顾问
      allocationList:[], //分配员工
      form: {
        usersId:"",
        customerIds:[]
      },
      dialogForm: false,                //弹窗控制器
      disabled: false,
      customerIdsList:[],
      disabledTotal:0,
      tableData: [],
      dialogFormTow: false,                //弹窗控制器
      disabledTow: false,
      loading:false,
      rules: {
        usersId: [{required: true, message: '请选择员工', trigger: 'change'}],
      },
      rules2: {
        usersId: [{required: true, message: '请选择员工', trigger: 'change'}],
      },
    };
  },
  components: { 
    // dateSlot,
    autoSearchClientStride 
  },
  methods: {
    batchAllocationFn(){
      this.dialogFormTow = true;
      let condition = JSON.parse(JSON.stringify(this.condition));
      condition.perpage = this.perpage
      this.loading = true;
      customerAnalysisList(condition).then(res=>{
        if(res.status == 0){
          this.tableData = res.data.data
          this.loading = false;
          this.disabledTotal = res.data.total
        }
      }).catch(error=>{
        console.log("customerAnalysisList-- no");
      })
    },
    soloAllocationFn(item){
      this.dialogForm = true
      let customerIdsList = []
      this.form.customerIds = [];
      customerIdsList.push({customerId:item.id})
      this.form.customerIds = JSON.stringify(customerIdsList)
    },
    //批量分配
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      // console.log(val);
      this.customerIdsList = val;
    },
    //搜索
    myChanged(data){
      this.condition.is_enterprise = data.kw
    },
    
    upPage(val) {
      this.perpage = val;
      this.batchAllocationFn();
    },
    nextPage(val) {
      this.condition.start = val;
      this.batchAllocationFn();
    },
    getLoaded(data){
      // console.log(data)
    },
  
    // 客户等级
    settingList() {
      settingList({storeId: this.condition.storeId}).then(res => {
        if (res.status == 0) {
          this.customerLevel = JSON.parse(res.data.list.rank);
          let array = JSON.parse(res.data.list.active);
          let list = [
            {name:'全部类型',val:0},
            {name:`流失客户(${array.loss}天未到店)`,val:1},
            {name:`预流失客户(${array.wastage}天未到店)`,val:2},
            {name:`活跃客户(${array.brisk}天到过店)`,val:3},
          ]
          this.customerActive = list;
        }
      })
      .catch(error => {
        console.log("settingList no");
      });
    },
    
    loadData() {
      this.$refs.demoTable.loadData();
      this.loading = true;
      
    },
   
    /**
     * 切换门店
     */
    changeStore(){
        this.condition.channelPid = ''
        this.condition.channelId = ''
        this.condition.usersId = ''
        if(!this.condition.storeId){
          return
        }
        getListChannel({ channelParentId: 0, storeId: this.condition.storeId }).then(res => {
            if(res.status == 0){
                let _tmp = res.data.list
                this.channelList = _tmp
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
        this.settingList();
    },

    changeChannel(){
        getListChannel({ channelParentId: this.condition.channelPid, storeId: this.condition.storeId, }).then(res => {
            if(res.status == 0){

                let _tmp = res.data.list

                this.channelList2 = _tmp

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

      // 提交表单
    handleSubmit() {
      this.$refs.myForm.validate((valid) => {
        if (valid) {
          // this.dialogForm ? this.addChannel() : this.addChannelTow();
          this.reviewAddFn()
        } else {
          this.$message({
            message: '请检查表单',
            type: 'error',
          })
        }
      })
    },
    reviewAddFn(){
      
      if(this.dialogFormTow){
        if(this.customerIdsList.length <= 0){
          this.$message({
            message: '请选择要分配的客户',
            type: 'error'
          });
          return
        }
        else{
          this.form.customerIds = []
          let aCustomerIds = []
          this.customerIdsList.map((item , index) => {
            aCustomerIds.push({customerId:item.id})
          })
          this.form.customerIds = JSON.stringify(aCustomerIds)
        }
      }
      console.log(this.form);
      // return;
      reviewAdd(this.form).then(res => {
          if(res.status == 0){
            this.$message({
              message: '分配成功',
              type: 'success',
              onClose:()=>{
                // this.dialogFormTow = false
                
                if(this.dialogFormTow){
                  this.disabledTow = false
                }
                else{
                  this.dialogForm = false; 
                  this.disabled =  false;
                  this.clearForm()
                  this.loadData()
                }
              }
            });
          }else{
              this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
                  onClose:()=>{
                    this.disabledTow = false
                    this.disabled =  false;
                  }
              });
          }
      }).catch(error=>{
        console.log("reviewAdd");
        this.disabledTow = false
        this.disabled =  false;
      })
    },
    
    // 清除表单数据
    clearForm() {
      this.dialogForm = false;
      this.dialogFormTow = false;
      this.form = {
        usersId:"",
        customerIds:[]
      }
    },
  },

  watch: {
    dateTime(c,o){
      console.log(c);
      if(c == null){
        this.condition.consumptionStart = ""
        this.condition.consumptionEnd = ""
      }
      else{
        this.condition.consumptionStart = c[0]
        this.condition.consumptionEnd = c[1]
      }
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
  
    //获取门店列表
    this.$postRequest("/post/api/store/getStore").then(res => {
        if(res.status == 0){
            let _tmp = res.data
            for(let i=0; i<_tmp.length; i++){
                _tmp[i].isSelected = false
            }
            this.storeList = _tmp
        }
    })

    //顾问
    this.$postRequest("/post/api/store/getStoreMembers",{
      role_id:3,
    }).then(res => {
      this.doctorList =res.data 
    })

    

    //分配员工
    this.$postRequest("/post/api/menu/MenuSedimentClientByEnterpriseId",{
    }).then(res => {
      this.allocationList =res.data 
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
.SedimentClient {
  margin: 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    display: flex;
    align-items: center;
    p{
      flex: 1;
    }
  }
  .el-alert{
    margin: 10px 0;
    border-left: 2px solid #E9A269;
    border-radius: 0;
  }
  .box {
    width: 100%;
    margin-bottom: 40px;
    padding-bottom: 20px;
    .timer{
      border: 1px solid #e5e5e5;
      display: flex;
      border-radius: 5px;
      padding: 0 10px;
      align-items: center;
      .text{
        color: #999;
      }
      em{
        width: 1px;
        height: 10px;
        background: #E5E5E5;
        margin-left: 10px;
      }
    }
    .xiao_fei{
      border: 1px solid #e5e5e5;
      display: flex;
      border-radius: 5px;
      padding-left:10px;
      align-items: center;
      .text{
        color: #999;
      }
      em{
        width: 1px;
        height: 10px;
        background: #E5E5E5;
        margin:0 10px;
      }
      .xiao_fei_box{
        display: flex;
        align-items: center;
        p{
          display: flex;
          align-items: center;
          i{
            font-size: 12px;
          }
        }
        b{
          font-weight: normal;
          margin: 0 10px;
        }
      }
    }
    .xiaofeiBox {
      display: inline-block;
      border-radius: 5px;
      margin-right: .1rem;
      height: 32px;
      line-height: 32px;
      width: 20%;
      border: 1px solid #e5e5e5;
      padding-left: .1rem;
      .text {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        float: left;
      }
      .input {
        width: 30%;
        float: left;
        margin-left: 0.1rem;
        i {
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
        }
        input {
          width: 70%;
          height: 100%;
          border: none;
        }
      }
    }
    .operation_btn{
      display: flex;
      align-items: center;
      span{
        cursor: pointer;
        color: #009688 ;
        &:hover {
          opacity: 0.7;
          text-decoration: underline;
        }
      }
      em{
        width: 1px;
        height: 10px;
        background: #e5e5e5;
      }
    }
  }

  .MagessBox {
    padding: 0 0.2rem;
    .title {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;

      span {
        font-size: 0.16rem;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .infoBox {
      padding-left: 0.33rem;
      padding-top: 0.2rem;
      span {
        .iconStyle {
          font-style: normal;
          color: #ec414d;
          margin-right: 0.05rem;
        }
      }
      .texta {
        display: flex;
        .input {
          height: 80px;
          width: 74%;
          border: 1px solid #e5e5e5;
          padding: 0.14rem;
          overflow: hidden;
          border-radius: 5px;

          textarea {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 0.14rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .buttom {
      padding: 0.2rem 0;
      display: flex;
      justify-content: flex-end;

      div {
        cursor: pointer;
        width: 0.56rem;
        height: 32px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .cancel {
        border: 1px solid rgba(192, 192, 192, 1);
        margin-right: 0.2rem;
      }

      .submit {
        background: rgba(13, 201, 229, 1);
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .dialog_box{
    .el-dialog__body{
      .el_dialog_box{
        h2{
          padding-top: 18px;
        }
        h4{
          color: #999999;
          font-weight: normal;
          padding: 14px 0;
        }
        .pagination{
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
<style>
.SedimentClient .affirm {
  display: flex;
  align-items: center;
  justify-content: center;
}
.SedimentClient .affirm em {
  width: 1px;
  height: 10px;
  background: #333;
  margin: 0 0.1rem;
}
.SedimentClient .affirm a {
  cursor: pointer;
}
.SedimentClient .xiao_fei .el-input__inner{
  border: 0;
  padding: 0;
}
.SedimentClient .input .el-input__inner{
  border: 0;
}

.SedimentClient .dialog_box .el-dialog .el-dialog__body{
    padding-top: 0;
}
.SedimentClient .dialog_box .el-dialog .el-dialog__header{
    height: 50px;
    padding: 0 18px;
    display: flex;
    align-items: center;
}
.SedimentClient .dialog_box .el-dialog .el-dialog__header .el-dialog__title{
  flex: 1;
  font-size: 14px;
  color: #333333;
}
.SedimentClient .dialog_box .el-dialog .el-dialog__headerbtn{
  position: initial;
}
.SedimentClient .dialog_box .el-dialog .el-dialog__body .el_dialog_box{
    border-top: 1px solid #E5E5E5;
}
.SedimentClient .dialog_box .el-dialog .el-dialog__body .dialog-footer{
    display: flex;
    justify-content: flex-end;
}
.SedimentClient .dialog_box .el-dialog .el-dialog__body .el-form-item .el-select{
  width: 100px;
}
</style>