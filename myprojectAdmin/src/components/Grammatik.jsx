import React, { useState } from 'react'
import { useParams } from 'react-router'
import AddFiles from './Elementes/AddFiles';

const Grammatik = () => {
   const {id}=useParams();
 
  return (
   <>
   <AddFiles type='grammatik' id={id}/>
   </>
  )
}

export default Grammatik
