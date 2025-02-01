import React, { useState } from 'react'
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import signup from '../assets/gallery/signup.jpg'
 import { takeotp } from '../services/opration/authapi';
import { useDispatch } from 'react-redux';
import { setSignupdata } from '../slices/authSlice';
export const Signup = () => {

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [showpassword,setshowpassword]=useState(false);
  const [showconfirmpassword,setshowconfirmpassword]=useState(false);
  const [loading,setLoading]=useState(false);
   
const [formdata,setformdata]=useState({
  firstname:"",
  lastname:"",
  email:"",
  password:"",
  confirmpassword:"",
  accounttype:"",
   
})

function changehandler(event){
  
  setformdata((prevdata)=>(
      {
        ...prevdata,
        [event.target.name]:event.target.value
      }
  ))
}
    
const  submithandler= async (event)=>{
      event.preventDefault();
      if (!formdata.firstname || !formdata.lastname || !formdata.accounttype || !formdata.email ||!formdata.password) {
        toast.error("form cannot be blank");
        return;
       }

      if(formdata.password !== formdata.confirmpassword){
        toast.error("passwords do not match");
        return;
      }
      setLoading(true);
      dispatch(setSignupdata(formdata));
      await takeotp(formdata.email);   
      navigate("/otpPage");
      setLoading(false);
};

  return (
    <div className='lg:flex lg:flex-row md:flex-col p-3
       justify-evenly mt-16'>
     <div className='lg:border-b-8 border-blue-500 p-2  
     lg:scale-[0.9] hover:scale-[0.8] mr-8 transition-all duration-200'>
      <img src={signup} alt="signup" />
     </div>
    {
      loading  ?  (<div className='lg:mt-5 text-white font-bold'>loading...</div>):(
    
    <form  onSubmit={submithandler} className='lg:mt-20 lg:scale-105 school'>
             

      {/* first name and last name */}
      <div className='flex flex-wrap gap-2 '>
         <label>
        <p className='text-white '>first name<sup className='text-red-600'>*</sup></p>
        <input    className='p-1 rounded-sm bg-slate-800  w-72'
        type='text'
        name="firstname"
        onChange={changehandler}
        placeholder='enter first name'
        value={formdata.firstname}
        ></input>
      </label>

      <label>
        <p className='text-white'>last name<sup className='text-red-600'>*</sup></p>
        <input     className='p-1 rounded-sm bg-slate-800  w-72'
        type='text'
        name="lastname"
        onChange={changehandler}
        placeholder='enter last name'
        value={formdata.lastname}
        ></input>
      </label>
      </div>
      {/* email add */}
      <label>
        <p className='text-white'>email address<sup className='text-red-600'>*</sup></p>
        <input     className='p-1 rounded-sm bg-slate-800 w-72'
        type='email'
        name="email"
        onChange={changehandler}
        placeholder='enter email address'
        value={formdata.email}
        ></input>
      </label>

      <select 
      className='rounded-sm p-1  cursor-pointer lg:mx-2 mx-0 my-3 lg:my-0  bg-slate-700 w-72'
      name="accounttype" onChange={changehandler} value={formdata.accounttype} >
               <option>Select Account Type <sub className='bg-red-500'>*</sub></option>
             <option    value="student"  >Student</option>
             <option   value="admin"    >Admin</option>
             <option   value="instructor" >Instructor</option>
             
      </select>

   {/* create password and conform password */}
 <div className='flex flex-wrap gap-2'>
   <label>
        <div className='flex justify-between  w-72'>
        <p className='text-white'>create password<sup className='text-red-600'>*</sup></p>
        <span className='text-white mt-2 cursor-pointer' onClick={()=>setshowpassword((prev)=>!prev)}>
                {showpassword?(<AiOutlineEye/>):(<AiOutlineEyeInvisible />)}
            </span>
        </div>
         <input     className='p-1 rounded-sm text-white bg-slate-800  w-72'
        type={showpassword ?("text"):("password")}
        name="password"
        onChange={changehandler}
        placeholder='create your password'
        value={formdata.password}
        ></input>
      </label> 

      <label><div className='flex justify-between  w-72'>
        <p className='text-white'>conform password<sup className='text-red-600'>*</sup></p>
        <span className='text-white mt-2 cursor-pointer' onClick={()=>setshowconfirmpassword((prev)=>!prev)}>
                {showconfirmpassword?(<AiOutlineEye/>):(<AiOutlineEyeInvisible />)}
       </span>
         </div>
       <input      className='p-1 rounded-sm text-white  w-72 bg-slate-800'
        type={showconfirmpassword ?("text"):("password")}
        name="confirmpassword"
        onChange={changehandler}
        placeholder='create conform password'
        value={formdata.confirmpassword}
        >  
        </input>
      </label>
      </div>
   
    
<button className='bg-yellow-300 py-1 px-6 lg:mx-3 mt-5 
hover:text-white transition-all duration-200 hover:scale-95 font-semibold hover:bg-green-500 rounded-sm w-44'
 type='submit'>create account</button>
</form>
 )}
    </div>
  )
}
export default Signup;