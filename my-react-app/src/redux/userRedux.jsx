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
        },
    },
);
//console.log("kk ",userSlice);

export const {loginStart,loginSuccess,loginFailure} = userSlice.actions;
export default userSlice.reducer;