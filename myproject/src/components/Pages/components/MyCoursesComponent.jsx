import React from 'react'
import CourseItem from './CourseItem'

const MyCoursesComponent = ({MyCourses}) => {
  return (
    <>
        <h3 className='text-center text-red'><strong>My Courses</strong> </h3>
        <div className="row">
         {MyCourses.map((data,index)=><div className=" col-12 col-sm-6 col-md-4 my-2" key={index}>
            <CourseItem data={data} type='mycourses'/>
        </div>)}
        </div>
    </>
  )
}

export default MyCoursesComponent  
