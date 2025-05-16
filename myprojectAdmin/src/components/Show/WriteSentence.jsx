import React, { useEffect, useState } from 'react'


const WriteSentence = ({item}) => {
    const [questions,setQuestions]=useState([]);
    const [ansur,setAnsur]=useState([])
    useEffect(()=>{
        setQuestions(item.text.split('***'));
        
        setAnsur(item.ansur);
    },[]);

  return (
    <div>
        <h3 className='text-danger'>Write Sentences</h3>
        <ul>
            {questions.map((item,index)=>{
              return(
                <li className='my-2' key={index}>
                   <div className='text-danger'> {item}</div>
                   <div className='text-success'>{ansur[index]}</div>
                </li>

              )
            })}
        </ul>
    </div>
  )
}

export default WriteSentence
