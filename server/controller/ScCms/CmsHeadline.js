
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsHeadline = require('../../model/ScCms/CmsHeadline');
var headline = CmsHeadline(connection, sequelize);

router.post('/headlineList', (req, res, next) => {
  var id = req.body.id;
  if (id) {
    headline.findOne({'where': {'id': id}}).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('获取失败', result));
    });
  } else {
    headline.findAll({
      'where': {
        'title': {$like: '%' + (req.body.title || '') + '%'},
        'terminal': {$like: '%' + (req.body.terminal || '') + '%'},
        'appType': {$like: '%' + (req.body.appType || '') + '%'},
        'isUsed': {$like: '%' + (req.body.isUsed || '') + '%'},
      },
      'order': [['gmtCreate', 'DESC']]
    }).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      console.log(result);
      res.send(formactResult.error('获取失败', result));
    });
  }
});

router.post('/headlineAdd', function(req, res, next) {
  req.body.gmtCreate = dateTime.getCurrentTime();
  headline.create(req.body).then(function (result) {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('添加失败', result));
  });
});

router.post('/headlineModify', function(req, res, next) {
  req.body.gmtUpdate = dateTime.getCurrentTime();
  headline.update(req.body, {'where': {'id': req.body.id}}).then(function () {
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
