<template>

  <div id="pay_result_page" class="lh25px warpper-black-4">

    <!--<navTitle :title="'支付跳转中'" :back="true"></navTitle>-->

    <div class="pa15 hidden aaa" style="display: none">
      <!--<p><a target="_blank" href="youloft.419805549://ylweb?url=http://h5.pwabc.cn/wnl/pay_result.html?isBack=true">支付完成，回到万年历</a></p>-->
    </div>

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
              fullscreenLoading: true
            }
        },

        methods: {

        },

        mounted(){

          let _this = this;

          var paymentNo = Base.getCookie('paymentNo');

          var payType = Base.getCookie('payType');

//          var isBack = this.$route.params.isBack;
//
//          if(!Base.isNull(isBack)){
//            window.location.href = 'protocol://exit';
//          }
//
//          if(Base.isNull(paymentNo)){
//            paymentNo = this.$route.params.trade_no;
//            setTimeout(function(){
//              $(".aaa").show();
//            },500);
//
//            _this.fullscreenLoading = false;
//            return false;
//          }

          //检测是否为app跳转支付
          let appPay = Base.getCookie('appPay');

          Interface.payResultQuery(paymentNo, payType, function (data,errorMsg) {
            if (data) {

              if(Base.versions.isAndroidApp || Base.versions.isIosApp){
                this.isWebApp = true;
                HostSdk.inited(function (res, errorMsg) {
                  //刷新余额
                  hostsdk.UpdateUserInfo({
                    successCallback: function () {
                      _this.$router.replace({ name: 'PaySuccess' });
                    },
                    errorCallback: function () {
                    }
                  });
                })
              }else{
                if(!Base.isNull(appPay)){
                  window.location.href = 'https://mp.bombsport.com/beta/moblinkweixin.html?orderNo='+paymentNo+ '&payType='+payType;
                }else{
                  _this.$router.replace({ name: 'PaySuccess' });
                }
              }
            }else{
              if(!Base.isNull(appPay)){
                window.location.href = 'https://mp.bombsport.com/beta/moblinkweixin.html?orderNo='+paymentNo+ '&payType='+payType;
              }else{
                if(payType == '0' || payType == 0){
                  _this.$router.replace({ name: 'PayFail', params:{ msg: errorMsg } });
                }
                if(payType == '1' || payType == 1){
                  _this.$router.replace({ name: 'PayFail', params:{ msg: errorMsg } });
//                window.history.go(-1);
                }
              }

            }
            //更新用户余额
            Interface.userInfo(function () {});
            _this.fullscreenLoading = false;
          });

        }

    }

</script>
