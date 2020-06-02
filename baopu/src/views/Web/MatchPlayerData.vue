<template>

  <div id="matchPlayerData_page" style="">

    <loader :show="fullscreenLoading"></loader>

    <template v-if="empty == false">

      <div class="wb100" :style="'background: url('+matchDefaultBg+') no-repeat; background-size: 100% 100%;'">

        <div class="clear1"></div>
        <div class="pa25 h75px relative" style="padding-left: 120px;">

          <img :src="player.head" class="w75px h75px fl absolute radius50per" style="top: 25px; left: 25px;">

          <p class="Fgray-5 lh35px F18">{{player.name}}</p>

          <p class="Fgray-6 lh35px">{{player.age}}岁/{{player.team}}/{{player.number}}号/{{player.position}}</p>

          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
      </div>

      <div class="clear"></div>

      <p class="warpper-black-4 Fgray-6 text-center h50px lh50px F16">基本资料</p>

      <div class="clear"></div>

      <div class="pa15 F14 warpper-black-3 lh30px Fgray-5">
        <p class="F16">{{player.name}}</p>
        <p>{{player.team}}·{{player.position}}·{{player.number}}号</p>
        <p>{{player.age}}岁·{{player.birth}}</p>
      </div>

      <template v-if="player.honor.length>0">
        <p class="warpper-black-4 Fgray-6 text-center h50px lh50px F16">荣誉记录</p>

        <div class="clear"></div>

        <div class="pa15 F14 warpper-black-3 lh25px Fgray-5">

          <template v-for="item in player.honor">
            <p>{{item.cpname}}{{item.award}} <span class="Fnum Fred">x{{item.times}}</span></p>

            <p>{{item.season}}</p>

            <div class="clear1 bor-black3 bor-solid-1b"></div>

            <div class="clear1"></div>
          </template>

        </div>

      </template>

    </template>

    <template v-else>

      <div class="clear h200px"></div>
      <p class="Fgray-5 h30px lh30px F18 text-center">暂无数据</p>
    </template>


  </div>

</template>


<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'
  import matchBg from '../../assets/images/matchDataBg.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        matchDefaultBg: matchBg,
        player: {},
        empty: true,
      }
    },

    mounted(){

      var _this = this;

      _this.fullscreenLoading = false;

      var playerID = this.$route.params.playerID;

      if (Base.isNull(playerID)) {
        _this.$message({
          type: 'error',
          message: '缺少球员ID',
          duration: 1500
        });

        _this.fullscreenLoading = false;

        return false;
      }


      Interface.getPlayer(playerID, (data)=> {
        this.fullscreenLoading = false;
          if(data){

              if(Base.isNull(data.returnJSON)){
                  this.empty = true;
              }else{
                  this.empty = false;
                  this.player = data.returnJSON;
              }

          }

      })


    }

  }

</script>
