import React, { useCallback, useContext, useEffect, useState } from 'react'
import { IoIosRemoveCircle } from "react-icons/io";
import { useNavigate, useParams } from 'react-router';
import { Context } from '../context/Context';
const TrueAndFalse = () => {
  const {lesson,setLesson,goBack}=useContext(Context);
  const [questions, setQuestions] = useState([]);
  const [ele,setEle]=useState([]);
  const [edit,setEdit]=useState(false);
  const {id}=useParams();
  const navigate=useNavigate();


 useEffect(()=>{

  let arr= lesson.filter(item=>item.number==id && item.type=='trueAndFalse');
  if(arr.length>0){
    setEdit(true);
    setEle(arr[0]);
    const arrAsk=arr[0].text.split('***');
    const arrAnsur=arr[0].ansur;
      let newQuestion=[];
    for(let i=0 ; i<arrAsk.length ; i++){
       newQuestion.push({ask:arrAsk[i],ansur:arrAnsur[i]==='1' ? true:false});
    }

    setQuestions(newQuestion);
    
  }
 },[])
const handlSubmit=(e)=>{
    e.preventDefault();
    const arrAsk=[];
    const arrAnsur=[];
    questions.map((item)=>{arrAsk.push(item.ask),arrAnsur.push(item.ansur==true ? '1':'0')});
    const text=arrAsk.join('***');
    let data={
      number:id,
      type:'trueAndFalse',
      text:text,
      ansur:arrAnsur
    }
    if(edit){
      if(ele.hasOwnProperty('id')){
          data={...data,id:ele['id']};
        }
        const arr=lesson.filter(item=>!(item.number==id && item.type=='trueAndFalse'));
          arr.push(data);
          setLesson(arr);
     }else{
      setLesson(item=>[...item,data]);
     }
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
      let value=null;
      e.target.value=='true' ? value=true:value=false;
      setQuestions(pre=>
        pre.map((el,i)=>
          i==index ? {...el,ansur:value}:el
        )
      )
    }
   
const addAsk=()=>{
  setQuestions([...questions, { ask: "", ansur: null }]);

}
    
const handlRemove=(index) =>{
setQuestions(e=>e.filter((_,i)=>i!=index));
}  
    
  return (
    <div className='container'>
        <h3><strong>true and false</strong></h3>
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
               <div >
                 <label htmlFor='richtig'>richtig</label>
                 <input
                    className='mx-3'
                    type="radio"
                    value={true}
                    checked={item.ansur===true}
                    onChange={(e) => handlAnsur(e,index)}
                    id='richtig'
                  /> 
               </div>
               <div >
                 <label htmlFor='falsch'>falsch</label>
                 <input
                    className='mx-3'
                    type="radio"
                    value={false}
                    checked={item.ansur===false}
                    onChange={(e) => handlAnsur(e,index)}
                    id='falsch'
                  />
               </div>
            </div>
            })}
          <button type='submit' className='btn btn-success'>{edit ? "Update":"Add"}</button>
        </form>:''
      }
    </div>
  )
}

export default TrueAndFalse
