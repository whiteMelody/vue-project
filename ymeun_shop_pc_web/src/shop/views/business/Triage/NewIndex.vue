<template>
  <div class="Triage">
    <div class="header">
      <div class="left">分诊列表&nbsp;&nbsp;{{dateText}}</div>
      <em></em>
      <div class="center">
        <i class="iconfont iconsousuo"></i>
        <auto-search-client-stride @changed="myChanged"  :initValue="''" class="wb100"></auto-search-client-stride>
      </div>
      <em></em>
      <div class="right" @click="goPageURL('MakeAnAppointmentSite')"><i class="iconfont iconxianchangfenzhen-"></i>&nbsp;&nbsp;&nbsp;<span>现场分诊</span></div>
    </div>

    <ul v-loading="loading" v-if="noData">
      <li v-for="(item, index) in listData" :key="index">
        <div class="li_haeder">
          <div class="img">
            <el-tooltip content="从未开过计入业绩单的称为备用客户，开过一次计入业绩项目的称为新客，开过两次计入业绩项目的称为老客" placement="top" effect="light">  
                <!-- <div class="text" :class="item.old_customer == 1 ? 'newText' : 'oldText'">{{item.old_customer == 1 ? '新' : '老'}}</div> -->
              <div class="text newText" v-if="item.isOld == '新客'">新</div>
              <div class="text oldText" v-else-if="item.isOld == '老客'">老</div>
              <div class="text prepareText" v-else>备</div>
            </el-tooltip>
            <img :src="item.customer.headimg" alt="" v-if="item.customer.headimg">
            <img :src="item.sex == '女' ? imgUrl.imgGirl : imgUrl.imgBoy" alt="" v-else>
          </div>
          <div class="nameAndTime">
            <div class="name">
              <el-tooltip :content="item.customer_name" placement="top" effect="light"> 
                <span @click="$router.push({name:'ClientDel',query:{id:item.customer_id,types:2}})">{{item.customer_name}}</span>
              </el-tooltip>
              <i  class="iconfont" :class="item.sex == '女' ? 'iconnv' : 'iconnan'"></i>
            </div>
            <div class="time">{{item.appointment_time | _endTimeFormat}}</div>
          </div>
          <div class="label" :class="item.className">
            <span>{{item.status_name}}</span>
            <em></em>
            <i class="iconfont" :class="item.status == 2 ? 'iconshanchuguanbicha2' : 'icondianpu'"></i>
          </div>
        </div>
        <div class="listBox" >
          <div class="list">
            <i>项目：</i>
            <el-tooltip v-if="item.item_p != ''" class="item" effect="light" :content="item.item_p +'-'+ item.item" placement="top-start">
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
            <el-tooltip v-if="item.content != ''" class="item" effect="light" :content="item.content" placement="top-start">
              <span>{{item.content}}</span>
            </el-tooltip>
          </div>
        </div>
        <div class="bottomBox">
          <!-- <div class="btns" v-if="item.status == 0">
            <div class="left" @click="goPageURL('MakeAnAppointmentAmend',item.id,item.customer_id)"><i class="iconfont iconxiugaiziliao"></i> 修改预约</div>
            <div class="right" @click="goPageURL('MakeAnAppointmentDel',item.id)">查看详情</div>
          </div> -->
          <div class="btns" v-if="item.status == 0">
            <div class="left clcorTwo">
              <div class="left_left" @click="goPageURL('clearApp',item.id)"><i class="iconfont iconcancel"></i>&nbsp;取消</div>
              <em></em>
              <div class="left_left" @click="goPageURL('MakeAnAppointmentAmend',item.id,item.customer_id)"><i class="iconfont iconxiugai"></i> 修改</div>
            </div>
            <div class="left clcorOne" @click="goPageURL('MakeAnAppointmentDel',item.id)">查看详情</div>
          </div>
          <div class="bottomOne" v-else-if="item.status == 1">
            <div class="right" style="opacity:0.5" v-if="item.operation == 2">已改排</div>
            <div class="right" style="opacity:0.5" v-else-if="item.operation == 1">已接诊</div>
            <div class="right" v-else @click="goPageURL('MakeAnAppointmentRea',item.id,item.customer_id)">改 排</div>
          </div>
          <div class="bottomTwo" v-else>
            <div class="list">
              <i>原因：</i>
              <el-tooltip class="item" effect="light" :content="item.cause" placement="top-start">
                <span>{{item.cause}}</span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </li>
      <li style="visibility: hidden"></li>
      <li style="visibility: hidden"></li>
      <li style="visibility: hidden"></li>
    </ul>


    <div class="no_data" v-else>
      <div>
        <span><img src="@/shop/assets/img/nodata.png" alt=""></span>
        <b>暂无数据</b>
      </div>
    </div>

    <!-- 取消预约 -->
    <el-dialog title="取消原因" width="20%" :visible.sync="cancelPop">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="cancelText">
          <el-input type="textarea"  placeholder="请输入取消原因..." v-model="form.cancelText" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPop = false;form.cancelText = ''">取 消</el-button>
        <el-button v-if="disabled" type="primary" disabled>提交中...</el-button>
        <el-button v-else type="primary" @click="cancelConfirmBtnFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import getPage from '@/shop/assets/css/headerClass.scss';
