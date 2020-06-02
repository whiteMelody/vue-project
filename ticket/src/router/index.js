import Vue from 'vue'
import Router from 'vue-router'
import Base from '../assets/js/base'

//首页
const Index = resolve => require(['@/views/Index'], resolve)
//彩票大厅
const Lobby = resolve => require(['@/views/Lobby'], resolve)
//登录
const Login = resolve => require(['@/views/Login'], resolve)
//开奖公告
const Notice = resolve => require(['@/views/Notice'], resolve)
//开奖公告（更多）
const NoticeMore = resolve => require(['@/views/NoticeMore'], resolve)
//投注详情
const TicketDetail = resolve => require(['@/views/TicketDetail'], resolve)
//中奖规则
const TicketRule = resolve => require(['@/views/TicketRule'], resolve)
//投注方案
const SoccerDetail = resolve => require(['@/views/SoccerDetail'], resolve)
//投注详情(单关)
const SoccerDetailBet = resolve => require(['@/views/SoccerDetailBet'], resolve)
//投注明细
const SoccerDeal = resolve => require(['@/views/SoccerDeal'], resolve)
//足彩开奖公告
const SoccerList = resolve => require(['@/views/SoccerList'], resolve)
//足彩规则
const SoccerRule = resolve => require(['@/views/SoccerRule'], resolve)

//福彩彩种
//11选5
const LotteryD11 = resolve => require(['@/views/Lottery/LotteryD11'], resolve)
const LotteryD11Order = resolve => require(['@/views/Lottery/LotteryD11Order'], resolve)
//大乐透
const LotteryDlt = resolve => require(['@/views/Lottery/LotteryDlt'], resolve)
const LotteryDltOrder = resolve => require(['@/views/Lottery/LotteryDltOrder'], resolve)
//快三
const LotteryQ3 = resolve => require(['@/views/Lottery/LotteryQ3'], resolve)
const LotteryQ3Order = resolve => require(['@/views/Lottery/LotteryQ3Order'], resolve)
//双色球
const LotterySsq = resolve => require(['@/views/Lottery/LotterySsq'], resolve)
const LotterySsqOrder = resolve => require(['@/views/Lottery/LotterySsqOrder'], resolve)
//足彩
const Soccer = resolve => require(['@/views/Lottery/Soccer'], resolve)
const SoccerOrder = resolve => require(['@/views/Lottery/SoccerOrder'], resolve)

//支付模块
//充值
const Recharge = resolve => require(['@/views/Pay/Recharge'], resolve)
//首次充值活动
const RechargeFirst = resolve => require(['@/views/Pay/RechargeFirst'], resolve)
//微信充值
const WxRecharge = resolve => require(['@/views/Pay/WxRecharge'], resolve)
//支付
const Pay = resolve => require(['@/views/Pay/Pay'], resolve)
//微信支付
const WxPay = resolve => require(['@/views/Pay/WxPay'], resolve)
//支付回调
const PayResult = resolve => require(['@/views/Pay/PayResult'], resolve)
//支付成功
const PaySuccess = resolve => require(['@/views/Pay/PaySuccess'], resolve)
//支付失败
const PayFail = resolve => require(['@/views/Pay/PayFail'], resolve)
//支付等待
const PayInfo = resolve => require(['@/views/Pay/PayInfo'], resolve)

