import Vue from 'vue';
import axios from 'axios';
import config from './Config';

// import userLogin from './userLogin';

// 处理Raw纯json字符串得请求
axios.defaults.baseURL = config.HTTPBASEURL;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

class Http {
  /**
   * 发起post请求
   * @param _url
   * @param _data
   */
  post(_url, _data) {
    // let _headers = {
    //   'token': userLogin.getLoginToken().toString()
    // };
    return axios({
      // headers: _headers,
      url: _url,
      dataType: 'json',
      data: _data,
      method: 'POST'
    }).then(res => {
      let data = res.data;
      if (!data.success) {
        Vue.prototype.$notify.error({
          title: '提示',
          message: data.reMsg
        });
      }
      return data;
    }).catch(err => {});
  }
  /**
   * 发起get请求
   * @param _url
   */
  get(_url, _params = {}) {
    // let _headers = {
    //   'token': userLogin.getLoginToken().toString()
    // };
    return axios({
      // headers: _headers,
      url: _url,
      dataType: 'json',
      method: 'GET',
      params: _params
    }).then(res => {
      let data = res.data;
      if (!data.success) {
        Vue.prototype.$notify.error({
          title: '提示',
          message: data.reMsg
        });
      }
      return data;
    }).catch(err => {});
  }
}
export default Http;
