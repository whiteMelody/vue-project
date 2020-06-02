<template>

  <div id="store_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'金币商城'" :back="true" :fixed="showTitle"></navTitle>

      <template v-if="showTitle == true">
        <div class="clear h50px"></div>
      </template>
      <template v-else>
        <div class="clear"></div>
      </template>

    <div class="wb100 warpper-black-3 ">

        <div class="h50px lh50px wb100 relative ">

          <div @click="prizeGo">
            <div class="grid-content wb50 fl bg-purple text-center pat10 pab10">
              <div class="wb100 h30px lh30px">
                <div class="w100px center">
                  <div class="w20px img-area fl">
                    <img src="~@/assets/images/cjjl_sc.png" class=" " style="margin-top: 3px">
                  </div>
                  <span class="fl Fgray-5 mal5" style="">抽奖记录</span>
                </div>
              </div>
            </div>
          </div>

          <div @click="addressGo">
            <div class="grid-content wb50 fl bg-purple-light text-center pat10 pab10">
              <div class="wb100  h30px lh30px bor-solid-1l bor-gray6 ">
                <div class="w100px center">
                  <div class="w16px img-area fl">
                    <img src="~@/assets/images/dz_sc.png" class=" " style="margin-top: 3px">
                  </div>
                  <span class="fl Fgray-5 mal5" style="">收货地址</span>
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>

      <div class="pal705 par705 Fgray-3">

        <div class="clear1"></div>

        <!--<div class="wb100" v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">-->
          <div class="wb50 fl" v-for="(item,key) in prizeList">
            <div class="pal705 par705 mab15">
              <div class="wb100 warpper-black-3">
                <router-link :to="{ name:'StoreDetail', params: {id: item.id } }">
                  <div class="wb100 img-area relative">
                    <img src="~@/assets/images/nothing2.png" style="z-index: 9; position: absolute; " v-if="item.num == 0" >
                    <img :src="item.headerimg"/>
                  </div>
                  <div class=" pa10">
                    <p class="F16 h20px lh20px text-over-hidden1 Fgray-5 Fnum">{{item.name}}</p>
                    <p class="F16 h20px lh20px text-over-hidden1 Forange-2 mat5"><span class="Fnum">{{item.virtualprice}}</span> <span class="Forange-2 F12">金币</span></p>
                  </div>
                </router-link>
              </div>
            </div>
          <!--</div>-->
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
          <div class="clear1"></div>
          <p class="Fgray-6 F16 lh25px h25px">暂无商品</p>
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

</template>

<style>
  .bor-gray6{border-color:#4F5168}
  .w16px{width:16px}
</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'
    import HostSdk from '../../assets/js/hostSdk.js'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              isApp: false,
              page: 0,
              pageSize: 20,
              login: false,
              prizeList: [],
              loading: true,
              showTitle: true,
              last: false,
              empty: false,
              address:true,
            }
        },

        methods: {

          addressGo() {

            var _this = this;

            if(Base.versions.isAndroidApp || Base.versions.isIosApp){
              if(this.login == true){

                  if(this.address == false){
                    this.$router.push({ name: 'StoreAddAddress'});
                  }else{
                    this.$router.push({ name: 'StoreDeliveryAddress'});
                  }
              }else{
                hostsdk.login({
                  successCallback : function(res){

                    if(this.address == false){
                      _this.$router.push({ name: 'StoreAddAddress'});
                    }else{
                      _this.$router.push({ name: 'StoreDeliveryAddress'});
                    }

                  },
                  errorCallback : function(res){

                  }
                })
              }
            }else{
              if(this.login == true){
                if(this.address == false){
                  this.$router.push({ name: 'StoreAddAddress'});
                }else{
                  this.$router.push({ name: 'StoreDeliveryAddress'});
                }
              }else{
                this.$router.push({ name: 'Login', params:{ call: true, callUrl: 'StoreDrawRecord' } });
              }
            }

          },

          prizeGo() {

              var _this = this;

              if(Base.versions.isAndroidApp || Base.versions.isIosApp){
                  if(this.login == true){
                    this.$router.push({ name: 'StoreDrawRecord'});
                  }else{
                    hostsdk.login({
                      successCallback : function(res){
                          _this.$router.push({ name: 'StoreDrawRecord'});
                      },
                      errorCallback : function(res){

                      }
                    })
                  }
              }else{
                if(this.login == true){
                  this.$router.push({ name: 'StoreDrawRecord'});
                }else{
                  this.$router.push({ name: 'Login', params:{ call: true, callUrl: 'StoreDrawRecord' } });
                }
              }

          },

          getaddressList() {

            var _this = this;

            Interface.addressList(1, 100, function (data) {

              var _tmp = data.returnJSON.indexData;

              if(_tmp.length == 0){

                _this.address = false;

              }

            });
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

            Interface.goodsList(_this.page,_this.pageSize, _this.bigtype, _this.category_id, function (data) {

              if(data){

                var _tmp = data.data.pagelist;

                _this.prizeList = _this.prizeList.concat(_tmp);

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

                _this.loading = false;

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

          if(Base.versions.isAndroidApp || Base.versions.isIosApp || Base.versions.isWeiXin){
            this.showTitle = false;
          }

//          $('#store_page').scrollTop(1000);

          if(Base.versions.isAndroidApp || Base.versions.isIosApp){
            HostSdk.inited(function (res, errorMsg) {

              _this.getaddressList();

              hostsdk.setLeftIcon({
                params:"back",
                successCallback:function (res) {

                  hostsdk.setViewTitle({
                    title:"金币商城",
                    successCallback:function (res) {

                      hostsdk.setRightIcon({
                        params:"refresh",
                        successCallback:function (res) {

                        },
                        errorCallback:function (res) {

                        },
                        rightClicked:function (res) {

                        }
                      });

                    },

                    errorCallback:function (res) {

                    },
                  });
                },
                errorCallback:function (res) {

                },
                leftClicked:function (res) {

                }
              });

              if(res.uuid) {
                _this.login = true;
              }else {
                _this.login = false;
              }
            });
          }else{
            Interface.userInfo(function (data) {
              _this.getaddressList();
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

          _this.getData();

        }

    }

</script>
