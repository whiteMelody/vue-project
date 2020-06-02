<template>
  <div class="ChargebackDel">
    <div class="header">
      <div class="name">
        {{userData.customer_name}}
        <span v-if="userData.customer_sex == 0" class="iconfont iconnv"></span>
        <span v-else class="iconfont iconnan"></span>
      </div>
      <div class="mobile">
        电话：{{userData.customer_mobile}}
        <span>单号： {{userData.orders_code}}</span>
      </div> 
    </div>

    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="false" v-on:listLoaded="getLoaded">
        <el-table slot="list" :data="demoList" border stripe>
          
          <el-table-column prop="refund_time" align="center" label="退单时间">
            <template slot-scope="scope">
              {{ scope.row.refund_time | _endTimeFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="items_name" align="center" label="项目名称">
            <template slot-scope="scope">
              {{ scope.row.items_name }}
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
          <el-table-column prop="actual_payment" align="center" label="订单金额（元）">
            <template slot-scope="scope">
              {{ scope.row.actual_payment | _filterNumFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="refund_price" align="center" label="应退金额（元）">
            <template slot-scope="scope">
              {{ scope.row.refund_price | _filterNumFormat}}
            </template>
          </el-table-column>

        </el-table>
      </base-list>
      <div class="total_num">
        <p><span>实付金额（元）：</span><i>{{totalPrices|_filterNumFormat}}</i></p>
      </div>

      <div class="remark">{{userData.describe}}</div>

    </div>

    
  </div>
</template>
<script>
import { getRefundSee } from "@/shop/assets/api/informatization/chargeback"
export default {
  name: "ChargebackDel",
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
        mark:this.$route.query.mark
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getRefundSee,       // 分页查询api接口
      totalPrices:""
    };
  },
  watch: {
    // 'demoList'(newData,oldData){
    //   newData.map((item, index) => {
    //     this.totalPrices += item.refund_price
    //   })
    // },
  },
  components: {},
  methods: {
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //列表外赋值
    getLoaded(data){
      this.userData = data.customer
      this.totalPrices = data.receipt_total.receipt_payable
    },
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
.ChargebackDel {
  margin: 24px 20px;
  .header {
    height: 80px;
    background-color: #ffffff;
    padding: 25px;
    .name {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      position: relative;
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
      height: 60px;
      margin-top: .24rem;
      padding: 20px;
      background: #F8F8F8;
      border:1px solid #E5E5E5;
    }
    .buttom {
      text-align: right;
      margin-top: .7rem;
    }
  }
}
</style>

    
<style>
.ChargebackDel .box .serve .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    /*margin: 0;*/
}
.ChargebackDel .box .base-list .content{
    margin: 0;
}
</style>