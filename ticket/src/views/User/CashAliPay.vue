<template>
  <div id="cash_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'提现'" :back="true"></navTitle>

    <template v-if="cashSuccess == true">

      <div class="wb100 text-center Fwhite-1">

        <div class="clear h50px"></div>

        <img src="~@/assets/images/true.png" class="w60px">
        <p>提现申请已提交</p>
        <p>预计24小时内到账</p>

        <div class="clear1"></div>
        <div class="clear1"></div>

        <div class="pal15 par15 Fwhite-1 lh50px warpper-black-3">
          <p>
            <span class="fl Fblack-2">账号：{{payeeAccount}}</span>
            <span class="fr">{{payeeRealName}}</span>
          </p>
          <div class="clear"></div>
          <p>
            <span class="fl Fblack-2">提现金额</span>
            <span class="fr Forange-2">￥{{money}}</span>
          </p>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>

        <div class="pa15">
          <div class="wb100 warpper-orange-2 Fwhite h45px lh45px text-center radius5 F16" @click="updateUser">
            完成
          </div>
        </div>

      </div>

    </template>

    <template v-if="cashSuccess != true">

      <div class="wb100">

        <div class="pa15">

          <!--创建支付宝提现订单-->

          <div class="clear1"></div>

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 80px;">
              <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                支付宝账号
              </div>
              <input type="text" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="payeeAccount" placeholder="请输入支付宝账号">
            </div>
            <div class="clear"></div>
          </div>

          <div class="clear1"></div>

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 80px;">
              <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                支付宝姓名
              </div>
              <input type="text" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="payeeRealName" placeholder="请输入支付宝姓名">
            </div>
            <div class="clear"></div>
          </div>

          <div class="clear1"></div>

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 80px;">
              <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                提现金额
              </div>
              <input type="tel" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="money" placeholder="请输入提现金额">
            </div>
            <div class="clear"></div>
          </div>

          <p class="lh40px Fblack-2 F14">
            <span class="fl">可提现金额{{user.outputBalance}}元</span>
            <span class="fr Fblue" @click="money = user.outputBalance">全部提现</span>
          </p>

          <div class="clear1"></div>

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 80px;">
              <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                支付密码
              </div>
              <input type="password" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="pwd" placeholder="请输入支付密码">
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
            <p>3、如您在提现时遇到问题，请致电客服：13272721166</p>
            <p>4、网站活动奖金只能用户购彩，不可提现</p>
          </div>

        </div>

      </div>
    </template>

    <el-dialog
      :visible.sync="dialogConfirm"
      size="large"
      :show-close="false">

      <p class="text-center F18" style="margin-top: -30px;">信息核对</p>

      <div class="clear1"></div>

      <p class="text-center F14 Fred">提交提现申请后信息将不可更改，请仔细核对！</p>

      <div class="clear1"></div>

      <p class="lh30px Fgray-3 F14">支付宝账号 {{payeeAccount}}</p>
      <div class="clear"></div>
      <p class="lh30px Fgray-3 F14">支付宝姓名 {{payeeRealName}}</p>
      <div class="clear"></div>
      <p class="lh30px Fgray-3 F14">提现金额 <span class="Fnum Fred">{{money}}</span>元</p>

      <div class="clear1"></div>

      <div class="wb100">
        <div class="wb40 text-center radius5 Fred h38px lh38px bor-red bor-solid-1a F16 fl" @click="dialogConfirm = false">
          修改
        </div>

        <div class="wb40 text-center radius5 h38px lh38px pa1 fr warpper-red Fwhite F16" @click="confirmPayee">
          确定
        </div>
      </div>

      <div class="clear"></div>

    </el-dialog>

    <el-dialog
      :visible.sync="dialogCash2"
      size="large"
      :show-close="false">

      <p class="Fgray-3 text-center F16">亲，为了您的账户安全，请进行实名认证再提现</p>

      <div class="clear1"></div>
      <div class="clear1"></div>

      <div class="wb100">

        <router-link :to="{ name: 'Index' }">
          <div class="wb40 text-center radius5 Fred h38px lh38px bor-red bor-solid-1a F16 fl">
            返回
          </div>
        </router-link>

        <router-link :to="{ name: 'BindIDCard', params: { call: true } }">
          <div class="wb40 text-center radius5 h38px lh38px pa1 fr warpper-red Fwhite F16">
            立即设置
          </div>
        </router-link>

      </div>

      <div class="clear"></div>

    </el-dialog>

    <el-dialog
      :visible.sync="dialogCash"
      size="large"
      :show-close="false">

      <p class="Fgray-3 text-center F16">亲，为了您的账户安全，请设置支付密码后再提现</p>

      <div class="clear1"></div>
      <div class="clear1"></div>

      <div class="wb100">

        <router-link :to="{ name: 'Index' }">
          <div class="wb40 text-center radius5 Fred h38px lh38px bor-red bor-solid-1a F16 fl">
            返回
          </div>
        </router-link>

        <router-link :to="{ name: 'SetPayPwd', params: { call: true } }">
          <div class="wb40 text-center radius5 h38px lh38px pa1 fr warpper-red Fwhite F16">
            立即设置
          </div>
        </router-link>

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
        outputBalance: 0,
        state: '',
        pwd: '',
        payeeAccount: '',
        payeeRealName: '',
        cashSuccess: false,
        dialogConfirm: false,
        dialogCash: false,
        dialogCash2: false,
        login: true,
        lock: false,
        user: {},
        idCardBind: false,
        mobileBind: false,
        bankCardBind: false,
        pwdBind: false,
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

        if (!this.pwdBind) {
          this.$router.push({ name: 'SetPayPwd', params: { call: true } });
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

      confirmPayee(){
        this.dialogConfirm = false;
        //创建订单成功
        Interface.confirmPayee(Math.floor(this.money * 100), this.payeeAccount, this.payeeRealName, this.bizNo, this.pwd, (data2, errorMsg2) => {

          if(data2){
              //
            let status = data2.returnJSON.status;

            if(status == 1){
                //提现成功
            }else{

            }

            this.cashSuccess = true;
          }else{
            this.$message({
              type: 'error',
              message: errorMsg2
            });
          }
        })
      },

      submit() {

        if (this.lock == true) {
          return false;
        }

        this.lock = true;

        if (isNaN(this.money)) {
          this.$message({
            type: 'error',
            message: '金额只能为数字'
          });
          return false;
        }

        if (this.money < 3) {
          this.$message({
            type: 'error',
            message: '提现金额最低为3元'
          });
          return false;
        }

        if (this.money >= 10000) {
            this.$message({
                type: 'error',
                message: '提现金额最高为10000元'
            });
            return false;
        }

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

        Interface.createAlipayPayee(Math.floor(this.money * 100), this.payeeAccount, this.payeeRealName, (data, errorMsg) => {
          if (data){

              this.bizNo = data.returnJSON.bizNo;

              this.dialogConfirm = true;

          } else {
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
          this.lock = false;
        })

      },
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

            let _outputBalance = parseInt(this.user.outputBalance);

            if(_outputBalance >=3 && _outputBalance <=10){
              this.money = _outputBalance;
            }
            var _tmp = data.returnJSON;
            if (Base.isNull(_tmp.bankCard)) this.bankCardBind = false;else this.bankCardBind = true;
            if (Base.isNull(_tmp.mobilePhone)) this.mobileBind = false;else this.mobileBind = true;
            if (Base.isNull(_tmp.identityCard)){
              this.idCardBind = false;
              this.dialogCash2 = true;
            }else this.idCardBind = true;
            if (Base.isNull(_tmp.outputPassword)){
              this.pwdBind = false;
              if(this.dialogCash2 != true){
                this.dialogCash = true;
              }
            } else this.pwdBind = true;
          }
        } else {
          this.login = false;
        }

        this.fullscreenLoading = false;

      });

    }

  }


</script>



<view class="wb100 warpper-red-1">
  <view class="wb100 relative">
    <image src='../../images/god_of_wealth_bg.png' style='width:100%; height:{{height}}rpx;'></image>
    <image src='../../images/god_of_wealth_img.png' style='width:600rpx; height:600rpx; position:absolute; top:220rpx; right:0; left:0; margin:0 auto;'></image>
  </view>

  <view class="clear h40rpx"></view>

  <!-- 祝福语  -->
  <view class='pal50 Fyellow-2 F30'>
    编辑祝福语
  </view>
  <view class='pa30'>
    <view class='bor-yellow bor-solid-1a radius10 pa25 F30 lh40rpx relative' style='border:1rpx solid #FBFFA8; color:#FCBC8C'>
      踏雪无痕骏马奔，迎来春节福临门。锣鼓喧天庆佳节，大街小巷人沸腾。走家串户去拜年，祝福声声笑盈盈。祝你春节好运伴，生活幸福上一层!
    </view>
  </view>

  <view class="pa30">
    <view class='wb100 lh100rpx h100rpx text-center warpper-yellow-1 radius5 F36 Fred'>
      给朋友拜年
    </view>
  </view>

  <view class="clear"></view>

</view>


