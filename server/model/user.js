const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    image:String,
    name:String,
    price:Number
})

const usermodel=mongoose.model('user',userschema)

module.exports=usermodel;