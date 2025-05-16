import React from 'react'

const Audio = ({item}) => {
  const TestImage=()=>{
    return typeof item.src[0]=='string' ? true:false;
  }
  
  return (
    <>
    <h3 className='text-danger'>{item.type}</h3>
    <div className='audio' >
     
     <div>
       <audio controls muted>
         <source src={TestImage() ? item.src[0]:URL.createObjectURL(item.src[0])} type="audio/mp3"/>
       </audio>
     </div>
    </div>
    </>
  )
}

export default Audio
