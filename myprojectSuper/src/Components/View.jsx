import React from 'react'

const View = ({item,handlAccept}) => {
    
  return (
    <div className='border px-3 my-2'>
                <strong>name :</strong>{item.name}<br/>
                <strong>view :</strong>
                <p>{item.body}</p>
            {item.state ?  <button className='btn btn-danger' onClick={()=>handlAccept(item.id)} >not accept</button>
                        :  <button className='btn btn-success' onClick={()=>handlAccept(item.id)} >accept</button>
             }
            </div>
  )
}

export default View
