<template>

  <div class="DataAnalysis">
      <div class="box">
        <div class="total" v-loading="totalLoading">
          <ul v-if="!totalLoading">
            <li>
              <div class="header">
                <span>门店得分</span>
                <p>
                  <i class="iconfont iconriqi"></i>
                  <a>{{info.store.cycle}}</a>
                </p>
              </div>
              <div class="total_box">
                <div>
                  <span class="color1">{{info.store.score}}</span>
                  <em>分</em>
                </div>
                <p>
                  <span>{{info.store.comment}}</span>
                  <a @click="$router.push({name: 'DataAnalysisDetail',query:{type:1 } })">查看详情</a>
                </p>
              </div>
            </li>
            <li>
              <div class="header">
                <span>{{$store.getters.roleName.adviser}}平均得分</span>
                <p>
                  <i class="iconfont iconriqi"></i>
                  <a>{{info.adviser.cycle}}</a>
                </p>
              </div>
              <div class="total_box">
                <div>
                  <span class="color2">{{info.adviser.score}}</span>
                  <em>分</em>
                </div>
                <p>
                  <span>{{info.adviser.comment}}</span>
                  <a @click="$router.push({name: 'DataAnalysisDetail',query:{type:2 } })">查看详情</a>
                </p>
              </div>
            </li>
            <li>
              <div class="header">
                <span>{{$store.getters.roleName.technician}}平均得分</span>
                <p>
                  <i class="iconfont iconriqi"></i>
                  <a>{{info.technician.cycle}}</a>
                </p>
              </div>
              <div class="total_box">
                <div>
                  <span class="color3">{{info.technician.score}}</span>
                  <em>分</em>
                </div>
                <p>
                  <span>{{info.technician.comment}}</span>
                  <a @click="$router.push({name: 'DataAnalysisDetail',query:{type:3 } })">查看详情</a>
                </p>
              </div>
            </li>
            <li>
              <div class="header">
                <span>{{$store.getters.roleName.reception}}平均得分</span>
                <p>
                  <i class="iconfont iconriqi"></i>
                  <a>{{info.reception.cycle}}</a>
                </p>
              </div>
              <div class="total_box">
                <div>
                  <span class="color4">{{info.reception.score}}</span>
                  <em>分</em>
                </div>
                <p>
                  <span>{{info.reception.comment}}</span>
                  <a @click="$router.push({name: 'DataAnalysisDetail',query:{type:4 } })">查看详情</a>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div class="echarts_box">

          <div class="echarts_tab">
            <ul>
              <li :class="roleType == 0 ? 'active' : ''" @click="roleChangeFn(0)">
                <span>{{$store.getters.roleName.adviser}}得分</span>
                <b></b>
              </li>
              <li>
                <em></em>
              </li>
              <li :class="roleType == 1 ? 'active' : ''" @click="roleChangeFn(1)">
                <span>{{$store.getters.roleName.technician}}得分</span>
                <b></b>
              </li>
              <li>
                <em></em>
              </li>
              <li :class="roleType == 2 ? 'active' : ''" @click="roleChangeFn(2)">
                <span>{{$store.getters.roleName.reception}}得分</span>
                <b></b>
              </li>
            </ul>
            <div class="echarts_chage">
              <div class="btn">
                <span v-if="isEcharts == 1" @click="isEchartsFn(0)">图形查看</span>
                <span v-else @click="isEchartsFn(1)">列表查看</span>
              </div>
              <div class="timer">
                <el-date-picker
                  v-model="timeListActive"
                  @change="loadData"
                  format="yyyy - MM "
                  value-format="yyyy-MM"
                  type="month"
                  :clearable="false"
                  placeholder="请选择时间">
                </el-date-picker>
              </div>
            </div>
          </div>

          
          <div class="echarts_list" v-show="isEcharts == 1">
             <base-list :condition="condition"
                    ref="demoTable"
                     :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true"
                     v-on:listLoaded="getLoaded">
                <el-table slot="list" :data="demoList" stripe border>

                    <el-table-column prop="weight" align="center" label="得分排名">
                        <template slot-scope="scope">
                            {{scope.row.weight}}
                        </template>
                    </el-table-column>
              
                    <el-table-column prop="members" align="center" label="员工姓名">
                        <template slot-scope="scope">
                            {{ scope.row.members.name }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="score" align="center" label="员工得分">
                        <template slot-scope="scope">
                            {{ scope.row.score }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="comment" align="center" label="得分总评">
                        <template slot-scope="scope">
                            {{ scope.row.comment }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="score" align="center" label="得分详情">
                        <template slot-scope="scope">
                          <p class="gaipai">
                            <span @click="$router.push({name: 'DataAnalysisDetail',query:{ id: scope.row.members.users_id,type:5,name:scope.row.members.name } })">查看</span>
                          </p>
                        </template>
                    </el-table-column>

                </el-table>
            </base-list>
          </div>


          <div class="echarts_list" v-show="isEcharts == 0">
            <div ref="myChart" class="myChart" v-loading="loading"></div>
          </div>
          
        </div>
      </div>
  </div>

</template>
<script>




  import { getAchievementsDashboard , getAchievementsRank } from "@/shop/assets/api/personnelData/personnelData"

  const echarts = require('echarts');

  export default {
    name: "DataAnalysis",
    data() {
      return {
        userMessageShow:false,
        isEcharts:1,
        roleType:0,
        timeListActive:this.$base.getDateScope(6).startTime,
        form: {},
        condition: {
        },      
        demoList: [],                      // table数组
        pageSearch: getAchievementsRank,       // 分页查询api接口
        info:{},
        loading:false,
        totalLoading:false,
      }
    },
    components: {
    
    },
    methods: {
  
      handleCommand(item) {
        this.timeListActive = item
        
      },
      userMessageShowFn(v) {
        this.userMessageShow = v;
      },
      
      roleChangeFn(type){
        this.roleType = type
        this.loadData()
      },
      isEchartsFn(type){
        this.isEcharts = type
        this.loadData()
      },
   
      loadData() {
        if(this.roleType == 0){
          this.condition.positionId = this.info.adviser.id
        }
        else if(this.roleType == 1){
          this.condition.positionId = this.info.technician.id
        }
        else if(this.roleType == 2){
          this.condition.positionId = this.info.reception.id
        }

        this.condition.cycle = this.timeListActive
        if(this.isEcharts == 1){
          this.$refs.demoTable.loadData()
        }else{
          this.echartsData()
        }
      },

      getLoaded(data){
         
      },
      


      echartsData() {
        this.loading = true;
        const that =this;
        getAchievementsRank(this.condition).then(res=>{
          if(res.status == 0){
            let membersData = [],membersTieleData = [];
            res.data.list.map((item , index) => {
              membersTieleData.push(item.members.name)
              membersData.push({
                name:item.members.name,
                value:item.score
              })
            })
            let myChart = echarts.init(this.$refs.myChart);
            let option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '0',
                right: '0',
                top: '10px',
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
                data: membersTieleData,
            
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
                }
              },
              series: [
                {
                  type: 'bar',
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
                  data:membersData

                },
              ],
            };

            console.log(option);
            myChart.setOption(option);

            // 给每条数据的热区增加点击事件
            let xIndex,Ymonth;
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
                    that.$router.push({
                      path: "/DataAnalysisDetail",
                      query:{
                        id:res.data.list[xIndex].members.users_id,
                        type:5,
                        name:res.data.list[xIndex].members.name
                      }
                    });
                    
            
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
            console.log('getAchievementsRank no');
        })
        
      },

    },
    // 创建完毕状态
    created() {
      this.totalLoading = true;
      getAchievementsDashboard({}).then(res=>{
          if(res.status == 0){
              this.info = res.data
              this.loadData()
          }else{
              this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
              });
          }
        this.totalLoading = false;
        
      }).catch(error=>{
          console.log('getAchievementsDashboard no');
      })

    },

    // 挂载结束状态
    mounted() {
      
      // this.echartsData()
    },
    // 更新前状态
    beforeUpdate() {
     
    },
  };
