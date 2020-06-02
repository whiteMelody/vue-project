<template>
  <div class="wb100 f14px" :style="'min-height: '+boxMaxHeight+'px;'">
    <div class="wb100 bg-white">
      <template v-for="(item, index) in arrs">
        <div class="tabIndex h50px lh50px fl text-center pointer" :class="tabIndex == index ? 'bd-t2 bd-gray4 fc-gray4 bg-white1' : 'fc-gray3'" @click="tabIndex = index">
          {{item}}
        </div>
      </template>
      <div class="clear0"></div>
    </div>

    <div class="wb100 f14px bg-white1">
      <div class="pal24 par24 pat20 pab20">
        <div class="pal19 par19 bg-white">
<!--
          <template v-if="allowed == 1">
            <template v-if="tabIndex == 0">
              <sales-project></sales-project>
            </template>
            <template v-if="tabIndex == 1">
              <project-cost></project-cost>
            </template>
            <template v-if="tabIndex == 2">
              <channel-statistics></channel-statistics>
            </template>
            <template v-if="tabIndex == 3">
              <sales-performance></sales-performance>
            </template>
            <template v-if="tabIndex == 4">
              <matting-performance></matting-performance>
            </template>
            <template v-if="tabIndex == 5">
              <consumption-performance></consumption-performance>
            </template>
            <template v-if="tabIndex == 6">
              <shop-data></shop-data>
            </template>
             <template v-if="tabIndex == 7">
              <target-comparison></target-comparison>
            </template> 
            <template v-if="tabIndex == 7">
              <counselor-target></counselor-target>
            </template>
            <template v-if="tabIndex == 8">
              <cosmetologist-target></cosmetologist-target>
            </template>
            <template v-if="tabIndex == 9">
              <cashier-details></cashier-details>
            </template>
            <template v-if="tabIndex == 10">
              <cooperative-enterprise></cooperative-enterprise>
            </template>
          </template>

           <template v-else>
            <template v-if="tabIndex == 0">
              <sales-performance></sales-performance>
            </template>
            <template v-if="tabIndex == 1">
              <matting-performance></matting-performance>
            </template>
            <template v-if="tabIndex == 2">
              <consumption-performance></consumption-performance>
            </template>
            <template v-if="tabIndex == 3">
              <cashier-details></cashier-details>
            </template>
          </template>

          <template v-if="allowed == 1">
            <template v-if="tabIndex == 0">
              <sales-project></sales-project>
            </template>
            <template v-if="tabIndex == 1">
              <project-cost></project-cost>
            </template>
            <template v-if="tabIndex == 2">
              <channel-statistics></channel-statistics>
            </template>
            <template v-if="tabIndex == 3">
              <Market></Market>
            </template>
            <template v-if="tabIndex == 4">
              <consumption-performance></consumption-performance>
            </template>
            <template v-if="tabIndex == 5">
              <shop-data></shop-data>
            </template>
            <template v-if="tabIndex == 6">
              <counselor-target></counselor-target>
            </template>
            <template v-if="tabIndex == 7">
              <cosmetologist-target></cosmetologist-target>
            </template>
            <template v-if="tabIndex == 8">
              <cashier-details></cashier-details>
            </template>
            <template v-if="tabIndex == 9">
              <cooperative-enterprise></cooperative-enterprise>
            </template>
            <template v-if="tabIndex == 10">
              <Report-form-cureRoom></Report-form-cureRoom>
            </template>
            <template v-if="tabIndex == 11">
              <new-client></new-client>
            </template>
          </template>
          <template v-else>
            <template v-if="tabIndex == 0">
              <Market></Market>
            </template>
            <template v-if="tabIndex == 1">
              <consumption-performance></consumption-performance>
            </template>
            <template v-if="tabIndex == 2">
              <cashier-details></cashier-details>
            </template>
            <template v-if="tabIndex == 3">
              <Report-form-cureRoom></Report-form-cureRoom>
            </template>
            <template v-if="tabIndex == 4">
              <new-client></new-client>
            </template>
          </template>
           -->
           <template v-if="allowed == 1">
            <template v-if="tabIndex == 0">
              <sales-project></sales-project>
            </template>
            <template v-if="tabIndex == 1">
              <project-cost></project-cost>
            </template>
            <template v-if="tabIndex == 2">
              <channel-statistics></channel-statistics>
            </template>
            <template v-if="tabIndex == 3">
              <Market></Market>
            </template>
            <template v-if="tabIndex == 4">
              <consumption-performance></consumption-performance>
            </template>
            <template v-if="tabIndex == 5">
              <shop-data></shop-data>
            </template>
            <template v-if="tabIndex == 6">
              <counselor-target></counselor-target>
            </template>
            <template v-if="tabIndex == 7">
              <cosmetologist-target></cosmetologist-target>
            </template>
            <template v-if="tabIndex == 8">
              <cashier-details></cashier-details>
            </template>
            <template v-if="tabIndex == 9">
              <cooperative-enterprise></cooperative-enterprise>
            </template>
            <template v-if="tabIndex == 10">
              <Report-form-cureRoom></Report-form-cureRoom>
            </template>
            <template v-if="tabIndex == 11">
              <new-client></new-client>
            </template>
            <template v-if="tabIndex == 12">
              <introducer></introducer>
            </template>
          </template>
          <template v-else>
            <template v-if="tabIndex == 0">
              <sales-project></sales-project>
            </template>
            <template v-if="tabIndex == 1">
              <project-cost></project-cost>
            </template>
            <template v-if="tabIndex == 2">
              <channel-statistics></channel-statistics>
            </template>
            <template v-if="tabIndex == 3">
              <Market></Market>
            </template>
            <template v-if="tabIndex == 4">
              <cashier-details></cashier-details>
            </template>
            <template v-if="tabIndex == 5">
              <Report-form-cureRoom></Report-form-cureRoom>
            </template>
           
          </template>

          <div class="clear4"></div>
        </div>
      </div>
    </div>

    <div class="clear0"></div>

  </div>
