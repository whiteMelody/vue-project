<template>
  <div class="salesProject wb100">
    <p class="lh50px h50px">
      <span class="fl f16px fc-gray4">品项销售情况表</span>
      <span class="fl mal20 f14px fc-gray3">数据每十分钟更新一次</span>
    </p>

    <div class="clear0"></div>

    <div class="wb100">

      <div class="wb100">

        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
          <el-form-item label="">
            <date-slot :dateTime.sync="dateTime"></date-slot>
          </el-form-item>

          <template v-if="isHideEmpty">
            <el-button @click="hideEmpty(0)">显示空数据</el-button>
          </template>
          <template v-else>
            <el-button @click="hideEmpty(1)">隐藏空数据</el-button>
          </template>

          <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
          <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
        </el-form>

        <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

          <div class="wb20 fl h40px lh40px bd-gray bd-r1 mat15">
            品项销售合计
          </div>

          <div class="wb15 fl">
            <p class="fc-gray3 h20px lh20px">销售总额（元）</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.orders_amount | _filterNumFormat}}</p>
          </div>
          <div class="wb15 fl">
            <p class="fc-gray3 h20px lh20px">退款总额（元）</p>
            <div class="clear2"></div>
            <p class="fc-red f20px h40px lh40px">{{info.refund_amount | _filterNumFormat}}</p>
          </div>
          <div class="wb15 fl">
            <p class="fc-gray3 h20px lh20px">欠款总额（元）</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.arrears_amount | _filterNumFormat}}</p>
          </div>
          <div class="wb15 fl">
            <p class="fc-gray3 h20px lh20px">实际金额（元）</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.actual_amount | _filterNumFormat}}</p>
          </div>

          <div class="clear0"></div>

        </div>


        <div class="clear2"></div>

        <div class="pal20 lh38px h40px pointer">
          <template v-if="showType == 0">
            <span class="fl fc-green2 f16px bd-green2 bd-b2">品项销售情况表</span>
            <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
            <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">大类可视化图表</span>
            <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
            <span class="fl fc-gray2 f16px pab2" @click="changeShowType(2)">二类可视化图表</span>
          </template>
          <template v-else-if="showType == 1">
            <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">品项销售情况表</span>
            <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
            <span class="fl fc-green2 f16px bd-green2 bd-b2">大类可视化图表</span>
            <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
            <span class="fl fc-gray2 f16px pab2" @click="changeShowType(2)">二类可视化图表</span>
          </template>
          <template v-else>
            <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">品项销售情况表</span>
            <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
            <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">大类可视化图表</span>
            <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
            <span class="fl fc-green2 f16px bd-green2 bd-b2">二类可视化图表</span>
          </template>
        </div>

        <div class="clear4"></div>

        <template v-if="showType == 0">
          <base-list :condition="condition"
                    ref="demoTable"
                     :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="false"
                     v-on:listLoaded="getLoaded">

            <el-table slot="list" :data="demoList" border
                      row-key="id"
                      :row-class-name="tableRowClassName"
                      ref="myTable"
                      @row-click="switchExpansion"
                      :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
            >

              <el-table-column prop="name" align="center" label="名称">
                <template slot-scope="scope">
                  {{scope.row.name}}
                </template>
              </el-table-column>

              <el-table-column prop="quantity" align="center" label="销售次数">
                <template slot-scope="scope">
                  {{ scope.row.quantity }}
                </template>
              </el-table-column>

              <el-table-column prop="orders" align="center" label="销售总额">
                <template slot-scope="scope">
                  {{ scope.row.orders | _FloatFormat}}
                </template>
              </el-table-column>

              <el-table-column prop="refund" align="center" label="退款总额">
                <template slot-scope="scope">
                  {{ scope.row.refund | _FloatFormat }}
                </template>
              </el-table-column>

              <el-table-column prop="actual" align="center" label="实际金额">
                <template slot-scope="scope">
                  {{ scope.row.actual | _FloatFormat }}
                </template>
              </el-table-column>

              <el-table-column prop="ratio" align="center" label="销售占比">
                <template slot-scope="scope">
                  {{ scope.row.ratio | _RateFormat }}
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

  import { getSale } from "@/shop/assets/api/manage/statistics"
  import dateSlot from '@/shop/components/date/dateSlot'
  const echarts = require('echarts');

  export default {
    name: "salesProject",
    components: {
      dateSlot
    },
    data() {
      return {
        dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
        condition: {
          startTime: this.$base.getDateScope(0).startTime,
          stopTime: this.$base.getDateScope(0).endTime,
          hiddenEmpty:1
        }, 
        echartsCondition:{},   
        // dateTime: [],
        // condition: {}, // 查询条件
        demoList: [],                      // table数组
        pageSearch: getSale,       // 分页查询api接口
        info: {},
        isHideEmpty: true,
        showType: 0,      // 0 表格 | 1 图表
        loading: true,

      }
    },
    mounted() {
      // this.getSaleFn()
    },
    methods: {
      //导出Excel
      deriveExcel() {
        let params = this.$base.copySearchConditions(this.condition);
        let url = ''
        if(window.location.hostname == this.$base.getChainHost()){
          url = `https://${location.hostname}/post/export/items/getSale`;
        }else{
          url = `http://${location.hostname}:${location.port}/post/export/items/getSale`;
        }
        url += `?downloadUserId=${this.$store.getters.currentUser.users_id}&hiddenEmpty=${params.hiddenEmpty}`;
        url += `&startTime=${params.startTime}&stopTime=${params.stopTime}`;
        window.location.href = url;
      },

      switchExpansion(row) {
        if(row.child){
          if(row.child.length)
            this.$refs.myTable.toggleRowExpansion(row)
        }
      },

      // changeShowType(type){
        // this.showType = type;
        // this.condition.hiddenPartent = 1;
        // this.condition.hiddenEmpty = 1;
        // this.isHideEmpty = true
        // if(type == 1 || type == 2){
          // this.getSaleFn()
          // this.condition.hiddenPartent = 1;
          // this.condition.hiddenEmpty = 1;
          // this.isHideEmpty = true
        // }
        // else{
        //   this.condition.hiddenPartent = 1;
        //   this.condition.hiddenEmpty = 1;
        //   this.isHideEmpty = true
        // }
      // },
        changeShowType(type){
          this.showType = type
          if(type == 1){
            this.condition.hiddenPartent = 0;
            this.condition.hiddenEmpty = 1;
            this.isHideEmpty = true
            this.getSaleFn()
          }else if(type == 2){
            this.condition.hiddenPartent = 1;
            this.condition.hiddenEmpty = 1;
            this.isHideEmpty = true
            this.getSaleFn()
          }else{
            this.condition.hiddenPartent = 0
            this.condition.hiddenEmpty = 0
            this.isHideEmpty = false
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
          this.getSaleFn()
        }
      },

      getLoaded(data){
        this.info = data.analisis
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
        this.loadData();
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

      getSaleFn(){
        this.loading = true

        getSale(this.condition).then(res=>{
          if(res.status == 0){
            let myChart = echarts.init(this.$refs.myChart);
            var DataTooltip = new Array();
            var Data = new Array();
        
            res.data.list.map((item , index) => {
              var tDataTooltip = item.name + "  " + item.actual + "  " + item.ratio
              DataTooltip.push(tDataTooltip);
              var tData = {value:0,name:""};
              // tData.name = item.name + "  " + item.quantity + "  " + item.ratio;
              tData.value = item.actual;
              tData.name = item.name + "  " + item.actual + "  " + item.ratio;
              Data.push(tData);
            })
     
            var option = {
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}"
              },
              legend: {
                  x : 'center',
                  y : 'bottom',
                  type: 'scroll',
                  data: DataTooltip
              },
              // toolbox: {
              //     show : true,
              //     feature : {
              //         mark : {show: true},
              //         dataView : {show: true, readOnly: false},
              //         magicType : {
              //             show: true,
              //             type: ['pie', 'funnel']
              //         },
              //         restore : {show: true},
              //         saveAsImage : {show: true}
              //     }
              // },
              calculable : true,
              series : [
                  {
                      name:"品项销售情况表",
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
            this.info = res.data.analisis
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


</style>

