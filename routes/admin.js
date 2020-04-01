var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var admin = require('../db/model/adminM')

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

module.exports = router;
  