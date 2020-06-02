<template>
  <div class="Data">
    <!-- <div class="data_card">
      <div>
        <h4>划扣人头（人）</h4>
        <span>{{consumeNumber | _NumFormat}}</span>
        <i class="iconfont iconrenshu"></i>
      </div>
      <div>
        <h4>销售业绩（元）</h4>
        <span>{{marketMoney}}</span>
        <i class="iconfont iconconsumption"></i>
      </div>
      <div>
        <h4>划扣人次（次）</h4>
        <span>{{consumeManTime | _NumFormat}}</span>
        <i class="iconfont icondingdan1"></i>
      </div>
      <div>
        <h4>划扣业绩（元）</h4>
        <span>{{deductMoney}}</span>
        <i class="iconfont iconqian"></i>
      </div>
    </div> -->

    <div class="data_card">
      <div>
        <span>{{marketMoney}}</span>
        <h4>销售业绩（元）</h4>
      </div>
      <div>
        <span>{{orderCustomer}}</span>
        <h4>成交人头（人）</h4>
      </div>
      <div>
        <span>{{orderCustomerQuantity}}</span>
        <h4>成交人次（次）</h4>
      </div>
      <div>
        <span>{{deductMoney}}</span>
        <h4>划扣业绩（元）</h4>
      </div>
      <div>
        <span>{{consumeNumber}}</span>
        <h4>划扣人头（人）</h4>
      </div>
      <div>
        <span>{{consumeManTime}}</span>
        <h4>划扣人次（次）</h4>
      </div>
      
    </div>

    <div class="echarts_div">
      <div class="echarts_box">
        <h4>销售业绩（元）</h4>
        <div class="consumption_money box" ref="consumption_money"></div>
      </div>

      <div class="echarts_box">
        <h4>成交人头（人）</h4>
        <div class="make_a_bargain box" ref="make_a_bargain"></div>
      </div>

      <div class="echarts_box">
        <h4>成交人次（次）</h4>
        <div class="clinch_a_deal box" ref="clinch_a_deal"></div>
      </div>

      <div class="echarts_box">
        <h4>划扣业绩（元）</h4>
        <div class="deduct_money box" ref="deduct_money"></div>
      </div>

      <div class="echarts_box">
        <h4>划扣人头（人）</h4>
        <div class="arrive_number box" ref="arrive_number"></div>
      </div>

      <div class="echarts_box">
        <h4>划扣人次（次）</h4>
        <div class="deduct_number box" ref="deduct_number"></div>
      </div>
      
      <div class="echarts_box">
        <h4>业绩排名</h4>
        <div class="performance_box">
          <div class="counselor" ref="counselor"></div>
          <div class="technician" ref="technician"></div>
          <div class="technician_market" ref="technician_market"></div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { getStoreConsumption , getStoreDeduction , getStoreClient , getUserPerformanceByAdviser , getUserPerformanceByTechnician } from "@/shop/assets/api/home/home";
