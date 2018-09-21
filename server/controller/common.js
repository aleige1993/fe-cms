var express = require('express');
var router = express.Router();
var formatResult = require('../utils/formactResult');

router.get('/menuList', function (req, res, next) {
  var menuList = [{
    "name": "首页",
    "url": "/index"
  }, {
    "name": "文章管理",
    "url": "/index/articleList"
  }, {
    "name": "头条管理",
    "url": "/index/headlineList"
  }];
  res.send(formatResult.success(menuList));
});

router.get('/items', function (req, res, next) {
  var enumList = [{
    "EnumName": "TerminalTypeEnum",
    "items": [{
      "text": "APP端",
      "value": 1
    }, {
      "text": "PC端",
      "value": 2
    }]
  }, {
    "EnumName": "AppProcjectEnum",
    "items": [{
      "text": "颂车网APP",
      "value": 1
    }, {
      "text": "颂车邦APP",
      "value": 2
    }, {
      "text": "出行APP",
      "value": 3
    }, {
      "text": "车企源APP",
      "value": 4
    }]
  }, {
    "EnumName": "PcProcjetEnum",
    "items": [{
      "text": "颂车官网",
      "value": 1
    }]
  }];
  res.send(formatResult.success(enumList));
});

module.exports = router;
