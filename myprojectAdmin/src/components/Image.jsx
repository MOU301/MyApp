import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import { useNavigate, useParams} from 'react-router'
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosRemoveCircle } from "react-icons/io";

const Image= () => {
  const {lesson,setLesson,goBack}=useContext(Context)

  const [images,setImages]=useState([]);

  const [ele,setEle]=useState({});
  const [edit,setEdit]=useState(false);
  const {id}=useParams();
  const navigate=useNavigate();
  
  useEffect(()=>{
     const arr=lesson.filter(item=>(item.type=='image' && item.number==id))
   
     if(arr.length>0){
      console.log(arr[0].src);
      setEle(arr[0])
      setImages(arr[0].src);
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
 const oldImages=images.slice();
 oldImages.push(e.target.files[0]);
 setImages(oldImages);
  }


  const SendData=()=>{

   let data={
      number:id,
      type:'image',
      src:images,
    }
    if(edit){
      if(ele.hasOwnProperty('id')){

          data={...data,id:ele['id']};
        }
      
      const arr=lesson.filter(item=>!(item.number==id && item.type=='image'));
      arr.push(data);
     setLesson(arr);
    }else{
      setLesson(pre=>[...pre,data])
    }
    console.log(images)
    navigate(goBack);
  }

  // useEffect(()=>setFile([...ele]),[ele.length]);
 
const remove=()=>{
setEle([]);
}
const handlRemove=(index)=>{
 setImages(e=>e.filter((_,i)=>i!=index));
}
  return (
   <section className="container addVideo">
      <h5>Add Image  </h5>
            <label className='btn btn-success' htmlFor='addImage' >
              <IoAddCircleOutline className='fs-4' /> add image
              </label>
              <input id='addImage' onChange={(e)=>handlingFile(e)}   type="file" hidden/>
               <div className='row'>
                  { images.map((item,index)=>{
                    return(
                     <div className='col-3 my-2'>
                       <div className="image">
                        <img src={TestImage(item) ? item:URL.createObjectURL(item)} />
                       </div>
                       <IoIosRemoveCircle onClick={()=>handlRemove(index)} className='fs-4 text-danger'/>

                     </div>
                    )
                    })}
                <button onClick={()=>remove()}  className={ele.length>0 ? 'btn btn-danger':'d-none'}>x</button>
               </div>
               <div onClick={()=>SendData()} className={images.length>0 ? 'btn btn-success':'d-none'}>{edit ? "Update":"Done"}</div>
   </section>
  )
}

export default Image

