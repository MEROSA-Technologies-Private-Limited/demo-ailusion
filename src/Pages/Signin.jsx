import React from 'react'
import SignInFirst from '../Components/SignInFirst'
import SigninSecond from '../Components/SigninSecond'
import SigninThird from '../Components/SigninThird'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "gray",
};

export default function Signin() {
  const {currUser,loading}=useSelector(state=>state.user);
  const [user,setUser]=useState(currUser || {});
  const {firstStep,secondStep,thirdStep}=useSelector((state)=>state.user);
  
  return (
    <>
      {firstStep && <SignInFirst setUser={setUser} user={user}/>}
      {secondStep && <SigninSecond setUser={setUser} user={user}/>}
      {thirdStep && <SigninThird setUser={setUser} user={user}/>}
      {loading && <div className="mx-auto mt-40">
        <HashLoader
          color={'#5A48C6'}
          loading={loading}
          size={60}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
          className=''
        />
      </div>}
    </>
  )
}
