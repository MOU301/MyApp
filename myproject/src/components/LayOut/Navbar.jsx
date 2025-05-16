import React, { useContext, useEffect, useState } from 'react'

import { TiThMenuOutline } from "react-icons/ti";
import Menu from './Menu';
import './navbar.css'
import { NavLink } from 'react-router';
import {Context} from '../../Context/Context'

const Navbar = () => {
  const {next,login,pathName,part}=useContext(Context)
  const pattern = /^\/course\/\d+\/lesson\/\d+$/;
  
  const handling=()=>{
    let menu=document.getElementsByClassName('menu')[0];
    menu.classList.contains('dblock') ?
     (menu.classList.remove('dblock'),menu.classList.add('dnone'))
     :
     (menu.classList.add('dblock'),menu.classList.remove('dnone'))
  }
  return (
     <section className={(next==null) ?  'one':(pattern.test(pathName) ? 'd-none':'one')} id='home'>
       <Menu handling={handling}/>
       <div className="container">
           <div className="d-flex justify-content-between align-content-center align-items-center">
            
            <div  className="logo "><strong><span className='text-white'>For</span><span className='text-danger'>You</span></strong></div>
             <TiThMenuOutline onClick={(()=>handling())} className='icons fs-1 text-warning'/>
            <div className="links">
            <ul className='list-group list-group-horizontal'>
                <li className='list-group-item '>
                  <NavLink to='/' className='nav-link' >Home</NavLink>
                </li>
               
                <li className='list-group-item'>
                  <NavLink to="/courses" className='nav-link'>Courses</NavLink>
                </li>
                
                <li className='list-group-item'>
                  <NavLink to={login ? '/logout':'/login'} className=' bg-white text-dark btn'>{!login ? 'Login':'Log Out'}</NavLink>
                </li>      
              </ul>
            </div>
           </div>
       </div>
     </section>
  )
}

export default Navbar