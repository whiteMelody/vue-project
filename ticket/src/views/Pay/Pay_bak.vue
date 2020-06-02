<template>

  <div id="pay_page" class="warpper-gray-3 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'支付'" :back="true"></navTitle>

    <!--支付完成弹窗-->
    <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showResult == true" @click="calPay"></div>
    <div class="w270px h150px fixed warpper-white Fgray-3 lh45px radius5 F16 text-center" v-show="showResult == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 9999;">
      <div class="wb100">
        <p class="h60px lh60px Fblack">请确认支付是否已完成</p>
        <p class="bor-gray bor-solid-1b bor-solid-1t Forange-2" @click="donePay">已完成支付</p>
        <p class="Fgray-2" @click="isLock = false; pay()">支付遇到问题，重新支付</p>
      </div>
    </div>

    <div class="wb100 warpper-white">

      <div class="warpper-black-3">

        <div class="pa15 lh30px">
          <img :src="tmpOrder.icon" class="h30px fl">
          <span class="F16 fl mal10 mar10">{{tmpOrder.title}}</span>
          <div class="clear"></div>
        </div>

        <div class="clear1 warpper-gray-3"></div>

        <div class="pal15 Fgray-3 warpper-black-3 lh45px">

          <p class="par15 h45px">
            <span class="fl">订单金额</span>
            <span class="fr Fnum Fgray-3">{{money}}金币</span>
          </p>
          <div class="clear bor-gray bor-solid-1b"></div>
          <p class="par15 h45px">
            <span class="fl">余额抵扣</span>
            <span class="fr Fnum Forange-2">{{twoDecimal(user.accountBalance)}}金币</span>
          </p>
          <div class="clear"></div>

        </div>

        <div class="clear1 warpper-gray-3"></div>

        <div class="pal15 par15 lh45px h45px Fgray-3 warpper-black-3">
          <span class="fl">应付</span>

          <span class="fr Fnum Fred">{{ twoDecimal(money - user.accountBalance) }}元 = {{ twoDecimal(money - user.accountBalance) }}金币</span>

        </div>

        <div class="clear1 warpper-gray-3"></div>
      </div>

      <template v-if="isWeiXin">
        <div class="clear1"></div>
        <div class="pa15 warpper-gray-3">
          <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="pay('wx')">
            微信支付
          </div>
        </div>
      </template>

      <template v-else>
        <div class="pal15 Fgray-3 F16 lh40px warpper-black-3">
          <p>选择支付方式</p>

          <div class="clear bor-gray bor-solid-1b"></div>
          <div class="clear1"></div>
          <div class="wb100">

            <p class="h30px lh30px wb100" @click="radio = 0">
              <span class="fl h30px lh30px"> <img src="~@/assets/images/alipay.png" class="h30px fl mar5">支付宝 </span>
              <el-radio class="radio fr mar15" v-model="radio" :label="0">&nbsp;</el-radio>
            </p>
            <div class="clear1 bor-gray bor-solid-1b"></div>
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

        <div class="clear1 warpper-gray-3"></div>

        <div class="pa15 warpper-gray-3">
          <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="pay">
            立即支付
          </div>
        </div>
      </template>

    </div>

    <div class="clear1"></div>

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

    import Category1 from '../../assets/images/category-1.png'
    import Category2 from '../../assets/images/category-2.png'
    import Category3 from '../../assets/images/category-3.png'
    import Category4 from '../../assets/images/category-4.png'
    import Category5 from '../../assets/images/category-5.png'
    import Category6 from '../../assets/images/category-6.png'
    import Category7 from '../../assets/images/category-7.png'
    import Category8 from '../../assets/images/category-8.png'
    import Category9 from '../../assets/images/category-9.png'
    import Category10 from '../../assets/images/category-10.png'
    import Category11 from '../../assets/images/category-11.png'
    import Category12 from '../../assets/images/category-12.png'


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
              myHeight: 0,
              ticketInfo: {},
              ticket: {},
              tmpOrder: {},
              money: 50,
              resultMoney: 50,
              money2: '',
              paymentNo: '',
              infoMsg: '',
              call: '',
              user: {},
              timerID: 0,
              timer: 0,
              title: '支付',
              state: '',
              radio: 1,
              moneys: [50, 100, 300, 500, 1000],
              favDisabled: false,
            }
        },

        methods: {

          donePay() {

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

          calPay() {

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

          pay(val) {
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

            var _money = this.twoDecimal(this.money - this.user.accountBalance);

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

//            var _url = 'https://mp.bombsport.com/beta/?source='+Interface.getSource()+'#/PayResult?uuid='+Interface.getUserId();

            let __tmp1 = window.location.href;

            let __index1 = __tmp1.indexOf('#');

            let __tmp2 = __tmp1.substring(0,__index1);

            var _url = __tmp2 +'#/PayResult?payType=1';

//            console.log(_url);
//            return false;

            //封装订单信息

            if(_this.radio == 0){
              //支付宝
              Interface.alipayWap(_money * 100, _url, 1, this.tmpOrder.tradeNo, this.tmpOrder.title, function (data) {

                if(Base.versions.isAndroidApp || Base.versions.isIosApp){
                  _this.showResult = true;
                }

                data = data.replace('POST', 'GET');
                var index1 = data.indexOf('"out_trade_no":"');
                var index2 = data.indexOf('",', index1);
                var _str = data.substring(index1 + 16, index2);
                Base.setCookie('paymentNo', _str);
                Base.setCookie('payIng',true);
                Base.setCookie('payType',1);
                Base.setCookie('payMoney',_money);
                //设置支付状态
                Base.setCookie('calOrder',true);
                _this.isLock = false;

                $(".payHtml").html(data);

              });
            }else{
              //微信
              Interface.wxWebPay(_money * 100, 1, this.tmpOrder.tradeNo, this.tmpOrder.title, function (data) {

                if(data){

                  if(Base.versions.isAndroidApp || Base.versions.isIosApp){
                    _this.showResult = true;
                  }

                  Base.setCookie('payIng',true);
//                  Base.setCookie('paymentNo', data.returnJSON.orderNo);
                  Base.setCookie('payType',2);
                  Base.setCookie('payMoney',_money);
                  //设置支付状态
                  Base.setCookie('calOrder',true);

                  _this.isLock = false;

                  let _source = Interface.getSource();

                  window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('http://mp.bombsport.com/ticket/payback.html?orderNo='+data.returnJSON.orderNo + ',' + _source);

//                  if(Base.versions.isAndroid){
//
////                    alert('http://mp.bombsport.com/ticket/?source='+_source+'#/PayResult');
//
////                    window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('http://mp.bombsport.com/ticket/?source='+_source+'#/PayResult');
////                    alert('http://mp.bombsport.com/ticket/payback.html?orderNo='+data.returnJSON.orderNo + ',' + _source);
//
//                  window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('http://mp.bombsport.com/ticket/payback.html?orderNo='+data.returnJSON.orderNo + ',' + _source);
////                    window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('http://mp.bombsport.com/ticket/payback.html');
//
//                  }else{
////                    alert('https://mp.bombsport.com/ticket/payback.html');
//
////                  window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('https://mp.bombsport.com/beta/moblinkweixin.html?orderNo='+data.returnJSON.orderNo);
////                  window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('http://mp.bombsport.com/ticket/payback.html?orderNo='+data.returnJSON.orderNo + ',' + _source);
//                  window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('https://mp.bombsport.com/ticket/payback.html?orderNo='+data.returnJSON.orderNo + ',' + _source);
////                    window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('https://mp.bombsport.com/ticket/payback.html');
//
////                  window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI(_url);
//
//                  }

                }
              });
            }
          }
        },

        mounted(){

          this.myHeight = $(window).height();

          var ticket = window.sessionStorage.getItem("soccer_ticket");

          console.log(ticket);

          Interface.userInfo( (data) => {
            if (data) {
              if (Base.isNull(data.returnJSON)) {
                this.login = false;
              } else {
                this.login = true;
                this.user = data.returnJSON;
              }
            } else {
              this.login = false;
            }
            this.fullscreenLoading = false;
          });

          if(Base.versions.isMobile){
            this.isMobile = true;
            this.radio = 1;
          }else{
            this.isMobile = false;
            this.radio = 0;
          }

          this.isLock = false;

          let _tmpOrder = window.sessionStorage.getItem("tmpOrder");

          if(Base.isNull(_tmpOrder)) {
            this.$message({
              type: 'error',
              message: '没有找到未支付的订单'
            });

            this.fullscreenLoading = false;
            return false;
          }else{
            _tmpOrder = JSON.parse(_tmpOrder);

            if(Base.isNull(_tmpOrder)) {
              this.$message({
                type: 'error',
                message: '没有找到未支付的订单'
              });

              this.fullscreenLoading = false;
              return false;
            }else{

              let _icon = "";

              if(_tmpOrder.lotteryType == 'ssq'){
                _icon = Category3;
              }else if(_tmpOrder.lotteryType == 'dlt'){
                _icon = Category4;
              }else if(_tmpOrder.lotteryType == 'JSK3'){
                _icon = Category1;
              }else if(_tmpOrder.lotteryType == 'JXK3'){
                _icon = Category8;
              }else if(_tmpOrder.lotteryType == 'C511'){
                _icon = Category10;
              }else if(_tmpOrder.lotteryType == 'CQD11'){
                _icon = Category11;
              }else if(_tmpOrder.lotteryType == 'GDD11'){
                _icon = Category12;
              }else if(_tmpOrder.lotteryType == 'D11'){
                _icon = Category2;
              }else if(_tmpOrder.lotteryType == 'dlc'){
                _icon = Category11;
              }

              _tmpOrder.icon = _icon;

              _tmpOrder.title = Base.getLotteryType(_tmpOrder.lotteryType).name;

              this.tmpOrder = _tmpOrder;

              this.money = _tmpOrder.money;
            }
          }

        }

    }

</script>
