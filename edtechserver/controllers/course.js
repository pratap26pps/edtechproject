
const Category = require("../models/category");
const User= require("../models/user")
const Course = require("../models/course");
const {imageuploadcloudanary}= require("../utiles/imageuloader");
const { toast } = require("react-toastify");
 

// ye apke instructor sahab manage karenge
 
 // createcourse handler function
exports.createcourse =async (req,res) =>{
    try{
       
        const {coursename,coursedetailse,whatyouwilllearn,price,category}= req.body;
        // get thumbnail
           console.log("req.files:", req.files);
        if (!req.files || !req.files.courseimage) {
            return res.status(400).json({
              success: false,
              message: "No image uploaded.",
            });
          }

        const courseimage=req.files.courseimage;
        console.log("thumbnail",courseimage);
     if (!coursename ||!coursedetailse ||!whatyouwilllearn ||!price ||!category || !courseimage){
        return   res.status(401).json({
            success:false,
            message: "all fields are required"
           }) 
     }
    //  check for instructor
    const userid= req.loginuser.id;
    const instructorsdetails= await User.findById(userid)
    console.log(instructorsdetails);
   if(!instructorsdetails){
    return   res.status(401).json({
        success:false,
        message: "instructors deatails not found ",
       });
   }
     

//   check the given tag is valid or not
   const categorydeatials =await Category.findById(category);
   if(!categorydeatials){
    return   res.status(401).json({
        success:false,
        message: "category details not found ",
       });
   }

//    upload image top cloudanary
  const thumbnailimage=  await imageuploadcloudanary(courseimage,"pankajphoto");
   console.log("thumbnailimg",thumbnailimage);
//   create an entry for new course

const name = coursename;              // Assuming schema expects 'name'
const description = coursedetailse;   // Assuming schema expects 'description'
const whatwillLearn = whatyouwilllearn;
 
const newcourse = await Course.create({
    name,
    description,
    instructor: instructorsdetails._id,
    whatwillLearn,
    price,
    thumbnail: thumbnailimage.secure_url,
    category: categorydeatials._id
});
console.log("New Course:", newcourse);

 

// add the new course to the user schema of instructor
await User.findByIdAndUpdate(
    {_id:instructorsdetails._id},
    {
        $push:{
            courses:newcourse._id,
        }
    },
    {new:true},
);
// update the tag of schema

return   res.status(201).json({
    success:true,
    message:"course created successfully",
    data:newcourse,
   })

    }catch(error){
        return   res.status(500).json({
            success:false,
            message:error.message
           })
    }
}

// editcoursehandler

exports.editcreatecourse = async (req,res) =>{
   
        try {
          const { courseid } = req.body;
          const updatedData = req.body;
      
          // Find the course by ID and update it
          const course = await Course.findByIdAndUpdate(courseid, updatedData, { new: true });
      
          if (!course) {
            return res.status(404).json({ success: false,  message: 'Course not found' });
            toast.error("Course not found to update")
          }
      
          res.status(200).json({ success: true, data: course });
        } catch (error) {
          console.error("Error updating course:", error);
          res.status(500).json({ success: false, message: 'Server error' });
        }
}

// getallcourse handler function
exports.showallcourse = async (req, res) => {
   try{
    //  const userid= req.loginuser;
    //     console.log("userid",userid);
          const getallcourse = await Course.find({},
            {name:1,description:1,instructor:1
            ,coursecontent:1, price:1,whatwillLearn:1,  thumbnail:1,status:1
          }).populate({
      path: "coursecontent",
      populate: {
        path: "subSection",
       
      } 
    });
          return   res.status(200).json({
              success:true,
              message:"all category return successfully",
              getallcourse,
             })
  
      }catch(error){
          return   res.status(401).json({
              success:false,
              message:error.message
             })
      }
  };
  

// showcoursedetails
exports.showcoursedetails = async (req,res) =>{
   try{
    // get id
    const {courseid} = req.body;
    console.log("courseid in backend",courseid);
    //find course details
    const coursedetails = await Course.find(
        {_id:courseid})
        .populate({
            path:"instructor",
            model: "User", 
            populate:{
                path:"additionalType", 
                path:"Image",
            }    
        })
        .populate( {
            path:"category",
            model:"Category",
        })
        // .populate("ratingreview")
        .populate({
            path:"coursecontent",
            model: "Section",
            populate:{
                path:"subSection",
                 model: "Subsection",
               
            },
        })
        .exec();
    console.log("coursedatails",coursedetails);
        // validation
        if(!coursedetails){
            return   res.status(400).json({
                success:false,
                message: ` could not find with ${courseid}` ,
               }) 
        }

        return   res.status(200).json({
            success:true,
            message: "course details fetched successfully",
            data:coursedetails,
           })

   }catch(error){
      console.log(error);
    return   res.status(500).json({
      
        success:false,
        message: error.message,
       });
   }
}

