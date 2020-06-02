import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import axios from "axios";
import {
    getRequest,
    postRequest
} from './componentsJs/axios'
import {
    setCookie,
    getCookie,
    delCookie
} from './componentsJs/cookie'
import GL_Component from './componentsJs/commonality'
import common from './componentsJs/common';
import qs from "qs";
import iView from "iview";
import "iview/dist/styles/iview.css";
import "babel-polyfill";
import Vant from 'vant';
import 'vant/lib/index.css';
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//引入jquery
import $ from 'jquery'

//公共js
import base from '@/utils/base'
Vue.prototype.$base = base

// 引入列表公共组件
import BaseList from '@/components/common/base-list.vue'
// 引入分页全局配置
import getPage from '@/assets/page.js'
// 引入枚举 全局计算属性和过滤器
// 引入自有公共方法
import "./assets/style/index.scss";
// import 'element-ui/lib/theme-xym/index.css'
import './assets/css/base.css'
import "@/assets/css/index.scss"

import '@/assets/css/element-variables.scss'
// 按需引入element组件
import {
    Pagination,
    Input,
    InputNumber,
    Button,
    Table,
    TableColumn,
    DatePicker,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Row,
    Col,
    Loading,
    Dialog,
    Select,
    Option,
    Link,
    Progress,
    Message,
    MessageBox,
    Checkbox,
    Tooltip,
    Badge,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Container,
    Alert,
    Autocomplete,
    Radio,
    CheckboxGroup,
    RadioGroup,
    Calendar,
    ButtonGroup,
} from 'element-ui';

Vue.config.productionTip = false
Vue.component(Container.name, Container);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(Button.name, Button);
Vue.component(Badge.name, Badge)
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Pagination.name, Pagination);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Option.name, Option);
Vue.component(Message.name, Message);
Vue.component(MessageBox.name, MessageBox);
Vue.component(DatePicker.name, DatePicker);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Dialog.name, Dialog);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(BaseList.name, BaseList);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Link.name, Link);
Vue.component(Progress.name, Progress);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Tooltip.name, Tooltip)
Vue.component(Alert.name, Alert)
Vue.component(Autocomplete.name, Autocomplete);
Vue.component(Radio.name, Radio);
Vue.component(CheckboxGroup.name, Checkbox);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Calendar.name, Calendar)
Vue.component(ButtonGroup.name, ButtonGroup)

Vue.use(Loading.directive);
// 使用element-ui 并且组件尺寸默认为small
Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$maxLength = 256;
// 分页配置
Vue.prototype.$defalutPage = getPage
// 注册自有工具库
// 全局路由跳转
Vue.prototype.goto = function (path) {
  this.$router.push(path)
}
// 全局路由返回
Vue.prototype.goback = function (path) {
  this.$router.go(-1)
}

Vue.use(VueQuillEditor)

//全局过滤器
import { computedMapDict, filtersMapDict } from '@/assets/dict'
Vue.mixin({
    computed: {
        ...computedMapDict()
    },
    filters: {
        ...filtersMapDict()
    }
})


Vue.config.productionTip = false;
Vue.prototype.$cookieStore = {
    setCookie,
    getCookie,
    delCookie,
}
Vue.prototype.$axios = axios;
Vue.prototype.$getRequest = getRequest;
Vue.prototype.$postRequest = postRequest;
Vue.prototype.$common = common;
Vue.prototype.qs = qs;
Vue.use(Vant);
Vue.use(iView);
Vue.use(GL_Component);

//设置elm组件为small
Vue.prototype.$ELEMENT = { size: 'small' };
//全局消息框
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$maxLength = 256;

//货币过滤器 默认美元符
Vue.filter('NumFormat', function (number, decimals, dec_point, thousands_sep) {
  decimals = 2;
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.ceil(n * k) / k;
      };

  // s = (prec ? toFixedFix(n, prec) : '' + Number.parseFloat(n)).split('.');

  s = ('' + Number.parseFloat(n)).split('.')

  var re = /(-?\d+)(\d{3})/;
  while(re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);

})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");