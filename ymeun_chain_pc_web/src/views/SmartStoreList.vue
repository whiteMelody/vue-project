<template>
  <div class="SmartStoreList">
    <div class="storeData_ranking">
      <div class="rankingTitle">
        <span class="rankingTabs">门店智能评分排名</span>
      </div>
      <div class="tankingTime">
        <Select v-model="selectYear">
          <Option
            v-for="item in IntelYearMonthList.year"
            :key="item.id"
            :value="item.id"
          >{{item.name}}</Option>
        </Select>
        <Select v-model="selectMonth" style="margin-left: .14rem;">
          <Option
            v-for="item in IntelYearMonthList.month"
            :key="item.id"
            :value="item.id"
          >{{item.name}}</Option>
        </Select>
        <button @click="YearMonthClick()">搜索</button>
      </div>
      <!-- 排名 -->
      <table class="table_list" cellspacing="0">
        <thead>
          <tr>
            <th rowspan="2">排名</th>
            <th rowspan="2">门店</th>
            <th rowspan="2">得分</th>
            <th colspan="5" style="background-color: #E2E2E2;">业绩</th>
          </tr>
          <tr>
            <th>坪效</th>
            <th>人效</th>
            <th>客效</th>
            <th>业绩增长率</th>
            <th>任务总体完成度</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in IntelligenceList" :key="index">
            <td>0{{index+1}}</td>
            <td class="colorText" @click="storeHerf(item.id)">{{item.name}}</td>
            <td>{{item.total }}</td>
            <td>{{item.data.score.pingxiaoScore }}</td>
            <td>{{item.data.score.renxiaoScore }}</td>
            <td>{{item.data.score.kexiaoScore}}</td>
            <td>{{item.data.up.paymentUp }}</td>
            <td>{{item.data.up.taskUp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "SmartStoreList",
  data() {
    return {
      // 智能门店评分
      IntelligenceList: [],
      // 智能门店选择年月
      IntelYearMonthList: [],
      // select默认年
      selectYear: "",
      // select默认月
      selectMonth: "",
      // 搜索时间
      SearchTimeYearMonth: ""
    };
  },
  components: {},
  methods: {
    // 智能门店评分选择年月
    YearMonthClick() {
      // 拼接时间
      if (this.selectMonth < 10) {
        this.SearchTimeYearMonth = this.selectYear + "-0" + this.selectMonth;
      } else {
        this.SearchTimeYearMonth = this.selectYear + "-" + this.selectMonth;
      }

      // 智能门店评分
      this.$postRequest("/post/api/store/storeScore", {
        time: this.SearchTimeYearMonth
      }).then(res => {
        // console.log(res.data);
        // const _that = this;
        if (res.status == 0) {
          this.IntelligenceList = res.data.data;
        }
      });
    },

    // 跳转门店详情
    storeHerf(id) {
      this.$router.push({
        path: "/PerformanceShopDel",
        query: { id: id }
      });
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    // 智能门店评分
    this.$postRequest("/post/api/store/storeScore").then(res => {
      // console.log(res.data);
      // const _that = this;
      if (res.status == 0) {
        this.IntelligenceList = res.data.data;
        this.IntelYearMonthList = res.data.date;
        let YearList = res.data.date.year;
        let MobthList = res.data.date.month;
        for (let element in MobthList) {
          if (MobthList[element].select == 1) {
            this.selectMonth = MobthList[element].id;
          }
        }
        for (let element in YearList) {
          if (YearList[element].select == 1) {
            this.selectYear = YearList[element].id;
          }
        }
      }
    });
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
.SmartStoreList {
  margin-top: .2rem;
  .storeData_ranking {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 0 0.26rem;
    padding-bottom: 0.5rem;
    .ivu-select {
      width: 2rem;
    }
    .rankingTitle {
      height: 0.5rem;
      width: 100%;
      line-height: 0.5rem;
      font-size: 18px;
      color: #666666;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      border-bottom: 0.01rem solid #e5e5e5;
      .rankingTabs {
        display: inline-block;
        cursor: pointer;
        height: 100%;
        margin-right: 0.6rem;
        color: #009688;
        font-size: 0.18rem;
      }
      .tankingMore {
        float: right;
        font-size: 0.16rem;
        cursor: pointer;
      }
      .tankingMore:hover {
        color: #009688;
      }
    }
    button {
      left: 4.6rem;
    }
  }
}
</style>



    
