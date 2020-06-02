<template>
  <div id="lotter_ssq_page">

    <loader :show="fullscreenLoading"></loader>

    <div class="wb100">

      <div class="h50px lh50px warpper-white relative wb100" style="z-index: 99">
        <!--<a href="index.html">-->
        <!--<div class="w50px h50px fl absolute">-->
        <!--<div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 2px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>-->
        <!--</div>-->
        <!--</a>-->

        <p class="text-center Fred" @click="showDuplex = !showDuplex; showMore = false" v-if="duplex == true">双色球-胆拖 <img src="~@/assets/images/arrow-down-red.png" class="h8px"> </p>
        <p class="text-center Fred" @click="showDuplex = !showDuplex; showMore = false" v-else>双色球-普通 <img src="~@/assets/images/arrow-down-red.png" class="h8px"> </p>

        <div class="h50px w50px absolute" style="top:0; right: 0;" v-show="showDuplex == false">
          <img src="~@/assets/images/icon-more.png" class="fr h6px" style="margin-top: 22px; margin-right: 15px;" v-show="showMore == false" @click="showMore = true">
          <img src="~@/assets/images/icon-more2.png" class="fr w6px" style="margin-top: 11px; margin-right: 26px;" v-show="showMore == true" @click="showMore = false">
        </div>
      </div>

      <div class="w90px h80px pat10 lh40px text-center fr absolute F14" v-show="showMore == true" :style="'background: url('+ bgMore +'); background-size: 100% 100%; top:50px; right: 10px; z-index: 99;'">

        <router-link :to="{ name: 'NoticeMore', query:{ lotteryType: lottery_type, call: true } }">
          <p class="bor-gray4 bor-solid-1b Fwhite">开奖</p>
        </router-link>
        <router-link :to="{ name: 'TicketRule', params:{ lotteryType: 'ssq'} }">
          <p class="Fwhite">规则</p>
        </router-link>
      </div>

      <div class="dialogBg" @click="showDuplex = false" v-show="showDuplex == true"></div>
      <div class="wb100 text-center warpper-white" v-show="showDuplex == true" style="position: fixed; z-index: 99;">
        <div class="pal15 par15 pat15 F14 bor-gray bor-solid-1t">
          <el-row :gutter="15">
            <el-col :span="12">
              <div class="wb100 h35px lh35px radius5" @click="empty();showDuplex = false; duplex = false;" :class="duplex == false ? 'warpper-red Fwhite pa1' : 'bor-gray bor-solid-1a Fgray-3'">
                双色球-普通
              </div>
            </el-col>
            <el-col :span="12">

              <div class="wb100 h35px lh35px radius5" @click="empty();showDuplex = false; duplex = true;" :class="duplex == true ? 'warpper-red Fwhite pa1' : 'bor-gray bor-solid-1a Fgray-3'">
                双色球-胆拖
              </div>
            </el-col>
          </el-row>
          <div class="clear1"></div>
        </div>
      </div>
      <div class="clear"></div>

      <div class="warpper-gray-3 wb100 h40px bor-solid-1t bor-solid-1b bor-gray" >

        <div class="h40px lh40px pal15 par15">

          <div class="fl bor-red bor-solid-3l pal5 F14 Fgray-3 h20px mat10"></div><span class="F14 Fgray-3">第<span class="Fnum">{{current.number}}</span>期</span>

          <span class="Fgray-2 fr F14" @click="switchHistory">
            <span class="Fnum">{{current.stopTime}}</span> 截止
                    <img src="~@/assets/images/arrow-down.png" class="w15px" v-show="showHistory == false">
                    <img src="~@/assets/images/arrow-up.png" class="w15px" v-show="showHistory == true">
                </span>
        </div>
      </div>

      <!--<div class="clear1"></div>-->

      <el-collapse-transition>
        <div v-show="showHistory">
          <template v-for="(item,key) in history">
            <p class="lh35px h35px F14 par15 relative Fred text-center" :class="key%2 == 0 ? 'warpper-white' : 'warpper-gray-3'" style="padding-left: 23px;">
                        <span class="fl Fgray-3 mar30">
                          第<span class="Fnum">{{item.number}}</span>期
                        </span>
              <template v-if="item.redBall">
                <span class="fl Fred Fnum">{{item.redBall}}</span>
                <span class="Fblue mal20 fl Fnum">{{item.blueBall}}</span>
              </template>
              <template v-else>
                <div class="fl radius50per warpper-red F14 Fwhite" style=" width: 19px; height: 19px; line-height: 19px; margin-top: 8px; margin-right: 2px;" v-for="item in [1,2,3,4,5,6]">?</div>
                <div class="fl radius50per warpper-blue F14 Fwhite mal15" style=" width: 19px; height: 19px; line-height: 19px; margin-top: 8px; ">?</div>
              </template>
            </p>
            <div class="clear"></div>
          </template>
          <div class="clear1 bor-gray bor-solid-1b"></div>
        </div>
      </el-collapse-transition>


      <template v-if="!duplex">
        <p class="lh50px h50px Fgray-2 F14 pal15 par15">
          请至少选择6个红球1个蓝球
        </p>

        <div class="pal15 Fnum">
          <template v-for="(item,key) in redBall">
            <div class="radius50per text-center fl mar10 mab10 F16" @click="selectBall(key,'red')" :class="item.value == true ? 'warpper-red Fwhite pa1' : 'bor-solid-1a bor-gray2 Fred'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
              {{item.num}}
            </div>
          </template>
        </div>

        <div class="clear1"></div>

        <div class="pal15 Fnum">
          <template v-for="(item,key) in blueBall">
            <div class="radius50per text-center fl mar10 mab10 F16" @click="selectBall(key,'blue')" :class="item.value == true ? 'warpper-blue Fwhite pa1' : 'bor-solid-1a bor-gray2 Fblue'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
              {{item.num}}
            </div>
          </template>
        </div>
      </template>

      <template v-else>
        <p class="lh50px h50px Fgray-2 F14 pal15 par15">
          <span class="Fred fl mar10">红球胆码</span>
          <span class="Fgray-2 fl">选择您认为必出的红球（1~5个）</span>
        </p>

        <div class="pal15 Fnum">
          <template v-for="(item,key) in duplexRedBall1">
            <div v-if="item.disable == true" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'" class="radius50per warpper-gray-2 pa1 Fwhite text-center fl mar10 mab10 F16">
              {{item.num}}
            </div>
            <div v-else class="radius50per text-center fl mar10 mab10 F16" @click="selectDuplexBall(key,'red1')" :class="item.value == true ? 'warpper-red Fwhite pa1' : 'bor-solid-1a bor-gray2 Fred'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
              {{item.num}}
            </div>
          </template>
        </div>

        <div class="clear"></div>

        <p class="lh40px h40px Fgray-2 F14 pal15 par15">
          <span class="Fred fl mar10">红球拖码</span>
          <span class="Fgray-2 fl">选择您认为可能出的红球（2~16个）</span>
        </p>

        <div class="clear1"></div>

        <div class="pal15 Fnum">
          <template v-for="(item,key) in duplexRedBall2">

            <div v-if="item.disable == true" class="radius50per warpper-gray-2 pa1 Fwhite text-center fl mar10 mab10 F16" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
              {{item.num}}
            </div>

            <div v-else class="radius50per text-center fl mar10 mab10 F16" @click="selectDuplexBall(key,'red2')" :class="item.value == true ? 'warpper-red Fwhite pa1' : 'bor-solid-1a bor-gray2 Fred'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
              {{item.num}}
            </div>
          </template>
        </div>

        <div class="clear"></div>

        <p class="lh40px h40px F14 pal15 par15 Fblue">
          蓝球区 （1~16个）
        </p>

        <div class="clear1"></div>

        <div class="pal15 Fnum">
          <template v-for="(item,key) in duplexBlueBall">
            <div class="radius50per text-center fl mar10 mab10 F16" @click="selectDuplexBall(key,'blue')" :class="item.value == true ? 'warpper-blue Fwhite pa1' : 'bor-solid-1a bor-gray2 Fblue'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
              {{item.num}}
            </div>
          </template>
        </div>

      </template>

      <div class="clear h65px"></div>

      <div class="wb100 bor-gray bor-solid-1t fixed warpper-white relative h60px" style="bottom: 0;">
        <div class="pat10 pab10">

          <div class="w25px text-center absolute" @click="clearSelect" style="left: 15px; top: 10px;">

            <div class="h25px img-Harea center">
              <img src="~@/assets/images/icon-clear.png">
            </div>

            <div class=" bor-gray bor-solid-1l h50px absolute " style="margin-top: -30px;margin-left: 32px"></div>

            <p class="Fgray-2 F12 h25px lh25px text-center">清空</p>
          </div>

          <div class="w25px text-center absolute" style="left: 55px; top: 10px;" @click="randomSelect" v-if="duplex == false">

            <div class="h25px img-Harea center">
              <img src="~@/assets/images/random.png">
            </div>
            <p class="Fgray-2 F12 h25px lh25px text-center ">机选</p>
          </div>

          <div class="w80px text-center radius5 h40px lh40px absolute" style="top: 10px; right: 15px;" :class="lock == true ? 'warpper-gray-2 Fwhite' : 'warpper-red Fwhite'"  @click="buyTicket">
            确定
          </div>

          <div class="w200px center">

            <p class="lh40px text-center">
              <span class="Fred Fnum">{{number}}</span>注
              <span class="Fred Fnum">{{number * 2}}</span>元
            </p>

          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'
  import Bg from '../../assets/images/bg-more.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        bgMore: Bg,
        _width: 0,
        _height: 0,
        nav: ['投注', '开奖', '规则'],
        currentNav: 0,
        current: {
          number: '',
          endTime: ''
        },
        ticketID: '',
        number: 0,
        lock: true,
        duplex: false,
        showHistory: false,
        showDuplex: false,
        showMore: false,
        history: [],
        redBall: [],
        blueBall: [],
        duplexRedBall1: [],
        duplexRedBall2: [],
        duplexBlueBall: [],
        lottery_type: 'ssq',
        playIndex: 0,
        notices: [],
        loading: true,
        width: 0,
        _width2: 0,
        height: 0,
        width_ball: 0,
        width_ball2: 0
      }
    },

    methods: {
      getData() {

//                _this.width = $(window).width();
//                _this.height = $(window).height();
//                _this._width = parseInt($(window).width());
//                _this._width2 = parseInt($(window).width());
//                _this._height = parseInt((_this._width + 30) * 160 / 375);
//
//                _this.width_ball2 = Math.floor((_this.width - 7 * 12 - 45) / 7);

        // console.log('getData');

        Interface.openAwardListByLotteryType(this.lottery_type, 1, 10, (data) => {
          if (data) {

            var _tmp = data.returnJSON.indexData;

            // console.log(_tmp);

            for (var i = 0; i < _tmp.length; i++) {

              if(Base.isNull(_tmp[i].bonusCode)){
                continue;
              }

              //双色球
              var _bonus = _tmp[i].bonusCode;
              var reds = _bonus.split('#')[0].split(',');
              var blue = _bonus.split('#')[1];

              var _balls = [];

              for (var _i = 0; _i < reds.length; _i++) {
                _balls.push({
                  type: 'red',
                  num: reds[_i]
                });
              }
              _balls.push({
                type: 'blue',
                num: blue
              });

              _tmp[i].balls = _balls;


            }

            this.loading = false;

            this.notices = _tmp;
          }
        });
      },

      selectBall(i, type) {

        if (type == 'red') {
          this.redBall[i].value = !this.redBall[i].value;
        }
        if (type == 'blue') {
          this.blueBall[i].value = !this.blueBall[i].value;
        }

        this.calculate();
      },
      calculate() {

        var result = 0;

        if (this.duplex == false) {
          //普通
          var _r = 0;
          var _b = 0;

          for (var i = 0; i < this.redBall.length; i++) {
            var _ball = this.redBall[i];
            if (_ball.value == true) {
              _r++;
            }
          }

          for (var _i5 = 0; _i5 < this.blueBall.length; _i5++) {
            var _ball2 = this.blueBall[_i5];
            if (_ball2.value == true) {
              _b++;
            }
          }

          if (_r > 5 && _b > 0) {
            result = _b * Base.factorial(_r) / (Base.factorial(6) * Base.factorial(_r - 6));
          }
        } else {
          var _r1 = 0; //红球胆码
          var _r2 = 0; //红球拖码
          var _b3 = 0; //蓝球

          for (var _i6 = 0; _i6 < this.duplexRedBall1.length; _i6++) {
            var _ball3 = this.duplexRedBall1[_i6];
            if (_ball3.value == true) {
              _r1++;
            }
          }

          for (var _i7 = 0; _i7 < this.duplexRedBall2.length; _i7++) {
            var _ball4 = this.duplexRedBall2[_i7];
            if (_ball4.value == true) {
              _r2++;
            }
          }

          for (var _i8 = 0; _i8 < this.duplexBlueBall.length; _i8++) {
            var _ball5 = this.duplexBlueBall[_i8];
            if (_ball5.value == true) {
              _b3++;
            }
          }

          if (_r1 > 0 && _r1 < 6 && _r1 + _r2 > 5 && _b3 > 0) {
            result = _b3 * Base.factorial(_r2) / (Base.factorial(6 - _r1) * Base.factorial(_r2 - (6 - _r1)));
          }
        }

        this.number = Math.ceil(result);

        if(this.duplex){
          if (this.number > 1) {
            this.lock = false;
          } else {
            this.lock = true;
          }
        }else{
          if (this.number > 0) {
            this.lock = false;
          } else {
            this.lock = true;
          }
        }

        return this.number;
      },
      selectDuplexBall(key, type) {

        if (type == 'red1') {
          this.duplexRedBall1[key].value = !this.duplexRedBall1[key].value;
          this.duplexRedBall2[key].disable = !this.duplexRedBall2[key].disable;
        }
        if (type == 'red2') {
          this.duplexRedBall2[key].value = !this.duplexRedBall2[key].value;
          this.duplexRedBall1[key].disable = !this.duplexRedBall1[key].disable;
        }

        if (type == 'blue') {
          this.duplexBlueBall[key].value = !this.duplexBlueBall[key].value;
        }

        this.calculate();

        var _r1 = 0;
        var _r2 = 0;
        var _b = 0;

        for (var i = 0; i < this.duplexRedBall1.length; i++) {
          var _ball = this.duplexRedBall1[i];
          if (_ball.value == true) {
            _r1++;
          }
        }

        for (var _i9 = 0; _i9 < this.duplexRedBall2.length; _i9++) {
          var _ball6 = this.duplexRedBall2[_i9];
          if (_ball6.value == true) {
            _r2++;
          }
        }

        for (var _i10 = 0; _i10 < this.duplexBlueBall.length; _i10++) {
          var _ball7 = this.duplexBlueBall[_i10];
          if (_ball7.value == true) {
            _b++;
          }
        }

        if (_r1 > 5) {
          this.$message({
            type: 'error',
            message: '\u6700\u591A\u53EA\u80FD\u9009\u62E95\u4E2A\u7EA2\u7403\u80C6\u7801'
          });
          this.duplexRedBall1[key].value = !this.duplexRedBall1[key].value;
          this.duplexRedBall2[key].disable = !this.duplexRedBall2[key].disable;
        }

        if (_r2 > 16) {
          this.$message({
            type: 'error',
            message: '\u6700\u591A\u53EA\u80FD\u9009\u62E916\u4E2A\u7EA2\u7403\u62D6\u7801'
          });
          this.duplexRedBall2[key].value = !this.duplexRedBall2[key].value;
          this.duplexRedBall1[key].disable = !this.duplexRedBall1[key].disable;
        }
      },
      buyTicket() {

        if(this.isEmpty == true){
          this.$message({
            type: 'error',
            message: '此彩种暂停销售'
          });
          return false;
        }

        if (this.lock) return false;

        this.lock = true;

        var _result = '';

        //整合数组
        var _r = [];
        var _r1 = [];
        var _r2 = [];
        var _b = [];
        var _b2 = [];

        if (this.duplex == true) {
          //胆拖

          for (var i = 0; i < this.duplexRedBall1.length; i++) {
            var _ball = this.duplexRedBall1[i];
            if (_ball.value == true) {
              _r1.push(_ball.num);
            }
          }

          for (var _i11 = 0; _i11 < this.duplexRedBall2.length; _i11++) {
            var _ball8 = this.duplexRedBall2[_i11];
            if (_ball8.value == true) {
              _r2.push(_ball8.num);
            }
          }

          for (var _i12 = 0; _i12 < this.duplexBlueBall.length; _i12++) {
            var _ball9 = this.duplexBlueBall[_i12];
            if (_ball9.value == true) {
              _b.push(_ball9.num);
            }
          }

          _result = _r1.join(",") + '$' + _r2.join(",") + '#' + _b.join(",");
        } else {
          //普通

          for (var _i13 = 0; _i13 < this.redBall.length; _i13++) {
            var _ball10 = this.redBall[_i13];
            if (_ball10.value == true) {
              _r.push(_ball10.num);
            }
          }

          for (var _i14 = 0; _i14 < this.blueBall.length; _i14++) {
            var _ball11 = this.blueBall[_i14];
            if (_ball11.value == true) {
              _b2.push(_ball11.num);
            }
          }

          _result = _r.join(",") + '#' + _b2.join(",");
        }

        //加入session的购票中

        if (_result.length < 20) {
          //格式错误
          this.$message({
            type: 'error',
            message: '\u8BF7\u81F3\u5C11\u9009\u62E96\u4E2A\u7EA2\u74031\u4E2A\u84DD\u7403'
          });
          return false;
        }

        var ticket = window.sessionStorage.getItem("ssq_ticket");

        //判断票的类型

        var _type = 101;

        if (this.duplex == true) {
          _type = 103;
        } else {
          //单式
          if (_result.length == 20) {
            _type = 101;
          } else {
            _type = 102;
          }
        }

        if (Base.isNull(ticket)) {
          ticket = [];
        } else {
          ticket = JSON.parse(ticket);
        }

        if (Base.isNull(this.ticketID)) {
          //新增
          ticket.push({
            id: Base.getUuid(),
            num: this.number,
            numbers: _result,
            red: _r,
            red1: _r1,
            red2: _r2,
            blue: _b,
            blue2: _b2,
            type: _type
          });

          window.sessionStorage.setItem('ssq_ticket', JSON.stringify(ticket));

        } else {
          //编辑
          Base.editTicketByID(this.ticketID, 'ssq', {
            num: this.number,
            numbers: _result,
            red: _r,
            red1: _r1,
            red2: _r2,
            blue: _b,
            blue2: _b2,
            type: _type
          });
        }

        this.$router.push({ name: 'LotterySsqOrder', params: { playIndex: this.playIndex } });

      },
      randomSelect() {

        var _rball = [];
        var _blue = Base.random_num(0, 15);

        _rball.push(Base.random_num(0, 32));

        for (var i = 0; i < 5; i++) {
          //剩下5个红球

          var rd = Base.random_num(0, 32);

          var _flag = true;

          for (var _i15 = 0; _i15 < _rball.length; _i15++) {
            //去重
            if (rd == _rball[_i15]) {
              _flag = false;
            }
          }

          if (_flag) {
            _rball.push(rd);
          } else {
            i--;
          }
        }

        console.log(_rball);
        console.log(_blue

          //渲染机选
        );
        this.initBall();

        if (this.duplex == true) {
          //胆拖

          for (var _i16 = 0; _i16 < _rball.length; _i16++) {
            this.duplexRedBall1[_rball[_i16]].value = true;
            this.duplexRedBall2[_rball[_i16]].disable = true;
          }

          if (Base.isNull(_blue)) {
            _blue = Base.random_num(0, 15);
          }

          this.duplexBlueBall[_blue].value = true;

          this.calculate();
        } else {
          //普通

          for (var _i17 = 0; _i17 < _rball.length; _i17++) {
            this.redBall[_rball[_i17]].value = true;
          }

          if (Base.isNull(_blue)) {
            _blue = Base.random_num(0, 15);
          }

          this.blueBall[_blue].value = true;

          this.calculate();
        }
      },
      swicthDuplex() {

        this.showDuplex = !this.showDuplex;
      },
      empty() {
        this.initBall();
      },
      switchHistory() {
        this.showHistory = !this.showHistory;
      },
      changeNav(key) {

        if (key == 1) {
          this.getData();
        }

        this.currentNav = key;
      },
      myBack() {
        this.$router.go(-1);
      },
      clearSelect() {
        //删除数据
        if (Base.isNull(this.ticketID)) {
          this.initBall();
        } else {
          Base.delTicketByID(this.ticketID, 'ssq');

          setTimeout( () => {
              this.$router.replace({ name: 'LotterySsq' });
          }, 100);

          this.initBall();
        }
      },
      initBall() {

        this.redBall = [];
        this.duplexRedBall1 = [];
        this.duplexRedBall2 = [];
        this.blueBall = [];
        this.duplexBlueBall = [];
        this.number = 0;

        this.currentNav = 0;
        this.lock = true;

        for (var i = 1; i < 34; i++) {
          this.redBall.push({
            num: Base.addZero(i),
            value: false
          });
        }
        for (var _i18 = 1; _i18 < 34; _i18++) {
          this.duplexRedBall1.push({
            num: Base.addZero(_i18),
            value: false,
            disable: false
          });
        }
        for (var _i19 = 1; _i19 < 34; _i19++) {
          this.duplexRedBall2.push({
            num: Base.addZero(_i19),
            value: false,
            disable: false
          });
        }

        for (var _i20 = 1; _i20 < 17; _i20++) {
          this.blueBall.push({
            num: Base.addZero(_i20),
            value: false
          });
        }
        for (var _i21 = 1; _i21 < 17; _i21++) {
          this.duplexBlueBall.push({
            num: Base.addZero(_i21),
            value: false
          });
        }
      }
    },

    mounted(){

      this.width = $(window).width();
      this.height = $(window).height();

      let lottery_type = window.sessionStorage.getItem("ssqPlayType");

      if(Base.isNull(lottery_type)){
          //默认值
        lottery_type = 'ssq';
      }

      this.lottery_type = lottery_type;

      this.width_ball = Math.floor((this.width - 6 * 12 - 30) / 7);

      this.initBall();

      Interface.awardPeriod(this.lottery_type, (data) => {

          if(data){

            var _tmp = data.returnJSON;

            if (_tmp.length == 0) {
              this.isEmpty = true;
              this.$message({
                type: 'error',
                message: '此彩种暂停销售'
              });
              this.fullscreenLoading = false;
              return false;
            }

            for (var i = 0; i < _tmp.length; i++) {
              var _item = _tmp[i];

              if (Base.isNull(_item.bonusCode)) {
                continue;
              }

              _item.redBall = _item.bonusCode.split("#")[0].split(',').join(' ');
              _item.blueBall = _item.bonusCode.split("#")[1].split(',').join(' ');
            }

            this.history = _tmp.reverse();
            this.current = _tmp[0];

          }

          this.fullscreenLoading = false;

      });

      //ID模式
      let _ticketID = this.$route.query.ticketID;

      if (Base.isNull(_ticketID)) {
        //初始化
      } else {
        //编辑
        this.ticketID = _ticketID;

        var _ticket = Base.getTicketByID(_ticketID, 'ssq');

        if (Base.isNull(_ticket)) {
          //空数据
        } else {
          if (_ticket.type == 103) {
            //胆拖

            var _r1 = _ticket.red1;
            var _r2 = _ticket.red2;
            var _b = _ticket.blue;

            for (var i = 0; i < _r1.length; i++) {
              this.duplexRedBall1[Base.splitZero(_r1[i]) - 1].value = true;
              this.duplexRedBall2[Base.splitZero(_r1[i]) - 1].disable = true;
            }
            for (var _i22 = 0; _i22 < _r2.length; _i22++) {
              this.duplexRedBall2[Base.splitZero(_r2[_i22]) - 1].value = true;
              this.duplexRedBall1[Base.splitZero(_r2[_i22]) - 1].disable = true;
            }

            for (var _i23 = 0; _i23 < _b.length; _i23++) {
              this.duplexBlueBall[Base.splitZero(_b[_i23])].value = true;
            }

            this.duplex = true;
          } else {
            //普通
            var _r = _ticket.red;
            var _b4 = _ticket.blue2;

            for (var _i24 = 0; _i24 < _r.length; _i24++) {
              this.redBall[Base.splitZero(_r[_i24]) - 1].value = true;
            }
            for (var _i25 = 0; _i25 < _b4.length; _i25++) {
              this.blueBall[Base.splitZero(_b4[_i25]) - 1].value = true;
            }
          }
          this.calculate();
        }
      }

      this.getData();

    }

  }


</script>

