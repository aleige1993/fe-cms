import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/pages/errors';
Vue.use(Router);
export default new Router({
  routes: [
    { path: '*', component: PageNotFound },
    { path: '/errors', name: 'errors', component: PageNotFound },
    { path: '/', name: '/', component: resolve => { require(['@/pages/page-login'], resolve) } },
    { path: '/login', name: 'login', component: resolve => { require(['@/pages/page-login'], resolve) } },
    {
      path: '/index', component: resolve => { require(['@/pages/page-index'], resolve) },
      children: [
        { path: '/', component: resolve => { require(['@/pages/page-home'], resolve) }},
        {
          path: 'conf', component: resolve => { require(['@/pages/page-conf'], resolve) },
          children: [
            { path: 'newslist', component: resolve => { require(['@/pages/page-conf/news'], resolve) }},
          ]
        },
      ]
    }
  ],
  linkExactActiveClass: 'link-exact-active',
  linkActiveClass: 'link-active',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
