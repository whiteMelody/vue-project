<template>
  <div class="CustomerDetails wb100" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <Header :title="'顾客详情'" :back="true"></Header>

    <div class="wb100">
      <div class="wb100 fl f28rem text-center bg-white">
        <template v-for="(item,index) in arrs">
          <template v-if="index == curIndex">
            <div class="wb16666 fl h80rem lh80rem pointer">
              <span class="bd-green bd-b2 fc-green lh80rem display-inline">{{item}}</span>
            </div>
          </template>
          <template v-else>
            <div class="wb16666 fl fc-gray3 h80rem lh80rem  pointer" @click="curIndex = index">{{item}}</div>
          </template>
        </template>
      </div>
    </div>

    <div class="clear4 bg-white1"></div>

    <div v-show="curIndex == 0" class="bg-white wb100" :style="'min-height:'+ minHeight2 +'px' ">
      <Details></Details>
    </div>
    <div v-show="curIndex == 1" class="bg-white wb100" :style="'min-height:'+ minHeight2 +'px' ">
      <ArrivalVisit></ArrivalVisit>
    </div>
    <div v-show="curIndex == 2" class="bg-white wb100" :style="'min-height:'+ minHeight2 +'px' ">
      <Consumption></Consumption>
    </div>
    <div v-show="curIndex == 3" class="bg-white wb100" :style="'min-height:'+ minHeight2 +'px' ">
      <Consultation></Consultation>
    </div>
    <div v-show="curIndex == 4" class="bg-white wb100" :style="'min-height:'+ minHeight2 +'px' ">
      <Consume></Consume>
    </div>
    <div v-show="curIndex == 5" class="bg-white wb100" :style="'min-height:'+ minHeight2 +'px' ">
      <ReturnVisit></ReturnVisit>
    </div>

  </div>
</template>
<script>
  import Header from "../../../../components/Header";
  import Details from "./Details.vue";
  import ArrivalVisit from "./ArrivalVisit.vue";
  import Consumption from "./Consumption.vue";
  import Consultation from "./Consultation.vue";
  import Consume from "./Consume.vue";
  import ReturnVisit from "./ReturnVisit.vue";
  export default {
    name: "CustomerDetails",
    data() {
      return {
        minHeight: 0,
        minHeight2: 0,
        arrs: ["详情", "到诊", "消费", "咨询", "消耗", "回访"],
        curIndex: 0,
        activeName:'Details'
      };
    },
    components: {
      Header,
      Details,
      ArrivalVisit,
      Consumption,
      Consultation,
      Consume,
      ReturnVisit,
    },
    methods: {},

    // 创建前状态
    beforeCreate() {},

    // 创建完毕状态
    created() {},

    // 挂载前状态
    beforeMount() {},

    // 挂载结束状态
    mounted() {
      // console.log( this.$route.query.id )
      this.minHeight = window.innerHeight
      this.minHeight2 = window.innerHeight - 100
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
  .CustomerDetails .el-tabs__header {
    margin: 0;
  }
</style>