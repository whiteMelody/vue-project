<template>

  <div id="deal_all_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'账户明细'" :back="true" :fixed="true"></navTitle>

    <template v-if="showTitle == true">
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top:50px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="tab-nav pal10 par10" :class="current == key ? 'tab-nav-active' : ''">{{item}}</span>
        </div>
      </div>
      <div class="clear h100px"></div>
    </template>
    <template v-else>
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top:0px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="tab-nav pal10 par10" :class="current == key ? 'tab-nav-active' : ''">{{item}}</span>
        </div>
      </div>
      <div class="clear h50px"></div>
    </template>

    <div class="wb100" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
      <div v-for="item in dealList" v-if="empty==false">

        <div class="pal15 warpper-black-3">
          <div class="clear1"></div>
          <div class="wb100">
            <div class="par15 relative">
              <div class="wb65 fl ">
                <p class="Fgray-5 text-over-hidden1 lh25px">
                  {{item.businessType}}
                  <!--<span v-if="item.businessDesc != null"> — {{item.businessDesc}}</span>-->
                </p>
                <p class="Fgray-6 fl Fnum F12 h15px mat5">{{item.transactionTime}}</p>
              </div>
              <div class="wb35 fr text-right lh25px">
                <p class="Fnum Fgray-5" v-if="item.transMoney<0">{{item.transMoney}} 金币</p>
                <p class="Fnum Forange-2" v-if="item.transMoney>=0">+{{item.transMoney}} 金币</p>
                <p class="Fgray-6 Fnum F12 lh15px mat5">账户余额：{{item.currentBalance}}</p>
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="clear1"></div>
        </div>

        <div class="pal15">
          <div class="clear bor-black3 bor-solid-1b"></div>
        </div>

      </div>

      <div class="clear1"></div>

      <template v-if="last == true">
        <div class="wb100">
          <div class="text-center warpper-black-4 Fgray-6 h40px lh40px center w120px F14" >
            <span class="fl mal10">暂无更多数据</span>
          </div>
        </div>
      </template>
      <template v-else-if="empty == true">
        <div class="wb100 text-center">
          <img src="~@/assets/images/zhmx_kb.png"  class="wb25 center mat50">
          <div class="clear1"></div>
          <p class="Fgray-6 F16 lh25px h25px">还没有明细记录哦~</p>
          <div class="clear1"></div>
        </div>
      </template>
      <template v-else>
        <div class="wb100" v-show="loading">
          <div class="text-center warpper-black-4 Fgray-6 h40px lh40px center w120px F14">
            <img src="~@/assets/images/loading-2.gif" class="h20px fl mat10">
            <span class="fl mal10">数据加载中...</span>
          </div>
        </div>
      </template>

    </div>

  </div>

</template>

<style>

</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'

    export default{

        data (){
            return {
              login: false,
              fullscreenLoading: true,
              showTitle: true,
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
                  window.scrollTo(0,1);
                },100);
              }
              return ;
            }

            _this.page ++;

            Interface.userAccountFlow(_this.page, _this.pageSize, _this.current, function (data) {

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

                _this.dealList = _this.dealList.concat(data.returnJSON.indexData);

                _this.loading = false;

              }

              if(_this.page == 1){
                setTimeout( ()=> {
                  _this.fullscreenLoading = false;
                  window.scrollTo(0,1);
                },100);
              }

            });
          },
          navChange(key) {
            this.current = key;
            this.dealList = [];
            this.page = 0;
            this.loading = true;
            this.last = false;
            this.getData();
          }
        },

        mounted(){

          var _current = this.$route.params.nav;

          if (Base.isNull(_current)) {
            _current = 0;
          }

          if(Base.versions.isAndroidApp || Base.versions.isIosApp || Base.versions.isWeiXin){
            this.showTitle = false;
          }

          this.current = _current;

          this.getData();

        }

    }

</script>
