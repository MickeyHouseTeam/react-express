var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var admin = require('../db/model/adminM')
var adminSchema = require('..db/model/adminSchema')


router.get('/', function (req, res, next) {
  var dataValue = req.query.dataValue;
  // console.log(req.query)
  admin.find({ key: dataValue }, (err, data) => {
    if(err){
      console.log(err);
    }
    res.json({
      msg: "查询成功",
      result: data
    })
  })
});

router.post('/', (req, res) => {
  var obj = req.body;
  // console.log(obj)
  admin.insertMany(obj,(err, data) => {
    if(err){
      console.log(err);
    }
    res.send({
      status: 200,
      msg: "插入成功",
      result: data
    })
  })
})

router.put('/update', (req, res) => {
  var {_id} = req.query
	var {userName,passWord,level} = req.body;
  // console.log(_id,userName,passWord,level,req.body,req.query)
	admin.updateOne({_id},{ $set: {userName,passWord,level} },(err, data) => {
		if(err){
			console.log(err);
		}
		res.json({
			msg: "更改成功",
			result: data
		})
	})
})

router.delete('/del', (req, res) => {
	var {_id} = req.query
	admin.remove({_id}, (err, data) => {
		if(err){
			console.log(err);
		}
		res.json({
      status: 200,
			msg: "删除成功",
			result: data
		})
	})
})

router.post('/login', (req, res) => {
	var {userName,passWord} = req.body;
	admin.find({userName}, function (err, data) {
    console.log(data);
    if(data.length === 0) {
        res.send({isSuccess: false, message: '该用户不存在'});
    } else if (data[0].passWord === passWord) {
        res.send({isSuccess: true, message: '登录成功'});
    } else if (data[0].passWord !== passWord) {
        res.send({isSuccess: false, message: '密码不正确，请重新输入'});
    }
  })
})



//ly//


 router.get('/all',(req,res)=>{
    adminSchema.find({},(err,relut)=>{
        res.send(relut)
    })
 })
 router.post('/insertMany',(req,res)=>{
    var {obj} = req.body
        obj = JSON.parse(obj)
    adminSchema.insertMany(obj).then(()=>{
        res.send('添加成功')
        console.log(obj)

    }).catch((relsut)=>{
        res.send('添加失败')
        console.log(obj)
    })
 })
 router.post('/updateOne',(req,res)=>{
    var {_id} = req.query
    var {Type,name,original,desc,img,quantity,current,time,norms} = req.body
    adminSchema.updateOne({_id},{Type,name,original,desc,img,quantity,current,time,norms},(err,relut)=>{
      if(!err){
          res.send('修改成功')
      }else{
          res.send('修改失败')
      }
    })
 })

 router.get('/deleteOne',(req,res)=>{
    var {_id} = req.query
    adminSchema.deleteOne({_id},(err)=>{
        if(!err){
            res.send('删除成功')
        }
    })
 })

 router.get('/type',(req,res)=>{
     var {Type} = req.query
    adminSchema.find({Type},(err,data)=>{
        if(!err){
            res.send({
                msg:'成功',
                result:data
            })
        }else{
            res.send({
                msg:'失败'
            })
        }
    })
 })

module.exports = router;
  