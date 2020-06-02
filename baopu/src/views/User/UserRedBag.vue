<template>

  <div id="user_red_bag_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'我的红包'" :back="true" :fixed="true"></navTitle>

    <!--<div class="wb100 h50px relative warpper-red" style="z-index: 99999;">-->
    <!--<a href="user.html">-->
    <!--<div class="w50px h50px fl">-->
    <!--<div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>-->
    <!--</div>-->
    <!--</a>-->
    <!--<p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">投注记录</p>-->
    <!--</div>-->

    <template v-if="showTitle == true">
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top:50px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="tab-nav pal10 par10" :class="current == (key) ? 'tab-nav-active' : ''">{{item}}</span>
        </div>
      </div>
      <div class="clear h100px"></div>
    </template>
    <template v-else>
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top:0px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="tab-nav pal10 par10" :class="current == (key) ? 'tab-nav-active' : ''">{{item}}</span>
        </div>
      </div>
      <div class="clear h50px"></div>
    </template>

    <div class="pa15 Fgray-5" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
      <div v-for="item in recordList" v-if="empty==false">

        <div class="clear1"></div>

        <div class="pa10 relative warpper-black-3">

          <div class="w70px h45px fl text-center Fwhite pat5 pab5 lh20px F14 radius4" :class="current == 0 ? 'warpper-orange-7' : 'warpper-gray-7'">
            <p class="lh25px"><span class="Fnum F24">{{item.faceValue}}</span>金币</p>
            <p class="F12 lh15px">满<span class="Fnum">{{item.limit}}</span>可用</p>
          </div>

          <div class="w180px fl h45px pat5 pal10 pab5">
            <p class="F18 lh25px">红包</p>
            <p class="F12 Fgray-6 lh20px" v-if="current != 2">有效期至<span class="Fnum">{{item.endTime}}</span></p>
            <p class="F12 Fgray-6 lh20px" v-if="current == 2">使用日期<span class="Fnum">{{item.expenseTime ?  item.expenseTime : '1900-1-1'}}</span></p>
          </div>

          <!--<div class="w80px fr h40px lh40px bor-red bor-solid-1a text-center Fred F16 mat15 radius5">-->
          <!--立即使用-->
          <!--</div>-->

          <img src="~@/assets/images/redBag-used.png" v-if="current == 2" class="w50px absolute" style="top: 15px; right: 15px;">
          <img src="~@/assets/images/redBag-past.png" v-if="current == 1" class="w50px absolute" style="top: 15px; right: 15px;">

          <div class="clear"></div>

        </div>

        <div class="clear"></div>
      </div>

      <div class="clear1"></div>

      <div class="wb100 text-center" v-if="empty==true">
        <img src="~@/assets/images/hb_kb.png"  class="wb25 center" style="margin-top: 100px;">
        <div class="clear1"></div>
        <p class="Fgray-6 F16 lh25px h25px">还没有红包记录哦~</p>
        <div class="clear1"></div>
      </div>

      <div class="wb100" v-else>
        <div class="text-center Fgray-6 h40px lh40px warpper-black-4 center w120px F14" v-show="loading">
          <img src="~@/assets/images/loading-2.gif" v-show="!last" class="h20px fl">
          <span class="fl mal10">{{loadtext}}</span>
        </div>
      </div>

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
              navList: ['可使用', '已过期', '已使用'],
              recordList: [],
              loadtext: '数据加载中...',
              loading: true,
              empty: false,
              last: false
            }
        },

        methods: {
          getData() {

            var _this = this;

            if(_this.last)
              return ;

            _this.loading = true;

            _this.page ++;

            Interface.couponList(_this.page, _this.pageSize, _this.current, function (data) {

                if (data) {
                  var _tmp = data.returnJSON;

                  if (_tmp.length == 0 || _tmp.length < _this.pageSize) {

                    if (_this.page == 1) {
                      _this.loading = false;
                      _this.last = true;
                      _this.loadtext = '暂无更多数据';
                    } else {
                      _this.loading = true;
                      _this.last = true;
                      _this.loadtext = '暂无更多数据';
                      return false;
                    }
                  }

                  if (_tmp.length == 0) {
                    _this.empty = true;
                    return false;
                  } else {
                    _this.empty = false;
                  }

                  _this.recordList = _this.recordList.concat(_tmp);

                  _this.loading = false;

                } else {
                  _this.empty = true;
                }
                _this.fullscreenLoading = false;

            });
          },
          navChange(key) {
            this.current = key;
            this.recordList = [];
            this.page = 0;
            this.loading = true;
            this.last = false;
            this.loadtext = '数据加载中...';
            this.getData();
          },
          twoDecimal(x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
              return false;
            }
            var f = Math.round(x * 100) / 100;
            var s = f.toString();
            var rs = s.indexOf('.');
            if (rs < 0) {
              rs = s.length;
              s += '.';
            }
            while (s.length <= rs + 2) {
              s += '0';
            }
            return s;
          }
        },

        mounted(){
          var _this = this;

          if(Base.versions.isAndroidApp || Base.versions.isIosApp || Base.versions.isWeiXin){
            this.showTitle = false;
          }

          var _current = this.$route.params.nav;

          if (Base.isNull(_current)) {
            _current = 0;
          }

          _this.current = _current;

          _this.getData();

          _this.fullscreenLoading = false;
        }

    }

</script>
