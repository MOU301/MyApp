
import React, { useContext, useEffect, useState } from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { Context } from '../context/Context';
import {data, useNavigate,useParams} from 'react-router-dom'
import { LiaSkullCrossbonesSolid } from 'react-icons/lia';

const FillWithImage = () => {
const {lesson,setLesson,goBack}=useContext(Context);
const [ele,setEle]=useState({});
const {id}=useParams();
const [images,setImages]=useState([]);
const [ansur,setAnsur]=useState([]);

const [edit,setEdit]=useState(false);
const [save,setSave]=useState(false);
const navigate=useNavigate();
 
useEffect(()=>{
      let arr= lesson.filter(item=>item.number==id && item.type=='fillWithImage')
     if(arr.length>0){
      setEle(arr[0]);
      setSave(true)
      setEdit(true)
      setImages(arr[0].src);
     setAnsur(arr[0].ansur)
    }
   },[])
const TestImage=(item)=>{

    if(typeof item=="string"){
      return true;
    }else{
      return false
    }

}


const handlingImages =(e)=>{
  const oldImages=images.slice();
  oldImages.push(e.target.files[0]);
  setImages(oldImages);
}



const handlAnsur=(e)=>{
const {name,value}=e.target   
const newAnser=ansur.slice();
newAnser[name]=value;
setAnsur(newAnser)
}
useEffect(()=>{
  if(images.length==ansur.length && ansur.length>0){
    setSave(true)
  }
},[ansur.length])
const Send =()=>{

  let state=true;
  for(let i=0 ; i<ansur.length ; i++){
    if(ansur[i].value==''){
      state=false;
      break;
    }
  }
  if(state){
    let arr;
    let data={
     number:id,
     type:'fillWithImage',
     src:images,
     ansur:ansur
    }
    if(edit){
      if(ele.hasOwnProperty('id')){
          data={...data,id:ele['id']};
        }
       
     arr=lesson.filter(item=>!(item.type=='fillWithImage' && item.number==id))
     arr.push(data)
     setLesson(arr);
    }else{
      setLesson(pre=>[...pre,data])
    }
    navigate(goBack);

   }
  }



 

const remove =(index)=>{
 const oldImages=images.slice();
 const oldAnsur=ansur.slice();
 oldImages.splice(index,1);
 oldAnsur.splice(index,1);
 setImages(oldImages);
 setAnsur(oldAnsur);
}
return (
    <section className="container my-2 addImage">
     <h5>Add ubung fill with image </h5>
      <label className='btn btn-success' htmlFor='addImage' >
        <IoAddCircleOutline className='fs-4' /> add image
        </label>
        <input id='addImage' onChange={(e)=>handlingImages(e)}  type="file" hidden/> 
        <div className='d-flex justify-conten-tstart my-2'>
       
            {images.map((item,index)=><div className=' mx-2 my-2' key={index}>
                                         <div className='image'>
                                          <img src={TestImage(item) ? item:URL.createObjectURL(item)}/>
                                         </div>
                                         <input onChange={(e)=>handlAnsur(e)} className='ansur my-2 text-primary' value={ansur[index] || ''} name={index} type="text"/>
                                       <span onClick={()=>remove(index)} className='btn btn-danger'>x</span>
                                       </div>)}
        </div>
        {save ? (<button onClick={()=>Send()} className='btn btn-success'>done</button>):''}

    </section>
   )





}

export default FillWithImage
