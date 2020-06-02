<template>

  <div id="store_detail_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="data.name" :back="true"></navTitle>

    <div class="wb100">

      <div class="wb100 img-area ">

        <div class="img-area  center">

          <img :src="data.headerimg"/>

        </div>

      </div>

      <div class="clear1 warpper-black-3"></div>

      <div class="warpper-black-3">
        <p class="F16 text-over-hidden1 Fgray-5 pal15 Fnum">{{data.name}}</p>
        <div class="clear h5px"></div>
        <p class="F16 text-over-hidden1 Forange-2 pal15 "><span class="Fnum">{{data.virtualprice}}</span> <span
          class="Forange-2 F14">金币</span></p>
      </div>

      <div class="clear1 warpper-black-3"></div>
      <div class="clear1"></div>

      <div class="pa15 img-area warpper-black-3">

        <p class="Fgray-5">商品介绍</p>

        <div class="clear1 "></div>

        <div v-html="data.content">

        </div>

      </div>

      <div class="clear h45px warpper-black-3"></div>

      <div class="fixed wb100" style="bottom:0;" v-if="goodsNum == 0">
        <div class="wb100 ">
          <div class="wb100 Fwhite h45px lh45px text-center warpper-gray-2">
            暂无库存
          </div>
        </div>
      </div>


      <div class="fixed wb100" style="bottom:0;" @click="exchange" v-else>
        <div class="wb100 ">
          <div class="wb100 Fwhite h45px lh45px text-center warpper-orange-7">
            <span class="Fnum">{{data.virtualprice}}</span>金币抽奖
          </div>
        </div>
      </div>

      <div class="wb100" id="dialog" style="display: none">
        <div class="dialogBg"></div>
        <div class="wb100 fixed" style="bottom:50%;z-index: 99">
          <div class=" warpper-white radius5 wb70 center ">
            <div class="wb100 h150px">
              <div class="text-center">
                <p class="lh60px h60px">抽奖{{data.name}}</p>
                <p class="F14 Fgray-3 bor-solid-1b bor-gray  h40px">需花费<span class="Forange-2 Fnum">{{data.virtualprice}}</span>金币
                </p>
                <p class="lh50px h50px">
                  <span class="fl  wb50 bor-solid-1r bor-gray " style="height: 49px" @click="cancel">取消</span>
                  <span class="fr  wb49 Forange-2" @click="submitOrder(data)">确定</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="wb100" id="dialog1" style="display: none">
        <div class="dialogBg"></div>
        <div class="wb100 fixed" style="bottom:50%;z-index: 99">
          <div class=" warpper-white radius5 wb70 center ">
            <div class="wb100 h150px">
              <div class="text-center">
                <p class="lh60px h60px">您的余额不足</p>
                <p class="F14 Fgray-3 bor-solid-1b bor-gray  h40px">快去竞猜赢金币吧~</p>
                <p class="lh50px h50px">
                  <span class="fl  wb50 bor-solid-1r bor-gray " style="height: 49px" @click="cancel">取消</span>
                  <span class="fr  wb49 Forange-2" @click="guess">去竞猜</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="dialogBg" style="z-index: 99; background: rgba(0,0,0,.7);" v-show="showBuySuccess == true"
           @click="closeBuySuccess"></div>
      <div class="w270px h250px fixed Fwhite F16 text-center" v-show="showBuySuccess == true"
           style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 999;">
        <img src="~@/assets/images/zt.png" class="w130px absolute"
             style="top: 0; left: 0; right: 0; margin: 0 auto; z-index: 99999; width: 134px;">
        <img src="~@/assets/images/gx.png" class="w270px rotater absolute"
             :style="'top: -77px; left: -7px; z-index: 9999;transform:rotate('+ angle +'deg);'">
        <div class="clear h130px"></div>
        <div class="wb100">
          <p class="F16 lh40px">恭喜您抽中</p>
          <p class="lh20px Fyellow F20">{{data.name}}</p>
          <div class="clear h20px"></div>
          <div class="wb45 fl warpper-yellow pa1 radius4 h40px lh40px Fbrown-3 text-center" @click="closeBuySuccess">
            返回
          </div>

          <router-link :to="{ name:'StoreOrderDetail', params: { ordernum: ordernum, bigtype: bigtype } }">
            <div class="wb45 fr  radius4 h40px lh40px text-center Fwhite warpper-red">
              查看详情
            </div>
          </router-link>
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
        data: {},
        login: false,
        address: false,
        page: 1,
        pageSize: 20,
        addressID: "",
        showBuySuccess: false,
        ordernum: "",
        bigtype: "",
        rotateTimer: 0,
        angle: 0,
        username: "",
        telephone: "",
        location: "",
        favDisabled: false,
        goodsNum: ""
      }
    },

    methods: {

      getData() {

        var _this = this;

        var _id = this.$route.params.id;

        Interface.detail(_id, function (data) {

          _this.data = data.data;

          _this.goodsNum = data.data.num;

          _this.fullscreenLoading = false;
        });
      },

      closeBuySuccess(){
        this.showBuySuccess = false;
        window.clearInterval(this.rotateTimer);
      },

      rotation(){
        var _this = this;
        window.clearInterval(_this.rotateTimer);
        _this.rotateTimer = setInterval(function () {
          _this.angle += 3;
        }, 50);
      },

      exchange() {

        var _this = this;

        if (Base.versions.isAndroidApp || Base.versions.isIosApp) {

          if (this.login == true) {

            hostsdk.getUser({

              successCallback: function (res) {

                res = JSON.parse(res);

                _this.coinsQty = res.coinsQty;

                if (_this.coinsQty < _this.data.virtualprice) {

                  $("#dialog1").show(0);

                } else {

                  $("#dialog").show(0);
                }

              },
              errorCallback: function (res) {

                hostsdk.login({

                  successCallback: function (res) {

                  },

                  errorCallback: function (res) {

                  }
                })
              }
            })


          } else {
            hostsdk.login({
              successCallback: function (res) {

              },
              errorCallback: function (res) {

              }
            })
          }
        } else {
          if (this.login == true) {

            if (_this.user.coinsQty < _this.data.virtualprice) {

              $("#dialog1").show(0);

            } else {

              $("#dialog").show(0);
            }

          } else {

            this.$router.push({name: 'Login', params: {call: true}});

            return false;

          }
        }

      },

      guess() {

        var _this = this;

        if (Base.versions.isAndroidApp || Base.versions.isIosApp) {

          hostsdk.openUrl({

            type: "push",

            url: "PushHostGuess",

            errorCallback: function (res) {

            }

          });

        } else {

          _this.$router.push({name: 'Index'});

        }


      },

      cancel() {
        $("#dialog").hide(0);
        $("#dialog1").hide(0);
      },

      submitOrder(param) {

        var _this = this;

        if (_this.favDisabled)
          return;

        if (_this.data.bigtype == 2) {

          if (_this.address == false) {
            //提示新增收货地址

            _this.$router.push({name: 'StoreAddOrderAddress', params: {goodsid: param.id}});

            return false;
          }

        }

        if (_this.data.bigtype == 1) {

          //goodsid, username, telephone
          Interface.createOrder(param.id, _this.username, _this.telephone, _this.location, function (data, errorMsg) {
            if (data) {

              _this.showBuySuccess = true;

              _this.ordernum = data.data.ordernum;

              _this.bigtype = data.data.bigtype;

              _this.rotation();

              $("#dialog").hide(0);

            } else {
              _this.$message({
                type: 'error',
                message: errorMsg,
                duration: 1500
              });

              _this.favDisabled = true;

              setTimeout(function () {
                _this.favDisabled = false;
              }, 1500);

            }

          });

        } else {

          _this.$router.replace({name: 'StoreOrderAddress', params: {goodsid: param.id}});

        }


      }
    },

    mounted(){

      var _this = this;

//      $(window).scrollTop(0);

      $("#dialog").hide(0);

      $("#dialog1").hide(0);

      if (Base.versions.isAndroidApp || Base.versions.isIosApp) {
        HostSdk.inited(function (res, errorMsg) {

          Interface.addressList(_this.page, _this.pageSize, function (data) {

            var _tmp = data.returnJSON.indexData;

            if (_tmp.length == 0) {
              _this.address = false;
              return false;
            } else {
              _this.address = true;
            }

            for (var i = 0; i < _tmp.length; i++) {
              if (_tmp[i].isDefault == 1) {
                _this.addressID = _tmp[i].addressID;
                _this.username = _tmp[i].recipients;
                _this.telephone = _tmp[i].mobilePhone;
                _this.location = _tmp[i].address;

                break;
              }
            }
          });

          _this.getData();


          hostsdk.setLeftIcon({
            params: "custom",
            icon: "https://mp.bombsport.com/source/back.png",
            text: "",
            successCallback: function (res) {

            },
            errorCallback: function (res) {

            },
            leftClicked: function (res) {
              _this.$router.go(-1);
            }
          });


          if (res.uuid) {
            _this.login = true;
          } else {
            _this.login = false;
          }
        });
      } else {
        Interface.userInfo(function (data) {
          var _user = data.returnJSON;
          _this.getData();

          if (Base.isNull(_user)) {
            //- 未登录
            _this.login = false;
          } else {
            _this.user = _user;

            _this.login = true;

            Interface.addressList(_this.page, _this.pageSize, function (data) {

              var _tmp = data.returnJSON.indexData;

              if (_tmp.length == 0) {
                _this.address = false;
                return false;
              } else {
                _this.address = true;
              }

              for (var i = 0; i < _tmp.length; i++) {
                if (_tmp[i].isDefault == 1) {
                  _this.addressID = _tmp[i].addressID;
                  _this.username = _tmp[i].recipients;
                  _this.telephone = _tmp[i].mobilePhone;
                  _this.location = _tmp[i].address;
                  break;
                }
              }
            });
          }
        });
      }

      _this.showBuySuccess = false;


    }

  }

</script>
