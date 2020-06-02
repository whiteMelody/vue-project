import Vue from 'vue'
import Router from 'vue-router'
import Consultation from "./pages/Consultation/Consultation.vue";
import Menu from "./pages/Menu/Menu.vue";
import ConsultationDetails from "./pages/ConsultationDetails/ConsultationDetails.vue";
import HistoricalConsultation from "./pages/HistoricalConsultation/HistoricalConsultation.vue";

const routes = [

    /**
     * 当前页面的子路由
     */
    // {
    //   path: '/',
    //   name: 'Flow',
    //   component: resolve => require(['./pages/Flow.vue'], resolve),
    // },
    //流程菜单
    {
      path: '/',
      name: 'Menu',
      component: Menu,
    },
    // 咨询
    {
      path: '/Consultation',
      name: 'Consultation',
      component: Consultation
    },
    // 咨询详情
    {
      path: '/ConsultationDetails',
      name: 'ConsultationDetails',
      component: ConsultationDetails
    },
    // 历史咨询
    {
      path: '/HistoricalConsultation',
      name: 'HistoricalConsultation',
      component: HistoricalConsultation
    },

    /**
     * 分诊
     */
    {
      path: '/Triage',
      name: 'Triage',
      component: resolve => require(['./pages/Triage/Triage.vue'], resolve),
    },
    /**
     * 收银
     */
    {
      path: '/Proceed',
      name: 'Proceed',
      component: resolve => require(['./pages/Proceed/Proceed.vue'], resolve),
    },
    /**
     * 开单&修改订单
     */
    {
      path: '/Order',
      name: 'Order',
      component: resolve => require(['./pages/Order/Order.vue'], resolve),
    },
    //新增/修改预约
    {
      path: '/MakeAnAppointment',
      name: 'MakeAnAppointment',
      component: resolve => require(['./pages/MakeAnAppointment/MakeAnAppointment.vue'], resolve),
    },
    //预约详情
    {
      path: '/MakeAnAppointmentEdit',
      name: 'MakeAnAppointmentEdit',
      component: resolve => require(['./pages/MakeAnAppointmentEdit/MakeAnAppointmentEdit.vue'], resolve),
    },
    //取消预约
    {
      path: '/MakeAnAppointmentCancel',
      name: 'MakeAnAppointmentCancel',
      component: resolve => require(['./pages/MakeAnAppointmentCancel/MakeAnAppointmentCancel.vue'], resolve),
    },
    //改排
    {
      path: '/Reassignment',
      name: 'Reassignment',
      component: resolve => require(['./pages/Reassignment/Reassignment.vue'], resolve),
    },
    //预约取消详情
    {
      path: '/MakeAnAppointmentCancelEdit',
      name: 'MakeAnAppointmentCancelEdit',
      component: resolve => require(['./pages/MakeAnAppointmentCancelEdit/MakeAnAppointmentCancelEdit.vue'], resolve),
    },
    //选择顾客
    {
      path: '/SelectClient',
      name: 'SelectClient',
      component: resolve => require(['./pages/SelectClient/SelectClient.vue'], resolve),
    },
    /**
     * 收银（收款）
     */
    {
      path: '/CollectMoney',
      name: 'CollectMoney',
      component: resolve => require(['./pages/Proceed/CollectMoney.vue'], resolve),
    },
    /**
     * 收银详情（收款详情）
     */
    {
        path: '/ProceedDetail',
        name: 'ProceedDetail',
        component: resolve => require(['./pages/Proceed/ProceedDetail.vue'], resolve),
    },
    /**
     * 划扣
     */
    {
      path: '/Deduction',
      name: 'Deduction',
      component: resolve => require(['./pages/Deduction/Deduction.vue'], resolve),
    },
    /**
     * 划扣详情
     */
    {
      path: '/DeductionDetails',
      name: 'DeductionDetails',
      component: resolve => require(['./pages/DeductionDetails/DeductionDetails.vue'], resolve),
    },
    /**
     * 划扣信息
     */
    {
      path: '/DeductionInformation',
      name: 'DeductionInformation',
      component: resolve => require(['./pages/DeductionInformation/DeductionInformation.vue'], resolve),
    },

]

const router = new Router({
    mode: "hash",
    // mode: 'history',
    routes,
})

router.beforeEach(({path, params, query, fullPath, name}, from, next) => {

    console.log({path, params, query, fullPath, name})

    if(name == 'Login' || name == 'Login2'){
        next()
    }else{
      
        if(localStorage.getItem("webToken")){
            next();
        }else{
            window.location.href = 'login.html'
        }
    }
})

Vue.use(Router)

export default router;