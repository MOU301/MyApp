import React, { useContext, useEffect, useState } from 'react'
import Frag from '../Elements/Frag';
import Container from '../Elements/Container';
import { Context } from '../../Context/Context';

const WriteSentence = ({id}) => { 
    const [text,setText]=useState([]);
    const [ansur,setAnsur]=useState([]);

    const {show,next,setShow,mach,setMach,lessonData,spaning}=useContext(Context);
    useEffect(()=>{

    if(next==id){
        
        const dataFilter=lessonData.filter(item=>(item.number==id && item.type=='writeSentence'));
        setAnsur(dataFilter[0].ansur);
        setText(dataFilter[0].text.split('***'));
    }
      },[next]);
    const handlInput=()=>{
        if(!mach){
       setShow(false);
        const input=document.getElementsByClassName('fill2');
        let arr=[];
        let ubung=ansur.slice();
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
                    ubung[i]==arr[i] ?  (
                    styleU='text-success'
                    ):(
                    styleU='text-danger'
                    );
                    // input[i].removeAttribute('class');
                    input[i].classList.add(styleU);
                }
            }else{
                setShow(true);
            }
        }
    }
 
  return (
      <Container className={next==id ? 'ubung1':'d-none'}>
                <Frag achtungStyle={show ? 'd-block':'d-none'} frag="Lorem ipsum sit amet. ?" achtung="fill the field please ! "/>                <p>
                    {text.map((item,index)=><div className='my-3 p-2' key={index}>{spaning(item)}<br/>
                     <input className='text-primary fill2 sentence' 
                               type='text' 
                               data-key={index} 
                               readOnly={mach ? true:false}
                        />
                      
                        <div className={mach ? ' text-success':'d-none'}>
                            ({ansur[index]})
                        </div>
                    </div>)}
                </p>
                <div>
                    <button onClick={()=>handlInput()} 
                            className="btn btn-danger">
                                coriegen sie
                    </button>
                </div>
       </Container>
  )
}

export default WriteSentence

