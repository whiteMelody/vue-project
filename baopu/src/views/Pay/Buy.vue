<template>

  <div id="pay_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'支付'" :back="showBack"></navTitle>

    <!--支付完成弹窗-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showResult == true" @click="calPay"></div>
    <div class="w270px h150px fixed warpper-white Fgray-3 lh45px radius5 F16 text-center" v-show="showResult == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 9999;">
      <div class="wb100">
        <p class="h60px lh60px Fblack">请确认支付是否已完成</p>
        <p class="bor-gray bor-solid-1b bor-solid-1t Fred" @click="donePay">已完成支付</p>
        <p class="Fgray-2" @click="isLock = false; orderPay()">支付遇到问题，重新支付</p>
      </div>
    </div>


    <!--购买成功弹窗-->
    <div class="dialogBg" style="z-index: 99; background: rgba(0,0,0,.7);" v-show="showBuySuccess == true" @click="closeBuyDialog"></div>
    <div class="w270px h250px fixed Fwhite F16 text-center" v-show="showBuySuccess == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 999;">
      <img src="~@/assets/images/buy-success.png" class="w130px absolute" style="top: 0; left: 0; right: 0; margin: 0 auto; z-index: 9999; width: 134px;">
      <img src="~@/assets/images/buy-success-shadow.png" class="w270px rotater absolute" :style="'top: -77px; left: -7px; z-index: 9999;transform:rotate('+ angle +'deg);'">
      <div class="clear h130px"></div>
      <div class="wb100">
        <p class="F20 lh40px">购买成功</p>

        <div class="clear h20px"></div>

        <div class="wb45 fl bor-green2 bor-solid-1a radius4 h40px lh40px text-center Fgreen-2" @click="closeBuyDialog(0)">
          查看详情
        </div>

        <div class="wb45 fr warpper-green-1 pa1 radius4 h40px lh40px Fblack text-center" @click="closeBuyDialog(1)">
          继续竞猜
        </div>

      </div>
    </div>

    <div class="wb100 Fgray-5" v-show="showRedBag == true">
      <template v-for="(item,key) in redBagList">

        <div class="clear1"></div>

        <div class="pa15 relative warpper-black-3">

          <div class="w80px h50px warpper-orange-7 fl text-center Fwhite pat10 pab10 lh25px F14 radius5">
            <p class="lh25px"><span class="Fnum F24">{{item.faceValue}}</span>金币</p>
            <p class="F12 lh15px">满<span class="Fnum">{{item.limit}}</span>可用</p>
          </div>

          <div class="w180px fl lh30px pat10 pal10" style="width: 170px;">
            <p class="F18 lh25px">红包</p>
            <p class="F12 Fgray-6">有效期至<span class="Fnum">{{item.endTime}}</span></p>
          </div>

          <div class="w30px h30px fr mat20" @click="myClick(key)">
            <el-radio class="radio" v-model="redBagRadio" :label="key">&nbsp;</el-radio>
          </div>

          <!--<div class="w80px fr h40px lh40px bor-red bor-solid-1a text-center Fred F16 mat15 radius5">-->
          <!--立即使用-->
          <!--</div>-->

          <div class="clear"></div>

        </div>

        <div class="clear"></div>

      </template>

      <div class="clear h80px"></div>

      <div class="wb100 fixed" style="bottom: 15px;">

        <div class="pa15">
          <div class="wb45 fl warpper-orange-7 Fwhite pa1 h45px lh45px text-center radius5" @click="selectRedBag(1)">
            确定
          </div>

          <div class="wb45 fr bor-gray bor-solid-1a Fgray-3 h45px lh45px text-center radius5 warpper-white" @click="selectRedBag(0)">
            取消
          </div>
        </div>
      </div>

    </div>

    <div class="wb100" v-show="showRedBag == false">

      <div class="wb100">

        <div class="pa15 lh25px Fgray-5 warpper-black-3">

          <p>达人推荐——{{title}}</p>

        </div>

        <div class="clear1"></div>

        <div class="pal15 Fgray-6 warpper-black-3 lh45px">

          <p class="par15 h45px">
            <span class="fl">订单金额</span>
            <span class="fr Fnum Fgray-5">{{money}}金币</span>
          </p>
          <div class="clear bor-black3 bor-solid-1b"></div>
          <p class="par15 h45px">
            <span class="fl">余额抵扣</span>

            <template v-if="resultMoney >= 0">
              <span class="fr Fnum Forange-2">{{twoDecimal(user.coinsQty)}}金币</span>
            </template>

            <template v-else-if="resultMoney < 0">
              <span class="fr Fnum Forange-2">{{twoDecimal(payment)}}金币</span>
            </template>

          </p>
          <div class="clear bor-black3 bor-solid-1b"></div>

          <template v-if="redBagList.length == 0">
            <p class="par15 h45px">
              <span class="fl">红包</span>
              <span class="fr Fgray-5">暂无可用</span>
            </p>
          </template>

          <template v-else>
            <p class="par15 h45px" @click="showRedBag = true">
              <span class="fl">红包</span>


              <template v-if="redBagMoney == 0">
                <span class="fr Fgray-2">{{redBagList.length}}个可用红包 <img src="~@/assets/images/arrow-right.png" class="fr h14px mal5" style="margin-top: 16px;"></span>
              </template>

              <template v-if="redBagMoney != 0">
                <span class="fr Fnum Fred">{{redBagMoney}}金币<img src="~@/assets/images/arrow-right.png" class="fr h14px mal5 mat15"></span>
              </template>

            </p>
          </template>

          <div class="clear bor-black3 bor-solid-1b"></div>

        </div>

        <div class="clear1"></div>

        <div class="pal15 par15 lh45px h45px Fgray-5 warpper-black-3">
          <span class="fl">应付</span>

          <!-- 金额 - 余额 - 红包 -->
          <!--需要付款-->
          <template v-if="resultMoney > 0">
            <span class="fr Fnum Forange-2">{{ twoDecimal(resultMoney) }}元 = {{ twoDecimal(resultMoney) }}金币</span>
          </template>

          <!--余额支付-->
          <template v-else>
            <span class="fr Fnum Forange-2">0 金币</span>
          </template>

        </div>

      </div>

      <div class="clear1"></div>

      <template v-if="isWeiXin">
        <div class="pa15">
          <div class="wb100 warpper-orange-7 Fwhite h45px lh45px text-center radius5 F16" @click="orderPay('wx')">
            微信支付
          </div>
        </div>
      </template>

      <template v-else>
        <div class="pal15 Fgray-3 F14 lh40px Fgray-5 warpper-black-3" v-if="resultMoney > 0">
          <p class="Fgray-6">选择支付方式</p>

          <div class="clear bor-black3 bor-solid-1b"></div>
          <div class="clear1"></div>
          <div class="wb100">
            <p class="h30px lh30px wb100" @click="radio = 0">
              <span class="fl h30px lh30px"> <img src="~@/assets/images/alipay.png" class="h30px fl mar5">支付宝 </span>
              <el-radio class="radio fr mar15" v-model="radio" :label="0">&nbsp;</el-radio>
            </p>
            <div class="clear1 bor-black3 bor-solid-1b"></div>
            <template v-if="isMobile == true">
              <div class="clear1"></div>
              <p class="h30px lh30px wb100" @click="radio = 1">
                <span class="fl h30px lh30px"> <img src="~@/assets/images/wxpay.png" class="h30px fl mar5">微信</span>
                <el-radio class="radio fr mar15" v-model="radio" :label="1">&nbsp;</el-radio>
              </p>
            </template>
            <div class="clear1"></div>
          </div>
        </div>


        <div class="clear h80px"></div>

        <div class="wb100 fixed" style="bottom: 0;">
          <div class="pa15">
            <div class="wb100 warpper-orange-7 Fwhite h45px lh45px text-center radius5 F16" @click="orderPay">
              立即购买
            </div>
          </div>
        </div>

        <div class="wb100 payHtml hidden"></div>
      </template>

    </div>

  </div>

