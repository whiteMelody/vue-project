<template>
  <div id="index_page" class="warpper-white">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'首页'" :back="false"></navTitle>

    <div class="wb100">

      <!--<div class="wb100">-->
        <!--<el-carousel :interval="5000" :height="_height + 'px'" ref="carousel">-->
          <!--<el-carousel-item v-for="(item,key) in banner" :key="key">-->
              <!--<a :href="item.linkUrl">-->
                <!--<div class="wb100 img-area" :style="'width:'+_width+'px; height:'+_height+'px;'"  @touchstart="moveStart" @touchend="moveEnd">-->
                  <!--&lt;!&ndash;<img :src="item.imageURL + '?x-oss-process=image/resize,m_fill,h_'+_height * 2 +',w_'+_width * 2" />&ndash;&gt;-->
                  <!--<img :src="item.imgUrl" />-->
                <!--</div>-->
              <!--</a>-->
          <!--</el-carousel-item>-->
        <!--</el-carousel>-->
      <!--</div>-->

      <div class="clear"></div>

      <!-- icons -->
      <div class="pa15">
        <template v-for="item in icons.details">

          <div class="wb25 fl">
            <div class="wb100 text-center">
              <div class="pal15 par15 center img-area">
                <img :src="item.iconUrl">
              </div>
              <div class="clear h10px"></div>
              <p class="F14 Fgray-4 lh15px h15px">{{item.functionName}}</p>
            </div>
          </div>

        </template>

        <div class="clear"></div>

      </div>

    </div>

    <div class="clear1 warpper-gray-3"></div>

    <!--contentList-->
    <div class="wb100">
      <template v-for="item in contentList">

        <div class="pa15">
          <router-link :to="{ name:'List', params:{ categoryID: item.redirectUrl } } ">
          <!--<router-link :to="{ name: 'List', params: { categoryID: item.redirectUrl} }">-->
            <div class="wb100 img-area relative radius5 over-hidden">
              <img :src="item.imgUrl">
              <p class="h40px lh40px wb100 Fwhite absolute" style="background: rgba(0,0,0,.6); left:0; bottom: 0;">
                <span class="fl pal15">{{item.title}}</span>
              </p>
            </div>
          </router-link>
        </div>

        <div class="pal15">
          <div class="clear1 bor-gray bor-solid-1t"></div>
        </div>

        <template v-for="item2 in item.dataList">
          <div class="pal15 par15">
            <div class="relative h80px" style="padding-left: 95px;">
              <img :src="item.imgUrl+ '?x-oss-process=image/resize,m_fill,w_160,h_160'" class="w80px h80px absolute radius5" style="left: 0">
              <div class="wb100">
                <p class="Fgray-4 F16 h20px lh20px text-over-hidden1">{{item2.channelName}}</p>
                <div class="clear1"></div>
                <p class="Fgray-2 F14 h15px lh15px text-over-hidden1">{{item2.subtitle}}</p>
                <div class="clear1"></div>
                <p class="Fgray-2 h15px lh15px F12"> {{item2.channelType == 2 ? '视频' : '音频'}} {{item2.openCount}}人在学</p>
              </div>
            </div>
          </div>

          <div class="pal15 pat15 pab15">
            <div class="clear bor-gray bor-solid-1b"></div>
          </div>

        </template>


      </template>
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
        startX: 0,
        endX: 0,
        banner: [],
        _height: 0,
        height: 0,
        icons: [],
        contentList: [],
      }
    },

    methods: {
      moveStart(e) {
        this.startX = e.changedTouches[0].clientX || e.changedTouches[0].pageX;
      },
      moveEnd(e) {
        this.endX = e.changedTouches[0].clientX || e.changedTouches[0].pageX;
        var _result = this.startX - this.endX;

        if (_result >= 50) {
          this.$refs.carousel.next();
        }
        if (_result < -50) {
          this.$refs.carousel.prev();
        }
      },

    },

    mounted(){

        //获取banner
        Interface.getFocusConfig( (data)=> {
            if(data){
                this.banner = data.returnJSON;
            }
        })

        //获取分类
        Interface.getFunctionList( (data)=> {
            if(data){
              this.icons = data.returnJSON[0];
            }
        })

        //获取推荐
        Interface.getHomeContentList( (data)=> {
            if(data){
              console.log(data.returnJSON);
              this.contentList = data.returnJSON;
            }
        })

    },

  }


</script>

