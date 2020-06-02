<template>
  <div id="login_page" class="warpper-gray-3 wb95 fixed h240px" style="top: 0; left: 0; right: 0; bottom: 0; margin: auto; z-index: 999999;"  v-show="show">

    <div class="wb100">

      <div class="wb100">
        <div class="wb100 h50px warpper-red">
          <!--<div class="w50px h50px fl" v-if="back" @click="myBack()">-->
            <!--<div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>-->
          <!--</div>-->
          <p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">登录</p>
        </div>
      </div>

      <div class="Fgray-3 wb100">

        <div class="pal15 par15 relative F14 warpper-white">
          <div style="padding-left: 60px;">
            <div class="w50px absolute" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
              手机号
            </div>
            <input type="tel" class="bor-none wb100 h45px lh45px Fnum" v-model="mobile" placeholder="请输入手机号">
          </div>
          <div class="clear"></div>
        </div>

        <div class="pal15">
          <div class="clear bor-gray bor-solid-1b"></div>
        </div>

        <div class="pal15 par15 relative F14 warpper-white">
          <div style="padding-left: 60px;">
            <div class="w50px absolute" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
              验证码
            </div>
            <input type="tel" class="bor-none wb50 h45px lh45px fl Fnum" v-model="code" placeholder="请输入验证码">
            <input type="button" data-role="none" class="warpper-none bor-none h35px lh35px wb45 fr mat5 code-btn bor-solid-1a radius5" :class="mobile.length!=11 || lock ? 'Fgray-2 bor-gray' : 'Fblue bor-blue'" :disabled="mobile.length!=11 || lock" @click="sendCode" :value="codeText">
          </div>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
        <div class="pa15">
          <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="mobile.length>0 && code.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="login">登录</div>
        </div>

        <div class="clear1"></div>

      </div>
      <div class="pa15 Fgray-3">

        <!--<div class="wb100 h10px bor-gray bor-solid-1b">-->
        <!--<div class="w150px warpper-white center lh20px text-center Fgray-3 F14">-->
        <!--使用第三方登录-->
        <!--</div>-->
        <!--</div>-->

        <!--<div class="clear h50px"></div>-->

        <!--<a :href="'wx_login.html?call='+call">-->
        <!--<div class="wb100 h45px lh45px warpper-green Fwhite F16 text-center radius20">微信登录</div>-->
        <!--</a>-->

      </div>
    </div>

  </div>
</template>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  export default{

    props: ['show'],

    data (){
      return {
        mobile: "",
        code: "",
        call: "",
        codeText: "获取验证码",
        timeID: 0,
        timer: 60,
        lock: false
      }
    },

    methods: {
      sendCode() {

        if (this.lock) {
          return false;
        } else {
          this.lock = true;
          Interface.sendLoginInCode(this.mobile, (data) => {
            if (data) {
//              this.resultCode = data.returnJSON;
//              this.code = data.returnJSON;
              this.timeID = setInterval(this.clock, 1000);
            }
          });
        }
      },
      clock() {
        this.timer--;
        this.codeText = this.timer + "秒后重发";

        if (this.timer <= 0) {
          clearInterval(this.timeID);
          this.lock = false;
          this.timer = 60;
          this.codeText = "重发验证码";
        }
      },
      login() {

        if (Base.isNull(this.mobile)) {
          this.$message({
            type: 'error',
            message: '手机号不能为空'
          });
          return false;
        }
        if (Base.isNull(this.code)) {
          this.$message({
            type: 'error',
            message: '验证码不能为空'
          });
          return false;
        }

        Interface.phoneLoginIn(this.mobile, this.code, (data, errorMsg) => {

//            alert(JSON.stringify(data));
//
//            return;

          if (data) {
            var _user = data.returnJSON;

            Base.setCookie('userInfo', JSON.stringify(_user));

            this.$emit('callback', _user);

          }else{
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
        });
      }
    },

    mounted(){

    }

  }


</script>

