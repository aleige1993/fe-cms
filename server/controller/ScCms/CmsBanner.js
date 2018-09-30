
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsBanner = require('../../model/ScCms/CmsBanner');
var banner = CmsBanner(connection, sequelize);

router.post('/bannerList', (req, res, next) => {
  var id = req.body.id;
  if (id) {
    banner.findOne({'where': {'id': id}}).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('获取失败', result));
    });
  } else {
    var currentPage = req.body.currentPage || 1;
    var pageSize = req.body.pageSize || 999999999;
    banner.findAndCountAll({
      'where': {
        'title': {$like: '%' + (req.body.title || '') + '%'},
        'terminal': {$like: '%' + (req.body.terminal || '') + '%'},
        'appType': {$like: '%' + (req.body.appType || '') + '%'},
        'isUsed': {$like: '%' + (req.body.isUsed || '') + '%'},
      },
      'offset': (currentPage - 1) * pageSize,
      'limit': pageSize,
      'order': [['sequence', 'ASC']]
    }).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('获取失败', result));
    });
  }
});

router.post('/bannerAdd', function(req, res, next) {
  req.body.gmtCreate = dateTime.getCurrentTime();
  banner.create(req.body).then(function (result) {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('添加失败', result));
  });
});

router.post('/bannerModify', function(req, res, next) {
  req.body.gmtUpdate = dateTime.getCurrentTime();
  banner.update(req.body, {'where': {'id': req.body.id}}).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('修改失败', result));
  });
});

router.post('/bannerDelete', function(req, res, next) {
  banner.destroy({'where': {'id': req.body.id}}).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('删除失败', result));
  });
});

module.exports = router;
