 
import React, { useEffect, useState } from 'react'

const Requirementfield = ({reqiurelist,setrequiredlist,  errors, label, name,register,setValue}) => {

const [reqiureword,setrequiredword]=useState("");


useEffect(()=>{
  register(name,{
    required:true,
    validate:(value) =>value.length >0
  })
},[register,name])

useEffect(()=>{
    setValue(name,reqiurelist)
  },[reqiurelist,name,setValue])


const addrequirefied = ()=>{
   if(reqiureword.trim()){
    setrequiredlist([...reqiurelist,reqiureword.trim()]);
    setrequiredword("");
   }
}

const removerequirefied = (index)=>{
    const updatedlist = [...reqiurelist];
    updatedlist.splice(index,1);
    setrequiredlist(updatedlist);
}

  return (
    <div >
      <label >{label} <sup>*</sup></label>
      <input type="text"  id={name}  value={reqiureword}
      onChange={(e)=>setrequiredword(e.target.value)}
       className='w-full p-1 rounded-md font-semibold'
      />
      <button
      type='button'
      className='rounded-lg p-3 mt-2 hover:scale-90 transition-all duration-150 bg-green-500'
      onClick={addrequirefied}
      >
        Add
      </button>
    
      {
        reqiurelist.length > 0 && (
            <ul>
                {
                    reqiurelist.map((reqiureword,index)=>(
                        <li key={index} className='flex gap-2 my-4'>
                           <span > {reqiureword}</span>
                       <button
                        type='button'
                        className='rounded-lg  mt-[-5px] p-2 bg-red-600 hover:scale-90 transition-all duration-150'
                        onClick={()=>removerequirefied(index)}
                        >
                            Remove
                        </button>
                        </li>
                    ))
                }
            </ul>
        )
      }
      {
        errors[name] && (<span>{label} is required</span>)
      }
      
    </div>
  )
}

export default Requirementfield
