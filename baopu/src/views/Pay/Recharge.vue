<template>

  <div id="recharge_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'充值'" :back="true"></navTitle>

    <!--支付完成弹窗-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showResult == true" @click="calRecharge"></div>
    <div class="w270px h150px fixed warpper-white Fgray-3 lh45px radius5 F16 text-center" v-show="showResult == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 9999;">
      <div class="wb100">
        <p class="h60px lh60px Fblack">请确认充值是否已完成</p>
        <p class="bor-gray bor-solid-1b bor-solid-1t Forange-2" @click="doneRecharge">已完成充值</p>
        <p class="Fgray-2" @click="isLock = false; recharge()">充值遇到问题，重新充值</p>
      </div>
    </div>

    <div class="wb100">

      <div class="warpper-black-3">
        <p class="Fgray-5 pal15 par15 h45px lh45px">
          请选择充值金额<span class="Fgray-5">（<span class="Fnum">1</span>元=<span class="Fnum">1</span>金币）</span>
        </p>

        <div class="pal15 Fgray-3 F14 lh40px">

          <div class="par15">
            <el-row :gutter="15">
              <el-col :span="8" v-for="(item,key) in moneys" :key="key">
                <div @click="money = item" class="wb100 h40px lh40px text-center F16 radius5 mab15 Fnum" :class="money == item && money2 == '' ? 'warpper-orange-7 pa1 Fwhite' : 'bor-orange2 bor-solid-1a Forange-2'">
                  {{item}}元
                </div>
              </el-col>
              <el-col :span="8">
                <div class="wb100 h40px lh40px text-center F14 radius5 mab15 Fnum bor-orange2 bor-solid-1a Forange-2">
                  <div class="relative pal5 par20">
                    <input type="tel" class="bor-none wb100 F16 warpper-none Fgray-5" placeholder="其他金额" v-model="money2">
                    <span class="absolute" style="top: 0; right: 5px;">元</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="clear"></div>
      </div>

      <div class="clear1"></div>

      <template v-if="isWeiXin">
        <div class="pa15">
          <div class="wb100 warpper-orange-7 Fwhite h45px lh45px text-center radius5 F16" @click="recharge('wx')">
            微信支付
          </div>
        </div>
      </template>

      <template v-else>
        <div class="pal15 Fgray-5 F16 lh40px warpper-black-3">
          <p>选择支付方式</p>

          <div class="clear bor-black2 bor-solid-1b"></div>
          <div class="clear1"></div>
          <div class="wb100">

            <p class="h30px lh30px wb100" @click="radio = 0">
              <span class="fl h30px lh30px"> <img src="~@/assets/images/alipay.png" class="h30px fl mar5">支付宝 </span>
              <el-radio class="radio fr mar15" v-model="radio" :label="0">&nbsp;</el-radio>
            </p>
            <div class="clear1 bor-black2 bor-solid-1b"></div>
            <div class="clear1"></div>

            <template v-if="isMobile == true">
              <p class="h30px lh30px wb100" @click="radio = 1">
                <span class="fl h30px lh30px"> <img src="~@/assets/images/wxpay.png" class="h30px fl mar5">微信 </span>
                <el-radio class="radio fr mar15" v-model="radio" :label="1">&nbsp;</el-radio>
              </p>
              <div class="clear1"></div>
            </template>

          </div>
        </div>

        <div class="clear1"></div>

        <div class="pa15">
          <div class="wb100 warpper-orange-7 Fwhite h45px lh45px text-center radius5 F16" @click="recharge">
            立即充值
          </div>
        </div>
      </template>

    </div>

    <div class="clear1"></div>

    <div class="text-center Fgray-6">
      <p>联系我们</p>
      <div class="clear h10px"></div>

      <template v-if="isApp == false">
        <p>电话/微信：<a href="tel:13272721166"> <span class="Forange-2 Fnum">13272721166</span> </a></p>
      </template>
      <template v-else>
        <p>电话/微信 <span class="Forange-2 Fnum">13272721166</span> </p>
      </template>

    </div>

    <div class="wb100 payHtml hidden"></div>

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
    import HostSdk from '../../assets/js/hostSdk.js'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              showResult: false,
              login: false,
              isLock: false,
              isWeiXin: false,
              isMobile: false,
              isApp: false,
              money: 50,
              money2: '',
              paymentNo: '',
              infoMsg: '',
              call: '',
              user: {},
              timerID: 0,
              timer: 0,
              title: '充值',
              state: '',
              radio: 1,
              moneys: [50, 100, 300, 500, 1000],
              favDisabled: false,
            }
        },

        methods: {

          doneRecharge() {

            this.isLock = false;

            var paymentNo = Base.getCookie('paymentNo');

            if(Base.isNull(paymentNo)){
              _this.showResult = false;
              return false;
            }

            var payType = Base.getCookie('payType');

            if(Base.isNull(payType)){
              _this.showResult = false;
              return false;
            }

            var _this = this;

            _this.showResult = false;

            Interface.payResultQuery(paymentNo, payType, function (data, errorMsg) {
              if (data) {
                Base.setCookie('paymentNo', null);
                Base.setCookie('payIng', null);
                Base.setCookie('payType', null);
                Base.setCookie('payMoney', null);
                _this.$router.replace({ name: 'PaySuccess'});
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

          calRecharge() {

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

          recharge(val) {
            var _this = this;

            console.log(_this.isLock)

            if(_this.isLock == true)
              return false;

            _this.isLock = true;

            if(_this.favDisabled)
              return;

            if(_this.login == false){
                _this.$router.push({ name: 'Login', params:{ call: true } });
              return false;
            }

            var _money = _this.money2;

            if(Base.isNull(_money)){
              _money = this.money;
            }

            //判断金额
            if (Base.isNull(_money)) {
              _this.$message({
                type: 'error',
                message: '金额不合法',
                duration: 1500
              });

              _this.favDisabled = true;
              _this.isLock = true;

              setTimeout(function(){
                _this.favDisabled = false;
                _this.isLock = false;
              },1500);

              return false;
            }

            if (isNaN(_money)) {
              _this.$message({
                type: 'error',
                message: '金额不合法',
                duration: 1500
              });

              _this.favDisabled = true;
              _this.isLock = true;

              setTimeout(function(){
                _this.favDisabled = false;
                _this.isLock = false;
              },1500);

              return false;
            }

//            if (_money < 1) {
//                _this.$message({
//                    type: 'error',
//                    message: '充值需大于1元'
//                });
//
//              _this.favDisabled = true;
//              _this.isLock = true;
//
//              setTimeout(function(){
//                _this.favDisabled = false;
//                _this.isLock = false;
//              },1500);
//
//              return false;
//            }

            var _url = 'https://mp.bombsport.com/beta/?source='+Interface.getSource()+'#/PayResult?uuid='+Interface.getUserId();
//            var _url = 'http://192.168.8.152:8080/#/PayResult';

            //封装订单信息

            if(_this.radio == 0){
              //支付宝
              Interface.alipayWapForApp(_money * 100, _url, '', '', function (data) {

//                  console.log(data);
//
//                  return false;

                if(Base.versions.isAndroidApp || Base.versions.isIosApp){
                  _this.showResult = true;
                }

                data = data.replace('POST', 'GET');
                var index1 = data.indexOf('"out_trade_no":"');
                var index2 = data.indexOf('",', index1);
                var _str = data.substring(index1 + 16, index2);
                Base.setCookie('paymentNo', _str);
                Base.setCookie('payIng',true);
                Base.setCookie('payType',0);
                Base.setCookie('payMoney',_money);
                clearInterval(_this.timerID);

                $(".payHtml").html(data);
                //设置支付状态
                Base.setCookie('calOrder',true);

              });
            }else{
              //微信
              Interface.wxWebPay(_money * 100, '', '', function (data) {

                if(data){
                  window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('https://mp.bombsport.com/beta/moblinkweixin.html?orderNo='+data.returnJSON.orderNo);

                  clearInterval(_this.timerID);
                  Base.setCookie('payIng',true);
                  Base.setCookie('paymentNo', data.returnJSON.orderNo);
                  Base.setCookie('payType',1);
                  Base.setCookie('payMoney',_money);
                  //设置支付状态
                  Base.setCookie('calOrder',true);
                }
              });
            }
          }
        },

        mounted(){

          var _this = this;

          if(Base.versions.isAndroidApp || Base.versions.isIosApp){
            HostSdk.inited(function (res, errorMsg) {
              if(res.uuid) {
                _this.login = true;
              }else {
                _this.login = false;
              }
            });
            _this.isApp = true;
          }else{
            _this.isApp = false;

            //判断是否是外部链接
            var _uuid = _this.$route.query.uuid;

            //safari打开
            if(Base.isNull(_uuid)){
              Interface.userInfo(function (data) {
                console.log(data);
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
            }else{
              Interface.getUserInfo(_uuid, function (data) {
                console.log(data);
                if (data) {
                  if (Base.isNull(data.returnJSON)) {
                    _this.login = false;
                  } else {
                    _this.login = true;
                    _this.user = data.returnJSON;
                    //设置为app跳转支付模式
                    Base.setCookie('appPay',true);
                    Base.setCookie('appPayType','recharge');
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

          if(Base.versions.isMobile){
            _this.isMobile = true;
            _this.radio = 1;
          }else{
            _this.isMobile = false;
            _this.radio = 0;
          }

          _this.isLock = false;

          _this.call = this.$route.params.call;

          var _money = this.$route.params.money;

          if (Base.isNull(_money)) {
            //上一个未支付订单
            _money = Base.getCookie('payMoney');
            if (Base.isNull(_money)) {
              _money = 50;
            }else{
                if(_money == 50 || _money == 100 || _money == 300 || _money == 500 || _money == 1000){
                  _this.money = _money;
                }else{
                  _this.money2 = _money;
                }
            }
          }

          _this.fullscreenLoading = false;

        }

    }

</script>
