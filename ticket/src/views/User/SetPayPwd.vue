<template>
  <div id="set_pay_pwd_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'设置支付密码'" :back="true"></navTitle>

    <div class="wb100">

      <template v-if="outputPassword == ''">

        <div class="clear h30px"></div>

        <div class="wb100">

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 80px;">
              <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                设置密码
              </div>
              <input type="password" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="pwd1" placeholder="请输入密码">
            </div>
            <div class="clear"></div>
          </div>

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 80px;">
              <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                确认密码
              </div>
              <input type="password" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="pwd2" placeholder="请确认密码">
            </div>
            <div class="clear"></div>
          </div>

          <div class="clear1"></div>
          <div class="clear1"></div>
          <div class="pa15">
            <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="pwd1.length>0 && pwd2.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="submit">确定</div>
          </div>

        </div>
      </template>

      <template v-if="outputPassword != ''">

        <div class="clear h30px"></div>

        <div class="pal15 par15 warpper-black-3 lh50px F14 Fwhite-1">
          <p>
            <span class="w70px fl">支付密码</span>
            <span class="fl">******</span>
            <span class="fr Fred">已绑定</span>
          </p>
          <div class="clear"></div>
        </div>

        <div class="clear1"></div>
        <div class="clear1"></div>
        <div class="clear1"></div>

        <router-link :to="{ name: 'UpdatePayPwd', params: { call: true } }">
          <div class="pa15">
            <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5">更改支付密码</div>
          </div>
        </router-link>

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
        pwd1: '',
        rpwd1: '',
        pwd2: '',
        rpwd2: '',
        oldPwd: '',
        newPwd1: '',
        newPwd2: '',
        outputPassword: '',
        state: 1,
        code: '',
        mobile: "",
        call: "",
        codeText: "获取验证码",
        timeID: 0,
        myHeight: 0,
        timer: 60,
        lock: false,
        login: false
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

        if (this.newPwd1 != this.newPwd1) {
          this.$message({
            type: 'error',
            message: '两次密码不一致'
          });
        } else {

          Interface.outPwd(this.oldPwd, this.newPwd1, (data) => {
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

      Interface.securityInfo( (data) => {
        if (data) {
          var _tmp = data.returnJSON;
          this.login = true;
          if (Base.isNull(_tmp.outputPassword))
              this.outputPassword = '';
          else
              this.outputPassword = _tmp.outputPassword;
        }else{
          this.login = false;
        }
        this.fullscreenLoading = false;
        console.log(data);
      });

    }

  }


</script>

