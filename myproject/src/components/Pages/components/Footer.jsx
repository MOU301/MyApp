import React, { useContext, useEffect, useState } from 'react'
import { FaFacebookMessenger } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { Context } from '../../../Context/Context';

import axiosInstance from '../../../API/Api';

const Footer = () => {
const {login,userInfo}=useContext(Context);
  const [dataMessage,SetDatMessage]=useState({"user_id":'',"email":"","message":""});
  const [messageSend,setMessageSend]=useState('');

  useEffect(()=>{
      if(login){
        SetDatMessage({
          'user_id':userInfo.id,
          'aemail':userInfo.email,
          "message":'',
        })
      }
     },[login]) 
  const handleData =(e)=>{
    const {name,value}=e.target;
    SetDatMessage({
      ...dataMessage,
      [name]:value
  })
  }
  const addMessage=async (dataMessage)=>{
   return await axiosInstance.post(`/addmessage`,{...dataMessage})
  }
  const handlemessage=async (e)=>{
  e.preventDefault();
                addMessage(dataMessage).then(res=>{
                        
                        setMessageSend(res.data.message);
                      }).catch(error=>console.log(error))
    

  }
 useEffect(()=>{
 },[messageSend])
  return (
    <section className=' my-5 bg-orange contact'>
        <div className='container py-3'>
        <h3 className='text-white text-center'><strong className='text-red'>Contact Us</strong></h3>
     <div className="row p-5">
        <div className="col-12 col-sm-6">
          <ul >
            <li className='my-3'><a href=""><strong><FaFacebookMessenger className=' mx-3'/>Massanger</strong></a></li>
            <li className='my-3'><a href=""><strong><IoLogoInstagram className='mx-3'/>Instgram</strong></a></li>
            <li className='my-3'><a href=""><strong><TfiEmail className='mx-3'/>Email</strong></a></li>
          </ul>
        </div>
        {login ? (
        <div className="col-12 col-sm-6">
            <form onSubmit={handlemessage} >
             {messageSend!='' ?  <div className={`message text-white text-center border-5 ${messageSend!='success' ? 'bg-danger':'bg-success'}`}>{messageSend}</div>:''}
              <div className='my-3'>
                <label className='text-white' htmlFor="email">Email : </label>
                <input className='form-control' type="email" defaultValue={dataMessage.email}  placeholder='enter your email'/>
              </div>
              <div className='my-3'>
                <label className='text-white' htmlFor="message">The Message :  </label>
                <textarea className='form-control' value={dataMessage.message} onChange={(e)=>handleData(e)} name="message" rows='5' placeholder='Enter your message'></textarea>
              </div>
              <div>
                <button type='sumbit' className='btn btn-black text-white w-100 my-3' >Send</button>
              </div>
            </form>
        </div>
        ):''}
     </div>
     </div>
     </section>
  )
}

export default Footer
