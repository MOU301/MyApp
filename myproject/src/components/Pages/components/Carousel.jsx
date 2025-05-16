import React, { useContext } from 'react'
import { Context } from '../../../Context/Context';
//the maincrousel kommt aus database

const Carousel = () => {
  const {maincarousel}=useContext(Context);
    const url='../../../src/assets/test';
   
  return (
    <section className='container my-5'>

<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
       {maincarousel.map((data,index)=><div className={`carousel-item ${index==0 ? 'active':''}`} key={index}>
     <img src={`${url}/${data}`} className="d-block w-100" />
     </div>)}
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
</div>
</section>
  )
}

export default Carousel
