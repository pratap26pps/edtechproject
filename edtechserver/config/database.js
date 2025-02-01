const mongoose=require("mongoose")

require("dotenv").config();

exports.dbconnect=()=>{
    mongoose.connect(process.env.PROJECT_URL)
    .then(()=>{console.log("db connect successfully")})
    .catch((error)=>{
        console.error(error);
        console.log("db connection failed")
        process.exist(1);    
    })
}