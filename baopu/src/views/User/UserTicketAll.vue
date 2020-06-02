<template>

  <div id="user_ticket_all_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'竞猜记录'" :back="true" :fixed="true"></navTitle>

    <!--<div class="wb100 h50px relative warpper-red" style="z-index: 99999;">-->
    <!--<a href="user.html">-->
    <!--<div class="w50px h50px fl">-->
    <!--<div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>-->
    <!--</div>-->
    <!--</a>-->
    <!--<p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">投注记录</p>-->
    <!--</div>-->


    <template v-if="showTitle == true">
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top: 50px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="tab-nav pal10 par10" :class="current == (key) ? 'tab-nav-active' : ''">{{item}}</span>
        </div>
      </div>
      <div class="clear h100px"></div>
    </template>
    <template v-else>
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top: 0px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="tab-nav pal10 par10" :class="current == (key) ? 'tab-nav-active' : ''">{{item}}</span>
        </div>
      </div>
      <div class="clear h50px"></div>
    </template>

    <div class="wb100 Fgray-3">

      <div v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
        <template v-for="item in recordList" v-if="empty==false">

          <div class="clear1"></div>

          <router-link :to="{ name: 'SoccerResult', params:{ orderID: item.orderID } }">
            <div class="pal15 par15 relative warpper-black-3 Fgray-5">

              <p class="lh35px F14 relative text-over-hidden1 h40px" style="padding-left: 65px;">

                <span class="fl pal10 par10 h25px lh25px mat5 mar10 radius4 absolute" style="top: 0; left: 0;" :class="item.lotTip == '单关' ? 'warpper-black-5' : 'warpper-red-8'">{{item.lotTip}}</span>
                {{item.subtitle}}

                <!--<span class="fr Fgray-6 F12">{{dateFormat(item.matchTime,16)}} 开赛</span>-->
              </p>

              <div class="clear h10px bor-black2 bor-solid-1t"></div>

              <div class="wb100">
                <div class="wb50 fl lh25px">
                  <p class="F14 Fgray-6 lh25px h25px">竞猜玩法：{{item.lotTip}}</p>
                  <p class="F14 Fgray-6 lh25px h25px Fnum">竞猜金币：{{item.lotMoney}}</p>
                  <p class="F14 Fgray-6 lh25px h25px Fnum">竞猜时间：{{dateFormat(item.payTime)}}</p>
                </div>
                <div class="wb40 fr lh25px text-right par5per">

                  <template v-if="item.status == 2">
                    <p class="h30px lh30px F18 Forange-2" style="margin-top: 7px;">
                      已中奖
                    </p>
                    <p class="h30px lh30px Forange-2">
                      <span class="Fnum">{{ item.bonus }}</span> 金币
                    </p>
                  </template>

                  <template v-else>
                    <p class="h75px lh75px F18">
                      <span v-if="item.status == 0" class="Fgray-5">等待支付</span>
                      <span v-if="item.status == 1" class="Fgray-5">等待赛果</span>
                      <span v-if="item.status == 3" class="Fgray-6">未中奖</span>
                      <span v-if="item.status == 4" class="Fgreen">退款</span>
                    </p>
                  </template>

                </div>
              </div>

              <div class="clear h5px"></div>

              <img src="~@/assets/images/arrow-right.png" class=" h16px absolute" style="bottom:33px; right:15px;">

            </div>
          </router-link>

          <div class="clear"></div>
        </template>
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
          <div class="clear h75px"></div>
          <!--<img src="~@/assets/images/kb_gc.png"  class="wb25 center mat50">-->
          <p class="Fgray-6 F16 lh25px h25px">还没有竞猜记录</p>
          <p class="Fgray-6 F14 lh25px h25px">快去参加竞猜赢金币吧~</p>
          <div class="clear1"></div>

          <recommend></recommend>
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
              noRecommend: false,
              showTitle: true,
              user: {},
              recommend: {
                homeTeam: '',
                visitingTeam:''
              },
              current: 0,
              page: 0,
              pageSize: 20,
              navList: ['全部', '已中奖', '待开奖'],
              recordList: [],
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

            Interface.matchOrderList(_this.page, _this.pageSize, _this.current, function (data) {

                if (data) {
                  var _tmp = data.returnJSON.indexData;

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

                  _this.recordList = _this.recordList.concat(_tmp);

                  _this.loading = false;

                } else {
                  _this.empty = true;
                }

              if(_this.page == 1){
                setTimeout( ()=> {
                  _this.fullscreenLoading = false;
                  window.scrollTo(0,1);
                },100);
              }

            });
          },

          dateFormat(date, index) {
            if(Base.isNull(date))
              return '';
            return date.substring(5, index);
          },

          cutStrForNum(str, num) {
            if(str.length <= num){
              return str;
            }else{
              return str.substring(0, num-1) + '...';
            }
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

          //获取推荐赛事
          Interface.recommendMatchInfo(function (data) {
            console.log(data);
            if(data){
              if(!Base.isNull(data.returnJSON)){
                _this.recommend = data.returnJSON;
              }else{
                _this.noRecommend = true;
              }
            }else{
              _this.noRecommend = true;
            }
          })

          _this.getData();


        }

    }

</script>
