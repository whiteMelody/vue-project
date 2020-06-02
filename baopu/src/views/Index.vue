<template>
  <div id="index_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <!--引导弹窗-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showMsg == true" @click="showMsg = false; showMsg2 = true;"></div>
    <div class="wb100 fixed Fwhite F16 text-center" @click="showMsg = false; showMsg2 = true;" v-show="showMsg == true" style="top: 420px; right: 0; left: 0; bottom: 0; margin: auto; width: 100%; height: 100%; z-index: 9999;">
      <div class="pa15">

        <img src="~@/assets/images/img-btn1.png" class="h50px">

        <div class="clear h50px"></div>

        <img src="~@/assets/images/info-msg1.png" class="wb100">
      </div>
    </div>

    <!--引导弹窗2-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showMsg2 == true" @click="overInfoMsg"></div>
    <div class="wb100 fixed Fwhite F16 text-center" @click="overInfoMsg" v-show="showMsg2 == true" style="top: 46%; right: 0; left: 0; bottom: 0; margin: auto; width: 100%; height: 100%; z-index: 9999;">
      <div class="pa15">
        <img src="~@/assets/images/info-msg2.png" class="wb55 fr" style="margin-right: 15%;">

        <div class="clear h50px"></div>

        <img src="~@/assets/images/img-btn2.png" class="h50px">

      </div>
    </div>

    <!--领取红包弹窗-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showGetRedBag == true" @click="showGetRedBag = false"></div>
    <div class="fixed Fwhite F16 text-center" v-show="showGetRedBag == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; width: 270px; height: 356px; z-index: 9999;">
      <router-link :to="{ name:'Login', params: {call: true, getRedBag: true } }">
        <img src="~@/assets/images/hb.png" class="w270px">
        <p class="Fwhite absolute w200px h40px F18" style="bottom: 40px; left: 0; right: 0;  margin: 0 auto;">恭喜您获得<span class="Fyellow Fnum">1</span>个红包!</p>
      </router-link>
    </div>

    <!--领取红包成功弹窗-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showGetRedBagSuccess == true" @click="closeGetRedBagSuccess(0)"></div>
    <template v-if="newsRedBag.length == 1">
      <div class="fixed Fwhite F16 text-center" v-show="showGetRedBagSuccess == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto;width: 270px;  height: 359px; z-index: 9999;">
        <img src="~@/assets/images/active-hb.png" class="w270px">
        <p class="Fwhite absolute w200px h40px F18" style="top: 175px; left: 0; right: 0;  margin: 0 auto;">恭喜您获得<span class="Fyellow Fnum"> {{ newsRedBag[0].faceValue }} 金币</span>红包</p>
        <p class="Fwhite absolute w200px h40px F16" style="top: 205px; left: 0; right: 0;  margin: 0 auto;">快去参与竞猜吧~</p>
        <p class="Fwhite absolute w200px h40px F14" style="top: 245px; left: 0; right: 0;  margin: 0 auto;">大家都在竞猜</p>

        <div class="Fwhite absolute w200px h40px F14" style="top: 270px; left: 0; right: 0;  margin: 0 auto;">

          <!--<router-link :to="{ name: 'SoccerDetailBet', params:{ matchID: recommend.matchID } }">-->
            <div class=" h60px lh15px center pa10 warpper-white text-center Fblack radius5" v-if="noRecommend == false" @click="closeGetRedBagSuccess(1)">
              <div class="w70px fl">
                <img :src="recommend.homeTeamLogo" class="w30px h30px mat5">
                <p class="mat10 wb100 h15px lh15px text-over-hidden1 F14">{{cutStrForNum(recommend.homeTeam,5)}}</p>
              </div>
              <div class="w30px fl">
                <img src="~@/assets/images/icon-vs2.png" class="h16px " style="margin-top: 13px">
              </div>
              <div class="w70px fl">
                <img :src="recommend.visitingTeamLogo" class="w30px h30px mat5">
                <p class="mat10 wb100 h15px lh15px text-over-hidden1 F14">{{cutStrForNum(recommend.visitingTeam,5)}}</p>
              </div>
            </div>
          <!--</router-link>-->
        </div>

      </div>
    </template>
    <template v-if="newsRedBag.length > 1">
      <div class="fixed Fwhite F16 text-center" v-show="showGetRedBagSuccess == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; background: #f84629; width: 300px; height: 400px; z-index: 9999;">

        <div class="pa15">

          <div class="wb100 img-area relative">
            <img src="~@/assets/images/bg-color-bar.png">
            <p class="h75px lh75px text-center absolute wb100 F18" style="top: 0; left: 0;">恭喜你获得 <span class="Fyellow Fnum F18">{{newsRedBag.length}}</span> 个红包</p>
          </div>

          <div class="clear1"></div>

          <div class="wb100">

            <div class="wb100 img-area relative" style=" width: 100%; height: 275px; overflow: auto;">

              <p class="Fgray-3 F14 lh20px text-center wb100" style="position: absolute; top: 25px; left: 0;">红包已放入账户中，请在【我的】查看</p>
              <img src="~@/assets/images/bg-red-bag-list.png">

              <div style="position: absolute; top: 35px; left: 0; width: 100%;">
                <div class="pa15" :style="'height: '+ newsRedBag.length * 105 +'px;'">
                  <template v-for="(item,key) in newsRedBag">

                    <div class="clear1"></div>

                    <div class="pa15 relative warpper-white">

                      <div class="w70px h40px lh40px fl text-center Forange-6 Fwhite pat10 pab10 F14 radius5  bor-dashed-1r bor-gray">

                        <span class="Fnum" style=" font-size: 40px">{{item.faceValue}}</span>
                        <span class="F20">元</span>
                      </div>
                      <div class="w120px fr lh25px pat10 Fgray-3">
                        <p class="F18">满<span class="Fnum">{{item.limit}}</span>可用</p>
                        <p class="F12 Fgray-2 text-over-hidden1">有效期至<span class="Fnum">{{item.endTime}}</span></p>
                      </div>

                      <div class="clear"></div>

                    </div>

                    <div class="clear"></div>

                  </template>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </template>

    <!--购买成功弹窗-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showBuySuccess == true" @click="closeBuySuccess"></div>
    <div class="w270px h250px fixed Fwhite F16 text-center" v-show="showBuySuccess == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 9999;">
      <img src="~@/assets/images/buy-success.png" class="w130px absolute" style="top: 0; left: 0; right: 0; margin: 0 auto; z-index: 99999; width: 134px;">
      <img src="~@/assets/images/buy-success-shadow.png" class="w270px rotater absolute" :style="'top: -77px; left: -7px; z-index: 9999;transform:rotate('+ angle +'deg);'">
      <div class="clear h130px"></div>
      <div class="wb100">
        <p class="F20 lh40px">竞猜成功</p>
        <p class="lh20px">预计收益<span class="Fgreen-2 Fnum">{{ buyOdd != 0 ? buyOdd : getOdd()[1]}}</span>金币</p>

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

    <!--投注弹窗-->
    <div class="dialogBg" style="z-index: 99; background: none;" v-show="payBottom == 0" @click="payBottom = -650"></div>
    <div class="wb100 warpper-black-4 fixed h200px myTransition dialogShadow" :style=" payBottom == 0 ? 'transition-duration: .3s; -moz-transition-duration: .3s; -webkit-transition-duration: .3s; -o-transition-duration: .3s; bottom: '+ payBottom +'px; z-index:999;' : 'transition-duration: .6s; -moz-transition-duration: .6s; -webkit-transition-duration: .6s; -o-transition-duration: .6s; bottom: '+ payBottom +'px; z-index:999;' ">

      <div class="clear1"></div>

      <template v-if="showSelected">

        <div class="wb100 warpper-black-3 Fgray-5 absolute" :style="'top: -'+ (selectMatchs.length + 2) * 45  +'px;'" v-if="selectMatchs.length > 1">
          <p class="pal15 par15 lh45px Fgray-6">
            <span class="fl">投注列表</span>
            <span class="fr" @click="clearSelectMatch">
                        <img src="~@/assets/images/icon-clear-all.png" class="fl h25px mat10 mar5">
                        清空
                    </span>
          </p>

          <div class="clear bor-black3 bor-solid-1b"></div>

          <div class="pal15 lh45px F14">
            <template v-for="item in selectMatchs">
              <p class="h45px lh45px text-over-hidden1 relative par50">
                {{item.homeTeam}} VS {{item.visitingTeam}}
                <span class="Fgray-6" v-if="item.selected == 1">主胜 <span class="Fnum">({{item.rateList[0].win}})</span></span>
                <span class="Fgray-6" v-if="item.selected == 2">平 <span class="Fnum">({{item.rateList[0].tie}})</span></span>
                <span class="Fgray-6" v-if="item.selected == 3">客胜 <span class="Fnum">({{item.rateList[0].lose}})</span></span>
                <span class="Fgray-6" v-if="item.selected == 4">主胜 <template v-if="item.letBall >0">+</template> {{item.letBall}} <span class="Fnum">({{item.rateList[item.rateList.length-1].win}})</span></span>
                <span class="Fgray-6" v-if="item.selected == 5">平 <span class="Fnum">({{item.rateList[item.rateList.length-1].tie}})</span></span>
                <span class="Fgray-6" v-if="item.selected == 6">客胜 <template v-if="item.letBall >0">+</template> {{item.letBall}} <span class="Fnum">({{item.rateList[item.rateList.length-1].lose}})</span></span>

                <span class="display-inline h45px w30px pal15 absolute" style="top: 0; right: 0;" @click="removeSelectMatch(item.matchID)">
                                <img src="~@/assets/images/icon-close-btn.png" class="h15px">
                            </span>

              </p>
              <div class="clear bor-black3 bor-solid-1b"></div>
            </template>
          </div>

          <p class="pal15 par15 h45px lh45px F14 Fgray-6 text-over-hidden1">
            *总回报率(最大)＝
            <template v-for="(item,key) in selectMatchs">
              <template v-if="key < selectMatchs.length - 1">
                <span class="Fnum" v-if="item.selected == 1">{{item.rateList[0].win}} ×</span>
                <span class="Fnum" v-if="item.selected == 2">{{item.rateList[0].tie}} ×</span>
                <span class="Fnum" v-if="item.selected == 3">{{item.rateList[0].lose}} ×</span>
                <span class="Fnum" v-if="item.selected == 4">{{item.rateList[item.rateList.length-1].win}} ×</span>
                <span class="Fnum" v-if="item.selected == 5">{{item.rateList[item.rateList.length-1].tie}} ×</span>
                <span class="Fnum" v-if="item.selected == 6">{{item.rateList[item.rateList.length-1].lose}} ×</span>
              </template>
              <template v-else>
                <span class="Fnum" v-if="item.selected == 1">{{item.rateList[0].win}}</span>
                <span class="Fnum" v-if="item.selected == 2">{{item.rateList[0].tie}}</span>
                <span class="Fnum" v-if="item.selected == 3">{{item.rateList[0].lose}}</span>
                <span class="Fnum" v-if="item.selected == 4">{{item.rateList[item.rateList.length-1].win}}</span>
                <span class="Fnum" v-if="item.selected == 5">{{item.rateList[item.rateList.length-1].tie}}</span>
                <span class="Fnum" v-if="item.selected == 6">{{item.rateList[item.rateList.length-1].lose}}</span>
              </template>
            </template>
          </p>

        </div>

      </template>

      <p class="lh20px pal15 par15 F14 Fgray-5 relative">
        <span class="fl par10 mar10 Forange-2 display-inline bor-black3 bor-solid-1r" v-if="selectNum == 1">单场</span>
        <span class="fl par10 mar10 Forange-2 display-inline bor-black3 bor-solid-1r" v-else-if="selectNum > 1" @click="showSelected = !showSelected">
                <img src="~@/assets/images/arrow-up-orange.png" class="w10px absolute" style="top: -6px; left: 25px;" v-if="showSelected == false">
                <img src="~@/assets/images/arrow-down-orange.png" class="w10px absolute" style="top: -6px; left: 25px;" v-if="showSelected == true">
                {{selectNum}}串1
            </span>

        <span class="fl">猜对可赢<span class="Fnum Forange-2">{{ twoDecimal(odds * money)}}</span>金币</span>
        <span class="fr">余额：<span class="Fnum">{{user.coinsQty}}</span>金币</span>
      </p>

      <div class="clear1"></div>

      <div class="pal15 par15 myInput">
        <el-input-number v-model="money"  :min="1" :max="maxNum"></el-input-number>
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

    <!--更多菜单弹窗-->
    <div class="dialogBg" style="z-index: 99999" v-show="showUserMeun == true" @click="showUserMeun = false"></div>
    <div class="w150px absolute lh50px Fwhite F16 warpper-black-3" v-show="showUserMeun == true" style="top: 50px; right: 0; z-index: 999999;">
      <template v-if="login == true">

        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'UserTicketAll' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu2.png" class="fl h16px" style="margin-top: 17px;"></span>
            我的竞猜
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'UserFav' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu7.png" class="fl h16px" style="margin-top: 17px;"></span>
            我的关注
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'UserBought' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu8.png" class="fl h16px" style="margin-top: 17px;"></span>
            已购方案
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'UserRedBag' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu3.png" class="fl h15px" style="margin-top: 18px;"></span>
            我的红包
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'DealAll' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu4.png" class="fl h16px" style="margin-top: 17px;"></span>
            账户明细
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'Store' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu5.png" class="fl" style="margin-top: 18px; height: 14px;"></span>
            金币商城
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>

        <router-link :to="{ name:'Login', params: { call: true, callUrl: 'Index'} } ">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-logout.png" class="fl h16px" style="margin-top: 17px;"></span>
            切换账户
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
      </template>
      <template v-if="login == false">

        <div class="clear bor-black3 bor-solid-1b"></div>

        <router-link :to="{ name:'Login', params: { call: true, callUrl: 'DealAll'} } ">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu2.png" class="fl h16px" style="margin-top: 17px;"></span>
            我的竞猜
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'Login', params: { call: true, callUrl: 'UserTicketAll'} } ">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu7.png" class="fl h16px" style="margin-top: 17px;"></span>
            我的关注
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'Login', params: { call: true, callUrl: 'UserBought'} } ">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu8.png" class="fl h16px" style="margin-top: 17px;"></span>
            已购方案
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'Login', params: { call: true, callUrl: 'UserRedBag'} } ">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu3.png" class="fl h15px" style="margin-top: 18px;"></span>
            我的红包
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>

        <router-link :to="{ name:'Login', params: { call: true, callUrl: 'DealAll'} } ">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu4.png" class="fl h16px" style="margin-top: 17px;"></span>
            账户明细
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'Store' } ">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu5.png" class="fl" style="margin-top: 18px; height: 14px;"></span>
            金币商城
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
      </template>

    </div>

    <div class="wb100">

      <div class="h50px lh50px pal15 relative warpper-black-3" :style="showUserMeun ? 'z-index: 999999': 'z-index: 9'">

        <template v-if="isWeiXin == true">
          <router-link :to="{ name:'WxRecharge' } ">
            <div class="w170px h30px radius15 warpper-black-4 absolute" style="top:10px">
              <div class="pal10 fl" style="margin-top: -8px">
                <img src="~@/assets/images/jb_sy.png" class="w15px">
              </div>
              <p class="Fwhite h30px lh30px fl mal10 Fnum" style="margin-top: 1px">{{user.coinsQty}}</p>
              <div class="fr " style="margin-top: -7px;padding-right: 6px">
                <img src="~@/assets/images/cz_sy.png" class="w18px">
              </div>
            </div>
          </router-link>
        </template>

        <template v-else>
          <router-link :to="{ name:'Recharge' } ">
            <div class="w170px h30px radius15 warpper-black-4 absolute" style="top:10px">
              <div class="pal10 fl" style="margin-top: -8px">
                <img src="~@/assets/images/jb_sy.png" class="w15px">
              </div>
              <p class="Fwhite h30px lh30px fl mal10 Fnum" style="margin-top: 1px">{{user.coinsQty}}</p>
              <div class="fr " style="margin-top: -7px;padding-right: 6px">
                <img src="~@/assets/images/cz_sy.png" class="w18px">
              </div>
            </div>
          </router-link>
        </template>

        <div class="w70px h50px absolute text-center warpper-black-3 bor-black3 bor-solid-1l" @click="showUserMeun = !showUserMeun" style="top: 0; right: 0; z-index: 20;">
          <img :src="user.photoUrl ? user.photoUrl : userHead" class="w20px fl mal15 mat15">
          <img src="~@/assets/images/shape_down_gr2.png" class="h8px" v-show="showUserMeun == false">
          <img src="~@/assets/images/shape_up_gr2.png" class="h8px" v-show="showUserMeun == true">
        </div>

      </div>

      <div class="clear"></div>

      <!--banner-->
      <template v-if="bannerLength == 0">
        <div></div>
      </template>

      <template v-else-if="bannerLength == 1">
        <div class="wb100" v-for="item in banner">
          <a :href="item.linkUrl" >
            <div class="wb100 img-area" :style="'width:'+_width+'px; height:'+_height+'px;'">
              <!--<img :src="item.imgUrl + '?x-oss-process=image/resize,m_fixed,h_'+_height * 2 +',w_'+_width * 2" />-->
              <img :src="item.imgUrl" />
            </div>
          </a>
        </div>
      </template>

      <template v-else="bannerLength > 1">
        <el-carousel :height="_height + 'px'" ref="carousel" :interval="5000">
          <el-carousel-item v-for="(item,index) in banner" :key="index">
            <a :href="item.linkUrl" @touchstart="moveStart" @touchend="moveEnd">
              <div class="wb100 img-area" :style="'width:'+_width+'px; height:'+_height+'px;'">
                <!--<img :src="item.imgUrl + '?x-oss-process=image/resize,m_fixed,h_'+_height * 2 +',w_'+_width * 2" />-->
                <img :src="item.imgUrl" />
              </div>
            </a>
          </el-carousel-item>
        </el-carousel>
      </template>

      <!--小喇叭-->
      <!--<div class="wb100">-->

        <!--<div class="pal50 pat15 pab15 par15 h20px lh20px Fgray-5 relative warpper-black-3">-->
          <!--<img src="~@/assets/images/icon-notice.png" class="h20px absolute" style="top: 15px; left: 15px;">-->
          <!--<div class="wb100 over-hidden">-->
            <!--<div :style="'margin-left: '+ marginLeft +'px; transition-duration: '+ marginTime +'s; -moz-transition-duration: '+ marginTime +'s; -webkit-transition-duration: '+ marginTime +'s; -o-transition-duration: '+ marginTime +'s; width:999999999px'" class="myTransition">-->
              <!--{{noticeText}}-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

      <!--</div>-->

      <div class="clear1"></div>

      <div class="wb100">

        <div class="wb100 text-center lh25px F14 warpper-black-3">
          <el-row>
            <el-col :span="6">
              <div class="wb100 pat15" style="border-top: 1px solid #743297;">
                <router-link :to="{ name:'Expert' } ">
                  <div class="wb50 center img-area">
                    <img src="~@/assets/images/icon-nav-new1.png">
                  </div>
                  <p class="Fgray-5 lh35px">达人推荐</p>
                </router-link>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="wb100 pat15" style="border-top: 1px solid #A34B00; border-left: 1px solid #1f2025; ">
                <template v-if="login == false">
                  <router-link :to="{ name:'Login', params:{ call: true, callUrl: 'UserTicketAll' } } ">
                    <div class="wb50 center img-area">
                      <img src="~@/assets/images/icon-nav-new2.png">
                    </div>
                    <p class="Fgray-5 lh35px">我的竞猜</p>
                  </router-link>
                </template>
                <template v-if="login == true">
                  <router-link :to="{ name:'UserTicketAll' } ">
                    <div class="wb50 center img-area">
                      <img src="~@/assets/images/icon-nav-new2.png">
                    </div>
                    <p class="Fgray-5 lh35px">我的竞猜</p>
                  </router-link>
                </template>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="wb100 pat15" style="border-top: 1px solid #0853B4; border-left: 1px solid #1f2025; ">
                <router-link :to="{ name:'Store' } ">
                  <div class="wb50 center img-area">
                    <img src="~@/assets/images/icon-nav-new3.png">
                  </div>
                  <p class="Fgray-5 lh35px">金币商城</p>
                </router-link>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="wb100 pat15" style="border-top: 1px solid #A83415; border-left: 1px solid #1f2025; ">

                <template v-if="isWeiXin == true">
                  <router-link :to="{ name:'WxRecharge' } ">
                    <div class="wb50 center img-area">
                      <img src="~@/assets/images/icon-nav-new4.png">
                    </div>
                    <p class="Fgray-5 lh35px">我要充值</p>
                  </router-link>
                </template>

                <template v-else>
                  <router-link :to="{ name:'Recharge' } ">
                    <div class="wb50 center img-area">
                      <img src="~@/assets/images/icon-nav-new4.png">
                    </div>
                    <p class="Fgray-5 lh35px">我要充值</p>
                  </router-link>
                </template>

              </div>
            </el-col>
          </el-row>
        </div>

      </div>


      <div class="clear h20px warpper-black-4"></div>

      <div class="wb100">
        <div class="pal15 par15 text-center">

          <div class="wb50 fl" @click="changeHot(0)">
            <div class="wb100 h45px lh45px" :class="leagueCode == 0 ? 'warpper-orange-7 Fwhite pa1' : 'bor-orange4 bor-solid-1a Forange-2' ">
              热门赛事
            </div>
          </div>
          <div class="wb50 fr" @click="changeHot(1)" >
            <div class="wb100 h45px lh45px" :class="leagueCode == 1 ? 'warpper-orange-7 Fwhite pa1' : 'bor-orange4 bor-solid-1a Forange-2'">
              全部赛事
            </div>
          </div>

        </div>
      </div>

      <div class="clear1 warpper-black-4"></div>

      <div class="wb100" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
        <div v-for="(item,key) in soccerList">
          <div class="wb100">

            <div class="pa15 Fgray-5">

              <router-link :to="{ name:'SoccerDetailBet', params:{ matchID: item.matchID } } ">
                <p class="h20px lh20px F12 relative Fgray-5">
                                <span class="fl">
                                    {{item.league}} <span class="Fnum">{{ dateFormat(item.matchTime,16)}}</span>
                                </span>

                  <span class="absolute wb20 text-center h20px lh20px Fgray-5" v-if="item.status == 3" style="left: 0; right: 0; margin: 0 auto;">已完赛</span>
                  <span class="absolute wb20 text-center h20px lh20px Fgray-5" v-if="item.status == 1" style="left: 0; right: 0; margin: 0 auto;">取消</span>
                  <span class="absolute wb20 text-center h20px lh20px Fgray-5" v-if="item.status == 4" style="left: 0; right: 0; margin: 0 auto;">比赛待定</span>
                  <span class="absolute wb20 text-center h20px lh20px Fgray-5" v-if="item.status == 5" style="left: 0; right: 0; margin: 0 auto;">比赛待定</span>
                  <span class="absolute wb20 text-center h20px lh20px Fgray-5" v-if="item.status == 6" style="left: 0; right: 0; margin: 0 auto;">比赛待定</span>
                  <span class="absolute wb20 text-center h20px lh20px Fgray-5" v-if="item.status == 7" style="left: 0; right: 0; margin: 0 auto;">比赛待定</span>
                  <span class="absolute w80px text-center h20px lh20px Forange-2 F14" v-if="item.status == 2" style="left: 0; right: 0; margin: 0 auto;">

                                    <template v-if="item.matchMinute < 45">
                                        进行中 {{item.matchMinute}}'
                                    </template>
                                    <template v-if="item.matchMinute == 45">
                                        <template v-if="item.matchMinuteExtra == 0">
                                            进行中 45'
                                        </template>
                                        <template v-if="item.matchMinuteExtra != 0">
                                            进行中 45+'
                                        </template>
                                    </template>

                                    <template v-if="item.matchMinute > 45 && item.matchMinute < 90">
                                        进行中 {{item.matchMinute}}'
                                    </template>

                                    <template v-if="item.matchMinute == 90">
                                        <template v-if="item.matchMinuteExtra == 0">
                                            进行中 90'
                                        </template>
                                        <template v-if="item.matchMinuteExtra != 0">
                                            进行中 90+'
                                        </template>
                                    </template>

                                </span>

                  <span class="absolute wb20 text-center h20px lh20px" v-if="item.status == 0 && item.frost" style="left: 0; right: 0; margin: 0 auto;">
                                    封盘中
                                </span>

                  <!--暂时取消-->
                  <span class="fr Fgray-2">
                                   <!--<span class="Fnum Fgreen">{{item.viewCount}}</span> 人在竞猜-->
                                     <img src="~@/assets/images/arrow-right.png" class="fr h14px mal5" style="margin-top: 3px;">
                                </span>
                </p>

                <div class="clear1"></div>

                <div class="wb40 fl Fgray-5">
                  <p class="lh30px F18 ">
                    <img :src="item.homeTeamLogo" class="h30px w30px fl">
                    <span class="F16 fl mal5 ">{{cutStrForNum(item.homeTeam,5)}}</span>
                  </p>
                </div>

                <!--<div class="wb20 fl text-center" style="margin-top: 3px;">-->
                <!--<img src="~@/assets/images/icon-liked.png" v-if="item.isFaved" @click="favMatch(item,'cal')" class="h22px">-->
                <!--<img src="~@/assets/images/icon-like.png" v-else @click="favMatch(item,'fav')" class="h22px">-->
                <!--</div>-->
                <div class="wb20 fl text-center" v-if="item.status == 0">
                  <img src="~@/assets/images/icon-vs2.png" class="h18px" style="margin-top: 6px;">
                </div>

                <div class="wb20 fl text-center lh30px Fnum F18 Fgray-5" v-if="item.status == 3">
                  <p>{{item.hFullGoals}} : {{item.vFullGoals}}</p>
                </div>

                <div class="wb20 fl text-center Forange-2 lh30px Fnum F18" v-if="item.status == 2">
                  <p>{{item.hFullGoals}} : {{item.vFullGoals}}</p>
                </div>

                <div class="wb40 fl text-center Fgray-5">
                  <p class="lh30px F18 ">
                    <img :src="item.visitingTeamLogo" class="h30px w30px fr">
                    <span class="F16 fr mar5">{{cutStrForNum(item.visitingTeam,5)}}</span>
                  </p>
                </div>
              </router-link>

              <template v-for="(item2,key2) in item.rateList" v-if="item.status == 0 && item.frost == false">

                <div class="clear1" v-if="key2 == 0"></div>

                <!--胜平负-->
                <div class="pal20 relative h60px text-center bor-solid-1l bor-solid-1r bor-solid-1t bor-black2 relative warpper-black-3" style="z-index: 99;" v-if="item2.isLetBall == false">

                  <div class="h60px lh60px text-center warpper-gray-2 w20px absolute Fwhite Fnum" style="top: 0; left: 0;">
                    0
                  </div>

                  <div class="wb33333 fl" @click="selectSoccer(1, item2, item)">
                    <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="item.selected == 1">
                      <p>主胜</p>
                      <p class="Fnum">{{item2.win}}</p>
                    </div>
                    <div class="wb100 pat5 pab5 lh25px" v-else>
                      <p class="Fgray-5">主胜</p>
                      <p class="Fnum Fgray-6">{{item2.win}}</p>
                    </div>
                  </div>

                  <div class="wb33333 fl" @click="selectSoccer(2, item2, item)">
                    <div class="wb100 bor-black2 bor-solid-1l bor-solid-1r">
                      <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="item.selected == 2">
                        <p>平</p>
                        <p class="Fnum">{{item2.tie}}</p>
                      </div>
                      <div class="wb100 pat5 pab5 lh25px" v-else>
                        <p class="Fgray-5">平</p>
                        <p class="Fnum Fgray-6">{{item2.tie}}</p>
                      </div>
                    </div>
                  </div>

                  <div class="wb33333 fl" @click="selectSoccer(3, item2, item)">
                    <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="item.selected == 3">
                      <p>客胜</p>
                      <p class="Fnum">{{item2.lose}}</p>
                    </div>
                    <div class="wb100 pat5 pab5 lh25px" v-else>
                      <p class="Fgray-5">客胜</p>
                      <p class="Fnum Fgray-6">{{item2.lose}}</p>
                    </div>
                  </div>

                </div>

                <!--让球胜平负-->
                <div class="pal20 relative h60px lh60px text-center bor-black2 bor-solid-1a relative warpper-black-3" style="z-index: 99;" v-if="item2.isLetBall == true">

                  <div class="text-center warpper-red absolute Fwhite F14 Fnum" v-if="item2.letBall>0" style="top: -1px; height: 61px; line-height: 61px; left: 0px; width: 20px;">
                    +{{item2.letBall}}
                  </div>
                  <div class="text-center warpper-gray-2 absolute Fwhite Fnum" v-if="item2.letBall==0" style="top: -1px; height: 61px; line-height: 61px; left: 0px; width: 20px;">
                    {{item2.letBall}}
                  </div>
                  <div class="text-center warpper-blue absolute Fwhite Fnum" v-if="item2.letBall<0" style="top: -1px; height: 61px; line-height: 61px; left: 0px; width: 20px;">
                    {{item2.letBall}}
                  </div>

                  <div class="wb33333 fl" @click="selectSoccer(4, item2, item)">
                    <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="item.selected == 4">
                      <p>主胜</p>
                      <p class="Fnum">{{item2.win}}</p>
                    </div>
                    <div class="wb100 pat5 pab5 lh25px Fwhite" v-else>
                      <p class="Fgray-5">主胜</p>
                      <p class="Fnum Fgray-6">{{item2.win}}</p>
                    </div>
                  </div>

                  <div class="wb33333 fl" @click="selectSoccer(5, item2, item)">
                    <div class="wb100 bor-black2 bor-solid-1l bor-solid-1r">
                      <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="item.selected == 5">
                        <p>平</p>
                        <p class="Fnum">{{item2.tie}}</p>
                      </div>
                      <div class="wb100 pat5 pab5 lh25px Fwhite" v-else>
                        <p class="Fgray-5">平</p>
                        <p class="Fnum Fgray-6">{{item2.tie}}</p>
                      </div>
                    </div>
                  </div>

                  <div class="wb33333 fl" @click="selectSoccer(6, item2, item)">
                    <div class="wb100 warpper-orange-7 pat5 pab5 lh25px Fwhite" v-if="item.selected == 6">
                      <p>客胜</p>
                      <p class="Fnum">{{item2.lose}}</p>
                    </div>
                    <div class="wb100 pat5 pab5 lh25px Fwhite" v-else>
                      <p class="Fgray-5">客胜</p>
                      <p class="Fnum Fgray-6">{{item2.lose}}</p>
                    </div>
                  </div>

                </div>

              </template>

              <div class="clear"></div>

            </div>

          </div>

          <div class="clear1"></div>

        </div>

        <div class="clear"></div>

        <template v-if="last == true">
          <div class="wb100">
            <div class="text-center warpper-black-4 Fgray-6 h40px lh40px center w120px F14" >
              <span class="fl mal10">暂无更多数据</span>
            </div>
          </div>
        </template>
        <template v-else-if="empty == true">
          <div class="wb100 text-center">
            <div class="clear1"></div>
            <!--<img src="~@/assets/images/kb_gc.png"  class="wb25 center mat50">-->
            <p class="Fgray-6 F16 lh25px h25px">没有比赛记录</p>
          </div>
        </template>
        <template v-else>
          <div class="wb100" v-show="loading">
            <div class="text-center warpper-black-4 Fgray-6 h40px lh40px center w120px F14">
              <img src="~@/assets/images/loading-2.gif" class="h20px fl mat10">
              <span class="fl mal10">数据加载中...</span>
            </div>
          </div>
        </template>

      </div>

    </div>

    <template v-if="payBottom == 0">
      <div class="clear h200px"></div>
    </template>

    <!--<statistics></statistics>-->

  </div>
