<template>

  <div id="lottery_soccer_page" class="warpper-black-4" :style="' width:100%; min-height: '+ height +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <!--登录弹窗 组件 -->
    <!-- 于 2018年2月27日11:21:40 弃用 -->
    <!-- 弃用原因：IOS兼容性问题 -->
    <!--<div class="dialogBg" style="z-index: 99999" v-show="showLogin == true" @click="showLogin = false"></div>-->
    <!--<login :show="showLogin" v-on:callback="loginSuccess"></login>-->


    <!--更多菜单弹窗-->
    <div class="dialogBg" style="z-index: 99999" v-show="showUserMeun == true" @click="showUserMeun = false"></div>
    <div class="w150px absolute lh50px Fwhite F16 warpper-black-3" v-show="showUserMeun == true" style="top: 50px; left: 0; z-index: 999999;">

        <div class="clear1"></div>

        <template v-if="isWeiXin == true">
          <router-link :to="{ name:'WxRecharge' } ">
            <div class="w130px h30px radius15 warpper-black-4 mal10 mar10 pat5 pab5">
              <div class="pal10 fl" style="margin-top: -8px">
                <img src="~@/assets/images/jb_sy.png" class="w15px">
              </div>
              <p class="Fwhite h30px lh30px fl mal10 Fnum" style="margin-top: 1px">{{user.accountBalance || 0}}</p>
              <div class="fr " style="margin-top: -7px;padding-right: 6px">
                <img src="~@/assets/images/cz_sy.png" class="w18px">
              </div>
            </div>
          </router-link>
        </template>

        <template v-else>
          <router-link :to="{ name:'Recharge' } ">
            <div class="w130px h30px radius15 warpper-black-4 mal10 mar10 pat5 pab5">
              <div class="pal10 fl" style="margin-top: -8px">
                <img src="~@/assets/images/jb_sy.png" class="w15px">
              </div>
              <p class="Fwhite h30px lh30px fl mal10 Fnum" style="margin-top: 1px">{{user.accountBalance || 0}}</p>
              <div class="fr " style="margin-top: -7px;padding-right: 6px">
                <img src="~@/assets/images/cz_sy.png" class="w18px">
              </div>
            </div>
          </router-link>
        </template>

        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'CashAliPay' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu4.png" class="fl h16px" style="margin-top: 17px;"></span>
            提现
          </p>
        </router-link>

        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'UserTicketAll' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu2.png" class="fl h16px" style="margin-top: 17px;"></span>
            竞猜记录
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
          <router-link :to="{ name:'DealAll' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu8.png" class="fl h16px" style="margin-top: 17px;"></span>
            账户明细
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>
        <router-link :to="{ name:'SafeCenter' }">
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-menu7.png" class="fl h16px" style="margin-top: 17px;"></span>
            安全中心
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>

        <!--<router-link :to="{ name:'UserRedBag' }">-->
          <!--<p class="pal15 par15 Fgray-5">-->
            <!--<span class="fl w25px"><img src="~@/assets/images/icon-menu3.png" class="fl h15px" style="margin-top: 18px;"></span>-->
            <!--我的红包-->
          <!--</p>-->
        <!--</router-link>-->
        <!--<div class="clear bor-black3 bor-solid-1b"></div>-->
        <!--<router-link :to="{ name:'DealAll' }">-->
          <!--<p class="pal15 par15 Fgray-5">-->
            <!--<span class="fl w25px"><img src="~@/assets/images/icon-menu4.png" class="fl h16px" style="margin-top: 17px;"></span>-->
            <!--账户明细-->
          <!--</p>-->
        <!--</router-link>-->
        <!--<div class="clear bor-black3 bor-solid-1b"></div>-->
        <!--<router-link :to="{ name:'Store' }">-->
          <!--<p class="pal15 par15 Fgray-5">-->
            <!--<span class="fl w25px"><img src="~@/assets/images/icon-menu5.png" class="fl" style="margin-top: 18px; height: 14px;"></span>-->
            <!--金币商城-->
          <!--</p>-->
        <!--</router-link>-->
        <!--<div class="clear bor-black3 bor-solid-1b"></div>-->

        <router-link :to="{ name:'Login', params: { call: true, callUrl: 'Index'} } ">
          <!--<p class="pal15 par15 Fgray-5" @click="showLogin = true; showUserMeun = false">-->
          <p class="pal15 par15 Fgray-5">
            <span class="fl w25px"><img src="~@/assets/images/icon-logout.png" class="fl h16px" style="margin-top: 17px;"></span>
            切换账户
          </p>
        </router-link>
        <div class="clear bor-black3 bor-solid-1b"></div>

    </div>

      <div class="wb100">

        <div class="h50px lh50px warpper-black-5 relative wb100" style="z-index: 99">
          <p class="text-center Fwhite" @click="showType = !showType">{{playType[playIndex]}} <img src="~@/assets/images/arrow-down-red.png" class="h8px"> </p>

          <router-link :to="{ name: 'Index' }">
            <div class="w50px h50px absolute" style="top: 0; left: 0; z-index: 20;">
              <img src="~@/assets/images/icon-back.png" style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;">
            </div>
          </router-link>

          <!--<template v-if="login == false">-->
            <!--<router-link :to="{ name: 'Login', params: { call: true } }">-->
              <!--&lt;!&ndash;<div class="w50px h50px absolute text-center bor-black3 bor-solid-1l" @click="showLogin = true" style="top: 0; left: 0; z-index: 20;">&ndash;&gt;-->
              <!--<div class="w50px h50px absolute text-center bor-black3 bor-solid-1l" style="top: 0; left: 0; z-index: 20;">-->
                <!--&lt;!&ndash;<img :src="user.photoUrl ? user.photoUrl : headDefault" class="w30px fl mal10 mat10">&ndash;&gt;-->
                <!--<img :src="headDefault" class="w30px fl mal10 mat10">-->
              <!--</div>-->
            <!--</router-link>-->
          <!--</template>-->

          <!--<template v-else>-->
            <!--<div class="w70px h50px absolute text-center bor-black3 bor-solid-1l" @click="showUserMeun = !showUserMeun" style="top: 0; left: 0; z-index: 20;">-->
              <!--&lt;!&ndash;<img :src="user.photoUrl ? user.photoUrl : headDefault" class="w30px fl mal10 mat10">&ndash;&gt;-->
              <!--<img :src="headDefault" class="w30px fl mal10 mat10">-->
              <!--<img src="~@/assets/images/shape_down_gr2.png" class="h8px" v-show="showUserMeun == false">-->
              <!--<img src="~@/assets/images/shape_up_gr2.png" class="h8px" v-show="showUserMeun == true">-->
            <!--</div>-->
          <!--</template>-->

          <div class="h50px w50px absolute" style="top:0; right: 0;" @click="openType">
            <img src="~@/assets/images/icon-funnel.png" class="fr h20px mat15 mar15">
          </div>

        </div>

        <!--玩法弹窗-->
        <div class="dialogBg" @click="showType = false" v-show="showType == true"></div>
        <div class="wb100 text-center warpper-black-4" v-show="showType == true" style="position: fixed; z-index: 99;">
          <div class="pal15 par15 pat15 F14 bor-black bor-solid-1t">
            <el-row :gutter="15">
              <el-col :span="8" v-for="(item,key) in playType" :key="key" class="mab15">
                <div class="wb100 h35px lh35px radius5 Fwhite-1" @click="changePlayType(key)" :class="key == playIndex ? 'warpper-orange-2' : 'warpper-black-3'">
                  {{item}}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!--选择比分弹窗-->
        <div class="dialogBg" v-show="showScore == true"></div>
        <div class="wb100" v-show="showScore == true" style="position: fixed; height: 450px; z-index: 99; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">

          <div class="pa15 F12">
            <div class="wb100 warpper-black-4 radius5 bor-black4 bor-solid-2a">

              <div class="pa15">
                <p class="text-center Fwhite-1 h20px lh20px F16">{{curSoccer.hTeam}} <span class="pal15 par15 Fnum">VS</span> {{curSoccer.vTeam}}</p>

                <div class="clear1"></div>

                <div class="wb100" style="height: 320px; overflow: scroll">
                  <div class="pal20 relative bor-black2 bor-solid-1t">
                    <div class="text-center warpper-red w20px absolute Fwhite bor-black2 bor-solid-1l" style="top: 0; left: 0; height: 152px; line-height: 152px;">
                      胜
                    </div>
                    <div class="wb100 text-center">
                      <div class="fl" v-for="(item,key) in curSoccer.winList" :class="key == curSoccer.winList.length-1 ? 'wb60' : 'wb20'">
                        <template v-if="item.isSelect == true">
                          <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                            <p class="Fwhite Fnum">{{item.val}}</p>
                            <p class="Fwhite Fnum">{{item.odds}}</p>
                          </div>
                        </template>
                        <template v-else>
                          <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                            <p class="Fwhite-1 Fnum">{{item.val}}</p>
                            <p class="Fblack-2 Fnum">{{item.odds}}</p>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>

                  <div class="clear1"></div>

                  <div class="pal20 relative bor-black2 bor-solid-1t">
                    <div class="text-center warpper-green w20px absolute Fwhite bor-black2 bor-solid-1l" style="top: 0; left: 0; height: 50px; line-height: 50px;">
                      平
                    </div>
                    <div class="wb100 text-center">
                      <div class="wb20 fl" v-for="(item,key) in curSoccer.flatList">
                        <template v-if="item.isSelect == true">
                          <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item)">
                            <p class="Fwhite Fnum">{{item.val}}</p>
                            <p class="Fwhite Fnum">{{item.odds}}</p>
                          </div>
                        </template>
                        <template v-else>
                          <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item)">
                            <p class="Fwhite-1 Fnum">{{item.val}}</p>
                            <p class="Fblack-2 Fnum">{{item.odds}}</p>
                          </div>
                        </template>
                      </div>
                    </div>

                  </div>
                  <div class="clear1"></div>

                  <div class="pal20 relative bor-black2 bor-solid-1t">
                    <div class="text-center warpper-blue w20px absolute Fwhite bor-black2 bor-solid-1l" style="top: 0; left: 0; height: 152px; line-height: 152px;">
                      负
                    </div>
                    <div class="wb100 text-center">
                      <div class="fl" v-for="(item,key) in curSoccer.lostList" :class="key == curSoccer.lostList.length-1 ? 'wb60' : 'wb20'">
                        <template v-if="item.isSelect == true">
                          <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                            <p class="Fwhite Fnum">{{item.val}}</p>
                            <p class="Fwhite Fnum">{{item.odds}}</p>
                          </div>
                        </template>
                        <template v-else>
                          <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                            <p class="Fwhite-1 Fnum">{{item.val}}</p>
                            <p class="Fblack-2 Fnum">{{item.odds}}</p>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="clear1"></div>

                <div class="wb100">
                  <div class="wb45 fl lh35px h35px warpper-black-3 bor-black2 bor-solid-1a radius5 text-center F14 Fwhite" @click="closeDialog('cancel')">
                    取消
                  </div>
                  <div class="wb45 fr lh35px h35px warpper-orange-2 pa1 radius5 text-center F14 Fwhite" @click="closeDialog('submit')">
                    确定
                  </div>
                </div>

                <div class="clear"></div>

              </div>

            </div>
          </div>

        </div>

        <!--半全场弹窗-->
        <div class="dialogBg" v-show="showDoubleResult == true"></div>
        <div class="wb100" v-show="showDoubleResult == true" style="position: fixed; height: 450px; z-index: 99; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">

          <div class="pa15 F12">
            <div class="wb100 warpper-black-4 radius5 bor-black4 bor-solid-2a">

              <div class="pa15">

                <p class="text-center Fwhite-1 h20px lh20px F16">{{curSoccer.hTeam}} <span class="pal15 par15 Fnum">VS</span> {{curSoccer.vTeam}}</p>

                <div class="clear1"></div>

                <div class="pal20 relative bor-black2 bor-solid-1t">
                  <div class="text-center warpper-purple bor-black2 bor-solid-1b bor-solid-1l w20px absolute Fwhite" style="top: 0; left: 0; height: 101px; padding-top: 51px;">
                    半全场
                  </div>

                  <div class="wb100 text-center">
                    <div class="wb33333 fl" v-for="(item,key) in curSoccer.doubleResultList">
                      <template v-if="item.isSelect == true">
                        <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                          <p class="Fwhite Fnum">{{item.val}}</p>
                          <p class="Fwhite Fnum">{{item.odds}}</p>
                        </div>
                      </template>
                      <template v-else>
                        <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                          <p class="Fwhite-1 Fnum">{{item.val}}</p>
                          <p class="Fblack-2 Fnum">{{item.odds}}</p>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="clear1"></div>

                <div class="clear1"></div>

                <div class="wb100">
                  <div class="wb45 fl lh35px h35px warpper-black-3 bor-black2 bor-solid-1a radius5 text-center F14 Fwhite" @click="closeDialog('cancel')">
                    取消
                  </div>
                  <div class="wb45 fr lh35px h35px warpper-orange-2 pa1 radius5 text-center F14 Fwhite" @click="closeDialog('submit')">
                    确定
                  </div>
                </div>

                <div class="clear"></div>

              </div>

            </div>
          </div>

        </div>

        <!--混合选择弹窗-->
        <div class="dialogBg" v-show="showMix == true"></div>
        <div class="wb100" v-show="showMix == true" style="position: fixed; height: 450px; z-index: 99; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">

          <div class="pa15">
            <div class="wb100 warpper-black-4 radius5 bor-black4 bor-solid-2a">

              <div class="pa15 F12">
                <p class="text-center Fwhite-1 h20px lh20px F16">{{curSoccer.hTeam}} <span class="pal15 par15 Fnum">VS</span> {{curSoccer.vTeam}}</p>

                <div class="clear1"></div>

                <div class="wb100" style="height: 320px; overflow: scroll">

                  <div class="relative bor-black2 bor-solid-1a">

                    <template v-if="curSoccer.disFT001 == true">
                      <!--本场比赛不支持胜平负-->
                      <!--<p>暂未开售</p>-->
                    </template>

                    <template v-else>
                      <div class="pal20 relative">
                        <div class="h50px lh50px text-center warpper-gray-2 w20px absolute Fwhite Fnum" style="top: 0; left: 0;">
                          0
                        </div>
                        <div class="wb100 text-center">
                          <div class="wb33333 fl " v-for="item in curSoccer.resultList">
                            <template v-if="item.isSelect == true">
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite Fnum">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item)">
                                <p class="Fwhite-1 Fnum">{{item.val}}</p>
                                <p class="Fblack-2 Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                          </div>
                          <div class="clear"></div>
                        </div>
                      </div>
                      <div class="clear bor-black2 bor-solid-1b"></div>
                    </template>

                    <template v-if="curSoccer.disFT006 == true">
                      <!--本场比赛不支持让球胜平负-->
                      <!--<p>暂未开售</p>-->
                    </template>

                    <template v-else>
                      <div class="pal20 relative">
                        <div class="h50px lh50px text-center warpper-red w20px absolute Fwhite Fnum" v-if="curSoccer.concede>0" style="top: 0px; left: 0;">
                          +{{curSoccer.concede}}
                        </div>
                        <div class="h50px lh50px text-center warpper-gray-2 w20px absolute Fwhite Fnum" v-if="curSoccer.concede==0" style="top: 0px; left: 0;">
                          {{curSoccer.concede}}
                        </div>
                        <div class="h50px lh50px text-center warpper-blue w20px absolute Fwhite Fnum" v-if="curSoccer.concede<0" style="top: 0px; left: 0;">
                          {{curSoccer.concede}}
                        </div>
                        <div class="wb100 text-center">
                          <div class="wb33333 fl " v-for="item in curSoccer.concedeResultList">
                            <template v-if="item.isSelect == true">
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite Fnum">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item)">
                                <p class="Fwhite-1 Fnum">{{item.val}}</p>
                                <p class="Fblack-2 Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                          </div>
                          <div class="clear"></div>
                        </div>
                      </div>
                      <div class="clear"></div>
                    </template>

                  </div>

                  <div class="clear1"></div>

                  <template v-if="curSoccer.disFT002 == true">
                    <!--本场比赛不支持比分-->
                    <!--<p>暂未开售</p>-->
                  </template>

                  <template v-else>
                    <div class="pal20 relative">
                      <div class="text-center warpper-blue w20px absolute Fwhite" style="top: 0; left: 0; height: 196px; padding-top: 162px;">
                        比分
                      </div>

                      <div class="wb100 bor-black2 bor-solid-1t">

                        <div class="wb100 text-center">
                          <div class="fl" v-for="(item,key) in curSoccer.winList" :class="key == curSoccer.winList.length-1 ? 'wb60' : 'wb20'">
                            <template v-if="item.isSelect == true">
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite Fnum">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                                <p class="Fwhite-1 Fnum">{{item.val}}</p>
                                <p class="Fblack-2 Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                          </div>
                        </div>

                      </div>
                      <div class="clear"></div>
                      <div class="wb100 relative">
                        <div class="wb100 text-center">
                          <div class="wb20 fl" v-for="(item,key) in curSoccer.flatList">
                            <template v-if="item.isSelect == true">
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite Fnum">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                                <p class="Fwhite-1 Fnum">{{item.val}}</p>
                                <p class="Fblack-2 Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                          </div>
                        </div>

                      </div>
                      <div class="clear"></div>
                      <div class="wb100 relative">

                        <div class="wb100 text-center">
                          <div class="fl" v-for="(item,key) in curSoccer.lostList" :class="key == curSoccer.lostList.length-1 ? 'wb60' : 'wb20'">
                            <template v-if="item.isSelect == true">
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite Fnum">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                                <p class="Fwhite-1 Fnum">{{item.val}}</p>
                                <p class="Fblack-2 Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                          </div>

                        </div>

                      </div>
                      <div class="clear"></div>

                    </div>
                    <div class="clear1"></div>
                  </template>

                  <template v-if="curSoccer.FT003 == true">
                    <!--本场比赛不支持总进球-->
                    <!--<p>暂未开售</p>-->
                  </template>

                  <template v-else>
                    <div class="bor-black2 bor-solid-1t bor-solid-1l pal20 relative">

                      <div class="text-center warpper-green w20px absolute Fwhite" style="top: 0; left: 0; height: 76px; padding-top: 26px;">
                        总进球
                      </div>

                      <div class="wb100 text-center">
                        <div class="wb25 fl" v-for="item in curSoccer.goalsList">
                          <template v-if="item.isSelect == true">
                            <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                              <p class="Fwhite Fnum">{{item.val}}</p>
                              <p class="Fwhite Fnum">{{item.odds}}</p>
                            </div>
                          </template>
                          <template v-else>
                            <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                              <p class="Fwhite-1 Fnum">{{item.val}}</p>
                              <p class="Fblack-2 Fnum">{{item.odds}}</p>
                            </div>
                          </template>
                        </div>
                      </div>

                      <div class="clear"></div>

                    </div>

                    <div class="clear1"></div>
                  </template>

                  <template v-if="curSoccer.FT004 == true">
                    <!--本场比赛不支持半全场胜平负-->
                    <!--<p>暂未开售</p>-->
                  </template>

                  <template v-else>
                    <div class="pal20 relative bor-black2 bor-solid-1t">
                      <div class="text-center warpper-purple bor-black2 bor-solid-1b bor-solid-1l w20px absolute Fwhite" style="top: 0; left: 0; height: 101px; padding-top: 51px;">
                        半全场
                      </div>

                      <div class="wb100 text-center">
                        <div class="wb33333 fl" v-for="(item,key) in curSoccer.doubleResultList">
                          <template v-if="item.isSelect == true">
                            <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                              <p class="Fwhite Fnum">{{item.val}}</p>
                              <p class="Fwhite Fnum">{{item.odds}}</p>
                            </div>
                          </template>
                          <template v-else>
                            <div class="h40px lh20px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                              <p class="Fwhite-1 Fnum">{{item.val}}</p>
                              <p class="Fblack-2 Fnum">{{item.odds}}</p>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="clear"></div>
                  </template>

                </div>

                <div class="clear1"></div>

                <div class="wb100">
                  <div class="wb45 fl lh35px h35px warpper-black-3 bor-black2 bor-solid-1a radius5 text-center F14 Fwhite" @click="closeDialog('cancel')">
                    取消
                  </div>
                  <div class="wb45 fr lh35px h35px warpper-orange-2 pa1 radius5 text-center F14 Fwhite" @click="closeDialog('submit')">
                    确定
                  </div>
                </div>

                <div class="clear"></div>

              </div>


            </div>
          </div>

        </div>

        <!--赛事筛选弹窗-->
        <div class="dialogBg" v-show="showSearch == true"></div>
        <div class="wb100" v-show="showSearch == true" style="position: fixed; z-index: 99; height: 530px; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">

          <div class="pa15">
            <div class="wb100 warpper-black-4 radius5 bor-black4 bor-solid-2a">

              <div class="pa15 F14" style="height: 420px;">
                <div class="clear"></div>

                <div class="wb100 text-center bor-black2 bor-solid-1a">
                  <div class="wb33333 fl">
                    <div class="wb100 h35px lh35px warpper-black-3 Fwhite-1" @click="selectMatchType('all')">
                      全选
                    </div>
                  </div>
                  <div class="wb33333 fl">
                    <div class="bor-black2 bor-solid-1l bor-solid-1r h35px lh35px warpper-black-3 Fwhite-1" @click="selectMatchType('invert')">
                      反选
                    </div>
                  </div>
                  <div class="wb33333 fl">
                    <div class="wb100 h35px lh35px warpper-black-3 Fwhite-1" @click="selectMatchType('5')">
                      仅五大联赛
                    </div>
                  </div>
                  <div class="clear"></div>
                </div>

                <div class="clear1"></div>

                <div class="wb100 text-center">
                  <el-row :gutter="15">
                    <el-col :span="8" v-for="(item,key) in matchType" :key="key" class="mab15">
                      <div class="wb100 h30px lh30px radius5 Fwhite-1" @click="item.isSelect = !item.isSelect" :class="item.isSelect ? 'warpper-orange-2 Fwhite pa1' : 'bor-black2 bor-solid-1a warpper-black-3' ">
                        {{item.val}}
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div class="clear"></div>

              </div>

              <div class="wb100">
                <div class="wb50 fl">
                  <div class="wb100 lh45px h45px warpper-black-3 bor-black2 bor-solid-1t bor-solid-1r text-center Fwhite" @click="setMatchType(false)">
                    取消
                  </div>
                </div>
                <div class="wb50 fr">
                  <div class="wb100 lh45px h45px warpper-orange-2 text-center Fwhite" @click="setMatchType(true)">
                    确定
                  </div>
                </div>
              </div>

              <div class="clear"></div>

            </div>
          </div>

        </div>

        <div class="wb100 warpper-black-3 h35px pat5 pab5">
          <div class="wb100">
            <div class="wb33333 fl text-center" v-for="(item,key) in navList">
              <template v-if="key == 1">
                <router-link :to="{ name: 'SoccerList', query:{ showMenu: true } }">
                  <div class="wb100">
                    <span class="nav" :class="current == key ? 'nav-active' : ''">{{item}}</span>
                  </div>
                </router-link>
              </template>
              <template v-else-if="key == 2">
                <!--<router-link :to="{ name: 'Soccer', query: {playIndex: key} }" >-->
                <router-link :to="{ name: 'SoccerRule' }">
                  <div class="wb100">
                    <span class="nav" :class="current == key ? 'nav-active' : ''">{{item}}</span>
                  </div>
                </router-link>
              </template>
              <template v-else>
                <router-link :to="{ name: 'Soccer' }">
                  <span class="nav" :class="current == key ? 'nav-active' : ''">{{item}}</span>
                </router-link>
              </template>
            </div>
            <div class="clear"></div>
          </div>
        </div>

        <div class="clear"></div>

        <div class="wb100" v-for="(matchs,key) in soccerList">

          <div class="pal15 par15 h45px lh45px warpper-black-6 bor-black2 bor-solid-1b">
                <span class="fl Fblack-2 Fnum">
                    {{dateFormat(matchs.day)}}({{weekFormat(matchs.weekId)}})
                    <template v-if="playIndex != 6">{{matchs.matchs.length}}场比赛可投</template>

                </span>
            <span class="Fblack-2 fr F14" @click="matchs.isShowList = !matchs.isShowList">
                    <img src="~@/assets/images/arrow-down.png" class="w15px" v-show="matchs.isShowList == false">
                    <img src="~@/assets/images/arrow-up.png" class="w15px" v-show="matchs.isShowList == true">
                </span>
          </div>

          <el-collapse-transition>
            <div v-show="matchs.isShowList">

              <div class="relative bor-black1 bor-solid-1b" v-if="item.display == true" style="padding-left: 15px; padding-right: 15px;" v-for="(item,index) in matchs.matchs">

                  <div class="clear1"></div>

                  <!--<div class="w100px text-center Fblack-2 F14 lh20px absolute" :style="msgStyle">-->
                    <!--<p>{{item.league}}</p>-->
                    <!--<p>{{item.teamId}}</p>-->
                    <!--<p>{{dateShort(item.endTime)}} 截止</p>-->
                    <!--&lt;!&ndash;<p><img src="~@/assets/images/arrow-down-white.png" class="h8px"> </p>&ndash;&gt;-->
                  <!--</div>-->

                  <div class="wb100 F14">

                    <div class="wb100 Fwhite-1 F16 text-center">

                      <p class="Fblack-2">
                        <span class="fl">{{item.league}} {{weekFormat(item.weekId)}}{{item.teamId}}</span>
                        <span class="fr">{{ formateTime(item.matchTime)}}</span>
                      </p>

                      <div class="clear1"></div>

                      <div class="wb40 fl">
                        {{item.hTeam}}
                      </div>
                      <div class="wb20 fl">
                        <div class="w30px center img-area">
                          <img src="~@/assets/images/icon-vs2.png">
                        </div>
                      </div>
                      <div class="wb40 fl">
                        {{item.vTeam}}
                      </div>

                    </div>

                    <div class="clear h10px"></div>

                    <!--混合-->
                    <template v-if="playIndex == 0">
                      <div class="relative bor-black2 bor-solid-1a par40">

                        <template v-if="item.disFT001 == true">
                          <!--本场比赛不支持胜平负-->
                          <p class="h60px lh60px text-center warpper-black-3 Fwhite-1 bor-solid-1r bor-black2">暂未开售</p>
                          <div class="clear bor-solid-1b bor-black2"></div>
                        </template>

                        <template v-else>
                          <div class="pal20 relative">
                            <div class="h60px lh60px text-center warpper-gray-2 w20px absolute Fwhite" style="top: 0; left: 0;">
                              0
                            </div>
                            <div class="wb100 text-center">
                              <div class="wb33333 fl " v-for="item2 in item.resultList">
                                <template v-if="item2.isSelect == true">
                                  <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item2)">
                                    <p class="Fwhite">{{item2.val}}</p>
                                    <p class="Fwhite Fnum">{{item2.odds}}</p>
                                  </div>
                                </template>
                                <template v-else>
                                  <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item2)">
                                    <p class="Fwhite-1">{{item2.val}}</p>
                                    <p class="Fblack-2 Fnum">{{item2.odds}}</p>
                                  </div>
                                </template>
                              </div>
                              <div class="clear"></div>
                            </div>
                          </div>
                          <div class="clear bor-solid-1b bor-black2"></div>
                        </template>

                        <template v-if="item.disFT006 == true">
                          <!--本场比赛不支持让球胜平负-->
                          <p class="h60px lh60px text-center warpper-black-3 Fwhite-1 bor-solid-1r bor-black2">暂未开售</p>
                        </template>

                        <template v-else>
                          <div class="pal20 relative">
                            <div class="h60px lh60px text-center warpper-red w20px absolute Fwhite Fnum" v-if="item.concede>0" style="top: 0; left: 0;">
                              +{{item.concede}}
                            </div>
                            <div class="h60px lh60px text-center warpper-gray-2 w20px absolute Fwhite Fnum" v-if="item.concede==0" style="top: 0px; left: 0;">
                              {{item.concede}}
                            </div>
                            <div class="h60px lh60px text-center warpper-blue w20px absolute Fwhite Fnum" v-if="item.concede<0" style="top: 0px; left: 0;">
                              {{item.concede}}
                            </div>
                            <div class="wb100 text-center">
                              <div class="wb33333 fl " v-for="item2 in item.concedeResultList">
                                <template v-if="item2.isSelect == true">
                                  <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item2)">
                                    <p class="Fwhite">{{item2.val}}</p>
                                    <p class="Fwhite Fnum">{{item2.odds}}</p>
                                  </div>
                                </template>
                                <template v-else>
                                  <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item2)">
                                    <p class="Fwhite-1">{{item2.val}}</p>
                                    <p class="Fblack-2 Fnum">{{item2.odds}}</p>
                                  </div>
                                </template>
                              </div>
                              <div class="clear"></div>
                            </div>
                          </div>
                          <div class="clear"></div>
                        </template>

                        <div class="lh40px pat20 pab20 text-center warpper-black-3 w40px absolute Fwhite-1" style="top: 0; right: 0; height: 81px" @click="showDialog(key,index)" v-if="item.selectData.length == 0">
                          <p>展开</p>
                          <p>全部</p>
                        </div>
                        <div class="lh40px pat20 pab20 text-center warpper-orange-2 w40px absolute Fwhite" style="top: 0; right: 0; height: 81px" @click="showDialog(key,index)" v-else>
                          <p>已选</p>
                          <p>{{item.selectData.length}}项</p>
                        </div>

                        <div class="clear"></div>
                      </div>
                    </template>

                    <!--胜平负-->
                    <template v-if="playIndex == 1">
                      <div class="wb100 text-center bor-black2 bor-solid-1t bor-solid-1b bor-solid-1l">
                        <div class="wb33333 fl" v-for="item2 in item.resultList">
                          <template v-if="item2.isSelect == true">
                            <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item2)">
                              <p class="Fwhite">{{item2.val}}</p>
                              <p class="Fwhite Fnum">{{item2.odds}}</p>
                            </div>
                          </template>
                          <template v-else>
                            <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item2)">
                              <p class="Fwhite-1">{{item2.val}}</p>
                              <p class="Fblack-2 Fnum">{{item2.odds}}</p>
                            </div>
                          </template>
                        </div>
                        <div class="clear"></div>
                      </div>
                    </template>

                    <!--让球胜平负-->
                    <template v-if="playIndex == 2">
                      <div class="pal20 relative bor-black2 bor-solid-1a">

                        <div class="h60px lh60px text-center warpper-red w20px absolute Fwhite Fnum" v-if="item.concede>0" style="top: 0; left: 0;">
                          +{{item.concede}}
                        </div>
                        <div class="h60px lh60px text-center warpper-gray-2 w20px absolute Fwhite Fnum" v-if="item.concede==0" style="top: 0; left: 0;">
                          {{item.concede}}
                        </div>
                        <div class="h60px lh60px text-center warpper-blue w20px absolute Fwhite Fnum" v-if="item.concede<0" style="top: 0; left: 0;">
                          {{item.concede}}
                        </div>

                        <div class="wb100 text-center">
                          <div class="wb33333 fl " v-for="item2 in item.concedeResultList">
                            <template v-if="item2.isSelect == true">
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item2)">
                                <p class="Fwhite">{{item2.val}}</p>
                                <p class="Fwhite Fnum">{{item2.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item2)">
                                <p class="Fwhite-1">{{item2.val}}</p>
                                <p class="Fblack-2 Fnum">{{item2.odds}}</p>
                              </div>
                            </template>
                          </div>
                          <div class="clear"></div>
                        </div>

                        <div class="clear"></div>

                      </div>
                    </template>

                    <!--比分 & 半全场-->
                    <template v-if="playIndex == 3 || playIndex == 5">
                      <div class="wb100 bor-black2 bor-solid-1t bor-solid-1l">
                        <div class="wb100 text-center h50px lh50px warpper-black-3 radius5 Fwhite-1" @click="showDialog(key,index)" v-if="item.selectData.length == 0">
                          <template v-if="playIndex == 3">
                            点击选择比分
                          </template>
                          <template v-else>
                            点击展示投注选项
                          </template>
                        </div>
                        <div class="wb100 text-center h50px lh50px warpper-orange-2 radius5 text-over-hidden1 Fnum Fwhite" @click="showDialog(key,index)" v-else>
                          <template v-for="(item2,key2) in item.selectData">
                            <template v-if="key2 == item.selectData.length - 1">{{item2.val}}</template><template v-else>{{item2.val}}，</template>
                          </template>
                        </div>

                        <div class="clear"></div>
                      </div>
                    </template>

                    <!--总进球-->
                    <template v-if="playIndex == 4">
                      <div class="wb100 bor-black2 bor-solid-1t bor-solid-1l">
                        <div class="wb100 text-center">
                          <div class="wb25 fl" v-for="item2 in item.goalsList">
                            <template v-if="item2.isSelect == true">
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item2)">
                                <p class="Fwhite F16 Fnum">{{item2.val}}</p>
                                <p class="Fwhite Fnum">{{item2.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item2)">
                                <p class="Fwhite-1 F16 Fnum">{{item2.val}}</p>
                                <p class="Fblack-2 Fnum">{{item2.odds}}</p>
                              </div>
                            </template>
                          </div>
                          <div class="clear"></div>
                        </div>

                        <div class="clear"></div>

                      </div>
                    </template>

                    <!--单关-->
                    <template v-if="playIndex == 6">
                      <div class="relative bor-black2 bor-solid-1a par40">

                        <template v-if="item.disFT001 == true">
                          <!--本场比赛不支持胜平负-->
                          <p class="h60px lh60px text-center warpper-black-3 Fwhite-1 bor-solid-1r bor-black2">暂未开售</p>
                          <div class="clear bor-solid-1b bor-black2"></div>
                        </template>

                        <template v-else>
                          <div class="pal20 relative">
                            <div class="h60px lh60px text-center warpper-gray-2 w20px absolute Fwhite" style="top: 0; left: 0;">
                              0
                            </div>
                            <div class="wb100 text-center">
                              <div class="wb33333 fl " v-for="item2 in item.resultList">
                                <template v-if="item2.isSelect == true">
                                  <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item2)">
                                    <p class="Fwhite">{{item2.val}}</p>
                                    <p class="Fwhite Fnum">{{item2.odds}}</p>
                                  </div>
                                </template>
                                <template v-else>
                                  <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item2)">
                                    <p class="Fwhite-1">{{item2.val}}</p>
                                    <p class="Fblack-2 Fnum">{{item2.odds}}</p>
                                  </div>
                                </template>
                              </div>
                              <div class="clear"></div>
                            </div>
                          </div>
                          <div class="clear bor-solid-1b bor-black2"></div>
                        </template>

                        <template v-if="item.disFT006 == true">
                          <!--本场比赛不支持让球胜平负-->
                          <p class="h60px lh60px text-center warpper-black-3 Fwhite-1 bor-solid-1r bor-black2">暂未开售</p>
                        </template>

                        <template v-else>
                          <div class="pal20 relative">
                            <div class="h60px lh60px text-center warpper-red w20px absolute Fwhite Fnum" v-if="item.concede>0" style="top: 0; left: 0;">
                              +{{item.concede}}
                            </div>
                            <div class="h60px lh60px text-center warpper-gray-2 w20px absolute Fwhite Fnum" v-if="item.concede==0" style="top: 0px; left: 0;">
                              {{item.concede}}
                            </div>
                            <div class="h60px lh60px text-center warpper-blue w20px absolute Fwhite Fnum" v-if="item.concede<0" style="top: 0px; left: 0;">
                              {{item.concede}}
                            </div>
                            <div class="wb100 text-center">
                              <div class="wb33333 fl " v-for="item2 in item.concedeResultList">
                                <template v-if="item2.isSelect == true">
                                  <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item2)">
                                    <p class="Fwhite">{{item2.val}}</p>
                                    <p class="Fwhite Fnum">{{item2.odds}}</p>
                                  </div>
                                </template>
                                <template v-else>
                                  <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item2)">
                                    <p class="Fwhite-1">{{item2.val}}</p>
                                    <p class="Fblack-2 Fnum">{{item2.odds}}</p>
                                  </div>
                                </template>
                              </div>
                              <div class="clear"></div>
                            </div>
                          </div>
                          <div class="clear"></div>
                        </template>

                        <div class="lh40px pat20 pab20 text-center warpper-black-3 w40px absolute Fwhite-1" style="top: 0; right: 0; height: 81px" @click="showDialog(key,index)" v-if="item.selectData.length == 0">
                          <p>展开</p>
                          <p>全部</p>
                        </div>
                        <div class="lh40px pat20 pab20 text-center warpper-orange-2 w40px absolute Fwhite" style="top: 0; right: 0; height: 81px" @click="showDialog(key,index)" v-else>
                          <p>已选</p>
                          <p>{{item.selectData.length}}项</p>
                        </div>

                        <div class="clear"></div>
                      </div>
                    </template>

                  </div>

                  <div class="clear1"></div>

              </div>

              <div class="wb100" v-else>
                  <!--暂无该场比赛信息-->
              </div>

            </div>
          </el-collapse-transition>

        </div>

        <!--copyright-->
        <copyright> </copyright>

        <div class="clear h65px"></div>

        <div class="wb100 fixed warpper-black h60px bor-black bor-solid-1t" style="bottom: 0;">

          <div class="wb100 relative" >

            <div class="pat10 pab10">
              <div class="w25px text-center absolute" @click="clearSelect" style="left: 15px; top: 10px;">
                <div class="h25px img-Harea center">
                  <img src="~@/assets/images/icon-clear.png">
                </div>
                <p class="Fblack-2 F12 h25px lh25px text-center">清空</p>
              </div>

              <div class="w80px text-center radius5 h40px lh40px absolute" v-if="playIndex != 6" style="top: 10px; right: 15px;" :class="sessionNum<2 ? 'warpper-black-3 Fwhite-1' : 'warpper-orange-2 Fwhite'"  @click="buyTicket">
                确定
              </div>

              <div class="w80px text-center radius5 h40px lh40px absolute" v-if="playIndex == 6" style="top: 10px; right: 15px;" :class="sessionNum<1 ? 'warpper-black-3 Fwhite-1' : 'warpper-orange-2 Fwhite'"  @click="buyTicket">
                确定
              </div>

              <div class="w200px center">

                <template v-if="playIndex == 6">
                  <p class="lh40px text-center Fwhite-1" v-if="sessionNum>0">
                    已选择<span class="Forange-2 Fnum">{{sessionNum}}</span>场
                  </p>
                  <p class="lh40px text-center Fwhite-1" v-else>
                    至少选择<span class="Forange-2 Fnum">1</span>场
                  </p>
                </template>

                <template v-else>
                  <p class="lh40px text-center Fwhite-1" v-if="sessionNum>=2">
                    已选择<span class="Forange-2 Fnum">{{sessionNum}}</span>场
                  </p>
                  <p class="lh40px text-center Fwhite-1" v-else>
                    至少选择<span class="Forange-2 Fnum">2</span>场
                  </p>
                </template>

              </div>

            </div>
          </div>

        </div>

      </div>


  </div>
