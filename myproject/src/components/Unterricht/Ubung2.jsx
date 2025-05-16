import React,{useContext, useEffect, useState} from 'react'
import Container from '../Elements/Container'
import Frag from '../Elements/Frag'

import { Context } from '../../Context/Context';
import ListItem from '../Elements/listItem';
// const data=[{'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],"ubung":[0,1,0,0,1]}]
const Ubung2 = ({id}) => {
     const [text,setText]=useState([]);
     const [ansur,setAnsur]=useState([]);
     const {FR,setFR,show,setShow,mach,setMach,next,lessonData}=useContext(Context);
    
     useEffect(()=>{
          if(next==id){
           const FilterData=lessonData.filter(item=>(item.number==id && item.type=='trueAndFalse'));
           console.log(FilterData);
           setText(FilterData[0].text.split('***'))
           setAnsur(FilterData[0].ansur);
     }}
     ,[next])

     

const handl=(e)=>{

   if(!mach) {
     const name=document.getElementsByName(e.target.name);
     for(let i=0; i<name.length; i++){
      name[i].nextSibling.classList.remove('text-primary');
     }
     const c=Number(e.target.value)==0 ? 1:0;
     name[c].nextSibling.classList.add('text-primary')
    const arr=FR.slice();
     arr[e.target.name]=Number(e.target.value);
     setFR(arr)}
}
  const handlInput=()=>{
     setShow(false)
     const radio=document.getElementsByClassName('radio');
  
     let ubung=ansur.slice();
     let choice=true;

     for(let i=0; i<FR.length ; i++){
          if(FR[i]==null){
               choice=false;
          }
     }
     if(FR.length==ubung.length && choice){

          for(let i=0; i<ubung.length; i++){
               setMach(true);
               let styleIcon=''
               
           ubung[i]==FR[i] ? 
           (
            styleIcon='text-success'
           ):
           (
            styleIcon='text-danger'
           );
           const class1=radio[i].children[2].classList;
           const class2=radio[i].children[4].classList;
           class1.contains('text-primary') ? class1.add(styleIcon):'';
           class2.contains('text-primary') ? class2.add(styleIcon):'';
           radio[i].children[5].children[ubung[i]].classList.remove('d-none');
          }
     }
     else{
          setShow(true);
         
     }

  }
  return (
    <Container className={next==id ? 'ubung2':'d-none'}>
        <Frag achtungStyle={show ? "d-block":"d-none"}  frag='wie alt bist du jetzt ? ' achtung='bitte mach die  ubung !'/>
        <ul>
           {text.map((item,index)=>
           <ListItem key={index} item={item} index={index} handling={handl}/>)
           }
        </ul>
        <div>
            <button onClick={()=>handlInput()} className="btn btn-danger">coriegen sie</button>
        </div>
    </Container>
  )
}

export default Ubung2
