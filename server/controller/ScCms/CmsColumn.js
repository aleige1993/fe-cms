
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsColumn = require('../../model/ScCms/CmsColumn');
var column = CmsColumn(connection, sequelize);
var CmsHeadline = require('../../model/ScCms/CmsHeadline');
var headline = CmsHeadline(connection, sequelize);

router.post('/columnList', (req, res, next) => {
  var currentPage = req.body.currentPage || 1;
  var pageSize = req.body.pageSize || 999999999;
  // console.log(currentPage, pageSize);
  column.findAndCountAll({
    'where': {
      'name': {$like: '%' + (req.body.name || '') + '%'},
      'isUsed': {$like: '%' + (req.body.isUsed || '') + '%'}
    },
    'offset': (currentPage - 1) * pageSize,
    'limit': pageSize,
    'order': [['sequence', 'ASC']]
  }).then(function (result) {
    res.send(formactResult.success(result));
  }).catch(function (result) {
    res.send(formactResult.error('获取失败', result));
  });
});

router.post('/columnAdd', function(req, res, next) {
  req.body.gmtCreate = dateTime.getCurrentTime();
  req.body.isDefault = 2;
  column.create(req.body).then(function (result) {
    res.send(formactResult.success(result));
  }).catch(function (result) {
    res.send(formactResult.error('添加失败', result));
  });
});

router.post('/columnModify', function(req, res, next) {
  req.body.gmtUpdate = dateTime.getCurrentTime();
  column.update(req.body, {'where': {'id': req.body.id}}).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('修改失败', result));
  });
});

router.post('/columnDelete', function(req, res, next) {
  var id = req.body.id;
  headline.findAll({'where': {'columnType': id}}).then(function (result) {
    if (result && result.length) {
      res.send(formactResult.error('删除失败，该栏目中存在资讯内容'));
    } else {
      column.destroy({'where': {'id': id}}).then(function () {
        res.send(formactResult.success());
      }).catch(function (result) {
        res.send(formactResult.error('删除失败', result));
      });
    }
  }).catch(function (result) {
    res.send(formactResult.error('获取失败', result));
  });
});

module.exports = router;
