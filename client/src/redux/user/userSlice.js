
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
};


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        SignInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false ; 
            state.error=null;
           
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteUserStart:(state)=>{
     state.loading=true;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser= null;
            state.loading=false;
            state.error=null;
        },
        deleteUserFailure:(state)=>{
            state.loading=false;
            state.error=null;
        },
           signoutUserStart:(state)=>{
           state.loading=true;
        },
        signoutUserSuccess:(state)=>{
            state.currentUser= null;
            state.loading=false;
            state.error=null;
        },
        signoutUserFailure:(state)=>{
            state.loading=false;
            state.error=null;
        },
    }

});

export const {signInStart,signInSuccess,SignInFailure,updateUserStart,updateUserSuccess,updateUserFailure,deleteUserFailure,deleteUserSuccess,deleteUserStart,signoutUserFailure,signoutUserSuccess,signoutUserStart}=userSlice.actions;
export default userSlice.reducer;