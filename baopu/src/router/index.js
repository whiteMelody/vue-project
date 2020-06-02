import Vue from 'vue'
import Router from 'vue-router'

//首页
const Index = resolve => require(['@/views/Index'], resolve)
//用户登录
const Login = resolve => require(['@/views/Login'], resolve)
//比赛（投注）详情
const SoccerDetailBet = resolve => require(['@/views/SoccerDetailBet'], resolve)

/**
 * 达人推荐模块
 */
//达人推荐
const Expert = resolve => require(['@/views/Expert/Expert'], resolve)
//达人详情
const ExpertDetail = resolve => require(['@/views/Expert/ExpertDetail'], resolve)
// import ExpertDetail from '@/views/Expert/ExpertDetail'
//达人推荐详情
const ExpertRecommend = resolve => require(['@/views/Expert/ExpertRecommend'], resolve)
// import ExpertRecommend from '@/views/Expert/ExpertRecommend'

/**
 * 支付模块
 */
//购买
const Buy = resolve => require(['@/views/Pay/Buy'], resolve)
//支付
const Pay = resolve => require(['@/views/Pay/Pay'], resolve)
//支付失败
// import PayFail from '@/views/Pay/PayFail'
const PayFail = resolve => require(['@/views/Pay/PayFail'], resolve)
//支付结果回调
// import PayResult from '@/views/Pay/PayResult'
const PayResult = resolve => require(['@/views/Pay/PayResult'], resolve)
//支付成功
// import PaySuccess from '@/views/Pay/PaySuccess'
const PaySuccess = resolve => require(['@/views/Pay/PaySuccess'], resolve)
//充值
const Recharge = resolve => require(['@/views/Pay/Recharge'], resolve)
//微信公众号充值
const WxRecharge = resolve => require(['@/views/Pay/WxRecharge'], resolve)
//微信公众号支付
const WxPay = resolve => require(['@/views/Pay/WxPay'], resolve)

/**
 * 金币商城模块
 */
//金币商城
const Store = resolve => require(['@/views/Store/Store'], resolve)
//金币商城 添加收货地址
// import StoreAddAddress from '@/views/Store/StoreAddAddress'
const StoreAddAddress = resolve => require(['@/views/Store/StoreAddAddress'], resolve)
//金币商城 添加订单地址
// import StoreAddOrderAddress from '@/views/Store/StoreAddOrderAddress'
const StoreAddOrderAddress = resolve => require(['@/views/Store/StoreAddOrderAddress'], resolve)
//金币商城 管理收货地址
// import StoreDeliveryAddress from '@/views/Store/StoreDeliveryAddress'
const StoreDeliveryAddress = resolve => require(['@/views/Store/StoreDeliveryAddress'], resolve)
//金币商城 商品详情
// import StoreDetail from '@/views/Store/StoreDetail'
const StoreDetail = resolve => require(['@/views/Store/StoreDetail'], resolve)
//金币商城 抽奖记录
// import StoreDrawRecord from '@/views/Store/StoreDrawRecord'
const StoreDrawRecord = resolve => require(['@/views/Store/StoreDrawRecord'], resolve)
//金币商城 修改收货地址
// import StoreEditAddress from '@/views/Store/StoreEditAddress'
const StoreEditAddress = resolve => require(['@/views/Store/StoreEditAddress'], resolve)
//金币商城 修改订单收货地址
// import StoreEditOrderAddress from '@/views/Store/StoreEditOrderAddress'
const StoreEditOrderAddress = resolve => require(['@/views/Store/StoreEditOrderAddress'], resolve)
//金币商城 订单收货地址
// import StoreOrderAddress from '@/views/Store/StoreOrderAddress'
const StoreOrderAddress = resolve => require(['@/views/Store/StoreOrderAddress'], resolve)
//金币商城 订单详情
// import StoreOrderDetail from '@/views/Store/StoreOrderDetail'
const StoreOrderDetail = resolve => require(['@/views/Store/StoreOrderDetail'], resolve)

/**
 * 个人中心模块
 */
//个人中心
// import User from '@/views/User/User'
const User = resolve => require(['@/views/User/User'], resolve)
//个人中心 我的关注
// import UserFav from '@/views/User/UserFav'
const UserFav = resolve => require(['@/views/User/UserFav'], resolve)
//个人中心 我的红包
// import UserRedBag from '@/views/User/UserRedBag'
const UserRedBag = resolve => require(['@/views/User/UserRedBag'], resolve)
//个人中心 我的竞猜记录
// import UserTicketAll from '@/views/User/UserTicketAll'
const UserTicketAll = resolve => require(['@/views/User/UserTicketAll'], resolve)
//个人中心 我的已购付费方案记录
const UserBought = resolve => require(['@/views/User/UserBought'], resolve)
//个人中心 竞猜结果
// import SoccerResult from '@/views/User/SoccerResult'
const SoccerResult = resolve => require(['@/views/User/SoccerResult'], resolve)
//个人中心 账户明细
// import DealAll from '@/views/User/DealAll'
const DealAll = resolve => require(['@/views/User/DealAll'], resolve)

