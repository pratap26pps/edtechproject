import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCourse } from '../../slices/courseSlice';
import { categoryapi } from '../../services/opration/coursedetailsapi';
const Addcategory = () => {
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    console.log("token",token);
    const {handleSubmit, formState:{errors},register} = useForm();

    const onSubmit = async (data)=>{
      console.log("Token in Addcategory.jsx:", token);
        const toastid = toast.loading("loading");
        try{
         const response = await categoryapi(data.name,data.description,token);
         console.log("category response",response);
         if(!response){
           toast.error("category response not available")
         }
         dispatch(setCourse(response?.data?.tagdetails
          ));

        }catch(error){
            console.log("error while submit create category",error);
            
        }
        toast.dismiss(toastid);
    }
  return (
    <div className='mt-12'>
       <p className='flex justify-center font-bold
       from-purple-600 via-pink-600  lg:text-3xl text-2xl
        to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>Create Category Course
        </p>
        <div className='border-b-2 border-blue-900 my-4'></div>
        <div className='ml-11 mr-11 '>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col'>
                    <label >Category Name <sub className='text-red-500'>*</sub></label>
                    <input type="text" id='name'
                    {...register("name",{required:true})}
                    placeholder='enter course category name'
                    className='p-3 w-full text-black bg-slate-200 rounded-lg' />
                      {errors.name  && (<span>Category name is required</span>)}
                </div>
                <div className='flex flex-col'>
                    <label >Description <sub className='text-red-500'>*</sub></label>
                    <textarea type="text"
                    id='description'
                    {...register("description",{required:true})}
                    placeholder='type information in brief '
                    className='p-3 w-full h-48 bg-slate-300 rounded-lg text-black' />
                      {errors.description  && (<span>Description is required</span>)}
                </div>

                <button type='submit' className='bg-yellow-400 my-5 ml-6
                 p-4 rounded-md hover:scale-90 transition-all 
                duration-300 text-black hover:text-red-600 hover:bg-green-600'>
                    Submit
                </button>
              </form>
        </div> 
    </div>
  )
}

export default Addcategory
