const Subsection = require("../models/subSection");
const Section = require("../models/section");
const {imageuploadcloudanary} = require("../utiles/imageuloader");
const subSection = require("../models/subSection");
require("dotenv").config();
// subsection handler function

exports.subsectioncreation = async (req,res) =>{
    try{
        // fetch data 
        const {sectionid,title,
            timeduration,
            description} = req.body;
    //   extract file
       const video = req.files.video;
       console.log("video",video);
        // validate
        if(!sectionid || !title ||
             !timeduration ||
              !description ||
              !video
            ){
            return res.status(400).json({
                success:false,
                message:" subsection fields are required",
                error : error.message,
             })    
        }
        //  upload video to cloudanary
        const uploaddetails = await imageuploadcloudanary(video,"pankajphoto");
         console.log("uploaddetails",uploaddetails);
        // create a subsectin
        const subsectiondetails = await Subsection.create({
              title,
             timeduration,
            description,
            videoUrl:uploaddetails.secure_url,
        })
        //  update suction with the sub section object id
     const updatesection = await Section.findByIdAndUpdate({_id:sectionid},
                                                            {
                                                                $push:{
                                                                subSection:subsectiondetails._id
                                                                }
                                                            },
                                                            {new:true}
                                                            ).populate("subSection")
    //    HW:log update suction update here, after populate querry,
        // res return
        return res.status(200).json({
            success:true,
            message:" subsection creation successfully",
            updatesection,
            
         }) 

    }catch(error){
        return res.status(400).json({
            success:false,
            message:" subsection failed ,internal error",
            error : error.message,
         }) 

    }
}

// hw:upadate subsection 
exports.subsectionupdate = async (req,res) =>{
    try{
        // fetch data
       const {sectionid,title,description}= req.body;
          const subsection= await Subsection.findById(sectionid);       
    //    validation
    if(!subsection){
        return res.status(400).json({
            success:false,
            message: "sectionid and description title are required"
           })
    }
    if(title !== undefined){
           subsection.title = title
    }
    if(description !== undefined){
        subsection.description = description
  } 
  if(req.files.video !== undefined){
     const video=req.files.video
     const uploaddetails = await imageuploadcloudanary(video,"pankajphoto")
     subsection.videoUrl= uploaddetails.secure_url
     subsection.timeDuration = `${uploaddetails.timeDuration}`
}
await subsection.save();

return res.json({
    success:true,
    message:"subsection updation  successfully"
   })

    }catch(error){
           return res.status(400).json({
            success:false,
            message:"subsection updation failed ,internal error"
           })
    }
}

// hw: delete subsection 
exports.subsectiondelete = async (req,res) =>{
    try{
        // fetch data
       const {sectionid,Subsectionid}= req.body;
       await Section.findByIdAndUpdate(
        {_id:sectionid},
        {
            $pull:{
                subsection:Subsectionid,
            }
        }
       )
       const subsection = await subSection.findByIdAndDelete({_id:Subsectionid});
       if(!subsection){
        return res.status(404).json({
            success:false,
            message:"subsection not found"
           })
       }
       return  res.json({
        success:false,
        message:"subsection deletion  successfully"
       })

    }catch(error){
           return res.status(500).json({
            success:false,
            message:"subsection deletion failed ,internal error"
           })
    }
}