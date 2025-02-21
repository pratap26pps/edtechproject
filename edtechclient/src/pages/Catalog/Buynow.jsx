import React, { useEffect, useState } from 'react'
import { FaShareFromSquare } from "react-icons/fa6";
import { GiBurningDot } from "react-icons/gi";
import { TbWorld } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { showcoursedetailsofcourse } from '../../services/opration/coursedetailsapi';
import { toast } from 'react-toastify';
import Footer from '../Footer';
const Buynow =() => {
    const { courseid } = useParams();
    console.log("courseid in buy now",courseid)
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [coursedata,setcoursedata]=useState([]);
     console.log("coursedata",coursedata);
  const gellcoursedatails= async()=>{
         try{
        if(courseid){
         const response = await   showcoursedetailsofcourse(courseid)
         console.log("response",response.data)
         if(response){
        setcoursedata(response.data.data);
         }
        }
     }catch(error){
        console.log(error);
      }
      }


    useEffect(()=>{
      gellcoursedatails();  
    },[courseid])
 
 


    const handlebuycourse=async()=>{
         if(token){
            // buycourse(token,[courseid],user,navigate,dispatch)
            return;
         }
         else{
            toast.error("please login first")
         }
    }
    const cartcoursehandler=async()=>{
        if(token){
           // buycourse(token,[courseid],user,navigate,dispatch)
           return;
        }
        else{
           toast.error("please login first")
        }
   }
  return (
    <div className='mt-16 text-white'>
        
        
        <div>
       
        <div  className=' lg:p-16 p-3 bg-slate-700 h-72'>
     
      {coursedata.length > 0 ? (
        coursedata.map((course, index) => (
          <div key={index} className='lg:flex lg:flex-row flex flex-col-reverse lg:justify-between '>
            <div className='lg:mt-20'>
              <h2 className='text-3xl '>{course.name}</h2>
          <p className='w-96'><strong>Description:</strong> {course.description}</p>
          <StarRatings
        rating={2.403}
        starDimension="30px"
        starSpacing="5px"
      />

          
            <p><strong>Created By:</strong> {course.instructor.firstname} {course.instructor.lastname}</p>
              <div className='flex'><TbWorld className='mt-1'/><p>english</p></div>
           <div className='p-4 border-2  lg:w-[54%] border-stone-900 mt-20  '>
            <strong className='my-3'>What You'll Learn:</strong>
            <p className='flex gap-3'><GiBurningDot/>  {course.whatwillLearn}</p>
           </div>
            
            <p><strong>Category:</strong> {course.category.name || "N/A"}</p>
              <p className='text-2xl my-5'>Author</p>
            <div className='flex gap-2'>
                <img src={course.instructor.Image} height={44} width={43}
                 alt="authorimage" className='aspect-square rounded-full'/>
            <p className='mt-2'> {course.instructor.firstname} {course.instructor.lastname}</p>
                 
            </div>
            </div>
            <div className='border-2  border-black lg:w-[94vw] lg:h-[90vh] w-80 bg-gray-600 p-4'>
          
            <img  className='lg:ml-7'
              src={course.thumbnail || "default-thumbnail.jpg"}
              alt={course.name}
               height={332} width={332}
            />
          <p className='text-2xl gap-3'><strong >Rs.</strong> {course.price}</p>
         
           <button onClick={handlebuycourse} className='p-2 my-3 bg-yellow-400 text-black w-full rounded-lg'>
            Buy Now
            </button>   
            <button onClick={cartcoursehandler} className='p-1 bg-cyan-700 text-black w-full rounded-lg'>
            Add to Cart
            </button> 
            <p className='flex justify-center my-3'>30-Day Money-Back Guarantee</p>  
            <p className='flex justify-center my-3 text-2xl text-yellow-500'>
                <FaShareFromSquare className='mt-1'/>share </p> 
          </div>
                        
          </div>

         
        ))
      ) : (
       <div className='flex justify-center my-20'><p className='loader'></p>
        <p className='mt-3'>Loading course details...</p></div>
      )}
      <div className='ml-[-5vw]'>
        <Footer/>
      </div>
        
    </div>
    
        </div>
     
    </div>
  )
}

export default Buynow
