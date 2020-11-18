import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { getStoreType } from '../actions/storeActions';
import {useHistory} from 'react-router-dom'



const OptionCarousel = () => {
    const history=useHistory()
    
  const dispatch = useDispatch();
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      
    
    const Options=[
        {img:"https://cdn.pixabay.com/photo/2016/11/29/09/32/antique-1868726__340.jpg",optionName:'Automotive'},
        {img:"https://cdn.pixabay.com/photo/2016/08/07/11/46/dolls-houses-1576105__340.jpg",optionName:'Baby & Toddler'},
        {img:"https://cdn.pixabay.com/photo/2015/10/12/15/18/store-984393__340.jpg",optionName:'Clothing & Shoes'},
        {img:"https://cdn.pixabay.com/photo/2017/01/22/12/07/imac-1999636__340.png",optionName:'Computers'},
        {img:"https://cdn.pixabay.com/photo/2014/09/20/13/52/board-453758__340.jpg",optionName:'Electronics'},
    {img:"https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289__340.jpg",optionName:'Entertainment & Arts'},
        {img:"https://cdn.pixabay.com/photo/2017/08/06/13/56/doughnut-2592733__340.jpg",optionName:'Food & Gifts'},
        {img:"https://cdn.pixabay.com/photo/2019/09/16/17/18/spa-4481538__340.jpg",optionName:'Health & Beauty'},
        {img:"https://cdn.pixabay.com/photo/2017/11/16/19/29/spring-2955582__340.jpg",optionName:'Home & Garden'},
        {img:"https://cdn.pixabay.com/photo/2017/02/14/10/21/office-2065542__340.jpg",optionName:'Office & Professional Services'},
        {img:"https://media.istockphoto.com/photos/female-plumber-on-site-picture-id523185800?b=1&k=6&m=523185800&s=170667a&w=0&h=DRUSUr0QYhXYk-XPloa1l5GyCMW14fZM1VgIYlN0cJs=",optionName:'Personal & Home Services'},
        {img:"https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590__340.jpg",optionName:'Restaurants & Dining'},
        {img:"https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275__340.jpg",optionName:'Software'},
        {img:"https://cdn.pixabay.com/photo/2017/09/20/18/31/boys-2769553__340.jpg",optionName:'Sports & Outdoors'},
        {img:"https://cdn.pixabay.com/photo/2015/07/11/23/02/plane-841441__340.jpg",optionName:'Travel'},
    ]
        console.log(Options)
  
    return (
      <>
      <h1>Categories</h1>
        <Carousel responsive={responsive} centerMode={true} infinite={true} >
  { Options.map(item=>{
    const handleSelect=()=>{
     dispatch(getStoreType(item.optionName,history))
      
    }
      return(
        <div
      key={item.img}
      onClick={handleSelect}
      className='options'
      >
        <img alt="example" src={item.img} style={{width:430,height:200}}/>
        
        <h3>{item.optionName}</h3> 
      
      </div>
      )
  })}
</Carousel>
</>
    )
}


export default OptionCarousel
