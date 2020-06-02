<template>
  <div class="Triage">
    <header>分诊列表 {{dateText}}</header>
    <el-alert
      :title="'从未划扣过的客户称为新客，划扣过哪怕只划扣过一次且不计金额多少，均算做老客'"
      type="info"
      style="border-left: 2px solid #999999; border-radius: 0;"
    ></el-alert>
    <div class="box">
      <el-form
        :inline="true"
        :model="condition"
        class="search-form"
        slot="search"
        label-width="80px"
      >
        <el-form-item>
          <auto-search-client-list @changed="myChanged" :initValue="''"></auto-search-client-list>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="h32px" @click="getInitData"></el-button>
        </el-form-item>
        <el-button type="danger" class="h32px" @click="goPageURL('MakeAnAppointmentSite')">现场分诊</el-button>
      </el-form>

      <ul>
        <li v-for="(item, index) in listData" :key="index" :class="item.classNameOne">
          <div class="name">
            <div class="text">
              <div class="time">{{item.appointment_time | _endTimeFormat}}</div>
              <div class="text_name">
                <el-tooltip :content="item.customer_name" placement="top" effect="light"> 
                  <span class="iconname text-over-hidden1">{{item.customer_name}}</span>
                </el-tooltip>
                <span v-if="item.sex == '男'" class="iconfont iconnan"></span>
                <span v-else class="iconfont iconnv"></span>
              </div>
            </div>
            <div class="customer">
              <div class="left_lao" v-if="item.isOld == '老客'">老客</div>
              <div class="left_xin" v-else>新客</div>
              <div class="right_wei" v-if="item.status == '0'">未到店</div>
              <div class="right_yi" v-else-if="item.status == '1'">已到店</div>
              <div class="right_qu" v-else-if="item.status == '2'">已取消</div>
              <div class="right_qu" v-else>已过期</div>
            </div>
          </div>

          <div class="listBox" :class="item.classNameTow">
            <div class="list">
              <i>项目：</i>
              <el-tooltip
                v-if="item.item_p != ''"
                class="item"
                effect="light"
                :content="item.item_p +'-'+ item.item"
                placement="top-start"
              >
                <span>{{item.item_p +'-'+ item.item}}</span>
              </el-tooltip>
            </div>
            <div class="list">
              <i>渠道：</i>
              <span>{{item.channelName}}</span>
            </div>
            <div class="list">
              <i>{{$store.getters.roleName.adviser}}：</i>
              <span>{{item.adviser_name}}</span>
            </div>
            <div class="list">
              <i>{{$store.getters.roleName.technician}}：</i>
              <span>{{item.technician_name}}</span>
            </div>
            <div class="list">
              <i>电话：</i>
              <span>{{item.mobile}}</span>
            </div>
            <div class="list h34px">
              <i>备注：</i>
              <el-tooltip
                v-if="item.content != ''"
                class="item"
                effect="light"
                :content="item.content"
                placement="top-start"
              >
                <span>{{item.content}}</span>
              </el-tooltip>
            </div>
          </div>
          <div class="buttomBox">
            <div class="buttom1" v-if="item.status == 0">
              <div class="buttom_left" @click="goPageURL('MakeAnAppointmentDel',item.id)">查看详情</div>
              <div
                class="buttom_right"
                @click="goPageURL('MakeAnAppointmentAmend',item.id,item.customer_id)"
              >修改预约</div>
              <!-- <div
                class="buttom_right"
                @click="confirmFn(item.id,item.customer_id,item.adviser_id,item.technician_id,item.customer_name,item.mobile,)"
              >确认到店</div> -->
            </div>
            <div class="buttom2" v-else-if="item.status == 1">
              <div class="buttom_right" v-if="item.operation == 2">已改排</div>
              <div class="buttom_right" v-else-if="item.operation == 1">已接诊</div>
              <div
                class="buttom_left"
                v-else
                @click="goPageURL('MakeAnAppointmentRea',item.id,item.customer_id)"
              >改排</div>
            </div>
            <div class="buttom3" v-else>
              <div class="list">
                <i>原因：</i>
                <!-- <span :title="item.cause">{{item.cause}}</span> -->
                <el-tooltip class="item" effect="dark" :content="item.cause" placement="top-start">
                  <span>{{item.cause}}</span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 确认到店 -->
    <div class="confirm_box">
      <el-dialog title="请确认到店信息" width="20%" :visible.sync="confirmPop" @closed="closelPop">
        <div class="user_name">
          <p>{{form.name}}</p>
          <span>{{form.mobile}}</span>
        </div>

        
        <el-form ref="form" :model="form" :rules="rules" class="add-form">
          <!-- <el-form-item prop="confirmText">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-select
                  v-model="form.confirmText"
                  placeholder="请选择到店类型"
                  readonly
                  clearable
                  class="wb100"
                >
                  <el-option v-for="[key, val] in _dictYuyueType" :key="key" :label="val" :value="key"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>   -->
          <el-form-item v-if="form.counselor">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-select v-model="form.counselor" :placeholder="'请选择'+$store.getters.roleName.adviser" readonly="" class="wb100">
                    <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                            :value="item.key"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item v-if="form.technician">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-select v-model="form.technician" :placeholder="`请选择${$store.getters.roleName.technician}`" readonly="" class="wb100">
                    <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                            :value="item.key"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <div class="Prize" v-if="PrizeIsShow">
            <ul>
              <li>
                <div class="title">使用奖品</div>
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
    </div>
  </div>
