import React, { useState,useEffect } from 'react'
import Iconbutton from '../../components/common/Iconbutton'
import { useForm } from 'react-hook-form'
import { FaSquarePlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'
 import { setCourse, setEditCourse,setStep } from '../../slices/courseSlice';
import { toast } from 'react-toastify';
import { setLoading } from '../../slices/authSlice';
import Creaatesection from './Creaatesection';
import { createsectionofcourse } from '../../services/opration/coursedetailsapi';
import { updatecreatesection } from '../../services/opration/coursedetailsapi';
const Coursesbuilderform = () => {
   const dispatch = useDispatch();
  
  const [EditSectionName,setEditSectionName]= useState(true);
  const {register,handleSubmit,Submit,formState:{errors},setValue} = useForm();
  const {course} = useSelector((state)=>state.course);
  console.log("course",course?.data?._id);
  useEffect(() => {
    // Check if course data is loaded
    if (!course) {
      toast.error("Course details not found. Please refresh the page.");
    }
  }, [course])
  const {token }= useSelector((state)=>state.auth);
  const canciledithandler = ()=>{
    setEditSectionName(false);
    setValue("sectionName","");
  }
  const gotoback =()=>{
    dispatch(setStep(1));
   dispatch(setEditCourse(true));  
  }
  const gotonext =() =>{
    if( course?.coursecontent?.length === 0){
      toast.error("please add alteast one section");
      return;
    }
      if(course?.coursecontent?.some((section)=>section.subsection.length === 0)){
        toast.error("please add atleast one lecture in each section")
        return;
      }
    dispatch(setStep(3));
  }
 const onSubmit =async(data)=>{
                    console.log("Section Name:", data.sectionName);
                  console.log("Course ID:", course.data._id);
  if (!data.sectionName || !course?.data._id) {
    toast.error("Section name and course ID are required");
    return;
  }

  setLoading(true);
    try{ 
      let result;
        if(!EditSectionName){
          result = await updatecreatesection({
            sectionName:data.sectionName,
            sectionid :EditSectionName,
            courseid:course.data._id,
          },token
        )
        } 
        else{
          result = await createsectionofcourse({
            sectionName:data.sectionName,
            courseid:course.data._id,

 
          },token) 
        };
   console.log("coursecontent",result.data.courseupdatedetails.coursecontent)
  // update values
   if(result){
     dispatch(setCourse(result.data.courseupdatedetails));
     setEditCourse(null);
     setValue("sectionName","");
   }

    }catch(error){
       console.log(error.message);
     toast.error("update aur create nahi huwa sir");
    }
    dispatch(setLoading(false));
 }


   const handleeditsectionname = (sectionid,sectionName)=>{
    if(sectionid === sectionName){
      canciledithandler();
      return;
    }
       setEditSectionName(sectionid);
       setValue("sectionname",sectionName);
   }

  return (
    
    <div className='p-3 bg-slate-800 scale-95 lg:scale-125 lg:mt-36 lg:my-16  mr-9 ml-11'>
        <div>Course Builder</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col my-3'>
          <label className='my-1'>Section Name <sub className='text-red-500'>*</sub></label>
          
           <input  id='sectionName'
            placeholder='Add a Section to Build Your Course'
           {...register("sectionName",{required:true})}
           
        className='h-4 w-80 p-4 rounded-lg bg-slate-600 text-black'
        />
        {errors.sectionName  && (<span>section name is required</span>)}
          </div>
     
      
        <Iconbutton type={Submit} >
         <div className='flex gap-2 my-4'>
         <div className='flex bg-slate-950 p-2  text-yellow-400 cursor-pointer
           rounded-md gap-1'>
              {  EditSectionName ? "Create Section":"Edit Section"} 
               < FaSquarePlus  className='mt-1'/>
          </div>
          <div className='mt-2 '>     
          {
            !EditSectionName  &&(
              <button onClick={canciledithandler } 
              className='text-white underline'>Cancel Edit</button>
            )
          } </div>
         </div>
  
          </Iconbutton> 
       </form>
  
           {
               course?.coursecontent?.length > 0 && (
                    <Creaatesection handleeditsectionname={handleeditsectionname}/> 
               )
           }
          
        <div className='flex gap-4 ml-52'>
          <Iconbutton 
          onClick={ gotoback}

          className='p-3 rounded-md bg-slate-500 text-black'
          text="Back"/>
          <Iconbutton
          onClick={gotonext}
          className='bg-yellow-400 p-1'
          text="Next"/>
          
          </div>
        
    </div>
  )
}

export default Coursesbuilderform
