<template>
  <div id="bind_mobile_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'绑定手机号'" :back="true"></navTitle>

    <div class="wb100">

      <div class="clear h30px"></div>

      <div class="Fgray-3 wb100" v-if="mobilePhone == ''">

        <div class="pal15 par15 relative F14 warpper-black-3">
          <div style="padding-left: 60px;">
            <div class="w50px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
              手机号
            </div>
            <input type="tel" class="bor-none wb100 h45px lh45px Fnum warpper-none Fwhite-1" v-model="bindMobile.mobile" placeholder="请输入手机号">
          </div>
          <div class="clear"></div>
        </div>

        <div class="pal15">
          <div class="clear bor-black2 bor-solid-1b"></div>
        </div>

        <div class="pal15 par15 relative F14 warpper-black-3">
          <div style="padding-left: 60px;">
            <div class="w50px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
              验证码
            </div>
            <input type="tel" class="bor-none wb50 h45px lh45px fl Fnum warpper-none Fwhite-1" v-model="bindMobile.code" placeholder="请输入验证码">
            <input type="button" data-role="none" class="warpper-gray bor-none h45px lh45px wb45 fr code-btn" :class="bindMobile.mobile.length!=11 || bindMobile.lock ? 'Fgray-2' : 'Fblue'" :disabled="bindMobile.mobile.length!=11 || bindMobile.lock" @click="sendCode" :value="bindMobile.codeText">
          </div>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
        <div class="clear1"></div>
        <div class="clear1"></div>
        <div class="pa15">
          <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5" :class="bindMobile.mobile.length>0 && bindMobile.code.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="submit">确定</div>
        </div>

        <div class="clear1"></div>

      </div>

      <template v-if="mobilePhone != ''">
        <div class="pal15 par15 warpper-black-3 lh50px F14 Fwhite-1">
          <p>
            <span class="w70px fl">手机号</span>
            <span class="fl Fnum">{{mobilePhone}}</span>
            <span class="fr Fred">已绑定</span>
          </p>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
        <div class="clear1"></div>
        <div class="clear1"></div>

        <div class="pa15">
          <router-link :to="{ name: 'BindMobileStep2' }">
            <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5">更换手机号码</div>
          </router-link>
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
        fullscreenLoading: true,
        myHeight: 0,
        bindMobile: {
          mobile: '',
          code: '',
          timeID: 0,
          timer: 60,
          codeText: "获取验证码",
          lock: false
        },
        cardNum: '',
        mobilePhone: '',
        call: ""
      }
    },

    methods: {
      sendCode() {

        //判断state
        if (this.bindMobile.lock) {
          return false;
        } else {
          this.bindMobile.lock = true;
          Interface.sendBindPhoneCode(this.bindMobile.mobile, (data) => {
            if (data) {
              this.bindMobile.code = data.returnJSON;
              this.bindMobile.timeID = setInterval(this.clock, 1000);
            }
          });
        }

      },
      clock() {

        this.bindMobile.timer--;
        this.bindMobile.codeText = this.bindMobile.timer + "秒后重发";
        if (this.bindMobile.timer <= 0) {
          clearInterval(this.bindMobile.timeID);
          this.bindMobile.lock = false;
          this.bindMobile.timer = 60;
          this.bindMobile.codeText = "重发验证码";
        }
      },
      submit() {

        Interface.bindMobilePhone(this.bindMobile.mobile, this.bindMobile.code, (data, errorMsg) => {
          if (data) {
            this.$message({
              type: 'success',
              message: '绑定成功'
            });
            this.mobilePhone = this.bindMobile.mobile;
          } else {
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
        });

      }
    },

    mounted(){

      this.myHeight = $(window).height();

      Interface.securityInfo((data) =>{
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

