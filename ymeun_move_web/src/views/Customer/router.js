import Vue from 'vue'
import Router from 'vue-router'
import Customer from './pages/Customer.vue'
import CustomerDetails from './pages/CustomerDetails/CustomerDetails.vue'
import XPrivate from './pages/XPrivate/XPrivate.vue'

const routes = [

  /**
   * 当前页面的子路由
   */
  {
    path: '/',
    name: 'Customer',
    component: Customer,
  },
  // 顾客详情页（详情）
  {
    path: '/CustomerDetails',
    name: 'CustomerDetails',
    component: resolve => require(['./pages/CustomerDetails/CustomerDetails.vue'], resolve),
  },
  // 私密档案
  {
    path: '/XPrivate',
    name: 'XPrivate',
    component: XPrivate,
  },
  // 添加主动回访
  {
    path: '/AddVisits',
    name: 'AddVisits',
    component: resolve => require(['./pages/AddVisits/AddVisits.vue'], resolve),
  },
  //新增顾客
  {
    path: '/AddCustomer',
    name: 'AddCustomer',
    component: resolve => require(['./pages/AddCustomer/AddCustomer.vue'], resolve),
  },

]

const router = new Router({
  mode: "hash",
  // mode: 'history',
  base: process.env.BASE_URL,
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