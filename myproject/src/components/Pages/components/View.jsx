import React, { useContext, useState } from 'react'
import { PiSelectionSlashDuotone } from 'react-icons/pi';
import { SiPanasonic } from 'react-icons/si'
import { Context } from '../../../Context/Context';

const View = () => {
    const {views}=useContext(Context);
    const [first,setFirst]=useState(0);
    const [last,setLast]=useState(3);
   const handlNext=()=>{
    if(first+3<views.length){
        setFirst(pre=>pre+3);
    }
    if(last+3<views.length){
        setLast(pre=>pre+3)
    }
    else if(last<views.length){
      setLast(views.length);
    }
   }
   const handlPrev=()=>{
    if(first>6){
        setFirst(pre=>pre-3);
    }else if(3<first<6){
        setFirst(0)
    }else{
        setFirst(0);
    }
    if(last>6){
        setLast(pre=>pre-3)
    }else if (3<last<6){
        setLast(3);
    }else{
        setLast(3);
    }
   
   }
  return (
    <section className='container'> 
        <h3 className='text-center text-red'>
            <strong>some of views</strong>
        </h3>
        <div className='row'>
              
            {views.slice(first,last).map((item,index)=><div className='col-sm-6 col-md-4 col-12 my-2' key={index}>
                <div className="card box-shadow">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.view}</p>
                        <div><strong>Ich learn : </strong>
                        {item.learn.map((item,index)=><strong key={index} className='text-red'>{item} </strong>)}
                        </div>
                    </div>
                </div>
            </div>)}
         
        </div>
        <div className='text-center my-2'>
           <button className='btn btn-danger mx-2' onClick={()=>handlPrev()}>Prev</button>
           <button className='btn btn-primary mx-2' onClick={()=>handlNext()}>Next</button>
        </div>
    </section>
  )
}

export default View
