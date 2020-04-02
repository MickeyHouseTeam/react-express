const express = require('express')
const router = express.Router()
const {getAllOrderList,orderInsert,orderDelById,orderUpdateById} = require('../controls/orderControls')
router.get('/list',(req,res)=>{  //获取订单列表 带分页
  // let page = req.query.page
  // let pageSize = req.query.pageSize
  // let {page = 1, pageSize = 3} = req.query
  let {_id,page,pageSize,orderStatus,kw} = req.query
  // console.log(page,pageSize)
  console.log(orderStatus,kw)
  getAllOrderList(_id,page,pageSize,orderStatus,kw)
    .then((data)=>{
      console.log('查询成功',data)
      let {allCount,result} = data
      res.send({code:200,msg:'查询成功',allCount,list:result})
    })
    .catch((error)=>{
      console.log('查询失败',error);
      res.send({code:400,msg:'查询失败:'+error})
    })
})
router.post('/insert',(req,res)=>{   //订单添加
  // console.log(req.body)
  let {orderTime,prodId,userId,orderStatus} = req.body
  let nowtime = new Date()
  let Y = nowtime.getFullYear()
  let M = nowtime.getMonth()+1
  M = M>=10?M:'0'+M
  let D = nowtime.getDate()
  D = D>=10?D:'0'+D
  // console.log(nowtime)
  let H = nowtime.getHours()
  H = H>=10?H:'0'+H
  let m = nowtime.getMinutes()
  m = m>=10?m:'0'+m
  let s = nowtime.getSeconds()
  s = s>=10?s:'0'+s
  
  let time = `${Y}/${M}/${D} ${H}:${m}:${s}`
  // console.log(time)
  orderTime = time
  orderInsert({orderTime,prodId,userId,orderStatus})
    .then((data)=>{
      console.log('插入成功',data);
      res.send({code:200,msg:'插入成功',list:data})
    })
    .catch((err)=>{
      console.log('插入失败',err);
      res.send({code:400,msg:'插入失败:'+err})
    })
})
router.post('/del',(req,res)=>{
  // console.log('删除的req:',req)
  let {_id} = req.body
  console.log('路由_id：',_id)
  orderDelById(_id)
    .then((data)=>{
      console.log('删除成功',data)
      res.send({code:200,msg:'删除成功',list:data})
    })
    .catch((err)=>{
      console.log('删除失败',err)
      res.send({code:400,msg:'删除失败:'+err})
    })
})
router.put('/update',(req,res)=>{//修改
  let {_id} = req.body
  let {orderTime,prodId,userId,orderStatus} = req.body
  orderUpdateById(_id,{orderTime,prodId,userId,orderStatus})
    .then((data)=>{console.log('修改成功');res.send({code:200,msg:'修改成功',list:data})})
    .catch((error)=>{console.log('修改失败',error);res.send({code:400,msg:'修改失败:'+error})})

})
module.exports = router