/**
 * WebApp模块
 */
//邀请有奖
const Invite = resolve => require(['@/views/Web/Invite'], resolve)
//领取邀请红包
const InviteGet = resolve => require(['@/views/Web/InviteGet'], resolve)
//邀请记录
const InviteRecord = resolve => require(['@/views/Web/InviteRecord'], resolve)
//比赛信息
const MatchData = resolve => require(['@/views/Web/MatchData'], resolve)
//比赛球员信息
const MatchPlayerData = resolve => require(['@/views/Web/MatchPlayerData'], resolve)


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/SoccerDetailBet/:matchID',
      name: 'SoccerDetailBet',
      component: SoccerDetailBet
    },{
      path: '/Login',
      name: 'Login',
      component: Login
    },{
      path: '/Expert',
      name: 'Expert',
      component: Expert
    },{
      path: '/ExpertDetail/:newsUserID',
      name: 'ExpertDetail',
      component: ExpertDetail
    },{
      path: '/ExpertRecommend/:newsID/:share',
      name: 'ExpertRecommend',
      component: ExpertRecommend
    },{
      path: '/StoreDetail/:id',
      name: 'StoreDetail',
      component: StoreDetail
    },{
      path: '/Buy',
      name: 'Buy',
      component: Buy
    },{
      path: '/Pay',
      name: 'Pay',
      component: Pay
    },{
      path: '/PayFail',
      name: 'PayFail',
      component: PayFail
    },{
      path: '/PayResult',
      name: 'PayResult',
      component: PayResult
    },{
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    },{
      path: '/Recharge',
      name: 'Recharge',
      component: Recharge
    },{
      path: '/WxPay',
      name: 'WxPay',
      component: WxPay
    },{
      path: '/WxRecharge',
      name: 'WxRecharge',
      component: WxRecharge
    },{
      path: '/Store',
      name: 'Store',
      component: Store
    },{
      path: '/StoreAddAddress',
      name: 'StoreAddAddress',
      component: StoreAddAddress
    },{
      path: '/StoreAddOrderAddress/:goodsid',
      name: 'StoreAddOrderAddress',
      component: StoreAddOrderAddress
    },{
      path: '/StoreDeliveryAddress',
      name: 'StoreDeliveryAddress',
      component: StoreDeliveryAddress
    },{
      path: '/StoreDrawRecord',
      name: 'StoreDrawRecord',
      component: StoreDrawRecord
    },{
      path: '/StoreEditAddress/:recipients/:mobilePhone/:address',
      name: 'StoreEditAddress',
      component: StoreEditAddress
    },{
      path: '/StoreEditOrderAddress/:recipients/:mobilePhone/:address',
      name: 'StoreEditOrderAddress',
      component: StoreEditOrderAddress
    },{
      path: '/StoreOrderAddress',
      name: 'StoreOrderAddress',
      component: StoreOrderAddress
    },{
      path: '/StoreOrderDetail/:ordernum/:bigtype',
      name: 'StoreOrderDetail',
      component: StoreOrderDetail
    },{
      path: '/User',
      name: 'User',
      component: User
    },{
      path: '/UserFav',
      name: 'UserFav',
      component: UserFav
    },{
      path: '/UserRedBag',
      name: 'UserRedBag',
      component: UserRedBag
    },{
      path: '/UserTicketAll',
      name: 'UserTicketAll',
      component: UserTicketAll
    },{
      path: '/UserBought',
      name: 'UserBought',
      component: UserBought
    },{
      path: '/SoccerResult/:orderID',
      name: 'SoccerResult',
      component: SoccerResult
    },{
      path: '/DealAll',
      name: 'DealAll',
      component: DealAll
    },
    {
      path: '/Invite',
      name: 'Invite',
      component: Invite
    },
    {
      path: '/InviteGet/:uuid',
      name: 'InviteGet',
      component: InviteGet
    },
    {
      path: '/InviteRecord/:uuid',
      name: 'InviteRecord',
      component: InviteRecord
    },
    {
      path: '/MatchData/:teamID',
      name: 'MatchData',
      component: MatchData
    },
    {
      path: '/MatchPlayerData/:playerID',
      name: 'MatchPlayerData',
      component: MatchPlayerData
    }
  ]
})

// router.afterEach(() => {
//   window.scrollTo(0, 500)
//   console.log(1)
// })

// router.beforeEach(function (transition) {
//   window.scrollTo(0, 0)
//   next();
// })

Vue.use(Router)

export default router;
