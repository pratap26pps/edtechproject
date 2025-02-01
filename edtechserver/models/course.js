const mongoose=require("mongoose")
const courseschemma=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,     
    },
   whatwillLearn:{
        type:String,
        required:true
    },
    coursecontent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"        
    }],
   ratingreview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ratrev"    
    }],
    price:{
        type: Number,
     
    },
    thumbnail:{
        type:String,
         required:true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category",
    },
    tags: {
        type: [String],
        required:true,
        
    },
    studentenrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    instructions:{
        type:[String],
        required:true,
    },
    status:{
        type:String,
        enum:["draft","published"],
    },
});
module.exports=mongoose.model("Course",courseschemma);