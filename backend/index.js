const port =4000;
const express =require('express');
const app= express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://vismayapt:Vismaya123@cluster0.zt1aetv.mongodb.net/e-commerce");

// API Creation

app.get("/",(req,res)=>{
   res.send("Express  App is Running");
})

//Image Storage Engine 

const storage =multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload= multer({storage:storage})

//Creating Upload Endpoint for images 

app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
       success:1,
       image_url:`http://localhost:${port}/images/${req.file.filename}` 
    })
})

//Schema For Creating Products

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
          type:Boolean,
          default:true, 
    },
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1; 
    }
    else{
        id=1;
    }
    const product =new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API For deleting Products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API For getting all  Products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

//Schema  creating for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true, 
    },
    password:{
        type:String,
    },
    cart:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Creating Endpoints for registering the user
app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with the same email address"})
    }
    let cart ={};
    for(let i=0 ;i<300 ;i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();
   
    const data ={
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})
//creating  endpoint for user login

app.post('/login',async(req,res)=>{
    console.log(req.body);
    let user = await Users.findOne({email:req.body.email});
console.log(user);
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user:{
                    id:user.id
                }
            };
            const token = jwt.sign(data,'secret_ecom');
            console.log('successs');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
         res.json({success:false,errors:"Wrong Email Id"})
    }
    
})

//creating endpoint for newcollections data
app.get('/newcollections',async(req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// creating endpoint for popular in women section

app.get('/popularinwomen',async(req,res)=>{
   let products = await Product.find({category:"women"});
   let popular_in_women = products.slice(0,4);
   console.log("Popular in women Fetched");
   res.send(popular_in_women);
})

//creating middleware to fetch user
 const fetchUser = async(req, res,next) =>{
    const token = req.header('auth-token');
    if(!token){
         res.status(401).send({errors:"Please authenticate using a valid token"})        
        }
    else{
        try{
        const data = jwt.verify(token,'secret_ecom');
        req.user = data.user;
        next();
    } catch(error){
        res.status(401).send({errors:"Please authenticate using a valid token"})
    }   
 }
 } 

//creating endpoint for adding products in cartdata

app.post('/addtocart', fetchUser, async (req, res) => {
    console.log('addtocart');
    console.log("Added", req.body.itemId);
    
   // Find user data
let userData = await Users.findOne({ _id: req.user.id });

// Initialize cartData if it doesn't exist
if (!userData.cartData) {
    userData.cartData = {};
}

// Increment the item count in cartData
if (!userData.cartData[req.body.itemId]) {
    userData.cartData[req.body.itemId] = 1;
} else {
    userData.cartData[req.body.itemId] += 1;
}


    // Update the user document with the modified cartData
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    
    res.send("Added");
});


//creating endpoint for removing products from cartdata
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log('remove');
    console.log(req.body);
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
});

//creating endpoint to  get cartdata
app.post('/getcart',fetchUser,async (req,res)=>{
   console.log("GetCart");
   let userData = await Users.findOne({_id:req.user.id});
   res.json(userData.cartData);
})

//creating cart payment

const stripe = require('stripe')('sk_test_51PCcnaSHKuQCxiGEcQkjQQvGbLRGNz3Lk6KIRdOygnvMDC8Ld7AljJbySM8Iww28sG0IIht1LS9aCZEQwjliOrb800SHuq0jZ8')
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: "T-shirt",
          },
          unit_amount:10000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    ui_mode:'embedded',
    return_url:'http://localhost:3000/'
  });

  res.send({clientSecret:session.client_secret});
});



// Get user profile
app.get('/userprofile', async (req, res) => {
    const user = await User.findOne();
    res.json(user);
  });
  
  // Update user profile
  app.post('/updateuserprofile', async (req, res) => {
    const { username, email, phone } = req.body;
    const user = await User.findOneAndUpdate({}, { username, email, phone }, { new: true });
    res.json({ message: 'Profile updated successfully', user });
  });
  
  // Change password
  app.post('/updatepassword', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findOne();
    if (currentPassword !== user.password) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  });
  

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port"+port)
    }
    else
    {
        console.log("Error : "+error)
    }

})