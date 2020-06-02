<template>
  <div class="NewAccountNumber">
    <div class="text_title">
      <span>新增账号</span>
    </div>

    <div class="main">
      <!-- 步骤 -->
      <div class="step">
        <!-- 第一步 -->
        <div class="step_one">
          <div class="step_one_text" :class="{step_one_textActive : DisplayHiding == true}">第一步</div>
          <div
            class="step_one_information"
            :class="DisplayHiding == true ? 'step_one_informationActive' : 'step_one_informationActiveColor '"
          >设置基本信息</div>
          <div
            class="step_one_text_icon"
            :class="{step_one_text_iconActive : DisplayHiding == true}"
          >
            <i class="iconfont iconjibenxinxi"></i>
          </div>
          <div class="xian" :class="DisplayHiding == true ? 'xianActive' : 'xianActiveColor'"></div>
        </div>
        <!-- 第二步 -->
        <div class="step_two">
          <div class="step_one_text" :class="{step_one_textActive : DisplayHiding == false}">第二步</div>
          <div
            class="step_one_information"
            :class="DisplayHiding == false ? 'step_one_informationActive' : 'step_one_informationActiveColor '"
          >设置账号权限</div>
          <div
            class="step_one_text_icon"
            :class="{step_one_text_iconActive : DisplayHiding == false}"
          >
            <i class="iconfont iconshezhiquanxian"></i>
          </div>
          <div class="xian" :class="DisplayHiding == false ? 'xianActive' : 'xianActiveColor'"></div>
        </div>
      </div>
      <!-- 填写资料 -->
      <div class="NewAccountNumber_data" v-if="DisplayHiding">
        <div class="data_nam">
          <span>
            <i>*</i>
            姓名
          </span>
          <input type="text" v-model="userName" placeholder="请输入姓名">
        </div>
        <div class="data_nam">
          <span>
            <i>*</i>
            电话
          </span>
          <input type="text" v-model="phoneNumber" placeholder="请输入电话号码">
        </div>
        <div class="data_nam">
          <span>
            <i>*</i>
            岗位
          </span>
          <input type="text" v-model="postName" placeholder="请输入岗位名称">
        </div>
        <div class="data_nam">
          <span>
            <i>*</i>
            账号
          </span>
          <input type="text" v-model="accountNumber" readonly placeholder="请设置账号">
        </div>
        <div class="data_nam">
          <span>
            <i>*</i>
            密码
          </span>
          <input type="password" v-model="password" placeholder="请设置密码">
        </div>
        <div class="data_nam">
          <span>
            <i>*</i>
            确认密码
          </span>
          <input type="password" v-model="confirmPassword" placeholder="请再次确认密码">
        </div>

        <!-- 下一步 -->
        <div class="buttonBox">
          <button class="NextStep" @click="nextStep()">下一步</button>
          <button class="cancel" @click="cancelStep()">取消</button>
        </div>
      </div>
      <!-- 权限设置 -->
      <div class="PermissionSettings" v-else>
        <ul>
          <li v-for="(item,index) in  permissionSetting.data" :key="index">
            <a>{{item.name}}</a>
            <p>
              <span
                v-for="(itemName,itemIndex) in item.child"
                :key="itemIndex"
                @click="chageJurisdiction(index,itemIndex)"
              >
                <i v-if="itemName.check == 2" class="iconfont iconweixuanzhong"></i>
                <i v-else-if="itemName.check == 1" class="iconfont iconxuanzhong"></i>
                <b>{{itemName.name}}</b>
              </span>
            </p>
          </li>
        </ul>
        <div class="check_all">
          <p>
            <a></a>
            <span @click="checkAllFn">
              <i v-if="permissionSetting.checkAll == 2" class="iconfont iconweixuanzhong"></i>
              <i v-else-if="permissionSetting.checkAll == 1" class="iconfont iconxuanzhong"></i>
              <b>权限全选</b>
            </span>
          </p>
        </div>
        <!-- 提交新增 -->
        <div class="buttonBox">
          <button class="NextStep" @click="newlyAdded()">确定新增</button>
          <button class="cancel" @click="cancelStep()">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postAdd , addJurisdiction } from "@/assets/api/system/system";
