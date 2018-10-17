// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
Vue.use(elementUI);

import Config from './utils/Config';
import Http from './utils/Http';
import Formdata from './utils/Formdata';
import UserLogin from './utils/UserLogin';
import Tool from './utils/Tools';
Vue.prototype.$config = Config;
Vue.prototype.$http = new Http();
Vue.prototype.$formdata = new Formdata();
Vue.prototype.$userLogin = UserLogin;
Vue.prototype.$Tool = Tool;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Http().get('/common/items', {}).then(function (res) {
  store.dispatch('setEnumList', res.body);
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
});

