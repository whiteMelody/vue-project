<template>
  <div class="MonthlyDataDetails" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>月度数据明细</header>
    <div class="clear4"></div>

     <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">

                    <el-form-item label>
                      <el-select v-model="condition.time" placeholder="选择月份" readonly clearable>
                        <el-option
                          v-for="item in timeList"
                          :key="item.time"
                          :label="item.time"
                          :value="item.time"
                        ></el-option>
                      </el-select>
                    </el-form-item>

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                </el-form>
                
                <div class="market_total">
                  <div>合计</div>
                  <em></em>
                  <ul>
                    <li>
                      <p>预约人次</p>
                      <span>{{info.appointment_number}}</span>
                    </li>
                    <li>
                      <p>到店人次</p>
                      <span>{{info.appointment_triage}}</span>
                    </li>
                    <li>
                      <p>销售业绩（元）</p>
                      <span>{{info.orders_achievement | _filterNumFormat}}</span>
                    </li>
                    <li>
                      <p>成交人头（人）</p>
                      <span>{{info.orders_head}}</span>
                    </li>
                    <li>
                      <p>成交人次（次）</p>
                      <span>{{info.orders_number}}</span>
                    </li>
                    <li>
                      <p>划扣业绩（元）</p>
                      <span>{{info.consume_achievement | _filterNumFormat }}</span>
                    </li>
                    <li>
                      <p>划扣人头（人）</p>
                      <span>{{info.consume_head}}</span>
                    </li>
                    <li>
                      <p>划扣人次（次）</p>
                      <span>{{info.consume_number}}</span>
                    </li>
                  </ul>
                </div>

                <div class="clear4"></div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch"  :isPaging="true" :isAutoLoad="false" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList" stripe border>
                        <el-table-column prop="time" align="center" label="日期">
                            <template slot-scope="scope">{{ scope.row.time}}</template>
                        </el-table-column>
                        <el-table-column prop="appointment_number" align="center" label="预约人次">
                            <template slot-scope="scope">{{ scope.row.appointment_number}}</template>
                        </el-table-column>
                        <el-table-column prop="appointment_triage" align="center" label="到店人次">
                            <template slot-scope="scope">{{ scope.row.appointment_triage}}</template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="center" label="销售业绩（元）">
                            <template slot-scope="scope">{{ scope.row.orders_achievement | _filterNumFormat}}</template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="center" label="成交人头（人）">
                            <template slot-scope="scope">{{ scope.row.orders_head}}</template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="center" label="成交人次（次）">
                            <template slot-scope="scope">{{ scope.row.orders_number}}</template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="center" label="划扣业绩（元）">
                            <template slot-scope="scope">{{ scope.row.consume_achievement | _filterNumFormat}}</template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="center" label="划扣人头（人）">
                            <template slot-scope="scope">{{ scope.row.consume_head}}</template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="center" label="划扣人次（次）">
                            <template slot-scope="scope">{{ scope.row.consume_number}}</template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="center" label="销售业绩日环比" width="150px">
                            <template slot-scope="scope">{{ scope.row.orders_ratio}}</template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="center" label="划扣业绩日环比" width="150px">
                            <template slot-scope="scope">{{ scope.row.consume_ratio}}</template>
                        </el-table-column>

                    </el-table>
                </base-list>
            </div>

            <div class="clear0"></div>

        </div>

  </div>
</template>
<script>
import { MonthlyDataDel,getTargetList } from "@/chain/assets/api/shopData/shopData";
export default {
  name: "MonthlyDataDetails",
  data() {
    return {
      boxMaxHeight:"",
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: MonthlyDataDel, // 分页查询api接口
      info: {},
      timeList:[]
    };
  },
  components: {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    getLoaded(data){
        this.info = data.count;
        this.demoList = data.list;
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
    this.condition.s_id = this.$route.query.shopId;
    getTargetList({s_id:this.condition.s_id}).then(res => {
      this.timeList = res.data.total.date;
      this.condition.time = res.data.total.date[0].time;
      this.loadData();
    });
  },
  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {},

  // 侦听器
  watch: {},
};
</script>

<style lang="scss" scoped>
.MonthlyDataDetails {
  margin: 0.2rem 0;
  padding: 0 0.2rem;
  background-color: #fff;

  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 0.16rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #e5e5e5;
  }
  
  .market_total {
    display: flex;
    align-items: center;
    background: #FFEAEB;
    div {
      width: 200px;
      text-align: center;
      // color: #333333;
      font-size: 16px;
    }
    em {
      width: 1px;
      height: 120px;
      background: #EC414D;
      margin: 0.3rem 0;
    }
    ul {
      display: flex;
      padding-left: 0.5rem;
      flex: 1;
      flex-wrap: wrap;
      li {
        width: 20%;
        margin-bottom: 0.2rem;

        p {
          font-size: 14px;
          color: #999;
          padding-bottom: 0.1rem;
        }
        span {
          font-size: 20px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
      }
    }
  }
}
</style>


    
