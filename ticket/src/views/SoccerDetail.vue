<template>
  <div id="ticket_detail_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'方案详情'" :back="true"></navTitle>

    <div class="wb100">

      <!--<div class="wb100 h50px relative warpper-red" style="z-index: 99999;">-->
      <!--<div class="w50px h50px fl" @click="myBack">-->
      <!--<div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>-->
      <!--</div>-->
      <!--<p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">方案详情</p>-->
      <!--</div>-->

      <div class="clear"></div>

      <div class="pa15 lh30px">
        <img :src="icons" class="w60px fl">
        <div class="w120px fl mal10">
          <p class="Fwhite-1">{{ticket.lotteryName}}</p>
          <p class="Fblack-2 F14">第 {{ticket.number}} 期</p>
        </div>

        <div class="w130px fr h60px  text-right F18">
          <template v-if="ticket.status == 0">
            <p class="Fblue lh30px">等待出票</p>
            <p class="Fblack-2 lh30px F12">预计 {{ dateShort2(ticket.expectedOpenTime)}} 开奖</p>
          </template>
          <template v-if="ticket.status == 1">
            <p class="Fred lh30px">已中奖</p>
            <p class="Fred lh30px F16 Fnum">{{twoDecimal(ticket.bonusMoney)}}</p>
          </template>
          <template v-if="ticket.status == 2">
            <p class="Fblack-2 lh60px">未中奖</p>
          </template>
          <template v-if="ticket.status == 3">
            <p class="Fred lh30px">投注失败</p>
            <p class="Fblack-2 lh30px F12">订单状态：已退款</p>
          </template>
          <template v-if="ticket.status == 4">
            <p class="Fblue lh30px">等待开奖</p>
            <p class="Fblack-2 lh30px F12">预计 {{ dateShort2(ticket.expectedOpenTime)}} 开奖</p>
          </template>
        </div>
        <div class="clear"></div>
      </div>

      <div class="clear bor-black4 bor-solid-1b"></div>

      <!--<div class="pa15 Fgray-3">-->

        <!--<div class="wb100 F14 lh30px text-center">-->
          <!--<div class="fl wb33333">-->
            <!--<p class="Fgray-2">订单金额（元）</p>-->
            <!--<p class="Fgray-3">{{ticket.lotMoney}}</p>-->
          <!--</div>-->
          <!--<div class="fl wb33333">-->
            <!--<p class="Fgray-2">订单状态</p>-->
            <!--<p class="Fblue" v-if="ticket.status == 0">等待出票</p>-->
            <!--<p class="Fred" v-if="ticket.status == 1">已中奖</p>-->
            <!--<p class="Fgray-3" v-if="ticket.status == 2">未中奖</p>-->
            <!--<p class="Fred" v-if="ticket.status == 3">投注失败（已退款）</p>-->
            <!--<p class="Fblue" v-if="ticket.status == 4">等待开奖</p>-->
          <!--</div>-->
          <!--<div class="fl wb33333">-->
            <!--<p class="Fgray-2">税后奖金（元）</p>-->
            <!--<p class="Fred" v-if="ticket.status == 1">{{twoDecimal(ticket.bonusMoney)}}</p>-->
            <!--<p class="Fgray-3" v-if="ticket.status != 1">— —</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="clear"></div>-->
      <!--</div>-->

      <div class="clear"></div>

      <!--<p class="warpper-gray-3 h40px lh40px pal15 par15 Fgray-3 F14">-->
        <!--<span class="w120px fl">预计开奖时间：</span>-->
        <!--<span class="fl" v-if="ticket.status == 0">— —</span>-->
        <!--<template v-if="ticket.status != 0">-->
          <!--<span v-html="formatNum(ticket.bonusCode)"></span>-->
        <!--</template>-->
      <!--</p> -->

      <p class="warpper-black-3 h40px lh40px pal15 par15 Fwhite-1 F14">
        投注金额： {{ticket.lotMoney}}元
      </p>

      <div class="clear"></div>

      <div class="pa15 lh25px F16 relative Fwhite-1">
        <p class="lh40px">
          <span class="w120px fl">投注信息</span>
          <span class="Fgray-2 fr F16" @click="showDetail = !showDetail">
              <img src="~@/assets/images/arrow-down.png" class="h8px" v-show="showDetail == false">
              <img src="~@/assets/images/arrow-up.png" class="h8px" v-show="showDetail == true">
          </span>
        </p>
      </div>

      <div class="clear"></div>

      <div class="wb100" v-show="showDetail">

          <p class="bor-solid-1t bor-black4 pal15 h40px lh40px F14 Fwhite-1">
            {{ticket.betDesc}}
            <!--<template v-for="item in ticket.lotteryType">{{formatLotteryType(item)}}</template>{{ticket.betNumber}}注{{ticket.lotMulti}}倍-->
          </p>

        <div class="wb100">

          <!--<div class="clear1"></div>-->

          <template v-if="ticket.sumFailMoney">
            <div class="warpper-red wb100 text-center h40px lh40px Fwhite absolute" style="top: 50px; left: 0;">
              部分投注失败，已退款{{ticket.sumFailMoney}}元,请至个人中心查收
            </div>
            <div class="clear h40px"></div>
          </template>

          <div class="wb100">
            <!--<p>{{ticket.lotteryName}}</p>-->

            <div class="clear"></div>

            <div class="wb100 F12">
              <div class="h40px lh40px wb100 warpper-black-3 Fblack-2 text-center bor-black4 bor-solid-1a">
                <div class="wb15 fl">
                  <div class="wb100 h40px lh40px bor-black4 bor-solid-1r">
                    场次
                  </div>
                </div>
                <div class="wb25 fl">
                  <div class="wb100 h40px lh40px bor-black4 bor-solid-1r">
                    主队VS客队
                  </div>
                </div>

                <div class="wb60 fl">
                  <div class="wb33333 fl">
                    <div class="wb100 h40px lh40px bor-black4 bor-solid-1r">
                      玩法
                    </div>
                  </div>
                  <div class="wb33333 fl">
                    <div class="wb100 h40px lh40px bor-black4 bor-solid-1r">
                      投注内容
                    </div>
                  </div>
                  <div class="wb33333 fl">
                    <div class="wb100 h40px lh40px">
                      彩果
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--<div class="wb100">-->
              <!--<template v-for="item in matchData">-->
                <!--<div class="wb100">-->
                  <!--<p>{{item.day}}</p>-->
                <!--</div>-->

                <!--<div class="wb100">-->
                  <!--<template v-for="item2 in item.lotList">-->
                    <!--<p>{{item2.lotResult}}</p>-->
                  <!--</template>-->
                <!--</div>-->

              <!--</template>-->
            <!--</div>-->


            <div class="wb100 bor-black4 bor-solid-1l bor-solid-1r F12">
              <template v-for="item in matchData">
                <div class="wb100">
                  <div class="wb100 Fwhite-1 text-center">
                    <div class="wb15 fl">
                      <div class="wb100 bor-black4 bor-solid-1r bor-solid-1b lh20px F12" :style="'height:'+ (item.lotList.length * 71 - 1 - (item.lotList.length * 71 - 1 - 60)/2) +'px; padding-top:'+ (item.lotList.length * 71 - 1 - 60)/2 +'px;'">
                        <p>{{weekFormat(item.weekId)}}{{item.teamId}}</p>
                        <p>{{dayFormat(item.matchTime)}}</p>
                        <p>{{timeFormat(item.matchTime)}}</p>
                      </div>
                    </div>
                    <div class="wb25 fl">
                      <div class="wb100 bor-black4 bor-solid-1r bor-solid-1b lh20px" :style="'height:'+ (item.lotList.length * 71 - 1 - (item.lotList.length * 71 - 1 - 60)/2) +'px; padding-top:'+ (item.lotList.length * 71 - 1 - 60)/2 +'px;'">
                        <p class="text-over-hidden1 h20px lh20px">{{item.hTeam}}</p>
                        <p class="text-over-hidden1 h20px lh20px">{{item.matchResult || 'vs'}}</p>
                        <p class="text-over-hidden1 h20px lh20px">{{item.vTeam}}</p>
                      </div>
                    </div>
                    <div class="wb60 fl">

                        <template v-if="ticket.lotteryType == 'FT005'">
                          <template v-for="item2 in item.lotList">
                            <div class="wb100">
                              <div class="wb33333 fl">
                                <div class="wb100 bor-black4 bor-solid-1r bor-solid-1b h70px lh70px">
                                  {{playTypeFormat(item2.LotId)}}
                                </div>
                              </div>
                              <div class="wb33333 fl">
                                <!--比赛结果已出-->
                                <template v-if="item2.lossRadio">
                                  <div class="wb100 pat10 pab10 h50px lh25px bor-black4 bor-solid-1r bor-solid-1b" :class="item2.checkResult == 1 ? 'Fred' : 'Fwhite-1'">
                                    <p>{{getLotValue(item2.LotId, item2.lotResult)}}</p>
                                    <p class="Fblack-2">({{item2.lossRadio || '-'}})</p>
                                  </div>
                                </template>
                                <!--比赛结果未出-->
                                <template v-else>
                                  <div class="wb100 h70px lh70px bor-black4 bor-solid-1r bor-solid-1b" :class="item2.checkResult == 1 ? 'Fred' : 'Fwhite-1'">
                                    {{getLotValue(item2.LotId, item2.lotResult)}}
                                  </div>
                                </template>
                              </div>
                              <div class="wb33333 fl">
                                <div class="wb100 h70px lh70px bor-black4 bor-solid-1r bor-solid-1b" :class="item2.checkResult == 1 ? 'Fred' : 'Fblack-2'">
                                  {{item2.rewardResult || '-'}}
                                </div>
                              </div>
                            </div>
                            <div class="clear"></div>
                          </template>
                        </template>

                        <template v-else>
                          <div class="wb100">
                            <div class="wb33333 fl">
                              <div class="wb100 bor-black4 bor-solid-1r bor-solid-1b" :style="'height:'+ (item.lotList.length * 71 - 1) +'px;line-height:'+ (item.lotList.length * 71 -1) +'px;'">
                                {{playTypeFormat(item.lotList[0].LotId)}}
                              </div>
                            </div>
                            <div class="wb33333 fl">
                              <template v-for="(item2,key2) in item.lotList">
                                <!--比赛结果已出-->
                                <template v-if="item2.lossRadio">
                                    <div class="wb100 pat10 pab10 h50px lh25px bor-black4 bor-solid-1r bor-solid-1b" :class="item2.checkResult == 1 ? 'Fred' : 'Fwhite-1'">
                                      <p>{{getLotValue(item2.LotId, item2.lotResult)}}</p>
                                      <p class="Fblack-2">({{item2.lossRadio || '-'}})</p>
                                    </div>
                                </template>
                                <!--比赛结果未出-->
                                <template v-else>
                                  <div class="wb100 h70px lh70px bor-black4 bor-solid-1r bor-solid-1b" :class="item2.checkResult == 1 ? 'Fred' : 'Fwhite-1'">
                                    {{getLotValue(item2.LotId, item2.lotResult)}}
                                  </div>
                                </template>
                              </template>
                            </div>
                            <div class="wb33333 fl">
                              <template v-for="(item2,key2) in item.lotList">
                                  <div class="wb100 h70px lh70px bor-black4 bor-solid-1r bor-solid-1b" :class="item2.checkResult == 1 ? 'Fred' : 'Fblack-2'">
                                    {{item2.rewardResult || '-'}}
                                    <template v-if="item2.LotId == 'FT006'">
                                      (<template v-if="item2.letBall>0">+</template>{{item2.letBall}})
                                    </template>
                                  </div>
                              </template>
                            </div>

                          </div>
                        </template>

                    </div>
                    <!--<div class="wb20 fl">-->
                      <!--<div class="wb100 bor-gray bor-solid-1b lh20px" :style="'height:'+ (item.lotList.length * 71 - 1) +'px;line-height:'+ (item.lotList.length * 71 - 1) +'px;'">-->
                        <!--<p class="Fnum">{{item.rewardResult || '-'}}</p>-->
                      <!--</div>-->
                    <!--</div>-->
                    <div class="clear"></div>
                  </div>
                  <div class="clear"></div>
                </div>
              </template>
            </div>

            <div class="clear"></div>

            <router-link :to="{ name: 'SoccerDeal', params:{ ticketID: ticketID } }">
              <div class="wb100 h45px lh45px text-center bor-black4 bor-solid-1b bor-solid-1l bor-solid-1r Fblue">
                出票详情
              </div>
            </router-link>

          </div>

          <div class="clear"></div>
        </div>

        <div class="clear"></div>
      </div>

      <!--<div class="clear1 warpper-gray-3"></div>-->

      <!--<div class="wb100 lh25px F16 relative">-->

        <!--<p class="lh50px h50px pal15 par15">-->
          <!--<span class="w100px fl">出票明细</span>-->
          <!--<span class="Fgray-2 fr F14" @click="showDetail2 = !showDetail2">-->
                      <!--<img src="~@/assets/images/arrow-down.png" class="h8px" v-show="showDetail2 == false">-->
                      <!--<img src="~@/assets/images/arrow-up.png" class="h8px" v-show="showDetail2 == true">-->
                  <!--</span>-->
        <!--</p>-->

        <!--<div class="clear"></div>-->

        <!--<div class="wb100" v-show="showDetail2">-->

          <!--<p class="bor-solid-1t bor-gray pal15 h40px lh40px F14">-->
            <!--共计<span class="Fnum Fred">{{matchList.length}}</span>张，共<span class="Fred">{{ticket.lotMoney}}</span>元-->
          <!--</p>-->

            <!--<div class="wb100">-->
              <!--<div class="h40px lh40px wb100 warpper-gray-1 Fgray-2 text-center bor-gray bor-solid-1a">-->
                <!--<div class="wb20 fl">-->
                  <!--<div class="wb100 h40px lh40px bor-gray bor-solid-1r">-->
                    <!--出票时间-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="wb60 fl">-->
                  <!--<div class="wb100 h40px lh40px bor-gray bor-solid-1r">-->
                    <!--出票内容-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="wb20 fl">-->
                  <!--<div class="wb100 h40px lh40px">-->
                    <!--出票状态-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

            <!--<div class="wb100 bor-gray bor-solid-1l bor-solid-1r F14">-->

                <!--<div class="wb100">-->

                  <!--<template v-for="item in matchList">-->
                    <!--<div class="wb100 Fgray-3 text-center">-->
                      <!--<div class="wb20 fl">-->
                        <!--<div class="wb100 pat10 pab10 bor-gray bor-solid-1r bor-solid-1b lh20px" :style="'height: '+ (item.lotMatchList.length) * 20 +'px;'">-->
                          <!--&lt;!&ndash;{{formatModifyOn(item.modifyOn)}}&ndash;&gt;-->
                          <!--{{item.dealTime || '—'}}-->
                        <!--</div>-->
                      <!--</div>-->
                      <!--<div class="wb60 fl">-->
                        <!--<div class="pa10 bor-gray bor-solid-1r bor-solid-1b lh20px" :style="'height: '+ (item.lotMatchList.length) * 20 +'px;'">-->
                          <!--<template v-for="(item2,key) in item.lotMatchList">-->
                            <!--&lt;!&ndash;[{{getLotValue(item2.LotId,item2.val)}}]&ndash;&gt;-->

                            <!--<p class="lh20px text-over-hidden1">-->
                              <!--{{weekFormat(item2.weekId)}}-->
                              <!--{{item2.teamId}}-->

                              <!--&lt;!&ndash;<template v-for="item3 in item2.lotList">{{item3.lotResult}}</template>&ndash;&gt;-->
                              <!--[<template v-for="item3 in item2.lotList">{{getLotValue(item3.LotId, item3.lotResult)}} </template>]-->
                            <!--</p>-->
                          <!--</template>-->
                        <!--</div>-->
                      <!--</div>-->
                      <!--<div class="wb20 fl">-->
                        <!--<div class="wb100 pat10 pab10 bor-gray bor-solid-1b" :style="'height: '+ (item.lotMatchList.length) * 20 +'px; line-height: '+ (item.lotMatchList.length) * 20 +'px;'">-->
                          <!--&lt;!&ndash;<p class="Fblue" v-if="item.ticketStatus == 0">等待出票</p>&ndash;&gt;-->
                          <!--&lt;!&ndash;<p class="Fred" v-if="item.ticketStatus == 1">已中奖</p>&ndash;&gt;-->
                          <!--&lt;!&ndash;<p class="Fgray-3" v-if="item.ticketStatus == 2">未中奖</p>&ndash;&gt;-->
                          <!--&lt;!&ndash;<p class="Fred" v-if="item.ticketStatus == 3">投注失败（已退款）</p>&ndash;&gt;-->
                          <!--&lt;!&ndash;<p class="Fblue" v-if="item.ticketStatus == 4">等待开奖</p>&ndash;&gt;-->

                          <!--<p class="Fgray-3">{{item.ticketStatus}}</p>-->

                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</template>-->

                <!--</div>-->
              <!--<div class="clear"></div>-->
            <!--</div>-->
            <!--<div class="clear"></div>-->

        <!--</div>-->

      <!--</div>-->

      <div class="pa15 lh25px F14 warpper-black-3">

        <p class="Fblack-2 F14">
          <span class="w100px fl">下单时间</span>
          <span class="fl">{{ticket.createOn}}</span>
        </p>
        <div class="clear"></div>

        <p class="Fblack-2 F14">
          <span class="w100px fl">订单编号</span>
          <span class="fl">{{ticket.orderNo}}</span>
        </p>
        <div class="clear"></div>

      </div>

      <!--<div class="clear h80px"></div>-->

      <!--<div class="wb100 fixed bor-gray bor-solid-1t warpper-white" style="bottom: 0; z-index: 999;">-->
      <!--<div class="pa15">-->
      <!--<div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="toLottery">-->
      <!--继续投注-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->

    </div>

  </div>
