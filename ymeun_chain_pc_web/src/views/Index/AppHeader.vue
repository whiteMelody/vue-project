<template>
  <div class="wb100 h50px lh50px f16px bd-gray bd-b1 appHeader">

    <div class="pal20 par20 fc-gray4">
      <div class="w30px mal10 mar10 fl text-center myNav pointer" @click="prev" title="后退">
        <i class="iconfont iconleft f25px"></i>
      </div>
      <div class="w30px mal10 mar10 fl text-center myNav pointer" @click="next" title="前进">
        <i class="iconfont iconright f25px"></i>
      </div>
      <div class="w30px mal10 mar10 fl text-center myNav pointer" @click="reload" title="刷新">
        <i class="iconfont iconshuaxin f20px"></i>
      </div>
   

      <div class="h50px lh50px fr text-center f16px pointer myNav">
        <el-dropdown trigger="click" @command="handleCommand" @visible-change="userMessageShowFn">
          <span class="el-dropdown-link f16px">
            {{$store.getters.currentUser.name}}
            <i class="iconfont iconshouqi f20px" v-if="userMessageShow"></i>
            <i class="iconfont iconxiala f20px" v-else></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="w50px h50px lh50px fr text-center mal20 mar20 pointer myNav" title="通知">
        <i class="iconfont iconxiaoxi f20px" @click="$router.push({name:'MessageList'})">
          <el-badge v-show="$store.getters.messageCount > 0" class="mark" :value="$store.getters.messageCount"/>
        </i>
      </div>
      <div class="w50px h50px lh50px fr text-center pointer myNav" title="任务">
        <span class="el-dropdown-link">
          <i class="iconfont iconrenwu f20px" @click="$router.push({name:'TaskList'})">
            <el-badge is-dot class="el-dropdown-link" v-if="todayData > 0"></el-badge>
          </i>
        </span>
      </div>

     <!-- <div class="w50px h50px lh50px fr text-center pointer myNav" title="任务">
       <el-dropdown trigger="click" @command="pageUrl" @visible-change="messageShowFn">
         <span class="el-dropdown-link">
           <i class="iconfont iconrenwu f20px">
           <el-badge is-dot class="el-dropdown-link" v-if="todayData > 0"></el-badge>
           </i>
           <i class="iconfont iconshouqi f20px" v-if="messageShow"></i>
           <i class="iconfont iconxiala f20px" v-else></i>
         </span>
         <el-dropdown-menu slot="dropdown">
           <el-dropdown-item class="clearfix" command="TaskList">
             任务列表
             <el-badge class="mark" :value="todayData" v-if="todayData > 0"/>
           </el-dropdown-item>
     
         </el-dropdown-menu>
        
       </el-dropdown>
     </div> -->

    </div>

    <!--   添加&修改大类弹窗   -->
    <el-dialog title="修改密码" :visible.sync="dialogEditPwd" width="400px">
      <el-form>
        <el-form-item label>
          <el-input v-model="oldPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="password" placeholder="请确认密码"></el-input>
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
import { getUnreadMessage } from "@/assets/api/message/message";
import { editPassword, logout, getUserInfo } from "@/assets/api/common/common";
import { taskListChain  } from "../../assets/api/task/task"

export default {
  name: "appHeader",
  data() {
    return {
      dialogEditPwd: false,
      disabled: false,
      oldPassword: '',
      password: '',
      userInfo: {},

      total: "",
      totalIsShow: true,
      todayData:'',
      HistoryData:"",
      payAReturnVisitData:'',
      messageShow:false,
      userMessageShow:false,
    };
  },
  mounted() {
    // console.log(this.$router)
  },
  methods: {
    userMessageShowFn(v){
      this.userMessageShow = v
    },
    messageShowFn(v){
      this.messageShow = v
    },
    prev() {
      this.$router.go(-1);
    },
    next() {
      this.$router.go(1);
    },
    reload() {
      window.location.reload();
    },
    pageUrl(command) {
      switch (command) {
        case 'TaskList':
          this.$router.push({  
              path: 'TaskList',   
          })
          break;
      }
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

      if(this.oldPassword != this.password){
        this.$message({
          showClose: true,
          message:'密码与重复密码不同',
          type: 'error',
        });
        return;
      }

      this.disabled = true

      editPassword({
        password_confirmation: this.oldPassword,
        password: this.password,
        id: this.userInfo.users_id,
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
          localStorage.removeItem("getToken");
          window.location.href = "/Login";
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

    MessageData() {

      getUnreadMessage().then(res => {
        if (res.status == 0) {
          this.$store.commit('SET_MESSAGE_COUNT', res.data.total)
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        console.log("getUnreadMessage no");
      })

    },
    TodayTask() {
      taskListChain({getCount:1}).then(res => {
        if (res.status == 0) {
          this.todayData = res.data;
        }
      }).catch(error=>{
        console.log("taskListChain no");
      })
    }
  },

  // 创建完毕状态
  created() {
    this.MessageData();
    this.TodayTask()

    getUserInfo().then(res=>{

      if(res.status == 0){
        this.userInfo = res.data

        if(res.data.firstlogin == 1){
          this.oldPassword = ''
          this.password = ''
          this.dialogEditPwd = true
          this.$postRequest("/post/api/members/memberFirstLogin").then(res => {
          })
        }
      }
    })


  }
};
</script>

<style>
.appHeader .el-badge__content.is-dot {
  margin-left: -5px;
}
.appHeader .myNav {
  border-top: 2px solid #fff;
  height: 48px;
  line-height: 48px;
}
.appHeader .myNav:hover {
  border-top: 2px solid #16181d;
  height: 48px;
  line-height: 48px;
}
</style>
