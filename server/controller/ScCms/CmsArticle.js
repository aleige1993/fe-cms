
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsArticle = require('../../model/ScCms/CmsArticle');
var article = CmsArticle(connection, sequelize);

router.get('/articleList', function(req, res, next) {
  article.findAll().then(function (result) {
    res.send(formactResult.success(result));
  }).catch(function (result) {
    res.send(formactResult.error('获取失败', result));
  });
});

router.post('/articleAdd', function(req, res, next) {
  req.body.gmtCreate = dateTime.getCurrentTime();
  article.create(req.body).then(function () {
    res.send(formactResult.success());
  }).catch(function (result) {
    res.send(formactResult.error('添加失败', result));
  });
});

// router.post('/newsModify', function(req, res, next) {
//   var news = ScNews(connection, sequelize);
//   req.body.modifyTime = dateTime.getCurrentTime();
//   news.update(req.body, {
//     'where': {'id': req.body.id}
//   }).then(function () {
//     res.send(formactResult.success());
//   }).catch(function (result) {
//     res.send(formactResult.error('修改失败', result));
//   });
// });

// router.post('/newsDelete', function(req, res, next) {
//   var news = ScNews(connection, sequelize);
//   news.destroy({
//     'where': {'id': req.body.id}
//   }).then(function () {
//     res.send(formactResult.success());
//   }).catch(function (result) {
//     res.send(formactResult.error('删除失败', result));
//   });
// });

module.exports = router;
