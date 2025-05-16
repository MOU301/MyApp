import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context'
import { useNavigate } from 'react-router-dom';
import Table from '../Components/Table';
import Spinner from '../Components/Spinner';



const User = () => {
  const {loading,users}=useContext(Context);
  const [userA,setUserA]=useState([]);
  const [userN,setUserN]=useState([]);
  const [active,setActive]=useState(false);
  const [unActive,setUnActive]=useState(false);
  

  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('id')==null){
      navigate('/')
    }else{
      
    }
  },[])
  useEffect(()=>{
    if(users.length>0){
      setUserA(users.filter(item=>item.courses!=null));
      setUserN(users.filter(item=>item.courses==null));
      }
  },[users]);

  return !loading ? (
    <section className='my-4'>
      <div className="container">
        <h4 className='text-center text-danger'><strong>all users</strong></h4>
        <div className='bg-success text-white px-2 my-2' onClick={()=>setActive(pre=>!pre)} >Active <span className='mx-5'>{userA.length}</span></div>
  
        {active ? <Table users={userA}/>:''}
        <div className='bg-danger text-white px-2 my-2' onClick={()=>setUnActive(pre=>!pre)}>Not Active <span className='mx-3'>{userN.length}</span></div>
         {unActive ? <Table users={userN}/>:''}
      </div>
      
    </section>
  ):<Spinner/>
}

export default User
