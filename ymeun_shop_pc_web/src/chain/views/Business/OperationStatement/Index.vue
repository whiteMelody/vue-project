<template>
  <div>
    <div class="wb100 bg-white f14px pointer relative">
      <template v-for="(item, index) in arrs">
        <div class="h40px lh40px fl text-center" :class="curCode == item.code ? ' fc-gray4 bg-white1' : 'fc-gray3'" @click="curCode = item.code">
          <div class="wb100" :class="curCode == item.code ? 'bd-t2 bd-gray4' : ''"></div>
          <template v-if="index == arrs.length -1">
            <p class="fl h14px lh14px pal20 par20" :class="curCode == item.code ? 'mat12' : 'mat13'">{{item.name}}</p>
          </template>
          <template v-else>
            <p class="fl h14px lh14px pal20 par20" :class="curCode == item.code ? 'mat12' : 'mat13 bd-gray bd-r1'">{{item.name}}</p>
          </template>
        </div>
      </template>
      <div class="clear0 bd-gray bd-b1 absolute" v-if="hasTowLine" style="top:40px; left: 0; z-index: 1;"></div>
      <div class="clear0"></div>
    </div>

  <div class="ma18">
      <div class="wb100 pal20 f14px par20 bg-white mat20">
        <sales-project v-if="curCode == 'xsxmbb'"></sales-project>
        <project-cost v-else-if="curCode == 'xmhkbb'"></project-cost>
        <channel-statistics v-else-if="curCode == 'qdtjbb'"></channel-statistics>
        <sales-performance v-else-if="curCode == 'xsyjbb'"></sales-performance>
        <consumption-performance v-else-if="curCode == 'hkyjbb'"></consumption-performance>
        <shop-data v-else-if="curCode == 'mdsj'"></shop-data>
        <cashier-details v-else-if="curCode == 'shouyinmingxi'"></cashier-details>
        <cooperative-enterprise v-else-if="curCode == 'hezuoqiyebaobiao'"></cooperative-enterprise>
        <performance v-else-if="curCode == 'bjryjzhbb'"></performance>
        <marketing v-else-if="curCode == 'yxzxbb'"></marketing>
        <new-client v-else-if="curCode == 'xinketongji'"></new-client>
        <ExploitStatementHome v-else-if="curCode == 'kfrybb'"></ExploitStatementHome>
        <SedimentClient v-else-if="curCode == 'chendiankehu'"></SedimentClient>
        <div class="clear4"></div>
      </div>
  </div>

    <div class="clear0"></div>

  </div>
</template>

<script>

  import { getProgramList } from "@/chain/assets/api/common/common"

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
  import NewClient from './NewClient'
  import ExploitStatementHome from './ExploitStatementHome'
  import SedimentClient from './SedimentClient'

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
      Marketing,
      NewClient,
      ExploitStatementHome,
      SedimentClient
    },
    data() {
      return {
        allowed:0,
        boxMaxHeight:"",
        arrs: [],
        curCode: '',
        hasTowLine: false,
      }
    },
    
    // 挂载结束状态
    mounted() {
      this.boxMaxHeight = window.innerHeight - 100;
      
      getProgramList().then(res=>{
        if(res.status == 0){
          if(res.data.list.xsxmbb.allowed == 1){
              this.arrs.push({
                  name: '销售项目',
                  code: 'xsxmbb',
              })
          }
          if(res.data.list.xmhkbb.allowed == 1){
              this.arrs.push({
                  name: '项目划扣',
                  code: 'xmhkbb',
              })
          }
          if(res.data.list.qdtjbb.allowed == 1){
              this.arrs.push({
                  name: '渠道统计',
                  code: 'qdtjbb',
              })
          }
          if(res.data.list.xsyjbb.allowed == 1){
              this.arrs.push({
                  name: '销售业绩',
                  code: 'xsyjbb',
              })
          }
          if(res.data.list.hkyjbb.allowed == 1){
              this.arrs.push({
                  name: '划扣业绩',
                  code: 'hkyjbb',
              })
          }
          if(res.data.list.mdsj.allowed == 1){
              this.arrs.push({
                  name: '门店数据',
                  code: 'mdsj',
              })
          }
          if(res.data.list.shouyinmingxi.allowed == 1){
              this.arrs.push({
                  name: '收银明细',
                  code: 'shouyinmingxi',
              })
          }
          if(res.data.list.hezuoqiyebaobiao.allowed == 1){
              this.arrs.push({
                  name: '合作企业',
                  code: 'hezuoqiyebaobiao',
              })
          }
          if(res.data.list.bjryjzhbb.allowed == 1){
              this.arrs.push({
                  name: '不计入业绩转化表',
                  code: 'bjryjzhbb',
              })
          }
          if(res.data.list.yxzxbb.allowed == 1){
              this.arrs.push({
                  name: '营销中心',
                  code: 'yxzxbb',
              })
          }
          if(res.data.list.xinketongji.allowed == 1){
              this.arrs.push({
                  name: '新客统计',
                  code: 'xinketongji',
              })
          }
          if(res.data.list.kfrybb.allowed == 1){
              this.arrs.push({
                  name: '开发人员报表',
                  code: 'kfrybb',
              })
          }
          if(res.data.list.chendiankehu.allowed == 1){
              this.arrs.push({
                  name: '沉淀客户',
                  code: 'chendiankehu',
              })
          }

          if(this.arrs.length >0){
              this.curCode = this.arrs[0].code
          }

          let _w1 = window.innerWidth - 136

          let _w2 = 0

          for(let i=0; i< this.arrs.length; i++){
              //查询换行的位置
              _w2+= this.arrs[i].name.length * 14.25 + 40
              if(_w2 > _w1){
                  this.arrs[i].isOneLine = false
              }else{
                  this.arrs[i].isOneLine = true
              }
          }

          if(_w2 > _w1){
              this.hasTowLine = true
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

