import React, { useEffect, useState } from 'react'


const Dialog = ({item}) => {
  const [text,setText]=useState([]);
  useEffect(()=>setText(item.text.split('**')),[])
  return (
   <>
   <h4 className='text-danger'>{item.type}</h4>
   <div className='row'>
   {item.src!=null ? 
   ((item.src.map((item,index)=><div className={index==0 ? 'col-12':'col-3'} key={index}><img src={item} alt="" /></div>))
    ):""}
   </div>
   <p>
    {text.map((item,index)=>index%2==0 ? (<strong className='text-success' key={index}>{item} : </strong>):(<span key={index}><span>{item}</span><br/></span>))}
   </p>
   
   </>
  )
}

export default Dialog
