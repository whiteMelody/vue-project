<template>
  <div class="TargetComparison" v-loading="loading">
    <header>
      <span>{{cycle}}</span>
      <div>
        <p @click="toDayClick('prev')" v-if="prevIsShow">上个月</p>
        <p class="fc-gray1" v-else>上个月</p>
        <p @click="toDayClick('today')">本月</p>
        <p @click="toDayClick('next')" v-if="nextIsShow">下个月</p>
        <p class="fc-gray1" v-else>下个月</p>
      </div>
    </header>

    <div class="table_list">
      <h3>销售业绩</h3>
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <td width="238" rowspan="2">店名</td>
            <td colspan="3">{{salesPerformance.thisMonth.month}}月</td>
            <td colspan="3">{{salesPerformance.lastMonth.month}}月</td>
          </tr>
          <tr>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{salesPerformance.name}}</td>
            <td
              v-if="salesPerformance.thisMonth.amount != 0"
            >{{salesPerformance.thisMonth.amount}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{salesPerformance.thisMonth.payment | _FloatFormat}}</td>
            <td v-if="salesPerformance.thisMonth.amount != 0" :class="salesPerformance.thisMonth.className">{{salesPerformance.thisMonth.completeRate | _FloatFormat}}%</td>
            <td v-else>--</td>
            <td
              v-if="salesPerformance.lastMonth.amount != 0"
            >{{salesPerformance.lastMonth.amount}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{salesPerformance.lastMonth.payment | _FloatFormat}}</td>
            <td v-if="salesPerformance.lastMonth.amount != 0" :class="salesPerformance.lastMonth.className">{{salesPerformance.lastMonth.completeRate | _FloatFormat}}%</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table_list">
      <h3>成交人头</h3>
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <td width="238" rowspan="2">店名</td>
            <td colspan="3">{{dealOrdersNum.thisMonth.month}}月</td>
            <td colspan="3">{{dealOrdersNum.lastMonth.month}}月</td>
          </tr>
          <tr>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{dealOrdersNum.name}}</td>
            <td
              v-if="dealOrdersNum.thisMonth.head != 0"
            >{{dealOrdersNum.thisMonth.head}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{dealOrdersNum.thisMonth.dealHead | _FloatFormat}}</td>
            <td v-if="dealOrdersNum.thisMonth.head != 0" :class="dealOrdersNum.thisMonth.className">{{dealOrdersNum.thisMonth.dealHeadRate | _FloatFormat}}%</td>
            <td v-else>--</td>


            <td
              v-if="dealOrdersNum.lastMonth.head != 0"
            >{{dealOrdersNum.lastMonth.head}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{dealOrdersNum.lastMonth.dealHead | _FloatFormat}}</td>
            <td v-if="dealOrdersNum.lastMonth.head != 0" :class="dealOrdersNum.lastMonth.className">{{dealOrdersNum.lastMonth.dealHeadRate | _FloatFormat}}%</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table_list">
      <h3>成交人次</h3>
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <td width="238" rowspan="2">店名</td>
            <td colspan="3">{{dealOrdersSecond.thisMonth.month}}月</td>
            <td colspan="3">{{dealOrdersSecond.lastMonth.month}}月</td>
          </tr>
          <tr>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{dealOrdersSecond.name}}</td>
            <td
              v-if="dealOrdersSecond.thisMonth.headSecond != 0"
            >{{dealOrdersSecond.thisMonth.headSecond}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{dealOrdersSecond.thisMonth.dealHeadSecond | _FloatFormat}}</td>
            <td v-if="dealOrdersSecond.thisMonth.headSecond != 0" :class="dealOrdersSecond.thisMonth.className">{{dealOrdersSecond.thisMonth.dealHeadRate | _FloatFormat}}%</td>
            <td v-else>--</td>
            <td
              v-if="dealOrdersSecond.lastMonth.headSecond != 0"
            >{{dealOrdersSecond.lastMonth.headSecond}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{dealOrdersSecond.lastMonth.dealHeadSecond | _FloatFormat}}</td>
            <td v-if="dealOrdersSecond.lastMonth.headSecond != 0" :class="dealOrdersSecond.lastMonth.className">{{dealOrdersSecond.lastMonth.dealHeadRate | _FloatFormat}}%</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table_list">
      <h3>划扣业绩</h3>
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <td width="238" rowspan="2">店名</td>
            <td colspan="3">{{deductionPerformance.thisMonth.month}}月</td>
            <td colspan="3">{{deductionPerformance.lastMonth.month}}月</td>
          </tr>
          <tr>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{deductionPerformance.name}}</td>
            <td
              v-if="deductionPerformance.thisMonth.amount != 0"
            >{{deductionPerformance.thisMonth.amount}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{deductionPerformance.thisMonth.price | _FloatFormat}}</td>
            <td v-if="deductionPerformance.thisMonth.amount != 0" :class="deductionPerformance.thisMonth.className">{{deductionPerformance.thisMonth.completeRate | _FloatFormat}}%</td>
            <td v-else>--</td>
            <td
              v-if="deductionPerformance.lastMonth.amount != 0"
            >{{deductionPerformance.lastMonth.amount}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{deductionPerformance.lastMonth.price | _FloatFormat}}</td>
            <td v-if="deductionPerformance.lastMonth.amount != 0" :class="deductionPerformance.lastMonth.className">{{deductionPerformance.lastMonth.completeRate | _FloatFormat}}%</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table_list">
      <h3>划扣人头</h3>
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <td width="238" rowspan="2">店名</td>
            <td colspan="3">{{consumptionAHead.thisMonth.month}}月</td>
            <td colspan="3">{{consumptionAHead.lastMonth.month}}月</td>
          </tr>
          <tr>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{consumptionAHead.name}}</td>
            <td
              v-if="consumptionAHead.thisMonth.quantity != 0"
            >{{consumptionAHead.thisMonth.quantity}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{consumptionAHead.thisMonth.AHeadNum | _FloatFormat}}</td>
            <td v-if="consumptionAHead.thisMonth.quantity != 0" :class="consumptionAHead.thisMonth.className">{{consumptionAHead.thisMonth.completeRate | _FloatFormat}}%</td>
            <td v-else>--</td>
            <td
              v-if="consumptionAHead.lastMonth.quantity != 0"
            >{{consumptionAHead.lastMonth.quantity}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{consumptionAHead.lastMonth.AHeadNum | _FloatFormat}}</td>
            <td v-if="consumptionAHead.lastMonth.quantity != 0" :class="consumptionAHead.lastMonth.className">{{consumptionAHead.lastMonth.completeRate | _FloatFormat}}%</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table_list">
      <h3>划扣人次</h3>
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <td width="238" rowspan="2">店名</td>
            <td colspan="3">{{consumption.thisMonth.month}}月</td>
            <td colspan="3">{{consumption.lastMonth.month}}月</td>
          </tr>
          <tr>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
            <td>目标值</td>
            <td>实际完成</td>
            <td>完成率</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{consumption.name}}</td>
            <td v-if="consumption.thisMonth.personNum != 0">{{consumption.thisMonth.personNum}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{consumption.thisMonth.completeNum | _FloatFormat}}</td>
            <td v-if="consumption.thisMonth.personNum != 0" :class="consumption.thisMonth.className">{{consumption.thisMonth.completeRate | _FloatFormat}}%</td>
            <td v-else>--</td>


            <td v-if="consumption.lastMonth.personNum != 0">{{consumption.lastMonth.personNum}}</td>
            <td
              v-else
              style="color:#0DC9E5; cursor:pointer;"
              @click="$router.push({name:'SetTarget'})"
            >未设置</td>
            <td>{{consumption.lastMonth.completeNum | _FloatFormat}}</td>
            <td v-if="consumption.lastMonth.personNum != 0" :class="consumption.lastMonth.className">{{consumption.lastMonth.completeRate | _FloatFormat}}%</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getTargetComparison } from "@/shop/assets/api/manage/statistics";

