<template>

  <div class="wb100">

    <div class=" bg-white" :style="'margin-left: -.2rem; padding-left: .2rem; padding-right: 1.6rem; width: '+ width +'px '">

      <div class="wb100">
        <div class="wb30 h50px lh50px fl f18px">
          {{arrs[ arrs.length - 5 + curIndex ]}}数据
        </div>
        <div class="wb70 fr text-center F16 mat10 pointer">
          <template v-for="(item,index) in arrs">
            <template v-if="index == curIndex">
              <div class="w60px fr fc-green2 h32px lh32px mar10 mal10 pointer" @click="changeIndex(index)">{{item}}</div>
            </template>
            <template v-else>
              <div class="w60px fr fc-green2 h32px lh32px mar10 mal10 pointer" style="opacity:0.5;" @click="changeIndex(index)">{{item}}</div>
            </template>
            <div class="w20px fr h32px lh32px text-center" style="color: #009688" v-if="index != 4">|</div>
          </template>
        </div>
      </div>

      <div class="clear0"></div>

    </div>

    <div class="clear4"></div>

    <div class="wb100">

      <div class="wb30 fl">
        <div class="wb100">
          <div class="wb100 h365px bg-white relative radius4">
            <img src="../../assets/images/bor-lt.png" class="absolute" style="top:0; left: 0;">
            <img src="../../assets/images/bor-br.png" class="absolute" style="right:0; bottom: 0;">
            <!--    柱状图    -->
            <div class="h365px" ref="myChart"></div>
            <div class="clear0"></div>
          </div>
        </div>
      </div>

      <div class="wb40 fl">
        <div class="pal20 par20">
          <div class="wb100 h365px bg-white relative radius4">
            <div class="pal20 par20 h365px" :style="'background: url('+bgGrid+') center center'">

              <div class="wb60 fl">

                <div class="w260px h260px center mat40 relative" :style="'background: url('+bgO+'); background-size: 100% 100%'">

                  <img src="../../assets/images/img-shan.png" class="rotate_img absolute" style="top:0; left: 0;">

                  <div class="w160px center pat50 relative">
                    <el-progress type="circle" :percentage="25" :width="160" color="#009688" class="relative"></el-progress>

                    <div class="roundness_div w120px h120px bg-green3 absolute radius50 text-center" style="z-index: 20; top:70px; left: 20px;">
                      <p style="font-size:28px; " class="lh50px h50px mat20 fc-green2">{{totalData.consumeRate}}</p>
                      <p class="h20px lh20px fc-green2">划扣销售占比</p>
                      <el-tooltip class="item" effect="light" content="该百分比取划扣总业绩对销售总业绩的占比" placement="bottom">
                        <p class="h20px lh20px fc-white">
                          <i class="iconfont iconiconfontwenhao1 f14px pointer" style="color:#F2990D;"></i>
                        </p>
                      </el-tooltip>
                    </div>

                  </div>
                </div>

              </div>

              <div class="wb40 fr">
                <div class="clear0 h80px"></div>
                <div class="wb100">
                  <img src="../../assets/images/img-101.png" class="fl ma10">
                  <div class="fl lh25px">
                    <p>划扣总业绩（元）</p>
                    <p class="f28px fc-green2">{{totalData.consumePrice | NumFormat}}</p>
                  </div>
                </div>
                <div class="clear0 h80px"></div>
                <div class="wb100"> <img src="../../assets/images/img-102.png" class="fl ma10">
                  <div class="fl lh25px">
                    <p>销售总业绩（元）</p>
                    <p class="f28px fc-green2">{{totalData.payment | NumFormat}}</p>
                  </div>
                </div>
              </div>

            </div>

            <img src="../../assets/images/bor-lt.png" class="absolute" style="top:0; left: 0;">
            <img src="../../assets/images/bor-br.png" class="absolute" style="right:0; bottom: 0;">
            <img src="../../assets/images/bor-bl.png" class="absolute" style="left:0; bottom: 0;">
            <img src="../../assets/images/bor-tr.png" class="absolute" style="right:0; top: 0;">
            <!--    柱状图    -->
            <div class="clear0"></div>
          </div>
        </div>
      </div>

      <div class="wb30 fl">
        <div class="wb100">
          <div class="wb100 h365px bg-white  relative radius4">
            <img src="../../assets/images/bor-lt.png" class="absolute" style="top:0; left: 0;">
            <img src="../../assets/images/bor-br.png" class="absolute" style="right:0; bottom: 0;">

            <div class="clear2"></div>

            <div class="pa20">

              <p class="fc-green2 F16">企业数据</p>

              <div class="wb100 h300px center relative">

                <div class="w200px absolute text-center lh20px" style="left: 0; right: 0; top:-10px; margin: auto;">
                  <p class="fc-green2 f24px">{{conceptualData.customerCount}}<span class="f12px">人</span></p>
                  <p class="f14px fc-gray2">顾客人数</p>
                </div>

                <div class="w200px absolute text-left lh20px" style="left: 30px; top: 70px;">
                  <p class=" f24px" style="color: #4ecc5b">{{conceptualData.storeMeasure}} <span class="f12px">m²</span></p>
                  <p class="f14px fc-gray2">门店总面积</p>
                </div>

                <div class="w200px absolute text-left lh20px" style="left: 0; top: 140px;">
                  <p class=" f24px" style="color: #f2990d">{{conceptualData.memberCount}} <span class="f12px">人</span></p>
                  <p class="f14px fc-gray2">员工数</p>
                </div>

                <div class="w200px absolute text-left lh20px" style="left: 30px; top:210px;">
                  <p class=" f24px" style="color: #0dc9e5;">{{conceptualData.storeCount}} <span class="f12px">家</span></p>
                  <p class="f14px fc-gray2">门店数</p>
                </div>

                <div class="w200px absolute text-right lh20px" style="right: 48px; top:70px;">
                  <p class=" f24px" style="color: #f2990d">{{conceptualData.itemCount}} <span class="f12px">个</span></p>
                  <p class="f14px fc-gray2">项目总数</p>
                </div>

                <div class="w200px absolute text-right lh20px" style="right: 0; top:140px;">
                  <p class=" f24px" style="color: #33e4ff">{{conceptualData.channelCount}} <span class="f12px">个</span></p>
                  <p class="f14px fc-gray2">渠道总数</p>
                </div>

                <div class="w200px absolute text-right lh20px" style="right: 17px; top:210px;">
                  <p class=" f24px" style="color: #4ecc5b">{{conceptualData.roomCount}} <span class="f12px">间</span></p>
                  <p class="f14px fc-gray2">治疗间总数</p>
                </div>

                <div class="o1">
                  <!-- <img src="../../assets/images/img-o1.png" class="roundness1 absolute" style="z-index: 2; top:0; left: 0; right: 0; bottom: 0; margin: auto; ">
                  <img src="../../assets/images/img-o2.png" class="roundness2 absolute" style="z-index: 2; top:0; left: 0; right: 0; bottom: 0; margin: auto; ">
                  <img src="../../assets/images/img-o3.png" class="roundness3 absolute" style="z-index: 2; top:0; left: 0; right: 0; bottom: 0; margin: auto; ">
                  <img src="../../assets/images/img-o4.png" class="roundness4 absolute" style="z-index: 2; top:0; left: 0; right: 0; bottom: 0; margin: auto; "> -->
                  <img :src="imgArr" class="roundness5 absolute" style="z-index: 2; top:0; left: 0; right: 0; bottom: 0; margin: auto; ">
                </div>

                <img src="../../assets/images/img-100.png" class="absolute w60px" style="z-index: 2; top:0; left: 0; right: 0; bottom: 0; margin: auto; ">

              </div>

            </div>
          </div>

        </div>

        <div class="clear0"></div>
      </div>

    </div>

    <div class="clear4"></div>

    <div class="wb100">

      <div class="wb50 fl">
        <div class="par10">
          <div class="wb100 bg-white h520px">
            <div class="clear3"></div>
            <div class="h38px lh38px wb100 text-center fc-green2 relative" :style="'background: url('+bgTitle+') center center; background-repeat: no-repeat'">
              门店销售业绩
              <span class="fr absolute fc-gray3 h38px lh38px el-cursor" style="z-index: 2; top:0; right: 20px;" @click="$router.push({path: '/ShopMarket'})">查看更多</span>
            </div>
            <div class="clear3"></div>
            <div class="wb100">
              <!--    柱状图    -->
              <div class="h450px" ref="myChart2"></div>
            </div>
          </div>
        </div>

      </div>


      <div class="wb50 fr ">

        <div class="pal10">
          <div class="wb100 bg-white h520px">
            <div class="clear3"></div>
            <div class="h38px lh38px wb100 text-center fc-green2 relative" :style="'background: url('+bgTitle+') center center; background-repeat: no-repeat'">
              门店划扣业绩
              <span class="fr absolute fc-gray3 h38px lh38px el-cursor" style="z-index: 2; top:0; right: 20px;" @click="$router.push({path: '/ShopDeduct'})">查看更多</span>
            </div>
            <div class="clear3"></div>
            <div class="wb100">
              <!--    柱状图    -->
              <div class="h450px" ref="myChart3"></div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>