</template>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  import type1 from '../assets/images/icon-type1.png'
  import type2 from '../assets/images/icon-type2.png'
  import type3 from '../assets/images/icon-type3.png'
  import type4 from '../assets/images/icon-type4.png'
  import type5 from '../assets/images/icon-type5.png'
  import type6 from '../assets/images/icon-type6.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        showDetail: true,
        showDetail2: false,
        showRule: false,
        myHeight: 0,
        ticketID: '',
        call: '',
        ticket: {},
        matchData: {},
        matchList: [],
        icons: '',
        ticketInfo: {
          title: '',
          icon: '',
          lotteryType: '',
          type: 1
        }
      }
    },

    methods: {
      myBack() {
        if (Base.isNull(this.call)) {
          this.toLottery();
        } else {
            this.$router.push({ name: this.call });
        }
      },

      stringToDate(dateString) {
        if (dateString) {
          let arr1 = dateString.split(" ");
          let sdate = arr1[0].split('-');
          let sdate2 = arr1[1].split(':');
          let date = new Date(sdate[0], sdate[1]-1, sdate[2], sdate2[0], sdate2[1], sdate2[2]);
          return date;
        }
      },

      dateShort(str){
        return str.substring(str.length - 8);
      },

      dateShort2(str){
        return str.substring(5, str.length - 3);
      },

      dateFormat(str){
        return str.substring(0,4) + '-' + str.substring(4,6) + '-' + str.substring(6);
      },

      dayFormat(str){
        return str.substring(5,10);
      },

      timeFormat(str){
        return str.substring(10,16);
      },

      formatModifyOn(str){
          if(Base.isNull(str)){
              return '-';
          }else{
              return str.substring(str.length - 14);
          }
      },

      formatLotteryType(str){
        if(str == '502' || str == 502){
          return '2串1';
        }else if(str == '503' || str == 503){
          return '3串1';
        }else if(str == '504' || str == 504){
          return '4串1';
        }else if(str == '505' || str == 505){
          return '5串1';
        }else if(str == '506' || str == 506){
          return '6串1';
        }else if(str == '507' || str == 507){
          return '7串1';
        }else if(str == '508' || str == 508){
          return '8串1';
        }

      },

      playValFormat(str){
        return str;
      },

      getLotValue(type, vals){
          vals = vals + '';
          let _tmp = '', _arr = [];
          vals = vals.split(',');
          for(let i=0; i<vals.length; i++){
              let val = vals[i];
            if(type == 'FT001'){
              if(val == '3')  _tmp = '主胜';
              else if(val == '1')  _tmp = '平';
              else if(val == '0')  _tmp = '客胜';
            }else if(type == 'FT002'){
              if(val == '90')  _tmp = '胜其他';
              else if(val == '99')  _tmp = '平其他';
              else if(val == '09')  _tmp = '负其他';
              else{
                let __tmp = val.split('');
                _tmp = __tmp[0] + ':' + __tmp[1];
              }
            }else if(type == 'FT003'){
              if(val >= 7){
                _tmp = '7+球'
              }else{
                _tmp = val + '球';
              }
            }else if(type == 'FT004'){
              if(val == '33')   _tmp = '胜胜';
              else if(val == '31')   _tmp = '胜平';
              else if(val == '31')   _tmp = '胜负';
              else if(val == '13')   _tmp = '平胜';
              else if(val == '11')   _tmp = '平平';
              else if(val == '10')   _tmp = '平负';
              else if(val == '03')   _tmp = '负胜';
              else if(val == '01')   _tmp = '负平';
              else if(val == '00')   _tmp = '负负';
            }else if(type == 'FT006'){
              if(val == '3')  _tmp = '让球主胜';
              else if(val == '1')  _tmp = '让球平';
              else if(val == '0')  _tmp = '让球客胜';
            }
            _arr.push(_tmp);
          }
          return _arr.join('，');
      },

      playTypeFormat(str){
        if(str == 'FT001'){
          return '胜平负';
        }else if(str == 'FT002'){
          return '比分';
        }else if(str == 'FT003'){
          return '总进球';
        }else if(str == 'FT004'){
          return '半全场';
        }else if(str == 'FT005'){
          return '混合玩法';
        }else if(str == 'FT006'){
          return '让胜平负';
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

      formatNum(_nums) {

        if(Base.isNull(_nums)){
          return '-';
        }

      },
      twoDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x*100)/100;
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

    },

    mounted(){

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'SoccerDetail_page', 'onInit', '购彩详情','inited','SoccerDetail_init']);

      this.myHeight = $(window).height();

      this.call = this.$route.params.call;