//添加新的银行卡
const AddBankCard = resolve => require(['@/views/User/AddBankCard'], resolve)
//绑定身份证
const BindIDCard = resolve => require(['@/views/User/BindIDCard'], resolve)
//绑定手机
const BindMobile = resolve => require(['@/views/User/BindMobile'], resolve)
//绑定手机 第二步
const BindMobileStep2 = resolve => require(['@/views/User/BindMobileStep2'], resolve)
//绑定手机 第三步
const BindMobileStep3 = resolve => require(['@/views/User/BindMobileStep3'], resolve)
//绑定手机 第四步
const BindMobileStep4 = resolve => require(['@/views/User/BindMobileStep4'], resolve)
//提现
const Cash = resolve => require(['@/views/User/Cash'], resolve)
//支付宝提现
const CashAliPay = resolve => require(['@/views/User/CashAliPay'], resolve)
//账户明细
const DealAll = resolve => require(['@/views/User/DealAll'], resolve)
//找回支付密码
const FindPayPwd = resolve => require(['@/views/User/FindPayPwd'], resolve)
//安全中心
const SafeCenter = resolve => require(['@/views/User/SafeCenter'], resolve)
//设置支付密码
const SetPayPwd = resolve => require(['@/views/User/SetPayPwd'], resolve)
//修改支付密码
const UpdatePayPwd = resolve => require(['@/views/User/UpdatePayPwd'], resolve)
//个人中心
const User = resolve => require(['@/views/User/User'], resolve)
//我的银行卡列表
const UserBankCard = resolve => require(['@/views/User/UserBankCard'], resolve)
//修改/查看个人资料
const UserInfo = resolve => require(['@/views/User/UserInfo'], resolve)
//竞猜记录
const UserTicketAll = resolve => require(['@/views/User/UserTicketAll'], resolve)

//-2018年3月13日16:03:37 新增2个页面
//福利中心
const UserWelfare = resolve => require(['@/views/User/UserWelfare'], resolve)
//红包
const UserRedBag = resolve => require(['@/views/User/UserRedBag'], resolve)

