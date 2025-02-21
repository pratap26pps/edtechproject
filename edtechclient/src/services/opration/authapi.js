import {setToken} from '../../slices/authSlice'
import { toast } from 'react-toastify';
import {apiConnector} from '../apiconnector'
import { signupapi } from '../apis';
import { userotp } from '../apis';
import { loginapi } from '../apis';
import { resetpasswordapi } from '../apis';
import { resetpasswordupdate } from '../apis';
import { setLoading, setUser,} from '../../slices/profileSlice';
  


export const takeotp= async (email)=>{
   const pan= toast.loading("loading..")
   try{
       const result = await apiConnector("POST",userotp.USEROTP_API, {email});
       console.log("result of otp email",result);
        
       toast.success("otp sent to your email");
     
     }catch(error){
          console.log("otp not sent",error);
          toast.error("otp does not sent,please try again")
     }
   toast.dismiss(pan);
}

export function signup(firstname,lastname,password,confirmpassword,email,accounttype,otp,navigate){
     
  return async (dispatch)=>{
     const pan= toast.loading("loading..")
    dispatch(setLoading(true));
   
    console.log({
       firstname,
      lastname,
      password,
      confirmpassword,
      otp,
      email,
      accounttype
    });
    
     if (!firstname || !lastname || !password || !confirmpassword || !email || !accounttype) {
      toast.error("All fields are required");
      return;
    }
  try{
     const result = await apiConnector("POST", signupapi.signup_api,{
      firstname,
      lastname,
      password,
      confirmpassword,
      otp,
      email,
      accounttype
     });
    dispatch(setUser(result.data.user));
     console.log("response",result);
     if(!result.data.success){
       throw new Error(result.data.message)
     }
     toast.success("Email verified,signup successfull");
     dispatch(setToken(result.data.token));
     localStorage.setItem("token",JSON.stringify(result.data.token));
     navigate('/dashboard/myprofle')
  }catch(error){
     console.log("an error occured after fetching otp verification",error);
     toast.error("an error occured after fetching otp verification");
  }
  dispatch(setLoading(false));
  toast.dismiss(pan);  
}
}

export function  getpasswordresettoken(email,setemailsend){

    return async(dispatch)=>{
       const pan= toast.loading("loading..") 
      dispatch(setLoading(true));
      try{
          const response =  apiConnector("POST", resetpasswordapi.RESETPASSWORD_API,{email,setemailsend});
          console.log("reset password token response",response);
            //  data verification
          if(!(await response).data.success){
            throw new Error(response.data.message);
          }
          toast.success("reset email sent");
          setemailsend(true)
      }catch(error){
          console.log("reset password token error",error);
          toast.error("faild to send email for resetting password")
      }
      dispatch(setLoading(false));
      toast.dismiss(pan);
    }
}

export function resetpassword(password,confirmpassword,token){
     return async(dispatch)=>{
       const pan= toast.loading("loading..")
      dispatch(setLoading(true));
      try{
         const response = apiConnector("POST",
          resetpasswordupdate.RESETPASSWORDUPDATE_API,
          {password,confirmpassword,token});
         console.log("response of reset password",response);

         if(!response){
          throw new error(response.data.message);
         }
         toast.success("reset password successfully")
      }catch(error){
              console.log("reset error",error);
             console.log("unable to reset password");
      }
      toast.dismiss(pan);
     }
     
}

export function login(email,password,navigate){
  return async (dispatch)=>{



   const pan= toast.loading("loading..")
    dispatch(setLoading(true));
    try{
          const response = await apiConnector("POST",loginapi.login_api,{
            email,
            password,
          });
    console.log("response during login",response);
 
       
    
    const { success, message } = response.data;
    if (!success) {
      toast.warning(message || "Invalid login credentials");
      toast.dismiss(pan);
      return;
    }
      toast.success("login successfull")
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.loginuser));
      localStorage.setItem("token",JSON.stringify(response.data.token))
      navigate('/dashboard/myprofle')
    }catch(error){
          toast.error("login failed")
          console.log("error at login api ",error)
    }
    dispatch(setLoading(false));
    toast.dismiss(pan);
  }
}

export function logout(navigate){
 
  return (dispatch)=>{
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("logout successfully");
      navigate("/");
  }
} 
