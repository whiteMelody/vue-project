import Vue from 'vue'
import Router from 'vue-router'

const routes = [

    /**
     * 当前页面的子路由
     */
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['./pages/Login.vue'], resolve),
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