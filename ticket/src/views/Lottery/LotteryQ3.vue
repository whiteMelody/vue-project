<template>
  <div id="lottery_q3_page">

    <loader :show="fullscreenLoading"></loader>

    <div class="wb100">

      <div class="h50px lh50px warpper-white relative wb100" style="z-index: 99">
        <p class="text-center Fred" @click="showType = !showType; showMore = false">{{playType[playIndex]}} <img src="~@/assets/images/arrow-down-red.png" class="h8px"> </p>
        <div class="h50px w50px absolute" style="top:0; right: 0;" v-show="showType == false">
          <img src="~@/assets/images/icon-more.png" class="fr h6px" style="margin-top: 22px; margin-right: 15px;" v-show="showMore == false" @click="showMore = true">
          <img src="~@/assets/images/icon-more2.png" class="fr w6px" style="margin-top: 11px; margin-right: 26px;" v-show="showMore == true" @click="showMore = false">
        </div>
      </div>

      <div class="w90px h80px pat10 lh40px text-center fr absolute F14" v-show="showMore == true" :style="'background: url('+ bgMore +'); background-size: 100% 100%; top:50px; right: 10px; z-index: 99;'">

        <router-link :to="{ name:'NoticeMore', query:{ lotteryType: lottery_type, call: true } }">
          <p class="bor-gray4 bor-solid-1b Fwhite">开奖</p>
        </router-link>
        <router-link :to="{ name:'TicketRule', params:{ lotteryType: 'JXK3'} }">
          <p class="Fwhite">规则</p>
        </router-link>
      </div>

      <div class="dialogBg" @click="showType = false" v-show="showType == true"></div>
      <div class="wb100 text-center warpper-white" v-show="showType == true" style="position: fixed; z-index: 99;">
        <div class="pal15 par15 pat15 F14 bor-gray bor-solid-1t">
          <el-row :gutter="15">
            <el-col :span="8" v-for="(item,key) in playType" :key="key" class="mab15">
              <div class="wb100 h35px lh35px radius5" @click="changeType(key)" :class="key == playIndex ? 'warpper-red Fwhite pa1' : 'bor-gray bor-solid-1a Fgray-3'">
                {{item}}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="warpper-gray-3 wb100 h60px bor-solid-1t bor-solid-1b bor-gray">

        <div class="pal15 par15 relative text-center F14 lh20px Fgray-3 ">


          <div class="fl h25px lh25px wb50" style="padding-top: 2.5px">
            <p>距<span class="Fnum">{{current.number}}</span>期投注截止</p>
            <p class="Fred F16 Fnum">{{parseMins(timer)}}</p>
          </div>

          <div class="wb50 fr ">
            <div class="w15px fr " @click="switchHistory">
              <img src="~@/assets/images/arrow-down.png" class="w15px" v-show="showHistory == false" style="margin-top: 25px">
              <img src="~@/assets/images/arrow-up.png" class="w15px" v-show="showHistory == true" style="margin-top: 25px">
            </div>
            <!--<div class="clear"></div>-->
            <div class=" h30px lh30px center Fnum" style="width: 105px;">
              <p>{{prev.number}}期{{state}}</p>
              <p class="Fred F14">
                <template v-if="prev.imgs">
                  <img v-for="item in prev.imgs" :src="item" class="w30px fl mar5">
                </template>
                <template v-else>
                  <img v-for="item in [1,2,3]" src="~@/assets/images/sz_wh.png" class="w30px fl mar5">
                </template>
              </p>
            </div>
          </div>
        </div>

        <div class=" bor-gray bor-solid-1l h40px center" style=" width:1px;margin-top: 10px"></div>

      </div>

      <!--<div class="clear1"></div>-->

      <el-collapse-transition>
        <div v-show="showHistory">
          <div class="wb100">

            <template>
              <el-table
                :data="history"
                stripe
                style="width: 100%;z-index: -1">
                <el-table-column
                  prop="number"
                  label="期次"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="bonusCode"
                  label="开奖号码">
                  <template slot-scope="scope">
                    <div style="width: 105px; margin: 0 auto">
                      <p v-if="scope.row.sum">
                        <img v-for="item in scope.row.imgs" v-if="scope.row.imgs" :src="item" class="w30px fl mar5">
                        <!--<span class="Fred fl h30px lh30px">{{scope.row.bonusCode}}</span>-->
                      </p>
                      <p v-else>
                        <img v-for="item in [1,2,3]" src="~@/assets/images/sz_wh.png" class="w30px fl mar5">
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="bonusCode"
                  label="和值"
                  width="50">
                  <template slot-scope="scope">
                    <p v-if="scope.row.sum" class="Fnum">{{ scope.row.sum }}</p>
                    <p v-else>暂无</p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="bonusCode"
                  label="大小"
                  width="50">
                  <template slot-scope="scope">
                    <p v-if="scope.row.sum">{{ scope.row.sum > 9 ? '大' : '小' }}</p>
                    <p v-else>暂无</p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="bonusCode"
                  label="单双"
                  width="50">
                  <template slot-scope="scope">
                    <p v-if="scope.row.sum">{{ scope.row.sum %2 == 1 ? '单' : '双' }}</p>
                    <p v-else>暂无</p>
                  </template>
                </el-table-column>
              </el-table>
            </template>

            <div class="clear1"></div>
          </div>
        </div>
      </el-collapse-transition>

      <div class="clear1"></div>

      <div class="wb100">
        <p class=" Fgray-2 F14 pal15 par15">
          {{playTitle}}
        </p>

        <div class="pa15">

          <template v-if="playIndex == 0 || playIndex == 4 || playIndex == 5">
            <el-row :gutter="15">
              <el-col :span="6" v-for="(item,key) in options" :key="key" class="mab15">
                <div class="wb100 lh20px radius5 text-center" @click="selected(key)" :class="item.value == true ? 'warpper-red Fwhite pal1 par1 pat6 pab6' : 'bor-gray bor-solid-1a  pat5 pab5'">
                  <p class="F16 Fnum" :class="item.value == true ? 'Fwhite' : 'Fred'">{{item.num}}</p>
                  <p class="F12" :class="item.value == true ? 'Fwhite' : 'Fgray-2'" v-if="item.money">奖金 <span class="Fnum">{{item.money}}</span>元</p>
                </div>
              </el-col>
            </el-row>
            <template v-if="playIndex == 0">
              <div class="clear1"></div>
              <el-row :gutter="15" class="Fgray-3">
                <el-col :span="6" class="mab15">
                  <div class="wb100 h35px lh35px radius5 text-center" @click="quickSelected(1)" :class="quick.isBig == true ? 'warpper-red Fwhite pa1' : 'bor-gray bor-solid-1a'">
                    大
                  </div>
                </el-col>
                <el-col :span="6" class="mab15">
                  <div class="wb100 h35px lh35px radius5 text-center" @click="quickSelected(2)" :class="quick.isSmall == true ? 'warpper-red Fwhite pa1' : 'bor-gray bor-solid-1a'">
                    小
                  </div>
                </el-col>
                <el-col :span="6" class="mab15">
                  <div class="wb100 h35px lh35px radius5 text-center" @click="quickSelected(3)" :class="quick.isOdd == true ? 'warpper-red Fwhite pa1' : 'bor-gray bor-solid-1a'">
                    单
                  </div>
                </el-col>
                <el-col :span="6" class="mab15">
                  <div class="wb100 h35px lh35px radius5 text-center" @click="quickSelected(4)" :class="quick.isEven == true ? 'warpper-red Fwhite pa1' : 'bor-gray bor-solid-1a'">
                    双
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>

          <template v-if="playIndex == 1 || playIndex == 2 || playIndex == 3">
            <el-row :gutter="15">
              <el-col :span="4" v-for="(item,key) in options" :key="key" class="mab15">
                <div v-if="item.disable == true" class="wb100 radius5 warpper-gray-2 Fwhite text-center fl lh20px pal1 par1 pat6 pab6 Fnum">
                  {{item.num}}
                </div>
                <div class="wb100 lh20px radius5 text-center Fnum" v-else @click="selected(key,'options1')" :class="item.value == true ? 'warpper-red Fwhite pal1 par1 pat6 pab6' : 'bor-gray bor-solid-1a  pat5 pab5'">
                  <p class="F16" :class="item.value == true ? 'Fwhite' : 'Fred'">{{item.num}}</p>
                </div>
              </el-col>
            </el-row>

            <template v-if="playIndex == 2">
              <el-row :gutter="15">
                <el-col :span="6" v-for="(item,key) in options2" :key="key" class="mab15">
                  <div v-if="item.disable == true" class="wb100 radius5 warpper-gray-2 Fwhite text-center fl lh20px pal1 par1 pat6 pab6 Fnum">
                    {{item.num}}
                  </div>
                  <div class="wb100 lh20px radius5 text-center Fnum" v-else @click="selected(key,'options2')" :class="item.value == true ? 'warpper-red Fwhite pal1 par1 pat6 pab6' : 'bor-gray bor-solid-1a  pat5 pab5'">
                    <p class="F16" :class="item.value == true ? 'Fwhite' : 'Fred'">{{item.num}}</p>
                  </div>
                </el-col>
              </el-row>
            </template>
            <template v-if="playIndex == 3">
              <el-row :gutter="15">
                <el-col :span="6" v-for="(item,key) in options2" :key="key" class="mab15">
                  <div v-if="item.disable == true" class="wb100 radius5 warpper-gray-2 Fwhite text-center fl lh20px pal1 par1 pat6 pab6 Fnum">
                    {{item.num}}
                  </div>
                  <div class="wb100 lh20px radius5 text-center Fnum" v-else @click="selected(key,'options2')" :class="item.value == true ? 'warpper-red Fwhite pal1 par1 pat6 pab6' : 'bor-gray bor-solid-1a  pat5 pab5'">
                    <p class="F16" :class="item.value == true ? 'Fwhite' : 'Fred'">{{item.num}}</p>
                  </div>
                </el-col>
              </el-row>
            </template>

          </template>

          <template v-if="playIndex == 6 || playIndex == 7">
            <el-row :gutter="15">
              <el-col :span="24" v-for="(item,key) in options" :key="key" class="mab15">
                <div v-if="item.disable == true" class="wb100 radius5 warpper-gray-2 Fwhite text-center fl lh30px pal1 par1 pat6 pab6 Fnum">
                  {{item.num}}
                </div>
                <div class="wb100 lh30px radius5 text-center Fnum" v-else @click="selected(key,'options1')" :class="item.value == true ? 'warpper-red Fwhite pal1 par1 pat6 pab6' : 'bor-gray bor-solid-1a  pat5 pab5'">
                  <p class="F16" :class="item.value == true ? 'Fwhite' : 'Fred'">{{item.num}}</p>
                </div>
              </el-col>
            </el-row>
          </template>

        </div>

      </div>

      <div class="clear h65px"></div>


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


    </div>

  </div>
