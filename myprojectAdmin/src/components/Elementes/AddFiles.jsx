import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import { useNavigate} from 'react-router'
import { IoAddCircleOutline } from "react-icons/io5";
import { use } from 'react';
const AddFiles = ({type,id}) => {
  const {lesson,setLesson,goBack}=useContext(Context)

  const [file,setFile]=useState([]);
  const [ele,setEle]=useState([]);
  const [ele1,setEle1]=useState({});
  const [edit,setEdit]=useState(false);
  const navigate=useNavigate();
  
  useEffect(()=>{
     const arr=lesson.filter(item=>(item.type==type && item.number==id))
   
     if(arr.length>0){
      setEle(arr[0].src);
      setEle1(arr[0])
      setEdit(true)
     }
  },[])
  const TestImage=(item)=>{
    if(typeof item=='string'){
      return true
    }else{
      return false
    }

}
  const handlingFile=(e)=>{
  setFile([])
  setEle([e.target.files[0]]);
  }


  const SendData=()=>{

   let data={
      number:id,
      type:type,
      src:file,
    }
    if(edit){
      if(ele1.hasOwnProperty('id')){

          data={...data,id:ele1['id']};
        }
      
      const arr=lesson.filter(item=>!(item.number==id && item.type==type));
      arr.push(data);
     setLesson(arr);
    }else{
      setLesson(pre=>[...pre,data])
    }
    
    navigate(goBack);
  }

  useEffect(()=>setFile([...ele]),[ele.length]);
 
const remove=()=>{
setEle([]);


}


  return (
   <section className="container addVideo">
      <h5>{`Add new ${type}`} </h5>
            <label className='btn btn-success' htmlFor='addImage' >
              <IoAddCircleOutline className='fs-4' /> {`add ${type}`}
              </label>
              <input id='addImage' onChange={(e)=>handlingFile(e)} accept='video'  type="file" hidden/>
               <div className='video d-flex justify-content-center'>
                  {file.map((item,index)=>type=='video' ?  
                             (<video width="320" height="240" controls key={index}>
                                    <source src={TestImage(item) ? item:URL.createObjectURL(item)} type="video/mp4"/>
                               </video>):(
                                <>
                                {type=='audio' ? 
                                  <audio key={index} controls>
                                      <source  src={TestImage(item) ? item:URL.createObjectURL(item)} type='audio/mp3'/>
                                  </audio>
                                  :
                                  <div className='image' key={index}>
                                      <img src={TestImage(item) ? item:URL.createObjectURL(item)} />
                                    </div>
                            
                                 } 
                                </>
                              ))
                   }
                <button onClick={()=>remove()}  className={ele.length>0 ? 'btn btn-danger':'d-none'}>x</button>

               </div>
             
               <div onClick={()=>SendData()} className={file.length>0 ? 'btn btn-success':'d-none'}>{edit ? "Update":"Done"}</div>
   </section>
  )
}

export default AddFiles
