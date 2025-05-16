import React, { useCallback, useContext, useEffect, useState } from 'react'
import CourseItem from './components/CourseItem'

import { Context } from '../../Context/Context';
import CoursesComponent from './components/CoursesComponent';
import MyCoursesComponent from './components/MyCoursesComponent';
import Search from './components/Search';
import Spinner from './components/Spinner/Spinner';
const Course = () => {
  const {coursesCopy,myCouresData,setLessonData,loading}=useContext(Context);
  const [last,setLast]=useState(3);
  const [courseFilter,setCourseFilter]=useState([]);

  const {setPathName}=useContext(Context);
  const handleMore=()=>{
    if(last+3<coursesCopy.length){
      setLast(pre=>pre+3)
    }
    else if(last<coursesCopy.length){
      setLast(coursesCopy.length)
    }
  }
  const handleLass=()=>{
    if(last-3>3){
      setLast(pre=>pre-3);
    }else if(last>=3){
      setLast(3);
    }
  }
  const handleSearch=(e)=>{
  
  if(e.target.value.length>0){
     const course=coursesCopy.filter(item=>item.title.toLowerCase().includes(e.target.value));
     setCourseFilter(course);
  }else{
    setCourseFilter(coursesCopy)
  }

  }

   useEffect(()=>{
   
        let url = new URL(window.location.href);
        setPathName(url.pathname);
        setLessonData([]);
        setCourseFilter()
      },[])
      useEffect(()=>{
      setCourseFilter(coursesCopy)
      },[coursesCopy])

  return (
    <section className='my-5'>
      <div className="container">
        {loading ? <Spinner/>:<>
        {myCouresData.length>0 ? 
        <div className='my-5'>
          <MyCoursesComponent MyCourses={myCouresData}/>
        </div>:''}
        
       {courseFilter.length>0 ? 
       <div className='my-5'>
          <Search courses={courseFilter}/>
          <CoursesComponent courses={courseFilter} />
          <div>
            {last<courseFilter.length ? ( <button className='btn bg-red w-100 my-2' onClick={()=>handleMore()}>more</button>):''}
            {last>3 ? (<button className='btn btn-black w-100 text-white' onClick={()=>handleLass()}>Lass</button>):''}
          </div>
        </div>:''}
        
        </>
        }
        </div>
    </section>
  )
}

export default Course
