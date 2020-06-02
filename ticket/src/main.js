// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import VueResource  from 'vue-resource'
import Mint from 'mint-ui';
import Vuex from 'vuex'


import Loader from '@/components/Loader'
import Title from '@/components/Title'
import Footer from '@/components/Footer'
import Statistics from '@/components/Statistics'
import LoginDialog from '@/components/LoginDialog'
import Copyright from '@/components/Copyright'
import $ from 'jquery'

import 'element-ui/lib/theme-default/index.css'
import './assets/css/base.css'
import './assets/css/style.css'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(Mint);
Vue.use(Vuex)

Vue.component('loader', Loader)
Vue.component('navTitle', Title)
Vue.component('navFooter', Footer)
Vue.component('statistics', Statistics)
Vue.component('login', LoginDialog)
Vue.component('copyright', Copyright)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

