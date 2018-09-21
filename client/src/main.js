// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
Vue.use(elementUI);

import config from './utils/config';
import http from './utils/http';
import userLogin from './utils/userLogin';
import Tool from './utils/Tools';
Vue.prototype.$config = config;
Vue.prototype.$http = new http();
Vue.prototype.$userLogin = userLogin;
Vue.prototype.$Tool = Tool;

Vue.config.productionTip = false

/* eslint-disable no-new */
new http().get('/common/items', {}).then(function (res) {
  store.dispatch('setEnumList', res.body);
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
});

