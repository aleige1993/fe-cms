<template>
  <div id="page-index">
    <top-bar v-if="!noaction"></top-bar>
    <div class="wrap">
      <left-nav v-if="!noaction" class="layout-left"></left-nav>
      <div :class="{'layout': !noaction}">
        <div :class="{'layout-main': !noaction}">
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
    computed: {
      noaction() {
        return this.$route.query.noaction;
      }
    },
    methods: {
      async initMenuList() {
        let res = await this.$http.get('/common/menuList', {});
        this.$store.dispatch('setMenuList', res.body);
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
