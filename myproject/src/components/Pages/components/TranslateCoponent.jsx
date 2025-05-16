import React, { useCallback, useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import axios from 'axios';

const TranslateCoponent = ({word,setWord}) => {
    const [result,setResult]=useState('');
    const [lang,setLang]=useState('de|en');
    const [loading,setLoading]=useState(true);
    const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Handle when mouse is pressed down (start dragging)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
  };

  // Handle mouse move (dragging)
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        left: e.clientX - offset.x,
        top: e.clientY - offset.y,
      });
    }
  };

  // Handle mouse up (stop dragging)
  const handleMouseUp = () => {
    setIsDragging(false);
  };
 useEffect(()=>{
     if(word==''){
       setResult('');
     }
     translateText(word)
     .then(res=>{setResult(res.data.responseData.translatedText),setLoading(true)})
     .catch(error=>console.log(error))
   },[lang,word])
   const translateText=async(text)=>{
    setLoading(false)
    return await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: lang // Deutsch zu Arabisch
      }});
      
    }
    const load=useCallback(()=>{
      if(loading){
          return <span className='text-success'>{result} </span>
      }else{
        return <span>loading ...</span>
      }

    },[loading,lang])
  return word!='' ? (
 
    <div className='translate p-2'  style={{
      position: 'absolute',
      top: position.top,
      left: position.left,
    }}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}>
      
     <div className='d-flex justify-content-between'>
       <select value={lang} onChange={(e)=>setLang(e.target.value)}  name="lang" id="lang" >
        <option  value="de|en">English</option>
        <option value="de|ar">Arabic</option>
        <option value="de|uk">Ukranish</option>
       </select>
        
        <IoMdCloseCircle className='fs-4 text-danger' onClick={()=>{setWord('')}} />
      </div>
      <div><span className='text-danger'>{word}</span></div>
      {load()}
    </div>
    
  ):''
}

export default TranslateCoponent
