import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { IoIosRemoveCircle } from "react-icons/io";
import { Context } from '../context/Context';


const WriteSentence = () => {
    const {lesson,setLesson,goBack}=useContext(Context)
    const [questions,setQuestions]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();
    const [edit,setEdit]=useState(false);
    const [ele,setEle]=useState([]);


    useEffect(()=>{
      let arr= lesson.filter(item=>item.number==id && item.type=='writeSentence');
      if(arr.length>0){
        setEdit(true);
        setEle(arr[0]);
        const arrAsk=arr[0].text.split('***');
        const arrAnsur=arr[0].ansur;
          let newQuestion=[];
        for(let i=0 ; i<arrAsk.length ; i++){
           newQuestion.push({ask:arrAsk[i],ansur:arrAnsur[i]});
        }
    
        setQuestions(newQuestion);
        
      }


    },[])



    const handlSubmit=(e)=>{
        e.preventDefault();
        const arrAsk=[];
        const arrAnsur=[];
        questions.map((item)=>{arrAsk.push(item.ask),arrAnsur.push(item.ansur)});
        const text=arrAsk.join('***');
        let data={
          number:id,
          type:'writeSentence',
          text:text,
          ansur:arrAnsur
        }
        if(edit){
          if(ele.hasOwnProperty('id')){
              data={...data,id:ele['id']};
            }
            const arr=lesson.filter(item=>!(item.number==id && item.type=='writeSentence'));
              arr.push(data);
              setLesson(arr);
         }else{
          setLesson(item=>[...item,data]);
         }
         console.log(data)
         navigate(goBack);
        }
        const handlAsk=(e,index)=>{
          setQuestions(pre=>
            pre.map((el,i)=>
              i==index ? {...el,ask:e.target.value}:el
            )
          )
        }
        const handlAnsur=(e,index)=>{
            setQuestions(pre=>
                pre.map((el,i)=>
                  i==index ? {...el,ansur:e.target.value}:el
                )
              )
        }
       
    const addAsk=()=>{
      setQuestions([...questions, { ask: "", ansur: null }]);
    
    }
        
    const handlRemove=(index) =>{
    setQuestions(e=>e.filter((_,i)=>i!=index));
    } 
  return(
  <div className='container'>
          <h3><strong>Write Sentence</strong></h3>
          <button className='my-3 btn btn-success' onClick={()=>addAsk()}>add ask</button>
          {questions.length>0 ? 
          <form onSubmit={handlSubmit}>
          {questions.map((item,index)=>{
            
              return<div className='border my-2 p-2' key={index}>
               <div className='d-flex justify-content-between py-1'> 
                  <label><strong>ask : </strong></label>
                  <span className='mx-4'>
                  <IoIosRemoveCircle onClick={()=>handlRemove(index)} className='fs-4 text-danger'/>
                  </span>
                </div>
                <input type="text" className='form-control' onChange={(e)=>handlAsk(e,index)} value={item.ask} required/>
                <label className='my-3'><strong>Ansur :</strong> </label>
                <input type='text' className='form-control' onChange={(e)=>handlAnsur(e,index)} value={item.ansur} required/>
              </div>
              })}
            <button type='submit' className='btn btn-success'>{edit ? "Update":"Add"}</button>
          </form>:''
        }
      </div>)
}

export default WriteSentence
