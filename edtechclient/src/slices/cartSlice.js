import {createSlice} from "@reduxjs/toolkit"
import { toast } from "react-toastify";
const initialState={
    cart:localStorage.getItem("cart") ? JSON.parse(localStorage("cart")) :[],
    total:localStorage.getItem("total") ? JSON.parse(localStorage("total")) :0,
    totalItem: localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItem")):0
} ;

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItem(state,action){
            state.token = action.payload;
        },
        // add to cart ka function
        setAddCart(state,action){
            const course = action.payload
            const index = state.cart.findIndex((item)=>item._id === course._id)
            if(index>=0){
                toast.error("course already in cart")
                return;
            }
           state.cart.push(course)
         state.totalItem++
         state.total += course.price
         localStorage.setItem("cart",JSON.stringify(state.cart))
         localStorage.setItem("total",JSON.stringify(state.total))
         localStorage.setItem("totalItem",JSON.stringify(state.totalItem))
           toast.success("course added to the cart") 
        },
        // remove to cart
        setRemoveCart(state,action){
            const courseid =action.payload
            const index = state.cart.findIndex((item)=>item._id === courseid)
           if(index >=0){
            state.totalItem--
            state.total -= state.cart[index].price
            state.cart.splice(index,1)
         localStorage.setItem("cart",JSON.stringify(state.cart))

           }
           toast.success("course removed from cart")
        },
        // reset cart
        setResetCart(state,action){
            state.token = action.payload;
        },
    },
});

 export const {setTotalItem,setAddCart,setRemoveCart,setResetCart} = cartSlice.actions;
export const cartReducer=cartSlice.reducer;