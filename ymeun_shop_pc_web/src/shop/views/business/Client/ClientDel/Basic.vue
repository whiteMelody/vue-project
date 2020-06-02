<template>
    <div class="Basic">
        <div class="money">
            <header>
                <p>消费情况</p>
            </header>
            <ul>
                <li>
                    <p>充值金额（元）</p>
                    <span>{{data.prepaid_amount | _filterNumFormat}}</span>
                    <em v-if="topUpListBtn" @click="$router.push({path: 'TopUpListDetails',query:{id:id}})">充值收支明细 ></em>
                </li>
                <li>
                    <p>券额（元）</p>
                    <span>{{data.coupon | _filterNumFormat}}</span>
                </li>
                <li>
                    <p>客户积分（分）</p>
                    <span>{{data.integral | _NumFormat}}</span>
                </li>
                <li>
                    <p>欠款金额（元）</p>
                    <span>{{data.arrears_amount | _filterNumFormat}}</span>
                </li>
            </ul>
            <div class="btns" v-if="data.s_id == $store.getters.currentUser.s_id">
                <el-button type="primary" class="wb100" style="box-shadow:0px 3px 7px 0px rgba(13, 229, 201, 0.35);" @click="balanceShow = true">余额充值</el-button>
                <div class="btns_box">
                    <el-button 
                        type="danger" 
                        class="wb100 fl" 
                        :disabled="data.arrears_amount == 0" 
                        v-if="data.arrears_amount == 0"
                        style="box-shadow:0px 3px 7px 0px rgba(255, 34, 87, 0.35);"
                        @click="$router.push({path: 'ClientDebtList',query:{id:id}})">暂无欠款</el-button>
                    <el-button 
                        v-else
                        type="danger" 
                        class="wb100 fl" 
                        style="box-shadow:0px 3px 7px 0px rgba(255, 34, 87, 0.35);"
                        @click="$router.push({path: 'ClientDebtList',query:{id:id}})">还款</el-button>
                    
                    <!-- <el-button 
                        v-if="data.prepaid_amount == 0"
                        type="danger" 
                        :disabled="data.prepaid_amount == 0" 
                        class="wb48 fr" 
                        style="box-shadow:0px 3px 7px 0px rgba(255, 34, 87, 0.35);" 
                        >无可退金额</el-button> -->
                    <!-- <el-button 
                        v-else
                        type="danger" 
                        class="wb48 fr" 
                        style="box-shadow:0px 3px 7px 0px rgba(255, 34, 87, 0.35);" 
                        @click="refundShow = true">充值退款</el-button> -->
                </div>
            </div>
        </div>
        <div class="message">
            <header>
                <p>基本信息</p>
                <el-button type="primary" @click="$router.push({path: 'ImprovingData',query:{customerId:id}})">修改资料</el-button>
            </header>
            <div class="basic_message">
                <div class="basic_message_left">
                    <table cellspacing='0' cellpadding='0'>
                        <!-- <tr>
                            <td width="120">姓名</td>
                            <td><span>{{data.name}}</span></td>
                        </tr> -->
                         <tr>
                            <td width="120" style="background: none;" colspan="2">
                                <div class="name_img">
                                    <p class="img" v-if="data.headimg == '' && data.sexValue == 0">
                                        <img style="width:100%; height:100%;" src="@/shop/assets/img/girl.png" />
                                    </p>
                                    <p class="img" v-else-if="data.headimg == '' && data.sexValue == 1">
                                        <img style="width:100%; height:100%;" src="@/shop/assets/img/boy.png" />
                                    </p>
                                    <p class="img" :style="'background: url(' +  data.headimg  + ') no-repeat center/100%'" v-else>
                                    </p>
                                    <div class="text">
                                        <p class="name">
                                            {{data.name}}
                                            <i v-if="data.sexValue == 0" class="iconfont iconnv"></i>
							                <i v-else class="iconfont iconnan"></i>
                                        </p>
                                        <p class="tel">
                                            <b>{{data.mobile}}</b>
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <!-- <td><span>{{data.name}}</span></td> -->
                        </tr>
                        <tr>
                            <td width="120">用户编号</td>
                            <td><span>{{data.code}}</span></td>
                        </tr>
                        <!-- <tr>
                            <td>性别</td>
                            <td><span>{{data.sexLabel}}</span></td>
                        </tr> -->
                        <tr>
                            <td>年龄</td>
                            <td><span>{{data.age}}</span></td>
                        </tr>
                        <tr>
                            <td>生日</td>
                            <td><span>{{data.birthday}}</span></td>
                        </tr>
                        <tr>
                            <td>证件号码</td>
                            <td><span>{{data.idcard}}</span></td>
                        </tr>
                        <tr>
                            <td>籍贯</td>
                            <td><span>{{data.nativePlace}}</span></td>
                        </tr>
                         <tr>
                            <td>E-mail</td>
                            <td><span>{{data.email}}</span></td>
                        </tr>
                        <tr class="max_height">
                            <td>现所在地</td>
                            <td><span>{{data.address}}</span></td>
                        </tr>
                    </table>
                </div>
                <div class="basic_message_right">
                    <table cellspacing='0' cellpadding='0'>
                       <!-- <tr>
                            <td width="120">客户照片</td>
                            <td><img :src="data.headimg" alt=""></td>
                            <td><img src="@/shop/assets/img/girl.png" alt=""></td>
                            <td>
                                <div class="img">
                                    <el-image style="width:100%; height:100%;" :src="data.headimg" ></el-image>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="120">电话</td>
                            <td><span>{{data.mobile}}</span></td>
                        </tr>
                        <tr>
                            <td>微信</td>
                            <td><span>{{data.weixin}}</span></td>
                        </tr>
                        <tr>
                            <td>QQ</td>
                            <td><span>{{data.qq}}</span></td>
                        </tr>
                         <tr>
                            <td>E-mail</td>
                            <td><span>{{data.email}}</span></td>
                        </tr> -->
                        <tr>
                            <td>微信</td>
                            <td><span>{{data.weixin}}</span></td>
                        </tr>
                        <tr>
                            <td>QQ</td>
                            <td><span>{{data.qq}}</span></td>
                        </tr>
                        <tr>
                            <td>备用电话</td>
                            <td><span>{{data.standby_telephone}}</span></td>
                        </tr>
                        <tr>
                            <td>所属门店</td>
                            <td><span>{{data.shopName}}</span></td>
                        </tr>
                        <tr v-if="IntroducerListAllowed">
                            <td>介绍人</td>
                            <td><span><template v-if="data.introducer">{{data.introducer.name}}</template></span></td>
                        </tr>
                        <tr v-if="IntroducerListAllowed">
                            <td>介绍人电话</td>
                            <td><span><template v-if="data.introducer">{{data.introducer.mobile}}</template></span></td>
                        </tr>
                        <tr class="max_height">
                            <td>客户主诉</td>
                            <td><span>{{data.complaint}}</span></td>
                        </tr>
                    </table>
                </div>

            </div>

            <header class="mat10">
                <p>到访登记 <span>登记时间：{{data.created_at | _endTimeFormat}}</span></p>
            </header>

            <div class="basic_message">
                <div class="basic_message_left">
                    <table cellspacing='0' cellpadding='0'>
                        <tr>
                            <td width="200">所属{{$store.getters.roleName.adviser}}</td>
                            <td><span>{{data.adviserName}}</span></td>
                        </tr>
                        <tr>
                            <td>到诊渠道</td>
                            <td><span>{{data.channelText}}</span></td>
                        </tr>
                        <tr>
                            <td>第一次到诊时间</td>
                            <td><span><template v-if="data.first_appointment_date">{{data.first_appointment_date | _endTimeFormat}}</template></span></td>
                        </tr>
                        <tr>
                            <td>最近到诊时间</td>
                            <td><span><template v-if="data.last_appointment_date">{{data.last_appointment_date | _endTimeFormat}}</template></span></td>
                        </tr>
                        <tr>
                            <td class='bg-white1'>意向项目</td>
                            <td><span v-for="(item,index) in data.item" :key="index">{{item.name}}</span></td>
                        </tr>
                    </table>
                </div>
                <div class="basic_message_right">
                    <table cellspacing='0' cellpadding='0'>
                        <tr>
                            <td>上门次数（次）</td>
                            <td><span>{{data.store_quantity}}</span></td>
                        </tr>
                        <tr>
                            <td>消费次数（次）</td>
                            <td><span>{{data.order_quantity}}</span></td>
                        </tr>
                        <tr>
                            <td>消费总金额（元）</td>
                            <td><span>{{data.order_amount | _filterNumFormat}}</span></td>
                        </tr>
                        <tr>
                            <td>退单总金额（元）</td>
                            <td><span>{{data.refund_amount | _filterNumFormat}}</span></td>
                        </tr>
                    </table>
                </div>

            </div>

            <!-- <template>
                <header class="mat10" v-if="data.introducer.length !=0">
                    <p>介绍人</p>
                </header>
                <div class="basic_message" v-if="data.introducer.length !=0">
                    <div class="basic_message_content">
                        <table cellspacing='0' cellpadding='0'>
                            <tr>
                                <td width="150">{{data.introducer.name}}</td>
                                <td><span>{{data.introducer.mobile}}</span></td>
                            </tr>
                        </table>
                    </div>
                </div>            
            </template> -->
           
        </div>

        <el-dialog title="余额充值" :visible.sync="balanceShow" width="440px">
            <el-form :model="balanceParam" label-width="80px" :rules='rules'>
                <!-- <p class="lh50px">账号：{{userData.username}} 姓名：{{userData.name}} 岗位：{{userData.role_name}}</p> -->
                <el-form-item label="实际金额" prop="price">
                    <el-input type="number" placeholder="请输入金额" v-model="balanceParam.price" class="input_number wb100"></el-input>
                </el-form-item>
                <el-form-item label="券额" prop="givePrice">
                    <el-input type="number" placeholder="请输入券额" v-model="balanceParam.givePrice" class="input_number wb100"></el-input>
                </el-form-item>
                <el-form-item label="充值人员" prop="usersId">
                  <el-select v-model="balanceParam.usersId" :disabled="balanceParamDisabled" placeholder="选择充值员工" readonly="" clearable class="wb100">
                      <el-option v-for="item in $store.getters.counselorCosmetologistMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
              </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" placeholder="请输入备注" v-model="balanceParam.remark" class="wb100"></el-input>
                </el-form-item>
            </el-form>
            <p class="remark_text">注：券额一旦使用，该笔充值相关的订单均不能退单</p>

            <div slot="footer" class="dialog-footer">
                <el-button @click="balanceShow = false;balanceParam = {}">取 消</el-button>

                <template v-if="disabled">
                    <el-button type="primary" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="prepaidPostAddFn">确 定</el-button>
                </template>

            </div>
        </el-dialog>
        
        <el-dialog title="充值退款" :visible.sync="refundShow" width="440px">
            <el-form :model="refundParam" label-width="80px" :rules='rules'>
                <!-- <p class="lh50px">账号：{{userData.username}} 姓名：{{userData.name}} 岗位：{{userData.role_name}}</p> -->
                <el-form-item label="退款金额" prop="refund">
                    <el-input type="number" placeholder="请输入退款金额" v-model="refundParam.refund" class="input_number wb100"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="refundShow = false;refundParam = {}">取 消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="prepaidExtractionFn">确 定</el-button>
                </template>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import { getUserInfo , prepaidPostAdd , prepaidExtraction } from "@/shop/assets/api/client/client";
