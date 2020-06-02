<template>

  <div class="wb100" v-if="showTitle">
    <div class="wb100 h50px warpper-blue-12" :class="fixed ? 'fixed' : 'relative'" style="z-index: 99999;">
      <div class="w50px h50px fl" v-if="back" @click="myBack()">
        <div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>
      </div>
      <p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">{{title}}</p>
    </div>
  </div>

</template>

<script>

    import Base from '../assets/js/base.js'
    import Interface from '../assets/js/interface.js'

    export default{
        props: ['title', 'back_url', 'back', 'fixed',],
        data (){
            return {
                showTitle: true,
            }
        },
        methods: {
          myBack(){
            this.$router.go(-1)
          }
        },
        mounted(){
          let _source = Interface.getSource()
          if(_source != 'wap') this.showTitle = false
          //判断微信内核
          if(Base.versions.isWeiXin)  this.showTitle = false
        }
    }
</script>
