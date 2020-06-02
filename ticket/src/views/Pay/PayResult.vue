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

    export default{

        data (){
            return {
              fullscreenLoading: true
            }
        },

        methods: {

        },

        mounted(){

          //- cnzz自定义统计
          // 测试完后请删除这条注数

          _czc.push(["_setAccount", "1271278320"]);
          _czc.push(['_trackEvent', 'PayResult_page', 'onInit', '支付中转跳转页','inited','PayResult_page']);

          let _this = this;

          let paymentNo = this.$route.query.paymentNo;
          let payType = this.$route.query.payType;

          if(Base.isNull(paymentNo))
            paymentNo = Base.getCookie('paymentNo');

          if(Base.isNull(paymentNo)){
              //订单不存在
            _this.$router.replace({ name: 'PayFail'});
            return false;
          }

          if(Base.isNull(payType))
            payType = Base.getCookie('payType');

          if(Base.isNull(payType))
            payType = 1;

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

          //检测是否是外部链接支付

          //检测是否为app跳转支付
          let appPay = Base.getCookie('appPay');

//          alert(paymentNo + '   ' + payType)

          Interface.payResultQuery(paymentNo, payType, function (data,errorMsg) {
//            alert(JSON.stringify(data));
              if(data == 'error'){
                _this.$router.replace({ name: 'PayInfo' });
              }else{
                if (data) {
                  //更新用户余额

                  Interface.userInfo(function () {});
                  _this.$router.replace({ name: 'PaySuccess' });
                }else{
                  _this.$router.replace({ name: 'PayFail', params:{ msg: errorMsg } });
                }
              }
            _this.fullscreenLoading = false;

//
//            return false;


          });

        }

    }

</script>
