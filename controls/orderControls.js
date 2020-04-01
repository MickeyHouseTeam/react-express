const orderModel = require('../db/model/orderModel')

let getAllOrderList = async (_id,page=1,pageSize=3,orderStatus='全部订单') =>{//获取订单列表 带分页
  let result = ''
  let allCount = 0
  // console.log(page,pageSize)
  console.log(orderStatus)
  if(_id){  //根据id查找订单
    result = await orderModel.findOne({_id})
    allCount = result.length
  }else if(!page && !pageSize ){  //没有传页码  就查找全部
    result = await orderModel.find()
    allCount = result.length
  }else{     //分页查询  分类查询
    if(orderStatus==='全部订单'){  //全部订单
      let allOrders = await orderModel.find()
      allCount = allOrders.length
      result = await orderModel.find().skip((Number(page-1))*pageSize).limit(Number(pageSize))
    }else{  //其他分类查询
      let reg = new RegExp(orderStatus)
      let allOrders = await orderModel.find({orderStatus:{$regex:reg}})
      allCount = allOrders.length
      console.log(allCount)
      result = await orderModel.find({orderStatus:{$regex:reg}}).skip((Number(page-1))*pageSize).limit(Number(pageSize))
    }
    return {allCount,result}
  }
  
}
let getOneOrderById = async (_id) =>{  //根据id查找订单
  let result = await orderModel.findOne({_id})
  return result
}
let orderInsert = async (obj)=>{  //添加
  // console.log(obj)
  let result = await orderModel.insertMany(obj)
  return result
}
let orderDelById = (_id) =>{  //删除
  console.log('方法函数',_id)
  let bool =  orderModel.findOne({_id})
  console.log(bool)
  if(bool){
    let result =  orderModel.deleteOne({_id})
    return result
  }else{
    throw new error('此id不存在~')
  }
  
}
// let orderDelById = (_id)=>{  //删除
//   console.log(_id)
//   return orderModel.deleteOne({_id})
// }
let orderUpdateById = async (_id,obj) =>{  //修改
  let result = await orderModel.updateOne({_id},obj)
  return result 
}
module.exports = {
  getAllOrderList,
  getOneOrderById,
  orderInsert,
  orderDelById,
  orderUpdateById
}