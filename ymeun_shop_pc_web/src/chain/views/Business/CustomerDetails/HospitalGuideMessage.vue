<template>
  <div class="HospitalGuideMessage">
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
          <p class="fc-gray2 h20px lh20px">共到诊（次）</p>
          <div class="clear2"></div>
          <p class="fc-gray3 f20px h40px lh40px">{{info.store_quantity}}</p>
        </div>
        <div class="wb20 fl">
          <p class="fc-gray2 h20px lh20px">共计成交（元）</p>
          <div class="clear2"></div>
          <p class="fc-gray3 f20px h40px lh40px">{{info.orders_amount}}</p>
        </div>
        <div class="wb20 fl">
          <p class="fc-gray2 h20px lh20px">退单金额（元）</p>
          <div class="clear2"></div>
          <p class="fc-gray3 f20px h40px lh40px">{{info.refund_amount}}</p>
        </div>
        <div class="clear0"></div>
      </div>
      <div class="clear4"></div>


      <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
        <el-table slot="list" :data="demoList" border>
          <el-table-column align="left" label="序号" width="50px">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column prop="app_status" align="center" label="到诊状态">
            <template slot-scope="scope">{{ scope.row.status.label}}</template>
          </el-table-column>

          <el-table-column prop="orders_status" align="center" label="成交状态">
            <template slot-scope="scope">
              <span :class="scope.row.order.total == 0 ? 'status_no' : 'status_ok'">{{ scope.row.order.label}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="storeTime" align="center" label="到店日期" width="150px">
            <template slot-scope="scope">{{ scope.row.store_time | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column prop="items_name" align="center" label="预约项目">
            <template slot-scope="scope">
              <p v-html="scope.row.items.name"></p>
            </template>
          </el-table-column>

          <el-table-column prop="adviser_name" align="center" :label="$store.getters.roleName.adviser">
            <template slot-scope="scope">{{ scope.row.adviser.name}}</template>
          </el-table-column>

          <el-table-column prop="technician_name" align="center" :label="$store.getters.roleName.technician">
            <template slot-scope="scope">{{ scope.row.technician.name}}</template>
          </el-table-column>

          <el-table-column prop="content" align="center" label="到诊情况">
            <template slot-scope="scope">{{ scope.row.customer_status.label}}</template>
          </el-table-column>

          <el-table-column prop="orders_price" align="center" label="成交金额（元）">
            <template slot-scope="scope">{{ scope.row.orders_amount | NumFormat}}</template>
          </el-table-column>

          <el-table-column prop="refundPrice" align="center" label="退单金额（元）">
            <template slot-scope="scope">{{ scope.row.refund_amount | NumFormat}}</template>
          </el-table-column>
    

        </el-table>
      </base-list>
  </div>
</template>
<script>
import { getArrivalVisit , information } from "@/chain/assets/api/customerDetails/customerDetails";
export default {
  name: "HospitalGuideMessage",
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
      pageSearch: getArrivalVisit, // 分页查询api接口
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
      this.info = data.customer;
      this.demoList = data.list;
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
    information({
      id:this.$route.query.id,
    }).then(res => {
      this.userData = res.data
    }).catch(error=>{
      console.log("information no");
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
.HospitalGuideMessage {
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



    
