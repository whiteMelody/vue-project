import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'xzm',
        component: resolve => require(['./views/pages/XinZhiMapWebApp.vue'], resolve),
        meta: {
            title: '新知地图'
        },
    },
    {
        path: '/pp',
        name: 'PrivacyPolicy',
        component: resolve => require(['./views/pages/PrivacyPolicy.vue'], resolve),
        meta: {
            title: '隐私政策'
        },
    },
    {
        path: '/sa',
        name: 'ServiceAgreement',
        component: resolve => require(['./views/pages/ServiceAgreement.vue'], resolve),
        meta: {
            title: '服务协议'
        },
    },
]

const router = new Router({
    //线上使用history
    //uni-app的H5版不能使用history模式
    // mode: 'history',
    routes,
})

Vue.use(Router)

export default router;