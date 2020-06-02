<template>
  <div id="index_page" class="warpper-black-4" :style="'min-height: '+ height +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <div class="wb100">

      <!--联系客服弹窗-->
      <div class="dialogBg" style="z-index: 99999;" v-show="showService == true" @click="showService = false"></div>
      <div class="fixed lh50px F14 warpper-white radius5" v-show="showService == true" style="width: 240px; height: 140px;  top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 999999;">
          <p class="text-center h50px lh50px bor-gray bor-solid-1b Fgray-3 F16">联系客服</p>
          <div class="clear1"></div>
          <p class="text-center lh30px Fgray-2">电话/微信：<a href="tel:13310227366"> <span class="Fblue Fnum">13310227366</span> </a></p>
          <p class="text-center lh30px Fgray-2">工作时间：9:00-18:00</p>
      </div>

      <div class="wb100">
        <el-carousel :height="_height + 'px'" ref="carousel">
          <el-carousel-item v-for="(item,key) in banner" :key="key">
            <!--<a :href="'lesson_detail.html?channelID='+item.typeID">-->
            <div class="wb100 img-area" :style="'width:'+_width+'px; height:'+_height+'px;'" @touchstart="moveStart" @touchend="moveEnd">
              <!--<img :src="item.imageURL + '?x-oss-process=image/resize,m_fixed,h_'+_height * 2 +',w_'+_width * 2" />-->
              <img :src="item.imgUrl" />
            </div>
            <!--</a>-->
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="clear"></div>

      <!--小喇叭-->
      <div class="wb100">
        <div class="pal50 pat15 pab15 par15 h20px lh20px Fwhite-1 relative warpper-black-3">
          <img src="~@/assets/images/icon-notice.png" class="h20px absolute" style="top: 15px; left: 15px;">
          <div class="wb100 over-hidden h20px lh20px">
            <!--<div :style="'margin-left: '+ marginLeft +'px; transition-duration: '+ marginTime +'s; -moz-transition-duration: '+ marginTime +'s; -webkit-transition-duration: '+ marginTime +'s; -o-transition-duration: '+ marginTime +'s; width:999999999px'" class="myTransition">-->
              <!--{{noticeText}}-->
            <!--</div>-->

            <div :style="'margin-top: '+ marginTop +'px; transition: all .5s;'">

            <template v-for="item in notices">
              <p>{{item}}</p>
              <div class="clear1"></div>
            </template>

            </div>

          </div>
        </div>
      </div>

      <div class="clear1"></div>

      <div class="pa15 Fwhite-1" v-if="item" :style="'background: url('+bg+') no-repeat; background-size: 100% 100%;'">

        <p class="h30px lh30px F16 relative Fwhite-1">
            <span class="fl Fgreen">
                {{item.league}} <span class="Fnum">{{ dateFormat(item.matchTime,16)}}</span>
            </span>
            <span class="fr Fgreen-2 h30px lh30px" @click="changeMatch">
              <img src="~@/assets/images/icon-refresh.png" class="fl h14px mal5 mar5" style="margin-top: 8px;">
              换一换
            </span>
          </p>

        <div class="clear"></div>

        <router-link :to="{ name:'SoccerDetailBet', params:{ matchID: item.matchID } } ">
          <div class="pat10 pal15 par15 text-center lh20px Fwhite-1">
            <div class="wb30 fl pat10">
              <div class="w50px h50px center img-area">
                <img :src="item.hTeamLogo">
              </div>
              <p class="lh40px text-over-hidden1 h40px">{{item.hTeam}}</p>
              <p class="F12 lh20px">
                <span class="w35px h18px lh18px display-inline warpper-red radius4 text-center">主队</span>
              </p>
            </div>
            <div class="wb40 fl">
              <div class="wb80 center Fwhite-1">
                <!--{{match.matchNum}}-->
                <p class="F14 lh20px Fnum mat20 mab10">{{ dateFormat( item.matchTime )}}</p>
                <div class="w30px center img-area">
                  <img src="~@/assets/images/icon-vs2.png">
                </div>
                <p class="F12 mat10">
                  <span class="Fgray-6">距截止 </span><span class="warpper-black-3 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(date.h)}}</span>:
                  <span class="warpper-black-3 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(date.m)}}</span>:
                  <span class="warpper-black-3 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(date.s)}}</span>
                </p>
              </div>

            </div>
            <div class="wb30 fr pat10">
              <div class="w50px h50px center img-area">
                <img :src="item.vTeamLogo">
              </div>
              <p class="lh40px text-over-hidden1 h40px">{{item.vTeam}}</p>
              <p class="F12 lh20px">
                <span class="w30px h18px lh18px display-inline warpper-blue radius4 text-center">客队</span>
              </p>
            </div>

            <div class="clear h10px"></div>

          </div>
        </router-link>
        <div class="clear"></div>
      </div>

      <div class="clear1"></div>

      <div class="wb100 warpper-black-3">
        <div class="pa15">
          <template v-for="(item,key) in ['混合过关', '胜平负', '让球胜平负', '比分', '总进球', '半全场']">
            <router-link :to="{ name: 'Soccer', query: {playIndex: key} }" >
            <div class="wb33333 fl text-center mab15">
              <div class="warpper-white h40px w40px center"></div>
              <p class="text-center lh40px Fwhite-1 F14">{{item}}</p>
            </div>
            </router-link>
          </template>
        </div>
        <div class="clear"></div>
      </div>

      <div class="clear1"></div>

      <div class="wb100">
        <p class="h40px lh40px Fwhite-1 pal15 par15 F16">
          <span class="fl">热门资讯</span>
          <!--暂时取消-->
          <span class="fr Fgreen-2 h30px lh30px mat5" @click="changeNews">
              <img src="~@/assets/images/icon-refresh.png" class="fl h14px mal5 mar5" style="margin-top: 8px;">
              换一换
          </span>
        </p>

        <div class="wb100">
            <div v-for="(item,key) in news">

              <template v-if="item.picImgs.length == 0">
                <div class="clear1"></div>
                <router-link :to="{ name: 'NewsDetail', params:{ newsID: item.newsID } }">
                  <div class="bor-black3 bor-solid-1b relative">

                    <div class="pal15 par15">
                      <p class="text-over-hidden1 h25px lh25px F16 Fwhite-1">{{item.title}}</p>
                      <div class="clear h10px"></div>
                      <p class="text-over-hidden1 h50px lh25px F14 Fblack-1">{{item.mcontent}}</p>
                      <div class="clear h10px"></div>
                      <p class="h20px lh20px Fblack-1 F14">
                        <span class="fl">{{item.leagueName}} </span>
                        <span class="fr"> {{ formatDate(item.date)}} </span>
                      </p>
                    </div>

                    <div class="clear1"></div>

                  </div>
                </router-link>
              </template>

              <template v-if="item.picImgs.length < 3 && item.picImgs.length > 0">
                <div class="clear1"></div>
                <router-link :to="{ name: 'NewsDetail', params:{ newsID: item.newsID } }">
                  <div class="bor-black3 bor-solid-1b relative" style="padding-right: 150px;">
                    <div class="w120px h80px absolute img-area" style="top: 0; right: 15px;">
                      <img :src="item.picImgs[0] + '?x-oss-process=image/resize,m_fill,h_160,w_240'">
                    </div>

                    <div class="pal15">
                      <p class="text-over-hidden2 h50px lh25px F16 Fwhite-1">{{item.title}}</p>
                      <div class="clear h10px"></div>
                      <p class="h20px lh20px Fblack-1 F14">
                        <span class="fl">{{item.leagueName}} </span>
                        <span class="fr"> {{ formatDate(item.date)}} </span>
                      </p>
                    </div>

                    <div class="clear1"></div>

                  </div>
                </router-link>

              </template>

              <template v-if="item.picImgs.length >= 3">
                <div class="clear1"></div>
                <router-link :to="{ name: 'NewsDetail', params:{ newsID: item.newsID } }">
                  <div class="bor-black3 bor-solid-1b relative">

                    <div class="pal15 par15">
                      <p class="text-over-hidden1 h20px lh20px F16 Fwhite-1">{{item.title}}</p>
                      <div class="clear h10px"></div>
                      <div class="wb100">
                        <div class="wb33333 fl img-area">
                          <div class="center" :style="'width:'+ newsWidth +'px; height:'+ newsWidth * 0.75 +'px; '">
                            <img :src="item.picImgs[0] + '?x-oss-process=image/resize,m_fill,h_'+ newsWidth * 2 +' ,w_' + newsWidth * 1.5">
                          </div>
                        </div>
                        <div class="wb33333 fl img-area">
                          <div class="center" :style="'width:'+ newsWidth +'px; height:'+ newsWidth * 0.75 +'px; '">
                            <img :src="item.picImgs[1] + '?x-oss-process=image/resize,m_fill,h_'+ newsWidth * 2 +' ,w_' + newsWidth * 1.5">
                          </div>
                        </div> <div class="wb33333 fl img-area">
                        <div class="center" :style="'width:'+ newsWidth +'px; height:'+ newsWidth * 0.75 +'px; '">
                          <img :src="item.picImgs[2] + '?x-oss-process=image/resize,m_fill,h_'+ newsWidth * 2 +' ,w_' + newsWidth * 1.5">
                        </div>
                      </div>

                        <!--<div class="wb33333 fl img-area">-->
                        <!--<div class="pa2">-->
                        <!--<img :src="item.picImgs[2]">-->
                        <!--</div>-->
                        <!--</div>-->


                      </div>
                      <div class="clear h10px"></div>
                      <p class="h20px lh20px Fblack-1 F14">
                        <span class="fl">{{item.leagueName}} </span>
                        <span class="fr"> {{ formatDate(item.date)}} </span>
                      </p>
                    </div>

                    <div class="clear1"></div>

                  </div>
                </router-link>

              </template>

            </div>
        </div>

      </div>

    </div>

    <nav-footer :active="1"></nav-footer>

  </div>
