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
import base from '@/chain/utils/base'
Vue.prototype.$base = base;

import GeminiScrollbar from 'vue-gemini-scrollbar';

// 引入列表公共组件
import BaseList from '@/chain/components/common/base-list.vue'
import BaseListHs from '@/chain/components/common/base-list-hs.vue'
import DateSlot from '@/chain/components/date/dateSlot.vue'
// 引入分页全局配置
import getPage from '@/chain/assets/page'
// 引入枚举 全局计算属性和过滤器
// import 'element-ui/lib/theme-xym/index.css'
import './assets/css/base.css'
import "@/chain/assets/css/index.scss"

import '@/chain/assets/css/element-variables.scss'
//element ui
import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Link,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Loading,
    MessageBox,
    Message,
    Notification,
    Calendar,
    Backtop,
    Image
} from 'element-ui';

Vue.config.productionTip = false
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Radio.name, Radio);
Vue.component(Switch.name, Switch);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Message.name, Message);
Vue.component(Container.name, Container);
Vue.component(Aside.name, Aside);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Submenu.name, Submenu);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Pagination.name, Pagination);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(Option.name, Option);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Dialog.name, Dialog);
Vue.component(Radio.name, Radio);
Vue.component(Step.name, Step);
Vue.component(Steps.name, Steps);
Vue.component(Autocomplete.name, Autocomplete);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Tag.name, Tag);
Vue.component(Card.name, Card);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Upload.name, Upload);
Vue.component(Progress.name, Progress);
Vue.component(Tree.name, Tree)
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Calendar.name, Calendar)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(Alert.name, Alert)
Vue.component(Badge.name, Badge)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.component(CheckboxButton.name, CheckboxButton)
Vue.component(Link.name, Link)
Vue.component(Tooltip.name, Tooltip)
Vue.component(BaseList.name, BaseList);
Vue.component(BaseListHs.name, BaseListHs);
Vue.component(DateSlot.name, DateSlot);
Vue.component(Backtop.name, Backtop);
Vue.component(Image.name, Image);
Vue.component(Popover.name, Popover);
Vue.component(Cascader.name, Cascader);

Vue.use(Loading.directive);

// const Elements = [Button, Input]
//
// Elements.forEach(key => {
//     Vue.use(key, {
//         size: 'mini'
//     })
// })

// 使用element-ui 并且组件尺寸默认为mini
Vue.prototype.$ELEMENT = { size: 'mini' };
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
};

Vue.use(VueQuillEditor)

//全局过滤器
import { computedMapDict, filtersMapDict } from '@/chain/assets/dict'
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
Vue.use(GeminiScrollbar)

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