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
      <div class="w100px mal15 mar15 fl text-center myNav pointer" @click="$router.push({name: 'BookingSchedule' })">
        <i class="iconfont iconyuyue1 f16px mar5"></i>预约排期表
      </div>
      <div class="w40px h50px lh50px fl text-center fc-gray">|</div>
      <div class="w100px mal15 mar15 fl text-center myNav pointer" @click="$router.push({name: 'EmployeeSchedules' })">
        <i class="iconfont iconpaibanguanli f20px mar5"></i>员工排班表
      </div>

      <div class="h50px lh50px fr text-center f16px pointer myNav">
        <el-dropdown trigger="click" @command="handleCommand" @visible-change="userMessageShowFn">
          <span class="el-dropdown-link">
            {{$store.getters.currentUser.name}}
            <i class="iconfont iconshangla-copy f20px" v-if="userMessageShow"></i>
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
        <el-dropdown trigger="click" @command="pageUrl" @visible-change="messageShowFn">
          <span class="el-dropdown-link">
            <i class="iconfont iconrenwu f20px">
            <el-badge is-dot class="el-dropdown-link" v-if="todayData > 0 || HistoryData > 0 || HistoryData > 0"></el-badge>
            </i>
            <i class="iconfont iconshangla-copy f20px" v-if="messageShow"></i>
            <i class="iconfont iconxiala f20px" v-else></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix" command="todayTaskList">
              今日任务
              <el-badge class="mark" :value="todayData" v-if="todayData > 0"/>
            </el-dropdown-item>
            <div class="pal10 par10 pat5 pab5">
              <div class="clear0 bd-t1 bd-gray"></div>
            </div>
            <el-dropdown-item class="clearfix" command="historyTaskList">
              历史任务
              <el-badge class="mark" :value="HistoryData" v-if="HistoryData > 0"/>
            </el-dropdown-item>
            <div class="pal10 par10 pat5 pab5">
              <div class="clear0 bd-t1 bd-gray"></div>
            </div>
            <el-dropdown-item class="clearfix" command="payAReturnVisit">
              回访列表
              <el-badge class="mark" :value="payAReturnVisitData" v-if="payAReturnVisitData > 0"/>
            </el-dropdown-item>
          </el-dropdown-menu>
          
        </el-dropdown>
      </div>
    </div>

    <!--   添加&修改大类弹窗   -->
    <el-dialog title="修改密码" :visible.sync="dialogEditPwd" width="400px">
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
import { logout } from "@/shop/assets/api/login/login";
import { getUnreadMessage } from "@/shop/assets/api/message/message";
import { getTodayTask } from "@/shop/assets/api/task/taskList";
import { membersPostEditPassWord } from "@/shop/assets/api/common/common";

export default {
  name: "appHeader",
  data() {
    return {
      dialogEditPwd: false,
      disabled: false,
      oldPassword: '',
      password: '',

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
        case 'todayTaskList':
          this.$router.push({  
              path: 'TaskList',   
              query: {  
                type:1
              }
          })
          break;
        case 'historyTaskList':
          this.$router.push({  
              path: 'TaskList',   
              query: {  
                type:2
              }
          })
          break;
        case 'payAReturnVisit':
          this.$router.push({  
              path: 'ReturnVisitList',   
              query: {  
                type:1
              }
          })
          break;
        default:
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

      if(this.oldPassword == this.password){
        this.$message({
          showClose: true,
          message:'密码不能与原密码相同',
          type: 'error',
        });
        return;
      }

      this.disabled = true

      membersPostEditPassWord({
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
      getTodayTask().then(res => {
        if (res.status == 0) {
          this.todayData = res.data.todayTaskCount;
          this.HistoryData = res.data.dailyTaskCount;
          this.payAReturnVisitData = res.data.dailyReviewCount;
        }
      }).catch(error=>{
        console.log("getTodayTask no");
      })
    }
  },

  // 创建完毕状态
  created() {
    this.MessageData();
    this.TodayTask();
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
