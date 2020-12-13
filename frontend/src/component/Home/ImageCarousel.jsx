import React from 'react'
import { Carousel } from 'antd';


const ImageCarousel = () => {
   
    return (
        <Carousel autoplay effect="fade">
          <div className="imagecarousel">
          <h2 className="centered">Sell and Buy Online</h2>
          <img src={"https://res.cloudinary.com/kaking/image/upload/v1606272057/lchoxskrwmmnez4noqtq.jpg"}  alt="mygarage" className='carousel_image'/>
          </div>
          <div className="imagecarousel">
          <h2 className="centered">We are always open</h2>
          <img src={"https://res.cloudinary.com/kaking/image/upload/v1606270248/vh1idlg8ztfcwx2msywm.jpg"}  alt="mygarage" className='carousel_image'/>
          </div>
        <div className="imagecarousel">
        <h2 className="centered">Buy meals here</h2>
        <img src={"https://res.cloudinary.com/kaking/image/upload/v1606271227/hdzw0aflbbtejosaklxb.jpg"}  alt="mygarage" className='carousel_image'/>
        </div>
       <div className="imagecarousel">
       <h2 className="centered">Build your hobby</h2>
       <img src={"https://res.cloudinary.com/kaking/image/upload/v1606271583/nasswv1k1nzmn7q0rzjo.jpg"}  alt="mygarage" className='carousel_image'/>
       </div>
    <div className="imagecarousel">
    <h2 className="centered">Dress Up</h2>
    <img src={"https://res.cloudinary.com/kaking/image/upload/v1606270183/ksk7uidlgarorafiul3d.jpg"}  alt="mygarage" className='carousel_image'/>
    </div>
    
    
    
  </Carousel>
    )
}


export default ImageCarousel
