<template>
  <div class="TeamManagementList ma20">

    <div class="pal24 par24 pat20 pab20 bg-white">

      <div class="wb100 ">

        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
          <el-form-item>
              <el-select v-model="timeIndex" placeholder="选择时间范围" readonly clearable>
                  <el-option v-for="(item,index) in time_list" :key="index" :label="item.start_time + ' 至 ' + item.stop_time"
                          :value="index"></el-option>
              </el-select>
          </el-form-item>

          <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
          <el-button type="danger" class="h32px"  @click="$router.push({name:'SetTargetSingle'})" v-if="allowed">设置员工目标</el-button>
        </el-form>

        <!-- <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

          <div class="wb14 fl h40px lh40px bd-gray bd-r1 mat15">
            员工目标合计
          </div>
          <div class="wb14 fl">
            <p class="fc-gray3 h20px lh20px">销售业绩（元）</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.amount | _filterNumFormat}}</p>
          </div>
          <div class="wb14 fl">
            <p class="fc-gray3 h20px lh20px">成交人头(人)</p>
            <div class="clear2"></div>
            <p class="fc-red f20px h40px lh40px">{{info.order_customer}}</p>
          </div>
          <div class="wb14 fl">
            <p class="fc-gray3 h20px lh20px">成交人次(次)</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.order_customer_quantity}}</p>
          </div>
          <div class="wb14 fl">
            <p class="fc-gray3 h20px lh20px">划扣业绩(元)</p>
            <div class="clear2"></div>
            <p class="fc-red f20px h40px lh40px">{{info.valume | _filterNumFormat}}</p>
          </div>
          <div class="wb14 fl">
            <p class="fc-gray3 h20px lh20px">划扣人头(人)</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.quantity}}</p>
          </div>
          <div class="wb14 fl">
            <p class="fc-gray3 h20px lh20px">划扣人次(次)</p>
            <div class="clear2"></div>
            <p class="fc-blue6 f20px h40px lh40px">{{info.customer}}</p>
          </div>

          <div class="clear0"></div>

        </div> -->

        <!-- <div class="clear4"></div> -->

        <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
          <el-table slot="list" :data="demoList" stripe border>
            <el-table-column prop="id" align="center" label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column align="center" label="目标时间段">
              <template slot-scope="scope" prop="start_time">
                {{ timerTransition(scope.row.start_time)  + '至'+ timerTransition(scope.row.stop_time) }}
              </template>
              
            </el-table-column>
            <el-table-column prop="amount" align="center" label="销售业绩(元)">
              <template slot-scope="scope">
                {{ scope.row.amount | _filterNumFormat}}
              </template>
            </el-table-column>
            <el-table-column prop="order_customer" align="center" label="成交人头(人)">
              <template slot-scope="scope">
                {{ scope.row.order_customer }}
              </template>
            </el-table-column>
            <el-table-column prop="order_customer_quantity" align="center" label="成交人次(次)">
              <template slot-scope="scope">
                {{ scope.row.order_customer_quantity }}
              </template>
            </el-table-column>
            <el-table-column prop="valume" align="center" label="划扣业绩(元)">
              <template slot-scope="scope">
                {{ scope.row.valume | _filterNumFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="quantity" align="center" label="划扣人头(人)">
              <template slot-scope="scope">
                {{ scope.row.customer }}
              </template>
            </el-table-column>
            <el-table-column prop="customer" align="center" label="划扣人次(次)">
              <template slot-scope="scope">
                {{ scope.row.quantity }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="240">
              <template slot-scope="scope">
                <p class="affirm">
                  <a class="buttonStyle_class" @click="goToURL(scope.row)" >查看详情</a>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </base-list>
      </div>

      <div class="clear0"></div>

    </div>

  </div>
</template>

<script>

  import { getList } from "@/shop/assets/api/manage/teamManagement"
  import { getTime } from "@/shop/assets/api/home/home";
  import dateSlot from '@/shop/components/date/dateSlot'
  import {getProgramList} from "@/shop/assets/api/common/common"

  export default {
    name: "CounselorTarget",
    components: {
      dateSlot
    },
    data() {
      return {
        // dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
        dateTime: [],
        condition: {
            // startTime: this.$base.getDateScope(0).startTime,
            // stop_time: this.$base.getDateScope(0).endTime,
        },      
        demoList: [],                      // table数组
        pageSearch: getList,       // 分页查询api接口
        info:{},
        time_list: [],
        timeIndex: '',
        allowed:false,
      }
    },
    watch: {

    },
    mounted() {
      getTime({}).then(res=>{
        this.time_list = res.data.list;
      }).catch(error=>{
        console.log("getTime no");
      })
      getProgramList().then(res => {
         if (res.status == 0) {
          if (res.data.compose.id == 2) {
            this.allowed = true;
          }
          else{
            this.allowed = false;
          }
         }
       }).catch(error=>{
        console.log("getProgramList no");
      })
    },
    methods: {

      //时间转换
      timerTransition(key){
        if(key == "" || key == null){
          return
        }
        key *= 1000;
        let date = new Date(key);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d 
      },

      loadData() {

        if(this.$base.isNull(this.timeIndex)){
          this.condition.startTime = ''
          this.condition.endTime = ''
        }else{
          this.condition.startTime = this.time_list[this.timeIndex].start_time
          this.condition.endTime = this.time_list[this.timeIndex].stop_time
        }

        this.$refs.demoTable.loadData()
      },

      getLoaded(data){
        this.info = data.analysis
      },

      goToURL(item){
        if(this.allowed){
          this.$router.push({
            path:'/SetTargetSingle',
            query: { 
              startTime: item.start_time,
              endTime: item.stop_time
            }
          })
        }
        else{
          this.$router.push({
            path:'/SetTarget',
            query:{targetId:item.id }
          })
        }
      }

    },
 

  }

</script>

<style scoped lang="scss">

</style>