</template>

<style>
  .dialogShadow{
    box-shadow: 0 8px 4px rgba(0,0,0,0.5) inset;
  }

  .Forange-5{ color: #D53738;}
  .Forange-6{ color: #f84629;}

  .warpper-yellow-7{ background:#FEEE4E }
</style>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  import userDefault from '../assets/images/head-img1.png'

  export default{

    props: {},

    data (){
      return {
        fullscreenLoading: true,
        _width: 0,
        _width2: 0,
        _height: 0,
        _height2: 0,
        startX: 0,
        endX: 0,
        active: 1,
        userHead: userDefault,
        searchKey: 0,
        selectNum: 0,
        leagueType: 0,
        leagueCode: 0,
        rotateTimer: 0,
        noticeTimer: 0,
        marginTime: 0,
        marginLeft: 0,
        angle: 0,
        odds: 0,
        buyOdd: 0,
        isWeiXin: false,
        showUserMeun: false,
        showSelected: false,
        showGetRedBag: false,
        showGetRedBagSuccess: false,
        showBuySuccess: false,
        showMsg: false,
        showMsg2: false,
        noRecommend: false,
        login: false,
        loading: true,
        empty: false,
        last: false,
        showSearch: false,
        payBottom: -650,
        orderID: '',
        page: 0,
        pageSize: 20,
        totleCount: 0,
        money: 10,
        redBagList: 0,
        moneys: [2, 5, 10, 20, 50],
        currentItem: {},
        user: {
          photoUrl: '',
          coinsQty: 0
        },
        noticeText: '恭喜【王**】中奖100.56金币',
        banner: [],
        currentSelect: {},
        recommend: {
          homeTeam: '',
          visitingTeam:''
        },
        soccerList: [],
        selectMatchs: [],
        hotList: [],
        matchList: [],
        newsRedBag: [],
        favDisabled: false,
        maxNum: 1000,
        bannerLength:'',
      }
    },

    methods: {
      moveStart(e) {
        var _this = this;
        _this.startX = e.changedTouches[0].clientX || e.changedTouches[0].pageX;
      },
      moveEnd(e) {
        var _this = this;
        _this.endX = e.changedTouches[0].clientX || e.changedTouches[0].pageX;
        var _result = _this.startX - _this.endX;

        if (_result >= 50) {
          this.$refs.carousel.next();
        }
        if (_result < -50) {
          this.$refs.carousel.prev();
        }
      },
      dateFormat(date, index) {
        if(Base.isNull(date))
          return '';
        return date.substring(5, index);
      },

      closeGetRedBagSuccess(val){
          this.showGetRedBagSuccess = false;

          Base.setCookie('newsRedBag', null);

          if(val == 1){
              this.$router.push({ name: 'SoccerDetailBet', params:{ matchID: this.recommend.matchID } });
          }


      },

      overInfoMsg() {
        this.showMsg = false;
        this.showMsg2 = false;
        this.showGetRedBag = true;

        Base.setCookie('isInfoEd',true);
      },

      changeHot(key) {
        this.soccerList = [];
        this.leagueCode = key;
        this.page = 0;
        this.pageSize = 20;
        this.last = false;
        this.empty = false;
        this.getData();
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

      selectSoccer(val, item, match) {

        var _this = this;
        var odd = 0;
        var _tmp = [];

        if(match.selected == val){
          match.selected = 0;
        }else{
          match.selected = val;
        }

        for (var i = 0; i < _this.soccerList.length; i++) {
          if(_this.soccerList[i].selected !=0){
            _tmp.push(_this.soccerList[i]);
          }
        }

        //判断购买弹窗显示

        if(_tmp.length > 6){
          _this.$message({
            type: 'error',
            message: '串关最多选择6场',
            duration: 1500
          });

          _this.favDisabled = true;

          setTimeout(function(){
            _this.favDisabled = false;
          },1500);

          match.selected = 0;

          _tmp.pop();

        }else{
          if(_tmp.length == 0){
            _this.payBottom = -650;
          }else{
            _this.payBottom = 0;
          }
        }

        //-

        for(var i=0; i<_tmp.length; i++){
          var _item = _tmp[i];

          if(_item.selected == 1){
            odd += _item.rateList[0].win;
          }
          if(_item.selected == 2){
            odd += _item.rateList[0].tie;
          }
          if(_item.selected == 3){
            odd += _item.rateList[0].lose;
          }
          if(_item.selected == 4){
            odd += _item.rateList[_item.rateList.length - 1].win;
          }
          if(_item.selected == 5){
            odd += _item.rateList[_item.rateList.length - 1].tie;
          }
          if(_item.selected == 6){
            odd += _item.rateList[_item.rateList.length - 1].lose;
          }

        }

        _this.odds = odd;

        _this.selectNum = _tmp.length;

        console.log(_tmp);

        _this.selectMatchs = _tmp;

      },

      getOdd() {

        var _this = this;

        var _num = 0;

        var _item = {};

        for(var i=0; i<_this.selectMatchs.length; i++){

          _item = _this.selectMatchs[i];

          var _tmp = 0;

          if(_item.selected == 1){
            _tmp = _item.rateList[0].win;
          }if(_item.selected == 2){
            _tmp = _item.rateList[0].tie;
          }if(_item.selected == 3){
            _tmp = _item.rateList[0].lose;
          }if(_item.selected == 4){
            _tmp = _item.rateList[_item.rateList.length-1].win;
          }if(_item.selected == 5){
            _tmp = _item.rateList[_item.rateList.length-1].tie;
          }if(_item.selected == 6){
            _tmp = _item.rateList[_item.rateList.length-1].lose;
          }

          if(_num == 0){
            _num = _tmp;
          }else{
            _num *= _tmp;
          }

        }

        return [_this.twoDecimal(_num), _this.twoDecimal(_num * _this.money)];
      },

      removeSelectMatch(matchID) {
        var _this = this;

        for (var i = 0; i < _this.soccerList.length; i++) {
          if(matchID == _this.soccerList[i].matchID){
            _this.soccerList[i].selected = 0;
            break;
          }
        }

        for(var j=0; j<_this.selectMatchs.length; j++){
          if(matchID == _this.selectMatchs[j].matchID){
            _this.selectMatchs.splice(j,1);
            break;
          }
        }

        _this.selectNum = _this.selectMatchs.length

      },

      clearSelectMatch() {
        var _this = this;
        for (var i = 0; i < _this.soccerList.length; i++) {
          _this.soccerList[i].selected = 0;
        }
        _this.selectMatchs = [];
        _this.showSelected = false;
        _this.payBottom = -650;
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

      favMatch(item, type) {

        if (type == 'fav') {
          //关注

          Interface.foucsMatch(item.matchID, function (data) {
            if (data) {
              console.log(data);
              item.isFaved = true;
            }
          });
        }
        if (type == 'cal') {
          //取消关注
          Interface.cancelFoucsMatch(item.matchID, function (data) {
            if (data) {
              console.log(data);
              item.isFaved = false;
            }
          });
        }
      },

      submitOrder() {
        var _this = this;

        if(_this.favDisabled)
          return;

        //获取当前选择的比赛

        var _matchList = [];

        var _odd = 0;
        var _item = {};

        for(var i=0; i<_this.selectMatchs.length; i++){

          _item = _this.selectMatchs[i];

          if(_item.selected == 1){
            _odd = _item.rateList[0].win;
          }if(_item.selected == 2){
            _odd = _item.rateList[0].tie;
          }if(_item.selected == 3){
            _odd = _item.rateList[0].lose;
          }if(_item.selected == 4){
            _odd = _item.rateList[_item.rateList.length-1].win;
          }if(_item.selected == 5){
            _odd = _item.rateList[_item.rateList.length-1].tie;
          }if(_item.selected == 6){
            _odd = _item.rateList[_item.rateList.length-1].lose;
          }

          _matchList.push({
            matchID: _item.matchID,
            matchName: _item.homeTeam + ' VS ' + _item.visitingTeam,
            odds: _odd,
            lotType: _item.selected <= 3 ? 0 : 1,
            anteValue: _item.selected <= 3 ? _item.selected - 1 : _item.selected - 4
          })

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

        //判断用户登录状态
        var _user = Base.getCookie('userInfo');

        if (Base.isNull(_user)) {
          //前去登录
          _this.$router.push({ name: 'Login', params:{ call: true, callUrl: 'Pay', money: _this.money, title: 'web', odds: 'web', data: 'web', uuid: 'web' } });
          Base.setCookie('unpaid',JSON.stringify(_matchList));
          return false;
        }

        //判断余额
        if (_this.user.coinsQty < _this.money) {
          //跳转到支付页面
          Base.setCookie('unpaid',JSON.stringify(_matchList));
          Base.setCookie('payMoney', _this.money);
          if(_this.isWeiXin){
            _this.$router.push({ name: 'WxPay' });
          }else{
            _this.$router.push({ name: 'Pay', query:{ money: _this.money } });
          }
          return false;
        }

        //判断可用红包
        Interface.usableCouponList(_this.money, function (data2) {

          if(data2){
            if(data2.returnJSON.length > 0 ){
              Base.setCookie('unpaid',JSON.stringify(_matchList));
              Base.setCookie('payMoney', _this.money);
              if(_this.isWeiXin){
                _this.$router.push({ name: 'WxPay' });
              }else{
                _this.$router.push({ name: 'Pay', query:{ money: _this.money } });
              }
              return false;
            }else{
              //matchID, lotType, anteValue, couponNumber, money,

              //- couponNumber money matchList

              Interface.payMatch('', _this.money, _matchList, function (data, errorMsg) {
                if (data) {

                  _this.showBuySuccess = true;

                  _this.orderID = data.returnJSON.orderID;

                  _this.rotation();
                  Base.setCookie('unpaid', null);

                  //更新用户
                  Interface.userInfo(function (user) {
                    _this.user = user.returnJSON;
                  });

                  var _num = 0;

                  for(var i=0; i<_matchList.length; i++){

                    if(_num == 0){
                      _num = _matchList[i].odds;
                    }else{
                      _num *= _matchList[i].odds;
                    }

                  }

                  _this.buyOdd = _this.twoDecimal(_this.money * _num);

                  _this.clearSelectMatch();

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

                _this.payBottom = -650;
              });
            }
          }else{
            //matchID, lotType, anteValue, couponNumber, money,
            Interface.payMatch('', _this.money, _matchList, function (data, errorMsg) {
              if (data) {

                _this.showBuySuccess = true;

                _this.orderID = data.returnJSON.orderID;

                _this.rotation();
                Base.setCookie('unpaid', null);

                //更新用户
                Interface.userInfo(function (user) {
                  _this.user = user.returnJSON;
                });


                var _num = 0;

                for(var i=0; i<_matchList.length; i++){

                  if(_num == 0){
                    _num = _matchList[i].odds;
                  }else{
                    _num *= _matchList[i].odds;
                  }

                }

                _this.buyOdd = _this.twoDecimal(_this.money * _num);

                _this.clearSelectMatch();

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

              _this.payBottom = -650;
            });
          }
        })

      },

      closeBuySuccess(){
        this.showBuySuccess = false;
        this.buyOdd = 0;
        window.clearInterval(this.rotateTimer);
      },

      rotation(){
        var _this = this;
        window.clearInterval(_this.rotateTimer);
        _this.rotateTimer = setInterval(function(){
          _this.angle += 3;
        },50);
      },

      getData() {
        var _this = this;

        _this.loading = true;

        if(_this.last || _this.empty){
          _this.loading = false;
          if(_this.page == 0){
            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,1);
            },100);
          }
          return ;
        }

        _this.page ++;

        Interface.matchListByHot(_this.page, _this.pageSize, _this.leagueCode, function (data) {

          if (data) {

            var _tmp = data.returnJSON.indexData;

            _this.totleCount = data.returnJSON.totalResult;

            for(var i=0; i<_tmp.length; i++){
              //判断比赛是否开始
              var _now = new Date().getTime();

              var _timer = Math.round((_this.stringToDate(_tmp[i].matchTime).getTime() - _now) / 1000) - 300;

//                            console.log(_this.stringToDate(_tmp[i].matchTime).getTime());

              _tmp[i].selected = 0;

              if(_timer< 0){
                //封盘中
                _tmp[i].frost = true;
              }else{
                _tmp[i].frost = false;
              }
            }

            _this.soccerList = _this.soccerList.concat(_tmp);

            _this.loading = false;

            if (data.returnJSON.indexData.length == 0) {
              if(_this.page == 1){
                _this.empty = true;
              }else{
                _this.empty = false;
                _this.last = true;
              }
            } else {
              if(data.returnJSON.indexData.length < _this.pageSize){
                _this.empty = false;
                _this.last = true;
              }
            }

          }

          if(_this.page == 1){
            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,1);
            },100);
          }

        });
      }

    },

    mounted(){
      var _this = this;

      Base.setCookie('appPay', null);

      if(Base.versions.isWeiXin){
        _this.isWeiXin = true;
      }else{
        _this.isWeiXin = false;
      }

      _this.showUserMeun = false;
      _this.showBuySuccess = false;

      _this.showSearch = false;
      _this.width = $(window).width();
      _this.height = $(window).height();
      _this._width = parseInt($(window).width());
      _this._height = parseInt(_this._width * 0.32);

      _this._height2 = Math.ceil(($(window).width() - 50) / 6);

      _this._width2 = 0;

//      setTimeout(function () {
//        //计算长度
//        for(var j=0; j<100; j++){
//          for(var i=0; i<10; i++){
//            _this.noticeText += '                 恭喜【王**】中奖100.56金币';
//          }
//        }
//        _this.marginTime = Math.ceil(_this.noticeText.length * 3 / 100);
//        _this.marginLeft = _this.noticeText.length * -3;
//      },1000)

      _this.payBottom = -650;
      _this.orderID = '';
      _this.money = 10;
      _this.redBagList = 0;
      _this.currentItem = {};

      //- 判断登录
      Interface.userInfo(function (data2) {
        var _user = data2.returnJSON;

        if (Base.isNull(_user)) {
          //- 未登录
          _this.login = false;

          //判断是否有过新手指引
          var isInfoEd = Base.getCookie('isInfoEd');

          if(Base.isNull(isInfoEd)){
            _this.showMsg = true;
            Base.setCookie('isInfoEd',true);
          }else{
            _this.showGetRedBag = true;
          }

        } else {
          _this.user = _user;
          _this.login = true;

          _this.showGetRedBag = false;
          _this.showGetRedBagSuccess = false;

          let newsRedBag = Base.getCookie('newsRedBag');

          if(!Base.isNull(newsRedBag)){
              _this.newsRedBag = JSON.parse(newsRedBag);
//              _this.newsRedBag = newsRedBag;
              _this.showGetRedBagSuccess = true;
          }else{
            _this.showGetRedBagSuccess = false;
          }

        }

        //

//获取banner

        Interface.bannerList(function (data) {

          _this.banner = data.returnJSON;

          _this.bannerLength = data.returnJSON.length;

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

        _this.changeHot(0);

        //test code

        var autoBuy = _this.$route.params.buyTicket;

//        console.log(autoBuy);

        if(!Base.isNull(autoBuy)){

          //获取上一个代付款的订单

          var _matchList = Base.getCookie('unpaid');

          _this.money = _this.$route.params.money;

          console.log(_matchList);

          if(Base.isNull(_matchList)){
            return false;
          }else{
            _matchList = JSON.parse(_matchList);

            //保留用户选择的比赛

            var _num = 0;

            for(var i=0; i<_matchList.length; i++){

              if(_num == 0){
                _num = _matchList[i].odds;
              }else{
                _num *= _matchList[i].odds;
              }

            }

            _this.buyOdd = _this.twoDecimal(_this.money * _num);

          }

          Interface.payMatch('', _this.money, _matchList, function (data, errorMsg) {
            if (data) {

              _this.showBuySuccess = true;

              _this.orderID = data.returnJSON.orderID;

              _this.rotation();

              Base.setCookie('unpaid', null);

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

            _this.payBottom = -650;
          });

        }

      });



    }

  }

</script>
