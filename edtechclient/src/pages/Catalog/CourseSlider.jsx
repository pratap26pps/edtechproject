import React from 'react'
import {Swiper, SwiperSlide, } from 'swiper/react'
import { Pagination,FreeMode } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
const CourseSlider = ({courses}) => {
  return (
    <div>
         {
            courses?.length >0 ?(
            <div>
                 <Swiper
                 breakpoints={{1024:{slidesPerView:3}}}
                 pagination={true}
                 navigation={true}
                 spaceBetween={100}
                 >
                    {
                        courses?.map((course)=>(
                            <Link to={`/catalog/buy/${course._id}`}>
                              <div>
                              <SwiperSlide key={course._id}>
                               <img src={course.thumbnail} alt="coursesimg"  height={234} width={258} />
                               <p>{course.name}</p>
                               <p>{course.description}</p>
                               <p>Rs.{course.price}</p>
                            </SwiperSlide>
                              </div>
                          
                            </Link>

                        ))
                    }
                 </Swiper>  
            </div>)
            :(<div className='flex text-3xl 
               text-red-600  items-center justify-center p-5'>No any courses found</div>)
         }
    </div>
  )
}

export default CourseSlider
