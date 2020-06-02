<template>
  <div>
    <!-- 登录  -->
    <div class="w30px h30px fl pal5 par5 border-right" @click="isShowUserInfo = true">
      <template v-if="user.nickname">
        <img :src="user.avatar ? user.avatar : defavatar2" class="w30px h30px radius10" />
      </template>
      <template v-else>
        <img :src="defavatar" class="w30px h30px" />
      </template>
    </div>
    <!-- 个人详情 -->
    <div class="dialog-transparency" v-show="isShowUserInfo" @click="isShowUserInfo = false"></div>
    <div
      class="w240px h160px bg-white absolute radius1"
      style="top:48px; left: 0; z-index: 99999"
      v-show="isShowUserInfo"
    >
      <div class="pa10">
        <template v-if="user.nickname">
          <img :src="user.avatar ? user.avatar : defavatar2" class="w30px h30px radius10 fl" />
          <span class="fl mal10 h30px lh30px">{{user.nickname}}</span>
        </template>
        <template v-else>
          <img :src="defavatar" class="w30px h30px radius10 fl" @click="showLogin" />
          <span class="fl mal10 h30px lh30px fc-blue" @click="showLogin">登录/注册</span>
        </template>
      </div>
      <div class="clear1 bd-gray bd-b1"></div>
      <div class="pa10 lh30px">
        <p>
          <span class="fl w85px">微信公众号：</span>
          <span class="fl">新知地图</span>
        </p>
        <div class="clear0"></div>
        <p>
          <span class="fl w85px">官方QQ群：</span>
          <a target="_blank" @click="joinQQ">
            <img
              border="0"
              src="https://pub.idqqimg.com/wpa/images/group.png"
              class="fl mat4"
              alt="新知地图"
              title="新知地图"
            />
          </a>
        </p>
        <div class="clear0"></div>
        <p>
