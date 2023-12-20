const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')
const usermodel=require('./model/user')
const loginmodel=require('./model/user')



const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static('images'));

let cartItems = [];

const port=5000;
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'__'+Date.now()+path.extname(file.originalname));
    }
})
const upload=multer({
    storage:storage
})
app.post('/upload',upload.single('file'),(req,res)=>{
    usermodel.create({image:req.file.filename})
    .then(result=>{
        console.log(req.file);
        res.json(result)
    })
    .catch(err=>res.json(err))
})
app.get('/getimage',(req,res)=>{
    usermodel.find()
    .then(image=>res.json(image))
    .catch(err=>res.json(err))
})

app.post('/createuser',(req,res)=>{
    usermodel.create(req.body)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})
app.get('/',(req,res)=>{
    usermodel.find({})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})
app.get('/getuser/:id',(req,res)=>{
    const id=req.params.id;
    usermodel.findById({_id:id})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})
app.delete('/deleteuser/:id',(req,res)=>{
    const id=req.params.id;
    usermodel.findByIdAndDelete({_id:id})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})
app.put('/updateuser/:id',(req,res)=>{
    const id=req.params.id;
  usermodel.findByIdAndUpdate({_id:id},{
    image:req.body.image,
    price:req.body.price
  })
  .then(user=>res.json(user))
  .catch(err=>res.json(err))
})
app.post('cart', (req, res) => {
    const { image, name, price } = req.body;
    const existingItemIndex = cartItems.findIndex(item => item._id === _id);
      cartItems.push({ image, name, price });
    res.json({ success: true, cart: cartItems });
  });
  
app.get('/getcart/:id',(req,res)=>{
    const id=req.params.id;
usermodel.findById({_id:id})
.then(user=>{res.json(cartItems)
console.log(user)})
  .catch(err=>res.json(err))
})
app.delete('/deletecart/:id',(req,res)=>{
    const id=req.params.id;
   usermodel.findById({_id:id})
   .then(user=>res.json(user))
  .catch(err=>res.json(err))
})
app.get('getorder/:id',(req,res)=>{
    const id=req.params.id;
    usermodel.findById({_id:id})
   .then(user=>res.json(user))
  .catch(err=>res.json(err))
})
app.post('userlogin',(req,res)=>{
    loginmodel.create(req.body)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})
app.listen(port,()=>{console.log('server is running');})