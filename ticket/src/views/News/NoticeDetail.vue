<template>

  <div id="news_detail_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'赛事公告'" :back="true"></navTitle>

    <div class="pa15">
      <template v-if="noticeType == 1">
        <!--公告-->
        <p class="Forange-2 F18 lh20px" v-html="notice.title"></p>
        <div class="clear1"></div>
        <div class="clear1"></div>
        <p class="Fwhite-1 lh20px F14">{{notice.content}}</p>
        <div class="clear1"></div>
        <p class="Fblack-2 F14 lh20px text-right">来源：中国竞彩网</p>
        <div class="clear1"></div>
      </template>

      <template v-else>
        <!--资讯-->
          <p class="lh30px F20 Fwhite-1 Fb">{{notice.title}}</p>
          <div class="clear h10px"></div>
          <p class="F14 Fblack-1 lh20px">
            <span class="fl mal30">来源：中国竞彩网</span>
          </p>

          <div class="clear1"></div>

          <div class="pa15 Fwhite-1">

            <div class="img-Warea" v-html="notice.content"></div>

            <div class="clear1"></div>

        </div>
      </template>
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
        myHeight: 0,
        noticeType: 0,
        notice: {},
      }
    },

    methods: {
    },

    mounted(){

      this.myHeight = $(window).height();

      let noticeID = this.$route.params.noticeID;
      this.noticeType = this.$route.params.noticeType;

      Interface.matchNoticeInfo(noticeID, (data)=> {
        if(data){
            this.notice = data.returnJSON;
            //- cnzz自定义统计
            // 测试完后请删除这条注数

            _czc.push(["_setAccount", "1271278320"]);
            _czc.push(['_trackEvent', 'NoticeDetail_page', 'onInit', '赛事公告页','inited','NoticeDetail_init']);
        }
        this.fullscreenLoading = false;
      })

    }

  }


</script>

