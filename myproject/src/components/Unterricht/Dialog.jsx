import React, { useContext, useEffect, useState } from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'

import { Context } from '../../Context/Context'

const Dialog = ({id}) => {
    const{lessonData,next,setMach,spaning}=useContext(Context);
    const [text,setText]=useState([]);
    useEffect(()=>{
       if(next==id){
        const dataFilter=lessonData.filter(item=>(item.number==id && item.type=='dialog'));
        const arr= dataFilter[0].text.split('**');
        setText(arr)
       }
    },[next])
  return (
    <Container className={next==id ? 'dialog':"d-none"}>
       <Frag achtungStyle='' frag="lessen sie die dialog " achtung='' />
       <div className="row">
        <div className="col-12 col-md-6">
            {text.map((item,index)=>{
                if(index%2 == 0){
                return <strong className='text-danger' key={index}>{item} : </strong>
                  }
                  else{
              
                  return <span key={index}><span>{spaning(item)}</span><br/></span>
                
                  }
            })}
        </div>
        <div className="col-12 col-md-6">
            <div className="image">
                <img src="../../../src/assets/test/dialog1.jpg" alt="" />
            </div>
        </div>
        
       </div>
       <div onClick={()=>setMach(true)} className="my-3 btn btn-success">done</div>
    </Container>
  )
}

export default Dialog
