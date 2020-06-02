<template>

  <div id="act_return_page" class="wb100"  :style="'min-height: '+ myHeight +'px; background:#223d82'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'猜不中返双倍'" :back="true"></navTitle>

    <div class="wb100 relative" style="z-index: 1;">
      <div class="wb100 img-area">
        <img src="~@/assets/images/hd_bj.png">
      </div>
    </div>

    <div class="wb100 relative" style="z-index: 2;">
      <div class="pa20">
        <div class="pat50 pab50 F24 Fwhite text-center radius5" style="background: #2475d2; margin-top: -55px;">
          活动暂未开始，敬请期待。
        </div>
      </div>
    </div>

    <div class="clear"></div>

    <div class="pa25">
      <div class="wb100 h15px" style="border-bottom: 1px solid #3a5fbf">
        <div class="w90px h30px Fwhite lh30px radius15 center text-center F14" style="background: #3a5fbf;">
          加奖规则
        </div>
      </div>

      <div class="clear h50px"></div>

      <div class="wb100 lh25px Fblue F15" style="color: #81a0f1;">
        <p>1.本活动每人仅限参与一次，我们会依照手机号码,  设备号等方式进行多重验证 , 以确保活动公平有效进行 , 如有发现任何作弊的行为 , "稳赢竞彩"有权不派发或取消已派发的红包；</p>
        <div class="clear"></div>
        <p>2.奖励：红包派发时间为比赛开奖过后24小时内，竞彩专享。</p>
        <div class="clear"></div>
        <p>3.本活动最终解释权归稳赢竞彩所有。</p>
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
        myHeight: 0,
      }
    },

    methods: {

    },

    mounted(){


      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'ActReturn_page', 'onInit', '不中返双活动页','inited','ActReturn_init']);

      this.myHeight = $(window).height();

      this.fullscreenLoading = false;

    }

  }

</script>
