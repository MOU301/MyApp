import React, { useContext, useEffect, useReducer } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Context } from '../Context/Context'

const LayOut = () => {
  const {setLogin}=useContext(Context);
  const navigate=useNavigate();
  const styleActive=({isActive})=>{
   return isActive ? 'text-danger':'text-black'
  }
  useEffect(()=>{
const token=localStorage.getItem('token');
const role=localStorage.getItem('role');
if(!token || role!='super_admin'){ 
  window.location.href = "http://localhost:5173/login"; // Back to login

}
  },[])
  const logout=()=>{
    //send to back end to delete token from database 
    // if ok set login false 
    setLogin(false);
    localStorage.clear();
     navigate('/');
  }
  return (
   <>
   <div className='container'>
    <div className='d-flex justify-content-between my-3'>
      <ul className="list-group list-group-horizontal">
          <li className="list-group-item"><NavLink className={styleActive} to='/user' ><strong>User</strong></NavLink></li>
          <li className="list-group-item"><NavLink className={styleActive} to='/courses' ><strong>Courses</strong></NavLink></li>
          <li className="list-group-item"><NavLink className={styleActive} to='/slider' ><strong>Slider</strong></NavLink></li>
          <li className="list-group-item"><NavLink className={styleActive} to='/views' ><strong>Views</strong></NavLink></li>
          <li className='list-group-item'><NavLink className={styleActive} to='/message'><strong>Messages</strong></NavLink></li>
          <li className='list-group-item'><a href="http://localhost:5173"><strong>Main</strong></a></li>
      </ul>
      <div><button className='btn btn-danger' onClick={()=>logout()}> logout</button></div>
    </div>
    <Outlet/>
    </div>
   </>
  )
}

export default LayOut
