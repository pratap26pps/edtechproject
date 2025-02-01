import React, { useEffect, useState } from 'react'
import { setCourse } from '../../slices/courseSlice';
import { toast } from 'react-toastify';
import { allgetcat } from '../../services/opration/coursedetailsapi';
const Allcategory = () => {
  const [Category,setCategory] = useState([]);
  console.log("category",Category)
  useEffect(() => {
   const toastid= toast.loading("loading")
     const findcat = async()=>{
      try{
        const response = await allgetcat();
        console.log("response in allcatvfv",response)
         setCategory(response.data.getallcategory);
           toast.dismiss(toastid);
      }catch(error){
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories"); // Show error toast if something goes wrong
        toast.dismiss(toastid);
      }
   
     }
    
     findcat();

  }, [])
  
  return (
    <div className='text-white'>
       <p className='flex justify-center font-bold
       from-purple-600 via-pink-600  lg:text-3xl text-2xl
        to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>Your All Category Course
        </p>
        <div className='border-b-2 border-blue-900 my-4'></div>

        <div>
            {
                Category.length> 0 ?
                (<div>
                    {
                      Category.map((cat)=>(
                        <div key={cat._id} className='border-2 border-blue-900 p-5
                        mr-9 ml-2 lg:mr-40 lg:ml-28'>
                         <div className="flex gap-2"> 
                          <p className='font-semibold text-orange-600'>Name :</p>
                          <p>{cat.name}</p>
                          </div> 
                          <div className='flex flex-col'>
                          <p className='font-semibold text-orange-600'>Description :</p> 
                           <p>{cat.description}</p></div> 
                        </div>
                      ))
                    }
                </div>):
                (<div>You have not create any category course</div>)
            }
        </div>
    </div>
  )
}

export default Allcategory
