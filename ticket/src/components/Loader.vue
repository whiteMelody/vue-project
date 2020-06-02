<template>
  <div class="loader" v-show="show">
    <div class="loader-content">
      <img src="~@/assets/images/loading_1.gif" alt="Loader" class="loader-loader w45px h45px"/>
      <div class="clear h20px"></div>
      <p class="text-center Fblack-2">正在加载中...</p>
    </div>
  </div>
</template>

<style scoped>
  .loader {
    position: fixed;
    z-index: 999999999;
    width: 100%;
    height: 100%;
    background: #1f2025;
    text-align: center;
    /* loader页面消失采用渐隐的方式*/
    -webkit-transition: opacity 1s ease;
    -moz-transition: opacity 1s ease;
    -o-transition: opacity 1s ease;
    transition: opacity 1s ease;
  }
  /* 使用base64编码嵌入加载的logo */
  .loader-content {
    display: block;
    position: relative;
    top: 35%;
  }

  .fadeout {
    opacity: 0;
    filter: alpha(opacity=0);
  }
  /* logo出现动画 */
  @-webkit-keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}100%{opacity:1;-webkit-transform:none;transform:none}}
  @keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);}}
</style>

<script>
    export default{
        props: ['show'],
        data (){
            return {}
        },
        methods: {},
        mounted(){

        }
    }
</script>
