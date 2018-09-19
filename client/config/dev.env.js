'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTPAPIURL: '"http://localhost:8010/api/"',
  HTTPBOSSURL: '"http://10.164.238.15:8080"'
})
