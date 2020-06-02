<template>
  <div class="TotalPerformance">
    <div class="storeData_top_right">
      <div class="rankingTitle">
        <span
          class="rankingTabs"
          v-for="(item, index) in rankingList"
          :key="index"
          :class="{explainText: spanIsShow == index}"
          @click="RankingOrder(index)"
        >{{item}}</span>
      </div>
      <div class="tankingTime">
        <Row>
          <Col span="12">
            <DatePicker
              @on-change="handleChange"
              type="daterange"
              placement="bottom-start"
              :value="dataValue"
              format="yyyy-MM-dd"
              placeholder="开始时间 — 结束时间"
            ></DatePicker>
          </Col>
        </Row>
        <div class="tankingSelect">
          <Select
            v-model="model1"
            placeholder="全部门店"
          >
            <Option :value="0">全部门店</Option>
            <Option
              v-for="(item, index) in dataListName"
              :key="index"
              :value="item.id"
            >{{item.name}}</Option>
          </Select>
        </div>
        <button @click="SearchTime()">搜索</button>
      </div>
      <!-- 合计业绩 -->
      <div class="aggregatePerformance">
        <div class="Total" v-show="spanIsShow == 0">
          <span>合计&nbsp;&nbsp;(元)</span>
          <p>{{orderObjcet.total}}</p>
        </div>
        <div class="Total" v-show="spanIsShow == 1">
          <span>合计&nbsp;&nbsp;(人)</span>
          <p>{{orderObjcet.appointmentCustomer }}</p>
        </div>
        <div class="Total" v-show="spanIsShow == 2">
          <p style="margin: 0; color:#333333;">划扣次数说明</p>
        </div>
        <div class="henxian"></div>
        <ul>
          <!-- 业绩 -->
          <li v-show="spanIsShow == 0">
            <span>门店&nbsp;&nbsp;(家)</span>
            <p>{{orderObjcet.count}}</p>
          </li>
          <li v-show="spanIsShow == 0">
            <span>初诊&nbsp;&nbsp;(元)</span>
            <p>{{orderObjcet.first}}</p>
          </li>
          <li v-show="spanIsShow == 0">
            <span>复诊&nbsp;&nbsp;(元)</span>
            <p>{{orderObjcet.revisit}}</p>
          </li>
          <li v-show="spanIsShow == 0">
            <span>复查&nbsp;&nbsp;(元)</span>
            <p>{{orderObjcet.review}}</p>
          </li>
          <li v-show="spanIsShow == 0">
            <span>退单&nbsp;&nbsp;(元)</span>
            <p>{{orderObjcet.refund}}</p>
          </li>
          <!-- 门诊 -->
          <li v-show="spanIsShow == 1">
            <span>门店&nbsp;&nbsp;(家)</span>
            <p>{{orderObjcet.count }}</p>
          </li>
          <li v-show="spanIsShow == 1">
            <span>初诊&nbsp;&nbsp;(人)</span>
            <p>{{orderObjcet.firstCustomer }}</p>
          </li>
          <li v-show="spanIsShow == 1">
            <span>复诊&nbsp;&nbsp;(人)</span>
            <p>{{orderObjcet.revisitCustomer }}</p>
          </li>
          <li v-show="spanIsShow == 1">
            <span>复查&nbsp;&nbsp;(人)</span>
            <p>{{orderObjcet.reviewCustomer }}</p>
          </li>
          <!-- 划扣 -->
          <li v-show="spanIsShow == 2">
            <span>门店&nbsp;&nbsp;(家)</span>
            <p>{{orderObjcet.count}}</p>
          </li>
          <li v-show="spanIsShow == 2">
            <span>划扣次数&nbsp;&nbsp;(次)</span>
            <p>{{orderObjcet.consumeNumber}}</p>
          </li>
          <li v-show="spanIsShow == 2">
            <span>划扣金额&nbsp;&nbsp;(元)</span>
            <p>{{orderObjcet.consumePrice}}</p>
          </li>
          <li v-show="spanIsShow == 2">
            <span>未划扣数&nbsp;&nbsp;(次)</span>
            <p>{{orderObjcet.surplusNumber}}</p>
          </li>
          <li v-show="spanIsShow == 2">
            <span>未划扣金额&nbsp;&nbsp;(元)</span>
            <p>{{orderObjcet.surplusPrice}}</p>
          </li>
        </ul>
      </div>
      <!-- 排名 -->
      <table class="table_list" cellspacing="0">
        <thead>
          <tr>
            <th>排名</th>
            <th>门店</th>
            <!-- 业绩 -->
            <th v-show="spanIsShow == 0">业绩(元)</th>
            <th v-show="spanIsShow == 0">初诊(元)</th>
            <th v-show="spanIsShow == 0">复诊(元)</th>
            <th v-show="spanIsShow == 0">复查(元)</th>
            <th v-show="spanIsShow == 0">退单(元)</th>
            <th v-show="spanIsShow == 0">实收(元)</th>
            <!-- 门诊 -->
            <th v-show="spanIsShow == 1">门诊(人数)</th>
            <th v-show="spanIsShow == 1">初诊(人数)</th>
            <th v-show="spanIsShow == 1">复诊(人数)</th>
            <th v-show="spanIsShow == 1">复查(人数)</th>
            <!-- 划扣 -->
            <th v-show="spanIsShow == 2">划扣次数</th>
            <th v-show="spanIsShow == 2">划扣金额</th>
            <th v-show="spanIsShow == 2">未划扣数</th>
            <th v-show="spanIsShow == 2">未划扣金额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataListList" :key="index">
            <td v-if="index < 9">0{{index+1}}</td>
            <td v-else>{{index+1}}</td>
            <td class="colorText" @click="storeHerf(item.id)">{{item.name}}</td>
            <!-- 业绩 -->
            <td v-show="spanIsShow == 0">{{item.total}}</td>
            <td v-show="spanIsShow == 0">{{item.first }}</td>
            <td v-show="spanIsShow == 0">{{item.revisit }}</td>
            <td v-show="spanIsShow == 0">{{item.review}}</td>
            <td v-show="spanIsShow == 0">{{item.refund }}</td>
            <td v-show="spanIsShow == 0">{{item.payment }}</td>
            <!-- 门诊 -->
            <td v-show="spanIsShow == 1">{{item.appointmentCustomer}}</td>
            <td v-show="spanIsShow == 1">{{item.firstCustomer }}</td>
            <td v-show="spanIsShow == 1">{{item.revisitCustomer }}</td>
            <td v-show="spanIsShow == 1">{{item.reviewCustomer }}</td>
            <!-- 划扣 -->
            <td v-show="spanIsShow == 2">{{item.consumeNumber }}</td>
            <td v-show="spanIsShow == 2">{{item.consumePrice }}</td>
            <td v-show="spanIsShow == 2">{{item.surplusNumber }}</td>
            <td v-show="spanIsShow == 2">{{item.surplusPrice }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="pagesBox">
        <!-- <Page
          :total="dataCount"
          :page-size="pageSize"
          show-total
          @on-change="pageEvent"
          show-elevator
          v-show="dataCount > pageSize"
        />-->
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  name: "TotalPerformance",
  data() {
    return {
      // tab栏
      rankingList: ["业绩排名", "门诊排名", "划扣次数"],
      // tab栏样式状态
      spanIsShow: 0,
      // 选择开始结束时间
      dataValue: [],
      // 选择门店数据
      model1: "",
      // 业绩数据列表数组
      dataListList: [],
      // 合计门店数据
      orderObjcet: {},
      // 门店名字
      dataListName: []
      // 分页总条数
      // dataCount: 0,
      // 分页一页显示多少条
      // pageSize: 12
    };
  },
  components: {
    Dialog
  },
  methods: {
    // 获取开始结束时间
    handleChange(daterange) {
      this.dataValue = daterange;
    },

    // 业绩数据调用函数
    achievementListSidMendianTime() {
      let scrollBehaviorList = {
        startTime: this.dataValue[0],
        endTime: this.dataValue[1],
        s_id: this.model1
      };
      this.$postRequest(
        "/post/api/store/getOrderRankingListByStore",
        scrollBehaviorList
      ).then(res => {
        if (res.status == 0) {
          this.dataListList = res.data;
        }
      });

      // 业绩合计
      this.$postRequest(
        "/post/api/store/getOrderRankingByStore",
        scrollBehaviorList
      ).then(res => {
        if (res.status == 0) {
          this.orderObjcet = res.data;
        }
      });
    },

    // 门诊数据调用函数
    OutpatientDepartmentListSidMendianTime() {
      let scrollBehaviorList = {
        startTime: this.dataValue[0],
        endTime: this.dataValue[1],
        s_id: this.model1
      };
      this.$postRequest(
        "/post/api/store/getAppointmentRankingListByStore",
        scrollBehaviorList
      ).then(res => {
        if (res.status == 0) {
          this.dataListList = res.data;
        }
      });

      // 门诊合计
      this.$postRequest(
        "/post/api/store/getAppointmentRankingByStore",
        scrollBehaviorList
      ).then(res => {
        // console.log(res);
        if (res.status == 0) {
          this.orderObjcet = res.data;
        }
      });
    },

    // 消费数据调用函数
    consumptionListSidMendianTime() {
      let scrollBehaviorList = {
        startTime: this.dataValue[0],
        endTime: this.dataValue[1],
        s_id: this.model1
      };
      this.$postRequest(
        "/post/api/store/getConsumeRankingListByStore",
        scrollBehaviorList
      ).then(res => {
        if (res.status == 0) {
          this.dataListList = res.data;
        }
      });

      // 消费合计
      this.$postRequest(
        "/post/api/store/getConsumeRankingByStore",
        scrollBehaviorList
      ).then(res => {
        // console.log(res);
        if (res.status == 0) {
          this.orderObjcet = res.data;
        }
      });
    },

    // 点击tab切换发请求
    RankingOrder(index) {
      this.spanIsShow = index;
      this.dataValue = [];
      this.model1 = ""

      if (this.spanIsShow == 0) {
        this.achievementListSidMendianTime();
      }
      if (this.spanIsShow == 1) {
        this.OutpatientDepartmentListSidMendianTime();
      }
      if (this.spanIsShow == 2) {
        this.consumptionListSidMendianTime();
      }
    },

    // 搜索
    SearchTime() {
      if (this.spanIsShow == 0) {
        this.achievementListSidMendianTime();
      }
      if (this.spanIsShow == 1) {
        this.OutpatientDepartmentListSidMendianTime();
      }
      if (this.spanIsShow == 2) {
        this.consumptionListSidMendianTime();
      }
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

    this.dataValue = this.$common.getBeginningOfMonth();
    // 业绩合计
    this.$postRequest("/post/api/store/getOrderRankingByStore").then(res => {
      // console.log(res);
      if (res.status == 0) {
        this.orderObjcet = res.data;
      }
    });

    // 业绩列表
    this.$postRequest("/post/api/store/getOrderRankingListByStore").then(
      res => {
        // console.log(res);
        if (res.status == 0) {
          this.dataListList = res.data;
          // 分页总条数
          // this.dataCount = res.data.length;
          this.dataListName = res.data;
        }
      }
    );
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
.TotalPerformance {
  margin-top: .2rem;
  .storeData_top_right {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 0 0.26rem;
    padding-bottom: 0.2rem;
    margin-bottom: 0.2rem;
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
      }
      .explainText {
        color: #009688;
        border-bottom: 0.01rem solid #009688;
      }
    }
    .tankingTime {
      .ivu-date-picker {
        width: 2rem;
      }
      .ivu-select {
        width: 2rem;
      }
      .tankingSelect {
        position: absolute;
        top: 0;
        left: 2.2rem;
      }
      button {
        left: 4.6rem;
      }
    }
  }
}
</style>