//      var _ticketID = this.$route.params.ticketID;
      var _ticketID = this.$route.params.ticketID;

      this.fullscreenLoading = false;

      if (Base.isNull(_ticketID)) {
        this.$message({
          type: 'error',
          message: '未知错误'
        });
      } else {
        this.ticketID = _ticketID;

        Interface.orderInfo(_ticketID, (data) => {

            this.matchData = data.extendInfo;

            let _tmp = data.returnJSON;

            if (_tmp.lotteryType == 'FT001') {
                this.icons = type2;
              _tmp.lotteryName = '竞足胜平负';
            } else if (_tmp.lotteryType == 'FT002') {
              this.icons = type4;
              _tmp.lotteryName = '竞足比分';
            } else if (_tmp.lotteryType == 'FT003') {
              this.icons = type5;
              _tmp.lotteryName = '竞足总进球';
            } else if (_tmp.lotteryType == 'FT004') {
              this.icons = type6;
              _tmp.lotteryName = '竞足半全场';
            } else if (_tmp.lotteryType == 'FT005') {
              this.icons = type1;
              _tmp.lotteryName = '竞足混合玩法';
            } else if (_tmp.lotteryType == 'FT006') {
              this.icons = type3;
              _tmp.lotteryName = '竞足让球胜平负';
            }

            this.ticket = _tmp;

        })

        Interface.orderTicket(_ticketID, (data) => {
          console.log(data);
          this.matchList = data.returnJSON;
        })

        let _tmp = {}

        _tmp.matchList = JSON.parse(window.sessionStorage.getItem('soccer_ticket'));

        console.log(_tmp)

        return false;

          //判断是否中奖
          //假设_result = '3:2';  比分为3:2
          //假设_result1 = '1:1';  半场比分为3:2
          //假设_lb = -1;  让球数为-1

            let __tmp = _tmp.matchList;

            _tmp.matchList = __tmp.data;

            _tmp.groupts = __tmp.group;

                    let _result = '3:2';
                    let _result1 = '1:1';
                    let _lb = 0;

                    let _count = 0;
                    let _r1 = Number.parseInt(_result.split(':')[0]);
                    let _r2 = Number.parseInt(_result.split(':')[1]);
                    let _r3 = Number.parseInt(_result1.split(':')[0]);
                    let _r4 = Number.parseInt(_result1.split(':')[1]);

                    //渲染是否中奖
                    for(let t=0; t<_tmpArr.length; t++){

                      for(let l=0; l<_tmpArr[t].list.length; l++){
                        let _res = _tmpArr[t].list[l];

                        //胜平负
                        if(_tmpArr[t].type == 'FT001'){

                          if(_res.name == 'v3'){
                            //胜
                            if(_r1 > _r2){
                              _res.isHit = true;
                            }else{
                              _res.isHit = false;
                            }
                          }else if(_res.name == 'v1'){
                            //平
                            if(_r1 == _r2){
                              _res.isHit = true;
                            }else{
                              _res.isHit = false;
                            }
                          }else if(_res.name == 'v0'){
                            //负
                            if(_r1 < _r2){
                              _res.isHit = true;
                            }else{
                              _res.isHit = false;
                            }
                          }

                        }else if(_tmpArr[t].type == 'FT002'){
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
                          if(_hit == _res.name){
                            _res.isHit = true;
                          }else{
                            _res.isHit = false;
                          }
                        }else if(_tmpArr[t].type == 'FT003'){
                          //总进球
                          let _rball = Number.parseInt(_res.name.substring(1));
                          if(_r1 + _r2 == _rball){
                            _res.isHit = true;
                          }else{
                            if(_rball == 7 && _r1 + _r2 > 7){
                              _res.isHit = true;
                            }else{
                              _res.isHit = false;
                            }
                          }
                        }else if(_tmpArr[t].type == 'FT004'){
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

                          if(_hit == _res.name){
                            _res.isHit = true;
                          }else{
                            _res.isHit = false;
                          }

                        }else if(_tmpArr[t].type == 'FT006'){
                          if(_res.name == 'v3'){
                            //胜
                            if(_r1 + _lb > _r2){
                              _res.isHit = true;
                            }else{
                              _res.isHit = false;
                            }
                          }else if(_res.name == 'v1'){
                            //平
                            if(_r1 + _lb == _r2){
                              _res.isHit = true;
                            }else{
                              _res.isHit = false;
                            }
                          }else if(_res.name == 'v0'){
                            //负
                            if(_r1 + _lb < _r2){
                              _res.isHit = true;
                            }else{
                              _res.isHit = false;
                            }
                          }
                        }

                      }

                      _count += _tmpArr[t].list.length;
                    }

                    _tmp.matchList[i].betCount = _count;
                    _tmp.matchList[i].matchs = _tmpArr;

                  }

                  this.ticket = _tmp;


    }

  }


</script>

