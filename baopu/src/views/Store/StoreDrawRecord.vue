<template>

  <div id="store_draw_record_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'抽奖记录'" :back="true"></navTitle>

    <div class="wb100">
      <div class="wb100">
        <div class="wb100 warpper-black-3" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
          <div class="wb100" v-for="item in detailList" v-if="empty==false">
            <div class="clear1"></div>
            <div class="pal15">
              <router-link :to="{ name:'StoreOrderDetail', params: { ordernum: item.ordernum, bigtype: item.bigtype } }">
                <div class=" w80px h80px fl relative" >
                  <div class="fl img-area absolute  " :class="item.bigtype == 1 ? 'w80px h80px': 'w80px h80px'" style="margin: auto; top: 0; left: 0; bottom: 0; right: 0;">
                    <img :src="item.headerimg"/>
                  </div>
                </div>
                <div class="Fgray-3">
                  <p class="lh40px h40px text-over-hidden1 pal15 Fgray-5 F16">{{item.goodsname}}</p>
                  <img src="~@/assets/images/arrow-right.png" class="w10px fr par15" style="margin-top: -10px">
                  <span class="fr par5 Fgray-5 F16" style="margin-top: -13px" v-if="item.status == 1">已完成</span>
                  <span class="fr par5 Forange-2 F16" style="margin-top: -13px" v-else>处理中</span>
                  <p class="F12 lh40px h40px text-over-hidden1 pal15 Fgray-6">{{item.createtime}}</p>
                </div>
              </router-link>
              <div class="clear1 bor-gray-9 bor-solid-1b"></div>
            </div>
          </div>
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
          <img src="~@/assets/images/cjjl_kb.png"  class="wb25 center " style="margin-top: 205px">
          <div class="clear1"></div>
          <p class="Fgray-6 F16 lh25px h25px">还没有抽奖记录哦~</p>
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
              detailList: [],
              page: 0,
              pageSize: 20,
              empty: false,
              loading: true,
              last: false,
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

            Interface.orderList(_this.page, _this.pageSize, function (data) {

              if(data){

                var _tmp = data.data.pagelist;

                _this.detailList = _this.detailList.concat(_tmp);

                _this.loading = false;

                if (_tmp.length == 0) {
                  if(_this.page == 1){
                    _this.empty = true;
                  }else{
                    _this.empty = false;
                    _this.last = true;
                  }
                } else {
                  if(_tmp.length < _this.pageSize){
                    _this.empty = false;
                    _this.last = true;
                  }
                }

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

          if(Base.versions.isAndroidApp || Base.versions.isIosApp){
            HostSdk.inited(function (res, errorMsg) {

              hostsdk.setLeftIcon({
                params:"custom",
                icon: "https://mp.bombsport.com/source/back.png",
                text: "",
                successCallback:function (res) {

                },
                errorCallback:function (res) {

                },
                leftClicked:function (res) {
                  _this.$router.go(-1);
                }
              });

              _this.getData();
              if(res.uuid) {
                _this.login = true;
              }else {
                _this.login = false;
              }
            });
          }else{
            Interface.userInfo(function (data) {

              _this.getData();
              if (data) {
                if (Base.isNull(data.returnJSON)) {
                  _this.login = false;
                } else {
                  _this.login = true;
                  _this.user = data.returnJSON;
                }
              } else {
                _this.login = false;
              }
            });
          }


        }

    }

</script>
