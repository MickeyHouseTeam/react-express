const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({//创建schema对象  数据库模板 表头 设置表头字段
  _id:{type:String,required:false},  //订单编号
  orderTime:{type:String,required:true},//下单时间
  prodId:{type:Array,required:true}, //产品id
  userID:{type:String,required:true},  //用户id
  orderStatus:{type:String,required:true},  //订单状态
}) 
let orderModel = mongoose.model('orders',orderSchema)//创建数据模型  将 表头 与 数据库集合 对应起来

module.exports = orderModel