import { appointmentList,triage,getListByCustomer,appointmentCancel} from "@/shop/assets/api/flow/makeAnAppointmentList";
import autoSearchClientStride from '@/shop/components/autocomplete/autoSearchClientStride'
export default {
  name: "Triage",
  data() {
    return {
      dateText: "",
      dataObj:{
        startTime:'',
        endTime:'',
        data:'',
        perpage:9999,
        order:5,
      },
      imgUrl:{
        imgBoy:require('@/shop/assets/img/boy.png'),
        imgGirl:require('@/shop/assets/img/girl.png')
      },
      listData:[],
      loading:false,
      noData:true,

      cancelPop:false,
      form:{},
      disabled:false,
      rules:{cancelText: [{ required: true, message: "请填写原因", trigger: "blur" }]},
      appointmentId:''


    };
  },
  components: {
    autoSearchClientStride
  },
  watch: {},
  methods: {
    // 取消预约
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
                  duration:1500,
                  onClose: () => {
                    this.form.cancelText = "";
                    this.cancelPop = false;
                    this.disabled = true;
                    this.getInitData();
                  }
                });
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error",
                  duration:1500,
                  onClose: () => {
                    this.disabled = false;
                  }
                });
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

    myChanged(data){
      this.dataObj.data = data.kw;
      window.onkeydown = (e) => {
        var currKey=0,e=e||event; 
        currKey=e.keyCode||e.which||e.charCode;
        if (currKey == 13){
          this.getInitData();
        }
      }
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
        case "clearApp":
          this.appointmentId = appointmentId;
          this.cancelPop = true;
          break;
        default:
          break;
      }
    },

    // 初始化数据
    getInitData() {
      const that = this;
      that.loading = true;
      appointmentList(that.dataObj).then(res => {
        if (res.status == 0) {
          if (res.data.list.length) {
            res.data.list.map((item,index) => {
              if (item.status == 0) 
                item.className = 'labelClassOne';
              else if (item.status == 1) 
                item.className = 'labelClasstTwo';
              else 
                item.className = 'labelClassThree';
            });
          }
          this.listData = res.data.list;
          that.loading = false;
          if(res.data.list.length > 0){
            this.noData = true
          }
          else{
            this.noData = false
          }
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error"
          });
          that.loading = false;
        }
      }).catch(error => {
        console.log("appointmentList no");
        that.loading = false;
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
    this.dataObj.startTime = this.$base.getDateScope(1).startTime;
    this.dataObj.endTime = this.$base.getDateScope(1).endTime;
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
@import "./NewIndex.scss";
</style>
<style>
.Triage .el-dialog .el-dialog__body,
.Triage  .el-dialog .el-dialog__body {
  padding: 10px 20px 0;
}
.Triage .el-dialog .el-dialog__body textarea {
  height: 90px;
}
</style>
