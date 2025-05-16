import React, { useEffect, useState } from 'react'
import TranslateCoponent from './components/TranslateCoponent';

const Translate = () => {
  const [word,setWord]=useState('');
    const translate=(e)=>{
        setWord(e.target.innerText);
    }
    const spaning=(text)=>{
        return text.split(' ').map((item,index)=><span key={index} className='text' onClick={(e)=>translate(e)}>{item} </span>);
    }
    const text='spielzeug ';
  return (
    <div>
      {spaning(text)}
     <TranslateCoponent word={word} setWord={setWord} />
    </div>
  )
}

export default Translate
