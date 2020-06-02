<template>
  <div class="Dome">
    <button @click="showMessage">点击</button>
    <MessagePop ref="message" :popData="popData"></MessagePop>

    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
export default {
  name: "Dome",
  data() {
    return {
      popData: "",
      id: 384,
      content: "qingshu",
      editorOption: {
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],  
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block","align"],
          ]
        }
      }
    };
  },
  components: {},
  methods: {
    showMessage() {
      // this.popData = {
      //   popTowText:"warning",
      //   popText:"快速公交考虑到法国",
      //   popBgText:"bandConfirm"
      // }

      // this.popData = {
      //   personnelgetDataUrl:[
      //     {
      //       e_id:1,
      //       api:'/post/api/members/getStoreList',
      //       types:'shopList'
      //     },
      //     {
      //       e_id:1,
      //       api:'/post/api/members/getStoreList',
      //       types:'operatingPostList'
      //     },
      //     {
      //       e_id:1,
      //       api:'/post/api/members/getStoreList',
      //       types:'staffList'
      //     }
      //   ],
      //   personnelsubDataUrl:"",
      //   popBgText:"personnel"
      // }

      // this.popData = {
      //   getEditDataUrl : "/post/api/account/getEditData",
      //   id:this.id,
      //   editDataUrl:'/post/api/account/editData',
      //   popBgText:'modifiedData',
      // }

      // this.popData = {
      //   id:this.id,
      //   editPasswordUrl:"/post/api/account/editPassword",
      //   popBgText:'changePassword',
      // }

      this.popData = {
        getEditJurisdictionUrl: "/post/api/account/getEditJurisdiction",
        id: this.id,
        editJurisdictionUrl: "/post/api/account/editJurisdiction",
        popBgText: "permissionSetting"
      };

      // this.popData = {
      //   getEditJurisdictionUrl:"/post/api/account/getEditJurisdiction",
      //   id:this.id,
      //   editJurisdictionUrl:"/post/api/account/editJurisdiction",
      //   popBgText:'makeAnAppointment',
      // }

      this.$refs.message.popBgStateShowFn(this.popData);

      // 强制刷新渲染for循环里面item的值
      // this.$forceUpdate();
    },

    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
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
  beforeUpdate() {
    console.log(this.content);
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
.Dome {
}
</style>



    
