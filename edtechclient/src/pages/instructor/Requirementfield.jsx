 
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
    <div>
      <label >{label} <sup>*</sup></label>
      <input type="text"  id={name}  value={reqiureword}
      onChange={(e)=>setrequiredword(e.target.value)}
       className='w-full'
      />
      <button
      type='button'
      className='rounded-lg p-3 bg-green-500'
      onClick={addrequirefied}
      >
        Add
      </button>
    
      {
        reqiurelist.length > 0 && (
            <ul>
                {
                    reqiurelist.map((reqiureword,index)=>(
                        <li key={index}>
                           <span> {reqiureword}</span>
                       <button
                        type='button'
                        className='rounded-lg p-3 bg-red-600'
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
