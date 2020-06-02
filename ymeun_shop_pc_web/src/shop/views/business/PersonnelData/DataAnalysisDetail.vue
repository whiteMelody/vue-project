<template>

  <div class="DataAnalysisDetail">
    <header>
      
      <div class="text">{{detailText}}得分详情<span>（{{this.condition.cycle}}年）</span></div>
      <div class="timer">
        <el-date-picker
          v-model="yearActive"
          type="year"
          :clearable="false"
          placeholder="请选择时间">
        </el-date-picker>
        <!-- <el-dropdown
          trigger="click"
          @command="handleCommand"
          @visible-change="userMessageShowFn"
        >
        <span class="el-dropdown-link el-cursor">
          {{timeListActive}}
          <i
            class="iconfont iconshangla-copy f20px"
            v-if="userMessageShow"
          ></i>
          <i class="iconfont iconxiala f20px" v-else></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item , index) in timeList"
              :key="index"
              :command="item"
            >{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>
    </header>
      <div class="box">
        <el-alert
          title="将鼠标选中图中月份圆点，则显示出该月各项得分及评价。"
          type="warning">
        </el-alert>
        <div class="echarts_list">
          <div ref="myChart" class="myChart" v-loading="loading"></div>
        </div>

        <div class="echarts_box" v-loading="scoringDetailsLoading">
          <div class="echarts_box_left">
            <h3>{{totalPoints.cycle}}月总成绩</h3>
            <div>
              <p>
                <a>{{totalPoints.score}}</a>
                <b>分</b>
              </p>
              <span>{{totalPoints.comment}}</span>
              <i class="iconfont iconyucepingfen"></i>
            </div>
          </div>
          <div class="echarts_box_rigth">
            <h3>各项得分及评价</h3>
            <ul>
              <li v-for="(item , index) in evaluateList" :key="index">
                <p>
                  <span>{{item.tooltip}}：</span>
                  <b>{{item.score}}分</b>
                </p>
                <strong>{{item.comment}}</strong>
              </li>
            </ul>
          </div>
        </div>

      </div>
  </div>

</template>
<script>



  import { getAchievementsDetailed } from "@/shop/assets/api/personnelData/personnelData"

  const echarts = require('echarts');

  export default {
    name: "DataAnalysisDetail",
    data() {
      return {
        userMessageShow:false,
        detailText:"",
        condition:{
          cycle:"",
          resourcesId:"",
          resourcesType:''
        },
        scoringDetails:{
          cycle:"",
          resourcesId:"",
          resourcesType:''
        },
        yearActive:"",
        monthActive:"",
        loading:false,
        scoringDetailsLoading:false,
        totalPoints:{},
        evaluateList:[],
        echartsList:[],
      }
    },
    components: {
    
    },
    watch: {
   
      'yearActive'(newData,oldData){
        this.condition.cycle = this.$base.dateTimeToDate(this.yearActive,"year")
        this.scoringDetails.cycle = this.$base.dateTimeToDate(this.yearActive,"cycle")
        this.loadData()
      },
 
    },
    methods: {
     
      handleCommand(item) {
        this.timeListActive = item
        
      },
      userMessageShowFn(v) {
        this.userMessageShow = v;
      },
  
      echartsData() {
        this.loading = true;
        const that =this;
        getAchievementsDetailed(this.condition).then(res=>{
          if(res.status == 0){
            // this.totalPoints = res.data.analysis
            // this.evaluateList = res.data.list
            let monthList = [];
            res.data.trend.map((item , index) => {
              monthList.push({
                name:item.cycle,
                value:item.score
              })
            })
            let myChart = echarts.init(this.$refs.myChart);
            let option = {
              title: {
                text:'得分走势图',
                left:'center',
                textStyle:{
                  color:"#333333",
                  fontWeight: "normal",
                  fontSize: 14,
                },
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
              },
              grid: {
                left: '20px',
                right: '20px',
                top: '40px',
                bottom:'0',
                containLabel: true
              },
              yAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLine:{
                  lineStyle:{
                    color:'#E5E5E5'
                  },
                },
                axisLabel:{
                  color:'#999',
                  formatter: '{value} 分'
                },
                axisTick:{
                  show:false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color:"#E5E5E5"
                    }
                },
                
              },
              xAxis: {
                type: 'category',
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                splitNumber: 20,
                axisLine:{
                  lineStyle:{
                    color:'#E5E5E5'
                  },
                },
                axisLabel:{
                  color:'#999'
                },
                axisTick:{
                  show:false
                },
              
              },
            
              series: [
                {
                  type: 'line',
                  barWidth:'30px',
                  itemStyle:{
                    color:'#0DC9E5'
                  },
                  label: {
                      normal: {
                          show: true,
                          position: 'top'
                      }
                  },
                  data:monthList

                },
              ],
            };
            myChart.clear()
            myChart.setOption(option);
            // 给每条数据的热区增加点击事件
            myChart.getZr().off('click')
            let xIndex,Ymonth,dateList = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            myChart.getZr().on('click', function(params) {
                var pointInPixel= [params.offsetX, params.offsetY]
                if (myChart.containPixel('grid', pointInPixel)) {
                    var pointInGrid = myChart.convertFromPixel({seriesIndex: 0}, pointInPixel)
                    // X轴序号
                    xIndex = pointInGrid[0]
                    // 获取当前图表的option
                    var op = myChart.getOption()
                    // 获得图表中我们想要的数据
                    Ymonth = op.series[0].data[xIndex]
                    // console.log('点击了第' + xIndex + '条数据')
                    let cycle = that.scoringDetails.cycle.split('-')[0]
                    that.scoringDetails.cycle = cycle +'-' +dateList[xIndex]
                    that.scoringDetailsFn()
                }
            })
          }else{
              this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
              });
          }
          this.loading = false;
          
        }).catch(error=>{
            console.log('getAchievementsDashboard no');
        })
  
      },

      scoringDetailsFn(){
        this.scoringDetailsLoading = true;
        const that =this;
        getAchievementsDetailed(this.scoringDetails).then(res=>{
          if(res.status == 0){
            this.totalPoints = res.data.analysis
            this.evaluateList = res.data.list
          }else{
              this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
              });
          }
          this.scoringDetailsLoading = false;
        }).catch(error=>{
            console.log('getAchievementsDashboard no');
        })
      },

      loadData(){
        this.echartsData()
        this.scoringDetailsFn()
      }
      

    },

    // 挂载结束状态
    mounted() {
      let date = new Date();
      this.yearActive = date
      this.monthActive = (date.getMonth()+1)
      this.condition.resourcesType = this.$route.query.type
      switch (this.condition.resourcesType) {
        case 1:
          this.detailText = "门店"
          break;
        case 2:
          this.detailText = `${this.$store.getters.roleName.adviser}`
          break;
        case 3:
          this.detailText = `${this.$store.getters.roleName.technician}`
          break;
        case 4:
          this.detailText = `${this.$store.getters.roleName.reception}`
          break;
        case 5:
          this.detailText = this.$route.query.name
          break;
        default:
          break;
      }
      this.scoringDetails.resourcesType = this.$route.query.type
      if(this.$route.query.id){
        this.condition.resourcesId = this.$route.query.id
        this.scoringDetails.resourcesId = this.$route.query.id
      }
      else{
        this.condition.resourcesId = null
        this.scoringDetails.resourcesId = null
      }
    },
    // 更新前状态
    beforeUpdate() {
     
    },
  };
