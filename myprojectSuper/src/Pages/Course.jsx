import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context'
import { useNavigate } from 'react-router-dom';
import CourseItem from '../Components/CourseItem';
import Spinner from '../Components/Spinner';

const Course = () => {

  const {courses,loading}=useContext(Context);
  
  const [coursesA,setCoursesA]=useState([]);
  const [cousresN,setCoursesN]=useState([]);
  const [active,setActive]=useState(true);
  const [unActive,setUnActive]=useState(true);

  const navigate=useNavigate();
   useEffect(()=>{
  
      if(localStorage.getItem('id')==null){
        navigate('/');
      }
   },[])
useEffect(()=>{

  if(courses.length>0){
    setCoursesA(courses.filter(item=>item.state==true));
    setCoursesN(courses.filter(item=>item.state==false));
  }
},[courses])

  return !loading ?  (
    <section className='my-5'>
      <div className='container'>
        <h4 className='text-center text-danger'><strong>all courses</strong></h4>
        <div onClick={()=>setActive(pre=>!pre)} className='bg-success text-white px-3 my-3'>Active <span className='mx-5'>{coursesA.length}</span></div>
        {active  ? <CourseItem courses={coursesA} />:''} 
        <div onClick={()=>setUnActive(pre=>!pre)} className='bg-danger text-white px-3 my-3'>Not Active  <span className='mx-3'>{cousresN.length}</span></div>
        { unActive  ? <CourseItem courses={cousresN}/>:''}
       </div>
    </section>
  ):<Spinner/>
}

export default Course
