import Vue from 'vue'
import Router from 'vue-router'
import Dome from './views/Dome.vue'
import Index from './views/Index.vue'; // 首页
import NewIndex from './views/Index/Index.vue'; // 首页
import Login from './views/Login.vue' //登录

import StoreData from './views/StoreData/StoreData.vue' //首页
import TotalPerformance from './views/TotalPerformance.vue' //门店数据--门店数据业绩详情
import SmartStoreList from './views/SmartStoreList.vue' //门店数据--智能门店评分详情
import ShopMarket from './views/StoreData/ShopMarket.vue' //门店数据--门店销售业绩
import ShopDeduct from './views/StoreData/ShopDeduct.vue' //门店数据--门店划扣业绩

import CustomerData from './views/CustomerData.vue' //顾客数据
import AddCustomer from './views/AddCustomer.vue' //顾客数据--新增顾客
import ModificationAddCustomer from './views/ModificationAddCustomer.vue' //顾客数据-- 修改账号
import CustomerCenter from './views/CustomerCenter.vue' //顾客数据-- 顾客个人详情
import EssentialInformation from './views/EssentialInformation.vue' //顾客个人详情-- 基本数据
import CounselingMessage from './views/CounselingMessage.vue' //顾客个人详情-- 咨询信息
import HospitalGuideMessage from './views/HospitalGuideMessage.vue' //顾客个人详情-- 到诊信息
import ConsumptionMessage from './views/ConsumptionMessage.vue' //顾客个人详情-- 消费信息
import CounselingDetail from './views/CounselingDetail.vue' //顾客个人详情-- 消费明细

import EmployeeData from './views/EmployeeData.vue' //员工数据

import TaskManagement from './views/TaskManagement.vue' //任务管理

import PersonnelTransferList from './views/PersonnelTransferList.vue' //人事调动

import MessageManagement from './views/MessageManagement.vue' //消息管理
import PublishNews from './views/PublishNews.vue' //消息管理--发布消息

import AccountManagement from './views/AccountManagement.vue' //账号管理
import NewAccountNumber from './views/NewAccountNumber.vue' //账号管理-- 新增账号

import MessageList from './views/MessageList/MessageList.vue' //消息列表


import { Toast  } from 'vant';

Vue.use(Router)
Vue.use(Toast);

