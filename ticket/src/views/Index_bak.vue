<template>
  <div id="index_page">

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


      <!--更多菜单弹窗-->
      <!--<div class="dialogBg" style="z-index: 99999; background: rgba(0,0,0,0)" v-show="showUserMeun == true" @click="showUserMeun = false"></div>-->
      <!--<div class="w150px absolute lh50px Fwhite F16 warpper-red" v-show="showUserMeun == true" style="top: 50px; right: 0; z-index: 999999;">-->

          <!--<div class="clear bor-gray bor-solid-1b"></div>-->
          <!--<router-link :to="{ name:'Recharge' }">-->
            <!--<p class="pal15 par15 Fwhite">-->
              <!--<span class="fl w25px"><img src="~@/assets/images/icon-menu2.png" class="fl h16px" style="margin-top: 17px;"></span>-->
              <!--充值-->
            <!--</p>-->
          <!--</router-link>-->
          <!--<div class="clear bor-gray bor-solid-1b"></div>-->
          <!--<router-link :to="{ name:'Cash' }">-->
            <!--<p class="pal15 par15 Fwhite">-->
              <!--<span class="fl w25px"><img src="~@/assets/images/icon-menu2.png" class="fl h16px" style="margin-top: 17px;"></span>-->
              <!--提现-->
            <!--</p>-->
          <!--</router-link>-->
          <!--<div class="clear bor-gray bor-solid-1b"></div>-->
          <!--<router-link :to="{ name:'UserTicketAll' }">-->
            <!--<p class="pal15 par15 Fwhite">-->
              <!--<span class="fl w25px"><img src="~@/assets/images/icon-menu2.png" class="fl h16px" style="margin-top: 17px;"></span>-->
              <!--购彩记录-->
            <!--</p>-->
          <!--</router-link>-->
          <!--<div class="clear bor-gray bor-solid-1b"></div>-->
          <!--<router-link :to="{ name:'DealAll' }">-->
            <!--<p class="pal15 par15 Fwhite">-->
              <!--<span class="fl w25px"><img src="~@/assets/images/icon-menu4.png" class="fl h16px" style="margin-top: 17px;"></span>-->
              <!--账户明细-->
            <!--</p>-->
          <!--</router-link>-->
          <!--<div class="clear bor-gray bor-solid-1b"></div>-->
          <!--<router-link :to="{ name:'SafeCenter' }">-->
            <!--<p class="pal15 par15 Fwhite">-->
              <!--<span class="fl w25px"><img src="~@/assets/images/icon-menu5.png" class="fl" style="margin-top: 18px; height: 14px;"></span>-->
              <!--安全中心-->
            <!--</p>-->
          <!--</router-link>-->
          <!--<div class="clear bor-gray bor-solid-1b"></div>-->

          <!--<router-link :to="{ name:'Login', params: { call: true, callUrl: 'Index'} } ">-->
            <!--<p class="pal15 par15 Fwhite">-->
              <!--<span class="fl w25px"><img src="~@/assets/images/icon-logout.png" class="fl h16px" style="margin-top: 17px;"></span>-->
              <!--切换账户-->
            <!--</p>-->
          <!--</router-link>-->
          <!--<div class="clear bor-gray bor-solid-1b"></div>-->

      <!--</div>-->

      <!--<div class="wb100">-->
        <!--<div class="h50px lh50px pal15 relative warpper-red" :style="showUserMeun ? 'z-index: 999999': 'z-index: 9'">-->

          <!--<router-link :to="{ name:'Recharge' } ">-->
            <!--<div class="w170px h30px radius15 warpper-white absolute" style="top:10px">-->
              <!--<div class="pal10 fl" style="margin-top: -8px">-->
                <!--<img src="~@/assets/images/jb_sy.png" class="w15px">-->
              <!--</div>-->
              <!--<p class="Fred h30px lh30px fl mal10 Fnum" style="margin-top: 1px">{{user.accountBalance}}</p>-->
              <!--<div class="fr " style="margin-top: -7px;padding-right: 6px">-->
                <!--<img src="~@/assets/images/cz_sy.png" class="w18px">-->
              <!--</div>-->
            <!--</div>-->
          <!--</router-link>-->

          <!--<template v-if="login == true">-->
            <!--<div class="w70px h50px absolute text-center warpper-black-3 bor-white bor-solid-1l" @click="showUserMeun = !showUserMeun" style="top: 0; right: 0; z-index: 20;">-->
              <!--<img :src="user.photoUrl ? user.photoUrl : userHead" class="w30px fl mal10 mat10">-->
              <!--<img src="~@/assets/images/shape_down_gr2.png" class="h8px" v-show="showUserMeun == false">-->
              <!--<img src="~@/assets/images/shape_up_gr2.png" class="h8px" v-show="showUserMeun == true">-->
            <!--</div>-->
          <!--</template>-->

          <!--<template v-else>-->
            <!--<router-link :to="{ name:'Login' } ">-->
              <!--<div class="w70px h50px absolute text-center warpper-black-3 bor-white bor-solid-1l" style="top: 0; right: 0; z-index: 20;">-->
                <!--<img :src="userHead" class="w30px fl mal20 mat10 radius50per">-->
              <!--</div>-->
            <!--</router-link>-->
          <!--</template>-->

        <!--</div>-->
      <!--</div>-->

      <div class="wb100 warpper-red h30px pat10 pab10">
        <img src="~@/assets/images/logo.png" class="fl h30px mal15">
        <img src="~@/assets/images/icon-kf.png" class="fr h20px mar15 mat5" style="height: 24px; margin-top: 3px;" @click="showService = true">
      </div>

      <div class="wb100">
        <el-carousel :height="_height + 'px'" ref="carousel">
          <el-carousel-item v-for="(item,key) in banner" :key="key">
            <!--<a :href="'lesson_detail.html?channelID='+item.typeID">-->
            <div class="wb100 img-area" :style="'width:'+_width+'px; height:'+_height+'px;'" @touchstart="moveStart" @touchend="moveEnd">
              <!--<img :src="item.imageURL + '?x-oss-process=image/resize,m_fixed,h_'+_height * 2 +',w_'+_width * 2" />-->
              <img :src="item.imageURL" />
            </div>
            <!--</a>-->
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="clear"></div>

      <!--<div class="wb100 h45px lh45px Fgray-3">-->
        <!--<p><img src="~@/assets/images/icon-notice.png" class="h15px ma10 fl">恭喜【王**】双色球中奖2000元！</p>-->
      <!--</div>-->

      <!--<div class="clear1 warpper-gray-1"></div>-->

      <!--<div class="pa15">-->
        <!--<el-row :gutter="15">-->
          <!--<el-col :span="6">-->
            <!--<div class="wb100 h40px pat5 pab5 bor-blue bor-solid-1a lh20px text-center F14 Fblue radius5">-->
              <!--<p>江苏苏宁</p>-->
              <!--<p>2.95</p>-->
            <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
            <!--<div class="wb100 h40px pat5 pab5 bor-blue bor-solid-1a lh20px text-center F14 Fblue radius5">-->
              <!--<p>江苏苏宁</p>-->
              <!--<p>2.95</p>-->
            <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
            <!--<div class="wb100 h40px pat5 pab5 bor-blue bor-solid-1a lh20px text-center F14 Fblue radius5">-->
              <!--<p>江苏苏宁</p>-->
              <!--<p>2.95</p>-->
            <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
            <!--<div class="wb100 h40px pat5 pab5 warpper-red lh20px text-center F14 Fwhite radius5">-->
              <!--<p>投注</p>-->
              <!--<p>50.00元</p>-->
            <!--</div>-->
          <!--</el-col>-->

        <!--</el-row>-->
      <!--</div>-->

      <!--<div class="clear"></div>-->

      <!--<div class="pal15 par15 F14 h20px lh20px mab10" v-if="selectBet1 == false">-->
        <!--<span class="fl F16 Fgray-3">竞足赛事</span>-->
        <!--<span class="fl Fgray-2 mal10">5/31 18:00截止</span>-->
        <!--<a href="javascript:;" class="Fblue fr">更多赛事 > </a>-->
      <!--</div>-->

      <!--<div class="clear1 warpper-gray-1"></div>-->

      <!--<div class="pal15 par15" v-if="selectBet1 == true">-->
        <!--<el-row class="bor-red bor-solid-1a text-center F12 Fgray-2" :style="'height:'+(width_ball + 2) +'px; line-height: '+ (width_ball+2) + 'px;'">-->
          <!--<el-col class="bor-red bor-solid-1r" :span="4" :style="'height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--10元-->
          <!--</el-col>-->
          <!--<el-col class="bor-red bor-solid-1r" :span="4" :style="'height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--50元-->
          <!--</el-col>-->
          <!--<el-col class="bor-red bor-solid-1r" :span="4" :style="'height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--200元-->
          <!--</el-col>-->
          <!--<el-col class="bor-red bor-solid-1r" :span="4" :style="'height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--500元-->
          <!--</el-col>-->
          <!--<el-col :span="8" :style="'height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--预计奖金：100元-->
          <!--</el-col>-->

        <!--</el-row>-->
      <!--</div>-->

      <!--<div class="clear"></div>-->

      <!--<div class="wb100">-->
        <!--<div class="pal15 pat15 pab15">-->

          <!--<template v-for="(item,key) in ball">-->
            <!--<div class="bor-solid-1a radius50per text-center fl mar15" :class="item.type == 'red' ? 'bor-red Fred' : 'bor-blue Fblue'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
              <!--{{item.num}}-->
            <!--</div>-->
          <!--</template>-->
          <!--<div class="bor-solid-1a text-center fl bor-blue img-area img-area-small"  :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--<img src="~@/assets/images/icon-refresh.png">-->
          <!--</div>-->

          <!--<div class="clear"></div>-->

        <!--</div>-->
      <!--</div>-->

      <!--<div class="clear"></div>-->

      <!--<div class="pal15 par15 F14" v-if="selectBet2 == false" :style="'height:'+(width_ball + 2) +'px; line-height: '+ (width_ball+2) + 'px;'">-->
        <!--<span class="fl F16 Fgray-3">双色球</span>-->
        <!--<span class="fl Fgray-2 mal10">5/31 18:00截止</span>-->

        <!--<div class="wb40 fr">-->
          <!--<div class="wb30 fl radius5 bor-red bor-solid-1a Fred text-center" :style="' height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--1 注-->
          <!--</div>-->
          <!--<div class="wb60 fr radius5 warpper-red Fwhite text-center" :style="' height:'+(width_ball+2) +'px; line-height: '+(width_ball+2)+'px;'">-->
            <!--投注2元-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="clear1"></div>-->

      <!--<div class="clear1 warpper-gray-1"></div>-->

      <!--<div class="pa15" v-if="selectBet2 == true">-->
        <!--<el-row class="bor-red bor-solid-1a text-center F12 Fgray-2" :style="'height:'+(width_ball + 2) +'px; line-height: '+ (width_ball+2) + 'px;'">-->
          <!--<el-col class="bor-red bor-solid-1r" :span="6" :style="'height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--1注-->
          <!--</el-col>-->
          <!--<el-col class="bor-red bor-solid-1r" :span="6" :style="'height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--10注-->
          <!--</el-col>-->
          <!--<el-col class="bor-red bor-solid-1r" :span="6" :style="'height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--20注-->
          <!--</el-col>-->
          <!--<el-col :span="6" :style="'height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
            <!--425注-->
          <!--</el-col>-->

        <!--</el-row>-->
      <!--</div>-->

      <div class="wb100 text-center lh25px F14">
        <div class="pal5 par5 pat15 pab15">
          <router-link :to="{ name: 'Notice' }">
            <div class="wb25 fl">
              <div class="pal5 par5">
                <div class="pal10 par10 img-area">
                  <img src="~@/assets/images/icon-index1.png">
                </div>
                <p class="Fgray-3">开奖</p>
              </div>
            </div>
          </router-link>
          <router-link :to="{ name: 'UserTicketAll' }">
            <div class="wb25 fl">
              <div class="pal5 par5">
                <div class="pal10 par10 img-area">
                  <img src="~@/assets/images/icon-index2.png">
                </div>
                <p class="Fgray-3">购彩记录</p>
              </div>
            </div>
          </router-link>
          <router-link :to="{ name: 'Recharge' }">
            <div class="wb25 fl">
              <div class="pal5 par5">
                <div class="pal10 par10 img-area">
                  <img src="~@/assets/images/icon-index3.png">
                </div>
                <p class="Fgray-3">充值</p>
              </div>
            </div>
          </router-link>
          <router-link :to="{ name: 'User' }">
            <div class="wb25 fl">
              <div class="pal5 par5">
                <div class="pal10 par10 img-area">
                  <img src="~@/assets/images/icon-index4.png">
                </div>
                <p class="Fgray-3">个人中心</p>
              </div>
            </div>
          </router-link>
          <div class="clear"></div>
        </div>
      </div>

      <div class="clear1 warpper-gray-1"></div>

      <div class="clear1"></div>

      <div class="wb100">
        <div class="wb100">
          <template v-for="(item,key) in categorys">
              <div class="wb33333 fl" @click="toLottery(item.type,item.typeCode)">
                <div class="wb100 text-center lh20px mab15">
                  <div class="pal30 par30 img-area">
                    <img :src="item.icon">
                  </div>
                  <p class="Fgray-3 F14 Fnum">{{item.typeName}}</p>
                  <p class="Fgray-2 F12">{{item.subtitle}}</p>
                </div>
              </div>
          </template>
        </div>
      </div>

      <!--<div class="wb100">-->
        <!--<div class="wb100">-->
          <!--<template v-for="(item,key) in categorys">-->
            <!--<div class="wb33333 fl" @click="openList(item,key)">-->
              <!--<div class="wb100 text-center lh20px">-->
                <!--<div class="wb60 center img-area">-->
                  <!--<img :src="categoryIcons[key]">-->
                <!--</div>-->
                <!--<p class="Fgray-3 F14">{{item.title}}</p>-->
                <!--<p class="Fgray-2 F12">{{item.subtitle}}</p>-->
              <!--</div>-->
            <!--</div>-->

            <!--<template v-if="key % 3 == 2">-->
              <!--<div class="clear1"></div>-->
              <!--<div class="wb100" style="background: #FCFAF2;" v-if="showList == true && currentIndex <= 2">-->
                <!--<div class="wb100">-->
                  <!--<template v-for="item2 in current.details">-->
                    <!--<p class="h30px lh30px pal15 pat10 pab10" @click="toLottery(current.type,item2)">-->
                      <!--<img :src="categoryIcons[current.type - 1]" class="h30px fl mar10">-->
                      <!--{{item2.typeTitle}}-->
                      <!--<img src="~@/assets/images/arrow-right.png" class="fr" style="height: 14px; margin-top: 8px; margin-right: 15px;">-->
                    <!--</p>-->
                    <!--<div class="pal15">-->
                      <!--<div class="clear bor-gray bor-solid-1b"></div>-->
                    <!--</div>-->
                  <!--</template>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="clear1"></div>-->
            <!--</template>-->

          <!--</template>-->

          <!--<template>-->
            <!--<div class="wb100" v-if="showList == true && currentIndex > 2">-->
              <!--<div class="clear1"></div>-->
              <!--<div class="wb100" style="background: #FCFAF2;">-->
                <!--<div class="wb100">-->
                  <!--<template v-for="item2 in current.details">-->
                    <!--<p class="h30px lh30px pal15 pat10 pab10" @click="toLottery(current.type,item2)">-->
                      <!--<img :src="categoryIcons[current.type - 1]" class="h30px fl mar10">-->
                      <!--{{item2.typeTitle}}-->
                      <!--<img src="~@/assets/images/arrow-right.png" class="fr" style="height: 14px; margin-top: 8px; margin-right: 15px;">-->
                    <!--</p>-->
                    <!--<div class="pal15">-->
                      <!--<div class="clear bor-gray bor-solid-1b"></div>-->
                    <!--</div>-->
                  <!--</template>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</template>-->


        <!--</div>-->
      <!--</div>-->

      <!--<div class="wb100">-->
        <!--<div class="pa15">-->
          <!--<el-row :gutter="15">-->
            <!--<el-col :span="8" v-for="(item,key) in categorys" :key="key">-->
              <!--<router-link :to="item.url">-->
                <!--<div class="wb100 text-center lh20px mab30">-->
                  <!--<div class="wb60 center img-area">-->
                    <!--<img :src="item.img">-->
                  <!--</div>-->
                  <!--<p class="Fgray-3 F14">{{item.name}}</p>-->
                  <!--<p class="Fgray-2 F12">{{item.content}}</p>-->
                <!--</div>-->
              <!--</router-link>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</div>-->
      <!--</div>-->

      <div class="clear1"></div>


      <!--开奖公告-->

      <div class="clear1 warpper-gray-1"></div>

      <div class="wb100">
        <div class="wb100">

          <div class="clear"></div>

          <div class="pal15">

            <template v-for="item in notices">

              <div class="clear1"></div>
              <p class="h30px lh30px Fgray-3 Fnum">{{item.lotteryTitle}}</p>
              <p class="h20px lh20px Fgray-2 F14 Fnum">第{{item.number}}期 | 开奖时间：{{item.officialStopTime}}</p>
              <div class="clear1"></div>

              <router-link :to="{ name: 'NoticeMore', query:{ lotteryType: item.lotteryType } }">

                <div class="wb100">

                  <div class="wb100" v-if="item.type== 1 || item.type == 4">

                    <template v-if="item.empty">

                      <template v-if="item.type == 1">
                        <div class="Fwhite radius50per text-center fl mar10 warpper-red" v-for="item in [0,1,2,3,4,5]" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                          ?
                        </div>
                        <div class="Fwhite radius50per text-center fl mar10 warpper-blue" v-for="item in [0]" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                          ?
                        </div>
                      </template>

                      <template v-if="item.type == 4">
                        <div class="Fwhite radius50per text-center fl mar10 warpper-red" v-for="item in [0,1,2,3,4]" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                          ?
                        </div>
                        <div class="Fwhite radius50per text-center fl mar10 warpper-blue" v-for="item in [0,1]" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                          ?
                        </div>
                      </template>

                    </template>

                    <template v-else>
                      <template v-for="(item2,key2) in item.balls">
                        <div class="Fwhite radius50per text-center fl mar10 Fnum" v-if="item.lotteryType=='ssq'" :class="item2.type == 'red' ? 'warpper-red' : 'warpper-blue'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                          {{item2.num}}
                        </div>
                        <div class="Fwhite radius50per text-center fl mar10 Fnum" v-if="item.lotteryType=='dlt'" :class="item2.type == 'red' ? 'warpper-red' : 'warpper-blue'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                          {{item2.num}}
                        </div>
                      </template>
                    </template>

                    <div class="fr" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                      <img src="~@/assets/images/arrow-right.png" class="fr mar15" :style="'height:'+ (width_ball/2) +'px; margin-top: '+ (width_ball/4) +'px;'">
                    </div>
                    <div class="clear"></div>
                  </div>

                  <div class="wb100" v-if="item.type == 3">

                    <template v-if="item.empty">
                      <div class="Fwhite radius50per text-center fl mar10 warpper-red" v-for="item in [0,1,2,3,4]" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                        ?
                      </div>
                    </template>

                    <template v-else>
                      <template v-for="(item2,key2) in item.balls">
                        <div class="Fwhite radius50per text-center fl mar10 warpper-red Fnum" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                          {{item2}}
                        </div>
                      </template>
                    </template>

                    <div class="fr" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                      <img src="~@/assets/images/arrow-right.png" class="fr mar15" :style="'height:'+ (width_ball/2) +'px; margin-top: '+ (width_ball/4) +'px;'">
                    </div>
                    <div class="clear"></div>
                  </div>


                  <div class="wb100" v-if="item.type == 2">

                    <div class="warpper-green fl pal20 radius20 par10">

                      <template v-if="item.empty">
                        <div class="fl mar10 mat5" v-for="item in [0,1,2]" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                          <img src="~@/assets/images/sz_wh.png" :style="'width:'+ (width_ball-5) +'px; height:'+(width_ball-5)+'px;'">
                        </div>
                      </template>

                      <template v-else>
                        <template v-for="(item2,key2) in item.balls">
                          <div class="fl mar10 mat5" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                            <img :src="szIcons[item2 - 1]" :style="'width:'+ (width_ball-5) +'px; height:'+(width_ball-5)+'px;'">
                          </div>
                        </template>
                      </template>

                    </div>

                    <div class="fl w80px lh40px h40px mal20 F16 Fgray-3">
                      和值：<span class="Fred Fnum"> {{getSum(item.balls)}}</span>
                    </div>

                    <div class="fr" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                      <img src="~@/assets/images/arrow-right.png" class="fr mar15" :style="'height:'+ (width_ball/2) +'px; margin-top: '+ (width_ball/4) +'px;'">
                    </div>
                    <div class="clear"></div>
                  </div>

                </div>

              </router-link>
              <div class="clear1 bor-gray bor-solid-1b"></div>

            </template>

          </div>

          <div class="clear1"></div>


        </div>

        <!--<nav-footer :active="2"></nav-footer>-->

      </div>


    </div>

    <!--<nav-footer :active="1"></nav-footer>-->

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
  import defaultHead from '../assets/images/head-default.png'

  import Category1 from '../assets/images/category-1.png'
  import Category2 from '../assets/images/category-2.png'
  import Category3 from '../assets/images/category-3.png'
  import Category4 from '../assets/images/category-4.png'
  import Category5 from '../assets/images/category-5.png'
  import Category6 from '../assets/images/category-6.png'
  import Category7 from '../assets/images/category-7.png'
  import Category8 from '../assets/images/category-8.png'
  import Category9 from '../assets/images/category-9.png'
  import Category10 from '../assets/images/category-10.png'
  import Category11 from '../assets/images/category-11.png'
  import Category12 from '../assets/images/category-12.png'

  import sz1 from '../assets/images/sz_1.png'
  import sz2 from '../assets/images/sz_2.png'
  import sz3 from '../assets/images/sz_3.png'
  import sz4 from '../assets/images/sz_4.png'
  import sz5 from '../assets/images/sz_5.png'
  import sz6 from '../assets/images/sz_6.png'

  import Banner from '../assets/images/banner.jpg'

  export default{

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
        userHead: defaultHead,
        showService: false,
        selectBet1: false,
        selectBet2: false,
        showList: false,
        showUserMeun: false,
        login: false,
        user: {
          photoUrl: '',
          accountBalance: 0
        },
        szIcons: [sz1, sz2, sz3, sz4, sz5, sz6],
        banner: [{
          "imageURL": Banner,
        }],
        notices: [],
        categoryIcons: [Category3, Category1, Category2, Category4, Category5],
        ball: [{ type: 'red', num: '9' }, { type: 'red', num: '8' }, { type: 'red', num: '7' }, { type: 'red', num: '6' }, { type: 'red', num: '5' }, { type: 'blue', num: '4' }, { type: 'blue', num: '3' }],
//        categorys: [
//          { name: '快3系列', img: Category1, url: 'LotteryQ3', content: '快3系列', list: [] },
//          { name: '11选5系列', img: Category2, url: 'LotteryD11', content: '11选5系列', list: [] },
//          { name: '双色球', img: Category3, url: 'LotterySsq', content: '双色球', list: [] },
//          { name: '大乐透', img: Category4, url: 'LotteryDlt', content: '大乐透', list: [] },
//          { name: '竞彩足球', img: Category5, url: 'Soccer', content: '竞彩足球', list: [] },]

        categorys: [],
        current: {},
        currentIndex: 0,
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
      openList(item, key) {

          if(item.details.length == 1){
              this.toLottery(item.type, item.details[0]);
          }else{
            this.showList = true;
            this.currentIndex = key;
            this.current = item;
          }

      },

      getSum(arr){
        let _s = 0;
        for(let i=0; i<arr.length; i++){
            _s += Number.parseInt(arr[i]);
        }
        return _s;
      },

      toLottery(type, typeCode) {

          if(type == 1){
              //双色球
            this.$router.push({ name: 'LotterySsq', params: { playIndex : 0 } });
            window.sessionStorage.setItem("ssqPlayType", typeCode);
          }else if(type == 2){
              //快三系列
            this.$router.push({ name: 'LotteryQ3', params: { playIndex : 0 } });
            window.sessionStorage.setItem("q3PlayType", typeCode);
          }
          if(type == 3){
              //11选5系列
            this.$router.push({ name: 'LotteryD11', params: { playIndex : 0 } });
            window.sessionStorage.setItem("d11PlayType", typeCode);
          }
          if(type == 4){
              //大乐透
            this.$router.push({ name: 'LotteryDlt', params: { playIndex : 0 } });
            window.sessionStorage.setItem("dltPlayType", typeCode);
          }
      },

    },

    created(){

        //关闭首页入口
      this.$router.push({ name: 'Soccer'});

//
//      this.width = $(window).width();
//      this.height = $(window).height();
//      this._width = parseInt($(window).width());
//      this._width2 = parseInt($(window).width());
//      this._height = parseInt((this._width + 30) * 160 / 375);
//
//      this.width_ball = Math.floor((this.width - 7 * 17 - 30) / 8);
//
//      Interface.lotteryListWap( (data) => {
//        if(data){
//          let _tmp = data.returnJSON;
//          let _arr = [];
//          for(let i=0; i<_tmp.length; i++){
//
//              let _item = _tmp[i];
//              if(_item.lotteryType == 'ssq' || _item.lotteryType == 'dlt' || _item.lotteryType == 'JSK3' || _item.lotteryType == 'JXK3' || _item.lotteryType == 'C511' || _item.lotteryType == 'CQD11' || _item.lotteryType == 'GDD11' || _item.lotteryType == 'D11' || _item.lotteryType == 'dlc'){
//
//                  let _icon = '';
//
//                  if(_item.lotteryType == 'ssq'){
//                    _icon = Category3;
//                  }else if(_item.lotteryType == 'dlt'){
//                    _icon = Category4;
//                  }else if(_item.lotteryType == 'JSK3'){
//                    _icon = Category1;
//                  }else if(_item.lotteryType == 'JXK3'){
//                    _icon = Category8;
//                  }else if(_item.lotteryType == 'C511'){
//                    _icon = Category10;
//                  }else if(_item.lotteryType == 'CQD11'){
//                    _icon = Category11;
//                  }else if(_item.lotteryType == 'GDD11'){
//                    _icon = Category12;
//                  }else if(_item.lotteryType == 'D11'){
//                    _icon = Category2;
//                  }else if(_item.lotteryType == 'dlc'){
//                    _icon = Category11;
//                  }
//
//                  _arr.push({
//                    title: _item.lotteryTitle,
//                    subtitle:  _item.lotteryTitle,
//                    typeCode: _item.lotteryType,
//                    typeName: _item.lotteryTitle,
//                    type: Base.getLotteryType(_item.lotteryType).type,
//                    icon: _icon
//                  })
//              }
//
//          }
//
//          this.categorys = _arr;
//        }
//        this.fullscreenLoading = false;
//      })
//
//
//      Interface.userBaseInfo( (data) => {
//
//        if (data) {
//          if (Base.isNull(data.returnJSON)) {
//            this.login = false;
//          } else {
//            this.login = true;
//            this.user = data.returnJSON;
//          }
//        } else {
//          this.login = false;
//        }
//        this.fullscreenLoading = false;
//      });
//
//      Interface.openAwardList( (data) => {
//
//        if (data) {
//
//          var _tmp = data.returnJSON;
//
//          for (var i = 0; i < _tmp.length; i++) {
//
//            let _type = Base.getLotteryType(_tmp[i].lotteryType).type;
//
//            _tmp[i].type = _type;
//
//            if(Base.isNull(_tmp[i].bonusCode)){
//              _tmp[i].empty = true;
//              continue;
//            }
//
//            if (_type == 1) {
//              //双色球
//              var _bonus = _tmp[i].bonusCode;
//
//              var reds = _bonus.split('#')[0].split(',');
//              var blue = _bonus.split('#')[1];
//
//              var _balls = [];
//
//              for (var _i = 0; _i < reds.length; _i++) {
//                _balls.push({
//                  type: 'red',
//                  num: reds[_i]
//                });
//              }
//              _balls.push({
//                type: 'blue',
//                num: blue
//              });
//
//              _tmp[i].balls = _balls;
//            } else if (_type == 4) {
//              //大乐透
//              var _bonus2 = _tmp[i].bonusCode;
//
//              var _reds = _bonus2.split('#')[0].split(',');
//              var _blue = _bonus2.split('#')[1].split(',');;
//
//              var _balls2 = [];
//
//              for (var _i2 = 0; _i2 < _reds.length; _i2++) {
//                _balls2.push({
//                  type: 'red',
//                  num: _reds[_i2]
//                });
//              }
//              _balls2.push({
//                type: 'blue',
//                num: _blue[0]
//              });
//              _balls2.push({
//                type: 'blue',
//                num: _blue[1]
//              });
//
//              _tmp[i].balls = _balls2;
//            } else {
//              var _balls3 = _tmp[i].bonusCode.split(',');
//              _tmp[i].balls = _balls3;
//            }
//          }
//
//          this.notices = data.returnJSON;
//        }
//
//        this.fullscreenLoading = false;
//
//      });

    },

    mounted(){

//        Base.setCookie('test',123);
//
//        Base.getCookie('test')

    },

  }


</script>

