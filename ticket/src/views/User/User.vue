<template>
  <div id="user_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <!--福利中心-->
    <router-link :to="{ name: 'UserWelfare' }">
      <div class="fixed w60px h50px" style="bottom: 75px; right: 15px; z-index: 99;">
        <img src="~@/assets/images/flzx.png" class="w60px fl">
      </div>
    </router-link>

    <div class="wb100 warpper-black-4" :style="'background: url('+ userBg +'); background-size:100% 100%;'">
      <div class="h50px lh50px relative wb100" style="z-index: 99">
        <p class="text-center Fwhite" v-if="login">{{user.nickName}}</p>
        <p class="text-center Fwhite" v-else>未登录</p>
      </div>
      <div class="pa15 relative">

        <div style="padding-left: 74px; ">
          <template v-if="login">
            <img :src="user.photoUrl ? user.photoUrl : headDefault" class="fl h70px w70px radius50per bor-white bor-solid-2a absolute" style="left: 15px; top:0;">
            <div class="wb100">
              <p class="text-over-hidden1 Fwhite-1 text-left F16 Fb Fnum pal15 h50px lh50px"> <span class="F14 Fblack-2">余额</span> {{twoDecimal(user.accountBalance)}}元</p>
              <router-link :to="{ name: 'UserRedBag' }">
                <div class="w80px h30px lh30px radius15 absolute text-right Fwhite-1 par20 F14" style="background: #33343F; right: -15px; top: 25px;">
                  <img src="~@/assets/images/icon-hb.png" class="h30px fl mal15" style="margin-top: -10px;">
                  {{redBags}}个
                </div>
              </router-link>
            </div>
          </template>

          <template v-else>
            <img :src="headDefault" class="fl h70px w70px radius50per bor-white bor-solid-2a absolute" style="left: 15px; top:0;">
            <router-link :to="{ name: 'Login' }">
              <div class="fl mal15 h40px lh40px mat5 text-center w80px warpper-black-3 radius5 Fwhite-1">
                请登录
              </div>
            </router-link>
          </template>

        </div>

        <div class="clear"></div>
      </div>
      <div class="clear1"></div>
    </div>

    <div class="clear"></div>

    <div class="wb100 warpper-black-3 Fwhite-1">
      <div class="h30px lh30px pat10 pab10">
        <router-link :to="{ name: 'Recharge', params: { call: true } }">
          <div class="wb495 fl text-center Fwhite-1">
            充值
          </div>
        </router-link>
        <div class="wb495 fr text-center bor-black3 bor-solid-1l Fwhite-1" @click="toCash">
          提现
        </div>
      </div>
    </div>

    <router-link :to="{ name: 'UserWelfare' }">
      <div class="wb100 lh40px h40px text-center" style="background: #FFDAA3; color: #E84131;">
        新人福利，领298元红包，立即领取
      </div>
    </router-link>

    <div class="clear"></div>

    <div class="wb100 warpper-black-3 Fblack-2">
      <div class="clear"></div>
      <div class="h50px lh50px pal15">
        <router-link :to="{ name: 'UserTicketAll' }">
          <div class="wb100 bor-black2 bor-solid-1b">
            <div class="w30px fl">
              <img src="~@/assets/images/icon-u1.png" class="fl h20px mat15">
            </div>
            <span class="fl Fwhite-1">竞猜记录</span>
            <img src="~@/assets/images/arrow-right.png" class="fr h16px mal15 mar15" style="margin-top: 17px;">
            <div class="clear"></div>
          </div>
        </router-link>
      </div>
      <div class="clear"></div>
      <div class="h50px lh50px pal15">
        <router-link :to="{ name: 'DealAll' }">
          <div class="wb100 bor-black2 bor-solid-1b">
            <div class="w30px fl">
              <img src="~@/assets/images/icon-u2.png" class="fl h20px mat15">
            </div>
            <span class="fl Fwhite-1">账户明细</span>
            <img src="~@/assets/images/arrow-right.png" class="fr h16px mal15 mar15" style="margin-top: 17px;">
            <div class="clear"></div>
          </div>
        </router-link>
      </div>
      <div class="clear"></div>
      <div class="h50px lh50px pal15">
        <router-link :to="{ name: 'SafeCenter' }">
          <div class="wb100 bor-black2 bor-solid-1b">
            <div class="w30px fl">
              <img src="~@/assets/images/icon-u3.png" class="fl h20px mat15">
            </div>
            <span class="fl Fwhite-1">安全中心</span>
            <img src="~@/assets/images/arrow-right.png" class="fr h16px mal15 mar15" style="margin-top: 17px;">
            <div class="clear"></div>
          </div>
        </router-link>
      </div>
      <div class="clear"></div>
      <div class="clear1 warpper-black-4"></div>

      <div class="h50px lh50px pal15" v-if="login">
        <router-link :to="{ name: 'Login', query:{ call: 'User' } }">
          <div class="wb100">
            <div class="w30px fl">
              <img src="~@/assets/images/icon-u4.png" class="fl h20px mat15">
            </div>
            <span class="fl Fwhite-1">切换账号</span>
            <img src="~@/assets/images/arrow-right.png" class="fr h16px mal15 mar15" style="margin-top: 17px;">
            <div class="clear"></div>
          </div>
        </router-link>
      </div>

    </div>

    <div class="clear1"></div>

    <nav-footer :active="3"></nav-footer>

  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'
  import headIcon from '../../assets/images/head-img1.png'
  import bg from '../../assets/images/user-bg.png'

  export default{

    data (){
      return {
        login: false,
        active: 3,
        myHeight: 0,
        headDefault: headIcon,
        userBg: bg,
        fullscreenLoading: true,
        idCardBind: false,
        mobileBind: false,
        bankCardBind: false,
        pwdBind: false,
        redBags: 0,
        user: {}
      }
    },

    methods: {
      toCash() {
//        if (!this.idCardBind) {
//            this.$router.push({ name: 'BindIDCard', params: { call: true } });
//          return false;
//        }
//        if (!this.pwdBind) {
//          this.$router.push({ name: 'SetPayPwd', params: { call: true } });
//          return false;
//        }
        this.$router.push({ name: 'CashAliPay', params: { call: true } });
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

      this.myHeight = $(window).height();

      Interface.userBaseInfo( (data) => {

        if (data) {
          if (Base.isNull(data.returnJSON)) {
            this.login = false;
          } else {
            this.login = true;
            this.user = data.returnJSON;
            var _tmp = data.returnJSON;
            if (Base.isNull(_tmp.bankCard)) this.bankCardBind = false;else this.bankCardBind = true;
            if (Base.isNull(_tmp.mobilePhone)) this.mobileBind = false;else this.mobileBind = true;
            if (Base.isNull(_tmp.identityCard)) this.idCardBind = false;else this.idCardBind = true;
            if (Base.isNull(_tmp.outputPassword)) this.pwdBind = false;else this.pwdBind = true;

            //查询可用的红包
            Interface.userCouponList( (data) => {
              if(data){
                if(data.returnJSON.length > 0 ){
                  let _tmp = data.returnJSON;

                  let _tmp2 = _tmp.filter((item) =>{
                    return item.status == 0;
                  })

                  this.redBags = _tmp2.length;

                }
              }
            })


          }
        } else {
          this.login = false;
        }

        this.fullscreenLoading = false;

      });

      //- 测试领取红包
//      Interface.registerCoupon( 'mz1001', (data) => {
//        console.log(data)
//      })

    }

  }


</script>

