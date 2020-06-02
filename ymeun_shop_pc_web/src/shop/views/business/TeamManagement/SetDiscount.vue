<template>
  <div class="SetDiscount">
    <header>
      <div v-for="(item, index) in list" :key="index" :class="{active:index == tabIndex}" @click="tabIndex = index">{{item}}</div>
    </header>
    <template v-if="tabIndex == 0">
      <adviser></adviser>
    </template>
    <template v-else>
      <Beautician></Beautician>
    </template>
  </div>
</template>

<script>
import adviser from './DiscountList/adviser';
import Beautician from './DiscountList/Beautician';
  export default {
      name: "SetDiscount",
      components: {adviser,Beautician},
      data() {
          return {
            tabIndex:0,
            list:[`设置${this.$store.getters.roleName.adviser}折扣权限`,`设置${this.$store.getters.roleName.technician}折扣权限`]
          }
      },
      mounted() {},
      methods: {}
  }
</script>

<style lang="scss" scoped>
  .SetDiscount {
    header {
      height: 50px;
      background-color: #fff;
      display: flex;
      div {
        height: 100%;
        line-height: 50px;
        padding: 0 20px;
        font-size:16px;
        color: #999999;
        font-family:Microsoft YaHei;
        font-weight:400;
        cursor: pointer;
        &.active {
          background-color: #F8F8F8;
          color: #333333;
          border-top: 2px solid #333333;
        }
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
</style>
