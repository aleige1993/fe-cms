<template>
  <div id="page-login">
    <div class="top-bar">
      <div class="login-container">
        <span class="logo">内容发布系统</span>
      </div>
    </div>
    <div class="login-area">
      <div class="left-circle"></div>
      <div class="right-circle"></div>
      <div class="login-container relative">
        <div class="login-box">
          <div class="shadow"></div>
          <h1>登录</h1>
          <div class="login-form">
            <form>
              <div class="login-row">
                <label for="username">用户名</label>
                <div class="login-input">
                  <input class="el-input__inner" @keydown.enter="submitLogin" id="username" placeholder="用户名" v-model="loginForm.account" />
                </div>
              </div>
              <div class="login-row">
                <label for="pwd">密码</label>
                <div class="login-input">
                  <input class="el-input__inner" type="password" @keydown.enter="submitLogin" id="pwd" placeholder="密码" v-model="loginForm.password" />
                </div>
              </div>
              <!--<div class="login-row">-->
                <!--<label>验证码</label>-->
                <!--<div class="login-input">-->
                  <!--<el-input @keydown.enter="submitLogin" v-model="loginForm.vrifyCode" placeholder="验证码" maxlength="4" style="width: 232px;"></el-input>-->
                  <!--<img style="cursor: pointer" title="看不清？点击换一张" @click="getVerifyCode" class="verify-code" :src="vrifyCodeImage" alt="">-->
                <!--</div>-->
              <!--</div>-->
              <div class="login-row" style="padding-top: 10px;">
                <span style="color: #f00" class="text-danger" v-if="errorInfo">{{errorInfo}}</span>
              </div>
              <div class="login-row">
                <el-button style="display: inline-block; width: 100%;" type="primary" @click="submitLogin" size="large" long>
                  <span v-if="!loading">提交</span>
                  <span v-else>Loading...</span>
                </el-button>
              </div>
              <!--<div class="login-row text-center" style="padding-top: 10px;">-->
                <!--<a href="#">忘记密码？</a>-->
              <!--</div>-->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: 'pageLogin',
    data() {
      return {
        loading: false,
        errorInfo: '',
        loginForm: {
//          account: 'superadmin',
//          password: '123456',
          account: '',
          password: '',
          code: 2
        }
      };
    },
    methods: {
      async submitLogin() {
        this.$data.loading = true;
        let res = await this.$formdata.post(this.$config.HTTPOPENAPIURL + '/openapi/common/user/login', {
          ... this.$data.loginForm
        });
        this.$data.loading = false;
        // 登录成功
        if (res.success && res.success === 'true') {
          this.$userLogin.setLoginInfo(res.data);
          this.$router.push('/index');
        }
      }
    },
    mounted() {

    }
  };
</script>
<style lang="scss" scoped>
  @import 'style';
</style>
