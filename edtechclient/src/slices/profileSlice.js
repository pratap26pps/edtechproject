import {createSlice} from "@reduxjs/toolkit"

const initialState={
    loading:false,
    user:{}, 
};

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,action){
            state.user = action.payload;
        },
         setLoading(state,action){
            state.loading = action.payload;
        },
    },  
});

 export const {setUser,setLoading} = profileSlice.actions;
export const profileReducer= profileSlice.reducer;