</script>
<style lang="scss" scoped>
.DataAnalysisDetail{
  header{
    height: 50px;
    line-height: 50px;
    color: #333;
    font-size: 14px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .text{
      flex: 1;
      font-size: 16px;
      span{
        color: #0DC9E5;
        font-size: 16px;
      }
    }
   
  }
  .box{
    padding: 10px 20px 20px;
    .echarts_list{
      padding: 20px 0;
      margin-top: 10px;
      height: 390px;
      background: #fff;
      .myChart{
        height: 100%;
      }
    }
    .echarts_box{
      margin-top: 20px;
      display: flex;
      .echarts_box_left{
        width: 200px;
        background: #fff;
        padding: 0 20px;
        position: relative;
        h3{
          line-height: 50px;
          font-weight: normal;
          font-size: 16px;
          color: #333;
          border-bottom: 1px solid #E5E5E5;
        }
        div{
          padding-top: 20px;
          p{
            display: flex;
            align-items: flex-end;
            a{
              color: #009688;
              font-size: 34px;
            }
            b{
              font-weight: normal;
              font-size: 14px;
              color: #999;
              padding-left: 5px;
              position: relative;
              bottom: 6px;
            }
          }
          span{
            color: #333;
            font-size: 14px;
            padding-top: 10px;
            display: block;
          }
          i{
            font-style: normal;
            position: absolute;
            right: 20px;
            bottom: 20px;
            font-size: 50px;
            color: #C0C0C0;
          }
        }
      }
      .echarts_box_rigth{
        flex: 1;
        background: #fff;
        padding: 0 20px 20px;
        margin-left: 20px;
        h3{
          line-height: 50px;
          font-weight: normal;
          font-size: 16px;
          color: #333;
          border-bottom: 1px solid #E5E5E5;
        }
        ul{
          padding-top: 10px;
          li{
            display: flex;
            align-items: flex-start;
            line-height: 30px;
            p{
              display: flex;
              align-items: center;
              width: 200px;
              span{
                color: #666666;
                text-align: right;
                flex: 1;
              }
              b{
                font-weight: normal;
                color: #0DC9E5;
                width: 70px;
                align-self:flex-start;
              }
            }
            strong{
              padding-left: 20px;
              flex: 1;
              color: #333333;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}
</style>


    
