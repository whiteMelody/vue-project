<template>
  <div class="CustomerCenter">
    <div class="rankingTitle">
      <span
          class="rankingTabs"
          v-for="(item, index) in rankingList"
          :key="index"
          :class="{explainText: spanIsShow == index}"
          @click="RankingOrder(index)"
        >{{item}}</span>
    </div>
    <div class="box">
      <router-view refs="mychild"></router-view>
    </div>
  </div>
</template>
<script>
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
  components: {},
  methods: {
    RankingOrder(index) {
      this.spanIsShow = index;
      switch (this.spanIsShow) {
        case 0:
          this.$router.push({
          path: "/EssentialInformation",
            query:{
              id:this.userId
            }
          });
          break;
        case 1:
          this.$router.push({
          path: "/CounselingMessage",
            query:{
              id:this.userId
            }
          });
          break;
        case 2:
          this.$router.push({
          path: "/HospitalGuideMessage",
            query:{
              id:this.userId
            }
          });
          break;
        case 3:
          this.$router.push({
          path: "/ConsumptionMessage",
            query:{
              id:this.userId
            }
          });
          break;
        case 4:
          this.$router.push({
          path: "/CounselingDetail",
            query:{
              id:this.userId
            }
          });
          break;
        default:
          break;
      }
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
    switch (this.spanIsShow) {
      case 0:
        this.$router.push({
        path: "/EssentialInformation",
          query:{
            id:this.userId
          }
        });
        break;
      case 1:
        this.$router.push({
        path: "/CounselingMessage",
          query:{
            id:this.userId
          }
        });
        break;
      case 2:
        this.$router.push({
        path: "/HospitalGuideMessage",
          query:{
            id:this.userId
          }
        });
        break;
      case 3:
        this.$router.push({
        path: "/ConsumptionMessage",
          query:{
            id:this.userId
          }
        });
        break;
      case 4:
        this.$router.push({
        path: "/CounselingDetail",
          query:{
            id:this.userId
          }
        });
        break;
      default:
        break;
    }
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
  padding: 0 .26rem;
  margin-top: .2rem;
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
  .box{
    padding-top: .3rem;
  }
}
</style>



    
