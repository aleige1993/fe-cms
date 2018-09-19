
var moment = require('moment');

var dateTime = {

  /**
   * 获取当前时间
   * */
  getCurrentTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  },

  /**
   * date类型转string
   * */
  dateTimeToString(datetime) {
    return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
  }

}

module.exports = dateTime;