<!--          <span class="fl w70px fc-blue" @click="clearStore">清空缓存</span>-->
          <span class="fl w70px fc-blue" @click="openDrawList">测绘数据</span>
          <span class="fl w70px fc-blue text-center" @click="showPrivacyPolicy = true">隐私政策</span>
          <span class="fl w70px fc-blue text-right" @click="showServiceAgreement = true">服务协议</span>
        </p>
        <div class="clear0"></div>
      </div>
      <template v-if="user.nickname">
        <div class="clear0 bd-gray bd-b1"></div>
        <p class="text-center h40px lh40px fc-gray2 pointer" @click="logout">退出登录</p>
      </template>
    </div>
    <!--   版权申明   -->
    <div
      class="container fixed bg-white"
      style="top:0; left: 0; z-index: 99999999"
      v-show="showCopyRight"
    >
      <div class="h30px lh30px mat30 mal10 fc-blue" @click="showCopyRight = false">
        <i class="el-icon-arrow-left f30px fc-blue fl"></i>
        <span class="fl f18px">返回首页</span>
      </div>
      <copy-right></copy-right>
    </div>
    <!--   隐私政策   -->
    <div
      class="container fixed bg-white"
      style="top:0; left: 0; z-index: 99999999"
      v-show="showPrivacyPolicy"
    >
      <div class="h30px lh30px mat30 mal10 fc-blue" @click="showPrivacyPolicy = false">
        <i class="el-icon-arrow-left f30px fc-blue fl"></i>
        <span class="fl f18px">返回首页</span>
      </div>
      <privacy-policy></privacy-policy>
    </div>
    <!--   服务协议   -->
    <div
      class="container fixed bg-white"
      style="top:0; left: 0; z-index: 99999999"
      v-show="showServiceAgreement"
    >
      <div class="h30px lh30px mat30 mal10 fc-blue" @click="showServiceAgreement = false">
        <i class="el-icon-arrow-left f30px fc-blue fl"></i>
        <span class="fl f18px">返回首页</span>
      </div>
      <service-agreement></service-agreement>
    </div>
    <!-- 登录窗口 -->
    <div class="dialog-black" v-show="showLoginDialog" @click="showLoginDialog = false"></div>
    <div
      class="wb80 center fixed bg-white radius1"
      style="height: 370px; top:0; left: 0; right: 0; bottom: 0; margin: auto; z-index: 999999;"
      v-show="showLoginDialog"
    >
      <template v-if="!showQRCode">
        <p class="h50px lh50px pal20 par20 bd-gray bd-b1">
          <span class="fl f16px fc-blue">用户登录/注册</span>
          <i class="el-icon-close fr fc-gray3 f20px mat15" @click="showLoginDialog = false"></i>
        </p>
        <div class="clear2"></div>
        <div class="pa15">
          <div class="wb100 h45px bd-gray1 bd-a1 radius1">
            <div class="fl mar10 w50px text-center h25px lh25px mat10 bd-gray1 bd-r1 fc-gray3">+86</div>
            <div class="fl my-search" style="width: calc(100% - 70px);">
              <el-input
                v-model="loginForm.mobile"
                placeholder="请输入手机号"
                class="h45px lh45px fc-gray3"
              ></el-input>
            </div>
          </div>
          <div class="clear4"></div>
          <div class="wb100 h45px bd-gray1 bd-a1 radius1">
            <div class="fl mal8 my-search bd-gray1 bd-r1" style="width: calc(100% - 130px);">
              <el-input
                v-model="loginForm.code"
                placeholder="请输入短信验证码"
                class="h45px lh45px fc-gray3"
              ></el-input>
            </div>
            <div
              class="fl w120px text-center h45px lh45px fc-gray3 bg-white1"
              @click="sendCode"
            >{{timer == 0 ? '发送验证码' : timer + '秒重新发送' }}</div>
          </div>
          <div class="clear4"></div>
          <div
            class="wb100 h40px lh40px text-center fc-white center bg-blue radius1"
            @click="loginByMobile"
          >立即登录</div>
        </div>
        <div class="clear2"></div>
        <div
          class="w100px h30px lh30px center bg-white relative text-center fc-gray2 f12px"
          style="z-index: 9;"
        >第三方登录</div>
        <div class="clear2 bd-gray bd-b1" style="margin-top: -25px;"></div>
        <div class="clear4"></div>
        <div
          class="w100px h40px lh40px text-center fc-gray3 center bg-white radius1"
          @click="wxLogin"
        >
          <i class="iconfont iconweixin fc-green7 f30px fl"></i>
          <span class="fr">微信登录</span>
        </div>
      </template>
      <template v-else>
        <p class="h50px lh50px pal20 par20 bd-gray bd-b1">
          <span class="fl f16px fc-green">微信扫码登录</span>
          <i
            class="el-icon-close fr fc-gray3 f20px mat15"
            @click="loginCancel(); showLoginDialog = false;"
          ></i>
        </p>
        <div class="clear4"></div>
        <div class="text-center">
          <img :src="'http://'+qrcodeUrl" class="w120px h120px" />
        </div>
        <p class="h50px lh50px text-center">扫描二维码并关注公众号，即可开启扫码登录功能</p>
        <div class="clear2"></div>
        <div
          class="wb80 h40px lh40px text-center fc-white center bg-blue radius1"
          @click="loginCancel"
        >使用手机号登录</div>
      </template>
    </div>

    <!--  显示保存测绘的页面  -->
    <!--  2020年6月1日10:33:50  -->
    <!--  暂时放这里，以后统一优化  -->
    <div class="fixed container bg-white" style="z-index: 999999; top:0; left: 0;" v-show="showSaveListPage">
      <div class="clear4"></div>
      <div class="h40px lh40px text-center bd-gray fc-gray3 Fb F16px bd-b1 relative" @click="showSaveListPage = false">
        <div class="w40px h40px absolute" style="top:0; left: 0;">
          <i class="el-icon-arrow-left f24px fl ma8"></i>
        </div>
        测绘列表
      </div>

      <div class="clear0"></div>

      <div class="wb100">
        <template v-for="item in saveList">
          <div class="pal20 par10 h40px lh40px bd-gray bd-b1" @click="viewItem(item)">
            <span class="fl">{{item.name}} - {{item.desc}}</span>
            <i class="el-icon-circle-close fc-red f24px fr ma8" @click="delItem(item)"></i>
          </div>
        </template>
      </div>

    </div>

  </div>
</template>

<script>
import { search_abroad } from "@/assets/api/search/search";

import { delTag, listAllTags } from "@/assets/api/tag/tag";

import {
  getValidCode,
  regOrLoginByPhone,
  getwxloginqr,
  oweixin,
  getuserbylstoken
} from "@/assets/api/login/login";

import CopyRight from "@/components/webapp/CopyRight.vue";
import PrivacyPolicy from "@/components/webapp/PrivacyPolicy.vue";
import ServiceAgreement from "@/components/webapp/ServiceAgreement.vue";


