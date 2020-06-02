<template>

  <div id="recharge_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'充值'" :back="true"></navTitle>

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

        <div class="clear1 "></div>
      </div>

      <div class="pa15 ">

        <p class="lh30px Fblack-2">因相关部门规定，售票已停止，为您带来不便，敬请谅解</p>

        <!--<p class="lh30px">微信支付暂时关闭，请在浏览器打开使用支付宝支付，为您带来不便，敬请谅解</p>-->
        <!--<div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="recharge('wx')">-->
          <!--微信支付-->
        <!--</div>-->
      </div>


      <div class="clear1 "></div>

    </div>

    <div class="clear1"></div>

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
        radio: 1,
        moneys: [50, 100, 300, 500, 1000],
        favDisabled: false,
      }
    },

    methods: {
      recharge() {
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

        let _attType = '';
        let _attInfo = '';
        if(_money >= 20 && _money < 68){
          _attType = 2;
          _attInfo = 'TR2018032320';
        }else if(_money >= 68){
          _attType = 2;
          _attInfo = 'TR2018032368';
        }

        //微信公众号支付


        //- cnzz自定义统计
        // 测试完后请删除这条注数

        _czc.push(["_setAccount", "1271278320"]);
        _czc.push(['_trackEvent', 'WxRecharge_WxPay', 'submit', '发起微信公众号充值',Math.floor(_money * 100),'WxRecharge_WxPay']);

        Interface.wxJsPay( Math.floor(_money * 100) , 0, _attType, _attInfo, function (data) {

          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            JSON.parse(data.returnJSON),
            function(res){
//                  alert(JSON.stringify(res));
              if(res.err_msg == "get_brand_wcpay_request:ok") {
                _this.$router.push({ name: 'PaySuccess' });
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

      }
    },

    mounted(){

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'WxRecharge_page', 'onInit', '微信公众号充值页','inited','WxRecharge_init']);

      this.myHeight = $(window).height();

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
