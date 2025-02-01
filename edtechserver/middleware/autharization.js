const jwt=require("jsonwebtoken");
 
 

// isauth
exports.auth = async (req,res,next)=>{
    try{
        // extract token
     const token = req.cookies.token|| req.body.token || req.header("Autharisation")?.replace("Bearer ", "");
    //   if token is missing
    console.log("Token from headers:", req.header("Autharisation"));
    console.log("Token from cookies:", req.cookies.token);
     console.log("Token from body:", req.body.token);
    if(!token){
        return res.status(401).json({
            success:false,
            message :"token is  missing",
        })
    };
    // very the token
    try{
       const decode = jwt.verify(token,process.env.JWT_SECRET);
       console.log("decode",decode);
       req.loginuser =  decode;
       console.log("decode",decode);

    }catch(error){
        console.error("Token verification error:", error.message);
        return   res.status(401).json({
            success:false,
            message:"token is invalid"
           })
         
    } 
     next();

    }catch(error){
        return   res.status(500).json({
            success:false,
            message:"something went wrong during token validation"
           })
    }
}

// isstudent
exports.isstudent = async (req,res,next)=>{
    try{
       if(req.loginuser.accounttype  !== "student"){
        return   res.status(401).json({
            success:false,
            message:"user accounttype is not valid "
           })  
       }
        next();
    }catch(error){
        return   res.status(401).json({
            success:false,
            message:"user role cannot verified "
           })
    }
}

// isinstructor
exports.isinstructor = async (req,res,next)=>{
    try{
       if(req.loginuser.accounttype  !== "instructor"){
        return   res.status(401).json({
            success:false,
            message:"user accounttype is not valid "
           })  
       }
        next();
    }catch(error){
        return   res.status(401).json({
            success:false,
            message:"user role cannot verified "
           })
    }
}

// isadmin
exports.isadmin  = async (req,res,next)=>{
    try{
       if(req.loginuser.accounttype  !== "admin"){
        return   res.status(401).json({
            success:false,
            message:"user accounttype is not valid "
           })  
       }
        next();
    }catch(error){
        return   res.status(401).json({
            success:false,
            message:"user role cannot verified "
           })
    }
}



