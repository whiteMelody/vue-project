import Vue from 'vue'
import Router from 'vue-router'
import Data from './pages/Data.vue'

const routes = [

    /**
     * 自己的路由
     */
    {
      path: '/',
      name: 'Index',
      component: Data,
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