const User = require("../models/user");
 
const OTP=require("../models/otp")
const otpgenerator=require("otp-generator")
const bcrypt=require("bcrypt");
const profile = require("../models/profile");
const jwt =require("jsonwebtoken")
const {passwordupdated} = require("../mail/templete/passwordupdate")
const mailsender =require("../utiles/mailSender");
const { toast } = require("react-toastify");
require("dotenv").config();


// otphandler
exports.sendotp= async (req,res)=>{
     
    try{
     const {email}=req.body;
     
    //  check user exits or not
    const usercheck =  await User.findOne({email});
    if(usercheck){
        return res.status(500).json({
            success:false,
            message:"user already exists",
        })
    } 
    // otp generate
    let otp=  otpgenerator.generate(4,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
    // console.log("otp generated",otp);

    //check unique otp or not
    let response=await OTP.findOne({otp:otp  });
    console.log(response)
   while(response){
    otp=  otpgenerator.generate(4,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
      response=await OTP.findOne({otp:otp});
   }
    // create email object
    const otppayload={email,otp};
    //  create an entry otp to database
     
    const otpbody= await OTP.create(otppayload);
    console.log("otpbody",otpbody);

    return   res.status(200).json({
        status:"true",
        message:"otp sent successfully",
        otp,
    })
    }
    catch(error){
        console.log(error);
        return    res.status(400).json({
           success:false,
           message: error.message,
        })

    }
}
// signup handler
exports.signupuser=async(req,res)=>{
    try{
          // data fetch
    const {firstname,lastname,password,otp,accounttype,confirmpassword, email}= req.body;
    //  validate kar lo
    console.log("firstname,lastname,otp",otp,firstname,lastname);
    if(!firstname || !lastname || !password || !otp ||!confirmpassword || !email){
   return  res.status(203).json({
        success:false,
        message:"all fields are require"
    })
    }
    // 2 password match karlo
 
    if( password !== confirmpassword  ){
      return   res.status(400).json({
            success:false,
            message:" please enter correct password"
        })
        }
    // user exists or not
    const existinguser=await User.findOne({email});
    if(existinguser){
      return   res.status(400).json({
            success:false,
            message:"user already register"
        })
    };
    // find most recent otp store for user
   const recentotp= await OTP.find({email}).sort({createdAt:-1}).limit(1);
   console.log("recentotp",recentotp);

    // validate otp means verify
    if(recentotp.length == 0){ 
        return   res.status(200).json({
            success:false,
            message:" otp not found "  
        })
    }
    else if(otp !==recentotp[0].otp){
     return   res.status(200).json({
            success:false,
            message:"  otp do not match "  
        })
    }

    // hasing   
    const hashpassword= await bcrypt.hash(password, 10);
    // entry create in db
   console.log("hashpassword",hashpassword);
     const profiledetailes=await profile.create({
        gender:null,
        dob:"",
        about:"hello",
        phoneno:null,
     })
     console.log("Created Profile ID: ", profiledetailes);

   const userperson=await User.create({
    firstname,lastname,password:hashpassword,  confirmpassword: hashpassword,
    email,accounttype,additionalType:profiledetailes._id,
    Image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
    })
 
    return res.status(200).json({
        success:true,
        message:" user register successfully",
        user:userperson,
    }) 
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"user cannot be register ,please try again"
        })
    }    
}
//login handler
exports.login= async (req,res)=>{
    try{
     
        // fetch data from request ki body me se
        const {email,password}= req.body;

        // validate kar lo
       if(!email || !password){
          return res.status(200).json({
            success:false,
          message:"all fields are required ,pleasetry again"
          })
       }
    //    check user exists or not 
    const loginuser=await User.findOne({email});
    console.log("loginuser",loginuser);
    if(!loginuser){
        toast.warning("user is not registered ,please signup first")
        return res.status(200).json({
            success:false,
          message:" user is not registered ,please signup first"
          })
    };
     
    //    generate jwt ,password match
    if (await bcrypt.compare(password, loginuser.password)){
        const payload={
            email:loginuser.email,
            id:loginuser._id,
            accounttype:loginuser.accounttype,
        }
        console.log("payload".payload);
        const token= jwt.sign(payload , process.env.JWT_SECRET,{
            expiresIn:"2h"
        });
        loginuser.token =token;
        loginuser.password = undefined;
       // create cookie
       const option={
        expires:new Date(Date.now() + 3*24*60*60*1000 ),
        httpOnly:true,
       }
       res.cookie("token",token,option).status(200).json({
            success:true,
            token,loginuser,
            message:"logged in successfully",
       })
    } else{
        
    return   res.status(401).json({
        success:"false",
        message:" password is incorrect",
    })
    }
    }
    catch(error){
        console.log(error);
        return    res.status(400).json({
           success:false,
           message: "login failed ,please try again",
        })

    }
}
// changepassword
exports.changepassword =async (res,req)=>{
    // get data fetch from request ki body 
    //get old pass , new pass , confirm new pass

    // validate 
    // store pass to db 
    // send to mail-pass update
    // res return
}






