<template>
  <div class="clientTask" :style="'min-height: '+boxMaxHeight+'px;'">
    <div class="listBox">
      <base-list
        ref="demoTable"
        :condition="condition"
        :datas.sync="demoList"
        :pageSearch="pageSearch"
        :isPaging="true"
        :isAutoLoad="true"
      >
        <el-form
          :inline="true"
          :model="condition"
          class="search-form"
          slot="search"
          label-width="80px"
        >
          <el-form-item>
            <!--            <el-select v-model="condition.usersId" placeholder="选择员工" readonly clearable>-->
            <el-select
              v-model="condition.usersId"
              placeholder="选择员工"
              readonly
              clearable
              :disabled="roleChoosable"
            >
              <el-option :key="''" :value="''" label="全部员工"></el-option>
              <el-option
                v-for="item in $store.getters.roleListMap"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="condition.status" placeholder="选择状态" readonly clearable>
              <el-option v-for="[key,val] in _dictTaskType" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label>
            <date-slot :dateTime.sync="dateTime"></date-slot>
          </el-form-item>

          <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border>
          <el-table-column prop="title" align="center" label="标题">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>

          <el-table-column prop="status" align="center" label="状态">
            <template slot-scope="scope">
              <div class="list_status">
                <span
                  :class="scope.row.status.value == 0 ? 'colorCheng ' : 'colorGrreng'"
                >{{scope.row.status.label}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="time" align="center" label="时间">
            <template slot-scope="scope">{{ scope.row.time }}</template>
          </el-table-column>
          <el-table-column prop="userName" align="center" label="员工">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <!-- 1:预约时间到,确认通知 2:完善资料 3:完善咨询详情 7:未完成原因 8:完善私密档案 11:铺垫任务-->
            <template slot-scope="scope">
              <div class="buttomBox">
                <p
                  class="buttonStyle_class"
                  v-show="scope.row.type == 0 && scope.row.status.value == 0"
                  @click="fillInClick(scope.row.type,scope.row.customer_id,scope.row.id,scope.row.appointment_id)"
                >查看任务</p>
                <p
                  class="buttonStyle"
                  v-show="scope.row.type == 0 && scope.row.status.value == 1"
                >已查看</p>
                <p
                  class="buttonStyle_class"
                  v-show="scope.row.type == 1 && scope.row.status.value == 0"
                  @click="confirmClick(scope.row.appointment_id)"
                >确认通知</p>

                <p
                  class="buttonStyle"
                  v-show="scope.row.type == 1 && scope.row.status.value == 1"
                >已通知</p>

                <p
                  class="buttonStyle_class"
                  v-if="scope.row.type == 11 && scope.row.status.value == 0"
                  @click="fillInClick(scope.row.type,scope.row.customer_id,scope.row.id,scope.row.appointment_id)"
                >填写</p>
                <p
                  class="buttonStyle"
                  v-if="scope.row.type == 11 && scope.row.status.value == 1"
                >已填写</p>

                <template v-if="allowed == 0">
                  <p
                    class="buttonStyle_class"
                    v-show="scope.row.type == 2 || scope.row.type == 3"
                    @click="fillInClick(scope.row.type,scope.row.customer_id,scope.row.id,scope.row.appointment_id)"
                  >{{scope.row.status.value == 0 ? '填写' : '修改'}}</p>
                </template>
                <template v-else>
                  <p
                    class="buttonStyle_class"
                    v-show="scope.row.type == 2 || scope.row.type == 3 || scope.row.type == 8"
                    @click="fillInClick(scope.row.type,scope.row.customer_id,scope.row.id,scope.row.appointment_id)"
                  >{{scope.row.status.value == 0 ? '填写' : '修改'}}</p>
                </template>
                <p
                  class="buttonStyle_class"
                  v-show="scope.row.type == 7 && scope.row.status.value == 0"
                  @click="RemarksClick(scope.row.id)"
                >备注原因</p>
                <p
                  class="buttonStyle"
                  v-show="scope.row.type == 7 && scope.row.status.value == 1"
                >已备注</p>
                <p
                  class="buttonStyle_class"
                  v-show="scope.row.type == 10"
                  @click="fillInClick(scope.row.type,scope.row.customer_id,scope.row.id,scope.row.appointment_id)"
                >{{scope.row.status.value == 0 ? '设置目标' : '修改'}}</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>

    <!-- 填写未成交原因 -->
    <el-dialog :visible.sync="centerDialogVisible" width="20%" :show-close="false">
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
            <template v-if="disabled">
              <el-button type="primary" disabled>提交中...</el-button>
            </template>
            <template v-else>
              <el-button type="primary" @click="SubmitClick">确定</el-button>
            </template>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 确认通知 -->
    <el-dialog :visible.sync="ConfirmationNotice" width="15%" :show-close="false">
      <div class="MagessBox">
        <div class="title">
          <span>提示</span>
          <i class="iconfont iconguanbi1" @click="CancelClick"></i>
        </div>
        <div class="infoBox">
          <div class="text">确认通知</div>
          <div class="buttom">
            <el-button @click="CancelClick">取消</el-button>
            <template v-if="disabled">
              <el-button type="primary" disabled>提交中...</el-button>
            </template>
            <template v-else>
              <el-button type="primary" @click="ConfirmationClick">确定</el-button>
            </template>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getProgramList } from "@/shop/assets/api/common/common";

