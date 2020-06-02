<template>
  <!-- 店长 -->
  <div class="ShopManagerHome">
    <!--<div class="titles">
      <div class="titles_tabs">
         <span :class="{active : tabelIndex == 0}" @click="tableIndexFn(0)">目标查看</span> 
        <em></em>
        <span :class="{active : tabelIndex == 1}" @click="tableIndexFn(1)">数据查看</span>
      </div>
      <div class="titles_date" v-if="tabelIndex == 0">
        <a @click="ThisMonthClick" v-show="ThisMonthIsShow">回到本月</a>
        <div>
          <span>
            {{timeActiveIsShow ? timeActive : timeActive1}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <ul>
            <li
              v-for="(item, index) in timeDataList"
              :key="index"
              @click="timeClick(item)"
            >{{item.time}}</li>
          </ul>
        </div>
        <em></em>
        <p @click="todayClick" :class="toDayIsShow ?'fc-gray2' : 'fc-gray4'">今日实时数据</p>
      </div>

      <div class="timesTab" v-else>
        <ul>
          <li v-for="(item, index) in tabList" :key="index" @click="tabClick(index)">
            <div class="text" :class="{textActive:tabActive == index}">{{item}}</div>
            <i></i>
          </li>
        </ul>
      </div>
    </div>
    -->

    <Target v-if="tabelIndex == 0" :time="time"></Target>
    <Data v-else :cycle="cycle"></Data>
  </div>
</template>
<script>
import Target from "./Target";
import Data from "./Data";
import { getTargetList } from "@/shop/assets/api/home/home";
export default {
  name: "ShopManagerHome",
  data() {
    return {
      tabelIndex: 0,
      tabList: ["本月", "今日", "昨日", "上周", "本年"],
      time: {
        // 开始时间
        startTime: "",
        // 结束时间
        endTime: ""
      },
      timeDataList: [],
      timeActive: "",
      timeActive1: "",
      timeActiveIsShow: true,
      tabActive: 0,
      cycle: 4,
      toDayIsShow: true,
      ThisMonthIsShow: false
    };
  },
  components: {
    Target,
    Data
  },
  methods: {
    tableIndexFn(index) {
      this.tabelIndex = index;
    },
    tabClick(index) {
      this.tabActive = index;
      switch (index) {
        case 0:
          this.cycle = 4;
          break;
        case 1:
          this.cycle = 1;
          break;
        case 2:
          this.cycle = 2;
          break;
        case 3:
          this.cycle = 3;
          break;
        case 4:
          this.cycle = 5;
          break;
        default:
          break;
      }
    },

    ThisMonthClick() {
      this.time.startTime = this.$base.getDateScope(0).startTime;
      this.time.endTime = this.$base.getDateScope(0).endTime;
      this.timeActiveIsShow = true;
      this.toDayIsShow = true;
      this.ThisMonthIsShow = false;
    },

    todayClick() {
      this.time.startTime = this.$base.getDateScope(1).startTime;
      this.time.endTime = this.$base.getDateScope(1).endTime;
      this.timeActiveIsShow = true;
      this.ThisMonthIsShow = true;
      this.toDayIsShow = false;
    },

    dataList() {
      this.loading = true;
      let timeData = {
        startTime: this.time.startTime,
        endTime: this.time.endTime
      };
      getTargetList(timeData)
        .then(res => {
          if (res.status == 0) {
            this.timeDataList = res.data.total.date;
            this.timeActive = res.data.total.date[0].time;
          }
        })
        .catch(error => {
          console.log(getTargetList);
        });
    },

    timeClick(item) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      console.log(mydate);
      this.timeActive1 = item.time;
      if (item.time == mydate) {
        this.ThisMonthIsShow = false;
      }else {
        this.ThisMonthIsShow = true;
      }
      this.timeActiveIsShow = false;
      this.toDayIsShow = true;
      this.time.startTime = item.startTime;
      this.time.endTime = item.endTime;
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.time.startTime = this.$base.getDateScope(0).startTime;
    this.time.endTime = this.$base.getDateScope(0).endTime;
    this.dataList();
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
@import "../index.scss";
</style>


    
