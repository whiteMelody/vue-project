<template>

  <div class="wb100">

    <div class="pat20">

      <div class="wb100">

        <div class="pal20 par20 warpper-white absolute">

          <div class="wb100 h50rem bor-gray bor-solid-1b">
            <div class="wb30 h50rem fl">
              <span class="Fgreen F18rem bor-solid-1b bor-green h50rem lh50rem fl">{{arrs[ arrs.length - 5 + curIndex ]}}实时数据</span>
            </div>
            <div class="wb70 fr text-center F16rem mat10 relative">
              <div class=" relative fr">
                <template v-for="(item,index) in arrs">
                  <template v-if="index == curIndex">
                    <div class="w60rem fr warpper-green Fwhite h32rem lh32rem mar10 mal10 pointer" @click="changeIndex(index)">{{item}}</div>
                  </template>
                  <template v-else>
                    <div class="w60rem fr Fgray-3 h32rem lh32rem mar10 mal10 pointer" @click="changeIndex(index)">{{item}}</div>
                  </template>
                  <div class="w20rem fr h32rem text-center Fgray-1" v-if="index != 4">|</div>
                </template>

              </div>

            </div>
          </div>

          <div class="clear6"></div>

          <div class="wb100">
            <div class="wb16 fl relative">
              <div class="pal20 par20 lh30rem">
                <p class="F30rem Fgreen Fb">{{totalData.consumeHead}}</p>
                <div class="clear3"></div>
                <p class="Fgray-3 F16rem">划扣人头（人）</p>
              </div>
            </div>
            <div class="wb16 fl relative">
              <div class="pal20 par20 lh30rem">
                <p class="F30rem Fgreen Fb">{{totalData.consumeNumber}}</p>
                <div class="clear3"></div>
                <p class="Fgray-3 F16rem">划扣人次（次）</p>
              </div>
            </div>
            <div class="wb16 fl relative">
              <div class="pal20 par20 lh30rem">
                <p class="F30rem Fgreen Fb">{{totalData.payment | NumFormat}}</p>
                <div class="clear3"></div>
                <p class="Fgray-3 F16rem">销售业绩（元）</p>
              </div>
            </div>
            <div class="wb16 fl relative">
              <div class="pal20 par20 lh30rem">
                <p class="F30rem Fgreen Fb">{{totalData.consumePrice | NumFormat}}</p>
                <div class="clear3"></div>
                <p class="Fgray-3 F16rem">划扣业绩（元）</p>
              </div>
            </div>
            <div class="wb16 fl relative">
              <div class="pal20 par20 lh30rem">
                <p class="F30rem Fgreen Fb">{{totalData.orderCustomer}}</p>
                <div class="clear3"></div>
                <p class="Fgray-3 F16rem">成交人头（人）</p>
              </div>
            </div>
            <div class="wb16 fl relative">
              <div class="pal20 par20 lh30rem">
                <p class="F30rem Fgreen Fb">{{totalData.orderCustomerQuantity}}</p>
                <div class="clear3"></div>
                <p class="Fgray-3 F16rem">成交人次（次）</p>
              </div>
            </div>

          </div>

          <div class="clear6"></div>

        </div>

        <div class="clear3"></div>

        <div class="wb100">

          <div class="wb22 fl">
            <div class="pal20 par20 warpper-white" :style="'height: '+tableHeight+'px; min-height: 520px'">
              <div class="wb100 h50rem bor-gray bor-solid-1b">
                <div class="wb50 h50rem fl">
                  <span class="Fgreen F18rem bor-solid-1b bor-green h50rem lh50rem fl">总体数据</span>
                </div>
              </div>

              <div class="clear3"></div>

              <div class="wb100 h116rem warpper-gray-3">
                <div class="pal20 par20 lh45rem pat10 pab10 relative">
                  <p class="F16rem Fgray-3">门店数（家）</p>
                  <p class="F30rem Fgray-4">{{conceptualData.storeCount}}</p>
                  <i class="iconfont iconmendian F26rem absolute Fgray-3" style="top: 0.15rem; right: 0.15rem;"></i>
                </div>
              </div>

              <div class="clear3"></div>

              <div class="wb100 h116rem warpper-gray-3">
                <div class="pal20 par20 lh45rem pat10 pab10 relative">
                  <p class="F16rem Fgray-3">员工数（人）</p>
                  <p class="F30rem Fgray-4">{{conceptualData.memberCount}}</p>
                  <i class="iconfont iconyuangong1 F27rem absolute Fgray-3" style="top: 0.15rem; right: 0.15rem;"></i>
                </div>
              </div>
              <div class="clear3"></div>

              <div class="wb100 h116rem warpper-gray-3">
                <div class="pal20 par20 lh45rem pat10 pab10 relative">
                  <p class="F16rem Fgray-3">顾客数（人）</p>
                  <p class="F30rem Fgray-4">{{conceptualData.customerCount}}</p>
                  <i class="iconfont iconguke F30rem absolute Fgray-3" style="top: 0.15rem; right: 0.15rem;"></i>
                </div>
              </div>

              <div class="clear3"></div>

            </div>
          </div>

          <div class="wb77 fr">
            <div class="pa20 warpper-white relative" :style="'height: '+tableHeight+'px; min-height: 520px'">
              <template>
                <el-tabs v-model="panelName">
                  <el-tab-pane label="业绩排名" name="PerformanceRank">
                    <performance-rank v-on:listLoaded="getLoaded"></performance-rank>
                  </el-tab-pane>
                  <el-tab-pane label="门诊排名" name="OutpatientServiceRank">
                    <outpatient-service-rank v-on:listLoaded="getLoaded"></outpatient-service-rank>
                  </el-tab-pane>
                  <el-tab-pane label="消费次数" name="NumberOfConsumption">
                    <number-of-consumption v-on:listLoaded="getLoaded"></number-of-consumption>
                  </el-tab-pane>
                </el-tabs>
              </template>

