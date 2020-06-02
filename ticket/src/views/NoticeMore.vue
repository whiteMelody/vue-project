<template>
  <div id="notice_page">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'更多开奖公告'" :back="true"></navTitle>

    <div class="wb100">

      <div class="clear"></div>

      <div class="wb100">


        <div class="pal15" >
          <div class="wb100" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
            <div v-for="item in notices">

              <div class="clear1"></div>
              <p class="h20px lh20px F14"><span style="color:#222222 ">第{{item.number}}期 |</span> <span style="color: #686868">{{item.officialStopTime}}</span></p>
              <div class="clear1"></div>
              <div class="wb100" v-if="_type == 1 || _type == 4">

                <template v-if="item.empty">

                  <template v-if="_type == 1">
                    <div class="Fwhite radius50per text-center fl mar10 warpper-red" v-for="item in [0,1,2,3,4,5]" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                      ?
                    </div>
                    <div class="Fwhite radius50per text-center fl mar10 warpper-blue" v-for="item in [0]" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                      ?
                    </div>
                  </template>

                  <template v-if="_type == 4">
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
                    <div class="Fwhite radius50per text-center fl mar10 Fnum" v-if="_type == 1" :class="item2.type == 'red' ? 'warpper-red' : 'warpper-blue'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                      {{item2.num}}
                    </div>
                    <div class="Fwhite radius50per text-center fl mar10 Fnum" :class="item2.type == 'red' ? 'warpper-red' : 'warpper-blue'" v-if="_type == 4" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                      {{item2.num}}
                    </div>
                  </template>

                </template>

                <!--<div class="fr" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
                <!--<img src="~@/assets/images/arrow-down.png" class="fr mar15" :style="'height:'+ (width_ball/2) +'px; margin-top: '+ (width_ball/4) +'px;'">-->
                <!--</div>-->
                <div class="clear"></div>
              </div>

              <div class="wb100" v-if="_type == 3">

                <template v-if="item.empty">
                  <div class="Fwhite radius50per text-center fl mar10 warpper-red" v-for="item in [0,1,2,3,4]" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                    ?
                  </div>
                </template>

                <template v-else>
                  <template v-for="(item2,key2) in item.balls">
                    <div class="Fwhite radius50per text-center fl mar10 warpper-red Fnum" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                      {{item2.num}}
                    </div>
                  </template>
                </template>
                <!--<div class="fr" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
                <!--<img src="~@/assets/images/arrow-down.png" class="fr mar15" :style="'height:'+ (width_ball/2) +'px; margin-top: '+ (width_ball/4) +'px;'">-->
                <!--</div>-->
                <div class="clear"></div>
              </div>

              <div class="wb100" v-if="_type == 2">
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

                <div class="fl w80px lh40px h40px mal20 F16 Fgray-3" v-if="item.empty">

                </div>

                <div class="fl w80px lh40px h40px mal20 F16 Fgray-3" v-else>
                  和值：<span class="Fred Fnum">{{item.sum}}</span>
                </div>

                <!--<div class="fr" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
                <!--<img src="~@/assets/images/arrow-down.png" class="fr mar15" :style="'height:'+ (width_ball/2) +'px; margin-top: '+ (width_ball/4) +'px;'">-->
                <!--</div>-->
                <div class="clear"></div>
              </div>

              <div class="clear1 bor-gray bor-solid-1b"></div>

            </div>
          </div>
        </div>

        <div class="clear"></div>

        <template v-if="last == true">
          <div class="wb100 warpper-gray-3 Fgray-3">
            <div class="text-center warpper-black-4 Fgray-6 h40px lh40px center w120px F14" >
              <span class="fl mal10">暂无更多数据</span>
            </div>
          </div>
        </template>
        <template v-else-if="empty == true">
          <div class="wb100 text-center Fgray-3">
            <div class="clear1"></div>
            <p class="F16 lh25px h25px">还没有开奖公告~</p>
            <div class="clear1"></div>
          </div>
        </template>
        <template v-else>
          <div class="wb100" v-show="loading">
            <div class="text-center Fgray-3 h40px lh40px center w120px F14">
              <img src="~@/assets/images/loading-2.gif" class="h20px fl mat10">
              <span class="fl mal10">数据加载中...</span>
            </div>
          </div>
        </template>

        <div class="clear"></div>

      </div>

      <div class="clear h80px" v-if="call != ''"></div>

      <div class="wb100 fixed warpper-white" style="bottom: 0;" v-if="call != ''">
        <div class="pa15">
          <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="toLottery">
            立即投注
          </div>
        </div>
      </div>

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
        width: 0,
        _width: 0,
        _width2: 0,
        height: 0,
        _height: 0,
        width_ball: 0,
        page: 0,
        pageSize: 20,
        title: '',
        lotteryType: '',
        _type: 1,
        call: '',
        szIcons: [sz1, sz2, sz3, sz4, sz5, sz6],
        notices: [],
        loading: true,
        empty: false,
        last: false
      }
    },

    methods: {

      getData() {

        var _this = this;

        _this.loading = true;

        if(_this.last || _this.empty){
          _this.loading = false;
          if(_this.page == 0){
            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,0);
            },100);
          }
          return ;
        }

        _this.page ++;

        Interface.openAwardListByLotteryType(this.lotteryType, this.page, this.pageSize, (data) => {
          if (data) {

            var _tmp = data.returnJSON.indexData;

            if (data.returnJSON.indexData.length == 0) {
              if(_this.page == 1){
                _this.empty = true;
              }else{
                _this.empty = false;
                _this.last = true;
              }
            } else {
              if(data.returnJSON.indexData.length < _this.pageSize){
                _this.empty = false;
                _this.last = true;
              }
            }

            for (var i = 0; i < _tmp.length; i++) {

              if(Base.isNull(_tmp[i].bonusCode)){
                _tmp[i].empty = true;
                continue;
              }

              let _type = Base.getLotteryType(_tmp[i].lotteryType).type;

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
              }
              if (_type == 4) {
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
              }
              if (_type == 3) {
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
              if (_type == 2) {
                //快三
                var _balls4 = _tmp[i].bonusCode.split(',');

                var _sum = 0;

                for (var _i4 = 0; _i4 < _balls4.length; _i4++) {
                  _sum += parseInt(_balls4[_i4]);
                }

                _tmp[i].sum = _sum;

                _tmp[i].balls = _balls4;
              }
            }

            this.notices = this.notices.concat(_tmp);

            this.loading = false;

            if(_this.page == 1){
              setTimeout( ()=> {
                _this.fullscreenLoading = false;
                window.scrollTo(0,0);
              },100);
            }

          }
        });
      },
      toLottery() {
        if (this._type == 1) {
          this.$router.push({ name: 'LotterySsq', params: { playIndex : 0 } });
        }if (this._type == 4) {
          this.$router.push({ name: 'LotteryDlt', params: { playIndex : 0 } });
        }if (this._type == 2) {
          this.$router.push({ name: 'LotteryQ3', params: { playIndex : 0 } });
        }if (this._type == 3) {
          this.$router.push({ name: 'LotteryD11', params: { playIndex : 0 } });
        }
      }

    },

    mounted(){

      this.width = $(window).width();
      this.height = $(window).height();
      this._width = parseInt($(window).width());
      this._width2 = parseInt($(window).width());
      this._height = parseInt((this._width + 30) * 160 / 375);

      this.width_ball = Math.floor((this.width - 7 * 12 - 45) / 7);

      var _lotteryType = this.$route.query.lotteryType;

      if (Base.isNull(_lotteryType)) {
        _lotteryType = 'ssq';
      }

      let _tmp = Base.getLotteryType(_lotteryType);

      this.title = _tmp.name;

      this._type = _tmp.type;

      this.lotteryType = _lotteryType;

      this.getData();

    }

  }


</script>

