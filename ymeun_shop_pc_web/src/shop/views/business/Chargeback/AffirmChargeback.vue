<template>
  <div class="AffirmChargeback">
    <div class="header">
      <div class="name">
        <b>{{userData.customer_name}}</b>
        <span v-if="userData.customer_sex == 0" class="iconfont iconnv"></span>
        <span v-else class="iconfont iconnan"></span>
      </div>
      <div class="mobile">
        电话：{{userData.customer_mobile}}
        <span>单号： {{userData.orders_code}}</span>
      </div> 
    </div>

    <el-alert
      :title="alertText"
      style="border-left: 2px solid #ff5722; border-radius: 0; "
      type="error"
      :closable='false'
      v-if="alertIsShow">
    </el-alert>
    
    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="false" v-on:listLoaded="getLoaded">
        <el-table slot="list" :data="demoList" border stripe>

          <el-table-column prop="checked" align="center" label="操作">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked" :disabled="scope.row.status == 1" @change="dataPitchOn"></el-checkbox>
            </template>
          </el-table-column>
          
          <el-table-column prop="orders.created_at" align="center" label="开单时间">
            <template slot-scope="scope">
              {{ scope.row.orders.created_at | _endTimeFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="items.name" align="center" label="项目名称">
            <template slot-scope="scope">
              {{ scope.row.items.name }}
            </template>
          </el-table-column>
          <el-table-column prop="number" align="center" label="购买疗程">
            <template slot-scope="scope">
              {{ scope.row.number }}
            </template>
          </el-table-column>
          <el-table-column prop="number_one" align="center" label="购买数量">
            <template slot-scope="scope">
              {{ scope.row.number_one }}
            </template>
          </el-table-column>
          <el-table-column prop="not_number_one" align="center" label="未划扣数量">
            <template slot-scope="scope">
              {{ scope.row.not_number_one }}
            </template>
          </el-table-column>
          <el-table-column prop="orders.payment" align="center" label="订单金额（元）">
            <template slot-scope="scope">
              {{ scope.row.payment | _filterNumFormat }}
            </template>
          </el-table-column>
          <el-table-column prop="refund_price" align="center" label="应退金额（元）">
            <template slot-scope="scope">
              {{ scope.row.refund_price | _filterNumFormat }}
            </template>
          </el-table-column>

        </el-table>
      </base-list>
      <div class="total_num">
        <p><span>退款总额（元）：</span><i>{{totalPrices | _filterNumFormat}}</i></p>
      </div>

      <div class="remark"><el-input type="textarea"  placeholder="请输入退款说明..." v-model.trim="remark" ></el-input></div>

      <div class="buttom">
        <el-button @click="$router.go(-1)">取消</el-button>

        <template v-if="disabled">
          <el-button type="primary" disabled>提交中...</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="chargebackBtnFn" :disabled="chargebackBtn">确定退单</el-button>
        </template>

      </div>
    </div>

    
  </div>
</template>
<script>
import { getRefundAccount , refundAuditAdd } from "@/shop/assets/api/informatization/chargeback"
export default {
  name: "AffirmChargeback",
  data() {
    return {
      userData:{
        sex:{},
        store:{}
      },
      counselor:{
        counselor:"",
      },
      condition: {
        ordersId:this.$route.query.id
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getRefundAccount,       // 分页查询api接口
      chargebackBtn:false,
      disabled:false,
      remark:"",
      totalPrices:"",
      userDataSgin:'',
      alertText:"",
      alertIsShow:false
    };
  },
  components: {},
  methods: {
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //列表外赋值
    getLoaded(data){
      this.userData = data.customer;
      this.userDataSgin = data.sign;
      if(data.sign == 1){
        this.alertText = data.msg;
        this.alertIsShow = true;
        this.chargebackBtn = true;
        // this.$message({
        //     showClose: false,
        //     duration:'9999999',
        //     message: data.msg,
        //     type: 'error',
        // });
      }else if (data.sign == 2) {
        this.alertText = data.msg;
        this.alertIsShow = true;
        this.chargebackBtn = true;
        // this.$message({
        //     showClose: false,
        //     duration:'9999999',
        //     message: data.msg,
        //     type: 'warning',
        // });
      }else{
        this.chargebackBtn = false;
      }
    },
    //是否选中
    dataPitchOn(){
      this.totalPrices = 0
      var num = 0;
      let indexNum = this.demoList.length;
      console.log(this.demoList.length);
      this.demoList.map((item , index) => {
        if(item.checked){
          num++;
          this.totalPrices += item.refund_price
        }
      })
      if(num == 0)this.totalPrices = 0;
      if (this.userDataSgin == 2) {
        if (indexNum == num) {
          this.chargebackBtn = false;
        }else {
          this.chargebackBtn = true;
        }
      }
    },
    //提交退单
    chargebackBtnFn(){

      let postData = {
        receiptId:[],
        describe:this.remark,
      }
      var num = 0;
      this.demoList.map((item , index) => {
        if(item.checked){
          num++;
          postData.receiptId.push(item.id)
        }
      })

      if(this.remark != '' && num > 0){
        this.disabled = true
        refundAuditAdd(postData).then(res=>{
            if(res.status == 0){
                this.$message({
                    showClose: true,
                    message: '申请退单成功',
                    type: 'success',
                    onClose:()=>{
                      this.demoList.map((item , index) => {
                        item.checked = false
                      })
                      this.remark = ''
                      this.loadData()
                      this.disabled = false
                      window.history.back();
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
      else{
        this.$message({
          message: `请查看是否填写退款说明及是否选中退单项目`,
          type: 'error'
        })
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
  mounted() {},

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
.AffirmChargeback {
  margin: 24px 20px;
  .header {
    height: 80px;
    background-color: #ffffff;
    padding: 25px;
    margin-bottom: .2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .name {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      position: relative;
      display: flex;
      align-items: center;
      b{
        font-weight: normal;
        font-size: 24px;
      }
      span {
        padding-left: 5px;
      }
      .iconnan {
        color: #2878ff;
      }
      .iconnv {
        color: #ec414d;
      }
    }
    .mobile {
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
    .total_num{
      border-bottom: 1px solid #EBEEF5;
      border-left: 1px solid #EBEEF5;
      border-right: 1px solid #EBEEF5;
      display: flex;
      align-items: center;
      height: 50px;
      justify-content: flex-end;
      p{
        font-size: 16px;
        color: #333;
        display: flex;
        align-items: flex-end;
        padding-right: .4rem;
        span{
          position: relative;
          top: -3px;
        }
        i{
            font-style: normal;
            font-size: 24px;
            color: #EC414D;
            font-weight: bold;
        }
      }
    }
    .remark{
      height: 100px;
      margin-top: .24rem;
    
    }
    .buttom {
      text-align: right;
      margin-top: .7rem;
    }
  }
}
</style>

    
<style>
.AffirmChargeback .box .serve .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    /*margin: 0;*/
}
.AffirmChargeback .box .base-list .content{
    margin: 0;
}
.AffirmChargeback .box .remark .el-textarea{
  height: 100%;
}
.AffirmChargeback .box .remark .el-textarea textarea{
  height: 100%;
  background: #F8F8F8;
}
</style>