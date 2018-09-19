
var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=UTF-8");
  next();
});

router.get('/', function(req, res, next) {
  res.send('nodeapi server start success!');
});

module.exports = router;
