<template>
  <div class="Login" :style="'min-height:'+ minHeight +'px' ">
    <div class="login_box">
      <div class="box">
        <h3>欢迎登录</h3>
        <ul>
          <li>
            <span>账号</span>
            <p><input type="text" placeholder="请输入账号" v-model="userName" autocomplete="off"></p>
          </li>
          <li>
            <span>密码</span>
            <p><input type="password" placeholder="请输入密码" v-model="passWord" autocomplete='new-password'></p>
          </li>
        </ul>
        <b :class="{ active: hint }">请输入正确的账号密码</b>
        <a v-if="loginClick" @click="postSub" class="may">登录</a>
        <a v-else class="be_not_allowed">正在登录</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { login } from '@/assets/api/Data/Login';
export default {
  name: "Login",
  data() {
    return {
      minHeight: 0,
      loginClick:true,
      userName:'',
      passWord:'',
      hint:false
    };
  },
  watch: {
  },
  components: {
    Toast,
  },
  methods: {
    postSub(){
      const that = this;
      if(that.userName !='' && that.passWord !='')
      {
        that.hint = false;
        that.loginClick = false;

        let postData = {
          grant_type:"password",
          client_secret:"6Xgw2LYVPzIYNdIsHMOzotNGE9DXswCslsdObe2E",
          scope:'*',
          client_id:5,
          username:that.userName,
          password:that.passWord,
          refererUrl:-1,
          openid: localStorage.getItem('openid'),
        }

        login(postData).then(res => {
          that.loginClick = true;
          if(res.status == 0)
          {
              window.location.href = "index.html"
            window.localStorage.setItem('webToken',res.data.token);
          }
          else
          {
            Toast(res.msg)
          }
        }).catch((e)=>{
          console.log(e)
        })
      }
      else
      {
        // that.hint = true;
        Toast("请输入正确的账号密码")
      }
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {

  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight
  },

  // 更新前状态
  beforeUpdate() {
  },

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
@import "./Login.scss";
</style>



    
