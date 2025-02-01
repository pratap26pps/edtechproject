const ratrev = require("../models/ratrev");
const course = require("../models/course");
const { default: mongoose } = require("mongoose");
const { aggregate } = require("../models/user");


// creatng rating
exports.creatingrating = async (res,req)=>{
    try{
        // get user id
        const userid = req.user.id;
        const {rating ,review , courseid} = req.body;
        // check if  user is enrlled or not
        const coursedetails = await course.findOne(
                                               {_id:courseid,
                                                studentenrolled:{$elemMatch:{$eq:userid}}
                                               })
      if(!coursedetails){
        return res.status().json({
            success:false,
            message:"student is not enrolled,coursedetails not found "
        })
      };
        //check if  user is reviewed or not 
       const alreadreviewed = await ratrev.find({
                              user:userid,
                              course:courseid,
                            });

      if(alreadreviewed){
        return res.status(200).json({
            success :false,
            message:"course is already reviewed",
        });
    }
        //  creating rating and review
   const ratingreview =  await ratrev.create({
                             rating,review,course:courseid,user:userid
   });
        // update this course with rating and review
   const updatedcoursedetails = await course.findByIdAndUpdate({_id:courseid},
                                 {
                                    $push:
                                    {
                                        ratingreview:ratingreview._id,
                                    } 
                                 },
                                {new:true});
   console.log(updatedcoursedetails);
        return res.status().json({
            success:true,
            message:"meassage of retrev successfully",
            ratingreview,
        })
    }
    catch(error){
        console.log(error)
      return  res.status(401).json(
          {
           success:"false",
            message:error.message,  
          })
    }
}
// get average rating
exports.getaveragerating = async (res,req)=>{
    try{
        // get course id
        const course = req.body.courseid;
        // calculate average rating
        const result = await ratingreview.aggregate([{
            $match:{
                course:new mongoose.Types.ObjectId(courseid),
            },
        },
        {
            $group:{
                _id:null,
                averagerating:{$avg:"$rating"},
            }
        }]);
        //return rating
      if(result.length>0){
        return res.status(200).json({
            success:true,
           averagerating:result[0].averagerating,
          })
      }
    //   if no avg rating exixts

    return res.status(200).json({
        success:true,
        message:"average rating is zero",
        averagerating:0,
      })
    }catch(error){
        console.log(error);
      return res.status(401).json({
        success:false,
        message:error.message,
      })
    }
}
// get all rating
exports.getallrating = async (res,req)=>{
    try{
        const allreview = await ratrev.find({})
                          .sort({rating:"desc"})
                          .populate({
                            path:"user",
                            select:"firstname lastname email image",
                          })
                          .populate({
                            path:"course",
                            select:"coursename",
                          })
                          .exec();
                          return res.status(200).json({
                            success:true,
                            message:"all review fetched successfully",
                            data:allreview,
                          });     
      
    }catch(error){
        console.log(error);
      return res.status(401).json({
        success:false,
        message:error.message,
      })
    }
}




