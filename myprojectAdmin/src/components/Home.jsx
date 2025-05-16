import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { Context } from '../context/Context'
import axiosInstance from '../Api/api'
import axios from 'axios'


const Home = () => {
  const {setLogin,mycourses,login}=useContext(Context)
  const navigate=useNavigate();
 useEffect(() => {
   const token = localStorage.getItem("token");
   const role = localStorage.getItem("role");
 
   if (!token || role !== "admin") {
     window.location.href = "http://localhost:5173/login"; // Back to login
   }
 }, []);
  const logout=async()=>{
    // localStorage.clear();
  await axios.post(`http://127.0.0.1:8000/api/logout`,{},{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
                 .then(res=>{
                  if(res.data.message=='success'){
                    setLogin(false)
                    localStorage.clear();
                    navigate('/')
                  }
                 }).catch(error=>console.log('there is error broder'));
               
  }
  useEffect(()=>{

  },[mycourses])
  return login ?  (
   <section className='my-3'>
    <div className='container'>
       <div className="d-flex justify-content-between">
         <div>
              <NavLink to='/addCourse' className='btn btn-success mx-2'>add course</NavLink>
       {mycourses.length>0 ? <NavLink to='/myCourses' className='btn btn-success'>my courses</NavLink>:''}
          </div>
          <div>
            <a href="http://localhost:5173"><strong>Main</strong></a>
            <button onClick={()=>logout()} className='btn btn-danger'> logout</button></div>
       
       </div>
    </div>
   </section>
  ):'';
}

export default Home
