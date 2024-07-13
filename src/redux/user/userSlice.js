import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currUser:null,
    firstStep:true,
    secondStep:false,
    thirdStep:false,
    loading:false,
    error:null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SignInFirstStep:(state,action)=>{
        state.currUser=action.payload;
        state.firstStep=false;
        state.secondStep=true;
        state.thirdStep=false;
        state.error=null;
        state.loading=false;
    },
    SignInSecondStep:(state,action)=>{
        state.currUser=action.payload;
        state.firstStep=false;
        state.secondStep=false;
        state.thirdStep=false;
        state.error=null;
        state.loading=false;
    },
    SignInSecondCompay:(state,action)=>{
        state.currUser=action.payload;
        state.firstStep=false;
        state.secondStep=false;
        state.thirdStep=true;
        state.error=null;
        state.loading=false;
    },
    SignInThirdStep:(state,action)=>{
        state.currUser=action.payload;
        state.firstStep=false;
        state.secondStep=false;
        state.thirdStep=false;
        state.error=null;
        state.loading=false;
    },
    SignInFirstError:(state,action)=>{
        state.firstStep=true;
        state.secondStep=false;
        state.thirdStep=false;
        state.error=action.payload;
        state.loading=false;
    },
    SignInSecondError:(state,action)=>{
        state.firstStep=false;
        state.secondStep=true;
        state.thirdStep=false;
        state.error=action.payload;
        state.loading=false;
    },
    SignInThirdError:(state,action)=>{
        state.firstStep=false;
        state.secondStep=false;
        state.thirdStep=true;
        state.error=action.payload;
        state.loading=false;
    },
    SignInStart:(state,action)=>{
        state.firstStep=false;
        state.secondStep=false;
        state.thirdStep=false;
        state.error=null;
        state.loading=true;
    },
    LogOutUser:(state,action)=>{
        state.currUser=null;
        state.firstStep=true;
        state.secondStep=false;
        state.thirdStep=false;
        state.error=null;
        state.loading=false;
    },
    CloseError:(state)=>{
        state.error=null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { LogOutUser,CloseError, SignInFirstStep, SignInStart,SignInSecondStep,SignInThirdStep,SignInFirstError,SignInSecondError,SignInThirdError,SignInSecondCompay } = userSlice.actions

export default userSlice.reducer;