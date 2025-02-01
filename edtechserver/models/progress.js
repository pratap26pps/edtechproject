const mongoose=require("mongoose")
const progressschemma=new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    },
    completeVideo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"subSection",
    }],
    
   
})
module.exports=mongoose.model("Progress",progressschemma);