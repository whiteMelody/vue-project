<template>
  <div class="Login">
    <div class="login_div">
      <div class="login_text">
        <h3>依美云运管系统</h3>
        <!-- <h4>连锁端</h4> -->
        <span></span>
      </div>
      <div class="login_import">
        <span class="logo_span">
          <img src="@/shop/assets/img/logo.png" alt>
        </span>

<!--            <div class="w300px center">-->
<!--                <el-input v-model="username" placeholder="请输入账号" @keyup.enter="loginFn()"></el-input>-->
<!--                <el-input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="loginFn()"></el-input>-->
<!--            </div>-->

          <!-- <div class="login_box">
              <b>
                <i class="iconfont iconyonghu"></i>
                <input type="text" id="a" name="a" placeholder="请输入账号" v-model="username" autocomplete="off" @keyup.enter="loginFn()">
                <input type="text" placeholder="请输入账号" v-model="username" autocomplete="off" @keyup.enter="loginFn()">
              </b>
              <b>
                <i class="iconfont iconmima"></i>
                <input type="password" placeholder="请输入密码" v-model="password" autocomplete="off" @keyup.enter="loginFn()">
              </b>
          </div> -->
          <div class="login_box">
            <el-form ref="form" :model="form" :rules="rules" class="add-form" autocomplete="off">
              <input type="password" hidden  autocomplete="new-password" />
              <el-autocomplete class="wb100 lh40px mab10" v-model="form.usernameTow" placeholder="请输入账号" clearable @keyup.enter.native="loginFn()"
                :fetch-suggestions="querySearch" @select="handleSelect" >
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
        <a v-else class="btns bg-gray3">登录中，请稍后</a>
      </div>
    </div>
  </div>
</template> 
<script>

  import {login} from  "@/shop/assets/api/login/login"
  import {getUserInfo, checkVersion} from  "@/shop/assets/api/common/common"

  import { getStoreMembers, getTreatmentRoomList, getStoreChannel, getProject , membersList, getEnterpriseStore ,  getAliasInfo} from "@/shop/assets/api/common/common"

  import { businessList } from '@/shop/assets/api/store/store'

  import { Base64 } from 'js-base64';
