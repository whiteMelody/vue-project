<template>

  <div id="pay_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'支付'" :back="true"></navTitle>

    <!--购买成功弹窗-->
    <div class="dialogBg" style="z-index: 99; background: rgba(0,0,0,.7);" v-show="showBuySuccess == true" @click="closeBuyDialog"></div>
    <div class="w270px h250px fixed Fwhite F16 text-center" v-show="showBuySuccess == true" style="top: 0; right: 0; left: 0; bottom: 0; margin: auto; z-index: 999;">
      <img src="~@/assets/images/buy-success.png" class="w130px absolute" style="top: 0; left: 0; right: 0; margin: 0 auto; z-index: 9999; width: 134px;">
      <img src="~@/assets/images/buy-success-shadow.png" class="w270px rotater absolute" style="top: -77px; left: -7px; z-index: 999;">
      <div class="clear h130px"></div>
      <div class="wb100">
        <p class="F20 lh40px">竞猜成功</p>
        <p class="lh20px">预计收益<span class="Fgreen Fnum">{{twoDecimal(money * odds)}}</span>金币</p>

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

          <template v-if="matchList.length == 1">
            <p class="lh35px h35px">
              <span class="fl warpper-black-5 pal10 par10 h25px lh25px mat5 mar10 radius4">单关</span>
              <span class="fl F18">{{matchList[0].matchName}}</span>
            </p>

            <p class="F14">
              {{getLotType(matchList[0].lotType)}}，{{getLotValue(matchList[0].lotType, matchList[0].anteValue)}}，
              预计赢得<span class="Fnum Forange-2">{{twoDecimal(money * matchList[0].odds)}}</span>金币
            </p>
          </template>

          <template v-else>
            <p class="lh35px h35px relative text-over-hidden1" style="padding-left: 65px;">
              <span class="fl warpper-red-8 pal10 par10 h25px lh25px mat5 mar10 radius4 absolute" style="top:0; left: 0;">{{matchList.length}}串1</span>
              <template v-for="item in matchList">{{item.matchName}} </template>
            </p>

            <p class="F14">
              普通串关，预计赢得<span class="Fnum Forange-2">{{ getOdd()[1]}}</span>金币
            </p>
          </template>

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

      <div class="pa15">
        <div class="wb100 warpper-orange-7 Fwhite h45px lh45px text-center radius5 F16" @click="orderPay()">
          微信支付
        </div>
      </div>

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
              payTitle: '',
              payOdds: 0,
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
              payHtml: '',
              title: '',
              odds: '',
              lotType: '',
              val: '',
              matchID: '',
              matchList: [],
              resultMoney: 0,
              payment: 0,
              payType: 0,
              favDisabled: false,
              unpaid:''
            }
        },

        methods: {

          getOdd() {

            var _this = this;

            var _num = 0;

            var _item = {};

            for(var i=0; i<_this.matchList.length; i++){
              _item = _this.matchList[i];

              if(_num == 0){
                _num = _item.odds;
              }else{
                _num *= _item.odds;
              }

            }

            return [_this.twoDecimal(_num), _this.twoDecimal(_num * _this.money)];
          },

          getLotType(type) {
            if(type == 0){
              return '胜平负';
            }else if(type == 1){
              return '让球胜平负';
            }else if(type == 2){
              return '比分';
            }else if(type == 3){
              return '总进球数';
            }
          },

          getLotValue(type,val) {

            if(type == 0 || type == 1){
              if(val == 0){
                return '主胜';
              }else if(val == 1){
                return '平';
              }else if(val == 2){
                return '客胜';
              }
            }else if(type == 2){
              if(val == 0){
                return '1:0';
              }else if(val == 1){
                return '2:0';
              }else if(val == 2){
                return '2:1';
              }else if(val == 3){
                return '3:0';
              }else if(val == 4){
                return '3:1';
              }else if(val == 5){
                return '3:2';
              }else if(val == 6){
                return '4:0';
              }else if(val == 7){
                return '4:1';
              }else if(val == 8){
                return '4:2';
              }else if(val == 9){
                return '5:0';
              }else if(val == 10){
                return '5:1';
              }else if(val == 11){
                return '5:2';
              }else if(val == 12){
                return '胜其它';
              }else if(val == 13){
                return '0:0';
              }else if(val == 14){
                return '1:1';
              }else if(val == 15){
                return '2:2';
              }else if(val == 16){
                return '3:3';
              }else if(val == 17){
                return '平其它';
              }else if(val == 18){
                return '0:1';
              }else if(val == 19){
                return '0:2';
              }else if(val == 20){
                return '1:2';
              }else if(val == 21){
                return '0:3';
              }else if(val == 22){
                return '1:3';
              }else if(val == 23){
                return '2:3';
              }else if(val == 24){
                return '0:4';
              }else if(val == 25){
                return '1:4';
              }else if(val == 26){
                return '2:4';
              }else if(val == 27){
                return '0:5';
              }else if(val == 28){
                return '1:5';
              }else if(val == 29){
                return '2:5';
              }else if(val == 30){
                return '负其它';
              }
            }else if(type == 3){
              if(val == 0){
                return '进0球';
              }if(val == 1){
                return '进1球';
              }if(val == 2){
                return '进2球';
              }if(val == 3){
                return '进3球';
              }if(val == 4){
                return '进4球';
              }if(val == 5){
                return '进5球';
              }if(val == 6){
                return '进6球';
              }if(val == 7){
                return '进7+球';
              }
            }

          },

          myClick(key) {
            this.redBagRadio = key;
          },

          closeBuyDialog(type) {
              var _this = this;
              if(type == 0){
                _this.$router.replace({ name: 'SoccerResult', params:{ orderId: _this.orderID } });
              }else{
                _this.$router.replace({ name: 'Index'});
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
              $(".rotater").rotate(_this.angle);
            },50);
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

          orderPay() {
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

              Interface.createMatchOrder(redBagNo, _this.money, _this.matchList, function (data, errorMsg) {

                if(data){

                    //微信公众号支付
                    Interface.wxJsPay(_this.money, 1, data.returnJSON.orderNo, function (data) {

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

              });
//
            }else{
              //余额支付

              Interface.payMatch(redBagNo, _this.money, _this.matchList, function (data) {

                if(data){

                  _this.showBuySuccess = true;

                  _this.orderID = data.returnJSON.orderID;

                  var _num = 0;

                  for(var i=0; i<_this.matchList.length; i++){

                    if(_num == 0){
                      _num = _this.matchList[i].odds;
                    }else{
                      _num *= _this.matchList[i].odds;
                    }

                  }

                  _this.odds = _num;

                  _this.rotation();
                }
                else{
                  _this.$message({
                    type: 'error',
                    message: '购买失败',
                    duration: 3000
                  });

                }

              });

            }

          }

        },

        mounted(){

          let _this = this;

          _this.showBuySuccess = false;

          let _money = Base.getCookie('payMoney');

          _this.money = _money || 0 ;

          _this.fullscreenLoading = false;

          _this.uupaid = Base.getCookie('unpaid');

          if (Base.isNull(_this.uupaid)) {
            //不存在支付订单

            _this.$message({
              type: 'error',
              message: '获取支付订单失败',
              duration: 1500
            });
            return false;
          }

          //初始化
          _this.matchList = JSON.parse(_this.uupaid);

          console.log(_this.matchList);

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

        }

    }

</script>
