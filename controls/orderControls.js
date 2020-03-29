const orderModel = require('../db/model/orderModel')
let orderInsert = async (obj)=>{  //添加
  let result = await orderModel.insertMany(obj)
  return result
}

module.exports = {
  orderInsert
}