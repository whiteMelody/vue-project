<template>

  <div id="recharge_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

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

      <div class="wb100 warpper-black-3">
        <p class="Fblack-2 pal15 par15 h45px lh45px">
          请选择充值金额
        </p>

        <div class="pal15 Fgray-3 F14 lh40px">

          <div class="par15">
            <el-row :gutter="15">
              <template v-if="this.isFirst == false">
                <el-col :span="8" v-for="(item,key) in moneys" :key="key">
                  <div @click="money = item" class="wb100 h40px lh40px text-center F16 radius5 mab15 Fnum" :class="money == item && money2 == '' ? 'warpper-red pa1 Fwhite' : 'bor-orange2 bor-solid-1a Forange-2'">
                    {{item}}元
                  </div>
                </el-col>
              </template>
              <el-col :span="8">
                <div class="wb100 h40px lh40px text-center F14 radius5 mab15 Fnum bor-orange2 bor-solid-1a Forange-2">
                  <div class="relative pal5 par20">
                    <input type="tel" class="bor-none wb100 F16 warpper-none Fwhite-1" placeholder="其他金额" v-model="money2">
                    <span class="absolute" style="top: 0; right: 5px;">元</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="clear1"></div>
      </div>

      <div class="clear"></div>

      <template v-if="isWeiXin">
        <div class="clear1"></div>
        <div class="pa15 warpper-gray-3">
          <!--<div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="recharge('wx')">-->
            <!--微信支付-->
          <!--</div>-->
          <div class="wb100 warpper-gray-1 Fgray-3 h45px lh45px text-center radius5 F16">
            微信支付
          </div>
          <p class="lh30px Fblack-2">因相关部门规定，售票已停止，为您带来不便，敬请谅解</p>
        </div>
      </template>

      <template v-else>
        <div class="pal15 Fblack-2 F16 lh40px warpper-black-3">
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

        <div class="clear1 "></div>

        <div class="pa15 ">
          <!--<div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="recharge">-->
            <!--立即充值-->
          <!--</div>-->
          <p class="lh30px Fblack-2">因相关部门规定，售票已停止，为您带来不便，敬请谅解</p>
          <div class="clear1"></div>
          <div class="wb100 warpper-gray-1 Fgray-3 h45px lh45px text-center radius5 F16">
            立即充值
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

    export default{

        data (){
            return {
              fullscreenLoading: true,
              showResult: false,
              login: false,
              isLock: false,
              isFirst: false,
              isWeiXin: false,
              isMobile: false,
              isApp: false,
              myHeight: 0,
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
              radio: 0,
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
                _this.$message({
                  type: 'success',
                  message: '充值成功',
                  duration: 1500
                });
//                _this.$router.replace({ name: 'PaySuccess'});
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

            //价格最低验证
            if (_money < 0.1) {
                _this.$message({
                    type: 'error',
                    message: '充值需大于0.1元'
                });

              _this.favDisabled = true;
              _this.isLock = true;

              setTimeout(function(){
                _this.favDisabled = false;
                _this.isLock = false;
              },1500);

              return false;
            }

            //价格浮点数验证

            if(_money.toString().split(".")[1]){
              if (_money.toString().split(".")[1].length > 2) {
                _this.$message({
                  type: 'error',
                  message: '充值最高为2位小数'
                });

                _this.favDisabled = true;
                _this.isLock = true;

                setTimeout(function(){
                  _this.favDisabled = false;
                  _this.isLock = false;
                },1500);

                return false;
              }
            }

//            var _url = 'https://mp.bombsport.com/beta/?source='+Interface.getSource()+'#/PayResult?uuid='+Interface.getUserId();

            let __tmp1 = window.location.href;

            let __index1 = __tmp1.indexOf('#');

            let __tmp2 = __tmp1.substring(0,__index1);

            var _url = __tmp2 +'#/PayResult?payType=1';

            let _attType = '';
            let _attInfo = '';
            if(_money >= 20 && _money < 68){
              _attType = 2;
              _attInfo = 'TR2018032320';
            }else if(_money >= 68){
              _attType = 2;
              _attInfo = 'TR2018032368';
            }

//            console.log(_url);
//            return false;

            //封装订单信息

            if(_this.radio == 0){
              //支付宝

//              _url = 'https://mp.bombsport.com/ticket/#/PaySuccess';

//              alert(_url);

              //- cnzz自定义统计
              // 测试完后请删除这条注数

              _czc.push(["_setAccount", "1271278320"]);
              _czc.push(['_trackEvent', 'Recharge_AliPay', 'submit', '发起支付宝充值',Math.floor(_money * 100),'Recharge_AliPay']);

              Interface.alipayWap( Math.floor(_money * 100) , _url, _attType, _attInfo, '', (data) => {

//                  console.log(data);
//                alert(JSON.stringify(data))

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
                Base.setCookie('payType',1);
                Base.setCookie('payMoney',_money);
                //设置支付状态
                Base.setCookie('calOrder',true);
                _this.isLock = false;

                $(".payHtml").html(data);

              });
            }else{

              //- cnzz自定义统计
              // 测试完后请删除这条注数

              _czc.push(["_setAccount", "1271278320"]);
              _czc.push(['_trackEvent', 'Recharge_WxPay', 'submit', '发起微信充值',Math.floor(_money * 100),'Recharge_WxPay']);

              //微信
              Interface.wxWebPay( Math.floor(_money * 100), _attType, _attInfo, '', (data) =>{

//                  console.log(data)
//                alert(JSON.stringify(data))

//                return false;

                if(data){

                  if(Base.versions.isAndroidApp || Base.versions.isIosApp){
                    _this.showResult = true;
                  }

                  Base.setCookie('payIng',true);
                  Base.setCookie('paymentNo', data.returnJSON.orderNo);
                  Base.setCookie('payType',2);
                  Base.setCookie('payMoney',_money);
                  //设置支付状态
                  Base.setCookie('calOrder',true);

                  _this.isLock = false;

                  let _source = Interface.getSource();

//                  alert('isWnl:' + Base.versions.isWnl);

//                  //发起微信支付
//                  if(Base.versions.isWnl && ( Base.versions.isIPhone || Base.versions.isIPad )){
//                      //万年历渠道
//                      this.showResult = true;
//                    window.location.href = data.returnJSON.mweb_url;
//                  }else{
//                      //其他渠道
                    window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('https://mp.bombsport.com/ticket/payback.html?orderNo='+data.returnJSON.orderNo + ',' + _source);
//                  }

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

          //- cnzz自定义统计
          // 测试完后请删除这条注数

          _czc.push(["_setAccount", "1271278320"]);
          _czc.push(['_trackEvent', 'Recharge_page', 'onInit', '充值页加载完成','inited','Recharge_page']);

          this.myHeight = $(window).height();

          if(Base.versions.isWeiXin){
              this.$router.replace({ name: 'WxRecharge' });
              return;
          }

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
          });

          if(Base.versions.isMobile){
            this.isMobile = true;
            this.radio = 0;
          }else{
            this.isMobile = false;
            this.radio = 0;
          }

          this.isLock = false;

          this.call = this.$route.params.call;

          var _money = this.$route.params.money;

          if (Base.isNull(_money)) {
            //上一个未支付订单
            _money = Base.getCookie('payMoney');
            if (Base.isNull(_money)) {
              _money = 50;
            }else{
                if(_money == 50 || _money == 100 || _money == 300 || _money == 500 || _money == 1000){
                  this.money = _money;
                }else{
                  this.money2 = _money;
                }
            }
          }

          let _isFirst = this.$route.query.first;

          if(Base.isNull(_isFirst)){
            this.isFirst = false;
          }else{
            this.isFirst = true;
            this.money = _isFirst;
            this.money2 = _isFirst;
          }

          this.fullscreenLoading = false;

        }

    }

</script>
