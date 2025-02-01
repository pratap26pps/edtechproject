import React from 'react'
 
const Coursescard=({carddata,currentcard, setcurrentcard} )=> {
  return (
    <div className='size-64 '>
      <div className={ `${currentcard===carddata.heading ? 
      " bg-slate-900 hover:scale-105 hover:transition-all p-3 cursor-pointer hover:duration-200  transition-shadow shadow-lg shadow-white ":
      "bg-zinc-900 rounded-md p-4 hover:scale-105 hover:transition-all cursor-pointer"}`}
       onClick={()=>setcurrentcard(carddata.heading)}
      >
             <div className='text-orange-500'> {carddata.heading}</div>  
             <div className='text-gray-200   flex flex-wrap'> {carddata.description}</div>
             <div className='flex gap-6 text-red-800'>
              <div >
                  {carddata.level}
              </div>
              <div>
                   lession  {carddata.lessionnumber}
              </div>
              </div>  
                

            </div>
            

    </div>
  )
}

export default Coursescard
