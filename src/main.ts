/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import PerfMa from '../packages';
// import PerfMa from '../lib';
import DemoBox from '@/components/demo-box.vue';
import Md from '@/components/md.vue';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Select,
  Option,
  Button,
  Tooltip,
  Form,
  Row,
  Col,
  Message,
  Loading,
  Checkbox,
  Radio,
} from 'element-ui';

import 'normalize.css';
import '@babel/polyfill';
// 引入饿了么 HOOK
import '../packages/styles/element-hook/index.scss';
// 引入自定义样式
import '@/styles/index.scss';
import 'highlight.js/styles/monokai-sublime.css';
// 所有组件一次性引入
Vue.use(PerfMa);

// 饿了么依赖关系处理
Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 };

Vue.use(Tooltip);
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(Option);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Loading);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.prototype.$message = Message;
// API专用组件
Vue.component(DemoBox.name, DemoBox);
Vue.component(Md.name, Md);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
