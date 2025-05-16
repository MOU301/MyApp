import React from 'react'
import { useParams } from 'react-router'
import AddFiles from './Elementes/AddFiles';

const AddVideo = () => {
  const {id}=useParams();

  return (
   <>
   <AddFiles type='video' id={id}/>
   </>
  )
}

export default AddVideo
