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
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], 
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, 
    }) );

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Origin', 'https://edtechperception.vercel.app');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.sendStatus(204); // No content for preflight
      });
    app.use((req, res, next) => {
        console.log("kua huwa tera wada");
        console.log(`${req.method} request for ${req.url}`);
        next();
      });
app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:path.join(__dirname, 'uploads/temp'),
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
