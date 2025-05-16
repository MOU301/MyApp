import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../context/Context';
import { IoAddCircleOutline } from "react-icons/io5";

const AddDialog = () => {
  const {id}=useParams();
  const [ele,setEle]=useState({});
  const navigate=useNavigate();
  const {lesson,setLesson,goBack}=useContext(Context);
  const [image,setImage]=useState([]);
  const [text,setText]=useState([]);
  const [text2,setText2]=useState([])
  const [change,setChange]=useState(false)
  const [edit,setEdit]=useState(false);
useEffect(()=>{
  const arr=lesson.filter(item=>item.type=='dialog' && item.number==id);
  if(arr.length>0){
    setEle(arr[0])
    setEdit(true);
    setText(arr[0].text.split('**').join(':'))
    // setText2(arr[0].text.split("**"))
    if(arr[0].src!=null)
      setImage(arr[0].src);
     }
},[])

  const textToInput=(e)=>{
    setText(e.target.value)
  }
  const handlText=()=>{
    if(text.length>0 ){
      
      const newtext=text.split(':')
      setText2(newtext);
    
    }else{
    
    }
  }


  const handlingImages=(e)=>{
    setImage([e.target.files[0]])
  }

 const Send=()=>{
  
  if(text2.length>0){
       let img;
    // if(image.length>0){
    //   img=image
    // }else{
    //   img=null
    // }
  let data={
      number:id,
      type:"dialog",
      text:text2.join('**'),
      src:image 
    }
    if(edit){
      if(ele.hasOwnProperty('id')){
          data={...data,id:ele['id']};
        }
      const arr=lesson.filter(item=>!(item.number==id && item.type=='dialog')); 
      arr.push(data)
      setLesson(arr);
    }else{
      setLesson(pre=>[...pre,data]);
    }
    
    navigate(goBack)
  }else{
   setChange(true);
  }
 }
 const TestImage=(item)=>{
  if(typeof item=='string'){
    return true
  }else{
    return false
  }
}
  return (
    <section className='container dialog'>
    
     <div className="mb-3 my-5">
   <p><strong> the dialog musst to be : </strong><br/>name:message:<br/>name2:message:</p>
      <label htmlFor="exampleFormControlTextarea1" className="form-label "><h4>add dialog :</h4> </label>
      <h5 className={change ? 'text-danger':"d-none"}>please fill the text now </h5>
      <textarea onChange={(e)=>textToInput(e)} value={text} className="form-control  border-green my-2" id="exampleFormControlTextarea1" rows="5"></textarea>
        <label className='btn btn-success mx-2' htmlFor='addImage' >
           <IoAddCircleOutline className='fs-4' /> add image
        </label>
        <input id='addImage' onChange={(e)=>handlingImages(e)}  type="file" hidden/> 
      <button onClick={()=>handlText()} className={text.length>0 ? "btn btn-success":'d-none'}>Done</button>
    </div>
    <div className='my-2'>
      {text2.map((item,index)=>index%2==0 ?  <div key={index}><br/><span className='text-danger' key={index}>{item} :</span></div>:<span className='text-primary' key={index}>{item}  </span>)}
      
      {image.map((item,index)=><div className='image' key={index}><img src={TestImage(item) ? item:URL.createObjectURL(item)} /></div>)}
      
     
    </div>
    
 <button  onClick={()=>Send()} className={text2.length>0 ? "btn btn-success":'d-none'}>Save</button>
  
    </section>
  )
}

export default AddDialog
