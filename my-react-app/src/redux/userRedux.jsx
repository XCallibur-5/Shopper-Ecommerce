import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser : null,
        isFetching:false,
        error:false,
    },
    reducers:{
        loginStart:(state)=>{
            //console.log(state);
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            //console.log("j  ", action.payload);
            state.isFetching=false;
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            
            state.isFetching= false;
            state.error=true;
        },
        logoutStart:(state)=>{
            
            state.isFetching=true;
            
        },
        logoutSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=null;
            state.error=false;
        },
        },
    },
);


export const {loginStart,loginSuccess,loginFailure,logoutStart,logoutSuccess} = userSlice.actions;
export default userSlice.reducer;