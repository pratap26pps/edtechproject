import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { takeotp } from '../services/opration/authapi'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom';
 import { signup } from '../services/opration/authapi';
import { BiArrowFromRight } from 'react-icons/bi'
import { setUser } from '../slices/profileSlice';

const OtpPage = () => {

    const {loading,signupdata} = useSelector((state)=>state.auth);
    const [otp,setotp]=useState("");
   const navigate = useNavigate();
    const dispatch = useDispatch();
    
   const email = signupdata?.email;
    useEffect(() => {
    if(!signupdata) { navigate('/signup')}

    }, [signupdata, navigate])
    

    const
    handleonsubmit=(e)=>{
       const { firstname,lastname,password,confirmpassword,email,accounttype } = signupdata
       console.log("signupdata",signupdata);
        e.preventDefault();
        dispatch(signup(firstname,lastname,password,confirmpassword,email,accounttype,otp,navigate))
      

    }

  return (
    <div >
        {
        loading ? "loading....":
        (<div className='text-white text-2xl flex flex-col  items-center mt-32 '>
            <h1 className='text-orange-600'>Verify Email</h1>
            <p className='w-68 mx-1 my-4'>a verification code has been sent to you.Enter the code below</p>
            <form className='scale-150 my-8 text-black'
            onSubmit={handleonsubmit}
            >
                   <OTPInput 
                   name="otp"
                   inputType='text'
                   value={otp}
                   onChange={setotp}
                   numInputs={4}
                   renderSeparator = {<span>-</span>}
                   renderInput={(props)=><input {...props}/>}
                  
                   />
                   <button type='submit' className='bg-green-500 
                   hover:scale-95 hover:bg-red-500 transition-all duration-200 my-3 p-2 rounded-md '>
                      Verify Email
                   </button>
            </form>
            <Link to={'/signup'}>
             <div className='flex mt-6'>
                               <BiArrowFromRight className='mt-1'/>
                               <p>back to signup</p>
            </div>
            </Link>
               <button className='mt-3' onClick={()=> dispatch(takeotp(email))}>
                Resend it
                </button> 
        </div>)
       }
    </div>
  )
}

export default OtpPage
