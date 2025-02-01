const mongoose=require("mongoose")
const profileschemma=new mongoose.Schema({
    gender:{
        type:String,
     
        trim:true
    },
    dob:{
        type:String,
        
        trim:true
    },
    about:{
        type:String,
        
        trim:true
    },
    phoneNo:{
        type:Number,
        trim:true
    },
   
})
module.exports=mongoose.model("Profile",profileschemma);