<template>

  <div id="pay_success_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'支付成功'" :back="login"></navTitle>

    <div class="wb100 text-center lh25px Fgray-5">
      <img src="~@/assets/images/true.png" class="w80px" style="margin-top: 80px">
      <p class="F18 mat20">支付成功</p>
      <p class="F14">快去竞猜赢金币吧</p>

      <div class="clear h10px"></div>

      <template v-if="isWebApp == false">

        <template v-if="login == true">
          <router-link :to="{ name:'Index' }" replace>
            <div class="pa15 ">
              <div class="wb100 bor-orange4 bor-solid-1a Forange-2 h45px lh45px text-center radius5 F16 center" style="width: 200px">
                返回首页
              </div>
            </div>
          </router-link>
        </template>

        <template v-else>
          <div class="clear1"></div>
          <p>请关闭当前浏览器</p>
          <p>返回到<span class="Forange-2">{{sourceName}}</span>查看支付详情</p>
        </template>

      </template>

      <template v-else>
          <div class="pa15 " @click="goHome()">
            <div class="wb100 bor-orange4 bor-solid-1a Forange-2 h45px lh45px text-center radius5 F16 center" style="width: 200px">
              返回首页
            </div>
          </div>
      </template>

      <div class="wb100">
        <div class="wb100 text-center Fgray-2 lh25px F14" style="margin-top: 40px;" v-if="noRecommend == false">

          <template v-if="isWebApp == false">

            <template v-if="login == true">

              <p class="F14 Fgray-6">大家都在竞猜</p>
              <div class="clear h5px"></div>

              <router-link :to="{ name: 'SoccerDetailBet', params:{ matchID: recommend.matchID } }">
                <div class=" h60px lh15px center pa15 warpper-black-3 text-center Fblack" style="width: 240px">
                  <div class="w100px fl">
                    <img :src="recommend.homeTeamLogo" class="w30px h30px mat5">
                    <p class="mat10 wb100 h15px lh15px F14 Fgray-5">{{cutStrForNum(recommend.homeTeam,5)}}</p>
                  </div>
                  <div class="w40px fl">
                    <img src="~@/assets/images/icon-vs2.png" class="h16px " style="margin-top: 13px">
                  </div>
                  <div class="w100px fl">
                    <img :src="recommend.visitingTeamLogo" class="w30px h30px mat5">
                    <p class="mat10 wb100 h15px lh15px F14 Fgray-5">{{cutStrForNum(recommend.visitingTeam,5)}}</p>
                  </div>
                </div>
              </router-link>
            </template>

          </template>

          <template v-else>

            <p class="F14 Fgray-6">大家都在竞猜</p>
            <div class="clear h5px"></div>

            <div class=" h60px lh15px center pa15 warpper-black-3 text-center Fblack" style="width: 240px" @click="goGuess(recommend.matchID)">
              <div class="w100px fl">
                <img :src="recommend.homeTeamLogo" class="w30px h30px mat5">
                <p class="mat10 wb100 h15px lh15px F14 Fgray-5">{{cutStrForNum(recommend.homeTeam,5)}}</p>
              </div>
              <div class="w40px fl">
                <img src="~@/assets/images/icon-vs2.png" class="h16px " style="margin-top: 13px">
              </div>
              <div class="w100px fl">
                <img :src="recommend.visitingTeamLogo" class="w30px h30px mat5">
                <p class="mat10 wb100 h15px lh15px F14 Fgray-5">{{cutStrForNum(recommend.visitingTeam,5)}}</p>
              </div>
            </div>
          </template>
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
    import HostSdk from '../../assets/js/hostSdk.js'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              isWebApp: false,
              login: false,
              noRecommend: false,
              source: 'wap',
              sourceName: 'wap',
              recommend: {
                homeTeam: '',
                visitingTeam:''
              },
            }
        },

        methods: {
          cutStrForNum(str, num) {
            if(str.length <= num){
              return str;
            }else{
              return str.substring(0, num-1) + '...';
            }
          },
          //回APP首页
          goHome:function () {
            hostsdk.openUrl({
              type:"push",
              url:"PushHostGuess",
              errorCallback : function(res){}
            });
          },

          //回APP竞猜
          goGuess:function (id) {
            hostsdk.openUrl({
              type:"push",
              url:"PushGuess",
              params:{"matchID":id},
              errorCallback : function(res){}
            });
          }
        },

        mounted(){

          var _this = this;

          Base.setCookie('paymentNo', null);
          Base.setCookie('payIng', null);
          Base.setCookie('payType', null);
          Base.setCookie('payMoney', null);
          Base.setCookie('calOrder',null);

          let _source = Interface.getSource();

          let userID = Interface.getUserId();

          if(userID == 0){
              this.login = false;
          }else{
            this.login = true;
          }

          if(!Base.isNull(_source)){
              this.source = _source;
              this.sourceName = Interface.getSourceName(_source);
          }

          if(this.source == 'wap'){
            this.login = true;
          }

          if(Base.versions.isAndroidApp || Base.versions.isIosApp){
            this.isWebApp = true;
            HostSdk.inited(function (res, errorMsg) {

              //刷新余额
              hostsdk.UpdateUserInfo({
                successCallback:function () {},
                errorCallback:function () {}
              });

              //获取推荐赛事
              Interface.recommendMatchInfo(function (data) {
                //console.log(data);
                if(data){
                  if(!Base.isNull(data.returnJSON)){
                    _this.recommend = data.returnJSON;
                  }else{
                    _this.noRecommend = true;
                  }
                }else{
                  _this.noRecommend = true;
                }
              })
            });
          }else{
            //获取推荐赛事
            Interface.recommendMatchInfo(function (data) {
              //                console.log(data);
              if(data){
                if(!Base.isNull(data.returnJSON)){
                  _this.recommend = data.returnJSON;
                }else{
                  _this.noRecommend = true;
                }
              }else{
                _this.noRecommend = true;
              }
            })
          }

          _this.fullscreenLoading = false;

        }

    }

</script>
