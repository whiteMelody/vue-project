<template>
  <!-- 咨询 -->
  <div class="HistoricalConsultation bg-white" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <Header :title="'历史咨询'" :back="true"></Header>
    <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="20"
    >
      <li v-for="(item, index) in list"
           :key="index">
        <div class="time">{{item.created_at}}</div>
        <div class="content">
          <span>&nbsp;&nbsp;&nbsp;{{item.describe}}</span>
        </div>
      </li>
    </ul>

    <div class="h80rem wb100 f28rem bg-white1" v-show="loading" v-loading="loading"></div>

    <div class="wb100 h60rem f28rem lh80rem fc-gray2 text-center bg-white" v-show="noMore">没有更多了</div>
  </div>
</template>
<script>
import Header from "../../../../components/Header";
import { getHistoricalConsultation } from "@/assets/api/HistoricalConsultation/HistoricalConsultation";
export default {
  name: "HistoricalConsultation",
  data() {
    return {
      minHeight: 0,
      loading: false,
      disabled: false,
      noMore: false,
      params: {
        customerID: "", // 顾客id
        start: 0, // 页码
        perpage: 10 // 数量
      },
      list:[]
    };
  },
  components: {
    Header
  },
  methods: {
    // 数据
    load() {
      if (this.disabled || this.loading) return;

      this.disabled = true;
      this.loading = true;
      this.params.start++;

      getHistoricalConsultation(this.params).then(res => {
        if (res.status == 0) {
          let list = res.data.list;

          if (list.length < this.params.perpage) {
            //已经到底了
            this.list = this.list.concat(list);
            this.disabled = true;
            this.noMore = true;
            this.loading = false;
          } else {
            this.list = this.list.concat(list);
            this.disabled = false;
            this.loading = false;
          }
        } else {
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
    // 顾客ID
    this.params.customer_id = this.$route.query.customer_id;
    // 初始化
    this.load();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight
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
@import "./HistoricalConsultation.scss";
</style>