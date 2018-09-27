'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTPAPIURL: '"http://192.168.31.232:8010"',
  HTTPBOSSURL: '"http://10.164.238.15:8080"'
})
