<template>

  <div id="store_order_address_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'收货地址'" :back="true"></navTitle>

    <div class="wb100">

      <template v-for="(item,key) in deliveryList">
        <div class="wb100 warpper-black-3">
          <div class="pa15 Fgray-5">
            <p>

              <span class="fl">{{item.recipients}}</span>
              <span class="fr Fnum">{{item.mobilePhone}}</span>
            </p>
          </div>

          <div class="clear1"></div>

          <div class="pal15">
            <p class="F14  h30px bor-solid-1b bor-gray-9 Fgray-5">{{item.address}}</p>

          </div>

          <div class="pa15">

            <div class="radio fl h30px lh30px" @click="myClick(item.addressID, key)">
              <el-radio  v-model="radio" :label="item.addressID" ><span class="Fgray-5">设为默认地址</span></el-radio>
            </div>

            <div class="fr bor-solid-1a w60px h30px lh30px text-center radius5 Fgray-5"  @click="exchange(item.addressID)">
              删除
            </div>

            <!--<a :href="'store_edit_order_address.html?addressID='+item.addressID+'&recipients='+item.recipients+'&mobilePhone='+item.mobilePhone+'&address='+item.address">-->
            <div class="fr bor-solid-1a w60px h30px lh30px text-center radius5 mar15 Fgray-5" @click="edit(item)">
              编辑
            </div>
            <!--</a>-->

          </div>
          <div class="clear1"></div>
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


      <div class="pa15">
        <div class="wb100 h45px lh45px Forange-2 F16 text-center radius5 bor-solid-1a bor-orange4"  @click="submitOrder">新增收货地址</div>
      </div>

      <div class="pal15 par15">
        <div class="wb100 h45px lh45px Fwhite F16 text-center radius5 warpper-orange-7"  @click="pay">确定</div>
      </div>


      <div class="dialogBg" style="z-index: 99; background: rgba(0,0,0,.7);" v-show="showBuySuccess == true" @click="closeBuySuccess"></div>
      <div class="w270px h250px fixed Fwhite F16 text-center" v-show="showBuySuccess == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 999;">
        <img src="~@/assets/images/zt.png" class="w130px absolute" style="top: 0; left: 0; right: 0; margin: 0 auto; z-index: 99999; width: 134px;">
        <img src="~@/assets/images/gx.png" class="w270px rotater absolute" :style="'top: -77px; left: -7px; z-index: 9999;transform:rotate('+ angle +'deg);'">
        <div class="clear h130px"></div>
        <div class="wb100">
          <p class="F16 lh40px">恭喜您抽中</p>
          <p class="lh20px Fyellow F20">{{Data.goodsname}}</p>
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
              Data:{},
              radio: 0,
              deliveryList: [],
              page: 1,
              pageSize: 20,
              removeID: 0,
              recipients:"",
              favDisabled: false,
              showBuySuccess: false,
              rotateTimer: 0,
              angle: 0,
              ordernum:"",
              bigtype:"",
              isChange: false,
            }
        },

        methods: {
          getData() {
            var _this = this;
            _this.goodsid = this.$route.params.goodsid;
          },

          closeBuySuccess(){
            this.showBuySuccess = false;
            window.clearInterval(this.rotateTimer);
          },

          rotation(){
            var _this = this;
            window.clearInterval(_this.rotateTimer);
            _this.rotateTimer = setInterval(function(){
              _this.angle += 3;
            },50);
          },

          edit(key) {
            var _this = this;

            _this.addressID = key.addressID;

            _this.recipients = key.recipients;

            _this.mobilePhone = key.mobilePhone;

            _this.address = key.address;

            _this.$router.replace({ name: 'StoreEditOrderAddress', params:{ addressID: _this.addressID, recipients: _this.recipients, mobilePhone: _this.mobilePhone, address: _this.address, goodsid: _this.goodsid }});

          },

          myClick(key, i) {

            var _this = this;

            _this.radio = key;

            _this.addressID = key;

            _this.username = _this.deliveryList[i].recipients;

            _this.telephone = _this.deliveryList[i].mobilePhone;

            _this.location = _this.deliveryList[i].address;

            Interface.defaultAddress(key, function (data) {
              if(data){

              }
            });
          },

          getaddressList() {

            var _this = this;

            Interface.addressList(_this.page, _this.pageSize, function (data) {

              var _tmp = data.returnJSON.indexData;

              for (var i = 0; i < _tmp.length; i++) {
                if (_tmp[i].isDefault == 1) {
                  _this.radio = _tmp[i].addressID;
                  _this.username = _tmp[i].recipients;
                  _this.telephone = _tmp[i].mobilePhone;
                  _this.location = _tmp[i].address;
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

          pay() {

            var _this = this;

            if(_this.isChange == true){
              return;
            }

            _this.isChange = true;

            if(_this.favDisabled)
              return;

            if(_this.deliveryList.length == 0){
              _this.$message({
                type: 'error',
                message: '请添加收货地址',
                duration: 1500
              });

              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }

            if(_this.radio == 0){

              _this.username = _this.deliveryList[0].recipients;
              _this.telephone = _this.deliveryList[0].mobilePhone;
              _this.location = _this.deliveryList[0].address;
            }


            _this.addressID = _this.radio;

            //productID, productName, productImgUrl, productType, productPrice, addressID,
            Interface.createOrder(_this.goodsid, _this.username, _this.telephone, _this.location, function (data, errorMsg) {
              if (data) {

                _this.isChange = false;

                console.log(data);

                _this.showBuySuccess = true;

                _this.ordernum = data.data.ordernum;

                _this.bigtype = data.data.bigtype;

                _this.Data = data.data;

                _this.rotation();


              } else {
                _this.$message({
                  type: 'error',
                  message: errorMsg,
                  duration: 1500
                });

                _this.isChange = false;

                _this.favDisabled = true;

                setTimeout(function(){
                  _this.favDisabled = false;
                },1500);

              }

            });

          },

          submitOrder() {

            var _this = this;


            if(_this.login == true){

              _this.$router.push({ name: 'StoreAddOrderAddress', params:{ goodsid: _this.goodsid } });

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

              _this.getData();
              _this.showBuySuccess = false;
              _this.deliveryList = [];
              _this.getaddressList();
              if(res.uuid) {
                _this.login = true;
              }else {
                _this.login = false;
              }
            });
          }else{
            Interface.userInfo(function (data) {
              _this.getData();
              _this.showBuySuccess = false;
              _this.deliveryList = [];
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

        }

    }

</script>
