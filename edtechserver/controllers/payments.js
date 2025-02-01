const {instance} = require("../config/razorpay");
const User = require("../models/user");
const mailsender = require("../utiles/mailSender");
const Course = require("../models/course");
const coursenrollementemail= require("../mail/templete/coursenrollementemail");
const { default: mongoose } = require("mongoose");

 // capture the payment and initiate the razorpay  order

exports.capturepayments =async (req,res) =>{
        try{
          const {courses} = req.body;
          const userid =req.userlogin.id;

          if(courses.length === 0){
            throw new Error("please provide course id")
          }
          let totalamount = 0;
              
         for(const course_id of courses){
            let  course;
            try{
               course = await Course.find(course_id);

               if(!course){
               return  res.json({ success:false , message :"could not found any course"})
               }

               const uid = new mongoose.Types.ObjectId(userid);
               if(course.studentsEnrolled.includes(uid)){
                    return res.json({ success:false, message:"student is already enrolled"})
               }
               totalamount += course.price;
            }
            catch(e){
               console.log(e);
               return res.status(500).json({ success:false, message:error.message})

            }
        
         }

        const option = {
            amount : totalamount *100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString(),
        }


    //  create order
   try{
      const paymentresponse = await instance.orders.create(option);
       res.status(500).json({ success:true, message:paymentresponse})

   }catch(e){
    console.log(e)
   }

        }catch(error){
            console.log("error in system")
        }
}

//payments verification
exports.verifysignature = async (res,req) =>{
   
     const razorpay_order_id = req.body?.razorpay_order_id
     const razorpay_payment_id = req.body?.razorpay_payment_id
     const razorpay_signature = req.body?.razorpay_signture
     const courses = req.body?.courses
     const userid = req.userlogin?.id

    if(! razorpay_order_id || !razorpay_payment_id || !razorpay_signature
      || !courses   || !userid 
    ){
     return   res.status(200).json({ success:false ,message:"payment failed"  })
    }
    
    const body = razorpay_order_id  +"|"+ razorpay_payment_id;
    const expectedsignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hexa")


 if(expectedsignature === razorpay_signature ){
    console.log("payment is autharized");
    // enrolled karwaoo student kooo
      await enrollstudent(courses,userid,res)
    return   res.status(200).json({ success:true ,message:"payment verified"  })
     
 }
 else{
    return res.status(400).json({
        success:false,
        message:" signature not match, invallid",
                     }) 
 }
}

const enrollstudent =async(courses,userid,res)=>{
   if(!courses || !userid){
      return res.status(200).json({success:true, message:"please provide the course and userid"})
   }
   try{
      for(const courseid of courses){
         const enrolledcourse = await Course.findByIdAndUpdate({_id:courseid},
             {$push:{studentsEnrolled:userid}},{new:true})
     
             if(!enrolledcourse){
           return res.status(200).json({success:false, message:"course not found"})
     
             }
     
           //   find the student and add the course to the inrolled courses
           const enrolledstudent = await User.findByIdAndUpdate(userid,
              {$push:{courses:courseid}},{new:true}
           )
     
           // student ko mail send karo 
           const emailsender = await mailsender(
              enrolledstudent.email,
              `successfully enrolled into ${enrolledcourse.courseName}`,
              coursenrollementemail(enrolledcourse.courseName , `${enrolledstudent.firstname}`)
           )
           console.log("email sent successfully",emailsender.response)
        } 
   }catch(error){
       return res.status(500).json({
         success:false,
         message:error.message,
       }) 
   }
  
}




// these are used only for single order payments

 // capture the payment and initiate the razorpay  order
// exports.capturepayments = async (res,req)=>{
    
//     //    fetch user and course id
//     const {course_id} = req.body;
//      const userid= req.loginuser.id;
//     // validations
//     if(!course_id){
//         return res.status(400).json({
//             success:false,
//             message:" course id not found",
//          })
//     };
//     // valide coursedetails
//     let courses;
//     try{
//       courses = await  Course.findById(course_id);
//       if(!courses){
//         return res.status(400).json({
//             success:false,
//             message:" could not find courses",
//          }) 
//       };
//           // user already pay for the same course
//          const uid = new mongoose.Types.ObjectId(userid);
//          if (courses.studentenrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:" student is already enrolled",
//              }) 
//          }

//     }catch(error){
//         console.error(error)
//         return res.status(400).json({
//             success:false,
//             message:error.message,
//          }) 
//     }

//     // order create
//     const amount = Course.price;
//     const currency = "INR";
//     const options ={
//         amount :amount *100 ,
//         currency,
//         receiptNo:Math.random(Date.now()).toString(),
//         notes:{
//             courseid:course_id,
//             userid,
//         }
//     }
//     // function call
//     try{
//     //    initiate the payment using razorpay
//     const paymentresponse = await instance.orders.create(options);
//     console.log("paymentresponse:",paymentresponse);
//      return res.status(200).json({
//             success:true,
//             courseName:courseName,
//             thumbnails,
//             orderid,
//             currency,
//             amount,
//          })
//     }catch(error){
//         console.log(error)
//         return res.status(400).json({
//             success:false,
//             message:"could not initiate the order ",
//          })
//     }

    
// }

// verify signature of razorpay and server

// exports.verifysignature = async (res,req) =>{
//     const webhooksecret = "12345678";

//     const razorpaysignaturesecret = req.header["x-razorpay-signature"];

//  const shaSum =    crypto.createHmac("sha256",webhooksecret);
//  shaSum.update(JSON.stringify(req.body));
//  const digest = shaSum.digest("hexa");


//  if(razorpaysignaturesecret === shaSum ){
//     console.log("payment is autharized");

//     const {courseid , userid} = req.body.payload.payment.entity.notes;
//     try{
//         // fullfills the action 
//         //  find the course and enrollled the student in it
//         const enrolledcourse = await Course.findOneAndUpdate(
//             {_id:courseid},
//             {$push:{studentenrolled:userid}},
//             {new:true},
//         )
//         if(!enrolledcourse){
//             return res.status(400).json({
//                 success:false,
//                 message:"enrolledcourse not found ",
//              })
//         }
//         console.log("enrolledcourse:",enrolledcourse);

//         // find the student and  add to the course to thir list enrolled course me 
//          const enrolledstudent = User.findOneAndUpdate(
//             {_id:userid},
//             {$push:{courses:courseid}},
//             {new:true},
//          )
//          console.log("enrolledstudent",enrolledstudent);

//         //  mail send kardo confirmation wala
//         const emailresonse = await mailsender(
//             enrolledstudent.email,
//             "congratulations, you are on boarded into new courses "
//         )
//         console.log("emailresonse ",emailresonse );
//         return res.status(400).json({
//             success:true,
//             message:"signature verified and added to new courses successfully ",
//          }) 
//     }catch(error){
//         return res.status(400).json({
//             success:false,
//             message:error.message,
//          })  
//     }
//  }
//  else{
//     return res.status(400).json({
//         success:false,
//         message:" signature not match, invallid",
//                      }) 
//  }
// }
