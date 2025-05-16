import React from 'react'
import CourseItem from './CourseItem'
const CourseComponent = ({courses}) => {
  return (
    <>
    <h3 className='text-red text-center'><strong>all the Courses</strong></h3>
       

        <div className="row">
          {courses.map((data,index)=><div className=" col-12 col-sm-6 col-md-4 my-2" key={index}>
            <CourseItem data={data}/>
          </div>)}
          
        </div></>
  )
}

export default CourseComponent
