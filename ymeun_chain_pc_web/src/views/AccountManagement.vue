<template>
  <div class="AccountManagement">
    <div class="content">
      <div class="tabs_title">
        <div>
          <p class="active">
            <span>账号管理</span>
            <em></em>
          </p>
        </div>
      </div>
      <div class="tankingTime">
        <Input
          placeholder="请输入姓名或电话号码"
          v-model="keyword"
          clearable
        />
        <button class="searchButton" @click="searchFn()">搜索</button>
        <span @click="newlyAdded()">
          <i>+</i>
          <a>新增账号</a>
        </span>
      </div>

      <div class="list">
        <!-- 列表页 -->
        <table class="table_list" cellspacing="0" v-loading="loading">
          <thead>
            <tr>
              <th>序号</th>
              <th>账号</th>
              <th>身份</th>
              <th>姓名</th>
              <th>电话</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in AccountNumber" :key="index">
              <td v-if="index < 9">0{{index+1}}</td>
              <td v-else>{{index+1}}</td>
              <td>{{item.account}}</td>
              <td>{{item.othername}}</td>
              <td>{{item.name}}</td>
              <td>{{item.mobile}}</td>
              <td class="operation">
                <div>
                  <p @click="modificationFn(item.users_id)" v-show="item.is_admin == 0">
                    <i class="iconfont iconxiugai"></i>
                    <a>修改资料</a>
                  </p>
                  <p @click="changePasswordFn(item.users_id)">
                    <i class="iconfont iconxiugaimima"></i>
                    <a>修改密码</a>
                  </p>
                  <p @click="permissionSettingFn(item.users_id)" v-show="item.is_admin == 0">
                    <i class="iconfont iconquanxianshezhi"></i>
                    <a>权限设置</a>
                  </p>
                  <p
                    class="mask_left"
                    @click="DiscontinueUse(item.users_id,index)"
                    v-if="item.is_admin == 0 && item.status == 0 "
                  >
                    <a>停用</a>
                  </p>
                  <p
                    class="mask_qiyong"
                    @click="Enable(item.users_id,index)"
                    v-else-if="item.is_admin == 0 && item.status == 1"
                  >
                    <a>启用</a>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 分页 -->
        <div class="pagesBox">
          <Page
            :total="listData.amount"
            :page-size="listData.pagesize"
            show-total
            @on-change="pageEvent"
            show-elevator
            :current="listData.pages"
            v-show="listData.amount > listData.pagesize"
          />
        </div>
      </div>
    </div>
    <MessagePop ref="message" :popData="popData" @message="getListStop"></MessagePop>

    <el-dialog title="修改权限" :visible.sync="jurisdictionShow" width="440px">
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

      <div slot="footer" class="dialog-footer">
          <el-button @click="jurisdictionShow = false;jurisdictionParam = {}">取 消</el-button>
          <template v-if="disabled">
              <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
              <el-button type="primary" @click="jurisdictionEdit">确 定</el-button>
          </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { getEditJurisdiction , editJurisdiction } from "@/assets/api/system/system";

