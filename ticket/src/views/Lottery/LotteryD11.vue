<template>
  <div id="lottery_d11_page">

    <loader :show="fullscreenLoading"></loader>

    <div class="wb100">

      <div class="h50px lh50px warpper-white relative wb100" style="z-index: 99">
        <p class="text-center Fred" @click="showType = !showType; showMore = false">{{playType[typeIndex]}} <img src="~@/assets/images/arrow-down-red.png" class="h8px"> </p>
        <div class="h50px w50px absolute" style="top:0; right: 0;" v-show="showType == false">
          <img src="~@/assets/images/icon-more.png" class="fr h6px" style="margin-top: 22px; margin-right: 15px;" v-show="showMore == false" @click="showMore = true">
          <img src="~@/assets/images/icon-more2.png" class="fr w6px" style="margin-top: 11px; margin-right: 26px;" v-show="showMore == true" @click="showMore = false">
        </div>
      </div>

      <div class="w90px h80px pat10 lh40px text-center fr absolute F14" v-show="showMore == true" :style="'background: url('+ bgMore +'); background-size: 100% 100%; top:50px; right: 10px; z-index: 99;'">

        <router-link :to="{ name: 'NoticeMore', query:{ lotteryType: lottery_type, call: true } }">
          <p class="bor-gray4 bor-solid-1b Fwhite">开奖</p>
        </router-link>
        <router-link :to="{ name: 'TicketRule', params:{ lotteryType: 'D11' } }">
          <p class="Fwhite">规则</p>
        </router-link>
      </div>

      <div class="dialogBg" @click="showType = false" v-show="showType == true"></div>
      <div class="wb100 text-center warpper-white" v-show="showType == true" style="position: fixed; z-index: 99;">
        <div class="pal15 par15 pat15 F14">
          <el-row :gutter="15">
            <el-col :span="8" v-for="(item,key) in playType" :key="key">
              <div class="wb100 h35px lh35px radius5 mab15" @click="changeType(key)" :class="key == typeIndex ? 'warpper-red Fwhite pa1' : 'bor-gray bor-solid-1a Fgray-3'">
                {{item}}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="clear"></div>

      <template>

        <!--开奖时间，号码-->
        <div class="warpper-gray-1 wb100 h55px bor-solid-1t bor-solid-1b bor-gray" >
          <div>
            <div class="wb50 fl text-center h25px lh25px">

              <p class="F14 Fgray-3">距<span class="Fnum">{{current.number}}</span>期投注截止</p>
              <p class="Fred F16 Fnum">{{parseMins(timer)}}</p>

            </div>

            <div class="wb50 fr ">
              <div class="w20px fr " @click="switchHistory">
                <img src="~@/assets/images/arrow-down.png" class="w15px" v-show="showHistory == false" style="margin-top: 25px">
                <img src="~@/assets/images/arrow-up.png" class="w15px" v-show="showHistory == true" style="margin-top: 25px">
              </div>

              <div class="w130px center h25px lh25px ">
                <p class="Fgray-3  F14 text-center">
                  <span class="Fnum">{{prev.number}}</span>期正在开奖
                </p>

                <div class="center w130px" v-if="prev.ball">
                  <div class="fl radius50per warpper-red F12 Fwhite h20px lh20px w20px mal5 mat2 text-center Fnum" v-for="item in prev.balls">{{item}}</div>
                </div>
                <div class="center w130px" v-else>
                  <div class="fl radius50per warpper-red F12 Fwhite h20px lh20px w20px mal5 mat2 text-center Fnum" v-for="item in [1,2,3,4,5]">?</div>
                </div>

              </div>
            </div>
          </div>

          <div class=" bor-gray bor-solid-1l h40px center" style=" width:1px;margin-top: 10px"></div>

        </div>

        <!--往期开奖号码-->
        <el-collapse-transition>
          <div v-show="showHistory">
            <template v-for="(item,key) in history">
              <p class="lh35px h35px F14 par15 relative text-center Fred" :class="key%2 == 0 ? 'warpper-white' : 'warpper-gray-3'" style="padding-left: 23px;">
                            <span class="fl Fgray-3 mar30">
                              第<span class="Fnum">{{item.number}}</span>期
                            </span>
                <template v-if="item.ball">
                  <span class="fl Fnum">{{item.ball}}</span>
                </template>
                <template v-else>
                  <div class="fl radius50per warpper-red F14 Fwhite" style=" width: 19px; height: 19px; line-height: 19px; margin-top: 8px; margin-right: 2px;" v-for="item in [1,2,3,4,5]">?</div>
                </template>
              </p>
              <div class="clear"></div>
            </template>
            <div class="clear1 bor-gray bor-solid-1b"></div>
          </div>
        </el-collapse-transition>

        <!--任选-->
        <template>

          <template >
            <div class="wb100 lh40px h40px Fgray-2 F14 pal15 par15">
              <p v-if="typeIndex == 0">
                请至少选择2个号码
              </p>
              <p v-else-if="typeIndex == 1">
                请至少选择3个号码
              </p>
              <p v-else-if="typeIndex == 2">
                请至少选择4个号码
              </p>
              <p v-else-if="typeIndex == 3">
                请至少选择5个号码
              </p>
              <p v-else-if="typeIndex == 4">
                请至少选择6个号码
              </p>
              <p v-else-if="typeIndex == 5">
                请至少选择7个号码
              </p>
              <p v-else-if="typeIndex == 6">
                请至少选择8个号码
              </p>
              <p v-else-if="typeIndex == 7">
                请至少选择1个号码
              </p>
              <p v-else-if="typeIndex == 8 || typeIndex == 10">
                每位至少选择1个号码
              </p>
              <p v-else-if="typeIndex == 9">
                请至少选择2个号码
              </p>
              <p v-else-if="typeIndex == 11">
                请至少选择3个号码
              </p>
            </div>
          </template>

          <template>
            <div class="fl pa15" style="margin-top: -7px">
              <div class="warpper-red text-center radius5l w40px" style="height: 24px;line-height: 24px">

                <template v-if="typeIndex == 8 || typeIndex == 10">
                  <p class="F14 Fwhite">万位</p>
                </template>

                <template v-else>
                  <p class="F14 Fwhite">选号</p>
                </template>

              </div>
              <div class="" style="margin-top: -25px">
                <img src="~@/assets/images/icon-triangle.png" style="height: 25px;margin-left:39px">
              </div>
              <div class="clear" style="height: 8px"></div>
              <!--<div class="warpper-gray-1 w40px text-center h20px lh20px radius5" style="/*margin-top: 10%;*/margin-left: -5px;">-->
              <!--<p class="F14 Fgray-2">遗漏</p>-->
              <!--</div>-->
            </div>
            <div class="pal20" style="padding-left: 88px">
              <template v-for="(item,key) in elevenBall">
                <!--<div class="radius50per text-center fl mar5 mab25 F12" @click="selectBall(key,'red')" :class="item.value == true ? 'warpper-red Fwhite pa1' : 'bor-solid-1a bor-gray2 Fred'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
                <!--{{item.num}}-->
                <!--</div>-->
                <div v-if="item.disable == true" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'" class="radius50per warpper-gray-2 pa1 Fwhite text-center fl mar15 mab15 F16 Fnum">
                  {{item.num}}
                </div>

                <div v-else class="radius50per text-center fl mar15 mab15 F16 Fnum" @click="selectBall(key,'red')" :class="item.value == true ? 'warpper-red Fwhite pa1' : 'bor-solid-1a bor-gray2 Fred'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                  {{item.num}}
                </div>
              </template>
            </div>
          </template>

          <!--前二直选-->
          <template v-if="typeIndex == 8">

            <div class="clear"></div>

            <div class="fl pa15" style="margin-top: -7px">
              <div class="warpper-red  text-center radius5 w40px" style="height: 24px;line-height: 24px">
                <p class="F14 Fwhite">千位</p>
              </div>
              <div class="" style="margin-top: -25px">
                <img src="~@/assets/images/icon-triangle.png" style="height: 25px;margin-left:37px">
              </div>
              <div class="clear" style="height: 8px"></div>
              <!--<div class="warpper-gray-1 w40px text-center h20px lh20px radius5" style="/*margin-top: 10%;*/margin-left: -5px;">-->
              <!--<p class="F14 Fgray-2">遗漏</p>-->
              <!--</div>-->
            </div>
            <div class="pal20" style="padding-left: 88px">
              <template v-for="(item,key) in elevenBall2">
                <!--<div class="radius50per text-center fl mar5 mab25 F12" @click="selectBall(key,'red')" :class="item.value == true ? 'warpper-red Fwhite pa1' : 'bor-solid-1a bor-gray2 Fred'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
                <!--{{item.num}}-->
                <!--</div>-->

                <div v-if="item.disable == true" class="radius50per warpper-gray-2 pa1 Fwhite text-center fl mar15 mab15 F16 Fnum" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                  {{item.num}}
                </div>

                <div v-else class="radius50per text-center fl mar15 mab15 F16 Fnum" @click="selectBall(key,'red1')" :class="item.value == true ? 'warpper-red Fwhite pa1' : 'bor-solid-1a bor-gray2 Fred'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                  {{item.num}}
                </div>
              </template>
            </div>
          </template>

          <!--前三直选-->
          <template v-if="typeIndex == 10">

            <div class="clear"></div>

            <div class="fl pa15" style="margin-top: -7px">
              <div class="warpper-red text-center radius5 w40px" style="height: 24px;line-height: 24px">
                <p class="F14 Fwhite">千位</p>
              </div>
              <div class="" style="margin-top: -25px">
                <img src="~@/assets/images/icon-triangle.png" style="height: 25px;margin-left:37px">
              </div>
              <div class="clear" style="height: 8px"></div>
              <!--<div class="warpper-gray-1 w40px text-center h20px lh20px radius5" style="/*margin-top: 10%;*/margin-left: -5px;">-->
              <!--<p class="F14 Fgray-2">遗漏</p>-->
              <!--</div>-->
            </div>

            <div class="pal20" style="padding-left: 88px">
              <template v-for="(item,key) in elevenBall3">
                <div v-if="item.disable == true" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'" class="radius50per warpper-gray-2 pa1 Fwhite text-center fl mar15 mab15 F16 Fnum">
                  {{item.num}}
                </div>
                <div v-else class="radius50per text-center fl mar15 mab15 F16 Fnum" @click="selectBall(key,'red2')" :class="item.value == true ? 'warpper-red Fwhite pa1' : 'bor-solid-1a bor-gray2 Fred'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                  {{item.num}}
                </div>
              </template>
            </div>

            <div class="clear"></div>

            <div class="fl pa15" style="margin-top: -7px">
              <div class="warpper-red  text-center radius5 w40px" style="height: 24px;line-height: 24px">
                <p class="F14 Fwhite">百位</p>
              </div>
              <div class="" style="margin-top: -25px">
                <img src="~@/assets/images/icon-triangle.png" style="height: 25px;margin-left:37px">
              </div>
              <div class="clear" style="height: 8px"></div>
              <!--<div class="warpper-gray-1 w40px text-center h20px lh20px radius5" style="/*margin-top: 10%;*/margin-left: -5px;">-->
              <!--<p class="F14 Fgray-2">遗漏</p>-->
              <!--</div>-->
            </div>
            <div class="pal20" style="padding-left: 88px">
              <template v-for="(item,key) in elevenBall4">
                <div v-if="item.disable == true" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'" class="radius50per warpper-gray-2 pa1 Fwhite text-center fl mar15 mab15 F16 Fnum">
                  {{item.num}}
                </div>
                <div v-else class="radius50per text-center fl mar15 mab15 F16 Fnum" @click="selectBall(key,'red3')" :class="item.value == true ? 'warpper-red Fwhite pa1' : 'bor-solid-1a bor-gray2 Fred'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                  {{item.num}}
                </div>
              </template>
            </div>
          </template>


        </template>


        <div class="clear h65px"></div>


        <!--底部-->
        <div class="wb100 fixed warpper-white h60px" style="bottom: 0;">

          <!--<div class="pa10  warpper-gray-3 F14">若中奖，奖金为<span class="Fred">8元</span>，盈利<span class="Fred">8元</span></div>-->

          <div class="wb100 bor-gray bor-solid-1t  warpper-white relative" >

            <div class="pat10 pab10">
              <div class="w25px text-center absolute" @click="clearSelect" style="left: 15px; top: 10px;">
                <div class="h25px img-Harea center">
                  <img src="~@/assets/images/icon-clear.png">
                </div>
                <div class=" bor-gray bor-solid-1l h50px absolute " style="margin-top: -30px;margin-left: 32px"></div>

                <p class="Fgray-2 F12 h25px lh25px text-center">清空</p>
              </div>

              <div class="w25px text-center absolute" style="left: 55px; top: 10px;" @click="randomSelect">
                <div class="h25px img-Harea center">
                  <img src="~@/assets/images/random.png">
                </div>
                <p class="Fgray-2 F12 h25px lh25px text-center">机选</p>
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

      </template>

    </div>
  </div>
