<template>
  <div id="login_page" class="warpper-black-4 wb100 relative" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'登录'" :back="true"></navTitle>

    <div class="clear h30px"></div>

    <div class="wb80 center img-area">
      <img src="~@/assets/images/act-login.png">
    </div>

    <div class="wb100">

      <div class="clear h30px"></div>

      <div class="Fgray-3 wb100">

        <div class="pal15 par15 relative F14 warpper-black-3">
          <div>
            <!--<div class="w50px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">-->
             <!--手机号-->
            <!--</div>-->
            <input type="tel" class="bor-none wb100 h45px lh45px Fnum F16 warpper-none Fwhite-1" v-model="mobile" placeholder="请输入您的手机号码">
          </div>
          <div class="clear"></div>
        </div>

        <div class="pal15">
          <div class="clear bor-black2 bor-solid-1b"></div>
        </div>

        <div class="pal15 par15 relative F14 warpper-black-3">
          <div>
            <!--<div class="w50px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">-->
              <!--验证码-->
            <!--</div>-->
            <input type="tel" class="bor-none wb100 h45px lh45px Fnum F16 warpper-none Fwhite-1" v-model="code" placeholder="请输入收到的验证码">
            <!--<input type="button" data-role="none" class="warpper-gray F16 bor-none h35px lh35px w100px absolute code-btn bor-solid-1a radius5" style="top: 5px; right:15px;" :class="mobile.length!=11 || lock ? 'Fgray-2 bor-gray' : 'Fblue bor-blue'" :disabled="mobile.length!=11 || lock" @click="sendCode" :value="codeText">-->
            <input type="button" data-role="none" class="warpper-none h35px lh35px w100px absolute code-btn radius4" style="top: 5px; right:15px;" :class="mobile.length!=11 || lock ? 'Fblack-2 bor-black4 bor-solid-1a' : 'Forange-2 bor-orange-2 bor-solid-1a'" :disabled="mobile.length!=11 || lock" @click="sendCode" :value="codeText">

          </div>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
        <div class="clear1"></div>
        <div class="pa15">
          <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="mobile.length>0 && code.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="login">登录</div>
        </div>

        <div class="clear1"></div>

      </div>
      <div class="wb100 Fgray-3 absolute" style="bottom: 30px;">

        <!--<div class="wb100 h20px bor-black4 bor-solid-1b">-->
          <!--<div class="w150px warpper-black-3 center lh40px text-center Fwhite-1 F14">-->
          <!--使用第三方登录-->
          <!--</div>-->
        <!--</div>-->

        <div class="wb50 center">
          <div class="wb50 fl">
            <div class="wb100 text-center Fblack-2 F12" @click="qqLogin">
              <img src="~@/assets/images/icon-QQ2.png" class="w50px">
              <p class="lh30px F14">QQ登录</p>
            </div>
          </div>
          <div class="wb50 fr">
            <div class="wb100 text-center Fblack-2 F12" @click="wbLogin">
              <img src="~@/assets/images/icon-sina2.png" class="w50px">
              <p class="lh30px F14">微博登录</p>
            </div>
          </div>
        </div>

        <div class="text-center hidden">
          <span id="qqLoginBtn"></span>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        mobile: "",
        code: "",
        call: "",
        codeText: "获取验证码",
        myHeight: 0,
        timeID: 0,
        timer: 60,
        lock: false,
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

        //- cnzz自定义统计
        // 测试完后请删除这条注数

        _czc.push(["_setAccount", "1271278320"]);
        _czc.push(['_trackEvent', 'Login_of_phone', 'phoneLoginIn', '登录点击手机号注册','clicked','Login_of_phone']);

        Interface.phoneLoginIn(this.mobile, this.code, (data, errorMsg) => {

          if (data) {

              var _user = data.returnJSON;

              Base.setCookie('userInfo', JSON.stringify(_user));

              if (Base.isNull(this.call)) {
                  this.$router.replace({ name: 'Index'});
              } else {
                  this.$router.go(-1);
              }

          }else{
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
        });
      },

      qqLogin(){
        //- cnzz自定义统计
        // 测试完后请删除这条注数

        _czc.push(["_setAccount", "1271278320"]);
        _czc.push(['_trackEvent', 'Login_page', 'Login_of_QQ', '登录页点击QQ登录','clicked','Login_of_QQ']);
        window.location.href = 'https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101461073&display=mobile&redirect_uri=' + encodeURI('http://mp.bombsport.com/ticket/qqCallBack.html')
      },

      wbLogin(){
        //- cnzz自定义统计
        // 测试完后请删除这条注数

        _czc.push(["_setAccount", "1271278320"]);
        _czc.push(['_trackEvent', 'Login_page', 'Login_of_WB', '登录页点击微博登录','clicked','Login_of_WB']);
        window.location.href = 'https://api.weibo.com/oauth2/authorize?client_id=3646948230&response_type=code&redirect_uri=' + encodeURI('https://mp.bombsport.com/ticket/wbCallBack.html')
      },

    },

    mounted(){
      this.myHeight = $(window).height();
      this.call = this.$route.query.call;
      this.fullscreenLoading = false;

      //- cnzz自定义统计
      // 2018年4月2日17:38:49
      // 测试完后请删除这条注数
//
      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'Login_page', 'onInit', '登录','inited','Login_init']);
    }

  }


</script>

