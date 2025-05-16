import {createContext, useEffect, useState, useSyncExternalStore } from "react";
export const Context=createContext(null);
import axiosInstance from "../Api/api";
const data={
"messages":[
    {
        "id":1,
        "status":false,
        "name":"mohammad",
        "email":"moo@gmail.com",
        "message":"i have problem in course A1"},
    {"id":2,"status":true,"name":"omar othman","email":"omar@gmail.com","message":"the course is nicht gut "}
],
"slider":[{"id":1,"image":'A2.jpeg'},{"id":2,"image":"A1.jpg"}],
"views":[
    {
    "id":1,
    "name":"momo",
    "state":false,
    "body":"the course is good and i wash all the people show the course"
   },{
    "id":2,
    "name":"rawad",
    "state":true,
    "body":"the course is good and i wash all the people show the course"
   },{
    "id":3,
    "name":"handi",
    "state":false,
    "body":"the course is good and i wash all the people show the course"
   }
],
"courses":[
    {
        "id":1,
        "title":"deutsch A1",
        "author_name":"Hisham",
        "price":15,
        "state":true,
        "number_user":10,
        "lessons":10
    },{
        "id":2,
        "title":"deutsch A2",
        "author_name":"Motaz",
        "price":20,
        "state":false,
        "number_user":null,

    }
],
"users":[
        {"id":1,"email":"hana@gmail.com","name":"hana","courses":["A1","A2","B1"]},
        {"id":3,"email":"sara@gmail.com","name":"sara","courses":["A1"]},
        {"id":7,"email":"joad@gmail.com","name":"joad","courses":["A2"]},
        {"id":2,"email":"mo@gmail.com","name":"mohammad","courses":null},
        {"id":5,"email":"koko@gmail.com","name":"koko","courses":null},
        {"id":10,"email":"soso@gmail.com","name":"soso","courses":null}
    
]
}
    

const ContextProvider=({children})=>{
   const [login,setLogin]=useState(false);
   const [data,setData]=useState([]);
   const [users,setUsers]=useState([]);
   const [slider,setSlider]=useState(null);
   const [courses,setCourses]=useState([]);
   const [views,setViews]=useState(false);
   const [messages,setMessages]=useState([]);
   const [superInfo,setSuperInfo]=useState({});
   const [loading,setLoading]=useState(false);
   const checkLogin=async (email)=>{
   setLoading(true)
    return  await axiosInstance.post('/checklogin',{email},{
              headers: {
                'Content-Type': 'application/json'
              },
            })
     }
useEffect(()=>{
    if(localStorage.getItem('id')!=null && localStorage.getItem('email')!=null){
        const email=localStorage.getItem('email');
        const id=localStorage.getItem('id');
         checkLogin(email).then(res=>{
          if(id==res.data){
            setLogin(true);
              setSuperInfo({"id":localStorage.getItem("id"),
                            "email":localStorage.getItem('email'),
                            "name":localStorage.getItem('name'),
                            
                          });
                          
          }else{
          localStorage.clear();
          setLogin(false);
          setSuperInfo({});
          }
         }).catch(error=>console.log(error))
    }
},[])
const getData=async ()=>{
  
    return await axiosInstance.get(`/startSuper`);
  
    }
      useEffect(()=>{
            if(login){
                  getData().then(res=>{
                    setData(res.data.data);
                    setUsers(res.data.data.users);
                    setMessages(res.data.data.messages);
                    setViews(res.data.data.views);
                    setSlider(res.data.data.slider);
                    setCourses(res.data.data.courses);
                  })
                  .catch(error=>console.log(error));
                  setLoading(false);
            }
          
     },[login]);

 
    const value={
login,setLogin,data,setSuperInfo,superInfo,
views,messages,users,slider,courses,setCourses,
loading
    }
    return <Context.Provider value={value}>
           {children}
    </Context.Provider>
}
export default ContextProvider;