<template>
  <div class="TaskManagement">
    <div class="optionTabs">
      <div class="text">{{title}}任务实时数据</div>

      <div class="time">
        <div class="div" v-for="(item, index) in timeList" :key="index">
          <span :class="{spanActive:spanBack == index}" @click="spanBackClick(index,item)">{{item}}</span>
          <i></i>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="search">
        <Select placeholder="全部门店" v-model="StoreName">
          <Option value="0">全部门店</Option>
          <Option v-for="(item, index) in modelStore" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>
        <div class="btn" @click="SearchButton()">搜索</div>
      </div>

      <div class="summary">
        <div class="left">
          <ul>
            <li>
              <div class="text">总任务数（条）</div>
              <div class="number backActive">{{taskTimeList.taskCount}}</div>
            </li>
            <li>
              <div class="text">完成率</div>
              <div
                v-if="taskTimeList.taskPercentage < '60%'"
                class="number redActive"
              >{{taskTimeList.taskPercentage}}</div>
              <div
                v-else-if="taskTimeList.taskPercentage > '59%' && taskTimeList.taskPercentage < '90%'"
                class="number orangeActive"
              >{{taskTimeList.taskPercentage}}</div>
              <div v-else class="number grrenActive">{{taskTimeList.taskPercentage}}</div>
            </li>
            <li>
              <div class="text">已完成（条）</div>
              <div class="number">{{taskTimeList.taskFinishCount}}</div>
            </li>
            <li>
              <div class="text">未完成（条）</div>
              <div class="number">{{taskTimeList.taskNoFinishCount}}</div>
            </li>
          </ul>
        </div>
        <div class="shu"></div>
        <div class="left">
          <ul>
            <li>
              <div class="text">总回访数（条）</div>
              <div class="number backActive">{{taskTimeList.reviewCount}}</div>
            </li>
            <li>
              <div class="text">完成率</div>
              <div
                v-if="taskTimeList.reviewPercentage < '60%'"
                class="number redActive"
              >{{taskTimeList.reviewPercentage}}</div>
              <div
                v-else-if="taskTimeList.reviewPercentage > '59%' && taskTimeList.reviewPercentage < '90%'"
                class="number orangeActive"
              >{{taskTimeList.reviewPercentage}}</div>
              <div v-else class="number grrenActive">{{taskTimeList.reviewPercentage}}</div>
            </li>
            <li>
              <div class="text">已完成（条）</div>
              <div class="number">{{taskTimeList.reviewFinishCount}}</div>
            </li>
            <li>
              <div class="text">未完成（条）</div>
              <div class="number">{{taskTimeList.reviewNoFinishCount}}</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="list">
        <table class="table_list" cellspacing="0">
          <thead>
            <tr>
              <th>序号</th>
              <th>店名</th>
              <th>任务数</th>
              <th>任务完成数</th>
              <th>任务完成率</th>
              <th>回访数</th>
              <th>回访完成数</th>
              <th>回访完成率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in taskList" :key="index">
              <td v-if="index < 9">0{{index+1}}</td>
              <td v-else>{{index+1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.taskCount}}</td>
              <td>{{item.taskFinishCount}}</td>
              <td>{{item.taskPercentage}}</td>
              <td>{{item.reviewCount}}</td>
              <td>{{item.reviewFinishCount}}</td>
              <td>{{item.reviewPercentage}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TaskManagement",
  data() {
    return {
      // 任务列表
      taskList: [],
      // 总数据
      taskTimeList: {},
      // 搜索时间
      SearchTimeYearMonth: "",
      // 门店数据列表
      modelStore: [],
      // 门店id
      StoreName: "",
      // tab时间选项
      timeList: ["本月", "今日", "昨日", "上周", "本年"],
      // 当前时间tab选项
      spanBack: 0,
      // 开始时间
      startTime: null,
      // 结束时间
      endTime: null,
      // 标题
      title: "本月"
    };
  },

  components: {},
  methods: {
    // 列表数据
    listData() {
      const that = this;
      that
        .$postRequest("/post/api/task/taskMembersList", {
          s_id: that.StoreName,
          startTime: that.startTime,
          endTime: that.endTime
        })
        .then(res => {
          // console.log(res);
          if (res.status == 0) {
            // 总数据
            that.taskTimeList = res.data.data.total;
            // 列表数据
            that.taskList = res.data.data.storeData;
          }
        });
    },

    // 全部门店数据
    storeList() {
      this.$postRequest("/post/api/store/getOrderRankingListByStore").then(
        res => {
          if (res.status == 0) {
            this.modelStore = res.data;
          }
        }
      );
    },

    // 搜索
    SearchButton() {
      this.listData();
    },

    // 获取时间
    GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期
      var d = dd.getDate();
      return y + "-" + m + "-" + d;
    },

    // 获取星期
    getMyDay(date) {
      var week;
      if (date.getDay() == 0) week = "周日";
      if (date.getDay() == 1) week = "周一";
      if (date.getDay() == 2) week = "周二";
      if (date.getDay() == 3) week = "周三";
      if (date.getDay() == 4) week = "周四";
      if (date.getDay() == 5) week = "周五";
      if (date.getDay() == 6) week = "周六";
      return week;
    },

    // tab时间选项
    spanBackClick(index, item) {
      this.spanBack = index;
      this.StoreName = 0;
      this.title = item;
      if (index == 0) {
        // 本月
        this.startTime = this.$base.getDateScope(0).startTime;
        this.endTime = this.$base.getDateScope(0).endTime;
        this.listData();
      } else if (index == 1) {
        // 今日
        this.startTime = this.GetDateStr(0) + " 00:00";
        this.endTime = this.GetDateStr(0) + " 23:59";
        this.listData();
      } else if (index == 2) {
        // 昨日
        this.startTime = this.GetDateStr(-1) + " 00:00";
        this.endTime = this.GetDateStr(-1) + " 23:59";
        this.listData();
      } else if (index == 3) {
        // 上周
        let dayData = this.GetDateStr(0);
        let weekDay = this.getMyDay(new Date(dayData));
        if (weekDay == "周一") {
          console.log(this.GetDateStr(-7) + " 00:00" + "----上周开始日期");
          console.log(this.GetDateStr(-1) + " 23:59" + "----上周截至日期");
          this.startTime = this.GetDateStr(-7) + " 00:00";
          this.endTime = this.GetDateStr(-1) + " 00:00";
          this.listData();
        } else if (weekDay == "周二") {
          console.log(this.GetDateStr(-8) + " 00:00" + "----上周开始日期");
          console.log(this.GetDateStr(-2) + " 23:59" + "----上周截至日期");
          this.startTime = this.GetDateStr(-8) + " 00:00";
          this.endTime = this.GetDateStr(-2) + " 00:00";
          this.listData();
        } else if (weekDay == "周三") {
          console.log(this.GetDateStr(-9) + " 00:00" + "----上周开始日期");
          console.log(this.GetDateStr(-3) + " 23:59" + "----上周截至日期");
          this.startTime = this.GetDateStr(-9) + " 00:00";
          this.endTime = this.GetDateStr(-3) + " 00:00";
          this.listData();
        } else if (weekDay == "周四") {
          console.log(this.GetDateStr(-10) + " 00:00" + "----上周开始日期");
          console.log(this.GetDateStr(-4) + " 23:59" + "----上周截至日期");
          this.startTime = this.GetDateStr(-10) + " 00:00";
          this.endTime = this.GetDateStr(-4) + " 00:00";
          this.listData();
        } else if (weekDay == "周五") {
          console.log(this.GetDateStr(-11) + " 00:00" + "----上周开始日期");
          console.log(this.GetDateStr(-5) + " 23:59" + "----上周截至日期");
          this.startTime = this.GetDateStr(-11) + " 00:00";
          this.endTime = this.GetDateStr(-5) + " 00:00";
          this.listData();
        } else if (weekDay == "周六") {
          console.log(this.GetDateStr(-12) + " 00:00" + "----上周开始日期");
          console.log(this.GetDateStr(-6) + " 23:59" + "----上周截至日期");
          this.startTime = this.GetDateStr(-12) + " 00:00";
          this.endTime = this.GetDateStr(-6) + " 00:00";
          this.listData();
        } else if (weekDay == "周日") {
          console.log(this.GetDateStr(-13) + " 00:00" + "----上周开始日期");
          console.log(this.GetDateStr(-7) + " 23:59" + "----上周截至日期");
          this.startTime = this.GetDateStr(-13) + " 00:00";
          this.endTime = this.GetDateStr(-7) + " 00:00";
          this.listData();
        }
      } else if (index == 4) {
        // 本年
        // 获取当前年
        let year = new Date().getFullYear();
        // 本年开始日期
        console.log(year + "-1-1 00:00");
        // 本年结束日期
        console.log(this.GetDateStr(0) + " 23:59");
        this.startTime = year + "-1-1 00:00";
        this.endTime = this.GetDateStr(0) + " 23:59";
        this.listData();
      }
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    // 列表数据
    this.spanBackClick(0)
    // this.listData();


    //  门店
    this.storeList();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {},

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
.TaskManagement {
  .optionTabs {
    width: 102.5%;
    height: 0.5rem;
    background-color: #ffffff;
    margin-left: -0.2rem;
    border-top: 0.01rem solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      font-size: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 150, 136, 1);
      padding-left: 0.2rem;
    }
    .time {
      padding-right: 0.18rem;
      .div {
        float: left;
        span {
          width: 0.6rem;
          height: 0.32rem;
          border-radius: 0.02rem;
          display: inline-block;
          line-height: 0.32rem;
          text-align: center;
          font-size: 0.16rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          cursor: pointer;
        }
        i {
          display: inline-block;
          margin: 0 0.12rem;
          width: 1px;
          height: 10px;
          background: rgba(229, 229, 229, 1);
        }
        .spanActive {
          background: rgba(0, 150, 136, 1);
          color: #fff;
        }
      }
      .div:last-child {
        i {
          margin: 0;
          width: 0;
          height: 0;
        }
      }
    }
  }
  .content {
    background: #fff;
    padding: 0 0.26rem 0.3rem;
    margin-top: 0.2rem;
    .ivu-select {
      width: 2rem;
    }
    .tabs_title {
      div {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        align-items: center;
        p {
          padding: 0.16rem 0;
          font-size: 0.18rem;
          margin-right: 0.58rem;
          position: relative;
          cursor: pointer;
          em {
            width: 100%;
            height: 2px;
            background: #009688;
            position: absolute;
            bottom: 0;
            left: 0;
            opacity: 0;
          }
        }
        .active {
          color: #009688;
          em {
            opacity: 1;
          }
        }
      }
    }
    .search {
      background: #fff;
      display: flex;
      padding: 0.2rem 0;
      border-bottom: 0.01rem solid #e5e5e5;
      .ivu-select {
        width: 2rem;
        margin-right: 0.2rem;
      }
      .btn {
        width: 0.8rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        color: #fff;
        font-size: 0.16rem;
        background: #009688;
        border-radius: 2px;
        cursor: pointer;
      }
      .btn:hover {
        background-color: #04776c;
      }
    }

    .summary {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 2.71rem;
      border-bottom: 0.01rem solid #e5e5e5;
      align-items: center;
      .shu {
        width: 1px;
        height: 160px;
        background: rgba(229, 229, 229, 1);
      }
      .left {
        width: 49.9%;
        height: 100%;
        ul {
          height: 100%;
          li {
            float: left;
            width: 50%;
            height: 50%;
            padding: 0.3rem 0 0 0.25rem;
            .text {
              font-size: 0.16rem;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #666666;
            }
            .number {
              font-size: 0.3rem;
              font-family: MicrosoftYaHei;
              margin-top: 0.16rem;
              color: #666666;
            }
            .backActive {
              color: #000000;
              font-weight: bold;
            }
            .redActive {
              color: #f10215;
              font-weight: bold;
            }
            .grrenActive {
              color: #009688;
              font-weight: bold;
            }
            .orangeActive {
              color: #ff5722;
              font-weight: bold;
            }
          }
        }
      }
    }
    .list {
      background: #fff;
      .aggregatePerformance {
        color: #333333;
        .Total {
          width: 1rem;
        }
      }
    }
  }
}
</style>



    
