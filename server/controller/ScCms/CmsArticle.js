
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsArticle = require('../../model/ScCms/CmsArticle');
var article = CmsArticle(connection, sequelize);
var CmsHeadline = require('../../model/ScCms/CmsHeadline');
var headline = CmsHeadline(connection, sequelize);
var CmsBanner = require('../../model/ScCms/CmsBanner');
var banner = CmsBanner(connection, sequelize);

router.post('/articleList', (req, res, next) => {
  var id = req.body.id;
  if (id) {
    article.findOne({'where': {'id': id}}).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('获取失败', result));
    });
  } else {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    // console.log(currentPage, pageSize);
    article.findAndCountAll({
      'where': {
        'title': {$like: '%' + (req.body.title || '') + '%'},
        'author': {$like: '%' + (req.body.author || '') + '%'}
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
  var id = req.body.id;
  headline.findAll({'where': {'articleId': id}}).then(function (result) {
    if (result && result.length) {
      res.send(formactResult.error('删除失败, 该文章已被添加到资讯列表'));
    } else {
      banner.findAll({'where': {'articleId': id}}).then(function (result) {
        if (result && result.length) {
          res.send(formactResult.error('删除失败, 该文章已被添加到banner列表'));
        } else {
          article.destroy({'where': {'id': id}}).then(function () {
            res.send(formactResult.success());
          }).catch(function (result) {
            res.send(formactResult.error('删除失败', result));
          });
        }
      }).catch(function (result) {
        res.send(formactResult.error('获取失败', result));
      });
    }
  }).catch(function (result) {
    res.send(formactResult.error('获取失败', result));
  });
});

module.exports = router;
