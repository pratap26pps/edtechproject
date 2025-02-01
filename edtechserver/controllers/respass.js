const mailsend = require("../utiles/mailSender");
const User =require("../models/user");
const bcrypt =require("bcrypt");
const crypto = require("crypto");
// resetpasstoken
exports.resetpasstoken = async (req,res)=>{
    try{
    //    req body me se fetch email
    const email = req.body.email;
    console.log("email",email);
    // check email for this user
    const user = await User.findOne({email:email});
    console.log("email user",user);

    if(!user){
        return   res.status(401).json({
            success:false,
            message:"your email is not generated with us "
           })
    }
    // generate token 
    const token = crypto.randomUUID();
    console.log("token",token);
    // update user by adding token and expire time
    const userdetails = await User.findOneAndUpdate({email:email},
        {
          token:token,
          passwordExpireIn:Date.now() + 5*60*1000,
        },
        {new:true} 
    )
    // create url
     const url =`http://localhost:5173/profile/resetpassword/${token}`
    // send mail to containing url
  await mailsend(email ,"password reset link",`password reset link:${url}`)
    // return response
    return   res.status(200).json({
        success:true,
        message:" email sent successfully, please check email and change password",
        userdetails:userdetails,
       })
   
    }
    catch(error){
                return   res.status(500).json({
                    success:false,
                    message:"reset password failed"
                   })
            } 
}
// resetpassword
exports.resetpassword =  async (req,res)=>{
    try{
    //  get data from req body
    const {password,confirmpassword,token}= req.body
    // validations
    if (password!==confirmpassword){
        return   res.status(401).json({
            success:false,
            message:"password not matching"
           })
    }
    // get userdatails fro db using token
    const userdatails= await User.findOne({token:token});
    // if no entry  means invalid token hai 
    if(!userdatails){
        return   res.status(401).json({
            success:false,
            message:"token is invalid "
           })
    }
    // ckek token time expiration
  if(userdatails.resetpassword < Date.now()){
    return   res.status(401).json({
        success:false,
        message:"token is expired ,please regenerated it "
       })
  }

    // hash password
    const hashpassword=  await bcrypt.hash(password,10);

    // password update
    await User.findOneAndUpdate(
        {token:token},
        {password:hashpassword},
        {new:true}
    )
    // res return
    return   res.status(200).json({
        success:true,
        message:"password reset successfull"
       })
    }catch(error){
        console.log("resetpassword failed internal problem",error.message);
        return   res.status(401).json({
            success:false,
            message:"something went wrong during password generator "
           })
    }
}



