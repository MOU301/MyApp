import React from 'react'
import { VscError } from "react-icons/vsc";
import { HiMiniCheck } from "react-icons/hi2";
const ListItem = ({handling,item,index}) => {
  return (
    <li className='radio d-flex' onChange={(e)=>handling(e)} >
               <span className='question'>{item}</span>
               <input type="radio" name={index} value='1' id={`option${index}1`} hidden />
                    <label  htmlFor={`option${index}1`}><HiMiniCheck className=' fs-4'/></label>
               <input type="radio"  name={index} value='0' id={`option${index}2`} hidden/>
                    <label htmlFor={`option${index}2`}> <VscError className=' fs-4 '/></label>
                    <div className='mx-4'>
                         <VscError className='d-none fs-4  text-success'/>
                         <HiMiniCheck className='d-none fs-4 text-success'/>
                    </div>
    </li>
  )
}

export default ListItem
