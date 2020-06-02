<template>
  <!-- 消费 -->
  <div class="Consumption wb100" :style="'min-height:'+ minHeight2 +'px' ">
    <div class="box"></div>
    <div class="headr">
      <div class="left">
        <div class="number">{{dataDayList.numbers}}</div>
        <div class="kong"></div>
        <div class="text">共计次数(次)</div>
      </div>
      <div class="fenge"></div>
      <div class="right">
        <div class="number">{{dataDayList.prices|_moneyFormat}}</div>
        <div class="kong"></div>
        <div class="text">合计消费(元)</div>
      </div>
    </div>
    <ul v-infinite-scroll="ConsumptionList" infinite-scroll-disabled="disabled">
      <li v-for="(item, index) in dataList" :key="index">
        <div class="top">
          <div class="time">{{item.created_at}}</div>
          <div class="money">￥{{item.price|_moneyFormat}}</div>
        </div>
        <div class="center">
          <div class="time">顾问：{{item.adviser_name}}</div>
          <div class="Unpaid" v-if="item.orders_status.value == 0">未支付</div>
          <div class="Paymented" v-else-if="item.orders_status.value == 1">已支付</div>
          <div class="gray" v-else-if="item.orders_status.value == 2">退款</div>
        </div>
        <div class="bottom">项目：{{item.items_name}}</div>
      </li>
    </ul>

    <div class="clear4"></div>

    <div class="h80rem wb100 f28rem bg-white1" v-show="loading" v-loading="loading"></div>

    <div class="wb100 h60rem f28rem lh80rem fc-gray2 text-center" v-show="noMore">没有更多了</div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { postConsumption } from "@/assets/api/CustomerDetails/Consumption";
export default {
  name: "Consumption",
  data() {
    return {
      minHeight: 0,
      customerId: 10,
      // 分页
      start: 0,
      perpage: 10,
      // 数据
      dataDayList: [],
      dataList: [],
      // 下拉加载
      loading: false,
      disabled: false,
      noMore: false
    };
  },
  components: { Toast },
  methods: {
    ConsumptionList() {
      const that = this;

      if (that.disabled || that.loading) return;

      that.disabled = true;
      that.loading = true;

      that.start++;
      let dataContetn = {
        customer_id: that.customerId,
        start: that.start,
        perpage: that.perpage
      };
      postConsumption(dataContetn).then(res => {
        if (res.status == 0) {
          that.dataDayList = res.data.customer;
          let list1 = res.data.list;

          if (res.data.list.length < that.perpage) {
            //已经到底了
            that.disabled = true;
            that.noMore = true;
            that.loading = false;
            that.dataList = this.dataList.concat(list1);
          } else {
            that.disabled = false;
            that.loading = false;
            that.dataList = this.dataList.concat(list1);
          }
        } else {
          Toast("获取用户数据错误!");
          //没有数据
          this.disabled = true;
          this.noMore = true;
          this.loading = false;
        }
      }).catch((e)=>{
        console.log(e)
      })
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.customerId = this.$route.query.id;
    this.ConsumptionList();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight2 = window.innerHeight
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
@import "./Consumption.scss";
</style>