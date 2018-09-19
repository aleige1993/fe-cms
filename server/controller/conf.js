
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../mysql/connection');
var formactResult = require('../utils/formactResult');
var dateTime = require('../utils/dateTime');
var ScNews = require('../model/ScNews');

router.get('/newsList', function(req, res, next) {
  var news = ScNews(connection, sequelize);
  news.findAll().then(function (result) {
    res.send(formactResult.success(result));
  }).catch(function (result) {
    res.send(formactResult.error('获取失败', result));
  });
});

router.post('/newsAdd', function(req, res, next) {
  var news = ScNews(connection, sequelize);
  req.body.createTime = dateTime.getCurrentTime();
  news.create(req.body).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('添加失败', result));
  });
});

router.post('/newsModify', function(req, res, next) {
  var news = ScNews(connection, sequelize);
  req.body.modifyTime = dateTime.getCurrentTime();
  news.update(req.body, {
    'where': {'id': req.body.id}
  }).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('修改失败', result));
  });
});

router.post('/newsDelete', function(req, res, next) {
  var news = ScNews(connection, sequelize);
  news.destroy({
    'where': {'id': req.body.id}
  }).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('删除失败', result));
  });
});

module.exports = router;
