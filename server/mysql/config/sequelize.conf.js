
var CONFIG = require('./dev.conf');

function sequelizeInit(DB_NAME) {
  return {
    dbname: CONFIG.DATABASE[DB_NAME], // 数据库名
    user: CONFIG.CONNECTION.USER,   // 用户名
    password: CONFIG.CONNECTION.PASSWORD,   // 用户密码
    common: {
      dialect: 'mysql',  // 数据库使用mysql
      host: CONFIG.CONNECTION.HOST, // 数据库服务器ip
      port: CONFIG.CONNECTION.PORT,        // 数据库服务器端口
      define: {
        'underscored': true
      },
      pool: {
        max: 50,
        min: 0,
        idle: 10000
      },
      timezone: '+08:00'
    }
  };
}

module.exports = sequelizeInit;