<script>
  import { enterpriseOverview, managementData,getOrderRankingListByStore,getOrdersData,getConsumeData } from "@/assets/api/StoreData/StoreData";
  import NumberOfConsumption from "./NumberOfConsumption";
  import OutpatientServiceRank from "./OutpatientServiceRank";
  import PerformanceRank from "./PerformanceRank";
  import { Dialog } from "vant";

  import bgGrid from '../../assets/images/bg-grid.png'
  import bgTitle from '../../assets/images/bg-title.png'
  import bgO from '../../assets/images/bg-o.png'

  import imgO5 from '../../assets/images/img-o5.png'
  import imgO6 from '../../assets/images/img-o6.png'
  import imgO7 from '../../assets/images/img-o7.png'
import { setInterval } from 'timers';


  const echarts = require('echarts');

  export default {
    name: "StoreData",
    data() {
      return {
        arrs: ['本年', '上周', '昨日', '今日', '本月'],
        curIndex: 4,
        panelName: 'PerformanceRank',
        conceptualData: {},
        totalData: {},
        getOrdersDataList: {},
        getConsumeDataList: {},
        endTime: '',
        startTime: '',
        tableHeight: 560,
        echartsCondition:{},
        bgGrid: bgGrid,
        bgTitle: bgTitle,
        bgO: bgO,
        imgArr:imgO5,
        width: 0,
      }
    },
    components: {
      Dialog,
      NumberOfConsumption,
      OutpatientServiceRank,
      PerformanceRank,
    },
    methods: {
      imgSetInterval(){
        let aImg = [imgO5, imgO7 , imgO6];
        let imgIndex = 0;
        setInterval(()=>{
          imgIndex++
          if(imgIndex > aImg.length-1){
            imgIndex = 0
          }
          this.imgArr = aImg[imgIndex]
        },500)
      },

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
          this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-1 00:00:00`
          this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }else if(index == 3){
          //今日
          this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
          this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }else if(index == 2){
          //昨日
          let count = -1
          date = new Date(date.getTime() + (86400 * 1000) * count);
          this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
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
          this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
          this.endTime = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()} 23:59:59`
        }else if(index == 0){
          //本年
          this.startTime = `${date.getFullYear()}-1-1 0:0:0`
          this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        };
        const that = this;
        managementData({startTime: this.startTime, endTime: this.endTime }).then(res => {
          if(res.status == 0){
            this.totalData = res.data;
            this.echartsDataOne();
          }
        });
        // getOrdersData({startTime: this.startTime, endTime: this.endTime }).then(res => {
        //   if(res.status == 0){
        //     console.log(res);
        //     this.getOrdersDataList = res.data.list;
        //     this.echartsDataTwo();
        //   }
        // });
        getConsumeData({startTime: this.startTime, endTime: this.endTime , sort:1 }).then(res => {
          if(res.status == 0){
            console.log(res);
            this.getOrdersDataList = res.data.list;
            this.echartsDataTwo();
          }
        });
        getConsumeData({startTime: this.startTime, endTime: this.endTime , sort:2 }).then(res => {
          if(res.status == 0){
            console.log(res);
            this.getConsumeDataList = res.data.list;
            this.echartsDataThree();
          }
        })
      },
      


      echartsDataOne() {
        const that =this;
        let myChart = echarts.init(this.$refs.myChart);
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '7%',
            right: '7%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            }
          },
          yAxis: {
            type: 'category',
            data: ['成交人次（次）','成交人头（人）','划扣人次（次）','划扣人头（人）'],
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            }
          },
          series: [
            {
              type: 'bar',
              barWidth:'20px',
              itemStyle:{
                barBorderRadius:10,
                color:'#009688'
              },
              label: {
                  normal: {
                      show: true,
                      position: 'right'
                  }
              },
              data:[
                {
                  name:'成交人次（次）',
                  value:that.totalData.orderCustomerQuantity
                },
                {
                  name:'成交人头（人）',
                  value:that.totalData.orderCustomer
                },
                {
                  name:'划扣人次（次）',
                  value:that.totalData.consumeNumber
                },
                {
                  name:'划扣人头（人）',
                  value:that.totalData.consumeHead
                },
              ]

            },
          ],
        };
        myChart.setOption(option);
      },

      echartsDataTwo() {
        let myChart2 = echarts.init(this.$refs.myChart2);
        let nameList = new Array();
        let dataList = new Array();
        this.getOrdersDataList.map((item,index) => {
          nameList.push(item.name);
          if (index % 2 == 0) {
            dataList.push(
              {
                name:item.name,
                value:item.order,
                itemStyle:{
                  color:'#009688',
                barBorderRadius:10,
                }
              },
            );
          }else {
            dataList.push(
              {
                name:item.name,
                value:item.order,
                itemStyle:{
                  color:'#F2990D',
                  barBorderRadius:10,
                }
              },
            );
          }
        });
        let option2 = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            }, 
            legend: {
              type: 'scroll',
              orient: 'horizontal',
              // right: 10,
              top: 0,
              // bottom: 20,
              data: nameList,
              // selected: data.selected
            },
            grid: {
              left: '7%',
              right: '7%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              // boundaryGap: [0, 0.01],
              data : nameList,
              axisLabel: {
                interval: 0,
                rotate: 30
              },
              axisLine:{
                show:false,
                alignWithLabel: true
              },
              axisTick:{
                show:false
              }
            },
            yAxis : [
              {
                type : 'value',
                axisLine:{
                  show:false
                },
                axisTick:{
                  show:false
                }
              }
            ],
            series : [
              {
                type:'bar',
                barWidth:'20px',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data:dataList
              }
            ]
        };
        myChart2.setOption(option2);
      },

      echartsDataThree() {
        let myChart3 = echarts.init(this.$refs.myChart3);
        let nameList = new Array();
        let dataList = new Array();
        let dataList1 = new Array();
        let dataList2 = new Array();
        let num1 = 0;
        let num2 = 0;
        let num3 = 0;
        let maxNum = 0;
        this.getConsumeDataList.map((item,index) => {
          nameList.push(item.name);
            dataList.push(
              {
                name:item.name,
                value:item.amount,
                itemStyle:{
                  color:'#009688',
                  barBorderRadius:10,
                }
              },
            );
            dataList1.push(item.amount);
        });
        dataList1.sort(function (a, b) {
          return a-b;
        });
        let indexNun =  parseInt(dataList1[dataList1.length - 1])
        this.getConsumeDataList.map((item,index) => {
            dataList2.push(
              {
                value:indexNun + 200,
                itemStyle:{
                  color:'#009688',
                  barBorderRadius:10,
                  opacity:0.1
                }
              }
            );
        });
        console.log(dataList1);
        let option3 = {
          color: ['#3398DB'],
          // tooltip : {
          //     trigger: 'axis',
          //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          //     }
          // }, 
           tooltip : {
              trigger: 'item',
              formatter: "{b} : {c}"
          },
          legend: {
            type: 'scroll',
            orient: 'horizontal',
            // right: 10,
            top: 0,
            // bottom: 20,
            data: nameList,
            // selected: data.selected
          },
          grid: {
            left: '7%',
            right: '7%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // boundaryGap: [0, 0.01],
            data : nameList,
            axisLabel: {
              interval: 0,
              rotate: 30
            },
            axisLine:{
              show:false,
              alignWithLabel: true
            },
            axisTick:{
              show:false
            }
          },
          yAxis : [
            {
              type : 'value',
              axisLine:{
                show:false
              },
              axisTick:{
                show:false
              }
            }
          ],
          series : [
            {
              type: 'bar',
              itemStyle: {
                  normal: {
                      color: '#F2990D'
                  },
                  
              },
              silent: true,
              barWidth: 20,
              barGap: '-100%', // Make series be overlap
              data: dataList2
            },
            {
              type:'bar',
              barWidth:20,
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              data:dataList
            }
          ]
        };
        console.log(option3);
        myChart3.setOption(option3);
      }
    },

    // 挂载结束状态
    mounted() {

      this.width = window.innerWidth

      this.imgSetInterval()
      var reloadStr = sessionStorage.getItem("reload");
      const that = this;

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
          this.conceptualData = res.data;
          
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
  .roundness_div{}
.rotate_img{
  // -webkit-animation:spin 1s linear infinite;
  // -moz-animation:spin 1s linear infinite;
  // animation:spin 1s linear infinite;
}
.roundness1{
  -webkit-animation:roundnessScale 2s linear infinite;
  -moz-animation:sproundnessScalein 2s linear infinite;
  animation:roundnessScale 2s linear infinite;
}
.roundness2{
  -webkit-animation:roundnessScale 2s linear infinite;
  -moz-animation:roundnessScale 2s linear infinite;
  animation:roundnessScale 2s linear infinite;
}
.roundness3{
  -webkit-animation:roundnessScale 2s linear infinite;
  -moz-animation:roundnessScale 2s linear infinite;
  animation:roundnessScale 2s linear infinite;
}
.roundness4{
  -webkit-animation:roundnessScale 2s linear infinite;
  -moz-animation:roundnessScale 2s linear infinite;
  animation:roundnessScale 2s linear infinite;
}
.roundness5{
 
}

@-webkit-keyframes spin {
    100% {
        -webkit-transform:rotate(-360deg);
        -webkit-transform-origin:bottom;
    }
}
@-moz-keyframes spin {
    100% {
        -moz-transform:rotate(-360deg);
        -moz-transform-origin:bottom;
    }
}
@keyframes spin {
    100% {
        transform:rotate(-360deg);
    }
}



@-webkit-keyframes roundnessScale {
    100% {
        -webkit-transform:scale(1.5,1.5)
    }
}
@-moz-keyframes roundnessScale {
    100% {
        -moz-transform:scale(1.5,1.5)
    }
}
@keyframes roundnessScale {
    100% {
        transform:scale(1.5,1.5);
    }
}

</style>


    
