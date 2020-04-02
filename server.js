const express = require('express')
const path = require('path')
const db = require('./db/connect')  //启动服务器的时候同时启动数据库
const bodyParser = require('body-parser')
var adminRouter =require('./routes/admin')

const orderRouter = require('./routes/orderRouter')
const app = express()
let userRouter=require('./routes/userRouter')

//post 数据的解析 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/admin',adminRouter)

// 静态资源路径
app.use('/public',express.static(path.join(__dirname,'./public')))

app.use('/admin/order',orderRouter)
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log('服务端开启')
})