export default {
  name: "Search",
  props: {},
  computed: {},
  components: {
    CopyRight,
    PrivacyPolicy,
    ServiceAgreement
  },
  data() {
    return {
      showCopyRight: false, // 版权声明
      showPrivacyPolicy: false, // 隐私政策
      showServiceAgreement: false, // 服务协议
      user: {}, // 用户相关信息
      showLoginDialog: false, // 登录弹窗
      lstoken: "",
      qrcodeUrl: "",
      loginTimer: 0,
      timer: 0,
      codeTimer: 0,
      defavatar: require("@/assets/img/defavatar.png"),// 手机登录显示的头像
      defavatar2: require("@/assets/img/logo.png"), // 未登录显示的头像
      isShowUserInfo: false, // 显示用户信息
      isSend: false,
      isWatchIng: false,
      loginForm: {
        // 手机登录相关参数
        mobile: "",
        code: ""
      },
      showQRCode: false, // 微信和手机登录方式的切换
      showSaveListPage: false,
      saveList: [],
    };
  },
  mounted() {
    let user = this.$store.getters.currentUser;
    if (!this.$base.isNull(user)) {
      if (user.nickname) {
        this.user = user;
      }
    }
  },
  methods: {
    // 加入QQ群逻辑
    joinQQ() {
      if (window.plus) {
        let key = "YMf8le6Nhw-TWroy2nZO5tnuHYt__hQr";
        plus.runtime.openURL(
          "mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D" +
            key
        );
      } else {
        window.open(
          "https://shang.qq.com/wpa/qunwpa?idkey=d3a9c5bde03ca22bc1f72af7af37eba484987b65c296f6ec8b0993fb19a9ee30",
          "_blank"
        );
      }
    },
    //清空缓存
    clearStore() {
      //-2020年5月13日09:54:24
      //- 清除浏览器缓存
      if (window.plus) {
        plus.nativeUI.toast("已清除缓存", { duration: "long" });
      } else {
        this.$message({
          message: "已清除缓存",
          type: "success"
        });
      }
    },
    // 发送验证码
    sendCode() {
      if (this.$base.isNull(this.loginForm.mobile)) {
        if (window.plus) {
          plus.nativeUI.toast("请输入手机号", { duration: "long" });
        } else {
          this.$message({
            message: "请输入手机号",
            type: "success"
          });
        }
        return;
      }
      if (this.loginForm.mobile.length != 11) {
        if (window.plus) {
          plus.nativeUI.toast("请输入11位手机号", { duration: "long" });
        } else {
          this.$message({
            message: "请输入11位手机号",
            type: "success"
          });
        }
        return;
      }
      if (this.isSend) return;
      this.isSend = true;
      getValidCode({
        phone: this.loginForm.mobile
      }).then(res => {
        if (res.status == "ok") {
          if (window.plus) {
            plus.nativeUI.toast("发送成功", { duration: "long" });
          } else {
            this.$message({
              message: "发送成功",
              type: "success"
            });
          }
          this.openTimer();
        } else {
          if (window.plus) {
            plus.nativeUI.toast("发送失败，请稍后重试", { duration: "long" });
          } else {
            this.$message({
              message: "发送失败，请稍后重试",
              type: "error"
            });
          }
          this.isSend = false;
        }
      });
    },
    // 验证码定时器
    openTimer() {
      this.timer = 120;
      this.codeTimer = window.setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.timer = 0;
          this.isSend = false;
          window.clearInterval(this.codeTimer);
        }
      }, 1000);
    },
    // 手机登录
    loginByMobile() {
      if (this.$base.isNull(this.loginForm.code)) {
        if (window.plus) {
          plus.nativeUI.toast("请输入验证码", { duration: "long" });
        } else {
          this.$message({
            message: "请输入验证码",
            type: "error"
          });
        }
        return;
      }
      if (this.loginForm.code.length != 4) {
        if (window.plus) {
          plus.nativeUI.toast("请输入4位验证码", { duration: "long" });
        } else {
          this.$message({
            message: "请输入4位验证码",
            type: "error"
          });
        }
        return;
      }
      regOrLoginByPhone({
        phone: this.loginForm.mobile,
        code: this.loginForm.code
      }).then(res => {
        if (!this.$base.isNull(res.user)) {
          this.showLoginDialog = false;
          this.$store.commit("SET_CURRENT_USER", res.user);
          this.user = res.user;
          if (window.plus) {
            plus.nativeUI.toast("登录成功", { duration: "long" });
          } else {
            this.$message({
              message: "登录成功",
              type: "success"
            });
          }
        } else {
          if (window.plus) {
            plus.nativeUI.toast("登录失败，请检查验证码", { duration: "long" });
          } else {
            this.$message({
              message: "登录失败，请检查验证码",
              type: "success"
            });
          }
        }
      });
    },
    // 微信登录第1步
    wxLogin() {
      if (window.plus) {
        window.login(user => {
          oweixin({
            openid: user.openid,
            nickname: user.nickname,
            sex: user.sex,
            avatar: user.headimgurl,
            unionid: user.unionid
          }).then(res => {
            if (res.status == "ok") {
              this.showQRCode = false;
              this.showLoginDialog = false;
              this.$store.commit("SET_CURRENT_USER", res.user);
              this.user = res.user;
              if (window.plus) {
                plus.nativeUI.toast("登录成功", { duration: "long" });
              } else {
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
              }
            } else {
              //登录失败
              if (window.plus) {
                plus.nativeUI.toast("登录失败", { duration: "long" });
              } else {
                this.$message({
                  message: "登录失败",
                  type: "error"
                });
              }
            }
          });
        });
      } else {
        //弹出微信二维码
        getwxloginqr({}).then(res => {
          if (res.lstoken) {
            this.lstoken = res.lstoken;
            this.qrcodeUrl = res.qrcode;
            this.showQRCode = true;
            this.watchLogin();
            this.isLoginIng = true;
          }
        });
      }
    },
    // 显示登录窗口
    showLogin() {
      this.isShowUserInfo = false;
      this.showLoginDialog = true;
      this.loginForm.mobile = "";
      this.loginForm.code = "";
      this.timer = 0;
      this.isSend = false;
      window.clearInterval(this.codeTimer);
    },
    // 退出登录
    logout() {
      //- 2020年5月14日16:03:46
      //确认框
      if (window.plus) {
        plus.nativeUI.confirm(
          "确定退出登录吗?",
          e => {
            var i = e.index;
            if (i == 0) {
              this.user = {};
              this.$store.commit("SET_CURRENT_USER", {});
              this.isShowUserInfo = false;
              window.logout(() => {});
            } else {
            }
          },
          "提示",
          ["确定", "取消"]
        );
      } else {
        //提示是否保存
        this.$confirm("关闭将清除所有测量数据, 确认继续吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.user = {};
            this.$store.commit("SET_CURRENT_USER", {});
            this.isShowUserInfo = false;
          })
          .catch(() => {});
      }
    },
    // 微信扫码登录第4步
    loginCancel() {
      this.showQRCode = false;
      window.clearInterval(this.loginTimer);
      this.isWatchIng = false;
      this.isLoginIng = false;
    },
    // 微信登录第3步
    loginSuccess(user) {
      this.showQRCode = false;
      this.showLoginDialog = false;
      window.clearInterval(this.loginTimer);
      this.$store.commit("SET_CURRENT_USER", user);
      this.user = user;

      if (window.plus) {
        plus.nativeUI.toast("登录成功", { duration: "long" });
      } else {
        this.$message({
          message: "登录成功",
          type: "success"
        });
      }
      this.isWatchIng = false;
      this.isLoginIng = false;
    },
    // 微信登录第2步
    watchLogin() {
      if (this.isWatchIng) return;
      this.loginTimer = window.setInterval(() => {
        getuserbylstoken({
          lstoken: this.lstoken
        }).then(res => {
          if (!this.$base.isNull(res.user)) {
            this.loginSuccess(res.user);
          }
        });
        this.isWatchIng = true;
      }, 1000);
    },

    viewItem(item){
      //查看保存的几何图形

      console.log('查看')

    },

    delItem(item){

      console.log('删除')

      let _this = this

      function del(){
        delTag({
          token: _this.$store.getters.currentUser.token,
          id: item.Id
        }).then(res=>{
          if(res.status == 'ok'){
            //保存成功
            if(window.plus){
              plus.nativeUI.toast("删除成功",{duration:"long"});
            }else{
              this.$message({
                message: '删除成功',
                type: 'success',
              })
            }
          }else{
            //保存成功
            if(window.plus){
              plus.nativeUI.toast("删除失败",{duration:"long"});
            }else{
              this.$message({
                message: '删除失败',
                type: 'error',
              })
            }
          }
        })
      }

      //提示
      if (window.plus) {
        plus.nativeUI.confirm("确定删除该条测绘数据吗?", (e) => {
          var i = e.index;
          if (i == 0) {
            del()
          } else {

          }
        }, "提示", ["确定", "取消"]);
      } else {
        //提示是否保存
        this.$confirm('确定删除该条测绘数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del()
        }).catch(() => {

        });
      }





    },

    openDrawList(){

      //
      this.showSaveListPage = true

      listAllTags({
        token: this.$store.getters.currentUser.token,
      }).then(res=>{
        console.log(res)
        if(res.status == 'ok'){
          for(let i=0; i<res.tags.length; i++){
            res.tags[i].content = JSON.parse(res.tags[i].content)
          }

          this.saveList = res.tags
        }
      })

    },
  }
};
</script>