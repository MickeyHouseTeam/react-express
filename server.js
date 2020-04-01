const express = require('express')
const path = require('path')
const db = require('./db/connect')  //启动服务器的时候同时启动数据库
const bodyParser = require('body-parser')
const app = express()
let userRouter=require('./routes/userRouter')

//post 数据的解析 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 静态资源路径
app.use('/public',express.static(path.join(__dirname,'./public')))
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log('服务端开启')
})