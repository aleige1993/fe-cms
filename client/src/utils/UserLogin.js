
import MyRouter from '@/router';
class UserLogin {
  LOGININFOKEY='loginInfo';
  /**
   * 判断是否登录
   * @returns {boolean}
   */
  isLogin() {
    let localLoginInfo = window.localStorage.getItem(this.LOGININFOKEY);
    if (typeof (localLoginInfo) !== 'undefined' && localLoginInfo !== '' && localLoginInfo !== null) {
      return true;
    } else {
      MyRouter.push({name: 'login'});
      return false;
    }
  }
  /**
   * 获取登录信息
   * @returns {{}}
   */
  getLoginInfo() {
    if (this.isLogin()) {
      return JSON.parse(localStorage.getItem(this.LOGININFOKEY));
    } else {
      return {};
    }
  }
  /**
   * 获取token
   * @returns {token}
   */
  getLoginToken() {
    let loginInfo = this.getLoginInfo();
    return loginInfo.token;
  }
  /**
   * 存储登录信息
   * @param loginInfo
   * @returns {{}}
   */
  setLoginInfo(loginInfo) {
    localStorage.setItem(this.LOGININFOKEY, JSON.stringify(loginInfo));
    return this.getLoginInfo();
  }
  /**
   * 清空登录信息
   */
  removeLoginInfo() {
    localStorage.removeItem(this.LOGININFOKEY);
  }
}
export default new UserLogin();
