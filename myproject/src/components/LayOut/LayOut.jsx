import React, { useContext } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
const LayOut = () => {
  
  return (
    <>
        <Navbar/> 
         <Outlet/>
        
    </>
  )
}

export default LayOut
