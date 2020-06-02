<template>
  <div class="AccountManagement">
    <header>账号管理</header>
    <div class="clear-f2"></div>
    <div class="clear3"></div>
    <base-list
      ref="demoTable"
      :condition="condition"
      :datas.sync="demoList"
      :pageSearch="pageSearch"
      :isPaging="true"
      v-on:listLoaded="getLoaded"
    >
      <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
        <el-form-item>
          <el-input v-model="condition.keyword" placeholder="请输入姓名/电话号码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
          <el-button type="primary" class="h32px" @click="$router.push({name:'NewAccountNumber'})">新增账号</el-button>
        </el-form-item>
      </el-form>


      <el-table slot="list" :data="demoList" border>
        <el-table-column prop="store_name" align="left" label="序号" width="50px">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>

        <el-table-column prop="account" align="left" label="账号">
          <template slot-scope="scope">{{ scope.row.account}}</template>
        </el-table-column>

        <el-table-column prop="othername" align="left" label="身份">
          <template slot-scope="scope">{{ scope.row.othername }}</template>
        </el-table-column>

        <el-table-column prop="name" align="left" label="姓名">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column prop="mobile" align="left" label="电话">
          <template slot-scope="scope">{{ scope.row.mobile }}</template>
        </el-table-column>

        <el-table-column prop="qiantai" align="left" label="操作" width="300px">
          <template slot-scope="scope">
            <div class="operation">
              <div class="Fgreen" @click="open(1,scope.row.users_id)"  v-show="scope.row.is_admin == 0">修改资料</div>
              <em  v-show="scope.row.is_admin == 0"></em>
              <div class="Fgreen" @click="open(2,scope.row.users_id)">修改密码</div>
              <em  v-show="scope.row.is_admin == 0"></em>
              <div class="Fgreen" @click="open(3,scope.row.users_id)" v-show="scope.row.is_admin == 0">权限设置</div>
              <em  v-show="scope.row.is_admin == 0"></em>
              <div :class="scope.row.is_admin == 0 && scope.row.status == 0 ? 'Red' : 'Fgreen'" @click="Enable(scope.row.users_id,scope.row.status)"  v-show="scope.row.is_admin == 0">
                {{scope.row.is_admin == 0 && scope.row.status == 0 ? '停用' : '启用'}}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </base-list>

    <!-- 修改资料 -->
    <el-dialog title="修改资料" :visible.sync="Modifying" width="25%">
      <div class="dialog_xian"></div>
      <div class="wb100">
        <el-form ref="dataForm" :model="ModifyingParam" :rules='rules'>
          <el-form-item prop="name" label="姓名">
            <el-input type="text" v-model="ModifyingParam.name" placeholder="请输入姓名" clearable/>
          </el-form-item>
          <el-form-item prop="mobile" label="电话">
            <el-input type="text" v-model="ModifyingParam.mobile" placeholder="请输入正确的电话号码" maxlength="11" clearable/>
          </el-form-item>
          <el-form-item prop="post" label="岗位">
            <el-input type="text" v-model="ModifyingParam.post" placeholder="请输入工作岗位" clearable/>
          </el-form-item>
          <el-form-item prop="username" label="账号">
            <el-input type="text" v-model="ModifyingParam.username" placeholder="请输入账号" clearable/>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
          <el-button @click="Modifying = false;ModifyingParam = {}">取 消</el-button>
          <el-button type="primary" v-if="disabled" @click="submit(1)">确 定</el-button>
          <el-button type="primary" v-else disabled>提交中...</el-button>
      </div>
    </el-dialog>

    
    <!-- 修改密码 -->
    <el-dialog title="修改资料" :visible.sync="ChangePassword" width="25%">
      <div class="dialog_xian"></div>
      <div class="wb100 labelBox">
        <el-form ref="psaawordForm" :model="ChangePasswordParam" :rules='rules' label-width="100px">
          <el-form-item prop="password" label="新密码">
            <el-input type="password" v-model="ChangePasswordParam.password" placeholder="请输入新密码" clearable/>
          </el-form-item>
          <el-form-item prop="password_confirmation" label="确认新密码">
            <el-input type="password" v-model="ChangePasswordParam.password_confirmation" placeholder="请确认新密码" clearable/>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
          <el-button @click="ChangePassword = false;ChangePasswordParam = {}">取 消</el-button>
          <el-button type="primary" v-if="disabled" @click="submit(2)">确 定</el-button>
          <el-button type="primary" v-else disabled>提交中...</el-button>
      </div>
    </el-dialog>


    <!-- 修改权限 -->
    <el-dialog title="修改权限" :visible.sync="jurisdictionShow" width="440px">
      <GeminiScrollbar class="my-scroll-bar" :forceGemini="true">
        <div class="content">
          <el-form :model="jurisdictionParam" :rules='rules'>
            <el-form-item prop="usersId" v-for="(item , index) in jurisdictionList" :key="index">
              <div class="bold">{{item.name}}</div>
              <el-checkbox v-model="item.checkbox" @change="parentCheckboxFn(item)">全选</el-checkbox>
              <div style="margin: 5px 0;"></div>
              <el-checkbox v-for="(itemName , indexName) in item.child" :key='indexName' v-model="itemName.checkbox" @change="childCheckboxFn">{{itemName.name}}</el-checkbox>
            </el-form-item>
          </el-form>
        </div>
      </GeminiScrollbar>

      <div slot="footer" class="dialog-footer">
          <el-button @click="jurisdictionShow = false;jurisdictionParam = {}">取 消</el-button>
          <el-button type="primary" v-if="disabled" @click="submit(3)">确 定</el-button>
          <el-button type="primary" v-else disabled>提交中...</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { 
  getEditJurisdiction , 
  editJurisdiction ,
  getList ,
  setStatus ,
  getEditData ,
  editData ,
  editPassword
} from "@/chain/assets/api/system/system";
export default {
  name: "AccountManagement",
  data() {
    return {
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: getList, // 分页查询api接口
      urserId:'',
      jurisdictionShow:false,
      Modifying:false,
      ChangePassword:false,
      jurisdictionParam:{},
      ModifyingParam:{},
      ChangePasswordParam:{},
      rules:{
        name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        mobile: [{ required: true, message: '请输入电话', trigger: 'change' }],
        post: [{ required: true, message: '请输入岗位', trigger: 'change' }],
        username: [{ required: true, message: '请输入账号', trigger: 'change' }],
        password: [{ required: true, message: '请输入新密码', trigger: 'change' }],
        password_confirmation: [{ required: true, message: '请确认新密码', trigger: 'change' }],
      },
      disabled:true,
      jurisdictionList:[],
    };
  },
  components: {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    getLoaded(data) {
      this.demoList = data.members
    },
    // 操作按钮
    open(type,id) {
      this.urserId = id;
      if (type == 1) {
        // 修改资料
        getEditData({id:id}).then(res => {
          if (res.status == 0) {
            this.ModifyingParam = res.data;
          }
        }).catch(error=>{
          console.log("getEditData no");
        })
        this.Modifying = true;
      }else if (type == 2) {
        // 修改密码
        this.ChangePassword = true;
        this.ChangePasswordParam = {};
      }else {
        // 权限设置
        this.jurisdictionList = {};
        getEditJurisdiction({id:id}).then(res=>{
          if(res.status == 0){
            this.jurisdictionList = res.data;
            this.jurisdictionList.map((item , index) => {
              let checkboxNum = 0,checkboxLength = item.child.length
              item.child.map((itemName , indexName) =>{
                if(itemName.check){
                  itemName.checkbox = true;
                  checkboxNum++;
                }
              })
              if (checkboxNum >= checkboxLength) {
                item.checkbox = true;
              }else{
                item.checkbox = false;
              }
            })
          }
        }).catch(error=>{
            console.log("getEditJurisdiction no");
        })
        this.jurisdictionShow = true;
      }
    },
    // 提交
    submit(type) {
      this.disabled = false;
      if (type == 1) {
        this.$refs.dataForm.validata(value => {
          if (value) {
            this.ModifyingParam.id = this.urserId;
            editData(this.ModifyingParam).then(res => {
              if (res.status == 0) {
                this.isDisabled(res.msg,'success')
              }else {
                this.isDisabled(res.msg,'error')
              }
            }).catch(err => {
              console.log('editData  no');
            });
          }else {
            this.disabled = true;
          }
        });
      }else if (type == 2) {
        this.$refs.psaawordForm.validate(value => {
          if (value) {
            this.ChangePasswordParam.id = this.urserId;
            editPassword(this.ChangePasswordParam).then(res => {
              if (res.status == 0) {
                this.isDisabled(res.msg,'success')
              }else {
                this.isDisabled(res.msg,'error')
              }
            }).catch(err => {
              console.log('editPassword   no');
            });
          }else {
            this.disabled = true;
          }
        });
      }else {
        let arr = []
        this.jurisdictionList.map((item , index) => {
          let checkboxNum = 0,checkboxLength = item.child.length
          item.child.map((itemName , indexName) =>{
            if(itemName.checkbox){
              arr.push(itemName.id)
            }
          })
        })
        editJurisdiction({jurisdictionIds:JSON.stringify(arr),id:this.urserId}).then(res=>{
          if(res.status == 0){
            this.isDisabled('操作成功','success')
          }else{
            this.isDisabled(res.msg,'error')
          }
        }).catch(error=>{
            console.log("editJurisdiction no");
        })
      }
    },
    //权限修改全选
    parentCheckboxFn(item){
      if(item.checkbox){
        item.child.map((itemName , indexName) =>{
          itemName.checkbox = true
        })
      }else{
        item.child.map((itemName , indexName) =>{
          itemName.checkbox = false
        })
      }
      this.$forceUpdate();
    },
    //权限修改单个选项
    childCheckboxFn(){
      this.jurisdictionList.map((item , index) => {
        let checkboxNum = 0,checkboxLength = item.child.length
        item.child.map((itemName , indexName) =>{
          if(itemName.checkbox){
            checkboxNum++
          }
        })
        if (checkboxNum >= checkboxLength) {
          item.checkbox = true;
        }else{
          item.checkbox = false;
        }
      })
      this.$forceUpdate();
    },
    // 停用启用
    Enable(id,status) {
      this.$confirm(!status ? '是否停用?': '是否启用?', !status ? '停用' : '启用', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setStatus({id:id}).then(res => {
          if (res.status == 0) {
            this.isDisabled(res.msg,'success')
          }else {
            this.isDisabled(res.msg,'error')
          }
        }).catch(error=>{
          console.log("setStatus no");
      })
      }).catch(() => {});
    },

    isDisabled(msg,type) {
      this.$message({
        message: msg,
        type: type,
        duration:'1500',
        onClose:() => {
          if (type == 'success') {
            this.loadData();
            this.jurisdictionShow = false;
            this.Modifying = false;
            this.ChangePassword = false;
          }
          this.disabled = true;
        }
      });
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
.AccountManagement {
  margin: 20px;
  background-color: #ffffff;
  padding: 0 20px 20px 20px;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    span {
      font-size: 16px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-left: 0.29rem;
      i {
        font-style: normal;
        color: #ff5722;
      }
    }
  }
  .operation {
    display: flex;
    align-items: center;
    em {
      width:1px;
      height:14px;
      background:rgba(229,229,229,1);
      margin: 0 9px;
    }
    .Red {
      color: #EC414D;
    }
    .Fgreen,.Red {
      cursor:pointer;
    }
    .Fgreen:hover,.Red:hover {
      opacity: 0.7;
      text-decoration: underline;
    }
  }
}
</style>

<style>
.AccountManagement .el-dialog__body{
  padding-top: 0
}
.AccountManagement .el-dialog__body .content{
  border-top: 1px solid #e5e5e5;
  /* overflow-y: scroll; */
}
.AccountManagement .el-dialog__body .content .el-form-item{
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 0 !important;
}
.wb100 .el-form-item__content {
  display: flex;
}

.labelBox .el-form-item__label{
  width: 25%;
  padding-right: 20px;
}
.my-scroll-bar {
  max-height: 400px;
}
/* 背景色 */
.gm-scrollbar.-vertical {
  /* background-color: #f2f2f2; */
}

/* 滚动轨迹 */
.gm-scrollbar.-horizontal {
  background-color: transparent;
}

/* 滚动条颜色 */
.gm-scrollbar .thumb {
  background-color: #c0c0c0;
}
.gm-scrollbar .thumb:hover {
  background-color: #666666;
}
</style>

<style>

  
.AccountManagement .el-dialog .el-dialog__header{
  padding: 10px 20px;
}
.AccountManagement .el-dialog__header .el-dialog__title{
  font-size: 16px;
}
.AccountManagement .el-dialog__header .el-dialog__headerbtn{
  top: 10px;
}
.AccountManagement .el-dialog__body{
  padding: 0 20px;
}
.AccountManagement .el-dialog__body .content{
}
.AccountManagement .dialog_box{
  display: flex;
  flex-wrap: wrap;
  padding-top: 
}
.AccountManagement .dialog_xian {
  height: 1px;
  background: #E5E5E5;
  margin-bottom: 14px;
}
</style>