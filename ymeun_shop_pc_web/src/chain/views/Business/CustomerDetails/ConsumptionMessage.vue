<template>
  <div class="ConsumptionMessage">
      <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
        
          <el-form-item label>
            <el-date-picker
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

      <div class="pa20 bg-gray6 text-center f16px">
        <div class="wb20 fl h40px lh40px bd-gray bd-r1 mat15 f16px">
          {{userData.name}}
        </div>
        <div class="wb20 fl">
          <p class="fc-gray2 h20px lh20px">总计次数（次）</p>
          <div class="clear2"></div>
          <p class="fc-gray3 f20px h40px lh40px">{{userData.orderCount}}</p>
        </div>
        <div class="wb20 fl">
          <p class="fc-gray2 h20px lh20px">实际消费金额（元）</p>
          <div class="clear2"></div>
          <p class="fc-gray3 f20px h40px lh40px">{{userData.payment | NumFormat}}</p>
        </div>
        <div class="wb20 fl">
          <p class="fc-gray2 h20px lh20px">退单金额（元）</p>
          <div class="clear2"></div>
          <p class="fc-gray3 f20px h40px lh40px">{{userData.refund | NumFormat}}</p>
        </div>
        <div class="wb20 fl">
          <p class="fc-gray2 h20px lh20px">欠款金额（元）</p>
          <div class="clear2"></div>
          <p class="fc-gray3 f20px h40px lh40px">{{userData.arrears_price | NumFormat}}</p>
        </div>
        <div class="clear0"></div>
      </div>
      <div class="clear4"></div>


      <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
        <el-table slot="list" :data="demoList" border>
          <el-table-column align="left" label="序号" width="50px">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column prop="orders_status" align="center" label="支付状态">
            <template slot-scope="scope">
              <span :class="scope.row.orders_status == '已支付' ? 'status_ok' : 'status_no'">{{ scope.row.orders_status}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="code" align="center" label="订单号">
            <template slot-scope="scope">{{ scope.row.code}}</template>
          </el-table-column>

          <el-table-column prop="trading_time" align="center" label="消费日期">
            <template slot-scope="scope">{{ scope.row.trading_time | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column prop="items_name" align="center" label="品项">
            <template slot-scope="scope">
              <p v-html="scope.row.items_name"></p>
            </template>
          </el-table-column>

          <el-table-column prop="number" align="center" label="次数">
            <template slot-scope="scope">{{ scope.row.number}}</template>
          </el-table-column>

          <el-table-column prop="payment" align="center" label="金额（元）">
            <template slot-scope="scope">{{ scope.row.payment | NumFormat}}</template>
          </el-table-column>

          <el-table-column prop="adviser_name" align="center" :label="$store.getters.roleName.adviser">
            <template slot-scope="scope">{{ scope.row.adviser_name}}</template>
          </el-table-column>
    

        </el-table>
      </base-list>
  </div>
</template>
<script>
import { informationOrderList ,  informationOrder } from "@/chain/assets/api/customerDetails/customerDetails";
export default {
  name: "ConsumptionMessage",
  data() {
    return {
      userData:'',
      info:{},
      daterangeTimer:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
      condition: {
        startTime:this.$base.getDateScope(0).startTime,
        endTime: this.$base.getDateScope(0).endTime,
        customerId:this.$route.query.id,
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: informationOrderList, // 分页查询api接口
    };
  },
  components: {},
  watch: {
    'daterangeTimer'(newData,oldData){
      this.condition.startTime = this.$base.dateTimeToDate(newData[0],"startTime")
      this.condition.endTime = this.$base.dateTimeToDate(newData[1],"endTime")
    },
  },
  methods: {
    getLoaded(data){
      // this.info = data.total
    },
    loadData() {
      this.$refs.demoTable.loadData();
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
 

    informationOrder({
      id:this.$route.query.id,
    }).then(res => {
      this.userData = res.data
    }).catch(error=>{
      console.log("informationOrder no");
    })

  },

  // 更新前状态
  beforeUpdate() {
  },

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.ConsumptionMessage {
  background: #fff;
  padding: 20px;
  .status_no{
    display: block;
    background:#ED969C; 
    color: #fff;
    width: 70px;
    margin: 0 auto;
  }
  .status_ok{
    display: block;
    background:#9FDB9D; 
    width: 70px;
    margin: 0 auto;
    color: #fff;
  }
}
</style>



    
