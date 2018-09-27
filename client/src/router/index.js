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
        { path: 'advert', component: resolve => { require(['@/pages/page-advert'], resolve)}},
        { path: 'advertDetail', component: resolve => { require(['@/pages/page-advert/details'], resolve)}},//广告详情
        { path: 'guided', component: resolve => { require(['@/pages/page-guided'], resolve)}},//引导页
        // 文章管理
        {path: 'articleList', component: resolve => { require(['@/pages/page-article/list'], resolve) }},
        {path: 'articleDetail', component: resolve => { require(['@/pages/page-article/detail'], resolve) }},
        // 头条管理
        {path: 'headlineList', component: resolve => { require(['@/pages/page-headline'], resolve) }},
        // banner管理
        {path: 'bannerList', component: resolve => { require(['@/pages/page-banner'], resolve) }}
      ]
    }
  ],
  linkExactActiveClass: 'link-exact-active',
  linkActiveClass: 'link-active',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
