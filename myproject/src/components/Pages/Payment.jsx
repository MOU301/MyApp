import React, { useContext, useState,useEffect } from 'react'
import { use } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Context } from '../../Context/Context';
import axios from 'axios';
const Payment = () => {
    const {userInfo}=useContext(Context);
    const [pay,setPay]=useState({'name':'','number':'','date':'','cvv':''});
    const {id}=useParams()
    const navigate=useNavigate();
    useEffect(()=>{
      if(localStorage.getItem('id')==null){
        navigate('/login');
      }
    },[])
    const handlPay=async()=>{

        const data={
            user_id:userInfo.id,
            course_id:id,
            payData:pay
        }
        return await axios.post(`http://127.0.0.1:8000/api/buyCourse`,data,{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              }).then((res)=>navigate(`/course/${id}`))
              .catch((error)=>console.log(error));
        //send request to pay if ok add the user_id and coures_id to course_user table
    }
    const handlInput=(e)=>{
      let {name,value}=e.target;
        setPay({...pay,[name]:value});
    }
  return (
   <section className='my-5'>
    <div className='container '>
        <div className='payment'>
            <div className="payment-container">
            <h2>Payment Details</h2>
            
            <div className="input-group">
                <label htmlFor="name">Cardholder Name</label>
                <input type="text" onChange={(e)=>handlInput(e)} name='name' id="name" placeholder="Momo"/>
            </div>

            <div className="input-group">
                <label htmlFor="card-number">Card Number</label>
                <input type="text" onChange={(e)=>handlInput(e)} name='number' id="card-number" placeholder="1234 5678 9012 3456" maxLength="19"/>
            </div>

            <div className="input-flex">
                <div className="input-group">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input type="text" onChange={(e)=>handlInput(e)} name='date' id="expiry" placeholder="MM/YY" maxLength="5"/>
                </div>
                <div className="input-group">
                    <label htmlFor="cvv">CVV</label>
                    <input type="password" onChange={(e)=>handlInput(e)} name='cvv' id="cvv" placeholder="123" maxLength="3"/>
                </div>
            </div>

            <button className="pay-btn" onClick={()=>handlPay()}>Pay Now</button>

            <div className="card-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa"/>
            </div>
        </div>
        </div>
    </div>
   </section>
  )
}

export default Payment;
