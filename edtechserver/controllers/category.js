const Category= require("../models/category");
const mongoose = require('mongoose');

// tagski api creatration handler function

exports.cratecategory= async (req,res)=>{
   try{
    // get data from course
    const {name,description} = req.body;
    // validation
    if(!name || !description){
        return   res.status(401).json({
            success:false,
            message:"all fields are required"
           })
    }
    // entry create in db 
    const tagdetails = await Category.create({
        name:name,
        description:description,
    });
    console.log("tagdetails",tagdetails);
    // res return
    return   res.status(200).json({
        success:true,
 
        message:"categories createed successfully",
         tagdetails,
       })
      
   }
   catch(error){
    return   res.status(401).json({
        success:false,
        message: error.message
       })
   }
}

// get all category
exports.showallcategory = async(req,res)=>{
    try{
        const getallcategory = await Category.find({},{name:1,description:1});
        return   res.status(200).json({
            success:true,
            message:"all category return successfully",
            getallcategory,
           })

    }catch(error){
        return   res.status(401).json({
            success:false,
            message:error.message
           })
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// category pagedetails handlers
exports.pagedetails = async (req,res)=>{
    try{
        //  get category id
        const {categoryid}=req.body;

        if (!categoryid || !mongoose.Types.ObjectId.isValid(categoryid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing category ID.",
            });
        }
        // get courses for the specified categoryid
        const selectedcategory = await Category.findById(categoryid)
                                               .populate({path:"course"})
                                               .exec();
        // validation
        if(!selectedcategory){
            return res.status(404).json({
                success:false,
                message:"selected category is not present here"
            })    
        }
        // get courses for the different categoryid
        const categoryexceptselected = await Category.find({
            _id:{$ne:categoryid},
        })
        let differentcategory = null;
        if (categoryexceptselected.length > 0) {
            const randomIndex = Math.floor(Math.random() * categoryexceptselected.length);
            differentcategory = await Category.findById(categoryexceptselected[randomIndex]._id)
                .populate({
                    path: "course",
                    populate: { path: "instructor" },
                })
                .exec();
        }

        // Get all categories with their courses and instructors
        const allcategories = await Category.find()
            .populate({
                path: "course",
                populate: { path: "instructor" },
            })
            .exec();

        // Get top-selling courses
        const allcourses = allcategories.flatMap((category) => category.course);
        const mostsellingcourse = allcourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        // return response
        return res.status(200).json({
            success:true,
            message:"category pagedetails successfully",
            selectedcategory,
            differentcategory ,
            mostsellingcourse,
        });
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}


exports.addCourseToCategory = async (req, res) => {
    try {
        const { categoryid, courseid } = req.body;

        // Validate input
        if (!categoryid || !mongoose.Types.ObjectId.isValid(categoryid)) {
            return res.status(400).json({ success: false, message: "Invalid category ID." });
        }
        if (!courseid || !mongoose.Types.ObjectId.isValid(courseid)) {
            return res.status(400).json({ success: false, message: "Invalid course ID." });
        }

        // Add the course to the category
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryid,
            { $push: { course: courseid } },
            { new: true }
        )
            .populate({ path: "course" })
            .exec();

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Course added to category successfully.",
            updatedCategory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
