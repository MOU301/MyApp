import React, { useEffect } from 'react'

const FillWithImage = ({item}) => {

  return (
   <>
   <h4 className='text-danger'>{item.type}</h4>
   <div className='row'>
    {item.src.map((ele,index)=><div className='col-3' key={index}><div className='image'><img src={ele} alt="" /></div><strong className='text-success'>{item.ansur[index]}</strong></div>)}

   </div>
   </>
  )
}

export default FillWithImage
