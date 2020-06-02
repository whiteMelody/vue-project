import Vue from 'vue'
import Router from 'vue-router'
import Base from '../assets/js/base'

//首页
const Index = resolve => require(['@/views/Index'], resolve)
//登录
const Login = resolve => require(['@/views/Login'], resolve)
//列表页
const List = resolve => require(['@/views/List'], resolve)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/List/:categoryID',
      name: 'List',
      component: List
    },
  ]
})

Vue.use(Router)

export default router;
