<template>
  <div class="CustomerCenter">
    <div class="header">
      <p
        v-for="(item, index) in rankingList"
        :key="index"
        :class="{active: spanIsShow == index}"
        @click="RankingOrder(index)">
        <span>{{item}}</span>
        <em></em>
        <i></i>
      </p>
    </div>

    <div class="box">
      <template v-if="spanIsShow == 0">
        <essential-information></essential-information>
      </template>
      <template v-if="spanIsShow == 1">
        <counseling-message></counseling-message>
      </template>
      <template v-if="spanIsShow == 2">
        <hospital-guide-message></hospital-guide-message>
      </template>
      <template v-if="spanIsShow == 3">
        <consumption-message></consumption-message>
      </template>
      <template v-if="spanIsShow == 4">
        <counseling-detail></counseling-detail>
      </template>


    </div>
  </div>
</template>
<script>
 
//顾客个人详情-- 基本数据
import EssentialInformation from './EssentialInformation'
//顾客个人详情-- 咨询信息
import CounselingMessage from './CounselingMessage'
//顾客个人详情-- 到诊信息
import HospitalGuideMessage from './HospitalGuideMessage'
//顾客个人详情-- 消费信息
import ConsumptionMessage from './ConsumptionMessage'
//顾客个人详情-- 消费明细
import CounselingDetail from './CounselingDetail'



export default {
  name: "CustomerCenter",
  data() {
    return {
      // tab栏
      rankingList: ["基本数据", "咨询信息", "到诊信息", "消费信息" ,'划扣明细'],
      // tab栏样式状态
      spanIsShow: 0,
      userId:''
    };
  },
  components: {
    EssentialInformation,
    CounselingMessage,
    HospitalGuideMessage,
    ConsumptionMessage,
    CounselingDetail
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
    this.userId = this.$route.query.id;
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
  .rankingTitle {
    height: 42px;
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    color: #999999;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    border-bottom: 1px solid #e5e5e5;
    .rankingTabs {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      margin-right: 0.6rem;
    }
    .explainText {
      color: #333333;
      border-top: 2px solid #333333;
    }
  }
  .header{
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    p{
      height: 40px;
      position: relative;
      align-items: center;
      display: flex;
      width: 90px;
      cursor: pointer;
      span{
        flex: 1;
        text-align: center;
        font-size: 14px;
      }
      i{
        width: 1px;
        height: 10px;
        background: #e5e5e5;
      }
      em{
        position: absolute;
        top:0;
        left: 0;
        background: #333333;
        height: 2px;
        width: 100%;
        display: none;
      }
      &.active{
        background: #F8F8F8;
        em{
          display: block;
        }
      }
      &:last-of-type{
        i{
          opacity: 0;
        }
      }
    }
  }
  .box{
    margin: 20px;
  }
}
</style>



    
