const express=require("express");
const app=express();

// dot env import 
require("dotenv").config();
const port=process.env.PORT_NO || 3000

// parsing with json
app.use(express.json());

// connect with db
require('./config/database').dbconnect();
 const cookieparser = require("cookie-parser");
 const cors= require("cors");
 const {cloudinaryconnect} = require("./config/cloudinary");
 const fileupload = require("express-fileupload");

//  middleware
app.use(cookieparser());
app.use(
    cors({
      origin: 'https://edtechperception.vercel.app', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'], 
      credentials: true, 
    }) );
  
app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:"/temp"
    })
);

// connection to cloudinary
cloudinaryconnect(); 

// mapping and mount of routes
const userroutes=require("./routes/users");
// const paymentsroutes=require("./routes/payments");
const profileroutes=require("./routes/profile");
const coursesroutes=require("./routes/courses");
 
app.use("/api/v1/auth",userroutes);
// app.use("/api/v1/payments",paymentsroutes);
app.use("/api/v1/profile",profileroutes);
app.use("/api/v1/courses",coursesroutes);


// server listening
app.listen(port,( )=>{
     console.log(`the server start at port no ${port}`)
});

app.get("/",(req,res)=>{
     return res.json({
        success:true,
        message:"our server is up and running",
     })
})
