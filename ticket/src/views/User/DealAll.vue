<template>
  <div id="deal_all_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'账户明细'" :back="true" :fixed="true"></navTitle>

    <template v-if="showTitle">
      <div class="clear h50px"></div>
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top: 50px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="nav pal10 par10" :class="current == key ? 'nav-active' : ''">{{item}}</span>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top: 0px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="nav pal10 par10" :class="current == key ? 'nav-active' : ''">{{item}}</span>
        </div>
      </div>
    </template>

    <div class="clear h45px"></div>

    <div class="clear"></div>

    <div class="wb100">
      <div class="pal15 warpper-black-3 Fwhite-1">
        <div class="wb100" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
          <div v-for="item in dealList" v-if="empty==false">
            <div class="clear1"></div>
            <div class="wb100 bor-black2 bor-solid-1b">
              <div class="par15 relative">
                <p class="lh25px F16">
                  <span class="fl">{{item.businessDesc}}{{item.businessType}}</span>
                  <span class="fr Fnum" :class="item.transMoney<0 ? 'Fblue' : 'Fred'" >{{item.transMoney}}</span>
                  <!--<span class="fr">{{item.transMoney}}</span>-->
                </p>
                <div class="clear"></div>
                <p class="lh20px F12 mat5">
                  <span class="Fblack-2 fl Fnum">{{item.transactionTime}}</span>
                  <span class="Fblack-2 fr Fnum">当前余额{{item.currentBalance}}元</span>
                </p>
              </div>
              <div class="clear1"></div>
            </div>
          </div>

        </div>
      </div>

      <template v-if="last == true">
        <div class="wb100 Fblack-2">
          <div class="text-center h40px lh40px center w120px F14" >
            <span class="fl mal10">暂无更多数据</span>
          </div>
        </div>
      </template>
      <template v-else-if="empty == true">
        <div class="wb100 text-center">
          <img src="~@/assets/images/kb_mx.png"  class="wb55 center " style="margin-top: 68px">
          <p class="Fblack-2 F16 lh25px h25px">还没有明细记录哦~</p>
          <p class="Fblack-2 F14 lh25px h25px">不要让大奖溜走，快去购彩吧！</p>
          <div class="clear1"></div>
          <router-link :to="{ name: 'Index'}">
            <div class="radius5  bor-red  bor-solid-1a wb40 center h40px lh40px"><p class="Fred">立即去购彩</p></div>
          </router-link>
        </div>
      </template>
      <template v-else>
        <div class="wb100" v-show="loading">
          <div class="text-center Fblack-2 h40px lh40px center w120px F14">
            <img src="~@/assets/images/loading-2.gif" class="h20px fl mat10">
            <span class="fl mal10">数据加载中...</span>
          </div>
        </div>
      </template>

    </div>

  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'

  export default{

    data (){
      return {
        login: false,
        fullscreenLoading: true,
        showTitle: true,
        myHeight: 0,
        user: {},
        current: 0,
        page: 0,
        pageSize: 20,
        navList: ['全部', '收入', '支出'],
        dealList: [],
        loading: true,
        empty: false,
        last: false
      }
    },

    methods: {
      getData() {

        var _this = this;

        _this.loading = true;

        if(_this.last || _this.empty){
          _this.loading = false;
          if(_this.page == 0){
            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,0);
            },100);
          }
          return ;
        }

        _this.page ++;

        Interface.userAccountFlow(this.current, this.page, this.pageSize, (data) => {

          if (data) {

            if (data.returnJSON.indexData.length == 0) {
              if(_this.page == 1){
                _this.empty = true;
              }else{
                _this.empty = false;
                _this.last = true;
              }
            } else {
              if(data.returnJSON.indexData.length < _this.pageSize){
                _this.empty = false;
                _this.last = true;
              }
            }

            this.dealList = this.dealList.concat(data.returnJSON.indexData);

            this.loading = false;

            if(_this.page == 1){
              setTimeout( ()=> {
                _this.fullscreenLoading = false;
                window.scrollTo(0,0);
              },100);
            }

          }
        });
      },
      navChange(key) {
        this.current = key;
        this.dealList = [];
        this.page = 0;
        this.loading = true;
        this.last = false;
        this.empty = false;
        this.getData();
      }
    },

    mounted(){

      this.myHeight = $(window).height();

      let _current = this.$route.query.nav;

      this.call = this.$route.query.call;

      if (Base.isNull(_current)) {
        _current = 0;
      }

      this.current = _current;

      let _source = Interface.getSource();

      if(_source != 'wap'){
        this.showTitle = false;
      }

      //判断微信内核
      if(Base.versions.isWeiXin){
        this.showTitle = false;
      }

      this.getData();

    }

  }


</script>

