<template>

  <div id="pay_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

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

    <!--选择可用的红包-->
    <div class="wb100 Fgray-5" v-show="showRedBag == true">
      <template v-for="(item,key) in redBagList">

        <div class="clear1"></div>

        <div class="pa15 relative warpper-black-3">

          <div class="w80px h50px warpper-orange-2 fl text-center Fwhite pat10 pab10 lh25px F14 radius5">
            <p class="lh25px"><span class="Fnum F24">{{item.faceValue}}</span>元</p>
            <p class="F12 lh15px">满<span class="Fnum">{{item.limit}}</span>可用</p>
          </div>

          <div class="w180px fl lh30px pat10 pal10" style="width: 170px;">
            <p class="F18 lh25px Fblack-2">红包</p>
            <p class="F12 Fwhite-1">有效期至<span class="Fnum">{{item.endTime}}</span></p>
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
          <div class="wb45 fl warpper-orange-2 Fwhite pa1 h45px lh45px text-center radius5" @click="selectRedBag(1)">
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

        <template v-if="ticket.length == 1">
          <!--单关-->

          <div class="pa15">
            <p>
              <span class="pal10 par10 h30px lh30px warpper-white-3 Fwhite-1 fl">单关</span>
              <span class="fl Fwhite-1 h30px lh30px mal15 F18">{{ticket[0].hTeam}} VS {{ticket[0].vTeam}}</span>
            </p>
            <div class="clear"></div>
            <p class="Fwhite-1 lh40px F14">
              投注内容：
              <template v-for="(item2,key2) in ticket[0].selectData">
              <template v-if="item2.type == 'FT006'">让球</template><template v-if="key2 == ticket[0].selectData.length - 1">{{item2.val}}</template><template v-else>{{item2.val}}，</template>
              </template>
            </p>

          </div>

        </template>

        <template v-else>
          <div class="pa15">
            <p class="lh35px h35px relative text-over-hidden1 Fwhite-1" style="padding-left: 65px;">
              <span class="fl warpper-orange-2 pal10 par10 h25px lh25px mat5 mar10 radius4 absolute" style="top:0; left: 0;">{{ticket.length}}串1</span>
              <template v-for="item in ticket">{{item.hTeam}} VS {{item.vTeam}} </template>
            </p>

          </div>
        </template>

        <!--<div class="pa15">-->
          <!--<template v-for="(item,key) in ticket">-->

            <!--<template>-->
              <!--<div class="wb100">-->
                <!--<div class="pa15 lh20px bor-black1 bor-solid-1a F14 relative warpper-black-3">-->

                  <!--<p class="F16 text-center lh25px Fwhite-1">{{item.hTeam}} VS {{item.vTeam}}</p>-->

                  <!--<div class="clear h10px"></div>-->

                  <!--<div class="wb100">-->
                    <!--<p class="warpper-orange-2 h35px lh35px text-center F14 Fwhite radius5 text-over-hidden1">-->
                      <!--<template v-for="(item2,key2) in item.selectData">-->
                        <!--<template v-if="item2.type == 'FT006'">让球</template><template v-if="key2 == item.selectData.length - 1">{{item2.val}}</template><template v-else>{{item2.val}}，</template>-->
                      <!--</template>-->
                    <!--</p>-->

                  <!--</div>-->

                <!--</div>-->

              <!--</div>-->
            <!--</template>-->

            <!--<div class="clear1"></div>-->

          <!--</template>-->
        <!--</div>-->

        <div class="clear"></div>

        <div class="pal15 Fblack-2 lh45px warpper-black-3">

          <p class="par15 h45px">
            <span class="fl">订单金额</span>
            <span class="fr Fnum Fwhite-1">{{money}}元</span>
          </p>
          <div class="clear bor-black2 bor-solid-1b"></div>
          <p class="par15 h45px">
            <span class="fl">余额抵扣</span>
            <span class="fr Fnum Forange-2">{{twoDecimal(user.accountBalance)}}元</span>
          </p>
          <div class="clear"></div>

          <!--<div class="clear bor-black2 bor-solid-1b"></div>-->

          <!--<template v-if="redBagList.length == 0">-->
            <!--<p class="par15 h45px">-->
              <!--<span class="fl">红包</span>-->
              <!--<span class="fr Fwhite-1">暂无可用</span>-->
            <!--</p>-->
          <!--</template>-->

          <!--<template v-else>-->
            <!--<p class="par15 h45px" @click="showRedBag = true">-->
              <!--<span class="fl">红包</span>-->

              <!--<template v-if="redBagMoney == 0">-->
                <!--<span class="fr Fwhite-1">{{redBagList.length}}个可用红包 <img src="~@/assets/images/arrow-right.png" class="fr h14px mal5" style="margin-top: 16px;"></span>-->
              <!--</template>-->

              <!--<template v-if="redBagMoney != 0">-->
                <!--<span class="fr Fnum Fred">{{redBagMoney}}金币<img src="~@/assets/images/arrow-right.png" class="fr h14px mal5 mat15"></span>-->
              <!--</template>-->

            <!--</p>-->
          <!--</template>-->

        </div>

        <div class="clear1"></div>

        <div class="pal15 par15 lh45px h45px Fblack-2 warpper-black-3">
          <span class="fl">应付</span>

          <span class="fr Fnum Forange-2">{{ twoDecimal(money - user.accountBalance) }}元</span>

        </div>

        <div class="clear1"></div>
      </div>

      <template v-if="isWeiXin">
        <div class="clear1"></div>
        <div class="pa15 warpper-gray-3">
          <!--<div class="wb100 warpper-orange-2 Fwhite h45px lh45px text-center radius5 F16" @click="pay('wx')">-->
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

        <div class="clear1"></div>

        <div class="pa15">
          <!--<div class="wb100 warpper-orange-2 Fwhite h45px lh45px text-center radius5 F16" @click="pay">-->
            <!--立即支付-->
          <!--</div>-->
          <p class="lh30px Fblack-2">因相关部门规定，售票已停止，为您带来不便，敬请谅解</p>
          <div class="clear1"></div>
          <div class="wb100 warpper-gray-1 Fgray-3 h45px lh45px text-center radius5 F16">
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
        showRedBag: false,
        login: false,
        isLock: false,
        isWeiXin: false,
        isMobile: false,
        isApp: false,
        myHeight: 0,
        tradeNo: 0,
        ticketInfo: {},
        ticket: [],
        redBagList: [],
        tmpOrder: {},
        money: 50,
        resultMoney: 50,
        redBagMoney: 0,
        money2: '',
        paymentNo: '',
        infoMsg: '',
        call: '',
        user: {},
        timerID: 0,
        timer: 0,
        title: '支付',
        state: '',
        radio: 0,
        redBagRadio: -1,
        moneys: [50, 100, 300, 500, 1000],
        favDisabled: false,
      }
    },

    methods: {

      init() {

        var ticket = window.sessionStorage.getItem("soccer_ticket");

        Interface.userBaseInfo( (data) => {
          if (data) {
            if (Base.isNull(data.returnJSON)) {
              //未登录
            } else {
              //已登录
              this.user = data.returnJSON;
              Base.setCookie('userInfo', JSON.stringify(data.returnJSON));
            }
          } else {
            //获取失败
          }
        });

        if (Base.isNull(ticket)) {
          this.ticket = [];
          this.fullscreenLoading = false;
          this.$message({
            type: 'error',
            message: '没有找到未支付的订单'
          });
          return false;
        }

        ticket = JSON.parse(ticket);

        console.log(ticket);

        this.ticket = [];

        if (Base.isNull(ticket) || ticket.length == 0) {
          this.fullscreenLoading = false;
          this.$message({
            type: 'error',
            message: '没有找到未支付的订单'
          });
          return false;
        }

        //查询可用的红包
        Interface.userCouponList( (data) => {
          if(data){
            if(data.returnJSON.length > 0 ){
                let _tmp = data.returnJSON;

                let _tmp2 = []

                for(let i=0; i<_tmp.length; i++){
                  if(_tmp[i].status == 0){
                    _tmp2.push(_tmp[i])
                  }
                }

                this.redBagList = _tmp2;
            }
          }
        })

        this.ticket = ticket;

        this.sessionNum = ticket.length;

        let _tmp = [];

        let _size = 8;

        if(this.playIndex == 0){
          //混合串关
          for(let i=0; i<this.ticket.length; i++){
            for(let j=0; j<this.ticket[i].selectData.length; j++){
              let _t = this.ticket[i].selectData[j];
              if(_t.type == 'FT002' || _t.type == 'FT004'){
                _size = 4;
              }if(_t.type == 'FT003'){
                if(_size >= 6){
                  _size = 6;
                }
              }
            }
          }
        }else if(this.playIndex == 1 || this.playIndex == 2){
          //胜平负 让球胜平负
          _size = 8;
        }else if(this.playIndex == 3){
          //比分
          _size = 4;
        }else if(this.playIndex == 4){
          //总进球
          _size = 6;
        }else if(this.playIndex == 5){
          //半全场胜负
          _size = 4;
        }

        if (this.ticket.length > 0) {
          this.lock = false;
          this.fullscreenLoading = false;
        }

      },

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

      myClick(key) {

//                console.log(key);
//                if(key == this.redBagRadio){
//                    this.redBagRadio = -1;
//                }else{
        this.redBagRadio = key;
//                }

//                console.log(key + '        ' + this.redBagRadio)

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

        if(_this.login == false){
          _this.$router.push({ name: 'Login', params:{ call: true } });
          return false;
        }

        var _money = this.twoDecimal(this.money - this.user.accountBalance);

        if(Base.isNull(_money)){
          _money = this.money;
        }

        let __tmp1 = window.location.href;

        let __index1 = __tmp1.indexOf('#');

        let __tmp2 = __tmp1.substring(0,__index1);

        var _url = __tmp2 +'#/PayResult?payType=1';

        //封装订单信息

        if(_this.radio == 0){

          //- cnzz自定义统计
          // 测试完后请删除这条注数

          _czc.push(["_setAccount", "1271278320"]);
          _czc.push(['_trackEvent', 'Pay_AliPay', 'submit', '发起支付宝支付',Math.floor(_money * 100),'Pay_AliPay']);

          //支付宝
          Interface.alipayWap( Math.floor(_money * 100) , _url, 1, this.tradeNo, '余额支付', function (data) {

//            console.log(data);
//            alert(JSON.stringify(data))

//            return false;

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
          _czc.push(['_trackEvent', 'Pay_WxPay', 'submit', '发起微信支付',Math.floor(_money * 100),'Pay_WxPay']);

          //微信
          Interface.wxWebPay( Math.floor(_money * 100) , 1, this.tradeNo, '余额支付', function (data) {

//            console.log(data);

//            alert(JSON.stringify(data))

//            return false;

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

              window.location.href = data.returnJSON.mweb_url + '&redirect_url=' + encodeURI('https://mp.bombsport.com/ticket/payback.html?orderNo='+data.returnJSON.orderNo + ',' + _source);

            }
          });
        }
      }
    },

    mounted(){

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'Pay_page', 'onInit', '支付页','inited','Pay_init']);

      this.myHeight = $(window).height();

      var ticket = window.sessionStorage.getItem("soccer_ticket");

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
        this.radio = 0;
      }else{
        this.isMobile = false;
        this.radio = 0;
      }

      this.isLock = false;

      this.money = this.$route.params.money;
      this.tradeNo = this.$route.params.tradeNo;

      this.init();

    }

  }

</script>
