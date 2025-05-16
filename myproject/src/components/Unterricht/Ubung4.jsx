import React, { useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'
import { Context } from '../../Context/Context'
const Ubung4 = ({id}) => {
    const {show,setShow,lessonData,shaffel,mach,setMach,next}=useContext(Context);
    const [images,setImages]=useState([]);
    const [ubung,setUbung]=useState([]);
    const [anserShaffel,setAnserShaffel]=useState([]);
    useEffect(()=>{
      if(next==id){
        const dataFilter=lessonData.filter(item=>(item.number==id && item.type=='fillWithImage'));
        setImages(dataFilter[0].src);
          setUbung(dataFilter[0].ansur);
      }
   
    },[next])
   
    useEffect(()=>{
    setAnserShaffel(shaffel(ubung))
    },[ubung])

    const handlInput=()=>{
        let input=document.querySelectorAll('.ubung4 input');
        let arr=[];
        let fill=true
         for(let i=0; i<input.length ; i++){
            if(input[i].value==''){
                fill=false;
         
                
            }else{
                arr[input[i].getAttribute('data-key')]=input[i].value.toLowerCase();
                
            }
         }
         if(fill){
            setShow(false)
            // check the anser with data base
          setMach(true);
           for(let i=0 ; i<arr.length; i++){
            let styleU='';
               arr[i]===ubung[i]  ? (
                styleU='text-success'
               ):(
                 styleU='text-danger'
               );
               input[i].removeAttribute('class');
               input[i].classList.add(styleU);    
           }
         }
         else{
            setShow(true)
         }   
    }
  return images.length>0 ? (
    <Container className={next==id ? 'ubung4':'d-none'}>
        <Frag  achtungStyle={show ? 'd-block':'d-none'} frag='hi how are you ubung4  ? ' achtung="please choice the correct "/>
        <div>
           <ol className=' my-3' >
            {anserShaffel.map((item,index)=>
            <li key={index} className='mx-1'>{ubung[item]}</li>
            )
        }
           </ol>
          <div className='row  my-2 mx-1'>
            {
                
              images.map((item,index)=>
               <div className="col-6  col-sm-4 col-md-3" key={index}>
                <div className="image">
            
                    <img src={item}/>
                </div>
                <input className='my-1 text-primary' type="text" data-key={index} />
                <div className={mach ? 'text-success':'d-none'}>({ubung[index]})</div>
               </div>
              )
            }
            
          </div>
        </div>
        <div>
            <button onClick={()=>handlInput()} className="btn btn-danger">coriegen sie</button>
        </div>
    </Container>
    ):''
}

export default Ubung4
