<template>

  <div id="pay_fail_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'支付失败'" :back="login"></navTitle>

    <div class="clear h30px"></div>

    <div class="wb100 text-center">
      <img src="~@/assets/images/false.png" class="w80px">
      <p class="F18 Fgray-5 lh40px">支付失败</p>
    </div>

    <div class="clear h30px"></div>

    <div class="text-center Fgray-6 lh30px">
      <p>充值成功请在个人中心查看账户余额</p>
      <p>支付有一定的延时，若失败请前往我的竞猜查看</p>
      <p>充值有一定的延时，若失败请前往账户明细查看</p>
      <p>若充值成功未能及时到账请联系客服</p>
      <div class="clear1"></div>
      <p>电话/微信：<a href="tel:13272721166"> <span class="Forange-2 Fnum">13272721166</span> </a></p>
    </div>

    <div class="clear1"></div>

    <template v-if="isWebApp == false">

      <template v-if="login == true">
        <router-link :to="{ name:'Index' }" replace>
          <div class="pa15 ">
            <div class="wb100 bor-orange4 bor-solid-1a Forange-2 h45px lh45px text-center radius5 F16 center" style="width: 200px">
              返回首页
            </div>
          </div>
        </router-link>
      </template>

      <template v-else>
        <div class="pa15 text-left lh25px Fgray-5">
          <p> 1.支付遇到问题，请返回<span class="Forange-2">{{sourceName}}</span>重新支付；</p>
          <p> 2.如果您已付款，请稍后返回<span class="Forange-2">{{sourceName}}</span>查看支付详情</p>
        </div>
      </template>

    </template>

    <template v-else>
      <div class="pa15 " @click="goHome()">
        <div class="wb100 bor-orange4 bor-solid-1a Forange-2 h45px lh45px text-center radius5 F16 center" style="width: 200px">
          返回首页
        </div>
      </div>
    </template>

  </div>

</template>

<style>

</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'
    import HostSdk from '../../assets/js/hostSdk.js'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              isWebApp: false,
              login: false,
              source: 'wap',
              sourceName: 'wap',
            }
        },

        methods: {
          //回APP首页
          goHome:function () {
            hostsdk.openUrl({
              type:"push",
              url:"PushHostGuess",
              errorCallback : function(res){}
            });
          },
        },

        mounted(){

            let _this = this;

          Base.setCookie('paymentNo', null);
          Base.setCookie('payIng', null);
          Base.setCookie('payType', null);
          Base.setCookie('payMoney', null);
          Base.setCookie('calOrder',null);

          let userID = Interface.getUserId();

          if(userID == 0){
            this.login = false;
          }else{
            this.login = true;
          }

          let _source = Interface.getSource();

          if(!Base.isNull(_source)){
            this.source = _source;
            this.sourceName = Interface.getSourceName(_source);
          }

          if(this.source == 'wap'){
            this.login = true;
          }

          if(Base.versions.isAndroidApp || Base.versions.isIosApp){
            this.isWebApp = true;
            HostSdk.inited(function (res, errorMsg) {

              //刷新余额
              hostsdk.UpdateUserInfo({
                successCallback:function () {},
                errorCallback:function () {}
              });

            });
          }

          this.fullscreenLoading = false;

        }

    }

</script>
