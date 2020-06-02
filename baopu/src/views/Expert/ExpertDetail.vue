<template>

  <div id="expert_detail_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="newsUser.nickName" :back="true"></navTitle>


    <!--  style="position: fixed; height: 100%; width: 100%; overflow: auto; -webkit-overflow-scrolling: touch; z-index: 9;" -->
    <div class="wb100">

      <div class="wb100">

        <div class="clear1"></div>
        <div class="wb100 relative">

          <div style="padding-left: 74px">


            <img :src="newsUser.photoUrl ? newsUser.photoUrl : userHead" class="fl h70px w70px radius50per bor-white bor-solid-2a absolute" style="left: 15px; top:0;">

            <div class="Fwhite fl mal15">
              <p class="F18 lh30px pal15 Fgray-5">{{newsUser.nickName}}</p>
              <p class="F14 Fgray-6 lh20px pal15">{{newsUser.customSigna ? newsUser.customSigna : '暂无签名'}}</p>
              <p class="F14 Fgray-6 lh20px pal15 Fnum">粉丝：{{newsUser.fansQty}}</p>
            </div>

            <template v-if="newsUser.uuid != user.uuid">
              <div class="w60px text-center absolute h35px lh35px F14 radius20 pointer" @click="favUser" :class="isFav ? 'Forange-2 bor-orange4 bor-solid-1a' : 'warpper-orange-7 Fwhite pa1'" style="right: 15px; top: 15px;">
                <span v-if="isFav">已关注</span>
                <span v-else>+关注</span>
              </div>
            </template>
          </div>

          <div class="clear"></div>
        </div>
        <div class="clear1"></div>
      </div>

      <div class="wb100 warpper-black-3 Fgray-5 text-center">
        <div class="lh25px pat15 pab15">

          <div class="wb33333 fl">
            <p class="Fnum">{{totle}}场</p>
            <p class="Fgray-6 F14">总推荐</p>
          </div>
          <div class="wb33333 fl">
            <div class="wb100 h50px lh25px bor-black3 bor-solid-1l bor-solid-1r">
              <p v-if="newsUser.tenDaysCount > 0">近10中{{newsUser.tenDaysCount}}</p>
              <p v-else>——</p>
              <p class="Fgray-6 F14">近期状态</p>
            </div>
          </div>
          <div class="wb33333 fl">
            <p v-if="newsUser.maxSuccessionCount > 0">{{newsUser.maxSuccessionCount}}连红</p>
            <p v-else>——</p>
            <p class="Fgray-6 F14">最高战绩</p>
          </div>

          <div class="clear"></div>
        </div>
      </div>

      <div class="clear1"></div>

      <div class="wb100 Fgray-5">
          <div class="clear"></div>
          <div v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
            <expertList :list="newsList" :pagelist="true" :loading="loading" :last="last" :theme="'dark'" :expert="newsUser"></expertList>
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

    export default{

        data (){
            return {
              fullscreenLoading: true,
              login: false,
              isFav: false,
              newsUserID: '',
              user: {},
              userHead: userDefault,
              newsUser: {},
              newsList: [],
              current: 0,
              page: 0,
              pageSize: 20,
              totleCount: 0,
              loading: true,
              empty: false,
              last: false,
              totle: 0,
              favDisabled: false,
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

              Interface.cancelFocusUser(_this.newsUser.uuid, function (data, errorMsg) {
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


              });
            } else {
              //关注
              Interface.focusUser(_this.newsUser.uuid, function (data, errorMsg) {
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

            Interface.newsListByUser(_this.page, _this.pageSize, _this.newsUserID, function (data) {

                if (data) {
                  var _tmp = data.returnJSON.indexData;

                  _this.totle = data.returnJSON.totalResult;

                  _this.totleCount = data.returnJSON.totalResult;

                  if (data.returnJSON.indexData.length == 0) {
                    _this.empty = true;
                  } else {
                    if(data.returnJSON.indexData.length < _this.pageSize){
                      _this.empty = false;
                      _this.last = true;
                    }
                  }

                  _this.newsList = _this.newsList.concat(_tmp);

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
          }
        },

        mounted(){
          var _this = this;

          var _newsUserID = this.$route.params.newsUserID;

          if (Base.isNull(_newsUserID)) {
            _this.$message({
              type: 'error',
              message: '缺少达人ID',
              duration: 1500
            });
            setTimeout( ()=> {
              _this.fullscreenLoading = false;
              window.scrollTo(0,1);
            },100);
            return false;
          }

          _this.newsUserID = _newsUserID;

          Interface.newsUserInfo(_newsUserID, function (data) {
            if (data) {
              _this.newsUser = data.returnJSON;

              var fav = data.extendInfo;

              if (Base.isNull(fav)) {
                _this.isFav = false;
              } else {
                _this.isFav = true;
              }

              console.log(_this.newsUser);
            }

          });

          _this.getData();

          //- 判断登录
          Interface.userInfo(function (data) {
            var _user = data.returnJSON;
            if (Base.isNull(_user)) {
              _this.login = false;
            } else {
              _this.user = _user;
              _this.login = true;
            }
          });
        }

    }

</script>
