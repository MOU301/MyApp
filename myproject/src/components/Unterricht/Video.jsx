import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../Context/Context';
import ReactPlayer from 'react-player'
import { FaLeaf } from 'react-icons/fa';

const Video = ({id}) => {

    const {next,setMach,lessonData}=useContext(Context);
    const [path,setPath]=useState([]);
    const [playVideo,setPlayVideo]=useState(true);
    useEffect(()=>{
      
   setPath(lessonData.filter(item=>(item.id==id && item.type=='video'))[0].src);

  },[]);



  return path.length> 0 ? (
    <>
  
    <section  className={next==id ? 'video':'d-none'}>
        <div>
         <ReactPlayer playing={next==id ? true:false} muted onEnded={()=>setMach(true)}  controls={true} url={path}  />   
        </div>
    </section>
    </>

    
   

  ):''
}

export default Video
