import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'xzm',
        component: resolve => require(['./views/pages/XinZhiMapPC.vue'], resolve),
        meta: {
            title: '新知地图'
        },
    },
    {
        path: '/cr',
        name: 'CopyRight',
        component: resolve => require(['./views/pages/CopyRight.vue'], resolve),
        meta: {
            title: '版权信息'
        },
    },

]

const router = new Router({
    // 线上使用history
    // mode: 'history',
  routes,
})

Vue.use(Router)

export default router;