export default {
  name: "Login",
  data() {
    return {
      warning: "",
      form:{
        username: "",
        usernameTow: "",
        password: "",
        passwordTow:""
      },
      remember:false,
      rules:{},
      pitchOn: true,
      restaurants: [],
      
    };
  },
  components: {
    
  },
  methods: {
    removeRestaurantsAll(){
      this.$confirm('是否确认清除所有账号信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('SHOPUSERACCOUNT')
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
        localStorage.setItem("SHOPUSERACCOUNT", Base64.encode(userAccount))
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
    },

    loginFn() {
      const that = this;
      this.warning = "";
      if (that.form.usernameTow == "") {
        this.warning = "请输入账号";
        return false;
      }
      if (that.form.password == "") {
        this.warning = "请输入密码";
        return false;
      }

      this.pitchOn = false

      login({
          username: this.form.usernameTow,
          password: this.form.password,
          grant_type: "password",
          client_secret: "6Xgw2LYVPzIYNdIsHMOzotNGE9DXswCslsdObe2E",
          scope: "*",
          client_id: 5
        }).then(res => {
          if (res.status == 0) {
            localStorage.setItem("webToken", res.data.token)
            if(this.remember){
              this.form.username = this.form.usernameTow
              let _arr = []
              if(localStorage.getItem("SHOPUSERACCOUNT")){
                _arr =  JSON.parse(Base64.decode(localStorage.getItem("SHOPUSERACCOUNT")))  
              }
              _arr.push(this.form)
              this.restaurants = _arr
              let userAccount = JSON.stringify(this.unique(_arr))
              localStorage.setItem("SHOPUSERACCOUNT", Base64.encode(userAccount))
            }
            getUserInfo().then(res2 =>{
              if(res.status == 0) {
                this.$store.commit('SET_CURRENT_USER', res2.data)

                if(res2.data.role_id == 5 || res2.data.role_id == 6){
                  this.$router.push({
                    path: "/BookingSchedule"
                  });
                }else{
                  this.$router.push({
                    path: "/Home"
                  });
                }

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

            getStoreMembers({role_id:0}).then(res => {
              if(res.status == 0){
                this.$store.commit('SET_ROLELIST', res.data)
              }else{
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
                });
                this.$store.commit('SET_ROLELIST', [])
              }
            }).catch(error=>{
              this.$message({
                showClose: true,
                message: error,
                type: 'error',
              });
              this.$store.commit('SET_ROLELIST', [])
            });

            // 员工别名
            getAliasInfo().then(res => {
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

            //开发人员
            membersList().then(res => {
              if(res.status == 0){
                this.$store.commit('SET_EXPLOIT', res.data.list)
              }else{
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
                });
                this.$store.commit('SET_EXPLOIT', [])
              }
            }).catch(error=>{
              this.$message({
                showClose: true,
                message: error,
                type: 'error',
              });
              this.$store.commit('SET_EXPLOIT', [])
            })

            //治疗间
            getTreatmentRoomList().then(res => {
              if(res.status == 0){
                this.$store.commit('SET_TREATMENTROOMLIST', res.data)
              }else{
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
                });
                this.$store.commit('SET_TREATMENTROOMLIST', [])
              }
            }).catch(error=>{
              this.$message({
                showClose: true,
                message: error,
                type: 'error',
              });
              this.$store.commit('SET_TREATMENTROOMLIST', [])
            })

            //渠道
            getStoreChannel({channelParentId: 0}).then(res => {
              if(res.status == 0){
                let _tmp = res.data.list
                this.$store.commit('SET_CHANNELLIST1', res.data.list)
                for(let i=0; i<_tmp.length; i++){
                  _tmp[i].children = []
                }
                getStoreChannel({channelParentId: -1}).then(res2 => {
                  if(res2.status == 0){
                    let __tmp = res2.data.list
                    for(let i=0; i<__tmp.length; i++){
                      for(let j=0; j<_tmp.length; j++){
                        if(__tmp[i].p_id == _tmp[j].id){
                          _tmp[j].children.push(__tmp[i])
                        }
                      }
                    }
                    this.$store.commit('SET_CHANNELLIST', _tmp)
                  }
                })
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

            // 项目
            getProject({ start: 1, perpage: 999, itemsParmentId: 0 }).then(res => {
              if(res.status == 0){
                let _tmp = res.data.list
                let _tmp2 = JSON.parse(JSON.stringify(res.data.list))
                this.$store.commit('SET_PROJECTLIST1', res.data.list)

                for(let i=0; i<_tmp.length; i++){
                  _tmp[i].children = []
                  _tmp2[i].children = []
                }

                getProject({ start: 1, perpage: 9999,status:-1}).then(res2 => {
                  if(res2.status == 0){
                    let __tmp = res2.data.list
                    for(let i=0; i<__tmp.length; i++){
                      for(let j=0; j<_tmp.length; j++){
                        if(__tmp[i].p_id == _tmp[j].id){
                          _tmp[j].children.push(__tmp[i])
                          if(__tmp[i].status.value == 1){
                            _tmp2[j].children.push(__tmp[i])
                          }
                        }
                      }
                    }
                    // 2019-11-15 15点15分 陈军修改
                    this.$store.commit('SET_PROJECTALLLIST', _tmp)
                    this.$store.commit('SET_PROJECTLIST', _tmp2)
                  }
                })

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
            });

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
            getEnterpriseStore({ start: 1, perpage: 999, }).then(res => {
              if(res.status == 0){
                this.$store.commit('SET_SHOPLIST', res.data.list)
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

            // this.$router.push({
            //   path: "/Home"
            // });

          } else {
            this.pitchOn = true
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error',
            });
          }
        }).catch(error=>{
        this.$message({
          showClose: true,
          message: error,
          type: 'error',
        });
      })
    },
    unique(arr){            
      var result = [];
      var obj = {};
      for(var i =0; i<arr.length; i++){
        if(!obj[arr[i].username]){
          result.push(arr[i]);
          obj[arr[i].username] = true;
        }
      }
      return result;
    }
  },

  // 创建前状态
  beforeCreate() {

  },

  // 创建完毕状态
  created() {
    if(localStorage.getItem("SHOPUSERACCOUNT")){
      // console.log(Base64.decode(localStorage.getItem("SHOPUSERACCOUNT")));
      this.restaurants = JSON.parse(Base64.decode(localStorage.getItem("SHOPUSERACCOUNT")))
      // console.log(this.restaurants)
    }
    // console.log(this.restaurants);




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
  background: url("../../assets/img/login_bg.png") no-repeat;
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
      .logo_span {
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
            color: #5CCDDE;
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
        background-color: #5CCDDE;
        border-radius: 5px;
        border: 0;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        cursor:pointer;
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
    
