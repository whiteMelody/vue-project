<template>
  <div class="CounselingDetail">
    <div class="tabs">
      <span :class="tabsIndex == 0 ? 'active' :''" @click="tabsFn(0)">划扣明细</span>
      <span :class="tabsIndex == 1 ? 'active' :''" @click="tabsFn(1)">划扣消息</span>
    </div>

    <div class="del" v-if="tabsIndex == 0">
      <div class="search">
        <DatePicker
          @on-change="tabTowDateValFn"
          :value="del.tabTowDateVal"
          type="daterange"
          transfer
          split-panels
          placeholder="开始时间 — 结束时间"
        ></DatePicker>
        <div class="btn" @click="searchFn">搜索</div>
      </div>
      <div class="titles">
        <h3>{{userData.name}}</h3>
        <b></b>
        <ul>
          <!-- <li>
            <span>总计次数（次）</span>
            <p>{{userData.select_number}}</p>
          </li> -->
          <li>
            <span>划扣次数（次）</span>
            <p>{{userData.select_consume_number}}</p>
          </li>
          <!-- <li>
            <span>剩余次数（次）</span>
            <p>{{userData.select_surplus_number}}</p>
          </li> -->
        </ul>
      </div>
      <div class="list">
        <table class="table_list" cellspacing="0">
          <thead>
            <tr>
              <th>划扣时间</th>
              <th>技师/顾问</th>
              <th>项目</th>
              <th>划扣次数（次）</th>
              <th>划扣金额（元）</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="del.list.length == 0">
              <td colspan="11">暂无数据</td>
            </tr>
            <tr v-for="(item, index) in del.list" :key="index" v-else>
              <td>{{item.time}}</td>
              <td>{{item.advName}}</td>
              <td v-html="item.item"></td>
              <td v-html="item.number"></td>
              <td v-html="item.price"></td>
              <td v-html="item.status"></td>
            </tr>
          </tbody>
        </table>
        <div class="pagesBox" v-if="del.amount > 12">
          <Page
            :total="del.amount"
            @on-change="pageEvent"
            :page-size="del.pagesize"
            :current="del.pages"
            v-show="del.amount > del.pagesize"
          />
        </div>
      </div>
    </div>
    <div class="message" v-if="tabsIndex == 1">
      <div class="search">
        <DatePicker
          @on-change="tabTowDateValFn"
          :value="message.tabTowDateVal"
          type="daterange"
          transfer
          split-panels
          placeholder="开始时间 — 结束时间"
        ></DatePicker>
        <div class="btn" @click="searchFn('employeeData')">搜索</div>
      </div>
      <div class="titles">
        <h3>{{userData.name}}</h3>
        <b></b>
        <ul>
          <!-- <li>
            <span>总计次数（次）</span>
            <p>{{userData.select_number}}</p>
          </li> -->
          <li>
            <span>划扣次数（次）</span>
            <p>{{userData.select_consume_number}}</p>
          </li>
          <!-- <li>
            <span>剩余次数（次）</span>
            <p>{{userData.select_surplus_number}}</p>
          </li> -->
        </ul>
      </div>
      <div class="list">
        <table class="table_list" cellspacing="0">
          <thead>
            <tr>
              <th>到诊状态</th>
              <th>订单号</th>
              <th>付款日期</th>
              <th>项目</th>
              <th>扣划次数（次）</th>
              <th>剩余次数（次）</th>
              <th>技师/顾问</th>
              <th>扣划金额（元）</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="message.list.length == 0">
              <td colspan="11">暂无数据</td>
            </tr>
            <tr v-for="(item, index) in message.list" :key="index" v-else>
              <td>{{item.customer_status}}</td>
              <td>{{item.code}}</td>
              <td>{{item.trading_time}}</td>
              <td v-html="item.items_name"></td>
              <td>{{item.consume_number}}</td>
              <td>{{item.surplus_number}}</td>
              <td>{{item.technicianName}}</td>
              <td>{{item.consume_money|NumFormat}}</td>
              <td>{{item.statusName}}</td>
            </tr>
          </tbody>
        </table>
        <div class="pagesBox" v-if="message.amount > 12">
          <Page :total="message.amount" @on-change="pageEvent" :page-size="message.pagesize"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CounselingDetail",
  data() {
    return {
      userId: "",
      tabsIndex: 0,
      userData: "",
      message: {
        list: "",
        pages: 1,
        pagesize: 12,
        amount: 0,
        userData: "",
        tabTowDateVal: []
      },
      del: {
        list: "",
        pages: 1,
        pagesize: 12,
        amount: 0,
        tabTowDateVal: []
      }
    };
  },
  components: {},
  methods: {
    tabsFn(index) {
      const that = this;
      that.tabsIndex = index;
      if (that.tabsIndex == 0) {
        that.del.tabTowDateVal = [];
      } else if (that.tabsIndex == 1) {
        that.message.tabTowDateVal = [];
      }
    },
    //搜索
    searchFn() {
      const that = this;
      if (that.tabsIndex == 0) {
        that.message.pages = 1;
        that.informationConsumeDetailedListFn();
      } else if (that.tabsIndex == 1) {
        that.del.pages = 1;
        that.informationConsumeListFn();
      }
      that.informationConsume();
    },
    //员工数据 数据时间选择
    tabTowDateValFn(date) {
      const that = this;
      if (that.tabsIndex == 0) {
        that.del.tabTowDateVal = [...date];
      } else if (that.tabsIndex == 1) {
        that.message.tabTowDateVal = [...date];
      }
    },

    //划扣信息
    informationConsumeListFn() {
      const that = this;
      const postData = {
        customerId: that.userId,
        startTime: that.message.tabTowDateVal[0],
        endTime: that.message.tabTowDateVal[1],
        number: that.message.pagesize,
        start: that.message.pages
      };
      that
        .$postRequest("/post/api/customers/informationConsumeList", postData)
        .then(res => {
          that.message.list = res.data.list;
          that.message.amount = res.data.total;
        });
    },

    //划扣明细
    informationConsumeDetailedListFn() {
      const that = this;
      const postData = {
        customerId: that.userId,
        startTime: that.del.tabTowDateVal[0],
        endTime: that.del.tabTowDateVal[1],
        number: that.del.pagesize,
        start: that.del.pages
      };
      that
        .$postRequest(
          "/post/api/customers/informationConsumeDetailedList",
          postData
        )
        .then(res => {
          that.del.list = res.data.list;
          that.del.amount = res.data.total;
        });
    },

    //划扣明细-标题
    informationConsume() {
      const that = this;
      let postData;
      if (that.tabsIndex == 0) {
        postData = {
          id: that.userId,
          startTime: that.del.tabTowDateVal[0],
          endTime: that.del.tabTowDateVal[1]
        };
      } else if (that.tabsIndex == 1) {
        postData = {
          id: that.userId,
          startTime: that.message.tabTowDateVal[0],
          endTime: that.message.tabTowDateVal[1]
        };
      }

      that
        .$postRequest("/post/api/customers/informationConsume", postData)
        .then(res => {
          that.userData = res.data;
        });
    },

    //分页器
    pageEvent(pages) {
      const that = this;
      that.pages = pages;
      that.informationConsultationListFn();
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.userId = this.$route.query.id;
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    const that = this;
    that.message.tabTowDateVal = that.del.tabTowDateVal = that.$common.getBeginningOfMonth();
    this.informationConsumeListFn();
    this.informationConsumeDetailedListFn();
    this.informationConsume();
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
.CounselingDetail {
  .tabs {
    font-size: 0.18rem;
    display: flex;
    span {
      padding-right: 0.4rem;
      cursor: pointer;
      color: #999999;
    }
    .active {
      color: #009688;
    }
  }
  .search {
    background: #fff;
    display: flex;
    margin-top: 0.2rem;
    .ivu-date-picker {
      width: 2rem;
    }
    .btn {
      width: 0.8rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      color: #fff;
      font-size: 0.16rem;
      background: #009688;
      margin-left: 0.2rem;
      border-radius: 2px;
      cursor: pointer;
    }
  }
  .titles {
    background: #ffeaeb;
    height: 1.14rem;
    display: flex;
    align-items: center;
    margin-top: 0.26rem;
    h3 {
      font-size: 0.22rem;
      color: #333333;
      padding: 0 0.3rem;
      font-weight: normal;
    }
    b {
      width: 1px;
      height: 0.4rem;
      background: #ec414d;
    }
    ul {
      padding-left: 0.8rem;
      display: flex;
      align-items: center;
      li {
        display: flex;
        height: 0.8rem;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 1.6rem;
        span {
          color: #666666;
          font-size: 0.16rem;
        }
        p {
          color: #333333;
          font-size: 0.26rem;
        }
      }
    }
  }
  .list {
    margin-top: 0.26rem;
    min-height: 6rem;
  }
}
</style>



    
