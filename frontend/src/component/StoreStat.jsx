import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getAllPInS } from '../actions/productAction';
import Cookie from "js-cookie";
import { Link } from 'react-router-dom';

const StoreStat = () => {
    const getStoreProds = useSelector((state) => state.getStoreProds);
    const { PinSInfo } = getStoreProds;
    const dispatch = useDispatch();
    const storeNameFam=Cookie.getJSON("_stohremate");

    
    useEffect(()=>{
        dispatch(getAllPInS(storeNameFam))
      },[dispatch,storeNameFam])

     console.log(PinSInfo)
    return (
        <div className="sign__form">
           {PinSInfo?.map(item=>{
                
                
               return(
                   <div className="sign__form" key={item._id}>
                       <img src={item.image} alt="my garage"/>
               <p>{item.productName}</p>
               <p>${item.price}</p>
               <p>{item.description}</p>
               <p>{item.productStocks}</p>
               <p>{item.sold}</p>
               <Link to={`/productInfo/${item.productName.replace(/\s/g,'_')}`} onClick={()=>{Cookie.set('_pductFam',item._id)}}>View Product</Link>
                   </div>
               )
           })}
             
        </div>
    )
}

export default StoreStat
