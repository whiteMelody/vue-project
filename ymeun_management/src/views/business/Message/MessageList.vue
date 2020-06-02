<template>
  <div class="MessageList">
    <header>消息管理</header>
    <div class="clear4"></div>
    <!-- 搜搜栏 -->
    <el-form :inline="true" :model="ObjData" class="search-form" slot="search" label-width="80px">
      <el-form-item>
        <el-date-picker v-model="timeValue" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-select v-model="ObjData.usersId" :clearable="true" placeholder="请选择发布人" class="mal10">
          <el-option v-for="item in ReceivePeopleList" :key="item.id" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="ObjData.device" :clearable="true" placeholder="全部接收对象" class="mal10">
          <el-option v-for="item in ReceiveList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" class="h32px bg-blue2" @click="SearchClick"></el-button>
      <el-button type="primary" @click="$router.push('/ReleaseMessage')">发布消息</el-button>
    </el-form>
    <!-- 消息列表 -->
    <template>
      <el-table :data="messageInfoList" stripe border style="width: 100%" v-loading="loading">
        <el-table-column align="center" label="序号" width="50" type="index" :index="indexMethod"></el-table-column>
        <el-table-column align="center" label="发布时间">
          <template slot-scope="scope">{{scope.row.created_at}}</template>
        </el-table-column>
        <el-table-column align="center" label="消息标题">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column align="center" label="消息内容">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" placement="top" :popper-class="popperClass">
              <div slot="content" v-html="scope.row.content"></div>
              <div class="center" v-html="scope.row.content"></div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="接受对象">
          <template slot-scope="scope">{{scope.row.device.label.label}}</template>
        </el-table-column>
        <el-table-column align="center" label="发布人">
          <template slot-scope="scope">{{scope.row.user.username}}</template>
        </el-table-column>
        <el-table-column align="center" width="100" label="操作">
          <template slot-scope="scope">
            <p class="color" @click="deleteClick(scope.row.id)">删除</p>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { MessageList,Publisher,DeleteMessage } from "@/assets/api/message/message";
export default {
  name: "MessageList",
  data() {
    return {
      currentPage:1,
      timeValue:'',
      ObjData:{
        start:1,
        perpage:99999,
        addTime:'',
        usersId:'',
        device:'',
      },
      popperClass:'widthClass',
      ReceivePeopleList:[],
      ReceiveList:[
        {label:"全部连锁",value:1},
        {label:"全部门店",value:2},
      ],
      messageInfoList:[],
      loading:false,
      enterIsShow:true,
    };
  },
  components: {},
  methods: {
    indexMethod(index) {
      return index + 1 * 1;
    },

    // 消息列表
    MessageInfo() {
      this.loading = true;
      MessageList(this.ObjData).then(res => {
        if (res.status == 0) {
          if (res.data.list.length) {
            res.data.list.map((item,index) => {
              item.isOpen = false;
              item.created_at = item.created_at.substring(0, item.created_at.length-3)
            });
          }
          this.messageInfoList = res.data.list;
          this.loading = false;
        }
      });
    },

    // 搜索
    SearchClick() {
      if (this.timeValue) {
        this.ObjData.addTime = this.timeData(this.timeValue);
      }else {
        this.ObjData.addTime = '';
      }
      this.MessageInfo();
    },
    timeData(date) {
      var d = new Date(date);
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    },

    // 发布人
    ReleasePeople() {
      Publisher().then(res => {
        if (res.status == 0) {
          this.ReceivePeopleList = res.data.list;
        }
      });
    },

    // 删除
    deleteClick(id) { 
      this.$confirm('确定删除消息吗', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        DeleteMessage({messageId:id}).then(res => {
          if (res.status == 0) {
            this.$message({
              message: '删除成功!',
              type: 'success',
              duration:'2000',
              onClose:() => {
                this.enterIsShow = true;
                this.MessageInfo();
              }
            });
          }else {
            this.$message({
              message: res.msg,
              type: 'success',
              duration:'2000',
            });
          }
        });
      }).catch(() => {});
    },

    deleteSubmit() {
      this.enterIsShow = false;
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.MessageInfo();
    this.ReleasePeople();
  },

  // 挂载前状态
  beforeMount() {
  },

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
.MessageList {
  background-color: #ffffff;
  padding: 0 0.2rem;
  padding-bottom: 0.2rem;
  margin: .2rem;
  header {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
  }
  .center {
    width: 90%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap:break-word; 
    word-break:break-all;
  }
}
</style>
<style>
  .widthClass {
    max-width: 60% !important;
  }
</style>