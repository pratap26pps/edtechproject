import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const CourseSlider = ({ courses }) => {
  return (
    <div className="p-4">
      {courses?.length > 0 ? (
        <Swiper
          modules={[Pagination, FreeMode]}
          spaceBetween={20}
          slidesPerView={3}
          freeMode={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {courses.map((course) => (
            <SwiperSlide key={course._id}>
              <Link to={`/catalog/buy/${course._id}`}  >
                <img
                  src={course?.thumbnail || "catalogimg"}
                  alt="categoryimg"
                height={332} width={342}
                />
                <div className="p-4">
                  <p className='text-lime-300 text-lg font-semibold'>{course.name}</p>
                  <p className='text-red-500 font-bold'>Rs. {course.price}</p>
                  <p className='text-gray-600 text-sm line-clamp-3'>{course.description}</p>
                  <div className='flex gap-1 font-bold mt-2'>
                    Instructor:
                    <p className='text-yellow-300 gap-2 flex'>
                      {course?.instructor?.firstname} {course?.instructor?.lastname}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='flex text-3xl text-red-600 items-center justify-center p-5'>No courses found</div>
      )}
    </div>
  );
};

export default CourseSlider;