<!--              <div class="absolute F16rem Fgray-3 h40rem lh40rem pointer" style="top:.2rem; right: .2rem;">-->
<!--                <p @click="toTotalPerformance">更多</p>-->
<!--              </div>-->

            </div>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>
<script>
  import { enterpriseOverview, managementData } from "@/chain/assets/api/StoreData/StoreData";
  import NumberOfConsumption from "./NumberOfConsumption";
  import OutpatientServiceRank from "./OutpatientServiceRank";
  import PerformanceRank from "./PerformanceRank";
  import { Dialog } from "vant";
  export default {
    name: "StoreData",
    data() {
      return {
        arrs: ['本年', '上周', '昨日', '今日', '本月'],
        curIndex: 4,
        panelName: 'PerformanceRank',
        conceptualData: {},
        totalData: {},
        endTime: '',
        startTime: '',
        tableHeight: 560,
      }
    },
    components: {
      Dialog,
      NumberOfConsumption,
      OutpatientServiceRank,
      PerformanceRank,
    },
    methods: {
      getLoaded(data){
        this.tableHeight = 205 + data * 41
      },

      // 业绩跳转
      toTotalPerformance() {
        this.$router.push({
          path: "/TotalPerformance"
        });
      },

      changeIndex(index){
        this.curIndex = index

        let date = new Date();
        if(index == 4){
          //本月
          this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-1 0:0:0`
          this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }else if(index == 3){
          //今日
          this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 0:0:0`
          this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }else if(index == 2){
          //昨日
          let count = -1
          date = new Date(date.getTime() + (86400 * 1000) * count);
          this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 0:0:0`
          this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }else if(index == 1){
          //上周
          let week = date.getDay()
          let count = 0

          if(week == 0){
            count = -5
          }else{
            count = week * -1 + 1
          }
          date = new Date(date.getTime() + (86400 * 1000) * (count - 7));
          let date2 = new Date(date.getTime() + (86400 * 1000) * 6);
          this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 0:0:0`
          this.endTime = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()} 23:59:59`
        }else if(index == 0){
          //本年
          this.startTime = `${date.getFullYear()}-1-1 0:0:0`
          this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }

        managementData({startTime: this.startTime, endTime: this.endTime }).then(res => {
          if(res.status == 0){
            this.totalData = res.data
            console.log(this.totalData)
          }
        })
      },
    },

    // 挂载结束状态
    mounted() {
      var reloadStr = sessionStorage.getItem("reload");
      if(reloadStr == null){
        setTimeout(()=>{
          window.location.reload()
        },100)
        // this.$router.go(0);
        sessionStorage.setItem("reload","true");
      }
      //查询总体数据
      enterpriseOverview().then(res => {
        if(res.status == 0){
          this.conceptualData = res.data
        }
      })

      this.changeIndex(4)

    },
    // 更新前状态
    beforeUpdate() {
     
    },
  };
</script>
<style lang="scss" scoped>
  .h116rem{ height: 1.16rem;}
  .w400rem{ width: 4rem;}
</style>


    