//新闻模块
const NewsList = resolve => require(['@/views/News/NewsList'], resolve)
const NewsDetail = resolve => require(['@/views/News/NewsDetail'], resolve)
//公告模块
const NoticeDetail = resolve => require(['@/views/News/NoticeDetail'], resolve)
//活动模块
const ActReturn = resolve => require(['@/views/News/ActReturn'], resolve)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Lobby',
      name: 'Lobby',
      component: Lobby
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/NoticeMore',
      name: 'NoticeMore',
      component: NoticeMore
    },
    {
      path: '/Recharge',
      name: 'Recharge',
      component: Recharge
    },
    {
      path: '/RechargeFirst/:money',
      name: 'RechargeFirst',
      component: RechargeFirst
    },
    {
      path: '/WxRecharge',
      name: 'WxRecharge',
      component: WxRecharge
    },
    {
      path: '/Pay/:money/:tradeNo',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/WxPay',
      name: 'WxPay',
      component: WxPay
    },
    {
      path: '/PayResult',
      name: 'PayResult',
      component: PayResult
    },
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    },
    {
      path: '/PayInfo',
      name: 'PayInfo',
      component: PayInfo
    },
    {
      path: '/PayFail',
      name: 'PayFail',
      component: PayFail
    },
    {
      path: '/TicketDetail/:ticketID',
      name: 'TicketDetail',
      component: TicketDetail
    },
    {
      path: '/TicketRule/:lotteryType',
      name: 'TicketRule',
      component: TicketRule
    },
    {
      path: '/LotteryD11/:playIndex',
      name: 'LotteryD11',
      component: LotteryD11
    },
    {
      path: '/LotteryDlt/:playIndex',
      name: 'LotteryDlt',
      component: LotteryDlt
    },
    {
      path: '/LotteryQ3/:playIndex',
      name: 'LotteryQ3',
      component: LotteryQ3
    },
    {
      path: '/LotterySsq/:playIndex',
      name: 'LotterySsq',
      component: LotterySsq
    },{
      path: '/LotteryD11Order/:playIndex',
      name: 'LotteryD11Order',
      component: LotteryD11Order
    },
    {
      path: '/LotteryDltOrder/:playIndex',
      name: 'LotteryDltOrder',
      component: LotteryDltOrder
    },
    {
      path: '/LotteryQ3Order/:playIndex',
      name: 'LotteryQ3Order',
      component: LotteryQ3Order
    },
    {
      path: '/LotterySsqOrder/:playIndex',
      name: 'LotterySsqOrder',
      component: LotterySsqOrder
    },
    {
      path: '/Soccer',
      name: 'Soccer',
      component: Soccer
    },
    {
      path: '/SoccerOrder/:playIndex',
      name: 'SoccerOrder',
      component: SoccerOrder
    },
    {
      path: '/SoccerList',
      name: 'SoccerList',
      component: SoccerList
    },
    {
      path: '/SoccerRule',
      name: 'SoccerRule',
      component: SoccerRule
    },
    {
      path: '/SoccerDetail/:ticketID',
      name: 'SoccerDetail',
      component: SoccerDetail
    },
    {
      path: '/SoccerDetailBet/:matchID',
      name: 'SoccerDetailBet',
      component: SoccerDetailBet
    },
    {
      path: '/SoccerDeal/:ticketID',
      name: 'SoccerDeal',
      component: SoccerDeal
    },
    {
      path: '/AddBankCard',
      name: 'AddBankCard',
      component: AddBankCard
    },
    {
      path: '/BindIDCard',
      name: 'BindIDCard',
      component: BindIDCard
    },
    {
      path: '/BindMobile',
      name: 'BindMobile',
      component: BindMobile
    },
    {
      path: '/BindMobileStep2',
      name: 'BindMobileStep2',
      component: BindMobileStep2
    },
    {
      path: '/BindMobileStep3',
      name: 'BindMobileStep3',
      component: BindMobileStep3
    },
    {
      path: '/BindMobileStep4',
      name: 'BindMobileStep4',
      component: BindMobileStep4
    },
    {
      path: '/Cash',
      name: 'Cash',
      component: Cash
    },
    {
      path: '/CashAliPay',
      name: 'CashAliPay',
      component: CashAliPay
    },
    {
      path: '/DealAll',
      name: 'DealAll',
      component: DealAll
    },
    {
      path: '/FindPayPwd',
      name: 'FindPayPwd',
      component: FindPayPwd
    },
    {
      path: '/SafeCenter',
      name: 'SafeCenter',
      component: SafeCenter
    },
    {
      path: '/SetPayPwd',
      name: 'SetPayPwd',
      component: SetPayPwd
    },
    {
      path: '/UpdatePayPwd',
      name: 'UpdatePayPwd',
      component: UpdatePayPwd
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/UserBankCard',
      name: 'UserBankCard',
      component: UserBankCard
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/UserTicketAll',
      name: 'UserTicketAll',
      component: UserTicketAll
    },
    {
      path: '/UserWelfare',
      name: 'UserWelfare',
      component: UserWelfare
    },
    {
      path: '/UserRedBag',
      name: 'UserRedBag',
      component: UserRedBag
    },
    {
      path: '/NewsList',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/NewsDetail/:newsID',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/NoticeDetail/:noticeID/:noticeType',
      name: 'NoticeDetail',
      component: NoticeDetail
    },
    {
      path: '/ActReturn',
      name: 'ActReturn',
      component: ActReturn
    },

    //--  H5 history配置
    // {
    //   path: '/index.html',
    //   component: Index
    // }, {
    //   path: '*',
    //   component: Index
    // },
  ]
})

router.beforeEach(({path, params, query, fullPath, name}, from, next) => {

  // console.log('来自:' + from.name)
  // console.log('跳转至:' + name)
  // console.log(next)

  // console.log('params:'+ JSON.stringify(params))
  // console.log('query:'+ JSON.stringify(query))
  // console.log('name:'+name)
  // console.log('fullPath:'+fullPath)

  //查询query是否有渠道号

  let source = query.source

  let mySource = Base.getCookie("source")

  if(Base.isNull(mySource)){
    mySource = 'wap'
  }

  if(source){
    next()
  }else{
    if(fullPath.includes('?')){
      //已有query
      next({ path: fullPath + '&source=' +  mySource })
    }else{
      //没有query
      next({ path: fullPath + '?source=' +  mySource })
    }
  }

})


Vue.use(Router)

export default router;
