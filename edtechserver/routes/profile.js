const express = require("express");
const routes=express.Router();

const {auth}= require("../middleware/Authorization");
const {updateprofile,deleteaccount,getalluserdetails,getenrolledcourses}=require("../controllers/profile");
const {resetpasstoken,resetpassword} = require("../controllers/respass")

routes.delete("/deleteaccount",auth,deleteaccount);
routes.put("/updateprofile",auth,updateprofile);
routes.get("/getalluserdetails",auth,getalluserdetails);

routes.post("/resetpasstoken",resetpasstoken);
routes.post("/resetpassword",resetpassword);


routes.get("/getenrolledcourses",auth,getenrolledcourses);
// routes.put("/updatedisplaypicture",auth,updatedisplaypicture);

module.exports=routes;