</template>

<style>

  .el-radio__input.is-checked .el-radio__inner{border-color: #ee542c;background: #ee542c;}
  .el-radio__inner:hover{border-color: #ee542c;}
  .el-radio__input.is-focus .el-radio__inner{border-color: #ee542c;}

</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'
    import hostSdk from "../../assets/js/hostSdk.js";

    export default{

      data (){
            return {
              fullscreenLoading: true,
              login: false,
              isLock: false,
              isWeiXin: false,
              isMobile: false,
              appPay: false,
              showBack: false,
              title: '',
              newsID: '',
              money: 0,
              orderID: 0,
              radio: 1,
              redBagRadio: -1,
              redBagMoney: 0,
              rotateTimer: 0,
              angle: 0,
              redBagList: [],
              user: {
                photoUrl: '',
                coinsQty: 0
              },
              showRedBag: false,
              showBuySuccess: false,
              showResult: false,
              resultMoney: 0,
              payment: 0,
              payType: 0,
              favDisabled: false,
            }
        },

        methods: {

          donePay() {

            this.isLock = false;

            var paymentNo = Base.getCookie('paymentNo');

            if(Base.isNull(paymentNo))
              return false;

            var payType = Base.getCookie('payType');

            if(Base.isNull(payType))
              return false;

            var _this = this;

            _this.showResult = false;

            Interface.payResultQuery(paymentNo, payType, function (data, errorMsg) {

              if (data) {
                Base.setCookie('paymentNo', null);
                Base.setCookie('payIng', null);
                Base.setCookie('payType', null);
                Base.setCookie('payMoney', null);

                _this.$router.replace({ name: 'PaySuccess' });

//                        window.history.go(-1);
              } else {
                Base.setCookie('paymentNo', null);
                Base.setCookie('payIng', null);
                Base.setCookie('payType', null);
                Base.setCookie('payMoney', null);
                _this.$message({
                  type: 'error',
                  message: errorMsg,
                  duration: 1500
                });
              }
            });

          },

          calPay(){

            if(Base.versions.isAndroidApp || Base.versions.isIosApp){
              //刷新余额
              hostsdk.UpdateUserInfo({
                successCallback:function () {},
                errorCallback:function () {}
              });
            }

            this.isLock = false;
            Base.setCookie('paymentNo', null);
            Base.setCookie('payIng', null);
            Base.setCookie('payType', null);
            Base.setCookie('payMoney', null);
            this.showResult = false;
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
          },

          myClick(key) {

            this.redBagRadio = key;

          },

          closeBuyDialog(type) {
              var _this = this;
              if(Base.versions.isAndroidApp || Base.versions.isIosApp){
                  if(type == 0){
                      //回详情
                      hostsdk.openUrl({
                          type:"push",
                          url:"openGuessDetails",
                          params:{orderID:_this.orderID},
                          errorCallback : function(res){}
                      })
                  }else{
                      //回首页
                      hostsdk.exit({
                        errorCallback : function(res){}
                      });
                  }
              }else {
                  if(type == 0){
                    _this.$router.replace({ name: 'SoccerResult', params:{ orderID: _this.orderID, back: true } });
                  }else{
                    _this.$router.replace({ name: 'Index'});
                  }
              }
          },

          selectRedBag(val) {

            if (val == 1) {
              //
              this.redBagMoney = this.redBagList[this.redBagRadio].faceValue;
            }
            if (val == 0) {
              //
              this.redBagMoney = 0;
              this.redBagRadio = -1;
            }

            this.showRedBag = false;

            this.payment = this.money - this.redBagMoney;
            this.resultMoney =  this.money - this.user.coinsQty - this.redBagMoney;

          },

          rotation(){
            var _this = this;
            window.clearInterval(_this.rotateTimer);
            _this.rotateTimer = setInterval(function(){
              _this.angle += 3;
            },50);
          },

          orderPay(val) {
            var _this = this;

            if(_this.isLock == true)
              return false;

            _this.isLock = true;

            if(_this.favDisabled)
              return;

            if(_this.login == false){
                _this.$router.push({ name: 'Login', params:{ call: true } });
              return false;
            }

            //判断金额
            if (Base.isNull(_this.money)) {
              _this.$message({
                type: 'error',
                message: '投注金额不合法',
                duration: 1500
              });

              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }

            if (isNaN(_this.money)) {
              _this.$message({
                type: 'error',
                message: '投注金额不合法',
                duration: 1500
              });

              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }

            var redBagNo = '';
            if(_this.redBagMoney == 0){
              //未选择红包
            }else{
              redBagNo = _this.redBagList[_this.redBagRadio].serialNumber;
            }

            //判断支付方式
            if(_this.resultMoney > 0){

              Interface.createNewsOrder(_this.newsID, redBagNo, function (data, errorMsg) {

                if(data){

                  if(val == 'wx'){
                    //微信公众号支付
                    Interface.wxJsPay(_this.money, 2, data.returnJSON.orderNo, function (data) {

                      WeixinJSBridge.invoke(
                        'getBrandWCPayRequest',
                        JSON.parse(data.returnJSON),
                        function(res){
                          if(res.err_msg == "get_brand_wcpay_request:ok") {

                            _this.$router.replace({ name: 'PaySuccess' });

                          }else if(res.err_msg== "get_brand_wcpay_request:cancel"){
                            _this.$message({
                              type: 'error',
                              message: '支付取消',
                              duration: 1500
                            });
                            _this.isLock = false;
                          }else{
                            _this.$message({
                              type: 'error',
                              message: '支付失败',
                              duration: 1500
                            });
                            _this.isLock = false;
                          }
                        }
                      );

                    })

                    return false;
                  }

                  var _url = 'https://mp.bombsport.com/beta/?source='+Interface.getSource()+'#/PayResult?uuid='+Interface.getUserId();
//                  var _url = 'http://192.168.8.152:8080/#/PayResult/';

                  //支付宝
                  if(_this.radio == 0) {
                    Interface.alipayWap(_this.money, _url, 2, data.returnJSON.orderNo, function (data2) {

                      if(Base.versions.isAndroidApp || Base.versions.isIosApp){
                        _this.showResult = true;
                      }

                      data2 = data2.replace('POST', 'GET');
                      clearInterval(_this.timerID);
                      var index1 = data2.indexOf('"out_trade_no":"');
                      var index2 = data2.indexOf('",', index1);
                      var _str = data2.substring(index1 + 16, index2);

//                      _this.appOrderNum = _str;

                      Base.setCookie('paymentNo', _str);
                      Base.setCookie('payIng',true);
                      Base.setCookie('payType',0);
                      $(".payHtml").html(data2);
                      //设置支付状态
                      Base.setCookie('calOrder',true);
                    })
                  }else{
                    //微信
                    Interface.wxWebPay(_this.money * 100, 2, data.returnJSON.orderNo, function (data) {
                      if(data){

                        if(Base.versions.isAndroidApp || Base.versions.isIosApp){
                          _this.showResult = true;
                          window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('https://mp.bombsport.com/beta/moblinkweixin.html?orderNo='+data.returnJSON.orderNo);
                        }else{

                          let appPay = Base.getCookie('appPay');

                          if(!Base.isNull(appPay)){
                            window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('https://mp.bombsport.com/beta/moblinkweixin.html?orderNo='+data.returnJSON.orderNo);
                          }else{
                            //部分微信不能打开回调链接
                            window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('https://mp.bombsport.com/beta/payback.html?orderNo='+data.returnJSON.orderNo+','+ Interface.getSource());

//                            window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI(_url);
                          }

                        }


                        clearInterval(_this.timerID);

//                        _this.appOrderNum = _str;

                        Base.setCookie('payIng',true);
                        Base.setCookie('paymentNo', data.returnJSON.orderNo);
                        Base.setCookie('payType',1);
                        //设置支付状态
                        Base.setCookie('calOrder',true);
                      }
                    });
                  }

                }
                else{
                  _this.$message({
                    type: 'error',
                    message: errorMsg,
                    duration: 3000
                  });
                }

              });
//
            }else{
              //余额支付

              let appPay = Base.getCookie('appPay');

              Interface.payNews(_this.newsID, redBagNo, function (data) {

                if(data){

                  if(!Base.isNull(appPay)){
                    window.location.href = 'https://mp.bombsport.com/beta/moblinkweixin.html?orderNo='+data.returnJSON.orderNo+ '&payType=1&result=1';
                    return false;
                  }

                  _this.showBuySuccess = true;

                  _this.orderID = data.returnJSON.orderID;

//                  var _num = 0;
//
//                  for(var i=0; i<_this.matchList.length; i++){
//
//                    if(_num == 0){
//                      _num = _this.matchList[i].odds;
//                    }else{
//                      _num *= _this.matchList[i].odds;
//                    }
//
//                  }
//
//                  _this.odds = _num;

                  _this.rotation();
                }
                else{
                  _this.$message({
                    type: 'error',
                    message: '购买失败',
                    duration: 3000
                  });
                  if(!Base.isNull(appPay)){
                    window.location.href = 'https://mp.bombsport.com/beta/moblinkweixin.html?orderNo='+data.returnJSON.orderNo+ '&payType=1&result=0';
                    return false;
                  }
                }

              });

            }

          }

        },

        mounted(){

          let _this = this;

          if(Base.versions.isWeiXin){
            _this.isWeiXin = true;
          }else{
            _this.isWeiXin = false;
          }
          if(Base.versions.isMobile){
            _this.isMobile = true;
            _this.radio = 1;
          }else{
            _this.isMobile = false;
            _this.radio = 0;
          }

          _this.showBuySuccess = false;

          let _newsID = _this.$route.query.newsID;
          let _money = _this.$route.query.money;
          let _title = _this.$route.query.title;

          _this.money = _money || 0 ;

          _this.title = _title;

          _this.fullscreenLoading = false;

          if(Base.isNull(_newsID)){
            _this.$message({
              type: 'error',
              message: '无效订单',
              duration: 3000
            });
            return false;
          }

          _this.newsID = _newsID;

          //- 判断登录
          if(Base.versions.isAndroidApp || Base.versions.isIosApp){
              hostSdk.inited(function (res, errorMsg) {
                if(res.uuid) {
                  _this.login = true;
                }else {
                  _this.login = false;
                }

                hostsdk.getUser({
                  successCallback:function (res) {
                    _this.user.coinsQty = JSON.parse(res).coinsQty;

                    _this.payment = _this.money - _this.redBagMoney;
                    _this.resultMoney =  _this.money - _this.user.coinsQty - _this.redBagMoney;

                    //可用的红包
                    Interface.usableCouponList(_this.money, function (data) {
                      if (data) {
                        _this.redBagList = data.returnJSON;
                      }
                    });

                  },
                  errorCallback:function (res) { },
                });

              });
          }else {

            //判断外部打开链接
            let _uuid = _this.$route.query.uuid;

            if (Base.isNull(_uuid)) {

                _this.showBack = true;

                //H5端购买
              Interface.userInfo(function (data) {
                console.log(data);
                if (data) {
                  if (Base.isNull(data.returnJSON)) {
                    _this.login = false;
                  } else {
                    _this.login = true;
                    _this.user = data.returnJSON;

                    _this.payment = _this.money - _this.redBagMoney;
                    _this.resultMoney = _this.money - _this.user.coinsQty - _this.redBagMoney;

                  }
                } else {
                  _this.login = false;
                }
              });

              //可用的红包
              Interface.usableCouponList(_this.money, function (data) {
                if (data) {
                  _this.redBagList = data.returnJSON;
                }
              });

            } else {

              _this.showBack = false;

              //设置为app跳转支付模式
              Base.setCookie('appPay',true);
              Base.setCookie('appPayType','pay');
              _this.appPay = true;

              Interface.getUserInfo(_uuid, function (data) {
                console.log(data);
                if (data) {
                  if (Base.isNull(data.returnJSON)) {
                    _this.login = false;
                  } else {
                    _this.login = true;
                    _this.user = data.returnJSON;
                    _this.payment = _this.money - _this.redBagMoney;
                    _this.resultMoney = _this.money - _this.user.coinsQty - _this.redBagMoney;

                    //可用的红包
                    Interface.usableCouponList(_this.money, function (data) {
                      if (data) {
                        _this.redBagList = data.returnJSON;
                      }
                    });

                  }
                } else {
                  _this.$message({
                    type: 'error',
                    message: '无效用户',
                    duration: 3000
                  });
                  _this.login = false;
                }
              });


              }
            }

        }

    }

</script>
