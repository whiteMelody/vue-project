<template>
  <div class="DeductNews">
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
          <p class="fc-gray2 h20px lh20px">划扣次数（次）</p>
          <div class="clear2"></div>
          <p class="fc-gray3 f20px h40px lh40px">{{userData.select_consume_number}}</p>
        </div>
        <div class="clear0"></div>
      </div>
      <div class="clear4"></div>


      <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
        <el-table slot="list" :data="demoList" border>

          <el-table-column prop="customer_status" align="center" label="到诊状态">
            <template slot-scope="scope">{{ scope.row.customer_status}}</template>
          </el-table-column>

          <el-table-column prop="code" align="center" label="订单号">
            <template slot-scope="scope">{{ scope.row.code}}</template>
          </el-table-column>

          <el-table-column prop="trading_time" align="center" label="付款日期" width="150px">
            <template slot-scope="scope">{{ scope.row.trading_time | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column prop="items_name" align="center" label="项目">
            <template slot-scope="scope">
              <p v-html="scope.row.items_name"></p>
            </template>
          </el-table-column>

          <el-table-column prop="consume_number" align="center" label="扣划次数（次）">
            <template slot-scope="scope">{{ scope.row.consume_number}}</template>
          </el-table-column>

          <el-table-column prop="surplus_number" align="center" label="剩余次数（次）">
            <template slot-scope="scope">{{ scope.row.surplus_number}}</template>
          </el-table-column>

          <el-table-column prop="technicianName" align="center" :label="`${$store.getters.roleName.technician}/${$store.getters.roleName.adviser}`">
            <template slot-scope="scope">{{ scope.row.technicianName}}</template>
          </el-table-column>

          <el-table-column prop="consume_money" align="center" label="扣划金额（元）">
            <template slot-scope="scope">{{ scope.row.consume_money | NumFormat}}</template>
          </el-table-column>

          <el-table-column prop="statusName" align="center" label="状态">
            <template slot-scope="scope">{{ scope.row.statusName}}</template>
          </el-table-column>


        </el-table>
      </base-list>
  </div>
</template>
<script>
import { informationConsumeList , informationConsume } from "@/chain/assets/api/customerDetails/customerDetails";
export default {
  name: "DeductNews",
  data() {
    return {
      userData:'',
      info:{},
      daterangeTimer:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
      condition: {
        startTime:this.$base.getDateScope(0).startTime,
        endTime: this.$base.getDateScope(0).endTime,
        customerId:this.$route.query.id,
        id:this.$route.query.id,
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: informationConsumeList, // 分页查询api接口
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
      this.informationConsumeFn()
    },
    informationConsumeFn(){
      informationConsume(this.condition).then(res => {
        this.userData = res.data
      }).catch(error=>{
        console.log("informationConsume no");
      })
    }
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
    this.informationConsumeFn()
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
.DeductNews {
  background: #fff;
  padding:0 20px 20px;
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



    