const echarts = require('echarts');
export default {
  name:'Data',
  data(){
    return{
      // loading:false,
      consumeNumber:'',
      marketMoney:'',
      consumeManTime:'',
      deductMoney:'',
      orderCustomer:"",
      orderCustomerQuantity:"",
    }
  },
  
  props: {
    // time
    cycle: {
      type: Number,
      default: () => {
        
      }
    },
  },
  
  watch: {
    'cycle': {
      deep: true,
      handler: function () {
        this.loadData()
      }
    }
  },
  components:{
  },
  methods:{
    dateUnit(num) {
      if(num == 1 || num == 2)
      {
        return "时"
      }
      else if(num == 3 || num == 4)
      {
        return "日"
      }
      else if(num == 5)
      {
        return "月"
      }
    },
    loadData(){
      this.getStoreConsumptionFn()
      this.getStoreDeductionFn()
      this.getStoreClientFn()
      this.getUserPerformanceByAdviserFn()
      this.getUserPerformanceByTechnicianFn()
    },

    // 消费金额
    getStoreConsumptionFn(){
      
      let postData = {
        cycle:this.cycle
      };
      getStoreConsumption(postData).then(res => {
        if (res.status == 0) {
          this.marketMoney = res.data.amount;
          this.orderCustomer= res.data.order_customer;
          this.orderCustomerQuantity= res.data.order_customer_quantity;

          //消费金额
          let myChart = echarts.init(this.$refs.consumption_money);
          var newData = new Array();
          var oldData = new Array();
          var revolutionData = new Array();
          var dateStr = this.dateUnit(this.cycle)
       
          res.data.list.order.new.map((item, index) => {
            revolutionData.push(item.revolution);
            newData.push(item.amount);
          })
          res.data.list.order.old.map((item, index) => {
            oldData.push(item.amount);
          })

          var option = {
            legend: {
              data: ['新客', '老客'],
              align: 'left',
              top:"20"
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              data: revolutionData,
              type: 'category',
              name:"("+dateStr+")",
              splitLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisTick:{
                alignWithLabel:true,
                show:false,
              },
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                },
              },
              axisLabel:{
                color:"#333"
              },
            },
            yAxis: {
              type: 'value',
              axisTick:{
                show:false,
              },
              splitLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                },
              },
              axisLabel:{
                color:"#333"
              }
            },
            grid: {
              left: '1%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            series: [
              {
                data: newData,
                type: 'line',
                name: "新客",
                itemStyle:{
                  color:"#009688"
                }
              },
              {
                data: oldData,
                type: 'line',
                name: "老客",
                itemStyle:{
                  color:"#141536"
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);


          //成交人头
          let makeABargain = echarts.init(this.$refs.make_a_bargain);
          var makeABargainNewData = new Array();
          var makeABargainOldData = new Array();
          var makeABargainData = new Array();
          var dateStr = this.dateUnit(this.cycle)
       
          res.data.list.head.new.map((item, index) => {
            makeABargainData.push(item.revolution);
            makeABargainNewData.push(item.quantity);
          })
          res.data.list.head.old.map((item, index) => {
            makeABargainOldData.push(item.quantity);
          })

          var makeABargainOption = {
            legend: {
              data: ['新客', '老客'],
              align: 'left',
              top:"20"
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              data: makeABargainData,
              type: 'category',
              name:"("+dateStr+")",
              splitLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisTick:{
                alignWithLabel:true,
                show:false,
              },
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                },
              },
              axisLabel:{
                color:"#333"
              },
            },
            yAxis: {
              type: 'value',
              axisTick:{
                show:false,
              },
              splitLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                },
              },
              axisLabel:{
                color:"#333"
              }
            },
            grid: {
              left: '1%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            series: [
              {
                data: makeABargainNewData,
                type: 'line',
                name: "新客",
                itemStyle:{
                  color:"#009688"
                }
              },
              {
                data: makeABargainOldData,
                type: 'line',
                name: "老客",
                itemStyle:{
                  color:"#141536"
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          makeABargain.setOption(makeABargainOption);



          //成交人次
          let clinchADeal = echarts.init(this.$refs.clinch_a_deal);
          var clinchADealNewData = new Array();
          var clinchADealOldData = new Array();
          var clinchADealData = new Array();
          var dateStr = this.dateUnit(this.cycle)
       
          res.data.list.head.new.map((item, index) => {
            clinchADealData.push(item.revolution);
            clinchADealNewData.push(item.quantity);
          })
          res.data.list.head.old.map((item, index) => {
            clinchADealOldData.push(item.quantity);
          })

          var clinchADealOption = {
            legend: {
              data: ['新客', '老客'],
              align: 'left',
              top:"20"
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              data: clinchADealData,
              type: 'category',
              name:"("+dateStr+")",
              splitLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisTick:{
                alignWithLabel:true,
                show:false,
              },
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                },
              },
              axisLabel:{
                color:"#333"
              },
            },
            yAxis: {
              type: 'value',
              axisTick:{
                show:false,
              },
              splitLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                },
              },
              axisLabel:{
                color:"#333"
              }
            },
            grid: {
              left: '1%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            series: [
              {
                data: clinchADealNewData,
                type: 'line',
                name: "新客",
                itemStyle:{
                  color:"#009688"
                }
              },
              {
                data: clinchADealOldData,
                type: 'line',
                name: "老客",
                itemStyle:{
                  color:"#141536"
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          clinchADeal.setOption(clinchADealOption);
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        console.log("getStoreConsumption no");
      })
    },
    // 划扣金额 and 划扣次数
    getStoreDeductionFn(){
      let postData = {
        cycle:this.cycle
      };
      getStoreDeduction(postData).then(res => {
        if (res.status == 0) {
          this.consumeNumber = res.data.valume 
          this.consumeManTime = res.data.quantity
          this.deductMoney = res.data.amount

          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(this.$refs.deduct_money);
          // 指定图表的配置项和数据
          var newData = new Array();
          var oldData = new Array();
          var newQuantityData = new Array();
          var oldQuantityData = new Array();
          var revolutionData = new Array();

          res.data.list.new.map((item, index) => {
            revolutionData.push(item.revolution);
            newData.push(item.amount);
            newQuantityData.push(item.quantity);
          })
          res.data.list.old.map((item, index) => {
            oldData.push(item.amount);
            oldQuantityData.push(item.quantity);
          })
          var dateStr = this.dateUnit(this.cycle)
			    this.deductNumber(revolutionData,newQuantityData,oldQuantityData,this.cycle);
          var option = {
            legend: {
              data: ['新客', '老客'],
              align: 'left',
              top: "20"
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              data: revolutionData,
              type: 'category',
              name:"("+dateStr+")",
              splitLine: {
                lineStyle: {
                  color: "#C0C0C0"
                }
              },
              axisTick: {
                alignWithLabel: true,
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: "#C0C0C0"
                },
              },
              axisLabel: {
                color: "#333"
              },
            },
            yAxis: {
              type: 'value',
              axisTick: {
                show: false,
              },
              splitLine: {
                lineStyle: {
                  color: "#C0C0C0"
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#C0C0C0"
                },
              },
              axisLabel: {
                color: "#333"
              }
            },
            grid: {
              left: '1%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            series: [
              {
                data: newData,
                type: 'line',
                name: "新客",
                itemStyle: {
                  color: "#009688"
                }
              },
              {
                data: oldData,
                type: 'line',
                name: "老客",
                itemStyle: {
                  color: "#141536"
                }
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        console.log("getStoreDeduction no");
      })
    },
    // 到店人头
    getStoreClientFn(){
      let postData = {
        cycle:this.cycle
      };
      getStoreClient(postData).then(res => {
        if (res.status == 0) {
          let myChart = echarts.init(this.$refs.arrive_number);
          var newData = new Array();
          var oldData = new Array();
          var revolutionData = new Array();

          res.data.list.new.map((item, index) => {
            revolutionData.push(item.revolution);
            newData.push(item.quantity);
          })
          res.data.list.old.map((item, index) => {
            oldData.push(item.quantity);
          })


          var dateStr = this.dateUnit(this.cycle)
          var option = {
            legend: {
              data: ['新客', '老客'],
              align: 'left',
              top:"20"
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              data: revolutionData,
              type: 'category',
              name:"("+dateStr+")",
              splitLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisTick:{
                alignWithLabel:true,
                show:false,
              },
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                },
              },
              axisLabel:{
                color:"#333"
              },
            },
            yAxis: {
              type: 'value',
              axisTick:{
                show:false,
              },
              splitLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                },
              },
              axisLabel:{
                color:"#333"
              }
            },
            grid: {
              left: '1%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            series: [
              {
                data: newData,
                type: 'bar',
                name: "新客",
                itemStyle:{
                  color:"#009688"
                }
              },
              {
                data: oldData,
                type: 'bar',
                name: "老客",
                itemStyle:{
                  color:"#141536"
                }
              }
            ]
          };
          
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        console.log("getStoreClient no");
      })
    },
    // 划扣次数
    deductNumber(revolution,newClient,oldClient,num) {
      var dateStr = this.dateUnit(num)

      // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(this.$refs.deduct_number);
      // 指定图表的配置项和数据
      var option = {
        legend: {
          data: ['新客', '老客'],
          align: 'left',
          top:"20",
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
              data: revolution,
          type: 'category',
          name:"("+dateStr+")",
          splitLine:{
            lineStyle:{
              color:"#C0C0C0"
            }
          },
          axisTick:{
            alignWithLabel:true,
            show:false,
          },
          axisLine:{
            lineStyle:{
              color:"#C0C0C0"
            },
          },
          axisLabel:{
            color:"#333"
          },
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false,
          },
          splitLine:{
            lineStyle:{
              color:"#C0C0C0"
            }
          },
          axisLine:{
            lineStyle:{
              color:"#C0C0C0"
            },
          },
          axisLabel:{
            color:"#333"
          }
        },
        grid: {
                left: '1%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
        series: [
          {
            data: newClient,
            type: 'bar',
            name: "新客",
            itemStyle:{
              color:"#009688"
            }
          },
          {
            data: oldClient,
            type: 'bar',
            name: "老客",
            itemStyle:{
              color:"#141536"
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 顾问业绩排名
    getUserPerformanceByAdviserFn(){
      let postData = {
        cycle:this.cycle
      };
      getUserPerformanceByAdviser(postData).then(res => {
        if (res.status == 0) {
          let myChart = echarts.init(this.$refs.counselor);
          var technicianDataTooltip = new Array();
          var technicianData = new Array();
          var counselorList = 0;
       
          res.data.map((item , index) => {
             technicianDataTooltip.push(item.name);
            var tData = {value:0,name:""};
            tData.value = item.amount;
            tData.name = item.name;
            technicianData.push(tData);
          })

          var option = {
            title : {
              text: `${this.$store.getters.roleName.adviser}业绩统计`,
              textStyle:{
                fontWeight:"normal",
                fontSize:16,
              },
              x:'24%',
              y:'bottom'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{b}"
            },
            legend: {
              orient: 'vertical',
              type: 'scroll',
              right: 10,
              top: 20,
              bottom: 20,
              data: technicianDataTooltip
            },
            series : [
              {

                type: 'pie',
                radius : '60%',
                center: ['35%', '50%'],
                label:{
                  show: false
                },
                labelLine: {
                  show: false
                },
                data:technicianData,

              }
            ]
          };

          myChart.setOption(option);
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        console.log("getUserPerformanceByAdviser no");
      })
    },
    // 美容师业绩排名
    getUserPerformanceByTechnicianFn(){
      let postData = {
        cycle:this.cycle
      };
      getUserPerformanceByTechnician(postData).then(res => {
        if (res.status == 0) {
          //美容师划扣业绩
          let myChart = echarts.init(this.$refs.technician);
          var technicianDataTooltip = new Array();
          var technicianData = new Array();
      
          res.data.consume.map((item , index) => {
            technicianDataTooltip.push(item.name);
            var tData = {value:0,name:""};
            tData.value = item.amount;
            tData.name = item.name;
            technicianData.push(tData);
          })
          var option = {
            title: {
              text: `${this.$store.getters.roleName.technician}扣划业绩统计`,
              textStyle: {
                fontWeight: "normal",
                fontSize: 16,
              },
              x: '24%',
              y: 'bottom'

            },
            tooltip: {
              trigger: 'item',
              formatter: "{b}"
            },
            legend: {
              orient: 'vertical',
              type: 'scroll',
              right: 10,
              top: 20,
              bottom: 20,
              data: technicianDataTooltip,
            },
            series: [
              {
                type: 'pie',
                radius: '60%',
                center: ['35%', '50%'],
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                data:technicianData
             

              }
            ]
          };
          myChart.setOption(option);

          //美容师销售业绩
          let technicianMarket = echarts.init(this.$refs.technician_market);
          var technicianMarketDataTooltip = new Array();
          var technicianMarketData = new Array();
      
          res.data.order.map((item , index) => {
            technicianMarketDataTooltip.push(item.name);
            var tData = {value:0,name:""};
            tData.value = item.amount;
            tData.name = item.name;
            technicianMarketData.push(tData);
          })
          var technicianMarketOption = {
            title: {
              text: `${this.$store.getters.roleName.technician}销售业绩统计`,
              textStyle: {
                fontWeight: "normal",
                fontSize: 16,
              },
              x: '24%',
              y: 'bottom'

            },
            tooltip: {
              trigger: 'item',
              formatter: "{b}"
            },
            legend: {
              orient: 'vertical',
              type: 'scroll',
              right: 10,
              top: 20,
              bottom: 20,
              data: technicianMarketDataTooltip,
            },
            series: [
              {
                type: 'pie',
                radius: '60%',
                center: ['35%', '50%'],
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                data:technicianMarketData
             

              }
            ]
          };
          technicianMarket.setOption(technicianMarketOption);
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        console.log("getUserPerformanceByTechnician no");
      })
    },
  },

  // 创建前状态
  beforeCreate(){
  },

  // 创建完毕状态 
  created(){
    this.loadData()
  },

  // 挂载前状态
  beforeMount(){
  },

  // 挂载结束状态
  mounted(){
  },
  
  // 更新前状态
  beforeUpdate(){
  },

  // 更新完成状态
  updated(){
  },

  // 销毁前状态
  beforeDestroy(){
  },

  // 销毁完成状态
  destroyed(){
  } 
    
}
</script>
<style lang="scss" scoped>
@import '../index.scss';

</style>



    
