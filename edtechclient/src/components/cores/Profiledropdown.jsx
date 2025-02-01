import React from 'react'
import { IoMdArrowDropdownCircle } from "react-icons/io";
import {logout} from '../../services/opration/authapi'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
const Profiledropdown=()=> {
   const dispatch = useDispatch();
   const navigate = useNavigate();
    const user = useSelector((state)=>state.profile.user);
    console.log("image",user.Image);
    

  return (

    <div >
      <div className='flex relative group'>
          
            <img src={user.Image} alt="name" 
           className='aspect-square rounded-full object-cover  bg-red-500 '/>
         <div className='lg:mt-2 mx-2 text-white'><IoMdArrowDropdownCircle/></div>
     
       <div className='w-44 cursor-pointer  absolute bg-slate-300  rounded-lg p-3
         lg:translate-x-[-5vw] lg:translate-y-8 z-40 text-rose-700 opacity-0
         transition-all duration-200 group-hover:opacity-100'>
        <div className='hover:bg-amber-500 p-1 rounded-md'
        onClick={()=>navigate("/dashboard/myprofle")}
        >Dashboard</div>
        <div className='hover:bg-amber-500 p-1 rounded-md'
         onClick={()=>dispatch(logout(navigate)) }>
          LogOut</div>
        </div> 
       </div>  
    </div>
  )
}

export default Profiledropdown
