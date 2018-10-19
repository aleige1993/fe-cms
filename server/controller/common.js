var express = require('express');
var router = express.Router();
var formatResult = require('../utils/formactResult');
var menuList = require('../datas/menuList');
var enumList = require('../datas/enumList');

router.get('/menuList', function (req, res, next) {
  res.send(formatResult.success(menuList));
});

router.get('/items', function (req, res, next) {
  res.send(formatResult.success(enumList));
});

module.exports = router;
