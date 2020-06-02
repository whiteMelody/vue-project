<template>
  <div id="bind_mobile_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'绑定手机号 第二步'" :back="true"></navTitle>

    <div class="wb100">

      <div class="clear1"></div>

      <p class="pa15 F14 Fblack-2">请确认当前的手机号码<span class="Fnum">{{mobilePhone}}</span>能否接受短信。选择相应的方式修改</p>

      <div class="h50px lh25px pat10 pab10 pal15 warpper-black-3 F16 Fgray-3 relative">
        <router-link :to="{ name: 'BindMobileStep3' }">
          <div class="wb100 Fwhite-1">
            <p>能接收短信</p>
            <p class="F12 Fblack-2">通过原手机号码接收验证码更改</p>
            <img src="~@/assets/images/arrow-right.png" class="h16px absolute" style="top: 27px; right: 15px;">
            <div class="clear"></div>
          </div>
        </router-link>
      </div>

      <div class="clear bor-black2 bor-solid-1b"></div>

      <div class="h50px lh25px pat10 pab10 pal15 warpper-black-3 F16 Fgray-3 relative">
        <router-link :to="{ name: 'BindMobileStep4' }">
          <div class="wb100 Fwhite-1">
            <p>无法接收短信</p>
            <p class="F12 Fblack-2">原手机号码丢失或停用，通过身份证修改</p>
            <img src="~@/assets/images/arrow-right.png" class="h16px absolute" style="top: 27px; right: 15px;">
            <div class="clear"></div>
          </div>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        mobilePhone: '',
        myHeight: 0,
      }
    },

    methods: {

    },

    mounted(){

      this.myHeight = $(window).height();

      Interface.securityInfo((data) => {
        if (data) {
          var _tmp = data.returnJSON;
          if (Base.isNull(_tmp.mobilePhone))
              this.mobilePhone = '';
          else
              this.mobilePhone = _tmp.mobilePhone;
        }
        this.fullscreenLoading = false;
      });


    }

  }


</script>

