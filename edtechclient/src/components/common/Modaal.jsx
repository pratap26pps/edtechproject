import React from 'react'
import Iconbutton  from './Iconbutton'
const Modaal = ({modaldata}) => {
  return (
    <div className=' bg-slate-400 absolute flex  inset-0 bg-opacity-50 backdrop-blur-sm
     justify-center   items-center'>
       <div className='flex flex-col bg-slate-950 ml-36
        text-white p-8 rounded-lg items-center'>
        <p className=''>{modaldata.text1}</p>
        <p>{modaldata.text2}</p>
        <div className='flex gap-14 my-3'>
           <Iconbutton 
           onClick={modaldata.btn2handler}
           text={modaldata.btn2text}
           />
         <Iconbutton onClick={modaldata.btn1handler}> 
          {modaldata.btn1text} 
         </Iconbutton>
        </div>
          
       </div>
    </div>
  )
}

export default Modaal