export default {
  name: "AccountManagement",
  data() {
    return {
      AccountNumber: [],
      keyword: "",
      popData: "",
      listData: {
        pages: 1,
        pagesize: 10,
        amount: 0
      },
      loading:false,
      jurisdictionShow:false,
      disabled:false,
      jurisdictionParam:{},
      jurisdictionList:[],
      rules:{
        price: [{ required: true, message: '请输入金额', trigger: 'blur' }],
      },
      urserId:''
    };
  },
  

  components: { Dialog },
  methods: {


    //搜索
    searchFn() {
      this.listData.pages = 1;
      this.getListFn();
    },
    //分页器
    pageEvent(pages) {
      const that = this;
      that.listData.pages = pages;
      that.getListStop();
    },

    // 账号列表
    getListStop() {
      const that = this;
      that.loading = true;
      that.$postRequest("/post/api/account/getList", {
        keyword: this.keyword,
        start: this.listData.pages,
        perpage: this.listData.pagesize
      }).then(res => {
        if (res.status == 0) {
          that.AccountNumber = res.data.members;
          that.listData.amount = res.data.total;
          that.loading = false;
          // this.$forceUpdate();
        }
      });
    },

    // 搜索
    getListFn() {
      this.getListStop();
    },

    // 跳转新增账号
    newlyAdded() {
      this.$router.push({
        path: "/NewAccountNumber"
      });
    },

    //修改资料
    modificationFn(id) {
      const that = this;
      that.popData = {
        getEditDataUrl: "/post/api/account/getEditData",
        id: id,
        editDataUrl: "/post/api/account/editData",
        popBgText: "modifiedData"
      };
      that.$refs.message.popBgStateShowFn(this.popData);
      this.$forceUpdate();
    },

    //修改密码
    changePasswordFn(id) {
      const that = this;
      that.popData = {
        id: id,
        editPasswordUrl: "/post/api/account/editPassword",
        popBgText: "changePassword"
      };
      that.$refs.message.popBgStateShowFn(this.popData);
    },

    //权限设置
    permissionSettingFn(id) {
      this.jurisdictionShow = true;
      this.urserId = id;
      this.jurisdictionList = {}
      getEditJurisdiction({id:id}).then(res=>{
        if(res.status == 0){
          this.jurisdictionList = res.data;
          this.jurisdictionList.map((item , index) => {
            let checkboxNum = 0,checkboxLength = item.child.length
            item.child.map((itemName , indexName) =>{
              if(itemName.check){
                itemName.checkbox = true;
                checkboxNum++
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

      // return;
      // const that = this;
      // that.popData = {
      //   getEditJurisdictionUrl: "/post/api/account/getEditJurisdiction",
      //   id: id,
      //   editJurisdictionUrl: "/post/api/account/editJurisdiction",
      //   popBgText: "permissionSetting"
      // };
      // that.$refs.message.popBgStateShowFn(this.popData);
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

    //权限提交
    jurisdictionEdit(){
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
          this.$message({
            message: '修改成功',
            type: 'success',
            onClose:()=>{
              this.getListStop()
              this.jurisdictionShow = false;
            }
          });
        }
        else{
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
          console.log("editJurisdiction no");
      })

    },

    // 停用
    DiscontinueUse(id, index) {
      Dialog.confirm({
        title: "停用",
        message: "是否确定停用?"
      })
        .then(() => {
          this.$postRequest("/post/api/account/setStatus", {
            id: id
          }).then(res => {
            // console.log(res);
            if (res.status == 0) {
              // this.stopStart = false;
              this.AccountNumber[index].status = 1;
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    // 启用
    Enable(id, index) {
      Dialog.confirm({
        title: "启用",
        message: "是否确定启用?"
      })
        .then(() => {
          this.$postRequest("/post/api/account/setStatus", {
            id: id
          }).then(res => {
            console.log(res);
            if (res.status == 0) {
              // this.stopStart = true;
              this.AccountNumber[index].status = 0;
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.getListStop();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    const that = this;
    that.shopId = that.$route.query.id;
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
.AccountManagement {
  margin-top: .2rem;
  .content {
    background: #fff;
    padding: 0 0.26rem 0.4rem;
    // margin-top: 0.2rem;
    .bold {
      font-weight: 700;
      font-size:14px;
      font-family:Microsoft YaHei;
      color:rgba(51,51,51,1);
    }
    .ivu-input-wrapper  {
      width: 2rem;
    }
    .tabs_title {
      div {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        align-items: center;
        p {
          padding: 0.16rem 0;
          font-size: 0.18rem;
          margin-right: 0.58rem;
          position: relative;
          cursor: pointer;
          em {
            width: 100%;
            height: 2px;
            background: #009688;
            position: absolute;
            bottom: 0;
            left: 0;
            opacity: 0;
          }
        }
        .active {
          color: #009688;
          em {
            opacity: 1;
          }
        }
      }
    }
    .tankingTime {
      .ivu-input-wrapper{
        width:2rem; 
      }
      span {
        position: absolute;
        right: 0;
        top: 0;
        width: 1.3rem;
        height: 0.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ff5722;
        color: #fff;
        i {
          font-style: normal;
        }
        a {
          color: #fff;
          margin-left: 0.1rem;
        }
      }
    }
    .list {
      table {
        tr {
          .operation {
            width: 2.4rem;
            div {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #666666;
              p {
                width: 1.1rem;
                a {
                  color: #666666;
                }
                .iconxiugai {
                  color: #009688;
                }
                .iconxiugaimima {
                  color: #ff5722;
                }
                i.iconquanxianshezhi {
                  color: #2d8cf0;
                }
              }
              .mask_left {
                width: 0.5rem;
                margin-right: 0.5rem;
                a {
                  color: #ec414d;
                }
              }
              .mask_qiyong {
                width: 0.5rem;
                margin-right: 0.5rem;
                a {
                  color: #009688;
                }
              }
            }
          }
        }
      }
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
  max-height: 400px;
  overflow-y: scroll;
}
.AccountManagement .el-dialog__body .content .el-form-item{
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 0 !important;
}
</style>