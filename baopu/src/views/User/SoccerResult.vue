<template>

  <div id="soccer_result_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'中奖结果'" :back="true"></navTitle>

    <!--中奖-->
    <template v-if="match.status == 2">
      <div class="wb100" :style="'background: url('+ bg[0] +') 0% 0% / 100% 100%;'">

        <div class="clear h20px"></div>

        <div class="wb20 center img-area">
          <img :src="user.photoUrl ? user.photoUrl : userHead" class="radius50per" style="border: 3px solid #EE542C;">
        </div>

        <div class="wb60 center img-area" style="margin-top: -10px;">
          <img src="~@/assets/images/cz.png">
        </div>

        <p class="text-center Forange-2 lh30px"> <span class="Fnum F24">+{{ twoDecimal(match.bonus) }}</span> 金币</p>

        <div class="clear h20px"></div>
      </div>
    </template>

    <!--未中奖-->
    <template v-else-if="match.status == 3">
      <div class="wb100" :style="'background: url('+ bg[1] +') 0% 0% / 100% 100%;'">

        <div class="clear h20px"></div>

        <div class="wb20 center img-area">
          <img :src="user.photoUrl ? user.photoUrl : userHead" class="radius50per" style="border: 3px solid #5F6B84;">
        </div>

        <div class="wb60 center img-area" style="margin-top: -10px;">
          <img src="~@/assets/images/wz.png">
        </div>

        <p style="color: #5F6B84" class="text-center lh30px">别灰心，再接再厉~</p>

        <div class="clear h20px"></div>
      </div>
    </template>

    <!--等待开奖-->
    <template v-else-if="match.status == 0 || match.status == 1">
      <div class="wb100" :style="'background: url('+ bg[2] +') 0% 0% / 100% 100%;'">

        <div class="clear h20px"></div>

        <div class="wb15 center img-area">
          <img :src="user.photoUrl ? user.photoUrl : userHead" class="radius50per" style="border: 2px solid #5F6B84;">
        </div>

        <div class="wb50 center img-area" style="margin-top: -10px;">
          <img src="~@/assets/images/ddkj.png">
        </div>

        <div class="clear h20px"></div>
      </div>
    </template>

    <!--其他情况 退款-->
    <template v-else>
      <div class="wb100" :style="'background: url('+ bg[3] +') 0% 0% / 100% 100%;'">

        <div class="clear h30px"></div>

        <div class="wb30 center img-area" style="margin-top: -10px;">
          <img src="~@/assets/images/bsqx.png">
        </div>

        <div class="clear1"></div>

        <p class="Fgray-6 text-center">比赛取消，已退款</p>

        <div class="clear h30px"></div>
      </div>
    </template>

    <div class="clear"></div>

    <div class="wb100 warpper-black-3">

      <template v-if="match.lotTip == '单关'">
        <div class="pa15 Fgray-5 bor-black3 bor-solid-1b bor-solid-1t">

          <p class="lh35px h35px">
            <span class="fl warpper-black-5 pal10 par10 h25px lh25px mat5 mar10 radius4">{{match.lotTip}}</span>

            <span class="fl F18">{{match.subtitle}}</span>
          </p>

          <p style="padding-left: 62px;" class="F14 Fgray-6 lh25px">
            比赛时间：<span class="Fgray-5 Fnum">{{match.lines[0].matchTime}}</span>
          </p>

          <div class="clear"></div>

        </div>

        <div class="clear"></div>

        <div class="pal15 lh45px Fgray-6">
          <p>竞猜玩法：<span class="Fgray-5">{{getLotType(match.lines[0].lotType)}}</span></p>
          <p>竞猜选项：<span class="Forange-2">{{getLotValue(match.lines[0].lotType, match.lines[0].anteValue)}}</span></p>

          <template v-if="match.lines[0].lineStatus == 4 || match.lines[0].lineStatus == 5 || match.lines[0].lineStatus == 6 || match.lines[0].lineStatus == 7">
            <p>比赛结果：<span class="Fgray-5">比赛取消</span></p>
          </template>
          <template v-else>
            <p>比赛结果：<span :class="match.lines[0].lineStatus == 2 ? 'Forange-2' : 'Fgray-5'">{{match.lines[0].raceResult || '— —'}}</span></p>
          </template>

          <p>投注金币：<span class="Fgray-5 Fnum">{{match.lotMoney}}</span></p>
          <p>竞猜赔率：<span class="Fgray-5">{{match.lines[0].lossRatio}}</span></p>
          <p>竞猜时间：<span class="Fgray-5 Fnum">{{match.payTime}}</span></p>
          <p>方案编号：<span class="Fgray-5 Fnum">{{match.orderNo}}</span></p>
        </div>
      </template>

      <template v-else>
        <div class="pa15 Fgray-5 bor-black3 bor-solid-1b bor-solid-1t">
          <p class="lh35px h35px relative" style="padding-left: 65px;">
            <span class="fl warpper-red-8 pal10 par10 h25px lh25px mat5 mar10 radius4 absolute" style="top:0; left: 0;">{{match.lotTip}}</span>
            <span class="fl F18 text-over-hidden1">{{match.subtitle}}</span>
          </p>
        </div>

        <div class="clear"></div>

        <div class="pal15 lh45px Fgray-6">
          <p>竞猜玩法：普通串关</p>

          <div class="par15">

            <div class="wb100 Fgray-6 text-center h45px lh45px" style="background: #313649;">
              <div class="wb40 fl">主队VS客队</div>
              <div class="wb30 fl">投注内容</div>
              <div class="wb30 fl">开奖结果</div>
            </div>

            <template v-for="item in match.lines">
              <div class="wb100 text-center">
                <div class="wb40 fl pat5 pab5">
                  <p class="text-over-hidden1 h25px lh25px Fgray-6 F14">{{item.homeTeam}} VS {{item.awayTeam}}</p>
                  <p class="lh15px F12 Fgray-6">{{dateFormat(item.matchTime)}}</p>
                </div>
                <div class="wb30 fl lh50px Fnum" :class="item.lineStatus == 2 ? 'Forange-2' : 'Fgray-5'">
                  {{getLotValue(item.lotType, item.anteValue)}}

                  <template v-if="item.lotType == 1">
                    (<span v-if="item.letBall > 0 ">+ {{item.letBall}}</span><span v-else-if="item.letBall < 0 ">{{item.letBall}}</span>)
                  </template>

                </div>
                <template v-if="item.lineStatus == 4 || item.lineStatus == 5 || item.lineStatus == 6 || item.lineStatus == 7">
                  <div class="wb30 fl lh50px Fgray-5">比赛取消</div>
                </template>
                <template v-else>
                  <div class="wb30 fl lh50px" :class="item.lineStatus == 2 ? 'Forange-2' : 'Fgray-5'">{{item.raceResult || '— —'}}</div>
                </template>
              </div>
              <div class="clear"></div>
            </template>

          </div>

          <p>投注金币：<span class="Fgray-5 Fnum">{{match.lotMoney}}</span></p>
          <p>竞猜赔率：<span class="Fgray-5 Fnum">
                    <template v-for="(item,key) in match.lines">
                        <template v-if="key < match.lines.length - 1">{{item.lossRatio}}×</template>
                        <template v-else>{{item.lossRatio}}</template>
                    </template>
                </span></p>
          <p>竞猜时间：<span class="Fgray-5 Fnum">{{match.payTime}}</span></p>
          <p>方案编号：<span class="Fgray-5 Fnum">{{match.orderNo}}</span></p>
        </div>
      </template>

    </div>

    <template v-if="showBack">
      <div class="clear h70px"></div>
    </template>
    <template v-else>
      <div class="clear1"></div>
    </template>

    <div class="wb100 fixed" style="bottom: 0;" v-if="showBack">
      <div class="pa15">
        <div class="wb100 warpper-orange-7 Fwhite h45px lh45px text-center radius5 F16" @click="back">
          继续竞猜
        </div>
      </div>
    </div>

  </div>

