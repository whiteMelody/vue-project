<template>
  <div class="MakeAnAppointmentDel" :style="'min-height: '+minHeight+'px;'">
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
            <el-row :gutter="140">
              <el-col :span="24">
                <span>
                  <b></b>项目
                </span>
                <p>{{initialData.projectOneText}}</p>
                <p v-show="initialData.projectOneText != ''">{{initialData.projectTowText}}</p>
              </el-col>
            </el-row>
            <el-row :gutter="140">
              <el-col :span="24">
                <span>
                  <b>*</b>到店时间
                </span>
                <p>
                  <i class="iconfont iconshijian"></i>
                  {{initialData.datetime}}
                </p>
              </el-col>
            </el-row>
            <el-row :gutter="140" class="row_box">
              <el-col :span="24">
                <span>
                  <b>*</b>{{$store.getters.roleName.adviser}}
                </span>
                <p>{{initialData.adviserText}}</p>
              </el-col>
            </el-row>
            <el-row :gutter="140" class="row_box" v-show="initialData.technicianText != ''">
              <el-col :span="24">
                <span>
                  <b></b>{{$store.getters.roleName.technician}}
                </span>
                <p>{{initialData.technicianText}}</p>
              </el-col>
            </el-row>
            <el-row :gutter="140" v-show="initialData.duration != 0">
              <el-col :span="24">
                <span>
                  <b>*</b>治疗时长/分
                </span>
                <p>{{initialData.duration}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="remark">
                <span>
                  <b></b>备注
                </span>
                <p>{{initialData.remark}}</p>
              </el-col>
            </el-row>
            <div class="clear4"></div>
            <div class="btn fr" style="margin-left:14px;">
              <el-button v-if="disabled" type="primary" disabled>提交中...</el-button>
              <el-button v-else  type="primary" @click="confirmFn">确认到店</el-button>
            </div>
            <div class="btn fr">
              <el-button @click="cancelFn">取消预约</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cancel_box">
      <el-dialog title="取消原因" :visible.sync="cancelPop" @closed="closelPop">
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
          <el-button v-if="disabled" type="primary" disabled>提交中...</el-button>
          <el-button v-else type="primary" @click="cancelConfirmBtnFn">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- <div class="confirm_box">
      <el-dialog title="选择预约类型" :visible.sync="confirmPop" @closed="closelPop">
        <el-form ref="form" :model="form" :rules="rules" class="add-form">
          <el-form-item prop="confirmText">
            <el-select
              v-model="form.confirmText"
              placeholder="请选择预约类型"
              readonly
              clearable
              class="wb100"
            >
              <el-option v-for="[key, val] in _dictYuyueType" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmPop = false">取 消</el-button>
          <template v-if="disabled">
            <el-button type="primary" disabled>保存中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="confirmBtnFn">确 定</el-button>
          </template>
        </div>
      </el-dialog>
    </div> -->
    

    <!-- 确认到店 -->
    <div class="confirm_box">
      <el-dialog title="请选择奖品" width="20%" :visible.sync="confirmPop" @closed="closelPop">
        <div class="Prize">
          <ul>
            <li>
              <div class="title">客户奖品列表</div>
            </li>
            <li v-for="(item, index) in PrizeList" :key="index">
              <div class="text">{{item.item.name}}&nbsp;&nbsp;X&nbsp;{{item.quantity}}</div>
              <div class="Stepper">
                <div class="jiajian jiaActive" @click="AdditionClick('1',index)">-</div>
                <div class="textNum">{{item.textNum}}</div>
                <div class="jiajian jiaActive" @click="AdditionClick('2',index)">+</div>
              </div>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmPop = false">取 消</el-button>
          <template v-if="disabled">
            <el-button type="primary" disabled>保存中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="confirmBtnFn">确 定</el-button>
          </template>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  appointmentGetInformation,
  appointmentCancel,
  triage,
  getListByCustomer
} from "@/shop/assets/api/flow/makeAnAppointmentList";
export default {
  name: "MakeAnAppointmentDel",
  data() {
    return {
      disabled: false,
      appointmentId: "",
      initialData: {
        customer_id: "",
        projectData: "",
        projectOneText: "",
        projectTowText: "",
        datetime: "",
        adviser: "",
        adviser_id: "",
        adviserText: "",
        technician: "",
        technicianText: "",
        duration: "",
        remark: ""
      },
      pagesTitle: "分诊详情",
      minHeight: 0,
      boxMaxHeight: 0,
      cancelPop: false,
      confirmPop: false,
      form: {
        cancelText: "",
        confirmText: "",
        continue:""
      },
      rules: {
        cancelText: [
          { required: true, message: "请填写原因", trigger: "blur" }
        ],
        confirmText: [
          { required: true, message: "请选择预约类型", trigger: "change" }
        ]
      },
      PrizeList:[],
      PrizeTotal:"",
    };
  },
  components: {},
  methods: {
    //关闭弹窗
    closelPop() {
      this.form.cancelText = "";
      this.form.confirmText = "";
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

    },

    //确认到店
    confirmFn() {
      // 选择到店类型
      // this.confirmPop = true;


      // 直接确认到店
      if (this.PrizeTotal == 0) {
        this.confirmBtnFn();
      }else {
        this.confirmPop = true;
      }
    },
    confirmBtnFn() {
      // this.$refs.form.validate(valid => {
      //   if (valid) {
          this.disabled = true;
          let partake1 = "";
          if (this.PrizeList.length != 0) {
            partake1 = [];
            this.PrizeList.map((item, index) => {
              if (item.textNum != 0) {
                let id = item.item.id;
                partake1.push({ num: item.textNum, id: item.id });
              }
              partake1 = JSON.stringify(partake1);
            });
          }
          let postData = {
            appointmentId: this.appointmentId,
            adviserId: this.initialData.adviser_id,
            customerId: this.initialData.customer_id,
            technicianId:this.initialData.technician,
            // type: this.form.confirmText
            partake: partake1,
            continue: this.form.continue
          };
          triage(postData)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  showClose: true,
                  message: "确认到店",
                  type: "success",
                  onClose: () => {
                    this.disabled = false;
                    window.history.back();
                  }
                });
              }
              else if(res.status == 40091){
                this.$confirm("该客户今天已经分诊，确认需要再次分诊？", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.form.continue = 1
                    this.confirmFn()
                    this.disabled = false
                }).catch(() => {
                    this.disabled = false
                });
              }
              else {
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
      //   }
      // });
    },
    // 使用奖品
    AdditionClick(type, index) {
      let num = this.PrizeList[index].quantity;
      let textNum = this.PrizeList[index].textNum;
      switch (type) {
        case "1":
          if (textNum > 0) {
            this.PrizeList[index].textNum--;
          } else {
            this.$message({
              showClose: true,
              message: "已经是最小数量",
              duration: "1500",
              type: "warning"
            });
          }
          break;
        case "2":
          if (textNum < num) {
            this.PrizeList[index].textNum++;
          } else {
            this.$message({
              showClose: true,
              message: "已经是最大数量",
              duration: "1500",
              type: "warning"
            });
          }
          break;
        default:
          break;
      }
    },

    //获取详情
    getDataFn() {
      let postData = {
        appointmentId: this.appointmentId
      };
      appointmentGetInformation(postData)
        .then(res => {
          if (res.status == 0) {
            this.initialData.customer_name = res.data.customer_name;
            this.initialData.customer_id = res.data.customer_id;
            this.initialData.mobile = res.data.mobile;
            this.initialData.status = res.data.status;
            if (res.data.item[0].id != 0) {
              this.initialData.projectOneText = res.data.item[0].name;
              this.initialData.projectTowText = res.data.item[1].name;
              this.initialData.projectData = res.data.item;
            }
            this.initialData.datetime = res.data.appointment_time;
            if (res.data.adviser.users_id != 0) {
              this.initialData.adviserText = res.data.adviser.name;
              this.initialData.adviser = res.data.adviser;
              this.initialData.adviser_id = res.data.adviser_id;
            }
            if (res.data.technician.users_id != 0) {
              this.initialData.technicianText = res.data.technician.name;
              this.initialData.technician = res.data.technician.users_id;
            }
            this.initialData.duration = res.data.treatment_time;
            this.initialData.remark = res.data.content;

            console.log(this.initialData);
            this.getListByCustomer();
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
    },

    getListByCustomer() {
      getListByCustomer({ customerId: this.initialData.customer_id }).then(res => {
        if (res.status == 0) {
          if (res.data.list != []) {
            res.data.list.map((item, index) => {
              item.textNum = 0;
            });
          }
          this.PrizeList = res.data.list;
          this.PrizeTotal = res.data.total;
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      });
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.minHeight = window.innerHeight - 124;
    this.boxMaxHeight = window.innerHeight - 280;
    this.appointmentId = this.$route.query.appointmentId;
    this.getDataFn();
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
.MakeAnAppointmentDel {
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
            margin-bottom: 0.26rem;
            .el-col {
              display: flex;
              span {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 0.1rem;
                width: 1rem;
                b {
                  font-weight: normal;
                  color: #ec414d;
                }
              }
              p {
                margin-left: 0.1rem;
                border: 1px solid #e5e5e5;
                border-radius: 5px;
                flex: 1;
                height: 40px;
                display: flex;
                padding: 0 0.16rem;
                align-items: center;
                font-size: 14px;
                color: #333333;
                i {
                  color: #999;
                  font-size: 14px;
                  padding-right: 0.06rem;
                }
              }
            }
            .remark {
              span {
                align-items: flex-start;
                padding-top: 0.1rem;
              }
              p {
                height: 150px;
                align-items: flex-start;
                padding: 0.1rem 0.16rem;
              }
            }
          }
        }
      }
    }
  }
  .confirm_box {
    .Prize {
      ul {
        border-top: 1px solid #e5e5e5;
        li {
          width: 100%;
          height: 50px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          .title {
            font-size:.16rem;
            color:rgba(13,201,229,1);
          }
          .text {
            font-size:.14rem;
            color:rgba(51,51,51,1);
          }
          .Stepper {
            display: flex;
            align-items: center;
            font-size:.16rem;
            .jiajian {
              font-size: .2rem;
              width:.29rem;
              height:28px;
              background:rgba(248,248,248,1);
              text-align: center;
              border: 1px solid #e5e5e5;
              color:#333333;
              cursor:pointer;
            }
            .textNum {
              width: .5rem;
              height: 28px;
              border-top: 1px solid #e5e5e5;
              border-bottom: 1px solid #e5e5e5;
              text-align: center;
              line-height: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.MakeAnAppointmentDel .cancel_box .el-dialog,
.MakeAnAppointmentDel .confirm_box .el-dialog {
  width: 4.2rem;
}
.MakeAnAppointmentDel .cancel_box .el-dialog .el-dialog__body,
.MakeAnAppointmentDel .confirm_box .el-dialog .el-dialog__body {
  padding: 10px 20px 0;
}
.MakeAnAppointmentDel .cancel_box .el-dialog .el-dialog__body textarea {
  height: 90px;
}
</style>
