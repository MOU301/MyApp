import React, { useEffect } from 'react'

const QuestionAndAnsur = ({item}) => {
  useEffect(()=>{
    console.log(item)
  },[])
  return (
    <>
    <h4 className='text-danger'>{item.type}</h4>
    <div className='d-flex'>
       <ol type='a 'className='col-6'>
        {item.text.split("***").map((item,index)=><li key={index}>{item}</li>)}
       </ol>
       <ol className='col-6'>
        {item.ansur.map((item,index)=><li key={index}>{item}</li>)}
       </ol>
    </div>
    </>
  )
}

export default QuestionAndAnsur
