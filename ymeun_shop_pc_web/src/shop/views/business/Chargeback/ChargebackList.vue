<template>
  <div class="ChargebackList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>
        <a :class="{'active' : tableIndex == 0}" @click="tableIndex = 0">可退单</a>
        <em></em>
        <a :class="{'active' : tableIndex == 1}" @click="tableIndex = 1">审核中</a>
        <em></em>
        <a :class="{'active' : tableIndex == 2}" @click="tableIndex = 2">已退单</a>
    </header>
    <div class="box">
        <list-can-be-returned v-if="tableIndex == 0"></list-can-be-returned>
        <under-review v-else-if="tableIndex == 1"></under-review>
        <retired-single v-else-if="tableIndex == 2"></retired-single>
    </div>
  </div>
</template>
<script>
import ListCanBeReturned from './ChargebackList/ListCanBeReturned'
import UnderReview from './ChargebackList/UnderReview'
import RetiredSingle from './ChargebackList/RetiredSingle'
export default {
  name: "ChargebackList",
  data() {
    return {
      boxMaxHeight:"",
      tableIndex:0
    };
  },
  components: {
    ListCanBeReturned, //可退单 
    UnderReview,//审核中
    RetiredSingle,//已退单
  },
  methods: {
     
  },

  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
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
.ChargebackList {
  header{
    display: flex;
    line-height: 50px;
    background: #fff;
    align-items: center;
    a{
        width: 108px;
        text-align: center;
        font-size: 16px;
        color: #666666;
        cursor: pointer;
        border-top-width:2px;
        border-top-style: solid;
        border-top-color: #fff; 
    }
    em{
        width: 1px;
        height: 10px;
        background: #E5E5E5;
    }
    .active{
        background: #F8F8F8;
        color: #333;
        border-top-color: #333333;
    }
  }
}
</style>


    
