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
        <div class="login_box">
            <el-form ref="form" :model="form" :rules="rules" class="add-form" autocomplete="off">
              <input type="password" hidden  autocomplete="new-password" />
              <el-autocomplete class="wb100 lh40px mab10" v-model="form.usernameTow" placeholder="请输入账号" clearable @keyup.enter.native="loginFn()"
                :fetch-suggestions="querySearch" @select="handleSelect" @input="replaceStrUser">
                  <template slot-scope="{ item }" @click.stop>
                    <div class="login_pop">
                      <span>{{ item.username }}</span>
                      <i @click.stop="removeRestaurants(item.username)" class="el-icon-circle-close"></i>
                    </div>
                  </template>
              </el-autocomplete>
              <el-autocomplete class="wb100 lh40px mab10" v-model="form.passwordTow" placeholder="请输入密码" clearable @keyup.enter.native="loginFn()"
                :fetch-suggestions="querySearch" @select="handleSelect" @input="replaceStr">
                  <template slot-scope="{ item }" @click.stop>
                    <div class="login_pop">
                      <span>{{ item.username }}</span>
                      <i @click.stop="removeRestaurants(item.username)" class="el-icon-circle-close"></i>
                    </div>
                  </template>
              </el-autocomplete>
              <!-- <el-input show-password autocomplete="new-password" v-model.trim="form.password" placeholder="请输入密码" @keyup.enter.native="loginFn()" clearable rows="8" class="wb100 lh40px mab10"></el-input> -->
              <div class="login_assist">
                <el-checkbox v-model="remember" class="fc-gray2">记住密码</el-checkbox>
                <a @click="removeRestaurantsAll">清除所有账号信息</a>
              </div>
            </el-form>

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

import {getInfo} from "@/chain/assets/api/TeamManagement/index";

import { checkVersion } from "@/chain/assets/api/common/common";

import { Base64 } from 'js-base64';
export default {
  name: "Login",
  data() {
    return {
      warning: "",
      pitchOn: true,
      form:{
        username: "",
        password: "",
        passwordTow:"",
        usernameTow:""
      },
      remember:false,
      rules:{},
      restaurants: [],
    };
  },
  components: {
    Toast
  },
  methods: {
    removeRestaurantsAll(){
      this.$confirm('是否确认清除所有账号信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('CHAINUSERACCOUNT')
        this.restaurants = []
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration:1000,
          onClose:()=>{
            this.$router.go(0)
          }
        });
      }).catch(() => {
      });
    },
    replaceStrUser(val){
      this.$forceUpdate()
    },
    replaceStr(val){
      var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      if(reg.test(val)){
        let str1 = val.substring(0 , this.form.password.length)
        this.form.passwordTow = str1
      }
      else{
        if(val != undefined){
          // console.log("val--",val);
          this.form.passwordTow = val.replace(/\S/g, '●')
          // console.log("passwordTow--",this.form.passwordTow);
          if(val == ""){
            this.form.password = ""
            // console.log(this.form);
          }
          else{
            let str = val.substring(this.form.password.length , val.length)
            // console.log("str---",str);
            if(str == ""){
              this.form.password = this.form.password.substring( 0, this.form.password.length-1)
            }
            else{
              this.form.password += str
            }
          }
          // console.log("password--",this.form.password);
        }
      }
      this.$forceUpdate()

    },
    removeRestaurants(name){
      let _flag = false, listIndex ='';
      this.restaurants.map((item , index) => {
        if(item.username == name){
          _flag = true;
          listIndex = index;
        }
      })
      if(_flag){
        this.restaurants.splice(listIndex,1)
        let userAccount = JSON.stringify(this.unique(this.restaurants))
        localStorage.setItem("CHAINUSERACCOUNT", Base64.encode(userAccount))
      }
    },

    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },

     createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.username.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
  
    handleSelect(item) {
      this.form = item
      this.form.passwordTow = item.password.replace(/\S/g, '●')
      this.form.usernameTow = item.username
      this.remember = true
      
      // console.log(this.form.usernameTow)
    },
    loginFn() {
      const that = this;
      this.warning = "";
      if (that.form.usernameTow == "") {
        // this.$Message.warning("请输入账号");
        this.warning = "请输入账号";
        return false;
      }
      if (that.form.password == "") {
        // this.$Message.warning("请输入密码");
        this.warning = "请输入密码";
        return false;
      }
  
      that.pitchOn = false;
      this.$axios
              .post("/post/login", {
                username: this.form.usernameTow,
                password: this.form.password,
                grant_type: "password",
                client_secret: "6Xgw2LYVPzIYNdIsHMOzotNGE9DXswCslsdObe2E",
                scope: "*",
                client_id: 5
              })
              .then(res => {
                if (res.data.status == 0) {
                  localStorage.setItem("getToken", res.data.data.token);
                  if(this.remember){
                    this.form.username = this.form.usernameTow
                    let _arr = []
                    if(localStorage.getItem("CHAINUSERACCOUNT")){
                      _arr =  JSON.parse(Base64.decode(localStorage.getItem("CHAINUSERACCOUNT")))  
                    }
                    _arr.push(this.form)
                    this.restaurants = _arr
                    let userAccount = JSON.stringify(this.unique(_arr))
                    localStorage.setItem("CHAINUSERACCOUNT", Base64.encode(userAccount))
                  }
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
                  });


                  // 员工岗位别名
                  getInfo().then(res => {
                    if (res.status == 0) {
                      this.$store.commit('SET_ROLENAME', res.data);
                    }
                  }).catch(error=>{
                    this.$message({
                      showClose: true,
                      message: error,
                      type: 'error',
                    });
                  });

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

    },
    unique(arr){            
      var result = [];
      var obj = {};
      for(var i =0; i<arr.length; i++){
        if(!obj[arr[i].usernameTow]){
          result.push(arr[i]);
          obj[arr[i].usernameTow] = true;
        }
      }
      return result;
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
    if(localStorage.getItem("CHAINUSERACCOUNT")){
      // console.log(Base64.decode(localStorage.getItem("CHAINUSERACCOUNT")));
      this.restaurants = JSON.parse(Base64.decode(localStorage.getItem("CHAINUSERACCOUNT")))
      // console.log(this.restaurants)
    }


  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {

  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {
      checkVersion().then(res=>{

          if(res.status == 0){

              //获取本地版本号
              let versionCode = localStorage.getItem('versionCode')

              if(this.$base.isNull(versionCode)){
                  //没有版本号
                  localStorage.setItem('versionCode', res.data.versionCode)
              }else{
                  //有版本号

                  if( Number.parseInt(versionCode) < Number.parseInt(res.data.versionCode)){
                      //删除所有缓存，提示退出登录
                      localStorage.clear()
                      window.location.reload()
                  }

              }
          }

      })
  },

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
      .login_box {
        padding-top: 30px;
        width: 300px;
        .login_assist{
          display: flex;
          align-items: center;
          .el-checkbox{
            flex: 1;
          }
          a{
            color: #04776C;
            cursor: pointer;
          }
        }
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

<style>
.login_pop{
  display: flex;
  align-items: center;
}
.login_pop span{
  flex: 1;
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap; 
}
.login_pop i{
  color: #999;
}
</style>
   


    
