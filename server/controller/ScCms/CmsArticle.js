
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsArticle = require('../../model/ScCms/CmsArticle');
var article = CmsArticle(connection, sequelize);

router.get('/articleList', function(req, res, next) {
  var id = req.query.id;
  if (id && id.length) {
    article.findOne({'where': {'id': id}}).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('获取失败', result));
    });
  } else {
    article.findAll().then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('获取失败', result));
    });
  }
});

router.post('/articleAdd', function(req, res, next) {
  req.body.gmtCreate = dateTime.getCurrentTime();
  article.create(req.body).then(function (result) {
    article.update({url: result.url + result.id}, {'where': {'id': result.id}}).then(function () {
      res.send(formactResult.success());
    }).catch(function () {
      res.send(formactResult.error('添加失败', result));
    })
  }).catch(function (result) {
    res.send(formactResult.error('添加失败', result));
  });
});

router.post('/articleModify', function(req, res, next) {
  req.body.gmtUpdate = dateTime.getCurrentTime();
  article.update(req.body, {'where': {'id': req.body.id}}).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('修改失败', result));
  });
});

router.post('/articleDelete', function(req, res, next) {
  article.destroy({'where': {'id': req.body.id}}).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('删除失败', result));
  });
});

module.exports = router;