</template>
<script>
import {
  appointmentList,
  triage,
  getListByCustomer
} from "@/shop/assets/api/flow/makeAnAppointmentList";
import autoSearchClientList from "@/shop/components/autocomplete/autoSearchClientList";
import { setTimeout } from "timers";
export default {
  name: "Triage",
  data() {
    return {
      confirmPop: false,
      dateText: "",
      customeSearch: "",
      counselor: {
        counselor: ""
      },
      condition: {
        startTime: "",
        endTime: "",
        data: "",
        perpage: 999,
        order: 5
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: appointmentList, // 分页查询api接口
      listData: [],
      form: {
        confirmText: "",
        counselor:'',
        technician:''
      },
      rules: {
        confirmText: [
          { required: true, message: "请选择预约类型", trigger: "change" }
        ]
      },
      disabled: false,
      appointmentId: "",
      adviser_id: "",
      customer_id: "",
      PrizeList: [],
      PrizeIsShow:true
    };
  },
  watch: {
    customeSearch(newData, oldData) {
      this.condition.data = newData;
    }
  },
  components: { autoSearchClientList },
  methods: {
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

    //确认到店
    confirmFn(appointmentId, customer_id, adviser_id, technician_id, customer_name, mobile) {
      this.confirmPop = true;
      this.appointmentId = appointmentId;
      this.customer_id = customer_id;
      this.adviser_id = adviser_id;
      this.form.counselor = adviser_id
      this.form.technician = technician_id
      this.form.name = customer_name
      this.form.mobile = mobile
    
      
      getListByCustomer({ customerId: customer_id }).then(res => {
        if (res.status == 0) {
          if (res.data.total == 0) {
            this.PrizeIsShow = false;
          }else {
            this.PrizeIsShow = true;
            if (res.data.list != []) {
              res.data.list.map((item, index) => {
                item.textNum = 0;
              });
            }
            this.PrizeList = res.data.list;
          }
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      });
    },
    //关闭弹窗
    closelPop() {
      this.form.confirmText = "";
    },
    confirmBtnFn() {
      this.$refs.form.validate(valid => {
        if (valid) {
         
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
            adviserId: this.form.counselor,
            technicianId:this.form.technician,
            customerId: this.customer_id,
            // type: this.form.confirmText,
            partake: partake1
          };
     
          triage(postData)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  showClose: true,
                  message: "确认到店",
                  duration: "1500",
                  type: "success",
                  onClose: () => {
                    this.confirmPop = false;
                    this.disabled = false;
                    this.getInitData();
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
              console.log("triage no");
              this.disabled = false;
            });
        }
      });
    },
    myChanged(data) {
      // this.customeSearch = '';
      // this.customeSearch = '';
      // this.condition.data = "";
      this.customeSearch = data.kw;
      this.condition.data = data.kw;

      console.log("this.customeSearch:" + this.customeSearch);
      console.log("this.condition.data:" + this.condition.data);
    },
    //跳转页面
    goPageURL(str, appointmentId, counselorId) {
      switch (str) {
        case "MakeAnAppointmentAmend":
          this.$router.push({
            path: "MakeAnAppointmentAmend",
            query: {
              appointmentId: appointmentId,
              counselorId: counselorId
            }
          });
          break;
        case "MakeAnAppointmentDel":
            this.$router.push({
                path: 'MakeAnAppointmentDel',
                query: {
                  appointmentId: appointmentId,
                }
            })
            break;
        case "MakeAnAppointmentRea":
          this.$router.push({
            path: "MakeAnAppointmentRea",
            query: {
              appointmentId: appointmentId,
              counselorId: counselorId
            }
          });
          break;
        case "MakeAnAppointmentSite":
          this.$router.push({
            path: "MakeAnAppointmentSite"
          });
          break;
        default:
          break;
      }
    },
    //获取初始数据
    getInitData() {
      let postData = this.condition;

      console.log(postData);

      appointmentList(postData)
        .then(res => {
          if (res.status == 0) {
            this.listData = res.data.list;
            for (let i = 0; i < this.listData.length; i++) {
              const element = this.listData[i];
              switch (element.status) {
                case 0:
                  element.classNameOne = "liActive_wei";
                  element.classNameTow = "listBox_wei";
                  break;
                case 1:
                  element.classNameOne = "liActive_yi";
                  element.classNameTow = "listBox_yi";
                  break;
                default:
                  element.classNameOne = "liActive_qu";
                  element.classNameTow = "listBox_qu";
                  break;
              }
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
    this.dateText = this.$base.getDateScope(1).startTime.split(" ")[0];
    this.condition.startTime = this.$base.getDateScope(1).startTime;
    this.condition.endTime = this.$base.getDateScope(1).endTime;

    this.getInitData();
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
@import "./Index.scss";
</style>


<style>
.confirm_box .el-dialog__wrapper .el-dialog .el-dialog__body{
  padding-top: 0
}
</style>
    
