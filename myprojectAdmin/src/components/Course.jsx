import React, { useContext, useEffect, useState} from 'react'

import { NavLink, useNavigate, useParams } from 'react-router'
import { Context } from '../context/Context'
import axiosInstance from '../Api/api'

const Course = () => {
    const {lessons,setLesson,adminInfo,setLessons,mycourses,login,setBack,setGoBack}=useContext(Context);

    const {id}=useParams();
    const navigate=useNavigate();
    const getlessons=()=>{
      if(!localStorage.getItem('id')){
       navigate('/')
      }else{
        const url=window.location.pathname;
        setBack(url);
        setGoBack('');
        const items=mycourses.filter(item=>item.id==id)[0].lessons ?? [];
        setLessons(items)
     
      }
      
      //get all lessons form data request course_id response all lessons
        
    }
    useEffect(()=>{
      setLesson([])
    },[]);
 useEffect(()=>{
  if(mycourses.length>0){
  getlessons();
  }
 },[mycourses]);
const removeLesson=async (name,lesson_id,index)=>{
  const sure=confirm(`are you sure ?? remove the lesson now ${name}`);
  if(sure){
      await axiosInstance.delete(`user/${adminInfo.id}/course/${id}/lessons/${lesson_id}`)
      .then(res=>{
        if(res.data.message=='success'){
        const newLessons=lessons.filter((_,i)=>index!=i);
        setLessons(newLessons);
        }
    }).catch(error=>console.log(error));
  }
  
}
  return login ? (
   <section className='container'>
      <div className='my-4'>
        
       <div className='addLesson'> 
         <NavLink to='lesson' className='btn btn-success my-2'> add lesson</NavLink>
         <NavLink to='/home' className='btn btn-success mx-2'> home</NavLink>
       </div>
       <div className='lessons'>
        {lessons.length>0 ? lessons.map((item,index)=><div className='d-flex justify-content-between' key={index}>
             <NavLink  to={`lesson/${item.id}`} className='btn btn-dark my-1' >{`lesson ${item.number} (${item.title})`}</NavLink>
             <button onClick={()=>removeLesson(item.title,item.id,index)} className='btn btn-danger my-1'>delete</button>
             </div>):<h3 className='text-danger text-center py-2'>there is not lesson in this course !!!</h3>}
        </div>
      </div>
   </section>
  ):''
}

export default Course
