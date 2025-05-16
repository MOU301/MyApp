import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import ReactPlayer from 'react-player';

const Audio = ({id}) => {
  const {next,lessonData}=useContext(Context);
  const [path ,setPath]=useState([]);
  useEffect(()=>{

setPath(lessonData.filter(item=>(item.id==id && item.type=='audio'))[0].src)

  },[]);
 
  return path.length>0 ? (
    <section className={next==id ? 'audio':'d-none'}>
        <ReactPlayer width={'100%'} height={'40px'} playing={next==id ? true:false} muted onEnded={()=>setMach(true)}  controls={true} url={path}  />   
            
    </section>
  ):''
}

export default Audio
