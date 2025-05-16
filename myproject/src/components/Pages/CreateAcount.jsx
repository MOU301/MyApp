import React, { useContext, useState } from 'react'
import Form from '../Elements/Form'
import { useNavigate } from 'react-router'
import { Context } from '../../Context/Context'
import axiosInstance from '../../API/Api'
import axios from 'axios'

const CreateAcount = () => {
  const navigate=useNavigate()
  const {setPathName,setMessage,message}=useContext(Context);
  const [register,setRegister]=useState({'name':'','email':'','password':''});
  const handlCreate=async(e)=>{
    e.preventDefault();
    if(register.name!='' && register.email!='' && register.password!=''){

       await axios.post(`http://127.0.0.1:8000/api/users`,{...register})
                             .then(res=>{
                              if(res.data.message=='success'){
                                navigate('/login');
                                setMessage('');
                              }else{
                                setMessage(res.data.message)
                              }
                             }).catch(error=>console.log(error));
    }else{
     
    }
    
    // navigate('/login');
  }
  const handlRegister=(e)=>{
    const {name,value}=e.target;
    setRegister({...register,[name]:value});
  }
  return (
    <Form type='createAcount' handlRegister={handlRegister} handlCreate={handlCreate}>
      
    </Form>
 
  )
}

export default CreateAcount