import { Dialog } from "vant";
export default {
  name: "NewAccountNumber",
  data() {
    return {
      DisplayHiding: true,
      // 用户资料
      // 姓名
      userName: "",
      // 手机号
      phoneNumber: "",
      // 岗位名称
      postName: "",
      // 账号
      accountNumber: "",
      // 密码
      password: "",
      // 确认密码
      confirmPassword: "",

      permissionSetting: {
        data: [],
        checkAll: 2
      }
    };
  },
  components: { Dialog },
  methods: {
    // 下一步
    nextStep() {
      if (this.userName == "") {
        Dialog.alert({
          message: "请输入姓名"
        }).then(() => {
          // on close
        });
      } else if (this.phoneNumber == "") {
        Dialog.alert({
          message: "请输入手机号码"
        }).then(() => {
          // on close
        });
      } else if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          this.phoneNumber
        )
      ) {
        Dialog.alert({
          message: "请输入正确的手机号码"
        }).then(() => {
          // on close
        });
      } else if (this.postName == "") {
        Dialog.alert({
          message: "请输入岗位名称"
        }).then(() => {
          // on close
        });
      } else if (this.accountNumber == "") {
        Dialog.alert({
          message: "请设置账号"
        }).then(() => {
          // on close
        });
      } else if (this.password == "") {
        Dialog.alert({
          message: "请设置密码"
        }).then(() => {
          // on close
        });
      } else if (this.confirmPassword == "") {
        Dialog.alert({
          message: "请再次确认密码"
        }).then(() => {
          // on close
        });
      } else if (this.password != this.confirmPassword) {
        Dialog.alert({
          message: "两次密码不一致,请重新输入密码"
        }).then(() => {
          // on close
        });
      } else {
        // console.log("验证通过了");
        // 发送添加账号的请求
        postAdd({
          name: this.userName,
          mobile: this.phoneNumber,
          post: this.postName,
          username: this.accountNumber,
          password: this.password,
          password_confirmation: this.confirmPassword
        }).then(res=>{
          if (res.status == 0) {
            this.DisplayHiding = false;
          }
          if (res.status == 4001) {
            this.$message({
              message: res.msg,
              type: 'error',
            });
          }
        }).catch(error=>{
            console.log("postAdd no");
        })
        // return;
        // this.$postRequest("/post/api/account/postAdd", {
        //   name: this.userName,
        //   mobile: this.phoneNumber,
        //   post: this.postName,
        //   username: this.accountNumber,
        //   password: this.password,
        //   password_confirmation: this.confirmPassword
        // }).then(res => {
        //   console.log(res);
          // if (res.status == 0) {
          //   this.DisplayHiding = false;
          // }
          // if (res.status == 4001) {
          //   Dialog.alert({
          //     message: res.msg
          //   }).then(() => {
          //     // on close
          //   });
          // }
        // });
      }
    },

    // 取消
    cancelStep() {
      Dialog.confirm({
        title: "取消",
        message: '退出后资料将不会被保存,是否继续?'
      })
        .then(() => {
          this.$router.push({
            path: "/AccountManagement"
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    //全选
    checkAllFn() {
      const that = this;
      if (that.permissionSetting.checkAll == 2) {
        that.permissionSetting.checkAll = 1;
        for (let i = 0; i < that.permissionSetting.data.length; i++) {
          const element = that.permissionSetting.data[i];
          for (let index = 0; index < element.child.length; index++) {
            const childElement = element.child[index];
            childElement.check = 1;
          }
        }
      } else {
        that.permissionSetting.checkAll = 2;
        for (let i = 0; i < that.permissionSetting.data.length; i++) {
          const element = that.permissionSetting.data[i];
          for (let index = 0; index < element.child.length; index++) {
            const childElement = element.child[index];
            childElement.check = 2;
          }
        }
      }
    },

    //切换权限
    chageJurisdiction(parentIndex, childIndex) {
      const that = this;
      let thisDataCheck = that.permissionSetting.data[parentIndex].child[childIndex].check;
      if (thisDataCheck == 1) {
        that.permissionSetting.checkAll = 2;
        that.permissionSetting.data[parentIndex].child[childIndex].check = 2;
        that.$forceUpdate();
      } else if (thisDataCheck == 2) {
        that.permissionSetting.data[parentIndex].child[childIndex].check = 1;
        let childNum = 0,
          childCheck = 0;
        for (let i = 0; i < that.permissionSetting.data.length; i++) {
          const element = that.permissionSetting.data[i];
          childNum += element.child.length;
          for (let index = 0; index < element.child.length; index++) {
            const childElement = element.child[index];
            if (childElement.check == 1) {
              childCheck++;
            }
          }
        }
        if (childCheck >= childNum) {
          that.permissionSetting.checkAll = 1;
        }
        that.$forceUpdate();
      }
    },

    //权限添加
    newlyAdded() {
      const that = this;
      let postData = that.permissionSetting.data,
        postDataStr = [];
      // for (let i = 0; i < that.permissionSetting.data.length; i++) {
      //   let element = that.permissionSetting.data[i];
      //   postDataStr[element.key] = {};
      // }

      // for (let i = 0; i < postData.length; i++) {
      //   let element = postData[i];
      //   for (let index = 0; index < element.rows.length; index++) {
      //     const childElement = element.rows[index];
      //     if (childElement.check == 1) {
      //       postDataStr[element.key][childElement.id] = childElement.id;
      //     }
      //   }
      // }

      postData.map((item , index) => {
        item.child.map((itemName , indexName) => {
          if(itemName.check == 1){
            postDataStr.push(itemName.id)
          }
        })
      })

      addJurisdiction({jurisdictionIds:JSON.stringify(postDataStr)}).then(res=>{
        if (res.status == 0) {
          this.$message({
            type: 'success',
            message: res.msg,
            onClose:()=>{
              this.$router.go(-1)
            }
          });
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        console.log("addJurisdiction no");
      })
      // let passWord = {
      //   jurisdictionIds: postDataStr
      // };
      // that
      //   .$postRequest("/post/api/account/addJurisdiction", passWord)
      //   .then(res => {
          // if (res.status == 0) {
          //   that.$Message.success({
          //     content: res.msg,
          //     onClose: function() {
          //       that.$router.push({
          //         path: "/AccountManagement"
          //       });
          //     }
          //   });
          // } else {
          //   console.log(res.msg);
          //   that.$Message.error({
          //     content: res.msg,
          //     onClose: function() {
          //       that.$router.push({
          //         path: "/AccountManagement"
          //       });
          //     }
          //   });
          // }
      //   });
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.$postRequest("/post/api/getIndexBar").then(res => {
      // console.log(res);
      if (res.status == 0) {
        for (const i in res.data) {
          res.data[i].child.map(item => {
            item.check = 2;
          });
        }
        var arrs = JSON.parse(JSON.stringify(res.data))
        arrs.map((item , index) => {
          if(item.name == '首页'){
            arrs.splice(index,1)
          }
        })
        this.permissionSetting.data  = arrs

      

      }
    });
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.$postRequest("/post/api/account/getUserName").then(res => {
      // console.log(res);
      if (res.status == 0) {
        this.accountNumber = res.data
      }
    });

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
.NewAccountNumber {
  background-color: #ffffff;
  padding: 0 0.26rem;
  height: 95%;
  overflow: hidden;
  margin-top: .2rem;
  .text_title {
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #009688;
    font-size: 0.18rem;
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    .step {
      width: 2rem;
      height: 100%;
      border-right: 1px solid #e5e5e5;
      box-sizing: border-box;
      .step_one {
        padding-right: 0.59rem;
        padding-top: 0.9rem;
        text-align: right;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        position: relative;
        .xian {
          width: 0.03rem;
          height: 0.5rem;
          position: absolute;
          top: 0.9rem;
          right: 0;
        }
        .xianActive {
          background-color: #ff5722;
        }
        .xianActiveColor {
          background-color: #e5e5e5;
        }
        .step_one_textActive {
          color: #009688;
        }
        .step_one_text {
          font-size: 0.2rem;
        }
        .step_one_informationActiveColor {
          color: #999999;
        }
        .step_one_informationActive {
          color: #333333;
        }
        .step_one_information {
          font-size: 0.16rem;
          margin-top: 0.18rem;
        }
        .step_one_text_iconActive {
          color: #009688;
        }
        .step_one_text_icon {
          margin-top: 0.35rem;
          // color: #999999;
          .iconjibenxinxi {
            font-size: 0.22rem;
          }
        }
      }
      .step_two {
        padding-right: 0.59rem;
        padding-top: 1.9rem;
        text-align: right;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        position: relative;
        .xian {
          width: 0.03rem;
          height: 0.5rem;
          position: absolute;
          top: 1.9rem;
          right: 0;
        }
        .xianActive {
          background-color: #ff5722;
        }
        .xianActiveColor {
          background-color: #e5e5e5;
        }
        .step_one_textActive {
          color: #009688;
        }
        .step_one_text {
          font-size: 0.2rem;
        }
        .step_one_informationActiveColor {
          color: #999999;
        }
        .step_one_informationActive {
          color: #333333;
        }
        .step_one_information {
          font-size: 0.16rem;
          margin-top: 0.18rem;
        }
        .step_one_text_iconActive {
          color: #009688;
        }
        .step_one_text_icon {
          margin-top: 0.35rem;
          // color: #999999;
          .iconshezhiquanxian {
            font-size: 0.22rem;
          }
        }
      }
    }
    // 填写姓名
    .NewAccountNumber_data {
      flex: 1;
      padding-top: 0.9rem;
      padding-left: 2.2rem;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      .data_nam {
        margin-bottom: 0.4rem;
        span {
          margin-right: 0.5rem;
          display: inline-block;
          width: 1rem;
          font-size: 0.18rem;
          text-align: right;
          color: #333333;
          i {
            color: #ec414d;
            font-style: normal;
          }
        }
        input {
          width: 5rem;
          height: 0.38rem;
          border: 1px solid #e5e5e5;
          color: #333333;
          font-size: 0.16rem;
          padding-left: 0.14rem;
        }
      }
      .buttonBox {
        margin-top: 1.5rem;
        button {
          width: 1rem;
          height: 0.38rem;
          text-align: center;
          line-height: 0.38rem;
          border: none;
          color: #ffffff;
          font-size: 0.16rem;
        }
        .NextStep {
          background-color: #009688;
          margin-right: 0.5rem;
        }
        .cancel {
          background-color: #c0c0c0;
        }
      }
    }

    // 权限设置
    .PermissionSettings {
      flex: 1;
      padding-top: 0.9rem;
      padding-left: 2.2rem;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      ul {
        // padding: 0.1rem 1.05rem 0;
        li {
          display: flex;
          align-items: flex-start;
          padding-top: 0.42rem;
          a {
            color: #333333;
            font-size: 0.18rem;
            width: 1.2rem;
          }
          p {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            flex: 1;
            span {
              display: flex;
              width: 1.8rem;
              cursor: pointer;
              i {
                font-size: 0.16rem;
                &.iconweixuanzhong {
                  color: #999999;
                }
                &.iconxuanzhong {
                  color: #009688;
                }
              }
              b {
                padding-left: 0.15rem;
                font-size: 0.16rem;
                color: #666666;
              }
            }
          }
        }
      }
      .check_all {
        padding: 0.3rem 0 0;
        p {
          border-top: 1px solid #e5e5e5;
          padding-top: 0.35rem;
          display: flex;
          align-items: center;
          a {
            width: 1.2rem;
          }
          span {
            display: flex;
            align-items: center;
            cursor: pointer;
            i {
              font-size: 0.16rem;
              &.iconweixuanzhong {
                color: #999999;
              }
              &.iconxuanzhong {
                color: #009688;
              }
            }
            b {
              padding-left: 0.15rem;
              font-size: 0.16rem;
              color: #666666;
            }
          }
        }
      }
      .henxian {
        height: 0.01rem;
        width: 50%;
        background-color: #e5e5e5;
        margin-right: 7.46rem;
        margin-bottom: 0.3rem;
      }
      .quanxuan {
        padding-left: 1.23rem;
      }
      .quanxianActive {
        font-family: MicrosoftYaHei;
        font-weight: 400;
        font-size: 0.14rem;
        color: #ec414d;
        padding-top: 0.25rem;
        padding-left: 1.23rem;
      }
      .buttonBox {
        margin-top: 1.5rem;
        button {
          width: 1rem;
          height: 0.38rem;
          text-align: center;
          line-height: 0.38rem;
          border: none;
          color: #ffffff;
          font-size: 0.16rem;
        }
        .NextStep {
          background-color: #009688;
          margin-right: 0.5rem;
        }
        .cancel {
          background-color: #c0c0c0;
        }
      }
    }
  }
}
</style>

<style>
.Index .ivu-checkbox-group {
  display: inline;
  font-size: 0.18rem;
}
.ivu-checkbox {
  margin-right: 0.1rem;
}

.Index .ivu-checkbox + span {
  margin-right: 0.36rem;
  font-size: 0.16rem;
  color: #666666;
}

.Index .ivu-checkbox-wrapper {
  font-size: 0.16rem;
  color: #666666;
}
</style>

    
