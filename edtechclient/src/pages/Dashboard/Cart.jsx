import React from 'react'
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component';
import Iconbutton from '../../components/common/Iconbutton' 
import { IoStarOutline, IoStarSharp } from 'react-icons/io5';
import { setRemoveCart } from '../../slices/cartSlice';
const Cart = () => {
    const {cart} =useSelector((state)=>state.cart);
    const {total}= useSelector((state)=>state.cart)
    const dispatch= useDispatch();

const handlebuycourse = ()=>{
    const courses = cart.map((course)=>course._id);
    console.log("bought this course",courses);
    // todo api integrate for buy
}

  return (
    <div  className=' text-white'>
        <p className='text-3xl flex justify-center text-yellow-300'>Your Cart</p>

         <div className='border-b-2 border-yellow-200 ml-9 mr-8 mt-3'>
       <p className='ml-3 lg:text-2xl'>  { `${cart.length} courses in cart`}</p>  
        </div> 
      {
         cart.length ===0 ?
       (<div className='flex justify-center mt-5'>Your cart is empty</div>):
         (<div>
         
         {
        cart.map((course,index)=>(
            <div key={index}>
                <div>
                    <img src={course?.thumbnail} alt="thumbnail" />
                    <div>
                        <p>{course?.title}</p>
                        <p>{course?.category?.name}</p>

                           <ReactStars count={5} size={24} 
                    edit={false} emptyIcon={IoStarOutline}
                    filledIcon={IoStarSharp}
                    activeColor="#ffd700"/>
                    <span>{course?.ratingreview?.length} Ratings </span>  
                    </div>
                </div>
               <button className='flex'
               onClick={()=> dispatch(setRemoveCart(course._id))}>
                <AiFillDelete/>
                <span>Remove</span>
               </button>  
               <span>Rs. {course?.price}</span>
            </div>
        ))

        
      }
     <div className='bg-slate-500 p-6 rounded-lg border-2 border-blue-500 w-52 ml-4 '>
        <p>Totlal</p>
        <p>Rs. {total}</p>
        <Iconbutton 
        onClick={handlebuycourse}
        text="Buy Now"/>
     </div>

         </div>)
      }





    </div>
  )
}

export default Cart

