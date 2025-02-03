import React, { useState,useEffect } from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { showallcourseinstructor } from '../../services/opration/coursedetailsapi';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { formatedate } from '../../services/formatedate';

const Mycourseinst = () => {
 const {token}= useSelector((state)=>state.auth);
 const {user} = useSelector((state)=>state.profile);
 console.log("user",user);

 const navigate = useNavigate();
 const {course} =useSelector((state)=>state.course);
 console.log("course",course);
 
 const [courses,setcoures]= useState([]);
 const [status,setstatus]= useState("published");
  
 useEffect(() => {
   const fetchcourse = async ()=>{
       const result = await showallcourseinstructor(token);
       console.log("result",result);
       if(result){
        setcoures(result.data.getallcourse);
        // setstatus(result.data.getallcourse.status);
       }
   }
   fetchcourse();
 }, [])
 const filtereduser = courses.filter((instid)=>instid.instructor ===user._id)
  console.log("filtereduser",filtereduser); 
  return (
    <div className='mt-12 text-white lg:flex lg:flex-col flex-grow   '>
      <div className='flex justify-around'>
        <p className='text-3xl'>My Courses</p>
        <button  className='p-2 rounded-lg bg-yellow-400 text-black'
        onClick={()=>navigate("/dashboard/Add-Course")}>Add Course</button>
      </div>
      <div className='flex my-4 mr-8 ml-4  justify-between  border-2 border-white
       p-1 rounded-md   text-white'>
       <div className=' '>Course</div> 
        <div className='flex  mr-5    gap-4 '>
          <p>Duration</p>
          <p>Price</p>
          <p>Action</p>
        </div>
       </div> 
        <div className='lg:w-[99vw] w-[94vw]  ml-2'>
          {  
          filtereduser.length === 0  ? (<div>No courses found</div>):(
            filtereduser.map((content)=>{
          return    <div key={content._id} className='lg:flex lg:flex-row
           flex-col lg:gap-64 mr-6 ml-1 border-2 border-blue-900 p-4 rounded-md'>
               
                <div className='lg:flex lg:flex-row flex-col gap-3'>
                   <img src={content?.thumbnail} alt="courseimage" height={25} width={292}/>
                   <div className='flex flex-col'>
                    
                   <p className='font-bold my-2'>{content?.name}</p>
                  <p className='my-3'>{content?.description}</p>
                  <p>{content?.whatwillLearn}</p>
                  <p>Created</p> 
                    <div className={status !== 'draft'? "bg-yellow-400 text-black w-28 rounded-lg":
                    "bg-red-400  rounded-lg w-28 "}
                    >{status}</div>

                   </div>
              

                </div>
                   <div className='flex gap-5'>
                    <p>{content?.duration || "2hr 30min"}</p>
                    <p className='flex'><FaRupeeSign className='mt-1'/>{content?.price}</p>
                    <div className='flex gap-2'>
                    < MdEdit/>
                    <MdDelete/>
                    </div>
                 
                   </div>
                   
              </div>
            })
             )
          }
        </div>
      
    </div>
  )
}

export default Mycourseinst
