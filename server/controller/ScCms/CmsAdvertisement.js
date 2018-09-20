
var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var connection = require('../../mysql/connection/ScCms');
var formactResult = require('../../utils/formactResult');
var dateTime = require('../../utils/dateTime');
var CmsAdvertisement = require('../../model/ScCms/CmsAdvertisement');
var advert =CmsAdvertisement(connection,sequelize); 

router.get('/advertList',(req,res,next)=>{
  advert.findAll().then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error('获取失败',result));
  });
});  

router.post('/advertAdd',(req,res,next)=>{ 
  req.body.gmtCreate = dateTime.getCurrentTime();
  advert.create(req.body).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error("添加失败",result));
  });
});


router.post('/advertUpdata',(req,res,next)=>{
  req.body.gmtUpdate = dateTime.getCurrentTime();
  advert.update(req.body,{
    'where':{'id':req.body.id}
  }).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error('修改失败',result));
  })
})

router.post('/advertDelete',(req,res,next)=>{
  advert.destroy({
    'whrer': {'id': req.body.id }
  }).then((result)=>{
    res.send(formactResult.success(result));
  }).catch((result)=>{
    res.send(formactResult.error('删除失败',result));
  });
});

 

module.exports = router;