</template>

<style>
  .el-carousel__button{ width: 6px; height: 6px; -moz-border-radius:50%;-webkit-border-radius:50%;border-radius:50% }
  .el-carousel__arrow--left{ display: none;}
  .el-carousel__arrow--right{ display: none;}
</style>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  import bgMatch from '../assets/images/bg-match.jpg'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        _width: 0,
        _width2: 0,
        _height: 0,
        _height2: 0,
        newsWidth: 0,
        startX: 0,
        endX: 0,
        bg: bgMatch,
        active: 1,
        date: {
          h: 0,
          m: 0,
          s: 0
        },
        timerID: 0,
        timer: 0,
        showService: false,
        marginTime: 0,
        marginTop: 0,
        noticeText: '',
        notices: ['本轮意甲所有比赛因阿斯托里的去世推迟到下周','本轮意甲所有比赛因阿斯托里的去世推迟到下周','本轮意甲所有比赛因阿斯托里的去世推迟到下周'],
        matchIndex: -1,
        marchList: [],
        item: {},
        newsList: [],
        newsIndex: 0,
        news: [],
        banner: [],
      }
    },

    methods: {
      moveStart(e) {
        this.startX = e.changedTouches[0].clientX || e.changedTouches[0].pageX;
      },
      moveEnd(e) {
        this.endX = e.changedTouches[0].clientX || e.changedTouches[0].pageX;
        var _result = this.startX - this.endX;

        if (_result >= 50) {
          this.$refs.carousel.next();
        }
        if (_result < -50) {
          this.$refs.carousel.prev();
        }
      },

      stringToDate(dateString) {

        if (dateString) {
          var arr1 = dateString.split(" ");
          var sdate = arr1[0].split('-');
          var sdate2 = arr1[1].split(':');
          var date = new Date(sdate[0], sdate[1]-1, sdate[2], sdate2[0], sdate2[1], sdate2[2]);
          return date;
        }
      },

      cutStrForNum(str, num) {
          if(str){
            if(str.length <= num){
              return str;
            }else{
              return str.substring(0, num-1) + '...';
            }
          }
      },

      weekFormat(str){
        if(str == 1)
          return '周一';
        if(str == 2)
          return '周二';
        if(str == 3)
          return '周三';
        if(str == 4)
          return '周四';
        if(str == 5)
          return '周五';
        if(str == 6)
          return '周六';
        if(str == 7)
          return '周日';
      },

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

      dateFormat(date, index) {
        if(Base.isNull(date))
          return '';
        return date.substring(5, index);
      },

      changeMatch(){

        clearInterval(this.timerID)

        this.matchIndex ++;
        if( this.matchIndex >= this.marchList.length)
          this.matchIndex = 0;
        this.item = this.marchList[this.matchIndex]

        let _now = new Date().getTime();

        let _timer =  Math.round((this.stringToDate(this.item.matchTime).getTime() - _now) / 1000) - 300;

        this.timer = _timer;

        this.timerID = setInterval( ()=> {
          this.timer --;
          var h = Math.floor(this.timer / 3600);
          var m = Math.floor((this.timer - 3600 * h) / 60);
          var s = this.timer - 3600 * h - m * 60;
          this.date = {
            h: h,
            m: m,
            s: s
          };
        }, 1000);
      },

      changeNews(){
        this.newsIndex += 5;
        if( this.newsIndex >= this.newsList.length)
          this.newsIndex = 0;
        this.news = this.newsList.slice(this.newsIndex, this.newsIndex + 5)
      },


      addZero(num) {
        var str = num.toString();
        if (str.length == 1) return "0" + num;else return num;
      },

    },

    created(){

        //关闭首页入口
//      this.$router.push({ name: 'Soccer'});

      setInterval( ()=> {
        this.marginTop -= 35

        if(this.marginTop <= this.notices.length * -35 ){
          this.marginTop = 0
        }
      },3000)


      this.width = $(window).width();
      this.height = $(window).height();
      this._width = parseInt($(window).width());
      this._width2 = parseInt($(window).width());
      this._height = 240 / 740 * this._width;

      this.newsWidth = ($(window).width() - 30 - 6) / 3

      this.fullscreenLoading = false;

      Interface.bannerList( (data) => {
          this.banner = data.returnJSON;
      })

      Interface.recentlyMatchList( (data) => {
          if(data){
            this.marchList = data.returnJSON;
            this.changeMatch()
          }
      })

      Interface.getNewsList(1, 20, this.type, (data) => {

        if (data) {

          let _tmp = data.returnJSON.queryResult;

          for(let i=0; i< _tmp.length; i++){
            if(Base.isNull(_tmp[i].picImg)){
              _tmp[i].picImgs = []
            }else{
              _tmp[i].picImgs = _tmp[i].picImg.split("|")
            }
          }

          this.newsList = _tmp;

          this.news = this.newsList.slice(this.newsIndex, this.newsIndex + 5)

        }
      });

    },

    mounted(){

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'Lobby_page', 'onInit', '购彩大厅','inited','Lobby_init']);

    },

  }


</script>

