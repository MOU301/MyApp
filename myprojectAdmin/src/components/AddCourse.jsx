import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Context } from '../context/Context';
import axiosInstance from '../Api/api';
const AddCourse = () => {
    const {login,setCourseInfo,setBack ,adminInfo,setMycourses}=useContext(Context);
    
    const [image,setImage]=useState(false);
    const [title,setTitle]=useState('');
    const [price,setPrice]=useState('');
    const [description,setDescription]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
      if(localStorage.getItem('id')==null){
        navigate('/')
      }
      
    },[]);
    const getCourses=async ()=>{
      return  await axiosInstance.get(`/allCourses/${adminInfo.id}`)
                                
      }
    const send=async (e)=>{
        e.preventDefault();
        
        const formData=new FormData();
        formData.append("user_id",adminInfo.id) 
        formData.append('bostter',image);
        formData.append('name',title);
        formData.append('description',description);
        formData.append('price',price);
        if(title.length>0 && price.length>0 && description.length>0 && image!=false){
          await axiosInstance.post(`/courses`,formData,{
            headers: {
              "Content-Type": "multipart/form-data",
          }
          }).then(res=>{if(res.data.message=='success'){
              getCourses().then(res=>setMycourses(res.data.data))
                          .catch(error=>console.log(error))
             setBack('/addCourse');
           navigate('/myCourses');
          }})
            .catch(error=>console.log(error));
         //send request add course with data if ok go to add/lesson
          //  setCourseInfo(formData);
           //if the add is successfully go to home
          //  setBack('/addCourse');
          //  navigate('/myCourses');
        }
    }
  return (
    <section>
        <div className="container">

            <div className='addCourse d-flex justify-content-center align-items-center align-content-center'>
                
                <div className='p-2'>
                  <form onSubmit={send} encType="multipart/form-data">
                    <h4 className='text-center text-danger'><strong> add course</strong></h4>
                    <div className='bostter'>
                        <label htmlFor="bostter">
                            <img  src={!image ? '../../../src/assets/upload1.jpg' : URL.createObjectURL(image)}  />
                        </label>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} name='image' id='bostter' hidden/>
                    </div>
                    <div className='my-3'>
                        <label className='my-2' htmlFor="title"><strong>Title : </strong></label>
                        <input  type="text" className='form-control' onChange={(e)=>setTitle(e.target.value)} value={title} name='title' placeholder='Enter courses name' />
                    </div>

                    <div className='my-3'>
                        <label className='my-2' htmlFor="price"><strong>Price : </strong></label>
                        <input  type="text" onChange={(e)=>setPrice(e.target.value)} value={price} name='price' className='form-control' placeholder='enter price' />
                    </div>
                    <div className='my-3'>
                        <label className='my-2' htmlFor="description"><strong>Description: </strong></label>
                        <textarea className='form-control' onChange={(e)=>setDescription(e.target.value)} value={description} name="description"  id="description" placeholder='description for you' rows='5'></textarea>
                    </div> 
                    
                    <div className='text-center'>
                      <button type='submit'  className='btn btn-success'>Add Course 
                      </button>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AddCourse
