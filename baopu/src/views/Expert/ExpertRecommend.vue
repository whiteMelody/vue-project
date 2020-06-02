<template>

  <div id="expert_recommend_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="newData.title" :back="true" :back_home="isShare"></navTitle>

    <div class="wb100">

      <div class="pa15">
        <p class="F20 Fgray-5">{{newData.title}}</p>

        <div class="clear1"></div>

        <div class=" relative" style="padding-left: 75px; padding-right: 80px;">
          <div class="w50px h50px absolute" style="top: 0; left: 0;">
            <img :src="newData.photoUrl ? newData.photoUrl : userHead" class="w60px h60px radius50per">
          </div>
          <div class="wb100 h50px">
            <p class="lh30px">
              <span class="fl mar5 Fgray-5">{{newData.nickName}} 推荐</span>
              <!--<span class="Fwhite warpper-blue F12 pal5 par5 h20px lh20px display-inline radius5 text-center fl mat5">让球胜平负</span>-->
            </p>
            <div class="clear"></div>

            <!--计算标签-->
            <p class="F12 text-center mat5 mab5">

              <span class="bor-orange4 bor-solid-1a Forange-2 h18px lh18px pal5 par5 fl mar5 radius5" v-if="newData.tenDaysCount >= 6">近10中{{newData.tenDaysCount}}</span>

              <span class="bor-orange4 bor-solid-1a Forange-2 h18px lh18px pal5 par5 fl mar5 radius5" v-if="newData.successionCount >= 2">{{newData.successionCount}}连红</span>

              <span class="bor-orange4 bor-solid-1a Forange-2 h18px lh18px pal5 par5 fl mar5 radius5" v-if="newData.monthCount >= 1">月红{{newData.monthCount}}单</span>

            </p>

          </div>

          <template v-if="isMain == false">
            <div class="w60px text-center absolute h35px lh35px F14 radius20 pointer" @click="favUser" :class="isFav ? 'Forange-2 bor-orange4 bor-solid-1a' : 'warpper-orange-7 Fwhite pa1'" style="right: 0; top: 9px;">
              <span v-if="isFav">已关注</span>
              <span v-else>+关注</span>
            </div>
          </template>

          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
        <div class="clear1"></div>

        <div class="pa15 warpper-black-3 relative Fgray-5">
          <div class="wb100">
            <div class="wb50 fl Fgray-6 F12 lh20px">
              发布于 <span class="Fnum">{{newData.postedTime}}</span>
            </div>

            <!--倒计时-->
            <template v-if="timeOut == false">
              <div class="wb50 fr Fgray-6 F12 text-right">
                <span class="Fgray-6">距截止：</span><span class="warpper-black-3 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(date.h)}}</span>:
                <span class="warpper-black-3 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(date.m)}}</span>:
                <span class="warpper-black-3 Fgray-6 display-inline h20px lh20px w20px text-center Fnum">{{addZero(date.s)}}</span>
              </div>
            </template>

            <template v-if="timeOut == true">
              <template v-if="matchData.status == 2">
                <div class="wb50 Forange-2 F12 fr text-right lh20px Fnum">
                  <template v-if="matchData.matchMinute < 45">
                    进行中 {{matchData.matchMinute}}'
                  </template>
                  <template v-if="matchData.matchMinute == 45">
                    <template v-if="matchData.matchMinuteExtra == 0">
                      进行中 45'
                    </template>
                    <template v-if="matchData.matchMinuteExtra != 0">
                      进行中 45+'
                    </template>
                  </template>

                  <template v-if="matchData.matchMinute > 45 && matchData.matchMinute < 90">
                    进行中 {{matchData.matchMinute}}'
                  </template>

                  <template v-if="matchData.matchMinute == 90">
                    <template v-if="matchData.matchMinuteExtra == 0">
                      进行中 90'
                    </template>
                    <template v-if="matchData.matchMinuteExtra != 0">
                      进行中 90+'
                    </template>
                  </template>
                </div>
              </template>

              <template v-else-if="matchData.status == 3">
                <template v-if="newData.matchInfo[0].result == 1">
                  <div class="w65px absolute text-center Fred" style="top: 10px; right: 10px;">
                    <img src="~@/assets/images/mz_wdgz.png" class="w50px">
                  </div>
                </template>

                <template v-if="newData.matchInfo[0].result == 2">
                  <div class="w65px absolute text-center Fred" style="top: 10px; right: 10px;">
                    <img src="~@/assets/images/wz_wdgz.png" class="w50px">
                  </div>
                </template>

                <!--<div class="wb50 Fgray-6 F12 fr text-right lh20px">-->
                  <!--竞猜已结束-->
                <!--</div>-->

              </template>

              <template v-else>
                <div class="wb50 Fgray-3 F12 fr text-right lh20px">
                  竞猜已结束
                </div>
              </template>
            </template>

          </div>

          <div class="clear"></div>

          <template v-if="newData.matchInfo.length == 1">

            <div class="pat15 pab15 Fgray-5 text-center lh20px">
              <div class="wb35 fl">
                <div class="w60px h60px center img-area">
                  <img :src="newData.matchInfo[0].homeTeamLogo">
                </div>
                <!--<p class="lh30px">{{cutStrForNum(newData.matchInfo.homeTeam,5)}}</p>-->
                <p class="lh30px">{{newData.matchInfo[0].homeTeam}}</p>
              </div>

              <div class="wb30 fl">
                <div class="wb80 center Fgray-5" v-if="matchEmpty != true">
                  <p class="lh20px">{{matchData.leagueType}} 周<span class="Fnum">{{matchData.weekOfDay}} {{matchData.matchNum}}</span></p>
                  <div class="wb45 center F24 lh40px Fnum">
                    <template v-if="timeOut == false">VS</template>
                    <template v-else>{{matchData.matchResult}}</template>
                  </div>

                  <p class="F12 lh30px Fnum">{{ dateFormat(matchData.matchTime,16)}}</p>
                </div>

                <div class="wb100" v-if="matchEmpty == true">
                  <p class="h80px lh80px text-center">暂无</p>
                </div>
              </div>

              <div class="wb35 fr">
                <div class="w60px h60px center img-area">
                  <img :src="newData.matchInfo[0].visitingTeamLogo">
                </div>
                <!--<p class="lh30px">{{cutStrForNum(newData.matchInfo.visitingTeam,5)}}</p>-->
                <p class="lh30px">{{newData.matchInfo[0].visitingTeam}}</p>
              </div>
              <div class="clear"></div>
            </div>

            <div class="clear"></div>

            <template v-if="isBuy == true">
              <div class="wb100 h45px lh45px text-center Fgray-3 warpper-gray-2" style="background: #dedede;" v-if="matchEmpty!= true">
                推荐 <span class="Forange-2">
                    {{getLotType(newData.matchInfo[0].lotType)}}
                    <template v-if="newData.matchInfo[0].lotType.isLetBall == true">
                        <span v-if="newData.matchInfo[0].lotType.letBall>0">(+{{newData.matchInfo[0].lotType.letBall}})</span>
                        <span v-else>({{newData.matchInfo[0].lotType.letBall}})</span>
                    </template>
                    — {{getLotValue(newData.matchInfo[0].lotType, newData.matchInfo[0].anteValue)[0]}} ({{getLotValue(newData.matchInfo[0].lotType, newData.matchInfo[0].anteValue)[1]}})
                    </span>
              </div>

              <div class="clear1"></div>


              <router-link :to="{ name:'SoccerDetailBet', params: { matchID: newData.matchInfo[0].matchID } }">
                <div class="wb100 h45px lh45px text-center radius5 Fwhite warpper-orange-7" v-if="timeOut == false">
                  立即竞猜
                </div>
              </router-link>
            </template>

            <div class="clear"></div>
          </template>

          <template v-else>

            <div class="wb100">

              <div class="clear1"></div>

              <div class="wb100 Fgray-6 text-center h45px lh45px" style="background: #313649;">
                <div class="wb50 fl">主队VS客队</div>
                <div class="wb25 fl">投注内容</div>
                <div class="wb25 fl">比赛结果</div>
              </div>

              <template v-for="item in newData.matchInfo">
                <div class="wb100 text-center">
                  <div class="wb50 fl pat5 pab5 h40px">
                    <p class="text-over-hidden1 h25px lh25px Fgray-6 F14">{{item.homeTeam}} VS {{item.visitingTeam}}</p>
                    <p class="lh15px F12 Fgray-6">{{dateFormat(item.matchTime)}}</p>
                  </div>

                  <template v-if="isBuy">
                    <div class="wb25 fl lh50px F14" :class="matchResult(item.lotType, item.anteValue, item.raceResult, item.letBall) ? 'Forange-2' : 'Fgray-5'">
                      {{getLotValue(item.lotType, item.anteValue)[0]}}
                      <template v-if="item.lotType == 1">
                        (<span v-if="item.letBall > 0 ">+ {{item.letBall}}</span><span v-else-if="item.letBall < 0 ">{{item.letBall}}</span>)
                      </template>
                      <!--item.letBall-->
                    </div>
                  </template>
                  <template v-else>
                    <div class="wb25 fl h50px lh45px F14 Fgray-5">
                      <img src="~@/assets/images/icon-lock.png" class="h18px mat15">
                    </div>
                  </template>

                  <div class="wb25 fl lh50px Fnum" :class="matchResult(item.lotType, item.anteValue, item.raceResult, item.letBall) ? 'Forange-2' : 'Fgray-6'">{{item.raceResult || '— —'}}</div>
                </div>
                <div class="clear"></div>
              </template>

            </div>

          </template>

        </div>

        <div class="clear1"></div>
        <div class="clear1"></div>

        <template v-if="isBuy == true">
          <div class="wb100 lh25px F18 Fgray-5" style="text-align: justify;">
            <div class="wb100 img-area content-area" v-html="newData.body">

            </div>
            <div class="clear1"></div>
          </div>
        </template>


        <template v-else>
          <p class="pa15 Fgray-6 text-center F16">支付后显示投注方案及推荐理由</p>
        </template>

      </div>

      <template v-if="isBuy == true">
        <p class="pa15 warpper-black-3 Fgray-6 text-center F14">观点仅供参考，投注需谨慎</p>
      </template>

      <!--<p class="pa15 warpper-black-3 Fgray-6 text-center F14">观点仅供参考，投注需谨慎</p>-->

    </div>

    <template v-if="isBuy">
      <div v-if="isShare == true" class="clear h75px"></div>

      <router-link :to="{ name:'Index' }">
        <div class="wb100 fixed" v-if="isShare == true" style="bottom: 0;">
          <div class="pa15">
            <div class="wb100 warpper-orange-7 Fwhite h45px lh45px text-center radius5 F16">
              返回首页
            </div>
          </div>
        </div>
      </router-link>
    </template>

    <template v-else>
      <div class="clear h50px"></div>

      <template v-if="timeOut == true">
        <div class="wb100 fixed" style="bottom: 0;">
          <div class="wb100 Forange-2 F16 h50px lh50px warpper-black-3 Fnum text-center">
              该方案的比赛已经开赛，已停止购买
          </div>
        </div>
      </template>

      <template v-else>
        <div class="wb100 fixed" style="bottom: 0;">
          <div class="wb60 fl Forange-2 text-left F16 h50px lh50px warpper-black-3 Fnum">
            <span class="pal15 fl"> {{ newData.costGold }}金币（不中返还）</span>
          </div>

          <template v-if="user.coinsQty > newData.costGold">
            <div class="wb40 fr warpper-orange-7 Fwhite text-center F18 h50px lh50px" @click="buyExpert">
              立即支付
            </div>
          </template>
          <template v-else>
            <router-link :to="{ name: 'Buy', query:{ newsID: newsID, title: newData. title,money: newData.costGold } }">
              <div class="wb40 fr warpper-orange-7 Fwhite text-center F18 h50px lh50px">
                立即支付
              </div>
            </router-link>
          </template>

        </div>
      </template>

    </template>


  </div>

