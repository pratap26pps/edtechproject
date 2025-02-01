import React from 'react'
import { GoDotFill } from "react-icons/go";
import Rendersteps from './Rendersteps'
import { MdStyle } from "react-icons/md";
const Addcourses = () => {
  return (
    <div className=' text-white flex  justify-evenly items-center'>

     

      <div>
     <div className='lg:text-3xl flex justify-center
      text-2xl my-8 text-yellow-400'>Add your courses here</div>
        <Rendersteps />
      </div>
      {/* course tips */}
      <div className='scale-90 bg-slate-800 p-8 rounded-md lg:mt-[-42%] '>
        <div className='flex gap-6'>
        <MdStyle className='text-blue-700 mt-7 scale-[243%] '  /> 
            <p className='my-5 lg:text-3xl text-xl text-yellow-300'>
         Course Upload Tips</p> 
        </div>
     
        <ul className='my-4 w-96'>
      <li className='flex gap-2'> <GoDotFill/> Set the Course Price option or make it free.</li>
      <li className='flex gap-2'> <GoDotFill/> Standard size for the course thumbnail is 1024x576.</li>
      <li className='flex gap-2'> <GoDotFill/> Video section controls the course overview video</li>
      <li className='flex gap-2'> <GoDotFill/> Course Builder is where you create & organize a course</li>
      <li className='flex gap-2'> <GoDotFill/> Add Topics in the Course Builder section  </li>
      <li className='flex gap-2'> <GoDotFill/> Information from the Additional Data section </li>
      <li className='flex gap-2'> <GoDotFill/> Make Announcements to notify any important</li>
      <li className='flex gap-2'> <GoDotFill/> Notes to all enrolled students at once.</li>
        </ul>
      </div>
   
    </div>
  )
}

export default Addcourses
