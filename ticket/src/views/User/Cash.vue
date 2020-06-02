<template>
  <div id="cash_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'提现'" :back="true"></navTitle>

    <template v-if="cashSuccess == true">

      <div class="wb100 text-center">

        <div class="clear h50px"></div>

        <img src="~@/assets/images/true.png" class="w60px">
        <p>提现申请已提交</p>
        <p>预计1-3个工作日到账</p>

        <div class="clear1"></div>
        <div class="clear1"></div>

        <div class="pal15 par15 Fgray-3 lh50px warpper-white">
          <p>
            <span class="fl Fgray-2">{{bankCardList[currentCard2].cardTypeDesc}}</span>
            <span class="fr">{{bankCardList[currentCard2].bankName}} 尾号{{bankCardList[currentCard2].bankCard}}</span>
          </p>
          <div class="clear"></div>
          <p>
            <span class="fl Fgray-2">提现金额</span>
            <span class="fr">￥{{money}}</span>
          </p>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>

        <div class="pa15">
          <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="updateUser">
            完成
          </div>
        </div>

      </div>

    </template>

    <template v-if="cashSuccess != true">

      <div class="wb100">

        <div class="pa15">

          <div class="pa15 bor-gray bor-solid-1a relative warpper-white F14" v-if="bankCardList.length > 0" @click="showCardList">
            <img :src="bankCardList[currentCard2].icon" class="w50px h50px fl">

            <div class="w100px fl lh25px mal15">
              <p>{{bankCardList[currentCard2].bankName}}</p>
              <p class="F14 Fgray-3">{{bankCardList[currentCard2].cardTypeDesc}}</p>
            </div>
            <div class="w90px fr h50px lh50px">
              尾号{{bankCardList[currentCard2].bankCard}}
              <img src="~@/assets/images/arrow-right.png" class="fr h16px" style="margin-top: 17px;">
            </div>
            <div class="clear"></div>
          </div>
          <div class="clear1"></div>

          <div class="clear1"></div>

          <div class="pal15 par15 relative F14 warpper-white">
            <div style="padding-left: 80px;">
              <div class="w70px absolute" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                金额
              </div>
              <input type="tel" class="bor-none wb100 h45px lh45px" v-model="money" placeholder="请输入提现金额">
            </div>
            <div class="clear"></div>
          </div>

          <p class="lh40px Fblack-2 F14">
            <span class="fl">可提现金额{{user.outputBalance}}元</span>
            <span class="fr Fblue" @click="money = user.outputBalance">全部提现</span>
          </p>

          <div class="clear1"></div>

          <div class="pal15 par15 relative F14 warpper-white">
            <div style="padding-left: 80px;">
              <div class="w70px absolute" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                支付密码
              </div>
              <input type="password" class="bor-none wb100 h45px lh45px" v-model="pwd" placeholder="请输入支付密码">
            </div>
            <div class="clear"></div>
          </div>

          <div class="clear1"></div>

          <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="money!=0 && pwd.length!=0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="submit">确认提现</div>

          <div class="clear1"></div>
          <div class="clear1"></div>

          <div class="wb100 F12 lh20px Fblack-2">
            <p class="Fred lh30px F14">温馨提示：</p>
            <p>1、单注中奖金额＞10000元，奖金在一周后方可提现。</p>
            <p>2、为保障您的资金安全，我们将审核您的提现申请后再汇至您的  银行卡</p>
            <p>3、如您在提现时遇到问题，请致电客服：13310227366</p>
            <p>4、网站活动奖金只能用户购彩，不可提现</p>
          </div>

        </div>

        <div class="dialogBg2" @click="hideCardList(false)"></div>

        <div class="card-area" :style="cardStyle">

          <div class="h50px lh50px warpper-red relative wb100" style="z-index: 99">
            <div class="w50px h50px lh50px fl absolute Fwhite" style="top: 0; left: 15px;" @click="hideCardList(true)">
              确定
            </div>
            <p class="text-center Fwhite"> 选择银行卡</p>
            <div class="w50px h50px lh50px fl absolute Fwhite text-right" style="top: 0; right: 15px;" @click="hideCardList(false)">
              取消
            </div>
          </div>

          <div class="pal15 par15 F14" style="height: 200px; overflow-y: scroll;">
            <div class="clear1"></div>
            <template v-for="(item,key) in bankCardList">
              <div class="pa15 bor-gray bor-solid-1a relative warpper-white F14" @click="currentCard = key" :class="currentCard == key ? 'warpper-pink' : 'warpper-white'">
                <img :src="item.icon" class="w50px h50px fl">

                <div class="w100px fl lh25px mal15">
                  <p>{{item.bankName}}</p>
                  <p class="F14 Fgray-3">{{item.cardTypeDesc}}</p>
                </div>
                <div class="w80px fr h50px lh50px">
                  尾号{{ item.bankCard}}
                </div>
                <img src="~@/assets/images/icon-selected.png" class="absolute h25px" style="top: 0; right: 0;" v-if="item.defaultCard == 1">
                <div class="clear"></div>
              </div>
              <div class="clear1"></div>
            </template>
          </div>
        </div>

      </div>
    </template>

    <el-dialog
      :visible.sync="dialogCash"
      size="large"
      :show-close="false">

      <p class="Fgray-3 text-center F16">亲，为了您的账户安全，请绑定银行卡和支付密码后再提现</p>

      <div class="clear1"></div>
      <div class="clear1"></div>

      <div class="wb100">

        <router-link :to="{ name: 'Index' }">
          <div class="wb40 text-center radius5 Fred h38px lh38px bor-red bor-solid-1a F16 fl">
            返回
          </div>
        </router-link>

          <div class="wb40 text-center radius5 h38px lh38px pa1 fr warpper-red Fwhite F16" @click="toCash">
            立即绑定
          </div>
      </div>

      <div class="clear"></div>

    </el-dialog>

  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'

  import zgyh from '../../assets/images/bank-zgyh.png'
  import jsyh from '../../assets/images/bank-jsyh.png'
  import nyyh from '../../assets/images/bank-nyyh.png'
  import gsyh from '../../assets/images/bank-gsyh.png'
  import msyh from '../../assets/images/bank-msyh.png'
  import zsyh from '../../assets/images/bank-zsyh.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        showResult: false,
        money: 0,
        myHeight: 0,
        state: '',
        pwd: '',
        cashSuccess: false,
        dialogCash: false,
        login: true,
        user: {},
        currentCard2: 0,
        currentCard: -1,
        name: '',
        num1: '',
        num2: '',
        infoMsg: '请先进行实名认证',
        bankCardList: [],
        idCardBind: false,
        mobileBind: false,
        bankCardBind: false,
        pwdBind: false,
        cardStyle: {
          position: 'fixed',
          bottom: '-240px',
          left: 0,
          zIndex: 99999,
          background: 'rgba(255,255,255,1)',
          width: '100%',
          height: '240px',
          overflow: 'hidden',
          transition: "all .3s"
        }
      }
    },

    methods: {
      myBack() {

        if (Base.isNull(this.call)) {
            this.$router.go(-1);
        } else {
            this.$router.push({ name: this.call });
        }
      },

      toCash() {
        if (!this.idCardBind) {
          this.$router.push({ name: 'BindIDCard', params: { call: true } });
          return false;
        }
        if (!this.pwdBind) {
          this.$router.push({ name: 'SetPayPwd', params: { call: true } });
          return false;
        }
        if(this.bankCardList.length == 0){
          this.$router.push({ name: 'AddBankCard', params: { call: true } });
          return false;
        }
      },

      updateUser() {

        Interface.userBaseInfo((data) => {
          console.log(data);
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

          this.cashSuccess = false;

          this.pwd = '';
          this.money = 0;

        });

      },

      submit() {

        if (isNaN(this.money)) {
          this.$message({
            type: 'error',
            message: '金额只能为数字'
          });
          return false;
        }

        if (this.money < 1) {
          this.$message({
            type: 'error',
            message: '提现金额最低为1元'
          });
          return false;
        }

//                if (_this.money >= 10000) {
//                    _this.$message({
//                        type: 'error',
//                        message: '提现金额最高为10000元'
//                    });
//                    return false;
//                }

        if (this.user.outputBalance < this.money) {
          this.$message({
            type: 'error',
            message: '超出可提现金额'
          });
          return false;
        }

        if (Base.isNull(this.pwd)) {
          this.$message({
            type: 'error',
            message: '请输入支付密码'
          });
          return false;
        }

        Interface.applyAccountOutput(this.bankCardList[this.currentCard2].cardID, this.money * 100, this.pwd, (data, errorMsg) => {
          if (data) {
            this.cashSuccess = true;
          } else {
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
        });
      },
      hideCardList(e) {

        if(this.currentCard<0){
          this.cardStyle.bottom = "-240px";
          $(".dialogBg2").hide(0);
          return false;
        }

        if(e == false){
          this.currentCard = -1;
        }
        if(e == true){
          this.currentCard2 = this.currentCard;
        }

        this.cardStyle.bottom = "-240px";
        $(".dialogBg2").hide(0);
      },
      showCardList(e) {
        if (this.cardStyle.bottom == "-5px") {
          this.cardStyle.bottom = "-240px";
        } else {
          this.cardStyle.bottom = "-5px";
        }
        $(".dialogBg2").show(0);
      },
      changeCard() {}
    },

    mounted(){

      this.myHeight = $(window).height();

      Interface.securityInfo((data) => {
        if (data) {
          var _tmp = data.returnJSON;
          if (Base.isNull(_tmp.identityCard)) {
            this.state = '失败';
            this.showResult = true;
          }
        }
        this.fullscreenLoading = false;
      });

      Interface.userBaseInfo( (data) => {

        if (data) {
          if (Base.isNull(data.returnJSON)) {
            this.login = false;
          } else {
            this.login = true;
            this.user = data.returnJSON;
            var _tmp = data.returnJSON;
            if (Base.isNull(_tmp.bankCard)) this.bankCardBind = false;else this.bankCardBind = true;
            if (Base.isNull(_tmp.mobilePhone)) this.mobileBind = false;else this.mobileBind = true;
            if (Base.isNull(_tmp.identityCard)) this.idCardBind = false;else this.idCardBind = true;
            if (Base.isNull(_tmp.outputPassword)) this.pwdBind = false;else this.pwdBind = true;
          }
        } else {
          this.login = false;
        }

        this.fullscreenLoading = false;

      });

      Interface.bankCardList((data) => {
        if (data) {

          var _item = data.returnJSON;

          if (_item.length == 0) {

              this.dialogCash = true;
              this.fullscreenLoading = false;
              return false;
          }

          for (var i = 0; i < _item.length; i++) {

            if (_item[i].abbreviation == 'BOC') {
              _item[i].icon = zgyh;
            }if (_item[i].abbreviation == 'CCB') {
              _item[i].icon = jsyh;
            }if (_item[i].abbreviation == 'ABC') {
              _item[i].icon = nyyh;
            }if (_item[i].abbreviation == 'ICBC') {
              _item[i].icon = gsyh;
            }if (_item[i].abbreviation == 'CMSB') {
              _item[i].icon = msyh;
            }if (_item[i].abbreviation == 'CMB') {
              _item[i].icon = zsyh;
            }

            _item[i].bankCard = _item[i].bankCard.substring(_item[i].bankCard.length - 4);
          }

          this.bankCardList = _item;
        }
        this.fullscreenLoading = false;

      });

    }

  }


</script>

