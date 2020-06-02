<template>
  <div class="CounselorTarget wb100">
    <p class="lh50px h50px">
      <span class="fl f16px fc-gray4">{{$store.getters.roleName.adviser}}目标况表</span>
      <span class="fl mal20 f14px fc-gray3">数据每十分钟更新一次</span>
    </p>

    <div class="clear0"></div>

    <div class="wb100">

      <div class="wb100">

        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
          <el-form-item label="">
            <date-slot :dateTime.sync="dateTime"></date-slot>
          </el-form-item>

          <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
          <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
        </el-form>

        <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

          <div class="wb16 fl h40px lh40px bd-gray bd-r1 mat15">
            {{$store.getters.roleName.adviser}}目标合计
          </div>
          <div class="wb16 fl">
            <p class="fc-gray3 h20px lh20px">销售业绩（元）</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.payment | _filterNumFormat}}</p>
          </div>
          <div class="wb16 fl">
            <p class="fc-gray3 h20px lh20px">成交人头(人)</p>
            <div class="clear2"></div>
            <p class="fc-red f20px h40px lh40px">{{info.orderCustomer | _filterNumFormat}}</p>
          </div>
          <div class="wb16 fl">
            <p class="fc-gray3 h20px lh20px">成交人次(次)</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.orderCustomerQuantity | _filterNumFormat}}</p>
          </div>
          <div class="wb16 fl">
            <p class="fc-gray3 h20px lh20px">划扣人头（人）</p>
            <div class="clear2"></div>
            <p class="fc-red f20px h40px lh40px">{{info.consumeHead | _filterNumFormat}}</p>
          </div>
          <div class="wb16 fl">
            <p class="fc-gray3 h20px lh20px">划扣人次（次）</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.consumeNumber | _filterNumFormat}}</p>
          </div>

          <div class="clear0"></div>

        </div>

        <div class="clear4"></div>

        <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
          <el-table slot="list" :data="demoList" stripe border>
            
            <el-table-column prop="name" align="center" :label="$store.getters.roleName.adviser">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column prop="actual.payment" align="center" label="销售业绩">
              <template slot-scope="scope">
                {{ scope.row.actual.payment | _filterNumFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="actual.consumeHead" align="center" label="成交人头">
              <template slot-scope="scope">
                {{ scope.row.actual.orderCustomer }}
              </template>
            </el-table-column>
            <el-table-column prop="actual.consumeNumber" align="center" label="成交人次">
              <template slot-scope="scope">
                {{ scope.row.actual.orderCustomerQuantity }}
              </template>
            </el-table-column>
            <el-table-column prop="actual.consumeHead" align="center" label="划扣人头">
              <template slot-scope="scope">
                {{ scope.row.actual.consumeHead }}
              </template>
            </el-table-column>
            <el-table-column prop="actual.consumeNumber" align="center" label="划扣人次">
              <template slot-scope="scope">
                {{ scope.row.actual.consumeNumber }}
              </template>
            </el-table-column>
          </el-table>
        </base-list>
      </div>

      <div class="clear0"></div>

    </div>

  </div>
</template>

<script>

  import { getAdviserPayment } from "@/shop/assets/api/manage/statistics"
  import dateSlot from '@/shop/components/date/dateSlot'

  export default {
    name: "CounselorTarget",
    components: {
      dateSlot
    },
    data() {
      return {
        dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
        condition: {
            startTime: this.$base.getDateScope(0).startTime,
            endTime: this.$base.getDateScope(0).endTime,
        },      
        // dateTime: [],
        // condition: {}, // 查询条件
        demoList: [],                      // table数组
        pageSearch: getAdviserPayment,       // 分页查询api接口
        info:{}
      }
    },
    watch: {
      dateTime(c, o){
        this.condition.startTime = this.$base.dateTimeToDate(c[0],'startTime')
        this.condition.endTime = this.$base.dateTimeToDate(c[1],'endTime')
      }
    },
    mounted() {

    },
    methods: {

  

      loadData() {
        this.$refs.demoTable.loadData()
      },

      getLoaded(data){
        this.info = data.totalData
      },

       //导出Excel
      deriveExcel() {
        let params = this.$base.copySearchConditions(this.condition);
        let url = ''
        if(window.location.hostname == this.$base.getStoreHost()){
          url = `https://${location.hostname}/post/export/getAdviserPaymentExcel?downloadUserId=${this.$store.getters.currentUser.users_id}`;
        }else{
          url = `http://${location.hostname}:${location.port}/post/export/getAdviserPaymentExcel?downloadUserId=${this.$store.getters.currentUser.users_id}`;
        }

        url += `&startTime=${params.startTime}`;
        url += `&endTime=${params.endTime}`;
        window.location.href = url;
      },
     
  

    },
 

  }

</script>

<style scoped lang="scss">

</style>