</template>

<style>

</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'
    import userDefault from '../../assets/images/head-img1.png'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              isFav: false,
              timerID: 0,
              timer: 0,
              timeOut: false,
              matchEmpty: false,
              favDisabled: false,
              login: false,
              isShare: false,
              isHit: false,
              isBuy: false,
              isMain: false,
              userHead: userDefault,
              user: {
                photoUrl: '',
                coinsQty: 0
              },
              newsID: '',
              date: {
                h: 0,
                m: 0,
                s: 0
              },
              newData: {
                matchInfo: {
                  visitingTeam: '',
                  homeTeam: ''
                },
                matchDay: '',
                matchTime: '',
                body: ''
              },
              matchData: {
                lotTypeRate: {
                  win: 0,
                  tie: 0,
                  lose: 0
                },
                matchDay: '',
                matchTime: '',
                leagueType: ''
              }
            }
        },

        methods: {
          favUser() {

            var _this = this;

            if(_this.login == false){
                _this.$router.push({ name: 'Login', params: { call: true }});
              return;
            }

            if(_this.favDisabled)
              return;

            if (_this.isFav == true) {
              //取消关注

              Interface.cancelFocusUser(_this.newData.uuid, function (data, errorMsg) {
                if (data) {
                  _this.$message({
                    type: 'success',
                    message: '取消关注成功',
                    duration: 1500
                  });

                  _this.favDisabled = true;

                  setTimeout(function(){
                    _this.favDisabled = false;
                  },1500);

                  _this.isFav = !_this.isFav;
                } else {
                  _this.$message({
                    type: 'error',
                    message: errorMsg,
                    duration: 1500
                  });

                  _this.favDisabled = true;

                  setTimeout(function(){
                    _this.favDisabled = false;
                  },1500);
                }

//                console.log(_this.newData.uuid)

              });
            } else {
              //关注
              Interface.focusUser(_this.newData.uuid, function (data, errorMsg) {
                if (data) {
                  _this.$message({
                    type: 'success',
                    message: '关注成功',
                    duration: 1500
                  });

                  _this.favDisabled = true;

                  setTimeout(function(){
                    _this.favDisabled = false;
                  },1500);

                  _this.isFav = !_this.isFav;
                } else {
                  _this.$message({
                    type: 'error',
                    message: errorMsg,
                    duration: 1500
                  });

                  _this.favDisabled = true;

                  setTimeout(function(){
                    _this.favDisabled = false;
                  },1500);
                }
              });
            }
          },
          /**
           * 小于9补0函数
           * @param num		原始数值
           * @returns {*}	新数值
           */
          addZero(num) {
            var str = num.toString();
            if (str.length == 1) return "0" + num;else return num;
          },

          dateFormat(date, index) {
              if(Base.isNull(date))
                  return '';
              return date.substring(5, index);
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
                return ['主胜',this.matchData.lotTypeRate.win];
              }else if(val == 1){
                return ['平',this.matchData.lotTypeRate.tie];
              }else if(val == 2){
                return ['客胜',this.matchData.lotTypeRate.lose];
              }
            }else if(type == 2){
              if(val == 0){
                return ['1:0',this.matchData.lotTypeRate.s_1_0];
              }else if(val == 1){
                return ['2:0',this.matchData.lotTypeRate.s_2_0];
              }else if(val == 2){
                return ['2:1',this.matchData.lotTypeRate.s_2_1];
              }else if(val == 3){
                return ['3:0',this.matchData.lotTypeRate.s_3_0];
              }else if(val == 4){
                return ['3:1',this.matchData.lotTypeRate.s_3_1];
              }else if(val == 5){
                return ['3:2',this.matchData.lotTypeRate.s_3_2];
              }else if(val == 6){
                return ['4:0',this.matchData.lotTypeRate.s_4_0];
              }else if(val == 7){
                return ['4:1',this.matchData.lotTypeRate.s_4_1];
              }else if(val == 8){
                return ['4:2',this.matchData.lotTypeRate.s_4_2];
              }else if(val == 9){
                return ['5:0',this.matchData.lotTypeRate.s_5_0];
              }else if(val == 10){
                return ['5:1',this.matchData.lotTypeRate.s_5_1];
              }else if(val == 11){
                return ['5:2',this.matchData.lotTypeRate.s_5_2];
              }else if(val == 12){
                return ['胜其它',this.matchData.lotTypeRate.s_other];
              }else if(val == 13){
                return ['0:0',this.matchData.lotTypeRate.p_0_0];
              }else if(val == 14){
                return ['1:1',this.matchData.lotTypeRate.p_1_1];
              }else if(val == 15){
                return ['2:2',this.matchData.lotTypeRate.p_2_2];
              }else if(val == 16){
                return ['3:3',this.matchData.lotTypeRate.p_3_3];
              }else if(val == 17){
                return ['平其它',this.matchData.lotTypeRate.p_other];
              }else if(val == 18){
                return ['0:1',this.matchData.lotTypeRate.f_0_1];
              }else if(val == 19){
                return ['0:2',this.matchData.lotTypeRate.f_0_2];
              }else if(val == 20){
                return ['1:2',this.matchData.lotTypeRate.f_1_2];
              }else if(val == 21){
                return ['0:3',this.matchData.lotTypeRate.f_0_3];
              }else if(val == 22){
                return ['1:3',this.matchData.lotTypeRate.f_1_3];
              }else if(val == 23){
                return ['2:3',this.matchData.lotTypeRate.f_2_3];
              }else if(val == 24){
                return ['0:4',this.matchData.lotTypeRate.f_0_4];
              }else if(val == 25){
                return ['1:4',this.matchData.lotTypeRate.f_1_4];
              }else if(val == 26){
                return ['2:4',this.matchData.lotTypeRate.f_2_4];
              }else if(val == 27){
                return ['0:5',this.matchData.lotTypeRate.f_0_5];
              }else if(val == 28){
                return ['1:5',this.matchData.lotTypeRate.f_1_5];
              }else if(val == 29){
                return ['2:5',this.matchData.lotTypeRate.f_2_5];
              }else if(val == 30){
                return ['负其它',this.matchData.lotTypeRate.f_other];
              }
            }else if(type == 3){
              if(val == 0){
                return ['进0球',this.matchData.lotTypeRate.total0];
              }if(val == 1){
                return ['进1球',this.matchData.lotTypeRate.total1];
              }if(val == 2){
                return ['进2球',this.matchData.lotTypeRate.total2];
              }if(val == 3){
                return ['进3球',this.matchData.lotTypeRate.total3];
              }if(val == 4){
                return ['进4球',this.matchData.lotTypeRate.total4];
              }if(val == 5){
                return ['进5球',this.matchData.lotTypeRate.total5];
              }if(val == 6){
                return ['进6球',this.matchData.lotTypeRate.total6];
              }if(val == 7){
                return ['进7+球',this.matchData.lotTypeRate.total7];
              }
            }

          },

          matchResult(lotType, lotVal, raceResult, letBall){

              if(Base.isNull(raceResult))
                  return false;

              let r1 = Number.parseInt(raceResult.split(":")[0]);
              let r2 = Number.parseInt(raceResult.split(":")[1]);

              let _result = 0;

//              console.log({lotType, lotVal, raceResult, letBall})

            //计算推荐是否命中
            if(lotType == 0){
                if(r1 > r2){
                    //主胜
                    _result = 0;
                }else if(r1 == r2){
                    //平
                    _result = 1;
                }else{
                    //客胜
                    _result = 2;
                }
            }else if(lotType == 1){
              r1 += Number.parseInt(letBall);
              if(r1 > r2){
                //主胜
                _result = 0;
              }else if(r1 == r2){
                //平
                _result = 1;
              }else{
                //客胜
                _result = 2;
              }
            }else if(lotType == 2){

              if(raceResult == '1:0'){
                _result = 0;
              }else if(raceResult == '2:0'){
                _result = 1;
              }else if(raceResult == '2:1'){
                _result = 2;
              }else if(raceResult == '3:0'){
                _result = 3;
              }else if(raceResult == '3:1'){
                _result = 4;
              }else if(raceResult == '3:2'){
                _result = 5;
              }else if(raceResult == '4:0'){
                _result = 6;
              }else if(raceResult == '4:1'){
                _result = 7;
              }else if(raceResult == '4:2'){
                _result = 8;
              }else if(raceResult == '5:0'){
                _result = 9;
              }else if(raceResult == '5:1'){
                _result = 10;
              }else if(raceResult == '5:2'){
                _result = 11;
              }else if(raceResult == '胜其它'){
                _result = 12;
              }else if(raceResult == '0:0'){
                _result = 13;
              }else if(raceResult == '1:1'){
                _result = 14;
              }else if(raceResult == '2:2'){
                _result = 15;
              }else if(raceResult == '3:3'){
                _result = 16;
              }else if(raceResult == '平其它'){
                _result = 17;
              }else if(raceResult == '0:1'){
                _result = 18;
              }else if(raceResult == '0:2'){
                _result = 19;
              }else if(raceResult == '1:2'){
                _result = 20;
              }else if(raceResult == '0:3'){
                _result = 21;
              }else if(raceResult == '1:3'){
                _result = 22;
              }else if(raceResult == '2:3'){
                _result = 23;
              }else if(raceResult == '0:4'){
                _result = 24;
              }else if(raceResult == '1:4'){
                _result = 25;
              }else if(raceResult == '2:4'){
                _result = 26;
              }else if(raceResult == '0:5'){
                _result = 27;
              }else if(raceResult == '1:5'){
                _result = 28;
              }else if(raceResult == '2:5'){
                _result = 29;
              }else if(raceResult == '负其它'){
                _result = 30;
              }

            }else if(lotType == 3){
              if(raceResult == 0 || '进0球'){
                _result = 0;
              }else if(raceResult == 1 || '进1球'){
                _result = 1;
              }else if(raceResult == 2 || '进2球'){
                _result = 2;
              }else if(raceResult == 3 || '进3球'){
                _result = 3;
              }else if(raceResult == 4 || '进4球'){
                _result = 4;
              }else if(raceResult == 5 || '进5球'){
                _result = 5;
              }else if(raceResult == 6 || '进6球'){
                _result = 6;
              }else if(raceResult == 7 || '进7+球'){
                _result = 7;
              }
            }

            if(lotVal == _result){
              return true;
            }else{
                return false;
            }

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

          cutStrForNum(str, num) {
            if(str.length <= num){
              return str;
            }else{
              return str.substring(0, num-1) + '...';
            }
          },

          buyExpert(){

              let _this = this;

            //可用的红包
            Interface.usableCouponList(_this.newData.costGold, function (data) {
              if (data) {
                let redBagList = data.returnJSON;

                //有可使用的红包，跳转到支付页面
                if(redBagList.length >0){

                    _this.$router.push({ name: 'Buy', query:{ newsID: _this.newsID, title: _this.newData.title,money: _this.newData.costGold } });
                }
                else{
                    //立即购买
                  //购买当前达人推荐方案
                  Interface.payNews(_this.newsID, '', function (data2, errMsg) {

                    if(data2){
                      _this.$message({
                        type: 'error',
                        message: '购买成功',
                        duration: 3000
                      });

                      _this.isBuy = true;

                      Interface.newsMatchDetailInfo(_this.newsID, function (data) {
                        let _result = data.returnJSON.matchList;
                        let _list = _this.newData.matchInfo;
                        _this.newData.body = data.returnJSON.body;
                        for(let i=0; i<_list.length; i++){
                          _list[i].antValueDesc = _result[i].antValueDesc;
                          _list[i].anteValue = _result[i].anteValue;
                          _list[i].lotType = _result[i].lotType;
                          _list[i].lotTypeDesc = _result[i].lotTypeDesc;
                        }
                      })

                    }
                    else{
                      _this.$message({
                        type: 'error',
                        message: errMsg,
                        duration: 3000
                      });

                    }

                  });

                }

              }
            });

          },

        },

        mounted(){

          var _this = this;

          var _newsID = this.$route.params.newsID;
          var _share = this.$route.params.share;

          if(Base.isNull(_share)){
              _this.isShare = false;
          }else{
            if(_share == 'share'){
              _this.isShare = true;
            }else{
              _this.isShare = false;
            }
          }

          if (Base.isNull(_newsID)) {
            _this.$message({
              type: 'error',
              message: '缺少文章ID',
              duration: 1500
            });

            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,1);
            },100);

            return false;
          }

          _this.newsID = _newsID;

          //- 判断登录
          Interface.userInfo(function (data3) {
            var _user = data3.returnJSON;

            if (Base.isNull(_user)) {
              //- 未登录
              _this.login = false;
            } else {
              _this.user = _user;
              _this.login = true;
            }

            Interface.newsInfo(_newsID, function (data2) {
              if (data2) {
                _this.newData = data2.returnJSON;

                let _list = data2.returnJSON.matchInfo;

                //判断比赛是否命中
                let _flag = true;

                for(let item of _list){
                    let _r = _this.matchResult(item.lotType, item.anteValue, item.raceResult, item.letBall);
                    if(_r == false)
                      _flag = false;
                }

                _this.isHit = _flag;

                var fav = data2.extendInfo;

                if (Base.isNull(fav)) {
                  _this.isFav = false;
                } else {

                  if (fav.uuid == 0) {
                    _this.isFav = false;
                  } else {
                    if (_this.newData.uuid == _user.uuid) {
                      _this.isFav = false;
                      _this.isMain = true;
                    } else {
                      _this.isFav = true;
                    }
                  }
                }

                //是否付费
                if(data2.returnJSON.readType == 0){
                    _this.isBuy = true;
                }else{

                  Interface.newsMatchDetailInfo(_newsID, function (data) {
                      if(data){
                        let _result = data.returnJSON.matchList;
                        _this.newData.body = data.returnJSON.body;
                        for(let i=0; i<_list.length; i++){
                          _list[i].antValueDesc = _result[i].antValueDesc;
                          _list[i].anteValue = _result[i].anteValue;
                          _list[i].lotType = _result[i].lotType;
                          _list[i].lotTypeDesc = _result[i].lotTypeDesc;
                        }
                        _this.isBuy = true;
                      }
                  })


//                  Interface.newsListByUserBought(function (data) {
//
//                    if(data){
//                      let list = data.returnJSON;
//
//                      let _flag = false;
//
//                      for(let item of list){
//                        if(item.newsID == _this.newsID){
//                          _flag = true;
//                        }
//                      }
//
//                      //判断是否购买
//                      _this.isBuy = _flag;
//
//                      if(_flag){
//                        //获取付费接口数据
//
//                        Interface.newsMatchDetailInfo(_newsID, function (data) {
//                          let _result = data.returnJSON.matchList;
//                          _this.newData.body = data.returnJSON.body;
//                          for(let i=0; i<_list.length; i++){
//                            _list[i].antValueDesc = _result[i].antValueDesc;
//                            _list[i].anteValue = _result[i].anteValue;
//                            _list[i].lotType = _result[i].lotType;
//                            _list[i].lotTypeDesc = _result[i].lotTypeDesc;
//                          }
//                        })
//
//                      }else{
//                        //判断用户余额
//
//
//                      }
//
//                    }
//
//
//                  })

                }

                Interface.newsMatchInfo(_newsID, function (data) {

                  if (data) {

                    _this.matchData = data.returnJSON;

                    if (Base.isNull(_this.matchData)) {
                      //已完赛或者其他状态
                      _this.matchEmpty = true;
                      return false;
                    }

                    var _now = new Date().getTime();

//                    var _timer = Math.round((new Date(_this.matchData.matchTime).getTime() - _now) / 1000);

                    var _timer = 0;

                    //判断最早的比赛是否过期
                    //_list

                    console.log(_list);

                    if(_list.length ==1){
                        //单场比赛
                      _timer =  Math.round((_this.stringToDate(_this.matchData.matchTime).getTime() - _now) / 1000) - 300;
                    }else{
                        //多场比赛

                      let _min = 0;

                      for(let item of _list){
                          let _num = _this.stringToDate(item.matchTime).getTime();

                          if(_min == 0){
                            _min = _num;
                          }
                          if(_num < _min){
                            _min = _num;
                          }

                      }

                      _timer = Math.round((_min - _now) / 1000) - 300;

                    }

                    //未开始
                    if (_timer > 0) {

                      _this.timeOut = false;

                      _this.timer = _timer;

                      _this.timerID = setInterval(function () {

                        _timer--;

                        //                     var d = Math.floor(_timer / 86400) ;
                        //                     var h = Math.floor((_timer - (86400 * d)) / 3600);
                        //                     var m = Math.floor((_timer - (86400 * d) - (h * 3600)) / 60);
                        //                     var s = (_timer - (86400 * d) - (h * 3600) - (m * 60));

                        //                     console.log(d +':'+h +':' + m + ':' + s);

                        var h = Math.floor(_timer / 3600);
                        var m = Math.floor((_timer - 3600 * h) / 60);
                        var s = _timer - 3600 * h - m * 60;

                        //                     console.log(h +':' + m + ':' + s);

                        _this.date = {
                          h: h,
                          m: m,
                          s: s
                        };
                      }, 1000);
                    } else {
                      //已开始
                      _this.timeOut = true;
                    }

                  }

                });


              }

              setTimeout( ()=> {
                _this.fullscreenLoading = false;
                window.scrollTo(0,1);
              },100);

            });

          });
        }

    }

</script>
