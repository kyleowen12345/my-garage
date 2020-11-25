import React from 'react'
import { Carousel } from 'antd';


const ImageCarousel = () => {
   
    return (
        <Carousel autoplay effect="fade">
          <img src={"https://res.cloudinary.com/kaking/image/upload/v1606272057/lchoxskrwmmnez4noqtq.jpg"}  alt="mygarage" className='carousel_image'/>
          <img src={"https://res.cloudinary.com/kaking/image/upload/v1606270248/vh1idlg8ztfcwx2msywm.jpg"}  alt="mygarage" className='carousel_image'/>
    <img src={"https://res.cloudinary.com/kaking/image/upload/v1606271227/hdzw0aflbbtejosaklxb.jpg"}  alt="mygarage" className='carousel_image'/>
    <img src={"https://res.cloudinary.com/kaking/image/upload/v1606271583/nasswv1k1nzmn7q0rzjo.jpg"}  alt="mygarage" className='carousel_image'/>
    <img src={"https://res.cloudinary.com/kaking/image/upload/v1606270183/ksk7uidlgarorafiul3d.jpg"}  alt="mygarage" className='carousel_image'/>
    
    
  </Carousel>
    )
}


export default ImageCarousel
