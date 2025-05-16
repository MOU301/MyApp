import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'
import Next from '../Elements/Next';
import { NavLink } from 'react-router';
const Lists = ({id}) => {
    const {next,setNext,lists,setLists}=useContext(Context);
    useEffect(()=>{
      const arr=lists.slice();
       if(!arr.includes(next)){
        arr.push(next);
       }
      setLists(arr);
    },[next]);
    useEffect(()=>{
      console.log(lists)
    },[lists])
    const handlNext1=(index)=>{
      setNext(index)
    }
  return (
    <div>
    {next==1 ? <NavLink className='btn btn-dark' to={`/course/${id}`}>Back</NavLink>:''}
        <div className='lists d-flex justify-content-center align-items-center align-content-center'>
          {lists.map((item,index)=><span key={index}>
                 <button className={` btn mx-1 ${item==next ? 'btn-danger':'btn-success'}`} onClick={()=>handlNext1(item)}>{item}</button>
          </span>)}
          <Next />
        </div>
        
    </div>
  )
}

export default Lists
