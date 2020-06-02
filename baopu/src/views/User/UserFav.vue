<template>

  <div id="user_fav_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'我的关注'" :back="true"></navTitle>

    <div class="dialogBg" v-show="showConfirm == true"></div>
    <div class="wb100 fixed h150px" v-show="showConfirm == true" style="z-index: 99; top: 0; left: 0; right: 0; bottom: 0; margin: auto;">
      <div class=" warpper-white radius5 wb70 center ">
        <div class="wb100 h150px">
          <div class="text-center">
            <p class="lh100px h100px bor-solid-1b bor-gray">确定取消关注吗？</p>
            <!--<p class="F14 Fgray-3 bor-solid-1b bor-gray  h40px">需花费<span class="Fred Fnum"></span>金币</p>-->
            <p class="lh50px h50px">
              <span class="fl  wb50 bor-solid-1r bor-gray " style="height: 49px" @click="showConfirm = false">取消</span>
              <span class="fr  wb49 Fgreen" @click="calfavUser">确定</span>
            </p>
          </div>
        </div>
      </div>
    </div>


    <div class="wb100 Fgray-3">

      <div class="wb100 Fgray-3 warpper-black-3" v-if="empty==false" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
        <div v-for="item in recordList">

          <div class="clear1"></div>

          <div class="pal15 relative" style="padding-left: 85px; padding-right: 80px;">

            <router-link :to="{ name: 'ExpertDetail', params:{ newsUserID: item.uuid } }">

              <div class="w60px h60px absolute" style="top: 0; left: 15px;">
                <img :src="item.photoUrl ? item.photoUrl : userHead" class="w50px h50px radius50per mat5">
              </div>
              <div class="wb100 Fgray-5 F14">
                <p class="F16 lh20px">
                  {{item.nickName}}
                </p>
                <p class="lh20px Fgray-6 h20px text-over-hidden1">
                  {{item.customSigna ? item.customSigna : '暂无签名'}}
                </p>
                <p class="F12 lh20px Fgray-6">
                  粉丝：<span class="Fnum">{{item.fansQty}}</span>
                </p>
              </div>
            </router-link>

            <div class="w60px text-center absolute h35px lh35px F14 radius20 pointer bor-orange4 bor-solid-1a Forange-2"  @click="currentID = item.uuid; showConfirm = true " style="top: 15px; right: 15px;">
              已关注
            </div>

            <div class="clear"></div>
          </div>

          <div class="pal15">
            <div class="clear1 bor-black3 bor-solid-1b"></div>
          </div>

        </div>

        <div class="clear"></div>

        <template v-if="last == true">
          <div class="wb100">
            <div class="text-center warpper-black-4 Fgray-6 h40px lh40px center w120px F14" >
              <span class="fl mal10">暂无更多数据</span>
            </div>
          </div>
        </template>
        <template v-else-if="empty == true">
          <div class="wb100 text-center">
            <img src="~@/assets/images/drtj_kb.png" class="w60px center" style="margin-top: 60px;">
            <div class="clear1"></div>
            <p class="Fgray-6 F16 lh25px h25px">还没有关注记录哦~</p>
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

        <div class="clear"></div>

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

    export default{

        data (){
            return {
              login: false,
              fullscreenLoading: true,
              showConfirm: false,
              user: {},
              current: 1,
              currentID: '',
              page: 0,
              pageSize: 20,
              navList: ['比赛', '达人'],
              recordList: [],
              userHead: userDefault,
              loading: true,
              empty: false,
              last: false,
              favDisabled: false,
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
                  window.scrollTo(0,1);
                },100);
              }
              return ;
            }

            _this.page ++;

            //达人
            Interface.focusUserList(_this.page, _this.pageSize, function (data) {

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

                _this.recordList = _this.recordList.concat(_tmp);

                _this.loading = false;
              } else {
                _this.empty = true;
              }

              if(_this.page == 1){
                setTimeout( ()=> {
                  _this.fullscreenLoading = false;
                  window.scrollTo(0,1);
                },100);
              }

            });
          },

          navChange(key) {
            this.current = key;
            this.recordList = [];
            this.page = 0;
            this.loading = true;
            this.last = false;
            this.getData();
          },

          calfavMatch(matchID) {
            //取消关注

            var _this = this;

            if(_this.favDisabled)
              return;

            Interface.cancelFoucsMatch(matchID, function (data, errorMsg) {
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

                _this.navChange(0);
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
          },

          calfavUser() {
            //取消关注

            var _this = this;

            if(_this.favDisabled)
              return;

            var uuid = _this.currentID;

            Interface.cancelFocusUser(uuid, function (data, errorMsg) {
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

                _this.showConfirm = false;

                _this.navChange(1);
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
          }
        },

        mounted(){
          this.getData();
        }

    }

</script>
