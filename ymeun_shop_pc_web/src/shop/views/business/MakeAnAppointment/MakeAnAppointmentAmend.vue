<template>
  <div class="MakeAnAppointmentAmend" :style="'min-height: '+minHeight+'px;'">
    <div class="titles">
      <span>{{pagesTitle}}</span>
    </div>
    <div class="box" :style="'min-height: '+boxMaxHeight+'px;'">
      <div class="box_titles">
        <div class="titles_box">
          <div class="name">
            <p class="pointer" @click="$router.push({name:'ClientDel',query:{id:initialData.customer_id,types:2}})">{{initialData.customer_name}}</p>
            <span>{{initialData.mobile}}</span>
          </div>
          <div class="status">
            <p>状态：</p>
            <span v-if="initialData.status == 0">未到店</span>
            <span v-else-if="initialData.status == 1">已到店</span>
            <span v-else-if="initialData.status == 2">已取消</span>
          </div>
          <div class="history_go" @click="$router.go(-1)">返回上一页</div>
        </div>
      </div>
      <div class="box_right">
        <div class="message_box">
          <div class="message">
            <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">
              <el-row :gutter="140">
                <el-col :span="24">
                  <el-form-item label="项目" class="wb60 fl">
                    <el-select
                      v-model="form.projectOne"
                      placeholder="请选择项目"
                      readonly
                      clearable
                      @change="form.projectTow = ''"
                    >
                      <!-- <el-option key label="全部项目" value></el-option> -->
                      <el-option
                        v-for="item in $store.getters.projectList1Map"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="projectTow"
                    v-if="form.projectOne"
                    v-model="form.projectTow"
                    label-width="0"
                    class="wb38 fr"
                  >
                    <el-select v-model="form.projectTow" placeholder="请选择下级项目" readonly clearable>
                      <el-option
                        v-for="item in $store.getters.projectList2Map(form.projectOne)"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="140">
                <el-col :span="24">
                  <el-form-item label="到店时间" prop="datetime">
                    <el-date-picker
                      v-model="form.datetime"
                      :clearable="false"
                      type="datetime"
                      class="wb100"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择日期时间"
                      @change="datetimeChange"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="140" class="row_box">
                <el-col :span="24">
                  <el-form-item :label="$store.getters.roleName.adviser" prop="counselor">
                    <el-select
                      v-model="form.counselor"
                      :placeholder="'请选择'+$store.getters.roleName.adviser"
                      readonly
                      clearable
                      class="wb100"
                      :disabled="roleChoosable"
                    >
                      <el-option
                        v-for="item in $store.getters.counselorMap"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="140" class="row_box">
                <el-col :span="24">
                  <el-form-item :label="$store.getters.roleName.technician" prop="technician">
                    <el-select
                      v-model="form.technician"
                      :placeholder="`请选择${$store.getters.roleName.technician}`"
                      readonly
                      clearable
                      class="wb100"
                      @change="technicianChange"
                    >
                      <el-option
                        v-for="item in $store.getters.cosmetologistMap"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="140" v-if="form.technician">
                <el-col :span="24">
                  <el-form-item label="治疗时长" prop="duration">
                    <el-input
                      type="number"
                      min="1"
                      v-model.trim="form.duration"
                      placeholder="请输入治疗时长"
                    >
                      <template slot="append">分钟</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注" prop="remark">
                    <el-input
                      type="textarea"
                      v-model.trim="form.remark"
                      placeholder="请输入备注"
                      clearable
                      rows="8"
                      class="lh40px"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="clear4"></div>
              <div class="btn fr mal20">
                <template v-if="disabled">
                  <el-button type="primary" disabled>保存中...</el-button>
                </template>
                <template v-else>
                  <el-button type="primary" @click="handleSubmit">保存修改</el-button>
                </template>
              </div>
              <!-- <div class="btn fr">
                <el-button @click="cancelFn">取消预约</el-button>
              </div> -->
            </el-form>
          </div>

          <div class="timer">
            <Schedule :scheduleData="scheduleData" v-show="form.technician && form.datetime"></Schedule>
          </div>
        </div>
      </div>
    </div>

    <!-- 取消预约 -->
    <div class="cancel_box">
      <el-dialog title="取消原因" width="20%" :visible.sync="cancelPop" @closed="closelPop">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="cancelText">
            <el-input
              type="textarea"
              placeholder="请输入取消原因..."
              v-model="form.cancelText"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelPop = false;form.cancelText = ''">取 消</el-button>
            <el-button type="primary" disabled v-if="disabled">提交中...</el-button>
          <el-button type="primary" @click="cancelConfirmBtnFn" v-else>确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { PUBLIC_PHONE } from "@/shop/utils/Reg";
