<template>

  <div class="wb100" :class="theme ? 'warpper-black-3': 'warpper-black-4'">

    <div class="wb100">

      <div class="wb100">
        <div class="clear1"></div>
        <div v-for="(item,key) in expertList">

          <div class="wb100">

            <router-link :to="{ name:'ExpertDetail', params: {newsUserID: item.uuid } }">
              <div class="pal15 relative Fgray-3" style="padding-left: 70px; padding-right: 70px;">
                <div class="w50px h50px absolute" style="top: 0; left: 15px;">
                  <img :src="item.photoUrl ? item.photoUrl : userHead" class="w50px h50px radius50per">
                </div>
                <div class="wb100 h50px">
                  <p class="lh30px">
                    <span class="fl mar5 Fgray-5">{{item.nickName}}</span>
                    <template v-if="item.matchs.length == 1">
                      <span class="Fwhite warpper-tip-red F12 pal5 par5 h16px lh16px display-inline radius5 text-center fl mal5" v-if="item.matchs[0].lotTypeDesc == '胜平负'" style="margin-top: 7px;">{{item.matchs[0].lotTypeDesc}}</span>
                      <span class="Fwhite warpper-tip-blue F12 pal5 par5 h16px lh16px display-inline radius5 text-center fl mal5" v-if="item.matchs[0].lotTypeDesc == '让胜平负'" style="margin-top: 7px;">{{item.matchs[0].lotTypeDesc}}</span>
                      <span class="Fwhite warpper-tip-green F12 pal5 par5 h16px lh16px display-inline radius5 text-center fl mal5" v-if="item.matchs[0].lotTypeDesc == '进球数'" style="margin-top: 7px;">{{item.matchs[0].lotTypeDesc}}</span>
                      <span class="Fwhite warpper-tip-orange F12 pal5 par5 h16px lh16px display-inline radius5 text-center fl mal5" v-if="item.matchs[0].lotTypeDesc == '比分'" style="margin-top: 7px;">{{item.matchs[0].lotTypeDesc}}</span>
                    </template>

                    <template v-else>
                      <span class="Fwhite warpper-red-8 F12 pal5 par5 h16px lh16px display-inline radius5 text-center fl mal5" style="margin-top: 7px;">{{item.matchs.length}}串1</span>
                    </template>
                  </p>
                  <div class="clear"></div>
                  <!--计算标签-->
                  <p class="F12 text-center  mab5" style="margin-top: 2px">

                    <template v-if="theme">
                      <span class="bor-orange4 bor-solid-1a Forange-2 h16px lh16px pal5 par5 fl mar5 radius5" v-if="expert.tenDaysCount >= 6">近10中{{expert.tenDaysCount}}</span>

                      <span class="bor-orange4 bor-solid-1a Forange-2 h16px lh16px pal5 par5 fl mar5 radius5" v-if="expert.successionCount >= 2">{{expert.successionCount}}连红</span>

                      <span class="bor-orange4 bor-solid-1a Forange-2 h16px lh16px pal5 par5 fl mar5 radius5" v-if="expert.monthCount >= 1">月红{{expert.monthCount}}单</span>

                    </template>

                    <template v-else>
                      <span class="bor-orange4 bor-solid-1a Forange-2 h16px lh16px pal5 par5 fl mar5 radius5" v-if="item.tenDaysCount >= 6">近10中{{item.tenDaysCount}}</span>

                      <span class="bor-orange4 bor-solid-1a Forange-2 h16px lh16px pal5 par5 fl mar5 radius5" v-if="item.successionCount >= 2">{{item.successionCount}}连红</span>

                      <span class="bor-orange4 bor-solid-1a Forange-2 h16px lh16px pal5 par5 fl mar5 radius5" v-if="item.monthCount >= 1">月红{{item.monthCount}}单</span>

                    </template>

                  </p>

                  <div class="clear"></div>

                </div>

                <template v-if="item.result == 0">

                  <template v-if="item.readType == 0">
                    <!--免费-->
                    <div class="w65px absolute text-center Forange-2" style="top: 10px; right: 30px;">
                      <p class="Fnum F26 lh25px">{{getRatio(item.matchs)[1]}}<span class="F12">%</span></p>
                      <p class="F12 lh15px">预计回报率</p>
                    </div>
                  </template>

                  <template v-else>
                    <template v-if="item.isBought == true">
                      <div class="w65px absolute text-center Forange-2" style="top: 10px; right: 30px;">
                        <p class="Fnum F26 lh25px">{{getRatio(item.matchs)[1]}}<span class="F12">%</span></p>
                        <p class="F12 lh15px">预计回报率</p>
                      </div>
                    </template>
                    <template v-else>
                      <div class="w65px absolute text-center Forange-2 vague" style="top: 10px; right: 30px;">
                        <p class="Fnum F26 lh25px">{{getRatio(item.matchs)[1]}}<span class="F12">%</span></p>
                        <p class="F12 lh15px">预计回报率</p>
                      </div>
                    </template>
                  </template>

                </template>

                <template v-if="item.result == 1">
                  <div class="w65px absolute text-center Forange-2" style="top: 0; right: 35px;">
                    <img src="~@/assets/images/mz_wdgz.png" class="w50px">
                  </div>
                </template>

                <template v-if="item.result == 2">
                  <div class="w65px absolute text-center Forange-2" style="top: 0; right: 35px;">
                    <img src="~@/assets/images/wz_wdgz.png" class="w50px">
                  </div>
                </template>

                <div class="clear"></div>
              </div>

            </router-link>

            <div class="clear"></div>

            <router-link :to="{ name:'ExpertRecommend', params: {newsID: item.newsID, share: 'web' } }">
              <div class="pal15 par15 pat15 relative Fgray-3">
                <div class="lh25px h50px pal15 par15 pat10 pab10 relative" :class="theme ? 'warpper-black-7' : 'warpper-black-3'" style="padding-right: 80px">
                  <p class="Fgray-6 F14 Fnum">
                    <template v-if="item.matchs.length == 1">{{item.matchs[0].league}} {{item.matchs[0].matchTime}}</template>
                    <template v-else>
                      {{item.matchs.length}}串1
                    </template>
                  </p>
                  <p class="h25px lh25px text-over-hidden1 wb100 Fgray-5">{{item.title}}</p>

                  <template v-if="item.readType == 1">
                    <div class="w65px h35px lh35px absolute text-center Fnum Forange-2 radius4" style="right: 15px; top: 8px;">
                      <span class="F28">{{item.costGold}}</span>金币
                    </div>

                    <template v-if="bought == true">

                      <template v-if="item.result == 2 || item.result == 4 || item.result == 5 || item.result == 6 ||item.result == 7">
                        <div class="w65px h18px lh18px absolute text-center bor-orange F12 bor-solid-1a Forange-2 radius4" style="right: 15px; bottom: 8px;">
                          已返还
                        </div>
                      </template>

                      <template v-else>
                        <!--<div class="w65px h18px lh18px absolute text-center bor-orange F12 bor-solid-1a Forange-2 radius4" style="right: 15px; bottom: 8px;">-->
                          <!--恭喜命中-->
                        <!--</div>-->
                      </template>

                    </template>

                    <template v-else>
                      <div class="w65px h18px lh18px absolute text-center bor-orange F12 bor-solid-1a Forange-2 radius4" style="right: 15px; bottom: 8px;">
                        不中返还
                      </div>
                    </template>

                  </template>

                  <template v-else>
                    <div class="w65px h35px lh35px absolute text-center bor-gray5 bor-solid-1a Fgray-5 radius4" style="right: 15px; bottom: 16px;">
                      免费
                    </div>
                  </template>

                </div>
              </div>

              <div class="clear"></div>

              <p class="lh30px pal15 par15 F12 Fgray-6">
                <span class="fl">发布于 <span class="Fnum">{{item.postedTime}}</span></span>

                <span class="fr Fnum"><img src="~@/assets/images/icon-view.png" class="h8px"> {{item.hits}}</span>
              </p>

              <div class="pal15">
                <div class="clear bor-black3 bor-solid-1b"></div>
              </div>

            </router-link>

            <div class="clear1"></div>
          </div>

        </div>

        <div class="clear"></div>

        <template v-if="pagelist">

          <template v-if="last == true">
            <div class="wb100">
              <div class="text-center warpper-black-4 Fgray-6 h40px lh40px center w120px F14" >
                <span class="fl mal10">暂无更多数据</span>
              </div>
            </div>
          </template>
          <template v-else-if="empty == true">
            <div class="wb100 text-center">
              <div class="clear1"></div>
              <p class="Fgray-6 F16 lh25px h25px">暂无推荐哦~</p>
              <div class="clear1"></div>
            </div>
          </template>
          <template v-else>
            <div class="wb100" v-show="loading">
              <div class="text-center warpper-black-4 Fgray-6 h40px lh40px center w120px F14">
                <img src="~@/assets/images/loading-2.gif" class="h20px fl mat10">
                <span class="fl mal10">数据加载中...</span>
              </div>
            </div>
          </template>

        </template>

        <div class="clear"></div>

      </div>

    </div>

  </div>


