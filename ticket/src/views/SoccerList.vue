<template>

  <div id="soccer_list_page" class="warpper-black-4" :style="' width:100%; min-height: '+ height +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <div class="wb100">

      <div class="wb100 pat10 pab10 warpper-black-3 h25px" v-if="showMenu">
        <div class="wb100">
          <div class="wb33333 fl text-center" v-for="(item,key) in navList">
            <template v-if="key == 1">
              <router-link :to="{ name: 'SoccerList' }">
                <div class="wb100">
                  <span class="nav" :class="current == key ? 'nav-active' : ''">{{item}}</span>
                </div>
              </router-link>
            </template>
            <template v-else-if="key == 2">
              <router-link :to="{ name: 'SoccerRule' }">
                <div class="wb100">
                  <span class="nav" :class="current == key ? 'nav-active' : ''">{{item}}</span>
                </div>
              </router-link>
            </template>
            <template v-else>
              <router-link :to="{ name: 'Soccer' }">
                <span class="nav" :class="current == key ? 'nav-active' : ''">{{item}}</span>
              </router-link>
            </template>
          </div>
        </div>
      </div>

      <div class="clear"></div>

      <div class="wb100">

        <template v-for="item in soccerList">
          <div class="pa15">
            <p class="text-center Fwhite-1 lh40px">
              {{item.hTeam}}
              <span class="Fnum Forange-2 pal15 par15">{{item.hWholePoint}} : {{item.vWholePoint}}</span>
              {{item.vTeam}}
            </p>
            <div class="clear"></div>

            <div class="wb100 text-center bor-black1 bor-solid-1a F12 Fblack-2">
              <div class="wb20 fl pat1">
                <div class="wb100 h60px lh20px warpper-black-3 pat5 pab5">
                  <p>{{item.league}}</p>
                  <p>{{weekFormat(item.weekId)}} {{item.teamId}}</p>
                  <p class="text-over-hidden1">{{dateShort2(item.matchTime)}}</p>
                </div>
              </div>

              <div class="wb80 fl">
                <div class="wb100 warpper-black-3">
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l bor-solid-1b h30px lh30px">
                      <p class="h30px lh30px">胜平负</p>
                    </div>
                  </div>
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l bor-solid-1b h30px lh30px">
                      <p class="h30px lh30px">让球(<span class="Fred" v-if="item.letBall > 0">+{{item.letBall}}</span><span class="Fblue" v-else-if="item.letBall < 0">{{item.letBall}}</span><span class="Fgray-3" v-else>{{item.letBall}}</span>)
                      </p>
                    </div>
                  </div>
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l bor-solid-1b h30px lh30px">
                      <p class="h30px lh30px">比分</p>
                    </div>
                  </div>
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l bor-solid-1b h30px lh30px">
                      <p class="h30px lh30px">总进球</p>
                    </div>
                  </div>
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l bor-solid-1b h30px lh30px">
                      <p class="h30px lh30px">半全场</p>
                    </div>
                  </div>
                  <div class="clear"></div>
                </div>

                <div class="clear"></div>

                <div class="wb100 warpper-black-3">
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l h30px pat5 pab5 lh30px">
                      <p>{{item._t1}}</p>
                      <!--<p>{{item.result['@b0']}}</p>-->
                    </div>
                  </div>
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l h30px pat5 pab5 lh30px">
                      <p>{{item._t3}}</p>
                      <!--<p>{{item.result['@b7']}}</p>-->
                    </div>
                  </div>
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l h30px pat5 pab5 lh30px">
                      <p>{{item.hWholePoint}} : {{item.vWholePoint}}</p>
                      <!--<p>{{item.result['@b4']}}</p>-->
                    </div>
                  </div>
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l h30px pat5 pab5 lh30px">
                      <p>{{item._t4}}</p>
                      <!--<p>{{item.result['@b5']}}</p>-->
                    </div>
                  </div>
                  <div class="wb20 fl">
                    <div class="wb100 bor-black1 bor-solid-1l h30px pat5 pab5 lh30px">
                      <p>{{item._t2}}{{item._t1}}</p>
                      <!--<p>{{item.result['@b6']}}</p>-->
                    </div>
                  </div>
                  <div class="clear"></div>
                </div>

              </div>

              <div class="clear"></div>
            </div>
          </div>

          <div class="pal15">
            <div class="clear bor-black1 bor-solid-1b"></div>
          </div>

        </template>

        <template v-if="last == true">
          <div class="wb100">
            <div class="text-center warpper-black-4 Fgray-3 h40px lh40px center w120px F14" >
              <span class="fl mal10">暂无更多数据</span>
            </div>
          </div>
        </template>
        <template v-else-if="empty == true">
          <div class="wb100 text-center">
            <div class="clear1"></div>
            <p class="Fgray-3 F16 lh25px h25px">暂无比赛</p>
            <div class="clear1"></div>
          </div>
        </template>
        <template v-else>
          <div class="wb100" v-show="loading">
            <div class="text-center warpper-black-4 Fgray-3 h40px lh40px center w120px F14">
              <img src="~@/assets/images/loading-2.gif" class="h20px fl mat10">
              <span class="fl mal10">数据加载中...</span>
            </div>
          </div>
        </template>

        <div class="clear1"></div>
      </div>

    </div>

    <nav-footer :active="2"></nav-footer>

  </div>
