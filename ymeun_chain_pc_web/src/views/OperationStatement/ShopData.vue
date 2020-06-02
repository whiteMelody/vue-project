<template>
  <div class="ShopData wb100">
    <p class="lh50px h50px">
      <span class="fl f16px fc-gray4">门店数据情况表</span>
    </p>

    <div class="clear0"></div>

    <div class="wb100">

      <div class="wb100">

        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
            <el-form-item label="">
                <date-slot :dateTime.sync="dateTime"></date-slot>
            </el-form-item>


            <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
            <!-- <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button> -->
        </el-form>

        <div class="market_total">
            <div>
                门店数据合计
            </div>
            <em></em>
            <ul>
                <li>
                    <p>销售总业绩(元)</p>
                    <span>{{info.sales_performance | _moneyFormat }}</span>
                </li>
                <li>
                    <p>划扣总人头(人)</p>
                    <span>{{info.consume_head}}</span>
                </li>
                <li>
                    <p>划扣总人次(次)</p>
                    <span>{{info.consume_number}}</span>
                </li>
                <li>
                    <p>划扣总业绩(元)</p>
                    <span>{{info.consume_performance | _moneyFormat }}</span>
                </li>
                <li>
                    <p>成交总人头(人)</p>
                    <span>{{info.order_head}}</span>
                </li>
                <li>
                    <p>成交总人次(人)</p>
                    <span>{{info.order_number}}</span>
                </li>
            </ul>
        </div>


        <div class="clear2"></div>

        <div class="lh38px h40px pointer">
          <template v-if="showType == 0">
            <span class="fl fc-green2 f16px bd-green2 bd-b2">门店数据情况表</span>
            <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
            <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">可视化图表</span>
          </template>
          <template v-else-if="showType == 1">
            <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">门店数据情况表</span>
            <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
            <span class="fl fc-green2 f16px bd-green2 bd-b2">可视化图表</span>
          </template>
        </div>

        <div class="clear4"></div>

        <template v-if="showType == 0">
          <base-list ref="demoTable" :condition="condition"
                     :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="false"
                     v-on:listLoaded="getLoaded">

            <el-table slot="list" :data="demoList" stripe border>

              <el-table-column prop="store.name" align="left" label="门店名称">
                <template slot-scope="scope">
                  {{scope.row.store.name}}
                </template>
              </el-table-column>

              <el-table-column prop="sales_performance" align="center" label="销售业绩(元)">
                <template slot-scope="scope">
                  {{ scope.row.sales_performance | _moneyFormat }}
                </template>
              </el-table-column>

              <el-table-column prop="order_head" align="center" label="成交人头(人)">
                <template slot-scope="scope">
                  {{ scope.row.order_head }}
                </template>
              </el-table-column>

              <el-table-column prop="order_number" align="center" label="成交人次(次)">
                <template slot-scope="scope">
                  {{ scope.row.order_number }}
                </template>
              </el-table-column>

              <el-table-column prop="consume_performance" align="center" label="划扣业绩(元)">
                <template slot-scope="scope">
                  {{ scope.row.consume_performance | _moneyFormat }}
                </template>
              </el-table-column>

              <el-table-column prop="consume_head" align="center" label="划扣人头(人)">
                <template slot-scope="scope">
                  {{ scope.row.consume_head }}
                </template>
              </el-table-column>

              <el-table-column prop="consume_number" align="center" label="划扣人次(次)">
                <template slot-scope="scope">
                  {{ scope.row.consume_number }}
                </template>
              </el-table-column>


            </el-table>
          </base-list>
        </template>

        <template v-else>
          <div class="myChart" ref="myChart" v-loading="loading"></div>
        </template>

      </div>

      <div class="clear0"></div>

    </div>

  </div>
</template>

