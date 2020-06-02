<template>
  <div id="soccer_order_page" class="warpper-black-4" :style="'width:100%; min-height: '+ height +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <!--登录弹窗 组件 -->
    <!--<div class="dialogBg" style="z-index: 99999" v-show="showLogin == true" @click="showLogin = false"></div>-->
    <!--<login :show="showLogin" v-on:callback="loginSuccess"></login>-->

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
                    <span class="fr Fnum Forange-2">-{{redBagMoney}}元<img src="~@/assets/images/arrow-right.png" class="fr h14px mal5 mat15"></span>
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
              <span class="fr Fnum Forange-2">{{ twoDecimal(resultMoney) }}元 </span>
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
                    <span class="fr Fnum Forange-2">-{{redBagMoney}}元<img src="~@/assets/images/arrow-right.png" class="fr h14px mal5 mat15"></span>
                  </template>

                </p>
              </template>

              <p class="par15 h45px">
                <span class="fl">余额</span>
                <span class="fr Fnum Forange-2">{{twoDecimal(user.accountBalance)}}元</span>
              </p>
              <div class="clear"></div>

              <div class="clear bor-black2 bor-solid-1b"></div>

            </div>

            <div class="clear1"></div>

            <div class="pal15 par15 lh45px h45px Fblack-2 warpper-black-3">
              <span class="fl">应付</span>
              <span class="fr Fnum Forange-2">{{ twoDecimal(payment) }}元</span>
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

    <div class="wb100">

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

      <!--购彩协议弹窗-->
      <div class="agreement warpper-black-4">
        <el-dialog
          :visible.sync="dialogAgreement"
          :show-close="false"
          size="large"
        >
          <div class="fr" style="margin-top: -20px" @click="toBack"><img class="w20px"src="~@/assets/images/close.png"></div>
          <div class="clear1 h5px"></div>
          <div v-html="contents" style="height: 320px; overflow-y: auto;"></div>
        </el-dialog>
      </div>

      <!--胜平负弹窗-->
      <div class="dialogBg" v-show="showR1 == true"></div>
      <div class="wb100" v-show="showR1 == true" style="position: fixed; height: 450px; z-index: 99; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">

        <div class="pa15">
          <div class="wb100 warpper-black-4 radius5  bor-black4 bor-solid-2a">

            <div class="pa15 F12">
              <p class="text-center Fwhite-1 h20px lh20px F16">{{curSoccer.hTeam}} <span class="pal15 par15 Fnum">VS</span> {{curSoccer.vTeam}}</p>

              <div class="clear1"></div>

              <div class="wb100">

                <div class="wb100 relative bor-black1 bor-solid-1t bor-solid-1b bor-solid-1l">

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
              </div>

              <div class="clear1"></div>

              <div class="wb100">
                <div class="wb45 fl lh35px h35px warpper-black-3 bor-black1 bor-solid-1a radius5 text-center F14 Fwhite" @click="closeDialog('cancel')">
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

      <!--让球胜平负弹窗-->
      <div class="dialogBg" v-show="showR2 == true"></div>
      <div class="wb100" v-show="showR2 == true" style="position: fixed; height: 450px; z-index: 99; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">

        <div class="pa15 F12">
          <div class="wb100 warpper-black-4 radius5 bor-black4 bor-solid-2a">

            <div class="pa15">
              <p class="text-center Fwhite-1 h20px lh20px F16">{{curSoccer.hTeam}} <span class="pal15 par15 Fnum">VS</span> {{curSoccer.vTeam}}</p>

              <div class="clear1"></div>

              <div class="wb100">
                <div class="pal20 relative bor-black1 bor-solid-1t bor-solid-1b bor-solid-1l">

                  <div class="h50px lh50px text-center warpper-red w20px absolute Fwhite" v-if="curSoccer.concede>0" style="top: 0; left: 0;">
                    +{{curSoccer.concede}}
                  </div>
                  <div class="h50px lh50px text-center warpper-gray-2 w20px absolute Fwhite" v-if="curSoccer.concede==0" style="top: 0; left: 0;">
                    {{curSoccer.concede}}
                  </div>
                  <div class="h50px lh50px text-center warpper-blue w20px absolute Fwhite" v-if="curSoccer.concede<0" style="top: 0; left: 0;">
                    {{curSoccer.concede}}
                  </div>

                  <div class="wb100 text-center">
                    <div class="wb33333 fl" v-for="item in curSoccer.concedeResultList">
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

                  <div class="clear"></div>

                </div>

              </div>

              <div class="clear1"></div>

              <div class="wb100">
                <div class="wb45 fl lh35px h35px warpper-black-3 bor-black1 bor-solid-1a radius5 text-center F14 Fwhite" @click="closeDialog('cancel')">
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

      <!--总进球数弹窗-->
      <div class="dialogBg" v-show="showR4 == true"></div>
      <div class="wb100" v-show="showR4 == true" style="position: fixed; height: 450px; z-index: 99; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">

        <div class="pa15 F12">
          <div class="wb100 warpper-black-4 radius5 bor-black4 bor-solid-2a">

            <div class="pa15">
              <p class="text-center Fwhite-1 h20px lh20px F16">{{curSoccer.hTeam}} <span class="pal15 par15 Fnum">VS</span> {{curSoccer.vTeam}}</p>

              <div class="clear1"></div>

              <div class="wb100">

                <div class="bor-black1 bor-solid-1t bor-solid-1l relative">

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

              </div>

              <div class="clear1"></div>

              <div class="wb100">
                <div class="wb45 fl lh35px h35px warpper-black-3 bor-black1 bor-solid-1a radius5 text-center F14 Fwhite" @click="closeDialog('cancel')">
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

      <!--选择比分弹窗-->
      <div class="dialogBg" v-show="showScore == true"></div>
      <div class="wb100" v-show="showScore == true" style="position: fixed; height: 450px; z-index: 99; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">

        <div class="pa15 F12">
          <div class="wb100 warpper-black-4 radius5 bor-black4 bor-solid-2a">

            <div class="pa15">
              <p class="text-center Fwhite-1 h20px lh20px F16">{{curSoccer.hTeam}} <span class="pal15 par15 Fnum">VS</span> {{curSoccer.vTeam}}</p>

              <div class="clear1"></div>

              <div class="wb100" style="height: 320px; overflow: scroll">
                <div class="pal20 relative bor-black1 bor-solid-1t">
                  <div class="text-center warpper-red w20px absolute Fwhite bor-black1 bor-solid-1l" style="top: 0; left: 0; height: 153px; line-height: 153px;">
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

                <div class="pal20 relative bor-black1 bor-solid-1t">
                  <div class="text-center warpper-green w20px absolute Fwhite bor-black1 bor-solid-1l" style="top: 0; left: 0; height: 51px; line-height: 51px;">
                    平
                  </div>
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
                <div class="clear1"></div>

                <div class="pal20 relative bor-black1 bor-solid-1t">
                  <div class="text-center warpper-blue w20px absolute Fwhite bor-black1 bor-solid-1l" style="top: 0; left: 0; height: 153px; line-height: 153px;">
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
                <div class="wb45 fl lh35px h35px warpper-black-3 bor-black1 bor-solid-1a radius5 text-center F14 Fwhite" @click="closeDialog('cancel')">
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

              <div class="pal20 relative bor-black1 bor-solid-1t">
                <div class="text-center warpper-purple bor-black1 bor-solid-1b bor-solid-1l w20px absolute Fwhite" style="top: 0; left: 0; height: 101px; padding-top: 51px;">
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
                <div class="wb45 fl lh35px h35px warpper-black-3 bor-black1 bor-solid-1a radius5 text-center F14 Fwhite" @click="closeDialog('cancel')">
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

        <div class="pa15 F12">
          <div class="wb100 warpper-black-4 radius5 bor-black4 bor-solid-2a">

            <div class="pa15">
              <p class="text-center Fwhite-1 h20px lh20px F16">{{curSoccer.hTeam}} <span class="pal15 par15 Fnum">VS</span> {{curSoccer.vTeam}}</p>

              <div class="clear1"></div>

              <div class="wb100" style="height: 320px; overflow: scroll">

                <div class="relative bor-black1 bor-solid-1a">

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
                    <div class="clear bor-black1 bor-solid-1b"></div>
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

                    <div class="wb100 bor-black1 bor-solid-1t">

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
                  <div class="bor-black1 bor-solid-1t bor-solid-1l pal20 relative">

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
                  <div class="pal20 relative bor-black1 bor-solid-1t">
                    <div class="text-center warpper-purple bor-black1 bor-solid-1b bor-solid-1l w20px absolute Fwhite" style="top: 0; left: 0; height: 101px; padding-top: 51px;">
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
                <div class="wb45 fl lh35px h35px warpper-black-3 bor-black1 bor-solid-1a radius5 text-center F14 Fwhite" @click="closeDialog('cancel')">
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

      <div class="clear1"></div>
      <div class="pal15 par15 text-center Fgray-3 F14">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="wb100 h40px lh40px Fwhite-1 warpper-black-3" @click="myBack">
              + 添加/编辑赛事
            </div>
          </el-col>
          <el-col :span="12">
            <div class="wb100 h40px lh40px Fwhite-1 warpper-black-3" @click="emptyall">
              <img src="~@/assets/images/icon-clear.png" class="h18px middle"> 清空全部
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="clear"></div>

      <div class="pa15">
        <template v-for="(item,key) in ticket">

          <!--其他模式-->
          <template>
            <div class="wb100">
              <div class="pat10 pab10 par10 pal45 lh20px bor-black2 bor-solid-1a F14 relative warpper-black-3">

                <div class="h50px w25px absolute" @click="removeTicket(item.id)" style="left: 15px; top: 55px;">
                  <img src="~@/assets/images/icon-remove.png" style="float: left; width: 20px;">
                </div>

                <p class="F16 text-center lh25px Fwhite-1">{{item.hTeam}} VS {{item.vTeam}}</p>

                <div class="clear h10px"></div>

                <div class="wb100" @click="showDialog(key, item.playIndex)">
                  <p class="warpper-orange-2 Fwhite h35px lh35px text-center F14 radius5 text-over-hidden1">
                    <template v-for="(item2,key2) in item.selectData">
                      <template v-if="item2.type == 'FT006'">让球</template><template v-if="key2 == item.selectData.length - 1">{{item2.val}}</template><template v-else>{{item2.val}}，</template>
                    </template>
                  </p>

                  <div class="h45px w25px absolute" style="right: 15px; top: 55px;">
                    <img src="~@/assets/images/arrow-right.png" class="fr h15px mal15 mar10">
                  </div>
                </div>

              </div>

            </div>
          </template>

          <div class="clear1"></div>

        </template>
      </div>


      <div class="center over-hidden F14 Fblack-2" style="width: 233px" v-if="ticket.length>0">

        <div class="fl" @click="cancel"><el-checkbox v-model="checked" style="z-index: -1"></el-checkbox></div>
        <div class="fl mal5">我已阅读并同意《<span class="Forange-2"  @click="dialogAgreement = true">用户购彩协议</span>》</div>

      </div>

      <div class="text-center F16 Fblack-2" v-else>亲，你还没选择比赛哦~</div>

      <div class="clear h300px"></div>

      <div class="wb100 fixed warpper-black" style="bottom: 0; border-top: 1px solid #121212">

        <div class="pal15 par15 h30px lh30px pat10 pab10 relative warpper-black-3">

          <span class="fl Fwhite-1 F14">余额：<span class="Forange-2">￥{{user.accountBalance}}</span></span>

          <div class="w90px warpper-white h30px lh30px text-center Fgray-3 radius4" style="position: absolute; left: 0; right: 0; margin: 0 auto;" @click="showBunch = !showBunch">
            <template v-if="showBunch != true">展开</template>
            <template v-else>收起</template>
          </div>

          <div class="w120px Fwhite-1 F14 fr">
            <!--<span class="fl w20px text-left">投</span>-->
            <!--<div class="fl">-->
              <!--<el-input-number type="tel" class="fl text-center" size="small" v-model="multiple" :controls="false" @change="multipleChange" :min="1" :max="9999" />-->
            <!--</div>-->
            <!--<span class="fr w20px text-right">倍</span>-->
            <el-input-number type="tel" class="text-center Fgray-3" size="small" v-model="multiple" @change="multipleChange" :min="1" :max="99" />

            <span class="fr w20px text-right">倍</span>
          </div>

        </div>

        <div class="wb100" v-show="showBunch == true">
          <div class="pal15 par15 pat15">
            <template v-for="item in soccerGroup">
              <div class="wb25 fl">
                <div class="pal5 par5 "@click="item.isSelected = !item.isSelected; calculate()">
                  <p class="h30px lh30px radius5 text-center mab15 Fwhite" :class="item.isSelected ? 'warpper-orange-2' : 'warpper-black-3'" >{{item.val}}串1</p>

                </div>
              </div>
            </template>
            <div class="clear"></div>
          </div>
        </div>

        <div class="pat10 pab10 relative h40px bor-black2 bor-solid-1t">

          <div class="w80px text-center radius5 h38px lh38px pa1 absolute F14" :class="lock == true ? 'warpper-black-3 Fwhite-1' : 'warpper-orange-2 Fwhite'" @click="toPay" style="right: 15px; top: 10px;">
            立即支付
          </div>

          <div class="lh20px F14 Fwhite-1 fl pal10">
            <p>{{sumNum}}注 {{multiple}}倍 共<span class="Forange-2">{{sumPrice}}</span>元</p>
            <p class="Forange-2">预计奖金:{{minPrice}}~{{maxPrice}}元</p>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<style>
  .el-input-number--small{ width: 100px; overflow: hidden; -moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px}
