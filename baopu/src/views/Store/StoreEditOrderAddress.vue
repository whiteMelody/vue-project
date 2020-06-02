<template>

  <div id="store_edit_order_address_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'编辑收货地址'" :back="true"></navTitle>

    <div class="wb100">

      <div class="Fgray-3 wb100">

        <div class="pal15  relative F14 warpper-black-3">
          <div>
            <input type="text" class="bor-none wb100 h40px lh40px F16 warpper-black-3 Fgray-5" v-model="name" placeholder="输入收货人姓名">
          </div>
          <div class="clear"></div>
          <div class="clear bor-black3 bor-solid-1b h1px"></div>
        </div>

        <div class="pal15  relative F14 warpper-black-3">
          <div>
            <input type="tel" class="bor-none wb100 h40px lh40px F16 warpper-black-3 Fgray-5" v-model="mobile" placeholder="手机号码">
          </div>
          <div class="clear"></div>
          <div class="clear bor-black3 bor-solid-1b h1px"></div>
        </div>

        <div class="pal15  relative F14 warpper-black-3">
          <div>
            <input type="text" class="bor-none wb100 h40px lh40px F16 warpper-black-3 Fgray-5" v-model="address" placeholder="详细地址">
          </div>
          <div class="clear"></div>
          <div class="clear bor-black3 bor-solid-1b h1px"></div>
        </div>


      </div>


      <div class="clear1"></div>

      <div class="pa15">
        <div class="wb100 h45px lh45px Fwhite F16 text-center radius5" :class="mobile.length>0 && code.length>0 ? 'warpper-orange-7 Fwhite' : 'warpper-orange-7 Fwhite'" @click="storage">保存</div>
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

        props: {},

        data (){
            return {
              fullscreenLoading: true,
              name: "",
              mobile: "",
              address: "",
              code: "",
              addressID: "",
              favDisabled: false,
            }
        },

        methods: {
          getData: function getData() {
            var _this = this;

            _this.addressID = this.$route.params.addressID;

            _this.name = decodeURI(this.$route.params.recipients);

            _this.mobile = this.$route.params.mobilePhone;

            _this.address = decodeURI(this.$route.params.address);

            _this.goodsid = this.$route.params.goodsid;

//                _this.username = this.$route.params.username;
//
//                _this.telephone = this.$route.params.telephone;

          },

          storage: function storage() {

            var _this = this;

            if(_this.favDisabled)
              return;

            if (Base.isNull(_this.name)) {
              _this.$message({
                type: 'error',
                message: '姓名不能为空',
                duration: 1500
              });

              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }

            if (Base.isNull(_this.mobile)) {
              _this.$message({
                type: 'error',
                message: '手机号不能为空'
              });

              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }
            if (Base.isNull(_this.address)) {
              _this.$message({
                type: 'error',
                message: '地址不能为空'
              });

              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }

            Interface.editAddress(_this.addressID, _this.name, _this.mobile, _this.address, function (data, errorMsg) {

              console.log(data);

              _this.$router.replace({ name: 'StoreOrderAddress', params:{ goodsid: _this.goodsid } });

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

          _this.fullscreenLoading = false;

        }

    }

</script>
