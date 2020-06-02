import Vue from 'vue'
import Router from 'vue-router'
import Task from './pages/Task.vue'

const routes = [

    /**
     * 当前页面的子路由
     */
    {
      path: '/',
      name: 'Task',
      component: Task,
    },
    //填写私密档案
    {
      path: '/PrivateFileFilling',
      name: 'PrivateFileFilling',
      component: resolve => require(['./pages/PrivateFileFilling/PrivateFileFilling.vue'], resolve),
    },

    /**
     * 填写回访
     */
    {
      path: '/EditVisit',
      name: 'EditVisit',
      component: resolve => require(['./pages/EditVisit/EditVisit.vue'], resolve),
    },

    /**
     * 完善资料
     */
    {
      path: '/ImprovingData',
      name: 'ImprovingData',
      component: resolve => require(['./pages/ImprovingData/ImprovingData.vue'], resolve),
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