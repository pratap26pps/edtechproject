const Profile = require("../models/profile");
const User= require ("../models/user");


// update profile handler function 
exports.updateprofile = async (req,res)=>{
    try{
        // fetch data 
        const {phoneNo,gender,dob= "",about= ""} = req.body;
        // fetch id 
        const id = req.loginuser.id
        console.log("id",id);
        // validaton
        if(!about || !phoneNo || !gender ||!dob){
            return res.status(400).json({
                success:false,
                message:" profile fields are required",
             });
        }
        // find profile
        const userdetails= await User.findById(id).populate('additionalType');
        console.log("userdetails",userdetails);
        const profileid = userdetails.additionalType
        console.log("profileid",profileid);

        const profiledetails= await Profile.findById(profileid);

        if (!profiledetails) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        // updateprofile
        profiledetails.dob=dob;
        profiledetails.about=about;
        profiledetails.gender=gender;
        profiledetails.phoneNo=phoneNo;
        await profiledetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"updateprofile successfully",
            profiledetails,
         })

    }catch(error){
     return res.status(400).json({
        success:false,
        message:"udatation profile error, internal error",
     })
    }
}

// delete account
// hw:how can we schedule this deletion operation , search chrone job
exports.deleteaccount = async (req,res) =>{
    try{

        
            // Check if req.loginuser is populated correctly
            if (!req.loginuser) {
              return res.status(400).json({
                success: false,
                message: "User is not authenticated",
              });
            }
    //   fetch data
    
    const id = req.loginuser?.id;
    console.log("id",id);
    //   validation
    const userdatails = await User.findById(id);
    if(!userdatails){
        return res.status(400).json({
            success:false,
            message:" userdeatails are missing",
        })
    }
    // delete profile
    await Profile.findByIdAndDelete({_id:userdatails.additionalType});
    // delete user
    await User.findByIdAndDelete({_id:id});

    // todo hw:unenrolled users from all enrolled courses
    // res request
    return res.status(400).json({
        success:false,
        message:"account delete successfully",
    })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"account not delete , internal error",
            error:error.message,
        })
    }
}

// get allusersdetails
exports.getalluserdetails=async (req,res)=>{
    try{
          //   fetch data
    const id = req.loginuser.id;
      //   validation
      const userdatails = await User.findById(id).populate("additionalType").exec();
      console.log("userdetails",userdatails);
      return res.status(400).json({
        success:true,
        message:"getalluserdetails fetch successfully ",
         userdatails, 
    })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"getalluserdetails not fetch , internal error",
            error:error.message,
        })
    }
}

// updatedisplay profile picture


// get enrolled courses
exports.getenrolledcourses = async (req,res)=>{
   try{
    const userid= req.loginuser._id;
    console.log("userid",userid);
    const userdetails = await User.findOne({
        _id:userid,
    })
    .populate("courses")
    .exec();
   if(!userdetails){
    return res.status(400).json({
        success:false,
        message:`could not find the user details`
    })
   }
   return res.status(200).json({
    success:true,
    data:userdetails.courses,
    message:`user details fetch successfully ${userdetails}`
})

   }catch(error){
        return res.status(401).json({
            success:false,
            message:error.message
        })
   }
}



