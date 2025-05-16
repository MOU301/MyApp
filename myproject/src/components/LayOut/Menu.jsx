import React from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { NavLink } from 'react-router';
import { useContext } from 'react';
import { Context} from '../../Context/Context';
const Menu = ({handling}) => {
  const {next,login}=useContext(Context)
  return (
   <div className='menu dnone'>
    <div className="close">
        <IoCloseCircle onClick={()=>handling()} className='icon fs-2 text-white'/>
        </div>
       <div className="menu-list d-flex justify-content-center align-items-center">
       <ul className='list-group '>
                <li className='list-group-item my-3'>
                  <NavLink to='/' onClick={()=>handling()} className='nav-link text-black' ><strong>Home</strong></NavLink>
                </li>
                <li className='list-group-item my-3'>
                  <NavLink to='/courses' onClick={()=>handling()} className='nav-link text-black' ><strong>Courses</strong></NavLink>
                </li>
                <li className='list-group-item my-3'>
                  <NavLink  to={login ? '/logout':'/login'} onClick={()=>handling()} className=' bg-success w-100 text-white btn'><strong>{!login ? 'Login':'Log Out'}</strong></NavLink>
                </li>        
       </ul>
       </div>
   </div>
  )
}

export default Menu