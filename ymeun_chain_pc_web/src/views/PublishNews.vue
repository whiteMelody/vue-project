<template>
  <div class="PublishNews">
    <div class="text_title">
      <span>消息管理</span>
    </div>
    <div class="NewAccountNumber_data">
      <div class="data_nam">
        <span>
          <i>*</i>
          消息标题
        </span>
        <span>
          <Input
            class="input"
            v-model="newsTitle"
            :maxlength="20"
            placeholder="请输入消息标题"
            style="width: 5rem; height:0.38rem;"
          />
        </span>
        <span class="shuzi">{{newsLength}}/20</span>
      </div>

      <!-- 富文本 -->
      <div class="RichText">
        <span>
          <i>*</i>
          消息内容
        </span>
        <div class="RichTextBox">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
      </div>

      <!-- 接收门店 -->
      <div class="receiveBox">
        <span class="mendian">
          <i>*</i>
          接收门店
        </span>
        <!-- 权限设置 -->
        <div class="PermissionSettings">
          <div class="check_all">
            <p>
              <span @click="checkAllFn">
                <i v-if="permissionSetting.checkAll == 2" class="iconfont iconweixuanzhong"></i>
                <i v-else-if="permissionSetting.checkAll == 1" class="iconfont iconxuanzhong"></i>
                <b>全部门店</b>
              </span>
            </p>
          </div>
          <ul>
            <li v-for="(item, index) in permissionSetting.data" :key="index">
              <p>
                <span @click="chageJurisdiction(index,item.id)">
                  <i v-if="item.check == 2" class="iconfont iconweixuanzhong"></i>
                  <i v-else-if="item.check == 1" class="iconfont iconxuanzhong"></i>
                  <b>{{item.name}}</b>
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 发布消息 -->
      <div class="buttonBox">
        <button class="NextStep" @click="cancelStep()">取消</button>
        <button class="cancel" @click="ConfirmPublication()">确定发布</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { quillEditor } from "vue-quill-editor";
