const orderModel = require('../db/model/orderModel')

let getAllOrderList = async (_id,page=1,pageSize,orderStatus='全部订单',kw=null) =>{//获取订单列表 带分页
  let result = ''
  let allCount = 0
  // console.log(page,pageSize)
  console.log(orderStatus,kw)
  if(_id){  //根据id查找订单
    bool = await orderModel.findOne({_id})
    console.log(_id,bool)
    if(bool){
      result = bool
      allCount = 1
      // allCount = result.length || 1
    }else{
      console.log('未查找到此id')
      throw new Error('此id不存在~')
    }
  }else if(!page && !pageSize ){  //没有传页码  就查找全部
    result = await orderModel.find()
    allCount = result.length
  }else{     //分页查询  分类查询 + 模糊查询
    if(orderStatus==='全部订单'){  //全部订单
      let kwReg = new RegExp(kw)
      let allOrders = await orderModel.find({$or:[{orderTime:{$regex:kwReg}},{userId:{$regex:kwReg}},{prodId:{$regex:kwReg}},{orderStatus:{$regex:kwReg}}] })
      allCount = allOrders.length
      result = await orderModel.find({$or:[{orderTime:{$regex:kwReg}},{userId:{$regex:kwReg}},{prodId:{$regex:kwReg}},{orderStatus:{$regex:kwReg}}] }).skip((Number(page-1))*pageSize).limit(Number(pageSize))
    }else{  //其他分类查询
      let reg = new RegExp(orderStatus)
      let kwReg = new RegExp(kw)
      let allOrders = await orderModel.find({ 
        $and:[
          {orderStatus:{$regex:reg}},
          {$or:[{orderTime:{$regex:kwReg}},{userId:{$regex:kwReg}},{prodId:{$regex:kwReg}},{orderStatus:{$regex:kwReg}}]} 
        ] 
      })
      allCount = allOrders.length
      console.log(allCount)
      result = await orderModel.find({ 
        $and:[
          {orderStatus:{$regex:reg}},
          {$or:[{orderTime:{$regex:kwReg}},{userId:{$regex:kwReg}},{prodId:{$regex:kwReg}},{orderStatus:{$regex:kwReg}}]} 
        ] 
      }).skip((Number(page-1))*pageSize).limit(Number(pageSize))
    }
  }

  // if(kw){//如果传了关键字  模糊查询
  //   let kwReg = new RegExp(kw)
  //   let allOrders = await orderModel.find({ $or:[{orderTime:{$regex:kwReg}},{userId:{$regex:kwReg}},{prodId:{$regex:kwReg}},{orderStatus:{$regex:kwReg}}] })
  //   allCount = allOrders.length
  //   result = await orderModel.find({ $or:[{orderTime:{$regex:kwReg}},{userId:{$regex:kwReg}},{prodId:{$regex:kwReg}},{orderStatus:{$regex:kwReg}}] }).skip((Number(page-1))*pageSize).limit(Number(pageSize))
  // }
  console.log(result,allCount)
  if(!allCount){
    throw new Error('没有匹配的数据')
  }
  return {allCount,result}
  
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
let orderDelById = async (_id) =>{  //删除
  console.log('方法函数_id',_id)
  // let result = await orderModel.deleteOne({_id})
  let bool = await orderModel.findOne({_id})
  console.log(bool)
  if(bool){
    let result = await orderModel.deleteOne({_id})
    return result
  }
  else{
    console.log('未查找到此id')
    throw new Error('此id不存在~')
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