import {
  getTaskList,
  getReasonsForNonTransaction,
  getmakeAnAppointment
} from "@/shop/assets/api/task/taskList";
//日期范围组件
import dateSlot from "@/shop/components/date/dateSlot";
export default {
  name: "clientTask",
  data() {
    return {
      boxMaxHeight: "",
      centerDialogVisible: false,
      ConfirmationNotice: false,
      disabled: false,
      textData: "",
      condition: {},
      dateTime: [],
      allowed: 0,

      // 查询条件
      demoList: [],
      pageSearch: getTaskList, // 分页查询api接口
      taskID: "",
      appointmentID: "",
      roleChoosable: false
    };
  },
  components: {
    dateSlot
  },
  methods: {
    // 取消
    CancelClick() {
      this.centerDialogVisible = false;
      this.ConfirmationNotice = false;
    },
    // 提交未成交原因
    SubmitClick() {
      if (this.textData) {
        let data = {
          task_id: this.taskID,
          content: this.textData
        };
        this.disabled = true;
        getReasonsForNonTransaction(data)
          .then(res => {
            if (res.status == 0) {
              this.$message({
                message: "填写成功!",
                type: "success",
                onClose: () => {
                  this.CancelClick();
                  this.loadData();
                  this.disabled = false;
                }
              });
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error"
              });
              this.disabled = false;
            }
          })
          .catch(error => {
            this.$message({
              showClose: true,
              message: error,
              type: "error"
            });
            this.disabled = false;
          });
      } else {
        this.$message({
          message: "请填写未成交原因!",
          type: "error"
        });
        this.disabled = false;
      }
    },
    confirmClick(appointmentID) {
      this.appointmentID = appointmentID;
      this.ConfirmationNotice = true;
    },
    // 确认通知
    ConfirmationClick() {
      this.disabled = true;
      getmakeAnAppointment({ appointmentId: this.appointmentID })
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "确认通知成功!",
              type: "success",
              onClose: () => {
                this.CancelClick();
                this.loadData();
                this.disabled = false;
              }
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
            this.disabled = false;
          }
        })
        .catch(error => {
          console.log("getmakeAnAppointment no");
          this.disabled = false;
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
          query: {
            customerId: customerId,
            taskId: taskId,
            appointmentId: appointmentId
          }
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
      } else if (type == 11) {
        this.$router.push({
          name: "ForeshadowingFillIn",
          query: { taskId: taskId, customerId: customerId }
        });
      }
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //判断任务显示时间
    getDateList() {
      let type = this.$route.query.type;
      let usersId = JSON.parse(localStorage.getItem("CURRENT_USER"));
      if ( usersId.role_id == 2 ||  usersId.role_id == 5 || usersId.role_id == 6 ) {
        this.roleChoosable = false;
      } else {
        this.roleChoosable = true;
      }
      if (type) {
        if (type == 1) {
          this.condition = {
            status: "2",
            startTime: this.$base.getDateScope(1).startTime,
            endTime: this.$base.getDateScope(1).endTime,
            usersId: usersId.users_id,
            customerId: this.$route.query.id
          };
          this.dateTime = [
            this.$base.getDateScope(1).startTime,
            this.$base.getDateScope(1).endTime
          ];
        } else {
          this.condition = {
            status: "2",
            startTime: "",
            endTime: "",
            usersId: usersId.users_id,
            customerId: this.$route.query.id
          };
          this.dateTime = ["", ""];
        }
      } else {
        if (
          usersId.role_id == 2 ||
          usersId.role_id == 5 ||
          usersId.role_id == 6
        ) {
          this.roleChoosable = false;
          this.condition = {
            status: "0",
            startTime: this.$base.getDateScope(0).startTime,
            endTime: this.$base.getDateScope(0).endTime,
            // usersId:usersId.users_id
            usersId: "",
            customerId: this.$route.query.id
          };
          this.dateTime = [
            this.$base.getDateScope(0).startTime,
            this.$base.getDateScope(0).endTime
          ];
        } else {
          this.roleChoosable = true;
          this.condition = {
            status: "0",
            startTime: this.$base.getDateScope(0).startTime,
            endTime: this.$base.getDateScope(0).endTime,
            usersId: usersId.users_id,
            customerId: this.$route.query.id
          };
          this.dateTime = [
            this.$base.getDateScope(0).startTime,
            this.$base.getDateScope(0).endTime
          ];
        }
      }
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.getDateList();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;

    getProgramList().then(res => {
      if (res.status == 0) {
        if (res.data.list.smda.allowed == 0) {
          this.allowed = 0;
        } else {
          this.allowed = 1;
        }
      } else {
        this.allowed = 0;
      }
    });
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
    $route(to, from) {
      window.history.go(0);
    }
  }
};
</script>

<style lang="scss" scoped>
.clientTask {
  margin: 0.2rem 0.24rem;
  padding: 0 0.2rem;
  background-color: #fff;
  .listBox {
    padding: 0.2rem 0;
    .list_status {
      span {
        display: block;
        width: 0.8rem;
        text-align: center;
        line-height: 30px;
        margin: 0 auto;
        color: #fff;
        border-radius: 2px;
      }
      .colorGrreng {
        background: rgba(159, 219, 157, 1);
        border-radius: 2px;
      }
      .colorCheng {
        background: rgba(254, 183, 140, 1);
        border-radius: 2px;
      }
    }
    .buttomBox {
      p {
        cursor: pointer;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
      }
      .gray {
        color: #333333;
      }
      .LightGrey {
        color: #999999;
      }
    }
  }
  .MagessBox {
    .title {
      padding: 0 0.2rem;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 0.16rem;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .infoBox {
      padding: 0 0.2rem;

      .input {
        height: 50px;
        border: 1px solid #e5e5e5;
        padding: 0.14rem;
        overflow: hidden;

        textarea {
          width: 100%;
          height: 100%;
          border: none;
          font-size: 0.14rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }

      .buttom {
        padding: 0.2rem 0;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>