</template>

<style>

</style>

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
        number: 0,
        num: 2,
        ticketID: '',
        showMore: false,
        showType: false,
        isEmpty: false,

        timer: 300,
        current: {
          number: '',
          endTime: ''
        },
        prev: {
          number: '',
          endTime: ''
        },

        lock: true,
        playType: ['任选二', '任选三', '任选四', '任选五', '任选六', '任选七', '任选八', '前一', '前二直选', '前二组选', '前三直选', '前三组选'],
        typeIndex: 3,
        showHistory: false,
        showDuplex: false,
        history: ['', '', '', '', '', '', '', ''],

        elevenBall: [],
        elevenBall2: [],
        elevenBall3: [],
        elevenBall4: [],

        lottery_type: 'D11',
        notices: [],
        loading: true,
        width: 0,
        _width2: 0,
        height: 0,
        width_ball: 0
      }
    },

    methods: {
      getData() {

        Interface.openAwardListByLotteryType(this.lottery_type, 1, 10, (data) => {
          if (data) {

            var _tmp = data.returnJSON.indexData;

            // console.log(_tmp);

            for (var i = 0; i < _tmp.length; i++) {

              if(Base.isNull(_tmp[i].bonusCode)){
                continue;
              }

              //11选5
              var _bonus3 = _tmp[i].bonusCode;
              var _reds2 = _bonus3.split(',');
              var _balls3 = [];
              for (var _i3 = 0; _i3 < _reds2.length; _i3++) {
                _balls3.push({
                  type: 'red',
                  num: _reds2[_i3]
                });
              }
              _tmp[i].balls = _balls3;

            }

            this.loading = false;

            this.notices = _tmp;
          }
        });
      },


      //选号
      selectBall(key, type) {

        if (type == 'red') {
          this.elevenBall[key].value = !this.elevenBall[key].value;
          this.elevenBall2[key].disable = !this.elevenBall2[key].disable;
          this.elevenBall3[key].disable = !this.elevenBall3[key].disable;
          this.elevenBall4[key].disable = !this.elevenBall4[key].disable;
        }
        if (type == 'red1') {
          this.elevenBall2[key].value = !this.elevenBall2[key].value;
          this.elevenBall[key].disable = !this.elevenBall[key].disable;
        }
        if (type == 'red2') {
          this.elevenBall3[key].value = !this.elevenBall3[key].value;
          this.elevenBall[key].disable = !this.elevenBall[key].disable;
          this.elevenBall4[key].disable = !this.elevenBall4[key].disable;
        }
        if (type == 'red3') {
          this.elevenBall4[key].value = !this.elevenBall4[key].value;
          this.elevenBall[key].disable = !this.elevenBall[key].disable;
          this.elevenBall3[key].disable = !this.elevenBall3[key].disable;
        }

        this.calculate();

        var _r5 = 0;

        for (var i = 0; i < this.elevenBall.length; i++) {
          var _ball = this.elevenBall[i];
          if (_ball.value == true) {
            _r5++;
          }
        }
      },


      //购买计算
      calculate() {

        var result = 0;

        //任选五
        if (this.typeIndex == 3) {

          var _r5 = 0;

          for (var i = 0; i < this.elevenBall.length; i++) {
            var _ball = this.elevenBall[i];
            if (_ball.value == true) {
              _r5++;
            }
          }

          if (_r5 > 4) {
            result = Base.factorial(_r5) / (Base.factorial(5) * Base.factorial(_r5 - 5));
          }
        }

        //任选二
        if (this.typeIndex == 0) {

          var _r2 = 0;

          for (var _i5 = 0; _i5 < this.elevenBall.length; _i5++) {
            var _ball2 = this.elevenBall[_i5];
            if (_ball2.value == true) {
              _r2++;
            }
          }

          if (_r2 > 1) {
            result = Base.factorial(_r2) / (Base.factorial(2) * Base.factorial(_r2 - 2));
          }
        }

        //任选三
        if (this.typeIndex == 1) {

          var _r3 = 0;

          for (var _i6 = 0; _i6 < this.elevenBall.length; _i6++) {
            var _ball3 = this.elevenBall[_i6];
            if (_ball3.value == true) {
              _r3++;
            }
          }

          if (_r3 > 2) {
            result = Base.factorial(_r3) / (Base.factorial(3) * Base.factorial(_r3 - 3));
          }
        }

        //任选四
        if (this.typeIndex == 2) {

          var _r4 = 0;

          for (var _i7 = 0; _i7 < this.elevenBall.length; _i7++) {
            var _ball4 = this.elevenBall[_i7];
            if (_ball4.value == true) {
              _r4++;
            }
          }

          if (_r4 > 3) {
            result = Base.factorial(_r4) / (Base.factorial(4) * Base.factorial(_r4 - 4));
          }
        }

        //任选六
        if (this.typeIndex == 4) {

          var _r6 = 0;

          for (var _i8 = 0; _i8 < this.elevenBall.length; _i8++) {
            var _ball5 = this.elevenBall[_i8];
            if (_ball5.value == true) {
              _r6++;
            }
          }

          if (_r6 > 5) {
            result = Base.factorial(_r6) / (Base.factorial(6) * Base.factorial(_r6 - 6));
          }
        }

        //任选七
        if (this.typeIndex == 5) {

          var _r7 = 0;

          for (var _i9 = 0; _i9 < this.elevenBall.length; _i9++) {
            var _ball6 = this.elevenBall[_i9];
            if (_ball6.value == true) {
              _r7++;
            }
          }

          if (_r7 > 6) {
            result = Base.factorial(_r7) / (Base.factorial(7) * Base.factorial(_r7 - 7));
          }
        }

        //任选八
        if (this.typeIndex == 6) {

          var _r8 = 0;

          for (var _i10 = 0; _i10 < this.elevenBall.length; _i10++) {
            var _ball7 = this.elevenBall[_i10];
            if (_ball7.value == true) {
              _r8++;
            }
          }

          if (_r8 > 7) {
            result = Base.factorial(_r8) / (Base.factorial(8) * Base.factorial(_r8 - 8));
          }
        }

        //前一
        if (this.typeIndex == 7) {

          var _r1 = 0;

          for (var _i11 = 0; _i11 < this.elevenBall.length; _i11++) {
            var _ball8 = this.elevenBall[_i11];
            if (_ball8.value == true) {
              _r1++;
            }
          }

          if (_r1 > 0) {
            result = Base.factorial(_r1) / (Base.factorial(1) * Base.factorial(_r1 - 1));
          }
        }

        //前二组选
        if (this.typeIndex == 9) {

          var _r9 = 0;

          for (var _i12 = 0; _i12 < this.elevenBall.length; _i12++) {
            var _ball9 = this.elevenBall[_i12];
            if (_ball9.value == true) {
              _r9++;
            }
          }

          if (_r9 > 1) {
            result = Base.factorial(_r9) / (Base.factorial(2) * Base.factorial(_r9 - 2));
          }
        }

        //前三组选
        if (this.typeIndex == 11) {

          var _r10 = 0;

          for (var _i13 = 0; _i13 < this.elevenBall.length; _i13++) {
            var _ball10 = this.elevenBall[_i13];
            if (_ball10.value == true) {
              _r10++;
            }
          }

          if (_r10 > 2) {
            result = Base.factorial(_r10) / (Base.factorial(3) * Base.factorial(_r10 - 3));
          }
        }

        //前二直选
        if (this.typeIndex == 8) {

          var _r11 = 0;
          var _r12 = 0;

          for (var _i14 = 0; _i14 < this.elevenBall.length; _i14++) {
            var _ball11 = this.elevenBall[_i14];
            if (_ball11.value == true) {
              _r11++;
            }
          }

          for (var _i15 = 0; _i15 < this.elevenBall2.length; _i15++) {
            var _ball12 = this.elevenBall2[_i15];
            if (_ball12.value == true) {
              _r12++;
            }
          }

          if (_r11 > 0 && _r12 > 0) {
            result = Base.factorial(_r11) / (Base.factorial(1) * Base.factorial(_r11 - 1)) * (Base.factorial(_r12) / (Base.factorial(1) * Base.factorial(_r12 - 1)));
          }
        }

        //前三直选
        if (this.typeIndex == 10) {

          var _r13 = 0;
          var _r14 = 0;
          var _r15 = 0;

          for (var _i16 = 0; _i16 < this.elevenBall.length; _i16++) {
            var _ball13 = this.elevenBall[_i16];
            if (_ball13.value == true) {
              _r13++;
            }
          }

          for (var _i17 = 0; _i17 < this.elevenBall3.length; _i17++) {
            var _ball14 = this.elevenBall3[_i17];
            if (_ball14.value == true) {
              _r14++;
            }
          }

          for (var _i18 = 0; _i18 < this.elevenBall4.length; _i18++) {
            var _ball15 = this.elevenBall4[_i18];
            if (_ball15.value == true) {
              _r15++;
            }
          }

          if (_r13 > 0 && _r14 > 0 && _r15 > 0) {
            result = Base.factorial(_r13) / (Base.factorial(1) * Base.factorial(_r13 - 1)) * (Base.factorial(_r14) / (Base.factorial(1) * Base.factorial(_r14 - 1))) * (Base.factorial(_r15) / (Base.factorial(1) * Base.factorial(_r15 - 1)));
          }
        }

        this.number = Math.ceil(result);

        if (this.number > 0) {
          this.lock = false;
        } else {
          this.lock = true;
        }

        return this.number;
      },


      //购买
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

        var _r = [];
        var _r1 = [];
        var _r2 = [];
        var _r3 = [];
        var _r4 = [];
        var _r5 = [];

        var ticket = window.sessionStorage.getItem("d11_ticket");

        if (this.typeIndex == 8) {
          //前二直选

          for (var i = 0; i < this.elevenBall.length; i++) {
            var _ball = this.elevenBall[i];
            if (_ball.value == true) {
              _r1.push(_ball.num);
            }
          }

          for (var _i19 = 0; _i19 < this.elevenBall2.length; _i19++) {
            var _ball16 = this.elevenBall2[_i19];
            if (_ball16.value == true) {
              _r2.push(_ball16.num);
            }
          }

          _result = _r1.join(",") + ' | ' + _r2.join(",");

          //                //判断票的类型
          //

          //num               注数
          //numbers           数字
          //playType          玩法

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
              numbers2: _r1,
              numbers3: _r2,
              playType: this.typeIndex
            });
            window.sessionStorage.setItem('d11_ticket', JSON.stringify(ticket));
          } else {
            //编辑
            Base.editTicketByID(this.ticketID, 'd11', {
              num: this.number,
              numbers: _result,
              numbers2: _r1,
              numbers3: _r2,
              playType: this.typeIndex
            });
          }
        } else if (this.typeIndex == 10) {
          //前三直选

          for (var _i20 = 0; _i20 < this.elevenBall.length; _i20++) {
            var _ball17 = this.elevenBall[_i20];
            if (_ball17.value == true) {
              _r3.push(_ball17.num);
            }
          }

          for (var _i21 = 0; _i21 < this.elevenBall3.length; _i21++) {
            var _ball18 = this.elevenBall3[_i21];
            if (_ball18.value == true) {
              _r4.push(_ball18.num);
            }
          }

          for (var _i22 = 0; _i22 < this.elevenBall4.length; _i22++) {
            var _ball19 = this.elevenBall4[_i22];
            if (_ball19.value == true) {
              _r5.push(_ball19.num);
            }
          }

          _result = _r3.join(",") + ' | ' + _r4.join(",") + ' | ' + _r5.join(",");

          //
          if (Base.isNull(ticket)) {
            ticket = [];
          } else {
            ticket = JSON.parse(ticket);
          }

          if (Base.isNull(this.ticketID)) {
            ticket.push({
              id: Base.getUuid(),
              num: this.number,
              numbers: _result,
              numbers2: _r3,
              numbers3: _r4,
              numbers4: _r5,
              playType: this.typeIndex
            });
            window.sessionStorage.setItem('d11_ticket', JSON.stringify(ticket));
          } else {
            //编辑
            Base.editTicketByID(this.ticketID, 'd11', {
              num: this.number,
              numbers: _result,
              numbers2: _r3,
              numbers3: _r4,
              numbers4: _r5,
              playType: this.typeIndex
            });
          }
        } else {
          //普通

          for (var _i23 = 0; _i23 < this.elevenBall.length; _i23++) {
            var _ball20 = this.elevenBall[_i23];
            if (_ball20.value == true) {
              _r.push(_ball20.num);
            }
          }

          _result = _r.join(",");

          //
          //                //判断票的类型
          //

          //num               注数
          //numbers           数字
          //playType          玩法

          if (Base.isNull(ticket)) {
            ticket = [];
          } else {
            ticket = JSON.parse(ticket);
          }

          if (Base.isNull(this.ticketID)) {
            ticket.push({
              id: Base.getUuid(),
              num: this.number,
              numbers: _result,
              playType: this.typeIndex
            });
            window.sessionStorage.setItem('d11_ticket', JSON.stringify(ticket));
          } else {
            Base.editTicketByID(this.ticketID, 'd11', {
              num: this.number,
              numbers: _result,
              playType: this.typeIndex
            });
          }
        }

        this.$router.push({ name: 'LotteryD11Order', params:{ playIndex: this.typeIndex } });
      },


      //机选
      randomSelect() {

        var _rball = [];

        _rball.push(Base.random_num(1, 11));

        var _length = 0;

        if (this.typeIndex == 0) _length = 1;

        if (this.typeIndex == 1) _length = 2;

        if (this.typeIndex == 2) _length = 3;

        if (this.typeIndex == 3) _length = 4;

        if (this.typeIndex == 4) _length = 5;

        if (this.typeIndex == 5) _length = 6;

        if (this.typeIndex == 6) _length = 7;

        if (this.typeIndex == 8) _length = 2;

        if (this.typeIndex == 9) _length = 1;

        if (this.typeIndex == 10) _length = 3;

        if (this.typeIndex == 11) _length = 2;

        for (var i = 0; i < _length; i++) {
          var rd = Base.random_num(1, 11);
          var _flag = true;
          for (var _i24 = 0; _i24 < _rball.length; _i24++) {
            //去重
            if (rd == _rball[_i24]) {
              _flag = false;
              break;
            }
          }
          if (_flag) {
            _rball.push(rd);
          } else {
            i--;
          }
        }

        //渲染机选
        this.initBall();

        if (this.typeIndex == 8) {
          //前二直选

          this.elevenBall[_rball[0] - 1].value = true;
          this.elevenBall2[_rball[0] - 1].disable = true;

          this.elevenBall2[_rball[1] - 1].value = true;
          this.elevenBall[_rball[1] - 1].disable = true;

          this.calculate();
        } else if (this.typeIndex == 10) {
          //前二直选

          this.elevenBall[_rball[0] - 1].value = true;
          this.elevenBall3[_rball[0] - 1].disable = true;
          this.elevenBall4[_rball[0] - 1].disable = true;

          this.elevenBall3[_rball[1] - 1].value = true;
          this.elevenBall[_rball[1] - 1].disable = true;
          this.elevenBall4[_rball[1] - 1].disable = true;

          this.elevenBall4[_rball[2] - 1].value = true;
          this.elevenBall[_rball[2] - 1].disable = true;
          this.elevenBall3[_rball[2] - 1].disable = true;

          this.calculate();
        } else {
          for (var _i25 = 0; _i25 < _rball.length; _i25++) {
            this.elevenBall[_rball[_i25] - 1].value = true;
          }

          this.calculate();
        }
      },
      swicthDuplex() {
        this.showDuplex = !this.showDuplex;
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
        window.history.go(-1);
      },

      changeType(key) {
        this.typeIndex = key;
        this.showType = false;
        this.initBall();
      },

      swicthType() {
        this.showType = !this.showType;
      },

      //转换分钟数 s：秒数
      parseMins(s) {
        var m1 = Math.floor(s / 60);
        var m2 = s % 60;
        if (m1 < 10) {
          m1 = "0" + m1;
        }
        if (m2 < 10) {
          m2 = "0" + m2;
        }
        return m1 + ":" + m2;
      },

      //转换秒数 t:时间
      parseSecond(t) {
        var t1 = parseInt(t.split(":")[0]);
        var t2 = parseInt(t.split(":")[1]);
        return t1 * 60 + t2;
      },
      getAwardPeriod() {

        Interface.awardPeriod(this.lottery_type, (data) => {

          if(data) {

            var _tmp = data.returnJSON;

            if (_tmp.length == 0) {
                this.isEmpty = true;
                this.$message({
                  type: 'error',
                  message: '此彩种暂停销售'
                });
                this.fullscreenLoading = false
                return false;
            }

            var _tmp = data.returnJSON;

            for (var i = 0; i < _tmp.length; i++) {
              _tmp[i].number = _tmp[i].number.substring(_tmp[i].number.length - 2);

              if (Base.isNull(_tmp[i].bonusCode)) {
                continue;
              }
              _tmp[i].ball = _tmp[i].bonusCode.split(',').join(' ');
            }

            this.history = _tmp.reverse();

            var _timer = 0;

            var _now = new Date().getTime();

            _timer = Math.round((Base.get_unix_time(_tmp[0].stopTime) - _now) / 1000);

            if (_timer > 600) {
              //下一期
              _timer = Math.round((Base.get_unix_time(_tmp[1].stopTime) - _now) / 1000);

              this.current = _tmp[1];
              this.prev = _tmp[2];
            } else {
              this.current = _tmp[0];
              this.prev = _tmp[1];
            }

            if (!Base.isNull(this.prev.ball)) {
              this.prev.balls = this.prev.ball.split(' ');
            }

            clearInterval(this.timerID);

            if(_timer<0){
              this.isEmpty = true;
              this.$message({
                type: 'error',
                message: '此彩种暂停销售'
              });
              this.fullscreenLoading = false;
              return false;
            }

            this.timerID = setInterval(() => {
              this.timer--;
              if (this.timer == 0) {
                //开奖，并重新请求奖期
                clearInterval(this.timerID);
                this.getAwardPeriod();
              }
            }, 1000);

            this.timer = _timer;
          }

          this.fullscreenLoading = false;

        });
      },
      clearSelect() {

        if (Base.isNull(this.ticketID)) {
          this.initBall();
        } else {

          Base.delTicketByID(this.ticketID, 'd11');

          setTimeout( () => {
              this.$router.replace({ name: 'LotteryD11' });
          }, 100);

          this.initBall();

        }
      },
      empty(key) {
        this.showDuplex = false;
        this.typeIndex = key;
        this.ticketID = '';
        this.initBall();
      },

      //清空
      initBall() {

        this.elevenBall = [];
        this.elevenBall2 = [];
        this.elevenBall3 = [];
        this.elevenBall4 = [];
        this.number = 0;
        this.lock = true;
        this.currentNav = 0;

        for (var i = 1; i < 12; i++) {
          this.elevenBall.push({
            num: Base.addZero(i),
            value: false
          });
        }
        for (var _i26 = 1; _i26 < 12; _i26++) {
          this.elevenBall2.push({
            num: Base.addZero(_i26),
            value: false
          });
        }
        for (var _i27 = 1; _i27 < 12; _i27++) {
          this.elevenBall3.push({
            num: Base.addZero(_i27),
            value: false
          });
        }
        for (var _i28 = 1; _i28 < 12; _i28++) {
          this.elevenBall4.push({
            num: Base.addZero(_i28),
            value: false
          });
        }
      }
    },

    mounted(){

      let lottery_type = window.sessionStorage.getItem("d11PlayType");

      if(Base.isNull(lottery_type)){
        //默认值
        lottery_type = 'D11';
      }

      this.lottery_type = lottery_type;

      this.width = $(window).width();
      this.height = $(window).height();

      this.width_ball = Math.floor((this.width - 5 * 17 - 88) / 5);

      this.getAwardPeriod();

      let _ticketID = this.$route.query.ticketID;

      if (Base.isNull(_ticketID)) {
        //初始化
        let typeIndex = this.$route.params.playIndex;

        if (Base.isNull(typeIndex)) {
          typeIndex = 0;
        }

        this.typeIndex = typeIndex;

        this.initBall();
      } else {
        //编辑
        this.ticketID = _ticketID;

        var _ticket = Base.getTicketByID(_ticketID, 'd11');

        if (Base.isNull(_ticket)) {
          //空数据
        } else {
          var _data = _ticket;

          this.typeIndex = _data.playType;

          this.initBall();

          if (_data.playType == 8) {
            //直选2
            //
            var _tmp1 = _data.numbers2;
            var _tmp2 = _data.numbers3;

            for (var i = 0; i < this.elevenBall.length; i++) {
              for (var j = 0; j < _tmp1.length; j++) {
                if (this.elevenBall[i].num == _tmp1[j]) {
                  this.elevenBall[i].value = true;
                  this.elevenBall2[i].disable = true;
                }
              }
            }

            for (var _i29 = 0; _i29 < this.elevenBall2.length; _i29++) {
              for (var _j = 0; _j < _tmp2.length; _j++) {
                if (this.elevenBall2[_i29].num == _tmp2[_j]) {
                  this.elevenBall2[_i29].value = true;
                  this.elevenBall[_i29].disable = true;
                }
              }
            }
          } else if (_data.playType == 10) {
            //渲染11选5
            var _tmp4 = _data.numbers2;
            var _tmp5 = _data.numbers3;
            var _tmp3 = _data.numbers4;

            for (var _i30 = 0; _i30 < this.elevenBall.length; _i30++) {
              for (var _j2 = 0; _j2 < _tmp4.length; _j2++) {
                if (this.elevenBall[_i30].num == _tmp4[_j2]) {
                  this.elevenBall[_i30].value = true;
                  this.elevenBall3[_i30].disable = true;
                  this.elevenBall4[_i30].disable = true;
                }
              }
            }

            for (var _i31 = 0; _i31 < this.elevenBall3.length; _i31++) {
              for (var _j3 = 0; _j3 < _tmp5.length; _j3++) {
                if (this.elevenBall3[_i31].num == _tmp5[_j3]) {
                  this.elevenBall3[_i31].value = true;
                  this.elevenBall[_i31].disable = true;
                  this.elevenBall4[_i31].disable = true;
                }
              }
            }

            for (var _i32 = 0; _i32 < this.elevenBall4.length; _i32++) {
              for (var _j4 = 0; _j4 < _tmp3.length; _j4++) {
                if (this.elevenBall4[_i32].num == _tmp3[_j4]) {
                  this.elevenBall4[_i32].value = true;
                  this.elevenBall[_i32].disable = true;
                  this.elevenBall3[_i32].disable = true;
                }
              }
            }
          } else {
            var _tmp = _data.numbers.split(',');

            for (var _i33 = 0; _i33 < this.elevenBall.length; _i33++) {
              for (var _j5 = 0; _j5 < _tmp.length; _j5++) {
                if (this.elevenBall[_i33].num == _tmp[_j5]) {
                  this.elevenBall[_i33].value = true;
                }
              }
            }
          }

          this.calculate();
        }
      }

      this.getData();


    }

  }


</script>

