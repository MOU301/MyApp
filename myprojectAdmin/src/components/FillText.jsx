import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Context } from '../context/Context';
import {useNavigate,useParams} from 'react-router-dom'


function FillText() {
    const {lesson,setLesson,goBack}=useContext(Context);
    // hier filter the lesson if there is item same id if ok set data in state
    const navigate=useNavigate();
    const [ele,setEle]=useState({});
    const {id}=useParams();
    const [text1,setText1]=useState('');
    const [text,setText]=useState('');
    const [edit,setEdit]=useState(false)
    const [save,setSave]=useState(false);
    const [done,setDone]=useState(false)
    const [ansur,setAnsur]=useState([]);
    const [course_id,setCourse_id]=useState(null);
   useEffect(()=>{
     const url=window.location.pathname;
      setCourse_id(url.split('/')[2]);
  
      let arr= lesson.filter(item=>item.number==id && item.type=='fillText')
    if(arr.length>0){
      setEle(arr[0]);
      setEdit(true)
      setText1(arr[0].text)
      setText(arr[0].text.split('***'))
      setAnsur(arr[0].ansur);
      setSave(true)
    }
   },[])
  useEffect(()=>{
    if(ansur.length>0){
  let input=document.querySelectorAll('.fillText input');
  if(input.length>0){
    let s=true;
    for(let i=0 ; i<input.length; i++){
      if(input[i].value==''){
        s=false
        break;
      }
    }
    setSave(s);
  } }
  },[ansur.length]);

    const textToInput=(e)=>{
      setText1(e.target.value);
    }
    const handText=()=>{
      if(text1.length>0 ){
        const newtext=text1.split('***');
        setText(newtext);
        const ans=[];
    
        setDone(true)
      }   
    }
    const handlAnser =(e)=>{
      const {name,value}=e.target
       let newAnser=ansur.slice();
          newAnser[name]=value;
          setAnsur(newAnser);
    }
    // in change the ansur build the object {id:id,type:fillText,text:text,anser:anser}
    //and but in the context
const Send=()=>{
  let data={
    number:id,
    type:"fillText",
    text:text1,
    ansur:ansur
  }
  if(edit){
    if(ele.hasOwnProperty('id')){
    
        data={...data,id:ele['id']};
      }
      const arr=lesson.filter(item=>!(item.number==id && item.type=='fillText'));
        arr.push(data);
      
        setLesson(arr);
 
   }else{
    setLesson(item=>[...item,data]);
   }
   
     
     navigate(goBack);
}

  return  (
 
    <div className='container my-2 fillText'>
    <p><strong> please enter the text as :</strong><br/>text *** text***text</p>
        <div >
            <label htmlFor="text" className='form-control'>Enter the text : </label>
            <textarea onChange={(e)=>textToInput(e)} value={text1}  className='form-control border-green my-2' name="text" id="text" cols='30' rows='10'></textarea>
            <button onClick={()=>handText()} className={text1.length>0 ? "btn btn-success":"d-none"}>Done</button>
        </div>

        <div>
          <div className='my-3'> 
            {text.length>0 ? text.map((item,index)=><span key={index}>{item} {text.length-1>index ? <input className='text-primary' onChange={(e)=>handlAnser(e)} value={ansur[index] || ''}  type='text' name={index} />:''}</span>) : ''}
            </div>
           {save ? (<button onClick={()=>Send()} className='btn btn-success '>{edit ? "Update":"Add"}</button>):''}
        </div>

    </div>
    
    

  )

}
export default FillText
