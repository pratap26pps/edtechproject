import React, { useState } from 'react'
import { homepageexplore } from '../../../data/homepage-explore'
import Coursescard from './Coursescard'
const tabsname = [
    "free",
    "new to coding",
    "most popular",
    "skills paths",
    "carrier paths"
]
const ExploreMore=()=> {
    const [currenttab,setcurrenttab]=useState(tabsname[0]);
    const [courses,setcourses]=useState(homepageexplore[0].courses);
    const [currentcard,setcurrentcard]=useState(homepageexplore[0].courses[0].heading );


    const setmycard=(value)=>{
        console.log('Tab selected:', value);
        setcurrenttab(value);
        const result= homepageexplore.filter((item)=>item.tag===value); 
        console.log('Result:', result);
        
            setcourses(result[0].courses); 
            setcurrentcard(result[0].courses[0].heading);  
         
    }
  return (
    <div className='items-center  mt-10 z-30 h-full  relative flex flex-col w-full '>
         <div className='flex my-2'>
         <p className='text-white lg:text-3xl'> Unlock the </p>
         <p className='font-bold text-red-500 lg:text-3xl mx-2'>Power Of Code</p>
         </div>
        <div className='flex-wrap text-center 
       text-gray-600 w-4/6 my-2'> Learn to Build Anything That You Can Imagine
        </div>
        {/* current tab box */}
        <div className='flex  scale-75 lg:scale-100  bg-slate-600 relative p-5 text-white rounded-md my-2 gap-3'>
                  {tabsname.map((element, index) => (
                         <div key={index}
                        className={`flex rounded-full cursor-pointer 
                        transition-all duration-200 hover:scale-105 p-2 flex-row items-center gap-2 ${
                          currenttab === element ? "bg-orange-600 text-white" : "bg-slate-700"
                        }`}
                        onClick={() =>setmycard(element)}
                        >
                           {element}
                      </div>
                   ))}
        </div>
        {/* courses card ka group */}
        <div className='h-[150px]'></div>
 
            <div  className='flex scale-[40%] gap-6 mr-5 lg:scale-100   items-center lg:gap-14 absolute
            mt-40 lg:mt-52 '>
                  {courses.map((element,index)=>{
                    return(
                        <Coursescard
                        key={index}
                        carddata={element}
                        currentcard={currentcard}
                        setcurrentcard={setcurrentcard}
                        />
                    ) 
                  })}
            </div>
           
        
    </div>
  )
}

export default ExploreMore
