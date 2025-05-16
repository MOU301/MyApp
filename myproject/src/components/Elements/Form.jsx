import React, { useContext } from 'react'
import { Context } from '../../Context/Context'

const Form = ({type,children,handlLogin,handlCreate,handlInput,handlRegister}) => {
  const {message}=useContext(Context)
   
  return (
    <form onSubmit={type=='login' ? handlLogin:handlCreate}>
        
     <div className='login d-flex justify-content-center align-items-center aling-content-center'>
        <div>
        
            <h3 className='text-center'><strong>{type=='login' ? 'Login':"Create Acount"}</strong></h3>
            {message!='' ? <div className='bg-warning text-danger text-center my-3 border-5'><strong>{message}</strong></div>:""}
            {type!="login" ? 
            (<div>
                <label className='form-label text-dark' htmlFor="name"><strong>User Name :</strong> </label>
                <input className='form-control' onChange={(e)=>type=='login' ? '':handlRegister(e)} name='name' id='name' type='text' placeholder='Name' required/>
            </div>)
            :''
            }
            <br/>
            <div>
                <label className='form-label text-dark' htmlFor="email"><strong>Email : </strong></label>
                <input className='form-control' onChange={(e)=>type=='login' ? handlInput(e):handlRegister(e)} name='email' type='email' id='email' placeholder='momo@gmail.com' required/>
            </div>
            <br/>
            <div>
                <label className='form-label text-dark' htmlFor="password"><strong>Password : </strong></label>
                <input type=" password" onChange={(e)=>type=='login' ? handlInput(e):handlRegister(e)} className='form-control' name='password' placeholder='**********' required/>
            </div>
            <div className='d-flex justify-content-between my-3'>
            <button type='submit' className='btn btn-success'>{type=='login' ? "login":"createAcount"}</button>
            {children}
            </div>
           
        </div>
       </div></form>
  )
}

export default Form
