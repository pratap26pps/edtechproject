import React, { useState } from 'react'
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useDispatch } from 'react-redux';
import {login} from '../services/opration/authapi'
import { useSelector } from 'react-redux'; 

export const Login = () => {

   const dispatch=useDispatch();
   const navigate=useNavigate();
 
 
    const [formdata,setformdata]=useState({
      email:"", password:""  
    })
    const [showpassword,setshowpassword]=useState(false);
      
    function changehandler(event){
        setformdata((prevdata)=>(
            {
              ...prevdata,
              [event.target.name]:event.target.value
            }
        ))
    }

  function submithandler(event){
    event.preventDefault();
    dispatch(login(formdata.email,formdata.password,navigate))
     
  }


  return (
    <div className='lg:flex lg:flex-row mt-16 p-5 bg-slate-950 justify-evenly 
    sm:flex-col'>

      <form onSubmit={submithandler} className='lg:mt-24 lg:scale-110  '>
        <label>
            <p className='text-white'>
                email address<sup className='text-red-600'>*</sup>
            </p>
            <input   className='p-1 rounded-sm bg-slate-800 w-60'
            required
            type='email'
            name="email"
            value={formdata.email}
            onChange={changehandler}
            placeholder='enter email id'
            />   
        </label>

        <label>
            <div className='flex w-56  justify-between'>
            <p className='text-white'>
                password<sup className='text-red-600'>*</sup>
            </p>
            <span className='text-yellow-400   mt-2' onClick={()=>setshowpassword((prev)=>!prev)}>
                {showpassword?(<AiOutlineEye/>):(<AiOutlineEyeInvisible />)}
            </span>
            </div>
            <input      className='p-1 rounded-sm bg-slate-800 w-60'
            required
            type={showpassword ? ("text"):("password")}
            value={formdata.password}
            name="password"
            onChange={changehandler}
            placeholder='enter password'
            />
            

       <Link to="/forgotpassword">
       <p className='text-cyan-600'>forgot password</p>
       </Link>

        </label>
     <button type='submit' className='bg-yellow-400 py-2 my-2 hover:bg-green-500
     transition-all duration-150 hover:scale-95 hover:text-white font-semibold px-24 rounded-md'>sign in</button>
     

 
 </form>


    <div className='p-3 my-16 lg:my-3 mr-3    border-y-2 lg:scale-95 sm:scale-50 border-blue-500'>
      <img src="https://cdn.pixabay.com/photo/2020/02/17/18/12/office-4857268_640.jpg" alt="loginpage" />
    </div>
    </div>
  )
  
}
export default Login;