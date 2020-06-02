<template>
  <div class="wb100 f14px" :style="'min-height: '+boxMaxHeight+'px;'">
    <div class="wb100 bg-white relative pointer">

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

    <div class="wb100 f14px bg-white1">
      <div class="pal24 par24 pat20 pab20">
        <div class="pal19 par19 bg-white">

          <sales-project v-if="curCode == 'xsxmbb'"></sales-project>
          <project-cost v-if="curCode == 'xmhkbb'"></project-cost>
          <channel-statistics v-if="curCode == 'qdtjbb'"></channel-statistics>
          <Market v-if="curCode == 'xsyjbb'"></Market>
          <consumption-performance v-if="curCode == 'hkyjbb'"></consumption-performance>
          <shop-data v-if="curCode == 'mdsj'"></shop-data>
          <counselor-target v-if="curCode == 'gwmb'"></counselor-target>
          <cosmetologist-target v-if="curCode == 'mrsmb'"></cosmetologist-target>
          <cashier-details v-if="curCode == 'shouyinmingxi'"></cashier-details>
          <cooperative-enterprise v-if="curCode == 'hezuoqiyebaobiao'"></cooperative-enterprise>
          <report-form-cureRoom v-if="curCode == 'zhiliaojian'"></report-form-cureRoom>
          <new-client v-if="curCode == 'xinketongji'"></new-client>
          <introducer v-if="curCode == 'zjstjbb'"></introducer>
          <ExploitStatementShop v-if="curCode == 'kfrybb'"></ExploitStatementShop>

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
  import ExploitStatementShop from './ExploitStatementShop.vue'

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
      Introducer,
      ExploitStatementShop
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
          
          if(res.data.list.gwmb.allowed == 1){
              this.arrs.push({
                  name: this.$store.getters.roleName.adviser + '目标',
                  code: 'gwmb',
              })
          }
          
          if(res.data.list.mrsmb.allowed == 1){
              this.arrs.push({
                  name: this.$store.getters.roleName.technician + '目标',
                  code: 'mrsmb',
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
                  name: '合作企业列表',
                  code: 'hezuoqiyebaobiao',
              })
          }
          
          if(res.data.list.zhiliaojian.allowed == 1){
              this.arrs.push({
                  name: '治疗间',
                  code: 'zhiliaojian',
              })
          }

          if(res.data.list.xinketongji.allowed == 1){
              this.arrs.push({
                  name: '新客统计',
                  code: 'xinketongji',
              })
          }
          
          if(res.data.list.zjstjbb.allowed == 1){
              this.arrs.push({
                  name: '转介绍统计',
                  code: 'zjstjbb',
              })
          }
          
          if(res.data.list.kfrybb.allowed == 1){
              this.arrs.push({
                  name: '开发人员报表',
                  code: 'kfrybb',
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
