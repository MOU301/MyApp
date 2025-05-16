import React from 'react'

const Frag = ({frag,achtung,achtungStyle}) => {
  return (
    <h5 >
        <strong >{frag} </strong> 
        <span className={`${achtungStyle} show mx-5 text-danger`} >{achtung}</span>
    </h5>
  )
}

export default Frag
