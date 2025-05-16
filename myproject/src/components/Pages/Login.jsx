import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'
import { NavLink, useNavigate } from 'react-router';
import Form from '../Elements/Form';
import axiosInstance from '../../API/Api';
const Login = () => {
    const {setLogin,pathName,setUserInfo,setMessage}=useContext(Context);
    const [loginInfo,setLoginInfo]=useState({'email':'',"password":""});
    const navigate=useNavigate();
    const handlLogin=async (e)=>{
      e.preventDefault();
      if(loginInfo.email!='' && loginInfo.password!=''){
        await axiosInstance.post(`/login`,{...loginInfo})
                               .then(res=>{

                                if(res.data.message=='success'){
                                  setUserInfo(res.data.data);
                                  localStorage.setItem('id',res.data.data.id);
                                  localStorage.setItem('email',res.data.data.email);
                                  localStorage.setItem("token",res.data.data.token)
                                  localStorage.setItem('role',res.data.data.role);
                                  setLogin(true);
                                  setMessage('');
                                  switch (res.data.data.role) {
                                    case 'admin':
                                      window.location.href = 'http://localhost:5174'; // Admin app
                                      break;
                                    case 'super_admin':
                                      window.location.href = 'http://localhost:5175'; // Super admin app
                                      break;
                                    default:
                                      navigate(pathName ?? '/'); // Stay in myproject
                                  }
                                  
                                  // navigate(pathName ?? '/');
                                }else{
                                  setMessage(res.data.message)
                                }
                              })
                                .catch(error=>console.log(error)); 
      }else{
       setMessage('fill the field ')
      }

    }
    const handlInput=(e)=>{
      const {name,value}=e.target;
      setLoginInfo({...loginInfo,[name]:value});
    }
  return (
    
       <Form type='login' handlInput={handlInput} handlLogin={handlLogin}>
       
            <NavLink to='/createAcount' className='btn btn-success'  >Create  New Acount </NavLink>
   
       </Form>

  )
}

export default Login
