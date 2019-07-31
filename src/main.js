import 'normalize.css';
import '@/assets/icons';
import '@/assets/iconfont/iconfont.css';
import '@/assets/scss/element';
import '@/assets/icon/style.css';
import '@/assets/scss/index.scss';
import VueMarkdown from 'vue-markdown';
import session from '@/utils/session';
import TimeAgo from 'timeago.js';
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';

import Vue from 'vue';
import {
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Radio,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Message,
  Upload,
} from 'element-ui';
import App from './App';
import router from './router';
import store from './store';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);
Vue.use(Upload);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Radio);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(VueSocketio, socketio('http://bangdna.com:80'));

Vue.component('vue-markdown', VueMarkdown);

const timeAgo = new TimeAgo();
Vue.filter('timeAgo', x => timeAgo.format(x, 'zh_CN'));

Vue.config.productionTip = false;
Vue.prototype.$session = session;

Vue.prototype.$checkLogin = () => {
  if (!session.isLogin()) {
    Message({
      message: '请登录之后再进行操作!',
      type: 'error',
      duration: 3 * 1000,
    });
    throw new Error('未登录!');
  }
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
