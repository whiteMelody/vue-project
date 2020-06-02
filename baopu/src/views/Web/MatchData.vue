<template>

  <div id="matchData_page" style="">

    <loader :show="fullscreenLoading"></loader>

    <template v-if="empty == false">
      <div class="wb100" :style="'background: url('+matchDefaultBg+') no-repeat; background-size: 100% 100%;'">

        <div class="clear1"></div>
        <div class="pa25 h75px relative" style="padding-left: 120px;">

          <img :src="team.teamlogo" class="w75px h75px fl absolute radius50per" style="top: 25px; left: 25px;">

          <p class="Fgray-5 lh35px F18">{{team.teamname}}</p>

          <p class="Fgray-6 lh35px">{{team.estime}}/{{team.nation}}/{{team.country}}</p>

          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
      </div>

      <div class="clear"></div>

      <div class="wb100 text-center h35px lh35px pat10 pab10 warpper-black-3">
        <div class="wb50 fl" @click="searchType = 0; getData()">
          <span :class="searchType == 0 ? 'bor-oragne2 bor-solid-2b h38px lh38px F18 Forange-2' : 'h35px lh35px Fgray-5'" class="display-inline">赛程</span>
        </div>
        <div class="wb50 fl" @click="searchType = 1;  getData()">
          <div class="wb100">
            <span :class="searchType == 1 ? 'bor-oragne2 bor-solid-2b h38px lh38px F18 Forange-2' : 'h35px lh35px Fgray-5'" class="display-inline">球员</span>
          </div>
        </div>
        <!--<div class="wb33333 fl" @click="searchType = 2">-->
        <!--<div class="wb100">-->
        <!--<span :class="searchType == 2 ? 'bor-oragne2 bor-solid-2b h38px lh38px F18 Forange-2' : 'h35px lh35px Fgray-5'" class="display-inline">资料</span>-->
        <!--</div>-->
        <!--</div>-->
      </div>

      <div class="clear"></div>

      <div class="wb100" v-if="searchType == 0">

        <div class="clear1"></div>

        <template v-if="matchList.length ==0">
          <p class="Fgray-6 F16 h30px lh30px text-center">暂无赛程</p>
        </template>

        <template v-else>
          <template v-for="item in matchList">

            <div class="pal15 par15 text-center">
              <div class="wb30 fl Fgray-6 lh20px">
                <p class="text-over-hidden1">{{ dateFormat(item.stime, 16)}}</p>
                <p class="text-over-hidden1">{{item.simplegbname}}</p>
              </div>
              <div class="wb70 fr Fgray-5 h40px lh40px">
                <p>{{item.hname}} <img :src="item.hteamlogo" class="w20px h20px radius50per">  <span class="Fnum">{{item.hscore}} : {{item.gscore}}</span> <img :src="item.gteamlogo" class="w20px h20px radius50per"> {{item.gname}}</p>
              </div>
              <div class="clear1 bor-black3 bor-solid-1b"></div>
              <div class="clear1"></div>
            </div>

          </template>
        </template>

      </div>

      <div class="wb100" v-if="searchType == 1">

        <template v-if="playerList.length ==0">
          <p class="Fgray-6 F16 h30px lh30px text-center">暂无球员</p>
        </template>

        <template v-else>
          <template v-for="item in playerList">

            <p class="warpper-black-4 Fgray-6 text-center h60px lh60px F16">{{item.position}}</p>

            <div class="wb100 Fgray-5 warpper-black-3">
              <template v-for="(item2,key2) in item.list">

                <router-link :to="{ name:'MatchPlayerData', params: { playerID: item2.pid } }">
                  <div class="wb50 fl Fgray-6">
                    <div class="pa15 lh25px relative" style="padding-left: 75px;" :class="key2%2 == 0 ? 'bor-black3 bor-solid-1r': ''">
                      <img :src="item2.head" class="absolute w50px h50px radius50per" style="top:15px; left: 15px;">
                      <p>{{item2.name}}</p>
                      <p>{{item2.number}}</p>
                    </div>
                    <div class="clear"></div>
                  </div>
                </router-link>
                <div class="clear bor-black3 bor-solid-1b" v-if="key2%2 == 1"></div>
              </template>
              <div class="clear"></div>
            </div>

            <div class="clear"></div>


          </template>
        </template>

      </div>
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
        searchType: 0,
        team: {},
        empty: true,
        playerList: [],
        matchList: [],
      }
    },

    methods: {
      dateFormat(date, index) {
        return date.substring(5, index);
      },
      getData(){

          if(this.searchType == 0){
            Interface.matchSaiChen(this.teamID, (data) => {
              this.fullscreenLoading = false;
              if(data){

                if(Base.isNull(data.extendInfo)){
                  this.empty = true;
                }else{
                  this.empty = false;
                  this.team = data.extendInfo;
                }

                this.matchList = data.returnJSON;

              }
            })
          }else {
            Interface.getTeam(this.teamID, (data)=> {
              this.fullscreenLoading = false;
                if(data){
                    let _tmp = data.extendInfo;

                    let _arr = [], _flag = true;

                    _arr.push({
                      position: _tmp[0].position,
                      list: []
                    })

                    _arr[0].list.push(_tmp[0]);

                    for(let i=1; i<_tmp.length; i++){

                        _flag = true;

                        for(let j=0; j<_arr.length; j++){
                            if(_tmp[i].position == _arr[j].position){
                              _flag = false;
                              _arr[j].list.push(_tmp[i]);
                              break;
                            }
                        }

                        if(_flag){
                          _arr.push({
                            position: _tmp[i].position,
                            list: []
                          })

                          _arr[_arr.length-1].list.push(_tmp[i]);
                        }

                    }

                  this.playerList = _arr;
                }

            })
          }

      },

    },

    mounted(){

      var _this = this;

      var teamID = this.$route.params.teamID;

      if (Base.isNull(teamID)) {
        _this.$message({
          type: 'error',
          message: '缺少赛事ID',
          duration: 1500
        });

        _this.fullscreenLoading = false;
        return false;
      }

      this.teamID = teamID;

      this.getData();




//      Interface.getPlayer(2271, (data)=> {
//
//          console.log(data);
//
//      })


    }

  }

</script>
