const mongoose=require("mongoose")
const ratrevschemma=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    review:{
        type:String,  
        required:true,
    },
    retting:{
        type:String,  
        required:true,
    },  
})
module.exports=mongoose.model("Ratrev",ratrevschemma);