
var mysql = require('mysql2');
var sequelize = require('sequelize');
var config = require('./config')['dev'];

var connection = new sequelize(
  'sc_portal', // 数据库名
  config.user,   // 用户名
  config.password,   // 用户密码
  {
    dialect: 'mysql',  // 数据库使用mysql
    host: config.host, // 数据库服务器ip
    port: config.port,        // 数据库服务器端口
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
);

module.exports = connection;

