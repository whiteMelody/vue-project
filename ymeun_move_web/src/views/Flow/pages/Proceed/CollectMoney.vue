<template>
  <div class="wb100 bg-white1" :style="'minHeight:' + minHeight + 'px' ">

      <!--   header   -->
      <Header :title="'收银'" :back="true"></Header>

      <div class="wb100">
          <div class="wb100">
              <p class="pa20 fc-gray3 f26rem">选择支付方式</p>
          </div>

          <div class="clear0"></div>

          <div class="wb100 bg-white f28rem">
              <div class="pa25">

                  <div class="wb100">
                      <i class="iconfont iconchongzhikazhifu fc-orange2 f45rem fl"></i>
                      <div class="fl lh40rem mal30" style="margin-top: -.1rem">
                          <p>充值卡支付</p>
                          <p class="f22rem">余额：{{customer_price}}</p>
                      </div>
                      <div class="clear8"></div>
                      <div class="wb100 h50rem text-right">
                          <span class="fl h50rem lh50rem f50rem fc-gray4">￥</span>
                          <input type="number" v-model="recharge" :disabled="customer_price == 0" class="bg-none bd-none h50rem lh50rem mal30 fl w300rem fc-gray3" placeholder="请输入"></input>
                      </div>
                  </div>
                  <div class="clear4 bd-gray bd-b1"></div>
                  <div class="clear4"></div>

                  <div class="wb100">
                      <i class="iconfont iconquan fc-red f45rem fl"></i>
                      <div class="fl lh40rem mal30" style="margin-top: -.1rem">
                          <p>券额支付</p>
                          <p class="f22rem">余额：{{customer_givePrice}}</p>
                      </div>
                      <div class="clear8"></div>
                      <div class="wb100 h50rem text-right">
                          <span class="fl h50rem lh50rem f50rem fc-gray4">￥</span>
                          <input type="number" v-model="give_debit" :disabled="customer_givePrice == 0" class="bg-none bd-none h50rem lh50rem mal30 fl w300rem fc-gray3" placeholder="请输入"></input>
                      </div>
                  </div>
                  <div class="clear4 bd-gray bd-b1"></div>
                  <div class="clear4"></div>

                  <div class="wb100">
                      <i class="iconfont iconzhifubaozhifu fc-blue2 f45rem fl"></i>
                      <div class="fl lh50rem mal30">
                          <p>支付宝支付</p>
                      </div>
                      <div class="clear8"></div>
                      <div class="wb100 h50rem text-right">
                          <span class="fl h50rem lh50rem f50rem fc-gray4">￥</span>
                          <input type="number" v-model="alipay" class="bg-none bd-none h50rem lh50rem mal30 fl w300rem fc-gray3" placeholder="请输入"></input>
                      </div>
                  </div>
                  <div class="clear4 bd-gray bd-b1"></div>
                  <div class="clear4"></div>

                  <div class="wb100">
                      <i class="iconfont iconweixinzhifu fc-green2 f45rem fl"></i>
                      <div class="fl lh50rem mal30">
                          <p>微信支付</p>
                      </div>
                      <div class="clear8"></div>
                      <div class="wb100 h50rem text-right">
                          <span class="fl h50rem lh50rem f50rem fc-gray4">￥</span>
                          <input type="number" v-model="wechat_pay" class="bg-none bd-none h50rem lh50rem mal30 fl w300rem fc-gray3" placeholder="请输入"></input>
                      </div>
                  </div>
                  <div class="clear4 bd-gray bd-b1"></div>
                  <div class="clear4"></div>

                  <div class="wb100">
                       <svg class="icon w80rem h50rem fl mat10" aria-hidden="true">
                            <use xlink:href="#iconyinlianzhifu"></use>
                        </svg>
                      <!-- <i class="iconfont iconyinlianzhifu  f45rem fl"></i> -->
                      <div class="fl lh50rem">
                          <p>银行卡支付</p>
                      </div>
                      <div class="clear8"></div>
                      <div class="wb100 h50rem text-right">
                          <span class="fl h50rem lh50rem f50rem fc-gray4">￥</span>
                          <input type="number" v-model="bank_card" class="bg-none bd-none h50rem lh50rem mal30 fl w300rem fc-gray3" placeholder="请输入"></input>
                      </div>
                  </div>
                  <div class="clear4 bd-gray bd-b1"></div>
                  <div class="clear4"></div>

                  <div class="wb100">
                      <i class="iconfont iconxianjinzhifu fc-brown f45rem fl"></i>
                      <div class="fl lh50rem mal30">
                          <p>现金支付</p>
                      </div>
                      <div class="clear8"></div>
                      <div class="wb100 h50rem text-right">
                          <span class="fl h50rem lh50rem f50rem fc-gray4">￥</span>
                          <input type="number" v-model="cash" class="bg-none bd-none h50rem lh50rem mal30 fl w300rem fc-gray3" placeholder="请输入"></input>
                      </div>
                  </div>
                  <div class="clear4 bd-gray bd-b1"></div>
                  <div class="clear4"></div>

                  <div class="wb100">
                      <i class="iconfont iconqita fc-blue3 f45rem fl"></i>
                      <div class="fl lh50rem mal30">
                          <p>其他支付</p>
                      </div>
                      <div class="clear8"></div>
                      <div class="wb100 h50rem text-right">
                          <span class="fl h50rem lh50rem f50rem fc-gray4">￥</span>
                          <input type="number" v-model="online_price" class="bg-none bd-none h50rem lh50rem mal30 fl w300rem fc-gray3" placeholder="请输入"></input>
                      </div>
                  </div>
                  <div class="clear4 bd-gray bd-b1"></div>
                  <div class="clear4"></div>

              </div>

              <div class="clear0"></div>
          </div>

          <div class="clear0" style="height: .9rem"></div>

          <div class="wb100 fixed bg-white" style="bottom: -.05rem;">

              <div class="wb100 h90rem lh90rem bd-gray bd-t1">
                <span class="fl mal20 f26rem fc-gray3">
                    应收款
                    <span class="fc-red f40rem">￥{{money | _filterNumFormat}}</span>
                </span>
                  <div class="w240rem fc-white bg-green h90rem lh90rem text-center f28rem fr" @click="openPayInfo">
                      确定
                  </div>

              </div>

          </div>

          <van-dialog
                  v-model="showPayInfo"
                  title="确认收银"
                  :show-cancel-button="false"
                  :show-confirm-button="false"
                  @confirm="payConfirm">
              <div class="clear4 bd-white1 bd-b1"></div>

              <div class="clear4"></div>

              <div class="wb100" v-if="isQiankuan">
                  <div class="wb100">
                      <div class="wb33 fl text-center">
                          <p class="f24rem">应收款</p>
                          <p class="f28rem fc-gray4">￥{{money | _filterNumFormat}}</p>
                      </div>
                      <div class="wb33 fl text-center">
                          <p class="f24rem">已支付</p>
                          <p class="f28rem fc-green">￥{{sumPrice | _filterNumFormat}}</p>
                      </div>
                      <div class="wb33 fl text-center">
                          <p class="f24rem">欠款</p>
                          <p class="f28rem fc-orange">￥{{qiankuanMoeny | _filterNumFormat}}</p>
                      </div>
                  </div>

                  <div class="clear2"></div>

                  <div class="pal20 par20 pat10 fc-gray2 lh50rem">
                      <div class="clear4 bd-white1 bd-t1"></div>
                      <textarea class="wb100 bd-none bg-none" v-model="describe" placeholder="请输入欠款说明" rows="2"></textarea>
                  </div>
              </div>
              <div class="wb100" v-else>
                  <div class="wb100">
                      <div class="wb50 fl text-center">
                          <p class="f24rem">应收款</p>
                          <p class="f28rem fc-gray4">￥{{money | _filterNumFormat}}</p>
                      </div>
                      <div class="wb50 fl text-center">
                          <p class="f24rem">已支付</p>
                          <p class="f28rem fc-green">￥{{sumPrice | _filterNumFormat}}</p>
                      </div>
                  </div>
              </div>

              <div class="wb100" v-if="online_price > 0">
                  <div class="clear2"></div>
                  <div class="pal20 par20 pat10 fc-gray2 lh50rem">
                      <div class="clear4 bd-white1 bd-t1"></div>
                      <textarea class="wb100 bd-none bg-none" v-model="online_description" placeholder="请输入团购说明" rows="2"></textarea>
                  </div>
              </div>

              <div class="clear2"></div>

              <div class="pa20 lh60rem h150rem over-auto">
                  <div class="clear4 bd-white1 bd-t1"></div>

                  <div class="wb100">
                      <p class="f28rem" v-if="recharge > 0">
                          <span class="fl fc-gray3">充值卡支付</span>
                          <span class="fr fc-orange2">￥{{recharge}}</span>
                      </p>
                      <div class="clear0"></div>
                  </div>

                  <div class="wb100" v-if="give_debit > 0">
                      <p class="f28rem">
                          <span class="fl fc-gray3">券额支付</span>
                          <span class="fr fc-red">￥{{give_debit}}</span>
                      </p>
                      <div class="clear0"></div>
                  </div>

                  <div class="wb100" v-if="alipay > 0">
                      <p class="f28rem">
                          <span class="fl fc-gray3">支付宝支付</span>
                          <span class="fr fc-blue2">￥{{alipay}}</span>
                      </p>
                      <div class="clear0"></div>
                  </div>

                  <div class="wb100" v-if="wechat_pay > 0">
                      <p class="f28rem">
                          <span class="fl fc-gray3">微信支付</span>
                          <span class="fr fc-green2">￥{{wechat_pay}}</span>
                      </p>
                      <div class="clear0"></div>
                  </div>

                  <div class="wb100" v-if="bank_card > 0">
                      <p class="f28rem">
                          <span class="fl fc-gray3">银行卡支付</span>
                          <span class="fr fc-blue">￥{{bank_card}}</span>
                      </p>
                      <div class="clear0"></div>
                  </div>

                  <div class="wb100" v-if="cash > 0">
                      <p class="f28rem">
                          <span class="fl fc-gray3">现金支付</span>
                          <span class="fr fc-brown">￥{{cash}}</span>
                      </p>
                      <div class="clear0"></div>
                  </div>

                  <div class="wb100" v-if="online_price > 0">
                      <p class="f28rem">
                          <span class="fl fc-gray3">其他支付</span>
                          <span class="fr fc-red">￥{{online_price}}</span>
                      </p>
                      <div class="clear0"></div>
                  </div>

              </div>

              <div class="clear4 bd-white1 bd-b1"></div>

              <div class="wb100 text-center h80rem lh80rem">

                  <div class="wb495 fl fc-gray4" @click="showPayInfo = false">
                      取消
                  </div>
                  <div class="wb495 fr fc-blue bd-white1 bd-l1"
                       @click="payConfirm"
                       v-loading.fullscreen.lock="subLoding"
                       element-loading-text="提交中...">
                      确定
                  </div>

              </div>

          </van-dialog>
      </div>



  </div>
