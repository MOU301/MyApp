import React, { useCallback, useContext, useEffect, useState } from 'react'
import { IoIosAddCircle, IoMdRemoveCircle  } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context/Context';


const Bot = () => {
    const {lesson,setLesson,goBack}=useContext(Context);
    const [bot,setBot]=useState([{ask:'',ansur:['']}])
    const [ele,setEle]=useState({});
    const [edit,setEdit]=useState(false);
    const {id}=useParams();
    const navigate=useNavigate();
 useEffect(()=>{
  // const url=window.location.pathname;
  // setCourse_id(url.split('/')[2]);

  let arr= lesson.filter(item=>item.number==id && item.type=='bot');
  
if(arr.length>0){
  setEle(arr[0]);
  setEdit(true);
  setBot(arr[0].bot)
}
 },[])


    const handleBot=(e)=>{
        e.preventDefault()
     
         let data={
          number:id,
          type:"bot",
          bot:bot
        }
        
        if(edit){
          if(ele.hasOwnProperty('id')){
            
            data={...data,id:ele['id']};
           
          }
          
          let arr=lesson.filter(item=>!(item.number==id && item.type=='bot'));
        
          arr.push(data);
      
         
            setLesson(arr);
         }else{
          setLesson(item=>[...item,data]);
         }
     navigate(goBack);
         //start
        
          
         //end
    }
    
    const handleAddAsk=()=>{
        setBot(e=>[...e,{ask:'',ansur:['']}])
       
    }
    const handleAddAnswer=(index)=>{
      const item=bot[index];
      item.ansur.push('')
      const copyBot=bot.slice()
      setBot(copyBot)
    }
    const handleFeedBack=(index)=>{
      const item = bot[index];
      const hasFeedback = item.hasOwnProperty("feedBack");

      const newItem = hasFeedback
        ? (({ feedBack, ...rest }) => rest)(item) 
        : { ...item, feedBack: "" };              

      const newBot = [...bot];
      newBot.splice(index, 1, newItem);

      setBot(newBot);
              
          }

    useEffect(()=>{
      console.log(bot)
    },[bot])
    const handleAsk=(e)=>{
      e.preventDefault();
        console.log('save the ask in object');
    }
const removeAnswer=(indexAsk,indexAnswer)=>{
  setBot(prevBot =>
    prevBot.map((item, index) =>
      index === indexAsk
        ? {
            ...item,
            ansur: item.ansur.filter((_, i) => i !== indexAnswer)
          }
        : item
    )
  );
  
}
  const putAsk=(e,index)=>{ 
    const e1=e.target.value;
    console.log(e1)
    const copyBot=bot.slice();
    console.log({...copyBot});
    
    setBot(e =>
      e.map((item, i) => {
        // Check if item is valid before updating
        return i === index ? { ...item, ask: e1 } : item;
      })
    );

  }
  const putFeedBack=(e,index)=>{ 
    const e1=e.target.value;
    setBot(e =>
      e.map((item, i) => {
        // Check if item is valid before updating
        return i === index ? { ...item, feedBack: e1 } : item;
      })
    );

  }
  const putAnswer = (e, itemIndex, answerIndex) => {
    const val = e.target.value;
    setBot(prev =>
      prev.map((item, i) => {
        if (i !== itemIndex) return item;
        const newAnswers = [...item.ansur];
        newAnswers[answerIndex] = val;
        return { ...item, ansur: newAnswers };
      })
    );
  };


   const buildInput=useCallback(()=>{
    
       return(bot.map((item,index)=>
        <div className='form-control my-2 p-2' key={index}>
           <div className='my-2'>
                <label className='form-lebel' > Ask {index+1}:</label>
                <input type="text" onChange={e=>putAsk(e,index)} value={item.ask||''} className='form-control border-danger' required/>
           </div>
           
           {item.ansur.map((ele,i)=><div className='my-2 mx-2' key={i}>
                  <div className='mt-3 mb-1'>
                    <label className='form-lebel' > Answer {i+1}:</label>
                    <span className=' text-danger mx-5'>
                      <IoMdRemoveCircle className=' fs-3' onClick={()=>removeAnswer(index,i)}/></span>
                  </div>
                  <input type="text"  
                         value={item.ansur[i] || ''}
                         onChange={(e) => putAnswer(e, index, i)} 
                         className='form-control border-success' 
                         required/>
            </div>
           )}
           <div className='my-3 text-success pointer' onClick={()=>handleAddAnswer(index)}>
                <IoIosAddCircle className='fs-2'/>
                <span className='mx-2'>
                    <strong>add answer</strong>
                </span>
            </div>
            
            <div className='my-3 pointer' onClick={()=>{handleFeedBack(index)}}>
               {item.hasOwnProperty('feedBack') ?  
               (<><IoMdRemoveCircle className='fs-2 text-danger'/>
                <span className='mx-2'>
                    <strong className='text-danger'>no feedback</strong>
                </span></>):
                (<><IoIosAddCircle className='fs-2 text-success'/>
                  <span className='mx-2'>
                      <strong className='text-success'>add feedback</strong>
                  </span></>)
               }
            </div>
           {item.hasOwnProperty('feedBack') ? (
                    <div className='my-2 mx-2'>
                      <label className='form-lebel' > FeedBack :</label>
                      <input type="text"
                             className='form-control border-primary'
                             onChange={e=>putFeedBack(e,index)}
                             value={item.feedBack||''}
                             required/>
                    </div>
           ):''}
       </div>
        )
       )
   },[bot])
 
  return (
    <section className='my-3'>
        <div className='container'>
            <h4 className='text-danger'><strong>Add New Bot</strong></h4>
            <form onSubmit={handleBot}>
             
               <div className='my-3 text-success pointer w-100' onClick={()=>handleAddAsk()}>
                 <IoIosAddCircle className='fs-2'/>
                 <span className='mx-2'>
                    <strong>add ask</strong>
                 </span>
               </div>
               <div className='my-2'>
                 {buildInput()}
               </div>
              <button type='submit' className='btn btn-success'>{edit ? "Update":"add"}</button>
            </form>
        </div>

    </section>
  )
}

export default Bot