</template>

<style>

</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'

    import userDefault from '../../assets/images/head-img1.png'
    import Bg1 from '../../assets/images/cz_bj.png'
    import Bg2 from '../../assets/images/wz_bj.png'
    import Bg3 from '../../assets/images/ddkj_bj.png'
    import Bg4 from '../../assets/images/bj.png'

    export default{

        data (){
            return {
              login: false,
              fullscreenLoading: true,
              showBack: false,
              user: {},
              userHead: userDefault,
              bg: [Bg1, Bg2, Bg3, Bg4],
              match: {
                matchTime: '',
                homeTeam: '',
                awayTeam: ''
              }
            }
        },

        methods: {
          back() {
            window.history.go(-1);
          },
          dateFormat(date, index) {
            if(Base.isNull(date))
              return '';
            return date.substring(5, index);
          },
          cutStrForNum(str, num) {
            if(str.length <= num){
              return str;
            }else{
              return str.substring(0, num-1) + '...';
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

          getLotType(type) {
            if(type == 0){
              return '胜平负';
            }else if(type == 1){
              return '让球胜平负';
            }else if(type == 2){
              return '比分';
            }else if(type == 3){
              return '总进球数';
            }
          },

          getLotValue(type,val) {

            if(type == 0 || type == 1){
              if(val == 0){
                return '主胜';
              }else if(val == 1){
                return '平';
              }else if(val == 2){
                return '客胜';
              }
            }else if(type == 2){
              if(val == 0){
                return '1:0';
              }else if(val == 1){
                return '2:0';
              }else if(val == 2){
                return '2:1';
              }else if(val == 3){
                return '3:0';
              }else if(val == 4){
                return '3:1';
              }else if(val == 5){
                return '3:2';
              }else if(val == 6){
                return '4:0';
              }else if(val == 7){
                return '4:1';
              }else if(val == 8){
                return '4:2';
              }else if(val == 9){
                return '5:0';
              }else if(val == 10){
                return '5:1';
              }else if(val == 11){
                return '5:2';
              }else if(val == 12){
                return '胜其它';
              }else if(val == 13){
                return '0:0';
              }else if(val == 14){
                return '1:1';
              }else if(val == 15){
                return '2:2';
              }else if(val == 16){
                return '3:3';
              }else if(val == 17){
                return '平其它';
              }else if(val == 18){
                return '0:1';
              }else if(val == 19){
                return '0:2';
              }else if(val == 20){
                return '1:2';
              }else if(val == 21){
                return '0:3';
              }else if(val == 22){
                return '1:3';
              }else if(val == 23){
                return '2:3';
              }else if(val == 24){
                return '0:4';
              }else if(val == 25){
                return '1:4';
              }else if(val == 26){
                return '2:4';
              }else if(val == 27){
                return '0:5';
              }else if(val == 28){
                return '1:5';
              }else if(val == 29){
                return '2:5';
              }else if(val == 30){
                return '负其它';
              }
            }else if(type == 3){
              if(val == 0){
                return '进0球';
              }if(val == 1){
                return '进1球';
              }if(val == 2){
                return '进2球';
              }if(val == 3){
                return '进3球';
              }if(val == 4){
                return '进4球';
              }if(val == 5){
                return '进5球';
              }if(val == 6){
                return '进6球';
              }if(val == 7){
                return '进7+球';
              }
            }

          },
        },

        mounted(){

          var _this = this;

          var orderID = this.$route.params.orderID;

          var back = this.$route.params.back;

          if (Base.isNull(back)) {
            _this.showBack = false;
          } else {
            _this.showBack = true;
          }

          if (Base.isNull(orderID)) {
            _this.$message({
              type: 'error',
              message: '缺少订单ID',
              duration: 1500
            });
            return false;
          }


          var _user = Base.getCookie('userInfo');

          if (Base.isNull(_user)) {
            _this.$router.push({ name: 'Login', params:{ call: true } });
            return false;
          }

          _this.user = JSON.parse(_user);

          Interface.matchOrderByOrderID(orderID, function (data) {
            if (data) {
              _this.match = data.returnJSON;
            }
            console.log(data);
            _this.fullscreenLoading = false;
          });

        }

    }

</script>
