import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { Context } from '../../../Context/Context';

const CourseItem = ({data,type}) => {
  const [more,setMore]=useState(false);
  const [text,setText]=useState('');
  const {myCourses}=useContext(Context);
  // useEffect(()=>{const ele=more ? data.description:data.description.slice(0,20)+'....';setText(ele) },[more]);

  return (
    <div className="card" >
        <img src={data.bostter} className="card-img-top" />
        <div className="card-body box-shadow">
            <div className="card-text">
                <strong className='text-red'> title : <span className='text-black'>{data.title}</span></strong><br/>
                <strong className='text-red'> price : <span className='text-black'>{data.price}</span></strong><br/>
                <strong className='text-red'>author : <span className='text-black'>momo</span> </strong><br/>
                {/* <strong className='text-red'>the description of author : </strong><br/> */}
                {/* <p className='text-dark'>{text} <span className='text-primary' onClick={()=>setMore(e=>!e)}>{more ? 'lass':'more'}</span></p> */}
                <NavLink to={`/course/${data.id}`} className='btn bg-red my-2'>Show</NavLink>
                {type==null ? (<NavLink className='btn btn-black text-white mx-3' to={`/payment/${data.id}`}>Pay</NavLink>):""}
            </div>
        </div> 
    </div>
  )
}

export default CourseItem
