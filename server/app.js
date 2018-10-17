var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'view')));

// api
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=UTF-8");
  next();
});

var controllerBaseUrl =  './controller/';
app.use('/common', require(controllerBaseUrl + 'common'));
app.use('/article', require(controllerBaseUrl + 'ScCms/CmsArticle'));
app.use('/guided', require(controllerBaseUrl + 'ScCms/CmsGuided'));
app.use('/advert', require(controllerBaseUrl + 'ScCms/CmsAdvertisement'));
app.use('/headline', require(controllerBaseUrl + 'ScCms/CmsHeadline'));
app.use('/column', require(controllerBaseUrl + 'ScCms/CmsColumn'));
app.use('/banner', require(controllerBaseUrl + 'ScCms/CmsBanner'));

module.exports = app;
