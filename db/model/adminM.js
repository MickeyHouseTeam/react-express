var mongoose =require('mongoose')
var Schema =mongoose.Schema;
var productSchema =new Schema({
  "adminId":String,
  "userName":String,
  "passWord":String,
  "level":String
})
module.exports =mongoose.model('admins',productSchema)