<template>
  <!-- 到诊 -->
  <div class="ArrivalVisit wb100" :style="'min-height:'+ minHeight2 +'px' ">
    <div class="box"></div>
    <div class="headr">
      <div class="left">
        <div class="number">{{dataDayList.store_quantity}}</div>
        <div class="kong"></div>
        <div class="text">共到诊(次)</div>
      </div>
      <!-- <div class="fenge"></div>
      <div class="right">
        <div class="number">{{dataDayList.orders_amount}}</div>
        <div class="kong"></div>
        <div class="text">合计消费(元)</div>
      </div> -->
    </div>
    <ul v-infinite-scroll="list" infinite-scroll-disabled="disabled">
      <li v-for="(item, index) in dataList" :key="index">
        <div class="top">
          <div class="time">{{item.store_time}}</div>
          <!-- <div class="money">￥{{item.orders_money}}</div> -->
        </div>
        <div class="bottom">项目：{{item.items.name}}</div>
      </li>
    </ul>

    <div class="clear4"></div>

    <div class="h80rem wb100 f28rem bg-white1" v-show="loading" v-loading="loading"></div>

    <div class="wb100 h60rem f28rem lh80rem fc-gray2 text-center" v-show="noMore">没有更多了</div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { postArrivalVisit } from "@/assets/api/CustomerDetails/ArrivalVisit";
export default {
  name: "ArrivalVisit",
  data() {
    return {
      minHeight: 0,
      minHeight2: 0,
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
    list() {
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
      postArrivalVisit(dataContetn).then(res => {
        if (res.status == 0) {
          that.dataDayList = res.data.customer;
          let list1 = res.data.list;

          if (res.data.list.length < that.perpage) {
            //已经到底了
            that.disabled = true;
            that.noMore = true;
            that.loading = false;
            that.dataList = this.dataList.concat(list1);
          }else{
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
    this.list();
    this.minHeight2 = window.innerHeight
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
@import "./ArrivalVisit.scss";
</style>