
// var mysql = require('mysql2');
var sequelize = require('sequelize');
var sequelizeConfig = require('../config/sequelize.conf');

module.exports = new sequelize(sequelizeConfig('SC_CMS'));

