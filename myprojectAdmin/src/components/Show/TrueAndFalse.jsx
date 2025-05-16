import React, { useEffect, useState } from 'react'
import { VscError } from "react-icons/vsc";
import { HiMiniCheck } from "react-icons/hi2";
const TrueAndFalse = ({item}) => {
    const [text,setText]=useState([]);
    const [ansur,setAnsur]=useState([]);
    useEffect(()=>{
        console.log();
        

      setText(item.text.split('***'));
      setAnsur(item.ansur.map(e=>e=='1' ? true:false));
    },[])
 
  return (
    <div>
       <h3 className='text-danger'>True and False </h3>
        <ol>{text.map((item,index)=><li className='d-flex justify-content-between' key={index}>
            <span>{item}</span><span className={`mx-3 `} >{ansur[index] ? <HiMiniCheck className='text-success fs-4'/>: <VscError className='text-danger fs-4'/>}</span>
        </li>)} 
        </ol>   
    </div>
  )
}

export default TrueAndFalse