</template>

<script>

  import { getProgramList } from "@/shop/assets/api/common/common"

  import SalesProject from './SalesProject'
  import ProjectCost from './ProjectCost'
  import ChannelStatistics from './ChannelStatistics'
  import Market from './Market'
  // import SalesPerformance from './SalesPerformance'
  // import MattingPerformance from './MattingPerformance'
  import ConsumptionPerformance from './ConsumptionPerformance'
  import ShopData from './ShopData'
  // import TargetComparison from './TargetComparison'
  import CounselorTarget from './CounselorTarget'
  import CosmetologistTarget from './CosmetologistTarget'
  import CashierDetails from './CashierDetails'
  import CooperativeEnterprise from './CooperativeEnterprise'
  import ReportFormCureRoom from './ReportFormCureRoom.vue'
  import NewClient from './NewClient.vue'
  import Introducer from './Introducer.vue'

  export default {
    name: "OperationStatement",
    components: {
      SalesProject, 
      ProjectCost, 
      ChannelStatistics, 
      Market,
      // SalesPerformance, 
      // MattingPerformance, 
      ConsumptionPerformance, 
      ShopData, 
      CounselorTarget,  
      CosmetologistTarget, 
      CashierDetails,
      CooperativeEnterprise,
      ReportFormCureRoom,
      NewClient,
      Introducer
    },
    data() {
      return {
        allowed:0,
      boxMaxHeight:"",
        arrs: [],
        tabIndex: 0,
      }
    },
    
    // 挂载结束状态
    mounted() {
      this.boxMaxHeight = window.innerHeight - 100;
      // compose.id  2单店 1连锁
      getProgramList().then(res=>{
        if(res.status == 0){
          if(res.data.list.jybb.allowed == 0){
            this.allowed = 0
            // this.arrs = [ '顾问销售业绩', '美容师销售业绩', '划扣业绩' , '收银明细' , '新客统计']
            // this.arrs = ['销售业绩', '划扣业绩' , '收银明细', '治疗间', '新客统计']
            this.arrs = ['销售项目', '项目划扣' , '渠道统计', '销售业绩', '收银明细', '治疗间']
          }else{
            this.allowed = 1
            // this.arrs = ['销售项目', '项目划扣', '渠道统计', '顾问销售业绩', '美容师销售业绩', '划扣业绩' , '门店数据', '顾问目标' , '美容师目标' , '收银明细', '合作企业']
            this.arrs = ['销售项目', '项目划扣', '渠道统计', '销售业绩', '划扣业绩' , '门店数据', `${$store.getters.roleName.adviser}目标` , `${$store.getters.roleName.technician}目标` , '收银明细', '合作企业', '治疗间', '新客统计', '转介绍统计']
            //  , '目标环比' 
            // TargetComparison,  
          }
        }else{
          this.allowed = 0
          // this.arrs = [ '顾问销售业绩', '美容师销售业绩', '划扣业绩' , '收银明细']
          // this.arrs = ['销售业绩', '划扣业绩' , '收银明细', '治疗间', '新客统计']
          this.arrs = ['销售项目', '项目划扣' , '渠道统计', '销售业绩', '收银明细', '治疗间']
        }
      })

    },
    methods: {

    },
    watch: {

    }

  }

</script>

<style scoped lang="scss">
  .tabIndex {
    padding: 0 .22rem;
  }
  .is-selected {
    color: #1989FA;
  }
</style>
