import React, { useEffect, useState } from 'react'

const Bot = ({item}) => {
    const [bot,setBot]=useState(item.bot);
    
  return (
    <div>
        {bot.map((item,index)=>{
            return(
               <div key={index}>
                <h5  key={index}>{`Ask ${index+1} :`}</h5>
                <div className='p-2 border'>
                    <div ><strong >Ask :</strong><span className='text-danger'>{item.ask} ?</span></div>
                    {item.ansur.map((e,i)=>{
                        return <div key={i}><strong>{`Asnwer ${i} :`}</strong><span className='text-success'>{e}</span></div>
                    })}
                    {item.feedBack ? <div ><strong >feedBack :</strong><span className='text-danger'>{item.feedBack}</span></div>:''}
                </div>
               </div>
            )
        }
        )}
    </div>
  )
}

export default Bot
