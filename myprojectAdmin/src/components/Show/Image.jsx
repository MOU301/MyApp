import React, { useEffect, useState } from 'react'
import { use } from 'react'

const Image = ({item}) => {
    const [images,setImages]=useState([]);
    useEffect(()=>{
     setImages(item.src);
    },[])
   const TestImage=(item)=>{
   return typeof item=='string' ? true:false;
   }
  return (
    <div>
      <h3 className='text-danger'>Image </h3>
      <div className='row'>
        {images.map((item,index)=><div className='col-3' key={index}>
            <div className='image'>
                <img src={TestImage(item) ? item:URL.createObjectURL(item)} />
            </div>

        </div>)}
      </div>
    </div>
  )
}

export default Image
