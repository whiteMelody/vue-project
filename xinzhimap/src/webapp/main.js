import 'babel-polyfill'
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "../store"
import Vuex from 'vuex'

//公共js
import base from '@/utils/base'
Vue.prototype.$base = base
import uvue from '@/utils/uvue'
Vue.prototype.$uvue = uvue
//公共css
import "@/assets/css/base.css"
import "@/assets/css/index.scss"

//element ui
import {
  Autocomplete,
  Input,
  Radio,
  Checkbox,
  Switch,
  Select,
  Button,
  RadioGroup,
  RadioButton,
  Option,
  Popover,
  Loading,
  Message,
  MessageBox,
  Form,
  FormItem,
} from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.component(Radio.name, Radio);
Vue.component(Switch.name, Switch);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Radio.name, Radio);
Vue.component(Autocomplete.name, Autocomplete);
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Popover.name, RadioButton)
Vue.component(Option.name, Option);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Loading.directive);
//设置elm组件为small
Vue.prototype.$ELEMENT = { size: 'small' };
//全局消息框
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
