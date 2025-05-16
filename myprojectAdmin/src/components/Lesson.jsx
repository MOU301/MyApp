import React, {useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router';
import { Context } from '../context/Context';
import axiosInstance from '../Api/api';


const Lesson = () => {
    const {lesson,adminInfo,lessons,setLessonData,lessonData,setLesson,login,goBack,back,setGoBack}=useContext(Context);
    const [id,setId]=useState(1);
    const [title,setTitle]=useState('');
    const [numberLesson,setNumberLesson]=useState(null);
    const [course_id,setCourse_id]=useState(null);
   const [newL,setNewL]=useState(false);
   const [update,setUpdate]=useState(false);
  
    const navigate=useNavigate();


    useEffect(()=>{
     
      if (!token || role !== "admin") {
        window.location.href = "http://localhost:5173/login"; // Back to login
      }else{
      
        if(lessonData.length>0){
          setTitle(lessonData[0].title);
          
          setNumberLesson(lessonData[0].id)
        }
    const url=window.location.pathname;
    const regex = /^\/course\/\d+\/lesson\/\d+$/;
    const regex1=/^\/course\/\d+$/;
    regex.test(back) ? (setUpdate(true),setTitle(lessonData[0].title),setNumberLesson(lessonData[0].id)):setUpdate(false);
    regex1.test(back) ? setNewL(true): setNewL(false);
    
  setCourse_id(url.split('/')[2]);
      // if(lessons.length>0){
      // setNumberLesson(Number(lessons[lessons.length-1].number)+1)
      // }else{
      //     setNumberLesson(1);
      // }
    
    if(lesson.length>0){
            let arr=lesson.reduce((a,c)=> a.number>c.number ? a:c);
         setId(Number(arr.number)+1);
        }else{
        setId(1);
        }     
     setGoBack(url);
    }},[])
const handlingId=(e)=>{
        e.target.value>0 ? (setId(e.target.value)):'';
} 
const styleLink=(type)=>{
   return lesson.filter(item=>item.type==type).length>0 ? 'btn btn-success m-2':'btn btn-dark m-2';
}
const remove=async (id,index)=>{
  if(id==null){
     const newLesson=lesson.filter((_,i)=>index!=i);
     setLesson(newLesson);
  }else{
    await axiosInstance.delete(`/lessondatas/${id}`).then(res=>{
       if(res.data.message=='success'){
        const newLesson=lesson.filter((_,i)=>index!=i);
        setLesson(newLesson);
       }
    }).catch(error=>console.log(error));
  }

    
    // //request to data base remove the lesson_data by id
    // //send lesson_id and lessonData_id
    // await axiosInstance.delete(`/lesson/${lesson_id}/lessondatas/${id}`)

    // setLesson(newLesson);
}
const handleName=(e)=>{
setTitle(e.target.value);
}
const Save=async()=>{

   const formData = new FormData();

   
   
   formData.append('name',title);
   formData.append("number",numberLesson);
 
   lesson.forEach((item, index) => {
       for (const key in item) {
        
        if((key === 'src' || key === 'ansur') && Array.isArray(item[key])){ 
            item[key].forEach((e,i)=>{
            
                if(e!=null){
                 
               formData.append(`lesson_data[${index}][${key}][${i}]`,e);
        }}) 
        }else if(key=='bot'){
          item[key].forEach((e,i)=>{
            for (const k in e){
              if(k=='ansur'){
                e[k].forEach((ee,ii)=>{
                  formData.append(`lesson_data[${index}][${key}][${i}][${k}][${ii}] `,ee)

                }) 
              }else{
                formData.append(`lesson_data[${index}][${key}][${i}][${k}]`,e[k])

              }

            }
          

          })
    
        }
        else{
          
           formData.append(`lesson_data[${index}][${key}]`,item[key]);
        }
      }
   });
    if(lesson.length>0){
    
        if(newL){
    
          await axiosInstance.post(`/user/${adminInfo.id}/course/${course_id}/lessons`,formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
          })
          .then(res=>{if(res.data.message=='success'){
            setLesson([]);
           navigate(`/course/${course_id}`);
          }else{
        
          }}
        )
          .catch(error=>console.log(error));
           
        }if(update){
          
          formData.append("_method", "PUT");
          const lesson_id=lessonData[0].id;
          formData.append("id",lesson_id);
            
          
            await axiosInstance.post(`/user/${adminInfo.id}/course/${course_id}/lessons/${lesson_id}`,formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
              })
              .then(res=>{
                if(res.data.message=='success'){
                  
                setLesson([]);
               navigate(`/course/${course_id}`);
              }else{
                
            
              }
            }
            )
              .catch(error=>console.log(error));
           
        }
    }
   
}
  return login ? (
   <section className='container my-3'>
   {/* in this page must to be nuber the old unung and the nmber the id  */}
    <div className='d-flex'>
        <h3><strong>Number of lesson :</strong></h3>
        <input type="number" onChange={(e)=>setNumberLesson(e.target.value)} value={numberLesson!=null ? numberLesson:''} name='number_lesson' placeholder='number of lesson'/>
     </div>
     <div className='d-flex my-2'><h3><strong>Name of lesson  :</strong></h3>
       <input type="text" onChange={(e)=>handleName(e)} value={title!=null ? title:''} placeholder='name of lessson'/>
     </div>
    
    <label className='label-control my-2' htmlFor="order">number of upung :</label><br/>
    <input  onChange={(e)=>handlingId(e)} value={id!=null ? id: ''} id='order' type="number"  placeholder='enter the order'/>
    <h4>please choise the component </h4>
        {id>0 ? (<>
            <NavLink className={styleLink('fillText')} to={`/fillText/${id}`}>fillText</NavLink>
            <NavLink className={styleLink('fillWithImage')} to={`/fillWithImage/${id}`}>fillWithImage</NavLink>
            <NavLink className={styleLink('video')} to={`/video/${id}`}>addVideo</NavLink>
            <NavLink className={styleLink('audio')} to={`/audio/${id}`}>addAudio</NavLink>
            <NavLink className={styleLink('trueAndFalse')} to={`/trueAndFalse/${id}`}>trueAndFalse</NavLink>
            <NavLink className={styleLink('questionAndAnsur')} to={`/questionAndAnsur/${id}`}>questionAndAnsur</NavLink>
            <NavLink className={styleLink('dialog')} to={`/dialog/${id}`}>addDialog</NavLink>
            <NavLink className={styleLink('bot')} to={`/Bot/${id}`}>addBot</NavLink>
            <NavLink className={styleLink('grammatik')} to={`/grammatik/${id}`} >grammatik</NavLink>
            <NavLink className={styleLink('writeSentence')} to={`/writeSentence/${id}`}>writeSentece</NavLink>
            <NavLink className={styleLink('image')} to={`/image/${id}`}>Add images</NavLink>
        </>
    ):(<p>you must put id to new ubung !!</p>)}



    <div className='my-5 show'>
      {lesson.map((item,index)=><div className='p-2 m-2 bg-success d-flex justify-content-between' key={index}>
                            <NavLink to={`/${item.type}/${item.number}`}><span className='text-white'>{item.type} </span><strong className='text-white'> <span className='text-dark'>number is  : </span>{item.number}</strong></NavLink>
                             <button className='btn btn-danger' onClick={()=>remove(item.id ? item.id:null,index)}>Delete</button>  
                                </div>)
       }

    </div>
   {(lesson.length>0 && title!='' && numberLesson!='') ? (<div>
    <button onClick={()=>Save()} className='btn btn-success'>Save</button>
    <NavLink to='/show' className='btn btn-success mx-2'>show lesson now </NavLink>

   </div>):<NavLink to='/myCourses' className='btn btn-success mx-2'>home</NavLink>
  }
</section>
  ):'';
}

export default Lesson
