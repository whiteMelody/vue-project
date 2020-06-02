<template>
  <div id="soccer_order_page" class="warpper-black-4" :style="'min-height: '+ height +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="curSoccer.hTeam +' VS '+ curSoccer.vTeam" :back="true"></navTitle>

    <!--使用红包弹窗-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showOrder == true" @click="showOrder = false"></div>
    <div class="wb100 fixed warpper-black-4 bor-black4 bor-solid-1t" style="bottom: 0; z-index: 9999;" v-show="showOrder == true">
      <div class="pa15 h20px lh20px Fwhite-1" v-show="showRedBag == false">
        <span class="fl">确认订单</span>
        <span class="fr h20px lh20px" @click="showOrder = false">关闭</span>
      </div>
      <div class="clear bor-black4 bor-solid-1b"></div>
      <div class="wb100">
        <!--选择可用的红包-->
        <div class="wb100 Fgray-5" v-show="showRedBag == true">
          <div class="wb100 over-auto" style="height: 277px">
            <template v-for="(item,key) in redBagList">

              <div class="pa15 warpper-black-3" @click="myClick(key)">

                <div class="w80px h50px warpper-orange-2 fl text-center Fwhite pat10 pab10 lh25px F14 radius5">
                  <p class="lh25px"><span class="Fnum F24">{{item.faceValue}}</span>元</p>
                  <p class="F12 lh15px">满<span class="Fnum">{{item.limit}}</span>可用</p>
                </div>

                <div class="w180px fl lh30px pat10 pal10" style="width: 170px;">
                  <p class="F18 lh25px Fblack-2">红包</p>
                  <p class="F12 Fwhite-1">有效期至<span class="Fnum">{{item.endTime}}</span></p>
                </div>

                <div class="w30px h30px fr mat20">
                  <el-radio class="radio" v-model="redBagRadio" :label="key">&nbsp;</el-radio>
                </div>

                <div class="clear"></div>

              </div>

              <div class="clear1"></div>

            </template>
          </div>

          <div class="clear1"></div>

          <div class="wb100">
            <div class="pa15">
              <div class="wb45 fl bor-gray bor-solid-1a Fgray-3 h45px lh45px text-center radius5 warpper-white" @click="selectRedBag(0)">
                取消
              </div>
              <div class="wb45 fr warpper-orange-2 Fwhite pa1 h45px lh45px text-center radius5" @click="selectRedBag(1)">
                确定
              </div>
            </div>
          </div>

          <div class="clear1"></div>

        </div>

        <div class="wb100" v-show="showRedBag == false">

          <div class="clear1"></div>

          <!--下单支付-->
          <template v-if="resultMoney > 0">
            <div class="pal15 Fblack-2 lh45px warpper-black-3">

              <p class="par15 h45px">
                <span class="fl">订单金额</span>
                <span class="fr Fnum Fwhite-1">{{sumPrice}}元</span>
              </p>

              <div class="clear bor-black2 bor-solid-1b"></div>

              <template v-if="redBagList.length == 0">
                <p class="par15 h45px">
                  <span class="fl">红包</span>
                  <span class="fr Fwhite-1">暂无可用</span>
                </p>
              </template>

              <template v-else>
                <p class="par15 h45px" @click="showRedBag = true">
                  <span class="fl">红包</span>

                  <template v-if="redBagMoney == 0">
                    <span class="fr Fwhite-1">{{redBagList.length}}个可用红包 <img src="~@/assets/images/arrow-right.png" class="fr h14px mal5" style="margin-top: 16px;"></span>
                  </template>

                  <template v-if="redBagMoney != 0">
                    <span class="fr Fnum Fred">-{{redBagMoney}}元<img src="~@/assets/images/arrow-right.png" class="fr h14px mal5 mat15"></span>
                  </template>

                </p>
              </template>

              <div class="clear bor-black2 bor-solid-1b"></div>
              <p class="par15 h45px">
                <span class="fl">余额抵扣</span>
                <span class="fr Fnum Forange-2">{{twoDecimal(user.accountBalance)}}元</span>
              </p>
              <div class="clear"></div>

            </div>

            <div class="clear1"></div>

            <div class="pal15 par15 lh45px h45px Fblack-2 warpper-black-3">
              <span class="fl">应付</span>
              <span class="fr Fnum Fred">{{ twoDecimal(resultMoney) }}元</span>
            </div>

            <div class="pa15">
              <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="submitOrder">
                立即支付
              </div>
            </div>

          </template>

          <!--余额支付-->
          <template v-else>
            <div class="pal15 Fblack-2 lh45px warpper-black-3">

              <p class="par15 h45px">
                <span class="fl">订单金额</span>
                <span class="fr Fnum Fwhite-1">{{sumPrice}}元</span>
              </p>

              <div class="clear bor-black2 bor-solid-1b"></div>

              <template v-if="redBagList.length == 0">
                <p class="par15 h45px">
                  <span class="fl">红包</span>
                  <span class="fr Fwhite-1">暂无可用</span>
                </p>
              </template>

              <template v-else>
                <p class="par15 h45px" @click="showRedBag = true">
                  <span class="fl">红包</span>

                  <template v-if="redBagMoney == 0">
                    <span class="fr Fwhite-1">{{redBagList.length}}个可用红包 <img src="~@/assets/images/arrow-right.png" class="fr h14px mal5" style="margin-top: 16px;"></span>
                  </template>

                  <template v-if="redBagMoney != 0">
                    <span class="fr Fnum Fred">-{{redBagMoney}}元<img src="~@/assets/images/arrow-right.png" class="fr h14px mal5 mat15"></span>
                  </template>

                </p>
              </template>

              <div class="clear bor-black2 bor-solid-1b"></div>
              <p class="par15 h45px">
                <span class="fl">余额</span>
                <span class="fr Fnum Forange-2">{{twoDecimal(user.accountBalance)}}元</span>
              </p>
              <div class="clear"></div>

            </div>

            <div class="clear1"></div>

            <div class="pal15 par15 lh45px h45px Fblack-2 warpper-black-3">
              <span class="fl">应付</span>
              <span class="fr Fnum Fred">{{ twoDecimal(payment) }}元</span>
            </div>

            <div class="pa15">
              <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="submitOrder">
                余额支付
              </div>
            </div>
          </template>

        </div>
      </div>
    </div>

    <!--购买成功弹窗-->
    <el-dialog
      :visible.sync="dialogBuySuccess"
      size="large"
      :show-close="false">

      <p class="text-center F24">购买成功</p>

      <div class="clear1"></div>

      <p class="Fgray-3 text-center F16">购买成功，请关注出票状态，祝您中奖</p>

      <div class="clear1"></div>
      <div class="clear1"></div>

      <div class="wb100">
        <div class="wb40 text-center radius5 Fred h38px lh38px bor-red bor-solid-1a F16 fl" @click="back">
          返回
        </div>

        <div class="wb40 text-center radius5 h38px lh38px pa1 fr warpper-red Fwhite F16" @click="toDetail">
          查看详情
        </div>
      </div>

      <div class="clear"></div>

    </el-dialog>

    <div class="wb100">

      <!--赛事详情-->
      <div class="wb100">

          <div class="wb100  radius5">

            <div class="wb100" :style="'background: url('+matchDefaultBg+') no-repeat; background-size: 100% 100%;'">

              <div class="clear1"></div>

              <div class="pat10 pal15 par15 text-center lh20px Fwhite">
                <div class="wb30 fl pat10">
                  <div class="w50px h50px center img-area">
                    <img :src="curSoccer.hTeamLogo">
                  </div>
                  <p class="lh30px text-over-hidden1 h30px">{{curSoccer.hTeam}}</p>
                  <p class="F12 lh20px">
                    <span class="w30px h18px lh18px display-inline warpper-red radius4 text-center">主队</span>
                  </p>
                </div>
                <div class="wb40 fl">
                    <div class="wb80 center Fwhite">
                      <p class="lh40px text-over-hidden1 F14">{{curSoccer.league}} {{weekFormat(curSoccer.weekId)}}</p>
                      <!--{{match.matchNum}}-->
                      <div class="w60px h50px center img-area">
                        <img src="~@/assets/images/icon-vs.png">
                      </div>
                      <p class="F12 lh20px Fnum">{{ dateFormat2(curSoccer.matchTime)}}</p>
                    </div>

                </div>
                <div class="wb30 fr pat10">
                  <div class="w50px h50px center img-area">
                    <img :src="curSoccer.vTeamLogo">
                  </div>
                  <p class="lh30px text-over-hidden1 h30px">{{curSoccer.vTeam}}</p>
                  <p class="F12 lh20px">
                    <span class="w30px h18px lh18px display-inline warpper-blue radius4 text-center">客队</span>
                  </p>
                </div>

                <div class="clear h10px"></div>

              </div>

              <div class="clear1"></div>

              <!--<p style="background: rgba(0,0,0,.1);" class="h30px lh30px Fwhite pal15 par15 F14">-->

                <!--{{curSoccer.weatherCity}} {{curSoccer.weather}}-->
              <!--</p>-->

            </div>

            <div class="wb100 text-center h35px lh35px pat10 pab10 warpper-black-3">
              <div class="wb50 fl" @click="searchType = 0">
                <span :class="searchType == 0 ? 'bor-oragne2 bor-solid-2b h38px lh38px F18 Forange-2' : 'h35px lh35px Fwhite-1'" class="display-inline">竞猜</span>
              </div>
              <div class="wb50 fl" @click="searchType = 1">
                <div class="wb100">
                  <span :class="searchType == 1 ? 'bor-oragne2 bor-solid-2b h38px lh38px F18 Forange-2' : 'h35px lh35px Fwhite-1'" class="display-inline">资讯</span>
                </div>
              </div>
            </div>

            <template v-if="searchType == 0">
              <!--投注的内容-->
              <div class="pa10 F14">
                <!--<p class="text-center Fblack h20px lh20px F16">{{curSoccer.hTeam}} <span class="pal15 par15 Fnum">VS</span> {{curSoccer.vTeam}}</p>-->

                <div class="wb100">

                  <div class="relative bor-black2 bor-solid-1l  bor-black2 bor-solid-1b bor-black2 bor-solid-1t">

                    <template v-if="curSoccer.disFT001 == true">
                      <!--本场比赛不支持胜平负-->
                      <!--<p>暂未开售</p>-->
                      <p class="h60px lh60px text-center warpper-black-3 Fwhite-1 bor-solid-1r bor-black2">胜平负 暂未开售</p>
                      <div class="clear bor-solid-1b bor-black2"></div>
                    </template>

                    <template v-else>
                      <div class="pal20 relative">
                        <div class="h60px lh60px text-center warpper-gray-2 w20px absolute Fwhite Fnum" style="top: 0; left: 0;">
                          0
                        </div>
                        <div class="wb100 text-center">
                          <div class="wb33333 fl " v-for="item in curSoccer.resultList">
                            <template v-if="item.isSelect == true">
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item)">
                                <p class="Fwhite-1">{{item.val}}</p>
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
                      <p class="h60px lh60px text-center warpper-black-3 Fwhite-1 bor-solid-1r bor-black2">让球胜平负 暂未开售</p>
                      <div class="clear bor-solid-1b bor-black2"></div>
                    </template>

                    <template v-else>
                      <div class="pal20 relative">
                        <div class="h60px lh60px text-center warpper-red w20px absolute Fwhite Fnum" v-if="curSoccer.concede>0" style="top: 0px; left: 0;">
                          +{{curSoccer.concede}}
                        </div>
                        <div class="h60px lh60px text-center warpper-gray-2 w20px absolute Fwhite Fnum" v-if="curSoccer.concede==0" style="top: 0px; left: 0;">
                          {{curSoccer.concede}}
                        </div>
                        <div class="h60px lh60px text-center warpper-blue w20px absolute Fwhite Fnum" v-if="curSoccer.concede<0" style="top: 0px; left: 0;">
                          {{curSoccer.concede}}
                        </div>
                        <div class="wb100 text-center">
                          <div class="wb33333 fl " v-for="item in curSoccer.concedeResultList">
                            <template v-if="item.isSelect == true">
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r warpper-black-3" @click="changeSelect(item)">
                                <p class="Fwhite-1">{{item.val}}</p>
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

                  <div class="clear h10px"></div>

                  <template v-if="curSoccer.disFT002 == true">
                    <!--本场比赛不支持比分-->
                    <p class="h60px lh60px text-center warpper-black-3 Fwhite-1 bor-solid-1r bor-black2">比分 暂未开售</p>
                    <div class="clear bor-solid-1b bor-black2"></div>
                  </template>

                  <template v-else>
                    <div class="pal20 relative">
                      <div class="text-center warpper-blue w20px absolute Fwhite" style="top: 0; left: 0; height: 228px; padding-top: 198px;">
                        比分
                      </div>

                      <div class="wb100 bor-black2 bor-solid-1t">

                        <div class="wb100 text-center">
                          <div class="fl" v-for="(item,key) in curSoccer.winList" :class="key == curSoccer.winList.length-1 ? 'wb60' : 'wb20'">
                            <template v-if="item.isSelect == true">
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite Fnum">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
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
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite Fnum">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
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
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                                <p class="Fwhite Fnum">{{item.val}}</p>
                                <p class="Fwhite Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                                <p class="Fwhite-1 Fnum">{{item.val}}</p>
                                <p class="Fblack-2 Fnum">{{item.odds}}</p>
                              </div>
                            </template>
                          </div>

                        </div>

                      </div>
                      <div class="clear"></div>

                    </div>
                    <div class="clear h10px"></div>
                  </template>

                  <template v-if="curSoccer.FT003 == true">
                    <!--本场比赛不支持总进球-->
                    <p class="h60px lh60px text-center warpper-black-3 Fwhite-1 bor-solid-1r bor-black2">总进球 暂未开售</p>
                    <div class="clear bor-solid-1b bor-black2"></div>
                  </template>

                  <template v-else>
                    <div class="bor-black2 bor-solid-1t bor-solid-1l pal20 relative">

                      <div class="text-center warpper-green w20px absolute Fwhite" style="top: 0; left: 0; height: 85px; padding-top: 36px;">
                        总进球
                      </div>

                      <div class="wb100 text-center">
                        <div class="wb25 fl" v-for="item in curSoccer.goalsList">
                          <template v-if="item.isSelect == true">
                            <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                              <p class="Fwhite Fnum">{{item.val}}</p>
                              <p class="Fwhite Fnum">{{item.odds}}</p>
                            </div>
                          </template>
                          <template v-else>
                            <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
                              <p class="Fwhite-1 Fnum">{{item.val}}</p>
                              <p class="Fblack-2 Fnum">{{item.odds}}</p>
                            </div>
                          </template>
                        </div>
                      </div>

                      <div class="clear"></div>

                    </div>

                    <div class="clear h10px"></div>
                  </template>

                  <template v-if="curSoccer.FT004 == true">
                    <!--本场比赛不支持半全场胜平负-->
                    <p class="h60px lh60px text-center warpper-black-3 Fwhite-1 bor-solid-1r bor-black2">半全场 暂未开售</p>
                    <div class="clear bor-solid-1b bor-black2"></div>
                  </template>

                  <template v-else>
                    <div class="pal20 relative bor-black2 bor-solid-1t">
                      <div class="text-center warpper-purple bor-black2 bor-solid-1b bor-solid-1l w20px absolute Fwhite" style="top: 0; left: 0; height: 119px; padding-top: 63px;">
                        半全场
                      </div>

                      <div class="wb100 text-center">
                        <div class="wb33333 fl" v-for="(item,key) in curSoccer.doubleResultList">
                          <template v-if="item.isSelect == true">
                            <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-orange-2" @click="changeSelect(item)">
                              <p class="Fwhite Fnum">{{item.val}}</p>
                              <p class="Fwhite Fnum">{{item.odds}}</p>
                            </div>
                          </template>
                          <template v-else>
                            <div class="h50px lh25px pat5 pab5 bor-black2 bor-solid-1r bor-solid-1b warpper-black-3" @click="changeSelect(item)">
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

                <div class="clear"></div>

              </div>

            </template>

            <template v-if="searchType == 1">

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

            </template>

          </div>

      </div>

      <template v-if="searchType == 0">

        <div class="clear h100px"></div>

        <div class="wb100 bor-black2 bor-solid-1t fixed warpper-black" style="bottom: 0;">

          <div class="pal15 par15 h30px lh30px pat10 pab10 relative warpper-black-3">

            <span class="fl Fwhite-1 F14">余额：<span class="Forange-2">￥{{user.accountBalance}}</span></span>

            <div class="w120px Fwhite-1 F14 fr">
              <!--<span class="fl w20px text-left">投</span>-->
              <!--<div class="fl">-->
              <!--<el-input-number type="tel" class="fl text-center" size="small" v-model="multiple" :controls="false" @change="multipleChange" :min="1" :max="9999" />-->
              <!--</div>-->
              <!--<span class="fr w20px text-right">倍</span>-->
              <el-input-number type="tel" class="text-center Fgray" size="small" v-model="multiple" @change="multipleChange" :min="1" :max="9999" />

              <span class="fr w20px text-right">倍</span>
            </div>

          </div>

          <div class="pat10 pab10 relative h40px">

            <div class="w80px text-center radius5 h38px lh38px pa1 absolute F14" :class="sumNum <= 0 ? 'warpper-gray-2 Fwhite' : 'warpper-orange-2 Fwhite'" @click="toPay" style="right: 15px; top: 10px;">
              立即支付
            </div>

            <div class="lh20px F14 Fwhite-1 fl pal10">
              <p>{{sumNum}}注 {{multiple}}倍 共<span class="Fyellow">{{sumPrice}}</span>元</p>
              <p class="Forange-2">预计奖金:{{minPrice}}~{{maxPrice}}元</p>
            </div>

          </div>
        </div>

      </template>

    </div>

  </div>
