import React, { useContext, useEffect, useState, useTransition} from 'react';
import Video from './Video';

import Ubung1 from './Ubung1';
import Ubung2 from './Ubung2';
import Ubung3 from './Ubung3';
import Lists from './Lists';

import Audio from './Audio';
// import Next from '../Elements/Next'; 
import Fassung from './Fassung';
import BotTest from './BotTest';
import Ubung4 from './Ubung4';
import Dialog from './Dialog';
import Grammatik from './Grammatik';
import { Context } from '../../Context/Context';
import TranslateCoponent from '../Pages/components/TranslateCoponent';
import { data, useNavigate, useParams } from 'react-router';

import axios from 'axios';
import WriteSentence from './WriteSentence';
import Images from './Images';
const components={
  Grammatik:Grammatik,
  Video:Video,
  Dialog:Dialog,
  Bot:BotTest,
  FillText:Ubung1,
  TrueAndFalse:Ubung2,
  QuestionAndAnsur:Ubung3,
  FillWithImage:Ubung4,
  Audio:Audio,
  Summary:Fassung,
  WriteSentence:WriteSentence,
  Image:Images
}
const RenderComponent=(item,id)=>{
  const stringComponent = item;
  const componentName = stringComponent.match(/<(\w+)/)[1];
  const Component = components[componentName];
  return Component ? React.createElement(Component, { id }) : <p>Component not found</p>;
 }
const Lesson = () => {
  const {mach,setUpdate,setMach,setNext,setLists,login,userInfo,unterricht,ids,setPathName,next,finsh,lessons,lessonData,setLessonData,word,setWord}=useContext(Context);
const [course_id1,setCourse_id1]=useState(null);
  const navigate=useNavigate()
  const {id}=useParams();
 const [lessonNumber,setLessonNumber]=useState(null);
  //translate component
      
  //translate component
  useEffect(()=>{
    console.log(lessons)
  let url = new URL(window.location.href);
  if(!login){
    navigate('/');
  }else{
   
    setPathName(url.pathname)
    const lesson=lessons.filter(item=>item.id==id);
     setLessonData(lesson[0].lesson_data);
     setLessonNumber(lesson[0].number);

     setNext(1);
    setLists([1])
     setCourse_id1(window.location.pathname.split('/')[2]);
     
  }
  },[]);

  // useEffect(()=>{
  //   console.log(lessonData);
  // },[lessonData.length]);

  const updateLesson=async(data)=>{
  
   return await axios.post(`http://127.0.0.1:8000/api/nextlesson`,data,{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
   })
  }
    useEffect(()=>{ 
    
      if(next==finsh && next>0 && mach==true){
        console.log('send the data to backEnd');
      const page=window.location.pathname.split('/');
      const lesson_id=page[4]
      console.log(lessons)
       const lesson_number=lessons.filter(item=>item.id==lesson_id)[0].number;
       const next_lesson=lessons.filter(item=>item.number==(lesson_number+1));
       if(next_lesson.length>0){
        //no request to database
        console.log('go to next lesson ') 
       }else{
        const data={
          user_id:userInfo.id,
          course_id:course_id1,
          lesson_number:lessonNumber
         }
  console.log(data);
         updateLesson(data)
             .then(res=>{if(res.data.message=='success'){
              setUpdate(true);
              navigate(`/course/${course_id1}`);
             }else if(res.data.message=='buy'){
              navigate(`payment/${course_id1}`);
             }else{
              console.log(res.data.message);
             }
            })
             .catch(error=>console.log(error));
        setMach(false);
       }
          }
   
   },[next,mach])
  return login ? (
    lessonData.length>0 ? (
  <>
 
  <div className='my-5'>
    
   <Lists id={course_id1}/>
 
   <section className='lesson'>
   
   <div className='container'>

      {unterricht.map((item,index)=><div key={index}>{RenderComponent(item,ids[index])}</div>
      )}
     <TranslateCoponent word={word} setWord={setWord} />
    </div>
   </section>
  
   </div>
   </>
    ):''
  ):''
}

export default Lesson
