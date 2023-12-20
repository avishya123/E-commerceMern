const mongoose=require('mongoose');

const loginschema=new mongoose.Schema({
    image:String,
    name:String,
    price:Number
})

const loginmodel=mongoose.model('login',loginschema)

module.exports=loginmodel;