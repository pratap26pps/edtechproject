import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { resetpassword } from '../services/opration/authapi';
const Updatepassword = () => {
    const dispatch = useDispatch();
    const location =useLocation();
    const [FormData,setFormData]= useState({
        password:"",
        confirmpassword:""
    })
    const [showpassword,setshowpassword]=useState(true);
    const [showconfirmpassword,setshowconfirmpassword]=useState(true);
    const {loading}= useSelector((state)=>state.auth);
    const {password,confirmpassword} =FormData;
    const navigate = useNavigate();
    const handleonchange = (e)=>{
           setFormData((prevdata)=>(
            {
                ...prevdata,
                [e.target.name]:e.target.value,
            }
           ))
    }
    const handleonsubmit=(e)=>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetpassword(password,confirmpassword,token))
        navigate('/login');
    }
  return (
    <div className='flex flex-col items-center  lg:mt-16'>
        {
            loading ?(<div>loading......</div>):(
            <div className='text-white'>
                <p>choose new password</p>
                <p>almost done. enter new password and you are all set</p>
                <form 
                onSubmit={handleonsubmit}
                >
                    <p>new password <sup>*</sup></p>
                    <label className='flex text-black font-bold'>
                        
                        <input
                        required
                        name='password'
                        value={password}
                        type={showpassword ? "text":"password"}
                        placeholder='new password'
                        onChange={handleonchange}
                         />
                    
                    <span  className='text-white'
                      onClick={()=> setshowpassword((prev)=>!prev)}
                     >  
                  {
                    showpassword ?
                     (<AiFillEye  fontSize={24} />)
                     :(<AiFillEyeInvisible fontSize={24}/>)
                  }
                 </span>
                 </label>
                  <p>new confirm password <sup>*</sup></p>
                 <label className='flex' >
                   
                        <input className=' text-black font-bold'
                        required
                        name='confirmpassword'
                        value={confirmpassword}
                        type={showconfirmpassword ? "text":"password"}
                        onChange={handleonchange}
                        placeholder='confirm new password'
                         />
                    
                    <span
                     onClick={ ()=> setshowconfirmpassword((prev)=>!prev)}
                     >  
                  {
                    showconfirmpassword ?
                     (<AiFillEye  fontSize={24} />)
                     :(<AiFillEyeInvisible fontSize={24}/>)
                  }
                 </span>
                 </label>
                 <button type='submit'>
                      Reset password
                 </button>
                </form>
            </div>)
        }
    </div>
  )
}

export default Updatepassword

 