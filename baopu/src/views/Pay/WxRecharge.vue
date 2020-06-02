<template>

  <div id="recharge_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'充值'" :back="true"></navTitle>

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

      <div class="pa15">
        <div class="wb100 warpper-orange-7 Fwhite h45px lh45px text-center radius5 F16" @click="recharge">
          微信支付
        </div>
      </div>

    </div>

    <div class="clear1"></div>

    <div class="text-center Fgray-6">
      <p>联系我们</p>
      <div class="clear h10px"></div>

      <p>电话/微信：<a href="tel:13272721166"> <span class="Forange-2 Fnum">13272721166</span> </a></p>

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
              isLock: false,
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

              //微信公众号支付

            Interface.wxJsPay(_money * 100, '', '', function (data) {

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

          var _this = this;

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
            _this.fullscreenLoading = false;
          });

          _this.isLock = false;

        }

    }

</script>
