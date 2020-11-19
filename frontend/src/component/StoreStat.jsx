import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getAllPInS } from '../actions/productAction';
import Cookie from "js-cookie";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {Bar} from 'react-chartjs-2';

const StoreStat = () => {
    const getStoreProds = useSelector((state) => state.getStoreProds);
    const { PinSInfo } = getStoreProds;
    const [stats,setStats]=useState([])
    const dispatch = useDispatch();
    const storeNameFam=Cookie.getJSON("_stohremate");
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
    const token = userInfo?.token;
    
    useEffect(()=>{
        dispatch(getAllPInS(storeNameFam))
      },[dispatch,storeNameFam])
  useEffect(()=>{
      Axios.post('/payments',{},{headers:{
        Authorization: `Bearer${token}`,
      }}).then(data=>setStats(data.data)).catch(err=>console.log(err))
  },[token])
    
    let statSheet=[]
     stats.forEach((info)=>{
         info.forEach((data)=>{
            statSheet.push(data)
         })
     })
     const yourStats=statSheet.filter(i=>i.storeName.includes(storeNameFam))
     console.log(yourStats)
     const state = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
            
          }
        ],
        
      }
   
    return (
        <div className="sign__form">
            <Bar
          data={state}
          width={650} 
          height={"80%"}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
          }}
        />
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