</template>

<style>
  .el-table th {
    background-color: #fff !important;
    text-align: center;
  }
  .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background-color: #fff !important;
  }
  .el-table .cell {
    text-align: center;
  }
</style>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'
  import Bg from '../../assets/images/bg-more.png'
  import sz1 from '../../assets/images/sz_1.png'
  import sz2 from '../../assets/images/sz_2.png'
  import sz3 from '../../assets/images/sz_3.png'
  import sz4 from '../../assets/images/sz_4.png'
  import sz5 from '../../assets/images/sz_5.png'
  import sz6 from '../../assets/images/sz_6.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        bgMore: Bg,
        showMore: false,
        _width: 0,
        _height: 0,
        nav: ['投注', '开奖', '规则'],
        currentNav: 0,
        state: '开奖结果',
        timer: 300,
        ticketID: '',
        timerID: 0,
        current: {
          number: '',
          endTime: ''
        },
        prev: {
          number: '',
          endTime: ''
        },
        playTitle: '',
        number: 0,
        lock: true,
        playType: ['和值', '二不同号', '三不同号', '二同号', '三同号', '二同号复选', '三同号通选', '三连号通选'],
        playIndex: 4,
        showHistory: false,
        showType: false,
        isEmpty: false,
        szIcons: [sz1, sz2, sz3, sz4, sz5, sz6],
        history: [],
        options: [],
        options2: [],
        quick: {
          isBig: false,
          isSmall: false,
          isOdd: false,
          isEven: false
        },
        lottery_type: 'JXK3',
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

