import React from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Codeblocks from '../components/cores/Codeblocks';
import Footer from './Footer';
import Ctabutton from '../components/cores/Ctabutton';
import { FaChessQueen } from "react-icons/fa";
import { FaChartLine } from 'react-icons/fa';
import { FaSketch } from 'react-icons/fa';
import { FaChild } from 'react-icons/fa';
import ExploreMore from '../components/cores/ExploreMore';
const Home=()=> {
  return (
    <div className='mt-10'>
        {/* section 1 */}
    <div className='relative items-center mt-10  flex flex-col w-full '>
    
      <div className='my-2 '>    
        <Link to={"/signup"}>
          <div className='hover:bg-slate-700 flex bg-slate-500 p-2 rounded-3xl
           transition-all duration-100 hover:scale-95'>
            <p className='text-slate-300  '> Become an instructor  </p>
            <div className='mt-1 ml-2'>  <FaArrowCircleRight /> </div>
          </div>
        </Link>  
      </div>
      <div className='flex my-2 '>
         <p className='text-white lg:text-3xl '> EMPOWERED WITH YOUR </p>
         <p className='font-bold text-red-500 lg:text-3xl mx-2'>FUTURE SKILLS</p>
     </div>
      <div className=' text-center 
       text-gray-600 w-5/6 my-2'>with our coding courses ,you can learn at
        your at places,from anywhere int he world
        and get access to wealth of resources, including hands on projects ,quises
         and personalised feedback from instructor
      </div>
      <div className='flex my-2'>
        
         <Ctabutton active={true}>learn more</Ctabutton>
         <Ctabutton linkto={"/signup"}>book a demo</Ctabutton>
      </div>
      <div className='shadow-white shadow-lg  my-6 mx-6  size-7/12'>
        <video muted autoPlay loop
         src='https://cdn.pixabay.com/video/2015/10/16/1046-142621379_large.mp4'>
        </video>
     </div>
    {/* code section1 */}
    <div>
        <Codeblocks
           position={"lg:flex-row "}
           heading={
            <div className='text-xl lg:text-3xl   text-orange-300  font-bold'>
              <div className='flex '>
                <p className='w-56'> unlock your </p>
                <p className='font-bold text-red-500 w-full '>coding potential</p>
              </div>
               <p> with our online courses</p>
            </div>
            
           }
           subheading={<div className='w-[95%] text-yellow-100'>our courses are designed and taught by industry exports
             who have years of exprience in coding and
              passoinate about share their knowledge with you </div>
              }
            button={
              <div className='flex my-3'>
                   <Ctabutton active={true}>try it yourself</Ctabutton>
                   <Ctabutton linkto={"/signup"}>learn more</Ctabutton>
              </div>
            }  
          codeblock={`<<!DOCTYPE html>\n<htm>\n<head><tittle>Example</title><style>
              <link to my video</style><link to my video</style><link to my video</style>
              <link to my video</style><link to my video</style><link to my video</style>
              \n<body><h1>hello champ</h1><img src='image.jpg'></img></body></html>`}         
        />
      </div>
      {/* section 2 */}
      <div>
        <Codeblocks
           position={"lg:flex-row-reverse"}
           heading={
            <div className='text-3xl text-orange-300  font-bold'>
             start
                <p className='font-bold text-red-500 text-3xl mx-2'>coding in seconds</p>
                
            </div>
            
           }
           subheading={<div className='w-[89%] text-yellow-100'>go ahead and give it try,our hands on learning envirnmental
            means you wil be writting a real code from your first lession </div>}
              button={
                <div className='flex my-3'>
                     <Ctabutton active={true}>continue lession</Ctabutton>
                     <Ctabutton linkto={"/signup"}>learn more</Ctabutton>
                </div>
              } 
          codeblock={`<<!DOCTYPE html>\n<htm>\n<head><tittle>Example</title><style>
              <link to my video</style><link to my video</style><link to my video</style>
              <link to my video</style><link to my video</style><link to my video</style>
              \n<body><h1>hello champ</h1><img src='image.jpg'></img></body></html>`}         
        />
      </div>
    
    </div>
    {/* section 2.1 explore more */}
    <ExploreMore/>
     {/* section 3 */}
     <div className='bg-slate-300 z-10 w-full h-full relative text-zinc-800' >

            <div className='w-full   flex justify-center  items-center'> 
              <div className='flex  lg:mt-36 mt-4 mr-4'>
                 <Ctabutton active={true}>
                        <div className='flex'> 
                               <div className='w-36'>Explore full catalog </div> 
                               <div className='my-1 mx-1'> <FaArrowCircleRight/></div>
                         </div>
                  </Ctabutton>
                   <Ctabutton linkto={"/signup"}> <p className='w-20 '>learn more</p> </Ctabutton>
              </div>   
            </div> 
          <div className='lg:flex lg:flex-row sm:flex-col p-4 w-full justify-evenly my-10 gap-9'>
                  <div className=''>get the skills you need for
                     a<p className='font-bold text-blue-400 text-2xl'>job that is in demand</p>
                  </div>
                  <div>
                      <div className='w-4/5'>
                        the modern studynotion is dedicate its own terms,today to be a competative 
                        specialist more than one professionals skills
                      </div>
                    <div className='w-36 my-2'>
                       <Ctabutton active={true}>learn more</Ctabutton>
                    </div> 
                  </div>
          </div> 
       {/* list image section */}
       <div className='lg:flex lg:flex-row sm:flex-col w-full justify-evenly  gap-9'>
                  <div className=' p-2 my-2'>
                     <div className='flex my-5'>
                          <div><FaChessQueen /></div>
                             <div>
                                 <p>LEADERSHIP</p>
                                   <p>full committed to success company</p>
                                 </div>
                     </div>
                     <div className='flex my-5'>
                         <div><FaChild/></div>
                         <div><p>RESPONSIBILITY</p><p>student will always be our top priorty</p></div>
                     </div>
                     <div className='flex my-5'>
                            
                         <div><FaChartLine/></div>
                         <div><p>FLIXIBILITY</p><p>student will always be our top priorty</p></div>
                     </div>
                     <div className='flex'>
                            
                         <div><FaSketch/></div>
                         <div><p>Solve The Problem</p><p>student will always be our top priorty</p></div>
                     </div>
                  </div>
                  <div className=' relative p-6 mr-5 shadow-orange-700  shadow-2xl '>
                      <img className='transition-all
          duration-100 hover:scale-95 cursor-pointer'
         src="https://cdn.pixabay.com/photo/2016/11/08/05/10/students-1807505_640.jpg" alt="" /> 
                      
                  </div>
                  <div className='bg-green-800 w-72 flex justify-between   mt-[-3vh] lg:mt-4
                  transition-all duration-100 hover:scale-95 cursor-pointer h-16 ml-8 p-1 absolute my-[60vh] '>
                    <div>10
                    <p>years experiences</p>
                    </div>
                  <div className='w-1 h-12 my-1 bg-zinc-900'></div>
                     <div>250
                    <p>types of courses</p>
                    </div>
                </div>

          </div> 

          {/* section 3.3 calender */}
       <div className='flex flex-col w-full justify-center items-center'> 

         <div className='lg:flex sm:flex-col mr-2 mt-20 w-full  justify-center items-center'>
         <p className='text-white text-3xl ml-2'> Your Swises Knife For </p>
         <p className='font-bold text-red-500 text-3xl mx-2'>Learning any Language</p>
         </div>
         <div className=' text-center  justify-center items-center font-bold 
       text-gray-600 w-5/6 mt-4'>using spin making making teaching multiple language 
       realistic voice over progress tracking ,custom schedule and more
          </div> 
         <div className='flex justify-center items-center my-14 size-[80%]  p-3'>
       
     <div className='flex 
     transition-all duration-100 hover:scale-95 cursor-pointer shadow-lg shadow-slate-900 rotate-[-22deg]'>
     <img src="https://cdn.pixabay.com/photo/2016/11/19/21/01/analysis-1841158_640.jpg"  alt="progress" />
    </div>
     <div className='shadow-lg 
     transition-all duration-100 hover:scale-95 cursor-pointer shadow-slate-900 rotate-[-5deg]'>
      <img src="https://cdn.pixabay.com/photo/2015/05/01/23/44/to-do-list-749304_640.jpg" alt="planing" />
    </div>
    <div className='flex shadow-lg shadow-slate-900 rotate-12
    transition-all duration-100 hover:scale-95 cursor-pointer'>
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLclM__GkvCnSu-ldFnlw0WchxzOvLRRmLGA&s" alt="calender" height={632} width={702}/>
    </div>

         </div>
         <div className='w-96 flex my-7 items-center justify-center'>
             <div className='flex mr-28'>
                 <Ctabutton active={true} linkto={"/signup"}>
                        <div className='flex'> 
                               <div>Learn More</div> 
                               <div className='my-1 mx-1'> <FaArrowCircleRight/></div>
                         </div>
                  </Ctabutton>
             </div>
         </div> 

       </div>   
     </div>
        
     {/* section 4  instructor*/}
     <div className='w-full h-full  bg-slate-950 '>
        <div className='lg:flex sm:flex-col justify-evenly  my-5 items-center'>

          <div className='p-6 mr-4 '>
            <img src="https://media.istockphoto.com/id/1331422830/photo/confident-smiling-indian-school-teacher-with-students-in-background.jpg?s=612x612&w=0&k=20&c=Y6yICEM3uqYlF0f-PyNPUuVXyjcOyoaqToKZv8vyNZY=" alt="" />
          </div>

           <div>
           <div className='flex mt-20 w-full  justify-center items-center'>
         <p className='text-white text-3xl'> Become an </p>
         <p className='font-bold text-red-500 text-3xl mx-2'>Instructor</p>
         </div>
         <div className='flex-wrap text-center  justify-center items-center font-bold 
       text-gray-600 w-11/12 '> instructor from around the world teach millions of students
       on studynotion, we provide the tools and skills to teach what you love
          </div> 
          <div className='my-11 flex items-center justify-center'>
        <Ctabutton active={true}>start teaching today</Ctabutton>
         </div> 
           </div>

        </div>
        {/* review of learners */}
     </div>
     <Footer/>
    </div>
  )
}

 
export default Home