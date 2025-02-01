import React from 'react'
import Footer from './Footer' 
const Aboutus = () => {
  return (
    <div className='text-white w-23px flex flex-col bg-slate-950 justify-center items-center mt-16'>
         <div className='bg-slate-600   relative p-5 lg:h-[70vh] h-[50vh]'>
            <p className='lg:text-3xl scale-90 ml-[-6vh] lg:scale-105 flex font-semibold justify-center mt-8'>
              Driving Innovation in Online Education for a</p>
            <p className='text-orange-500 flex justify-center text-2xl'>Brighter Future</p>
            <p className='lg:w-3/5 mt-7 mr-5 lg:ml-56 flex justify-center '>
              Edtech perception is at the forefront of driving innovation in online education.
               We're passionate about creating a brighter future by offering cutting-edge courses,
               leveraging emerging technologies, and nurturing a vibrant learning community.</p>
          </div>
          <div className='absolute   lg:mt-[-192vh] mt-[-367vh] mr-10  h-16 lg:h-44
           lg:scale-110 scale-95  flex gap-6'>
           <img src="https://53.fs1.hubspotusercontent-na1.net/hubfs/53/Site%20owner%20changing%20text%20and%20background%20color%20in%20CSS.jpg" alt="" height={322} width={322} />
           <img src="https://cdn.pixabay.com/photo/2017/08/01/00/38/man-2562325_640.jpg" alt=""  height={322} width={322} />
           <img src="https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_640.jpg" alt="" height={322} width={322} />
         </div>

         <div  className='mt-36'>
          <p className='lg:text-3xl
           lg:w-4/5 mt-7 lg:ml-56 ml-1 mr-5
            flex justify-center '>
            We are passionate about revolutionizing the way we learn.
             Our innovative platform combines technology,
             expertise, and community to create an unparalleled educational experience.</p>
             <p className=' border-b-2  border-gray-800 my-12'></p>
         </div>
        <p class="lg:text-5xl  text-center 
        font-bold from-purple-600 via-pink-600
        to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
          Our Founding Story
        </p>

         <div className='lg:flex flex-col lg:flex-row mr-4   lg:justify-evenly  '>
               <div>  
              <p className=' ml-4 lg:w-3/5 mt-7 '>Our e-learning platform was born out of a shared vision and 
                passion for transforming education. It all began with a group of educators,
                 technologists, and lifelong learners who recognized the need for accessible, flexible,
                 and high-quality learning opportunities in a rapidly evolving digital world.
                 </p>
                 <p className='ml-4  lg:w-3/5 mt-7 '>As experienced educators ourselves, we witnessed firsthand the 
                  limitations and challenges of traditional education systems.
                   We believed that education should not be confined to the walls of
                    a classroom or restricted by geographical boundaries. We envisioned a platform
                     that could bridge these gaps and empower
                   individuals from all walks of life to unlock their full potential.</p>
            </div>
             <div className='mr-20 scale-75  lg:scale-150 mt-20' >
              <img className='shadow-xl
                 
              shadow-red-700'
             src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg" 
            alt="techimg"    />
            </div>
            </div>

         <div className='lg:flex flex-col lg:flex-row mr-4 lg:justify-evenly items-center'>
          <div className=''>
            <p className='flex justify-center font-bold lg:text-2xl my-8 text-green-500'>our vision</p>
            <p className='ml-3 w-4/5'>With this vision in mind, we set out on a journey to create
               an e-learning platform that would revolutionize the way people learn. 
               Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content,
               fostering a dynamic and interactive learning experience.</p>
           
        
          </div>
          <div>
           <p className='flex justify-center font-bold lg:text-2xl my-8 text-lime-500'>our misson</p>
               <p className='ml-4/5'>Our mission goes beyond just delivering courses online.
                 We wanted to create a vibrant community of learners,
                  where individuals can connect, collaborate, and learn from one another.
                   We believe that knowledge thrives in an environment of sharing and dialogue,
                  and we foster this spirit of collaboration through forums,
                 live sessions, and networking opportunities.</p>
          </div>
       
         </div>
         <div className='grid lg:grid-flow-col lg:grid-rows-1 mr-11 scale-95  grid-cols-2 grid-rows-2 my-4'>
              <div className='p-5 bg-slate-500 '>
                <p className='font-bold flex justify-center'>5K</p>
                <p className='text-slate-400'>Active Students</p>
              </div>
              <div className='p-5 bg-slate-500 '>
                <p className='font-bold flex justify-center'>5K</p>
                <p className='text-slate-400'>Active Students</p>
              </div>
              <div className='p-5 bg-slate-500 '>
                <p className='font-bold flex justify-center'>5K</p>
                <p className='text-slate-400'>Active Students</p>
              </div>
              <div className='p-5 bg-slate-500 '>
                <p className='font-bold flex justify-center'>5K</p>
                <p className='text-slate-400'>Active Students</p>
              </div>
           </div>
         <Footer/>
    </div>
  )
}

export default Aboutus
