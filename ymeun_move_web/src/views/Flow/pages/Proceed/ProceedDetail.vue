<template>
  <div class="wb100 bg-white1" :style="'minHeight:' + minHeight + 'px' ">

      <!--   header   -->
      <Header :title="'收款详情'" :back="true"></Header>

      <div class="clear4"></div>

      <div class="wb100 bg-white">
          <div class="pa20 fc-gray4">
              <p class="f38rem lh60rem">{{userData.customer_name}}</p>
              <p class="f28rem lh60rem">单号：{{userData.orders_code}}</p>
              <p class="f28rem lh60rem">电话：{{userData.customer_mobile}}</p>
          </div>
          <div class="clear4"></div>
          <div class="pa20 bg-white1 fc-gray3 f28rem">
              收款详情
          </div>
          <div class="clear0"></div>
          <div class="pa20 lh60rem f28rem fc-gray3">

            <div class="wb100" v-if="userData.arrears_price == 0">
                <p class="f26rem">总收款</p>
                <p class="f34rem fc-green">￥{{userData.orders_payment|_moneyFormat}}</p>
            </div>

            <div class="wb100" v-else>
                <div class="wb50 fl">
                    <p class="f26rem">总收款</p>
                    <p class="f34rem fc-green">￥{{userData.orders_payment|_moneyFormat}}</p>
                </div>
                <div class="wb50 fl">
                    <p class="f26rem">欠款</p>
                    <p class="f34rem fc-red">￥{{userData.arrears_price|_moneyFormat}}</p>
                </div>
            </div>

            
            <div class="clear4"></div>

              <template v-if="userData.recharge_debit > 0">

                  <div class="wb100">
                      <i class="iconfont iconchongzhikazhifu fc-orange2 f45rem fl mar20"></i>
                      <span class="fl">充值卡支付</span>
                      <span class="fr">￥{{userData.recharge_debit|_moneyFormat}}</span>
                  </div>

                  <div class="clear4 bd-b1 bd-gray"></div>
                  <div class="clear4"></div>

              </template>
              <template v-if="userData.give_debit > 0">

                  <div class="wb100">
                      <i class="iconfont iconquan fc-red f45rem fl mar20"></i>
                      <span class="fl">券额支付</span>
                      <span class="fr">￥{{userData.give_debit|_moneyFormat}}</span>
                  </div>

                  <div class="clear4 bd-b1 bd-gray"></div>
                  <div class="clear4"></div>

              </template>

            <template v-if="userData.orders_alipay > 0">

                <div class="wb100">
                    <i class="iconfont iconzhifubaozhifu fc-blue2 f45rem fl mar20"></i>
                    <span class="fl">支付宝收款</span>
                    <span class="fr">￥{{userData.orders_alipay|_moneyFormat}}</span>
                </div>

                <div class="clear4 bd-b1 bd-gray"></div>
                <div class="clear4"></div>

            </template>

            <template v-if="userData.orders_wechat_pay > 0">

              <div class="wb100">
                  <i class="iconfont iconweixinzhifu fc-green2 f45rem fl mar20"></i>
                  <span class="fl">微信收款</span>
                  <span class="fr">￥{{userData.orders_wechat_pay|_moneyFormat}}</span>
              </div>

              <div class="clear4 bd-b1 bd-gray"></div>
              <div class="clear4"></div>

              </template>

              
            <template v-if="userData.orders_bank_card > 0">

              <div class="wb100">
                <svg class="icon w70rem h50rem fl mat10" aria-hidden="true">
                    <use xlink:href="#iconyinlianzhifu"></use>
                </svg>
                <span class="fl">银行卡支付</span>
                <span class="fr">￥{{userData.orders_bank_card|_moneyFormat}}</span>
              </div>
              
              <div class="clear4 bd-b1 bd-gray"></div>
              <div class="clear4"></div>

              </template>

              
            <template v-if="userData.orders_cash > 0">

              <div class="wb100">
                  <i class="iconfont iconxianjinzhifu fc-brown f45rem fl mar20"></i>
                  <span class="fl">现金支付</span>
                  <span class="fr">￥{{userData.orders_cash|_moneyFormat}}</span>
              </div>
              
              <div class="clear4 bd-b1 bd-gray"></div>
              <div class="clear4"></div>
              
              </template>


            <template v-if="userData.orders_online_price > 0">

              <div class="wb100">
                  <i class="iconfont iconqita fc-blue3 f45rem fl mar20"></i>
                  <span class="fl">其他支付</span>
                  <span class="fr">￥{{userData.orders_online_price|_moneyFormat}}</span>
              </div>

              <div class="clear4 bd-b1 bd-gray"></div>

              </template>

              <div class="clear2"></div>


                    <div class="wb100 fc-gray3 f28rem lh50rem" v-if="userData.arrears_price != 0">
                        
                        <div class="clear0"></div>
                        欠款说明
                        <p class="fc-gray4">{{userData.arrears_describe}}</p>
                <div class="clear4"></div>

                    </div>

            </div>
          

          <div class="clear0"></div>
          <div class="pa20 bg-white1 fc-gray3 f28rem">
              订单信息
          </div>
          <div class="wb100">
              <div class="wb100 f28rem">
                  <template v-for="(item,index) in projectList" >
                      <div class="pa20 relative fc-gray3 lh50rem" @click="projectListFn(index)">
                          <p class="fc-gray4">
                              {{item.items_name}}
                          </p>
                          <p v-if="item.discounts != 0">折扣：{{item.discounts}}（折）</p>
                          <p>数量：{{item.number_one}}</p>
                          <p>实付：￥{{item.payment|_moneyFormat}}</p>
                          <div class="w200rem h50rem absolute fc-green text-right" style="right: .2rem; top: 1rem">
                              查看详情
                              <i class="iconfont iconxiangyou f30rem"></i>
                          </div>
                          <div class="clear0"></div>
                      </div>

                      <div class="clear2 bd-b1 bd-gray"></div>

                  </template>
              </div>
          </div>
      </div>

      <van-dialog
              v-model="showPayInfo"
              title="项目详情"
              :show-cancel-button="false"
      >
          <div class="clear4 bd-white1 bd-b1"></div>

          <div class="pa20 f28rem fc-gray4 lh60rem">
              <p><span class="w150rem fl text-right fc-gray3 mar25">项目</span><span class="fl">{{projectActive.items_name}}</span></p>
              <div class="clear0"></div>
              <p v-if="projectActive.items"><span class="w150rem fl text-right fc-gray3 mar25">项目单价</span><span class="fl">￥{{projectActive.items.price|_moneyFormat}}</span></p>
              <div class="clear0"></div>
              <p><span class="w150rem fl text-right fc-gray3 mar25">活动价格</span><span class="fl">￥{{projectActive.activity_price|_moneyFormat}}</span></p>
              <div class="clear0"></div>
              <p><span class="w150rem fl text-right fc-gray3 mar25">数量</span><span class="fl">{{projectActive.number_one}}</span></p>
              <div class="clear0"></div>
              <p><span class="w150rem fl text-right fc-gray3 mar25">疗程总数</span><span class="fl">{{projectActive.number}}</span></p>
              <div class="clear0"></div>
              <p><span class="w150rem fl text-right fc-gray3 mar25">折扣</span><span class="fl">{{projectActive.discounts}}折</span></p>
              <div class="clear0"></div>
              <p><span class="w150rem fl text-right fc-gray3 mar25">实付金额</span><span class="fl">￥{{projectActive.payment|_moneyFormat}}</span></p>
              <div class="clear0"></div>
          </div>

          <div class="clear4"></div>

      </van-dialog>

  </div>
</template>
<script>

import Header from '../../../../components/Header'
import { getSeeOrdersByOrdersId } from '@/assets/api/Flow/ProceedDetail';
export default {
    name: "ProceedDetail",
    data(){
        return {
            id:'',
            list: [1,2],
            minHeight: 0,
            showPayInfo: false,
            userData:{},
            projectList:[],
            projectActive:{},
            projectListIndex:null,
        }
    },
    components:{
        Header
    },
    methods:{
        getSeeOrdersByOrdersIdFn(){
            let postData = {
                orders_id:this.id
            }
            getSeeOrdersByOrdersId(postData).then(res => {
                this.userData = res.data.customer;
                 res.data.receipt.map((item , index) => {
                    item.discounts =  item.payment / item.price * 10;
                })
                this.projectList = res.data.receipt;
            }).catch((e)=>{
                console.log(e)
            })
        },
        projectListFn(index){
        
            this.projectActive = this.projectList[index];

            this.showPayInfo = true
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getSeeOrdersByOrdersIdFn()
    },
    mounted(){
        this.minHeight = window.innerHeight
    },
}
</script>
<style scoped>
</style>



    
