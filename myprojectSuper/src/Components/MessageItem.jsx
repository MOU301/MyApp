import axios from 'axios';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../Api/api';
import ReMessage from './ReMessage';

const MessageItem = ({index,message,change,remove}) => {
    const [read,setRead]=useState(false);
    const [rePlay,setRePlay]=useState(false);

    const readMessage=async(index,id)=>{
           await axiosInstance.put(`/readmessage/${id}`)
                .then(res=>{
                  if(res.data.message=='success'){
                    change(index);
                  }})
                .catch(error=>console.log(error));
            }
  const removeMessage=async(index,id)=>{
     await axiosInstance.delete(`/removeMessage/${id}`)
                         .then(res=>{
                          if(res.data.message=='success'){
                            remove(index);
                          }
                         }).catch(error=>console.log(error));
  }
  
   
  return (
    <div className='border p-2 m-2'>
      <div className='d-flex justify-content-between align-content-center align-items-center' ><strong onClick={()=>setRead(e=>!e)}>{message.name}</strong>
      </div>
      {read ? 
      <div>
        <div className='d-flex justify-content-between align-content-center align-items-center'>
           <p>{message.message}</p> 
               {message.status==0 ? <div>
                <button className='btn btn-dark mx-2' onClick={()=>setRePlay(e=>!e)}>replay</button>
                <button className='btn btn-success' onClick={()=>readMessage(index,message.id)}>ok</button>
            
            </div>
               :
            <button className='btn btn-danger' onClick={()=>removeMessage(index,message.id)}>remove</button>

            }
        </div>
        {rePlay ? 
            <ReMessage email={message.email}/>
            :''}
      </div>
      :'' }
      <br/>
      
    </div>
  )
}

export default MessageItem
