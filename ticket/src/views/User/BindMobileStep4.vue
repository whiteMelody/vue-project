<template>
  <div id="bind_mobile_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'绑定手机号 第四步'" :back="true"></navTitle>

    <div class="wb100">

      <template v-if="state == 3">

        <div class="clear h30px"></div>

        <div class="pal15 par15 relative F14 warpper-black-3">
          <div style="padding-left: 80px;">
            <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
              身份证号
            </div>
            <input type="tel" class="bor-none wb100 h45px lh45px Fnum warpper-none Fwhite-1" v-model="cardNum" placeholder="请输入身份证号">
          </div>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
        <div class="clear1"></div>
        <div class="pa15">
          <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="cardNum.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="state = 4">下一步</div>
        </div>

      </template>

      <template v-if="state == 4">

        <div class="clear h30px"></div>

        <div class="Fgray-3 wb100">

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 60px;">
              <div class="w50px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                新手机号
              </div>
              <input type="tel" class="bor-none wb100 h45px lh45px Fnum warpper-none Fwhite-1" v-model="bindMobile2.mobile" placeholder="请输入新手机号">
            </div>
            <div class="clear"></div>
          </div>

          <div class="pal15">
            <div class="clear bor-black2 bor-solid-1b"></div>
          </div>

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 60px;">
              <div class="w50px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                验证码
              </div>
              <input type="tel" class="bor-none wb50 h45px lh45px fl Fnum Fwhite-1 warpper-none" v-model="bindMobile2.code" placeholder="请输入验证码">
              <input type="button" data-role="none" class="warpper-gray bor-none h45px lh45px wb45 fr code-btn" :class="bindMobile2.mobile.length!=11 || bindMobile2.lock ? 'Fgray-2' : 'Fblue'" :disabled="bindMobile2.mobile.length!=11 || bindMobile2.lock" @click="sendCode" :value="bindMobile2.codeText">
            </div>
            <div class="clear"></div>
          </div>

          <div class="clear1"></div>
          <div class="clear1"></div>
          <div class="clear1"></div>
          <div class="pa15">
            <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="bindMobile2.mobile.length>0 && bindMobile2.code.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="submit">确定</div>
          </div>

          <div class="clear1"></div>

        </div>

      </template>

    </div>



  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        myHeight: 0,
        bindMobile: {
          mobile: '',
          code: '',
          timeID: 0,
          timer: 60,
          codeText: "获取验证码",
          lock: false
        },
        bindMobile1: {
          mobile: '',
          code: '',
          timeID: 0,
          timer: 60,
          codeText: "获取验证码",
          lock: false
        },
        bindMobile2: {
          mobile: '',
          code: '',
          timeID: 0,
          timer: 60,
          codeText: "获取验证码",
          lock: false
        },
        state: 3,
        cardNum: '',
        mobilePhone: '',
        call: ""
      }
    },

    methods: {
      sendCode() {

        //判断state

        if (this.state == 0) {
          if (this.bindMobile.lock) {
            return false;
          } else {
            this.bindMobile.lock = true;
            Interface.sendBindPhoneCode(this.bindMobile.mobile, (data) => {
              if (data) {
                this.bindMobile.code = data.returnJSON;
                this.bindMobile.timeID = setInterval(this.clock, 1000);
              }
            });
          }
        } else if (this.state == 2) {
          if (this.bindMobile1.lock) {
            return false;
          } else {
            this.bindMobile1.lock = true;
            Interface.changeMobilePhoneCode( (data) => {
              if (data) {
                this.bindMobile1.code = data.returnJSON;
                this.bindMobile1.timeID = setInterval(this.clock1, 1000);
              }
            });
          }
        } else if (this.state == 4) {
          if (this.bindMobile2.lock) {
            return false;
          } else {
            this.bindMobile2.lock = true;
            Interface.changeMobilePhoneCode( (data) => {
              if (data) {
                this.bindMobile2.code = data.returnJSON;
                this.bindMobile2.timeID = setInterval(this.clock2, 1000);
              }
            });
          }
        }
      },
      clock2() {

        if (this.state == 4) {
          this.bindMobile2.timer--;
          this.bindMobile2.codeText = this.bindMobile2.timer + "秒后重发";
          if (this.bindMobile2.timer <= 0) {
            clearInterval(this.bindMobile2.timeID);
            this.bindMobile2.lock = false;
            this.bindMobile2.timer = 60;
            this.bindMobile2.codeText = "重发验证码";
          }
        }
      },
      clock() {

        if (this.state == 0) {
          this.bindMobile.timer--;
          this.bindMobile.codeText = this.bindMobile.timer + "秒后重发";
          if (this.bindMobile.timer <= 0) {
            clearInterval(this.bindMobile.timeID);
            this.bindMobile.lock = false;
            this.bindMobile.timer = 60;
            this.bindMobile.codeText = "重发验证码";
          }
        }
      },
      clock1() {

        if (this.state == 2) {
          this.bindMobile1.timer--;
          this.bindMobile1.codeText = this.bindMobile1.timer + "秒后重发";
          if (this.bindMobile1.timer <= 0) {
            clearInterval(this.bindMobile1.timeID);
            this.bindMobile1.lock = false;
            this.bindMobile1.timer = 60;
            this.bindMobile1.codeText = "重发验证码";
          }
        }
      },
      submit() {

        if (this.state == 0) {
          Interface.bindMobilePhone(this.bindMobile.mobile, this.bindMobile.code, (data, errorMsg) => {
            if (data) {
              this.$message({
                type: 'success',
                message: '绑定成功'
              });
              this.mobilePhone = this.bindMobile.mobile;
            } else {
              this.$message({
                type: 'error',
                message: errorMsg
              });
            }
          });
        } else if (this.state == 4) {
          Interface.smsUpMobilePhone(this.bindMobile1.cardNum, this.bindMobile2.mobile, this.bindMobile2.code, (data, errorMsg) => {
            if (data) {
              this.$message({
                type: 'success',
                message: '绑定成功'
              });
              this.state = 0;
              this.mobilePhone = this.bindMobile2.mobile;
            } else {
              this.$message({
                type: 'error',
                message: errorMsg
              });
            }
          });
        }
      }
    },

    mounted(){

      this.myHeight = $(window).height();

      Interface.securityInfo( (data) => {
        if (data) {
          var _tmp = data.returnJSON;
          if (Base.isNull(_tmp.mobilePhone))
              this.mobilePhone = '';
          else
              this.mobilePhone = _tmp.mobilePhone;
        }
        this.fullscreenLoading = false;
      });

    }

  }


</script>

