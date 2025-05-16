import React from 'react'
import AddFiles from './Elementes/AddFiles'
import { useParams } from 'react-router'

const AddAudio = () => {
  const {id}=useParams();
  return (
    <>
    <AddFiles type='audio' id={id}/>
    </>
  )
}

export default AddAudio
