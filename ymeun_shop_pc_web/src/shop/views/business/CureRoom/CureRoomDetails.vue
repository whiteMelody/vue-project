<template>
  <div class="CureRoomDetails" v-loading="loading">
    <div class="customerInfo">
      <div class="info">
        <div class="customerNameAndImg">
          <div class="img" :style="'background: url(' + customerList.headimg + ') no-repeat center/100%'" v-if="customerList.headimg"></div>
          <div class="img" :style="'background: url(' + (customerList.sex.value == 0 ? imgUrl.imgGirl : imgUrl.imgBoy) + ') no-repeat center/100%'" v-else></div>
          <div class="name">
            <div class="text">
              {{customerList.name}}
              <i  class="iconfont" :class="customerList.sex.value == 0 ? 'iconnv' : 'iconnan'"></i>
            </div>
            <div class="mobile">{{customerList.mobile}}</div>
          </div>
        </div>
        <ul>
          <li>
            生日：
            <span>{{customerList.birthday}}</span>
          </li>
          <li>
            籍贯：
            <span>{{customerList.address}}</span>
          </li>
          <li>
            微信：
            <span>{{customerList.weixin}}</span>
          </li>
          <li>
            QQ：
            <span>{{customerList.qq}}</span>
          </li>
          <li>
            E-mail：
            <span>{{customerList.email}}</span>
          </li>
          <li>
            所属{{$store.getters.roleName.adviser}}：
            <span>{{customerList.adviser.name}}</span>
          </li>
        </ul>

        <div class="border"></div>

        <div class="ActivityLevel">
          <div class="list">等级：{{customerList.levelName}}</div>
          <div class="list">发掘潜力：{{customerList.potentialValue}}</div>
          <div class="list">活跃度：{{customerList.activity}}</div>
        </div>
      </div>

      <div class="Statistics">
        <div class="number">
          {{customerList.store_quantity}}
          <i class="iconfont iconshangmenfuwu"></i>
        </div>
        <div class="clear4"></div>
        <div class="text">上门次数（次）</div>
      </div>
      <div class="Statistics">
        <div class="number">
          {{customerList.order_quantity}}
          <i class="iconfont iconxiaofeijilu1"></i>
        </div>
        <div class="clear4"></div>
        <div class="text">消费次数（次）</div>
      </div>
      <div class="Statistics">
        <div class="number">
          {{customerList.order_amount}}
          <i class="iconfont iconxiaofeijilu"></i>
        </div>
        <div class="clear4"></div>
        <div class="text">消费金额（元）</div>
      </div>
      <div class="Statistics">
        <div class="number">
          {{customerList.refund_amount}}
          <i class="iconfont iconxianshangtuikuan"></i>
        </div>
        <div class="clear4"></div>
        <div class="text">退单金额（元）</div>
      </div>
    </div>

    <div class="operation">

      <div class="room">

        <div class="title">{{roomCustomerData.name}}</div>


        <div class="projectList">
          
          <div class="box mar20">

            <div class="liTitle">划扣项目</div>

            <div class="listLeft " style="height: 4.5rem;">
              <div class="li" v-for="(item, index) in claspList" :key="index">
                <div class="name">{{item.items_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;{{item.number}}</div>
                <div class="detele" @click="openPopup('back',item)">
                  <i class="iconfont iconback"></i>退回
                </div>
              </div> 
            </div>

            <div class="Total">
              <div class="money">划扣金额（元）</div>
              <div class="num">{{titalMoeny | _moneyFormat}}</div>
            </div>
          </div>

          <div class="box">

            <div class="liTitle">剩余项目</div>
            <div class="listLeft" >
              <div class="li" v-for="(item, index) in alreadyList" :key="index" v-show="item.shengyu != 0">
                <div class="name">{{item.items_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;{{item.shengyu}}</div>
                <div class="detele" @click="openPopup('save',item)">
                  <i class="iconfont iconzengjia"></i>增加
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="bottonBox">
          <div class="left">
            <el-button type="primary" @click="CureRoomDetails">新增订单</el-button>
          </div>
          <div class="right">
            <el-button type="primary" @click="openPopup('increase')">增加时间</el-button>
            <el-button type="danger" @click="openPopup('close')">结束使用</el-button>
          </div>
        </div>


      </div>

      <div class="CallingInfo">
        <div class="CallingInfoTitle">
          <div class="text">呼叫信息</div>
          <div class="jil" @click="$router.push({name:'CallRecord'})">呼叫记录 <i class='iconfont iconright'></i></div>
        </div>

        <div class="callingInfoLIst">
          <div class="liList" v-for="(item, index) in serviceContentList" :key="index" @click="CureRoomCall(item.id)">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>



    <div class="closeBox">
      <!-- 结束使用 -->
      <el-dialog
      title="提示"
      :visible.sync="endUse"
      width="20%">
          <el-alert title="此治疗间治疗时间未结束，确定结束使用？" type="warning" show-icon :closable="false"> </el-alert>
          <span slot="footer" class="dialog-footer">
              <el-button @click="endUse = false">取 消</el-button>
                <el-button type="primary" @click="endDetermine" v-if="Determine">确 定</el-button>
              <el-button type="primary" disabled v-else>提交中...</el-button>
          </span>
      </el-dialog>

      
      <!-- 增加&退回划扣 -->
      <el-dialog :title="isItems ? '增加项目' : '退回项目'"
      :visible.sync="saveBack"
      width="23%">
          <div class="DedList">
              <div class="textNum">{{itemsList.items_name}}   X{{isItems ?  itemsList.shengyu : itemsList.number}}</div>
              <div class="jishuqi">
                  <el-input-number v-model="itemsList.inputNumBer" :min="0" :max="isItems ? itemsList.shengyu : itemsList.number" :step="1"></el-input-number>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="saveBack = false">取 消</el-button>
                <el-button type="primary" @click="saveBackItems" v-if="Determine">确 定</el-button>
              <el-button type="primary" disabled v-else>提交中...</el-button>
          </span>
      </el-dialog>

      <!-- 增加时间 -->
      <el-dialog
          title="增加使用时间"
          :visible.sync="IncreaseTime"
          width="25%"
          v-if="roomCustomerData.customer">
          <div class="timeData">
            <div class="box">
              <div class="img" :style="'background: url(' + roomCustomerData.customer.headimg + ') no-repeat center/100%'" v-if="roomCustomerData.customer.headimg"></div>
              <div class="img" :style="'background: url(' + (roomCustomerData.customer.sex == 0 ? imgUrl.imgGirl : imgUrl.imgBoy) + ') no-repeat center/100%'" v-else></div>
              <div class="info">
                  <div class="customerName">{{roomCustomerData.customer.name}}</div>
                  <div class="time">
                      <div class="left">{{$store.getters.roleName.technician}}：{{roomCustomerData.technician_name}}</div>
                  </div>
              </div>
            </div>
            <el-input type="number" placeholder="输入治疗时长" v-model="roomTimeData.useTime">
                <template slot="append">分钟</template>
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="IncreaseTime = false">取 消</el-button>
              <el-button type="primary" @click="TimeDetermine" v-if="Determine">确 定</el-button>
              <el-button type="primary" disabled v-else>提交中...</el-button>
          </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
import {CureRoomDetails,CustomerData,CureRoomeList,CureRoomeTime,serviceList,CureRoomCall,DeductionProject,RemainingItems,LaunchSave,backItems } from '@/shop/assets/api/cureRoom/cureRoom';
import {OpenCloseTreatment } from "@/shop/assets/api/common/common";
export default {
  name: "CureRoomDetails",
  components: {},
  data() {
    return {
      imgUrl: {
        imgBoy: require("@/shop/assets/img/boy.png"),
        imgGirl: require("@/shop/assets/img/girl.png")
      },
      customerId:'',
      customerList:{
        sex:{value:''},
        adviser:{name:''},
      },
      roomCustomerData:{},
      roomName:'',
      roomStatus:'',
      roomId:'',
      Determine:true,
      endUse:false,
      IncreaseTime:false,
      saveBack:false,
      isItems:false,
      roomTimeData:{
          id:'',
          useTime:'',
      },
      itemsList:{},
      serviceContentList:[],
      claspList:[],
      titalMoeny:'',
      alreadyList:[],
      loading:true
    };
  },
  methods: {
    loadData() {
      this.roomTimeData.useTime = '';
      this.endUse = false;
      this.IncreaseTime = false;
      this.Determine = true;
    },
    // 打开弹窗
    openPopup(type,item) {
      if (type == 'close') {
        this.endUse = true;
      }else if (type == 'increase') {
        this.IncreaseTime = true;
      }else if (type == 'back') {
        this.itemsList = item;
        this.isItems = false;
        this.saveBack = true;
      }else if (type = 'save') {
        this.itemsList = item;
        this.isItems = true;
        this.saveBack = true;
      }
    },

    // 新增订单
    CureRoomDetails() {
      CureRoomDetails({customerId:this.customerId}).then(res => {
        if (res.status == 0) {
          // Billing?customerId=42815&adviserId=509&appointmentId=23858&technicianId=0
          this.$router.push({
            name:'Billing',
            query:{
              customerId:res.data.customer_id,
              adviserId:res.data.adviser_id,
              appointmentId:res.data.id,
              technicianId:res.data.technician_id,
            }
          })
        }else {
          this.$message({
              message:res.msg,
              showClose: true,
              type: 'error',
          });
        }
      });
    },

    // 客户信息
    CustomerData() {
      CustomerData({customerId:this.customerId,crossStore:1}).then(res => {
        if (res.status == 0) {
          // if (res.data.birthday != null) {
          //   res.data.birthday = this.$base.timestampToDateString(res.data.birthday,'date2');
          // }else {
          //   res.data.birthday = '';
          // }
         
          // 
          this.customerList = res.data;
        }else {
          this.$message({
              message:res.msg,
              showClose: true,
              message: error,
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

    // 治疗间
    CureRoomeList() {
      CureRoomeList().then(res => {
        res.data.forEach( v => {
          if (v.id == this.roomId) {
            this.roomCustomerData = v;
          }
        });   
      }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
      })
    },

    // 结束使用治疗间
    endDetermine() {
        let objData = {
            status : this.roomCustomerData.status,
            roomId : this.roomId
        }
        this.Determine = false;
        OpenCloseTreatment(objData).then(res => {
            if (res.status == 0) {
                this.$message({
                    message: res.msg,
                    type: 'success',
                    duration:'1300',
                    onClose:() => {
                      this.$router.go(-1);
                    }
                });
            }else {
                this.$message({
                    message: res.msg,
                    type: 'error',
                    duration:'1300',
                    onClose:() => {
                        this.loadData();
                    }
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


    // 增加使用治疗间时间
    TimeDetermine() {
        this.Determine = false;
        this.roomTimeData.id = this.roomId;
        CureRoomeTime(this.roomTimeData).then(res => {
            console.log(res);
            if (res.status == 0) {
                this.$message({
                    message: res.msg,
                    type: 'success',
                    duration:'1500',
                    onClose:() => {
                        this.loadData();
                    }
                });
            }else {
                this.$message({
                    message: res.msg,
                    type: 'error',
                    duration:'1500',
                    onClose:() => {
                        this.loadData();
                    }
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


    // 服务内容
    serviceList() {
      serviceList({start:1,perpage:99999}).then( res => {
        if (res.status == 0) {
          if (res.data.list) {
            res.data.list.map((item,index) => {
              if (item.content == '零食') {
                item.icon = 'iconlaopo-';
              }else if (item.content == '热水') {
                item.icon = 'iconlaopo-1';
              }else if (item.content == '清洁') {
                item.icon = 'iconlaopo-3';
              }else if (item.content == '呼叫') {
                item.icon = 'iconlaopo-4';
              }else if (item.content == '音乐') {
                item.icon = 'iconlaopo-2';
              }
            });
          }
          this.serviceContentList = res.data.list;
        }
      }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
      })
    },

    // 呼叫
    CureRoomCall(id) {
      let data = {
        roomId:this.roomId,
        serviceId:id,
        customerId:this.customerId,
      }
      CureRoomCall(data).then(res => {
        if (res.status== 0) {
          this.$message({
              message: '呼叫成功',
              type: 'success',
              duration:'1500'
          });
        }else {
          this.$message({
              showClose: true,
              message: error,
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


    // 已划扣项目
    DeductionProject() {
      DeductionProject({customerId:this.customerId,roomId:this.roomId,room_details_id:this.roomCustomerData.last_id,back:0}).then(res => {
        if (res.status == 0) {
          this.claspList = res.data.list;
          this.titalMoeny = res.data.consume.amount;
        }
      }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
      })
    },

    // 可划扣项目
    RemainingItems() {
      RemainingItems({customer_id:this.customerId,roomId:this.roomId,room_details_id:this.roomCustomerData.last_id}).then(res => {
        if (res.status == 0) {
          res.data.list.forEach( v => {
            v.inputNumBer = 0;
          });
          this.alreadyList = res.data.list;
        }
      }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
      })
    },

    // 增加&退回项目
    saveBackItems() {
      this.Determine = false;
      if (this.isItems) {
        let dataList = {
          customerId:this.customerId,
          technicianId:this.roomCustomerData.technician_id,
          roomUseTime:this.roomCustomerData.dis,
          roomId:this.roomId,
          room_details_id:this.roomCustomerData.last_id,
          data: JSON.stringify([{num:this.itemsList.inputNumBer,receipt_id:this.itemsList.id}])
        }
        // 发起划扣
        LaunchSave(dataList).then(res => {
          if (res.status == 0) {
            this.$message({
                message: res.msg,
                type: 'success',
                duration:'1300',
                onClose:() => {
                  this.saveBack = false;
                  this.Determine = true;
                  this.DeductionProject();
                  this.RemainingItems();
                }
            });
          }else {
            this.$message({
                message: res.msg,
                type: 'error',
                duration:'1300',
                onClose:() => {
                  this.Determine = true;
                }
            });
          }
        }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
        })
      }else  {
        // 退回划扣
        let dataList = {consumeCommand:this.itemsList.command,roomId:this.roomId,room_details_id:this.roomCustomerData.last_id,quantity:this.itemsList.inputNumBer,consumeId:this.itemsList.id,itemsId:this.itemsList.items_id}
        backItems(dataList).then(res => {
          if (res.status == 0) {
            this.$message({
                message: '退回成功',
                type: 'success',
                duration:'1300',
                onClose:() => {
                  this.saveBack = false;
                  this.Determine = true;
                  this.DeductionProject();
                  this.RemainingItems();
                }
            });
          }else {
            this.$message({
                message: res.msg,
                type: 'error',
                duration:'1300',
                onClose:() => {
                  this.Determine = true;
                }
            });
          }
        }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
        })
      }
    }
  },
  watch: {},
  // 挂载结束状态
  mounted() {
    this.customerId = this.$route.query.customerId;
    this.roomId = this.$route.query.roomId;
    this.CustomerData();
    this.CureRoomeList();
    this.serviceList();
    this.DeductionProject();
    this.RemainingItems();
    this.loading = false;
  }
};
</script>
<style scoped lang="scss">
@import "./CureRoomDetails.scss";
</style>
<style>
    .el-input-group--append .el-input__inner {
        padding-right: 0;
    }
    .timeData .box {
        display: flex;
        align-items: center;
        margin-bottom: .2rem;
    }
    .timeData .box .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .timeData .box .info {
        margin-left: .16rem;
        font-family: PingFang SC;
        font-weight: 500;

    }
    .timeData .box .info  .customerName {
        font-size: .16rem;
        color: #333;
        margin-bottom: .1rem;
        text-align: left;
    }
    .timeData .box .info  .time {
        width: 100%;
        text-align: left;
    }
    .timeData .box .info  .time .left {
        font-size: .14rem;
        color: #999;
    }
    .timeData .box .info  .time .left span {
        color: #FF5722;
    }
    .closeBox .DedList {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .closeBox .DedList .textNum {
        font-size:14px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
</style>