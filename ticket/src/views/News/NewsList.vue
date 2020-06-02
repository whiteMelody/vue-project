<template>

  <div id="news_list_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'更多资讯'" :back="true" :fixed="true"></navTitle>

    <template v-if="showTitle">
      <div class="clear h50px"></div>
    </template>

    <div class="wb100 warpper-black-3">
        <div class="wb100" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
          <div v-for="(item,key) in newsList" v-if="empty==false">

            <template v-if="item.picImgs.length == 0">
              <div class="clear1"></div>
              <!--<router-link :to="{ name: 'NewsDetail', params:{ newsID: item.newsID } }">-->
                <div class="bor-black2 bor-solid-1b relative" @click="toDetail(item.newsID)">

                  <div class="pal15 par15">
                    <p class="text-over-hidden1 h25px lh25px F16 Fwhite-1">{{item.title}}</p>
                    <div class="clear h10px"></div>
                    <p class="text-over-hidden2 h50px lh25px F14 Fblack-1">{{item.mcontent}}</p>
                    <div class="clear h10px"></div>

                    <p class="h20px lh20px Fblack-1 F14">
                      <!--<span class="fl">{{item.leagueName}} </span>-->
                      <span class="fl"> {{ formatDate(item.date)}} </span>
                    </p>
                  </div>

                  <div class="clear1"></div>

                </div>
              <!--</router-link>-->
            </template>

            <template v-if="item.picImgs.length < 3 && item.picImgs.length > 0">
              <div class="clear1"></div>
              <!--<router-link :to="{ name: 'NewsDetail', params:{ newsID: item.newsID } }">-->
                <div class="bor-black2 bor-solid-1b relative" style="padding-right: 150px;" @click="toDetail(item.newsID)">
                  <div class="w120px h180px absolute img-area" style="top: 0; right: 15px;">
                    <img :src="item.picImgs[0] + '?x-oss-process=image/resize,m_fill,h_160,w_240'">
                  </div>

                  <div class="pal15">
                    <p class="text-over-hidden2 h50px lh25px F16 Fwhite-1">{{item.title}}</p>
                    <div class="clear h10px"></div>
                    <p class="h20px lh20px Fblack-1 F14">
                      <!--<span class="fl">{{item.leagueName}} </span>-->
                      <span class="fl"> {{ formatDate(item.date)}} </span>
                    </p>
                  </div>

                  <div class="clear1"></div>

                </div>
              <!--</router-link>-->

            </template>

            <template v-if="item.picImgs.length >= 3">
              <div class="clear1"></div>
              <!--<router-link :to="{ name: 'NewsDetail', params:{ newsID: item.newsID } }">-->
                <div class="bor-black2 bor-solid-1b relative" @click="toDetail(item.newsID)">

                  <div class="pal15 par15">
                    <p class="text-over-hidden1 h30px lh30px F16 Fwhite-1">{{item.title}}</p>

                    <div class="clear h10px"></div>
                    <div class="wb100">
                      <div class="wb33333 fl img-area">
                        <div class="center" :style="'width:'+ newsWidth +'px; height:'+ newsWidth * 0.75 +'px; '">
                          <img :src="item.picImgs[0] + '?x-oss-process=image/resize,m_fill,w_'+ newsWidth * 2 +',h_' + Math.ceil(newsWidth * 1.5)">
                        </div>
                      </div>
                      <div class="wb33333 fl img-area">
                        <div class="center" :style="'width:'+ newsWidth +'px; height:'+ newsWidth * 0.75 +'px; '">
                          <img :src="item.picImgs[1] + '?x-oss-process=image/resize,m_fill,w_'+ newsWidth * 2 +',h_' + Math.ceil(newsWidth * 1.5)">
                        </div>
                      </div> <div class="wb33333 fl img-area">
                      <div class="center" :style="'width:'+ newsWidth +'px; height:'+ newsWidth * 0.75 +'px; '">
                        <img :src="item.picImgs[2] + '?x-oss-process=image/resize,m_fill,w_'+ newsWidth * 2 +',h_' + Math.ceil(newsWidth * 1.5)">
                      </div>
                    </div>

                    </div>
                    <div class="clear h10px"></div>
                    <p class="h20px lh20px Fblack-1 F14">
                      <!--<span class="fl">{{item.leagueName}} </span>-->
                      <span class="fl"> {{ formatDate(item.date)}} </span>
                    </p>
                  </div>

                  <div class="clear1"></div>

                </div>
              <!--</router-link>-->

            </template>

          </div>
      </div>

      <template v-if="last == true">
        <div class="wb100 Fblack-2">
          <div class="text-center h40px lh40px center w120px F14" >
            <span class="fl mal10">暂无更多数据</span>
          </div>
        </div>
      </template>
      <template v-else-if="empty == true">
        <div class="wb100 text-center">
          <img src="~@/assets/images/kb_mx.png"  class="wb55 center " style="margin-top: 68px">
          <p class="Fgray-2 F16 lh25px h25px">还没有明细记录哦~</p>
          <p class="Fgray-1 F14 lh25px h25px">不要让大奖溜走，快去购彩吧！</p>
          <div class="clear1"></div>
          <router-link :to="{ name: 'Index'}">
            <div class="radius5  bor-red  bor-solid-1a wb40 center h40px lh40px"><p class="Fred">立即去购彩</p></div>
          </router-link>
        </div>
      </template>
      <template v-else>
        <div class="wb100" v-show="loading">
          <div class="text-center Fblack-2 h40px lh40px center w120px F14">
            <img src="~@/assets/images/loading-2.gif" class="h20px fl mat10">
            <span class="fl mal10">数据加载中...</span>
          </div>
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
        newsWidth: 0,
        page: 0,
        pageSize: 20,
        type: '',
        newsList: [],
        loading: true,
        showTitle: true,
        empty: false,
        last: false
      }
    },

    methods: {

      formatDate(str){
          let date = Base.stringToDate(str);
          let now = new Date().getTime();
          if(now - date.getTime() > 86400 * 1000 * 2){
              //超过二天
            return str.substring(5, str.length-3)
          }else{
              return Base.getDateDiff(date.getTime())
          }
      },

      toDetail(newsID){
          //记录当前浏览位置
        Base.setCookie('NewsList_scrollY',window.scrollY)
        this.$router.push({ name: 'NewsDetail', params:{ newsID: newsID} });
      },

      getData() {

        var _this = this;

        _this.loading = true;

        if(_this.last || _this.empty){
          _this.loading = false;
          if(_this.page == 0){
            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,0);
            },100);
          }
          return ;
        }

        _this.page ++;

        Interface.getNewsList(this.page, this.pageSize, this.type, (data) => {

          if (data) {

            if (data.returnJSON.queryResult.length == 0) {
              if(_this.page == 1){
                _this.empty = true;
              }else{
                _this.empty = false;
                _this.last = true;
              }
            } else {
              if(data.returnJSON.queryResult.length < _this.pageSize){
                _this.empty = false;
                _this.last = true;
              }
            }

            let _tmp = data.returnJSON.queryResult;

            for(let i=0; i< _tmp.length; i++){
              if(Base.isNull(_tmp[i].picImg)){
                _tmp[i].picImgs = []
              }else{
                _tmp[i].picImgs = _tmp[i].picImg.split("|")
              }
            }

            this.newsList = this.newsList.concat(_tmp);

            let isRead = Base.getCookie('NewsList_Read');

            if(Base.isNull(isRead)){
              isRead = false;
            }

            if(isRead == true || isRead == 'true'){
              //查询阅读历史位置
              let _newsID = Base.getCookie('NewsList_newsID');
              let _y = Base.getCookie('NewsList_scrollY');

              let __tmp = this.newsList;

              let _flag = true;

              for(let i=0; i<__tmp.length; i++){
                if(__tmp[i].newsID == _newsID){
                  _flag = false;
                }
              }

              if(_flag){
                //未查询到指定目录

                this.getData();

              }else{
                this.loading = false;

//              if(_this.page == 1){
                setTimeout( ()=> {
                  _this.fullscreenLoading = false;
                  window.scrollTo(0,_y);
                },100);
//              }
              }

            }else{
              this.loading = false;
              //常规模式
             if(_this.page == 1){
                setTimeout( ()=> {
                  _this.fullscreenLoading = false;
                  window.scrollTo(0,0);
                },100);
              }
            }

          }
        });
      },
    },

    mounted(){

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'NewsList_page', 'onInit', '新闻列表页','inited','NewsList_init']);

      this.myHeight = $(window).height()

      this.newsWidth = Math.ceil(($(window).width() - 30 - 6) / 3)

      this.type = this.$route.query.type;

      let _source = Interface.getSource();

      if(_source != 'wap'){
        this.showTitle = false;
      }

      //判断微信内核
      if(Base.versions.isWeiXin){
        this.showTitle = false;
      }

      this.getData();

    },

    beforeRouteEnter (to, from, next) {
      if(from.name == 'NewsDetail'){
          //开启阅读模式
        Base.setCookie('NewsList_Read',true);
        Base.setCookie('NewsList_newsID',from.params.newsID);
      }else{
          //关闭阅读模式
        Base.setCookie('NewsList_Read',false);
        Base.setCookie('NewsList_scrollY',0)
      }
      next();
    },

  }


</script>

