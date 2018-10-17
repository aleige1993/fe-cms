
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsHeadline = require('../../model/ScCms/CmsHeadline');
var headline = CmsHeadline(connection, sequelize);
var CmsColumn = require('../../model/ScCms/CmsColumn');
var column = CmsColumn(connection, sequelize);

function searchHeadlineList(req, res, next) {
  var currentPage = req.body.currentPage || 1;
  var pageSize = req.body.pageSize || 999999999;
  headline.findAndCountAll({
    'where': {
      'title': {$like: '%' + (req.body.title || '') + '%'},
      'columnType': {$like: '%' + (req.body.columnType || '') + '%'},
      'terminal': {$like: '%' + (req.body.terminal || '') + '%'},
      'appType': {$like: '%' + (req.body.appType || '') + '%'},
      'isUsed': {$like: '%' + (req.body.isUsed || '') + '%'},
    },
    'offset': (currentPage - 1) * pageSize,
    'limit': pageSize,
    'order': [['gmtCreate', 'DESC']]
  }).then(function (result) {
    res.send(formactResult.success(result));
  }).catch(function (result) {
    res.send(formactResult.error('获取失败', result));
  });
}

router.post('/headlineList', (req, res, next) => {
  var columnName = req.body.columnName;
  if (columnName) {
    column.findOne({'where': {'name': columnName}}).then(function (result) {
      req.body.columnType = result.id;
      searchHeadlineList(req, res, next);
    }).catch(function (result) {
      res.send(formactResult.error('获取失败', result));
    });
  } else {
    searchHeadlineList(req, res, next);
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

router.post('/headlineDelete', function(req, res, next) {
  headline.destroy({'where': {'id': req.body.id}}).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('删除失败', result));
  });
});

module.exports = router;
