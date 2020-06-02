<template>
  <div class="ListCanBeReturned">

    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-form-item>
                    <el-input v-model.trim="condition['keyword']" placeholder="请输入客户姓名/电话/单号" clearable></el-input>
                </el-form-item>
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
                  <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                 </el-form-item>
             
          </el-form>

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="index" align="center" label="序号" width="60">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            
            <el-table-column prop="status" align="center" label="状态">
              <template slot-scope="scope">
                <div class="list_status">
                    <span class="zhifu" v-if="scope.row.status == 1">已支付</span>
                    <span class="weizhifu" v-else-if="scope.row.status == 0">未支付</span>
                    <!-- <span class="quxiao" v-else>{{scope.row.status}}</span> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="code" align="center" label="单号">
              <template slot-scope="scope">
                {{ scope.row.code }}
              </template>
            </el-table-column>
            <el-table-column prop="trading_time" align="center" label="交易时间">
              <template slot-scope="scope">
                {{ scope.row.trading_time | _endTimeFormat}}
              </template>
            </el-table-column>
            <el-table-column prop="customer.name" align="center" label="客户姓名">
              <template slot-scope="scope">
                <el-link 
                    :underline="false" 
                    @click="$router.push({
                      name: 'ClientDel',
                      query:{ 
                        id: scope.row.customer_id, 
                        types:'3'
                        } 
                      })"
                    >{{ scope.row.customer.name }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="customer.mobile" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.customer.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="adviser.name" align="center" :label="$store.getters.roleName.adviser">
              <template slot-scope="scope">
                {{ scope.row.adviser.name }}
              </template>
            </el-table-column>
            <el-table-column prop="number" align="center" label="未划扣数量（次）" width="140">
              <template slot-scope="scope">
                {{ scope.row.number }}
              </template>
            </el-table-column>
            <el-table-column prop="payment" align="center" label="应收金额（元）">
              <template slot-scope="scope">
                {{ scope.row.payment | _filterNumFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="refund_price" align="center" label="退款金额（元）">
              <template slot-scope="scope">
                {{ scope.row.refund_price | _filterNumFormat }}
              </template>
            </el-table-column>
<!--            <el-table-column prop="across_store" align="center" label="消费门店">-->
<!--              <template slot-scope="scope">-->
<!--                {{ scope.row.across_store }}-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column prop="arrears_price" align="center" label="欠款情况">
              <template slot-scope="scope">
                {{ scope.row.arrears_price > 0 ? '有' : '无' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <p class="gaipai">
                  <a class="buttonStyle_class" @click="pagesToUrl('AffirmChargeback',scope.row.id)">退单</a>
                </p>
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>
  </div>
</template>
<script>
import { getAllowRefundList } from "@/shop/assets/api/informatization/chargeback"
export default {
  name: "ListCanBeReturned",
  data() {
    return {
      counselor:{
        counselor:"",
      },
      condition: {
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getAllowRefundList,       // 分页查询api接口
      daterangeTimer:[]
    };
  },
  watch: {
    'daterangeTimer'(newData,oldData){
      this.condition.startTime = this.$base.dateTimeToDate(newData[0],"date2")
      this.condition.endTime = this.$base.dateTimeToDate(newData[1],"date2")
    },
  },
  components: {},
  methods: {
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //跳转页面
    pagesToUrl(str,id){
      switch (str) {
        case 'AffirmChargeback':
          this.$router.push({  
            path: 'AffirmChargeback',   
            query: {  
              id: id
            }
          })
          break;
        default:
          break;
      }
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
.ListCanBeReturned {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;

  .box {
    width: 100%;
    padding-top: 20px;
    margin-bottom: 40px;
    padding-bottom:20px; 
  }
}
</style>

<style>
.ListCanBeReturned .gaipai span{
  cursor: pointer;
}
.ListCanBeReturned .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.ListCanBeReturned .list_status .zhifu{
    background: #9FDB9D;
}
.ListCanBeReturned .list_status .weizhifu{
    background: #FEB78C;
}
.ListCanBeReturned .list_status .quxiao{
    background: #D2D2D2;
}
</style>


    
