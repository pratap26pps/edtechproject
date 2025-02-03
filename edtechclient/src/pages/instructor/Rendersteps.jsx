import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import Coursesinfoform from './Coursesinfoform';
import Coursesbuilderform from './Coursesbuilderform';
import Coursespublishedform from './Coursespublishedform';
const Rendersteps = () => {

const {step} = useSelector((state)=>state.course);

const steps = [
   {
    id:1,
    title:"Course Info",
   },
   {
    id:2,
    title:"course Buider",
   },
   {
    id:3,
    title:"Publish",
   },
]

  return (
    <div className='mb-6 w-[115vw] lg:w-[45vw] lg:ml-[5vw] ml-[-12vw]'>
           <div className='lg:text-3xl  ml-40 
              my-8 text-yellow-400 '>Add your courses here</div>
      <div className='flex justify-between my-1 relative scale-75 lg:scale-100'>
         <div className='absolute flex scale-[84%] gap-2
         z-20 lg:scale-100   font-bold lg:ml-10 lg:gap-6 mt-2 '>
                  <p>------------------------------------</p> 
                  <p className='lg:ml-10'>------------------------------------</p> 
            </div>
         {
        steps.map((items,index)=>(

           <div  key={index} className='z-50'>
            
             <div className={` ${ step === items.id ? 
              "bg-yellow-400 size-10 p-2 rounded-full aspect-square"
              :"bg-slate-600  size-10 p-2 rounded-full aspect-square"} `}>
              {
                step >items.id ?(<FaCheck/>):(items.id)
              }
            </div>
           
           
           </div>
        ))
      }
      </div>
     


      {/* data of item */}

    <div className='flex scale-75 lg:scale-100 mb-4  justify-between'>
        {
            steps.map((items,index)=>(
                <div key={index}>
                    <p>{items.title}</p>
                </div>
            ))
        }
    </div>
      {step === 1 && <Coursesinfoform/>}
      {step === 2 && <Coursesbuilderform  />}
      {step === 3 && <Coursespublishedform />}
  

    </div>
  )
}


export default Rendersteps
