<template>
  <div class="common-topbar">
    <!--<router-link v-if="loginInfo.isInit === '0'" :to="{path: '/index'}" class="logo"></router-link>-->
    <span class="logo">内容发布系统</span>
    <div class="right-actions">
      <ul v-if="isLogin">
        <li v-if="loginInfo.merchantInfo">
          <div>
            {{loginInfo.merchantInfo.corpName}}
          </div>
        </li>
        <li>
            <div>
              <!--<img class="top-avatar" src="./img/potrat.png" alt=""/>-->
              {{loginInfo.userName}}
            </div>
        </li>
        <!--<li><a href="javascript:;" @click="modifypwd"><i class="iconfont icon-xiugaimima"></i> <span>修改密码</span></a></li>-->
        <li><a href="javascript:;" @click="logout"><i class="iconfont icon-daochu"></i> <span>退出登录</span></a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {};
  },
  computed: {
    loginInfo() {
      return this.$userLogin.getLoginInfo();
    },
    isLogin() {
      return this.$userLogin.isLogin();
    }
  },
  methods: {
    modifypwd() {
      this.$store.dispatch('setMenuList', this.$store.getters.menuList.map((item, _index) => {
        item.active = false;
        if (item.childMenus && item.childMenus.length) {
          item.childMenus.map((childItem, _childIndex) => {
            childItem.active = false;
            return item.childMenus;
          });
        }
        return item;
      }));
      this.$router.push({
        name: 'securityModifypwd'
      });
    },
    logout() {
      this.$userLogin.removeLoginInfo();
      this.$router.push('/login');
    }
  }
};
</script>
<style lang="scss" scoped>
  .common-topbar{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    color: #fff;
    background: #36a9e1;
    .logo{
      float: left;
      width: 184px;
      height: 24px;
      margin-top: 18px;
      line-height: 24px;
      font-size: 20px;
      &:before {
        content: '';
        display: inline-block;
        vertical-align: top;
        width: 50px;
        height: 24px;
        background: url(../../../../static/img/logo.png) no-repeat;
      }
    }
    .right-actions{
      float: right;
      ul{
        li{
          float: left;
          a, div{
            padding: 0 11px;
            color: #fff;
            img.top-avatar{
              float: left;
              position: relative;
              top: 14px;
              font-size: 14px;
            }
            span{
              position: relative;
              top: -1px;
            }
          }
        }
      }
    }
  }
</style>
