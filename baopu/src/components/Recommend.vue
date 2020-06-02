<template>

  <div class="wb100">
    <div class="wb100 text-center Fgray-2 lh25px F14" style="margin-top: 40px;" v-if="noRecommend == false">
      <p class="F14 Fgray-6">大家都在竞猜</p>
      <div class="clear h5px"></div>

      <router-link :to="{ name: 'SoccerDetailBet', params:{ matchID: recommend.matchID } }">
        <div class=" h60px lh15px center pa15 warpper-black-3 text-center Fblack" style="width: 240px">
          <div class="w100px fl">
            <img :src="recommend.homeTeamLogo" class="w30px h30px mat5">
            <p class="Fgray-5 mat10">{{cutStrForNum(recommend.homeTeam,5)}}</p>
            <!--<p class="mat10 wb100 h15px lh15px text-over-hidden1 F14 Fgray-5">{{recommend.homeTeam}}</p>-->
          </div>
          <div class="w40px fl">
            <img src="~@/assets/images/icon-vs2.png" class="h16px " style="margin-top: 13px">
          </div>
          <div class="w100px fl">
            <img :src="recommend.visitingTeamLogo" class="w30px h30px mat5">
            <p class="Fgray-5 mat10">{{cutStrForNum(recommend.visitingTeam,5)}}</p>
            <!--<p class="mat10 wb100 h15px lh15px text-over-hidden1 F14 Fgray-5">{{recommend.visitingTeam}}</p>-->
          </div>
        </div>
      </router-link>
    </div>
  </div>

</template>

<style>
</style>

<script>

    import Base from '../assets/js/base.js'
    import Interface from '../assets/js/interface.js'

    export default{
        data (){
            return {
              noRecommend: false,
              recommend: {
                homeTeam: '',
                visitingTeam: '',
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
        },
        mounted(){

            let _this = this;

            //获取推荐赛事
            Interface.recommendMatchInfo(function (data) {
  //                console.log(data);

//              alert(JSON.stringify(data));

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
    }
</script>
