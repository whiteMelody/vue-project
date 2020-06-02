<template>

  <div id="user_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <div class="wb100 warpper-black">

      <div class="clear1"></div>
      <div class="pa15 relative">

        <div style="padding-left: 74px">

          <template v-if="login">
            <img src="images/head-default.png" class="fl h70px w70px radius50per bor-white bor-solid-2a absolute" style="left: 15px; top:0;">

            <div class="Fwhite fl mal15 lh25px">
              <p class="F18">{{user.nickName}}</p>
              <p class="F14">{{user.customSigna ? user.customSigna : '暂无签名'}}</p>
            </div>

          </template>

          <template v-else>
            <img src="images/head-nologin.png" class="fl h70px w70px radius50per bor-white bor-solid-2a absolute" style="left: 15px; top:0;">

            <a href="login.html" class="fl mal15 h40px lh40px mat5 text-center w80px warpper-white radius5 Forange-2">
              请登录
            </a>

          </template>

        </div>

        <div class="clear1"></div>
      </div>
    </div>

    <div class="wb100 warpper-white Fgray-3">
      <div class="h30px lh30px pat10 pab10">
        <a href="recharge.html">
          <div class="wb495 fl text-center Fgray-3">
            余额： <span class="Forange-2 Fnum">{{user.coinsQty ? user.coinsQty : 0}}</span> 金币
          </div>
        </a>
        <a href="user_red_bag.html">
          <div class="wb495 fr text-center bor-gray bor-solid-1l Fgray-3">
            红包： <span class="Forange-2 Fnum">{{user.couponQty ? user.couponQty : 0}}</span> 个
          </div>
        </a>
      </div>
    </div>

    <div class="clear1"></div>

    <div class="wb100 warpper-white">
      <div class="clear1"></div>
      <div class="wb100 text-center F14 lh20px">
        <a href="recharge.html">
          <div class="wb33333 fl Fgray-3">
            <img src="images/icon-nav-new1.png" class="h35px">
            <p>充值</p>
          </div>
        </a>
        <a href="user_ticket_all.html">
          <div class="wb33333 fl Fgray-3">
            <img src="images/icon-nav-new3.png" class="h35px">
            <p>我的竞猜</p>
          </div>
        </a>
        <a href="store.html">
          <div class="wb33333 fl Fgray-3">
            <img src="images/icon-nav-new4.png" class="h35px">
            <p>金币商城</p>
          </div>
        </a>
      </div>
      <div class="clear1"></div>
    </div>

    <div class="clear1"></div>

    <div class="wb100 warpper-white Fgray-3">
      <div class="clear"></div>
      <div class="h50px lh50px pal15">
        <a href="deal_all.html">
          <div class="wb100 bor-gray bor-solid-1b">
            <span class="fl Fgray-3">账户明细</span>
            <img src="images/arrow-right.png" class="fr h16px mal15 mar15" style="margin-top: 17px;">
            <div class="clear"></div>
          </div>
        </a>
      </div>
      <div class="clear"></div>
      <div class="h50px lh50px pal15">
        <a href="user_fav.html">
          <div class="wb100 bor-gray bor-solid-1b">
            <span class="fl Fgray-3">我的关注</span>
            <img src="images/arrow-right.png" class="fr h16px mal15 mar15" style="margin-top: 17px;">
            <div class="clear"></div>
          </div>
        </a>
      </div>
      <div class="clear1 warpper-gray-3"></div>

      <div class="h50px lh50px pal15" v-if="login">
        <a href="login.html">
          <div class="wb100">
            <span class="fl Fgray-3">切换账号</span>
            <img src="images/arrow-right.png" class="fr h16px mal15 mar15" style="margin-top: 17px;">
            <div class="clear"></div>
          </div>
        </a>
      </div>

    </div>

    <div class="clear1"></div>

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
              fullscreenLoading: true,
              login: false,
              user: {}
            }
        },

        methods: {
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

          //- 判断登录
          Interface.userInfo(function (data) {
            var _user = data.returnJSON;

            if (Base.isNull(_user)) {
              //- 未登录
              _this.login = false;
            } else {
              _this.user = _user;

              _this.login = true;
              console.log(_this.user);
            }
            _this.fullscreenLoading = false;
          });
        }

    }

</script>
