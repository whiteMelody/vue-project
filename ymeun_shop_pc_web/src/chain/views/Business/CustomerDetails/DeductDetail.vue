<template>
  <div class="DeductDetail">
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

          <el-table-column prop="time" align="center" label="划扣时间">
            <template slot-scope="scope">{{ scope.row.time | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column prop="advName" align="center" :label="`${$store.getters.roleName.technician}/${$store.getters.roleName.adviser}`">
            <template slot-scope="scope">{{ scope.row.advName}}</template>
          </el-table-column>

          <el-table-column prop="item" align="center" label="项目">
            <template slot-scope="scope">
              <p v-html="scope.row.item"></p>
            </template>
          </el-table-column>

          <el-table-column prop="number" align="center" label="划扣次数（次）">
            <template slot-scope="scope">
              <p v-html="scope.row.number"></p>
            </template>
          </el-table-column>

          <el-table-column prop="price" align="center" label="划扣金额（元）">
            <template slot-scope="scope">
              <p v-html="scope.row.price"></p>
            </template>
          </el-table-column>

          <el-table-column prop="status" align="center" label="状态">
            <template slot-scope="scope">
              <p v-html="scope.row.status"></p>
            </template>
          </el-table-column>

        </el-table>
      </base-list>
  </div>
</template>
<script>
import { informationConsumeDetailedList , informationConsume } from "@/chain/assets/api/customerDetails/customerDetails";
export default {
  name: "DeductDetail",
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
      pageSearch: informationConsumeDetailedList, // 分页查询api接口
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
.DeductDetail {
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



    
