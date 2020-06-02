<template>
  <div class="IntroducerList ma20 pal20 par20 pab20" :style="'min-height: '+boxMaxHeight+'px;'">

      <div class="clear3"></div>

      <p class="lh20px h20px ">
          <span class="fl f16px fc-gray4">转介绍</span>
      </p>

    <div class="box bd-gray bd-t1">
      
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
    
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

          <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

            <div class="wb18 fl h40px lh40px bd-gray bd-r1 mat15 f16px">
              转介绍统计
            </div>

            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">一级客户(人)</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{info.fistGradeCount}}</p>
            </div>
            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">二级客户(人)</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{info.subordinateCount}}</p>
            </div>
            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">一级客户消费总金额(元)</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{info.fistGradePayment | _filterNumFormat}}</p>
            </div>
            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">二级客户消费总金额(元)</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{info.subordinatePayment | _filterNumFormat}}</p>
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

          <el-table slot="list" :data="demoList" stripe border
                row-key="id"
                  ref="myTable"
                  @row-click="switchExpansion"
                :tree-props="{children: 'subordinate'}"
           >

            <el-table-column prop="type" align="center" label="一级客户">
              <template slot-scope="scope" v-if="scope.row.subordinate">
                    {{scope.row.name}}
              </template>
            </el-table-column>

              <el-table-column prop="code" align="center" label="二级客户">
                  <template slot-scope="scope" v-if="!scope.row.subordinate">
                      {{scope.row.name}}
                  </template>
              </el-table-column>

            <el-table-column prop="code" align="center" label="首次到店时间">
              <template slot-scope="scope">
                  {{scope.row.store_time | _endTimeFormat}}
              </template>
            </el-table-column>

            <el-table-column prop="created_at" align="center" label="首次消费金额">
              <template slot-scope="scope">
                {{ scope.row.firstPayment | _filterNumFormat}}
              </template>
            </el-table-column>

            <el-table-column prop="channel_name" align="center" label="一级客户后续累计消费金额">
              <template slot-scope="scope" v-if="scope.row.subordinate">
                  {{scope.row.afterPayment | _filterNumFormat}}
              </template>
            </el-table-column>

            <el-table-column prop="customer_name" align="center" label="二级客户后续累计消费金额">
              <template slot-scope="scope" v-if="!scope.row.subordinate">
                  {{scope.row.afterPayment | _filterNumFormat}}
              </template>
            </el-table-column>

            <el-table-column prop="customer_tel" align="center" label="实际消费总金额">
              <template slot-scope="scope">
                {{ scope.row.actualPayment | _filterNumFormat}}
              </template>
            </el-table-column>

          </el-table>
        </base-list>

 

    </div>
  </div>
</template>
<script>
import { introducerSee } from "@/shop/assets/api/client/client"
export default {
  name: "IntroducerList",
  data() {
    return {
      boxMaxHeight:"",
      info:{},
      condition: {
        startTime: this.$base.getDateScope(0).startTime,
        endTime: this.$base.getDateScope(0).endTime,
        customerId : this.id,

      }, // 查询条件
      demoList: [],                      // table数组
      pageSearch: introducerSee,       // 分页查询api接口
      daterangeTimer:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
      // daterangeTimer:[],

    };
  },
  props:['id'],
  watch: {
    'daterangeTimer'(newData,oldData){
      this.condition.startTime = this.$base.dateTimeToDate(newData[0],"startTime")
      this.condition.endTime = this.$base.dateTimeToDate(newData[1],"endTime")
    },
  },
  components: {},
  methods: {

      switchExpansion(row) {
          if(row.subordinate){
              if(row.subordinate.length)
                  this.$refs.myTable.toggleRowExpansion(row)
          }
      },

    //重新加载
    loadData() {
      this.$refs.demoTable.loadData()
    },
    //列表外赋值
    getLoaded(data){
      // this.userData = data.totalData;
      this.info.subordinateCount = data.subordinateCount;
      this.info.fistGradeCount = data.fistGradeCount;
      this.info.subordinatePayment = data.subordinatePayment;
      this.info.fistGradePayment = data.fistGradePayment;
      this.info.totalPayment = data.totalPayment;

      this.demoList = data.list;
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
      // this.loadData()

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
.IntroducerList {
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
    margin-top: 14px;
    margin-bottom: 40px;
    padding-bottom:20px; 
    padding-top:20px; 
  }
}
</style>


<style>
.IntroducerList .gaipai span{
  cursor: pointer;
}
.IntroducerList .el-table tr{
  cursor: pointer;
}
</style>

    
