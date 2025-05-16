import React, { useState } from 'react'
import axiosInstance from '../Api/api';

const ReMessage = ({email}) => {
    const [reMessage,setReMessage]=useState({"user_email":email,"message":''});
    const handlMessage=(e)=>{
      const {name,value}=e.target;
      setReMessage(prev=>({
        ...prev,
        [name]:value
      })) 

    }
    const ReMessage=async(e)=>{
        e.preventDefault();
        await axiosInstance.post(`/send-email`,reMessage)
                            .then(res=>{
                              console.log(res.data)
                            })
                            .catch(error=>console.log(error))
    }
  return (
    <form className='mb-3' onSubmit={ReMessage}>
       <textarea className='form-control my-2' onChange={(e)=>handlMessage(e)}  name="message"  placeholder='Re message to user by email'></textarea>
      {reMessage.message!='' ?  <button className='btn btn-success' type='submit'>Send</button>:''}
    </form>
  )
}

export default ReMessage