<script>

  import { storePerformance } from "@/assets/api/manage/statistics"
  import dateSlot from '@/components/date/dateSlot'
  const echarts = require('echarts');

  export default {
    name: "ShopData",
    components: {
      dateSlot
    },
    data() {
      return {
        dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
        condition: {
          startTime: this.$base.getDateScope(0).startTime,
          stopTime: this.$base.getDateScope(0).endTime,
          hiddenEmpty:0
        }, 
        echartsCondition:{},   
        // dateTime: [],
        // condition: {}, // 查询条件
        demoList: [],                      // table数组
        pageSearch: storePerformance,       // 分页查询api接口
        info: {},
        isHideEmpty: false,
        showType: 0,      // 0 表格 | 1 图表
        loading: true,

      }
    },
    mounted() {
      // this.storePerformanceFn()
    },
    methods: {

      switchExpansion(row) {
        if(row.child){
          if(row.child.length)
            this.$refs.myTable.toggleRowExpansion(row)
        }
      },

      changeShowType(type){
        this.showType = type
        if(type == 1){
          this.condition.hiddenPartent = 0;
          this.condition.hiddenEmpty = 1;
          this.isHideEmpty = true
          this.storePerformanceFn()
        }else if(type == 2){
          this.condition.hiddenPartent = 1;
          this.condition.hiddenEmpty = 1;
          this.isHideEmpty = true
          this.storePerformanceFn()
        }
      },

      tableRowClassName({row, rowIndex}) {
        if(row.child){
          return 'bg-white';
        }else{
          return 'bg-white2';
        }
      },

      loadData() {
        if(this.showType == 0){
          this.$refs.demoTable.loadData()
        }else{
          this.storePerformanceFn()
        }
      },

      getLoaded(data){
        this.info = data.totalData
      },

      hideEmpty(num){
        if(num == 0)
        {
          this.isHideEmpty = false
        }
        else
        {
          this.isHideEmpty = true
        }
        this.condition.hiddenEmpty = num
        this.loadData()
      },

      _RateFormat: (number) =>{

        number = number.substring(0,number.length-1)

        var f = parseFloat(number);
        if (isNaN(f)) {
          return 0;
        }
        var f = Math.floor(number * 100) / 100;
        let _s = f.toString();
        let rs = _s.indexOf('.');
        if (rs < 0) {
          rs = _s.length;
          _s += '.';
        }
        while (_s.length <= rs + 2) {
          _s += '0';
        }

        return _s;
      },

      storePerformanceFn(){
        this.loading = true

        storePerformance(this.condition).then(res=>{
          if(res.status == 0){
            let myChart = echarts.init(this.$refs.myChart);
            var DataTooltip = new Array();
            var Data = new Array();
        
            res.data.list.map((item , index) => {
              var tDataTooltip = item.store.name
              DataTooltip.push(tDataTooltip);
              var tData = {value:0,name:""};
              // tData.name = item.name + "  " + item.quantity + "  " + item.ratio;
              tData.value = item.sales_performance;
              tData.name = item.store.name;
              Data.push(tData);
            })
     
            var option = {
              tooltip : {
                  trigger: 'item',
                  formatter: "{a}<br/>{b}&nbsp;{c}&nbsp;{d}%"
              },
              legend: {
                  x : 'center',
                  y : 'bottom',
                  type: 'scroll',
                  data: DataTooltip
              },
              calculable : true,
              series : [
                  {
                      name:"项目销售情况表",
                      type:'pie',
                      radius : "55%",
                      center : ['50%', '50%'],
                      data:Data
                  }
              ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            this.loading = false
            this.info = res.data.totalData
          }
        }).catch(error=>{
          console.log("getSale no");
        })
      }

    },
    watch: {
      dateTime(c, o){
        this.condition.startTime = c[0]
        this.condition.stopTime = c[1]
      }
    }

  }

</script>

<style scoped lang="scss">
.myChart{
  height: 600px;
}
.market_total{
    display: flex;
    align-items: center;
    background: #FFEAEB;
    div{
        width: 200px;
        text-align: center;
        color: #333333;
        font-size: 16px;
    }
    em{
        width: 1px;
        height: 40px;
        background: #EC414D;
        margin: .3rem 0;
    }
    ul{
        display: flex;
        padding-left: .5rem;
        flex: 1;
        flex-wrap: wrap;
        li{
            width:  16%;
            p{
                font-size: 14px;
                color: #666;
                padding-bottom: .1rem;
            }
            span{
                font-size: 20px;
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
            }
        }
    }
}

</style>

