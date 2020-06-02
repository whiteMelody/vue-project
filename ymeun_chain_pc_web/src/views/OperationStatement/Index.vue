<template>
  <div class="bg-white pal20 par20 mat20 f14px">
    <div class="wb100 bg-white">
      <template v-for="(item, index) in arrs">
        <div class="tabIndex h50px lh50px fl text-center pointer" :class="tabIndex == index ? 'bd-t2 bd-gray4 fc-gray4 bg-white1' : 'fc-gray3'" @click="tabIndex = index">
          {{item}}
        </div>
      </template>
      <div class="clear0"></div>
    </div>

    <div class="wb100 f14px " v-if="allowed == 1">
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
        <consumption-performance></consumption-performance>
      </template>
      <template v-if="tabIndex == 5">
        <shop-data></shop-data>
      </template>
      <template v-if="tabIndex == 6">
        <cashier-details></cashier-details>
      </template>
      <template v-if="tabIndex == 7">
        <cooperative-enterprise></cooperative-enterprise>
      </template>
      <template v-if="tabIndex == 8">
        <performance></performance>
      </template>
      <template v-if="tabIndex == 9">
        <marketing></marketing>
      </template>
      <div class="clear4"></div>
    </div>

    <div class="wb100 f14px " v-else>
      <template v-if="tabIndex == 0">
        <sales-performance></sales-performance>
      </template>
      <template v-if="tabIndex == 1">
        <consumption-performance></consumption-performance>
      </template>
      <template v-if="tabIndex == 2">
        <shop-data></shop-data>
      </template>
      <template v-if="tabIndex == 3">
        <cashier-details></cashier-details>
      </template>
      <template v-if="tabIndex == 4">
        <marketing></marketing>
      </template>

      <div class="clear4"></div>
    </div>

    <div class="clear0"></div>

  </div>
</template>

<script>

  import { getProgramList } from "@/assets/api/common/common"

  import SalesProject from './SalesProject'
  import ProjectCost from './ProjectCost'
  import ChannelStatistics from './ChannelStatistics'
  import SalesPerformance from './SalesPerformance'
  import ConsumptionPerformance from './ConsumptionPerformance'
  import ShopData from './ShopData'
  import CashierDetails from './CashierDetails'
  import CooperativeEnterprise from './CooperativeEnterprise'
  import Performance from './Performance'
  import Marketing from './Marketing'

  export default {
    name: "OperationStatement",
    components: {
      SalesProject, 
      ProjectCost, 
      ChannelStatistics, 
      SalesPerformance,
      ConsumptionPerformance,
      ShopData,
      CashierDetails,
      CooperativeEnterprise,
      Performance,
      Marketing
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
      
      getProgramList().then(res=>{
        if(res.status == 0){
          if(res.data.list.jybb.allowed == 0){
            this.allowed = 0
            this.arrs = [ '销售业绩','划扣业绩' ,'门店数据' , '收银明细' , '营销中心' ]
          }else{
            this.allowed = 1
            this.arrs = ['销售项目', '项目划扣', '渠道统计', '销售业绩','划扣业绩' ,'门店数据' , '收银明细', '合作企业', '不计入业绩转化表' , '营销中心']
          }
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
