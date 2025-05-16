import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import { Context } from '../Context/Context'
import { Link, useNavigate } from 'react-router-dom';
import MessageItem from '../Components/MessageItem';
import Spinner from '../Components/Spinner';

const Message = () => {
    const {messages,loading}=useContext(Context);
    const [messages1,setMessages1]=useState([]);
    const [messagesN,setMessagesN]=useState([]);
    const [messagesO,setMessagesO]=useState([]);
    const [newM,setNewM]=useState(false);
    const [old,setOld]=useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('id')==null){
      navigate('/');
       }
  },[]);  
  useEffect(()=>{
      
       setMessages1(messages);
    },[messages])
    useEffect(()=>{
      if(messages1.length>0){
       messages1.forEach(item=>{item.status==1 ? setMessagesO(pre=>[...pre,item]):setMessagesN(pre=>[...pre,item])})
      }
    },[messages1])
   const change=(index)=>{

    setMessagesN(pre=>pre.filter((_,i)=>i!=index))
    setMessagesO(pre=>[...pre,messagesN[index]]);
   }
   const remove=(index)=>{
    setMessagesO(pre=>pre.filter((_,i)=>i!=index))
   }
  return !loading ? (
    <section className='py-5'>
        <div className="container">
           <h4 className='text-center text-danger'><strong>all the message</strong></h4>
           {messages1.length>0 ? <>
           <div className='text-white bg-success px-2 my-2' onClick={()=>setNewM(e=>!e)}><strong>new message</strong><span className='mx-5'>{messagesN.length}</span></div>
            {newM ?  messagesN.map((item,index)=><MessageItem message={item} index={index} change={change} type="new" key={index}/>):""}
            <div className='text-white bg-danger px-2 my-2' onClick={()=>setOld(e=>!e)}><strong>old message</strong><span className='mx-5'>{messagesO.length}</span></div>
            {old ? messagesO.map((item,index)=><MessageItem message={item} index={index} type="old" remove={remove}  key={index}/>) : ""}
            </>:''} 
        </div>
    </section>
  ):<Spinner />
}

export default Message
