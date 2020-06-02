<template>
  <div class="wb100 h50px lh50px f16px bd-gray bd-b1 appHeader bg-blue fixed" style="top: 0; left: 0; z-index: 9">

    <div class="pal27 par27">
      <img src="@/assets/img/logo2.png" style="width: 106px" class="mat12  fl">

      <div class="icons fl pal40">
        <i class="el-icon-arrow-left f18px fc-white pointer" @click="prev"></i>
        <i class="el-icon-arrow-right f18px fc-white pointer" @click="next"></i>
        <i class="el-icon-refresh-right f18px fc-white pointer" @click="reload"></i>
      </div>

      <div class="h50px lh50px fr text-center f16px pointer myNav fc-white">
        <el-dropdown trigger="click" @command="handleCommand" @visible-change="userMessageShowFn">
          <span class="el-dropdown-link">
            <span class="fc-white">
              <img src="@/assets/img/icon-head.png" class="mat10 fl mar10">
              {{$store.getters.currentUser.username}}
              <i class="iconfont iconshangla-copy f20px" v-if="userMessageShow"></i>
              <i class="iconfont iconxiala f20px" v-else></i>
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
<!--            <el-dropdown-item command="editPwd">修改密码</el-dropdown-item>-->
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>


    <!--   添加&修改大类弹窗   -->
    <el-dialog title="修改密码" :visible.sync="dialogEditPwd" width="400px" style="z-index: 99999">
      <el-form>
        <el-form-item label>
          <el-input v-model="oldPassword" placeholder="请输入原始密码"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditPwd = false">取 消</el-button>
        <template v-if="disabled">
          <el-button type="primary" disabled>保存中...</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="editPwd">确 定</el-button>
        </template>
      </div>
    </el-dialog>

  </div>
</template>

<script>

    import { logout, save } from  "@/assets/api/home/home"

export default {
  name: "appHeader",
  data() {
    return {

      dialogEditPwd: false,
      disabled: false,
      oldPassword: '',
      password: '',

      userMessageShow:false,
    };
  },
  mounted() {
  },
  methods: {

    prev() {
      this.$router.go(-1);
    },
    next() {
      this.$router.go(1);
    },
    reload() {
      window.location.reload();
    },
    userMessageShowFn(v){
      this.userMessageShow = v
    },

    handleCommand(command) {
      if(command == 'logout'){
        this.myLogout()
      }else{
        //修改密码
        this.oldPassword = ''
        this.password = ''
        this.dialogEditPwd = true
      }
    },

    editPwd(){

      if(this.$base.isNull(this.oldPassword) || this.$base.isNull(this.password)){
        this.$message({
          showClose: true,
          message:'密码必填',
          type: 'error',
        });
        return
      }

      if(this.oldPassword == this.password){
        this.$message({
          showClose: true,
          message:'密码不能与原密码相同',
          type: 'error',
        });
        return;
      }

      this.disabled = true
        save({
        oldPassword: this.oldPassword,
        password: this.password,
        memberId: this.$store.getters.currentUser.users_id
      }).then(res=>{
        if(res.status == 0){
          this.$message({
            showClose: true,
            message:'密码修改成功',
            type: 'success',
          });
          this.dialogEditPwd = false
          this.disabled = false
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
          this.disabled = false
        }
      }).catch(error=>{
        console.log("membersPostEditPassWord no");
        this.disabled = false
      })
    },

    myLogout() {
      logout().then(res => {
        if (res.status == 0) {
          localStorage.removeItem("webToken");
          window.location.href = "/#/Login";
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        console.log("logout no");
      })
    },
  },
  created() {
  }
};
</script>

<style scoped lang="scss">
.icons{
  display: flex;
  align-items: center;
  height: 50px;
  i{
    width: 50px;
    text-align: center;
  }
}
</style>