import { getProgramList } from "@/shop/assets/api/common/common"
export default {
  name: "Basic",
  data() {
    return {
        data:"",
        balanceShow:false,
        disabled:false,
        balanceParam:{
            usersId:null
        },
        balanceParamDisabled:false,
        refundShow:false,
        refundParam:{},
        rules:{
            price: [{ required: true, message: '请输入金额', trigger: 'blur' }],
            refund: [{ required: true, message: '请输入退款金额', trigger: 'blur' }],
            usersId: [{ required: true, message: '请选择充值人员', trigger: 'change' }],
        },
        url:require("@/shop/assets/img/boy.png"),
        IntroducerListAllowed:false,
        topUpListBtn:false
    };
  },
  components: {
    
  }, 
  props:['id'],
  watch: {
      '$route' (to, from) {
          this.$router.go();
    }
  },
  methods: {
    //充值退款
    prepaidExtractionFn(){
  
        let postData = {
            customerId : this.id,
            price : this.refundParam.refund
        };
        this.disabled = true
        prepaidExtraction(postData).then(res => {
          if(res.status == 0){
         
            this.$message({
                showClose: true,
                message: "退款成功",
                type: 'success',
                onClose:()=>{
                    window.history.go(0)
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
    },
    //余额充值
    prepaidPostAddFn(){
        let postData = {
            price: this.balanceParam.price,
            usersId: this.balanceParam.usersId,
            remark: this.balanceParam.remark,
        }

        // console.log(id)

        if(!this.$base.isNull(this.balanceParam.givePrice))
            postData.givePrice = this.balanceParam.givePrice

        postData.customerId = this.id;
        this.disabled = true
        prepaidPostAdd(postData).then(res => {
          if(res.status == 0){
            this.$message({
                showClose: true,
                message: "充值成功",
                type: 'success',
                onClose:()=>{
                    this.$router.go(0)
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
            console.log("prepaidPostAdd no");
            this.disabled = false
        })
    },
    //客户信息
    getUserInfoFn(){
        let postData = {
            customerId : this.id,
            crossStore: 1,
        }

        console.log(postData)

        const that = this;
        let usersId = JSON.parse(localStorage.getItem('CURRENT_USER'));
        getUserInfo(postData).then(res => {
          if(res.status == 0){
              this.data = res.data
              this.data.sexLabel = res.data.sex.label;
              this.data.sexValue = res.data.sex.value;
              this.data.shopName = res.data.store.name;
              if(this.data.across_store == 1){
                this.topUpListBtn = false
              }
              else{
                  if(usersId.role_id == 2 && this.data.prepaid_total > 0){
                      this.topUpListBtn = true
                  }
              }
              if(res.data.birthday != null)
              {
                this.data.age = that.$base.jsGetAge(res.data.birthday)
              }
              if(res.data.district.length == 0)
              {
                  this.data.nativePlace = ''
              }
              else
              {
                this.data.nativePlace = res.data.district[0].name
              }


              if(res.data.channel[0].id == 0 || res.data.channel[0].id == null )
              {
                this.data.channelText = ""
              }
              else
              {
                this.data.channelText = res.data.channel[0].name + '-' + res.data.channel[1].name 
              }
              if(res.data.item[0].id == 0 || res.data.item.id == null )
              {
                this.data.itemText = ""
              }
              else
              {
                this.data.itemText = res.data.item[0].name + '-' + res.data.item[1].name 
              }
              
              if(res.data.adviser.users_id == 0 || res.data.adviser.users_id == null )
              {
                this.data.adviserName = ""
              }
              else
              {
                this.data.adviserName = res.data.adviser.name
              }
          }
        }).catch(error=>{
            console.log("getUserInfoFn on");
        })
    }
  },

  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {

      console.log(this.id)

    let usersId = JSON.parse(localStorage.getItem('CURRENT_USER'));
    if(usersId.role_id == 2 || usersId.role_id == 5 || usersId.role_id == 6){
        this.balanceParamDisabled = false
    }else{
        this.balanceParamDisabled = true
        this.balanceParam.usersId = usersId.users_id;
    }

    getProgramList().then(res => {
        if (res.status == 0) {
            if (res.data.list.zhuanjieshao.allowed == 1) this.IntroducerListAllowed = true;
        }
    }).catch(error=>{
        console.log("getProgramList no");
    })
    this.getUserInfoFn();
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
.Basic {
    margin: 24px 20px;
    display: flex;
    .money{
        padding: 0 20px 20px;
        background: #fff;
        width: 4rem;
        header{
            display: flex;
            border-bottom: 1px solid #E5E5E5;
            height: 50px;
            align-items: center;
            p{
                flex: 1;
                font-size: 16px;
                color: #333;
            }
        }
        ul{
            padding-top: 4px;
            li{
                padding: 20px;
                background: #F8F8F8;
                margin-top: 20px;
                position: relative;
                p{
                    color: #666;
                }
                span{
                    font-weight: bold;
                    color: #FF5722;
                    padding-top: .16rem;
                    display: block;
                    font-size: 24px;
                    white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
                }
                em{
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-style: normal;
                    color:#0DC9E5;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
        .btns{
            padding-top: .5rem;
            .btns_box{
                padding-top: .2rem;
            }
        }
    }
    .message{
        flex: 1;
        background: #fff;
        margin-left: 20px;
        padding: 0 20px 20px;
        header{
            display: flex;
            border-bottom: 1px solid #E5E5E5;
            height: 50px;
            align-items: center;
            p{
                flex: 1;
                font-size: 16px;
                color: #333;
                span{
                    padding-left: 10px;
                }
            }
        }
        .basic_message{
            margin-top: 24px;
            display: flex;
            div{
                flex: 1;
                table{
                    width: 100%;
                    border-collapse: collapse;
                    tr{
                        td{
                            border: 1px solid #E5E5E5;
                            overflow: hidden;
                            &:nth-child(1) {
                                padding-left: .16rem;
                                background: #F8F8F8;
                                color: #666666;
                            }
                            span{
                                background: #fff;
                                height: 24px;
                                padding: 10px 0;
                                padding-left: .16rem;
                                display: block;
                            }
                            .img {
                                width:100px;
                                height:100px;
                                border-radius:50%;
                                margin: 10px 0;
                                overflow: hidden;
                            }
                            .name_img{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                .img{
                                    width: 60px;
                                    height: 60px;
                                    margin-right: 10px;
                                }
                                .text{
                                    flex: 1;
                                    display: flex;
                                    flex-direction: column;
                                    .tel{
                                        padding-top: 6px;
                                        b{
                                            font-weight: normal;
                                            margin-right: 20px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .max_height{
                        td{
                            p{
                                height: 70px;
                                width: 100%;
                            }
                            span{
                                height: 70px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 4;
                            }
                        }
                    }
                }
            }
            .basic_message_right{
                padding-left: .2rem;
            }
        }
    }
}
</style>

<style>
.Basic .el-dialog .input_number input{
    padding-right: 0;
}
.Basic .el-dialog__wrapper .el-dialog .el-dialog__body .remark_text{
    color: red;
    padding-left: 50px;
}
.iconnan {
    color: #2878ff;
}
.iconnv {
    color: #ec414d;
}
</style>

    
