<template>
  <div id="index_page" class="warpper-white">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="title" :back="false"></navTitle>

    <div class="wb100">

    </div>

    <!--<nav-footer :active="1"></nav-footer>-->

  </div>
</template>

<style>
  .el-carousel__button{ width: 6px; height: 6px; -moz-border-radius:50%;-webkit-border-radius:50%;border-radius:50% }
  .el-carousel__arrow--left{ display: none;}
  .el-carousel__arrow--right{ display: none;}
  .el-carousel__mask{ background: rgba(0,0,0,.9) !important; }
</style>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  export default{

    data (){
      return {
        fullscreenLoading: false,
        list: [],
        title: '',
      }
    },

    methods: {

    },

    mounted(){

        this.categoryID = this.$route.params.categoryID;

        //获取banner
        Interface.getAudioChannelsByCategoryIDV2( this.categoryID, (data)=> {
            if(data){
                this.list = data.returnJSON;

                console.log(this.list);
            }
        })

    },

  }


</script>

