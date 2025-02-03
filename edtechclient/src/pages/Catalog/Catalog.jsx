import React, { useState,useEffect } from 'react'
import Footer from '../Footer'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { catalogdata } from '../../services/opration/catalogdata';
import { categories } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import CourseSlider from './CourseSlider';
import { Link } from 'react-router-dom';
const Catalog = () => {
    const {catalogName} = useParams();
   
    const [catalogdatapae,setcatalogdatapae] = useState(null);
    const[ categoryid , setcategoryid] = useState("");
 
    const fetchsublinks = async()=>{
           try{
              const result =await apiConnector("GET",categories.CATEGORIES_API);
              console.log("result ",result);
            const catagory_id = result.data.getallcategory.filter((cr)=>cr.name ===catalogName)
            [0]._id;
            console.log("catagory_id",catagory_id)
            setcategoryid(catagory_id);
           }catch(error){
              console.log("could not fetch  category details");
           }
    }

    useEffect(() => {
        fetchsublinks();
    }, [catalogName])    

// fetch all category

useEffect(() => {
    const toastid = toast.loading("loading")
   const catalogapi = async()=>{
    try{
       const response = await catalogdata(categoryid);
       if(!response){
        toast.error("response for catalog data not available");
        return;
       }
       console.log("response of catalog",response);
      setcatalogdatapae(response);
    }catch(error){
      console.log("failed to get catagog data api")
    }
   }
   toast.dismiss(toastid);
   catalogapi();
}, [categoryid])


 

  return (
    <div className='mt-16 text-white'>
         <div className='bg-slate-700 lg:p-20 p-8 lg:text-3xl '>
            <p className='flex gap-1'><span>Home / Catalog /</span>
              <span className='text-orange-700'>{catalogdatapae?.selectedcategory?.name}</span>
            </p>
            <p className='text-3xl'>{catalogdatapae?.selectedcategory?.name}</p>
            <p className='text-2xl'>{catalogdatapae?.selectedcategory?.description}</p>
         </div>
         
         <div>
            {/* section 1 */}
            <div className='ml-5 mr-5 my-4'>
                <p className=' lg:text-3xl text-2xl'>Courses to get you started</p>
                <div className='flex gap-2 border-b-2 my-4 border-blue-600'>
                    <p className='text-yellow-400'>Most Popular</p>
                    <p>new</p>
              
                </div>
                <div className='my-5 ml-7'>
                <CourseSlider   courses={catalogdatapae?.selectedcategory?.course}/> 
                </div>
               
            </div>
            {/* section 2 */}

            <div className='my-11 '>
              
                <p className='ml-6 text-2xl  lg:text-3xl'>Top Courses in {catalogdatapae?.selectedcategory?.name}</p>
                <div className='ml-10 my-6'>
                
                   <CourseSlider   courses={catalogdatapae?.differentcategory?.course}/>
                   
                </div>
               
            </div>

            {/* section 3 */}
            <div>
                <p className='ml-6 lg:text-3xl text-2xl'>frequently bought </p>
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:ml-52 ml-10 my-8'>
                   {
                    catalogdatapae?.mostsellingcourse?.map((course,index)=>{
                   return     <div key={index}>
                                <Link to={`/catalog/buy/${course._id}`}>
                                <div>
                                  <img src={course?.thumbnail || "catalogimg"}
                                    alt="categoryimg" height={234} width={258} 
                                      />
                                    <p className='text-lime-300'>{course.name}</p>
                                      <p className='text-red-500 font-bold'>Rs.{ course.price}</p>
                                      <p className='w-96'>{course.description}</p>
                                      <div className='flex gap-1 font-bold'>
                                        Instructor- <p className='text-yellow-300 gap-2 flex'>
                                          <p>{course?.instructor?.firstname}</p>
                                        {course?.instructor?.lastname}
                                        </p>
                                      </div>       
                                 </div>
                                </Link>
                     
                              </div>
                    })
                   }
                </div>
            </div>
         </div>
         <Footer/>
    </div>
  )
}

export default Catalog
