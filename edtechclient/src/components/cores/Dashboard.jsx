import React from 'react'
import { FaBars,FaTimes, } from 'react-icons/fa'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../../pages/Dashboard/Sidebar';
 
const Dashboard = () => {

 const {loading:authloading} = useSelector((state)=>state.auth);
 const {loading:profileloading} = useSelector((state)=>state.profile);

     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

     const  toggleSidebar =()=>{
      setIsSidebarOpen(!isSidebarOpen);
    }

if(authloading  || profileloading){
      return(
         <div className='lg:mt-20'>Loading.....</div>
      )
 }

  return (
    <div className='flex relative'>
          

        
         
         <div className={`
           fixed top-0 left-0 h-full  transform transition-transform duration-300
          z-40 bg-slate-700 border-r-2 border-blue-400  mt-5
         ${ isSidebarOpen ? 'translate-x-0 w-3/6 lg:w-[11vw]' : '-translate-x-full'}`}>
           <Sidebar toggleSidebar={toggleSidebar}/>
          </div>  
      

      

          <div >
              <button onClick={toggleSidebar} className='fixed mt-[9vh] lg:mt-[12vh] left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg lg:hidden"'>
                {isSidebarOpen ? <FaTimes className="text-white font-bold" /> :
                <div className='flex ml-2'>
                 <FaBars className="text-white" /> 
                 <p className='text-white mt-[-5px] hidden lg:inline'>Dashboard</p>
                </div>
                }
              </button>
            </div>


             <div className='flex-1 mt-28 text-white'>
              <Outlet/>   
             </div>     
     </div>
  )
}

export default Dashboard
