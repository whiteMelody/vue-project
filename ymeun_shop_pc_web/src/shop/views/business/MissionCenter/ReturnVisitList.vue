<template>
  <div class="ReturnVisitList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>回访列表</header>
    <el-alert :title="'如果回访人和客户归属不一样，说明这次客户上门分诊到该回访人'" type="info" style="border-left: 2px solid #999999; border-radius: 0;">
    </el-alert>

    <div class="listBox">
      <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" :isAutoLoad="true">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
          <el-form-item>
            <auto-search-client @changed="myChanged" ref='autoSearch'></auto-search-client>
          </el-form-item>

          <el-form-item label>
            <date-slot :dateTime.sync="dateTime"></date-slot>
          </el-form-item>

          <!-- 全部员工 -->
          <el-form-item>
            <el-select v-model="condition.usersId" placeholder="选择员工" readonly clearable :disabled="roleChoosable">
              <el-option :key="''" :value="''" label="全部员工"></el-option>
              <el-option v-for="item in $store.getters.roleListMap" :key="item.key" :label="item.value" :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 全部状态 -->
          <el-form-item>
            <el-select v-model="condition.status" placeholder="选择状态" @change="changed(condition.status)" readonly clearable>
              <el-option v-for="[key,val] in _dictReturnType" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>


          <!-- 未完成时间输入框 -->
          <el-form-item v-show="InputIsShow">
            <el-input v-model="condition.day" placeholder="请输入天数"></el-input>
          </el-form-item>


          <!-- 全部类别 -->
          <el-form-item>
            <el-select v-model="condition.type" placeholder="全部类型" readonly clearable>
              <el-option label="全部类型" value=""></el-option>
              <el-option v-for="[key,val] in _dictTypesOfVisitsType" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>

          <el-button class="h32px" @click="clear">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border>
          <el-table-column prop="status" align="center" label="状态">
            <template slot-scope="scope">
              <div class="list_status">
                <span :class="scope.row.status.value == 0 ? 'colorCheng ' : 'colorGrreng'">
                  {{scope.row.status.label}}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="review_time" align="center" label="回访时间">
            <template slot-scope="scope">{{ scope.row.review_time }}</template>
          </el-table-column>
          <el-table-column prop="type" align="center" label="回访类别">
            <template slot-scope="scope">{{ scope.row.type.label }}</template>
          </el-table-column>
          <el-table-column prop="customer_name" align="center" label="客户姓名">
            <template slot-scope="scope">
              <el-link :underline="false"  @click="$router.push({name: 'ClientDel',query:{ id: scope.row.customer_id, types:'5'}})">
                {{ scope.row.customer_name }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="channel" align="center" label="到诊渠道">
            <template slot-scope="scope">{{ scope.row.channel }}</template>
          </el-table-column>
          <el-table-column prop="across" align="center" label="跨店客户">
            <template slot-scope="scope">{{ scope.row.across }}</template>
          </el-table-column>
          <el-table-column prop="customer_mobile" align="center" label="电话">
            <template slot-scope="scope">{{ scope.row.customer_mobile }}</template>
          </el-table-column>
          <el-table-column prop="member" align="center" label="回访人">
            <template slot-scope="scope">{{ scope.row.member.name }}</template>
          </el-table-column>
          <el-table-column prop="adviser" align="center" :label="'所属'+$store.getters.roleName.adviser">
            <template slot-scope="scope">{{ scope.row.adviser.name }}</template>
          </el-table-column>
          <el-table-column prop="complete_time" align="center" label="回访完成时间">
            <template slot-scope="scope">{{ scope.row.complete_time }}</template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="box" v-if="scope.row.wait == 1">
                <p class="buttonStyle_class" @click="handleDialogFormOpen(scope.row.status.value,scope.row.id,scope.row.customer_id,scope.row.type.value,scope.row.remarks ,scope.row.type.across,scope.row.target)">
                  {{!scope.row.status.value ? '填写回访' : '查看回访'}}
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>

    <!-- 填写回访内容:弹窗 -->
    <el-dialog :visible.sync="centerDialogVisible1" width="40%" :show-close="false">
      <div class="MagessBox">
        <div class="title">
          <span>填写回访内容</span>
          <i class="iconfont iconguanbi1" @click="CancelClick"></i>
        </div>
        <div class="infoBox">
          <div class="name">
            <div class="fullName">
              {{customerData.name}}
              <span
                class="iconfont iconnan"
                v-if="customerData.sex.value == 1"
              ></span>
              <span class="iconfont iconnv" v-else-if="customerData.sex.value == 0"></span>
            </div>
            <div class="mobile">电话：{{customerData.mobile}}</div>
            <div class="age">
              年龄：{{customerData.GetAge}}
              <span v-show="customerData.GetAge != ''">岁</span>
            </div>
          </div>

          <div class="input">
            <textarea placeholder="请输入回访说明..." v-model="textData" v-if="isTextarea"></textarea>
            <div class="huifang" v-else>{{ReturnNoteText}}</div>
          </div>

          <div class="ReturnLIst" v-if="ReturnTarget">
            <div class="ReturnLIst_title">
              <span>回访备注</span>
            </div>
            <ul>
              <li>
                <div class="text">{{ReturnTarget}}</div>
              </li>
            </ul>
          </div>

          <div class="ReturnLIst">
            <div class="ReturnLIst_title" v-if="CustomerHistoryList.length">
              <span>历史回访信息（显示最近5条）</span>
              <i v-if="ReturnLIstIsShow" class="iconfont iconshouqi" @click="OpenClick"></i>
              <i v-else class="iconfont iconxiala1" @click="OpenClick"></i>
            </div>
            <div class="ReturnLIst_title" v-else>
              <span>暂无历史回访记录</span>
            </div>
            <ul v-show="ReturnLIstIsShow">
              <li v-for="(item, index) in CustomerHistoryList" :key="index">
                <div class="time">{{item.time}}</div>
                <div class="text">{{item.remarks}}</div>
              </li>
            </ul>
          </div>

          <div class="buttom">
            <el-button
              @click="CancelClick"
              v-show="isTextarea"
            >&nbsp;&nbsp;&nbsp;取&nbsp;消&nbsp;&nbsp;&nbsp;</el-button>
            <template v-if="disabled">
              <el-button type="primary" disabled>提交中...</el-button>
            </template>
            <template v-else>
              <el-button type="primary" @click="SubmitClick">{{submitText}}</el-button>
            </template>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getReturnVisit,
  getCustomerInfo,
  getCustomerHistory,
  getReturnVisitContent
} from "@/shop/assets/api/task/taskList";

