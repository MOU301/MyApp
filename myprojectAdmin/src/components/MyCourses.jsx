import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import axiosInstance from '../Api/api';
const MyCourses = () => {
    const {mycourses,login,back,adminInfo}=useContext(Context);
    const navigate=useNavigate();

  
    useEffect(()=>{
  
      if (!token || role !== "admin") {
        window.location.href = "http://localhost:5173/login"; // Back to login
      }
    },[])

  return  (
    <>
      
        <section className='my-5'>
            <div className="container">
            <NavLink to='/home' className='btn btn-success'>Home</NavLink>
             <div className="row my-3">
                { mycourses.length>0 ?
                mycourses.map((item,index)=><div className="col-12 col-sm-6 col-md-4" key={index}>
                    <div className="card">
                      <div className='imageCard'>
                         <img src={item.bostter} className="card-img-top" />
                      </div>
                    <div className="card-body">
                     <strong className='text-danger'>title : </strong> <span>{item.title}</span><br/>
                     <strong className='text-danger'>users : </strong> <span>{item.users}</span><br/>
                     <strong className='text-danger'>price : </strong> <span>{item.price}</span><br/>
                     <strong className='text-danger'>state : </strong> <span>{item.state ? <span className='text-success'>agree</span>:<span className='text-danger'>not agree</span>}</span><br/>
                     <NavLink className='btn btn-success my-3' to={`/course/${item.id}`} >show</NavLink>
                    </div>
                    </div>
                </div>) :<h4 className='text-center text-danger'> you have not courses !!!</h4>} 
             </div>
            </div>
        </section>
    </>
  )
}

export default MyCourses
