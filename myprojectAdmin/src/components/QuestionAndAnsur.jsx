import React, { useContext, useEffect, useState } from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router';
import { Context } from '../context/Context';
import { TbColumnInsertLeft } from 'react-icons/tb';
import { CgArrowsExpandLeft } from 'react-icons/cg';


const QuestionAndAnsur = () => {
  const {id}=useParams();
  const navigate=useNavigate();
  const {lesson,setLesson,goBack}=useContext(Context);
  const [ele,setEle]=useState({});
  const [text,setText]=useState([]);
  const [ansur,setAnsur]=useState([]);
  const [input,setInput]=useState([]);
  const [fill,setFill]=useState(false)
  const [done,setDone]=useState(false);
  const [save,setSave]=useState(false);
  const [edit,setEdit]=useState(false);

useEffect(()=>{
const arr=lesson.filter(item=>(item.type=='questionAndAnsur' && item.number==id))
if(arr.length>0){
  setEle(arr[0]);

  let input=[]
   for(let i=0 ; i<arr[0].text.length ; i++){
        input.push(input);
   }
    setInput(input)
    setText(arr[0].text.split('***'))
    setAnsur(arr[0].ansur);
    setEdit(true);
    setDone(true);
    setSave(true);
}
},[])


const addQuestion=()=>{
  setText(pre=>[...pre,'']);
  setAnsur(pre=>[...pre,'']);
}

const remove=(index)=>{
  setText(e=>e.map((_,i)=>i!=index))
}


const handlInput=(e,index)=>{
  const value=e.target.value;
  setText(e=>e.map((el,i)=>i==index ? value:el))

}
useEffect(()=>{
  console.log(text)
},[text])
const Done=()=>{
  
  if(!text.includes('')){
    setDone(true);
  }
}

const handlAnsur=(e,index)=>{
   const value=e.target.value;
  setAnsur(e=>e.map((item,i)=>i==index ? value:item));
  
}
const test=()=>{
  if(ansur.length>0 && !ansur.includes('') && ansur.length==text.length){
   setSave(true)
  }else{
    setSave(false)
  }
}
useEffect(()=>{
  test();
},[text,ansur])

const Send=()=>{

  let data={
    number:id,
    type:"questionAndAnsur",
    text:text.join('***'),
    ansur:ansur

  }
  if(edit){
    if(ele.hasOwnProperty('id')){
    
        data={...data,id:ele['id']};
      }
      
    const arr=lesson.filter(item=>!(item.type=="questionAndAnsur" && item.number==id));
    arr.push(data);
    setLesson(arr)
  }else{
  setLesson(pre=>[...pre,data]);
  }
  
  navigate(goBack);
}

  return (
  <section className="question container">
     <h4 className='my-2'>add question </h4>
     
     <button onClick={()=>addQuestion()} className='btn btn-success' >
      <IoAddCircleOutline className='fs-4' /> add question
     </button>
     <p className={fill ? 'text-danger':'d-none'}>fill the question please !!</p>
     <ol>{
      text.map((item,index)=><li  key={index}><input className='frag my-2 text-primary' onChange={(e)=>handlInput(e,index)} value={text[index]} type='text' placeholder='enter the question'/>
                                 <span onClick={()=>remove(index)} className='btn btn-danger mx-2'>-</span>     
                            </li>)
     }</ol>
     <button onClick={()=>Done()} className={text.length ? 'btn btn-success':'d-none'}> done</button>
     {done ? (<div className='putAnsur my-5' >
       {text.map((item,index)=><div className='my-5' key={index}><p className='text-danger fs-5'>{item} ? </p><input className='text-primary' onChange={(e)=>handlAnsur(e,index)} value={ansur[index]} type="text" /></div>)}
    
     </div>):''}
     {save ? (<button onClick={()=>Send()} className={save ? 'btn btn-success':'d-none'}>Save</button>
):''}
  </section>  
  )
}

export default QuestionAndAnsur
