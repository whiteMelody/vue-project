<template>

  <div id="pay_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'支付'" :back="true"></navTitle>

    <div class="wb100 ">

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

            <!--&lt;!&ndash;其他模式&ndash;&gt;-->
            <!--<template>-->
              <!--<div class="wb100">-->
                <!--<div class="pa15 lh20px bor-black2 bor-solid-1a F14 relative warpper-black-3">-->

                  <!--<p class="F16 text-center lh25px Fwhite-1">{{item.hTeam}} VS {{item.vTeam}}</p>-->

                  <!--<div class="clear h10px"></div>-->

                  <!--<div class="wb100" @click="showDialog(key, item.playIndex)">-->
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

        <div class="pal15 Fblack-2 warpper-black-3 lh45px">

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

        </div>

        <div class="clear1"></div>

        <div class="pal15 par15 lh45px h45px Fblack-2 warpper-black-3">
          <span class="fl">应付</span>

          <span class="fr Fnum Forange-2">{{ twoDecimal(money - user.accountBalance) }}元</span>

        </div>

        <div class="clear1 "></div>
      </div>

      <div class="pa15 ">

        <p class="lh30px Fblack-2">因相关部门规定，售票已停止，为您带来不便，敬请谅解</p>
        <!--<p class="lh30px">微信支付暂时关闭，请在浏览器打开使用支付宝支付，为您带来不便，敬请谅解</p>-->
        <!--<div class="wb100 warpper-orange-2 Fwhite h45px lh45px text-center radius5 F16" @click="pay('wx')">-->
          <!--微信支付-->
        <!--</div>-->
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

    export default{

        data (){
            return {
              fullscreenLoading: true,
              showResult: false,
              login: false,
              myHeight: 0,
              ticket: [],
              money: 0,
              tradeNo: 0,
              user: {},
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

            if(this.ticket.length <= _size){
              _size = this.ticket.length
            }

            for(let i=2; i<=_size; i++){
              _tmp.push({
                val: i,
                isSelected: false
              })
            }

            this.soccerGroup = _tmp;

            this.soccerGroup[this.soccerGroup.length-1].isSelected = true;

            if (this.ticket.length > 0) {
              this.lock = false;
              this.fullscreenLoading = false;
            }

          },

          pay() {
            var _this = this;

            if(_this.login == false){
              _this.$router.push({ name: 'Login', params:{ call: true } });
              return false;
            }

            let payMoney = this.twoDecimal(this.money - this.user.accountBalance)

            //- cnzz自定义统计
            // 测试完后请删除这条注数

            _czc.push(["_setAccount", "1271278320"]);
            _czc.push(['_trackEvent', 'WxPay_WxPay', 'submit', '发起微信公众号支付',Math.floor(payMoney * 100),'WxPay_WxPay']);

            //微信公众号支付
            Interface.wxJsPay( Math.floor(payMoney * 100) , 1, this.tradeNo, '投注余额支付', function (data) {

//                alert(JSON.stringify(data))

              WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                JSON.parse(data.returnJSON),
                function(res){

//                    alert(JSON.stringify(res));

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

        },

        mounted(){

          //- cnzz自定义统计
          // 测试完后请删除这条注数

          _czc.push(["_setAccount", "1271278320"]);
          _czc.push(['_trackEvent', 'WxPay_page', 'onInit', '微信公众号支付页','inited','WxPay_init']);

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
            this.fullscreenLoading = false;
          });

          this.money = this.$route.query.money;
          this.tradeNo = this.$route.query.tradeNo;

          this.init();

        }

    }

</script>
