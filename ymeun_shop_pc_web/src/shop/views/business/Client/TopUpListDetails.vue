<template>
  <div class="TopUpListDetails" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>充值收支明细</header>
    <div class="box">
      
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
    
                <el-form-item class="w240px">
                  <el-date-picker
                    class="wb100"
                    v-model="daterangeTimer"
                    :clearable="false"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="condition.adviserId" placeholder="充值人员" readonly="" clearable>
                    <el-option :key="''" :value="''" label="全部充值人员"></el-option>
                    <el-option v-for="item in $store.getters.counselorCosmetologistMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                </el-form-item>
          </el-form>

    

        <base-list ref="demoTable" :condition="condition"
                  :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

          <el-table slot="list" :data="demoList" stripe border
                  row-key="id"
                  ref="myTable"
                  @row-click="switchExpansion"
                :tree-props="{children: 'list', hasChildren: 'hasChildren'}"
           >

            <el-table-column prop="price" align="center" label="充值金额（元）">
              <template slot-scope="scope">
                  <span v-if="scope.row.list">
                    {{scope.row.price | _filterNumFormat}}
                  </span>
              </template>
            </el-table-column>

              <el-table-column prop="getPrice" align="center" label="券额（元）">
                  <template slot-scope="scope">
                      <span v-if="scope.row.list">
                        {{scope.row.getPrice | _filterNumFormat}}
                      </span>
                  </template>
              </el-table-column>

            <el-table-column prop="time" align="center" label="充值时间">
              <template slot-scope="scope">
                  <span v-if="scope.row.list">
                    {{scope.row.time}}
                  </span>
              </template>
            </el-table-column>

            <el-table-column prop="usersName" align="center" label="充值人员">
              <template slot-scope="scope">
                <span v-if="scope.row.list">
                  {{scope.row.usersName}}
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="code" align="center" label="单号">
              <template slot-scope="scope">
                <span>
                  {{scope.row.code}}
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="customer_name" align="center" label="订单相关充值金额（元）">
              <template slot-scope="scope">
                  <span v-if="!scope.row.list">
                    {{scope.row.price | _filterNumFormat}}
                  </span>
              </template>
            </el-table-column>

            <el-table-column prop="surplusPrice" align="center" label="剩余充值金额（元）">
              <template slot-scope="scope">
                <span>
                  {{scope.row.surplusPrice | _filterNumFormat}}
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="adviser_name" align="center" label="消费券额（元）">
              <template slot-scope="scope">
                <span v-if="!scope.row.list">
                    {{scope.row.getPrice | _filterNumFormat}}
                  </span>
              </template>
            </el-table-column>

            <el-table-column prop="surplusGetPrice" align="center" label="剩余券额（元）">
                <template slot-scope="scope">
                    <span>
                      {{scope.row.surplusGetPrice | _filterNumFormat}}
                    </span>
                </template>
            </el-table-column>

              <el-table-column prop="typeName" align="center" label="相关类型">
                  <template slot-scope="scope">
                      <span>
                        {{scope.row.typeName}}
                      </span>
                  </template>
              </el-table-column>

              <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                      <p v-if="scope.row.list" @click.stop>
                        <span class="blue-color" v-if="scope.row.refund == 1" @click="openPop(scope.row)">退款</span>
                        <span class="blue-opacity-color" v-else-if="scope.row.refund == 3">已退款</span>
                      </p>
                      <p v-else>
                        <span class="blue-color" v-if="scope.row.orders_id" @click="$router.push({path: 'CollectMoney',query:{isShowPay:true,orders_id:scope.row.orders_id}})">查看</span>
                      </p>
                  </template>
              </el-table-column>
          </el-table>
        </base-list>


    </div>

    <el-dialog title="是否确定退款" :visible.sync="dialogRefundsShow" @closed="closelPop">
        <el-form ref="form" :model="dialogRefundParam" :rules="rules">
            <el-form-item prop="cancelText">
                <el-input type="textarea" placeholder="请输入退款原因..." v-model="dialogRefundParam.cancelText" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closelPop">取 消</el-button>
            <template v-if="disabled">
                <el-button type="primary" disabled>提交中...</el-button>
            </template>
            <template v-else>
                <el-button type="primary" @click="cancelConfirmBtnFn">确 定</el-button>
            </template>
        </div>
    </el-dialog>

  </div>
</template>
<script>
import { prepaidListByCustomer , prepaidExtraction } from "@/shop/assets/api/client/client"
export default {
  name: "TopUpListDetails",
  data() {
    return {
      boxMaxHeight:"",
      userData:"",
      condition: {
        startTime: '',
        endTime: '',
        customer_id:this.$route.query.id
      }, // 查询条件
      demoList: [],                      // table数组
      pageSearch: prepaidListByCustomer,       // 分页查询api接口
      // daterangeTimer:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
      daterangeTimer:[],
      dialogRefundsShow:false,
      dialogRefundParam:{},
      disabled:false,
      rules:{
        cancelText: [{ required: true, message: '请输入备注', trigger: 'blur' }],
      }
    };
  },

  watch: {
    'daterangeTimer'(newData,oldData){
      this.condition.startTime = this.$base.dateTimeToDate(newData[0],"startTime")
      this.condition.endTime = this.$base.dateTimeToDate(newData[1],"endTime")
    },
  },
  components: {},
  methods: {

    switchExpansion(row) {
        if(row.list){
            if(row.list.length)
                this.$refs.myTable.toggleRowExpansion(row)
        }
    },

   
     
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData()
    },
    //列表外赋值
    getLoaded(data){

    },

    //开启弹窗
    openPop(item){
      this.dialogRefundParam = item;
      this.dialogRefundsShow = true;
      
      // console.log(item);
    },

    //关闭弹窗
    closelPop(){
      this.dialogRefundParam = {}
      this.dialogRefundsShow = false
      //  this.dialogRefundParam.cancelText = '';
    },

    cancelConfirmBtnFn(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.disabled = true
            let postData = {
                prepaid_id : this.dialogRefundParam.id,
                command:this.dialogRefundParam.command,
                price:this.dialogRefundParam.surplusPrice,
                getPrice:this.dialogRefundParam.getPrice,
                remarks:this.dialogRefundParam.cancelText
            }
            prepaidExtraction(postData).then(res => {
                if(res.status == 0){
                    this.$message({
                        showClose: true,
                        message: '退款成功',
                        type: 'success',
                        onClose:()=>{
                          // window.history.go(0)
                          this.loadData()
                          this.disabled = false
                          this.dialogRefundParam = {}
                          this.dialogRefundsShow = false
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
            })
          } 
        })
    },
  

  

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
.TopUpListDetails {
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
.TopUpListDetails .blue-color{
  color: #0DC9E5;
}
.TopUpListDetails .blue-opacity-color{
  color:rgba(13,201,229,0.5);
}
.TopUpListDetails .el-table tr{
  cursor: pointer;
}
.TopUpListDetails .el-dialog,.MakeAnAppointmentDel .confirm_box .el-dialog{
    width: 420px;
}
.TopUpListDetails .el-dialog .el-dialog__body,.MakeAnAppointmentDel .confirm_box .el-dialog .el-dialog__body{
    padding: 10px 20px 0;
}
.TopUpListDetails .el-dialog .el-dialog__body textarea{
    height: 90px;
}


</style>

    
