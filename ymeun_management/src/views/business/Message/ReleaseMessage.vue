<template>
  <div class="ReleaseMessage">
    <div class="title">发布消息</div>
    <div class="aside">
      <div class="text_name">
        <span class="spanClass">
          <i>*</i>
          消息标题
        </span>
        <div>
          <el-input type="text" placeholder="请输入消息标题" v-model="ObjData.title" maxlength="20" show-word-limit></el-input>
        </div>
      </div>

      <div class="Rich_text">
        <span class="spanClass">
          <i>*</i>
          消息内容
        </span>
        <div class="Rich_text">
          <quill-editor
            v-model="ObjData.content"
            class="wb100"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
      </div>

      <div class="selectBox">
        <span class="spanClass">
          <i>*</i>
          接收对象
        </span>
        <el-radio v-model="ObjData.device" label="1">全部连锁</el-radio>
        <el-radio v-model="ObjData.device" label="2">全部门店</el-radio>
      </div>
    </div>

    <div class="bottom">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="SubmitClick" v-if="ReleaseIsShow">确定发布</el-button>
      <el-button type="primary" disabled v-else>发布中...</el-button>
    </div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import { ReleaseMessage } from "@/assets/api/message/message";
export default {
  name: "ReleaseMessage",
  data() {
    return {
      // 富文本
      editorOption: {
        placeholder: "请输入消息内容...",
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
      ObjData:{
        device:0,
        title:'',
        content:''
      },
      ReleaseIsShow:true

    };
  },
  components: {},
  methods: {
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
    SubmitClick() {
      const that = this;
      let data = that.ObjData;
      that.ReleaseIsShow = false;
      if (data.title == '' || data.content == '' || data.device == 0) {
        that.$message({
          message: '请完善好消息标题和消息内容及接收门店!',
          type: 'warning',
          duration:'2000',
          onClose:() => {
            that.ReleaseIsShow = true;

          }
        });
      }else {
        ReleaseMessage(data).then(res => {
          if (res.status == 0) {
            that.$message({
              message: '发布成功!',
              type: 'success',
              duration:'2000',
              onClose:() => {
                that.$router.go(-1);
              }
            });
          }
        });
      }
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
@import "./ReleaseMessage.scss";
</style>



    