let router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // 重定向到门店数据
      redirect: '/StoreData'
    },
    {
      path: '/NewIndex',
      name: 'NewIndex',
      component: NewIndex,
      // 嵌套路由
      children:[
        // 首页
        {
          path: '/StoreData',
          name: 'StoreData', 
          component: StoreData
        },
        // 门店数据
        {
          path: '/StoreDataList',
          name: 'StoreDataList', 
          component: resolve => require(['./views/StoreData/StoreDataList.vue'], resolve),
        },
        // 门店数据--门店销售业绩
        {
          path: '/ShopMarket',
          name: 'ShopMarket',
          component: ShopMarket
        },
        // 门店数据--门店划扣业绩
        {
          path: '/ShopDeduct',
          name: 'ShopDeduct',
          component: ShopDeduct
        },
        // 门店数据--门店数据业绩详情
        {
          path: '/TotalPerformance',
          name: 'TotalPerformance',
          component: TotalPerformance
        },
        // 门店数据-门店详情
        {
          path: '/PerformanceShopDel', 
          name: 'PerformanceShopDel',
          component: resolve => require(['./views/ShopData/PerformanceShopDel.vue'], resolve),
        },
        // 门店数据--总销耗业绩
        {
          path: '/ConsumeDetails', 
          name: 'ConsumeDetails',
          component: resolve => require(['./views/ShopData/ConsumeDetails.vue'], resolve),
        },
        // 门店数据--智能门店评分详情
        {
          path: '/SmartStoreList', 
          name: 'SmartStoreList',
          component: SmartStoreList
        },
        // 顾客数据
        {
          path: '/CustomerData', 
          name: 'CustomerData',
          component: CustomerData
        },
        // 员工数据
        {
          path: '/EmployeeData', 
          name: 'EmployeeData',
          component: EmployeeData
        },
        // 任务管理
        {
          path: '/TaskManagement', 
          name: 'TaskManagement',
          component: TaskManagement
        },
        // 人事调动
        {
          path: '/PersonnelTransferList', 
          name: 'PersonnelTransferList',
          component: PersonnelTransferList
        },
        // 消息管理
        {
          path: '/MessageManagement', 
          name: 'MessageManagement',
          component: MessageManagement
        },
        // 消息管理--发布消息
        {
          path: '/PublishNews', 
          name: 'PublishNews',
          component: PublishNews
        },
        //消息列表
        {
          path: '/MessageList',
          name: 'MessageList',
          component:MessageList,
        },
        // 账号管理
        {
          path: '/AccountManagement', 
          name: 'AccountManagement',
          component: AccountManagement
        },
        // 账号管理--新增账号
        {
          path: '/NewAccountNumber', 
          name: 'NewAccountNumber',
          component: NewAccountNumber
        },
        // 顾客数据-新增顾客
        {
          path: '/AddCustomer', 
          name: 'AddCustomer',
          component: AddCustomer
        },
        // 顾客数据-修改顾客
        {
          path: '/ModificationAddCustomer', 
          name: 'ModificationAddCustomer',
          component: ModificationAddCustomer
        },
        
        // 顾客数据-顾客个人详情
        {
          path: '/CustomerCenter', 
          name: 'CustomerCenter',
          component: CustomerCenter,
          children:[
            //顾客个人详情-- 基本数据
            {
              path: '/EssentialInformation',
              name: 'EssentialInformation', 
              component: EssentialInformation
            },
            //顾客个人详情-- 咨询信息
            {
              path: '/CounselingMessage',
              name: 'CounselingMessage', 
              component: CounselingMessage
            },
            //顾客个人详情-- 到诊信息
            {
              path: '/HospitalGuideMessage',
              name: 'HospitalGuideMessage', 
              component: HospitalGuideMessage
            },
            //顾客个人详情-- 消费信息
            {
              path: '/ConsumptionMessage',
              name: 'ConsumptionMessage', 
              component: ConsumptionMessage
            },
            //顾客个人详情-- 消费明细
            {
              path: '/CounselingDetail',
              name: 'CounselingDetail', 
              component: CounselingDetail
            },
          ]
        },

          // ProjectManagement  项目管理
        //项目管理
        {
          path: '/ProjectManagement',
          name: 'ProjectManagement',
          component: resolve => require(['./views/ProjectManagement/Index.vue'], resolve),
        },
        //渠道管理
        {
          path: '/ChannelManagement',
          name: 'ChannelManagement',
          component: resolve => require(['./views/ChannelManagement/Index.vue'], resolve),
        },
          //经营报表
        {
          path: '/OperationStatement',
          name: 'OperationStatement',
          component: resolve => require(['./views/OperationStatement/Index.vue'], resolve),
        },
        //合作企业
        {
          path: '/CooperativeEnterprise',
          name: 'CooperativeEnterprise',
          component: resolve => require(['./views/CooperativeEnterprise/CooperativeEnterpriseList.vue'], resolve),
        },
        //门店目标列表
        {
          path: '/TargetManagement',
          name: 'TargetManagement',
          component: resolve => require(['./views/TargetManagement/TargetManagementList.vue'], resolve),
        },
        //合作企业开单列表
        {
          path: '/EnterpriseOrderList',
          name: 'TargetManagement',
          component: resolve => require(['./views/CooperativeEnterprise/EnterpriseOrderList.vue'], resolve),
        },
        //门店目标详情
        {
          path: '/TargetDetails',
          name: 'TargetDetails',
          component: resolve => require(['./views/TargetManagement/TargetDetails.vue'], resolve),
        },
        //营销中心列表
        {
          path: '/MarketingList',
          name: 'MarketingList',
          component: resolve => require(['./views/Marketing/MarketingList.vue'], resolve),
        },
        //营销中心-新增客户资料
        {
          path: '/AddMarketing',
          name: 'AddMarketing',
          component: resolve => require(['./views/Marketing/AddMarketing.vue'], resolve),
        },
        //营销中心-修改客户资料
        {
          path: '/MarketingEdit',
          name: 'MarketingEdit',
          component: resolve => require(['./views/Marketing/MarketingEdit.vue'], resolve),
        },
        //预约排期表
        {
          path: '/BookingSchedule',
          name: 'BookingSchedule',
          component: resolve => require(['./views/BookingSchedule/Index.vue'], resolve),
        },
        //任务列表
        {
          path: '/TaskList',
          name: 'TaskList',
          component: resolve => require(['./views/Task/TaskList.vue'], resolve),
        },

      ]
    },
    {
      path: '/Dome',
      name: 'Dome',
      component: Dome
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
  ]
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
    
  next()
})



export default router
