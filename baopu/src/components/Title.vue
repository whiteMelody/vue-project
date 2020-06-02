<template>

  <div class="wb100">
    <div class="wb100 h50px warpper-black-6" v-if="showTitle == true"  :class="fixed ? 'fixed' : 'relative'" style="z-index: 99999;">
      <div class="w50px h50px fl" v-if="back" @click="myBack()">
        <div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/arrow-left.png"></div>
      </div>
      <p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fgray-5" style="top: 0; left: 0; right: 0; margin: 0 auto;">{{title}}</p>
    </div>
  </div>


</template>

<style>
</style>

<script>

    import Base from "../assets/js/base.js"

    export default{
        props: ['title', 'back_url', 'back', 'fixed','back_home'],
        data (){
            return {
                showTitle: true,
            }
        },
        methods: {
          myBack(){
              if(this.back_home){
                this.$router.push({ name:'Index' })
              }else{
                this.$router.go(-1);
              }
          }
        },
        mounted(){
//          if(Base.versions.isAndroidApp || Base.isIosApp || Base.isWeiXin){
//              this.showTitle = false;
//          }
//          alert(Base.versions.isAndroidApp == true || Base.isIosApp == true || Base.isWeiXin == true);

          if(Base.versions.isAndroidApp || Base.versions.isIosApp || Base.versions.isWeiXin){
              this.showTitle = false;
          }
        }
    }
</script>
