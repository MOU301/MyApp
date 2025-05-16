import React, { useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import { Context } from '../../Context/Context';

const Grammatik = ({id}) => {
  const [src,setSrc]=useState(null);
  const {show,next,setShow,mach,setMach,lessonData}=useContext(Context);
  useEffect(()=>{

  if(next==id){
    setSrc(lessonData.filter(item=>(item.number==id && item.type=='grammatik'))[0].src)
    setTimeout(function(){
     
     setMach(true);
    },1000)
  }
    
  },[next])
 
  return (
   <Container className={next==id ? 'grammatik':'d-none'}>

       <div className='image '>
       {src!=null ? <img  src={src} alt="" />:''}
       </div>
    
   </Container>
  )
}

export default Grammatik
