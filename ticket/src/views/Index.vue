<template>
  <div id="index_page" class="warpper-black-4" :style="'min-height: '+ height +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <!--联系客服弹窗-->
    <div class="fixed warpper-orange-2 h50px w50px radius50per" style="bottom: 75px; right: 15px; z-index: 99;" @click="showService = true; sendService()">
      <img src="~@/assets/images/icon-service.png" class="fl mal10 mat5" style="width: 30px; height: 27px; margin-bottom: 1px;">
      <div class="clear"></div>
      <p class="text-center F12 Fwhite" style="line-height: 12px;">客服</p>
    </div>

    <!--联系客服弹窗-->
    <div class="dialogBg" style="z-index: 99999;" v-show="showService == true" @click="showService = false"></div>
    <div class="fixed lh50px F14 warpper-white radius5" v-show="showService == true" style="width: 240px; height: 140px;  top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 999999;">
      <p class="text-center h50px lh50px bor-gray bor-solid-1b Fgray-3 F16">联系客服</p>
      <div class="clear1"></div>
      <p class="text-center lh30px Fgray-2">电话/微信：<a href="tel:13310227366"> <span class="Fblue Fnum">13310227366</span> </a></p>
      <p class="text-center lh30px Fgray-2">工作时间：9:00-18:00</p>
    </div>

    <!--登录大礼包弹窗-->
    <div class="dialogBg" style="z-index: 99999;" v-show="showAct == true" @click="showAct = false"></div>
    <div class="fixed lh50px F14 radius5" v-show="showAct == true" style="width: 250px; height: 350px;  top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 999999;">
      <router-link :to="{ name: 'UserWelfare' }">
        <div class="w250px h300px img-area">
          <img src="~@/assets/images/login-act-img.png">
        </div>
      </router-link>
      <div class="clear h20px"></div>
      <div class="h30px w30px center img-area" @click="showAct = false">
        <img src="~@/assets/images/close2.png">
      </div>
    </div>

    <!--充值大礼包弹窗-->
    <div class="dialogBg" style="z-index: 99999;" v-show="showAct2 == true" @click="showAct2 = false"></div>
    <div class="fixed lh50px F14 radius5" v-show="showAct2 == true" style="width: 250px; height: 350px;  top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 999999;">
      <router-link :to="{ name: 'RechargeFirst', params:{ money: 20 } }">
        <div class="w250px h300px img-area">
          <img src="~@/assets/images/recharge-act-img.png">
        </div>
      </router-link>
      <div class="clear h20px"></div>
      <div class="h30px w30px center img-area" @click="showAct2 = false">
        <img src="~@/assets/images/close2.png">
      </div>
    </div>

    <div class="wb100">

      <div class="wb100">
        <el-carousel :interval="5000" :height="_height + 'px'" ref="carousel">
          <el-carousel-item v-for="(item,key) in banner" :key="key">
              <a :href="item.linkUrl">
                <div class="wb100 img-area" :style="'width:'+_width+'px; height:'+_height+'px;'"  @touchstart="moveStart" @touchend="moveEnd">
                  <!--<img :src="item.imageURL + '?x-oss-process=image/resize,m_fill,h_'+_height * 2 +',w_'+_width * 2" />-->
                  <img :src="item.imgUrl" />
                </div>
              </a>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="clear"></div>

      <!--小喇叭-->
      <div class="wb100" v-if="notices.length > 0">
        <div class="pal40 pat5 pab5 par15 h30px lh30px Fwhite-1 relative warpper-black-3 F14">
          <img src="~@/assets/images/icon-notice.png" class="h16px absolute" style="top: 12px; left: 15px;">
          <div class="wb100 over-hidden h30px lh30px">
            <!--<div :style="'margin-left: '+ marginLeft +'px; transition-duration: '+ marginTime +'s; -moz-transition-duration: '+ marginTime +'s; -webkit-transition-duration: '+ marginTime +'s; -o-transition-duration: '+ marginTime +'s; width:999999999px'" class="myTransition">-->
            <!--{{noticeText}}-->
            <!--</div>-->

            <div :style="'margin-top: '+ marginTop +'px; transition: all .2s;'">
              <template v-for="item in notices">
                <router-link :to="{ name: 'Soccer' }">
                  <p class="h30px lh30px text-over-hidden1 Fwhite-1">用户{{item.phone}}的竞足方案中奖<span class="Forange-2 Fnum display-inline h30px lh30px">{{item.money}}</span>元</p>
                  <div class="clear"></div>
                </router-link>
              </template>
            </div>

          </div>
        </div>
      </div>

      <div class="clear h10px"></div>

      <template v-if="marchList.length > 0">

        <template>
          <div :style="'width:'+ myWidth +';margin-left:'+myLeft" @touchstart="moveStart2" @touchend="moveEnd2">
            <el-carousel @change="carChange" :interval="4000" type="card" :autoplay="false" :height="myHeight + 'px'" :indicator-position="'none'" ref="carousel2">
              <el-carousel-item class="img-area" v-for="(item,index) in marchList" :key="index">
                <div class="wb100 Fwhite-1" v-if="item" :style="'background: url('+bg+') no-repeat; background-size: 100% 100%;'">
                  <div class="clear h10px"></div>
                  <router-link :to="{ name:'SoccerDetailBet', params:{ matchID: item.id } } ">
                    <div class="wb100 text-center lh20px Fwhite-1">
                      <div class="wb33333 fl pat10">
                        <div class="w50px h50px center img-area">
                          <img :src="item.hTeamLogo">
                        </div>
                        <p class="lh20px text-over-hidden1 h20px mat10">{{cutStrForNum(item.hTeam, 5)}}</p>
                        <!--<p class="F12 lh20px">-->
                        <!--<span class="w30px h18px lh18px display-inline warpper-red radius4 text-center">主队</span>-->
                        <!--</p>-->
                      </div>
                      <div class="wb33333 fl pat10" style="padding-top: 11px;">
                        <div class="wb100 Fwhite-1">
                          <!--{{match.matchNum}}-->
                          <p class="F14 lh20px Fnum mab10">{{ dateFormat( item.matchTime )}}</p>
                          <div class="w30px center img-area">
                            <img src="~@/assets/images/icon-vs2.png">
                          </div>
                          <p class="F12 mat10">
                            <span class="Fgray-6">截止 </span><span class="warpper-black-7 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(item.date.h)}}</span>:
                            <span class="warpper-black-7 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(item.date.m)}}</span>:
                            <span class="warpper-black-7 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(item.date.s)}}</span>
                          </p>
                        </div>

                      </div>
                      <div class="wb33333 fr pat10">
                        <div class="w50px h50px center img-area">
                          <img :src="item.vTeamLogo">
                        </div>
                        <p class="lh20px text-over-hidden1 h20px mat10">{{cutStrForNum(item.vTeam, 5)}}</p>
                        <!--<p class="F12 lh20px">-->
                        <!--<span class="w30px h18px lh18px display-inline warpper-blue radius4 text-center">客队</span>-->
                        <!--</p>-->
                      </div>
                      <div class="clear h10px"></div>
                    </div>
                  </router-link>
                  <div class="clear h10px"></div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </template>

        <!--<div class="wb100 Fwhite-1" v-if="item" :style="'background: url('+bg+') no-repeat; background-size: 100% 100%;'">-->

          <!--<div class="clear h10px" style="height: 12px;"></div>-->

          <!--<p class="h20px lh20px pal15 par15 F16 relative Fwhite-1">-->
              <!--<span class="fl Fgreen-2">-->
                  <!--{{item.league}} <span class="Fnum">{{ weekFormat(item.weekId)}} {{item.teamId}}</span>-->
              <!--</span>-->
            <!--<span class="fr Fgreen-2 h20px lh20px" @click="changeMatch">-->
                <!--<img src="~@/assets/images/icon-refresh.png" class="fl h14px mal5 mar5" style="margin-top: 3px;">-->
                <!--换一换-->
              <!--</span>-->
          <!--</p>-->

          <!--<div class="clear"></div>-->

          <!--<router-link :to="{ name:'SoccerDetailBet', params:{ matchID: item.id } } ">-->
            <!--<div class="wb100 text-center lh20px Fwhite-1">-->
              <!--<div class="clear h10px"></div>-->
              <!--<div class="wb33333 fl pat10">-->
                <!--<div class="w50px h50px center img-area">-->
                  <!--<img :src="item.hTeamLogo">-->
                <!--</div>-->
                <!--<p class="lh20px text-over-hidden1 h20px mat10">{{cutStrForNum(item.hTeam, 5)}}</p>-->
                <!--&lt;!&ndash;<p class="F12 lh20px">&ndash;&gt;-->
                  <!--&lt;!&ndash;<span class="w30px h18px lh18px display-inline warpper-red radius4 text-center">主队</span>&ndash;&gt;-->
                <!--&lt;!&ndash;</p>&ndash;&gt;-->
              <!--</div>-->
              <!--<div class="wb33333 fl pat10" style="padding-top: 11px;">-->
                <!--<div class="wb100 Fwhite-1">-->
                  <!--&lt;!&ndash;{{match.matchNum}}&ndash;&gt;-->
                  <!--<p class="F14 lh20px Fnum mab10">{{ dateFormat( item.matchTime )}}</p>-->
                  <!--<div class="w30px center img-area">-->
                    <!--<img src="~@/assets/images/icon-vs2.png">-->
                  <!--</div>-->
                  <!--<p class="F12 mat10">-->
                    <!--<span class="Fgray-6">截止 </span><span class="warpper-black-7 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(date.h)}}</span>:-->
                    <!--<span class="warpper-black-7 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(date.m)}}</span>:-->
                    <!--<span class="warpper-black-7 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(date.s)}}</span>-->
                  <!--</p>-->
                <!--</div>-->

              <!--</div>-->
              <!--<div class="wb33333 fr pat10">-->
                <!--<div class="w50px h50px center img-area">-->
                  <!--<img :src="item.vTeamLogo">-->
                <!--</div>-->
                <!--<p class="lh20px text-over-hidden1 h20px mat10">{{cutStrForNum(item.vTeam, 5)}}</p>-->
                <!--&lt;!&ndash;<p class="F12 lh20px">&ndash;&gt;-->
                  <!--&lt;!&ndash;<span class="w30px h18px lh18px display-inline warpper-blue radius4 text-center">客队</span>&ndash;&gt;-->
                <!--&lt;!&ndash;</p>&ndash;&gt;-->
              <!--</div>-->

              <!--<div class="clear"></div>-->

            <!--</div>-->
          <!--</router-link>-->
          <!--<div class="clear h10px" style="height: 12px;"></div>-->
        <!--</div>-->
        <div class="clear h10px"></div>

      </template>

      <div class="wb100 warpper-black-3">
        <div class="clear h20px"></div>
        <div class="wb100">
          <template v-for="(item,key) in ['混合过关', '胜平负', '让球胜平负', '比分', '总进球', '半全场']">
            <router-link :to="{ name: 'Soccer', query: {playIndex: key} }" >
              <div class="wb33333 fl text-center mab20">
                <div class=" h50px w50px center img-area">
                  <img :src="icons[key]">
                </div>
                <p class="text-center lh15px h15px Fwhite-1 F14 mat10">{{item}}</p>
              </div>
            </router-link>
          </template>
        </div>
        <div class="clear"></div>
      </div>

      <div class="clear h10px"></div>

      <div class="wb100">
        <p class="h40px lh40px Fwhite-1 pal15 par15 F16 warpper-black-3">
          <span class="fl">赛事资讯</span>
          <!--暂时取消-->
          <span class="fr Fwhite-1 h30px lh30px mat5" @click="changeNews">
              <img src="~@/assets/images/icon-refresh-2.png" class="fl h14px mal5 mar5" style="margin-top: 8px;">
              换一换
          </span>
        </p>

        <div class="wb100">
          <div v-for="(item,key) in news">

            <template v-if="item.picImgs.length == 0">
              <div class="pal15 warpper-black-3">
                <div class="clear bor-black2 bor-solid-1b"></div>
              </div>
              <router-link :to="{ name: 'NewsDetail', params:{ newsID: item.newsID } }">
                <div class="relative warpper-black-3">
                  <div class="clear1"></div>
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
              </router-link>
            </template>

            <template v-if="item.picImgs.length < 3 && item.picImgs.length > 0">
              <div class="pal15 warpper-black-3">
                <div class="clear bor-black2 bor-solid-1b"></div>
              </div>
              <router-link :to="{ name: 'NewsDetail', params:{ newsID: item.newsID } }">
                <div class="relative warpper-black-3" style="padding-right: 150px;">
                  <div class="clear1"></div>
                  <div class="w120px h80px absolute img-area" style="top: 15px; right: 15px;">
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
              </router-link>

            </template>

            <template v-if="item.picImgs.length >= 3">
              <div class="pal15 warpper-black-3">
                <div class="clear bor-black2 bor-solid-1b"></div>
              </div>
              <router-link :to="{ name: 'NewsDetail', params:{ newsID: item.newsID } }">
                <div class="relative warpper-black-3">
                  <div class="clear1"></div>
                  <div class="pal15 par15">
                    <p class="text-over-hidden1 h20px lh20px F16 Fwhite-1">{{item.title}}</p>
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
                      <span class="fl"> {{ formatDate(item.date)}} </span>
                    </p>
                  </div>
                  <div class="clear1"></div>
                </div>
              </router-link>

            </template>

          </div>
        </div>

      </div>

      <div class="clear"></div>

      <router-link :to="{ name: 'NewsList' }">
        <p class="Fblack-2 h40px lh40px text-center">更多资讯 ></p>
      </router-link>
    </div>

    <nav-footer :active="1"></nav-footer>

  </div>
