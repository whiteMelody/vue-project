<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {

      let clipboard = new this.clipboard(".cobyOrderSn");
      clipboard.on('success', ()=> {
        this.$message({
          message:'复制成功',
          type: 'success',
        });
      });
      clipboard.on('error', ()=> {
        this.$message({
          message:'复制失败',
          type: 'error',
        });
      });

    }
  }

</script>

