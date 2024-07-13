import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import {SignInFirstError, SignInSecondStep, SignInStart , CloseError} from '../redux/user/userSlice.js'
import { useDispatch, useSelector} from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import SignInLeftPart from './SignInLeftPart.jsx';
import HashLoader from "react-spinners/HashLoader";


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "gray",
};
  
export default function LogIn() {
  const [email,setEmail]=useState();
  const {loading}=useSelector(state=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const {error}=useSelector(state=>state.user);
  const handleClossError=()=>{
    dispatch(CloseError());
  }
  async function handleSignInFirst(e){
    e.preventDefault();
    try{
        dispatch(SignInStart());
        const res=await fetch('/api/user/logIn',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email})
        });
        const data=await res.json();
        if(!res.ok){
            dispatch(SignInFirstError(data.message));
            console.log(data.message);
            return;
        }
        console.log(data);
        dispatch(SignInSecondStep(data));
        navigate('/');
        return;
    }catch(err){
        dispatch(SignInFirstError(data.message));
        console.log(err);
        return;
    }
  }
  return (
    <>

    {loading ? 
       (<div className="mx-auto mt-40">
        <HashLoader
           color={'#5A48C6'}
           loading={loading}
           size={60}
           cssOverride={override}
           aria-label="Loading Spinner"
           data-testid="loader"
           className=''
         />
        </div>):
    (<div className="flex flex-col md:flex-row min-h-min">
        <SignInLeftPart/>
        <div className={`w-full p-5 sm:p-10 h-1/2 md:w-1/2 md:h-screen flex flex-col ${!error && 'gap-16'}`}>
            <Link to={'/'} className="w-full">
                <img src="/Frame 6.png" alt="ailusionLogo" />
            </Link>
            <div className="w-full md:p-10 flex flex-col gap-4">
                {error && <div className='flex items-center justify-between bg-red-300 p-3 rounded-md'>
                    <h1 className='text-center font-bold text-red-600'>{error}</h1>
                    <CloseIcon onClick={handleClossError} className='text-red-600 hover:border-2 hover:border-red-600'/>    
                </div>}
                <div className="">
                    <img className='w-40' src="/Hi there 👋,.png" alt="hii logo" />
                </div>
                <p className='text-gray-500 text-base font-medium'>Lets get started with Ailusion!</p>
                <div className="text-center text-gray-700 text-sm flex items-center justify-between">
                    <div className="border-b-2 border-gray-400 w-20"></div>
                    <div className="font-semibold md:text-base text-sm">LogIn with Email</div>
                    <div className="border-b-2 border-gray-400 w-20"></div>
                </div>
                <form onSubmit={handleSignInFirst} className='flex flex-col gap-4'>
                    <TextField error={error} type='email' id="emailId" label="Email Id" value={email||''} variant="outlined" required onChange={(e)=>setEmail(e.target.value)}/>
                    <button type='submit' className='bg-[#5A48C6] text-white py-2 rounded-sm'>Continue</button>
                </form>
                <p className='text-gray-700'>Don't Have an Account ? <Link className='text-[#5A48C6] font-semibold' to={'/signup'}>SignUp</Link></p>
            </div>
        </div>
    </div>)
   }
    </>
  )
}
