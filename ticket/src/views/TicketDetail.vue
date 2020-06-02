<template>
  <div id="ticket_detail_page">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'购买详情'" :back="true"></navTitle>

    <div class="wb100">

      <!--<div class="wb100 h50px relative warpper-red" style="z-index: 99999;">-->
      <!--<div class="w50px h50px fl" @click="myBack">-->
      <!--<div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>-->
      <!--</div>-->
      <!--<p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">方案详情</p>-->
      <!--</div>-->

      <div class="clear"></div>

      <div class="pa15 lh30px">
        <img :src="ticketInfo.icon" class="h30px fl">
        <span class="F16 fl mal10 mar10">{{ticketInfo.title}}</span>
        <span class="Fgray-2 fl F14">第<span class=" Fnum">{{ticket.number}}</span>期</span>
        <div class="clear"></div>
      </div>

      <div class="clear bor-gray bor-solid-1b"></div>

      <div class="pa15 Fgray-3">

        <div class="wb100 F14 lh30px text-center">
          <div class="fl wb33333">
            <p class="Fgray-2">订单金额（元）</p>
            <p class="Fgray-3 Fnum">{{ticket.totalLotMoney}}</p>
          </div>
          <div class="fl wb33333">
            <p class="Fgray-2">订单状态</p>
            <p class="Fblue" v-if="ticket.status == 0">等待出票</p>
            <p class="Fred" v-if="ticket.status == 1">已中奖</p>
            <p class="Fgray-3" v-if="ticket.status == 2">未中奖</p>
            <p class="Fred" v-if="ticket.status == 3">投注失败（已退款）</p>
            <p class="Fblue" v-if="ticket.status == 4">等待开奖</p>
          </div>
          <div class="fl wb33333">
            <p class="Fgray-2">税后奖金（元）</p>
            <p class="Fred Fnum" v-if="ticket.status == 1">{{twoDecimal(ticket.bonusMoney)}}</p>
            <p class="Fgray-3" v-if="ticket.status != 1">— —</p>
          </div>
        </div>
        <div class="clear"></div>
      </div>

      <div class="clear"></div>

      <p class="warpper-gray-3 h40px lh40px pal15 par15 Fgray-3">
        <span class="w100px fl">开奖号码</span>
        <span class="fl" v-if="ticket.status == 0">— —</span>
        <template v-if="ticket.status != 0">
          <span class="Fnum" v-html="formatNum(ticket.bonusCode)"></span>
        </template>
      </p>

      <div class="clear"></div>

      <div class="pa15 lh25px F14 relative">
        <p>
          <span class="w100px fl">投注信息</span>
          <span class="fl Fnum">{{ticket.totalBetNumber}}注{{ticket.lotMulti}}倍</span>
          <span class="Fgray-2 fr F14" @click="switchDetail">
                    <img src="~@/assets/images/arrow-down.png" class="h10px" v-show="showDetail == false">
                    <img src="~@/assets/images/arrow-up.png" class="h10px" v-show="showDetail == true">
                </span>
        </p>

        <div class="wb100" v-show="showDetail">

          <template v-if="ticket.sumFailMoney">
            <div class="warpper-red wb100 text-center h40px lh40px Fwhite absolute" style="top: 50px; left: 0;">
              部分投注失败，已退款<span class="Fnum">{{ticket.sumFailMoney}}</span>元,请至个人中心查收
            </div>
            <div class="clear h40px"></div>
          </template>

          <template v-for="item in ticket.details">
            <div class="clear h10px bor-gray bor-solid-1b"></div>
            <div class="clear h10px"></div>
            <p class="Fgray-3 lh25px">
              <template v-for="item2 in item.nums">

                <template v-if="ticket.type == 2">
                  <template v-if="item.playType==302 || item.playType==305">
                    <span class="fl mal5 Fnum" :class="item2.isHit ? 'Fred' : 'Fgray-3'">{{item2.num}}</span>
                  </template>

                  <template v-else>
                    <template v-for="(item3,key3) in item2">
                      <template v-if="item.playType==313">
                        <span class="fl mal5 Fnum" v-if="key3%2==0" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                        <span class="fl Fnum" v-if="key3%2==1" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                      </template>
                      <template v-if="item.playType==311">
                        <span class="fl mal5 Fnum" v-if="key3%3==0" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                        <span class="fl Fnum" v-else :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                      </template>

                      <template v-if="item.playType==312">
                        <span class="fl mal5 Fnum" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                      </template>

                      <template v-if="item.playType==314">
                        <span class="fl mal5 Fnum" v-if="key3%3==0" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                        <span class="fl Fnum" v-else :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                      </template>

                    </template>
                  </template>

                </template>

                <template v-else>
                  <template v-for="(item3,key3) in item2">
                    <template v-if="ticket.type == 1">
                      <span class="fl mal5 Fnum" v-if="item3.type == 'red2'" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                      <span class="fl mal5 Fnum" v-if="item3.type == 'red'" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                      <span class="fl mal5 Fnum" v-if="item3.type == 'blue'" :class="item3.isHit ? 'Fblue' : 'Fgray-3'">{{item3.num}}</span>
                    </template>
                    <template v-if="ticket.type == 4">
                      <span class="fl mal5 Fnum" v-if="item3.type == 'red2'" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                      <span class="fl mal5 Fnum" v-if="item3.type == 'red'" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                      <span class="fl mal5 Fnum" v-if="item3.type == 'blue2'" :class="item3.isHit ? 'Fblue' : 'Fgray-3'">{{item3.num}}</span>
                      <span class="fl mal5 Fnum" v-if="item3.type == 'blue'" :class="item3.isHit ? 'Fblue' : 'Fgray-3'">{{item3.num}}</span>
                    </template>

                    <template v-if="ticket.type == 3">
                      <span class="fl mal5 Fnum" :class="item3.isHit ? 'Fred' : 'Fgray-3'">{{item3.num}}</span>
                    </template>
                  </template>

                </template>

                <!--<span class="fl mal15 warpper-blue pal10 par10 Fwhite" v-if="item.ticketStatus == 1">等待委托</span>-->
                <!--<span class="fl mal15 warpper-blue pal10 par10 Fwhite" v-if="item.ticketStatus == 2">委托中</span>-->
                <!--<span class="fl mal15 warpper-blue pal10 par10 Fwhite" v-if="item.ticketStatus == 3">出票中</span>-->
                <!--<span class="fl mal15 warpper-red pal10 par10 Fwhite" v-if="item.ticketStatus == 4">委托失败</span>-->
                <!--<span class="fl mal15 warpper-green pal10 par10 Fwhite" v-if="item.ticketStatus == 5">出票成功</span>-->
                <span class="fl mal15 warpper-gray-2 pal10 par10 Fwhite" v-if="item.ticketStatus == 6"><span class="Fnum">{{item.realityLotMulti}}</span>倍出票失败</span>
                <span class="fl mal15 warpper-gray-2 pal10 par10 Fwhite" v-if="item.ticketStatus == 7"><span class="Fnum">{{item.realityLotMulti}}</span>倍出票失败，退款中</span>

                <div class="clear"></div>

              </template>

            </p>

            <div class="clear"></div>
            <p class="F12 Fgray-2 lh20px Fnum">{{item.title}} {{item.betNumber}}注  {{item.realityLotMulti}}倍 </p>
          </template>
          <div class="clear"></div>
        </div>

        <div class="clear"></div>
      </div>

      <div class="clear1 warpper-gray-3"></div>

      <div class="pa15 lh25px h25px F14">

        <router-link :to="{ name: 'TicketRule', params:{ lotteryType: ticket.lotteryType } }">

          <p class="lh25px h25px">
            <span class="w100px fl Fgray-3">中奖如何计算</span>
            <span class="Fgray-2 fr F14" @click="switchRule">
                        <img src="~@/assets/images/arrow-right.png" class="w10px">
                    </span>
          </p>
        </router-link>

        <!--<div class="wb100" v-show="showRule">-->
        <!--<div class="clear"></div>-->
        <!--<ticket-rule :lottery="ticketInfo.type"></ticket-rule>-->
        <!--</div>-->
        <div class="clear"></div>
      </div>

      <div class="clear1 warpper-gray-3"></div>

      <div class="pa15 lh25px F14">

        <p class="Fgray-2 F12">
          <span class="w100px fl">下单时间</span>
          <span class="fl Fnum">{{ticket.createOn}}</span>
        </p>
        <div class="clear"></div>

        <p class="Fgray-2 F12">
          <span class="w100px fl">订单编号</span>
          <span class="fl Fnum">{{ticket.ticketNo}}</span>
        </p>
        <div class="clear"></div>

      </div>

      <div class="clear1 warpper-gray-3"></div>

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

  import Category1 from '../assets/images/category-1.png'
  import Category2 from '../assets/images/category-2.png'
  import Category3 from '../assets/images/category-3.png'
  import Category4 from '../assets/images/category-4.png'
  import Category5 from '../assets/images/category-5.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        showDetail: true,
        showRule: false,
        ticketID: '',
        call: '',
        ticket: {},
        categoryIcons: [Category3, Category1, Category2, Category4, Category5],
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

      toLottery() {
        if (this.ticketInfo.type == 1) {
          this.$router.push({ name: 'LotterySsq', params: { playIndex : 0 } });
        }if (this.ticketInfo.type == 4) {
          this.$router.push({ name: 'LotteryDlt', params: { playIndex : 0 } });
        }if (this.ticketInfo.type == 2) {
          this.$router.push({ name: 'LotteryQ3', params: { playIndex : 0 } });
        }if (this.ticketInfo.type == 3) {
          this.$router.push({ name: 'LotteryD11', params: { playIndex : 0 } });
        }
      },
      switchDetail() {
        this.showDetail = !this.showDetail;
      },
      switchRule() {
        this.showRule = !this.showRule;
      },

      formatNum(_nums) {

        if(Base.isNull(_nums)){
          return '— —';
        }

        if (this.ticket.type == 1 || this.ticket.type == 4) {
          var __i = _nums.indexOf('#');
          var _numReds = _nums.substring(0, __i);
          var _numBlues = _nums.substring(__i + 1);
          _numReds = _numReds.split(',').join(' ');
          _numBlues = _numBlues.split(',').join(' ');

          return '<span class="Fred">' + _numReds + '</span> <span class="Fblue mal10">' + _numBlues + '</span>';
        }

        if (this.ticket.type == 2 || this.ticket.type == 3) {
          var _nums3 = _nums.split(',').join(' ');
          return '<span class="Fred">' + _nums3 + '</span>';
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
      }
    },

    mounted(){

      this.call = this.$route.params.call;

      var _ticketID = this.$route.params.ticketID;

      if (Base.isNull(_ticketID)) {
        this.$message({
          type: 'error',
          message: '未知错误'
        });
      } else {
        this.ticketID = _ticketID;
        Interface.ticketDetails(_ticketID, (data) => {

          if (data) {
            this.ticket = data.returnJSON;

            console.log(this.ticket)

            var _tmp = this.ticket.details;

            var _sumFailMoney = 0;

            let _type = Base.getLotteryType(this.ticket.lotteryType).type;
            let _name = Base.getLotteryType(this.ticket.lotteryType).name;

            this.ticket.name = _name;
            this.ticket.type = _type;

            if (_type == 1) {

              this.ticketInfo = {
                title: _name,
                icon: Category3,
                lotteryType: this.ticket.lotteryType,
                type: 1
              };

//                          var _nums = "01,02,03,04,05,06#07";
              var _nums = this.ticket.bonusCode;

              if(Base.isNull(_nums)){
                _nums = "0,0,0,0,0,0#0";
              }

              for (var i = 0; i < _tmp.length; i++) {

                var _t = _tmp[i];

                var _tickets = _t.anteCodeList;

                var __i = _nums.indexOf('#');
                var _numReds = _nums.substring(0, __i);
                var _numBlues = _nums.substring(__i + 1);
                _numReds = _numReds.split(',');
                _numBlues = _numBlues.split(',');

                _sumFailMoney += _t.failMoney;

                if (_t.playType == '101') {
                  //单式
                  _t.title = '单式';
                }if (_t.playType == '102') {
                  //复式
                  _t.title = '复式';
                }if (_t.playType == '103') {
                  //胆拖
                  _t.title = '胆拖';
                }

                var _tt = [];

                var _i1 = void 0,
                  _r = void 0,
                  _b = void 0,
                  _r2 = [];

                for (var _i = 0; _i < _tickets.length; _i++) {
                  var _numbers = _tickets[_i];

                  if (_t.playType == '103') {
                    //胆拖
                    _i1 = _numbers.indexOf('#');
                    _r = _numbers.substring(0, _i1);

                    var _i2 = _r.indexOf('$');
                    var _r1 = _r.substring(_i2 + 1);
                    _r2 = _r.substring(0, _i2);
                    _b = _numbers.substring(_i1 + 1);

                    _r = _r1.split(',');
                    _r2 = _r2.split(',');
                    _b = _b.split(',');
                  } else {
                    _i1 = _numbers.indexOf('#');
                    _r = _numbers.substring(0, _i1);
                    _b = _numbers.substring(_i1 + 1);
                    _r = _r.split(',');
                    _b = _b.split(',');
                  }

                  var __result = [];

                  if (_r2.length > 0) {
                    __result.push({
                      num: '(',
                      isHit: false,
                      type: 'red2'
                    });

                    for (var j = 0; j < _r2.length; j++) {
                      var _flag = false;
                      for (var k = 0; k < _numReds.length; k++) {
                        if (_r2[j] == _numReds[k]) {
                          _flag = true;
                          break;
                        }
                      }
                      if (_flag) {
                        __result.push({
                          num: _r2[j],
                          isHit: true,
                          type: 'red2'
                        });
                      } else {
                        __result.push({
                          num: _r2[j],
                          isHit: false,
                          type: 'red2'
                        });
                      }
                    }

                    __result.push({
                      num: ')',
                      isHit: false,
                      type: 'red2'
                    });
                  }

                  for (var _j = 0; _j < _r.length; _j++) {
                    var _flag2 = false;
                    for (var _k = 0; _k < _numReds.length; _k++) {
                      if (_r[_j] == _numReds[_k]) {
                        _flag2 = true;
                        break;
                      }
                    }
                    if (_flag2) {
                      __result.push({
                        num: _r[_j],
                        isHit: true,
                        type: 'red'
                      });
                    } else {
                      __result.push({
                        num: _r[_j],
                        isHit: false,
                        type: 'red'
                      });
                    }
                  }

                  __result.push({
                    num: '+',
                    isHit: false,
                    type: 'blue'
                  });

                  for (var _j2 = 0; _j2 < _b.length; _j2++) {
                    var _flag3 = false;
                    for (var _k2 = 0; _k2 < _numBlues.length; _k2++) {
                      if (_b[_j2] == _numBlues[_k2]) {
                        _flag3 = true;
                        break;
                      }
                    }
                    if (_flag3) {
                      __result.push({
                        num: _b[_j2],
                        isHit: true,
                        type: 'blue'
                      });
                    } else {
                      __result.push({
                        num: _b[_j2],
                        isHit: false,
                        type: 'blue'
                      });
                    }
                  }
                  _tt.push(__result);
                }

                _t.nums = _tt;

//                                console.log(_tt);
              }
            }

            else if (_type == 4) {

              this.ticketInfo = {
                title: _name,
                icon: Category4,
                lotteryType: this.ticket.lotteryType,
                type: 4
              };

//                          var _nums2 = "01,02,03,04,05#06,07";
              var _nums2 = this.ticket.bonusCode;

//                            console.log(_nums2);

              if(Base.isNull(_nums2)){
                _nums2 = "0,0,0,0,0#0,0";
              }

              for (var _i3 = 0; _i3 < _tmp.length; _i3++) {

                var _t4 = _tmp[_i3];

                var _tickets2 = _t4.anteCodeList;

                var _i4 = _nums2.indexOf('#');
                var _numReds2 = _nums2.substring(0, _i4);
                var _numBlues2 = _nums2.substring(_i4 + 1);
                _numReds2 = _numReds2.split(',');
                _numBlues2 = _numBlues2.split(',');

                _sumFailMoney += _t4.failMoney;

//                                console.log(_t4);

                if (_t4.playType == '101') {
                  //单式
                  _t4.title = '单式';
                }if (_t4.playType == '102') {
                  //复式
                  _t4.title = '复式';
                }if (_t4.playType == '106') {
                  //胆拖
                  _t4.title = '胆拖';
                }
                if (_t4.playType == '103') {
                  //单式
                  _t4.title = '追加单式';
                }if (_t4.playType == '104') {
                  //复式
                  _t4.title = '追加复式';
                }if (_t4.playType == '107') {
                  //胆拖
                  _t4.title = '追加胆拖';
                }

                var _tt3 = [];

                var _i5 = void 0,
                  _r3 = void 0,
                  _r4 = [],
                  _b3 = void 0,
                  _b2 = [];

                for (var _i6 = 0; _i6 < _tickets2.length; _i6++) {
                  var _numbers2 = _tickets2[_i6];

                  if (_t4.playType == '106' || _t4.playType == '107') {
                    //胆拖
                    _i5 = _numbers2.indexOf('#');

                    var _tmp1 = _numbers2.substring(0, _i5);
                    var _tmp2 = _numbers2.substring(_i5 + 1);

                    _r3 = _tmp1.split('$')[1];
                    _r4 = _tmp1.split('$')[0];

                    _b3 = _tmp2.split('$')[1];
                    _b2 = _tmp2.split('$')[0];

                    _r3 = _r3.split(',');
                    _r4 = _r4.split(',');
                    _b3 = _b3.split(',');
                    _b2 = _b2.split(',');
                  } else {
                    _i5 = _numbers2.indexOf('#');
                    _r3 = _numbers2.substring(0, _i5);
                    _b3 = _numbers2.substring(_i5 + 1);
                    _r3 = _r3.split(',');
                    _b3 = _b3.split(',');
                  }

//                                    console.log(_b3)
//                                    console.log(_b2)

                  var _result = [];

                  if (_r4.length > 0) {
                    _result.push({
                      num: '(',
                      isHit: false,
                      type: 'red2'
                    });

                    for (var _j3 = 0; _j3 < _r4.length; _j3++) {
                      var _flag4 = false;
                      for (var _k3 = 0; _k3 < _numReds2.length; _k3++) {
                        if (_r4[_j3] == _numReds2[_k3]) {
                          _flag4 = true;
                          break;
                        }
                      }
                      if (_flag4) {
                        _result.push({
                          num: _r4[_j3],
                          isHit: true,
                          type: 'red2'
                        });
                      } else {
                        _result.push({
                          num: _r4[_j3],
                          isHit: false,
                          type: 'red2'
                        });
                      }
                    }

                    _result.push({
                      num: ')',
                      isHit: false,
                      type: 'red2'
                    });
                  }

                  for (var _j4 = 0; _j4 < _r3.length; _j4++) {
                    var _flag5 = false;
                    for (var _k4 = 0; _k4 < _numReds2.length; _k4++) {
                      if (_r3[_j4] == _numReds2[_k4]) {
                        _flag5 = true;
                        break;
                      }
                    }
                    if (_flag5) {
                      _result.push({
                        num: _r3[_j4],
                        isHit: true,
                        type: 'red'
                      });
                    } else {
                      _result.push({
                        num: _r3[_j4],
                        isHit: false,
                        type: 'red'
                      });
                    }
                  }

                  _result.push({
                    num: '+',
                    isHit: false,
                    type: 'blue'
                  });

                  if (_b2.length > 0) {
                    _result.push({
                      num: '(',
                      isHit: false,
                      type: 'blue2'
                    });

                    for (var _j5 = 0; _j5 < _b2.length; _j5++) {
                      var _flag6 = false;
                      for (var _k5 = 0; _k5 < _numReds2.length; _k5++) {
                        if (_b2[_j5] == _numBlues2[_k5]) {
                          _flag6 = true;
                          break;
                        }
                      }
                      if (_flag6) {
                        _result.push({
                          num: _b2[_j5],
                          isHit: true,
                          type: 'blue2'
                        });
                      } else {
                        _result.push({
                          num: _b2[_j5],
                          isHit: false,
                          type: 'blue2'
                        });
                      }
                    }

                    _result.push({
                      num: ')',
                      isHit: false,
                      type: 'blue2'
                    });
                  }

                  for (var _j6 = 0; _j6 < _b3.length; _j6++) {
                    var _flag7 = false;
                    for (var _k6 = 0; _k6 < _numBlues2.length; _k6++) {
                      if (_b3[_j6] == _numBlues2[_k6]) {
                        _flag7 = true;
                        break;
                      }
                    }
                    if (_flag7) {
                      _result.push({
                        num: _b3[_j6],
                        isHit: true,
                        type: 'blue'
                      });
                    } else {
                      _result.push({
                        num: _b3[_j6],
                        isHit: false,
                        type: 'blue'
                      });
                    }
                  }


//                                    console.log(_result);

                  _tt3.push(_result);
                }

                _t4.nums = _tt3;

//                                console.log(_tt3);
              }
            }

            else if (_type == 2) {
              this.ticketInfo = {
                title: _name,
                icon: Category1,
                lotteryType: this.ticket.lotteryType,
                type: 2
              };

//                            var _nums3 = "1,2,3";
              var _nums3 = this.ticket.bonusCode;

              if(Base.isNull(_nums3)){
                _nums3 = "0,-1,-1";
              }

              var _sum = 0;

              _nums3 = _nums3.split(',');

              for (var _i7 = 0; _i7 < _nums3.length; _i7++) {
                _sum += parseInt(_nums3[_i7]);
              }

              for (var _i8 = 0; _i8 < _tmp.length; _i8++) {

                var _t5 = _tmp[_i8];
                var _tt4 = [];
                var _tickets3 = _t5.anteCodeList;

                _sumFailMoney += _t5.failMoney;

                if (_t5.playType == '302') {
                  //三同号通选
                  _t5.title = '三同号通选';
                  var _flag8 = true;
                  if (_nums3[0] == _nums3[1] == _nums3[2]) {
                    _flag8 = true;
                  } else {
                    _flag8 = false;
                  }
                  if (_flag8) {
                    _tt4.push({
                      num: '三同号通选',
                      isHit: true
                    });
                  } else {
                    _tt4.push({
                      num: '三同号通选',
                      isHit: false
                    });
                  }
                  _t5.nums = _tt4;
                }
                if (_t5.playType == '305') {
                  //三同号通选
                  _t5.title = '三连号通选';
                  var _flag9 = true;
                  if (_nums3[0] == _nums3[1] - 1 && _nums3[1] == _nums3[2] - 1) {
                    _flag9 = true;
                  } else {
                    _flag9 = false;
                  }
                  if (_flag9) {
                    _tt4.push({
                      num: '三连号通选',
                      isHit: true
                    });
                  } else {
                    _tt4.push({
                      num: '三连号通选',
                      isHit: false
                    });
                  }
                  _t5.nums = _tt4;
                }
                if (_t5.playType == '311') {
                  //单式投注
                  _t5.title = '单式';

                  var _result2 = [];

                  for (var _j7 = 0; _j7 < _tickets3.length; _j7++) {
                    var _tmp3 = _tickets3[_j7].split(',');

                    //判断类型

                    var _type = 0;

                    if (_tmp3[0] == _tmp3[1] == _tmp3[2]) {
                      //三同号
                      _type = 0;
                    } else if (_tmp3[0] == _tmp3[1]) {
                      //二同号
                      _type = 1;
                    } else {
                      //三不同号
                      _type = 2;
                    }

                    var ___result = [];
                    var _flag10 = true;

                    for (var _k7 = 0; _k7 < _tmp3.length; _k7++) {

                      if (parseInt(_tmp3[_k7]) == _nums3[_k7]) {
                        ___result.push({
                          num: _tmp3[_k7],
                          isHit: true
                        });
                      } else {
                        ___result.push({
                          num: _tmp3[_k7],
                          isHit: false
                        });
                      }

                    }

                    _result2.push(___result);
                  }

                  _t5.nums = _result2;
                }
                if (_t5.playType == '312') {
                  //和值投注
                  _t5.title = '和值';
                  for (var _i9 = 0; _i9 < _tickets3.length; _i9++) {
                    var _numbers3 = _tickets3[_i9].split(',');
                    var _result3 = [];
                    for (var _j8 = 0; _j8 < _numbers3.length; _j8++) {
                      if (parseInt(_numbers3[_j8]) == _sum) {
                        _result3.push({
                          num: _numbers3[_j8],
                          isHit: true
                        });
                      } else {
                        _result3.push({
                          num: _numbers3[_j8],
                          isHit: false
                        });
                      }
                    }
                    _tt4.push(_result3);
                    //
                  }
                  _t5.nums = _tt4;
                }

                if (_t5.playType == '313') {
                  //二不同号
                  _t5.title = '二不同号';

                  var _result4 = [];

                  for (var _i10 = 0; _i10 < _tickets3.length; _i10++) {

                    var _tmp4 = _tickets3[_i10].split(',');

                    for (var _j9 = 0; _j9 < _tmp4.length; _j9++) {
                      var _tmp5 = _tmp4[_j9].split('');

                      var _result5 = [];

                      for (var _k8 = 0; _k8 < _tmp5.length; _k8++) {

                        var _flag11 = true;

                        for (var n = 0; n < _nums3.length; n++) {
                          if (_tmp5[_k8] == _nums3[n]) {
                            _flag11 = true;
                            break;
                          } else {
                            _flag11 = false;
                          }
                        }
                        if (_flag11) {
                          _result5.push({
                            num: _tmp5[_k8],
                            isHit: true
                          });
                        } else {
                          _result5.push({
                            num: _tmp5[_k8],
                            isHit: false
                          });
                        }
                      }

                      _result4.push(_result5);
                    }
                  }

                  _t5.nums = _result4;

//                                    console.log(_t5);
                }
                if (_t5.playType == '314') {
                  //二同号
                  _t5.title = '二同号';

                  for (var _i11 = 0; _i11 < _tickets3.length; _i11++) {
                    var _numbers4 = '';
                    var _result6 = [];
                    if (_tickets3[_i11] == 1) {
                      _numbers4 = ['1', '1', '*'];
                    }if (_tickets3[_i11] == 2) {
                      _numbers4 = ['2', '2', '*'];
                    }if (_tickets3[_i11] == 3) {
                      _numbers4 = ['3', '3', '*'];
                    }if (_tickets3[_i11] == 4) {
                      _numbers4 = ['4', '4', '*'];
                    }if (_tickets3[_i11] == 5) {
                      _numbers4 = ['5', '5', '*'];
                    }if (_tickets3[_i11] == 6) {
                      _numbers4 = ['6', '6', '*'];
                    }
                    for (var _j10 = 0; _j10 < _numbers4.length; _j10++) {
                      if (parseInt(_numbers4[_j10]) == _nums3[_j10]) {
                        _result6.push({
                          num: _numbers4[_j10],
                          isHit: true
                        });
                      } else {
                        _result6.push({
                          num: _numbers4[_j10],
                          isHit: false
                        });
                      }
                    }
                    _tt4.push(_result6);
                  }
                  _t5.nums = _tt4;
//                                    console.log(_t5);
                }
              }

            }

            if (_type == 3) {
              this.ticketInfo = {
                title: _name,
                icon: Category2,
                lotteryType: this.ticket.lotteryType,
                type: 3
              };

//                            var _nums4 = "1,2,3,4,5";
              var _nums4 = this.ticket.bonusCode;

              if(Base.isNull(_nums4)){
                _nums4 = "0,0,0,0,0";
              }

              _nums4 = _nums4.split(',');

              for (var _i12 = 0; _i12 < _tmp.length; _i12++) {

                var _t6 = _tmp[_i12];

                var _tickets4 = _t6.anteCodeList;

                var _tt5 = [];

                _sumFailMoney += _t6.failMoney;

                if ( _t6.playType == 1 || _t6.playType == 9 || _t6.playType == 10) {

                  var _numbers5 = [];
                  var _i13 = 0;
                  var _i14 = 0;
                  var _t1 = '';
                  var _t2 = '';
                  var _t3 = '';
                  _t1 = _t1.split(",");
                  _t2 = _t2.split(",");

                  if (_t6.playType == 1) {
                    _t6.title = '前1';
                  }if (_t6.playType == 9) {
                    _t6.title = '前二直选';
                  }if (_t6.playType == 10) {
                    _t6.title = '前三直选';
                  }if (_t6.playType == 11) {
                    _t6.title = '前二组选';
                  }if (_t6.playType == 12) {
                    _t6.title = '前三组选';
                  }

                  for (var _i15 = 0; _i15 < _tickets4.length; _i15++) {

                    var _result7 = [];

                    _numbers5 = _tickets4[_i15];

//                                        console.log(_tickets4[_i15]);

                    if (_t6.playType == 1) {
                      //前1
                      _t1 = _numbers5.split(',');

                      for (var _j20 = 0; _j20 < _t1.length; _j20++) {
                        if (parseInt(_t1[_j20]) == _nums4[0]) {
                          _result7.push({
                            num: _t1[_j20],
                            isHit: true
                          });
                        } else {
                          _result7.push({
                            num: _t1[_j20],
                            isHit: false
                          });
                        }
                      }

                    }
                    if (_t6.playType == 9) {
                      //前二直选
                      _i13 = _numbers5.indexOf('|');
                      _t1 = _numbers5.substring(0, _i13);
                      _t2 = _numbers5.substring(_i13 + 1);
                      _t1 = _t1.split(",");
                      _t2 = _t2.split(",");

                      for (var _j21 = 0; _j21 < _t1.length; _j21++) {
                        if (parseInt(_t1[_j21]) == _nums4[0]) {
                          _result7.push({
                            num: _t1[_j21],
                            isHit: true
                          });
                        } else {
                          _result7.push({
                            num: _t1[_j21],
                            isHit: false
                          });
                        }
                      }

                      _result7.push({
                        num: ' | ',
                        isHit: false
                      });

                      for (var _j22 = 0; _j22 < _t2.length; _j22++) {
                        if (parseInt(_t2[_j22]) == _nums4[1]) {
                          _result7.push({
                            num: _t2[_j22],
                            isHit: true
                          });
                        } else {
                          _result7.push({
                            num: _t2[_j22],
                            isHit: false
                          });
                        }
                      }

                    }
                    if (_t6.playType == 10) {
                      //前三直选
                      _i13 = _numbers5.indexOf('|');
                      _t1 = _numbers5.substring(0, _i13);
                      var _tt2 = _numbers5.substring(_i13 + 1);
                      _i14 = _tt2.indexOf('|');
                      _t2 = _tt2.substring(0, _i14);
                      _t3 = _tt2.substring(_i14 + 1);

                      _t1 = _t1.split(",");
                      _t2 = _t2.split(",");
                      _t3 = _t3.split(",");


                      for (var _j23 = 0; _j23 < _t1.length; _j23++) {
                        if (parseInt(_t1[_j23]) == _nums4[0]) {
                          _result7.push({
                            num: _t1[_j23],
                            isHit: true
                          });
                        } else {
                          _result7.push({
                            num: _t1[_j23],
                            isHit: false
                          });
                        }
                      }

                      _result7.push({
                        num: ' | ',
                        isHit: false
                      });

                      for (var _j24 = 0; _j24 < _t2.length; _j24++) {
                        if (parseInt(_t2[_j24]) == _nums4[1]) {
                          _result7.push({
                            num: _t2[_j24],
                            isHit: true
                          });
                        } else {
                          _result7.push({
                            num: _t2[_j24],
                            isHit: false
                          });
                        }
                      }

                      _result7.push({
                        num: ' | ',
                        isHit: false
                      });

                      for (var _j25 = 0; _j25 < _t3.length; _j25++) {
                        if (parseInt(_t3[_j25]) == _nums4[2]) {
                          _result7.push({
                            num: _t3[_j25],
                            isHit: true
                          });
                        } else {
                          _result7.push({
                            num: _t3[_j25],
                            isHit: false
                          });
                        }
                      }

                    }


                    _tt5.push(_result7);
                    //
                  }
                } else {
                  //任选
                  if (_t6.playType == 2) {
                    _t6.title = '任选二';
                  }if (_t6.playType == 3) {
                    _t6.title = '任选三';
                  }if (_t6.playType == 4) {
                    _t6.title = '任选四';
                  }if (_t6.playType == 5) {
                    _t6.title = '任选五';
                  }if (_t6.playType == 6) {
                    _t6.title = '任选六';
                  }if (_t6.playType == 7) {
                    _t6.title = '任选七';
                  }if (_t6.playType == 8) {
                    _t6.title = '任选八';
                  }if (_t6.playType == 11) {
                    _t6.title = '前二组选';
                  }if (_t6.playType == 12) {
                    _t6.title = '前三组选';
                  }


                  for (var _i16 = 0; _i16 < _tickets4.length; _i16++) {
                    var _numbers6 = _tickets4[_i16].split(',');

                    var _result8 = [];

                    for (var _j14 = 0; _j14 < _numbers6.length; _j14++) {
                      var _flag15 = false;
                      for (var _k12 = 0; _k12 < _nums4.length; _k12++) {

                        if (_t6.playType == 11) {
                          //前二组选
                          if(_k12>=2){
                            _flag15 = false;
                            continue;
                          }
                        }
                        if (_t6.playType == 11) {
                          //前三组选
                          if(_k12>=3){
                            _flag15 = false;
                            continue;
                          }
                        }

                        if (parseInt(_numbers6[_j14]) == _nums4[_k12]) {
                          _flag15 = true;
                          break;
                        }
                      }
                      if (_flag15) {
                        _result8.push({
                          num: _numbers6[_j14],
                          isHit: true
                        });
                      } else {
                        _result8.push({
                          num: _numbers6[_j14],
                          isHit: false
                        });
                      }
                    }

                    _tt5.push(_result8);
                    //
                  }
                }

                _t6.nums = _tt5;

//                                console.log(_tmp[_i12]);
              }
            }


            this.ticket.sumFailMoney = _sumFailMoney;
          }
        });
      }

      this.fullscreenLoading = false;

    }

  }


</script>

