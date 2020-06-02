<template>
  <div class="Index">
    <!-- 侧边栏 -->
    <div class="sidebar" v-if="sidebarIsShow" @mouseenter="MoveIn()">
      <div class="sidebarLogo">
        <img src="@/chain/assets/sidebar/logo.png" alt>
      </div>
      <div class="quanxian" v-if="quanxianIsShow">
        暂
        <br>无
        <br>权
        <br>限
      </div>
      <ul v-else>
        <li
          v-for="(item, index) in sidebarList"
          :key="index"
          :class="{liActive: index == liLIstIndex}"
          @click="sidebarListClick(index)"
        >
          <i class="iconfont" :class="item"></i>
        </li>
      </ul>
    </div>

    <!-- 展开侧边栏 -->
    <div class="expandTheSidebar" v-else>
      <div class="yiyun_Logo">
        <img src="@/chain/assets/sidebar/yiyun_logo.png" alt>
      </div>
      <div class="quanxian" v-if="quanxianIsShow">暂无权限</div>
      <div class="drop_down" v-else>
        <ul>
          <li v-for="(item, index) in sidebarResultList" :key="index">


            <div class="dataManagement" v-if="item.name == '首页'" @click="navListIndexFn(index)">
              <i class="iconfont" :class="item.iconfont"></i>
              <span @click="$router.push('Home')">{{item.name}}</span>
            </div>
            <div class="dataManagement" @click="navListIndexFn(index)" v-else>
              <i class="iconfont" :class="item.iconfont"></i>
              <span>{{item.name}}</span>
              <i class="iconfont iconshouqi" v-show="navListIndex == index"></i>
              <i class="iconfont iconxiala" v-show="navListIndex != index"></i>
            </div>

            <ul v-show="navListIndex == index">
              <li
                v-for="(i, index) in item.child"
                :key="index"
                @click="orangeClick(index)"
                :class="{LiStyleActive:index == orangrNum}"
              >
                  <div class="Liorange" :class="{orangeActive:orangrNum == index}"></div>
                  <span @click="$router.push(i.frontcode)">{{i.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 顶部 -->
    <header>
      <div class="leftWidht" :class="sidebarIsShow ? 'marginLeft60' : 'marginLeft160'"></div>
      <!-- 左边 -->
      <ul class="ulLeftList">
        <li
          class="iconfont iconzhankai"
          title="展开侧边栏"
          v-if="sidebarIsShow"
          @click="sidebarIsShowFn"
        ></li>
        <li class="iconfont iconguanbi" title="收起侧边栏" v-else @click="sidebarIsShowFn"></li>
        <li class="iconfont iconhoutui" title="后退" @click="Backoff()"></li>
        <li class="iconfont iconqianjin" title="前进" @click="Forward()"></li>
        <li class="iconfont iconshuaxin" title="刷新" @click="reloadHerf()"></li>
      </ul>
      <ul class="ulRightList">
        <li class="">
          <el-dropdown trigger="click" @command="pageUrl" @visible-change="messageShowFn">
            <span class="el-dropdown-link">
              <i class="iconfont iconrenwu f20px"></i>
              <i class="iconfont iconshouqi f16px" v-if="messageShow"></i>
              <i class="iconfont iconxiala f16px" v-else></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix" command="todayTaskList">
                今日任务
                <el-badge class="mark" :value="0"/>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="message_icon">
          <i class="iconfont iconxiaoxi f20px" @click="$router.push({name:'MessageList'})">
            <el-badge :value="0" class="item" :max="99"></el-badge>
          </i>
        </li>
        <li class="iconfont iconshezhi" @click="passwordIsShow = !passwordIsShow">
          <i class="iconfont iconxiala" v-show="!passwordIsShow"></i>
          <i class="iconfont iconshouqi" v-show="passwordIsShow"></i>
        </li>
        <span
          class="PassWord"
          v-show="passwordIsShow"
          @click="ChangePassword(adminList.users_id)"
        >修改密码</span>
        <li class="iconfont iconqiehuanzuhu" title="退出" @click="SignOut()"></li>
        <li class="iconfont iconguanliyuan"></li>
        <span>{{adminList.name}}</span>
      </ul>
    </header>

    <div class="box">
      <!-- 嵌套路由出口 -->
      <router-view refs="mychild"></router-view>
    </div>
    <MessagePop ref="message" :popData="popData" @message="passwordSignOut"></MessagePop>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  name: "Index",
  data() {
    return {
      // 侧边栏状态
      sidebarIsShow: true,
      // 修改密码下拉收起图标状态
      passwordIsShow: false,
      // 侧边栏图标数组
      sidebarList: [
        "iconshujuguanli",
        "iconrenshiguanli",
        "iconxiaoxiguanli",
        "iconxitongguanli",
      ],
      liLIstIndex: 0,
      navListIndex: -1,
      orangrNum: -1,
      sidebarResultList: [],
      quanxianIsShow: false,
      adminList: [],
      popData: "",
      messageShow:false,

    };
  },
  components: {
    Dialog
  },

  methods: {
    //任务选择
    pageUrl(command) {
      switch (command) {
        case 'todayTaskList':
          this.$router.push({  
              path: 'TaskList',   
              query: {  
                type:1
              }
          })
          break;
        case 'historyTaskList':
          this.$router.push({  
              path: 'TaskList',   
              query: {  
                type:2
              }
          })
          break;
        case 'payAReturnVisit':
          this.$router.push({  
              path: 'ReturnVisitList',   
              query: {  
                type:1
              }
          })
          break;
        default:
          break;
      }
    },
    //任务
    messageShowFn(v){
      this.messageShow = v
    },
    // 鼠标移入展开侧边栏
    MoveIn() {
      this.sidebarIsShow = !this.sidebarIsShow;
      window.localStorage.setItem("sidebarIs",this.sidebarIsShow);
    },
    // 侧边收缩
    sidebarIsShowFn() {
      this.sidebarIsShow = !this.sidebarIsShow;
      setTimeout(() => {
        this.$common.echartResize();
      }, 10);
      window.localStorage.setItem("sidebarIs",this.sidebarIsShow);
    },
    // 图标的侧边栏样式效果
    sidebarListClick(index) {
      this.liLIstIndex = index;
      this.sidebarIsShow = false;
      this.navListIndex = index;
    },
    orangeClick(index) {
      this.orangrNum = index;
    },
    navListIndexFn(num) {
      const that = this;
      if (that.navListIndex == num) {
        that.navListIndex = -1;
        that.orangrNum = num;
      } else {
        that.navListIndex = num;
        that.orangrNum = -1;
      }
    },
    // 刷新当前页
    reloadHerf() {
      this.$router.go(0);
    },

    // 后退
    Backoff() {
      window.history.back();
    },

    // 前进
    Forward() {
      window.history.forward();
    },

    // 修改密码之后
    passwordSignOut() {
      const that = this;
      this.$axios.post("/post/logout").then(res => {
        if (res.status == 200) {
          localStorage.removeItem("getToken");
          const msg = this.$Message.loading({
            content: "修改成功，正在跳转中...",
            duration: 100
          });
          setTimeout(msg, 1000);
          setTimeout(function() {
            that.$router.push({
              name: "Login"
            });
          }, 1200);
        } else {
          Dialog.confirm({
            title: "退出失败"
          }).then(() => {});
        }
      });
    },

    // 登出
    SignOut() {
      Dialog.confirm({
        title: "退出",
        message: "确定退出登录吗?"
      })
        .then(() => {
          this.$axios.post("/post/logout").then(res => {
            if (res.status == 200) {
              localStorage.removeItem("getToken");
              this.$router.push({
                name: "Login"
              });
            } else {
              Dialog.confirm({
                title: "退出失败"
              }).then(() => {});
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    // 修改密码
    ChangePassword(id) {
      const that = this;
      that.popData = {
        id: id,
        editPasswordUrl: "/post/api/account/editPassword",
        popBgText: "changePassword",
        types: "index"
      };
      that.$refs.message.popBgStateShowFn(this.popData);
    },

  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    let reslut = this.$postRequest("/post/api/getIndexBar");
    // console.log(reslut);
    const that = this;
    reslut.then(res => {
      if (res.status == 1001) {
        that.quanxianIsShow = true;
        that.$router.push({
          path: "/Index"
        });
      } else if (res.status == 0) {
        that.sidebarResultList = res.data;
      }
    });

    this.$postRequest("/post/api/getUserInfo").then(res => {
      this.adminList = res.data;
      if(res.data.firstlogin == 1){
        this.ChangePassword(res.data.users_id)
        this.$postRequest("/post/api/members/memberFirstLogin").then(res => {
        })
      }
    });


  },

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
.Index {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f2f2f2;
  position: absolute;
  li {
    cursor: pointer;
  }
  // 侧边栏
  .sidebar {
    width: 0.6rem;
    height: 100%;
    background-color: #20222a;
    text-align: center;
    padding-top: 0.6rem;
    .sidebarLogo {
      width: 100%;
      height: 0.27rem;
      display: flex;
      justify-content: center;
      img {
        display: block;
        width: 0.3rem;
        height: 100%;
      }
    }
    .quanxian {
      color: #ffffff;
      width: 100%;
      margin-top: 0.78rem;
      text-align: center;
      font-size: 0.16rem;
    }
    ul {
      margin-top: 0.78rem;
      li {
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        i {
          font-size: 0.22rem;
          color: #ffffff;
        }
        .iconziyuan {
          font-size: 0.16rem;
        }
      }
      li:hover {
        background-color: #16181d;
      }
      .liActive {
        background-color: #16181d;
        border-left: 1px solid #ff5722;
      }
    }
  }
  // 展开侧边栏
  .expandTheSidebar {
    width: 1.6rem;
    height: 100%;
    background-color: #20222a;
    padding-top: 0.6rem;
    overflow-y: scroll;
    overflow-x: hidden;
    .yiyun_Logo {
      width: 100%;
      height: 0.27rem;
      display: flex;
      justify-content: center;
      img {
        height: 100%;
        width: 1.16rem;
      }
    }
    .quanxian {
      color: #ffffff;
      width: 100%;
      height: 0.27rem;
      margin-top: 0.78rem;
      text-align: center;
      font-size: 0.16rem;
    }
    .drop_down {
      margin-top: 0.78rem;
      ul {
        li {
          .dataManagement {
            width: 1.6rem;
            height: 0.6rem;
            text-align: center;
            line-height: 0.6rem;
            font-size: 0.16rem;
            color: #ffffff;
            span {
              margin-left: 0.12rem;
              margin-right: 0.2rem;
            }
            .iconfont {
              font-size: .16rem;
            }
            .iconshuju {
              font-size: 0.22rem;
            }
            .iconrenshixitong {
              font-size: 0.22rem;
            }
            .iconxiaoxi {
              font-size: 0.22rem;
            }
            .iconziyuan {
              font-size: 0.16rem;
            }
            .iconxiala {
              font-size: 0.14rem;
            }
            .iconshouqi {
              font-size: 0.14rem;
            }
          }
          ul {
            li {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 0.6rem;
              width: 1.6rem;
              font-size: 0.16rem;
              color: rgba(255, 255, 255, 0.8);
              background-color: #16181d;
              span {
                margin-left: 0.1rem;
              }
              .Liorange {
                width: 0.02rem;
                height: 0.16rem;
              }
              .orangeActive {
                background-color: #ff5722;
              }
            }
            li:hover {
              color: rgba(255, 255, 255, 1);
            }
            .LiStyleActive {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
  }
  .expandTheSidebar::-webkit-scrollbar {
    display: none;
  }
  header {
    width: 100%;
    height: 0.6rem;
    position: fixed;
    top: 0;
    background-color: #ffffff;
    z-index: 100;
    .leftWidht {
      float: left;
      background-color: #20222a;
      height: 100%;
    }
    .marginLeft60 {
      width: 0.6rem;
    }
    .marginLeft160 {
      width: 1.6rem;
    }
    .ulLeftList {
      float: left;
      margin-left: 0.24rem;
      line-height: 0.6rem;
      li {
        float: left;
        font-size: 0.22rem;
        margin-right: 0.44rem;
        color: #333333;
      }
      .iconhoutui,
      .iconqianjin {
        color: #999999;
      }
      .iconhoutui:hover,
      .iconqianjin:hover {
        color: #333333;
      }
    }
    .ulRightList {
      float: right;
      margin-right: 0.24rem;
      line-height: 0.6rem;
      position: relative;
      li {
        float: left;
        font-size: 0.22rem;
        margin-left: 0.44rem;
        color: #333333;
      }
      .iconguanliyuan {
        font-size: 0.26rem;
      }
      span {
        font-size: 0.14rem;
        color: #333333;
      }
      .PassWord {
        position: absolute;
        top: 0.54rem;
        left: 0.05rem;
        z-index: 9999;
        width: 0.8rem;
        height: 0.4rem;
        background-color: #ffffff;
        text-align: center;
        line-height: 0.4rem;
        border: 1px solid rgba(192, 192, 192, 1);
        font-size: 0.14rem;
        cursor: pointer;
      }
    }
  }
  .box {
    flex: 1;
    padding-top: 0.6rem;
    padding-left: 0.2rem;
    padding-right: 0.24rem;
    background-color: #f2f2f2;
    overflow-y: scroll;
  }
  .box::-webkit-scrollbar {
    display: none;
  }
  a {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.16rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
  }
}
</style>

<style>
body > .van-dialog {
  width: 3rem;
}
</style>
<style lang="scss">
// 数据列表样式
.tankingTime {
  margin-top: 0.19rem;
  position: relative;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  button {
    position: absolute;
    top: 0;
    left: 2.2rem;
    width: 0.8rem;
    height: 0.3rem;
    background-color: #009688;
    border-radius: 0.02rem;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.16rem;
    color: #ffffff;
    border: none;
  }
}
.table_list {
  width: 100%;
  text-align: center;
  font-size: 0.16rem;
  margin-top: 0.19rem;
  border-collapse:collapse;
  thead {
    tr {
      height: 0.4rem;
      font-size:.16rem;
      cursor: pointer;
      background-color: #f8f8f8;
      .colorText {
        color: #009688;
      }
      th {
      border:1px solid #f2f2f2;
        border-collapse: collapse;
      }
    }
  }
  tbody {
    tr {
      height: 0.4rem;
      font-size:.16rem;
      cursor: pointer;
      .colorText {
        color: #009688;
      }
      td {
      border:1px solid #f1f1f1;
        border-collapse: collapse;
      }
    }
    tr:nth-of-type(even) {
      background-color: #f8f8f8;
    }
    tr:hover {
      background-color: #eefffd;
    }
  }
}
</style>

<style lang="scss">
// 数据总汇样式

.aggregatePerformance {
  width: 100%;
  height: 1.13rem;
  background-color: #ffeaeb;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  .Total {
    width: 3.36rem;
    margin-left: 0.29rem;
    span {
      font-size: 16px;
      color: #666666;
    }
    p {
      margin-top: 0.2rem;
      font-size: 0.3rem;
      color: #ec414d;
      font-weight: bold;
    }
  }
  .henxian {
    width: 0.01rem;
    height: 0.4rem;
    background-color: #ec414d;
  }
  ul {
    flex: 1;
    display: flex;
    li {
      // width: 20%;
      // float: left;
      flex: 1;
      padding-left: 0.82rem;
      span {
        font-size: 16px;
        color: #666666;
      }
      p {
        margin-top: 0.2rem;
        font-size: 0.26rem;
        color: #333333;
      }
    }
  }
}
</style>
<style>
.pagesBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.4rem;
}
.pagesBox .ivu-page-item-active {
  border-color: #009688;
}
.pagesBox .ivu-page-item:hover {
  border-color: #009688;
}
.ivu-select,
.ivu-date-picker,
.ivu-input-wrapper {
  height: 0.3rem !important;
}
</style>

<style lang="scss">
.Index .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  font-size:.16rem;
}
.Index .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  font-size:.16rem;
}
.Index .ivu-select-item {
  font-size:.16rem;
}

.Index .tankingTime button:hover {
  background-color:#04776c;
}
</style>