</template>


<style>
  .el-input-number--small{ width: 100px; overflow: hidden; -moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px}
</style>


<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'
  import Bg from '../assets/images/bg-more.png'
  import Bg2 from '../assets/images/bg-soccer.png'
  import matchBg from '../assets/images/bg-detail.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        matchID: '',
        curSoccer: {},
        match : {},
        bgMore: Bg,
        matchDefaultBg: matchBg,
        news: [],
        searchType: 0,
        bg: Bg2,
        width: 0,
        height: 0,
        multiple: 10,
        periods: 1,
        sumNum: 0,
        sumPrice: 0,
        maxPrice: 0,
        minPrice: 0,
        playIndex: 6,
        resultList : ['主胜','平','客胜'],
        concedeResultList : ['主胜','平','客胜'],
        goalsList : ['0','1','2','3','4','5','6','7+'],
        winList : ['1:0','2:0','2:1','3:0','3:1','3:2','4:0','4:1','4:2','5:0','5:1','5:2','胜其他'],
        flatList : ['0:0','1:1','2:2','3:3','平其他'],
        lostList : ['0:1','0:2','1:2','0:3','1:3','2:3','0:4','1:4','2:4','0:5','1:5','2:5','负其他'],
        doubleResultList : ['胜胜','胜平','胜负','平胜','平平','平负','负胜','负平','负负'],
        user: {
          accountBalance: 0,
          nickName: ''
        },
        lock: true,
        dialogBuySuccess: false,
        showRedBag: false,
        showOrder: false,
        redBagList: [],
        resultMoney: 0,
        payment: 0,
        redBagMoney: 0,
        redBagRadio: -1,

      }
    },

    methods: {
      init() {

        Interface.userBaseInfo( (data) => {
          if (data) {
            if (Base.isNull(data.returnJSON)) {
              //未登录
            } else {
              //已登录
              this.user = data.returnJSON;
              Base.setCookie('userInfo', JSON.stringify(data.returnJSON));
            }
          } else {
            //获取失败
          }
        });

        Interface.matchInfo(this.matchID, (data) => {
//        this.curSoccer = data.returnJSON.query[0].matchs[0]

          let _item = data.returnJSON.match;

            _item.rate = data.returnJSON.matchRate;

            _item.unsupport = data.returnJSON.unsupport;

            let _tmpArray = [];
//                  wType

            let _data = JSON.stringify({
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

            this.curSoccer = _item;

            //- cnzz自定义统计
            // 测试完后请删除这条注数

            _czc.push(["_setAccount", "1271278320"]);
            _czc.push(['_trackEvent', 'SoccerDetailBet_page', 'onInit', '单关投注详情页','inited','SoccerDetail_init']);

          this.fullscreenLoading = false;

//            console.log(_item);

        })

        Interface.getMatchNews(this.matchID, (data) => {
          if (data) {
            let _tmp = data.returnJSON;
            for(let i=0; i< _tmp.length; i++){
              if(Base.isNull(_tmp[i].picImg)){
                _tmp[i].picImgs = []
              }else{
                _tmp[i].picImgs = _tmp[i].picImg.split("|")
              }
            }
            this.news = _tmp
          }

        })

      },

      toPay(){
        this.payment = this.sumPrice - this.redBagMoney;
        this.resultMoney = this.sumPrice - this.user.accountBalance - this.redBagMoney;

        let _this = this;

        //查询可用的红包
        Interface.userCouponList( (data) => {
          if(data){
            if(data.returnJSON.length > 0 ){
              let _tmp = data.returnJSON;

              let _tmp2 = _tmp.filter((item) =>{
                return item.status == 0;
              })

              //判断是否有可用红包
              let _tmp3 = _tmp2.filter((item) => {
                return item.limit <= this.sumPrice
              })

              if(_tmp3.length >0){
                //弹出确认界面
                this.redBagList = _tmp3;
                this.showOrder = true;
              }else{
                //直接支付
                this.submitOrder();
              }

            }else{
              //直接支付
              this.submitOrder();
            }
          }else{
            //直接支付
            this.submitOrder();
          }
        })

      },

      selectRedBag(val) {

        if (val == 1) {
          //
          this.redBagMoney = this.redBagList[this.redBagRadio].faceValue;
        }
        if (val == 0) {
          //
          this.redBagMoney = 0;
          this.redBagRadio = -1;
        }

        this.showRedBag = false;

        this.payment = this.sumPrice - this.redBagMoney;
        this.resultMoney =  this.sumPrice - this.user.accountBalance - this.redBagMoney;

      },

      back() {
        this.dialogBuySuccess = false;
      },
      toBack() {
        this.dialogAgreement = false;
      },
      toDetail() {
        this.dialogBuySuccess = false;

        if (Base.isNull(this.ticketID)) {
          //投注失败
        } else {
          this.$router.push({ name: 'SoccerDetail', params: { ticketID: this.ticketID } });
        }

        this.dialogBuySuccess = false;
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


      myClick(key) {
        this.redBagRadio = key;
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

      dateFormat2(date) {
        if(Base.isNull(date))
          return '';
        return date.substring(5, date.length-3);
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

      dateFormat(date, index) {
        return date.substring(5, index);
      },

      cutStrForNum(str, num) {
        if(str.length <= num){
          return str;
        }else{
          return str.substring(0, num-1) + '...';
        }
      },

      changeSelect(item){
        item.isSelect = !item.isSelect;

          let _item = this.curSoccer;

          let _flag = false;

          let selectData = [];

          _flag = false;
          //胜平负选择状态
          for (let j = 0; j < _item.resultList.length; j++) {
            if (_item.resultList[j].isSelect == true) {
              _flag = true;
              selectData.push(_item.resultList[j]);
            }
          }
          //让球胜平负选择状态
          for (let j = 0; j < _item.concedeResultList.length; j++) {
            if (_item.concedeResultList[j].isSelect == true) {
              _flag = true;
              selectData.push(_item.concedeResultList[j]);
            }
          }
          //比分选择状态(胜)
          for (let j = 0; j < _item.winList.length; j++) {
            if (_item.winList[j].isSelect == true) {
              _flag = true;
              selectData.push(_item.winList[j]);
            }
          }
          //比分选择状态（平）
          for (let j = 0; j < _item.flatList.length; j++) {
            if (_item.flatList[j].isSelect == true) {
              _flag = true;
              selectData.push(_item.flatList[j]);
            }
          }

          //比分选择状态（负）
          for (let j = 0; j < _item.lostList.length; j++) {
            if (_item.lostList[j].isSelect == true) {
              _flag = true;
              selectData.push(_item.lostList[j]);
            }
          }

        //总进球选择状态
        for (let j = 0; j < _item.goalsList.length; j++) {
          if (_item.goalsList[j].isSelect == true) {
            _flag = true;
            selectData.push(_item.goalsList[j]);
          }
        }
        //半全场选择状态
        for (let j = 0; j < _item.doubleResultList.length; j++) {
          if (_item.doubleResultList[j].isSelect == true) {
            _flag = true;
            selectData.push(_item.doubleResultList[j]);
          }
        }

        _item.selectData = selectData;

        this.calculate();

      },
      myBack() {

        if (Base.isNull(this.call)) {
          this.$router.go(-1);
        } else {
          this.$router.replace({ name: this.call });
        }
      },

      calculate() {

          if(this.curSoccer.selectData.length == 0){
              this.minPrice = 0;
              this.maxPrice = 0;
              this.sumNum = 0;
              this.sumPrice = 0;
              return false;
          }

          //单关计算模式
          let _s1 = 0, __max = 0, priceSection = [];

          for(let j=0; j<this.curSoccer.selectData.length; j++){
            let _item = this.curSoccer.selectData[j];
            //计算预计奖金

            //计算总注数
            _s1 ++;
            priceSection.push(this.formatDouble(_item.odds * 2 * this.multiple));
          }

          for(let i=0; i<priceSection.length; i++){
            __max += priceSection[i];
          }

          this.minPrice = Base.twoDecimal(priceSection.sort()[0]);
          this.maxPrice = Base.twoDecimal(__max);
          this.sumNum = _s1;
          this.sumPrice = _s1 * 2 * this.multiple;

//        console.log(_s1);

      },

      //奖金计算规则
      formatDouble(num){

        let _str = num + '';

        let i1 = _str.indexOf('.');

        //整数
        if(i1==-1){
          return num;
        }else{
          //小数位大于3
          if(_str.length - i1 > 3){

            let _dol = _str.substring(i1+3, i1+4);

            let _dol2 = Number.parseFloat(_str.substring(i1+3, i1+4));

            let __num = Number.parseFloat(_str.substring(0, i1+3));

            if(_dol <= 4){

            }else if(_dol == 5){

              if(_dol2%2 != 0){
                __num = __num + 0.01;
              }

            }else if(_dol >= 6){
              __num = __num + 0.01;
            }

            return Number.parseFloat(Base.twoDecimal(__num));

          }else{
            return Number.parseFloat(Base.twoDecimal(num));
          }

        }

      },

      multipleChange(val) {
        this.multiple = val;
        this.calculate();
      },
      periodsChange(val) {
        this.periods = val;
        this.calculate();
      },
      removeTicket(id) {
        Base.delTicketByID(id, 'soccer');
        this.init();
      },

      checkMix(list){

        if(list.length <=1)
          return false;

        let _t = list[0], _flag = true;

        for(let i=0; i<list.length; i++){
          if(_t.type != list[i].type)
            _flag = false;
        }

        return _flag;

      },

      //清空全部
      emptyall() {
        window.sessionStorage.setItem('soccer_ticket', JSON.stringify([]));
        this.init();
        this.calculate();
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

      submitOrder() {
//        if (this.lock == true)  return false;
//
//        this.lock = true;

        var _userID = Interface.getUserId();

        if (_userID == 0) {
          this.$router.push({ name: 'Login', params: { call: true } });
          return false;
        }

        //剔除筛选以外的值
        let _tList = [];
        let _matchList = [];

        _tList.push(JSON.parse(JSON.stringify(this.curSoccer)));

        let _tArr = [];

        for(let i=0; i<_tList.length; i++){

          let sData = [];

          for(let j=0; j<_tList[i].selectData.length; j++){
            sData.push({
              name: _tList[i].selectData[j].name,
              odds: _tList[i].selectData[j].odds,
              type: _tList[i].selectData[j].type,
              val: _tList[i].selectData[j].val,
            })
          }

          _tArr.push({
            concede: _tList[i].concede,
            day: _tList[i].day,
            hTeam: _tList[i].hTeam,
            league: _tList[i].league,
            matchID: _tList[i].matchID,
            matchTime: _tList[i].matchTime,
            playIndex: _tList[i].playIndex,
            selectData: sData,
            teamId: _tList[i].teamId,
            vTeam: _tList[i].vTeam,
            weekId: _tList[i].weekId,
          })
        }

        //重组赛事数据
        for(let i=0; i<_tArr.length; i++){

          for(let j=0; j<_tArr[i].selectData.length; j++){

            _matchList.push({
              day: _tArr[i].day,
              weekId: _tArr[i].weekId,
              teamId: _tArr[i].teamId,
              type: _tArr[i].selectData[j].type,
              lotResult: _tArr[i].selectData[j].name.substring(1),
            })
          }

        }

        let _playTypeList = 500;
        let _LotId = 105;

        let _serialNumber = '';

        if(this.redBagMoney != 0){
          _serialNumber = this.redBagList[this.redBagRadio].serialNumber;
        }

        Interface.raceTicket(_LotId, this.multiple, this.sumPrice, _playTypeList, _matchList, _serialNumber, (data, errorMsg) => {

//        Interface.ftTicket(_LotId, this.multiple, _temp, resultGroup, (data, errorMsg) => {

          if(data){

            if(data.returnJSON.tradeResult == 2){

              let __arr = []
              //生成待支付订单
              let _item = this.curSoccer
              __arr.push({
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

              window.sessionStorage.setItem('soccer_ticket', JSON.stringify(__arr));

              //需要余额支付
              if(Base.versions.isWeiXin){
                this.$router.push({ name: 'WxPay', query: { money: data.returnJSON.payMoney, tradeNo: data.returnJSON.tradeNo } });
              }else{
                this.$router.push({ name: 'Pay', params: { money: data.returnJSON.payMoney, tradeNo: data.returnJSON.tradeNo } });
              }
            }else{

              this.showOrder = false;
              this.dialogBuySuccess = true;
              this.ticketID = data.returnJSON.tradeNo;
//              window.sessionStorage.setItem('soccer_ticket', JSON.stringify([]));
              this.curSoccer.selectData = [];
              this.redBagMoney = 0;
              this.redBagRadio = -1;

              this.init();
              this.calculate();
            }

          }else{
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
        })

      }
    },

    mounted(){



      this.width = $(window).width();
      this.height = $(window).height();

      this.matchID = this.$route.params.matchID;

      this.init();


    }

  }


</script>

