<template>
  <div class="Magess">
    <div class="magessBox" @click="magessBox" v-show="magessBoxIsShow">
      <span class="shuxian"></span>
      <el-alert :title="title" type="info"></el-alert>
    </div>
  </div>
</template>
<script>
export default {
  name: "Magess",
  data() {
    return {
      magessBoxIsShow: true
    };
  },
  props: ["title"],
  methods: {
    magessBox() {
      this.magessBoxIsShow = false;
    }
  }
};
</script>
<style lang="scss">
.Magess {
  .magessBox {
    height: 35px;
    display: flex;
    .shuxian {
      display: inline-block;
      width: 2px;
      height: 35px;
      background: rgba(153, 153, 153, 1);
    }
  }
}
</style>