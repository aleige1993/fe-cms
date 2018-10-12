import Vue from 'vue';
import axios from 'axios';
import config from './Config';
// import userLogin from './userLogin';

// 处理Raw纯json字符串得请求
// axios.defaults.baseURL = config.HTTPOPENAPIURL;
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

class Formdata {
  /**
   * 发起post请求
   * @param _url
   * @param _data
   */
  post(_url, _data) {
    let _param = new FormData(); //创建form对象
    _param.append('message',JSON.stringify(_data));//通过append向form对象添加数据
    let _config = {
      headers: {
        'appId': config.HTTPHEADER_APPID,
        'version': config.HTTPHEADER_APPVERSION,
        'sign': config.HTTPHEADER_APPSIGN
      }
    };
    return axios.post(_url, _param, _config).then(res => {
      let data = res.data;
      if (data.success && data.success === 'false') {
        Vue.prototype.$notify.error({
          title: '提示',
          message: data.message
        });
      }
      return data;
    }).catch(err => {});
  }
  /**
   * 发起get请求
   * @param _url
   */
  // get(_url, _params = {}) {
  //   // let _headers = {
  //   //   'token': userLogin.getLoginToken().toString()
  //   // };
  //   return axios({
  //     // headers: _headers,
  //     url: _url,
  //     dataType: 'json',
  //     method: 'GET',
  //     params: _params
  //   }).then(res => {
  //     let data = res.data;
  //     if (!data.success) {
  //       Vue.prototype.$notify.error({
  //         title: '提示',
  //         message: data.reMsg
  //       });
  //     }
  //     return data;
  //   }).catch(err => {});
  // }
}
export default Formdata;
