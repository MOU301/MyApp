import React from 'react'

const Grammatik = ({item}) => {
  const TestImage=()=>{
    return typeof item.src[0]=='string' ? true:false;
  }
  return (
    <>
    <h3><strong className='text-danger'>Grammatik</strong></h3>
    <div className='show-image'>
        <img src={TestImage() ? item.src[0]:URL.createObjectURL(item.src[0])} />
    </div>
    </>
  )
}

export default Grammatik
