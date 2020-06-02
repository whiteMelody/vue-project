<template>

  <div id="soccer_detail_bet_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="match.homeTeam +' VS ' + match.visitingTeam" :back="true"></navTitle>

    <!--投注弹窗-->
    <div class="dialogBg" style="background: none; z-index: 99;" v-show="payBottom == 0" @click="payBottom = -200"></div>
    <div class="wb100 warpper-black-4 fixed h200px" :style="'transition: all .3s; bottom: '+ payBottom +'px; z-index:999;'">

      <div class="clear1"></div>

      <p class="lh20px pal15 par15 F14 Fgray-5">
        <span class="fl par10 mar10 Forange-2 display-inline bor-black3 bor-solid-1r">单场</span>
        <span class="fr">猜对可赢<span class="Fnum Forange-2">{{ twoDecimal(odds * money)}}</span>金币</span>
        <span class="fl">余额：<span class="Fnum">{{user.coinsQty}}</span>金币</span>
      </p>

      <div class="clear1"></div>

      <div class="pal15 par15 myInput">
        <!--<el-input v-model="money" type="tel" placeholder="请输入金额"></el-input>-->
        <el-input-number v-model="money" :min="1" :max="maxNum"></el-input-number>
      </div>

      <div class="clear1"></div>

      <div class="pal15">
        <div class="wb15 mar5per fl" v-for="(item,key) in moneys">
          <div @click="money = item" class="wb100 h30px lh30px text-center F14 radius5 Fnum" :class="money == item ? 'warpper-orange-7 pa1 Fwhite' : 'bor-orange2 bor-solid-1a Forange-2'">
            {{item}}
          </div>
        </div>
      </div>

      <div class="clear1"></div>

      <div class="pal15 par15">
        <div class="wb100 h40px lh40px warpper-orange-7 Fwhite text-center radius5" @click="submitOrder">
          确认竞猜
        </div>
      </div>

      <div class="clear1"></div>
    </div>


    <!--购买成功弹窗-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showBuySuccess == true" @click="closeBuySuccess"></div>
    <div class="w270px h250px fixed Fwhite F16 text-center" v-show="showBuySuccess == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 9999;">
      <img src="~@/assets/images/buy-success.png" class="w130px absolute" style="top: 0; left: 0; right: 0; margin: 0 auto; z-index: 99999; width: 134px;">
      <img src="~@/assets/images/buy-success-shadow.png" class="w270px rotater absolute" :style="'top: -77px; left: -7px; z-index: 9999;transform:rotate('+ angle +'deg);'">

      <div class="clear h130px"></div>
      <div class="wb100">
        <p class="F20 lh40px">竞猜成功</p>
        <p class="lh20px">预计收益<span class="Fgreen-2 Fnum">{{ twoDecimal(odds * money)}}</span>金币</p>

        <div class="clear h20px"></div>

        <router-link :to="{ name: 'SoccerResult', params:{ orderID: orderID, back: true } }">
          <div class="wb45 fl bor-green2 bor-solid-1a radius4 h40px lh40px text-center Fgreen-2">
            查看详情
          </div>
        </router-link>

        <div class="wb45 fr warpper-green-1 pa1 radius4 h40px lh40px Fblack text-center" @click="closeBuySuccess">
          继续竞猜
        </div>

      </div>
    </div>


    <div class="wb100" :style="'background: url('+matchDefaultBg+') no-repeat; background-size: 100% 100%;'">

      <div class="pat10 pal15 par15 text-center lh20px Fwhite">
        <div class="wb30 fl pat10">
          <div class="w50px h50px center img-area">
            <img :src="match.homeTeamLogo">
          </div>
          <p class="lh30px text-over-hidden1 h30px">{{cutStrForNum(match.homeTeam,5)}}</p>
          <p class="F12 lh20px">
            <span class="w35px h18px lh18px display-inline warpper-red radius4 text-center">主队</span>
          </p>
        </div>
        <div class="wb40 fl">
          <template v-if="match.status != 3">
            <template v-if="match.status == 0">
              <div class="wb80 center Fwhite">
                <p class="lh40px text-over-hidden1 F14">{{match.league}} 周<span class="Fnum">{{match.weekOfDay}}</span></p>
                <!--{{match.matchNum}}-->
                <div class="w60px h50px center img-area">
                  <img src="~@/assets/images/icon-vs.png">
                </div>
                <p class="F12 lh20px Fnum" v-if="frost == true">封盘中</p>
                <p class="F12 lh20px Fnum" v-else>{{ dateFormat(match.matchTime, 16)}}</p>
              </div>
            </template>

            <template v-if="match.status == 2">

              <div class="wb80 center Fwhite">
                <p class="lh40px text-over-hidden1 F14 Forange-2 Fnum">
                  <template v-if="match.matchMinute < 45">
                    进行中 {{match.matchMinute}}'
                  </template>
                  <template v-if="match.matchMinute == 45">
                    <template v-if="match.matchMinuteExtra == 0">
                      进行中 45'
                    </template>
                    <template v-if="match.matchMinuteExtra != 0">
                      进行中 45+'
                    </template>
                  </template>

                  <template v-if="match.matchMinute > 45 && match.matchMinute < 90">
                    进行中 {{match.matchMinute}}'
                  </template>

                  <template v-if="match.matchMinute == 90">
                    <template v-if="match.matchMinuteExtra == 0">
                      进行中 90'
                    </template>
                    <template v-if="match.matchMinuteExtra != 0">
                      进行中 90+'
                    </template>
                  </template>
                </p>
                <!--{{match.matchNum}}-->
                <div class="w60px h50px lh50px center F24 Fnum">
                  <p>{{match.hFullGoals}} : {{match.vFullGoals}}</p>
                </div>
                <p class="F12 lh20px Fnum">{{ dateFormat(match.matchTime, 16)}}</p>
              </div>

            </template>

          </template>

          <template v-if="match.status == 3">
            <div class="wb80 center Fwhite">
              <p class="lh40px F14">{{match.league}} 周<span class="Fnum">{{match.weekOfDay}}</span></p>
              <p class="Fnum F24 lh50px h50px" style="line-height: 36px">{{match.hFullGoals}} : {{match.vFullGoals}}</p>
              <!--<p class="F30 text-center lh45px">1 : 0</p>-->
              <p class="F14 lh20px">已完赛</p>
            </div>
          </template>

          <template v-if="match.status == 4 || match.status == 5 || match.status == 6 || match.status == 7">
            <div class="wb80 center Fwhite">
              <p class="lh40px F14">{{match.league}} 周<span class="Fnum">{{match.weekOfDay}}</span></p>
              <p class="Fnum F24 lh50px h50px " style="line-height: 36px">{{match.hFullGoals}} : {{match.vFullGoals}}</p>
              <!--<p class="F30 text-center lh45px">1 : 0</p>-->
              <p class="F14 lh20px">比赛待定</p>
            </div>
          </template>

        </div>
        <div class="wb30 fr pat10">
          <div class="w50px h50px center img-area">
            <img :src="match.visitingTeamLogo">
          </div>
          <p class="lh30px text-over-hidden1 h30px">{{cutStrForNum(match.visitingTeam,5)}}</p>
          <p class="F12 lh20px">
            <span class="w30px h18px lh18px display-inline warpper-blue radius4 text-center">客队</span>
          </p>
        </div>

        <div class="clear h10px"></div>

      </div>

      <div class="clear"></div>

      <p style="background: rgba(0,0,0,.1);" class="h30px lh30px Fwhite pal15 par15 F14">

        <!--<img src="~@/assets/images/weather-qt.png" class="h30px fl mat5 mar5" v-if="match.weather == '天晴'">-->
        <!--<img src="~@/assets/images/weather-xx.png" class="h30px fl mat5 mar5" v-if="match.weather == '下雪'">-->
        <!--<img src="~@/assets/images/weather-dy.png" class="h30px fl mat5 mar5" v-if="match.weather == '多云'">-->
        <!--<img src="~@/assets/images/weather-xy.png" class="h30px fl mat5 mar5" v-if="match.weather == '下雨'">-->
        <!--<img src="~@/assets/images/weather-yt.png" class="h30px fl mat5 mar5" v-if="match.weather == '阴天'">-->

        {{match.weatherCity}} {{match.weather}}
      </p>

    </div>

    <div class="clear"></div>

    <div class="wb100 text-center h35px lh35px pat10 pab10 warpper-black-3">
      <div class="wb50 fl" @click="searchType = 0">
        <span :class="searchType == 0 ? 'bor-oragne2 bor-solid-2b h38px lh38px F18 Forange-2' : 'h35px lh35px Fgray-5'" class="display-inline">竞猜</span>
      </div>
      <div class="wb50 fl" @click="searchType = 1">
        <div class="wb100">
          <span :class="searchType == 1 ? 'bor-oragne2 bor-solid-2b h38px lh38px F18 Forange-2' : 'h35px lh35px Fgray-5'" class="display-inline">达人推荐</span>
        </div>
      </div>
    </div>

    <template v-if="searchType == 0">

      <template v-if="frost == false && match.status == 0">

        <div class="wb100 Fgray-5" v-if="match.rateObject.spf != null">
          <div class="pa15">
            <p>猜胜平负</p>
            <div class="clear1"></div>

            <div class="relative h60px text-center bor-black2 bor-solid-1a warpper-black-3" style="z-index: 99;">

              <div class="wb33333 fl" @click="selectSoccer(1, match.rateObject.spf.win)">
                <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="match.rateObject.selected == 1">
                  <p>主胜</p>
                  <p class="Fnum">{{match.rateObject.spf.win}}</p>
                </div>
                <div class="wb100 pat5 pab5 lh25px" v-else>
                  <p>主胜</p>
                  <p class="Fnum Fgray-6">{{match.rateObject.spf.win}}</p>
                </div>
              </div>

              <div class="wb33333 fl" @click="selectSoccer(2, match.rateObject.spf.tie)">
                <div class="wb100 bor-black2 bor-solid-1l bor-solid-1r">
                  <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="match.rateObject.selected == 2">
                    <p>平</p>
                    <p class="Fnum">{{match.rateObject.spf.tie}}</p>
                  </div>
                  <div class="wb100 pat5 pab5 lh25px" v-else>
                    <p>平</p>
                    <p class="Fnum Fgray-6">{{match.rateObject.spf.tie}}</p>
                  </div>
                </div>
              </div>

              <div class="wb33333 fl" @click="selectSoccer(3, match.rateObject.spf.lose)">
                <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="match.rateObject.selected == 3">
                  <p>客胜</p>
                  <p class="Fnum">{{match.rateObject.spf.lose}}</p>
                </div>
                <div class="wb100 pat5 pab5 lh25px" v-else>
                  <p>客胜</p>
                  <p class="Fnum Fgray-6">{{match.rateObject.spf.lose}}</p>
                </div>
              </div>

            </div>
          </div>

          <div class="clear"></div>

        </div>

        <div class="clear h10px"></div>

        <div class="wb100 Fgray-5" v-if="match.rateObject.rspf != null">
          <div class="pa15">
            <p>猜让球胜平负</p>
            <div class="clear1"></div>

            <div class="pal20 relative h60px text-center bor-black2 bor-solid-1a warpper-black-3" style="z-index: 99;">

              <div class="text-center warpper-red absolute Fwhite F14 Fnum" v-if="match.rateObject.rspf.letBall>0" style="top: -1px; height: 62px; line-height: 62px; left: -1px; width: 21px;">
                +{{match.rateObject.rspf.letBall}}
              </div>
              <div class="text-center warpper-gray-2 absolute Fwhite Fnum" v-if="match.rateObject.rspf.letBall==0" style="top: -1px; height: 62px; line-height: 62px; left: -1px; width: 21px;">
                {{match.rateObject.rspf.letBall}}
              </div>
              <div class="text-center warpper-blue absolute Fwhite Fnum" v-if="match.rateObject.rspf.letBall<0" style="top: -1px; height: 62px; line-height: 62px; left: -1px; width: 21px;">
                {{match.rateObject.rspf.letBall}}
              </div>

              <div class="wb33333 fl" @click="selectSoccer(4, match.rateObject.rspf.win)">
                <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="match.rateObject.selected == 4">
                  <p>主胜</p>
                  <p class="Fnum">{{match.rateObject.rspf.win}}</p>
                </div>
                <div class="wb100 pat5 pab5 lh25px" v-else>
                  <p>主胜</p>
                  <p class="Fnum Fgray-6">{{match.rateObject.rspf.win}}</p>
                </div>
              </div>

              <div class="wb33333 fl" @click="selectSoccer(5, match.rateObject.rspf.tie)">
                <div class="wb100 bor-black2 bor-solid-1l bor-solid-1r">
                  <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="match.rateObject.selected == 5">
                    <p>平</p>
                    <p class="Fnum">{{match.rateObject.rspf.tie}}</p>
                  </div>
                  <div class="wb100 pat5 pab5 lh25px" v-else>
                    <p>平</p>
                    <p class="Fnum Fgray-6">{{match.rateObject.rspf.tie}}</p>
                  </div>
                </div>
              </div>

              <div class="wb33333 fl" @click="selectSoccer(6, match.rateObject.rspf.lose)">
                <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="match.rateObject.selected == 6">
                  <p>客胜</p>
                  <p class="Fnum">{{match.rateObject.rspf.lose}}</p>
                </div>
                <div class="wb100 pat5 pab5 lh25px" v-else>
                  <p>客胜</p>
                  <p class="Fnum Fgray-6">{{match.rateObject.rspf.lose}}</p>
                </div>
              </div>

            </div>
          </div>

          <div class="clear"></div>

        </div>

        <div class="clear h10px"></div>

        <div class="wb100 Fgray-5" v-if="match.rateObject.score != null">
          <div class="pa15">
            <p>猜全场比分</p>

            <div class="clear1"></div>
            <!--胜-->
            <div class="pal20 relative text-center bor-black2 bor-solid-1t bor-solid-1l warpper-black-3" style="z-index: 99;">

              <div class="text-center warpper-red w20px absolute Fwhite" style="top: 0; left: 0; height: 213px; line-height: 213px;">
                胜
              </div>

              <!--1比0-->
              <div class="wb20 fl" @click="selectSoccer(25, match.rateObject.score.s_1_0)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 25">
                  <p class="F18 Fnum">1:0</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_1_0}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">1:0</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_1_0}}</p>
                </div>
              </div>

              <!--2比0-->
              <div class="wb20 fl" @click="selectSoccer(26, match.rateObject.score.s_2_0)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 26">
                  <p class="F18 Fnum">2:0</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_2_0}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">2:0</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_2_0}}</p>
                </div>
              </div>

              <!--2比1-->
              <div class="wb20 fl" @click="selectSoccer(27, match.rateObject.score.s_2_1)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 27">
                  <p class="F18 Fnum">2:1</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_2_1}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">2:1</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_2_1}}</p>
                </div>
              </div>

              <!--3比0-->
              <div class="wb20 fl" @click="selectSoccer(28, match.rateObject.score.s_3_0)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 28">
                  <p class="F18 Fnum">3:0</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_3_0}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">3:0</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_3_0}}</p>
                </div>
              </div>

              <!--3比1-->
              <div class="wb20 fl" @click="selectSoccer(29, match.rateObject.score.s_3_1)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 29">
                  <p class="F18 Fnum">3:1</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_3_1}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">3:1</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_3_1}}</p>
                </div>
              </div>

              <!--3比2-->
              <div class="wb20 fl" @click="selectSoccer(30, match.rateObject.score.s_3_2)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 30">
                  <p class="F18 Fnum">3:2</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_3_2}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">3:2</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_3_2}}</p>
                </div>
              </div>

              <!--4比0-->
              <div class="wb20 fl" @click="selectSoccer(31, match.rateObject.score.s_4_0)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 31">
                  <p class="F18 Fnum">4:0</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_4_0}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">4:0</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_4_0}}</p>
                </div>
              </div>

              <!--4比1-->
              <div class="wb20 fl" @click="selectSoccer(32, match.rateObject.score.s_4_1)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 32">
                  <p class="F18 Fnum">4:1</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_4_1}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">4:1</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_4_1}}</p>
                </div>
              </div>

              <!--4比2-->
              <div class="wb20 fl" @click="selectSoccer(33, match.rateObject.score.s_4_2)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 33">
                  <p class="F18 Fnum">4:2</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_4_2}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">4:2</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_4_2}}</p>
                </div>
              </div>

              <!--5比0-->
              <div class="wb20 fl" @click="selectSoccer(34, match.rateObject.score.s_5_0)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 34">
                  <p class="F18 Fnum">5:0</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_5_0}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">5:0</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_5_0}}</p>
                </div>
              </div>

              <!--5比1-->
              <div class="wb20 fl" @click="selectSoccer(35, match.rateObject.score.s_5_1)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 35">
                  <p class="F18 Fnum">5:1</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_5_1}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">5:1</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_5_1}}</p>
                </div>
              </div>

              <!--5比2-->
              <div class="wb20 fl" @click="selectSoccer(36, match.rateObject.score.s_5_2)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 36">
                  <p class="F18 Fnum">5:2</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_5_2}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">5:2</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_5_2}}</p>
                </div>
              </div>

              <!--胜其他-->
              <div class="wb60 fl" @click="selectSoccer(37, match.rateObject.score.s_other)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 37">
                  <p class="F16">胜其他</p>
                  <p class="Fnum F14">{{match.rateObject.score.s_other}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F16">胜其他</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.s_other}}</p>
                </div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="clear1"></div>
            <!--平-->
            <div class="pal20 relative text-center bor-black2 bor-solid-1t bor-solid-1l warpper-black-3" style="z-index: 99;">

              <div class="text-center warpper-orange-2 w20px absolute Fwhite" style="top: 0; left: 0; height: 70px; line-height: 70px;">
                平
              </div>

              <!--0比0-->
              <div class="wb20 fl" @click="selectSoccer(20, match.rateObject.score.p_0_0)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 20">
                  <p class="F18 Fnum">0:0</p>
                  <p class="Fnum F14">{{match.rateObject.score.p_0_0}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">0:0</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.p_0_0}}</p>
                </div>
              </div>

              <!--1比1-->
              <div class="wb20 fl" @click="selectSoccer(21, match.rateObject.score.p_1_1)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 21">
                  <p class="F18 Fnum">1:1</p>
                  <p class="Fnum F14">{{match.rateObject.score.p_1_1}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">1:1</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.p_1_1}}</p>
                </div>
              </div>

              <!--2比2-->
              <div class="wb20 fl" @click="selectSoccer(22, match.rateObject.score.p_2_2)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 22">
                  <p class="F18 Fnum">2:2</p>
                  <p class="Fnum F14">{{match.rateObject.score.p_2_2}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">2:2</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.p_2_2}}</p>
                </div>
              </div>

              <!--3比3-->
              <div class="wb20 fl" @click="selectSoccer(23, match.rateObject.score.p_3_3)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 23">
                  <p class="F18 Fnum">3:3</p>
                  <p class="Fnum F14">{{match.rateObject.score.p_3_3}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">3:3</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.p_3_3}}</p>
                </div>
              </div>

              <!--平其他-->
              <div class="wb20 fl" @click="selectSoccer(24, match.rateObject.score.p_other)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 24">
                  <p class="F16">平其他</p>
                  <p class="Fnum F14">{{match.rateObject.score.p_other}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F16">平其他</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.p_other}}</p>
                </div>
              </div>

              <div class="clear"></div>
            </div>

            <div class="clear1"></div>
            <!--负-->
            <div class="pal20 relative text-center bor-black2 bor-solid-1t bor-solid-1l warpper-black-3" style="z-index: 99;">

              <div class="text-center warpper-blue w20px absolute Fwhite" style="top: 0; left: 0; height: 213px; line-height: 213px;">
                负
              </div>

              <!--0比1-->
              <div class="wb20 fl" @click="selectSoccer(7, match.rateObject.score.f_0_1)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 7">
                  <p class="F18 Fnum">0:1</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_0_1}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">0:1</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_0_1}}</p>
                </div>
              </div>

              <!--0比2-->
              <div class="wb20 fl" @click="selectSoccer(8, match.rateObject.score.f_0_2)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 8">
                  <p class="F18 Fnum">0:2</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_0_2}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">0:2</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_0_2}}</p>
                </div>
              </div>

              <!--1比2-->
              <div class="wb20 fl" @click="selectSoccer(9, match.rateObject.score.f_1_2)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 9">
                  <p class="F18 Fnum">1:2</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_1_2}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">1:2</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_1_2}}</p>
                </div>
              </div>

              <!--0比3-->
              <div class="wb20 fl" @click="selectSoccer(10, match.rateObject.score.f_0_3)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 10">
                  <p class="F18 Fnum">0:3</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_0_3}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">0:3</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_0_3}}</p>
                </div>
              </div>

              <!--1比3-->
              <div class="wb20 fl" @click="selectSoccer(11, match.rateObject.score.f_1_3)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 11">
                  <p class="F18 Fnum">1:3</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_1_3}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">1:3</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_1_3}}</p>
                </div>
              </div>

              <!--2比3-->
              <div class="wb20 fl" @click="selectSoccer(12, match.rateObject.score.f_2_3)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 12">
                  <p class="F18 Fnum">2:3</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_2_3}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">2:3</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_2_3}}</p>
                </div>
              </div>

              <!--0比4-->
              <div class="wb20 fl" @click="selectSoccer(13, match.rateObject.score.f_0_4)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 13">
                  <p class="F18 Fnum">0:4</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_0_4}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">0:4</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_0_4}}</p>
                </div>
              </div>

              <!--1比4-->
              <div class="wb20 fl" @click="selectSoccer(14, match.rateObject.score.f_1_4)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 14">
                  <p class="F18 Fnum">1:4</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_1_4}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">1:4</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_1_4}}</p>
                </div>
              </div>

              <!--2比4-->
              <div class="wb20 fl" @click="selectSoccer(15, match.rateObject.score.f_2_4)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 15">
                  <p class="F18 Fnum">2:4</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_2_4}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">2:4</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_2_4}}</p>
                </div>
              </div>

              <!--0比5-->
              <div class="wb20 fl" @click="selectSoccer(16, match.rateObject.score.f_0_5)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 16">
                  <p class="F18 Fnum">0:5</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_0_5}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">0:5</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_0_5}}</p>
                </div>
              </div>

              <!--1比5-->
              <div class="wb20 fl" @click="selectSoccer(17, match.rateObject.score.f_1_5)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 17">
                  <p class="F18 Fnum">1:5</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_1_5}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">1:5</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_1_5}}</p>
                </div>
              </div>

              <!--2比5-->
              <div class="wb20 fl" @click="selectSoccer(18, match.rateObject.score.f_2_5)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 18">
                  <p class="F18 Fnum">2:5</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_2_5}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">2:5</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_2_5}}</p>
                </div>
              </div>

              <!--负其他-->
              <div class="wb60 fl" @click="selectSoccer(19, match.rateObject.score.f_other)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 19">
                  <p class="F16">负其他</p>
                  <p class="Fnum F14">{{match.rateObject.score.f_other}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F16">负其他</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.score.f_other}}</p>
                </div>
              </div>

              <div class="clear"></div>
            </div>

          </div>
          <div class="clear"></div>
        </div>

        <div class="clear h10px"></div>

        <div class="wb100 Fgray-5" v-if="match.rateObject.goalsScored != null">
          <div class="pa15">
            <p>猜总进球数</p>
            <div class="clear1"></div>
            <div class="wb100 text-center bor-black2 bor-solid-1t bor-solid-1l relative warpper-black-3" style="z-index: 99;">

              <!--0球-->
              <div class="wb25 fl" @click="selectSoccer(38, match.rateObject.goalsScored.total0)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 38">
                  <p class="F18 Fnum">0球</p>
                  <p class="Fnum F14">{{match.rateObject.goalsScored.total0}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">0球</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.goalsScored.total0}}</p>
                </div>
              </div>

              <!--1球-->
              <div class="wb25 fl" @click="selectSoccer(39, match.rateObject.goalsScored.total1)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 39">
                  <p class="F18 Fnum">1球</p>
                  <p class="Fnum F14">{{match.rateObject.goalsScored.total1}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">1球</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.goalsScored.total1}}</p>
                </div>
              </div>

              <!--2球-->
              <div class="wb25 fl" @click="selectSoccer(40, match.rateObject.goalsScored.total2)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 40">
                  <p class="F18 Fnum">2球</p>
                  <p class="Fnum F14">{{match.rateObject.goalsScored.total2}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">2球</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.goalsScored.total2}}</p>
                </div>
              </div>

              <!--3球-->
              <div class="wb25 fl" @click="selectSoccer(41, match.rateObject.goalsScored.total3)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 41">
                  <p class="F18 Fnum">3球</p>
                  <p class="Fnum F14">{{match.rateObject.goalsScored.total3}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">3球</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.goalsScored.total3}}</p>
                </div>
              </div>

              <!--4球-->
              <div class="wb25 fl" @click="selectSoccer(42, match.rateObject.goalsScored.total4)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 42">
                  <p class="F18 Fnum">4球</p>
                  <p class="Fnum F14">{{match.rateObject.goalsScored.total4}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">4球</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.goalsScored.total4}}</p>
                </div>
              </div>

              <!--5球-->
              <div class="wb25 fl" @click="selectSoccer(43, match.rateObject.goalsScored.total5)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 43">
                  <p class="F18 Fnum">5球</p>
                  <p class="Fnum F14">{{match.rateObject.goalsScored.total5}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">5球</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.goalsScored.total5}}</p>
                </div>
              </div>

              <!--6球-->
              <div class="wb25 fl" @click="selectSoccer(44, match.rateObject.goalsScored.total6)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 44">
                  <p class="F18 Fnum">6球</p>
                  <p class="Fnum F14">{{match.rateObject.goalsScored.total6}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">6球</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.goalsScored.total6}}</p>
                </div>
              </div>

              <!--7+球-->
              <div class="wb25 fl" @click="selectSoccer(45, match.rateObject.goalsScored.total7)">
                <div class="wb100 warpper-orange-7 Fwhite h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b" v-if="match.rateObject.selected == 45">
                  <p class="F18 Fnum">7+球</p>
                  <p class="Fnum F14">{{match.rateObject.goalsScored.total7}}</p>
                </div>
                <div class="h50px lh25px pat10 pab10 bor-black2 bor-solid-1r bor-solid-1b wb100" v-else>
                  <p class="F18 Fnum">7+球</p>
                  <p class="Fgray-6 Fnum F14">{{match.rateObject.goalsScored.total7}}</p>
                </div>
              </div>

              <div class="clear"></div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </template>
      <template v-else>
        <div class="wb100 text-center Fgray-6 lh25px F14 Fgray-6" style="margin-top: 40px;">
          <p class="lh30px F18">本场竞猜已截止</p>
          <p>去看看其他比赛吧~</p>
          <div class="clear"></div>

          <recommend></recommend>

        </div>
      </template>

    </template>


    <template v-if="searchType == 1">
      <div class="wb100"  v-if="empty == false">

        <expertList :list="matchList"></expertList>

      </div>

      <div class="wb100 text-center" v-if="empty == true">
        <img src="~@/assets/images/drtj_kb.png" class="w100px center" style="margin-top: 60px;">
        <div class="clear1"></div>
        <p class="Fgray-5 F16 lh25px h25px">本场比赛暂无推荐哦~</p>
        <div class="clear1"></div>
      </div>
    </template>

    <div class="clear h10px"></div>

    <template v-if="payBottom == 0">
      <div class="clear h200px"></div>
    </template>

  </div>

</template>

<style>

</style>

<script>

    import Base from '../assets/js/base.js'
    import Interface from '../assets/js/interface.js'

    import userDefault from '../assets/images/head-img1.png'
    import matchBg from '../assets/images/bg-detail.png'

    export default{

        data (){
            return {
              login: false,
              searchType: 0,
              matchDefaultBg: matchBg,
              fullscreenLoading: true,
              showBuySuccess: false,
              showGetRedBag: true,
              userHead: userDefault,
              empty: false,
              noRecommend: false,
              page: 1,
              pageSize: 20,
              rotateTimer: 0,
              totleCount: 0,
              matchID: 0,
              angle: 0,
              match: {
                date: '',
                matchTime: '',
                homeTeam: '',
                visitingTeam: '',
                rateObject: {}
              },
              odds: 0,
              orderID: '',
              currentItem: {},
              recommend: {
                homeTeam: '',
                visitingTeam:''
              },
              user: {
                photoUrl: '',
                coinsQty: 0
              },
              payBottom: -200,
              money: 5,
              moneys: [2, 5, 10, 20, 50],
              frost: false,
              matchList: [],
              favDisabled: false,
              maxNum: 1000
            }
        },

        methods: {
          selectSoccer(_t, odd) {
            var _this = this;

            var lotType = 0;
            var anteValue = 0;

            if(_this.favDisabled)
              return;

            if(_this.match.rateObject.selected == 0){
              _this.payBottom = 0;
            }else{
              if(_this.match.rateObject.selected == _t){
                //反选
                _this.payBottom = -200;
                _t = 0;
              }else{
                _this.payBottom = 0;
              }
            }

            _this.match.rateObject.selected = _t;

            _this.odds = odd;

            if(_t >=1 && _t<=6){

              _this.maxNum = 1000;

            }else{
              _this.maxNum =  Math.floor(1000/odd);

              _this.maxN = _this.money * odd;

              if(_this.maxN >= 1000){

                _this.money = _this.maxNum;

                _this.$message({
                  type: 'error',
                  message: '竞猜上限为' + _this.maxNum + '金币',
                  duration: 1500
                });

                _this.favDisabled = true;

                setTimeout(function(){
                  _this.favDisabled = false;
                },1500);

              }


//                    if (_this.maxNum < 1000) {
//
//                        _this.money = _this.maxNum;
//
//                        _this.$message({
//                            type: 'error',
//                            message: '竞猜上限为' + _this.maxNum + '金币',
//                            duration: 1500
//                        });
//
//                        _this.favDisabled = true;
//
//                        setTimeout(function(){
//                            _this.favDisabled = false;
//                        },1500);
//
//                    }

            }

            //1 - 6 胜平负

            if (_t == 1) {
              lotType = 0;anteValue = 0;
            }if (_t == 2) {
              lotType = 0;anteValue = 1;
            }if (_t == 3) {
              lotType = 0;anteValue = 2;
            }if (_t == 4) {
              lotType = 1;anteValue = 0;
            }if (_t == 5) {
              lotType = 1;anteValue = 1;
            }if (_t == 6) {
              lotType = 1;anteValue = 2;
            }if (_t == 25) {
              lotType = 2;anteValue = 0;
            }if (_t == 26) {
              lotType = 2;anteValue = 1;
            }if (_t == 27) {
              lotType = 2;anteValue = 2;
            }if (_t == 28) {
              lotType = 2;anteValue = 3;
            }if (_t == 29) {
              lotType = 2;anteValue = 4;
            }if (_t == 30) {
              lotType = 2;anteValue = 5;
            }if (_t == 31) {
              lotType = 2;anteValue = 6;
            }if (_t == 32) {
              lotType = 2;anteValue = 7;
            }if (_t == 33) {
              lotType = 2;anteValue = 8;
            }if (_t == 34) {
              lotType = 2;anteValue = 9;
            }if (_t == 35) {
              lotType = 2;anteValue = 10;
            }if (_t == 36) {
              lotType = 2;anteValue = 11;
            }if (_t == 37) {
              lotType = 2;anteValue = 12;
            }if (_t == 20) {
              lotType = 2;anteValue = 13;
            }if (_t == 21) {
              lotType = 2;anteValue = 14;
            }if (_t == 22) {
              lotType = 2;anteValue = 15;
            }if (_t == 23) {
              lotType = 2;anteValue = 16;
            }if (_t == 24) {
              lotType = 2;anteValue = 17;
            }if (_t == 7) {
              lotType = 2;anteValue = 18;
            }if (_t == 8) {
              lotType = 2;anteValue = 19;
            }if (_t == 9) {
              lotType = 2;anteValue = 20;
            }if (_t == 10) {
              lotType = 2;anteValue = 21;
            }if (_t == 11) {
              lotType = 2;anteValue = 22;
            }if (_t == 12) {
              lotType = 2;anteValue = 23;
            }if (_t == 13) {
              lotType = 2;anteValue = 24;
            }if (_t == 14) {
              lotType = 2;anteValue = 25;
            }if (_t == 15) {
              lotType = 2;anteValue = 26;
            }if (_t == 16) {
              lotType = 2;anteValue = 27;
            }if (_t == 17) {
              lotType = 2;anteValue = 28;
            }if (_t == 18) {
              lotType = 2;anteValue = 29;
            }if (_t == 19) {
              lotType = 2;anteValue = 30;
            }if (_t == 38) {
              lotType = 3;anteValue = 0;
            }if (_t == 39) {
              lotType = 3;anteValue = 1;
            }if (_t == 40) {
              lotType = 3;anteValue = 2;
            }if (_t == 41) {
              lotType = 3;anteValue = 3;
            }if (_t == 42) {
              lotType = 3;anteValue = 4;
            }if (_t == 43) {
              lotType = 3;anteValue = 5;
            }if (_t == 44) {
              lotType = 3;anteValue = 6;
            }if (_t == 45) {
              lotType = 3;anteValue = 7;
            }

            _this.currentItem = {
              matchName: _this.match.homeTeam + ' VS ' + _this.match.visitingTeam,
              matchID: _this.match.matchID,
              lotType: lotType,
              anteValue: anteValue,
              odds: odd
            };

          },

          twoDecimal(x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
              return false;
            }
            var f = Math.round(x * 100) / 100;
            var s = f.toString();
            var rs = s.indexOf('.');
            if (rs < 0) {
              rs = s.length;
              s += '.';
            }
            while (s.length <= rs + 2) {
              s += '0';
            }
            return s;
          },

          dateFormat(date, index) {
            return date.substring(5, index);
          },

          closeBuySuccess(){
            this.showBuySuccess = false;
            window.clearInterval(this.rotateTimer);
          },

          rotation(){
            var _this = this;
            window.clearInterval(_this.rotateTimer);
            _this.rotateTimer = setInterval(function(){
              _this.angle += 3;
            },50);
          },

          getRatio(match){
            var _num = 0;

            for(var i=0; i<match.length; i++){

              if(_num == 0){
                _num = match[i].lossRatio;
              }else{
                _num *= match[i].lossRatio;
              }

            }

            return [this.twoDecimal(_num), Number.parseInt(this.twoDecimal(_num) * 100)];
          },

          submitOrder() {
            var _this = this;

            var _matchList = [];

            var _user = Base.getCookie('userInfo');

//            _matchList.push({
//              matchID: _item.matchID,
//              matchName: _item.homeTeam + ' VS ' + _item.visitingTeam,
//              odds: _odd,
//              lotType: _item.selected <= 3 ? 0 : 1,
//              anteValue: _item.selected <= 3 ? _item.selected : _item.selected - 3
//            })

            _matchList.push(_this.currentItem);

            if(_this.favDisabled)
              return;

            if (Base.isNull(_user)) {
              //前去登录
              _this.$router.push({ name: 'Login', params:{ call: true, callUrl: 'Pay', money: _this.money } });
              Base.setCookie('unpaid',JSON.stringify(_matchList));
              return false;
            }

            //判断金额

            var _ttt = _this.money + '';

            if(_ttt.indexOf('.')!=-1){
              _this.$message({
                type: 'error',
                message: '投注金额需为整数',
                duration: 1500
              });

              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }

            if (_this.money < 1) {
              _this.$message({
                type: 'error',
                message: '竞猜下限为1金币',
                duration: 1500
              });

              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }

            if(_this.currentItem.lotType == 0 || _this.currentItem.lotType == 1){
              if(_this.money > 1000){
                _this.$message({
                  type: 'error',
                  message: '竞猜上限为1000金币',
                  duration: 1500
                });

                _this.favDisabled = true;

                setTimeout(function(){
                  _this.favDisabled = false;
                },1500);

                return false;
              }
            }else{
              if(_this.money * _this.currentItem.odds > 1000) {
                _this.$message({
                  type: 'error',
                  message: '竞猜上限为1000金币',
                  duration: 1500
                });

                _this.favDisabled = true;

                setTimeout(function(){
                  _this.favDisabled = false;
                },1500);

                return false;
              }
            }

            //判断余额
            if (_this.user.coinsQty < _this.money) {
              //跳转到支付页面
              Base.setCookie('unpaid',JSON.stringify(_matchList));
              if(_this.isWeiXin){
                _this.$router.push({ name: 'WxPay' });
                Base.setCookie('payMoney', _this.money);
              }else{
                _this.$router.push({ name: 'Pay', query:{ money: _this.money } });
              }
              return false;
            }

            //matchID, lotType, anteValue, couponNumber, money,

            Interface.usableCouponList(_this.money, function (data2) {
              if(data2){
                if(data2.returnJSON.length > 0 ){
                  Base.setCookie('unpaid',JSON.stringify(_matchList));
                  if(_this.isWeiXin){
                    _this.$router.push({ name: 'WxPay' });
                    Base.setCookie('payMoney', _this.money);
                  }else{
                    _this.$router.push({ name: 'Pay', query:{ money: _this.money } });
                  }
                  return false;
                }else{
                  Interface.payMatch('', _this.money, _matchList, function (data, errorMsg) {

                    if (data) {

                      _this.showBuySuccess = true;

                      _this.orderID = data.returnJSON.orderID;

                      _this.rotation();

                      //更新用户
                      Interface.userInfo(function (user) {
                        _this.user = user.returnJSON;
                      });
                    } else {
                      _this.$message({
                        type: 'error',
                        message: errorMsg,
                        duration: 1500
                      });

                      _this.favDisabled = true;

                      setTimeout(function(){
                        _this.favDisabled = false;
                      },1500);

                    }

                    _this.payBottom = -200;
                  });
                }
              }else{
                Interface.payMatch('', _this.money, _matchList, function (data, errorMsg) {

                  if (data) {

                    _this.showBuySuccess = true;

                    _this.orderID = data.returnJSON.orderID;

                    _this.rotation();

                    //更新用户
                    Interface.userInfo(function (user) {
                      _this.user = user.returnJSON;
                    });
                  } else {
                    _this.$message({
                      type: 'error',
                      message: errorMsg,
                      duration: 1500
                    });

                    _this.favDisabled = true;

                    setTimeout(function(){
                      _this.favDisabled = false;
                    },1500);

                  }

                  _this.payBottom = -200;
                });
              }
            })

          },

          cutStrForNum(str, num) {
            if(str.length <= num){
              return str;
            }else{
              return str.substring(0, num-1) + '...';
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

          init(){

              let _this = this;
            //- 判断登录
            Interface.userInfo(function (data) {
              var _user = data.returnJSON;

              if (Base.isNull(_user)) {
                //- 未登录
                _this.login = false;
              } else {
                _this.user = _user;
                _this.login = true;
              }
            });

            //获取推荐赛事
            Interface.recommendMatchInfo(function (data) {
//                console.log(data);
              if(data){
                if(!Base.isNull(data.returnJSON)){
                  _this.recommend = data.returnJSON;
                }else{
                  _this.noRecommend = true;
                }
              }else{
                _this.noRecommend = true;
              }
            })

            //获取当前比赛信息和赔率
            Interface.matchInfo(_this.matchID, function (data) {

              var _tmp = data.returnJSON;

//                var _temp = JSON.stringify(data.returnJSON.rateObject.returnJSON);
//
//                console.log(_temp);
//
//                _tmp.rateObject = JSON.parse(_temp);

              _tmp.rateObject.selected = 0;

              if(_tmp.weekOfDay == 0){
                _tmp.weekOfDay = '日';
              }if(_tmp.weekOfDay == 1){
                _tmp.weekOfDay = '一';
              }if(_tmp.weekOfDay == 2){
                _tmp.weekOfDay = '二';
              }if(_tmp.weekOfDay == 3){
                _tmp.weekOfDay = '三';
              }if(_tmp.weekOfDay == 4){
                _tmp.weekOfDay = '四';
              }if(_tmp.weekOfDay == 5){
                _tmp.weekOfDay = '五';
              }if(_tmp.weekOfDay == 6){
                _tmp.weekOfDay = '六';
              }

              var _now = new Date().getTime();
              var _timer = Math.round((_this.stringToDate(_tmp.matchTime).getTime() - _now) / 1000) - 300;


              if(_timer< 0){
                //封盘中
                _this.frost = true;
              }else{
                _this.frost = false;
              }

              _this.match = _tmp;

              setTimeout( ()=> {
                _this.fullscreenLoading = false;
                window.scrollTo(0,1);
              },100);

//                console.log(_this.match);
            });

            Interface.newsListByMatch(_this.page, _this.pageSize, _this.matchID, function (data) {
              _this.matchList = data.returnJSON.indexData;

              _this.totleCount = data.returnJSON.totalResult;

              if (_this.matchList.length == 0) {
                _this.empty = true;
              } else {
                _this.empty = false;
              }

//                console.log(_this.matchList);
            });

          },

        },

        mounted(){

          var _this = this;

          _this.showBuySuccess = false;

          var _matchID = this.$route.params.matchID;

          if (Base.isNull(_matchID)) {
            _this.$message({
              type: 'error',
              message: '缺少比赛ID',
              duration: 1500
            });
            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,1);
            },100);
            return false;
          }

          _this.matchID = _matchID;

          _this.init();


        },

      watch: {
        '$route' (to, from) {

          var _this = this;

          _this.showBuySuccess = false;

          var _matchID = to.params.matchID;

          if (Base.isNull(_matchID)) {
            _this.$message({
              type: 'error',
              message: '缺少比赛ID',
              duration: 1500
            });
            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,1);
            },100);
            return false;
          }

          _this.matchID = _matchID;

          _this.init();
//
//            console.log(to);
//            console.log(from);

        }
      }

    }

</script>
