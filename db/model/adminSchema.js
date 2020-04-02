const mongoose = require('mongoose')

let foodSchema = new mongoose.Schema({
   name  : {type:String,required:true} ,
   account : {type:String,required:true} ,
   img  : {type:String,required:true} ,
   Type : {type:String,required:true} ,
   quantity :  {type:String,required:true} ,
   current: {type:String,required:true} , 
   time: {type:String,required:true} ,
   norms: {type:String,required:true} ,  
})

let foodModel = mongoose.model('commodity',foodSchema)

module.exports = foodModel