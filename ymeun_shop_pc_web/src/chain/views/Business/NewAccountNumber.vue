<template>
  <div class="NewAccountNumber">
    <header>新增账号</header>

    <div class="clear-f2"></div>

    <div class="main">
      <!-- 步骤 -->
      <div class="step">
        <div class="step_one">
          <div :class="DisplayHiding ? 'liActive' : 'li'">
            <div class="name">第一步</div>
            <div class="text">设置基本信息</div>
            <i class="iconfont iconrenshiguanli"></i>
          </div>
          <em></em>
          <div :class="!DisplayHiding ? 'liActive' : 'li'">
            <div class="name">第二步</div>
            <div class="text">设置账号权限</div>
            <i class="iconfont iconquanxian"></i>
          </div>
        </div>
      </div>
      <!-- 填写资料 -->
      <div class="wb45 center" v-if="DisplayHiding">
        <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">
            <div class="row">
                <div class="col">
                    <el-form-item label="姓名" prop="name">
                      <el-input type="text" v-model="form.name" placeholder="请输入姓名" clearable/>
                    </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="电话" prop="mobile">
                      <el-input type="text" v-model="form.mobile" placeholder="请输入电话" clearable/>
                    </el-form-item>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <el-form-item label="岗位" prop="post">
                      <el-input type="text" v-model="form.post" placeholder="请输入岗位" clearable/>
                    </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="账号">
                      <el-input type="text" v-model="form.username" placeholder="请输入账号" clearable readonly/>
                    </el-form-item>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="form.password" placeholder="请输入密码" clearable/>
                    </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="确认密码" prop="password_confirmation">
                      <el-input type="password" v-model="form.password_confirmation" placeholder="请确认密码" clearable/>
                    </el-form-item>
                </div>
            </div>
            <div class="btn">
              <el-button @click="clear">取消</el-button>
              <el-button type="primary" v-if="disabled" @click="next">下一步</el-button>
              <el-button type="primary" v-else disabled>提价中...</el-button>
            </div>
        </el-form>
      </div>
      <!-- 权限设置 -->
      <div class="Jurisdiction" v-else>
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

        <div class="btn">
          <el-button @click="clear">取消</el-button>
          <el-button type="primary" v-if="disabled" @click="newlyAdded">确认新增</el-button>
          <el-button type="primary" v-else disabled>提交中...</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postAdd , addJurisdiction , getUserName , getIndexBar } from "@/chain/assets/api/system/system";
export default {
  name: "NewAccountNumber",
  data() {
    return {
      DisplayHiding: true,
      disabled:true,
      form:{
        username:''
      },
      rules:{
        name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        mobile: [{ required: true, message: '请输入电话', trigger: 'change' }],
        post: [{ required: true, message: '请输入岗位', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }],
        password_confirmation: [{ required: true, message: '请确认密码', trigger: 'change' }],
      },
      permissionSetting: {
        data: [],
        checkAll: 2
      }
    };
  },
  components: {},
  methods: {
    // 取消
    clear() {
      this.$confirm('退出后资料将不会被保存,是否继续?' , '取消', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1);
      }).catch(() => {});
    },

    // 下一步
    next() {
      this.disabled = false;
      this.$refs.form.validate((valid) => {
        if (valid) {
          postAdd(this.form).then(res=>{
            if (res.status == 0) {
              this.DisplayHiding = false;
              this.disabled = true;
            }else if (res.status == 4001) {
              this.$message({
                message: res.msg,
                type: 'error',
              });
            }
          }).catch(error=>{
              console.log("postAdd no");
          })
        } else {
          this.$message({
            message: '请检查表单',
            type: 'error',
            duration:'1500',
          });
          this.disabled = true;
        }
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
      that.disabled = false;
      let postData = that.permissionSetting.data,
      postDataStr = [];
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
              this.$router.go(-1);
            }
          });
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
          that.disabled = true;
        }
      }).catch(error=>{
        console.log("addJurisdiction no");
      })
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    // 获取账号
    getUserName().then(res => {
      if (res.status == 0) {
        this.form.username = res.data;
      }
    }).catch(err => {
      console.log('getUserName  no');
    });

    // 获取权限
    getIndexBar().then(res => {
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
        this.permissionSetting.data  = arrs;
      }
    }).catch(err => {
      console.log('getIndexBar  no');
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
  margin: 20px;
  padding: 0 20px 20px 20px;
  background-color: #ffffff;
  height: 95%;
  overflow: hidden;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    .step {
      width: 2.25rem;
      height: 100%;
      border-right: 1px solid #e5e5e5;
      box-sizing: border-box;
      .step_one {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin: .9rem 0;
        text-align: right;
        .li {
          padding: 0 .6rem 0 0;
          height: .5rem;
          border-right: 2px solid #C0C0C0;
          line-height: .3rem;
          .name {
            margin-top: -.1rem;
            font-size: 16px;
            color: #666;
          }
          .text {
            font-size: 14px;
            color: #999;
          }
          .iconfont {
            font-size: 18px;
            color: #999;
          }
        }
        .liActive {
          padding: 0 .6rem 0 0;
          height: .5rem;
          border-right: 2px solid #009688;
          color: #009688;
          .name {
            margin-top: -.1rem;
            font-size: 16px;
            color: #009688;
          }
          .text {
            font-size: 14px;
            color: #333;
          }
          .iconfont {
            font-size: 18px;
            color: #009688;
          }
        }
        em {
          width:20px;
          height:1px;
          background:rgba(229,229,229,1);
          margin: 1.3rem .6rem 1.3rem 0;
        }
      }
    }
    
    .center{
      margin: .5rem auto 0;
      .row{
        display: flex;
        margin-bottom: 6px;
        .col{
          width: 50%;
        }
      }
      .btn{
        margin-top: .9rem;
        display: flex;
        justify-content: flex-end;
      }
    }

    // 权限设置
    .Jurisdiction {
      flex: 1;
      margin: .5rem 0 0 2.5rem;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      ul {
        // padding: 0.1rem 1.05rem 0;
        li {
          display: flex;
          align-items: flex-start;
          padding-bottom: .2rem;
          &:last-child {
            padding: 0;
          }
          a {
            color: #333333;
            font-size: 0.14rem;
            margin-right: .5rem;
          }
          p {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            flex: 1;
            span {
              display: flex;
              margin-right: .4rem;
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
                margin-left: .14rem;
                font-size: 0.14rem;
                font-weight: inherit;
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
          padding-top: 0.3rem;
          display: flex;
          align-items: center;
          a {
            width: 1.05rem;
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
              margin-left: .14rem;
              font-size: 0.14rem;
              font-weight: inherit;
              color: #666666;
            }
          }
        }
      }
      .btn{
        margin: .9rem .9rem 0 0;
        display: flex;
        justify-content: flex-end;
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