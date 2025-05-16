import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Context } from '../context/Context';
import axiosInstance from '../Api/api';
const Login = () => {
    const {setLogin,login,setAuthor,setAdminInfo}=useContext(Context);
const [loginInfo,setLoginInfo]=useState({'email':'','password':''});
const navigate=useNavigate();
useEffect(() => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    window.location.href = "http://localhost:5173/login"; // Back to login
  }
}, []);
const handlInput=(e)=>{
  const {name,value}=e.target;
  setLoginInfo({...loginInfo,[name]:value});
}

const Send=async ()=>{
    if(loginInfo.email!='' && loginInfo.password!=''){
       await axiosInstance.post('/login',{...loginInfo},{
        headers: {
          'Content-Type': 'application/json'
        },
      })
             .then((res)=>{
              
              if(res.data.message=='success'){
                localStorage.setItem('token',res.data.data.token);
                localStorage.setItem('id',res.data.data.id);
                localStorage.setItem('name',res.data.data.name);
                localStorage.setItem('email',res.data.data.email);
                setLogin(true);
                setAdminInfo(res.data.data);
                navigate('/home');
              }
            })
             .catch(error=>console.log(error));   
    }else{
        console.log('fill the data now');
    }
    
}
  return login ? '':(
  <section >
    <div className="container">
        <div className='login d-flex justify-content-center align-items-center align-content-center'>
            <div className=' p-2'>
              <h4 className='text-danger text-center'><strong>login</strong></h4>
               <div className='my-3'>
                <label htmlFor="email"><strong>Email :</strong> </label>
                <input className='form-control' onChange={(e)=>handlInput(e)} name='email' type="text" placeholder='Email@gmail.com'/>
               </div>

               <div className='my-3'>
                <label htmlFor="email"><strong>Password :</strong> </label>
                <input type="password" onChange={(e)=>handlInput(e)} name='password' className='form-control'  placeholder='*******'/>
               </div>
              <button className='btn btn-success' onClick={()=>Send()}><strong>login</strong></button>
            </div>
        </div>
    </div>
  </section>
  )
}

export default Login
