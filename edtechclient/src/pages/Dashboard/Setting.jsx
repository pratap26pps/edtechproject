import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Iconbutton from '../../components/common/Iconbutton';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
 import Modaal from '../../components/common/Modaal';
import { deleteaccount } from '../../services/opration/profileapi';
import { useNavigate } from 'react-router-dom';
const Setting = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
    const user= useSelector((state)=>state.profile.user);
    const {token} = useSelector((state)=>state.auth);
    
    console.log("user during setting",user);
    console.log("token during setting",token);
    const userid = user._id;
    console.log("userid during setting",userid);
        const [modaal,setmodaal] = useState(null);
    
  return (
    <div className=' ml-3 mr-[-5vw]  lg:mr-0 text-white'>
        <h1 className='lg:mx-36 font-bold text-2xl my-3 ml-6'>Edit Profile</h1>
          {/* section 1*/}
          <div className='flex  justify-between lg:mx-6 rounded-lg  bg-slate-600 p-4 w-11/12'>
           <div className='flex '>
            <img src={user?.Image} alt={`${user?.firstname}`}
            className='aspect-square scale-75 lg:scale-95 rounded-full object-cover' />
            
            <div className='flex flex-col'>
               <div className='w-full ml-[-3px] lg:ml-0'> change profile picture </div>
               <div className='lg:flex sm:flex-col lg:flex-row my-4  gap-2  '>

              
             <div className='bg-slate-700 p-3 text-black flex gap-2  rounded-md' 
                 onClick={()=>{ navigate('/dashboard/myprofile') }}  >

               <Iconbutton  text="Select"/>
               <FaEdit className='mt-1'/>  
            </div> 
            <div className='bg-yellow-400 p-3 text-black flex gap-2 rounded-md' 
            readonly     onClick={()=>{ navigate('/dashboard/setting') }}
            >
               <Iconbutton  text="Upload"/>
               <FaEdit className='mt-1'/>  
            </div> 
            
             </div>

            </div>

           </div>

           
          </div>
          {/* SECTION 2 */}
          <div className=' my-4  lg:mx-6 rounded-lg  bg-slate-600 p-4 w-11/12'>

               <div className='flex  justify-between'>
                  <div className=' w-4'> About </div>
                  
                 <div className='bg-yellow-400 p-3 text-black flex gap-2 rounded-md'
                  readonly
                  onClick={()=>{ navigate('/dashboard/setting') }}
               >
                  <Iconbutton  text="Update"/>
                  <FaEdit className='mt-1'/>  
               </div>  
                  
                  </div>
               <input type="text" name="type here" id="2" className='bg-slate-600
               w-[56vw] h-[7vh] text-slate-300'
               placeholder='type your summary about yourself in brief'  />
               

               
          </div> 

          {/* section 3 */}
          <div className='  lg:my-4   lg:mx-6 rounded-lg  bg-slate-600 p-4 w-11/12'>

               <div className='flex justify-between'>
                  <div className='m-0 w-full'> Personal Details </div>

               <div className='bg-yellow-400 p-3 text-black flex gap-2 rounded-md' 
                  onClick={()=>{ navigate('/dashboard/myprofle') }}
               >
                  <Iconbutton  text="update"/>
                  <FaEdit className='mt-1'/>  
               </div>

               </div>
               
               <div className='flex justify-between w-8/12'>
                  <div>
                  <ul>
                     <li>first name</li>
                     <input type="text" className='bg-slate-600 text-black'
                  placeholder='first name' />
                     <li>Email</li>
                     <input type="text" className='bg-slate-600 text-black'
                  placeholder=' enter email' />
                     <li>Gender</li>
                     <select className='bg-slate-600 text-black' value="gender">
                     <option name="gen1" id="1">Male</option>
                     <option name="gen2" id="2">FeMale</option>
                     </select>
                  </ul>
                  </div>
                  <div>
                  <ul>
                     <li>last name</li>
                     <input type="text" className='bg-slate-600 w-24 lg:w-full text-black'
                  placeholder='last name' />
                     <li>Contact Number</li>
                     <input type="number" className='bg-slate-600  w-24 lg:w-full text-black'
                  placeholder=' enter phone no' />
                     <li>Date of Birth</li>
                     <input type="date" className='bg-slate-600   w-24 lg:w-full text-black'
                    />
                  </ul>
                  </div>
               </div>


           </div>

           {/* delete section */}
           <div className=' my-4  lg:mx-6 rounded-lg  bg-slate-600 p-4 w-11/12'>

               <div className='flex  justify-between'>
                  <div className=''> DELETE ACCOUNT</div>
                  
               <div className='bg-red-500 p-3 text-black flex gap-2 rounded-md'
                  
                  onClick={()=>{ setmodaal({
                              text1:"Are you sure ?",
                              text2:"Account deleted permanently",
                              btn1text:"Delete",
                              btn2text:"Cancel",
                              btn1handler:()=>dispatch(deleteaccount(userid,token)),
                              btn2handler:()=>setmodaal(null),
                          }) }}
               >
                  <Iconbutton  text="Delete"/>
                  <FaDeleteLeft className='mt-1'/>  
               </div>     {modaal && <Modaal  modaldata={modaal}/>}
                  
                  </div>
                  <p>once you delete your account, it will permanently delete from website</p>
                  <p>whole data of your account will be permanently erased</p>
               </div> 
           
    </div>
  )
}

export default Setting
