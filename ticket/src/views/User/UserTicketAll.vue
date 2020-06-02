<template>
  <div id="user_ticket_all_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'竞猜记录'" :back="true" :fixed="true"></navTitle>

    <template v-if="showTitle">
      <div class="clear h50px"></div>
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top: 50px; left: 0;  z-index: 99;">
        <div class="wb33333 fl" @click="navChange(-1)">
          <span class="nav pal10 par10" :class="current == -1 ? 'nav-active' : ''">全部</span>
        </div>
        <div class="wb33333 fl" @click="navChange(4)">
          <span class="nav pal10 par10" :class="current == 4 ? 'nav-active' : ''">待开奖</span>
        </div>
        <div class="wb33333 fl" @click="navChange(1)">
          <span class="nav pal10 par10" :class="current == 1 ? 'nav-active' : ''">已中奖</span>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="wb100 lh45px text-center fixed bor-black2 bor-solid-1b warpper-black-3" style="top: 0px; left: 0; z-index: 99;">
        <div class="wb33333 fl" @click="navChange(-1)">
          <span class="nav pal10 par10" :class="current == -1 ? 'nav-active' : ''">全部</span>
        </div>
        <div class="wb33333 fl" @click="navChange(4)">
          <span class="nav pal10 par10" :class="current == 4 ? 'nav-active' : ''">待开奖</span>
        </div>
        <div class="wb33333 fl" @click="navChange(1)">
          <span class="nav pal10 par10" :class="current == 1 ? 'nav-active' : ''">已中奖</span>
        </div>
      </div>
    </template>

    <div class="clear h45px"></div>

    <div class="wb100">
      <div class="pal15 warpper-black-3">
        <div class="wb100" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
          <div v-for="item in recordList" v-if="empty==false && item.status != 5">
            <div class="clear1"></div>

            <router-link :to="{ name: 'SoccerDetail', params:{ ticketID: item.orderNo, call: 'UserTicketAll' } }">
              <div class="wb100 bor-black2 bor-solid-1b">
                <div class="par40 relative">
                  <p class="lh25px F16">
                    <span class="Fwhite-1 fl">{{item.lotteryTypeDesc}}</span>
                    <span class="Fblue fr" v-if="item.status == 0">等待出票</span>
                    <span class="Fwhite fr warpper-red pal10 par10 Fnum" v-if="item.status == 1">中奖{{twoDecimal(item.bonusMoney)}}元</span>
                    <span class="Fwhite-1 fr" v-if="item.status == 2">未中奖</span>
                    <span class="Fwhite-1 fr" v-if="item.status == 3">出票失败</span>
                    <span class="Fblue fr" v-if="item.status == 4">等待开奖</span>
                  </p>
                  <div class="clear"></div>
                  <p class="lh20px F12 mat5">
                    <span class="Fblack-2 fl Fnum">{{item.createOn}}</span>
                    <span class="Fblack-2 fr Fnum">投注{{twoDecimal(item.lotMoney)}}元</span>
                  </p>
                  <img src="~@/assets/images/arrow-right.png" class="absolute h16px" style="right: 15px; top: 17px;">
                </div>
                <div class="clear1"></div>
              </div>
            </router-link>
          </div>

        </div>
      </div>

      <div class="clear1"></div>

      <!--<div class="">-->

        <!--<template v-for="item in orderList">-->
          <!--<router-link :to="{ name: 'SoccerDetail', params:{ ticketID: item.orderNo, call: 'UserTicketAll' } }">-->
            <!--<p>{{item.orderNo}}</p>-->
          <!--</router-link>-->
        <!--</template>-->

      <!--</div>-->

      <template v-if="last == true">
        <div class="wb100 Fblack-2">
          <div class="text-center h40px lh40px center w120px F14" >
            <span class="fl mal10">暂无更多数据</span>
          </div>
        </div>
      </template>
      <template v-else-if="empty == true">
        <div class="wb100 text-center">
          <img src="~@/assets/images/kb_gc.png"  class="wb35 center mat50">
          <p class="Fblack-2 F16 lh25px h25px">还没有购彩记录哦~</p>
          <p class="Fblack-2 F14 lh25px h25px">不要让大奖溜走，快去购彩吧！</p>
          <div class="clear1"></div>
          <router-link :to="{ name: 'Index' }">
            <div class="radius5 bor-red bor-solid-1a wb40 center h40px lh40px"><p class="Fred">立即去购彩</p></div>
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
        fullscreenLoading: false,
        showTitle: true,
        myHeight: 0,
        user: {},
        current: -1,
        page: 0,
        pageSize: 20,
        navList: ['全部', '待开奖', '已中奖'],
        recordList: [],
        orderList: [],
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

        Interface.orderList(this.current, this.page, this.pageSize, (data) => {

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

              for (var i = 0; i < _tmp.length; i++) {
                  let ___tmp = Base.getLotteryType(_tmp[i].lotteryType);

                  if(___tmp.type == 5){
                      //竞彩足球
                    _tmp[i].router = 'SoccerDetail';
                  }else{
                    _tmp[i].router = 'TicketDetail';
                  }

                  _tmp[i].type = ___tmp.type;
                  _tmp[i].title = ___tmp.name;
              }

              this.recordList = this.recordList.concat(_tmp);

              this.loading = false;

              if(_this.page == 1){
                setTimeout( ()=> {
                  _this.fullscreenLoading = false;
                  window.scrollTo(0,0);
                },100);
              }

            } else {
              this.loading = false;
              this.empty = true;
            }
          }
          //

        );
      },
      navChange(key) {
        this.current = key;
        this.recordList = [];
        this.page = 0;
        this.loading = true;
        this.last = false;
        this.empty = false;
        this.getData();
      },
      twoDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x*100)/100;
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

//        Interface.orderList( -1, 1, 20, (data) => {
//            this.orderList = data.returnJSON.indexData;
//        })

      this.myHeight = $(window).height();

      let _current = this.$route.query.nav;

      if (Base.isNull(_current)) {
        _current = -1;
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

