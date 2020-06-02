<template>
  <div id="safe_center_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'安全中心'" :back="true"></navTitle>

    <div class="wb100 Fgray-3">

      <p class="F14 Fblack-2 pal15 h50px lh50px">账户保护</p>
      <div class="clear"></div>

      <div class="h50px lh50px pal15 warpper-black-3">
        <router-link :to="{ name: 'BindIDCard' }">
          <div class="wb100 Fwhite-1">
            身份绑定
            <span class="F14 Fblue" v-if="idCardBind == true">-已绑定</span>
            <span class="F14 Fblack-2" v-else>-未绑定</span>
            <img src="~@/assets/images/arrow-right.png" class="fr h16px mar15 mal15" style="margin-top: 17px;">
            <span class="Fblack-2 F14 fr">领奖、提现的重要依据</span>
            <div class="clear"></div>
          </div>
        </router-link>
      </div>
      <div class="clear"></div>
      <div class="h50px lh50px pal15 warpper-black-3">
        <router-link :to="{ name: 'BindMobile' }">
          <div class="wb100 bor-black2 bor-solid-1t Fwhite-1">
            手机绑定
            <span class="F14 Fblue" v-if="mobileBind == true">-已绑定</span>
            <span class="F14 Fblack-2" v-else>-未绑定</span>
            <img src="~@/assets/images/arrow-right.png" class="fr h16px mar15 mal15" style="margin-top: 17px;">
            <span class="Fblack-2 F14 fr">用户信息及中奖提醒</span>
            <div class="clear"></div>
          </div>
        </router-link>
      </div>

      <div class="clear"></div>
      <p class="F14 Fblack-2 pal15 h50px lh50px">资金保护</p>
      <div class="clear"></div>

      <!--<div class="h50px lh50px pal15 warpper-black-3">-->

        <!--<template v-if="idCardBind == true">-->
          <!--<router-link :to="{ name: 'UserBankCard' }">-->
            <!--<div class="wb100 Fwhite-1">-->
              <!--银行卡-->
              <!--<span class="F14 Fblue" v-if="bankCardBind == true">-已绑定</span>-->
              <!--<span class="F14 Fblack-2" v-else>-未绑定</span>-->
              <!--<img src="~@/assets/images/arrow-right.png" class="fr h16px mar15 mal15" style="margin-top: 17px;">-->
              <!--<span class="Fblack-2 F14 fr">绑定银行卡，以便提现</span>-->
              <!--<div class="clear"></div>-->
            <!--</div>-->
          <!--</router-link>-->
        <!--</template>-->

        <!--<template v-else>-->
          <!--<div class="wb100 Fwhite-1" @click="dialogCash = true">-->
            <!--银行卡-->
            <!--<span class="F14 Fblue" v-if="bankCardBind == true">-已绑定</span>-->
            <!--<span class="F14 Fblack-2" v-else>-未绑定</span>-->
            <!--<img src="~@/assets/images/arrow-right.png" class="fr h16px mar15 mal15" style="margin-top: 17px;">-->
            <!--<span class="Fblack-2 F14 fr">绑定银行卡，以便提现</span>-->
            <!--<div class="clear"></div>-->
          <!--</div>-->
        <!--</template>-->

      <!--</div>-->
      <div class="clear"></div>
      <div class="h50px lh50px pal15 warpper-black-3">
        <router-link :to="{ name: 'SetPayPwd' }">
          <div class="wb100 bor-black2 bor-solid-1t Fwhite-1">
            支付密码
            <span class="F14 Fblue" v-if="pwdBind == true">-已绑定</span>
            <span class="F14 Fblack-2" v-else>-未绑定</span>
            <img src="~@/assets/images/arrow-right.png" class="fr h16px mar15 mal15" style="margin-top: 17px;">
            <span class="Fblack-2 F14 fr">提现时验证，资金更安全</span>
            <div class="clear"></div>
          </div>
        </router-link>
      </div>
      <div class="clear1"></div>

    </div>

    <el-dialog
      :visible.sync="dialogCash"
      size="large"
      :show-close="false">

      <p class="Fgray-3 text-center F16">亲，为了您的账户安全，请绑定身份信息</p>

      <div class="clear1"></div>
      <div class="clear1"></div>

      <div class="wb100">
        <div class="wb40 text-center radius5 Fred h38px lh38px bor-red bor-solid-1a F16 fl" @click="dialogCash = false">
          取消
        </div>

        <router-link :to="{ name: 'BindIDCard', params:{ call: true } }">
          <div class="wb40 text-center radius5 h38px lh38px pa1 fr warpper-red Fwhite F16">
            立即绑定
          </div>
        </router-link>
      </div>

      <div class="clear"></div>

    </el-dialog>

    <div class="clear1"></div>
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
        myHeight: 0,
        dialogCash: false,
        idCardBind: false,
        mobileBind: false,
        bankCardBind: false,
        pwdBind: false,
        user: {}
      }
    },

    methods: {
      myBack() {
          this.$router.go(-1);
      }
    },

    mounted(){

      this.myHeight = $(window).height();

      Interface.securityInfo( (data) => {
        if (data) {
          var _tmp = data.returnJSON;

          if(Base.isNull(_tmp)){
              this.$router.replace({ name: 'Login'});
              return false;
          }

          if (Base.isNull(_tmp.bankCard))
              this.bankCardBind = false;
          else
              this.bankCardBind = true;

          if (Base.isNull(_tmp.mobilePhone))
              this.mobileBind = false;
          else
              this.mobileBind = true;

          if (Base.isNull(_tmp.identityCard))
              this.idCardBind = false;
          else
              this.idCardBind = true;

          if (Base.isNull(_tmp.outputPassword))
              this.pwdBind = false;
          else
              this.pwdBind = true;
        }
//        console.log(data);
        this.fullscreenLoading = false;
      });

    }

  }


</script>

