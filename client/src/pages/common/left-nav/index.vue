<template>
  <div id="left-nav">
    <!--<el-menu default-active="1"-->
             <!--class="el-menu-vertical-demo"-->
             <!--background-color="#545c64"-->
             <!--text-color="#fff"-->
             <!--active-text-color="#ffd04b"-->
             <!--@open="handleOpen"-->
             <!--@close="handleClose">-->
      <!--<el-submenu index="1">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-setting"></i>-->
          <!--<span>配置管理</span>-->
        <!--</template>-->
        <!--<el-menu-item index="1-1">新闻列表</el-menu-item>-->
      <!--</el-submenu>-->
    <!--</el-menu>-->
    <ul class="el-menu">
      <li v-for="(list, index) in menuList"
          :class="{menu: list.childMenus && list.childMenus.length, active: list.active}">
        <template v-if="list.childMenus && list.childMenus.length">
          <h1 class="title" @click="clickMenu(index)">{{list.name}}</h1>
          <ul v-show="list.active">
            <li v-for="(secondMenus, childIndex) in list.childMenus" @click="clickMenu(index, childIndex)">
              <router-link class="secondMenu" :to="secondMenus.url"><span :class="{active: secondMenus.active}">{{secondMenus.name}}</span></router-link>
            </li>
          </ul>
        </template>
        <h1 v-else @click="clickMenu(index)"><router-link class="firstMenu" :to="list.url">{{list.name}}</router-link></h1>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'leftNav',
    data() {
      return {};
    },
    methods: {
      clickMenu(index, childIndex) {
        this.$store.dispatch('setMenuList', this.$store.getters.menuList.map((item, _index) => {
          if (typeof childIndex === 'undefined') {
            item.active = (_index === index);
          }
          if (item.childMenus && item.childMenus.length) {
            item.childMenus.map((childItem, _childIndex) => {
              childItem.active = (_index === index) && (_childIndex === childIndex);
              return item.childMenus;
            });
          }
          return item;
        }));
      }
    },
    computed: {
      menuList() {
        return this.$store.getters.menuList;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-menu {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #383e4b;
    li {
      h1, a {
        display: inline-block;
        width: 100%;
        cursor: pointer;
      }
      .title, .firstMenu {
        height: 50px;
        padding-left: 15px;
        line-height: 50px;
        color: #fff;
      }
      .secondMenu {
        height: 40px;
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #e1e1e1;
        background: #f3f3f3;
        span{
          padding-left: 5px;
          border-left: 3px solid #f3f3f3;
          &.active {
            color: #ea7519;
            border-left: 3px solid #ea7519;
          }
        }
      }
      &.active{
        background: #2d323d;
      }
      &.menu {
        h1 {
          background: url("img/left.png") 155px 20px no-repeat;
        }
        &.active {
          h1 {
            background: #2d323d url("img/down.png") 150px 20px no-repeat;
          }
        }
      }
      a:hover {
        text-decoration: none;
      }
    }
  }
</style>


