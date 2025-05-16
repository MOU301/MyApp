import React, { useContext, useEffect, useState } from 'react'
import Views from '../Components/Views'
import { Context } from '../Context/Context';
import Spinner from '../Components/Spinner';

const ViewsPage = () => {
  const {views,loading}=useContext(Context);
   useEffect(()=>{
      if(localStorage.getItem('id')==null){
        navigate('/');
         }
    },[]);
  return !loading ? ( 
    <section> 
        <div className="container">
         {views ?  <Views views={views}/>:''}
        </div>
    </section>
  ):<Spinner/>
}

export default ViewsPage
