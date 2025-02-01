
const Section=require("../models/section");
const Course = require("../models/course");
const { toast } = require("react-toastify");

// create sections handler function

exports.createsection = async (req,res) =>{
    try{
        // fetch data 
        const {sectionName,courseid} = req.body;
        //   validation
        if(!sectionName || !courseid){
            return res.status(400).json({
                success:false,
                message:"sectionname and its id are empty"
             })  
        }
        // section creation
        const newsection= await Section.create({sectionName})   
        // update course with section id
       const courseupdatedetails = await Course.findByIdAndUpdate(
                                                          courseid, 
                                                          {
                                                            $push:{
                                                                coursecontent:newsection._id
                                                            }
                                                          },
                                                        {new:true})
                                                        .populate("coursecontent");
            // HW:usepopulate to replace subsection/section both in courseupdatedetails
        // res return
        return res.status(200).json({
            success:true,
            message:"section creation successfully",
            courseupdatedetails
         })
    }
    catch(error){
         toast.error(error.response?.data?.message || "Failed to create section")
         return res.status(500).json({
            success:false,
            message:error.message
           
         })
    }
}

// updatesection
exports.updatesection = async (req,res) =>{
    try{
        // fetch data  input
        const {sectionName,sectionid} = req.body;
        //   validation
        if(!sectionName || !sectionid){
            return res.status(400).json({
                success:false,
                message:"sectionname and its id are empty"
             })  
        }
        // update 
        const sectiondata= await Section.findByIdAndUpdate(sectionid,{sectionName},{new:true})
        // res return 
        return res.status(200).json({
            success:true,
            message:"update section successfully",
            sectiondata,
         }) 


    }catch(error){
        toast.error(error.response?.data?.message || "Failed to update section");
        return res.status(400).json({
            success:false,
            message:"update section failed ,internal error",
            error : error.message,
         }) 
    }
}

// delete section 
exports.deletesection = async (req,res) =>{
    try{
        // fetch data  input
        const {section_id} = req.body;
        //   validation
        if(  !section_id){
            return res.status(400).json({
                success:false,
                message:"section  id are empty"
             })  
        }
        // delete section
       await Section.findByIdAndDelete(section_id)
    //  todo [testing] :do we need to delete the entry from course schema??
        // res return 
        return res.status(400).json({
            success:true,
            message:" section delete successfully"
         }) 


    }catch(error){
        return res.status(400).json({
            success:false,
            message:"delete section failed ,internal error",
            error : error.message,
         }) 
    }
}