</style>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'
  import Bg from '../../assets/images/bg-more.png'
  import Bg2 from '../../assets/images/bg-soccer.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        showScore: false,
        curSoccer : {},
        tmpSoccer : {},
        selectIndex : 0,
        showDoubleResult : false,
        showMix : false,
        showR1 : false,
        showR2 : false,
        showR3 : false,
        showR4 : false,
        showSearch : false,
        showService : false,
        showLogin: false,
        showRedBag: false,
        showOrder: false,
        bgMore: Bg,
        bg: Bg2,
        playIndex: 0,
        sessionNum: 0,
        width: 0,
        height: 0,
        //- 2018年3月9日15:49:49
        //- 改为默认10倍
        multiple: 10,
        periods: 1,
        sumNum: 0,
        sumPrice: 0,
        maxPrice: 0,
        minPrice: 0,
        payment: 0,
        resultMoney: 0,
        redBagMoney: 0,
        redBagRadio: -1,
        user: {
          accountBalance: 0,
          nickName: ''
        },
        lock: true,
        showBunch: true,
        dialogBuySuccess: false,
        dialogAgreement: false,
        dialogLogin: false,
        dialogConserve: false,
        dialogPay: false,
        duplex: true,
        ticket: [],
        redBagList: [],
        soccerGroup: [],
        selectGroup: '',
        checked: true,
        ticketID: '',
        contents: '<div class="F15 lh25px">\n<p class="text-center">\u5F69\u7968\u901A\u670D\u52A1\u534F\u8BAE</p>\n<p>2016\u5E7406\u670816\u65E5</p>\n<p>\u4E00\u3001\u76F8\u5173\u5B9A\u4E49</p>\n<p>1\u3001\u7528\u6237\uFF1A\u6307\u5728\u5F69\u7968\u901A\u6CE8\u518C\u767B\u8BB0\uFF0C\u5E76\u5F97\u5230\u5F69\u7968\u901A\u5728\u7EBF\u8BA4\u53EF\uFF0C\u6709\u8D44\u683C\u4EAB\u53D7\u5F69\u7968\u901A\u670D\u52A1\u7684\u6CE8\u518C\u4F1A\u5458\u3002</p>\n<p>2\u3001\u4EE3\u8D2D\uFF1A\u6307\u7528\u6237\u4EE5\u6CE8\u518C\u7684\u7528\u6237\u540D\u5355\u72EC\u59D4\u6258\u8D2D\u4E70\u67D0\u5F69\u79CD\uFF0C\u7528\u6237\u5BF9\u6240\u8D2D\u4E70\u7684\u5F69\u7968\u62E5\u6709\u5B8C\u6574\u7684\u5956\u91D1\u83B7\u5F97\u6743\u5229\u3002</p>\n<p>3\u3001\u5408\u4E70\uFF1A\u6307\u4E0D\u540C\u7684\u7528\u6237\u5408\u4F5C\u8D2D\u4E70\u67D0\u5F69\u79CD\uFF0C\u5404\u7528\u6237\u6309\u8D2D\u4E70\u91D1\u989D\u6309\u4EFD\u989D\u62E5\u6709\u6240\u8D2D\u4E70\u5F69\u7968\u7684\u5956\u91D1\u83B7\u5F97\u6743\u5229\u3002</p>\n<p>4\u3001\u9884\u4ED8\u6B3E\u8D26\u6237\uFF1A\u6307\u7528\u6237\u6309\u5F69\u7968\u901A\u7684\u8981\u6C42\uFF0C\u5728\u7F51\u7AD9\u4E0A\u8BBE\u7ACB\u7684\u8D26\u6237\uFF0C\u4E13\u95E8\u7528\u4E8E\u5B58\u653E\u9884\u4ED8\u6B3E\u3002</p>\n<p>5\u3001\u9884\u4ED8\u6B3E\uFF1A\u6307\u7528\u6237\u5B58\u653E\u5728\u9884\u4ED8\u6B3E\u8D26\u6237\u4E2D\u7684\u6B3E\u9879\uFF0C\u4E13\u95E8\u7528\u4E8E\u59D4\u6258\u5F69\u7968\u901A\u8D2D\u4E70\u7528\u6237\u6307\u5B9A\u7684\u5F69\u7968\uFF0C\u4EE5\u53CA\u5F69\u7968\u901A\u63D0\u4F9B\u7684\u5176\u4ED6\u670D\u52A1\u548C\u4EA7\u54C1\u3002</p>\n<p>6\u3001\u7528\u6237\u8D44\u6599\uFF1A\u6307\u7528\u6237\u5728\u6CE8\u518C\u65F6\u63D0\u4F9B\u7684\u4E2A\u4EBA\u4FE1\u606F\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\uFF1A\u7528\u6237\u540D\u3001\u6CE8\u518C\u8D26\u6237\u5BC6\u7801\u3001\u94F6\u884C\u5361\u8D26\u6237\u53CA\u5BC6\u7801\u3001\u7528\u6237\u771F\u5B9E\u59D3\u540D\u3001\u8EAB\u4EFD\u8BC1\u53F7\u7801\u7B49\u3002</p>\n<p>\u4E8C\u3001\u672C\u534F\u8BAE\u670D\u52A1\u8303\u56F4</p>\n<p>\u672C\u534F\u8BAE\u670D\u52A1\u8303\u56F4\u5305\u62EC\uFF1A\u63D0\u4F9B\u4EE3\u8D2D\u548C\u5408\u4E70\u5E73\u53F0\uFF1B\u63D0\u4F9B\u5F69\u7968\u76F8\u5173\u8D44\u8BAF\uFF1B\u63D0\u4F9B\u5F69\u7968\u4FE1\u606F\u4EA4\u4E92\u5E73\u53F0\uFF1B\u63D0\u4F9B\u5728\u7EBF\u9884\u4ED8\u652F\u4ED8\u7ED3\u7B97\u670D\u52A1\u3002</p>\n<p>\u4E09\u3001\u7528\u6237\u7684\u6743\u5229</p>\n<p>1\u3001\u8D26\u6237\u7BA1\u7406\u6743\u3002\u7528\u6237\u6709\u6743\u968F\u65F6\u67E5\u8BE2\u7528\u6237\u8D44\u6599\uFF0C\u5E76\u53EF\u5BF9\u7528\u6237\u540D\u3001\u7528\u6237\u771F\u5B9E\u59D3\u540D\u3001\u8EAB\u4EFD\u8BC1\u53F7\u7801\u4EE5\u5916\u7684\u4FE1\u606F\u8FDB\u884C\u4FEE\u6539\u3002</p>\n<p>2\u3001\u514D\u8D39\u4F7F\u7528\u6743\u3002\u7528\u6237\u6709\u6743\u514D\u8D39\u4F7F\u7528\u5F69\u7968\u901A\u7684\u5F69\u7968\u6295\u6CE8\u59D4\u6258\u7CFB\u7EDF\u4EE5\u53CA\u514D\u8D39\u83B7\u5F97\u5F69\u7968\u8D44\u8BAF\u3002</p>\n<p>3\u3001\u5F69\u7968\u67E5\u8BE2\u6743\u3002\u7528\u6237\u901A\u8FC7\u5F69\u7968\u901A\u59D4\u6258\u5F69\u7968\u4EE3\u8D2D\u3001\u5408\u4E70\u6210\u529F\u540E\uFF0C\u6709\u6743\u514D\u8D39\u5728\u5F69\u7968\u901A\u67E5\u8BE2\u6240\u4EE3\u8D2D\u3001\u5408\u4E70\u5F69\u7968\u7684\u72B6\u6001\u3002</p>\n<p>4\u3001\u5956\u91D1\u83B7\u5F97\u6743\u3002\u7528\u6237\u901A\u8FC7\u5F69\u7968\u901A\u59D4\u6258\u4EE3\u8D2D\u3001\u5408\u4E70\u5F69\u7968\u6210\u529F\u7684\uFF0C\u82E5\u5F69\u7968\u4E2D\u5956\uFF0C\u7528\u6237\u6709\u6743\u83B7\u5F97\u76F8\u5E94\u5956\u91D1\u3002</p>\n<p>5\u3001\u9884\u4ED8\u6B3E\u8D26\u6237\u6838\u67E5\u6743\u3002\u7528\u6237\u53EF\u4EE5\u968F\u65F6\u5BF9\u9884\u4ED8\u6B3E\u8D26\u6237\u8FDB\u884C\u8D44\u91D1\u4F59\u989D\u6838\u67E5\u3002</p>\n<p>6\u3001\u7533\u8BF7\u63D0\u6B3E\u6743\u3002\u7528\u6237\u5728\u4EFB\u4F55\u65F6\u95F4\u90FD\u53EF\u5BF9\u81EA\u5DF1\u7684\u9884\u4ED8\u6B3E\u4F59\u989D\u7533\u8BF7\u63D0\u6B3E\uFF0C\u5F69\u7968\u901A\u5728\u6838\u5BF9\u7528\u6237\u8D44\u91D1\u6765\u6E90\u6B63\u5E38\u7684\u60C5\u51B5\u4E0B\uFF0C\u5728\u6536\u5230\u63D0\u6B3E\u8BF7\u6C423\u4E2A\u5DE5\u4F5C\u65E5\u5185\u5C06\u7528\u6237\u9884\u4ED8\u6B3E\u4E2D\u9700\u63D0\u53D6\u7684\u6B3E\u9879\u8F6C\u8D26\u5230\u7528\u6237\u6CE8\u518C\u7684\u94F6\u884C\u8D26\u6237\u4E0A\u3002\u7528\u6237\u63D0\u6B3E\u8F6C\u8D26\u6240\u4EA7\u751F\u7684\u94F6\u884C\u8D39\u7528\u7531\u7528\u6237\u627F\u62C5\u3002\n<p>\u56DB\u3001\u7528\u6237\u7684\u4E49\u52A1</p>\n<p>1\u3001\u5168\u9762\u9075\u5B88\u672C\u534F\u8BAE\u7684\u4E49\u52A1\u3002\u5728\u6CE8\u518C\u767B\u8BB0\u6210\u4E3A\u5F69\u7968\u901A\u7528\u6237\u4E4B\u524D\uFF0C\u987B\u8BA4\u771F\u9605\u8BFB\u3001\u7406\u89E3\u672C\u534F\u8BAE\u5404\u6761\u6B3E\uFF0C\u4E00\u7ECF\u6CE8\u518C\u6210\u529F\u5373\u89C6\u4E3A\u540C\u610F\u672C\u534F\u8BAE\u5168\u90E8\u6761\u6B3E\u3002\n<p>2\u3001\u5982\u5B9E\u63D0\u4F9B\u7528\u6237\u8D44\u6599\u4E49\u52A1\u3002\u4E3A\u4FDD\u969C\u7528\u6237\u7684\u5408\u6CD5\u6743\u76CA\uFF0C\u907F\u514D\u5728\u4E2D\u5956\u65F6\u51FA\u73B0\u7528\u6237\u6CE8\u518C\u8D44\u6599\u4E0E\u771F\u5B9E\u60C5\u51B5\u4E0D\u7B26\u5BFC\u81F4\u5151\u5956\u4E0D\u80FD\u7B49\u60C5\u51B5\uFF0C\u8BF7\u7528\u6237\u6309\u7167\u771F\u5B9E\u3001\u5168\u9762\u3001\u51C6\u786E\u7684\u539F\u5219\u63D0\u4F9B\u7528\u6237\u8D44\u6599\u3002\u56E0\u7528\u6237\u8D44\u6599\u4E0D\u771F\u5B9E\u3001\u4E0D\u5168\u9762\u3001\u4E0D\u51C6\u786E\u9020\u6210\u4E0D\u80FD\u5151\u5956\u3001\u4E0D\u80FD\u63D0\u6B3E\u3001\u4E0D\u80FD\u6CE8\u9500\u7B49\u60C5\u51B5\uFF0C\u7531\u7528\u6237\u627F\u62C5\u5168\u90E8\u8D23\u4EFB\u3002\n<p>3\u3001\u5BF9\u5E94\u6CE8\u518C\u4E49\u52A1\u3002\u4E00\u4E2A\u7528\u6237\u540D\u3001\u4E00\u4E2A\u8EAB\u4EFD\u8BC1\u53F7\u3001\u4E00\u4E2A\u7528\u6237\u7684\u771F\u5B9E\u59D3\u540D\u53EA\u80FD\u6709\u6548\u6CE8\u518C\u4E00\u6B21\uFF0C\u4E14\u4E09\u8005\u4E4B\u95F4\u5FC5\u987B\u4E00\u4E00\u5BF9\u5E94\u3002\u4E25\u7981\u4EFB\u4F55\u5F62\u5F0F\u7684\u91CD\u590D\u6CE8\u518C\u53CA\u591A\u6B21\u6076\u610F\u6CE8\u518C\uFF0C\u56E0\u6B64\u800C\u9020\u6210\u7684\u4E00\u5207\u540E\u679C\uFF0C\u7531\u7528\u6237\u81EA\u884C\u627F\u62C5\u3002 \u540C\u65F6\uFF0C\u4E3A\u4FDD\u8BC1\u7528\u6237\u64CD\u4F5C\u9884\u4ED8\u6B3E\u8D26\u6237\u7684\u5B89\u5168\u6027\uFF0C\u7528\u6237\u5E94\u4EE5\u4E00\u4E2A\u94F6\u884C\u5361\u8D26\u6237\u5BF9\u5E94\u4E00\u4E2A\u7528\u6237\u771F\u5B9E\u59D3\u540D\u540D\uFF0C\u56E0\u94F6\u884C\u5361\u8D26\u6237\u4E0E\u7528\u6237\u771F\u5B9E\u59D3\u540D\u4E0D\u80FD\u4E00\u4E00\u5BF9\u5E94\u800C\u4EA7\u751F\u7684\u4E0D\u5229\u540E\u679C\uFF0C\u7531\u7528\u6237\u81EA\u884C\u627F\u62C5\u3002\n<p>4\u3001\u4FDD\u6301\u7528\u6237\u540D\u4E49\u52A1\u3002\u4E3A\u4FDD\u62A4\u7528\u6237\u8D26\u6237\u548C\u9884\u4ED8\u6B3E\u8D26\u6237\u7684\u5B89\u5168\u6027\uFF0C\u7528\u6237\u540D\u3001\u7528\u6237\u771F\u5B9E\u59D3\u540D\u3001\u8EAB\u4EFD\u8BC1\u53F7\u7801\u4E00\u7ECF\u6CE8\u518C\u786E\u8BA4\u540E\uFF0C\u4E0D\u5F97\u518D\u884C\u66F4\u6539\u3002\n<p>5\u3001\u4FDD\u62A4\u8D26\u6237\u8D44\u6599\u4E49\u52A1\u3002\u7528\u6237\u8D26\u6237\u8D44\u6599\u5305\u62EC\u7528\u6237\u5BC6\u7801\u3001\u4E2A\u4EBA\u8D26\u6237\u4EE5\u53CA\u7528\u6237\u8D26\u6237\u64CD\u4F5C\u6240\u9700\u7684\u8D44\u6599\u3002\u7528\u6237\u52A1\u5FC5\u5BF9\u5176\u8D26\u6237\u8D44\u6599\u81EA\u884C\u4FDD\u5BC6\uFF0C\u4EE5\u514D\u8D26\u6237\u8D44\u6599\u88AB\u76D7\u7528\u6216\u7BE1\u6539\u3002\u56E0\u7528\u6237\u4FDD\u62A4\u4E0D\u5468\u5BFC\u81F4\u8D26\u6237\u8D44\u6599\u88AB\u76D7\u7528\u6216\u7BE1\u6539\u800C\u7ED9\u7528\u6237\u9020\u6210\u7684\u4EFB\u4F55\u635F\u5931\u53CA\u6CD5\u5F8B\u8D23\u4EFB\u7531\u7528\u6237\u81EA\u884C\u627F\u62C5\u3002\n<p>6\u3001\u9075\u5B88\u7F51\u7EDC\u5B89\u5168\u7BA1\u7406\u7684\u4E49\u52A1\u3002\u7528\u6237\u4E0D\u5F97\u5229\u7528\u5F69\u7968\u901A\u5371\u5BB3\u56FD\u5BB6\u5B89\u5168\u53CA\u4FB5\u72AF\u516C\u6C11\u7684\u5408\u6CD5\u6743\u76CA\uFF0C\u4E0D\u5F97\u5229\u7528\u5F69\u7968\u901A\u5236\u4F5C\u3001\u590D\u5236\u548C\u4F20\u64AD\u6CD5\u89C4\u89C4\u5B9A\u7684\u6709\u5BB3\u4FE1\u606F\u3002\n<p>7\u3001\u627F\u62C5\u94F6\u884C\u8D39\u7528\u7684\u4E49\u52A1\u3002\u5728\u7533\u8BF7\u63D0\u53D6\u9884\u4ED8\u6B3E\u6216\u56E0\u5408\u540C\u7EC8\u6B62\u8FD4\u8FD8\u9884\u4ED8\u6B3E\u7684\u60C5\u51B5\u4E0B\uFF0C\u6B3E\u9879\u4ECE\u9884\u4ED8\u6B3E\u8D26\u6237\u8F6C\u8D26\u81F3\u7528\u6237\u94F6\u884C\u5361\u7684\u94F6\u884C\u8D39\u7528\u7531\u7528\u6237\u627F\u62C5\u3002\n<p>\u4E94\u3001\u5F69\u7968\u901A\u7684\u6743\u5229</p>\n<p>1\u3001\u7BA1\u7406\u7528\u6237\u8D26\u6237\u7684\u6743\u5229\u3002\u5982\u679C\u7528\u6237\u63D0\u4F9B\u7684\u8D44\u6599\u5305\u542B\u6709\u7B2C\u56DB\u6761\u7B2C3\u6B3E\u591A\u6B21\u6076\u610F\u6CE8\u518C\u4FE1\u606F\u6216\u7B2C6\u6B3E\u6240\u5217\u4FE1\u606F\uFF0C\u5F69\u7968\u901A\u4FDD\u7559\u6CE8\u9500\u5176\u7528\u6237\u8D26\u6237\u6216\u8005\u9650\u5236\u5176\u4F7F\u7528\u5168\u90E8\u6216\u90E8\u5206\u670D\u52A1\u5185\u5BB9\u7684\u6743\u5229\u3002\u4E00\u7ECF\u53D1\u73B0\u7528\u6237\u5229\u7528\u5F69\u7968\u901A\u5236\u4F5C\u3001\u590D\u5236\u548C\u4F20\u64AD\u7684\u4FE1\u606F\u660E\u663E\u5C5E\u4E8E\u7B2C\u4E09\u6761\u7B2C6\u6B3E\u6240\u5217\u4FE1\u606F\u4E4B\u4E00\u7684\uFF0C\u5F69\u7968\u901A\u5C06\u7ACB\u5373\u91C7\u53D6\u5C4F\u853D\u4FE1\u606F\u3001\u53D1\u51FA\u8B66\u544A\u3001\u76F4\u81F3\u5173\u95ED\u7528\u6237\u8D26\u6237\u7B49\u63AA\u65BD\u3002\u5F69\u7968\u901A\u5C06\u4FDD\u5B58\u6709\u5173\u8BB0\u5F55\uFF0C\u5E76\u5411\u56FD\u5BB6\u6709\u5173\u673A\u5173\u62A5\u544A\uFF0C\u7528\u6237\u7684\u7684\u7CFB\u7EDF\u8BB0\u5F55\u5C06\u4F5C\u4E3A\u7528\u6237\u8FDD\u53CD\u6CD5\u5F8B\u6CD5\u89C4\u7684\u8BC1\u636E\u3002\n<p>2\u3001\u4FEE\u6539\u672C\u534F\u8BAE\u6761\u6B3E\u7684\u6743\u5229\u3002\u5F69\u7968\u901A\u6709\u6743\u5728\u5FC5\u8981\u65F6\u4FEE\u6539\u534F\u8BAE\u6761\u6B3E\uFF0C\u534F\u8BAE\u6761\u6B3E\u4E00\u65E6\u53D1\u751F\u53D8\u52A8\uFF0C\u5C06\u4F1A\u5728\u5F69\u7968\u901A\u76F8\u5173\u9875\u9762\u4E0A\u63D0\u793A\u6216\u516C\u544A\u4FEE\u6539\u5185\u5BB9\u3002\u5982\u679C\u4E0D\u540C\u610F\u6240\u6539\u52A8\u7684\u5185\u5BB9\uFF0C\u7528\u6237\u53EF\u4EE5\u4E3B\u52A8\u53D6\u6D88\u83B7\u5F97\u7684\u670D\u52A1\u6216\u6CE8\u9500\u7528\u6237\u8EAB\u4EFD\u3002\u5982\u679C\u7528\u6237\u7EE7\u7EED\u4EAB\u7528\u670D\u52A1\uFF0C\u5219\u89C6\u4E3A\u63A5\u53D7\u670D\u52A1\u6761\u6B3E\u7684\u53D8\u52A8\u3002\u5F69\u7968\u901A\u4FDD\u7559\u968F\u65F6\u4FEE\u6539\u6216\u4E2D\u65AD\u670D\u52A1\u800C\u4E0D\u9700\u77E5\u4F1A\u7528\u6237\u7684\u6743\u5229\u3002\u4E3B\u8981\u5305\u62EC\u4EE5\u4E0B\u60C5\u51B5\uFF1A\n<p>\uFF081\uFF09\u589E\u52A0\u6216\u51CF\u5C11\u5F69\u7968\u54C1\u79CD\u3002\u5F69\u7968\u901A\u4EE3\u8D2D\u548C\u5408\u4E70\u7684\u5F69\u7968\u54C1\u79CD\u4EE5\u5F53\u671F\u53EF\u4EE5\u5B9E\u73B0\u8D2D\u4E70\u7684\u54C1\u79CD\u4E3A\u51C6\uFF0C\u957F\u671F\u6216\u4E34\u65F6\u589E\u52A0\u6216\u51CF\u5C11\u5F69\u7968\u54C1\u79CD\u5747\u4E0D\u9700\u4E8B\u5148\u544A\u77E5\u7528\u6237\u3002\n<p>\uFF082\uFF09\u8C03\u6574\u5F69\u7968\u9500\u552E\u622A\u6B62\u65F6\u95F4\u7684\u6743\u5229\u3002\u5F69\u7968\u901A\u4EE3\u8D2D\u548C\u5408\u4E70\u670D\u52A1\u622A\u6B62\u65F6\u95F4\u4E00\u822C\u4E3A\u5F53\u671F\u5B98\u65B9\u5F69\u7968\u9500\u552E\u622A\u6B62\u65F6\u95F4\u524D2\u5C0F\u65F6\uFF0C\u5F69\u7968\u901A\u6709\u6743\u6839\u636E\u5F69\u7968\u79CD\u7C7B\u548C\u5F53\u671F\u9500\u552E\u60C5\u51B5\u8C03\u6574\u5F69\u7968\u9500\u552E\u622A\u6B62\u65F6\u95F4\uFF0C\u800C\u4E0D\u9700\u4E8B\u5148\u544A\u77E5\u7528\u6237\u3002\n<p>3\u3001\u4EE5\u9884\u4ED8\u6B3E\u4EE3\u8D2D\u5F69\u7968\u7684\u6743\u5229\u548C\u4E49\u52A1\u3002\u5728\u7528\u6237\u5411\u5F69\u7968\u901A\u63D0\u51FA\u4EE3\u8D2D\u8BF7\u6C42\u540E\uFF0C\u5F69\u7968\u901A\u6709\u6743\u4ECE\u5176\u9884\u4ED8\u6B3E\u8D26\u6237\u63D0\u53D6\u8BF7\u6C42\u4EE3\u8D2D\u6240\u9700\u7684\u6B3E\u9879\u91D1\u989D\uFF0C\u4EE3\u4E3A\u5411\u5F69\u7968\u53D1\u884C\u548C\u9500\u552E\u673A\u6784\u7533\u8D2D\u7528\u6237\u6307\u5B9A\u7684\u5F69\u7968\u3002\n<p>4\u3001\u4EE3\u4E3A\u5151\u5956\u3001\u9886\u53D6\u5956\u91D1\u3001\u5206\u914D\u5956\u91D1\u7684\u6743\u5229\u548C\u4E49\u52A1\u3002\u5728\u5F69\u7968\u4E2D\u5956\u60C5\u51B5\u4E0B\uFF0C\u7531\u5F69\u7968\u901A\u8D1F\u8D23\u4EE3\u7406\u5151\u5956\u3001\u9886\u53D6\u5956\u91D1\u4E8B\u5B9C\uFF0C\u5E76\u5728\u5F00\u5956\u540E\u76843\u4E2A\u5DE5\u4F5C\u65E5\u5185\u628A\u7A0E\u540E\u5956\u91D1\u6309\u6BD4\u4F8B\u8FDB\u884C\u5206\u914D\uFF0C\u76F4\u63A5\u6C47\u5165\u4E2D\u5956\u7528\u6237\u4E4B\u9884\u4ED8\u6B3E\u8D26\u6237\u3002\n<p>5\u3001\u5236\u6B62\u6076\u610F\u63D0\u6B3E\u6216\u8F6C\u8D26\u7684\u6743\u5229\u3002\u5F69\u7968\u901A\u6709\u6743\u62D2\u7EDD\u9884\u4ED8\u6B3E\u8D26\u6237\u8D44\u91D1\u901A\u8FC7\u5F69\u7968\u901A\u63D0\u73B0\u6216\u8F6C\u81F3\u5176\u4ED6\u975E\u6CE8\u518C\u94F6\u884C\u8D26\u6237\u7684\u884C\u4E3A\uFF0C\u4E00\u65E6\u53D1\u73B0\u6076\u610F\u63D0\u73B0\u6216\u8F6C\u8D26\u884C\u4E3A\uFF0C\u5F69\u7968\u901A\u6709\u6743\u5236\u6B62\u5E76\u5C06\u6B3E\u9879\u9000\u56DE\u539F\u8D26\u6237\u3002\n<p>6\u3001\u5236\u6B62\u672A\u6EE118\u5468\u5C81\u7684\u672A\u6210\u5E74\u4EBA\u8D2D\u4E70\u5F69\u7968\u7684\u6743\u5229\u3002</p>\n<p>\u516D\u3001\u5F69\u7968\u901A\u7684\u4E49\u52A1</p>\n<p>1\u3001\u7528\u6237\u8D26\u6237\u8D44\u6599\u4FDD\u62A4\u4E49\u52A1\u3002\u5F69\u7968\u901A\u5BF9\u7528\u6237\u8D26\u6237\u8D44\u6599\u63D0\u4F9B\u6700\u5927\u9650\u5EA6\u7684\u5B89\u5168\u4FDD\u62A4\u3002\u5F53\u5F69\u7968\u901A\u7528\u6237\u6D89\u5ACC\u76D7\u7528\u4ED6\u4EBA\u7B2C\u4E09\u65B9\u652F\u4ED8\u6E20\u9053\uFF08\u5982\uFF1A\u94F6\u8054\u3001\u8D22\u4ED8\u901A\u3001\u652F\u4ED8\u5B9D\u7B49\uFF09\u8D26\u6237\u8D44\u91D1\uFF0C\u6216\u6D89\u5ACC\u5176\u7B2C\u4E09\u65B9\u652F\u4ED8\u6E20\u9053\u8D26\u6237\u88AB\u76D7\u7528\u7684\uFF0C\u5E94\u6D89\u5ACC\u88AB\u76D7\u7528\u4EBA\u6216\u7B2C\u4E09\u65B9\u652F\u4ED8\u516C\u53F8\u7684\u8981\u6C42\uFF0C\u5728\u5176\u627F\u8BFA\u4EC5\u5C06\u7528\u6237\u8D44\u6599\u7528\u4E8E\u6D89\u5ACC\u76D7\u7528\u4E8B\u4EF6\u5E76\u4E88\u4EE5\u4FDD\u5BC6\u7684\u524D\u63D0\u4E0B\uFF0C\u5F69\u7968\u901A\u5C06\u5411\u8BF7\u6C42\u65B9\u63D0\u4F9B\u6D89\u5ACC\u76D7\u7528\u4EBA\u7684\u7528\u6237\u8D44\u6599\u3002\u5F69\u7968\u901A\u7528\u6237\u540C\u610F\u653E\u5F03\u5728\u6B64\u60C5\u51B5\u4E0B\u5411\u5F69\u7968\u901A\u8FFD\u7A76\u4EFB\u4F55\u8D23\u4EFB\u7684\u6743\u5229\u3002</p>\n<p>2\u3001\u516C\u5E03\u4E2D\u5956\u60C5\u51B5\u7684\u4E49\u52A1\u3002\u5728\u5B98\u65B9\u5F69\u7968\u53D1\u884C\u548C\u9500\u552E\u673A\u6784\u53D1\u5E03\u4E2D\u5956\u7ED3\u679C\u540E\u4E03\u4E2A\u5DE5\u4F5C\u65E5\u5185\uFF0C\u5F69\u7968\u901A\u5728\u7F51\u7AD9\u4E2D\u516C\u5E03\u4E2D\u5956\u53F7\u7801\u53CA\u5956\u91D1\u5206\u914D\u60C5\u51B5\uFF0C\u5E76\u4EE5\u5B98\u65B9\u5F69\u7968\u53D1\u884C\u673A\u6784\u548C\u9500\u552E\u673A\u6784\u516C\u5E03\u7684\u4E2D\u5956\u60C5\u51B5\u4E3A\u51C6\u3002</p>\n<p>3\u3001\u63D0\u4F9B\u9884\u4ED8\u6B3E\u5BF9\u8D26\u5355\u7684\u4E49\u52A1\u3002\u5728\u7F51\u7AD9\u4E0A\u5411\u7528\u6237\u63D0\u4F9B\u9884\u4ED8\u6B3E\u5BF9\u8D26\u5355\u3002</p>\n<p>4\u3001\u9884\u4ED8\u6B3E\u8F6C\u8D26\u4E49\u52A1\u3002\u7528\u6237\u5728\u4EFB\u4F55\u65F6\u95F4\u90FD\u53EF\u5BF9\u81EA\u5DF1\u7684\u9884\u4ED8\u6B3E\u4F59\u989D\u7533\u8BF7\u63D0\u6B3E\uFF0C\u5F69\u7968\u901A\u5728\u6838\u5BF9\u7528\u6237\u8D44\u91D1\u6765\u6E90\u6B63\u5E38\u7684\u60C5\u51B5\u4E0B\uFF0C\u5728\u6536\u5230\u63D0\u6B3E\u8BF7\u6C423\u4E2A\u5DE5\u4F5C\u65E5\u5185\u5C06\u7528\u6237\u9884\u4ED8\u6B3E\u4E2D\u9700\u63D0\u53D6\u7684\u6B3E\u9879\u8F6C\u8D26\u5230\u7528\u6237\u6CE8\u518C\u7684\u94F6\u884C\u8D26\u6237\u4E0A\u3002</p>\n<p>\u4E03\u3001\u5927\u989D\u5956\u91D1\u7A0E\u7968\u5F00\u5177</p>\n<p>\u7528\u6237\u5728\u5F69\u7968\u901A\u4EE3\u8D2D\u6216\u5408\u4E70\u5F69\u7968\u83B7\u5F97\u4E2D\u5FC3\u5151\u5956\u7684\u5927\u989D\u5956\u91D1\u7684\uFF0C\u7531\u5F69\u7968\u901A\u4EE3\u4E3A\u5151\u5956\u3002\u6839\u636E\u5404\u5F69\u7968\u4E2D\u5FC3\u4E0E\u5F69\u7968\u901A\u7684\u534F\u8BAE\uFF0C\u5956\u91D1\u7A0E\u7968\u53EA\u80FD\u5F00\u5177\u81F3\u5728\u5404\u5F69\u7968\u4E2D\u5FC3\u5907\u6848\u7684\u5F69\u7968\u901A\u5151\u5956\u4EBA\u5458\u540D\u4E0B\uFF0C\u800C\u65E0\u6CD5\u76F4\u63A5\u5F00\u5177\u81F3\u5177\u4F53\u83B7\u5956\u4EBA\u540D\u4E0B\u3002\u5F69\u7968\u901A\u53EF\u51FA\u5177\u516C\u51FD\u4E3A\u83B7\u5956\u4EBA\u63D0\u4F9B\u5956\u91D1\u6765\u6E90\u8BC1\u660E\u3002</p>\n<p>\u516B\u3001\u534F\u8BAE\u6210\u7ACB\u3001\u53D8\u66F4\u548C\u7EC8\u6B62</p>\n<p>1\u3001\u56E0\u7F51\u7EDC\u6545\u969C\u3001\u8D85\u8FC7\u6307\u5B9A\u8D2D\u4E70\u65F6\u95F4\u3001\u9884\u4ED8\u6B3E\u91D1\u989D\u4E0D\u8DB3\u7B49\u539F\u56E0\uFF0C\u672A\u80FD\u5B8C\u6210\u4EE3\u8D2D\u51FA\u7968\u7684\uFF0C\u89C6\u4E3A\u672C\u6B21\u4EE3\u8D2D\u6216\u5408\u4E70\u59D4\u6258\u672A\u6210\u7ACB\u3002\u5F69\u7968\u901A\u4E0E\u7528\u6237\u53D6\u5F97\u8054\u7CFB\u540E\uFF0C\u4EE5\u53CC\u65B9\u786E\u8BA4\u7684\u65B9\u5F0F\uFF0C\u8FD4\u8FD8\u9884\u4ED8\u8D44\u91D1\u3002</p>\n<p>2\u3001\u5F69\u7968\u901A\u6709\u6743\u5BF9\u672C\u534F\u8BAE\u6761\u6B3E\u8FDB\u884C\u53D8\u66F4\u800C\u65E0\u9700\u4E8B\u5148\u901A\u77E5\u7528\u6237\u3002</p>\n<p>3\u3001\u4EFB\u4F55\u4E00\u65B9\u672A\u80FD\u5C65\u884C\u672C\u534F\u8BAE\u89C4\u5B9A\u7684\u4EFB\u4F55\u4E49\u52A1\uFF0C\u4E14\u5728\u6536\u5230\u53E6\u4E00\u65B9\u53D1\u51FA\u66F4\u6B63\u901A\u77E515\u65E5\u5185\u672A\u80FD\u6539\u6B63\u9519\u8BEF\u7684\uFF0C\u5747\u88AB\u89C6\u4E3A\u81EA\u52A8\u653E\u5F03\u672C\u534F\u8BAE\uFF0C\u534F\u8BAE\u540C\u65F6\u7EC8\u6B62\u3002</p>\n<p>\u4E5D\u3001\u8FDD\u7EA6\u8D23\u4EFB</p>\n<p>1\u3001\u4EFB\u4F55\u4E00\u65B9\u672A\u80FD\u5C65\u884C\u672C\u534F\u8BAE\u89C4\u5B9A\u7684\u4EFB\u4F55\u4E49\u52A1\uFF0C\u4E14\u5728\u6536\u5230\u53E6\u4E00\u65B9\u53D1\u51FA\u66F4\u6B63\u901A\u77E515\u65E5\u5185\u672A\u80FD\u6539\u6B63\u9519\u8BEF\u7684\uFF0C\u5747\u88AB\u89C6\u4E3A\u81EA\u52A8\u653E\u5F03\u672C\u534F\u8BAE\uFF0C\u534F\u8BAE\u540C\u65F6\u7EC8\u6B62\u3002\u53E6\u4E00\u65B9\u5C06\u6709\u6743\u5C31\u56E0\u5BF9\u65B9\u653E\u5F03\u534F\u8BAE\u800C\u9020\u6210\u7684\u7ECF\u6D4E\u635F\u5931\u8FDB\u884C\u8FFD\u507F\u3002</p>\n<p>2\u3001\u56E0\u4EFB\u4F55\u4E00\u65B9\u51FA\u73B0\u8FDD\u53CD\u6CD5\u5F8B\u7684\u884C\u4E3A\u6216\u672C\u534F\u8BAE\u7EA6\u5B9A\u7684\u8FDD\u7EA6\u884C\u4E3A\uFF0C\u90FD\u5E94\u7531\u8D23\u4EFB\u65B9\u81EA\u884C\u8D1F\u8D23\u5E76\u8865\u507F\u7531\u6B64\u7ED9\u5BF9\u65B9\u9020\u6210\u7684\u635F\u5931\u3002</p>\n<p>\u5341\u3001\u514D\u8D23\u6761\u6B3E</p>\n<p>\u53D1\u751F\u4E0B\u5217\u60C5\u51B5\u65F6\uFF0C\u5F69\u7968\u901A\u4E0D\u4E88\u627F\u62C5\u4EFB\u4F55\u6CD5\u5F8B\u8D23\u4EFB\uFF1A</p>\n<p>1\u3001\u7528\u6237\u8D44\u6599\u6CC4\u9732\u3002\u7531\u4E8E\u7528\u6237\u5C06\u5BC6\u7801\u544A\u77E5\u4ED6\u4EBA\u6216\u4E0E\u4ED6\u4EBA\u5171\u4EAB\u6CE8\u518C\u8D26\u6237\uFF0C\u6216\u7531\u4E8E\u7528\u6237\u7684\u758F\u5FFD\uFF0C\u7531\u6B64\u5BFC\u81F4\u7684\u4EFB\u4F55\u4E2A\u4EBA\u8D44\u6599\u6CC4\u9732\uFF0C\u4EE5\u53CA\u7531\u6B64\u4EA7\u751F\u7684\u7EA0\u7EB7\u3002\u65E0\u8BBA\u4F55\u79CD\u539F\u56E0\u5BFC\u81F4\u7684\u7528\u6237\u8D44\u6599\u672A\u6388\u6743\u4F7F\u7528\u3001\u4FEE\u6539\uFF0C\u7528\u6237\u5BC6\u7801\u3001\u4E2A\u4EBA\u8D26\u6237\u6216\u6CE8\u518C\u4FE1\u606F\u88AB\u672A\u6388\u6743\u7BE1\u6539\u3001\u76D7\u7528\u800C\u4EA7\u751F\u7684\u4E00\u5207\u540E\u679C\u3002</p>\n<p>2\u3001\u4E0D\u53EF\u6297\u529B\u53CA\u4E0D\u53EF\u9884\u89C1\u7684\u60C5\u52BF\u53D1\u751F\u3002\u4E0D\u53EF\u6297\u529B\u548C\u4E0D\u53EF\u9884\u89C1\u60C5\u52BF\u5305\u62EC\uFF1A\u81EA\u7136\u707E\u5BB3\u3001\u653F\u5E9C\u884C\u4E3A\u3001\u7F62\u5DE5\u3001\u6218\u4E89\u7B49\uFF1B\u9ED1\u5BA2\u653B\u51FB\u3001\u8BA1\u7B97\u673A\u75C5\u6BD2\u4FB5\u5165\u6216\u53D1\u4F5C\u3001\u653F\u5E9C\u7BA1\u5236\u3001\u5F69\u7968\u53D1\u884C\u548C\u9500\u552E\u673A\u6784\u7684\u539F\u56E0\u3001\u5F69\u7968\u51FA\u7968\u673A\u6216\u670D\u52A1\u7684\u6545\u969C\u3001\u7F51\u7EDC\u6545\u969C\u3001\u56FD\u5BB6\u653F\u7B56\u53D8\u5316\u3001\u6CD5\u5F8B\u6CD5\u89C4\u4E4B\u53D8\u5316\u7B49\u3002\u56E0\u4E0D\u53EF\u6297\u529B\u548C\u4E0D\u53EF\u9884\u89C1\u60C5\u52BF\u9020\u6210\uFF1A\u6682\u65F6\u6027\u5173\u95ED\uFF0C\u7528\u6237\u8D44\u6599\u6216\u4EE3\u8D2D\u3001\u5408\u4E70\u59D4\u6258\u6307\u4EE4\u6CC4\u9732\u3001\u4E22\u5931\u3001\u88AB\u76D7\u7528\u3001\u88AB\u7BE1\u6539\uFF0C\u59D4\u6258\u4EE3\u8D2D\u3001\u5408\u4E70\u5931\u8D25\uFF0C\u5F69\u7968\u901A\u672A\u80FD\u6536\u5230\u59D4\u6258\u6307\u4EE4\u7B49\uFF0C\u4EE5\u53CA\u7531\u6B64\u4EA7\u751F\u7684\u7EA0\u7EB7\u3002\u56E0\u4E0D\u53EF\u6297\u529B\u548C\u4E0D\u53EF\u9884\u89C1\u7684\u60C5\u52BF\u9020\u6210\u672C\u534F\u8BAE\u4E0D\u80FD\u5C65\u884C\u7684\u3002</p>\n<p>3\u3001\u7528\u6237\u539F\u56E0\u6216\u7B2C\u4E09\u65B9\u539F\u56E0\u9020\u6210\u635F\u5931\u3002\u7531\u4E8E\u7528\u6237\u81EA\u8EAB\u539F\u56E0\u3001\u6216\u8FDD\u53CD\u6CD5\u5F8B\u6CD5\u89C4\uFF0C\u4EE5\u53CA\u7B2C\u4E09\u65B9\u7684\u539F\u56E0\uFF0C\u9020\u6210\u7528\u6237\u65E0\u6CD5\u4F7F\u7528\u5F69\u7968\u901A\u670D\u52A1\u6216\u4EA7\u751F\u5176\u4ED6\u635F\u5931\u7684\u3002</p>\n<p>4\u3001\u7528\u6237\u4EE3\u8D2D\u3001\u5408\u4E70\u7684\u5F69\u7968\u800C\u4EA7\u751F\u7684\u635F\u5931\u3002\u7528\u6237\u6839\u636E\u672C\u534F\u8BAE\u8FDB\u884C\u4EE3\u8D2D\u3001\u5408\u4E70\u59D4\u6258\u6295\u6CE8\u800C\u53D1\u751F\u7684\u76F4\u63A5\u3001\u95F4\u63A5\u3001\u5076\u7136\u3001\u7279\u6B8A\u53CA\u7EE7\u8D77\u7684\u635F\u5BB3\u3002</p>\n<p>5\u3001\u7528\u6237\u4F7F\u7528\u94FE\u63A5\u6216\u4E0B\u8F7D\u8D44\u6599\u4EA7\u751F\u7684\u635F\u5BB3\u3002\u7531\u4E8E\u4F7F\u7528\u4E0E\u5F69\u7968\u901A\u94FE\u63A5\u7684\u5176\u5B83\u7F51\u7AD9\uFF0C\u6216\u8005\u4F7F\u7528\u901A\u8FC7\u5F69\u7968\u901A\u4E0B\u8F7D\u6216\u53D6\u5F97\u7684\u8D44\u6599\uFF0C\u9020\u6210\u7528\u6237\u8D44\u6599\u6CC4\u9732\u3001\u7528\u6237\u7535\u8111\u7CFB\u7EDF\u635F\u574F\u7B49\u60C5\u51B5\u53CA\u7531\u6B64\u800C\u5BFC\u81F4\u7684\u4EFB\u4F55\u4E89\u8BAE\u548C\u540E\u679C\u3002</p>\n<p>\u5341\u4E00\u3001\u6CD5\u5F8B\u9002\u7528\u548C\u7BA1\u8F96</p>\n<p>\u672C\u534F\u8BAE\u9002\u7528\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u6CD5\u5F8B\uFF0C\u53D1\u751F\u7684\u4E89\u8BAE\u63D0\u4EA4\u91CD\u5E86\u5E02\u4EF2\u88C1\u59D4\u5458\u4F1A\uFF0C\u5176\u4EF2\u88C1\u88C1\u51B3\u662F\u7EC8\u5C40\u7684\u3002</p>\n<p>\u5341\u4E8C\u3001\u5728\u6CD5\u5F8B\u5141\u8BB8\u8303\u56F4\u5185\uFF0C\u672C\u534F\u8BAE\u6700\u7EC8\u89E3\u91CA\u6743\u5F52\u5F69\u7968\u901A\u6240\u6709\u3002</p>\n</div>',
      }
    },

    methods: {
      init() {

        var ticket = window.sessionStorage.getItem("soccer_ticket");

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

        if (Base.isNull(ticket)) {
          this.ticket = [];
          this.calculate();
          this.fullscreenLoading = false;
          return false;
        }

        ticket = JSON.parse(ticket);

        if (ticket.length == 0) {
          this.ticket = [];
          this.calculate();
          this.fullscreenLoading = false;
          return false;
        }

        for(let i=0; i<ticket.length; i++){
            let _item = ticket[i];
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
        }

        if (Base.isNull(ticket) || ticket.length == 0) {
          this.calculate();
          this.fullscreenLoading = false;
          return false;
        }

        //重组票
        this.ticket = ticket;

        console.log(ticket);

        this.sessionNum = ticket.length;

        let _tmp = [];

        let _size = 8;

        if(this.playIndex == 0){
          //混合串关
          for(let i=0; i<this.ticket.length; i++){
            for(let j=0; j<this.ticket[i].selectData.length; j++){
              let _t = this.ticket[i].selectData[j];
              if(_t.type == 'FT002' || _t.type == 'FT004'){
                _size = 4;
              }if(_t.type == 'FT003'){
                if(_size >= 6){
                  _size = 6;
                }
              }
            }
          }
        }else if(this.playIndex == 1 || this.playIndex == 2){
          //胜平负 让球胜平负
          _size = 8;
        }else if(this.playIndex == 3){
          //比分
          _size = 4;
        }else if(this.playIndex == 4){
          //总进球
          _size = 6;
        }else if(this.playIndex == 5){
          //半全场胜负
          _size = 4;
        }

        //串关
        if(this.playIndex != 6){
          if(this.ticket.length <= _size){
            _size = this.ticket.length
          }

          for(let i=2; i<=_size; i++){
            _tmp.push({
              val: i,
              isSelected: false
            })
          }

          this.soccerGroup = _tmp;

          this.soccerGroup[this.soccerGroup.length-1].isSelected = true;
        }

        if (this.ticket.length > 0) {
//          this.ticket = this.ticket.reverse();
          this.lock = false;
          this.fullscreenLoading = false;
          this.calculate();
        }

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


      showDialog(index, type){

        this.curSoccer = this.ticket[index];

//        console.log(this.ticket)

        this.selectIndex = index;

        this.tmpSoccer =  JSON.parse(JSON.stringify(this.curSoccer));

        //混合过关
        if(type == 0){
          this.showMix = true;
        }//胜平负
        if(type == 1){
          this.showR1 = true;
        }//让球胜平负
        if(type == 2){
          this.showR2 = true;
        }//比分
        if(type == 3){
          this.showScore = true;
        }//总进球数
        if(type == 4){
          this.showR4 = true;
        }//半全场
        if(type == 5){
          this.showDoubleResult = true;
        }//单关
        if(type == 6){
          this.showMix = true;
        }

      },
      closeDialog(type){

        if(type == 'cancel'){
          //取消
          this.curSoccer = this.tmpSoccer;
          this.ticket[this.selectIndex] = this.tmpSoccer;
        }else if(type == 'submit'){
          //确定
          //计入缓存
          window.sessionStorage.setItem("soccer_ticket",JSON.stringify(this.ticket));
        }

        this.showMix = false;
        this.showR1 = false;
        this.showR2 = false;
        this.showR4 = false;
        this.showScore = false;
        this.showDoubleResult = false;

      },

      changeSelect(item){

        item.isSelect = !item.isSelect;

        //计算场数和价格

        let _list = this.ticket;

        let _arr = [];

        for(let j=0; j<_list.length; j++) {

          let _item = _list[j];

          let _flag = false;

          let selectData = [];

          //胜平负选择状态
          if (_item.playIndex == 1 || _item.playIndex == 0) {
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
          if (_item.playIndex == 2 || _item.playIndex == 0) {
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
          if (_item.playIndex == 3 || _item.playIndex == 0) {
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
          if (_item.playIndex == 4 || _item.playIndex == 0) {
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
          if (_item.playIndex == 5 || _item.playIndex == 0) {
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

        }

        this.calculate();

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

      cancel() {
        this.checked = !this.checked;
      },
      myBack() {

        if (Base.isNull(this.call)) {
          this.$router.go(-1);
        } else {
          this.$router.replace({ name: this.call });
        }
      },
      closeCallback(val) {

        if (val == 'close') {
          this.dialogAgreement = false;
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
        this.lock = false;
      },

      openTrace() {},
      loginCallback(val) {

        if (val == 'cancel') {
          this.dialogLogin = false;
          this.$message({
            type: 'info',
            message: '取消登录'
          });
        }

        if (val == 'success') {
          this.dialogLogin = false;
          //登录成功
          this.$message({
            type: 'success',
            message: '登录成功'
          });

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
        }
      },
      payCallback(val) {

        if (val == 'cancel') {
          this.dialogPay = false;
          this.$message({
            type: 'info',
            message: '取消充值'
          });
        }

        if (val == 'success') {
          this.dialogPay = false;
          //充值成功
          this.$message({
            type: 'success',
            message: '充值成功'
          });
        }
      },
      conserve() {
        document.getElementById("dialog").style.display = "none";
        //保存成功
        this.$router.push({ name: 'LotterySsq' });
      },
      clear() {
        document.getElementById("dialog").style.display = "none";
        //不保存
        this.emptyall();

        this.$router.push({ name: 'LotterySsq' });

      },
      conserveCall() {
        document.getElementById("dialog").style.display = "none";
      },
      add() {
        if (this.ticket.length > 0) {
          document.getElementById("dialog").style.display = "block";
        } else {
          document.getElementById("dialog").style.display = "none";
          this.$router.push({ name: 'LotterySsq' });
        }
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
      back() {
        this.dialogBuySuccess = false;
      },
      calculate() {

        if(this.ticket.length == 0){
          this.sumNum = 0;
          this.sumPrice = 0;
          this.maxPrice = 0;
          this.minPrice = 0;
          return false;
        }

        //串关计算模式
        if(this.playIndex !=6){
          //判断是否生成过串的选项
          let _selectGroup = [];

          for(let i=0; i<this.soccerGroup.length; i++){
            if(this.soccerGroup[i].isSelected == true){
              _selectGroup.push(this.soccerGroup[i].val);
            }
          }

          if(_selectGroup.length == 0){
            this.sumNum = 0;
            this.sumPrice = 0;
            this.maxPrice = 0;
            this.minPrice = 0;
            return false;
          }


          let _item = {}, _s = {}, _s1 = 0, _s2 = 1, _LotId = '', _ticket = '', _detail, _min = 0, _max = 0, _sumMin = 0, _sumMax = 0, _minSection = [], _maxSection = [], moneys = [];

          if(this.playIndex == 0){
            _LotId = 'FT005';
          }else if(this.playIndex == 1){
            _LotId = 'FT001';
          }else if(this.playIndex == 2){
            _LotId = 'FT006';
          }else if(this.playIndex == 3){
            _LotId = 'FT002';
          }else if(this.playIndex == 4){
            _LotId = 'FT003';
          }else if(this.playIndex == 5){
            _LotId = 'FT004';
          }

//          FT007

          console.log('计算中奖金额')

          for(let m=0; m<_selectGroup.length; m++){
            let groupTicket = Base.group(JSON.parse(JSON.stringify(this.ticket)), _selectGroup[m]);

            if(_LotId == 'FT005'){
              //混合串关

              _s2 = 1;

              for(let n=0; n<groupTicket.length; n++){
                let _res = this.regroup(groupTicket[n], _selectGroup[m]).groupTicket;

                _s1 += _res.length;

                for(let _r = 0; _r < _res.length; _r ++){

                    console.log(_res[_r])

                  let _result = '3:2';
                  let _result1 = '1:1';
                  let _lb = 0;

                  let _count = 0;
                  let _r1 = Number.parseInt(_result.split(':')[0]);
                  let _r2 = Number.parseInt(_result.split(':')[1]);
                  let _r3 = Number.parseInt(_result1.split(':')[0]);
                  let _r4 = Number.parseInt(_result1.split(':')[1]);

                  let ___tmp = 1;
                  let ___flag = true;
                  for(let __r = 0; __r < _res[_r].length; __r ++){
                      let _match = _res[_r][__r]
                      if(_match.type == 'FT001'){
                        if(_match.name == 'v3'){
                          //胜
                          if(_r1 > _r2){
                            _match.isHit = true;
                          }else{
                            _match.isHit = false;
                          }
                        }else if(_match.name == 'v1'){
                          //平
                          if(_r1 == _r2){
                            _match.isHit = true;
                          }else{
                            _match.isHit = false;
                          }
                        }else if(_match.name == 'v0'){
                          //负
                          if(_r1 < _r2){
                            _match.isHit = true;
                          }else{
                            _match.isHit = false;
                          }
                        }
                      }else if(_match.type == 'FT002'){
                        //比分
                        let _hit = 'v' + _r1 + _r2;
                        if(_result == '4:3' || _result == '5:4' || (_r1>6 && _r2<6)){
                          _hit = 'v90';
                        }
                        if(_result == '3:4' || _result == '4:5' || (_r1<6 && _r2>6)){
                          _hit = 'v09';
                        }
                        if(_r1 == _r2  && _r1 > 3){
                          _hit = 'v99';
                        }
                        if(_hit == _match.name){
                          _res.isHit = true;
                        }else{
                          _res.isHit = false;
                        }
                      }else if(_match.type == 'FT003'){
                        //总进球
                        let _rball = Number.parseInt(_match.name.substring(1));
                        if(_r1 + _r2 == _rball){
                          _res.isHit = true;
                        }else{
                          if(_rball == 7 && _r1 + _r2 > 7){
                            _res.isHit = true;
                          }else{
                            _res.isHit = false;
                          }
                        }
                      }else if(_match.name.type == 'FT004'){
                        //半全场胜负
                        let _hit = '';
                        let __t1 = '';
                        let __t2 = '';

                        if(_r3 > _r4){
                          __t1 = 3;
                        }else if(_r3 == _r4){
                          __t1 = 1;
                        }else{
                          __t1 = 0;
                        }
                        if(_r1 > _r2){
                          __t2 = 3;
                        }else if(_r1 == _r2){
                          __t2 = 1;
                        }else{
                          __t2 = 0;
                        }

                        _hit = 'v' + __t1 + __t2;

                        if(_hit == _match.name){
                          _res.isHit = true;
                        }else{
                          _res.isHit = false;
                        }

                      }else if(_match.type == 'FT006'){
                        if(_match.name == 'v3'){
                          //胜
                          if(_r1 + _lb > _r2){
                            _res.isHit = true;
                          }else{
                            _res.isHit = false;
                          }
                        }else if(_match.name == 'v1'){
                          //平
                          if(_r1 + _lb == _r2){
                            _res.isHit = true;
                          }else{
                            _res.isHit = false;
                          }
                        }else if(_match.name == 'v0'){
                          //负
                          if(_r1 + _lb < _r2){
                            _res.isHit = true;
                          }else{
                            _res.isHit = false;
                          }
                        }
                      }
                      if(_match.isHit == false){
                          ___flag = false
                        }
                      ___tmp = ___tmp * _res[_r][__r].odds;
                    }

                    if(___flag){
                        //命中
                      console.log('第'+ (_r+1) +'个方案命中')

                      moneys.push(this.formatDouble(___tmp * 2 * this.multiple))
                    }

                }

                console.log(moneys)

//              console.log(_res.groupTicket);
//              groupTicket: _result,
//                groupCode: resultGroup,
              }


            }else{
              //普通串关

              for(let n=0; n<groupTicket.length; n++){
                _ticket = '';
                _s2 = 1;
                _detail = [];
                _min = 0;
                _max = 0;

                //赛果
                for(let i=0; i<groupTicket[n].length; i++){
                  _item = groupTicket[n][i];
                  _s2 *= _item.selectData.length;
                  _detail.push(_item.selectData);
                  let _tmp = _item.day + '*' + _item.weekId + '*' + _item.teamId + '*';
                  _ticket += _tmp;
                  let _tmp2 = '';
                  for(let j=0; j<_item.selectData.length; j++){
                    _s = _item.selectData[j].name.substring(1);
                    _tmp2 += _s;
                    _tmp2 += ',';
                  }
                  _tmp2 = _tmp2.substring(0,_tmp2.length-1);
                  _ticket+= _tmp2;
                  _ticket+= '^';
                }
                _s1 += _s2;
                _ticket = _ticket.substring(0,_ticket.length-1);
                _sumMin = 1;
                _sumMax = 1;
                for(let _d = 0; _d < _detail.length; _d ++){
                  _min = _detail[_d][0].odds;
                  _max = _detail[_d][0].odds;
                  for(let _m = 0; _m < _detail[_d].length; _m ++){
                    if(_min > _detail[_d][_m].odds){
                      _min = _detail[_d][_m].odds;
                    }if(_max < _detail[_d][_m].odds){
                      _max = _detail[_d][_m].odds;
                    }
                  }
                  _sumMax *= _max;
                  _sumMin *= _min;
                }
                _minSection.push(this.formatDouble(_sumMin * 2 * this.multiple));
                _maxSection.push(this.formatDouble(_sumMax * 2 * this.multiple));
              }
            }

          }

          //计算预计奖金

          let __min = _minSection[0], __max = 0;

          for(let __m = 0; __m < _minSection.length; __m ++){
            if(__min > _minSection[__m]){
              __min = _minSection[__m];
            }
          }
          for(let __m = 0; __m < _maxSection.length; __m ++){
            __max+= _maxSection[__m];
          }

          this.minPrice = Base.twoDecimal(__min);
          this.maxPrice = Base.twoDecimal(__max);

          this.sumNum = _s1;

          this.sumPrice = _s1 * 2 * this.multiple;

        }else{
          //单关计算模式

          let _tmp = JSON.parse(JSON.stringify(this.ticket));

          let _s1 = 0, __max = 0, priceSection = [];

          for(let i=0; i<_tmp.length; i++){
              for(let j=0; j<_tmp[i].selectData.length; j++){
                  let _item = _tmp[i].selectData[j];
                  //计算预计奖金

                  //计算总注数
                  _s1 ++;
                  priceSection.push(this.formatDouble(_item.odds * 2 * this.multiple));
              }
          }

          for(let i=0; i<priceSection.length; i++){
            __max += priceSection[i];
          }

          this.minPrice = Base.twoDecimal(priceSection.sort()[0]);
          this.maxPrice = Base.twoDecimal(__max);
          this.sumNum = _s1;
          this.sumPrice = _s1 * 2 * this.multiple;

        }

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

      /**
       * 拆票
       * @param list 票组合
       * @param size 串数（比如2串1传2即可）
       * @returns {*}
       */
      ticketGroup(list, size){
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

        return _result;

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

      toPay(){
        this.payment = this.sumPrice - this.redBagMoney;
        this.resultMoney = this.sumPrice - this.user.accountBalance - this.redBagMoney;

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

              let _tmp4 = [];

              let now = new Date().getTime();

              for(let i=0; i< _tmp3.length; i++){
                if(now < this.stringToDate(_tmp3[i].endTime).getTime()){
                  _tmp4.push(_tmp3[i]);
                }
              }

              if(_tmp4.length >0){
                //弹出确认界面
                this.redBagList = _tmp4;
                this.showOrder = true;
              }else{
                //直接支付
                this.submitOrder();
              }

            }else {
              //直接支付
              this.submitOrder();
            }
          }else{
              //直接支付
            this.submitOrder();
          }
        })

      },

      submitOrder() {

        if (this.lock == true) {
          return false;
        }

        this.lock = true;

        //判断用户登录，这里弹出登录
        var _userID = Interface.getUserId();

        if (_userID == 0) {
          //- 2018年2月26日14:53:56
          //- 改为开启登录弹窗

          //- 2018年2月27日11:24:42
          //- 再次改为页面跳转登录
//          this.showLogin = true;

          this.$router.push({ name: 'Login', params: { call: true } });

          return false;
        }else{
          //判断余额,余额不足弹出充值界面
//          if (Interface.getBalance() < this.sumPrice) {
//            this.$router.push({ name: 'Recharge', params: { call: true, money: this.sumPrice - Interface.getBalance() } })
//            return false;
//          }

          //- 2018年1月30日10:43:09
          //判断余额,余额不足弹出付款界面
//          if (Interface.getBalance() < this.sumPrice) {
////              if(Base.versions.isWeiXin){
//                this.$router.push({ name: 'WxPay', params: { money: this.sumPrice } })
////              }else{
////                this.$router.push({ name: 'Pay', params: { call: true, money: this.sumPrice} })
////              }
//            return false;
//          }

        }

        //判断投注时间是否截止

        for(let i=0; i<this.ticket.length; i++){

          let _item = this.ticket[i];

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

          if(_entTime - _now < 0){
            //已截止投注
            _item.timeOut = true;

            this.$message({
              type: 'error',
              message: _item.hTeam + 'VS' + _item.vTeam + '的比赛已截止售票，请删除后再下单'
            });

            return false;

          }else{
            _item.timeOut = false;
          }

//          console.log(_item.timeOut)
        }

        let _selectGroup = [], resultGroup = [];

        for(let i=0; i<this.soccerGroup.length; i++){
          if(this.soccerGroup[i].isSelected == true){
            _selectGroup.push(this.soccerGroup[i].val);
          }
        }

        let _item = {}, _s = {}, _LotId = '', _ticket = '', _s1 = 1, _detail, _min = 0, _max = 0, _sumMin = 0, _sumMax = 0, _minSection = [], _maxSection = [];

        if(this.playIndex == 0 || this.playIndex == 6){
          _LotId = 105;
        }else if(this.playIndex == 1){
          _LotId = 101;
        }else if(this.playIndex == 2){
          _LotId = 106;
        }else if(this.playIndex == 3){
          _LotId = 102;
        }else if(this.playIndex == 4){
          _LotId = 103;
        }else if(this.playIndex == 5){
          _LotId = 104;
        }

        for(let m=0; m<_selectGroup.length; m++){
          let groupTicket = Base.group(JSON.parse(JSON.stringify(this.ticket)), _selectGroup[m]);

          if(_LotId == 105){
              //混合串关

            for(let n=0; n<groupTicket.length; n++){
              let _res = this.regroup(groupTicket[n], _selectGroup[m]);
              resultGroup = resultGroup.concat(_res.groupCode);
//              groupTicket: _result,
//                groupCode: resultGroup,
            }

          }else{
              //普通串关

            for(let n=0; n<groupTicket.length; n++){
              _ticket = '';
              _s1 = 1;
              _detail = [];
              _min = 0;
              _max = 0;

              //赛果
              for(let i=0; i<groupTicket[n].length; i++){
                _item = groupTicket[n][i];
                _s1 *= _item.selectData.length;
                _detail.push(_item.selectData);

//                _detail.count = _s1;

                let _tmp = _item.day + '*' + _item.weekId + '*' + _item.teamId + '*';
                _ticket += _tmp;
                let _tmp2 = '';
                for(let j=0; j<_item.selectData.length; j++){
                  _s = _item.selectData[j].name.substring(1);
                  _tmp2 += _s;
                  _tmp2 += ',';
                }
                _tmp2 = _tmp2.substring(0,_tmp2.length-1);
                _ticket+= _tmp2;
                _ticket+= '^';
              }

              _ticket = _ticket.substring(0,_ticket.length-1);
//              console.log(_ticket);
//              console.log(_detail);

              resultGroup.push({
                LotId: _LotId,
                LotMoney: _s1 * 2,
                playType: '50' + _selectGroup[m],
                antecode : _ticket,
//                matchDetail: JSON.stringify(_detail)
//                matchDetail: _tdetail
              })
            }
          }

        }

        //剔除筛选以外的值
        let _tList = JSON.parse(JSON.stringify(this.ticket));
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

        //重组group
        let _playTypeList = [], _matchList = [];

        for(let i=0; i<_selectGroup.length; i++){
          if(_selectGroup[i] == 2){
            _playTypeList.push(502);
          }else if(_selectGroup[i] == 3){
            _playTypeList.push(503);
          }else if(_selectGroup[i] == 4){
            _playTypeList.push(504);
          }else if(_selectGroup[i] == 5){
            _playTypeList.push(505);
          }else if(_selectGroup[i] == 6){
            _playTypeList.push(506);
          }else if(_selectGroup[i] == 7){
            _playTypeList.push(507);
          }else if(_selectGroup[i] == 8){
            _playTypeList.push(508);
          }
        }

        if(_LotId == 105){

//            console.log(_tArr);
//
//            return false;

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

        }else{

          //重组赛事数据
          for(let i=0; i<_tArr.length; i++){

              let _lotResult = [];

            for(let j=0; j<_tArr[i].selectData.length; j++){
              _lotResult.push(_tArr[i].selectData[j].name.substring(1));
            }

            _matchList.push({
              day: _tArr[i].day,
              weekId: _tArr[i].weekId,
              teamId: _tArr[i].teamId,
              type: _tArr[i].selectData[0].type,
              lotResult: _lotResult.join(","),
            })

          }

        }


//        console.log(_tArr);

//        console.log(resultGroup);
//
//        console.log(_playTypeList);
//        console.log(_matchList);
//
//        return false;

//        let _temp = {
//          group: _selectGroup,
//          data: _tArr
//        }

        if(this.playIndex == 6){
          _playTypeList = 500;
          _LotId = 105;
        }

        //获取红包

        let _serialNumber = '';

        if(this.redBagMoney != 0){
          _serialNumber = this.redBagList[this.redBagRadio].serialNumber;
        }

        //- cnzz自定义统计
        // 测试完后请删除这条注数

        _czc.push(["_setAccount", "1271278320"]);
        _czc.push(['_trackEvent', 'SoccerOrder_page_submitOrder', 'submitOrder', '用户下单','submit','SoccerOrder_page_submitOrder']);

        Interface.raceTicket(_LotId, this.multiple, this.sumPrice, _playTypeList, _matchList, _serialNumber, (data, errorMsg) => {

//        Interface.ftTicket(_LotId, this.multiple, _temp, resultGroup, (data, errorMsg) => {

            if(data){

                if(data.returnJSON.tradeResult == 2){
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
                  this.emptyall();
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

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'SoccerOrder_page', 'onInit', '订单确认页','inited','SoccerOrder_init']);

      this.width = $(window).width();
      this.height = $(window).height();

      this.width_ball = Math.floor((this.width - 6 * 12 - 30) / 7);

      this.playIndex = this.$route.params.playIndex;

      this.init();

    }

  }


</script>

