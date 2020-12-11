import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getAllPInS } from '../../actions/productAction';
import Axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import StoreProductsStat from './StoreProductsStat';
import StoreBuyers from './StoreBuyers';
import StoreStatChart from './StoreStatChart';

const StoreStat = () => {
  const history=useHistory()
  const {id}=useParams()
    const getStoreProds = useSelector((state) => state.getStoreProds);
    const { PinSInfo,loading } = getStoreProds;
    const [stats,setStats]=useState([])
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
    const token = userInfo?.token;
    useEffect(() => {
      if (!userInfo) {
        return history.push('/')
      }
    }, [history,userInfo]);
    useEffect(()=>{
        dispatch(getAllPInS(id))
      },[dispatch,id])
  useEffect(()=>{
      Axios.post(`${process.env.REACT_APP_API_KEY}/payments`,{storeNameFam:id},{headers:{
        Authorization: `Bearer${token}`,
      }}).then(data=>setStats(data.data)).catch(err=>console.log(err))
  },[token,id])
    
   
     const productNames=PinSInfo?.map(item=>item.productName)
     const productSales=PinSInfo?.map(item=>item.sold)
     const state = {
        labels: productNames,
        datasets: [
          {
            label: 'Sales',
            backgroundColor: 'rgba(255,99,132,0.2)',
  borderColor: 'rgba(255,99,132,1)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  hoverBorderColor: 'rgba(255,99,132,1)',
            data: productSales
            
          }
        ],
        
      }
    return (
        <div style={{textAlign:'center'}} >
          <h1>Stats</h1>
             <h1>Products</h1>
                    <StoreProductsStat PinSInfo={PinSInfo} loading={loading}/> 
                    <StoreStatChart PinSInfo={PinSInfo} state={state} productSales={productSales}/>
                     <h1>Buyers</h1>
                     <StoreBuyers stats={stats} loading={loading}/>
        </div>
    )
}

export default StoreStat
