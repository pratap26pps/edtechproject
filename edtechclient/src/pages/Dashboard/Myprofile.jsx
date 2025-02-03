import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import Iconbutton from '../../components/common/Iconbutton';

const Myprofile = () => {

  const user = useSelector((state)=>state.profile.user);
  const navigate = useNavigate();
  return (
    <div className='lg:ml-7 ml-2 text-white'>

         <h1 className='lg:mx-36 my-4 mx-14  font-bold text-2xl'>MyProfile</h1>
         {/* section 1*/}
      <div className='flex  justify-between lg:mx-6 rounded-lg  bg-slate-600 p-4 w-11/12'>
           <div className='flex gap-7'>
            <img src={user?.Image} alt={`${user?.firstname}`}
            className='aspect-square size-14 rounded-full object-cover' />
            
            <div className='flex flex-col'>
               <div className=''>{user?.firstname + " " + user?.lastname} </div>
              
               <div className=''>{user?.accounttype}</div>
                <div className=''>{user?.email}</div>
            </div>

           </div>

            <div className='bg-yellow-400 p-3 h-12 ml-[-43px]  text-black flex gap-2 rounded-md' 
             readOnly  onClick={()=>{ navigate('/dashboard/setting') }}
            >
               <Iconbutton  text="Edit"/>
               <FaEdit className='mt-1'/>  
            </div> 
      </div>
      {/* section 2 */}
      <div className='flex my-4  justify-between lg:mx-6 rounded-lg  bg-slate-600 p-4 w-11/12'>

            <div className='flex flex-col'>
               <div className='m-0 w-4'> About </div>
             <p   className='bg-slate-600 text-slate-400'>
             user ka about section</p>
            </div>

            <div className='bg-yellow-400 p-3 text-black flex gap-2 rounded-md' 
              readOnly     onClick={()=>{ navigate('/dashboard/setting') }}
            >
               <Iconbutton  text="Edit"/>
               <FaEdit className='mt-1'/>  
            </div> 
      </div>
     
        {/* section 3 */}
        <div className='  my-4   lg:mx-6 rounded-lg  bg-slate-600 p-4 w-11/12'>

          <div className='flex justify-between'>
             <div className='m-0 w-full'> Personal Details </div>

          <div className='bg-yellow-400 p-3 text-black flex gap-2 rounded-md' 
           readOnly     onClick={()=>{ navigate('/dashboard/setting') }}

           
          >
             <Iconbutton  text="Edit"/>
             <FaEdit className='mt-1'/>  
          </div>

          </div>
           
           <div className='flex justify-between w-8/12'>
             <div>
              <ul>
                <li>first name</li>
                 <p className='text-slate-300'>{user?.firstname}</p>
                <li>Email</li>
                 <p className='text-slate-300'>{user?.email}</p>
                <li>Gender</li>
                 <p className='text-slate-300'>male/female</p>
              </ul>
             </div>
             <div>
             <ul>
                <li>last name</li>
                <p className='text-slate-300'>{user?.lastname}</p>
               
                <li>Contact Number</li>
               <p>{user?.contactno || 7854123932}</p>
             
                <li>Date of Birth</li>
             <p>day-month-year</p>
              </ul>
             </div>
           </div>
          

          </div>

    </div>
  )
}

export default Myprofile
