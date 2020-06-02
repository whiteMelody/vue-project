<template>
  <div class="CounselingMessage">
    <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
          
            <el-form-item label>
              <el-date-picker
                v-model="daterangeTimer"
                type="daterange"
                :clearable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
            </el-form-item>
       
        </el-form>

        <el-table slot="list" :data="demoList" border>
          <el-table-column align="left" label="序号" width="50px">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column prop="customer_status" align="center" label="到诊状态">
            <template slot-scope="scope">{{ scope.row.customer_status}}</template>
          </el-table-column>

          <el-table-column prop="orders_status" align="center" label="支付状态">
            <template slot-scope="scope">
              <span :class="scope.row.orders_status == '已支付' ? 'status_ok' : 'status_no'">{{ scope.row.orders_status}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="code" align="center" label="订单号">
            <template slot-scope="scope">{{ scope.row.code}}</template>
          </el-table-column>

          <el-table-column prop="trading_time" align="center" label="消费日期" width="150px">
            <template slot-scope="scope">{{ scope.row.trading_time}}</template>
          </el-table-column>

          <el-table-column prop="items_name" align="center" label="项目">
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
import { informationConsultationList } from "@/chain/assets/api/customerDetails/customerDetails";
export default {
  name: "CounselingMessage",
  data() {
    return {
      userId:'',
      daterangeTimer:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
      condition: {
        startTime:this.$base.getDateScope(0).startTime,
        endTime: this.$base.getDateScope(0).endTime,
        id:this.$route.query.id,
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: informationConsultationList, // 分页查询api接口
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
      console.log(data)
      // this.info = data.count
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
    this.userId = this.$route.query.id;
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
.CounselingMessage {
  background: #fff;
  padding: 20px;
  .status_no{
    display: block;
    background:#ED969C; 
    width: 70px;
    margin: 0 auto;
    color: #fff;
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



    