//日期范围组件
import dateSlot from "@/shop/components/date/dateSlot";

//自动查询客户组件
import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient";
export default {
  name: "ReturnVisitList",
  data() {
    return {
      boxMaxHeight:"",
      isTextarea: false,
      disabled: false,
      submitText: "",
      ReturnNoteText: "",
      // 回访ID
      ReturnVisitID: "",
      // 回访类型
      ReturnVisitType: "",
      // 客户ID
      customerID: "",
      // 客户信息
      customerData: { sex: { value: "" } },
      centerDialogVisible1: false,
      CustomerHistoryList: [],
      ReturnTarget: '',
      ReturnLIstIsShow: false,
      textData: "",
      condition: {
        status: "0",
        usersId:"",
        day:''
      },
      dateTime: [
      ],
      roleChoosable:false,
      thisTime:'',
      // 查询条件
      demoList: [],
      pageSearch: getReturnVisit, // 分页查询api接口
      InputIsShow:false
    };
  },
  components: {
    dateSlot,
    autoSearchClient
  },
  methods: {
    changed(status) {
      if (status == 2) {
        this.InputIsShow = true;
      }else {
        this.condition.day = '';
        this.InputIsShow = false;
      }
    },
    myChanged(data){
      this.condition.data = data.kw
    },
    // 填写查看回访
    handleDialogFormOpen(type, id, customer_id, ReturnType, ReturnText,shopType,target) {
      this.textData = "";
      this.ReturnVisitID = id;
      this.customerID = customer_id;
      this.ReturnVisitType = ReturnType;
      this.ReturnNoteText = ReturnText;
      this.ReturnTarget = target;
      if(shopType == "本店"){
        this.customerDataList(0);
      }else{
        this.customerDataList(1);
      }
      this.CustomerHistoryDataList();
      // 0:未完成     1:已完成
      if (type == 0) {
        this.isTextarea = true;
        this.submitText = "提交回访";
      } else {
        this.isTextarea = false;
        this.submitText = "确定";
      }
      this.centerDialogVisible1 = true;
    },
    // 展开/收起
    OpenClick() {
      this.ReturnLIstIsShow = !this.ReturnLIstIsShow;
    },
    clear(){
      this.condition.startTime ="";
      this.condition.endTime ="";
      this.condition.status ="";
      this.condition.type ="";
      this.dateTime = ['','']
      this.$refs.autoSearch.setInitValue('')
      // this.loadData()
    },
    // 取消
    CancelClick() {
      this.centerDialogVisible1 = false;
      this.ReturnLIstIsShow = false;
    },
    // 提交
    SubmitClick() {
      if (this.submitText == "确定") {
        this.CancelClick();
      } else {
        if (this.textData) {
          let dataList = {
            remarks: this.textData,
            reviewId: this.ReturnVisitID
          };
          this.disabled = true
          getReturnVisitContent(dataList).then(res => {
            if (res.status == 0) {
              this.$message({
                message: "填写成功!",
                type: "success",
                onClose: () => {
                  this.CancelClick();
                  this.loadData();
                  this.disabled = false
                }
              });
            }else{
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error',
              });
              this.disabled = false
            }
          }).catch(error=>{
            this.$message({
              showClose: true,
              message: error,
              type: 'error',
            });
            this.disabled = false
          })
        } else {
          this.$message({
            message: "请填写回访说明!",
            type: "error"
          });
        }
      }
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //判断任务显示时间
    getDateList(){
      let type = this.$route.query.type
      let usersId = JSON.parse(localStorage.getItem('CURRENT_USER'))
      if(usersId.role_id == 2 || usersId.role_id == 5 || usersId.role_id == 6){
        this.roleChoosable = false;
      }else{
        this.roleChoosable = true;
      }
      if(type)
      {
        if(type == 1){
          this.condition = {status: "2",startTime: "",endTime: "",usersId:usersId.users_id};
          this.dateTime = [" "," "];
        }
      }
      else
      {
        if(usersId.role_id == 2 || usersId.role_id == 5 || usersId.role_id == 6){
          this.condition = {
            startTime: this.$base.getDateScope(0).startTime,
            endTime: this.$base.getDateScope(0).endTime,
            // usersId:usersId.users_id
            usersId:""
          };
          this.dateTime = [
            this.$base.getDateScope(0).startTime,
            this.$base.getDateScope(0).endTime
          ];
        }else{this.condition = {
          startTime: this.$base.getDateScope(0).startTime,
          endTime: this.$base.getDateScope(0).endTime,
          usersId:usersId.users_id
          // usersId:""
        };
          this.dateTime = [
            this.$base.getDateScope(0).startTime,
            this.$base.getDateScope(0).endTime
          ];
        }


      }
    },
    // 客户信息
    customerDataList(shopType) {
      getCustomerInfo({ customerId: this.customerID , crossStore:shopType }).then(res => {
        if (res.status == 0) {
          if (res.data.birthday != null) {
            res.data.GetAge = this.$base.jsGetAge(res.data.birthday);
          } else {
            res.data.GetAge = "";
          }
          this.customerData = res.data;
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        this.$message({
          showClose: true,
          message: error,
          type: 'error',
        });
      })
    },

    // 客户历史回访
    CustomerHistoryDataList() {
      let data = {
        customerId: this.customerID,
        type: this.ReturnVisitType,
        reviewId: this.ReturnVisitID
      };
      getCustomerHistory(data).then(res => {
        if (res.status == 0) {
          this.CustomerHistoryList = res.data.reviewData;
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        this.$message({
          showClose: true,
          message: error,
          type: 'error',
        });
      })
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.getDateList()
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
  },
  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {},

  // 侦听器
  watch: {
    dateTime(c, o) {
      this.condition.startTime = c[0];
      this.condition.endTime = c[1];
    },
    $route(to,from){
      window.history.go(0)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./ReturnVisitList.scss";
</style>


    
