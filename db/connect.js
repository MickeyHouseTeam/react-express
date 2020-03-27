const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/1911',{useNewUrlParser:true,useUnifiedTopology: true})
mongoose.connect('mongodb+srv://xuer:xuer123...@nz1911-xrpc7.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true})
var db = mongoose.connection

db.on('error',()=>{
    console.log('数据库连接失败')
})

db.once('open',()=>{
    console.log('数据库第一次连接成功')
})