</template>

<style>
  .vague{
    filter:blur(8px);
    -webkit-filter:blur(8px);
    -moz-filter:blur(8px);
    -ms-filter:blur(8px);
    -o-filter:blur(8px);
  }
</style>

<script>

    import Base from "../assets/js/base.js"
    import Interface from "../assets/js/interface.js"
    import userDefault from '../assets/images/head-img1.png'

    export default{
        props: ['list', 'pagelist', 'loading', 'last', 'empty', 'loadtext','theme', 'expert', 'bought'],
        data (){
            return {
              userHead: userDefault,
              login: false,
              user: {},
              expertList: []
            }
        },
        methods: {
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

          getRatio(match){
            var _num = 0;

            for(var i=0; i<match.length; i++){

              if(_num == 0){
                _num = match[i].lossRatio;
              }else{
                _num *= match[i].lossRatio;
              }

            }

            return [this.twoDecimal(_num), Number.parseInt(this.twoDecimal(_num) * 100)];
          },

        },
        mounted(){

            let _this = this;

            //判断用户是否登录

//          _this.$watch('expert', function (a) {
//            console.log(a);
//          })

          _this.$watch('list', function(newList){

            _this.expertList = newList;

            Interface.userInfo(function (data2) {
              var _user = data2.returnJSON;

              if (Base.isNull(_user)) {
                //- 未登录
                _this.login = false;
              } else {
                _this.user = _user;
                _this.login = true;

                //获取用户已经购买的方案
                Interface.newsListByUserBought( (data) => {

                  let _list = data.returnJSON;

                  if(_list.length>0){
                    //判断用户已购的推荐

                    for(let j=0; j<newList.length; j++){

                      if(newList[j].readType == 0){
                        //免费
                        continue;
                      }else{
                        for(let i=0; i<_list.length; i++){
                          //付费
                          if(_list[i].newsID == newList[j].newsID){
                            newList[j].isBought = true;
//                            _this.expertList.$set(j, newList[j]);
                            _this.$set(_this.expertList[j], j, newList[j] );
                          }
                        }
                      }

                    }

                    _this.expertList = newList;

                    console.log(newList);

                  }

                })

              }
            });


          });




//          Vue.set(_this.list, i, _this.list[i]);

//          this.$watch('val', function(newVal){ })



        }
    }
</script>
