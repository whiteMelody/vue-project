<template>
  <div class="PublishNews">
    <header>发布消息</header>
    <div class="clear-f2"></div>
    <div class="wb75 center pat50 pab50">
        <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">
            <div class="row">
                <div class="col">
                    <el-form-item label="消息标题" prop="title">
                        <el-input type="text" v-model.trim="form.title" placeholder="请输入消息标题" clearable  maxlength="20" show-word-limit/>
                    </el-form-item>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <el-form-item label="消息内容" prop="content">
                          <quill-editor
                            v-model="form.content"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)"
                          ></quill-editor>
                    </el-form-item>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <el-form-item label="接收门店" prop="reciveData">
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
                    </el-form-item>
                </div>
            </div>
            <div class="clear4"></div>
            
            <div class="btn">
                <el-button @click="cancelStep">取消</el-button>
                <el-button type="primary" v-if="disabled" @click="ConfirmPublication">确定发布</el-button>
                <el-button type="primary" v-else disabled>提交中...</el-button>
            </div>
        </el-form>
    </div>

  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import { getStore , messageAdd } from "@/chain/assets/api/informationManagement/informationManagement";
export default {
  name: "PublishNews",
  data() {
    return {
      form:{},
      rules:{
        title: [{ required: true, message: '请输入消息标题', trigger: 'change' }],
        content: [{ required: true, message: '请输入消息内容', trigger: 'change' }],
        reciveData: [{ required: true, message: '请选择接收门店', trigger: 'change' }],
      },
      disabled:true,
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
      permissionSetting: {
        data: [],
        checkAll: 2
      }
    };
  },
  components: {},
  methods: {
    // 全选
    checkAllFn() {
      if (this.permissionSetting.checkAll == 2) {
        this.permissionSetting.checkAll = 1;
        for (
          let index = 0;
          index < this.permissionSetting.data.length;
          index++
        ) {
          this.permissionSetting.data[index].check = 1;
        }
      } else {
        this.permissionSetting.checkAll = 2;
        for (
          let index = 0;
          index < this.permissionSetting.data.length;
          index++
        ) {
          this.permissionSetting.data[index].check = 2;
        }
      }
    },

    // 单选
    chageJurisdiction(index, id) {
      let thisDataCheck = this.permissionSetting.data[index].check;
      if (thisDataCheck == 1) {
        this.permissionSetting.checkAll = 2;
        this.permissionSetting.data[index].check = 2;
        this.$forceUpdate();
      } else if (thisDataCheck == 2) {
        this.permissionSetting.data[index].check = 1;
        let childNum = 0,
          childCheck = 0;
        for (let i = 0; i < this.permissionSetting.data.length; i++) {
          const element = this.permissionSetting.data[i];
          childNum = this.permissionSetting.data.length;
          if (element.check == 1) {
            childCheck++;
          }
        }
        if (childCheck >= childNum) {
          this.permissionSetting.checkAll = 1;
        }
        this.$forceUpdate();
      }
    },


    // 发布消息
    ConfirmPublication() {
      this.disabled = false;
      let data = {};
      let list = [];

      this.permissionSetting.data.forEach(v => {
        if (v.check == 1) {
          list.push({idtype:1,id:v.check})
        }
      });

      if (!this.form.title) {
        this.isDisabled('请输入消息标题','error')
      }else if (!this.form.content) {
        this.isDisabled('请输入消息内容','error')
      }else if (!list.length) {
        this.isDisabled('请至少选择一个接收门店','error')
      }else {
        data.title = this.form.title;
        data.content = this.form.content;
        data.receive = JSON.stringify(list);
      
        messageAdd(data).then(res => {
          if (res.status == 0) {
            this.isDisabled('发布成功','success')
          }else if (res.status == 2000) {
            this.isDisabled('消息内容过长,请重试','error')
          }else {
            this.isDisabled('发布失败','error')
          }
        });
      }
    },
    
    isDisabled(msg,type) {
      this.$message({
        message: msg,
        type: type,
        duration:'1500',
        onClose:() => {
          if (type == 'success') {
            this.$router.go(-1);
          }
          this.disabled = true;
        }
      });
    },

    // 取消
    cancelStep() {
      this.$confirm('取消后将退出本页面,资料将不会被保存,是否继续?', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$router.go(-1);
      })
      .catch(() => {});
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
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    getStore().then(res => {
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
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.PublishNews {
  background-color: #ffffff;
  padding: 0 20px;
  margin:20px;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #333;
  }
  .check_all {
    margin-bottom: .1rem;
    span {
      cursor: pointer;
      i {
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.1rem;
      }
      b {
        font-weight: normal;
      }
    }
  }
  ul {
    width: 100%;
    li {
      margin-bottom: 0.1rem;
      float: left;
      cursor: pointer;
      i {
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.1rem;
      }
      b {
        font-weight: normal;
        margin-right: .39rem;
      }
    }
  }
  .iconxuanzhong {
    color: #009688;
  }
  .iconweixuanzhong {
    color: #999999;
  }
  .btn{
      display: flex;
      justify-content: flex-end;
  }
}
</style>

<style lang="scss">
.PublishNews .ql-container.ql-snow {
  height: 3rem;
}
</style>