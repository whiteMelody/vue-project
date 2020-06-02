<template>
  <div class="Login">
    <div class="login_div">
      <div class="login_text">
        <h3>依美云企业运营系统</h3>
        <h4>连锁端</h4>
        <span></span>
      </div>
      <div class="login_import">
        <span>
          <img src="@/chain/assets/login/yiyun_logo.png" alt>
        </span>
        <div>
          <b>
            <i class="iconfont iconyonghu"></i>
            <input type="text" placeholder="请输入账号" v-model="username" @keyup.enter="loginFn()">
          </b>
          <b>
            <i class="iconfont iconmima"></i>
            <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="loginFn()">
          </b>
        </div>
        <em>
          <b>{{warning}}</b>
        </em>

        <a v-if="pitchOn" class="btns" @click="loginFn()">登录</a>
        <a v-else class="btns">登录中，请稍后</a>
      </div>
    </div>
  </div>
</template> 
<script>
import { Toast } from "vant";

import { getUserInfo, membersListByChain, getStoreList } from "@/chain/assets/api/common/common";

import {  channelList  } from "@/chain/assets/api/channelManagement/channelManagement"
import { itemsList } from "@/chain/assets/api/projectManagement/projectManagement"


import { businessList } from '@/chain/assets/api/store/store'

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
  components: {
    Toast
  },
  methods: {
    loginFn() {
      const that = this;
      this.warning = "";
      if (that.username == "") {
        // this.$Message.warning("请输入账号");
        this.warning = "请输入账号";
        return false;
      }
      if (that.password == "") {
        // this.$Message.warning("请输入密码");
        this.warning = "请输入密码";
        return false;
      }
      that.pitchOn = false;
      this.$axios
              .post("/post/login", {
                username: this.username,
                password: this.password,
                grant_type: "password",
                client_secret: "6Xgw2LYVPzIYNdIsHMOzotNGE9DXswCslsdObe2E",
                scope: "*",
                client_id: 5
              })
              .then(res => {
                if (res.data.status == 0) {
                  localStorage.setItem("getToken", res.data.data.token);

                  //设置用户缓存
                  getUserInfo().then(res2 =>{
                    if(res2.status == 0) {
                      this.$store.commit('SET_CURRENT_USER', res2.data)
                    }else{
                      this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                      });
                      this.$store.commit('SET_CURRENT_USER', {})
                    }
                  }).catch(error=>{
                    this.$message({
                      showClose: true,
                      message: error,
                      type: 'error',
                    });
                    this.$store.commit('SET_CURRENT_USER', {})
                  })

                  //员工列表&开发人员
                  membersListByChain({role_id:0}).then(res => {

                    if(res.status == 0){
                      this.$store.commit('SET_ROLELIST', res.data)
                      this.$store.commit('SET_EXPLOIT', res.data)
                    }else{
                      this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                      });
                      this.$store.commit('SET_ROLELIST', [])
                      this.$store.commit('SET_EXPLOIT', [])
                    }
                  }).catch(error=>{
                    this.$message({
                      showClose: true,
                      message: error,
                      type: 'error',
                    });
                    this.$store.commit('SET_ROLELIST', [])
                    this.$store.commit('SET_EXPLOIT', [])
                  })

                  channelList({status: -1}).then(res => {
                    if(res.status == 0){
                      let _tmp = res.data.list
                      for(let i=0; i<_tmp.length; i++){
                        _tmp[i].children = _tmp[i].items
                      }
                      this.$store.commit('SET_CHANNELLIST', _tmp)
                      this.$store.commit('SET_CHANNELLIST1', _tmp)
                    }else{
                      this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                      });
                      this.$store.commit('SET_CHANNELLIST', [])
                      this.$store.commit('SET_CHANNELLIST1', [])
                    }
                  }).catch(error=>{
                    this.$message({
                      showClose: true,
                      message: error,
                      type: 'error',
                    });
                    this.$store.commit('SET_CHANNELLIST', [])
                    this.$store.commit('SET_CHANNELLIST1', [])
                  })

                  //项目
                  itemsList({status: -1}).then(res => {
                    if(res.status == 0){
                      let _tmp = res.data.list
                      for(let i=0; i<_tmp.length; i++){
                        _tmp[i].children = _tmp[i].items
                      }
                      this.$store.commit('SET_PROJECTLIST', _tmp)
                      this.$store.commit('SET_PROJECTLIST1', _tmp)
                    }else{
                      this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                      });
                      this.$store.commit('SET_PROJECTLIST', [])
                      this.$store.commit('SET_PROJECTLIST1', [])
                    }
                  }).catch(error=>{
                    this.$message({
                      showClose: true,
                      message: error,
                      type: 'error',
                    });
                    this.$store.commit('SET_PROJECTLIST', [])
                    this.$store.commit('SET_PROJECTLIST1', [])
                  })


                  //供应商
                  businessList({ start: 1, perpage: 999, }).then(res => {
                    if(res.status == 0){
                      this.$store.commit('SET_BUSINESSLIST', res.data.filter(item => item.status.id == 1))
                    }else{
                      this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                      });
                      this.$store.commit('SET_BUSINESSLIST', [])
                    }
                  }).catch(error=>{
                    this.$message({
                      showClose: true,
                      message: error,
                      type: 'error',
                    });
                    this.$store.commit('SET_BUSINESSLIST', [])
                  })

                  //要货门店
                  getStoreList({ start: 1, perpage: 999, }).then(res => {
                    if(res.status == 0){
                      this.$store.commit('SET_SHOPLIST', res.data.storeDatas)
                    }else{
                      this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                      });
                      this.$store.commit('SET_SHOPLIST', [])
                    }
                  }).catch(error=>{
                    console.log("getEnterpriseStore no");
                    this.$store.commit('SET_SHOPLIST', [])
                  })

                  //判断当前登录的权限
                  this.$router.push({
                    path: "/StoreData"
                  });

                } else {
                  setTimeout(function() {
                    that.pitchOn = true;
                  }, 500);
                  that.warning = res.data.msg;
                }
              }).catch(err => {
        setTimeout(function() {
          that.pitchOn = true;
        }, 500);
      });

    }
  },

  // 创建前状态
  beforeCreate() {
    let getTokenLocal = localStorage.getItem("getToken");
    if (getTokenLocal != null) {
      this.$router.push({
        path: "/"
      });
    }
 
  },

  // 创建完毕状态
  created() {
    // let getTokenLocal = localStorage.getItem("getToken");
    // if(getTokenLocal != -1){
    // this.$postRequest("/post/logout").then(res => {});
    // this.$postRequest('/post/killout').then(res => {
    //   console.log(123);
    // })
    // localStorage.setItem("getToken",-1);
    // }
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {

  },

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
  display: flex;
  align-items: center;
  background: url("../assets/login/login_bg.png") no-repeat;
  .login_div {
    display: flex;
    position: absolute;
    right: 8%;
    .login_text {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      height: 379px;
      width: 360px;
      h3 {
        font-size: 28px;
        padding-top: 60px;
        padding-left: 30px;
        font-weight: normal;
      }
      h4 {
        font-size: 30px;
        padding-top: 26px;
        padding-left: 30px;
      }
      span {
        width: 100px;
        height: 1px;
        background: #fff;
        margin-left: 30px;
        margin-top: 70px;
        display: block;
      }
    }
    .login_import {
      background: #fff;
      width: 360px;
      height: 379px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        display: block;
        overflow: hidden;
        padding-top: 50px;
      }
      div {
        padding-top: 30px;
        b {
          margin-top: 30px;
          width: 300px;
          height: 40px;
          border-radius: 5px;
          border: solid 1px #e5e5e5;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #fff;
          i {
            overflow: hidden;
            padding-left: 20px;
            padding-right: 13px;
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
      em {
        font-size: 12px;
        color: red;
        width: 300px;
        height: 20px;
        font-style: normal;
        line-height: 20px;
        b {
          font-weight: normal;
        }
      }
      .btns {
        margin-top: 10px;
        width: 300px;
        height: 40px;
        background-color: #04776C;
        border-radius: 5px;
        border: 0;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
      }
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



    
