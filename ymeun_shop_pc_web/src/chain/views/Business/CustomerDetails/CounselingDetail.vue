<template>
  <div class="CustomerCenter">
    <div class="header">
      <p
        v-for="(item, index) in rankingList"
        :key="index"
        :class="{active: spanIsShow == index}"
        @click="RankingOrder(index)">
        <span>{{item}}</span>
      </p>
    </div>

    <div class="box">
      <template v-if="spanIsShow == 0">
        <deduct-detail></deduct-detail>
      </template>
      <template v-if="spanIsShow == 1">
        <deduct-news></deduct-news>
      </template>

    </div>
  </div>
</template>
<script>
 
//顾客个人详情-- 划扣明细
import DeductDetail from './DeductDetail'
//顾客个人详情-- 划扣消息
import DeductNews from './DeductNews'



export default {
  name: "CustomerCenter",
  data() {
    return {
      // tab栏
      rankingList: ["划扣明细", "划扣消息"],
      // tab栏样式状态
      spanIsShow: 0,
    };
  },
  components: {
    DeductDetail,
    DeductNews,
  },
  methods: {
    RankingOrder(index) {
      this.spanIsShow = index;
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    
  },

  // 更新前状态
  beforeUpdate() {
  },

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.CustomerCenter {
  background: #fff;
  .header{
    display: flex;
    padding: 0 20px;
    p{
      font-size: 14px;
      color: #333;
      line-height: 50px;
      cursor: pointer;
      margin-right: 20px;
      &.active{
        color: #009688;
      }
    }
  }
}
</style>



    
