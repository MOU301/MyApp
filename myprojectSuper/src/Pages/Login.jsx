import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Api/api';

const Login = () => {
    const [user,setUser]=useState({'email':'','password':''});  
    const {login,setLogin,setSuperInfo}=useContext(Context);
    const navigate=useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
    
      if (!token || role !== "admin") {
        window.location.href = "http://localhost:5173"; // Back to login
      }else{
        navigate('/courses')
      }
    }, []);
    const Submit=async(e)=>{
        e.preventDefault();
        if(user.email!='' && user.password!=''){
          await axiosInstance.post('/login',{...user},{
            headers : {
              'Content-Type':'application/json'
            }
          }).then((res)=>{
            if(res.data.message=='success'){
                localStorage.setItem('token',res.data.data.token);
                localStorage.setItem('id',res.data.data.id);
                localStorage.setItem('name',res.data.data.name);
                localStorage.setItem('email',res.data.data.email);
                setLogin(true);
                setSuperInfo(res.data.data);
                navigate('/user');
            }
          }).catch(error=>console.log(error));
    
        }
        
 
    }

    const handlInput=(e)=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value})
    }
  
  return (
    <section className='my-5 login'>
      <div className='container'>
        <div className="h-80 d-flex justify-content-center align-items-center align-content-center">
           <form onSubmit={Submit} className='border p-2'>
            <h4 className='text-center text-danger'><strong>login</strong></h4>
            
            <div className='my-2'>
              <label className='my-2' htmlFor="email"><strong>Email :</strong> </label>
              <input type="email" className='form-control' onChange={(e)=>handlInput(e)} value={user.email} name='email' placeholder='Enter Email' required/>
            </div>
            
            <div className='my-2'>
              <label className='my-2' htmlFor="email"><strong>Password :</strong> </label>
              <input type="password" className='form-control' onChange={(e)=>handlInput(e)} value={user.password} name='password' placeholder='******' required/>
            </div>
            
            <button className='btn btn-success' type='submit'>login</button>
           </form>
        </div>
       </div>
    </section>
  )
}

export default Login