</template>

<style>

</style>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'
  import Bg from '../assets/images/bg-more.png'
  import Bg2 from '../assets/images/bg-soccer.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        bgMore: Bg,
        bg: Bg2,
        page: 0,
        pageSize: 20,
        width: 0,
        height: 0,
        number: 0,
        lock: true,
        showMenu: false,
        soccerList:  [],
        navList: ['投注', '开奖', '规则'],
        current: 1,
        recordList: [],
        loadtext: '数据加载中...',
        loading: true,
        empty: false,
        last: false,
      }
    },

    methods: {

      dateShort2(str){
        return str.substring(5, str.length - 3);
      },

      weekFormat(str){
        if(str == 1)
          return '周一';
        if(str == 2)
          return '周二';
        if(str == 3)
          return '周三';
        if(str == 4)
          return '周四';
        if(str == 5)
          return '周五';
        if(str == 6)
          return '周六';
        if(str == 7)
          return '周日';
      },

      getData() {

        var _this = this;

        _this.loading = true;

        if(_this.last || _this.empty){
          _this.loading = false;
          if(_this.page == 0){
            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,1);
            },100);
          }
          return ;
        }

        _this.page ++;

        Interface.allLotteryMatch(this.page, this.pageSize, (data) => {

            if (data) {

              if (data.returnJSON.queryResult.length == 0) {
                if(_this.page == 1){
                  _this.empty = true;
                }else{
                  _this.empty = false;
                  _this.last = true;
                }
              } else {
                if(data.returnJSON.queryResult.length < _this.pageSize){
                  _this.empty = false;
                  _this.last = true;
                }
              }

              let _tmp = data.returnJSON.queryResult;

              for(let i=0; i<_tmp.length; i++){
//                  if(!Base.isNull(_tmp[i].result)){

                    let _letBall = Number.parseInt(_tmp[i].letBall);

                    let _p1 = Number.parseInt(_tmp[i].hWholePoint);
                    let _p2 = Number.parseInt(_tmp[i].vWholePoint);
                    let _p3 = Number.parseInt(_tmp[i].hHalfPoint);
                    let _p4 = Number.parseInt(_tmp[i].vHalfPoint);

                    if(_p1 > _p2){
                      _tmp[i]._t1 = '胜';
                    }else if(_p1 == _p2){
                      _tmp[i]._t1 = '平';
                    }else{
                      _tmp[i]._t1 = '负';
                    }
                    if(_p3 > _p4){
                      _tmp[i]._t2 = '胜';
                    }else if(_p3 == _p4){
                      _tmp[i]._t2 = '平';
                    }else{
                      _tmp[i]._t2 = '负';
                    }

                    if(_p1 + _letBall > _p2){
                      _tmp[i]._t3 = '胜';
                    }else if(_p1 + _letBall == _p2){
                      _tmp[i]._t3 = '平';
                    }else{
                      _tmp[i]._t3 = '负';
                    }

                    _tmp[i]._t4 = _p1 + _p2;

//                  }
              }

              this.soccerList = this.soccerList.concat(_tmp);

              _this.loading = false;

            }

            if(_this.page == 1){
              setTimeout( ()=> {
                _this.fullscreenLoading = false;
                window.scrollTo(0,1);
              },100);
            }

          });
      },
    },

    mounted(){

      this.getData();

      //getmenu


      let showMenu = this.$route.query.showMenu;

      if(showMenu){
          //显示标题
        this.showMenu = true;
      }else{
        this.showMenu = false;
      }

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'SoccerList_page', 'onInit', '开奖公告','inited','SoccerList_init']);


    }

  }


</script>

