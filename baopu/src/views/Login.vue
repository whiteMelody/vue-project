<template>

  <div class="wb100">

    <div class="wb100" v-if="isWeiXin == false">

      <navTitle :title="'登录'" :back="true"></navTitle>

      <div class="clear h30px"></div>

      <div class="Fgray-3 wb100">

        <div class="pal15 par15 pat5 pab5 relative F14 warpper-black-3">
          <div style="padding-left: 60px; padding-right: 80px;">
            <div class="w50px absolute F16 pa1 Fgray-6" style="top: 5px; left:15px; height: 45px; line-height: 45px;">
              手机号
            </div>
            <input type="tel" class="bor-none wb100 h45px lh45px F16 warpper-none Fgray-5" v-model="mobile" placeholder="请输入手机号">
            <input type="button" data-role="none" class="bor-none h35px lh35px w80px radius5" style="position: absolute; top: 11px; right: 10px;" :class="mobile.length!=11 || lock ? 'bor-gray6 bor-solid-1a Fgray-6 warpper-none' : 'warpper-orange-7 Fwhite pa1'" :disabled="mobile.length!=11 || lock" @click="sendCode" :value="codeText">
          </div>
          <div class="clear"></div>
        </div>

        <div class="pal15 ">
          <div class="clear bor-black3 bor-solid-1b"></div>
        </div>

        <div class="pal15 par15 pat5 pab5 relative F14 warpper-black-3">
          <div style="padding-left: 60px;">
            <div class="w50px absolute F16 pa1 Fgray-6" style="top: 5px; left:15px ; height: 45px; line-height: 45px;">
              验证码
            </div>
            <input type="tel" class="bor-none wb100 h45px lh45px fl F16 warpper-none Fgray-5" v-model="code" placeholder="请输入验证码">
          </div>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
        <div class="clear1"></div>
        <div class="clear1"></div>
        <div class="pa15">
          <div class="wb100 h45px lh45px Fwhite F16 text-center radius5" :class="mobile.length>0 && code.length>0 ? 'warpper-orange-7 Fwhite pa1' : 'bor-gray6 bor-solid-1a Fgray-6'" @click="login">确定</div>
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

    <div class="wb100" v-else>
      <!--<navTitle :title="'登录跳转中'" :back="true"></navTitle>-->
      <p class="code"></p>
    </div>

  </div>

</template>

<style>

</style>

<!--<script src="../assets/js/hostSdk.js"></script>-->

<script>

    import Base from '../assets/js/base.js'
    import Interface from '../assets/js/interface.js'
    import HostSdk from '../assets/js/hostSdk.js'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              isLock: false,
              mobile: "",
              code: "",
              call: "",
              codeText: "获取验证码",
              isWeiXin: true,
              timeID: 0,
              timer: 60,
              lock: false,
              favDisabled: false,
            }
        },

        methods: {
          sendCode() {

            var _this = this;

            if (this.lock) {
              return false;
            } else {
              this.lock = true;
              Interface.loginCode(_this.mobile, function (data) {
                if (data) {
                  //                            _this.resultCode = data.returnJSON;
                  //                            _this.code = data.returnJSON;
                  _this.timeID = setInterval(_this.clock, 1000);
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

            var _this = this;

            if(_this.isLock == true)
              return false;

            _this.isLock = true;

            if(_this.favDisabled)
              return;

            if (Base.isNull(_this.mobile)) {
              _this.$message({
                type: 'error',
                message: '手机号不能为空',
                duration: 1500
              });

              _this.favDisabled = true;
              _this.isLock = true;

              setTimeout(function(){
                _this.favDisabled = false;
                _this.isLock = false;
              },1500);

              return false;
            }
            if (Base.isNull(_this.code)) {
              _this.$message({
                type: 'error',
                message: '验证码不能为空',
                duration: 1500
              });

              _this.favDisabled = true;
              _this.isLock = true;

              setTimeout(function(){
                _this.favDisabled = false;
                _this.isLock = false;
              },1500);

              return false;
            }

            var redBagNo = '20171018001';

            Interface.loginInPhone(_this.mobile, _this.code, redBagNo, function (data, errorMsg) {

              if (data) {
                var _user = data.returnJSON;

                if(Base.isNull(data.extendInfo)){
                  Base.setCookie('newsRedBag', null);
                }else{
                  Base.setCookie('newsRedBag', JSON.stringify(data.extendInfo));
                }

                Base.setCookie('userInfo', JSON.stringify(_user));

                if (Base.isNull(_this.call)) {

                  _this.$router.replace({ name: '/'});
                } else {
                  var _url = _this.$route.params.callUrl;

                  if (Base.isNull(_url)) {
                      window.history.go(-1);
                  } else {

                    var _money = _this.$route.params.money;

                    if(_user.coinsQty > _money){
                      //直接购买

                      console.log('直接购买')

                      _this.$router.replace({ name: '/', params:{ buyTicket: true, money: _money } });
                    }else{

                      _this.$router.replace({ name: _url });

                    }

                  }
                }
              } else {
                _this.$message({
                  type: 'error',
                  message: errorMsg,
                  duration: 1500
                });

                _this.favDisabled = true;
                _this.isLock = true;

                setTimeout(function(){
                  _this.favDisabled = false;
                  _this.isLock = false;
                },1500);

              }
            });
          }
        },

        mounted(){
          var _this = this;

          _this.call = _this.$route.params.call;
          var _url = _this.$route.params.callUrl;

          //在微信内自动调用微信授权登录
          if(Base.versions.isWeiXin){
            _this.isWeiXin = true;

            var code = Base.getParmar('code');

            var _loginUrl = 'https://mp.bombsport.com/beta/wxLogin.html';

            if(!Base.isNull(_url))
              _loginUrl = _loginUrl + '?call=' + _url;

            //判断用户是否登录

            window.location.href = _loginUrl;

//            Interface.userInfo(function (data) {
//              console.log(data);
//              if (data) {
//                if (Base.isNull(data.returnJSON)) {
//                  _this.login = false;
//
//                  window.location.href = _loginUrl;
//
//                } else {
//                  _this.login = true;
//                  _this.user = data.returnJSON;
//                }
//              } else {
//                _this.login = false;
//
//                window.location.href = _loginUrl;
//              }
//            });

          }else{
            _this.isWeiXin = false;
          }
        }

    }

</script>
