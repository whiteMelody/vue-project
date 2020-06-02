<template>
  <div class="Login">
    <div class="login_left">
      <img src="../../assets/img/logo.png" alt>
      <div class="text">
        <span class="span1">依美云管理后台</span>
        <span class="span2">
          <i></i> WITH THE TUBE SUBLIMATION BEAUTY INDUSTRY LIFELINE
        </span>
        <span class="span3">LET THE BEAUTY INDUSTRY MORE BEAUTIFUL</span>
      </div>
    </div>
    <div class="login_right">
      <div>
        <span>欢迎登录</span>
        <b>
          <i class="iconfont iconyonghu">账号</i>
          <input
            type="text"
            placeholder="请输入账号"
            v-model="username"
            autocomplete="off"
            @keyup.enter="loginFn()"
          >
        </b>
        <b>
          <i class="iconfont iconmima">密码</i>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="password"
            autocomplete="off"
            @keyup.enter="loginFn()"
          >
        </b>
      </div>
      <a v-if="pitchOn" class="btns" @click="loginFn()">登录</a>
      <a v-else class="btns bg-gray3">登陆中，请稍后</a>
    </div>
  </div>
</template> 
<script>
import { login ,getUserInfo } from "@/assets/api/login/login";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      warning: "",
      pitchOn: true
    };
  },
  components: {},
  methods: {
    loginFn() {
      const that = this;
      this.warning = "";
      if (that.username == "") {
        this.warning = "请输入账号";
        return false;
      }
      if (that.password == "") {
        this.warning = "请输入密码";
        return false;
      }

      this.pitchOn = false;

      login({
        username: this.username,
        password: this.password,
        grant_type: "password",
        client_secret: "6Xgw2LYVPzIYNdIsHMOzotNGE9DXswCslsdObe2E",
        scope: "*",
        client_id: 5
      })
        .then(res => {
          if (res.status == 0) {
            localStorage.setItem("webToken", res.data.token);
            getUserInfo()
              .then(res2 => {
                if (res.status == 0) {
                  this.$store.commit("SET_CURRENT_USER", res2.data);
                  this.$router.push({
                    path: "/EnterpriseList"
                  });
                  this.pitchOn = true;
                } else {
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "error"
                  });
                  this.$store.commit("SET_CURRENT_USER", {});
                  this.pitchOn = true;
                }
              })
              .catch(error => {
                this.$message({
                  showClose: true,
                  message: error,
                  type: "error"
                });
                this.$store.commit("SET_CURRENT_USER", {});
                this.pitchOn = true;
              });
          } else {
            this.pitchOn = true;
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
          this.pitchOn = true;
        });
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {},

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.Login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login_bg.png") center/100% 100% no-repeat;
  .login_left {
    float: left;
    img {
      margin-top: 0.9rem;
      margin-left: 1rem;
    }
    .text {
      position: absolute;
      left: 2rem;
      bottom: 2.68rem;
      span {
        display: block;
        font-family: SourceHanSansCN-Light;
        color: rgba(255, 255, 255, 1);
        &.span1 {
          font-size: 0.32rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        &.span2,
        &.span3 {
          font-size: 0.28rem;
          font-weight: 300;
        }
        &.span2 {
          display: flex;
          align-items: center;
        }
        &.span3 {
          text-align: right;
        }
        i {
          display: inline-block;
          width: 0.2rem;
          height: 4px;
          background: rgba(255, 255, 255, 1);
          margin-right: 0.18rem;
        }
      }
    }
  }
  .login_right {
    width: 30%;
    height: 93%;
    float: right;
    background-color: #fff;
    margin: 0.4rem 0.45rem 0.33rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      font-size: 0.32rem;
      font-family: SourceHanSansCN-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 0.5rem;
      display: block;
    }
    div {
      b {
        margin-top: 0.3rem;
        width: 3.5rem;
        height: 50px;
        border-bottom: solid 1px #e5e5e5;
        display: flex;
        align-items: center;
        overflow: hidden;
        background: #fff;
        i {
          overflow: hidden;
          padding-right: 0.4rem;
          font-size: 0.16rem;
          font-family: MicrosoftYaHeiLight;
          font-weight: 300;
          color: rgba(51, 51, 51, 1);
        }
        input {
          flex: 1;
          height: 100%;
          border: 0;
          background: none;
          outline: medium;
          color: #333;
        }
      }
    }
    .btns {
      margin-top: 0.8rem;
      width: 3.5rem;
      height: 50px;
      background-color: #627aad;
      border: 0;
      color: #fff;
      font-size: 0.14rem;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
    }
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-text-fill-color: #333 !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
  }
  input {
    background-color: transparent;
  }
}
</style>



    
