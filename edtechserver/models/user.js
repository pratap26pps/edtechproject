const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String, 
        required:true
    },
    confirmpassword:{
        type:String, 
        required:true
    },
    accounttype:{
        type:String,
        required:true,
        enum:["admin","student","instructor"]
    },
    additionalType:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
   
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    }],
    Image:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    resetpasswordexpires:{
        type :Date,
    },
    courseProgress: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Progress", 
    }]

    

})
module.exports=mongoose.model("User",userschema);
