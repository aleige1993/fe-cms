<template>
  <div id="page-index">
    <top-bar></top-bar>
    <div class="wrap">
      <left-nav class="layout-left"></left-nav>
      <div class="layout">
        <div class="layout-main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Topbar from '@/pages/common/top-bar';
  import LeftNav from '@/pages/common/left-nav';
  export default {
    name: 'pageIndex',
    data() {
      return {
        isLoad: false
      };
    },
    components: {
      'top-bar': Topbar,
      LeftNav
    },
    methods: {
      initMenuList() {
        this.$store.dispatch('setMenuList', [{
          "name": "首页",
          "url": "/index"
        }, {
          "name": "配置管理",
          "childMenus": [{
            "name": "新闻管理",
            "url": "/index/conf/newslist"
          }],
          "url": "/index/conf"
        }]);
      }
    },
    mounted() {
      this.initMenuList();
    }
  };
</script>
<style lang="scss" scoped>
  .layout-left {
    position: fixed;
    left: 0;
    top: 60px;
    z-index: 99;
    width: 200px;
    height: calc(100% - 60px);
    font-size: 14px;
  }
  .layout {
    float: right;
    width: calc(100% - 200px);
    margin-top: 60px;
    padding: 10px;
  }
  .layout-main {
    min-width: 1200px;
  }
</style>
