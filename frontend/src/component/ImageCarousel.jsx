import React from 'react'
import { Carousel } from 'antd';


const ImageCarousel = () => {
   
    return (
        <Carousel autoplay effect="fade">
    
      <img src={"https://res.cloudinary.com/kaking/image/upload/v1605587118/vcyhqliozdtcvgsoy4tr.jpg"}  alt="mygarage" className='carousel_image'/>
    
    <img src={"https://res.cloudinary.com/kaking/image/upload/v1605587458/baudirnq2bnbymwgvvex.jpg"}  alt="mygarage" className='carousel_image'/>
    
    <img src={"https://res.cloudinary.com/kaking/image/upload/v1605587840/jfltohux41zto0ur70qw.jpg"}  alt="mygarage" className='carousel_image'/>
    
    <img src={"https://res.cloudinary.com/kaking/image/upload/v1605587937/ujribcmmsnbhxr96ce0i.jpg"}  alt="mygarage" className='carousel_image'/>
    <img src={"https://res.cloudinary.com/kaking/image/upload/v1605590300/pwyhdlofvbkfgjdvnern.jpg"}  alt="mygarage" className='carousel_image'/>
    <img src={"https://res.cloudinary.com/kaking/image/upload/v1605590516/nv9f2lk0fff3q9aob6tr.jpg"}  alt="mygarage" className='carousel_image'/>
  </Carousel>
    )
}


export default ImageCarousel