export default {
  name: "TargetComparison",
  components: {},
  data() {
    return {
      year:'',
      month:'',
      cycle:'',
      // 划扣人次
      consumption: {
        thisMonth: { month: "" },
        lastMonth: { month: "" }
      },
      // 划扣人头
      consumptionAHead: {
        thisMonth: { month: "" },
        lastMonth: { month: "" }
      },
      // 销售业绩
      salesPerformance: {
        thisMonth: { month: "" },
        lastMonth: { month: "" }
      },
      // 划扣业绩
      deductionPerformance: {
        thisMonth: { month: "" },
        lastMonth: { month: "" }
      },
      // 成交人头
      dealOrdersNum: {
        thisMonth: { month: "" },
        lastMonth: { month: "" }
      },
      // 成交人次
      dealOrdersSecond: {
        thisMonth: { month: "" },
        lastMonth: { month: "" }
      },
      prevIsShow:true,
      nextIsShow:true,
      loading: false
    };
  },
  methods: {
    toDayClick(type) {
      if (type == 'prev') {
        this.month --;
        if(this.month<=0){
            this.month = 12
            this.year --;
        }
      }else if (type == 'today') {
        this.yearMonth();
      }else if (type == 'next') {
        this.month ++;
        if(this.month>=13){
            this.month = 1;
            this.year ++;
        }
      }
      this.cycle = this.year + '-' + this.$base.addZero(this.month);
      this.TargetComparisonData();
    },
    TargetComparisonData() {
      this.loading = true;
      getTargetComparison({ month: this.cycle }).then(res => {
        if (res.status == 0) {
          if (res.data != []) {
            res.data.map((item, index) => {
              if (item.type == "consumption") {
                item.consumption.lastMonth.className = this.publicClick(item.consumption.lastMonth.completeRate);
                item.consumption.thisMonth.className = this.publicClick(item.consumption.thisMonth.completeRate);
                this.consumption = item.consumption;
              } else if (item.type == "consumptionAHead") {
                item.consumptionAHead.lastMonth.className = this.publicClick(item.consumptionAHead.lastMonth.completeRate);
                item.consumptionAHead.thisMonth.className = this.publicClick(item.consumptionAHead.thisMonth.completeRate);
                this.consumptionAHead = item.consumptionAHead;
              } else if (item.type == "salesPerformance") {
                item.salesPerformance.lastMonth.className = this.publicClick(item.salesPerformance.lastMonth.completeRate);
                item.salesPerformance.thisMonth.className = this.publicClick(item.salesPerformance.thisMonth.completeRate);
                this.salesPerformance = item.salesPerformance;
              } else if (item.type == "deductionPerformance") {
                item.deductionPerformance.lastMonth.className = this.publicClick(item.deductionPerformance.lastMonth.completeRate);
                item.deductionPerformance.thisMonth.className = this.publicClick(item.deductionPerformance.thisMonth.completeRate);
                this.deductionPerformance = item.deductionPerformance;
              } else if (item.type == "dealOrdersNum") {
                item.dealOrdersNum.lastMonth.className = this.publicClick(item.dealOrdersNum.lastMonth.completeRate);
                item.dealOrdersNum.thisMonth.className = this.publicClick(item.dealOrdersNum.thisMonth.completeRate);
                this.dealOrdersNum = item.dealOrdersNum;
              } else if (item.type == "dealOrdersSecond") {
                item.dealOrdersSecond.lastMonth.className = this.publicClick(item.dealOrdersSecond.lastMonth.completeRate);
                item.dealOrdersSecond.thisMonth.className = this.publicClick(item.dealOrdersSecond.thisMonth.completeRate);
                this.dealOrdersSecond = item.dealOrdersSecond;
              } else {
                if (item.last == 1) {
                  this.prevIsShow = false;
                }else {
                  this.prevIsShow = true;
                }
                if (item.next == 1) {
                  this.nextIsShow = false;
                }else {
                  this.nextIsShow = true;
                }
              }
              this.loading = false;
            });
          }
        }
      });
    },

    publicClick(number) {
      let num = Number.parseFloat(number);
      if (num < 60) {
        return "red";
      } else if (num >= 60 && num < 90) {
        return "orange";
      } else if (num >= 90 && num <= 100) {
        return "green";
      } else if (num > 100) {
        return "full";
      }
    },

    yearMonth() {
      let date = new Date();
      this.year = Number.parseFloat(date.getFullYear())
      this.month = Number.parseFloat(date.getMonth() + 1);
      this.cycle = this.year + '-' + this.$base.addZero(this.month);
    },


  },
  created() {
    this.yearMonth();
    this.TargetComparisonData();
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.TargetComparison {
  header {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    span {
      font-size: 16px;
      color: #333;
      flex: 1;
    }
    div {
      display: flex;
      align-items: center;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
      height: 30px;
      width: 210px;
      p {
        flex: 1;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-right: 1px solid #e5e5e5;
        cursor: pointer;
      }
      p:last-of-type {
        border-right: 0;
      }
    }
  }
  .table_list {
    h3 {
      font-size: 16px;
      color: #333;
      line-height: 50px;
      font-weight: normal;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        height: 44px;
        td {
          text-align: center;
          border: 1px solid #e5e5e5;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          &.red {
            color: #f10215;
          }
          &.green {
            color: #009688;
          }
          &.orange {
            color: #ff5722;
          }
          &.full {
            color: #c09346;
          }
        }
      }
    }
  }
}
</style>
<style>
.TargetComparison .table_list .el-table thead {
  background: #fff !important;
}
.TargetComparison .el-table__header td,
th {
  background: #fff !important;
}
</style>
