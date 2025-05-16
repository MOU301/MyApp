import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import { Context } from '../../Context/Context';

const CourseSingel = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const {setPathName,myCouresData,courses,setCourse}=useContext(Context);
   const [course1,setCourse1]=useState([]);
    useEffect(()=>{
      console.log('run the course')
      let url = new URL(window.location.href);
      setPathName(url.pathname)

      let courseConpy=null;
      if(myCouresData.filter(item=>item.id==id).length>0){
        courseConpy=myCouresData.filter(item=>item.id==id)
      }else if(courses.filter(item=>item.id==id).length>0){
       courseConpy=courses.filter(item=>item.id==id);
      }else{
        navigate('/courses');
      }
      
      if(courseConpy!=null){
        setCourse1(courseConpy);
        setCourse(courseConpy);
      }
    },[]);
  
useEffect(()=>{
  console.log(course1)
},[course1])

  return course1.length>0 ? (
   
    <section className='my-5'>
      
      <div className="container">
        <h3 className='text-red'><strong>Deutsch A1 bei moomo</strong></h3>
        <ul>
          {
          course1[0].lessons.map((item,index)=><li key={index} className='my-2'>
            <NavLink to={`lesson/${item.id}`} className='btn btn-success'>{item.title}</NavLink>
            </li>
        )}
        </ul>
      </div>
    </section>
  ):''
}

export default CourseSingel