</template>
<script>

    import Header from '../../../../components/Header'

    import { addReceivables } from "@/assets/api/Proceed/Proceed"
    import { GetCustomerRechargeByCustomerId } from "@/assets/api/Task/Task"
    import { Toast } from 'vant'

    export default {
      data(){
        return {
            minHeight: 0,
            showPayInfo: false,
            subLoding: false,
            customer_id: '',        //顾客ID
            customer_price: 0,      //顾客充值卡余额
            customer_givePrice: 0,      //顾客券额余额
            money: 0,
            recharge: 0,           //充值卡支付
            give_debit: 0,         //券额支付
            alipay: 0,             //支付宝支付
            wechat_pay: 0,         //微信支付
            bank_card: 0,          //银行卡支付
            cash: 0,               //现金支付
            online_price: 0,       //其它支付
            online_description: '', //团购描述 选择其它支付方式时必填
            orders_id: '',          //订单id 必填
            heji: '',               //合计支付金额 必填
            describe: '',           // 欠款描述 支付金额小于订单金额时必填
            sumPrice: 0,

            isQiankuan: false,      //是否欠款
            qiankuanMoeny: 0,       //欠款金额
        }
      },
      components:{
           Header
      },
      methods:{

          payConfirm(){

              if(this.subLoding)
                  return

              //判断欠款时是否有欠款描述

              if(this.isQiankuan){
                  if(this.describe == ''){
                      Toast('请输入欠款描述')
                      return
                  }
              }
              //判断其他支付时是否有团购描述
              if(this.online_price > 0){
                  if(this.online_description == ''){
                      Toast('请输入团购描述')
                      return
                  }
              }

              this.subLoding = true

            //提交
              addReceivables({describe: this.describe, recharge: this.recharge, give_debit: this.give_debit, alipay: this.alipay, wechat_pay: this.wechat_pay, bank_card: this.bank_card,
                  cash: this.cash, online_price: this.online_price, online_description: this.online_description, orders_id: this.orders_id, heji: this.sumPrice }).then((res)=>{
                  setTimeout(() => {
                      if( res.status == 0 ){
                          Toast({
                              message: '收银成功',
                              type: 'success',
                              duration:1500,
                              onClose:()=>{
                                  window.history.go(-1)
                                  this.subLoding = false;
                              }
                          });
                      }else{
                          Toast(res.msg);
                          this.subLoding = false;
                      }
                  },1000)
              }).catch((e)=>{
                  console.log(e)
              })

          },

          openPayInfo(){

              console.log(Number.parseFloat(this.money),  Number.parseFloat(this.sumPrice))

              if(Number.parseFloat(this.money) == Number.parseFloat(this.sumPrice)){
                //不欠款
                  this.isQiankuan = false
                  this.showPayInfo = true
              }else if(Number.parseFloat(this.money) > Number.parseFloat(this.sumPrice)){
                  //欠款
                  this.isQiankuan = true
                  this.showPayInfo = true
                  this.qiankuanMoeny = this.$base.twoDecimal(Number.parseFloat(this.money) - Number.parseFloat(this.sumPrice))
              }else{
                  //付款大于金额
                  Toast('请填写正确的支付金额')
              }
          },
      },
      mounted(){
          this.minHeight = window.innerHeight
          this.orders_id = this.$route.query.orders_id
          this.customer_id = this.$route.query.customer_id
          this.money = Number.parseFloat(this.$route.query.money)

          //获取充值卡余额
          GetCustomerRechargeByCustomerId({customer_id: this.customer_id}).then((res)=>{
              if(res.status == 0){
                  this.customer_price = Number.parseFloat(res.data.price)
                  this.customer_givePrice = Number.parseFloat(res.data.givePrice)

                  console.log(this.customer_price)
                  console.log(this.customer_givePrice)
              }
          }).catch((e)=>{
              console.log(e)
          })

      },

        watch: {
            recharge(curVal, oldVal) {
                //判断充值卡是否有余额
                if(curVal > this.customer_price){
                    this.recharge = this.customer_price
                }else{
                    this.sumPrice = Number.parseFloat(curVal) + Number.parseFloat(this.alipay) + Number.parseFloat(this.wechat_pay) + Number.parseFloat(this.bank_card) + Number.parseFloat(this.cash) + Number.parseFloat(this.online_price) + Number.parseFloat(this.give_debit)
                }
            },
            give_debit(curVal, oldVal) {
                //判断充值卡是否有余额
                if(curVal > this.customer_givePrice){
                    this.give_debit = this.customer_givePrice
                }else{
                    this.sumPrice = Number.parseFloat(this.recharge) + Number.parseFloat(curVal) + Number.parseFloat(this.alipay) + Number.parseFloat(this.wechat_pay) + Number.parseFloat(this.bank_card) + Number.parseFloat(this.cash) + Number.parseFloat(this.online_price)
                }
            },
            alipay(curVal, oldVal) {
                this.sumPrice = Number.parseFloat(curVal) + Number.parseFloat(this.recharge) + Number.parseFloat(this.wechat_pay) + Number.parseFloat(this.bank_card) + Number.parseFloat(this.cash) + Number.parseFloat(this.online_price) + Number.parseFloat(this.give_debit)
            },
            wechat_pay(curVal, oldVal) {
                this.sumPrice = Number.parseFloat(curVal) + Number.parseFloat(this.recharge) + Number.parseFloat(this.alipay) + Number.parseFloat(this.bank_card) + Number.parseFloat(this.cash) + Number.parseFloat(this.online_price) + Number.parseFloat(this.give_debit)
            },
            bank_card(curVal, oldVal) {
                this.sumPrice = Number.parseFloat(curVal) + Number.parseFloat(this.recharge) + Number.parseFloat(this.alipay) + Number.parseFloat(this.wechat_pay) + Number.parseFloat(this.cash) + Number.parseFloat(this.online_price) + Number.parseFloat(this.give_debit)
            },
            cash(curVal, oldVal) {
                this.sumPrice = Number.parseFloat(curVal) + Number.parseFloat(this.recharge) + Number.parseFloat(this.alipay) + Number.parseFloat(this.wechat_pay) + Number.parseFloat(this.bank_card) + Number.parseFloat(this.online_price) + Number.parseFloat(this.give_debit)
            },
            online_price(curVal, oldVal) {
                this.sumPrice = Number.parseFloat(curVal) + Number.parseFloat(this.recharge) + Number.parseFloat(this.alipay) + Number.parseFloat(this.wechat_pay) + Number.parseFloat(this.bank_card) + Number.parseFloat(this.cash) + Number.parseFloat(this.give_debit)
            },
        }
    }
</script>
<style scoped>
</style>



    
