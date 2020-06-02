<template>

  <div class="wb100" v-if="showTitle">
    <div class="wb100 h80rem bg-white bd-gray bd-b1" :class="relative ? 'relative' : 'fixed'" style="z-index: 99999;">
      <template v-if="titleLeft">
        <p class="pal20 text-over-hidden1 text-left h80rem lh80rem f40rem Fb fc-black1">{{title}}</p>
      </template>
      <template v-else>
        <div class="w50rem fl h80rem lh80rem text-center " v-if="back" @click="myBack()">
          <i class="f30rem iconfont fl mal20" :class=" backIcon ? backIcon : 'iconfanhui' "></i>
        </div>
        <p class="wb70 text-over-hidden1 absolute text-center h80rem lh80rem f40rem Fb fc-black1" style="top: 0; left: 0; right: 0; margin: 0 auto;">{{title}}</p>
      </template>
    </div>
    <div v-if="!relative" style="height: .8rem; clear: both;"></div>
  </div>

</template>

<script>

  import { getUserInfo } from "@/assets/api/Data/Login";

    export default{
      /**
       * title 显示的title
       * back 是否显示返回按钮
       * backIcon 返回的icon
       * relative 头部设为relative（禁止置顶）
       */
      props: ['title', 'back', 'backIcon', 'relative', 'titleLeft'],
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
          //微信内隐藏头
          let ua = navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i)=="micromessenger"){
            this.showTitle = false
            window.document.title = this.title
            if(this.title == '流程管理'){
              getUserInfo().then((res)=>{
                if(res.status == 0){
                  if(res.data.role_id == 4){
                    window.document.title = '预约列表'
                  }else{
                    window.document.title = '流程管理'
                  }
                }
              }).catch((e)=>{
                console.log(e)
              });
            }
          }

        }
    }
</script>
