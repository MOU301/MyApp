import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Api/api';

const Slider = ({slider}) => {
    
    const [main,setMain]=useState(null);
    const [slider1,setSlider1]=useState([]);
    const [send,setSend]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        setSlider1(slider);
        setMain(slider[0])
     },[]);
   
    const handleImage=(e)=>{
    setSlider1(pre=>[...pre,e.target.files[0]]);
    }

     const remove=async ()=>{
        const arr=slider1.slice();
        if(typeof main=='object'){
           const i=arr.indexOf(main);
           arr.splice(i,1);
           setSlider1(arr);
        
        }else{
        await axiosInstance.post(`/removeSlider`,{'image':main}).then(res=>{
            if(res.data.message=='success'){
                const i=arr.indexOf(main);
                    arr.splice(i,1);
                    setSlider1(arr);
            }
        }).catch();
          
        } 
     }
useEffect(()=>{
    setMain(slider1[0])
    const arr=slider.slice();
    const arr1=slider1.map(item=>typeof item=='object' ? item.name:item);
    let update=false;
    if(arr.length!=arr1.length){
        update=true;
       
    }else{
        if(arr1.length>0){
            for(let i=0 ; i<arr1.length ; i++){
                if(!arr.includes(arr1[i])){
                    update=true;
                }
            
             }
        }else{
            update=false;
        }
    }
    setSend(update);
},[slider1.length])
   const Update=async ()=>{
        const formData=new FormData();
      slider1.forEach((file,index) => {
            formData.append(`slider[${index}]`,file);
      });
    await axiosInstance.post(`/addSlider`,formData,{
        headers:{
            "Content-Type":"multipart/form-data",
        }
    }).then(res=>{
        if(res.data.message=='success'){
            
    }}).catch();
    
   }

  return ( 
  <div className='my-5'>
    <div className='d-flex justify-content-between align-content-center align-items-cetner'>
        <div className='add-image'> 
            <label htmlFor="image">
                <img src="../../../src/assets/upload.jpg" />
            </label>
            <input type="file" id='image' onChange={(e)=>handleImage(e)} name='image' hidden/>
        </div>
        <div className='d-flex justify-content-center align-items-center align-content-center'>
        {send ? <button className='btn btn-success' onClick={()=>Update()}>update </button>:''}
        </div>
    </div>
    {slider1.length>0 ? (<div className="row">
        <div className="col-3 my-3">
            {slider1.map((item,index)=><div className='item-image mb-3' key={index}>
                   <img onClick={()=>setMain(slider1[index])} src={typeof item!='object' ? item:URL.createObjectURL(item)} />
                   </div>)} 
                </div>  
            <div className="col-9 my-3 ">
                <div className='d-flex justify-content-center align-items-center align-content-center'>
                    <div className='main-image'>
                      <img src={typeof main!='object' ? main:URL.createObjectURL(main)}  />
                    </div>
                </div>
                <div className='my-4 text-center'>
                    <button onClick={()=>remove()} className='btn btn-danger'>delete</button>
                </div>
            </div>
            
        </div>):''}
        
 </div> 
)
}

export default Slider
