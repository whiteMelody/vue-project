<template>
  <div class="ToCollectMoneyList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>收银列表</header>
    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-form-item>
                  <auto-search-client @changed="myChanged"></auto-search-client>
                </el-form-item>
             
                <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
          </el-form>

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="index" align="center" label="序号" width="50px">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            
            <el-table-column prop="status" align="center" label="状态">
              <template slot-scope="scope">
                <div class="list_status">
                    <span class="zhifu" v-if="scope.row.status == 1">已支付</span>
                    <span class="weizhifu" v-else-if="scope.row.status == 0">未支付</span>
                    <span class="quxiao" v-else>{{scope.row.status == 2 ? '已退单' : '已失效'}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="code" align="center" label="单号">
              <template slot-scope="scope">
                {{ scope.row.code }}
              </template>
            </el-table-column>
            <el-table-column prop="created_at" align="center" label="订单时间">
              <template slot-scope="scope">
                {{ scope.row.created_at | _endTimeFormat}}
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
            <el-table-column prop="adviser.name" align="center" label="开单人">
              <template slot-scope="scope">
                <!-- {{ scope.row.adviser.name }} -->
                {{ scope.row.adviser }}
              </template>
            </el-table-column>
            <el-table-column prop="payment" align="center" label="应收金额">
              <template slot-scope="scope">
                {{ scope.row.payment | _filterNumFormat }}
              </template>
            </el-table-column>
<!--            <el-table-column prop="across_store" align="center" label="消费门店">-->
<!--              <template slot-scope="scope">-->
<!--                {{ scope.row.across_store == '' || scope.row.across_store == 0 ?'本店' : scope.row.across_store}}-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <p class="operation">
                  <a class="buttonStyle_class" v-if="scope.row.status == 0 && scope.row.orders_number == 1" @click="pagesToUrl('CollectMoney',scope.$index)">收银</a>
                  <a class="buttonStyle_class" v-else @click="pagesToUrl('CollectMoney2',scope.$index)">查看</a>
                  <em></em>
                  <a class="buttonStyle_class"  @click="PrintingClick(scope.row.id)">打印</a>
                </p>
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>
  </div>
</template>
<script>
import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient";
import { getReceiptHistoryList } from "@/shop/assets/api/informatization/toCollectMoney"
export default {
  name: "ToCollectMoneyList",
  data() {
    return {
      boxMaxHeight:"",
      counselor:{
          counselor:"",
      },
      condition: {
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getReceiptHistoryList,       // 分页查询api接口
    };
  },
  components: {autoSearchClient},
  methods: {
    myChanged(data){
      this.condition.keyword = data.kw
    },
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //列表外赋值
    getLoaded(data){
      this.notConsultationCount = data.notConsultationCount;
      this.totalCount = data.totalCount;
    },
    //跳转页面
    pagesToUrl(str,index){
      switch (str) {
        case 'CollectMoney':
          this.$router.push({  
            path: 'CollectMoney',   
            query: {
              appointment_id : this.demoList[index].appointment_id,
              orders_id : "",
              adviser_id : this.demoList[index].adviser_id,
              customer_id : this.demoList[index].customer_id,
              id : this.demoList[index].id,
            }
          })
          break;
        case 'CollectMoney2':
          this.$router.push({
            path: 'CollectMoney',
            query: {
              isShowPay: true,
              appointment_id : this.demoList[index].appointment_id,
              orders_id : "",
              adviser_id : this.demoList[index].adviser_id,
              customer_id : this.demoList[index].customer_id,
              id : this.demoList[index].id,
            }
          })
          break;
        default:
          break;
      }
    },
    
    PrintingClick(id) {
      this.$router.push({
        name: "Printing",
        query: { id: id, type: 1 }
      });
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
.ToCollectMoneyList {
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
.ToCollectMoneyList .operation{
  display: flex;
  align-items: center;
  justify-content: center;
}
.ToCollectMoneyList .operation em{
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 .1rem;
}
.ToCollectMoneyList .operation a{
  cursor: pointer;
}
.ToCollectMoneyList .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.ToCollectMoneyList .list_status .zhifu{
    background: #9FDB9D;
}
.ToCollectMoneyList .list_status .weizhifu{
    background: #FEB78C;
}
.ToCollectMoneyList .list_status .quxiao{
    background: #D2D2D2;
}
</style>


    