</template>

<style>

</style>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'
  import Bg from '../../assets/images/bg-more.png'
  import Bg2 from '../../assets/images/bg-soccer.png'
  import headIcon from '../../assets/images/head-default.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        bgMore: Bg,
        bg: Bg2,
        headDefault: headIcon,
        login: false,
        showMore: false,
        showSoccer: false,
        showType: false,
        showScore: false,
        showDoubleResult: false,
        showMix: false,
        showSearch: false,
        showService: false,
        showLogin: false,
        showUserMeun: false,
        msgDisabled: false,
        isWeiXin: false,
        once: true,
        user: {},
        width: 0,
        height: 0,
        number: 0,
        selectIndex : 0,
        selectKey : 0,
        tmpSoccer : {},
        curSoccer : {},
        sessionNum : 0,
        lock: true,
        msgStyle:  {
          top: '65px',
          left: '15px',
        },
        navList: ['投注', '开奖', '规则'],
        current: 0,
        playType: ['混合过关', '胜平负', '让球胜平负', '比分', '总进球', '半全场', '单关'],
        playIndex: 0,
        resultList : ['主胜','平','客胜'],
        concedeResultList : ['主胜','平','客胜'],
        goalsList : ['0','1','2','3','4','5','6','7+'],
        winList : ['1:0','2:0','2:1','3:0','3:1','3:2','4:0','4:1','4:2','5:0','5:1','5:2','胜其他'],
        flatList : ['0:0','1:1','2:2','3:3','平其他'],
        lostList : ['0:1','0:2','1:2','0:3','1:3','2:3','0:4','1:4','2:4','0:5','1:5','2:5','负其他'],
        doubleResultList : ['胜胜','胜平','胜负','平胜','平平','平负','负胜','负平','负负'],
        lottery_type: 'soccer',
        leagues: '',
        soccerList: [],
        matchType: [],
        tmpMatchType: [],
        loading: true,
      }
    },

    methods: {

      openType(){
        this.showSearch = true;
        this.tmpMatchType = JSON.parse(JSON.stringify(this.matchType));
      },

      setMatchType(type){
        if(type == true){
            //set match types
            let _arr = [];
            for(let i=0; i<this.matchType.length; i++){
              if(this.matchType[i].isSelect == true)
                  _arr.push(this.matchType[i].val);
            }

            this.once = false;
            this.leagues = _arr.join(",");
            this.init();
            this.showSearch = false;
        }else{
          //close dialog
          this.showSearch = false;
          this.matchType = JSON.parse(JSON.stringify(this.tmpMatchType));
        }
      },

      selectMatchType(type){

          if(type == 'invert'){
              //反选
              for(let i=0; i<this.matchType.length; i++){
                  this.matchType[i].isSelect = !this.matchType[i].isSelect;
              }
          }else if(type == 'all'){
            for(let i=0; i<this.matchType.length; i++){
              this.matchType[i].isSelect = true;
            }
          }else if(type == '5'){
            for(let i=0; i<this.matchType.length; i++){
              if(this.matchType[i].val == '英超' || this.matchType[i].val == '意甲' || this.matchType[i].val == '德甲' || this.matchType[i].val == '西甲' || this.matchType[i].val == '法甲'){
                this.matchType[i].isSelect = true;
              }else{
                this.matchType[i].isSelect = false;
              }
            }
          }

      },

      loginSuccess(user){
        this.$message({
          type: 'success',
          message: '登录成功'
        });

        this.user = user;
        this.login = true;
        this.showLogin = false;
      },

      showDialog(index,key){

        this.curSoccer = this.soccerList[index].matchs[key];

        this.selectIndex = index;
        this.selectKey = key;

        this.tmpSoccer =  JSON.parse(JSON.stringify(this.curSoccer));

        //混合过关
        if(this.playIndex == 0 || this.playIndex == 6){
          this.showMix = true;
        }//比分
        if(this.playIndex == 3){
          this.showScore = true;
        }//半全场
        if(this.playIndex == 5){
          this.showDoubleResult = true;
        }

      },

      closeDialog(type){

        if(type == 'cancel'){
          //取消
          this.curSoccer = this.tmpSoccer;
          this.soccerList[this.selectIndex].matchs[this.selectKey] = this.tmpSoccer;
        }else if(type == 'submit'){
          //确定

        }

        //混合过关
        if(this.playIndex == 0 || this.playIndex == 6){
          this.showMix = false;
        }//比分
        if(this.playIndex == 3){
          this.showScore = false;
        }//半全场
        if(this.playIndex == 5){
          this.showDoubleResult = false;
        }

      },

      changeSelect(item){

          console.log(item)
//
//        item.isSelect = !item.isSelect;
//
//        console.log(item)
//
//        return false;

        let _flag = false;

        let _list = this.soccerList;

        let _arr = [];

        let _selectNum = 0;

        for(let i=0; i<_list.length; i++){

          for(let j=0; j<_list[i].matchs.length; j++) {

            let _item = _list[i].matchs[j];

            let _flag = false;

            let selectData = [];

            //胜平负选择状态
            if (this.playIndex == 1 || this.playIndex == 0) {
              _flag = false;
              for (let j = 0; j < _item.resultList.length; j++) {
                if (_item.resultList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.resultList[j]);
                }
              }
              if (_flag) {
                //胜平负
                _arr.push(_item);
              }
            }

            //让球胜平负选择状态
            if (this.playIndex == 2 || this.playIndex == 0) {
              _flag = false;
              for (let j = 0; j < _item.concedeResultList.length; j++) {
                if (_item.concedeResultList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.concedeResultList[j]);
                }
              }
              if (_flag) {
                //让球胜平负
                _arr.push(_item);
              }
            }

            //比分
            if (this.playIndex == 3 || this.playIndex == 0) {
              _flag = false;
              //比分选择状态(胜)
              for (let j = 0; j < _item.winList.length; j++) {
                if (_item.winList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.winList[j]);
                }
              }
              if (_flag) {
                _arr.push(_item);
              }
              _flag = false;
              //比分选择状态（平）
              for (let j = 0; j < _item.flatList.length; j++) {
                if (_item.flatList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.flatList[j]);
                }
              }
              if (_flag) {
                _arr.push(_item);
              }
              _flag = false;
              //比分选择状态（负）
              for (let j = 0; j < _item.lostList.length; j++) {
                if (_item.lostList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.lostList[j]);
                }
              }
              if (_flag) {
                _arr.push(_item);
              }
            }

            //总进球选择状态
            if (this.playIndex == 4 || this.playIndex == 0) {
              _flag = false;

              for (let j = 0; j < _item.goalsList.length; j++) {
                if (_item.goalsList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.goalsList[j]);
                }
              }
              if (_flag) {
                //总进球
                _arr.push(_item);
              }

            }

            //半全场选择状态
            if (this.playIndex == 5 || this.playIndex == 0) {
              _flag = false;
              for (let j = 0; j < _item.doubleResultList.length; j++) {
                if (_item.doubleResultList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.doubleResultList[j]);
                }
              }

              if (_flag) {
                _arr.push(_item);
              }

            }

            _item.selectData = selectData;

            if(_item.selectData.length > 0){
              _selectNum ++;
            }

          }

        }

        //判断编辑或新增
        for(let j=0; j<_arr.length; j++){
            if(_arr[j].id == item.id)
                _flag = true;

        }

