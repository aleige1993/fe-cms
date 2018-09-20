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
var apiBaseUrl = '/api/';
var controllerBaseUrl =  './controller/';
app.use(apiBaseUrl, require(controllerBaseUrl + 'index'));
app.use(apiBaseUrl + 'article', require(controllerBaseUrl + 'ScCms/CmsArticle'));

module.exports = app;
