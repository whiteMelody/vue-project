<template>

  <div id="store_delivery_address_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'收货地址'" :back="true"></navTitle>

    <div class="wb100">

      <template v-for="(item,key) in deliveryList">
        <div class="wb100 warpper-black-3 bor-solid-1t bor-black3">
          <div class="pa15 Fgray-5">
            <p>

              <span class="fl">{{item.recipients}}</span>
              <span class="fr Fnum">{{item.mobilePhone}}</span>
            </p>
          </div>

          <div class="clear1"></div>

          <div class="pal15">
            <p class="F14  h30px bor-solid-1b bor-black3 Fgray-5">{{item.address}}</p>

          </div>

          <div class="pa15">

            <div class="radio fl h30px lh30px " @click="myClick(item.addressID)">
              <el-radio  v-model="radio" :label="item.addressID"  ><span class="Fgray-5">设为默认地址</span></el-radio>
            </div>

            <div class="fr bor-solid-1a w60px h30px lh30px text-center radius5 Fgray-5"  @click="exchange(item.addressID)">
              删除
            </div>

            <router-link :to="{ name:'StoreEditAddress', params: { addressID: item.addressID, recipients: item.recipients, mobilePhone: item.mobilePhone, address: item.address } }">
              <div class="fr bor-solid-1a w60px h30px lh30px text-center radius5 mar15  Fgray-5">
                编辑
              </div>
            </router-link>

          </div>
          <div class="clear1 bor-solid-1b bor-black3"></div>
          <div class="clear1 warpper-black-4"></div>
        </div>

      </template>

      <div class="wb100" id="dialog" style="display: none">
        <div class="dialogBg"></div>
        <div class="wb100 fixed" style="bottom:50%;z-index: 99">
          <div class=" warpper-white radius5 wb70 center ">
            <div class="wb100 h150px">
              <div class="text-center">
                <p class="lh100px h100px bor-solid-1b bor-gray">确定删除地址吗？</p>
                <!--<p class="F14 Fgray-3 bor-solid-1b bor-gray  h40px">需花费<span class="Fred Fnum"></span>金币</p>-->
                <p class="lh50px h50px">
                  <span class="fl  wb50 bor-solid-1r bor-gray " style="height: 49px" @click="cancel">取消</span>
                  <span class="fr  wb49 Forange-2" @click="remove">确定</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="clear h45px"></div>

      <div class="fixed wb100"  style="bottom:0;">

        <div class="wb100" @click="submitOrder">
          <div class="wb100 Fwhite h45px lh45px text-center warpper-orange-7">
            新增收货地址
          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<style>
  .el-radio__input.is-checked .el-radio__inner{border-color: #ee542c;background: #ee542c;}
</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'
    import HostSdk from '../../assets/js/hostSdk.js'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              radio: 0,
              deliveryList: [],
              page: 1,
              pageSize: 20,
              removeID: 0,
            }
        },

        methods: {
          myClick(key) {

            var _this = this;

            _this.radio = key;

            Interface.defaultAddress(key, function (data) {

            });
          },

          getaddressList() {

            var _this = this;

            Interface.addressList(_this.page, _this.pageSize, function (data) {

              var _tmp = data.returnJSON.indexData;



              for (var i = 0; i < _tmp.length; i++) {
                if (_tmp[i].isDefault == 1) {
                  _this.radio = _tmp[i].addressID;

                  break;
                }
              }

              _this.fullscreenLoading = false;

              _this.deliveryList = _this.deliveryList.concat(_tmp);


            });
          },

          exchange(key) {

            $("#dialog").show(0);
            this.removeID = key;
            console.log(key)
          },

          cancel(key) {

            $("#dialog").hide(0);
            this.removeID = key;
          },

          remove() {

            var _this = this;

            Interface.delAddress(_this.removeID, function (data) {

              if (data) {
                _this.deliveryList = [];
                _this.getaddressList();
              }
            });

            $("#dialog").hide(0);

          },

          submitOrder() {

            var _this = this;

            if(_this.login == true){

              _this.$router.push({ name: 'StoreAddAddress' });

            }else{

              if(Base.versions.isAndroidApp || Base.versions.isIosApp){

                hostsdk.login({
                  successCallback: function (res) {

                  },
                  errorCallback: function (res) {

                  }
                })

              }else{

                _this.$router.push({ name: 'Login', params:{ call: true } });

              }
            }
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

              if(res.uuid) {
                _this.login = true;
              }else {
                _this.login = false;
              }
            });
          }else{
            Interface.userInfo(function (data) {
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

          _this.deliveryList = [];
          _this.page = 1;
          _this.loading = true;
          _this.last = false;
          _this.empty = false;
          _this.loadtext = '数据加载中...';

          _this.getaddressList();

        }

    }

</script>
