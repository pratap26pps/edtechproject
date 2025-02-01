import React, { useState } from 'react'
import { IoSettings } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { sidebarlinks } from '../../../data/dashboard-link'
import { logout } from '../../services/opration/authapi'
import Sidebarlink from '../../components/cores/Sidebarlink'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Modaal from '../../components/common/Modaal';
import { ACCOUNT_TYPE } from '../../components/common/Utilsconst';
const Sidebar = ({toggleSidebar}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modaal,setmodaal] = useState(null);
    const {loading:authloading} = useSelector((state)=>state.auth);
    const {loading:profileloading,user} = useSelector((state)=>state.profile);
    console.log("user",user);
     const useraccount = user.accounttype;
    console.log("useraccount",useraccount);

   



    if(authloading  || profileloading){
        return(
           <div className='lg:mt-20'>Loading.....</div>
        )
   }
  return (
    
    <div className='mt-24 ' >
     
    <div className='flex flex-col  ' onClick={toggleSidebar}> 
        {
           sidebarlinks.map((link)=>{
                 if(link.type && link.type === useraccount){
                 return (
                    <Sidebarlink link={link}   key={link.id}/>
                      
                 )}
                return null;
                })
        }        
    </div>
    <div className='mx-auto mt-7 mb-6 h-1 w-10/12 bg-slate-800'></div>
    <div className='flex' onClick={toggleSidebar} >
      <Sidebarlink  link={{name:"setting", icon:IoSettings  ,path:"/dashboard/setting"}}/>
    </div>
    <button   className='flex items-center my-2 gap-x-2 font-bold
         bg-slate-300 p-1 border-l-8 border-yellow-500 hover:bg-red-600 transition-all'
        onClick={()=>setmodaal({
            text1:"Are you sure ?",
            text2:"you will be logged out of your Account",
            btn1text:"Logout",
            btn2text:"Cancel",
            btn1handler:()=>dispatch(logout(navigate)),
            btn2handler:()=>setmodaal(null),
        })}
        > 
        <span>Logout</span>  <CgLogOut/>
            
        </button>  
    
  
      {modaal &&  <Modaal modaldata={modaal}/>}
</div>
  )
}
export default Sidebar
