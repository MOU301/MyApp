import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/Context'

const Next = () => {
  const {next,mach,num,setMach,setShow,setNext}=useContext(Context);
  const handlNext=()=>{
    setMach(false);
    setShow(false);
    setNext(e=>e+1);
}
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <button className={`${(mach && next <num) ? 'd-block':'d-none'} btn btn-danger mx-1`} onClick={()=>handlNext()}>Next</button>
    </div>
  )
}

export default Next