//                _this.width = $(window).width();
//                _this.height = $(window).height();
//                _this._width = parseInt($(window).width());
//                _this._width2 = parseInt($(window).width());
//                _this._height = parseInt((_this._width + 30) * 160 / 375);
//
//                _this.width_ball = Math.floor((_this.width - 7 * 12 - 45) / 7);

        // console.log('getData');

        Interface.openAwardListByLotteryType(this.lottery_type, 1, 10, (data) => {
          if (data) {

            var _tmp = data.returnJSON.indexData;

            // console.log(_tmp);

            for (var i = 0; i < _tmp.length; i++) {

              if(Base.isNull(_tmp[i].bonusCode)){
                continue;
              }

              //快三
              var _balls4 = _tmp[i].bonusCode.split(',');

              var _sum = 0;

              for (var _i4 = 0; _i4 < _balls4.length; _i4++) {
                _sum += parseInt(_balls4[_i4]);
              }

              _tmp[i].sum = _sum;

              _tmp[i].balls = _balls4;
            }

            this.loading = false;

            this.notices = _tmp;
          }
        });
      },
      selected(i, type) {

        if (this.playIndex == 2) {
          //三不同号
          if (type == 'options1') {
            this.options[i].value = !this.options[i].value;
          }if (type == 'options2') {
            this.options2[i].value = !this.options2[i].value;

            this.calculate();
            return false;
          }
          //这里计算选中的值

          var _arr = [],
            _result = [],
            _result2 = [];

          for (var _i5 = 0; _i5 < this.options.length; _i5++) {
            if (this.options[_i5].value) _arr.push(this.options[_i5].num);
          }

          if (_arr.length == 0) {
            for (var j = 0; j < this.options2.length; j++) {
              this.options2[j].value = false;
            }
          }
          if (_arr.length == 1) {
            for (var _j = 0; _j < this.options2.length; _j++) {
              var _flag = false;
              if (this.options2[_j].num.indexOf(_arr[0]) != -1) {
                _flag = true;
              }
              if (_flag) {
                this.options2[_j].value = true;
                _result.push(this.options2[_j].num);
              }
            }
          }
          if (_arr.length == 2) {
            for (var _j2 = 0; _j2 < this.options2.length; _j2++) {
              var _flag2 = false;
              if (this.options2[_j2].num.indexOf(_arr[0]) != -1) {
                _flag2 = true;
              }
              if (_flag2) {
                _result.push(this.options2[_j2].num);
              }
            }
            for (var _j3 = 0; _j3 < _result.length; _j3++) {
              var _flag3 = false;
              if (_result[_j3].indexOf(_arr[1]) != -1) {
                _flag3 = true;
              }
              if (_flag3) {
                _result2.push(_result[_j3]);
              }
            }
            for (var _j4 = 0; _j4 < this.options2.length; _j4++) {
              var _flag4 = false;
              for (var _i6 = 0; _i6 < _result2.length; _i6++) {
                if (this.options2[_j4].num == _result2[_i6]) {
                  _flag4 = true;
                  break;
                }
              }
              if (_flag4) {
                this.options2[_j4].value = true;
              } else {
                this.options2[_j4].value = false;
              }
            }
          }

          if (_arr.length == 3) {
            for (var _j5 = 0; _j5 < this.options2.length; _j5++) {
              this.options2[_j5].value = false;
              if (this.options2[_j5].num == _arr.join('')) {
                this.options2[_j5].value = true;
              }
            }
          }

          if (_arr.length > 3) {
            //组合
            var _tmp = Base.group(_arr, 3);

            for (var _j6 = 0; _j6 < this.options2.length; _j6++) {
              var _flag5 = false;
              for (var _i7 = 0; _i7 < _tmp.length; _i7++) {
                if (this.options2[_j6].num == _tmp[_i7].join('')) {
                  _flag5 = true;
                  break;
                }
              }
              if (_flag5) {
                this.options2[_j6].value = true;
              } else {
                this.options2[_j6].value = false;
              }
            }
          }
        } else if (this.playIndex == 3) {
          //三不同号
          if (type == 'options1') {
            this.options[i].value = !this.options[i].value;
          }if (type == 'options2') {
            this.options2[i].value = !this.options2[i].value;
            this.calculate();
            return false;
          }

          var _arr3 = [],
            _result3 = [],
            _start = 0,
            _end = 0;

          for (var _i8 = 0; _i8 < this.options.length; _i8++) {
            if (this.options[_i8].value) _arr3.push(this.options[_i8].num);
          }

          for (var _j7 = 0; _j7 < this.options2.length; _j7++) {
            this.options2[_j7].value = false;
          }

          for (var _i9 = 0; _i9 < _arr3.length; _i9++) {
            if (_arr3[_i9] == '11') {
              _start = 0;
              _end = 5;
            }if (_arr3[_i9] == '22') {
              _start = 5;
              _end = 10;
            }if (_arr3[_i9] == '33') {
              _start = 10;
              _end = 15;
            }if (_arr3[_i9] == '44') {
              _start = 15;
              _end = 20;
            }if (_arr3[_i9] == '55') {
              _start = 20;
              _end = 25;
            }if (_arr3[_i9] == '66') {
              _start = 25;
              _end = 30;
            }
            for (var _i10 = _start; _i10 < _end; _i10++) {
              this.options2[_i10].value = true;
            }
          }
        } else {
          this.options[i].value = !this.options[i].value;
        }

        this.calculate();
      },
      quickSelected(type) {

        if (type == 1) {
          if (this.quick.isBig == true) {
            this.quick.isBig = false;
          } else {
            this.quick.isBig = true;
            this.quick.isSmall = false;
          }
        }if (type == 2) {
          if (this.quick.isSmall == true) {
            this.quick.isSmall = false;
          } else {
            this.quick.isSmall = true;
            this.quick.isBig = false;
          }
        }if (type == 3) {
          if (this.quick.isOdd == true) {
            this.quick.isOdd = false;
          } else {
            this.quick.isOdd = true;
            this.quick.isEven = false;
          }
        }if (type == 4) {
          if (this.quick.isEven == true) {
            this.quick.isEven = false;
          } else {
            this.quick.isEven = true;
            this.quick.isOdd = false;
          }
        }

        var _tmp = [];

        //和值
        _tmp.push({
          num: 4,
          value: false,
          disable: false,
          money: 80
        });
        _tmp.push({
          num: 5,
          value: false,
          disable: false,
          money: 40
        });
        _tmp.push({
          num: 6,
          value: false,
          disable: false,
          money: 25
        });
        _tmp.push({
          num: 7,
          value: false,
          disable: false,
          money: 16
        });
        _tmp.push({
          num: 8,
          value: false,
          disable: false,
          money: 12
        });
        _tmp.push({
          num: 9,
          value: false,
          disable: false,
          money: 10
        });
        _tmp.push({
          num: 10,
          value: false,
          disable: false,
          money: 9
        });
        _tmp.push({
          num: 11,
          value: false,
          disable: false,
          money: 9
        });
        _tmp.push({
          num: 12,
          value: false,
          disable: false,
          money: 10
        });
        _tmp.push({
          num: 13,
          value: false,
          disable: false,
          money: 12
        });
        _tmp.push({
          num: 14,
          value: false,
          disable: false,
          money: 16
        });
        _tmp.push({
          num: 15,
          value: false,
          disable: false,
          money: 25
        });
        _tmp.push({
          num: 16,
          value: false,
          disable: false,
          money: 40
        });
        _tmp.push({
            num: 17,
            value: false,
            disable: false,
            money: 80
        });

        //大
        if (this.quick.isBig) {
          for (var i = 0; i < _tmp.length; i++) {
            if (i > 6) {
              _tmp[i].value = true;
            }
          }
        }
        if (this.quick.isSmall) {
          for (var _i11 = 0; _i11 < _tmp.length; _i11++) {
            if (_i11 < 7) {
              _tmp[_i11].value = true;
            }
          }
        }
        if (this.quick.isOdd) {

          if (!this.quick.isBig && !this.quick.isSmall) {
            _tmp = [];
            _tmp.push({
              num: 4,
              value: true,
              disable: false,
              money: 80
            });
            _tmp.push({
              num: 5,
              value: true,
              disable: false,
              money: 40
            });
            _tmp.push({
              num: 6,
              value: true,
              disable: false,
              money: 25
            });
            _tmp.push({
              num: 7,
              value: true,
              disable: false,
              money: 16
            });
            _tmp.push({
              num: 8,
              value: true,
              disable: false,
              money: 12
            });
            _tmp.push({
              num: 9,
              value: true,
              disable: false,
              money: 10
            });
            _tmp.push({
              num: 10,
              value: true,
              disable: false,
              money: 9
            });
            _tmp.push({
              num: 11,
              value: true,
              disable: false,
              money: 9
            });
            _tmp.push({
              num: 12,
              value: true,
              disable: false,
              money: 10
            });
            _tmp.push({
              num: 13,
              value: true,
              disable: false,
              money: 12
            });
            _tmp.push({
              num: 14,
              value: true,
              disable: false,
              money: 16
            });
            _tmp.push({
              num: 15,
              value: true,
              disable: false,
              money: 25
            });
            _tmp.push({
              num: 16,
              value: true,
              disable: false,
              money: 40
            });
            _tmp.push({
              num: 17,
              value: true,
              disable: false,
              money: 80
            });
          }

          for (var _i12 = 0; _i12 < _tmp.length; _i12++) {
            if (_i12 % 2 == 0) {
              _tmp[_i12].value = false;
            }
          }
        }

        if (this.quick.isEven) {

          if (!this.quick.isBig && !this.quick.isSmall) {
            _tmp = [];
            _tmp.push({
              num: 4,
              value: true,
              disable: false,
              money: 80
            });
            _tmp.push({
              num: 5,
              value: true,
              disable: false,
              money: 40
            });
            _tmp.push({
              num: 6,
              value: true,
              disable: false,
              money: 25
            });
            _tmp.push({
              num: 7,
              value: true,
              disable: false,
              money: 16
            });
            _tmp.push({
              num: 8,
              value: true,
              disable: false,
              money: 12
            });
            _tmp.push({
              num: 9,
              value: true,
              disable: false,
              money: 10
            });
            _tmp.push({
              num: 10,
              value: true,
              disable: false,
              money: 9
            });
            _tmp.push({
              num: 11,
              value: true,
              disable: false,
              money: 9
            });
            _tmp.push({
              num: 12,
              value: true,
              disable: false,
              money: 10
            });
            _tmp.push({
              num: 13,
              value: true,
              disable: false,
              money: 12
            });
            _tmp.push({
              num: 14,
              value: true,
              disable: false,
              money: 16
            });
            _tmp.push({
              num: 15,
              value: true,
              disable: false,
              money: 25
            });
            _tmp.push({
              num: 16,
              value: true,
              disable: false,
              money: 40
            });
            _tmp.push({
              num: 17,
              value: true,
              disable: false,
              money: 80
            });
          }

          for (var _i13 = 0; _i13 < _tmp.length; _i13++) {
            if (_i13 % 2 == 1) {
              _tmp[_i13].value = false;
            }
          }
        }

        this.options = _tmp;
        this.calculate();
      },
      calculate() {

        var result = 0;

        var _count1 = 0;
        var _arr1 = [];
        var _count2 = 0;
        var _arr2 = [];

        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].value) {
            _count1++;
            _arr1.push(this.options[i].num);
          }
        }
        for (var _i14 = 0; _i14 < this.options2.length; _i14++) {
          if (this.options2[_i14].value) {
            _count2++;
            _arr2.push(this.options2[_i14].num);
          }
        }

        if (this.playIndex == 0) {
          result = _count1;
        }if (this.playIndex == 1) {
          //组合并计算注数
          if (_arr1.length > 1) {
            var _tmp = Base.group(_arr1, 2);
            result = _tmp.length;
          }
        }if (this.playIndex == 2) {
          result = _count2;
        }if (this.playIndex == 3) {
          result = _count2;
        }if (this.playIndex == 4) {
          result = _count1;
        }if (this.playIndex == 5) {
          result = _count1;
        }if (this.playIndex == 6) {
          result = _count1;
        }if (this.playIndex == 7) {
          result = _count1;
        }

        this.number = Math.ceil(result);

        if (this.number > 0) {
          this.lock = false;
        } else {
          this.lock = true;
        }

        return this.number;
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

        var _count1 = 0;
        var _arr1 = [];
        var _count2 = 0;
        var _arr2 = [];

        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].value) {
            _count1++;
            _arr1.push(this.options[i].num + '');
          }
        }
        for (var _i15 = 0; _i15 < this.options2.length; _i15++) {
          if (this.options2[_i15].value) {
            _count2++;
            _arr2.push(this.options2[_i15].num + '');
          }
        }

        var ticket = window.sessionStorage.getItem("q3_ticket");

        var _tmp = {};

        if (this.playIndex == 2 || this.playIndex == 3) {
          _tmp = _arr2;
        } else {
          _tmp = _arr1;
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
            numbers: _tmp,
            playType: this.playIndex
          });

          window.sessionStorage.setItem('q3_ticket', JSON.stringify(ticket));

        } else {
          //编辑
          Base.editTicketByID(this.ticketID, 'q3', {
            num: this.number,
            numbers: _tmp,
            playType: this.playIndex
          });
        }

        this.$router.push({ name: 'LotteryQ3Order', params: { playIndex : this.playIndex } });

      },
      randomSelect() {

        this.init();
        var rd = 0;
        if (this.playIndex == 0) {
          rd = Base.random_num(0, 13);
          this.options[rd].value = true;
        } else if (this.playIndex == 1) {
          var _tmp = [];
          _tmp.push(Base.random_num(0, 5));
          for (var i = 0; i < 1; i++) {
            var _rd = Base.random_num(0, 5);
            var _flag = true;
            for (var _i16 = 0; _i16 < _tmp.length; _i16++) {
              if (_rd == _tmp[_i16]) {
                _flag = false;
              }
            }
            if (_flag) {
              _tmp.push(_rd);
            } else {
              i--;
            }
          }
          this.init();
          this.options[_tmp[0]].value = true;
          this.options[_tmp[1]].value = true;
        } else if (this.playIndex == 2) {
          rd = Base.random_num(0, 19);
          this.options2[rd].value = true;
        } else if (this.playIndex == 3) {
          rd = Base.random_num(0, 29);
          this.options2[rd].value = true;
        } else if (this.playIndex == 4 || this.playIndex == 5) {
          rd = Base.random_num(0, 5);
          this.options[rd].value = true;
        }

        this.calculate();
      },
      swicthType() {
        this.showType = !this.showType;
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
      changeType(key) {
        this.playIndex = key;
        this.showType = false;
        this.init();
      },
      myBack() {
          this.$router.go(-1);
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
      clearSelect() {

        if (Base.isNull(this.ticketID)) {
          this.init();
        } else {

          Base.delTicketByID(this.ticketID, 'q3');

          setTimeout( () => {
              this.$router.replace({ name: 'LotteryQ3' });
          }, 100);

          this.init();

        }

      },
      getAwardPeriod() {

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

                _tmp[i].number = _tmp[i].number.substring(_tmp[i].number.length - 2);

                if (!Base.isNull(_tmp[i].bonusCode)) {
                  var _t = _tmp[i].bonusCode.split(',');

                  if (!Base.isNull(_tmp[i].bonusCode)) {
                    var _sum = 0;
                    for (var j = 0; j < _t.length; j++) {
                      if (_tmp[i].imgs) {
                        _tmp[i].imgs.push(this.szIcons[_t[j] - 1]);
                      } else {
                        _tmp[i].imgs = [];
                        _tmp[i].imgs.push(this.szIcons[_t[j] - 1]);
                      }
                      _sum += parseInt(_t[j]);
                    }
                    _tmp[i].sum = _sum;
                  }
                }
              }

              this.history = _tmp.reverse();

              var _timer = 0;

              var _now = new Date().getTime();

              _timer = Math.round((Base.get_unix_time(_tmp[0].stopTime) - _now) / 1000);
    //
    //                    console.log(Base.get_unix_time(_tmp[0].stopTime));
    //                    console.log(_now);
    //                    console.log(_timer);
    //
    //                    return false;

              if (_timer > 600) {
                //下一期
                _timer = Math.round((Base.get_unix_time(_tmp[1].stopTime) - _now) / 1000);

                this.current = _tmp[1];
                this.prev = _tmp[2];
              } else {
                this.current = _tmp[0];
                this.prev = _tmp[1];
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

              this.timerID = setInterval( () => {
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
      init() {

        this.currentNav = 0;
        var _tmp = [];
        var _tmp2 = [];
        var _tmp3 = [];
        if (this.playIndex == 0) {
          //和值
          _tmp.push({
            num: 4,
            value: false,
            disable: false,
            money: 80
          });
          _tmp.push({
            num: 5,
            value: false,
            disable: false,
            money: 40
          });
          _tmp.push({
            num: 6,
            value: false,
            disable: false,
            money: 25
          });
          _tmp.push({
            num: 7,
            value: false,
            disable: false,
            money: 16
          });
          _tmp.push({
            num: 8,
            value: false,
            disable: false,
            money: 12
          });
          _tmp.push({
            num: 9,
            value: false,
            disable: false,
            money: 10
          });
          _tmp.push({
            num: 10,
            value: false,
            disable: false,
            money: 9
          });
          _tmp.push({
            num: 11,
            value: false,
            disable: false,
            money: 9
          });
          _tmp.push({
            num: 12,
            value: false,
            disable: false,
            money: 10
          });
          _tmp.push({
            num: 13,
            value: false,
            disable: false,
            money: 12
          });
          _tmp.push({
            num: 14,
            value: false,
            disable: false,
            money: 16
          });
          _tmp.push({
            num: 15,
            value: false,
            disable: false,
            money: 25
          });
          _tmp.push({
            num: 16,
            value: false,
            disable: false,
            money: 40
          });
          _tmp.push({
            num: 17,
            value: false,
            disable: false,
            money: 80
          });

          this.options = _tmp;

          this.quick = {
            isBig: false,
            isSmall: false,
            isOdd: false,
            isEven: false
          };
        }if (this.playIndex == 1) {
          //二不同号
          for (var i = 1; i < 7; i++) {
            _tmp.push({
              num: i,
              value: false,
              disable: false
            });
          }
          this.options = _tmp;
        }
        if (this.playIndex == 2) {
          //三不同号
          var _arr = [];
          var _options2 = [];
          for (var _i17 = 1; _i17 < 7; _i17++) {
            _tmp.push({
              num: _i17,
              value: false,
              disable: false
            });
            _arr.push(_i17);
          }
          this.options = _tmp;

          _arr = Base.group(_arr, 3);

          //重组_arr
          for (var _i18 = 0; _i18 < _arr.length; _i18++) {
            _options2.push({
              num: _arr[_i18].join(''),
              value: false,
              disable: false
            });
          }
          this.options2 = _options2;
        }

        if (this.playIndex == 3) {
          //二同号
          var _arr4 = [];
          var _options = [];
          var _options3 = [];
          for (var _i19 = 1; _i19 < 7; _i19++) {
            _tmp.push({
              num: _i19 + _i19 * 10,
              value: false,
              disable: false
            });
            _arr4.push({
              num: _i19,
              val: _i19 + _i19 * 10
            });
          }
          this.options = _tmp;

          for (var _i20 = 0; _i20 < _arr4.length; _i20++) {
            for (var j = 1; j < 7; j++) {
              if (_arr4[_i20].num != j) _options.push(_arr4[_i20].val + '' + j);
            }
          }

          //重组_arr
          for (var _i21 = 0; _i21 < _options.length; _i21++) {

            _options3.push({
              num: _options[_i21],
              value: false,
              disable: false
            });
          }
          this.options2 = _options3;
        }
        if (this.playIndex == 4) {
          //三同号
          for (var _i22 = 1; _i22 < 7; _i22++) {
            _tmp.push({
              num: _i22 + _i22 * 10 + _i22 * 100,
              value: false,
              disable: false
            });
          }
          this.options = _tmp;
        }
        if (this.playIndex == 5) {
          //二同号复选
          for (var _i23 = 1; _i23 < 7; _i23++) {
            _tmp.push({
              num: _i23 + _i23 * 10 + '*',
              value: false,
              disable: false
            });
          }
          this.options = _tmp;
        }
        if (this.playIndex == 6) {
          //三同号通选
          _tmp.push({
            num: '三同号通选',
            value: false,
            disable: false
          });
          this.options = _tmp;
        }
        if (this.playIndex == 7) {
          //三同号连选
          _tmp.push({
            num: '三连号通选',
            value: false,
            disable: false
          });
          this.options = _tmp;
        }

        if (this.playIndex == 0) {
          this.playTitle = '猜开奖号码相加的和';
        }if (this.playIndex == 1) {
          this.playTitle = '二不同号';
        }if (this.playIndex == 2) {
          this.playTitle = '三不同号';
        }if (this.playIndex == 3) {
          this.playTitle = '二同号';
        }if (this.playIndex == 4) {
          this.playTitle = '三同号';
        }if (this.playIndex == 5) {
          this.playTitle = '二同号复选';
        }if (this.playIndex == 6) {
          this.playTitle = '三同号通选';
        }if (this.playIndex == 7) {
          this.playTitle = '三连号通选';
        }

        this.number = 0;
        this.lock = true;
      }
    },

    mounted(){

      let lottery_type = window.sessionStorage.getItem("q3PlayType");

      if(Base.isNull(lottery_type)){
        //默认值
        lottery_type = 'JXK3';
      }

      this.lottery_type = lottery_type;

      this.width = $(window).width();
      this.height = $(window).height();

      this.showMore = false;

      this.width_ball = Math.floor((this.width - 6 * 12 - 30) / 7);

      this.getAwardPeriod();

      let _ticketID = this.$route.query.ticketID;

      if (Base.isNull(_ticketID)) {
        //初始化

        let _playIndex = this.$route.params.playIndex;

        if (Base.isNull(_playIndex)) {
          _playIndex = 0;
        }
        this.playIndex = _playIndex;

        this.init();

      } else {
        this.ticketID = _ticketID;

        var _ticket = Base.getTicketByID(_ticketID, 'q3');

        if (Base.isNull(_ticket)) {
          //空数据
        } else {
          var _data = _ticket;

          this.playIndex = _data.playType;

          this.init();

          if (_data.playType == 0 || _data.playType == 1 || _data.playType == 4 || _data.playType == 5) {
            for (var i = 0; i < this.options.length; i++) {
              for (var j = 0; j < _data.numbers.length; j++) {
                if (this.options[i].num == _data.numbers[j]) {
                  this.options[i].value = true;
                }
              }
            }
          }

          if (_data.playType == 2 || _data.playType == 3) {
            for (var _i24 = 0; _i24 < this.options2.length; _i24++) {
              for (var _j8 = 0; _j8 < _data.numbers.length; _j8++) {
                if (this.options2[_i24].num == _data.numbers[_j8]) {
                  this.options2[_i24].value = true;
                }
              }
            }
          }
          if (_data.playType == 6 || _data.playType == 7) {
            if (_data.numbers.length > 0) {
              this.options[0].value = true;
            }
          }

          this.calculate();
        }
      }

//      _this.getData();

    }

  }


</script>

