'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTPBASEURL: '"http://localhost:30000"',
  HTTPOPENAPIURL: '"http://192.168.31.247:10001"'
});
