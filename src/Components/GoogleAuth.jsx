import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase.js'
import {useDispatch} from 'react-redux'
import {SignInFirstError, SignInSecondStep, SignInStart , CloseError} from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'
export default function GoogleAuth() {
  const auth=getAuth(app);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  async function handleGoogleAuth() {
      const provider=new GoogleAuthProvider();
      provider.getCustomParameters({prompt:'select_account'});
      try{
          const resultFromGoogle=await signInWithPopup(auth,provider);
          dispatch(SignInStart());
          const authUser={
            'email':resultFromGoogle.user.email,
            'name':resultFromGoogle.user.displayName
          }
          authUser.isCompanyMail=false;
          const res=await fetch('/api/user/googleAuth',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(authUser)
          });
          const data=await res.json();
          console.log(data);
          if(!res.ok){
            dispatch(SignInFirstError(data.message));
            return;
          }
          dispatch(SignInSecondStep(data));
          navigate('/');
      }
      catch(err){
        console.log(err);
        dispatch(SignInFirstError());
      }
  }
  return (
    <button onClick={handleGoogleAuth} className="border-2 border-gray-400 rounded-md px-3 py-2 flex gap-2 items-center justify-center">
        <img src="/flat-color-icons_google.png" alt="google" />
        <p className='font-semibold'>Sign up with Google</p>
    </button>
  )
}
