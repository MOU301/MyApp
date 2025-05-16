import React, { useEffect, useState } from 'react'

const FillText = ({item}) => {
  const [text,setText]=useState([]);
  const [ansur,setAnsur]=useState([])
  useEffect(()=>{
const newText=item.text.split('***');
setText(newText);
setAnsur(item.ansur);
  },[])
  useEffect(()=>{

  },[text])
  return (
    <div>
      <h3 className='text-danger'>{item.type}</h3>
      <p>{text.map((ele,index)=>ele.length>0 ? 
                         (<span key={index}>
                             <span>{ele}</span>
                             {ansur[index]!==undefined ? <strong className='text-white bg-success px-2'>{ansur[index]}</strong>:''}
                          </span>)
                          :(<span key={index}><strong className='text-white bg-success px-2'>{ansur[index]}</strong><span>{ele}</span></span>)
                          )}</p>
    </div>
  )
}

export default FillText
