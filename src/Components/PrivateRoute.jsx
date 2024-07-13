import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { LogOutUser } from '../redux/user/userSlice.js';

export default function PrivateRoute(){
    const {currUser}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    useEffect(()=>{
        async function CookieValidator(){
            try {
                const res=await fetch('/api/user/checkCooke');
                const data=await res.json();
                if(!res.ok){
                    dispatch(LogOutUser());
                    return;
                }
                return;
            } catch (error) {
                dispatch(LogOutUser());
                return;
            }
        }
        if(currUser && currUser.isAuthenticate){
            CookieValidator();
        }
    },[])
    return(
       <>
           {currUser && currUser.isAuthenticate ? <Outlet/> : <Navigate to={'/logIn'}/>}
       </>
    )
}