import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import View from './View';
import axiosInstance from '../Api/api';

const Views = ({views}) => {
    const [views1,setViews1]=useState([]);
    const [viewsA,setViewsA]=useState([]);
    const [viewsN,setViewsN]=useState([]);
    const [active,setActive]=useState(false);
    const [unActive,setUnActive]=useState(false);
    const [updateArr,setUpdateArr]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
       setViews1(views)
    },[])
    useEffect(()=>{
        const Active=views1.filter(item=>item.state==true);
        setViewsA(Active);
        const Nactive=views1.filter(item=>item.state==false);
        setViewsN(Nactive);
        const arr=views.slice();
        const updateArr1= views1.filter(
         (oele) => arr.find((nele) => nele.id === oele.id)?.state !== oele.state
       );
       if(updateArr1.length>0){
        setUpdateArr(updateArr1);
       }
    },[views1]);
  
    const handlAccept=(id)=>{
    
        setViews1(pre =>
            pre.map(item =>
              item.id === id ? { ...item, state: !item.state } : item
            )
          ); 
    }
    const Update=async()=>{
     await axiosInstance.put(`/updateView`,{views:updateArr})
                             .then(setUpdateArr([]))
                             .catch();
    }
  return (
    <div className='my-5'>
       <div>
            <h4 className='text-center text-danger'><strong>all the views</strong></h4>
        {updateArr.length>0 ? <button onClick={()=>Update()} className='btn btn-success'>update</button>:''}
       </div>
      <div onClick={()=>setActive(pre=>!pre)} className='bg-success text-white px-2 my-3'><strong>Active</strong><span className='mx-5'>{viewsA.length}</span></div>
     {active ?  viewsA.map((item,index)=><View handlAccept={handlAccept} item={item} key={index}/>) : ''}
      <div onClick={()=>setUnActive(pre=>!pre)} className='bg-danger text-white px-2 my-3'><strong>Not Active</strong><span className='mx-3'>{viewsN.length}</span></div>
      {unActive ? viewsN.map((item,index)=><View handlAccept={handlAccept} item={item} key={index}/>):''}
    </div>
  )
}

export default Views
