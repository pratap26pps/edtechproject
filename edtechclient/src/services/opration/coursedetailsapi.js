import { getcreatecourse } from "../apis";
import { getcreatesectioncourse } from "../apis";
import { updatecreatesectioncourse } from "../apis";
import { createsubsectioncourse } from "../apis";
import {showallcoursedetails } from "../apis";
import { apiConnector } from "../apiconnector";
import { addcreatecategory } from "../apis";
import { geteditcreatecourse } from "../apis";
import { fetchallcat } from "../apis";
import { showcoursedetails } from "../apis";
import { toast } from "react-toastify";
 

export const  addcoursedetails= async (data,token)=>{
   
        console.log("Token being sent:", token);
      
  try {
    const response = await apiConnector("POST", getcreatecourse.GETCREATECOURSE_API,
      data,
      {  
       "Content-Type":"multipart/form-data",
          Authorization: `Bearer ${token}`,

      });
      
          console.log("Token in Authorization header:", `Bearer ${token}`);
          console.log("Create course response:", response);
          toast.success("Step 1 completed");
          return response;
        } catch (error) {
          console.error("Create course failed:", error);
          toast.error("Failed to create course");
        }
      
     
    }

    export const  categoryapi= async (name,description,token,)=>{
   
      console.log("Token being sent:", token);
      console.log("name being sent:", name);
      console.log("name being sent:", description);
     
    
try {
  const response = await apiConnector("POST", addcreatecategory.CATEGORYADD_API,
    {name,description},
    {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,  
    });
    
        console.log("Token in Authorization header:", `Bearer ${token}`);
        console.log("Create category response:", response);
        toast.success("add category completed");
        return response;
      } catch (error) {
        console.error("Create course failed:", error);
        toast.error("Failed to create course");
      }
    
   
  }
  export const allgetcat= async (token,)=>{
   
    console.log("Token being sent:", token);
  
   
  
try {
const response = await apiConnector("GET",  fetchallcat.FETCHALLCAT_API,
 token,
  {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,  
  });
  
      
      console.log("all category response:", response);
      toast.success("fetch all category completed");
      return response;
    } catch (error) {
      console.error("Failed to  fetch all category :", error);
      toast.error("Failed to  fetch all category ");
    }
  
 
}
   

 export  const handleEditCourse = async (data,token) => {
    try {
  
      // Edit course details
      const result = await apiConnector("POST", geteditcreatecourse.EDITCOURSE_API, data, {
    
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
      
      });
  
      if (result) {
        toast.success("Course updated successfully!");
      } else {
        toast.error("No changes made to form data.");
      }
      return result;
    } catch (error) {
      
      console.error("Failed to edit course:", error);
      toast.error("Failed to edit course. Please try again.");
    }
  };

  export const  createsectionofcourse= async (data,token)=>{
    console.log("data of sectionname and its id",data);
    console.log("Token being sent createsection:", token);
 
try {
   const response = await apiConnector("POST", getcreatesectioncourse.GETCREATESECTIONCOURSE_API,
  data,{  
       Authorization: `Bearer ${token}`,
   });
  
      console.log("Create course response:", response);
      toast.success("section create completed");
      return response;
    } catch (error) {
      console.error("Create section course failed:", error);
      toast.error("Failed to create section course");
      
    }
}

export const  updatecreatesection= async (data,token)=>{
   
  console.log("Token being sent updatesection:", token);

try {
 const response = await apiConnector("POST", updatecreatesectioncourse.UPDATECREATESECTIONCOURSE_API,
data, {  
     Authorization: `Bearer ${token}`,
 });

    console.log("Create update section course response:", response);
    toast.success("section update create completed");
    toast.loading("i love you");
    return response;
  } catch (error) {
    console.error("Create section updated course failed:", error);
    toast.error("Failed to create update section course");
  }


}


// subsectioncreation handler api call


export const createsubsectionapi= async (data,token)=>{
  console.log("data of subsection and its id",[...data.entries()]);
  console.log("Token being sent createsection:", token);

try {
 const response = await apiConnector("POST", createsubsectioncourse.CREATESUBSECTIONCOURSE_API,
data,{  
     "Content-Type": "multipart/form-data", 
     Authorization: `Bearer ${token}`,
 });

    console.log("Create sub section response:", response);
    toast.success("sub section completed");
    return response;
  } catch (error) {
    console.error("Create sub section failed:", error);
    toast.error("Failed to create sub section");
    
  }
}

// create all courses details api 
export const showallcourseinstructor =async (token)=>{
  
try {
  const response = await apiConnector("POST", showallcoursedetails.SHOWALLCOURSE_API,
 {  
      "Content-Type": "multipart/form-data", 
      Authorization: `Bearer ${token}`,
  });
 
     console.log("fetch all course response:", response);
     toast.success("fetch all course details completed");
     return response;
   } catch (error) {
     console.error("show all course failed:", error);
     toast.error("Failed to show all course dtaill");
     
   }
}



export const showcoursedetailsofcourse  = async(courseid)=>{
  console.log("courseid in api call ",courseid);
  // const toastid = toast.loading("seacrhing.....")
  try {
    
    const response = await apiConnector("POST", showcoursedetails.SHOWCOURSEDETAILS_API,
    {courseid});
   
       console.log("fetch  course response:", response);
       toast.success("fetch  course details completed");
       return response;
     
     } catch (error) {
       console.error("show  course failed:", error);
       toast.error("Failed to show  course dtaill");
      
     }
        // toast.dismiss(toastid);
  }