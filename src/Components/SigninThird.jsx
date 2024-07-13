import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import { useSelector , useDispatch } from 'react-redux';
import { SignInStart, SignInThirdError, SignInThirdStep } from '../redux/user/userSlice';
import {app} from '../firebase.js'
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set } from 'firebase/database';
import SignInLeftPart from './SignInLeftPart.jsx';

export default function SigninThird({setUser,user}) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleInput=(e)=>{
    setUser((prev)=>({...prev,[e.target.name]:e.target.value}));
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(SignInStart());
      const res=await fetch('/api/user/addUser',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(user)
      });
      const data=await res.json();
      if(!res.ok){
        console.log(data.message);
        dispatch(SignInThirdError(data.message));
        return;
      }
      dispatch(SignInThirdStep(data));
      navigate('/');
    } catch (error) {
      console.log(error);
      dispatch(SignInThirdError(error.message));
    }
  }
  return (
    <div className="flex flex-col md:flex-row min-h-min">
        <SignInLeftPart/>
        <div className="w-full p-5 sm:p-10 h-1/2 md:w-1/2 md:h-screen flex flex-col gap-4 ">
            <div className="w-full">
                <img src="/Frame 6.png" alt="ailusionLogo" />
            </div>
            <div className="w-full md:p-10 flex flex-col gap-4">
                <h1 className='text-3xl font-bold'>Last few steps,</h1>
                <p className='text-gray-500 font-medium'>Tell us more about yourself</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <TextField required onChange={handleInput} error={false} name="companyName" label="Company Name" variant="outlined" />
                <TextField required onChange={handleInput} name="companyPostion" label="Your Position" variant="outlined" />
                <FormControl onChange={handleInput} fullWidth>
                  <InputLabel id="companySize">Company Size</InputLabel>
                  <Select
                    required
                    labelId="companySize"
                    name="companySize"
                    label="Company Size"
                    value={user.companySize || ''}
                    onChange={handleInput}
                  >
                    <MenuItem value={'1-10'}>1-10</MenuItem>
                    <MenuItem value={'11-50'}>11-50</MenuItem>
                    <MenuItem value={'51-100'}>51-100</MenuItem>
                    <MenuItem value={'100+'}>100+</MenuItem>
                  </Select>
                </FormControl>
                <button type='submit' className='py-2 bg-[#5A48C6] text-white font-semibold rounded-sm'>Continue</button>
                </form>
            </div>
        </div>
    </div>
  )
}
