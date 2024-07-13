import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { SignInSecondStep ,SignInSecondCompay, SignInThirdStep, SignInStart, SignInSecondError } from '../redux/user/userSlice';

import SignInLeftPart from './SignInLeftPart.jsx';

export default function SigninSecond({setUser,user}) {
  const {currUser}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleInput=(e)=>{
      setUser({...user,[e.target.id]:e.target.value});
  }
  const handleSubmit=async(e)=>{
      e.preventDefault();
      if(currUser.isCompanyMail){
        dispatch(SignInStart());
        dispatch(SignInSecondCompay(user));
      }else{
          try {
            dispatch(SignInStart());
            const res=await fetch('/api/user/addUser',{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify(user)
            });
            const data=await res.json();
            if(!res.ok){
              dispatch(SignInSecondError(data.message));
              console.log(data.message);
              return;
            }
            dispatch(SignInSecondStep(data));
            navigate('/');
            return;
          } catch (error) {
            console.log(error);
            dispatch(SignInSecondError(error.message));
            return;
          }
      }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-min">
        <SignInLeftPart/>
        <div className="w-full p-5 sm:p-10 h-1/2 md:w-1/2 md:h-screen flex flex-col gap-4 ">
            <div className="w-full">
                <img src="/Frame 6.png" alt="ailusionLogo" />
            </div>
            <div className="w-full md:p-10 flex flex-col gap-6">
                <h1 className='text-3xl font-bold'>Last few steps,</h1>
                <p className='text-gray-500 font-medium'>Tell us more about yourself</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <TextField 
                    value={user.email ? user.email : ''} 
                    error={false} id="outlined-basic" 
                    label="EmailId" 
                    variant="outlined"
                    disabled
                />
                <TextField required onChange={handleInput} value={user.name || ''} id="name" label="Name" variant="outlined" />
                <TextField
                  required 
                  id="phoneNo" 
                  label="Phone Number" 
                  variant="outlined" 
                  onChange={handleInput}
                  value={user.phoneNo ? user.phoneNo : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src="/emojione_flag-for-india.png" alt="" />
                        <span className='mx-1'>91+</span>
                      </InputAdornment>
                    ),
                  }}
                />
                <button type='submit' className='py-2 bg-[#5A48C6] text-white font-semibold rounded-sm'>Continue</button>
                </form>
            </div>
        </div>
    </div>
  )
}
