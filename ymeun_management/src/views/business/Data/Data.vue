<template>
  <div class="Data" :style="'min-height: '+boxMaxHeight+'px;'">
                <!-- <div class="h450px" ref="myChart3"></div> -->
    <header>企业数据</header>
    <div class="box">
        <div class="header">
            <div class="header_box">
                <div class="header_box_left">
                    <span>{{totalList.chainTotal}}</span>
                    <p>连锁企业数</p>
                </div>
                <div class="header_box_right">
                    <div class="progress">
                        <el-progress type="circle" :percentage="totalList.conversionTow" :width="80" color="#627AAD"></el-progress>
                        <span>转换率</span>
                    </div>
                </div>
            </div>
            <div class="header_box">
                <div class="header_box_left">
                    <span>{{totalList.singleTotal}}</span>
                    <p>单店企业数</p>
                </div>
                <div class="header_box_right">
                    <i class="iconfont iconweb-icon-"></i>
                </div>
            </div>
            <div class="header_box">
                <div class="header_box_left">
                    <span>{{totalList.storeTotal}}</span>
                    <p>门店数</p>
                </div>
                <div class="header_box_right">
                    <i class="iconfont iconmendiantianchong"></i>
                </div>
            </div>
            <div class="header_box">
                <div class="header_box_left">
                    <span>{{totalList.usersTotal}}</span>
                    <p>门店账号数</p>
                </div>
                <div class="header_box_right">
                    <i class="iconfont iconrenyuan"></i>
                </div>
            </div>
        </div>

        <div class="trend_chart" v-loading="lineLoading">
            <div class="titles">
                <p>企业创建走势图</p>
                <el-dropdown class="pointer" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{timeActive.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item , index) in timeList" :key="index" :command="item">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="trend_chart_box">
                <div class="myChart" ref="myChart"></div> 
            </div>
        </div>

        <div class="table_list">
            <div class="table_box">
                <el-table :data="tableData" stripe border>
                    <el-table-column align="center" label="序号" width="50">
                        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="title" label="版块名称">
                        <template slot-scope="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="quantity" label="数量">
                        <template slot-scope="scope">{{ scope.row.quantity }}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="rate" label="百分比">
                        <template slot-scope="scope">{{ scope.row.rate }}</template>
                    </el-table-column>
                </el-table>
                <div class="total_box">
                    <span>合计</span>
                    <p>{{tableDataTotal}}</p>
                </div>
            </div>
            <div class="pie_chart">
                <div class="myChart2" ref="myChart2"></div> 
            </div>
        </div>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts');

