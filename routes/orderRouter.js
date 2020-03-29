const express = require('express')
const router = express.Router()
const {orderInsert} = require('../controls/orderControls')
router.get('/all',(req,res)=>{  //获取全部订单

})
router.post('/insert',(req,res)=>{   //增加订单
  let {orderTime,prodId,userID,orderStatus} = req
  orderInsert({orderTime,prodId,userID,orderStatus})
    .then((res)=>{console.log(res)})
    .catch((error)=>{console.log(error)})
})