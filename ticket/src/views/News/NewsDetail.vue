<template>

  <div id="news_detail_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'赛事资讯'" :back="true"></navTitle>

    <div class="pa15">
      <p class="lh30px F20 Fwhite-1 Fb">{{newsDetail.title}}</p>
      <div class="clear h10px"></div>
      <p class="F14 Fblack-1 lh20px">
        <span class="fl">{{newsDetail.date}}</span>
        <span class="fl mal30">来源：{{newsDetail.source}}</span>
      </p>
    </div>

    <div class="clear1 bor-black2 bor-solid-1b"></div>

    <div class="pa15 Fwhite-1 lh30px" style="font-weight: normal; text-align: justify;">

      <div class="img-Warea news-content" v-html="newsDetail.body"></div>

      <div class="clear1"></div>

      <template v-if="empty == false">
        <!-- 获取推荐赛事 -->

        <template v-for="item in matchList">
          <router-link :to="{ name: 'SoccerDetailBet', params:{ matchID: item.id } }">
            <div class="pa15">
              <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16">
                {{item.hTeam}} VS {{item.vTeam}}
              </div>
            </div>
          </router-link>
        </template>
      </template>

      <template v-else>
        <!--返回大厅-->

        <router-link :to="{ name: 'Soccer' }">
          <div class="pa15">
            <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16">
              前往赛事大厅
            </div>
          </div>
        </router-link>

      </template>

    </div>

  </div>
</template>

<style>
  .f_center{ text-indent: 0 !important; margin: 10px 0; }
  .news-content p{ text-indent: 32px; }
</style>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        newsDetail: {},
        empty: false,
        myHeight: 0,
        matchList: [],
      }
    },

    methods: {
    },

    mounted(){


      this.myHeight = $(window).height();

      let newsID = this.$route.params.newsID;

      Interface.getNewsDetail(newsID, (data) => {

          if(data){
              this.newsDetail = data.returnJSON.news;

              //- cnzz自定义统计
              // 测试完后请删除这条注数

              _czc.push(["_setAccount", "1271278320"]);
              _czc.push(['_trackEvent', 'NewsDetail_page', 'onInit', '新闻资讯详情页' ,'inited','NewsDetail_init']);

              if(Base.isNull(data.returnJSON.matchList)){
                  this.empty = true;
              }else{
                  if(data.returnJSON.matchList.length == 0){
                    this.empty = true;
                  }else{
                    this.matchList = data.returnJSON.matchList;
                  }
              }

          }
        this.fullscreenLoading = false;

      })

    }

  }


</script>

