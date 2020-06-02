// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'

import {
  Dialog,
  Input,
  InputNumber,
  Radio,
  RadioButton,
  Checkbox,
  Row,
  Col,
  Carousel,
  CarouselItem,
  Loading,
  Message,
} from 'element-ui'

import { InfiniteScroll } from 'mint-ui';

import router from './router'
import VueResource  from 'vue-resource'

import Loader from '@/components/Loader'
import Title from '@/components/Title'
import Statistics from '@/components/Statistics'
import Recommend from '@/components/Recommend'
import ExpertList from '@/components/ExpertList'
import Popup from '@/components/Dialog'
import $ from 'jquery'

import 'element-ui/lib/theme-default/index.css'
import './assets/css/base.css'
import './assets/css/style.css'
import './assets/css/comm.less'

import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

Vue.use(VueResource)

Vue.use(InfiniteScroll);

Vue.use(Dialog)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.use(Loading.directive)

// Vue.prototype.$loading = Loading.service
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.component('loader', Loader)
Vue.component('navTitle', Title)
Vue.component('statistics', Statistics)
Vue.component('recommend', Recommend)
Vue.component('expertList', ExpertList)
Vue.component('popup', Popup)

// import store from './store'

/* eslint-disable no-new */
new Vue({
  template: `
  <div>
    <router-view></router-view>
  </div>
  `,
  router,
  // store,
  // components: {
  //   navbar
  // }
}).$mount('#app')

