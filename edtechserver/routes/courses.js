 const express= require('express');
 const routes=express.Router();      


// import controll handler
const {createcourse,showallcourse,showcoursedetails,editcreatecourse} =
 require("../controllers/course");
const {cratecategory,showallcategory,pagedetails,addCourseToCategory} = require("../controllers/category");
const {createsection,updatesection,deletesection} = require("../controllers/section");
const {subsectioncreation,subsectiondelete,subsectionupdate}=require("../controllers/subsection");
const {creatingrating,getaveragerating,getallrating}=require("../controllers/ratingreview");

const {auth,isadmin,isinstructor,isstudent}=require("../middleware/autharization");
 

// mapping with routh
routes.post("/createcourse",auth,isinstructor,createcourse);
routes.put("/editcreatecourse",auth,isinstructor,editcreatecourse);

routes.post("/createsection",auth,isinstructor,createsection);
routes.post("/updatesection",auth,isinstructor,updatesection);
routes.delete("/deletesection",auth,isinstructor,deletesection);

routes.post("/subsectioncreation",auth,isinstructor,subsectioncreation);
routes.delete("/subsectiondelete",auth,isinstructor,subsectiondelete);
routes.post("/subsectionupdate",auth,isinstructor,subsectionupdate);

routes.post("/showallcourse",showallcourse);
routes.post("/showcoursedetails",showcoursedetails);

// create category by admin only
routes.post("/createcategory",auth,isadmin,cratecategory);
routes.get("/showallcategory",showallcategory);
routes.post("/pagedetails",pagedetails);
routes.post("/addCourseToCategory",addCourseToCategory);



// for rating review
routes.post("/creatingrating",auth,isstudent,creatingrating);
routes.get("/getaveragerating",getaveragerating);
routes.get("/getallrating",getallrating);

module.exports = routes;


 