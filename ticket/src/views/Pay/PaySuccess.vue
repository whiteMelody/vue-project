<template>

  <div id="pay_success_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'支付成功'" :back="login"></navTitle>

    <div class="wb100 text-center lh25px Fblack-2">
      <img src="~@/assets/images/true.png" class="w80px" style="margin-top: 80px">
      <p class="F18 mat20">支付成功</p>
      <p class="F14">快去竞猜赢取吧</p>

      <div class="clear h10px"></div>

      <router-link :to="{ name:'Index' }" replace>
        <div class="pa15 ">
          <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16 center" style="width: 200px">
            返回首页
          </div>
        </div>
      </router-link>

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
              fullscreenLoading: true,
              isWebApp: false,
              login: false,
              myHeight: 0,
              noRecommend: false,
              source: 'wap',
              sourceName: 'wap',
              recommend: {
                homeTeam: '',
                visitingTeam:''
              },
            }
        },

        methods: {
          cutStrForNum(str, num) {
            if(str.length <= num){
              return str;
            }else{
              return str.substring(0, num-1) + '...';
            }
          },
        },

        mounted(){

          //- cnzz自定义统计
          // 测试完后请删除这条注数

          _czc.push(["_setAccount", "1271278320"]);
          _czc.push(['_trackEvent', 'PaySuccess_page', 'onInit', '支付成功页','inited','PaySuccess_page']);

          this.myHeight = $(window).height();

          //清空临时订单
          window.sessionStorage.setItem("tmpOrder", JSON.stringify({}));

          window.sessionStorage.setItem("soccer_ticket", null);

          Base.setCookie('paymentNo', null);
          Base.setCookie('payIng', null);
          Base.setCookie('payType', null);
          Base.setCookie('payMoney', null);
          Base.setCookie('calOrder',null);

          let _source = Interface.getSource();

          let userID = Interface.getUserId();

          if(userID == 0){
              this.login = false;
          }else{
            this.login = true;
          }

          if(!Base.isNull(_source)){
              this.source = _source;
              this.sourceName = Interface.getSourceName(_source);
          }

          this.fullscreenLoading = false;

        }

    }

</script>
