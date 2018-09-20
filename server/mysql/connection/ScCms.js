
// var mysql = require('mysql2');
var sequelize = require('sequelize');
var sequelizeConf = require('../config/sequelize.conf');
var config = sequelizeConf('SC_CMS');

module.exports = new sequelize(
  config.dbname,
  config.user,
  config.password,
  config.common
);
