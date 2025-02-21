import React from 'react'
import { toast } from 'react-toastify';
import { apiConnector } from '../apiconnector';
import { apicatalogdata } from '../apis';
import { apiaddcoursetocat } from '../apis';


 export  const catalogdata =async (categoryid) => {
    const toastid = toast.loading("loading....")
 let result =[];
 try{
      const response = await apiConnector("POST",apicatalogdata.CATALOG_API,{categoryid})
      if(!response?.data?.success){
        throw new Error("could fetch the category data")
      }
      result=response.data
      
 }
 catch(error){
   console.log("internal problem",error)
   result = error.response?.data
 }
  toast.dismiss(toastid);
  return result;
 
}


export const addCourseToCategory = async (data) => {
  console.log("Category ID:", data.categoryid);
  console.log("Course ID:", data.courseid);
 
  try {
    const toastid = toast.loading("loading....")

    const { categoryid, courseid } =data;
      const response = await apiConnector("POST",apiaddcoursetocat.ADCATCOURSE_API, {
          categoryid,
          courseid,
      });
      toast.dismiss(toastid); 
      return response.data;
 

  } catch (error) {
      console.error(error);
      throw new Error(error.response?.data?.message || "Something went wrong");
  }
  
};
 
