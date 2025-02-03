import React from 'react'
import Footer from './Footer';
import { IoMdChatboxes } from "react-icons/io"; 
import { GiWorld } from "react-icons/gi";
import { IoMdCall } from "react-icons/io";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
 const Contact=() =>{
  const {register,handleSubmit,formState:{errors}}=useForm();
  const messagesent =()=>{
    toast.success("message sent")
    return
  }
  const onSubmit = (data) => {
    messagesent();
    console.log(data);  // For debugging, remove in production
  };
  
  return (
    <div className='text-white flex flex-col justify-center items-center mt-20'>
              <div className='lg:flex lg:flex-row flex-col gap-16 p-3'>
                <div className='bg-slate-500 h-96 ml-12 lg:ml-1  w-96 scale-75 lg:scale-100 rounded-lg p-4'>
                  <div className='my-6'>
                   <div className='flex gap-3'>
                    <IoMdChatboxes/>
                    <p className='font-bold
       from-purple-100 via-pink-300   
        to-blue-300 bg-gradient-to-r bg-clip-text text-transparent'>Chat on us</p>
                  </div>
                     <p>Our friendly team is here to help.
                      info@pratapsingh.com
                    </p> 
                  </div>
                       
                  <div className='my-6'>

                   <div className='flex gap-3'>
                    < GiWorld/>
                    <p className='text-violet-800 font-bold'>Visit us</p>
                  </div>
                     <p>Come and say hello at our Daulagiri hostel-07.
                   MDU-Rohtak, Delhi-Bypass, Haryana-124001
                    </p> 
                  </div>

                  <div className='my-6'>
                   <div className='flex gap-3'>
                    <IoMdCall/>
                    <p className='text-rose-700 font-bold'>Call us</p>
                  </div>
                     <p>Mon - Fri From 8am to 5pm
                    +8252590019
                    </p> 
                  </div>

                </div>

                {/* form */}
                <div className='p-6 border-2 border-blue-950 ml-[-7vw] lg:ml-0  lg:mr-0 scale-[62%] lg:scale-100'>
                   <p className='text-xl font-bold
       from-purple-600 via-pink-600  lg:text-3xl 
        to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>Got a Idea? We've got the skills. Let's team up</p>
                   <p>Tell us more about yourself and what you're got in mind.</p>
                   <form  onSubmit={handleSubmit(onSubmit)} action="https://api.web3forms.com/submit" method="POST">
                   
                    <div className='flex gap-9 my-8'>
                      <input type="hidden" name="access_key" value="ade29983-eceb-4438-8b57-45543132b11d" />
                        <div className='flex flex-col'>
                          <label>first name</label>
                          <input type="text" placeholder='Enter first name' id='firstname'
                            {...register("firstname",{required:true})}
                           className='bg-slate-500 lg:p-3 rounded-md  text-black font-bold' />
                         {errors.firstname  && (<span className='text-red-600'>first name is required</span>)}
                        </div>
                        <div className='flex flex-col'>
                          <label>last name</label>
                          <input type="text" placeholder='Enter last name' id='lastname'
                            {...register("lastname",{required:true})}
                           className='bg-slate-500 lg:p-3 rounded-md text-black font-bold' />
                            
                             {errors.lastname && (<span className='text-red-600'>last name is required</span>)}

                        </div>
                    </div>
                    <div className='flex-col flex'>
                                <label>Email Address</label>
                     <input type="text" placeholder='email@gmail.com' id='email'
                       {...register("email",{required:true})}
                         className='bg-slate-500 lg:p-3 rounded-md text-black font-bold' />
                           {errors.email  && (<span className='text-red-600'>email is required</span>)}
                    </div>
          
                      <div className='flex flex-col'>
                                          <label>Phone number</label>
                          <input type="number" placeholder='1234567890'
                           className='bg-slate-500 lg:p-3 rounded-md text-black font-bold' /> 
                      </div>

                     <div className='flex flex-col'>
                          <label>Message</label>
                           <textarea placeholder='enter your message here '  name="message" 
                             {...register("textarea",{required:true})}
                            className='bg-slate-500 lg:p-3 h-80 rounded-md text-black font-bold'/>
                              {errors.textarea  && (<span className='text-red-600'>text area is required</span>)}
                     </div>


                     <button type='submit' className='bg-yellow-400 hover:bg-green-500
                     transition-all duration-300 my-6 p-5 rounded-lg hover:scale-95'>
                      send message
                      </button>
                   </form>
                </div>
              </div>
             <Footer/>
    </div>
  )
}
export default Contact