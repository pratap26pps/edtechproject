import {createSlice} from "@reduxjs/toolkit"

const initialState={
    step:1,
    course:[],
    editcourse:false,
    paymentLoading:false
    
} ;

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep(state,action){
            state.step = action.payload;
        },
        setCourse(state,action){
            state.course = action.payload;
        },
        setEditCourse(state,action){
            state.editcourse = action.payload;
        },
        setPaymentLoading(state,action){
            state.paymentLoading = action.payload;
        },
        resetCourseState(state,action){
             state.step = 1,
             state.course = null,
             state.editcourse= null
        },
    },
});

 export const {setStep, setCourse, setEditCourse, setPaymentLoading,resetCourseState} =
  courseSlice.actions;
export const courseReducer = courseSlice.reducer;

