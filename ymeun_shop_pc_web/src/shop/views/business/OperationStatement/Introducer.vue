<template>
  <div class="Introducer" :style="'min-height: '+boxMaxHeight+'px;'">

      <div class="clear3"></div>

      <p class="lh20px h20px">
          <span class="fl f16px fc-gray4">转介绍统计</span>
      </p>

    <div class="box">
      
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
    
                <el-form-item>
                  <el-select v-model="condition.adviserId" :placeholder="'选择'+$store.getters.roleName.adviser" readonly="" clearable>
                    <el-option :key="''" :value="''" :label="'全部'+$store.getters.roleName.adviser"></el-option>
                    <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="condition.shopStatus" placeholder="选择到诊状态" readonly clearable>
                    <el-option :label="'全部到店状态'" value="-1"></el-option>
                    <el-option v-for="[key,val] in _dictJieshaodaodianType" :key="key" :label="val" :value="key"></el-option>
                  </el-select>
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
                 <el-form-item>
                  <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button>
                 </el-form-item>
  
          </el-form>

          <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

            <div class="wb18 fl h40px lh40px bd-gray bd-r1 mat15 f16px">
              合计
            </div>

            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">介绍人(人)</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{info.fistGradeCount}}</p>
            </div>
            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">介绍客户(人)</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{info.subordinateCount}}</p>
            </div>
            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">实际消费总金额(元)</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{info.totalPayment | _filterNumFormat}}</p>
            </div>
            <div class="clear0"></div>

          </div>


        <div class="clear4"></div>

        <base-list ref="demoTable" :condition="condition"
                  :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

          <el-table slot="list" :data="demoList" stripe border>

              <el-table-column prop="introducer" align="center" label="介绍人">
                  <template slot-scope="scope">
                  {{scope.row.introducer.name}}
                  </template>
              </el-table-column>

            <el-table-column prop="name" align="center" label="介绍客户">
              <template slot-scope="scope">
                  {{scope.row.name}}
              </template>
            </el-table-column>

            <el-table-column prop="mobile" align="center" label="介绍客户电话">
              <template slot-scope="scope">
                {{ scope.row.mobile}}
              </template>
            </el-table-column>

            <el-table-column prop="store_time" align="center" label="介绍客户首次到店日期">
              <template slot-scope="scope">
                {{ scope.row.store_time | _endTimeFormat }}
              </template>
            </el-table-column>

            <el-table-column prop="firstPayment" align="center" label="介绍客户首次消费金额">
              <template slot-scope="scope">
                {{ scope.row.firstPayment | _filterNumFormat}}
              </template>
            </el-table-column>

            <el-table-column prop="adviser" align="center" :label="'所属'+$store.getters.roleName.adviser">
              <template slot-scope="scope">
                {{ scope.row.adviser.name }}
              </template>
            </el-table-column>

            <el-table-column align="afterPayment" label="后续累计消费金额">
                <template slot-scope="scope">
                  {{ scope.row.afterPayment | _filterNumFormat }}
                </template>
            </el-table-column>

          </el-table>
        </base-list>

  

    </div>
  </div>
</template>
<script>
import { introducerAnalysis } from "@/shop/assets/api/manage/statistics"
export default {
  name: "Introducer",
  data() {
    return {
      boxMaxHeight:"",
      info:{},
      condition: {
        startTime: this.$base.getDateScope(0).startTime,
        endTime: this.$base.getDateScope(0).endTime,
      }, // 查询条件
      demoList: [],                      // table数组
      pageSearch: introducerAnalysis,       // 分页查询api接口
      daterangeTimer:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
    };
  },

  watch: {
    'daterangeTimer'(newData,oldData){
      this.condition.startTime = this.$base.dateTimeToDate(newData[0],"startTime")
      this.condition.endTime = this.$base.dateTimeToDate(newData[1],"endTime")
    },
  },
  components: {},
  methods: {

   

   
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData()
    },
    //列表外赋值
    getLoaded(data){
      // this.userData = data.totalData;
      this.info.subordinateCount = data.subordinateCount;
      this.info.fistGradeCount = data.fistGradeCount;
      this.info.totalPayment = data.totalPayment;

      this.demoList = data.list;
    },

    //导出Excel
    deriveExcel() {
      let params = this.$base.copySearchConditions(this.condition);
      let url = ''
      if(window.location.hostname == this.$base.getStoreHost()){
        url = `https://${location.hostname}/post/export/getCustomerIntroducerAnalysisExcel?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      }else{
        url = `http://${location.hostname}:${location.port}/post/export/getCustomerIntroducerAnalysisExcel?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      }

      url += `&startTime=${params.startTime}`;
      url += `&endTime=${params.endTime}`;
      if (params.adviserId) {
        url += `&adviserId=${params.adviserId}`;
      }
      if (params.shopStatus) {
        url += `&shopStatus=${params.shopStatus}`;
      }
      window.location.href = url;
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
.Introducer {
  // margin: 24px 20px;
  background-color: #ffffff;
  // padding: 0 20px;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    a{
      font-size: 16px;
      font-weight: 500;
      color: #333333;
    }
  }
  .box {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom:20px; 
  }
}
</style>


    
