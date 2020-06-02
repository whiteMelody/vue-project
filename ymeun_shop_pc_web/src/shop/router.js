import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'layout',
    component: resolve => require(['./views/layout/index.vue'], resolve),
    redirect: '/Login',
    children: [
      //首页
      {
        path: '/Home',
        name: 'Home',
        component: resolve => require(['./views/business/Home/Index.vue'], resolve),
        meta: {
          title: '主页'
        }
      },
      //预约排期表
      {
        path: '/BookingSchedule',
        name: 'BookingSchedule',
        component: resolve => require(['./views/business/BookingSchedule/Index.vue'], resolve),
        meta: {
          title: '预约排期表'
        }
      },
      //员工排班表
      {
        path: '/EmployeeSchedules',
        name: 'EmployeeSchedules',
        component: resolve => require(['./views/business/EmployeeSchedules/Index.vue'], resolve),
        meta: {
          title: '员工排班表'
        }
      },
      //流程管理-划扣列表
      {
        path: '/Deduction',
        name: 'Deduction',
        component: resolve => require(['./views/business/Deduction/Index.vue'], resolve),
        meta: {
          title: '流程管理-划扣列表'
        }
      },
      //划扣操作
      {
        path: '/ScratchOperation',
        name: 'ScratchOperation',
        component: resolve => require(['./views/business/Deduction/ScratchOperation.vue'], resolve),
        meta: {
          title: '划扣操作'
        }
      },
      //demo table
      {
        path: '/table',
        name: 'table',
        component: resolve => require(['./views/business/demo/table.vue'], resolve),
        meta: {
          title: 'table'
        }
      },
      //demo form
      {
        path: '/component',
        name: 'component',
        component: resolve => require(['./views/business/demo/component.vue'], resolve),
        meta: {
          title: 'form'
        }
      },
      //分诊列表
      {
        path: '/Triage',
        name: 'Triage',
        // component: resolve => require(['./views/business/Triage/Index.vue'], resolve),
        component: resolve => require(['./views/business/Triage/NewIndex.vue'], resolve),
        meta: {
          title: '分诊列表'
        }
      },
      //新增客户
      {
        path: '/AddClient',
        name: 'AddClient',
        component: resolve => require(['./views/business/Client/AddClient.vue'], resolve),
        meta: {
          title: '新增客户'
        }
      },
      //新增预约
      {
        path: '/AddMakeAnAppointment',
        name: 'AddMakeAnAppointment',
        component: resolve => require(['./views/business/MakeAnAppointment/AddMakeAnAppointment.vue'], resolve),
        meta: {
          title: '新增预约'
        }
      },
      //跨店预约
      {
        path: '/MakeAnAppointmentEid',
        name: 'MakeAnAppointmentEid',
        component: resolve => require(['./views/business/MakeAnAppointment/MakeAnAppointmentEid.vue'], resolve),
        meta: {
          title: '跨店预约'
        }
      },
      //预约详情
      {
        path: '/MakeAnAppointmentDel',
        name: 'MakeAnAppointmentDel',
        component: resolve => require(['./views/business/MakeAnAppointment/MakeAnAppointmentDel.vue'], resolve),
        meta: {
          title: '预约详情'
        }
      },
      //修改预约
      {
        path: '/MakeAnAppointmentAmend',
        name: 'MakeAnAppointmentAmend',
        component: resolve => require(['./views/business/MakeAnAppointment/MakeAnAppointmentAmend.vue'], resolve),
        meta: {
          title: '修改预约'
        }
      },
      //改排
      {
        path: '/MakeAnAppointmentRea',
        name: 'MakeAnAppointmentRea',
        component: resolve => require(['./views/business/MakeAnAppointment/MakeAnAppointmentRea.vue'], resolve),
        meta: {
          title: '改排'
        }
      },
      //现场分诊
      {
        path: '/MakeAnAppointmentSite',
        name: 'MakeAnAppointmentSite',
        component: resolve => require(['./views/business/MakeAnAppointment/MakeAnAppointmentSite.vue'], resolve),
        meta: {
          title: '现场分诊'
        }
      },
      //任务中心
      {
        path: '/MissionCenter',
        name: 'MissionCenter',
        component: resolve => require(['./views/business/MissionCenter/Index.vue'], resolve),
        meta: {
          title: '任务中心'
        }
      },

      //经营管理-经营报表
      {
        path: '/OperationStatement',
        name: 'OperationStatement',
        component: resolve => require(['./views/business/OperationStatement/Index.vue'], resolve),
        meta: {
          title: '经营报表',
        },
      },

      //任务员工详情
      {
        path: '/StaffDetails',
        name: 'StaffDetails',
        component: resolve => require(['./views/business/MissionCenter/StaffDetails.vue'], resolve),
        meta: {
          title: '员工详情'
        },
      },
      // 咨询卡片列表
      {
        path: '/AdvisoryCard',
        name: 'AdvisoryCard',
        // component: resolve => require(['./views/business/Advisory/AdvisoryCardTow.vue'], resolve),
        component: resolve => require(['./views/business/Advisory/NewAdvisoryCard.vue'], resolve),
        meta: {
          title: '咨询卡片列表'
        }
      },
      // 填写咨询
      {
        path: '/FillInAdvisory',
        name: 'FillInAdvisory',
        component: resolve => require(['./views/business/Advisory/FillInAdvisory.vue'], resolve),
        meta: {
          title: '填写咨询'
        }
      },
      // 开单
      {
        path: '/Billing',
        name: 'Billing',
        component: resolve => require(['./views/business/Advisory/Billing.vue'], resolve),
        meta: {
          title: '开单'
        }
      },
      // 任务列表
      {
        path: '/TaskList',
        name: 'TaskList',
        component: resolve => require(['./views/business/MissionCenter/TaskList.vue'], resolve),
        meta: {
          title: '任务列表'
        }
      },
      // 回访列表
      {
        path: '/ReturnVisitList',
        name: 'ReturnVisitList',
        component: resolve => require(['./views/business/MissionCenter/ReturnVisitList.vue'], resolve),
        meta: {
          title: '回访列表'
        }
      },
      // 收银卡片列表
      {
        path: '/ToCollectMoneyCard',
        name: 'ToCollectMoneyCard',
        // component: resolve => require(['./views/business/ToCollectMoney/ToCollectMoneyCard.vue'], resolve),
        component: resolve => require(['./views/business/ToCollectMoney/NewToCollectMoneyCard.vue'], resolve),
        meta: {
          title: '收银卡片列表'
        }
      },
      // 补录咨询列表
      {
        path: '/RepairAdvisoryList',
        name: 'RepairAdvisoryList',
        component: resolve => require(['./views/business/Advisory/RepairAdvisoryList.vue'], resolve),
        meta: {
          title: '补录咨询列表'
        }
      },
      // 信息化管理-划扣列表
      {
        path: '/DeductionList',
        name: 'DeductionList',
        component: resolve => require(['./views/business/Deduction/DeductionList.vue'], resolve),
        meta: {
          title: '信息化管理-划扣列表'
        }
      },
      // 划扣详情
      {
        path: '/DeductionDel',
        name: 'DeductionDel',
        component: resolve => require(['./views/business/Deduction/DeductionDel.vue'], resolve),
        meta: {
          title: '划扣详情'
        }
      },
      // 详细列表
      {
        path: '/DeductionDelList',
        name: 'DeductionDelList',
        component: resolve => require(['./views/business/Deduction/DeductionDelList.vue'], resolve),
        meta: {
          title: '详细列表'
        }
      },
      // 收银列表
      {
        path: '/ToCollectMoneyList',
        name: 'ToCollectMoneyList',
        component: resolve => require(['./views/business/ToCollectMoney/ToCollectMoneylist.vue'], resolve),
        meta: {
          title: '收银列表'
        }
      },
      // 完善个人资料
      {
        path: '/ImprovingData',
        name: 'ImprovingData',
        component: resolve => require(['./views/business/MissionCenter/ImprovingData.vue'], resolve),
        meta: {
          title: '完善个人资料'
        }
      },
      //经营管理-团队管理
      {
        path: '/TeamManagement',
        name: 'TeamManagement',
        component: resolve => require(['./views/business/TeamManagement/Index.vue'], resolve),
        meta: {
          title: '团队管理'
        }
      },
      //经营管理-团队管理-员工目标设定列表
      {
        path: '/TeamManagementList',
        name: 'TeamManagementList',
        component: resolve => require(['./views/business/TeamManagement/TeamManagementList.vue'], resolve),
        meta: {
          title: '团队管理'
        }
      },
      //经营管理-团队管理-设置顾问折扣权限
      {
        path: '/SetDiscount',
        name: 'SetDiscount',
        // component: resolve => require(['./views/business/TeamManagement/SetDiscount(Scrap).vue'], resolve),
        component: resolve => require(['./views/business/TeamManagement/SetDiscount.vue'], resolve),
        meta: {
          title: '设置顾问折扣权限'
        }
      },
      //经营管理-团队管理-员工目标设定-连锁
      {
        path: '/SetTarget',
        name: 'SetTarget',
        component: resolve => require(['./views/business/TeamManagement/SetTarget.vue'], resolve),
        meta: {
          title: '员工目标设定'
        }
      },
      //经营管理-团队管理-员工目标设定-门店
      {
        path: '/SetTargetSingle',
        name: 'SetTargetSingle',
        component: resolve => require(['./views/business/TeamManagement/SetTargetSingle.vue'], resolve),
        meta: {
          title: '员工目标设定'
        }
      },
      //经营管理-项目管理
      {
        path: '/ProjectManagement',
        name: 'ProjectManagement',
        component: resolve => require(['./views/business/ProjectManagement/Index.vue'], resolve),
        meta: {
          title: '项目管理'
        }
      },
      //经营管理-渠道管理
      {
        path: '/ChannelManagement',
        name: 'ChannelManagement',
        component: resolve => require(['./views/business/ChannelManagement/Index.vue'], resolve),
        meta: {
          title: '渠道管理'
        }
      },
      //经营管理-治疗间列表
      {
        path: '/CureRoom',
        name: 'CureRoom',
        // component: resolve => require(['./views/business/CureRoom/Index.vue'], resolve),
        component: resolve => require(['./views/business/CureRoom/NewIndex.vue'], resolve),
        meta: {
          title: '治疗间设置'
        }
      },
      //经营管理-治疗间详情
      {
        path: '/CureRoomDetails',
        name: 'CureRoomDetails',
        component: resolve => require(['./views/business/CureRoom/CureRoomDetails.vue'], resolve),
        meta: {
          title: '治疗间设置'
        }
      },
      //经营管理-治疗间呼叫详情
      {
        path: '/CallRecord',
        name: 'CallRecord',
        component: resolve => require(['./views/business/CureRoom/CallRecord.vue'], resolve),
        meta: {
          title: '治疗间设置'
        }
      },
      //经营管理-治疗间预约信息
      {
        path: '/CureRoomReservationInformation',
        name: 'CureRoomReservationInformation',
        component: resolve => require(['./views/business/CureRoom/CureRoomReservationInformation.vue'], resolve),
        meta: {
          title: '治疗间设置'
        }
      },
      // 私密档案列表
      {
        path: '/RecordList',
        name: 'RecordList',
        component: resolve => require(['./views/business/Record/RecordList.vue'], resolve),
        meta: {
          title: '私密档案列表'
        }
      },
      // 私密档案分析
      {
        path: '/RecordAnalyze',
        name: 'RecordAnalyze',
        component: resolve => require(['./views/business/Record/RecordAnalyze.vue'], resolve),
        meta: {
          title: '私密档案分析'
        }
      },
      // 私密档案分析查看
      {
        path: '/RecordAnalyzeDel',
        name: 'RecordAnalyzeDel',
        component: resolve => require(['./views/business/Record/RecordAnalyzeDel.vue'], resolve),
        meta: {
          title: '私密档案分析查看'
        }
      },
      // 查看私密档案
      {
        path: '/RecordListDel',
        name: 'RecordListDel',
        component: resolve => require(['./views/business/Record/RecordListDel.vue'], resolve),
        meta: {
          title: '查看私密档案'
        }
      },
      //修改个人资料
      {
        path: '/AmendClient',
        name: 'AmendClient',
        component: resolve => require(['./views/business/Client/AmendClient.vue'], resolve),
        meta: {
          title: '修改个人资料'
        }
      },
      //确认退单
      {
        path: '/AffirmChargeback',
        name: 'AffirmChargeback',
        component: resolve => require(['./views/business/Chargeback/AffirmChargeback.vue'], resolve),
        meta: {
          title: '确认退单'
        }
      },
      //退单详情
      {
        path: '/ChargebackDel',
        name: 'ChargebackDel',
        component: resolve => require(['./views/business/Chargeback/ChargebackDel.vue'], resolve),
        meta: {
          title: '退单详情'
        }
      },
      //预约列表
      {
        path: '/MakeAnAppointmentList',
        name: 'MakeAnAppointmentList',
        component: resolve => require(['./views/business/MakeAnAppointment/MakeAnAppointmentList.vue'], resolve),
        meta: {
          title: '预约列表'
        }
      },
      // 咨询列表
      {
        path: '/AdvisoryList',
        name: 'AdvisoryList',
        component: resolve => require(['./views/business/Advisory/AdvisoryList.vue'], resolve),
        meta: {
          title: '咨询列表'
        }
      },
      // 收银明细列表
      {
        path: '/ToCollectMoneyDetailList',
        name: 'ToCollectMoneyDetailList',
        component: resolve => require(['./views/business/ToCollectMoney/ToCollectMoneyDetailList.vue'], resolve),
        meta: {
          title: '收银明细列表'
        }
      },
      //客户充值列表
      {
        path: '/TopUpList',
        name: 'TopUpList',
        component: resolve => require(['./views/business/Client/TopUpList.vue'], resolve),
        meta: {
          title: '客户充值'
        }
      },
      //客户欠款列表
      {
        path: '/DebtList',
        name: 'DebtList',
        component: resolve => require(['./views/business/Client/DebtList.vue'], resolve),
        meta: {
          title: '客户欠款列表'
        }
      },
      //客户列表
      {
        path: '/ClientList',
        name: 'ClientList',
        component: resolve => require(['./views/business/Client/ClientList.vue'], resolve),
        meta: {
          title: '客户列表'
        }
      },
      // 客户等级设置页面
      {
        path:'/ClientLevel',
        name:'ClientLevel',
        component: resolve => require(['./views/business/Client/ClientLevel.vue'], resolve),
        meta: {
          title: '客户等级设置页面'
        }
      },
      //退单管理列表
      {
        path: '/ChargebackList',
        name: 'ChargebackList',
        component: resolve => require(['./views/business/Chargeback/ChargebackList.vue'], resolve),
        meta: {
          title: '退单管理列表'
        }
      },
      //客户详情
      {
        path: '/ClientDel',
        name: 'ClientDel',
        component: resolve => require(['./views/business/Client/ClientDel.vue'], resolve),
        meta: {
          title: '客户详情'
        }
      },
      //流程管理-收银
      {
        path: '/CollectMoney',
        name: 'CollectMoney',
        component: resolve => require(['./views/business/ToCollectMoney/CollectMoney.vue'], resolve),
        meta: {
          title: '收银'
        }
      },

      //私密档案
      {
        path: '/PrivateArchives',
        name: 'PrivateArchives',
        component: resolve => require(['./views/business/PrivateArchives/PrivateArchives.vue'], resolve),
        meta: {
          title: '私密档案'
        }
      },

      //客户分析
      {
        path: '/CustomerAnalysis',
        name: 'CustomerAnalysis',
        component: resolve => require(['./views/business/Client/CustomerAnalysis.vue'], resolve),
        meta: {
          title: '客户分析'
        }
      },
      //消息列表
      {
        path: '/MessageList',
        name: 'MessageList',
        component: resolve => require(['./views/business/MessageList/MessageList.vue'], resolve),
        meta: {
          title: '消息列表'
        }
      },

      //个人欠款列表
      {
        path: '/ClientDebtList',
        name: 'ClientDebtList',
        component: resolve => require(['./views/business/Client/ClientDebtList.vue'], resolve),
        meta: {
          title: '个人欠款列表'
        }
      },

      //转介绍列表
      // {
      //   path: '/IntroducerList',
      //   name: 'IntroducerList',
      //   component: resolve => require(['./views/business/Client/IntroducerList.vue'], resolve),
      //   meta: {
      //     title: '转介绍列表'
      //   }
      // },


      {
        path: '/JurisdictionSetting',
        name: 'JurisdictionSetting',
        component: resolve => require(['./views/business/TeamManagement/JurisdictionSetting.vue'], resolve),
        meta: {
          title: '权限设置'
        }
      },

      //打印
      {
        path: '/Printing',
        name: 'Printing',
        component: resolve => require(['./views/business/Common/Printing.vue'], resolve),
        meta: {
          title: '打印'
        }
      },

      {
        path: '/SetSchedules',
        name: 'SetSchedules',
        component: resolve => require(['./views/business/EmployeeSchedules/SetSchedules.vue'], resolve),
        meta: {
          title: '设置排班表'
        }
      },


      // 铺垫列表
      {
        path:'/Foreshadowing',
        name:'Foreshadowing',
        component: resolve => require(['./views/business/Foreshadowing/Index.vue'], resolve),
        meta: {
          title: '铺垫列表'
        }
      },


      // 铺垫填写
      {
        path:'/ForeshadowingFillIn',
        name:'ForeshadowingFillIn',
        component: resolve => require(['./views/business/Foreshadowing/ForeshadowingFillIn.vue'], resolve),
        meta: {
          title: '铺垫填写'
        }
      },

      /**
       * 活动 老带新活动
       */

      {
        path: '/Activity',
        name: 'Activity',
        component: resolve => require(['./views/business/Activity/Activity.vue'], resolve),
        meta: {
          title: '老带新活动'
        }
      },

      {
        path: '/ActivityList',
        name: 'ActivityList',
        component: resolve => require(['./views/business/Activity/ActivityList.vue'], resolve),
        meta: {
          title: '活动列表'
        }
      },

      {
        path: '/Preview',
        name: 'Preview',
        component: resolve => require(['./views/business/Activity/Preview.vue'], resolve),
        meta: {
          title: '预览活动'
        }
      },

      {
        path: '/ActivityData',
        name: 'ActivityData',
        component: resolve => require(['./views/business/Activity/ActivityData.vue'], resolve),
        meta: {
          title: '查看数据'
        }
      },
      {
        path: '/ConsumeDetails',
        name: 'ConsumeDetails',
        component: resolve => require(['./views/business/Home/ShopManagerHome/ConsumeDetails.vue'], resolve),
        meta: {
          title: '总消耗业绩明细'
        }
      },
      {
        path: '/MonthlyDataDetails',
        name: 'MonthlyDataDetails',
        component: resolve => require(['./views/business/Home/ShopManagerHome/MonthlyDataDetails.vue'], resolve),
        meta: {
          title: '月度数据明细'
        }
      },
      {
        path: '/EnterpriseOrderList',
        name: 'EnterpriseOrderList',
        component: resolve => require(['./views/business/CooperativeEnterprise/EnterpriseOrderList.vue'], resolve),
        meta: {
          title: '合作企业开单列表'
        }
      },
      //合作企业
      {
        path: '/CooperativeEnterpriseList',
        name: 'CooperativeEnterpriseList',
        component: resolve => require(['./views/business/CooperativeEnterprise/CooperativeEnterpriseList.vue'], resolve),
        meta: {
          title: '合作企业'
        }
      },
      //操作日志
      {
        path: '/OperationList',
        name: 'OperationList',
        component: resolve => require(['./views/business/OperationList/Index.vue'], resolve),
        meta: {
          title: '操作日志'
        },
      },
      //充值收支明细
      {
        path: '/TopUpListDetails',
        name: 'TopUpListDetails',
        component: resolve => require(['./views/business/Client/TopUpListDetails.vue'], resolve),
        meta: {
          title: '充值收支明细'
        },
      },
      //人事数据-数据分析
      {
        path: '/DataAnalysis',
        name: 'DataAnalysis',
        component: resolve => require(['./views/business/PersonnelData/DataAnalysis.vue'], resolve),
        meta: {
          title: '人事数据-数据分析'
        },
      },
      //人事数据-得分详情'
      {
        path: '/DataAnalysisDetail',
        name: 'DataAnalysisDetail',
        component: resolve => require(['./views/business/PersonnelData/DataAnalysisDetail.vue'], resolve),
        meta: {
          title: '人事数据-得分详情'
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

      //划扣出库
      {
        path: '/ScratchOperationStore',
        name: 'ScratchOperationStore',
        component: resolve => require(['./views/business/Deduction/ScratchOperationStore.vue'], resolve),
        meta: {
          title: '划扣出库'
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

        //请货入库详情
      {
        path: '/InStorageOrderPleaseGoods',
        name: 'InStorageOrderPleaseGoods',
        component: resolve => require(['./views/storageRoom/InStorage/InStorageOrderPleaseGoods.vue'], resolve),
        meta: {
          title: '请货入库详情'
        }
      },


    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: resolve => require(['./views/Login/Login.vue'], resolve),
    meta: {
      title: '登录'
    },
  },
]

const router = new Router({
  routes,
})

/**
 * 判断token
 */
router.beforeEach(({
  path,
  params,
  query,
  fullPath,
  name
}, from, next) => {
  next()
})

Vue.use(Router)

export default router;