import React, { useState,useEffect } from 'react'
import { resetCourseState, setStep } from '../../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

const Coursespublishedform = () => {

    const {register,formState:{errors},setValue,getValues, handleSubmit}=useForm();
       const dispatch = useDispatch();
       const navigate = useNavigate();
       const {course} = useSelector((state)=>state.course);
       const {token} = useSelector((state)=>state.auth);
       const [loading,setloading] = useState(false);
  //  useEffect(() => {
  //    if(course?.status ===COURSE_STATUS.PUBLISHED){
  //        setValue("public",true);
  //    }
  //  }, [])
  const  gotocourse=()=>{
    dispatch(resetCourseState());
      navigate("/dashboard/my-course")
   }
   
   const handlecoursepublic =async ()=>{
  //  if(course.status ===COURSE_STATUS.PUBLISHED && getValues("public",true) ||
  //  course.status ===COURSE_STATUS.DRAFT && getValues("public",false ) ){
    // no updation in form
    gotocourse();
    return;
  //  }
  //  if form update huwa hai
  const formdata = new FormData();
  formdata.append("courseid",course._id);
  const coursestatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT 
  formdata.append("status",coursestatus);
  setloading(true);
  const result = await editcoursedatails(formdata,token);
  if(result ){
    gotocourse();
  }
   setloading(false)

     }


    const onSubmit = ()=>{
       handlecoursepublic();
    }
  return (
    <div className='mt-12 text-3xl bg-slate-600 p-4 rounded-md lg:w-full mr-4 '>
      <div className='text-white'>Publish Settings</div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-2 my-3 text-2xl'>
        <input type="checkbox"  id="correct" 
        {...register("correct",{required:true})}/>
         {
                    errors.correct  &&(<span>please tick the input box</span>)
                }
        <p className='text-gray-400'>Make this course as public</p>
      </div>
      <div className='flex gap-4 lg:mt-10 lg:ml-60 my-5'>
        <button className='bg-slate-900 p-2 rounded-md' 
        onClick={()=>dispatch(setStep(2))} disabled={loading}
        >Back</button>
        <button className='bg-yellow-300 p-2  rounded-lg text-black'
        type='submit' disabled={loading}
        >Save Changes</button>
      </div>
      </form>
    </div>
  )
}

export default Coursespublishedform
