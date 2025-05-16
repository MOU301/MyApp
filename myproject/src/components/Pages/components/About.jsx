import React, { useContext } from 'react'
import { Context } from '../../../Context/Context'

const About = () => {
  const {about}=useContext(Context);
  return (
    <section className='container my-5'>
       <h3 className=' text-center text-red'> 
        <strong> About Us</strong>
       </h3>
       <div className='row my-5'>
        <div className='col-12 col-sm-6 my-3 box-shadow'>
          <div className="image">
            <img src={about[1].image}/>
          </div>
        </div>  
        <div className='col-12 col-sm-6 my-3 box-shadow'>
          <p>{about[0].text[0]}</p>
          <p>{about[0].text[1]}</p>
          <p>{about[0].text[2]}</p>
        </div>         
       </div>
    </section>
  )
}

export default About
