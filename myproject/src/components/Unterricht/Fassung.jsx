import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'

const Fassung = ({id}) => {
    const {next,lessonData,num }=useContext(Context)
    const [path,setPath]=useState([]);

    useEffect(()=>{
setPath(lessonData.filter(item=> (item.id==id && item.type=='summary'))[0].src)
        },[]);

    
  const imageUrl =path;
  return path.length>0 ? (
    <section className={next==id ? 'fassung':'d-none'}>
        <div>
          <div className='image'><img src={imageUrl} alt="Downloadable" /></div>
          <br />
          <a href={imageUrl} download="downloaded-image.jpg">
            <button className='btn btn-success my-5'>Download Image</button>
          </a>
        </div> 
          {/* <div className="image ">
            <img src={`${path}.jpg`} alt="" />
          </div>
          <button className='btn btn-success my-5'>Download</button> */}
    </section>
  ):''
}

export default Fassung