import Schedule from "@/shop/components/home/Schedule";
import {
  appointmentGetInformation,
  appointmentOccupy,
  appointmentPostEdit,
  appointmentCancel
} from "@/shop/assets/api/flow/makeAnAppointmentList";

  import { getProject } from "@/shop/assets/api/common/common"

export default {
  name: "MakeAnAppointmentAmend",
  data() {
    return {
      roleChoosable: false,
      disabled: false,
      loading: true,
      appointmentId: "",
      initialData: {},
      scheduleData: [],
      pagesTitle: "修改预约",
      minHeight: 0,
      boxMaxHeight: 0,
      cancelPop: false,
      search: "",
      form: {
        projectOne: "",
        projectTow: "",
        datetime: "",
        counselor: "",
        technician: "",
        duration: "",
        remark: "",
        cancelText: ""
      },
      rules: {
        datetime: [
          { required: true, message: "请选择到店时间", trigger: "change" }
        ],
        projectTow: [
          { required: true, message: "请选择完整项目", trigger: "change" }
        ],
        counselor: [
          { required: true, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: "change" }
        ],
        duration: [
          { required: true, message: "请输入治疗时长", trigger: "blur" }
        ],
        remark: [{ required: false, message: "请输入备注", trigger: "blur" }],
        cancelText: [{ required: true, message: "请填写原因", trigger: "blur" }]
      },
      selectCounselor: false,
      selectCounselorSearch: "",
      selectCounselorIndex: null
    };
  },
  components: { Schedule },
  methods: {
    //关闭弹窗
    closelPop() {
      this.form.cancelText = "";
    },
    //取消预约
    cancelFn() {
      this.cancelPop = true;
    },
    cancelConfirmBtnFn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.disabled = true;
          let postData = {
            appointmentId: this.appointmentId,
            cause: this.form.cancelText
          };
          appointmentCancel(postData)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  showClose: true,
                  message: "取消成功",
                  duration:'1500',
                  type: "success",
                  onClose: () => {
                    this.disabled = false;
                    window.history.back();
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
        }
      });

      // this.cancelPop = false;
    },

    //美容师占用时间条
    articleTime() {
      let postData = {};
      if (this.form.datetime.indexOf(" ") == -1) {
        postData = {
          technicianId: this.form.technician,
          appointmentTime: this.form.datetime
        };
      } else {
        postData = {
          technicianId: this.form.technician,
          appointmentTime: this.form.datetime.split(" ")[0]
        };
      }
      appointmentOccupy(postData)
        .then(res => {
          if (res.status == 0) {
            this.scheduleData = res.data;
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              duration:'1500',
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },

    //美容师切换
    technicianChange(value) {
      this.form.technician = value;
      if (this.form.technician != undefined && this.form.datetime != null) {
        if (this.form.technician != "") this.articleTime();
      }
    },

    //到店时间
    datetimeChange(value) {
      if (value != null) {
        console.log(value);
        let tmp = this.$base.dateTimeToDate(value, "date");
        console.log(tmp);
        this.form.datetime = tmp;
        if (this.form.technician != undefined) {
          if (this.form.technician != "") this.articleTime();
        }
      }
    },

    //修改提交
    handleSubmit() {
      if (this.form.duration != "" && this.form.duration <= 0) {
        this.$message({
          showClose: true,
          message: "治疗时间不能小于1",
          type: "warning"
        });
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.technician == "") this.form.duration = "";

          if(!this.$base.isNull(this.form.projectOne)){
            if(isNaN(this.form.projectOne)){
                 this.$message({
                  showClose: true,
                  message: '该项目已停用,请重新选择',
                  type: "error"
                });
              return;
            }
          }

          if(!this.$base.isNull(this.form.projectTow)){
            if(isNaN(this.form.projectTow)){
                 this.$message({
                  showClose: true,
                  message: '该项目已停用,请重新选择',
                  type: "error"
                });
              return;
            }
          }

          let postData = {
            customerId: this.counselorId,
            appointmentId: this.appointmentId,
            itemPid: this.form.projectOne,
            itemId: this.form.projectTow,
            appointmentTime: this.form.datetime,
            content: this.form.remark,
            adviserId: this.form.counselor,
            technicianId: this.form.technician,
            yuyueOrderTime: this.form.duration
          };
          this.disabled = true;
         

          appointmentPostEdit(postData)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  duration:'1500',
                  type: "success",
                  onClose: () => {
                    window.history.back();
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
        }
      });
    },

    //获取详情
    getDataFn() {
      let postData = {
        appointmentId: this.appointmentId
      };
      appointmentGetInformation(postData)
        .then(res => {
          if (res.status == 0) {
            this.initialData = res.data;
            if (res.data.item[0].id != 0) {
              this.form.projectOne = res.data.item[0].id;
              this.form.projectTow = res.data.item[1].id;
            }

            if(res.data.item[0].status == 0){
              this.form.projectOneDisabled = true
              this.form.projectOne = res.data.item[0].name
            }

            if(res.data.item[1].status == 0){
              this.form.projectTwoDisabled = true
              this.form.projectTow = res.data.item[1].name
            }

            this.form.datetime = res.data.appointment_time;
            this.form.counselor = res.data.adviser.users_id;
            if (res.data.technician.users_id != 0)
              this.form.technician = res.data.technician.users_id;
            if (res.data.treatment_time > 0)
              this.form.duration = res.data.treatment_time;

            this.form.remark = res.data.content;
            if (this.form.technician != "" && this.form.datetime != null) {
              this.articleTime();
            }
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
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
  mounted() {
    this.minHeight = window.innerHeight - 124;
    this.boxMaxHeight = window.innerHeight - 280;
    this.appointmentId = this.$route.query.appointmentId;
    this.counselorId = this.$route.query.counselorId;
    this.getDataFn();
    let usersId = JSON.parse(localStorage.getItem("CURRENT_USER"));
    if (usersId.role_id == 3) {
      this.roleChoosable = true;
      this.form.counselor = usersId.users_id;
    } else {
      this.roleChoosable = false;
    }

   // 项目
    getProject({ start: 1, perpage: 999, itemsParmentId: 0 }).then(res => {
        if(res.status == 0){
        let _tmp = res.data.list
        let _tmp2 = JSON.parse(JSON.stringify(res.data.list))
        this.$store.commit('SET_PROJECTLIST1', res.data.list)

        for(let i=0; i<_tmp.length; i++){
            _tmp[i].children = []
            _tmp2[i].children = []
        }

        getProject({ start: 1, perpage: 9999,status:-1}).then(res2 => {
            if(res2.status == 0){
            let __tmp = res2.data.list
            for(let i=0; i<__tmp.length; i++){
                for(let j=0; j<_tmp.length; j++){
                if(__tmp[i].p_id == _tmp[j].id){
                    _tmp[j].children.push(__tmp[i])
                    if(__tmp[i].status.value == 1){
                    _tmp2[j].children.push(__tmp[i])
                    }
                }
                }
            }
            // 2019-11-15 15点15分 陈军修改
            this.$store.commit('SET_PROJECTALLLIST', _tmp)
            this.$store.commit('SET_PROJECTLIST', _tmp2)
            }
        })

        }else{
        this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
        });
        this.$store.commit('SET_PROJECTLIST', [])
        this.$store.commit('SET_PROJECTLIST1', [])
        }
    }).catch(error=>{
        this.$message({
        showClose: true,
        message: error,
        type: 'error',
        });
        this.$store.commit('SET_PROJECTLIST', [])
        this.$store.commit('SET_PROJECTLIST1', [])
    })

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
.MakeAnAppointmentAmend {
  margin: 20px;
  padding: 0 20px;
  background: #fff;
  .titles {
    border-bottom: 1px solid #e5e5e5;
    height: 50px;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      font-size: 16px;
      color: #333;
    }
  }
  .box {
    .box_titles {
      background: #f0fdff;
      .titles_box {
        width: 60%;
        margin: 0 auto;
        display: flex;
        height: 70px;
        align-items: center;
        .name {
          display: flex;
          // width: 4rem;
          p {
            padding-left: 0.4rem;
          }
          p,
          span {
            font-size: 22px;
            color: #0dc9e5;
          }
          span {
            padding-left: 0.4rem;
          }
        }
        .status {
          display: flex;
          padding-left: .2rem;
          p {
            color: #666;
          }
          span {
            color: #ff5722;
          }
        }
        .history_go {
          color: #0dc9e5;
          padding-left: 1rem;
          cursor: pointer;
        }
      }
    }
    .box_right {
      width: 60%;
      margin: 0 auto;
      .message_box {
        margin: 0.4rem auto 0;
        display: flex;
        .message {
          width: 5rem;
          .el-row {
            margin-bottom: 0.1rem;
          }
        }
        .timer {
          flex: 1;
          margin-left: 1rem;
          display: flex;
          height: 460px;
        }
      }
    }
  }
}
</style>
    
<style>
.MakeAnAppointmentAmend input[type="number"] {
  padding-right: 0 !important;
}
</style>
