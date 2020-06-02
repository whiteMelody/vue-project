<template>
  <div class="MissionCenter" v-loading="loading" :style="'min-height: '+boxMaxHeight+'px;'">
    <div class="titles">
      <div class="titles_tabs">
        <span>{{dataInfo}}数据</span>
      </div>

      <div class="timesTab">
        <ul>
          <li v-for="(item, index) in tabList" :key="index" @click="tabClick(index,item)">
            <div class="text" :class="{textActive:tabActive == index}">{{item.name}}</div>
            <i></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="data_card">
      <div>
        <span>{{storeList.ordersPrice | _filterNumFormat}}</span>
        <h4>总销售业绩（元）</h4>
      </div>
      <div>
        <span>{{storeList.head}}</span>
        <h4>总成交人头（人）</h4>
      </div>
      <div>
        <span>{{storeList.weight}}</span>
        <h4>总成交人次（次）</h4>
      </div>
      <div>
        <span>{{storeList.consume.consumePrice | _filterNumFormat}}</span>
        <h4>总划扣业绩（元）</h4>
      </div>
      <div>
        <span>{{storeList.consume.consumrNum}}</span>
        <h4>总划扣人头（人）</h4>
      </div>
      <div>
        <span>{{storeList.consume.consumeFrequency}}</span>
        <h4>总划扣人次（次）</h4>
      </div>
      
    </div>
    <div class="dataScreening">
      <!-- <div class="data_left">
        <ul>
          <li>
            <div class="moeny">
              <span>{{storeList.consume.consumrNum}}</span>
            </div>
            <div class="text">
              <span>总划扣人头（人）</span>
              <div class="icon">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconzongxiaohaorentou"></use>
                </svg>
              </div>
            </div>
          </li>
          <li>
            <div class="moeny">
              <span>{{storeList.consume.consumeFrequency}}</span>
            </div>
            <div class="text">
              <span>总划扣人次（次）</span>
              <div class="icon">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconrenci"></use>
                </svg>
              </div>
            </div>
          </li>
          <li>
            <div class="moeny">
              <span>{{storeList.consume.consumePrice}}</span>
            </div>
            <div class="text">
              <span>总划扣业绩（元）</span>
              <div class="icon">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconhuakouyeji"></use>
                </svg>
              </div>
            </div>
          </li>
          <li>
            <div class="moeny">
              <span>{{storeList.ordersPrice / 100}}</span>
            </div>
            <div class="text">
              <span>总销售业绩（元）</span>
              <div class="icon">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconxiaoshouyeji"></use>
                </svg>
              </div>
            </div>
          </li>
        </ul>
      </div> -->
      <div class="data_right">
        <ul v-if="!loading">
          <li>
            <Card height="150" :data="taskTotal" type="1"></Card>
          </li>
          <li>
            <Card height="150" :data="reviewTotal" type="1"></Card>
          </li>
          <li>
            <Card height="150" :data="ordersTotal" type="1"></Card>
          </li>
          <li>
            <Card height="150" :data="ziXunTotal" type="1"></Card>
          </li>
        </ul>
      </div>
    </div>

    <div class="listBox">
      <el-table slot="list" :data="demoList" stripe border>
        <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>

        <el-table-column prop="role_id" align="center" label="职位">
          <template slot-scope="scope">{{ scope.row.role_id + '' | _filterRole }}</template>
        </el-table-column>

        <el-table-column prop="name" align="center" label="姓名">
          <template slot-scope="scope">
            <p class="nameColor">{{ scope.row.name }}</p>
          </template>
        </el-table-column>

        <el-table-column prop="task" align="center" label="任务数（条）">
          <template slot-scope="scope">{{ scope.row.task }}</template>
        </el-table-column>

        <el-table-column prop="taskCompletePercentage" align="center" label="任务完成率">
          <template slot-scope="scope">
            <span :class="scope.row.TaskClass">{{ scope.row.taskCompletePercentage | _RateFormat}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="review" align="center" label="回访数（次）">
          <template slot-scope="scope">{{ scope.row.review }}</template>
        </el-table-column>

        <el-table-column prop="reviewCompletePercentage" align="center" label="回访完成率">
          <template slot-scope="scope">
            <span :class="scope.row.ReturnVisitClass">{{ scope.row.reviewCompletePercentage | _RateFormat}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="price" align="center" label="销售业绩（元）">
          <template slot-scope="scope">{{ scope.row.price | _FloatFormat}}</template>
        </el-table-column>

        <el-table-column prop="dealCount" align="center" label="成交数（次）">
          <template slot-scope="scope">{{ scope.row.dealCount }}</template>
        </el-table-column>

        <el-table-column prop="zixunCount" align="center" label="咨询数（次）">
          <template slot-scope="scope">{{ scope.row.zixunCount }}</template>
        </el-table-column>

        <el-table-column align="center" label="操作" v-if="allowed == 1">
          <template slot-scope="scope">
            <p class="buttonStyle_class" @click="taskDetailsClick(scope.row.users_id,scope.row.role_id,)">查看详情</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import { getProgramList } from "@/shop/assets/api/common/common"
import { getMissionCenter } from "@/shop/assets/api/task/taskList";
import Card from "../../../components/home/Card";
export default {
  name: "MissionCenter",
  data() {
    return {
      boxMaxHeight:"",
      tabList: [
        { name: "本月", option: "1" },
        { name: "今日", option: "2" },
        { name: "昨日", option: "3" },
        { name: "上周", option: "4" },
        { name: "本年", option: "5" }
      ],
      dataInfo:'本月',
      mark: 1,
      tabActive: 0,
      storeList: { consume: { consumrNum: "" } },
      demoList: [], // table数组
      loading: false,
      taskTotal: [],
      reviewTotal: [],
      ordersTotal: [],
      ziXunTotal: [],
      allowed: 0,

    };
  },
  components: { Card },
  methods: {
    // 时间切换
    tabClick(index, item) {
      this.tabActive = index;
      this.mark = item.option;
      this.dataInfo = item.name;
      this.IndexData();
    },
    // 详情跳转
    taskDetailsClick(userID,roleID) {
      this.$router.push({
        name: "StaffDetails",
        query: { userID: userID,roleID:roleID }
      });
    },
    // 序号
    indexMethod(index) {
      return index + 1;
    },
    // 数据
    IndexData() {
      this.loading = true;
      getMissionCenter({ mark: this.mark }).then(res => {
        if (res.status == 0) {
          // 列表数据
          res.data.list.map((item, index) => {
            let TaskNum = item.taskCompletePercentage;
            TaskNum = Number.parseFloat(
              TaskNum.substring(0, TaskNum.length - 1)
            );

            if (TaskNum < 60) {
              item.TaskClass = "red";
            } else if (TaskNum >= 60 && TaskNum < 90) {
              item.TaskClass = "orange";
            } else if (TaskNum >= 90 && TaskNum <= 100) {
              item.TaskClass = "green";
            } else if (num > 100) {
              item.TaskClass = "full";
            }

            let ReturnVisitnum = item.reviewCompletePercentage;
            ReturnVisitnum = Number.parseFloat(
              ReturnVisitnum.substring(0, ReturnVisitnum.length - 1)
            );

            if (ReturnVisitnum < 60) {
              item.ReturnVisitClass = "red";
            } else if (ReturnVisitnum >= 60 && ReturnVisitnum < 90) {
              item.ReturnVisitClass = "orange";
            } else if (ReturnVisitnum >= 90 && ReturnVisitnum <= 100) {
              item.ReturnVisitClass = "green";
            } else if (ReturnVisitnum > 100) {
              item.ReturnVisitClass = "full";
            }
          });
          this.demoList = res.data.list;
          // 门店数据
          this.storeList = res.data.storeData;
          let taskTotal = {};
          let reviewTotal = {};
          let ordersTotal = {};
          let ziXunTotal = {};
          // 任务
          taskTotal.title = "总任务数（条）";
          taskTotal.Completed1 = res.data.taskTotal.taskComplete;
          taskTotal.not = res.data.taskTotal.taskNotComplete;
          taskTotal.Percentage = res.data.taskTotal.taskPercentage;
          taskTotal.Total = res.data.taskTotal.taskCount;
          // 回访
          reviewTotal.title = "总回访数（条）";
          reviewTotal.Completed1 = res.data.reviewTotal.reviewComplete;
          reviewTotal.not = res.data.reviewTotal.reviewNotComplete;
          reviewTotal.Percentage = res.data.reviewTotal.reviewPercentage;
          reviewTotal.Total = res.data.reviewTotal.reviewCount;
          // 成交
          ordersTotal.title = "总成交数（次）";
          ordersTotal.Completed1 = res.data.ordersTotal.dealCount;
          ordersTotal.not = res.data.ordersTotal.notDealCount;
          ordersTotal.Percentage = res.data.ordersTotal.dealPercentage;
          ordersTotal.Total = res.data.ordersTotal.totalCount;
          // 咨询
          ziXunTotal.title = "总咨询数（次）";
          ziXunTotal.Completed1 = res.data.ziXunTotal.dealCount;
          ziXunTotal.not = res.data.ziXunTotal.notDealCount;
          ziXunTotal.Percentage = res.data.ziXunTotal.dealPercentage;
          ziXunTotal.Total = res.data.ziXunTotal.totalCount;
          // 赋值
          this.taskTotal = taskTotal;
          this.reviewTotal = reviewTotal;
          this.ordersTotal = ordersTotal;
          this.ziXunTotal = ziXunTotal;

          this.loading = false;
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        this.$message({
          showClose: true,
          message: error,
          type: 'error',
        });
      })
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.IndexData();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
    getProgramList().then(res=>{
      if(res.status == 0){
        if(res.data.list.ygrwxq.allowed == 0){
          this.allowed = 0
        }else{
          this.allowed = 1
        }
      }else{
        this.allowed = 0
      }

    })
  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>

<style lang="scss" scoped>
@import "./Index.scss";
</style>


    