//        console.log(_flag);

        //新增模式
        if(_flag == false){
          if(item.isSelect == false){

            if(this.playIndex == 0){
                //混合
              if(this.sessionNum >= 4){
                this.$message({
                  type: 'error',
                  message: '混合玩法最多选择4场比赛',
                  duration: 1500
                });
                return false;
              }
            }else if(this.playIndex == 1){
                //胜平负
              if(this.sessionNum >= 8){
                this.$message({
                  type: 'error',
                  message: '胜平负玩法最多选择8场比赛',
                  duration: 1500
                });
                return false;
              }
            }else if(this.playIndex == 2){
                //让球胜平负
              if(this.sessionNum >= 8){
                this.$message({
                  type: 'error',
                  message: '让球胜平负玩法最多选择8场比赛',
                  duration: 1500
                });
                return false;
              }
            }else if(this.playIndex == 3){
                //比分
              if(this.sessionNum >= 4){
                this.$message({
                  type: 'error',
                  message: '比分玩法最多选择4场比赛',
                  duration: 1500
                });
                return false;
              }
            }else if(this.playIndex == 4){
                //总进球
              if(this.sessionNum >= 6){
                this.$message({
                  type: 'error',
                  message: '总进球玩法最多选择6场比赛',
                  duration: 1500
                });
                return false;
              }
            }else if(this.playIndex == 5){
                //半全场
              if(this.sessionNum >= 4){
                this.$message({
                  type: 'error',
                  message: '半全场玩法最多选择4场比赛',
                  duration: 1500
                });
                return false;
              }
            }

          }
        }

        item.isSelect = !item.isSelect;

        //计算场数和价格

        _list = this.soccerList;
        _arr = [];
        _selectNum = 0;

        for(let i=0; i<_list.length; i++){

          for(let j=0; j<_list[i].matchs.length; j++) {

            let _item = _list[i].matchs[j];

            let _flag = false;

            let selectData = [];

            //胜平负选择状态
            if (this.playIndex == 1 || this.playIndex == 0 || this.playIndex == 6) {
              _flag = false;
              for (let j = 0; j < _item.resultList.length; j++) {
                if (_item.resultList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.resultList[j]);
                }
              }
              if (_flag) {
                //胜平负
                _arr.push(_item);
              }
            }

            //让球胜平负选择状态
            if (this.playIndex == 2 || this.playIndex == 0 || this.playIndex == 6) {
              _flag = false;
              for (let j = 0; j < _item.concedeResultList.length; j++) {
                if (_item.concedeResultList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.concedeResultList[j]);
                }
              }
              if (_flag) {
                //让球胜平负
                _arr.push(_item);
              }
            }

            //比分
            if (this.playIndex == 3 || this.playIndex == 0 || this.playIndex == 6) {
              _flag = false;
              //比分选择状态(胜)
              for (let j = 0; j < _item.winList.length; j++) {
                if (_item.winList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.winList[j]);
                }
              }
              if (_flag) {
                _arr.push(_item);
              }
              _flag = false;
              //比分选择状态（平）
              for (let j = 0; j < _item.flatList.length; j++) {
                if (_item.flatList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.flatList[j]);
                }
              }
              if (_flag) {
                _arr.push(_item);
              }
              _flag = false;
              //比分选择状态（负）
              for (let j = 0; j < _item.lostList.length; j++) {
                if (_item.lostList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.lostList[j]);
                }
              }
              if (_flag) {
                _arr.push(_item);
              }
            }

            //总进球选择状态
            if (this.playIndex == 4 || this.playIndex == 0 || this.playIndex == 6) {
              _flag = false;

              for (let j = 0; j < _item.goalsList.length; j++) {
                if (_item.goalsList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.goalsList[j]);
                }
              }
              if (_flag) {
                //总进球
                _arr.push(_item);
              }

            }

            //半全场选择状态
            if (this.playIndex == 5 || this.playIndex == 0 || this.playIndex == 6) {
              _flag = false;
              for (let j = 0; j < _item.doubleResultList.length; j++) {
                if (_item.doubleResultList[j].isSelect == true) {
                  _flag = true;
                  selectData.push(_item.doubleResultList[j]);
                }
              }

              if (_flag) {
                _arr.push(_item);
              }

            }

            _item.selectData = selectData;

            if(_item.selectData.length > 0){
              _selectNum ++;
            }

          }

        }

        this.sessionNum = _selectNum;

      },

      dateShort(str){
        return str.substring( str.length - 8 );
      },

      formateTime(str){
        return str.substring(5, str.length - 3);
      },

      dateFormat(str){
        return str.substring(0,4) + '-' + str.substring(4,6) + '-' + str.substring(6);
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

      changePlayType(key){

        if(this.playIndex == key){
            this.showType = false;
            return false;
        }

        this.playIndex = key;
        this.showType = false;

        //混合过关
        if(this.playIndex == 0){

          this.msgStyle = {
            top: '65px',
            left: '15px',
          };

        }//胜平负
        if(this.playIndex == 1){

          this.msgStyle = {
            top: '35px',
            left: '15px',
          };

        }//让球胜平负
        if(this.playIndex == 2){

          this.msgStyle = {
            top: '35px',
            left: '15px',
          };

        }//比分
        if(this.playIndex == 3){

          this.msgStyle = {
            top: '30px',
            left: '15px',
          };

        }//总进球
        if(this.playIndex == 4){

          this.msgStyle = {
            top: '65px',
            left: '15px',
          };

        }//半全场
        if(this.playIndex == 5){

          this.msgStyle = {
            top: '30px',
            left: '15px',
          };
        }
        //单关
        if(this.playIndex == 6){

          this.msgStyle = {
            top: '30px',
            left: '15px',
          };
        }

        //清空已选的缓存

        window.sessionStorage.setItem('soccer_ticket', JSON.stringify([]));

        this.sessionNum = 0;

        this.init();

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

      getEndTime(dateString){
        var arr1 = dateString.split(" ");
        var sdate = arr1[0].split('-');
        var date = new Date(sdate[0], sdate[1]-1, sdate[2], 0, 0, 0);
        //截止10分钟前投注
        return date.getTime() - 10 * 60000;
      },

      formatString(arr){
        return arr.join('，');
      },

      init(){

        let _tmp = {}, _data = {};

        Interface.lotteryMatch(this.leagues, (data) => {

            if(data) {

              _tmp = data.returnJSON.query;

              if(this.once == true){
                let _tmpType = data.returnJSON.leagueList;

                let __tmpArr = [];

                for(let i=0; i<_tmpType.length; i++){
                  __tmpArr.push({
                    id: i,
                    val: _tmpType[i],
                    isSelect: false
                  })
                }

                this.matchType = __tmpArr;
              }

              for (let i = 0; i < _tmp.length; i++) {

                for (let k = 0; k < _tmp[i].matchs.length; k++) {

                  let _item = _tmp[i].matchs[k];

                  let _tmpArray = [];

//                  wType

                  _data = JSON.stringify({
                    isSelect: false,
                    day: _item.day,
                    hTeam: _item.hTeam,
                    league: _item.league,
                    id: _item.id,
                    matchTime: _item.matchTime,
                    teamId: _item.teamId,
                    vTeam: _item.vTeam,
                    weekId: _item.weekId,
//                    time: _item.day + '*' + _item.weekId + '*' + _item.teamId + '*'
                  })

                  //判断是否显示该场比赛

                  //判断售票截止

                  let _now = new Date().getTime();

                  let endTime = this.stringToDate(_item.endTime).getTime();

                  let endTime2 = this.getEndTime(_item.matchTime);

                  let _entTime = 0;

//                  if (endTime >= endTime2) {
//                    _entTime = endTime2;
//                  } else {
//                    _entTime = endTime;
//                  }

                  _entTime = endTime;

                  if (_entTime - _now < 0) {
                    //已截止投注
                    _item.timeOut = true;
                  } else {
                    _item.timeOut = false;
                  }

                  //判断是否支持该玩法
                  if (!Base.isNull(_item.unsupport)) {
                    let unSup = JSON.parse(JSON.stringify(_item.unsupport));

                    _item.disFT001 = false;
                    _item.disFT002 = false;
                    _item.disFT003 = false;
                    _item.disFT004 = false;
                    _item.disFT005 = false;
                    _item.disFT006 = false;
                    _item.disOne = false;

                    for (let __u = 0; __u < unSup.length; __u++) {
                        //串关
                        if (unSup[__u].valueType == 1) {
                          //判断支持类型
                          if(unSup[__u].LotId == 'FT001'){
                            _item.disFT001 = true;
                          }else if(unSup[__u].LotId == 'FT002'){
                            _item.disFT002 = true;
                          }else if(unSup[__u].LotId == 'FT003'){
                            _item.disFT003 = true;
                          }else if(unSup[__u].LotId == 'FT004'){
                            _item.disFT004 = true;
                          }else if(unSup[__u].LotId == 'FT005'){
                            _item.disFT005 = true;
                          }else if(unSup[__u].LotId == 'FT006'){
                            _item.disFT006 = true;
                          }
                        }else{
                          if(this.playIndex == 6){
                            if(unSup[__u].LotId == 'FT001'){
                              _item.disFT001 = true;
                              _item.disOne = true;
                            }
                            else if(unSup[__u].LotId == 'FT002'){
                              _item.disFT002 = true;
                            }else if(unSup[__u].LotId == 'FT003'){
                              _item.disFT003 = true;
                            }else if(unSup[__u].LotId == 'FT004'){
                              _item.disFT004 = true;
                            }else if(unSup[__u].LotId == 'FT005'){
                              _item.disFT005 = true;
                            }else if(unSup[__u].LotId == 'FT006'){
                              _item.disFT006 = true;
                            }
                          }
                        }
                    }

                  }

                  let _rate = _item.rate[0];

//                  if (!Base.isNull(_item.vs)) {
//                    _item.vs = JSON.parse(_item.vs);

                    for (let j = 0; j < this.resultList.length; j++) {
                      let _cur = this.resultList[j];

                      let _odd = 0, _name = '';

                      if (j == 0) {
                        _odd = _rate.s_normal;
                        _name = 'v3';
                      } else if (j == 1) {
                        _odd = _rate.p_normal;
                        _name = 'v1';
                      } else if (j == 2) {
                        _odd = _rate.f_normal;
                        _name = 'v0';
                      }

                      _tmpArray.push({
                        val: _cur,
                        odds: _odd,
                        name: _name,
                        type: 'FT001',
                        isSelect: false,
                        id: _item.id
                      });

                    }
                    _item.resultList = _tmpArray;

//                    console.log(_item.resultList)

                    _item.emptyVs = false;

//                  } else {
//                    _item.emptyVs = true;
//                  }

//                  if (!Base.isNull(_item.letVs)) {
//                    _item.letVs = JSON.parse(_item.letVs);
                    _tmpArray = [];
                    for (let j = 0; j < this.concedeResultList.length; j++) {
                      let _cur = this.concedeResultList[j];
                      let _odd = 0, _name = '';

                      _item.concede = _item.letBall;

                      if (j == 0) {
                        _odd = _rate.s_let;
                        _name = 'v3';
                      }
                      else if (j == 1) {
                        _odd = _rate.p_let;
                        _name = 'v1';
                      }
                      else if (j == 2) {
                        _odd = _rate.f_let;
                        _name = 'v0';
                      }

                      _tmpArray.push({
                        val: _cur,
                        odds: _odd,
                        name: _name,
                        type: 'FT006',
                        isSelect: false,
                        id: _item.id
                      });

                    }
                    _item.concedeResultList = _tmpArray;

                    _item.emptyLetVs = false;

//                  } else {
//                    _item.emptyLetVs = true;
//                  }

//                  if (!Base.isNull(_item.goal)) {
//
//                    _item.goal = JSON.parse(_item.goal);

                    _tmpArray = [];

                    for (let j = 0; j < this.goalsList.length; j++) {
                      let _cur = this.goalsList[j];
                      let _odd = 0, _name = '';

                      if (j == 0) {
                        _odd = _rate.score_0;
                        _name = 'v0';
                      } else if (j == 1) {
                        _odd = _rate.score_1;
                        _name = 'v1';
                      } else if (j == 2) {
                        _odd = _rate.score_2;
                        _name = 'v2';
                      } else if (j == 3) {
                        _odd = _rate.score_3;
                        _name = 'v3';
                      } else if (j == 4) {
                        _odd = _rate.score_4;
                        _name = 'v4';
                      } else if (j == 5) {
                        _odd = _rate.score_5;
                        _name = 'v5';
                      } else if (j == 6) {
                        _odd = _rate.score_6;
                        _name = 'v6';
                      } else if (j == 7) {
                        _odd = _rate.score_7;
                        _name = 'v7';
                      }

                      _tmpArray.push({
                        val: _cur,
                        odds: _odd,
                        name: _name,
                        type: 'FT003',
                        isSelect: false,
                        id: _item.id
                      });

                    }

                    _item.goalsList = _tmpArray;

                    _item.emptyGoal = false;

//                  } else {
//                    _item.emptyGoal = true;
//                  }

//                  if (!Base.isNull(_item.score)) {
//
//                    _item.score = JSON.parse(_item.score);

                    _tmpArray = [];

                    for (let j = 0; j < this.winList.length; j++) {
                      let _cur = this.winList[j];
                      let _odd = 0, _name = '';

                      if (j == 0) {
                        _odd = _rate.s_1_0;
                        _name = 'v10';
                      } else if (j == 1) {
                        _odd = _rate.s_2_0;
                        _name = 'v20';
                      } else if (j == 2) {
                        _odd = _rate.s_2_1;
                        _name = 'v21';
                      } else if (j == 3) {
                        _odd = _rate.s_3_0;
                        _name = 'v30';
                      } else if (j == 4) {
                        _odd = _rate.s_3_1;
                        _name = 'v31';
                      } else if (j == 5) {
                        _odd = _rate.s_3_2;
                        _name = 'v32';
                      } else if (j == 6) {
                        _odd = _rate.s_4_0;
                        _name = 'v40';
                      } else if (j == 7) {
                        _odd = _rate.s_4_1;
                        _name = 'v41';
                      } else if (j == 8) {
                        _odd = _rate.s_4_2;
                        _name = 'v42';
                      } else if (j == 9) {
                        _odd = _rate.s_5_0;
                        _name = 'v50';
                      } else if (j == 10) {
                        _odd = _rate.s_5_1;
                        _name = 'v51';
                      } else if (j == 11) {
                        _odd = _rate.s_5_2;
                        _name = 'v52';
                      } else if (j == 12) {
                        _odd = _rate.s_other;
                        _name = 'v90';
                      }

                      _tmpArray.push({
                        val: _cur,
                        odds: _odd,
                        name: _name,
                        type: 'FT002',
                        isSelect: false,
                        id: _item.id
                      });

                    }

                    _item.winList = _tmpArray;

                    _tmpArray = [];

                    for (let j = 0; j < this.flatList.length; j++) {
                      let _cur = this.flatList[j];

                      let _odd = 0, _name = '';

                      if (j == 0) {
                        _odd = _rate.p_0_0;
                        _name = 'v00';
                      } else if (j == 1) {
                        _odd = _rate.p_1_1;
                        _name = 'v11';
                      } else if (j == 2) {
                        _odd = _rate.p_2_2;
                        _name = 'v22';
                      } else if (j == 3) {
                        _odd = _rate.p_3_3;
                        _name = 'v33';
                      } else if (j == 4) {
                        _odd = _rate.p_other;
                        _name = 'v99';
                      }

                      _tmpArray.push({
                        val: _cur,
                        odds: _odd,
                        name: _name,
                        type: 'FT002',
                        isSelect: false,
                        id: _item.id
                      });

                    }

                    _item.flatList = _tmpArray;

                    _tmpArray = [];

                    for (let j = 0; j < this.lostList.length; j++) {
                      let _cur = this.lostList[j];

                      let _odd = 0, _name = '';

                      if (j == 0) {
                        _odd = _rate.f_0_1;
                        _name = 'v01';
                      } else if (j == 1) {
                        _odd = _rate.f_0_2;
                        _name = 'v02';
                      } else if (j == 2) {
                        _odd = _rate.f_1_2;
                        _name = 'v12';
                      } else if (j == 3) {
                        _odd = _rate.f_0_3;
                        _name = 'v03';
                      } else if (j == 4) {
                        _odd = _rate.f_1_3;
                        _name = 'v13';
                      } else if (j == 5) {
                        _odd = _rate.f_2_3;
                        _name = 'v23';
                      } else if (j == 6) {
                        _odd = _rate.f_0_4;
                        _name = 'v04';
                      } else if (j == 7) {
                        _odd = _rate.f_1_4;
                        _name = 'v14';
                      } else if (j == 8) {
                        _odd = _rate.f_2_4;
                        _name = 'v24';
                      } else if (j == 9) {
                        _odd = _rate.f_0_5;
                        _name = 'v05';
                      } else if (j == 10) {
                        _odd = _rate.f_1_5;
                        _name = 'v15';
                      } else if (j == 11) {
                        _odd = _rate.f_2_5;
                        _name = 'v25';
                      } else if (j == 12) {
                        _odd = _rate.f_other;
                        _name = 'v09';
                      }

                      _tmpArray.push({
                        val: _cur,
                        odds: _odd,
                        name: _name,
                        type: 'FT002',
                        isSelect: false,
                        id: _item.id
                      });

                    }

                    _item.lostList = _tmpArray;

                    _item.emptyScore = false;

//                  } else {
//                    _item.emptyScore = true;
//                  }

//                  if (!Base.isNull(_item.half)) {
//
//                    _item.half = JSON.parse(_item.half);

                    _tmpArray = [];

                    for (let j = 0; j < this.doubleResultList.length; j++) {
                      let _cur = this.doubleResultList[j];
                      let _odd = 0, _name = '';

                      if (j == 0) {
                        _odd = _rate.s_s;
                        _name = 'v33';
                      } else if (j == 1) {
                        _odd = _rate.s_p;
                        _name = 'v31';
                      } else if (j == 2) {
                        _odd = _rate.s_f;
                        _name = 'v30';
                      } else if (j == 3) {
                        _odd = _rate.p_s;
                        _name = 'v13';
                      } else if (j == 4) {
                        _odd = _rate.p_p;
                        _name = 'v11';
                      } else if (j == 5) {
                        _odd = _rate.p_f;
                        _name = 'v10';
                      } else if (j == 6) {
                        _odd = _rate.f_s;
                        _name = 'v03';
                      } else if (j == 7) {
                        _odd = _rate.f_p;
                        _name = 'v01';
                      } else if (j == 8) {
                        _odd = _rate.f_f;
                        _name = 'v00';
                      }

                      _tmpArray.push({
                        val: _cur,
                        odds: _odd,
                        name: _name,
                        type: 'FT004',
                        isSelect: false,
                        id: _item.id
                      });

                    }

                    _item.doubleResultList = _tmpArray;

                    _item.emptyHalf = false;

//                  } else {
//                    _item.emptyHalf = true;
//                  }

                  _item.optionsNum = 0;
                  _item.selects = '';
                  _item.selectData = '';

                  //判断是否显示当前比赛

                  _item.display = true;

                  //不支持胜平负
                  if (_item.disFT001 == true && this.playIndex == 1) {
                    _item.display = false;
                  }
                  //不支持比分
                  if (_item.disFT002 == true && this.playIndex == 3) {
                    _item.display = false;
                  }
                  //不支持总进球
                  if (_item.disFT003 == true && this.playIndex == 4) {
                    _item.display = false;
                  }
                  //不支持半全场
                  if (_item.disFT004 == true && this.playIndex == 5) {
                    _item.display = false;
                  }
                  //不支持混合
                  if (_item.disFT005 == true && this.playIndex == 0) {
                    _item.display = false;
                  }
                  //不支持让球胜平负
                  if (_item.disFT006 == true && this.playIndex == 1) {
                    _item.display = false;
                  }

                  //不支持单关
                  if (_item.disOne == true && this.playIndex == 6) {
                    _item.display = false;
                  }

                  //已经超时
                  if (_item.timeOut == true) {
                    _item.display = false;
                  }

//
//                  //暂无数据
//                  if (this.playIndex == 1 && _item.emptyVs == true) {
//                    _item.display = false;
//                  } else if (this.playIndex == 2 && _item.emptyLetVs == true) {
//                    _item.display = false;
//                  } else if (this.playIndex == 3 && _item.emptyScore == true) {
//                    _item.display = false;
//                  }
//                  if (this.playIndex == 4 && _item.emptyGoal == true) {
//                    _item.display = false;
//                  }
//                  if (this.playIndex == 5 && _item.emptyHalf == true) {
//                    _item.display = false;
//                  }


                }

                  //默认展开一个
//                if (i == 0) {
//                  _tmp[i].isShowList = true;
//                } else {
//                  _tmp[i].isShowList = false;
//                }


                //- 2018年3月14日13:52:48
                //改为默认全展开
                _tmp[i].isShowList = true;
              }

              console.log(_tmp);

              //镜像出单关数据

              this.soccerList = [];

              //渲染已选
              let list = window.sessionStorage.getItem("soccer_ticket");

              let _count = 0;

              if (!Base.isNull(list)) {
                list = JSON.parse(list);

                if (!Base.isNull(list)) {
                  this.playIndex = list[0].playIndex;

                  let timeOutMatch = []

                  for (let i = 0; i < _tmp.length; i++) {

                    for (let k = 0; k < _tmp[i].matchs.length; k++) {

                      let _item = _tmp[i].matchs[k];

                      let _now = new Date().getTime();

                      let endTime = this.stringToDate(_item.endTime).getTime();

                      let endTime2 = this.getEndTime(_item.matchTime);

                      let _entTime = 0;

//                  if (endTime >= endTime2) {
//                    _entTime = endTime2;
//                  } else {
//                    _entTime = endTime;
//                  }

                      _entTime = endTime;

                      if (_entTime - _now < 0) {
                        //已截止投注
                        _item.timeOut = true;
                      } else {
                        _item.timeOut = false;
                      }

                      //判断是否显示当前比赛

                      _item.display = true;

                      //不支持胜平负
                      if (_item.disFT001 == true && this.playIndex == 1) {
                        _item.display = false;
                      }
                      //不支持比分
                      if (_item.disFT002 == true && this.playIndex == 3) {
                        _item.display = false;
                      }
                      //不支持总进球
                      if (_item.disFT003 == true && this.playIndex == 4) {
                        _item.display = false;
                      }
                      //不支持半全场
                      if (_item.disFT004 == true && this.playIndex == 5) {
                        _item.display = false;
                      }
                      //不支持混合
                      if (_item.disFT005 == true && this.playIndex == 0) {
                        _item.display = false;
                      }
                      //不支持让球胜平负
                      if (_item.disFT006 == true && this.playIndex == 1) {
                        _item.display = false;
                      }

                      //不支持单关
                      if (_item.disOne == true && this.playIndex == 6) {
                        _item.display = false;
                      }

                      //已经超时
                      if (_item.timeOut == true) {
                        _item.display = false;
                      }

                      let _flag = true;

                      for (let j = 0; j < list.length; j++) {

                        if (list[j].id == _item.id) {

                          _item.concedeResultList = list[j].concedeResultList;
                          _item.doubleResultList = list[j].doubleResultList;
                          _item.flatList = list[j].flatList;
                          _item.goalsList = list[j].goalsList;
                          _item.lostList = list[j].lostList;
                          _item.resultList = list[j].resultList;
                          _item.winList = list[j].winList;
                          _item.selectData = list[j].selectData;
                          _flag = false;
                          _count++;
                        }
                      }

                      if (!_flag) {
                        //成功渲染已选比赛
                        timeOutMatch.push(_item);
                      }

                    }
                  }

                  this.sessionNum = _count;

                  if (timeOutMatch.length != list.length) {
                    //提示比赛已经结束
                    this.$message({
                      type: 'error',
                      message: '有' + list.length - timeOutMatch.length + '场比赛已结束，已为您删除'
                    });

                  }

                }

              }

              this.soccerList = _tmp;

//              console.log(_tmp);
            }

            this.fullscreenLoading = false

        })

      },

      buyTicket(){
        //封装数据

        let _ticket = this.soccerList;

        if(this.sessionNum < 2 && this.playIndex != 6){
            return false;
        }

        let _item = {};

        let _arr = [];

        for(let i=0; i<_ticket.length; i++){
          for(let j=0; j<_ticket[i].matchs.length; j++){
            _item = _ticket[i].matchs[j];
            if(_item.selectData.length >0){
              _arr.push({
                id : _item.id,
                concede: _item.concede,
                day: _item.day,
                teamId: _item.teamId,
                weekId : _item.weekId,
                league : _item.league,
                matchTime : _item.matchTime,
                endTime : _item.endTime,
                hTeam : _item.hTeam,
                vTeam : _item.vTeam,
                unsupport: _item.unsupport,
                selectData : _item.selectData,
                concedeResultList: _item.concedeResultList,
                doubleResultList: _item.doubleResultList,
                flatList: _item.flatList,
                goalsList: _item.goalsList,
                lostList: _item.lostList,
                resultList: _item.resultList,
                winList: _item.winList,
                playIndex : this.playIndex
              });

//              console.log(this.getLotValue (_item.selectData));

            }

          }

        }

//        console.log(_arr)
//
//        return false;


        //- cnzz自定义统计
        // 测试完后请删除这条注数

        _czc.push(["_setAccount", "1271278320"]);
        _czc.push(['_trackEvent', 'Soccer_page_selectMatch', 'submit', '选择赛事前往下单','toOrder','select_match']);

        window.sessionStorage.setItem('soccer_ticket', JSON.stringify(_arr));

        this.$router.push({ name: 'SoccerOrder', params:{ playIndex: this.playIndex} });

      },

      clearSelect(){
        window.sessionStorage.setItem('soccer_ticket', JSON.stringify([]));
        this.sessionNum = 0;
        this.init();
      },

      /**
       * 判断一个值是否为空
       * @param obj			任意类型
       * @returns {boolean}	是否为空
       */
      isNull(obj) {
        if (obj == undefined || obj == 'undefined' || obj == null || obj == 'null' || obj == "" || obj.length == 0) return true;else return false;
      },

      /**
       * 通过投注值来判断投注方式
       * @param list
       * @returns {*}
       */
      getLotValue(list){

          if(Base.isNull(list))
              return null;

          let _tmp = [];

          for(let i=0; i<list.length; i++){
              //0,1,3分别表示负平胜
            if(list[i] == '胜' || list[i] == '主胜' || list[i] == '让球主胜'){
              _tmp.push('3');
            }else if(list[i] == '平' || list[i] == '让球平'){
              _tmp.push('1');
            } else if(list[i] == '负' || list[i] == '客胜' || list[i] == '让球客胜'){
              _tmp.push('0');
            }else if(list[i] == '1:0'){
              _tmp.push('10');
            }else if(list[i] == '2:0'){
              _tmp.push('20');
            }else if(list[i] == '2:1'){
              _tmp.push('21');
            }else if(list[i] == '3:0'){
              _tmp.push('30');
            }else if(list[i] == '3:1'){
              _tmp.push('31');
            }else if(list[i] == '3:2'){
              _tmp.push('32');
            }else if(list[i] == '3:3'){
              _tmp.push('33');
            }else if(list[i] == '4:1'){
              _tmp.push('41');
            }else if(list[i] == '4:2'){
              _tmp.push('42');
            }else if(list[i] == '5:0'){
              _tmp.push('50');
            }else if(list[i] == '5:1'){
              _tmp.push('51');
            }else if(list[i] == '5:2'){
              _tmp.push('52');
            }else if(list[i] == '胜其它'){
              _tmp.push('90');
            }else if(list[i] == '0:0'){
              _tmp.push('00');
            }else if(list[i] == '1:1'){
              _tmp.push('11');
            }else if(list[i] == '2:2'){
              _tmp.push('22');
            }else if(list[i] == '3:3'){
              _tmp.push('33');
            }else if(list[i] == '平其它'){
              _tmp.push('99');
            }else if(list[i] == '0:1'){
              _tmp.push('01');
            }else if(list[i] == '0:2'){
              _tmp.push('02');
            }else if(list[i] == '1:2'){
              _tmp.push('12');
            }else if(list[i] == '0:3'){
              _tmp.push('03');
            }else if(list[i] == '1:3'){
              _tmp.push('13');
            }else if(list[i] == '2:3'){
              _tmp.push('23');
            }else if(list[i] == '0:4'){
              _tmp.push('04');
            }else if(list[i] == '1:4'){
              _tmp.push('14');
            }else if(list[i] == '2:4'){
              _tmp.push('24');
            }else if(list[i] == '0:5'){
              _tmp.push('05');
            }else if(list[i] == '1:5'){
              _tmp.push('15');
            }else if(list[i] == '2:5'){
              _tmp.push('25');
            }else if(list[i] == '负其它'){
              _tmp.push('09');
            }else if(list[i] == '0'){
              _tmp.push('0');
            }else if(list[i] == '1'){
              _tmp.push('1');
            }else if(list[i] == '2'){
              _tmp.push('2');
            }else if(list[i] == '3'){
              _tmp.push('3');
            }else if(list[i] == '4'){
              _tmp.push('4');
            }else if(list[i] == '5'){
              _tmp.push('5');
            }else if(list[i] == '6'){
              _tmp.push('6');
            }else if(list[i] == '7+' || list[i] == '7'){
              _tmp.push('7');
            }else if(list[i] == '胜胜'){
              _tmp.push('33');
            }else if(list[i] == '胜平'){
              _tmp.push('31');
            }else if(list[i] == '胜负'){
              _tmp.push('30');
            }else if(list[i] == '平胜'){
              _tmp.push('13');
            }else if(list[i] == '平平'){
              _tmp.push('11');
            }else if(list[i] == '平负'){
              _tmp.push('10');
            }else if(list[i] == '负胜'){
              _tmp.push('03');
            }else if(list[i] == '负平'){
              _tmp.push('01');
            }else if(list[i] == '负负'){
              _tmp.push('00');
            }

          }

          return _tmp;

      },

    },

    mounted(){

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'Soccer_page', 'onInit', '赛事列表','inited','Soccer_init']);

      if(Base.versions.isWeiXin){
        this.isWeiXin = true;
      }else{
        this.isWeiXin = false;
      }

      this.width = $(window).width();
      this.height = $(window).height();

      let _playIndex = this.$route.query.playIndex;

      if(!Base.isNull(_playIndex)) {
        this.playIndex = _playIndex;
        //混合过关
        if(this.playIndex == 0){

          this.msgStyle = {
            top: '65px',
            left: '15px',
          };

        }//胜平负
        if(this.playIndex == 1){

          this.msgStyle = {
            top: '35px',
            left: '15px',
          };

        }//让球胜平负
        if(this.playIndex == 2){

          this.msgStyle = {
            top: '35px',
            left: '15px',
          };

        }//比分
        if(this.playIndex == 3){

          this.msgStyle = {
            top: '30px',
            left: '15px',
          };

        }//总进球
        if(this.playIndex == 4){

          this.msgStyle = {
            top: '65px',
            left: '15px',
          };

        }//半全场
        if(this.playIndex == 5){

          this.msgStyle = {
            top: '30px',
            left: '15px',
          };
        }
        //单关
        if(this.playIndex == 6){

          this.msgStyle = {
            top: '30px',
            left: '15px',
          };
        }
      }

      Interface.userBaseInfo( (data) => {

        if (data) {
          if (Base.isNull(data.returnJSON)) {
            this.login = false;
          } else {
            this.login = true;
            this.user = data.returnJSON
          }
        } else {
          this.login = false;
        }
      });

      this.init();

    }

  }


</script>

