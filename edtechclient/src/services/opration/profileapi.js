import { getcoursesection } from "../apis";
import { deletemyaccount } from "../apis";
import { apiConnector } from "../apiconnector";
import { toast } from "react-toastify";

export const getuserenrolledcourses= async (token)=>{
    const toastid = toast.loading("loading....")
     
      try{
        console.log("token",token);
          const response =await  apiConnector("GET",getcoursesection.GETMYCOURSES_API,
            null,{Authorization:`Bearer ${token}`} );
          console.log("enrolled course response",response);
            //  data verification
          if(!response.data.success){
            throw new Error(response.data.message);
          }
          toast.success("enrolled courses get successfully");
          
      }catch(error){
          console.log("enrolled course failed",error);
          toast.error("faild to get enrolled course")
      }
      toast.dismiss(toastid);
    }

    export const deleteaccount= async (userid,token)=>{
   console.log("userid during delete account",userid);
        console.log("token during delete account",token);
    const toastid = toast.loading("loading....")

      try{
        const url = `${deletemyaccount.DELETEACCOUNT_API}/${userid}`;
          const response =await  apiConnector("DELETE", url, null,
             { Authorization: `Bearer ${token}` }  );
          console.log("delete account response",response);
            //  data verification
          if(!response.data.success){
            throw new Error(response.data.message);
          }
          toast.success("Account deleted successfully");
          
      }catch(error){
          console.log("Account deleted  failed",error);
          toast.error("faild to Account deleted ")
      }
      toast.dismiss(toastid);
    }
