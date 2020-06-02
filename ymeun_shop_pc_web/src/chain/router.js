import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue' //登录

import { Toast  } from 'vant';

Vue.use(Router)
Vue.use(Toast);

const routes = [{
  path: '/',
  name: 'layout',
  component: resolve => require(['./views/Index/Index.vue'], resolve),
  redirect: '/Login',
  children: [
    // 首页
    {
      path: '/StoreData',
      name: 'StoreData',
      component: resolve => require(['./views/Business/StoreData/StoreData.vue'], resolve),
    },
    // 门店数据
    {
      path: '/StoreDataList',
      name: 'StoreDataList',
      component: resolve => require(['./views/Business/StoreData/StoreDataList.vue'], resolve),
    },
    // 门店数据--门店销售业绩
    {
      path: '/ShopMarket',
      name: 'ShopMarket',
      component: resolve => require(['./views/Business/StoreData/ShopMarket.vue'], resolve),
    },

    // 门店数据--门店划扣业绩
    {
      path: '/ShopDeduct',
      name: 'ShopDeduct',
      component: resolve => require(['./views/Business/StoreData/ShopDeduct.vue'], resolve),
    },

    // 门店数据--门店数据业绩详情
    {
      path: '/TotalPerformance',
      name: 'TotalPerformance',
      component: resolve => require(['./views/Business/TotalPerformance.vue'], resolve),

    },
    // 门店数据-门店详情
    {
      path: '/PerformanceShopDel',
      name: 'PerformanceShopDel',
      component: resolve => require(['./views/Business/ShopData/PerformanceShopDel.vue'], resolve),
    },
    // 门店数据--总销耗业绩
    {
      path: '/ConsumeDetails',
      name: 'ConsumeDetails',
      component: resolve => require(['./views/Business/ShopData/ConsumeDetails.vue'], resolve),
    },
    // 门店数据--月度数据明细
    {
      path: '/MonthlyDataDetails',
      name: 'MonthlyDataDetails',
      component: resolve => require(['./views/Business/ShopData/MonthlyDataDetails.vue'], resolve),
    },
    // 门店数据--智能门店评分详情
    {
      path: '/SmartStoreList',
      name: 'SmartStoreList',
      component: resolve => require(['./views/Business/SmartStoreList.vue'], resolve),
    },
    // 顾客数据
    {
      path: '/CustomerData',
      name: 'CustomerData',
      component: resolve => require(['./views/Business/CustomerData.vue'], resolve),
    },
    // 员工数据--员工别名设置
    {
      path: '/EmployeeData',
      name: 'EmployeeData',
      component: resolve => require(['./views/Business/TeamManagement/Index.vue'], resolve),
    },
    // 任务管理
    {
      path: '/TaskManagement',
      name: 'TaskManagement',
      component: resolve => require(['./views/Business/Task/TaskManagement.vue'], resolve),
    },
    // 人事调动
    {
      path: '/PersonnelTransferList',
      name: 'PersonnelTransferList',
      component: resolve => require(['./views/Business/PersonnelTransferList.vue'], resolve),
    },
    // 消息管理
    {
      path: '/MessageManagement',
      name: 'MessageManagement',
      component: resolve => require(['./views/Business/InformationManagement/MessageManagement.vue'], resolve),
    },
    // 消息管理--发布消息
    {
      path: '/PublishNews',
      name: 'PublishNews',
      component: resolve => require(['./views/Business/InformationManagement/PublishNews.vue'], resolve),
    },
    //消息列表
    {
      path: '/MessageList',
      name: 'MessageList',
      component: resolve => require(['./views/Business/MessageList/MessageList.vue'], resolve),
    },
    // 账号管理
    {
      path: '/AccountManagement',
      name: 'AccountManagement',
      component: resolve => require(['./views/Business/AccountManagement.vue'], resolve),
    },
    // 账号管理--新增账号
    {
      path: '/NewAccountNumber',
      name: 'NewAccountNumber',
      component: resolve => require(['./views/Business/NewAccountNumber.vue'], resolve),
    },
    // 顾客数据-新增顾客
    {
      path: '/AddCustomer',
      name: 'AddCustomer',
      component: resolve => require(['./views/Business/AddCustomer.vue'], resolve),
    },
    // 顾客数据-修改顾客
    {
      path: '/ModificationAddCustomer',
      name: 'ModificationAddCustomer',
      component: resolve => require(['./views/Business/ModificationAddCustomer.vue'], resolve),
    },

    // 顾客数据-顾客个人详情
    {
      path: '/CustomerCenter',
      name: 'CustomerCenter',
      component: resolve => require(['./views/Business/CustomerDetails/CustomerCenter.vue'], resolve),
    },

    // ProjectManagement  项目管理
    //项目管理
    {
      path: '/ProjectManagement',
      name: 'ProjectManagement',
      component: resolve => require(['./views/Business/ProjectManagement/Index.vue'], resolve),
    },
    //渠道管理
    {
      path: '/ChannelManagement',
      name: 'ChannelManagement',
      component: resolve => require(['./views/Business/ChannelManagement/Index.vue'], resolve),
    },
    //经营报表
    {
      path: '/OperationStatement',
      name: 'OperationStatement',
      component: resolve => require(['./views/Business/OperationStatement/Index.vue'], resolve),
    },

    //合作企业
    {
      path: '/CooperativeEnterprise',
      name: 'CooperativeEnterprise',
      component: resolve => require(['./views/Business/CooperativeEnterprise/CooperativeEnterpriseList.vue'], resolve),
    },
    //门店目标列表
    {
      path: '/TargetManagement',
      name: 'TargetManagement',
      component: resolve => require(['./views/Business/TargetManagement/TargetManagementList.vue'], resolve),
    },
    //合作企业开单列表
    {
      path: '/EnterpriseOrderList',
      name: 'EnterpriseOrderList',
      component: resolve => require(['./views/Business/CooperativeEnterprise/EnterpriseOrderList.vue'], resolve),
    },

    //门店目标详情
    {
      path: '/TargetDetails',
      name: 'TargetDetails',
      component: resolve => require(['./views/Business/TargetManagement/TargetDetails.vue'], resolve),
    },

    //营销中心列表
    {
      path: '/MarketingList',
      name: 'MarketingList',
      component: resolve => require(['./views/Business/Marketing/MarketingList.vue'], resolve),
    },
    //营销中心-新增客户资料
    {
      path: '/AddMarketing',
      name: 'AddMarketing',
      component: resolve => require(['./views/Business/Marketing/AddMarketing.vue'], resolve),
    },
    //营销中心-修改客户资料
    {
      path: '/MarketingEdit',
      name: 'MarketingEdit',
      component: resolve => require(['./views/Business/Marketing/MarketingEdit.vue'], resolve),
    },
    //预约排期表
    {
      path: '/BookingSchedule',
      name: 'BookingSchedule',
      component: resolve => require(['./views/Business/BookingSchedule/Index.vue'], resolve),
    },
    //任务列表
    {
      path: '/TaskList',
      name: 'TaskList',
      component: resolve => require(['./views/Business/Task/TaskList.vue'], resolve),
    },
    //运营管理-营销渠道
    {
      path: '/OperationChannelSet',
      name: 'OperationChannelSet',
      component: resolve => require(['./views/Business/OperationChannel/OperationChannelSet.vue'], resolve),
    },
    //数据管理-客户分析
    {
      path: '/CustomerAnalysis',
      name: 'CustomerAnalysis',
      component: resolve => require(['./views/Business/Client/CustomerAnalysis.vue'], resolve),
    },
    //任务中心
    {
      path: '/MissionCenter',
      name: 'MissionCenter',
      component: resolve => require(['./views/Business/MissionCenter/Index.vue'], resolve),
      meta: {
        title: '任务中心'
      }
    },
    //任务员工详情
    {
      path: '/StaffDetails',
      name: 'StaffDetails',
      component: resolve => require(['./views/Business/MissionCenter/StaffDetails.vue'], resolve),
      meta: {
        title: '员工详情'
      },
    },

    //操作日志
    {
      path: '/OperationList',
      name: 'OperationList',
      component: resolve => require(['./views/Business/OperationList/Index.vue'], resolve),
      meta: {
        title: '操作日志'
      },
    },

    //商品列表
    {
      path: '/CommodityList',
      name: 'CommodityList',
      component: resolve => require(['./views/storageRoom/Commodity/CommodityList.vue'], resolve),
      meta: {
        title: '商品列表'
      }
    },

    //商品详情
    {
      path: '/CommodityDetail',
      name: 'CommodityDetail',
      component: resolve => require(['./views/storageRoom/Commodity/CommodityDetail.vue'], resolve),
      meta: {
        title: '商品详情'
      }
    },

    //入库订单详情
    {
      path: '/InStorageOrderDetail',
      name: 'InStorageOrderDetail',
      component: resolve => require(['./views/storageRoom/InStorage/InStorageOrderDetail.vue'], resolve),
      meta: {
        title: '入库订单详情'
      }
    },

    //入库订单审核
    {
      path: '/InStorageOrderCheck',
      name: 'InStorageOrderCheck',
      component: resolve => require(['./views/storageRoom/InStorage/InStorageOrderCheck.vue'], resolve),
      meta: {
        title: '入库订单审核'
      }
    },

    //入库订单列表
    {
      path: '/InStorageOrderList',
      name: 'InStorageOrderList',
      component: resolve => require(['./views/storageRoom/InStorage/InStorageOrderList.vue'], resolve),
      meta: {
        title: '入库订单列表'
      }
    },

    //入库订单记录
    {
      path: '/InStorageRecordList',
      name: 'InStorageRecordList',
      component: resolve => require(['./views/storageRoom/InStorage/InStorageRecordList.vue'], resolve),
      meta: {
        title: '入库订单记录'
      }
    },

    //出库订单审核
    {
      path: '/OutStorageOrderCheck',
      name: 'OutStorageOrderCheck',
      component: resolve => require(['./views/storageRoom/OutStorage/OutStorageOrderCheck.vue'], resolve),
      meta: {
        title: '出库订单审核'
      }
    },

    //出库订单详情
    {
      path: '/OutStorageOrderDetail',
      name: 'OutStorageOrderDetail',
      component: resolve => require(['./views/storageRoom/OutStorage/OutStorageOrderDetail.vue'], resolve),
      meta: {
        title: '出库订单详情'
      }
    },

    //出库订单列表
    {
      path: '/OutStorageOrderList',
      name: 'OutStorageOrderList',
      component: resolve => require(['./views/storageRoom/OutStorage/OutStorageOrderList.vue'], resolve),
      meta: {
        title: '出库订单列表'
      }
    },

    //出库订单记录
    {
      path: '/OutStorageRecordList',
      name: 'OutStorageRecordList',
      component: resolve => require(['./views/storageRoom/OutStorage/OutStorageRecordList.vue'], resolve),
      meta: {
        title: '出库订单记录'
      }
    },

    //调拨列表
    {
      path: '/TransfersList',
      name: 'TransfersList',
      component: resolve => require(['./views/storageRoom/Transfers/TransfersList.vue'], resolve),
      meta: {
        title: '调拨列表'
      }
    },

    //配方管理
    {
      path: '/RecipeManagement',
      name: 'RecipeManagement',
      component: resolve => require(['./views/storageRoom/RecipeManagement/RecipeManagement.vue'], resolve),
      meta: {
        title: '配方管理'
      }
    },

    //调拨详情
    {
      path: '/TransfersDetail',
      name: 'TransfersDetail',
      component: resolve => require(['./views/storageRoom/Transfers/TransfersDetail.vue'], resolve),
      meta: {
        title: '调拨详情'
      }
    },
    //请货列表
    {
      path: '/PleaseGoodsList',
      name: 'PleaseGoodsList',
      component: resolve => require(['./views/storageRoom/PleaseGoods/PleaseGoodsList.vue'], resolve),
      meta: {
        title: '请货列表'
      }
    },
    //请货详情
    {
      path: '/PleaseGoodsDetail',
      name: 'PleaseGoodsDetail',
      component: resolve => require(['./views/storageRoom/PleaseGoods/PleaseGoodsDetail.vue'], resolve),
      meta: {
        title: '请货详情'
      }
    },

    //配方详情
    {
      path: '/RecipeDetail',
      name: 'RecipeDetail',
      component: resolve => require(['./views/storageRoom/RecipeManagement/RecipeDetail.vue'], resolve),
      meta: {
        title: '配方详情'
      }
    },

    //入库列表
    {
      path: '/InStorageList',
      name: 'InStorageList',
      component: resolve => require(['./views/storageRoom/InStorage/InStorageList.vue'], resolve),
      meta: {
        title: '入库列表'
      }
    },

    //单条入库
    {
      path: '/InStorageOne',
      name: 'InStorageOne',
      component: resolve => require(['./views/storageRoom/InStorage/InStorageOne.vue'], resolve),
      meta: {
        title: '单条入库'
      }
    },

    //出库列表
    {
      path: '/OutStorageList',
      name: 'OutStorageList',
      component: resolve => require(['./views/storageRoom/OutStorage/OutStorageList.vue'], resolve),
      meta: {
        title: '出库列表'
      }
    },

    //单条出库
    {
      path: '/OutStorageOne',
      name: 'OutStorageOne',
      component: resolve => require(['./views/storageRoom/OutStorage/OutStorageOne.vue'], resolve),
      meta: {
        title: '单条出库'
      }
    },

    //供应商列表
    {
      path: '/BusinessyList',
      name: 'BusinessyList',
      component: resolve => require(['./views/storageRoom/Business/BusinessyList.vue'], resolve),
      meta: {
        title: '供应商列表'
      }
    },

    //供应商详情
    {
      path: '/BusinessDetail',
      name: 'BusinessDetail',
      component: resolve => require(['./views/storageRoom/Business/BusinessDetail.vue'], resolve),
      meta: {
        title: '供应商详情'
      }
    },

    //采购订单列表
    {
      path: '/PurchaseOrderList',
      name: 'PurchaseOrderList',
      component: resolve => require(['./views/storageRoom/PurchaseOrder/PurchaseOrderList.vue'], resolve),
      meta: {
        title: '采购订单列表'
      }
    },

    //采购制单
    {
      path: '/PurchaseOrder',
      name: 'PurchaseOrder',
      component: resolve => require(['./views/storageRoom/PurchaseOrder/PurchaseOrder.vue'], resolve),
      meta: {
        title: '采购制单'
      }
    },

    //采购计划制单
    {
      path: '/PurchasePlan',
      name: 'PurchasePlan',
      component: resolve => require(['./views/storageRoom/PurchaseOrder/PurchasePlan.vue'], resolve),
      meta: {
        title: '采购计划制单'
      }
    },

    //采购计划制单详情页
    {
      path: '/PurchasePlanDetail',
      name: 'PurchasePlanDetail',
      component: resolve => require(['./views/storageRoom/PurchaseOrder/PurchasePlanDetail.vue'], resolve),
      meta: {
        title: '采购计划制单详情页'
      }
    },

    //采购计划列表
    {
      path: '/PurchasePlanList',
      name: 'PurchasePlanList',
      component: resolve => require(['./views/storageRoom/PurchaseOrder/PurchasePlanList.vue'], resolve),
      meta: {
        title: '采购计划列表'
      }
    },

    //采购订单审核
    {
      path: '/PurchaseOrderCheck',
      name: 'PurchaseOrderCheck',
      component: resolve => require(['./views/storageRoom/PurchaseOrder/PurchaseOrderCheck.vue'], resolve),
      meta: {
        title: '采购订单审核'
      }
    },

    //门店请货列表
    {
      path: '/StorePleaseGoodsList',
      name: 'StorePleaseGoodsList',
      component: resolve => require(['./views/storageRoom/StorePleaseGoods/StorePleaseGoodsList.vue'], resolve),
      meta: {
        title: '门店请货列表'
      }
    },

    //门店请货详情
    {
      path: '/StorePleaseGoodsDetail',
      name: 'StorePleaseGoodsDetail',
      component: resolve => require(['./views/storageRoom/StorePleaseGoods/StorePleaseGoodsDetail.vue'], resolve),
      meta: {
        title: '门店请货详情'
      }
    },

    //盘点
    {
      path: '/TakeStockList',
      name: 'TakeStockList',
      component: resolve => require(['./views/storageRoom/TakeStock/TakeStockList.vue'], resolve),
      meta: {
        title: '盘点列表'
      }
    },
    //开启盘点
    {
      path: '/AddTakeStock',
      name: 'AddTakeStock',
      component: resolve => require(['./views/storageRoom/TakeStock/AddTakeStock.vue'], resolve),
      meta: {
        title: '开启盘点'
      }
    },
    //盘点详情
    {
      path: '/TakeStockDetail',
      name: 'TakeStockDetail',
      component: resolve => require(['./views/storageRoom/TakeStock/TakeStockDetail.vue'], resolve),
      meta: {
        title: '盘点详情'
      }
    },
    //沉淀客户
    {
      path: '/SedimentClient',
      name: 'SedimentClient',
      component: resolve => require(['./views/Business/Client/SedimentClient.vue'], resolve),
      meta: {
        title: '沉淀客户'
      }
    },

      //回访列表
    {
      path: '/RevisitList',
      name: 'RevisitList',
      component: resolve => require(['./views/Business/Task/RevisitList.vue'], resolve),
      meta: {
        title: '回访列表'
      }
    },

      //历史分配记录
    {
      path: '/DistributionList',
      name: 'DistributionList',
      component: resolve => require(['./views/Business/Task/DistributionList.vue'], resolve),
      meta: {
        title: '历史分配记录'
      }
    },

  ]
},
  {
    path: '/Login',
    name: 'Login',
    component: resolve => require(['./views/Login.vue'], resolve),
    meta: {
      title: '登录'
    },
  },
]

const router = new Router({
  routes,
})

// 进入页面判断是否微信授权 没授权 拉取授权
//Router
router.beforeEach((to, from, next) => {

  let getTokenLocal = localStorage.getItem("getToken");

  if(to.path != "/Login" && getTokenLocal == null)
  {
    Toast({
      type:"loading",
      message: '跳转登录中...',
      onClose:()=>{
        router.push({name: 'Login'})
      }
    })
  }

  next();
})


export default router
