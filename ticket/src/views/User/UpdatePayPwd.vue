<template>
  <div id="set_pay_pwd_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'修改支付密码'" :back="true"></navTitle>

    <div class="wb100">

      <div class="clear h30px"></div>

      <div class="wb100">

        <div class="pal15 par15 relative F14 warpper-black-3">
          <div style="padding-left: 80px;">
            <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
              原始密码
            </div>
            <input type="password" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="oldPwd" placeholder="请输入密码">
          </div>
          <div class="clear"></div>
        </div>

        <div class="clear bor-solid-1b bor-black2"></div>

        <div class="pal15 par15 relative F14 warpper-black-3">
          <div style="padding-left: 80px;">
            <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
              新的密码
            </div>
            <input type="password" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="newPwd1" placeholder="请确认密码">
          </div>
          <div class="clear"></div>
        </div>

        <div class="clear bor-black2 bor-solid-1b"></div>

        <div class="pal15 par15 relative F14 warpper-black-3">
          <div style="padding-left: 80px;">
            <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
              确认密码
            </div>
            <input type="password" class="bor-none wb100 h45px lh45px warpper-none" v-model="newPwd2" placeholder="请确认密码">
          </div>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>

        <router-link :to="{ name: 'FindPayPwd' }">
          <p class="text-right Fblue par15 F14">忘记密码？</p>
        </router-link>

        <div class="clear1"></div>
        <div class="clear1"></div>
        <div class="pa15">
          <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5" :class="oldPwd.length>0 && newPwd1.length>0 && newPwd2.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="updatePwd">确定</div>
        </div>

      </div>


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
        pwd1: '',
        rpwd1: '',
        pwd2: '',
        rpwd2: '',
        oldPwd: '',
        newPwd1: '',
        newPwd2: '',
        outputPassword: '',
        state: 1,
        myHeight: 0,
        code: '',
        mobile: "",
        call: "",
        codeText: "获取验证码",
        timeID: 0,
        timer: 60,
        lock: false
      }
    },

    methods: {
      next() {
        this.state = 5;
      },
      editMobile() {
        this.state = 2;
      },
      sendCode() {

        if (this.lock) {
          return false;
        } else {
          this.lock = true;
          Interface.forgetPayPwdCode(this.mobile, (data) => {
            if (data) {
//              this.resultCode = data.returnJSON;
//              this.code = data.returnJSON;
              this.timeID = setInterval(this.clock, 1000);
            }
          });
        }
      },
      clock() {
        this.timer--;
        this.codeText = this.timer + "秒后重发";

        if (this.timer <= 0) {
          clearInterval(this.timeID);
          this.lock = false;
          this.timer = 60;
          this.codeText = "重发验证码";
        }
      },
      myBack() {
          this.$router.go(-1);
      },
      btnCallback2(val) {
        if (data.state == 'success') {
          this.state = 5;
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          });
        }
      },
      resetPwd() {

        if (this.rpwd1 != this.rpwd2) {
          this.$message({
            type: 'error',
            message: '两次密码不一致'
          });
        } else {

          Interface.resetOutPwd(this.code, this.rpwd1, (data) => {
            if (data) {
              this.$message({
                type: 'success',
                message: '设置成功'
              });
              this.outputPassword = this.rpwd1;
              this.state = 1;
            } else {
              this.$message({
                type: 'error',
                message: '设置失败'
              });
            }
          });
        }
      },
      updatePwd() {

        if (this.newPwd1 != this.newPwd2) {
          this.$message({
            type: 'error',
            message: '两次密码不一致'
          });
        } else {

          Interface.outPwd(this.oldPwd, this.newPwd1, (data) => {
            if (data) {

              if(data.returnJSON == "密码验证错误"){
                this.$message({
                  type: 'error',
                  message: '密码验证错误'
                });
                return false;
              }

              this.$message({
                type: 'success',
                message: '设置成功'
              });
              this.outputPassword = this.pwd1;
              this.state = 1;

              if (Base.isNull(this.call)) {
                  this.$router.replace({ name: 'SetPayPwd' });
              } else {
                  this.$router.go(-1);
              }

            } else {
              this.$message({
                type: 'error',
                message: '设置失败'
              });
            }
          });
        }
      },
      submit() {

        if (this.pwd1 != this.pwd2) {
          this.$message({
            type: 'error',
            message: '两次密码不一致'
          });
        } else {

          Interface.outPwd(this.pwd1, this.pwd2, (data) => {

            if (data) {
              this.$message({
                type: 'success',
                message: '设置成功'
              });
              this.outputPassword = this.pwd1;
              this.state = 1;
            } else {
              this.$message({
                type: 'error',
                message: '设置失败'
              });
            }
          });
        }
      }
    },

    mounted(){

      this.myHeight = $(window).height();

      this.call = this.$route.params.call;

      this.fullscreenLoading = false;

    }

  }


</script>

