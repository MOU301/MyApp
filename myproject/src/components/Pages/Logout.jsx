import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'
import { useNavigate } from 'react-router';

const Logout = () => {
    const {setLogin,setMyCoursesData}=useContext(Context);
    const navigate=useNavigate()
   useEffect(()=>{
    localStorage.clear();
       setLogin(false);
       setMyCoursesData([])
       //request to logout to remove the token from database 
       navigate('/')
   },[])
  return (
    <div>
      logout
    </div>
  )
}

export default Logout
