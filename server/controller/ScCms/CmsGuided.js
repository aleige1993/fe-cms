
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsGuided = require('../../model/ScCms/CmsGuided');
var guided =CmsGuided(connection,sequelize);

router.post('/guidedList', function(req, res, next) {
  var id = req.body.id;
  if (id) {
    guided.findOne({'where': {'id':id}}).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('获取失败', result));
    });
  } else {
    guided.findAndCountAll(
      {
        where:{
          'appType':{$like: '%'+(req.body.appType||'')+'%'},
          'title':{ $like: '%'+(req.body.title||'')+'%'}
        },
        order:[['isUsed' , 'ASC']],
        offset:(req.body.page/1 - 1) * req.body.pageSize/1,
        limit:req.body.pageSize/1
      }).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('获取失败', result));
    });
  }
});

router.post('/guidedFind',function (req,res,next) {
  guided.findAndCountAll({
    where:{
      'appType':{$like: '%'+(req.body.appType||'')+'%'},
      'title':{ $like: '%'+(req.body.title||'')+'%'}
    },
    order:[['isUsed' , 'ASC']],
    offset:(req.body.page/1 - 1) * req.body.pageSize/1,
    limit:req.body.pageSize/1
  }).then(function (result) {
    res.send(formactResult.success(result));
  }).catch(function (result) {
    res.send(formactResult.error('获取失败',result));
  })
})


router.post('/guidedLike', function(req, res, next) {
    guided.findAll({
      where: {
        'location': req.body.location,
        'appType':req.body.appType,
        'isUsed':req.body.isUsed
      }
    }).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('', result));
    });
});

router.post('/GuidedAdd',(req,res,next)=>{
  req.body.gmtCreate = dateTime.getCurrentTime();
  guided.create(req.body).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error("添加失败",result));
  });
});



router.post('/guidedUpdate',(req,res,next)=>{
  req.body.gmtUpdate = dateTime.getCurrentTime();
  guided.update(req.body,{
    'where':{'id':req.body.id}
  }).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error('修改失败',result));
  })
})


router.post('/guidedUpdateIsUsed',(req,res,next)=>{
  guided.update(req.body,{
    'where':{
      'location':req.body.location,
      'appType':req.body.appType
    }
  }).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error('禁用失败',result));
  })
})


router.post('/guidedDelete',(req,res,next)=>{
  console.log(req);
  guided.destroy({
    'where': {'id': req.body.id }
  }).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error('删除失败',result));
  });
});



module.exports = router;
