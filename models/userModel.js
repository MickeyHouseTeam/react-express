var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username:String,
    pwd:String,
    autorimg:String,
    state:Boolean,
    content:String,
    sex:String,
    birth:String
})
var userModel = mongoose.model('userModel',userSchema)

module.exports = userModel;