</script>
<style lang="scss" scoped>
.DataAnalysis{
  
  header{
    height: 50px;
    line-height: 50px;
    color: #333;
    font-size: 14px;
    background: #fff;
  }
  .box{
    padding: 20px;
    .total{
      height: 188px;
      ul{
        display: flex;
        justify-content: space-between;
        li{
          flex: 1;
          background: #fff;
          margin-right: 20px;
          padding: 0 20px;
          .header{
            height: 50px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #F2F2F2;
            color: #666;
              font-size: 14px;
            span{
              flex: 1;
              
            }
            p{
              display: flex;
              align-items: center;
              i{
                font-size: 14px;
                margin-right: 5px;
              }
            
            }
          }
          .total_box{
            padding: 16px 0;
            div{
              display: flex;
              align-items: flex-end;
              span{
                font-size: 34px;
                &.color1{
                  color: #F10215;
                }
                &.color2{
                  color: #FF5722;
                }
                &.color3{
                  color: #009688;
                }
                &.color4{
                  color: #C09346;
                }
              }
              em{
                font-style: normal;
                padding-left: 8px;
                position: relative;
                top: -6px;
              }
            }
            p{
              display: flex;
              align-items: flex-end;
              height: 60px;
              span{
                flex: 1;
                align-self:flex-start;
                color: #333;
                width: 120px;
                overflow:hidden; //超出文本隐藏
                text-overflow:ellipsis; //溢出省略号显示
                display:-webkit-box; //将对象作为弹性伸缩盒子
                -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式-从上到下垂直排列
                -webkit-line-clamp:3; //这个属性不是css的规范属性，需要组合上面两个属性，数组代表显示的行数,如2,3,4....
              }
              a{
                margin-left: 10px;
                border:1px solid rgba(13,201,229,1);
                border-radius:14px;
                line-height: 28px;
                height: 28px;
                color: #0DC9E5;
                line-height: 28px;
                text-align: center;
                width: 86px;
                cursor: pointer;
              }
            }
          }
          &:last-of-type{
            margin-right: 0;
          }
        }
        
      }
    }
    .echarts_box{
      margin-top: 20px;
      background: #fff;
      padding: 0 20px;
      .echarts_tab{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #E5E5E5;
        ul{
          display: flex;
          flex: 1;
          li{
            display: flex;
            align-items: center;
            position: relative;
            height: 50px;
            cursor: pointer;
            span{
              color: #999;
              font-size: 14px;
            }
            b{
              position: absolute;
              height: 2px;
              background: #333;
              width: 100%;
              bottom: 0;
              display: none;
            }
            em{
              width: 1px;
              height: 10px;
              background: #E5E5E5;
              margin: 0 10px;
            }
            &.active{
              span{
                color: #333;
              }
              b{
                display: block;
              }
            }              

          }
        }
        .echarts_chage{
          display: flex;
          align-items: center;
          .btn{
            display: flex;
            align-items: center;
            margin-right: 20px;
            span{
              display: block;
              border:1px solid rgba(153,153,153,1);
              border-radius:2px;
              font-size: 14px;
              color: #333;
              line-height: 30px;
              width: 70px;
              text-align: center;
              cursor: pointer;
            }
          }
          .timer{
            width: 160px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
        }
      }
      .echarts_list{
        padding: 20px 0;
        height: 500px;
        .myChart{
          height: 100%;
        }
      }
    }
  }
}
</style>


<style>
.DataAnalysis .gaipai{
  display: flex;
  align-items: center;
  justify-content: center;
}
.DataAnalysis .gaipai span{
  cursor: pointer;
  color: #0DC9E5;
}
.el-month-table td.today .cell {
    color: #606266;
    font-weight: 400;
}

.el-month-table td.today .cell:hover {
  color: #0DC9E5;
}

</style>


    