</template>

<style>
  .el-carousel__button{ width: 6px; height: 6px; -moz-border-radius:50%;-webkit-border-radius:50%;border-radius:50% }
  .el-carousel__arrow--left{ display: none;}
  .el-carousel__arrow--right{ display: none;}
  .el-carousel__mask{ background: rgba(0,0,0,.9) !important; }
</style>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'
  import type1 from '../assets/images/icon-type1.png'
  import type2 from '../assets/images/icon-type2.png'
  import type3 from '../assets/images/icon-type3.png'
  import type4 from '../assets/images/icon-type4.png'
  import type5 from '../assets/images/icon-type5.png'
  import type6 from '../assets/images/icon-type6.png'

  import bgMatch from '../assets/images/bg-match.jpg'
  import bannerImg from '../assets/images/banner-default.jpg'

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
        startX2: 0,
        endX: 0,
        endX2: 0,
        bg: bgMatch,
        active: 1,
        date: {
          h: 0,
          m: 0,
          s: 0
        },
        timerID: 0,
        timer: 0,
        login: false,
        showService: false,
        showAct: false,
        showAct2: false,
        myWidth: 0,
        myHeight: 120,
        myLeft: 0,
        marginTime: 0,
        marginTop: 0,
        noticeText: '',
        notices: [],
        matchIndex: -1,
        marchList: [],
        icons: [type1, type2, type3, type4, type5, type6],
        item: {},
        newsList: [],
        newsIndex: 0,
        news: [],
        banner: [{
          imgUrl: bannerImg
        }, {
          imgUrl: bannerImg
        },{
          imgUrl: bannerImg
        },],
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

      carChange(index) {
//        var _this = this;
//        _this.day = _this.days[index];
//        _this.current = index;
      },
      moveStart2(e) {
        this.startX2 = e.changedTouches[0].clientX || e.changedTouches[0].pageX;
      },
      moveEnd2(e) {
        this.endX2 = e.changedTouches[0].clientX || e.changedTouches[0].pageX;
        let _result = this.startX2 - this.endX2;
        if (_result >= 50) {
          this.$refs.carousel2.next();
        }
        if (_result < -50) {
          this.$refs.carousel2.prev();
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

      dateFormat(date) {
        if(Base.isNull(date))
          return '';
        return date.substring(5, date.length-3);
      },

      changeMatch(){

        if(this.marchList.length == 0){
            return false;
        }

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

      sendService(){
        _czc.push(['_trackEvent', 'Index_page_Service', 'onclick', '首页点击客服', 0 ,'Index_page_Service']);
      },

      regroup(list, size){

        if(size < 2)
          return null;

        let _result = [];

        if(size == 2){
          //M串2
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              let _tmp = [];
              _tmp.push(list[0].selectData[i0]);
              _tmp.push(list[1].selectData[i1]);
              _result.push(_tmp);
            }
          }
        }else if(size == 3){
          //M串3
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                let _tmp = [];
                _tmp.push(list[0].selectData[i0]);
                _tmp.push(list[1].selectData[i1]);
                _tmp.push(list[2].selectData[i2]);
                _result.push(_tmp);
              }
            }
          }
        }else if(size == 4){
          //M串4
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  let _tmp = [];
                  _tmp.push(list[0].selectData[i0]);
                  _tmp.push(list[1].selectData[i1]);
                  _tmp.push(list[2].selectData[i2]);
                  _tmp.push(list[3].selectData[i3]);
                  _result.push(_tmp);
                }
              }
            }
          }
        }else if(size == 5){
          //M串5
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  for(let i4 = 0; i4< list[4].selectData.length; i4++) {
                    let _tmp = [];
                    _tmp.push(list[0].selectData[i0]);
                    _tmp.push(list[1].selectData[i1]);
                    _tmp.push(list[2].selectData[i2]);
                    _tmp.push(list[3].selectData[i3]);
                    _tmp.push(list[4].selectData[i4]);
                    _result.push(_tmp);
                  }
                }
              }
            }
          }
        }else if(size == 6){
          //M串6
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  for(let i4 = 0; i4< list[4].selectData.length; i4++) {
                    for(let i5 = 0; i5< list[5].selectData.length; i5++) {
                      let _tmp = [];
                      _tmp.push(list[0].selectData[i0]);
                      _tmp.push(list[1].selectData[i1]);
                      _tmp.push(list[2].selectData[i2]);
                      _tmp.push(list[3].selectData[i3]);
                      _tmp.push(list[4].selectData[i4]);
                      _tmp.push(list[5].selectData[i5]);
                      _result.push(_tmp);
                    }
                  }
                }
              }
            }
          }
        }else if(size == 7){
          //M串7
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  for(let i4 = 0; i4< list[4].selectData.length; i4++) {
                    for(let i5 = 0; i5< list[5].selectData.length; i5++) {
                      for(let i6 = 0; i6< list[6].selectData.length; i6++) {
                        let _tmp = [];
                        _tmp.push(list[0].selectData[i0]);
                        _tmp.push(list[1].selectData[i1]);
                        _tmp.push(list[2].selectData[i2]);
                        _tmp.push(list[3].selectData[i3]);
                        _tmp.push(list[4].selectData[i4]);
                        _tmp.push(list[5].selectData[i5]);
                        _tmp.push(list[6].selectData[i6]);
                        _result.push(_tmp);
                      }
                    }
                  }
                }
              }
            }
          }
        }else if(size == 8){
          //M串8
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  for(let i4 = 0; i4< list[4].selectData.length; i4++) {
                    for(let i5 = 0; i5< list[5].selectData.length; i5++) {
                      for(let i6 = 0; i6< list[6].selectData.length; i6++) {
                        for (let i7 = 0; i7 < list[7].selectData.length; i7++) {
                          let _tmp = [];
                          _tmp.push(list[0].selectData[i0]);
                          _tmp.push(list[1].selectData[i1]);
                          _tmp.push(list[2].selectData[i2]);
                          _tmp.push(list[3].selectData[i3]);
                          _tmp.push(list[4].selectData[i4]);
                          _tmp.push(list[5].selectData[i5]);
                          _tmp.push(list[6].selectData[i6]);
                          _tmp.push(list[7].selectData[i7]);
                          _result.push(_tmp);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        let _ticket, _tickets, _item, _flag, _code = '', _LotId, _text = '', resultGroup = [], _detail;

        //混合投法，1注1张票
        for(let t = 0; t < _result.length; t ++){

          _tickets = _result[t];

          _ticket = _tickets[0];
          _flag = true;
          _text = '';

          let _tmpTicket = [];

          for(let t1 = 0; t1 < _tickets.length; t1++){
            let _tmpTicket2 = [];
//            _tickets[t1].count = 1;
            if(_ticket.type != _tickets[t1].type)
              _flag = false;
            _tmpTicket2.push(_tickets[t1]);
            _tmpTicket.push(_tmpTicket2);
          }

          _detail = JSON.stringify(_tmpTicket);

          if(_flag){
            //混合投注下的普通串关玩法
            _LotId = _tickets[0].type;
            for(let t1 = 0; t1 < _tickets.length; t1++){
              _item = _tickets[t1];
              _code = _item.day + '*' + _item.weekId + '*' + _item.teamId + '*' + _item.name.substring(1);
              _text += _code;
              _text += '^';
            }
          }else{
            //混合玩法
            _LotId = 'FT005';
            for(let t1 = 0; t1 < _tickets.length; t1++){
              _item = _tickets[t1];
              _code = _item.day + '*' + _item.weekId + '*' + _item.teamId + '*' + _item.type + '*' + _item.name.substring(1);
              _text += _code;
              _text += '^';
            }
          }

          _text = _text.substring(0, _text.length-1);

          resultGroup.push({
            LotId: _LotId,
            LotMoney: 2,
            playType: '50' + size,
            antecode : _text,
//            matchDetail: _detail
          })

        }

        return {
          groupTicket: _result,
          groupCode: resultGroup,
        };

      },

    },

    created(){

      this.myWidth = $(window).width() * 1.8 + "px";
      this.myLeft = $(window).width() * -0.4 + "px";

      //判断登录
      Interface.userBaseInfo((data) => {
        if (data) {
          if (Base.isNull(data.returnJSON)) {
            this.login = false;
            let _showAct = Base.getCookie('showActed');
            if(Base.isNull(_showAct)){
              //开启第一次弹窗
              this.showAct = true;
              Base.setCookie('showActed', true);
            }
          } else {
            let _showAct2 = Base.getCookie('showAct2ed');
            if(Base.isNull(_showAct2)){
              //开启第一次弹窗
              this.showAct2 = true;
              Base.setCookie('showAct2ed', true);
            }

            this.login = true;
          }
        } else {
          let _showAct = Base.getCookie('showActed');
          if(Base.isNull(_showAct)){
            //开启第一次弹窗
            this.showAct = true;
            Base.setCookie('showActed', true);
          }
          this.login = false;
        }
        setTimeout( ()=> {
          this.fullscreenLoading = false;
          window.scrollTo(0,0);
        },100);
      });


      let phones = [134, 135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 182, 187, 188, 130, 131, 132, 155, 156, 185, 186, 150, 151, 152,153, 155, 156, 157, 158, 159, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 180, 182, 185, 186, 187, 188, 189];

      for(let i=0; i<100; i++){

          let _r1 = Base.random_num(0,3);

          let _r2 = Base.random_num(1,5);

          let _dol = '';
          let _num = '';

          if(_r1 == 1){
            //1位小数
            _dol = '.' + Base.random_num(1,9);
          }else if(_r1 >= 2){
            //2位小数
            _dol = '.' + Base.random_num(0,9) + Base.random_num(1,9);
          }

          if(_r2 == 1){
            //1位
            _num = Base.random_num(1, 9);
          }else if(_r2 == 2){
            //2位
            _num = Base.random_num(1, 9) + '' + Base.random_num(0, 9);
          }else if(_r2 == 3){
            //3位
            _num = Base.random_num(1, 9) + '' + Base.random_num(0, 9) + '' + Base.random_num(0, 9);
          }else if(_r2 == 4){
            //4位
            _num = Base.random_num(1, 9) + '' + Base.random_num(0, 9) + '' + Base.random_num(0, 9) + '' + Base.random_num(0, 9);
          }else if(_r2 == 5){
            //5位
            _num = Base.random_num(1, 9) + '' + Base.random_num(0, 9) + '' + Base.random_num(0, 9) + '' + Base.random_num(0, 9) + '' + Base.random_num(0, 9);
          }


          let money = _num + _dol;

          this.notices.push({
            phone: phones[Base.random_num(0,48)] +'****'+ Base.random_num(0,9) +'' + Base.random_num(0,9) + '' + Base.random_num(0,9) + '' + Base.random_num(0,9),
            money: money
          })

      }

      setInterval( ()=> {
        this.marginTop -= 30
        if(this.marginTop <= this.notices.length * - 30 ){
          this.marginTop = 0
        }
      },3000);


//      Interface.msgList( (data)=>{
//          if(data){
//            this.notices = data.returnJSON;
//          }
//      })
//
//      setInterval( ()=> {
//        this.marginTop -= 30
//        if(this.marginTop <= this.notices.length * - 30 ){
//          this.marginTop = 0
//        }
//      },3000);

      this.width = $(window).width();
      this.height = $(window).height();
      this._width = parseInt($(window).width());
      this._width2 = parseInt($(window).width());
      this._height = 300 / 690 * this._width;

      this.newsWidth = Math.ceil(($(window).width() - 30 - 6) / 3)

      Interface.bannerList( (data) => {
          if(data){
              if(data.returnJSON.length > 0 ){
                this.banner = data.returnJSON;
                this.fullscreenLoading = false;
              }
          }
      })

      Interface.recentlyMatchList( (data) => {
        if(data){

          //加载倒计时
          if(data.returnJSON.length > 0){
            for(let i=0; i< data.returnJSON.length; i++){
              let item = data.returnJSON[i];
              let _now = new Date().getTime();
              let _timer =  Math.round((this.stringToDate(item.matchTime).getTime() - _now) / 1000) - 300;
              item.timer = _timer;
              item.date = {
                  h: 0,
                  m: 0,
                  s: 0,
              }
              setInterval( ()=> {
                item.timer --;
                var h = Math.floor(item.timer / 3600);
                var m = Math.floor((item.timer - 3600 * h) / 60);
                var s = item.timer - 3600 * h - m * 60;
                item.date = {
                  h: h,
                  m: m,
                  s: s
                };
              }, 1000);
            }
          }

          this.marchList = data.returnJSON;

        }
        setTimeout( ()=> {
          this.fullscreenLoading = false;
          window.scrollTo(0,0);
        },100);
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
        setTimeout( ()=> {
          this.fullscreenLoading = false;
          window.scrollTo(0,0);
        },100);
      });

    },

    mounted(){

      //- cnzz自定义统计
      // 2018年4月2日17:38:49
      // 测试完后请删除这条注数

      let source = Interface.getSource();

      //cnzz 渠道统计
      _czc.push(["_setCustomVar","访客渠道",source,2]);
      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'Index_page', 'onInit', '首页', 0 ,'Index_init']);

//      let tickets = [{"selectData":[{"val":"主胜","odds":2.03,"name":"v3","type":"FT001","isSelect":true,"id":"20180528*1*001"}]},{"selectData":[{"val":"主胜","odds":2.03,"name":"v3","type":"FT001","isSelect":true,"id":"20180528*1*001"}]},{"selectData":[{"val":"主胜","odds":2.03,"name":"v3","type":"FT001","isSelect":true,"id":"20180528*1*001"}]}];
//
//      let _selectGroup = [2,3]
//
//      let num = 0
//
//      for(let m=0; m<_selectGroup.length; m++){
//        let groupTicket = Base.group(tickets, _selectGroup[m]);
//        for(let n=0; n<groupTicket.length; n++) {
//          let _res = this.regroup(groupTicket[n], _selectGroup[m]).groupTicket;
//
//          num += _res.length;
//        }
//      }
//
//      console.log('共有'+num+'注')
    },

  }


</script>

