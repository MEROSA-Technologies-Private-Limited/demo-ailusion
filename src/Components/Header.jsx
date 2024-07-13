import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LogOutUser} from '../redux/user/userSlice.js'

export default function Header() {
  const {currUser}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  async function handleLogOut() {
     try {
        const res=await fetch('/api/user/logOut',{method:'POST'});
        const data=await res.json();
        if(!res.ok){
          console.log(data.message);
        }
        dispatch(LogOutUser());
     } catch (error) {
       console.log(err);
     }
  }
  return (
    <>
      { currUser && currUser.isAuthenticate && 
      <div className="flex flex-row items-center justify-between gap-2 py-1 px-5">
        <div className="">
          <h1 className='text-md sm:text-xl font-bold'>AILUSION VTON DEMO 👕👔👚</h1>
          <p className='text-sm text-gray-500 mt-1'>Virtual Try-on with your image and garment image.</p>
        </div>
        <button onClick={handleLogOut} className=' text-sm md:text-md py-1 px-4 bg-[#5A48C6] text-white font-semibold rounded-sm'>Log out</button>
      </div>
      }
    </>
  )
}
