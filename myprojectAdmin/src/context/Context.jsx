import {  createContext, useEffect, useState } from "react";
import axiosInstance from "../Api/api";
import axios from "axios";
export const Context=createContext(null);

const ContextProvider=({children})=>{
    const [lessonData,setLessonData]=useState([])
    const [lesson,setLesson]=useState([]);
    const [lessons,setLessons]=useState([]);
    const [login,setLogin]=useState(false);
    const [back,setBack]=useState('');
    const [goBack,setGoBack]=useState('');
    const [courseInfo,setCourseInfo]=useState([]);
    const [author,setAuthor]=useState(null)
    const [adminInfo,setAdminInfo]=useState(null);
    const [mycourses,setMycourses]=useState([]);

useEffect(()=>{
 if(!login){
  setAdminInfo(null)
 }
},[login])

  const checkLogin=async (email)=>{
 return  await axiosInstance.post('/checklogin',{email},{
  headers: {
    'Content-Type': 'application/json'
  }
 })
  }
 const check=()=>{

  if(localStorage.getItem('id')!=null && localStorage.getItem('email')!=null){
    const email=localStorage.getItem('email');
    const id=localStorage.getItem('id');

     checkLogin(email).then(res=>{
      if(id==res.data){
        setLogin(true);
        
          setAdminInfo({"id":localStorage.getItem("id"),
                        "email":localStorage.getItem('email'),
                        "name":localStorage.getItem('name'),
                        
                      });
                      
      }else{
      localStorage.clear();
      setLogin(false);
      setAdminInfo({});
      }
     })
      .catch(error=>console.log(error))
   
    }
 }
  useEffect(()=>{
  check();
    
  },[]);
  const getData=async ()=>{
  return await axios.get(`http://127.0.0.1:8000/api/allCourses/${adminInfo.id}`,{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  }
    useEffect(()=>{
   
   if(adminInfo!=null){
        getData().then(res=>{
          setMycourses(res.data.data)
        })
        .catch(error=>console.log(error));
   }
    
   },[adminInfo])
    const value={
    lessons,setLessons,lesson,setLesson,mycourses
    ,author,setAuthor,setLogin,login,back,setBack
    ,courseInfo,setCourseInfo,lessonData,setLessonData,
    goBack,setGoBack,adminInfo,setAdminInfo,setMycourses,check
    
    }
    return <Context.Provider value={value}>
             {children}
           </Context.Provider>
}
export default ContextProvider;