import { setTimeout } from "timers";
export default {
  name: "PublishNews",
  data() {
    return {
      newsTitle: "",
      newsLength: 0,
      // 富文本
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block", "align"]
          ]
        }
      },
      permissionSetting: {
        data: [],
        checkAll: 2
      }
    };
  },
  components: { Dialog },
  methods: {
    // 全选
    checkAllFn() {
      const that = this;
      if (that.permissionSetting.checkAll == 2) {
        that.permissionSetting.checkAll = 1;
        for (
          let index = 0;
          index < that.permissionSetting.data.length;
          index++
        ) {
          that.permissionSetting.data[index].check = 1;
        }
      } else {
        that.permissionSetting.checkAll = 2;
        for (
          let index = 0;
          index < that.permissionSetting.data.length;
          index++
        ) {
          that.permissionSetting.data[index].check = 2;
        }
      }
    },

    // 单选
    chageJurisdiction(index, id) {
      const that = this;
      let thisDataCheck = that.permissionSetting.data[index].check;
      if (thisDataCheck == 1) {
        that.permissionSetting.checkAll = 2;
        that.permissionSetting.data[index].check = 2;
        that.$forceUpdate();
      } else if (thisDataCheck == 2) {
        that.permissionSetting.data[index].check = 1;
        let childNum = 0,
          childCheck = 0;
        for (let i = 0; i < that.permissionSetting.data.length; i++) {
          const element = that.permissionSetting.data[i];
          childNum = that.permissionSetting.data.length;
          if (element.check == 1) {
            childCheck++;
          }
        }
        if (childCheck >= childNum) {
          that.permissionSetting.checkAll = 1;
        }
        that.$forceUpdate();
      }
    },

    // 富文本事件
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },

    // 发布消息
    ConfirmPublication() {
      const that = this;

      let postData = that.permissionSetting.data;
      let postDataStr = new Array();
      let ids = new Array();
      let reciveData = new Array();
      reciveData["idtype"] = 1;
      reciveData["id"] = ids;
      postDataStr["receive"] = reciveData;
      // 接收门店
      for (let i = 0; i < that.permissionSetting.data.length; i++) {
        let element = that.permissionSetting.data[i];
        if (element.check == 1) {
          ids.push(element.id);
        } else {
        }
      }
      // 消息标题
      if (that.newsTitle == "") {
        Dialog.alert({
          message: "请输入消息标题"
        }).then(() => {
          // on close
        });
      } else if (that.content == "" ) {
        Dialog.alert({
          message: "请输入消息内容"
        }).then(() => {
          // on close
        });
      } else if (postDataStr["receive"]["id"].length < 1) {
        Dialog.alert({
          message: "请至少选择一个门店"
        }).then(() => {
          // on close
        });
      } else {
        postDataStr["title"] = that.newsTitle;
        postDataStr["content"] = that.content;
      
        // 调用发布消息接口
        this.$postRequest("/post/api/message/add", postDataStr).then(res => {
          // console.log(res);
          if (res.status == 0) {
            Dialog.alert({
              message: "发布成功"
            }).then(() => {
              this.$router.push({
                path: "/MessageManagement"
              });
            });
          } else if (res.status == 2000) {
            Dialog.alert({
              message: "消息内容过长,请重试"
            }).then(() => {
              // on close
            });
          } else {
            Dialog.alert({
              message: "发布失败"
            }).then(() => {
              // on close
            });
          }
        });
      }
    },

    // 取消
    cancelStep() {
      Dialog.confirm({
        title: "退出",
        message: "取消后将退出本页面,资料将不会被保存,是否继续?"
      })
        .then(() => {
          this.$router.push({
            path: "/MessageManagement"
          });
        })
        .catch(() => {});
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.$postRequest("/post/api/store/getStore").then(res => {
      if (res.status == 0) {
        this.permissionSetting.data = res.data;
        res.data.map(item => {
          item.check = 2;
        });
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
  updated() {
    this.newsLength = this.newsTitle.length;
    this.permissionSetting.data.map(item => {
      if (item.check == 1) {
        // console.log(item.id);
      } else {
      }
    });
  },

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.PublishNews {
  background-color: #ffffff;
  padding: 0 0.26rem;
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
  .NewAccountNumber_data {
    padding-top: 0.43rem;
    padding-left: 2.38rem;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    .data_nam {
      margin-bottom: 0.5rem;
      position: relative;
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
      .shuzi {
        position: absolute;
        font-size: 0.16rem;
        color: #999999;
        top: 50%;
        transform: translateY(-50%);
        margin-left: -1.1rem;
      }
    }
    .RichText {
      margin-bottom: 0.5rem;
      overflow: hidden;
      span {
        float: left;
        margin-right: 0.5rem;
        width: 1rem;
        font-size: 0.18rem;
        text-align: right;
        color: #333333;
        i {
          color: #ec414d;
          font-style: normal;
        }
      }
      .RichTextBox {
        float: left;
      }
    }
    .receiveBox {
      overflow: hidden;
      .mendian {
        float: left;
        height: 100%;
        margin-right: 0.5rem;
        width: 1rem;
        font-size: 0.18rem;
        text-align: right;
        color: #333333;
        i {
          color: #ec414d;
          font-style: normal;
        }
      }
      .PermissionSettings {
        font-family: MicrosoftYaHei;
        font-weight: 400;
        font-size: 0.16rem;
        color: #666666;
        width: 10rem;
        .check_all {
          span {
            cursor: pointer;
            i {
              width: 0.16rem;
              height: 0.16rem;
              margin-right: 0.14rem;
            }
            b {
              font-weight: normal;
            }
          }
        }
        ul {
          margin-top: 0.3rem;
          margin-left: 1.5rem;
          width: 100%;
          li {
            width: 25%;
            margin-bottom: 0.3rem;
            float: left;
            cursor: pointer;
            i {
              width: 0.16rem;
              height: 0.16rem;
              margin-right: 0.14rem;
            }
            b {
              font-weight: normal;
            }
          }
        }
        .iconxuanzhong {
          color: #009688;
        }
        .iconweixuanzhong {
          color: #999999;
        }
      }
    }
    .buttonBox {
      margin-top: 0.8rem;
      padding-bottom: 0.6rem;
      text-align: right;
      padding-right: 2.39rem;
      button {
        width: 1rem;
        height: 0.38rem;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 0.38rem;
        border: none;
      }
      .cancel {
        background-color: #009688;
        color: #ffffff;
        margin-left: 0.16rem;
      }
      .NextStep {
        background-color: #c0c0c0;
        color: #ffffff;
      }
    }
  }
}
</style>

<style lang="scss">
.PublishNews .ivu-input {
  width: 5rem;
  height: 0.38rem;
  border: 1px solid #e5e5e5;
  color: #333333;
  font-size: 0.16rem;
  padding-left: 0.14rem;
}

.PublishNews .ql-container.ql-snow {
  height: 3rem;
  width: 10rem;
}

.PublishNews .ql-toolbar {
  width: 10rem;
}
</style>

    
