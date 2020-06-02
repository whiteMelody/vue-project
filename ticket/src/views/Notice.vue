<template>
  <div id="notice_page">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'开奖公告'" :back="true"></navTitle>


    <div class="wb100">
      <div class="wb100">

        <div class="clear"></div>

        <div class="pal15">

          <template v-for="item in notices">

            <div class="clear1"></div>
            <p class="h30px lh30px Fgray-3">{{item.lotteryTitle}}</p>
            <p class="h20px lh20px Fgray-2 F14">第{{item.number}}期 | 开奖时间：{{item.officialStopTime}}</p>
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

</template>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  import sz1 from '../assets/images/sz_1.png'
  import sz2 from '../assets/images/sz_2.png'
  import sz3 from '../assets/images/sz_3.png'
  import sz4 from '../assets/images/sz_4.png'
  import sz5 from '../assets/images/sz_5.png'
  import sz6 from '../assets/images/sz_6.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        active: 2,
        width: 0,
        _width: 0,
        _width2: 0,
        height: 0,
        _height: 0,
        width_ball: 0,
        szIcons: [sz1, sz2, sz3, sz4, sz5, sz6],
        back: true,
        title: '开奖公告',
        back_url: 'index.html',
        ball: [{type: 'red', num: '9'}, {type: 'red', num: '8'}, {type: 'red', num: '7'}, {
          type: 'red',
          num: '6'
        }, {type: 'red', num: '5'}, {type: 'blue', num: '4'}, {type: 'blue', num: '3'}],
        notices: []
      }
    },

    methods: {
      toLottery(item){
        if(item.lotteryTitle.indexOf('双色球')!= -1){
          //双色球
          this.$router.push({ name: 'LotterySsq', params: { playIndex : 0 } });
          window.sessionStorage.setItem("ssqPlayType", item.lotteryType);
        }else if(item.lotteryTitle.indexOf('快三')!= -1 || item.lotteryTitle.indexOf('快3')!= -1){
          //快三系列
          this.$router.push({ name: 'LotteryQ3', params: { playIndex : 0 } });
          window.sessionStorage.setItem("q3PlayType", item.lotteryType);
        }else if(item.lotteryTitle.indexOf('11')!= -1){
          //11选5系列
          this.$router.push({ name: 'LotteryD11', params: { playIndex : 0 } });
          window.sessionStorage.setItem("d11PlayType", item.lotteryType);
        }else if(item.lotteryTitle.indexOf('大乐透')!= -1){
          //大乐透
          this.$router.push({ name: 'LotteryDlt', params: { playIndex : 0 } });
          window.sessionStorage.setItem("dltPlayType", item.lotteryType);
        }

      },

      getSum(arr){
        let _s = 0;
        for(let i=0; i<arr.length; i++){
          _s += Number.parseInt(arr[i]);
        }
        return _s;
      },

    },

    mounted(){

      this.width = $(window).width();
      this.height = $(window).height();
      this._width = parseInt($(window).width());
      this._width2 = parseInt($(window).width());
      this._height = parseInt((this._width + 30) * 160 / 375);

      this.width_ball = Math.floor((this.width - 7 * 12 - 45) / 7);

      Interface.openAwardList( (data) => {

          if (data) {

            var _tmp = data.returnJSON;

            for (var i = 0; i < _tmp.length; i++) {

              if(Base.isNull(_tmp[i].bonusCode)){
                _tmp[i].empty = true;
                continue;
              }

              let _type = Base.getLotteryType(_tmp[i].lotteryType).type;

              _tmp[i].type = _type;

              if (_type == 1) {
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
              } else if (_type == 4) {
                //大乐透
                var _bonus2 = _tmp[i].bonusCode;

                var _reds = _bonus2.split('#')[0].split(',');
                var _blue = _bonus2.split('#')[1].split(',');;

                var _balls2 = [];

                for (var _i2 = 0; _i2 < _reds.length; _i2++) {
                  _balls2.push({
                    type: 'red',
                    num: _reds[_i2]
                  });
                }
                _balls2.push({
                  type: 'blue',
                  num: _blue[0]
                });
                _balls2.push({
                  type: 'blue',
                  num: _blue[1]
                });

                _tmp[i].balls = _balls2;
              } else {
                var _balls3 = _tmp[i].bonusCode.split(',');
                _tmp[i].balls = _balls3;
              }
            }

            this.notices = data.returnJSON;
          }

        this.fullscreenLoading = false;

      });

    }
  }

</script>

