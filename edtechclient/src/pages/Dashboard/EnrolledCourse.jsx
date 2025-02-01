import React, { useState,useEffect } from 'react'
import ProgressBar from '@ramonak/react-progress-bar'
import { useSelector } from 'react-redux'
import { getuserenrolledcourses } from '../../services/opration/profileapi';

const EnrolledCourse = () => {

const {token} = useSelector((state)=>state.auth);

const[enrolledcourse,setenrolledcourse]= useState([]);

const mygetcourses = async () =>{
    try{
      const response = await getuserenrolledcourses(token);
       setenrolledcourse(response.data.data);   
        
    }catch(error){
       console.log("error during getcourse api",error)
    }
  
}
useEffect(() => {
   mygetcourses();
}, [])

  return (
    <div className=' mx-5 text-white flex flex-col justify-center items-center'>
         <div className='mx-7 text-3xl text-pink-300 font-bold'>Enrolled Course</div>
       
         {
               enrolledcourse === null ? (
                <div>Loading...</div>
               ):
              enrolledcourse.length === 0 ?
              (<div className='mt-4'>You have not any course yet</div>):(<div>
                <div className='flex justify-evenly bg-slate-500 rounded-lg p-1'>
                  <p>Course Name</p>
                  <p>Duration</p>
                  <p>Prograss</p>
                  
                </div>
                {
                  enrolledcourse.map((course,index)=>(
                    <div key={index}>
                      <div className='flex'>
                        <img src={course?.thumbnail} alt="courseThumbnail" />
                        <div>
                          <p>{course?.title}</p>
                          <p>{course?.description}</p>
                        </div>
                      </div>
                      <div>{course?.totalduration}</div>
                      <div>
                        <p>Progress:{course?.progress || 0}%</p>
                          <ProgressBar completed={course?.progress || 20}/>
                      </div>
                    </div>
                  ))
                }
              </div>)
         }
                
                 
    </div>
  )
}

export default EnrolledCourse
