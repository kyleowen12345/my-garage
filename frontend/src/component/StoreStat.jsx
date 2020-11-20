import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getAllPInS } from '../actions/productAction';
import Cookie from "js-cookie";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {Bar,Pie} from 'react-chartjs-2';
import * as ChartDataLabels  from 'chartjs-plugin-datalabels';
import { sum } from 'lodash';

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
     console.log(PinSInfo)
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
      const statePie = {
        labels: productNames,
        datasets: [
          {
            label: 'Sales',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',

            ],
            data: productSales
          }
        ]
      }
   console.log(PinSInfo?.length)
   const chartLayouts=()=>{
    if(PinSInfo?.length <=1){
      return(
        <div>
          must have 1 more item
        </div>
      )
    }
     if(PinSInfo?.length >3){
       return (
         <div>
<Bar
        data={state}
        width={750} 
        height={150}
        options={{
          title:{
            display:true,
            text:'Product Sales',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    min: 0,
                   max:productSales?.sort((a,b)=>a-b)[productSales?.length - 1] + 2
                }
              }]
           }
        }}
      />
         </div>
        
       )
     }
     if(PinSInfo?.length <4){
       return(
         <div>
<Pie

        data={statePie}
        plugins= {[ChartDataLabels]}
        width={750} 
          height={200}
        options={{
          title:{
            display:true,
            text:'Sales',
            fontSize:20
          },
          legend:{
            display:true,
            position:'bottom',
          
          },
          plugins:{
            datalabels: {
              formatter: (value, ctx) => {            
                let dataArr = ctx.chart.data.datasets[0].data;
                let total = sum(dataArr);     // sum from lodash        
                let percentage = (value * 100 / total).toFixed(2) + "%";
                return percentage;
              },
              color: 'black',
            }
          
        }
        }}
       
      />
         </div>
        
       )
     }
    
   }
    return (
        <div className="sign__form">
        {chartLayouts()}
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
