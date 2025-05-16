import React, { useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'
import { Context } from '../../Context/Context'
const data=[{'text':['one','tow','three','four'],'ubung':['one','tow','three','four']}]

const ubung3= ({id}) => {
    const {next,show,setShow,mach,setMach,shaffel,spaning ,lessonData}=useContext(Context);
    const [text,setText]=useState([]);
    const [anser,setAnser]=useState([]);
    const [anserAlias,setAnserAlias]=useState([]);
    const [shafel,setShafel]=useState([]);
    const [check,setCheck]=useState(false);

    useEffect(()=>{
      if(next==id){
        const FilterData=lessonData.filter(item=>(item.number==id && item.type=='questionAndAnsur'));
        console.log(FilterData);
      const anserArr=['a','b','c','d','e','f','g','h'];
      const text1=FilterData[0].text.split('***');
      const anser11=anserArr.slice(0,FilterData[0].ansur.length);
       setAnser(FilterData[0].ansur);
    setText(text1) ;
    setAnserAlias(anser11);//alias for data in ubung
  }},[next]);
  useEffect(()=>{
    setShafel(shaffel(anser))
  },[anser]);
  useEffect(()=>{
  console.log(text);
  },[text])
 
  const handling =(e)=>{
    // const input=document.getElementsByTagName('input');
  
    if(e.target.value.length!=0){
        if(e.target.value.length>0){
          // const n=e.target.name.slice(1);
        
          setCheck(true);
        }
    }
}
const handlClick=(e)=>{
  if(!mach) {
  e.target.value='';
  setCheck(false);
  }
}
    const handlInput=()=>{
    if(!mach){
      setShow(false);
       const input=document.getElementsByClassName('fill');
       let arr=[];//my anser
       let ubung=anser.slice();//anser from data base
       let fill=true;
       for(let i=0; i<input.length; i++){
           arr[input[i].getAttribute('data-key')]=input[i].value;
           if(input[i].value ==''){
              fill=false;
             }
       }
       
      if(fill){
             setShow(false);
             setMach(true);
    
               for(let i=0; i<ubung.length ; i++){
                   let styleU='';
        
                   anserAlias[shafel[i]]==arr[i] ?  (
                   styleU='text-success'
                   ):(
                   styleU='text-danger'
                   );
                   input[i].classList.remove('text-primary');
                   input[i].classList.add(styleU);
               }
           }else{
               setShow(true);
           }
       }

    }

  return (
    <Container className={next==id ? 'ubung3':'d-none'}>
        <Frag  achtungStyle={show ? 'd-block':'d-none'} frag='hi how are you ? ' achtung="please choice the correct "/>
       <div className='d-flex'>
          <ol className=' border'>
           {text.map((item,index)=>
           <li  key={index}>
                <div className="d-flex ">
                    <span className={mach  ? 'text-success mx-2': 'd-none'}>({anserAlias[shafel[index]]})</span>
                    <p >{spaning(item)}</p>
                    <input className='fill text-primary' type="text" onClick={(e)=>handlClick(e)} onChange={(e)=>handling(e)}  name={`f${index}`}   data-key={index} readOnly={check}/>
                
                </div>
            </li>
          )}
          </ol>
          <ol className='mx-2 border' type='a'>
            {shafel.map((item,index)=>
                  <div key={index}> 
                     <li>
                        <p>{anser[item]}</p>
                     </li>
                  </div>
            )}
          </ol>
       </div>
        <div>
            <button onClick={()=>handlInput()} className="btn btn-danger">coriegen sie</button>
        </div>
    </Container>
  )
}

export default ubung3
