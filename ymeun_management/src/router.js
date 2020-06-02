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
      // 企业列表
      {
        path: '/EnterpriseList',
        name: 'EnterpriseList',
        component: resolve => require(['./views/business/Enterprise/Index.vue'], resolve),
        meta: {
          title: '企业列表'
        }
      },
      // 新增企业
      {
        path: '/AddEnterprise',
        name: 'AddEnterprise',
        component: resolve => require(['./views/business/Enterprise/AddEnterprise.vue'], resolve),
        meta: {
          title: '企业列表'
        }
      },
      // 门店信息
      {
        path: '/StoreInfo',
        name: 'StoreInfo',
        component: resolve => require(['./views/business/Enterprise/StoreInfo.vue'], resolve),
        meta: {
          title: '企业列表'
        }
      },
      // 消息列表
      {
        path: '/MessageList',
        name: 'MessageList',
        component: resolve => require(['./views/business/Message/MessageList.vue'], resolve),
        meta: {
          title: '消息列表'
        }
      },
      // 发送消息
      {
        path: '/ReleaseMessage',
        name: 'ReleaseMessage',
        component: resolve => require(['./views/business/Message/ReleaseMessage.vue'], resolve),
        meta: {
          title: '发送消息'
        }
      },
      // 数据管理
      {
        path: '/Data',
        name: 'Data',
        component: resolve => require(['./views/business/Data/Data.vue'], resolve),
        meta: {
          title: '数据管理'
        }
      },
      // 板块管理
      {
        path: '/Plate',
        name: 'Plate',
        component: resolve => require(['./views/business/Enterprise/Plate.vue'], resolve),
        meta: {
          title: '板块管理'
        }
      },
      // 渠道列表
      {
        path: '/ChannelList',
        name: 'ChannelList',
        component: resolve => require(['./views/business/Enterprise/ChannelList.vue'], resolve),
        meta: {
          title: '渠道列表'
        }
      },
      // 品项列表
      {
        path: '/ProjectList',
        name: 'ProjectList',
        component: resolve => require(['./views/business/Enterprise/ProjectList.vue'], resolve),
        meta: {
          title: '品项列表'
        }
      },

        // 任务列表
        {
            path: '/TaskList',
            name: 'TaskList',
            component: resolve => require(['./views/business/Task/TaskList.vue'], resolve),
            meta: {
                title: '任务列表'
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
  //开发期暂时关闭
  next()
})

Vue.use(Router)

export default router;