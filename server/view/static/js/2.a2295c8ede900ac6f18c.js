webpackJsonp([2],{"CCb/":function(t,n){},R1fB:function(t,n){},X12R:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("gs4M"),s=e.n(i),o=e("FXHS"),a=e.n(o),c={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"common-topbar"},["0"===t.loginInfo.isInit?e("router-link",{staticClass:"logo",attrs:{to:{path:"/index"}}}):e("span",{staticClass:"logo"}),t._v(" "),e("div",{staticClass:"right-actions"},[t.isLogin?e("ul",[t.loginInfo.merchantInfo?e("li",[e("div",[t._v("\n          "+t._s(t.loginInfo.merchantInfo.corpName)+"\n        ")])]):t._e(),t._v(" "),e("li",[e("div",[t._v("\n            "+t._s(t.loginInfo.loginName)+"\n          ")])]),t._v(" "),e("li",[e("a",{attrs:{href:"javascript:;"},on:{click:t.logout}},[e("i",{staticClass:"iconfont icon-daochu"}),t._v(" "),e("span",[t._v("退出登录")])])])]):t._e()])],1)},staticRenderFns:[]};var u={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"left-nav"}},[e("ul",{staticClass:"el-menu"},t._l(t.menuList,function(n,i){return e("li",{class:{menu:n.childMenus&&n.childMenus.length,active:n.active}},[n.childMenus&&n.childMenus.length?[e("h1",{staticClass:"title",on:{click:function(n){t.clickMenu(i)}}},[t._v(t._s(n.name))]),t._v(" "),e("ul",{directives:[{name:"show",rawName:"v-show",value:n.active,expression:"list.active"}]},t._l(n.childMenus,function(n,s){return e("li",{on:{click:function(n){t.clickMenu(i,s)}}},[e("router-link",{staticClass:"secondMenu",attrs:{to:n.url}},[e("span",{class:{active:n.active}},[t._v(t._s(n.name))])])],1)}))]:e("h1",{on:{click:function(n){t.clickMenu(i)}}},[e("router-link",{staticClass:"firstMenu",attrs:{to:n.url}},[t._v(t._s(n.name))])],1)],2)}))])},staticRenderFns:[]};var r={name:"pageIndex",data:function(){return{isLoad:!1}},components:{"top-bar":e("jadU")({name:"",data:function(){return{}},computed:{loginInfo:function(){return this.$userLogin.getLoginInfo()},isLogin:function(){return this.$userLogin.isLogin()}},methods:{modifypwd:function(){this.$store.dispatch("setMenuList",this.$store.getters.menuList.map(function(t,n){return t.active=!1,t.childMenus&&t.childMenus.length&&t.childMenus.map(function(n,e){return n.active=!1,t.childMenus}),t})),this.$router.push({name:"securityModifypwd"})},logout:function(){this.$userLogin.removeLoginInfo(),this.$router.push("/login")}}},c,!1,function(t){e("zKMm")},"data-v-2bc0539a",null).exports,LeftNav:e("jadU")({name:"leftNav",data:function(){return{}},methods:{clickMenu:function(t,n){this.$store.dispatch("setMenuList",this.$store.getters.menuList.map(function(e,i){return void 0===n&&(e.active=i===t),e.childMenus&&e.childMenus.length&&e.childMenus.map(function(s,o){return s.active=i===t&&o===n,e.childMenus}),e}))}},computed:{menuList:function(){return this.$store.getters.menuList}}},u,!1,function(t){e("CCb/")},"data-v-c3d63864",null).exports},computed:{noaction:function(){return this.$route.query.noaction}},methods:{initMenuList:function(){var t=this;return a()(s.a.mark(function n(){var e;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$http.get("/common/menuList",{});case 2:e=n.sent,t.$store.dispatch("setMenuList",e.body);case 4:case"end":return n.stop()}},n,t)}))()}},mounted:function(){this.initMenuList()}},l={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"page-index"}},[t.noaction?t._e():e("top-bar"),t._v(" "),e("div",{staticClass:"wrap"},[t.noaction?t._e():e("left-nav",{staticClass:"layout-left"}),t._v(" "),e("div",{class:{layout:!t.noaction}},[e("div",{class:{"layout-main":!t.noaction}},[e("router-view")],1)])],1)],1)},staticRenderFns:[]};var d=e("jadU")(r,l,!1,function(t){e("R1fB")},"data-v-041ae993",null);n.default=d.exports},zKMm:function(t,n){}});
//# sourceMappingURL=2.a2295c8ede900ac6f18c.js.map