import { enterpriseTotal , getCustomized } from "@/assets/api/data/data"
export default {
  name: "Data",
  components: {
  },
  data() {
    return {
        boxMaxHeight:"",
        totalList:{},
        timeList:[],
        timeActive:"",
        lineEchartsList:[],
        lineLoading:false,
        tableData: [],
        tableDataTotal:0
    }
  },
  created() {},
  methods: {
        handleCommand(command) {
            this.timeActive = command
            this.enterpriseTotalFn()
        },
        loadData(){
            this.timeActive = {
                id:new Date().getFullYear(),
                name:new Date().getFullYear() + "年"
            }
            this.enterpriseTotalFn()
            this.getCustomizedFn()
        },
        enterpriseTotalFn(){
            this.lineLoading = true;
            enterpriseTotal({time: this.timeActive.id}).then(res=>{
                if(res.status == 0){
                    this.lineEchartsList = res.data.data
                    this.timeList = res.data.time.year
                    this.totalList = res.data.total
                    this.totalList.conversionTow = Number.parseFloat(this.totalList.conversion)
                    this.lineEcharts()
                }
            }).catch(error=>{
                console.log("enterpriseTotal--- no");
                this.disabled = false
            })
        },
        getCustomizedFn(time){
            getCustomized({}).then(res=>{
                if(res.status == 0){
                    this.tableData = res.data.list
                    this.tableDataTotal = res.data.analysis.quantity
                    this.pieEcharts()
                }
            }).catch(error=>{
                console.log("enterpriseTotal--- no");
                this.disabled = false
            })
        },

      
        lineEcharts() {
            const that =this;
            let myChart = echarts.init(this.$refs.myChart);
            let chainTotalList = [], singleTotalList = [];
            this.lineEchartsList.map((item , index) => {
                chainTotalList.push(item.chainTotal)
                singleTotalList.push(item.singleTotal)
            })
            let option = {
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
                        bottom:'20px',
                        containLabel: true
                    },
                    legend: {
                        data:[
                            {
                                name:'连锁版',
                            },
                            {
                                name:'单店版'
                            }
                        ]
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
                            formatter: '{value}'
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
                            name:'单店版',
                            barWidth:'30px',
                            itemStyle:{
                                color:'#363E46'
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
                                }
                            },
                            data:singleTotalList
                        },
                        {
                            type: 'line',
                            name:'连锁版',
                            barWidth:'30px',
                            itemStyle:{
                                color:'#627AAD'
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
                                }
                            },
                            data:chainTotalList
                        },
                    ],
            };
            myChart.setOption(option);
            this.lineLoading = false;
        },
        pieEcharts() {
            const that =this;
            let myChart2 = echarts.init(this.$refs.myChart2);
            let titleList = [], dataList = [];
            this.tableData.map((item , index) => {
                titleList.push(item.title)
                dataList.push({
                    name:item.title,
                    value:item.quantity
                })
            })
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    type: 'scroll',
                    orient: 'vertical',
                    data:titleList
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: '150px',
                        center:['35%','50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:dataList
                    }
                ]
            }
            myChart2.setOption(option);
        },

 
  },
  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 40;
    this.loadData()
  },

  
};
</script>

<style scoped lang="scss">
.Data{
    header{
        line-height: 50px;
        padding-left: 20px;
        background: #fff;
        font-size: 14px;
        color: #333;
    }
    .box{
        padding: 20px;
        .header{
            display: flex;
            justify-content: space-between;
            .header_box{
                padding: 30px 0;
                background: #fff;
                display: flex;
                height: 100px;
                width: 24%;
                .header_box_left{
                    flex: 1;
                    padding-left: 30px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    span{
                        font-size: 34px;
                        color: #333;
                    }
                    p{
                        color: #666;
                    }
                }
                .header_box_right{
                    padding-right: 30px;
                    display: flex;
                    .progress{
                        width: 80px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        span{
                            color: #999999;
                            font-size: 12px;
                            padding-top: 5px;
                        }
                    }
                    .iconfont{
                        font-size: 60px;
                        align-self: flex-end;
                        color: #627AAD;
                    }
                }
            }
        }
        .trend_chart{
            margin-top: 20px;
            background: #fff;
            .titles{
                display: flex;
                height: 50px;
                align-items: center;
                padding: 0 20px;
                border-bottom: 1px solid #e5e5e5;
                p{
                    flex: 1;
                }
            }
            .trend_chart_box{
                height: 310px;
                padding-top: 10px;
                .myChart{
                    height: 310px;
                }
            }
        }
        .table_list{
            display: flex;
            margin-top: 20px;
            min-height: 450px;
            .table_box{
                flex: 1;
                background: #fff;
                padding: 20px;
                .total_box{
                    border: 1px solid #EBEEF5;
                    border-top: 0;
                    display: flex;
                    align-items: center;
                    height: 40px;
                    span{
                        width: 50px;
                        text-align: center;
                        color: #627AAD;
                    }
                    p{
                        text-align: center;
                        color: #627AAD;
                        flex: 1;
                    }
                }
            }
            .pie_chart{
                width: 40%;
                background: #fff;
                margin-left: 20px;
                padding: 20px;
                display: flex;
                align-items: center;
                .myChart2{
                    width: 100%;
                    height: 410px;
                }
            }
        }
    }
}
</style>
<style>
.Data .el-progress__text{
    font-size: 16px !important;
    color: #627AAD;
}
</style>
