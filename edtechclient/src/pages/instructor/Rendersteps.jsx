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
    <div className='mb-6'>
      <div className='flex justify-between relative scale-75 lg:scale-100'>
         <div className='absolute flex gap-16 font-bold ml-20 mt-2 mx-12'>
                  <p>--------------</p> 
                  <p>--------------</p> 
            </div>
         {
        steps.map((items,index)=>(

           <div  key={index}>
            
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

    <div className='flex scale-75 lg:scale-100 justify-between'>
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
