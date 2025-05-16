import React, { useState ,useEffect, useCallback, useContext} from 'react'
import { MdOutlineKeyboardVoice,MdOutlineRecordVoiceOver } from "react-icons/md";
import { Context } from '../../Context/Context';
import Container from '../Elements/Container';

// const topics = {
//     vorstellen: [
      // { question: "Wie heißt du?", answer: "Ich heiße " ,feedback:"hallo ****"},
      // {question:"bist du verheiratet? ",answer:["Ja","Nein"]},
      // { question: "Wie alt bist du?", answer: "Ich bin " },
      // {question : "Woher kommst du ? ",answer:"Ich komme aus"}
      
//     ]};

const BotTest = ({id}) => {
//join with  my app
 const {show,next,setShow,mach,setMach,lessonData,spaning}=useContext(Context);
const [topics,setTopics]=useState([
  { question: "Wie heißt du?", answer: "Ich heiße " ,feedback:"hallo ****"},
  {question:"bist du verheiratet? ",answer:["Ja","Nein"]},
  { question: "Wie alt bist du?", answer: "Ich bin " },
  {question : "Woher kommst du ? ",answer:"Ich komme aus"}
]);
 useEffect(()=>{
 
     if(next==id){
     
  const dataFilter=lessonData.filter(item=>(item.number===id && item.type=='bot'));
  setTopics(dataFilter[0].bot)
  // console.log(dataFilter);
        //set the data in state 
         
     }
     setStart(false);
     console.log('the next is :'+next +"and the id is "+id)
       },[next]);
       useEffect(()=>{
        console.log(topics[0]['feedBack'])
       },[topics]);
//edn the join 




    const [was,setWas]=useState(false);
    const [question,setQuestion]=useState('');
    const [start,setStart]=useState(false);
    const [topic, setTopic] = useState("vorstellen");
    const [counter,setCounter]=useState(0)
    const [isReady,setIsReady]=useState(false);
  
    const findDifference=(str1,str2)=>{
      const arr1 = str1.split(' ');
      const arr2 = str2.split(' ');
    
      const diff = arr1.filter(word => !arr2.includes(word));
      return diff; // returns an array of different words
    }
    const handleCounter=()=>{
      if(topics.length==counter+1){
        speakResponse('du bist firtig und gut gemacht ');
        setStart(false);
        setCounter(0)
        setWas(false)
        setIsReady(false)
        setMach(true);

      }
      else{
        setCounter(e=>e+1);
      }
    }
    const handlefeedback=(transcript,correctAnswer)=>{
      const yourAnsuer=transcript.slice(0,-1);
      
      let correctItem ='falsch';
      if(typeof correctAnswer=='object'){
          for(let i=0 ; i<correctAnswer.length; i++){
            if(correctAnswer[i].toLowerCase()==yourAnsuer.toLowerCase()){
              correctItem=correctAnswer[i];
              break;
            }
          }
        }else{
          correctItem=correctAnswer;
        }
       console.log(yourAnsuer.toLowerCase())
    const correct=yourAnsuer.toLowerCase().includes(correctItem.toLowerCase());
      if(correct){
        if(topics[counter]['feedBack']!=null){
              const feedback1=findDifference(yourAnsuer,correctItem);
              const ff=topics[counter]["feedBack"].replace("****",feedback1);
              speakResponse(ff);
            }
            handleCounter();
            setIsReady(false);
            setWas(false);
       }else{
        speakResponse("Leider falsch. Versuch es nochmal.");
         handleFalsch();
       }
    }
    const handleAnswer = (transcript) => {
    
        const correctAnswer = topics[counter].ansur;
         handlefeedback(transcript,correctAnswer)        
    }
    const startVoiceRecognition = () => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "de-DE";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleAnswer(transcript); // Automatically check the answer after voice input
      };
      recognition.onerror = (event) => {
        handleNoVoice(); 
      };
      recognition.start();
    }
    const handleNoVoice=()=>{
      handleFalsch();
    }
    const speakQuestion = (text) => {
      if(start){
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.onend=()=>{
      setIsReady(true)
      setWas(true)

      }
      speechSynthesis.speak(utterance);
    }
    };
    const speakResponse = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      speechSynthesis.speak(utterance);
    };
    const handleFalsch=()=>{
     setWas(false)
     setIsReady(false)
      speakQuestion(question);
      
    }
    useEffect(() => {
     const randomQuestion = topics[counter];
     setQuestion(randomQuestion.ask);
        if(start){
          speakQuestion(randomQuestion.ask);
        }
        else{
          setWas(false)
          setIsReady(false)
        }
    },[start,counter]);
    const rrr=useCallback(()=>{
        return was ? 
          <div className='answer'>
            <MdOutlineKeyboardVoice className='text-white fs-3'/>
            <button onClick={handleClick} hidden></button> 
           </div>:
          <div className='ask'>
             <MdOutlineRecordVoiceOver  className='text-white fs-3'/>
          </div>
          
         },[was])  
    useEffect(()=>{
    if(isReady){
      const timer = setTimeout(() => {
        handleClick(); 
      },500);
      return () => clearTimeout(timer);
    }
    },[isReady]) 

    const handleClick=()=>{
      startVoiceRecognition()
    }

  return (
    
    <Container className={next==id ? 'bot':'d-none'}>
            <button className={`btn ${start ? "btn-danger":'btn-success'}`} onClick={()=>setStart(e=>!e)}>{start ? 'stop':'start'}</button>
            <div className='h-100 d-flex justify-content-center align-items-center align-content-center'>
              {start ? rrr():''}
            </div>
    </Container>
     
  )
}

export default BotTest
