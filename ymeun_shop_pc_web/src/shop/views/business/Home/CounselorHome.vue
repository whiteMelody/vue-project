<template>
  <!-- 美容师 -->

  <div class="CounselorHome">
    <!-- <div class="card_data">
      <div class="titles">
        <div class="left">
          <div>
            <span>
              {{timeActiveIsShow ? timeActive : timeActive1}}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <ul>
              <li
                v-for="(item, index) in timeDataList"
                :key="index"
                @click="timeClick(item)"
              >{{item.time}}</li>
            </ul>
          </div>
          <em></em>
          <p @click="todayClick" :class="toDayIsShow ?'fc-gray2' : 'fc-gray4'">今日实时数据</p>
        </div>
        <a @click="ThisMonthClick" v-show="ThisMonthIsShow">回到本月</a>
      </div>

      <div class="card_list" v-loading="loading" v-if="!loading3">
        <div class="card_list_top">
          <Card type="0" height="150" :data="consumeHeadList"></Card>
          <Card type="0" height="150" :data="ConsumptionList"></Card>
          <Card type="0" height="150" :data="SaleList"></Card>
        </div>
        <div class="card_list_bottom">
          <Card type="0" height="150" :data="MakeABargainOne"></Card>
          <Card type="0" height="150" :data="MakeABargainTow"></Card>
        </div>
      </div>
    </div> -->


    <div class="shop_data">
      <div class="shop_data_left">
        <header>
          <div class="text">门店数据</div>
          <div class="titles_date" >
            <a @click="ThisMonthClick" v-show="ThisMonthIsShow">回到本月</a>
            <div>
              <span>
                {{timeActiveIsShow ? timeActive : timeActive1}}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <ul>
                <li
                  v-for="(item, index) in timeDataList"
                  :key="index"
                  @click="timeClick(item)"
                >{{item.time}}</li>
              </ul>
            </div>
            <em></em>
            <p @click="todayClick" :class="toDayIsShow ?'fc-gray2' : 'fc-gray4'">今日实时数据</p>
          </div>
        </header>

        <div class="shop_data_box">
          
          <div class="market box1">
            <div class="text1">销售业绩（元）</div> 
            <div class="number">{{SaleList.Total | _filterNumFormat}}</div> 
            <ul>
              <li>
                <span>成交人头（人）</span>
                <p>{{MakeABargainOne.Total}}</p>
              </li>
              <li>
                <span>成交人次（次）</span>
                <p>{{MakeABargainTow.Total}}</p>
              </li>
            </ul>
            <div class="icon"><img src="@/shop/assets/img/icon_a6.png" alt=""></div>
          </div>
          <div class="deduct box1">
            <div class="text1">划扣业绩（元）</div> 
            <!-- <div class="number">{{DeductionList.Total | _filterNumFormat}}</div>  -->
            <div class="number">--</div> 
            <ul>
              <li>
                <span>划扣人头（人）</span>
                <p>{{consumeHeadList.Total}}</p>
              </li>
              <li>
                <span>划扣人次（次）</span>
                <p>{{ConsumptionList.Total}}</p>
              </li>
            </ul>
            <div class="icon"><img src="@/shop/assets/img/icon_a5.png" alt=""></div>
          </div>
          <div class="reach_the_store">
            <ul>
              <li>
                <span>到店人次（次）</span>
                <p>{{totalData.appointmentStoreNumber}}</p>
              </li>
              <li>
                <span>预约人次（次）</span>
                <p>{{totalData.appointmentNumber}}</p>
              </li>
            </ul>
            <div class="reach_the_store_box">
              <div><el-progress type="circle" :percentage="totalData.rateTow" :width="120" :stroke-width="10" color="#009688"></el-progress></div>
              <div class="text">
                成交率
                <el-tooltip content="成交率=成交人次/到店人次；" placement="bottom-start" effect="light"> 
                  <i class="iconfont iconiconfontwenhao1 f14px pointer mal10" style="color:#EC414D;"></i> 
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="shop_data_right">
        <div class="shop_data_right_box">
          <div class="text">
            总未划扣金额（元）
            <el-tooltip content="总未划扣金额统计的是门店所有剩余划扣总金额，不随查询条件变化而变化；" placement="bottom-start" effect="light"> 
              <i class="iconfont iconiconfontwenhao1 f14px pointer" style="color:#EC414D;"></i> 
            </el-tooltip>
          </div>
          <div class="number">{{totlePrice | _filterNumFormat}}</div>
          <div class="check_the_details" @click="$router.push({name:'ConsumeDetails'})">查看明细>></div>
          <div class="icon"><img src="@/shop/assets/img/icon_a4.png" alt=""></div>
        </div>
      </div>

    </div>

    <div class="home_list_titles">
      <div class="titles">
        <p>
          <a>今日回访</a>
          <span>共计：{{huifangTotal.count}}（次）</span>
        </p>
        <div>
          <span
            @click="payAReturnVisitFn(2)"
            :class="{active : payAReturnVisitIndex == 2}"
          >未完成：{{huifangTotal.notFinish}}（次）</span>
          <em></em>
          <span
            @click="payAReturnVisitFn(1)"
            :class="{active : payAReturnVisitIndex == 1}"
          >已完成：{{huifangTotal.finish}}（次）</span>
        </div>
      </div>
      <div class="home_list_box" v-loading="loading1">
        <el-table slot="list" :data="huifangList" stripe border>
          <el-table-column prop="id" align="center" label="类型">
            <template slot-scope="scope">{{scope.row.type.label}}</template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="客户">
            <template slot-scope="scope">{{ scope.row.customer_name }}</template>
          </el-table-column>
          <el-table-column prop="mobile" align="center" label="电话">
            <template slot-scope="scope">{{ scope.row.customer_mobile }}</template>
          </el-table-column>
          <el-table-column prop="mobile" align="center" label="回访内容">
            <template slot-scope="scope">{{ scope.row.remarks }}</template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <p
                class="buttonStyle_class"
                @click="handleDialogFormOpen(scope.row.status.value,scope.row.id,scope.row.customer_id,scope.row.type.value,scope.row.remarks)"
              >{{scope.row.status.value == 0 ? '填写' : '查看'}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog :visible.sync="centerDialogVisible1" width="40%" :show-close="false">
        <div class="tianxieBox">
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
                <el-button type="primary" @click="SubmitClick1">{{submitText}}</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>

    <div class="home_list_titles">
      <div class="titles">
        <p>
          <a>今日任务</a>
          <span>共计：{{taskTotal.count}}（项）</span>
        </p>
        <div>
          <span
            :class="{active:payTaskIndex == 2}"
            @click="taskClick(2)"
          >未完成：{{taskTotal.notFinish}}（次）</span>
          <em></em>
          <span
            :class="{active:payTaskIndex == 1}"
            @click="taskClick(1)"
          >已完成：{{taskTotal.finish}}（次）</span>
        </div>
      </div>
      <div class="home_list_box" v-loading="loading2">
        <el-table slot="list" :data="taskList" stripe border>
          <el-table-column prop="id" align="center" label="序号" class="wb20">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="title" align="center" label="任务标题">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="buttomBox">
                <p
                  class="buttonStyle_class"
                  v-show="scope.row.type == 0 && scope.row.status.value == 0"
                  @click="fillInClick(scope.row.type,scope.row.customer_id,scope.row.id ,scope.row.appointment_id)"
                >查看任务</p>
                <p class="buttonStyle" v-show="scope.row.type == 0 && scope.row.status.value == 1">已查看</p>
                <p
                  class="buttonStyle_class"
                  v-show="scope.row.type == 1 && scope.row.status.value == 0"
                  @click="confirmClick(scope.row.appointment_id)"
                >确认通知</p>
                <p class="buttonStyle" v-show="scope.row.type == 1 && scope.row.status.value == 1">已通知</p>
                <p
                  class="buttonStyle_class"
                  v-show="scope.row.type == 2 || scope.row.type == 3 || scope.row.type == 8"
                  @click="fillInClick(scope.row.type,scope.row.customer_id,scope.row.id ,scope.row.appointment_id)"
                >{{scope.row.status.value == 0 ? '填写' : '修改'}}</p>
                <p
                  class="buttonStyle_class"
                  v-show="scope.row.type == 7 && scope.row.status.value == 0"
                  @click="RemarksClick(scope.row.id)"
                >备注原因</p>
                <p class="buttonStyle" v-show="scope.row.type == 7 && scope.row.status.value == 1">已备注</p>
                <p
                  class="buttonStyle_class"
                  v-show="scope.row.type == 10"
                  @click="fillInClick(scope.row.type,scope.row.customer_id,scope.row.id ,scope.row.appointment_id)"
                >{{scope.row.status.value == 0 ? '设置目标' : '修改'}}</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 填写未成交原因 -->
      <el-dialog :visible.sync="centerDialogVisible" width="20%" :show-close="false">
        <div class="tijiaoBox">
          <div class="MagessBox">
            <div class="title">
              <span>未成交原因</span>
              <i class="iconfont iconguanbi1" @click="CancelClick"></i>
            </div>
            <div class="infoBox">
              <div class="input">
                <textarea placeholder="请输入未成交原因..." v-model="textData"></textarea>
              </div>

              <div class="buttom">
                <el-button @click="CancelClick">取消</el-button>
                <el-button type="primary" @click="SubmitClick">确定</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- 确认通知 -->
      <el-dialog :visible.sync="ConfirmationNotice" width="15%" :show-close="false">
        <div class="tijiaoBox">
          <div class="MagessBox">
            <div class="title">
              <span>提示</span>
              <i class="iconfont iconguanbi1" @click="CancelClick"></i>
            </div>
            <div class="infoBox">
              <div class="text">确认通知</div>
              <div class="buttom">
                <el-button @click="CancelClick">取消</el-button>
                <el-button type="primary" @click="ConfirmationClick">确定</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Card from "../../../components/home/Card";

import { consumeSurplus } from "@/shop/assets/api/home/home";
import {
  getTargetList,
  getReturnVisitList,
  getTaskList
} from "@/shop/assets/api/home/home";
import {
  getReasonsForNonTransaction,
  getmakeAnAppointment
} from "@/shop/assets/api/task/taskList";
import {
  getCustomerHistory,
  getCustomerInfo,
  getReturnVisitContent
} from "@/shop/assets/api/task/taskList";
export default {
  name: "CounselorHome",
  data() {
    return {
      centerDialogVisible: false,
      ConfirmationNotice: false,
      centerDialogVisible1: false,
      CustomerHistoryList: [],
      ReturnLIstIsShow: false,
      textData: "",
      ReturnNoteText: "",
      isTextarea: false,
      submitText: "",
      // 客户信息
      customerData: { sex: { value: "" } },
      // 回访
      huifangList: [],
      huifangListwei: [],
      huifangListyi: [],
      huifangTotal: "",
      payAReturnVisitIndex: 2,

      // 任务
      taskList: [],
      taskListwei: [],
      taskListyi: [],
      taskTotal: "",
      payTaskIndex: 2,

      // 总数据
      consumeHeadList: [],
      ConsumptionList: [],
      SaleList: [],
      MakeABargainOne:[],
      MakeABargainTow:[],
      timeDataList: [],
      loading: false,
      loading1: false,
      loading2: false,
      loading3: true,
      timeActiveIsShow: true,
      timeActive: "",
      timeActive1: "",
      time: {
        // 开始时间
        startTime: "",
        // 结束时间
        endTime: ""
      },
      usersID: this.$store.getters.currentUser.users_id,
      toDayIsShow: true,
      ThisMonthIsShow: false,
      customerID:'',

      totalData:{},
      totlePrice: 0,

    };
  },
  components: {
    Card
  },
  watch: {},
  methods: {
    // 展开/收起
    OpenClick() {
      this.ReturnLIstIsShow = !this.ReturnLIstIsShow;
    },
    // 填写查看回访
    handleDialogFormOpen(type, id, customer_id, ReturnType, ReturnText) {
      this.textData = "";
      this.ReturnVisitID = id;
      this.customerID = customer_id;
      this.ReturnVisitType = ReturnType;
      this.ReturnNoteText = ReturnText;
      this.customerDataList();
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
    // 取消
    CancelClick() {
      this.centerDialogVisible = false;
      this.centerDialogVisible1 = false;
      this.ConfirmationNotice = false;
    },
    // 提交未成交原因
    SubmitClick() {
      if (this.textData) {
        let data = {
          task_id: this.taskID,
          content: this.textData
        };
        getReasonsForNonTransaction(data).then(res => {
          if (res.status == 0) {
            this.$message({
              message: "填写成功!",
              type: "success",
              onClose: () => {
                // this.CancelClick();
                // this.taskData();
                this.$router.go(0);
              }
            });
          } else {
            this.$message({
              message: "抱歉,出问题了呢!",
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          message: "请填写未成交原因!",
          type: "error"
        });
      }
    },

    // 提交
    SubmitClick1() {
      if (this.submitText == "确定") {
        this.CancelClick();
      } else {
        if (this.textData) {
          let dataList = {
            remarks: this.textData,
            reviewId: this.ReturnVisitID
          };
          getReturnVisitContent(dataList).then(res => {
            if (res.status == 0) {
              this.$message({
                message: "填写成功!",
                type: "success",
                onClose: () => {
                  // this.CancelClick();
                  // this.huifangData();
                  this.$router.go(0);
                }
              });
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
            console.log(res);
          });
        } else {
          this.$message({
            message: "请填写回访说明!",
            type: "error"
          });
        }
      }
    },
    confirmClick(appointmentID) {
      this.appointmentID = appointmentID;
      this.ConfirmationNotice = true;
    },
    // 确认通知
    ConfirmationClick() {
      getmakeAnAppointment({ appointmentId: this.appointmentID }).then(res => {
        if (res.status == 0) {
          this.$message({
            message: "确认通知成功!",
            type: "success",
            onClose: () => {
              // this.CancelClick();
              // this.huifangData();
              this.$router.go(0);
            }
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
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
        }
      });
    },
    RemarksClick(taskID) {
      this.textData = "";
      this.taskID = taskID;
      this.centerDialogVisible = true;
    },
    fillInClick(type, customerId, taskId, appointmentId) {
      if (type == 2) {
        this.$router.push({
          name: "ImprovingData",
          query: { customerId: customerId, taskId: taskId }
        });
      } else if (type == 3) {
        this.$router.push({
          name: "FillInAdvisory",
          query: { customerId: customerId, taskId: taskId ,appointmentId:appointmentId}
        });
      } else if (type == 8) {
        this.$router.push({
          name: "PrivateArchives",
          query: { customerId: customerId, taskId: taskId }
        });
      } else if (type == 0) {
        this.$router.push({
          name: "BookingSchedule"
        });
      } else if (type == 10) {
        this.$router.push({
          name: "SetTarget",
          query: { taskId: taskId }
        });
      }
    },

    // 客户信息
    customerDataList() {
      getCustomerInfo({ customerId: this.customerID,crossStore: 1 }).then(res => {
        if (res.status == 0) {
          if (res.data.birthday != null) {
            res.data.GetAge = this.$base.jsGetAge(res.data.birthday);
          } else {
            res.data.GetAge = "";
          }
          this.customerData = res.data;
        }
      });
    },
    payAReturnVisitFn(index) {
      this.payAReturnVisitIndex = index;
      if (index == 2) {
        this.huifangList = this.huifangListwei;
      } else {
        this.huifangList = this.huifangListyi;
      }
    },
    taskClick(index) {
      this.payTaskIndex = index;
      if (index == 2) {
        this.taskList = this.taskListwei;
      } else {
        this.taskList = this.taskListyi;
      }
    },

    huifangData() {
      this.loading1 = true;
      let huifangData = {
        startTime: this.$base.getDateScope(1).startTime,
        endTime: this.$base.getDateScope(1).endTime,
        usersId: this.usersID
      };
      getReturnVisitList(huifangData).then(res => {
        if (res.status == 0) {
          res.data.list.map((item, index) => {
            if (item.status.value == 0) {
              this.huifangListwei.push(item);
            } else if (item.status.value > 0) {
              this.huifangListyi.push(item);
            }
          });
          this.huifangList = this.huifangListwei;
          this.huifangTotal = res.data.analysis;
          this.loading1 = false;
        } else {
          this.$message({
            message: "抱歉,出问题了呢!",
            type: "error",
            onClose: () => {
              this.loading1 = false;
            }
          });
        }
      });
      this.$forceUpdate();
    },

    taskData() {
      this.loading2 = true;
      let taskDara1 = {
        startTime: this.$base.getDateScope(1).startTime,
        endTime: this.$base.getDateScope(1).endTime,
        usersId: this.usersID
      };
      getTaskList(taskDara1).then(res => {
        if (res.status == 0) {
          res.data.list.map((item, index) => {
            if (item.status.value == 0) {
              this.taskListwei.push(item);
            } else if (item.status.value > 0) {
              this.taskListyi.push(item);
            }
          });
          this.taskList = this.taskListwei;
          this.taskTotal = res.data.analysis;
          this.loading2 = false;
        } else {
          this.$message({
            message: "抱歉,出问题了呢!",
            type: "error",
            onClose: () => {
              this.loading2 = false;
            }
          });
        }
      });
      this.$forceUpdate();
    },

    ThisMonthClick() {
      this.time.startTime = this.$base.getDateScope(0).startTime;
      this.time.endTime = this.$base.getDateScope(0).endTime;
      this.timeActiveIsShow = true;
      this.ThisMonthIsShow = false;
      this.toDayIsShow = true;
      this.dataList();
    },

    todayClick() {
      this.time.startTime = this.$base.getDateScope(1).startTime;
      this.time.endTime = this.$base.getDateScope(1).endTime;
      this.timeActiveIsShow = true;
      this.toDayIsShow = false;
      this.ThisMonthIsShow = true;
      this.dataList();
    },

    timeClick(item) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      console.log(mydate);
      this.timeActive1 = item.time;
      if (item.time == mydate) {
        this.ThisMonthIsShow = false;
      } else {
        this.ThisMonthIsShow = true;
      }
      this.timeActive1 = item.time;
      this.timeActiveIsShow = false;
      this.time.startTime = item.startTime;
      this.time.endTime = item.endTime;
      this.dataList();
    },

    // 序号
    indexMethod(index) {
      return index + 1;
    },

    // 总览数据

    dataList() {
      this.loading = true;
      let timeData = {
        startTime: this.time.startTime,
        endTime: this.time.endTime
      };
      getTargetList(timeData).then(res => {
        if (res.status == 0) {
          let consumeHeadList = {};
          let ConsumptionList = {};
          let SaleList = {};
          let MakeABargainOne = {};
          let MakeABargainTow = {};

          consumeHeadList.title = "划扣人头（人）";
          consumeHeadList.target = "目标人头";
          consumeHeadList.text = "人";
          consumeHeadList.grayIsShow = false;
          consumeHeadList.Completed = res.data.total.target.consumeHead;
          consumeHeadList.Percentage =
            res.data.total.proportion.consumeHead + "%";
          consumeHeadList.Total = res.data.total.actual.consumeHead;

          ConsumptionList.title = "划扣人次（次）";
          ConsumptionList.target = "目标人次";
          ConsumptionList.text = "次";
          ConsumptionList.grayIsShow = false;
          ConsumptionList.Completed = res.data.total.target.consumeNumber;
          ConsumptionList.Percentage =
            res.data.total.proportion.consumeNumber + "%";
          ConsumptionList.Total = res.data.total.actual.consumeNumber;

          SaleList.title = "销售业绩（元）";
          SaleList.target = "目标业绩";
          SaleList.text = "元";
          SaleList.grayIsShow = false;
          SaleList.Completed = res.data.total.target.payment;
          SaleList.Percentage = res.data.total.proportion.payment + "%";
          SaleList.Total = res.data.total.actual.payment;

          MakeABargainOne.title = "成交人头（人）";
          MakeABargainOne.target = "目标业绩";
          MakeABargainOne.text = "人";
          MakeABargainOne.grayIsShow = false;
          MakeABargainOne.Completed = res.data.total.target.orderCustomer;
          MakeABargainOne.Percentage = res.data.total.proportion.orderCustomer + "%";
          MakeABargainOne.Total = res.data.total.actual.orderCustomer;

          MakeABargainTow.title = "成交人次（次）";
          MakeABargainTow.target = "目标业绩";
          MakeABargainTow.text = "次";
          MakeABargainTow.grayIsShow = false;
          MakeABargainTow.Completed = res.data.total.target.orderCustomerQuantity;
          MakeABargainTow.Percentage = res.data.total.proportion.orderCustomerQuantity + "%";
          MakeABargainTow.Total = res.data.total.actual.orderCustomerQuantity;


          this.consumeHeadList = consumeHeadList;
          this.ConsumptionList = ConsumptionList;
          this.SaleList = SaleList;
          this.MakeABargainOne = MakeABargainOne;
          this.MakeABargainTow = MakeABargainTow;
          this.timeDataList = res.data.total.date;
          this.timeActive = res.data.total.date[0].time;
          this.totalData = res.data.total.data;
          this.totalData.rateTow = parseFloat(res.data.total.data.rate);

          this.loading = false;
          this.loading3 = false;
        }
      });

      consumeSurplus().then(res=>{
        if(res.status == 0){
          this.totlePrice = res.data.count.price
        }
      })

    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.time.startTime = this.$base.getDateScope(0).startTime;
    this.time.endTime = this.$base.getDateScope(0).endTime;
    this.dataList();
    this.huifangData();
    this.taskData();
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
@import "./index.scss";
</style>