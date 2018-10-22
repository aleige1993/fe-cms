
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsAdvertisement = require('../../model/ScCms/CmsAdvertisement');
var advert =CmsAdvertisement(connection,sequelize);

router.post('/advertList',async (req, res, next)=>{
  var id = req.body.id;
  if (id) {
    let result = await advert.findOne({'where': {'id':id}});
    try{
      res.send(formactResult.success(result));
    }catch(err){
      res.send(formactResult.error('获取失败', err));
    }
  }else {
    let currentPage = req.body.currentPage || 1;
    let pageSize = req.body.pageSize || 9999;
    let result = await  advert.findAndCountAll(
      {
        where:{
          'isUsed':{$like: '%'+(req.body.isUsed||'')+'%'},
          'title':{ $like: '%'+(req.body.title||'')+'%'}
        },
        order:[['isUsed' , 'ASC']],
        offset:(currentPage/1 - 1) * pageSize/1,
        limit:pageSize/1
      });
    try{
      res.send(formactResult.success(result));
    }catch (err){
      res.send(formactResult.error('获取失败', err));
    }
  }
});

router.post('/advertFindLocation',function (req,res,next) {
  advert.findAll({
    where:{
      'location':{$like: '%'+(req.body.location||'')+'%'},
      'isUsed':1
    }
  }).then(function (result) {
    res.send(formactResult.success(result));
  }).catch(function (result) {
    res.send(formactResult.error('获取失败',result));
  })
})


router.get('/existLocation', function(req, res, next) {
  var location = req.query.location;
  if (location && location.length) {
    advert.findOne({'where': {'location': location}}).then(function (result) {
      res.send(formactResult.success(result));
    }).catch(function (result) {
      res.send(formactResult.error('', result));
    });
  }
});


router.post('/advertAdd',(req,res,next)=>{
  req.body.gmtCreate = dateTime.getCurrentTime();
  advert.create(req.body).then((result)=>{
    if(req.body.isOutUrl==2){
      var url = req.body.autoUrl+result.id;
      console.log(url);
      advert.update({url: url},{
        'where':{'id':result.id}
      }).then((resultupdate)=>{
        res.send(formactResult.success(resultupdate));
      }).catch((resultupdate)=>{
        res.send(formactResult.error("添加失败",resultupdate));
      })
    }
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error("添加失败",result));
  });
});


router.post('/advertUpdate',(req,res,next)=>{
  console.log(req.body);
  req.body.gmtUpdate = dateTime.getCurrentTime();
  if(req.body.isOutUrl==2){
    req.body.url = req.body.autoUrl+req.body.id;
  }
  advert.update(req.body,{
    'where':{'id':req.body.id}
  }).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error('修改失败',result));
  })
})


router.post('/advertUpdateLocation',(req,res,next)=>{
  advert.update(req.body,{
    'where':{'location':req.body.location}
  }).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error('禁用失败',result));
  })
})


router.post('/advertDelete',(req,res,next)=>{
  console.log(req);
  advert.destroy({
    'where': {'id': req.body.id }
  }).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error('删除失败',result));
  });
});



module.exports = router;
