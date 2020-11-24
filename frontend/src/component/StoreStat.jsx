import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getAllPInS } from '../actions/productAction';
import Cookie from "js-cookie";
import Axios from 'axios';
import {Table} from 'antd';
import {Bar,Pie} from 'react-chartjs-2';
import * as ChartDataLabels  from 'chartjs-plugin-datalabels';
import { sum } from 'lodash';
import {v4 as uuid} from 'uuid'


const StoreStat = () => {
    const getStoreProds = useSelector((state) => state.getStoreProds);
    const { PinSInfo,loading } = getStoreProds;
    const [stats,setStats]=useState([])
    const dispatch = useDispatch();
    const storeNameFam=Cookie.getJSON("_stohremate");
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
    const token = userInfo?.token;
    const { Column,ColumnGroup } = Table;
    
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
            position:'bottom'
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
     if(PinSInfo?.length <=3){
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
        <div className="stats">
          {chartLayouts()}
             <h1>Items</h1>
                     <Table  size={'large'}  dataSource={PinSInfo} loading={loading}   rowKey={PinSInfo=>(PinSInfo._id ||uuid() )} bordered={true} scroll={{ x: true }} pagination={{ pageSize: 5 }}>
                     <Column title={<p className="Cart__title">Image</p>} dataIndex='image'  render={(dataIndex) => <img src={dataIndex} alt={'my-garage'}  style={{width:100, height:100, objectFit:'contain'}}/>}  key={uuid()} fixed={'left'}/>
    <Column title={<p className="Cart__title">Product Name</p>} render={(record)=><p className="Stats__info">{record.productName}</p>} key={uuid()} />
                     <Column title={<p className="Cart__title">Price </p>} dataIndex="price"   render={(dataIndex) => <p className="Stats__info">$ {dataIndex}</p>} sorter={(a, b) => a.price - b.price}  key={uuid()}  />
    <Column title={<p className="Cart__title">Stocks</p>} render={(record)=><p className="Stats__info">{record.productStocks}</p>} sorter={(a, b) => a.productStocks - b.productStocks} key={uuid()}  />
    <Column title={<p className="Cart__title">Sales</p>}  render={(record)=><p className="Stats__info">{record.sold}</p>} sorter={(a, b) => a.sold - b.sold} key={uuid()}   />
    <Column title={<p className="Cart__title">createdAt</p>}  render={(record)=><p className="Stats__info"> {record.createdAt}</p>} sorter={(a, b) => a.createdAt - b.createdAt} key={uuid()}   />
                     </Table>
                     <h1>Buyers</h1>
                     <Table  size={'large'}  dataSource={yourStats} loading={loading}   scroll={{ x: true }} rowKey={yourStats=>(yourStats._id ||uuid() )} bordered={true} pagination={{ pageSize: 5 }}>
                     <ColumnGroup title={<p >Buyer</p>} >
                     <Column title={<p className="Cart__title">Image</p>}    render={(dataIndex) =>  <img src={dataIndex.buyer.profile} alt={'my-garage'}  style={{width:100, height:100, objectFit:'contain'}}/>}  key={uuid()} width={50} fixed={'left'}/>
                     <Column title={<p className="Cart__title">Name</p>} render={ (record) => record.buyer.name} key={uuid()}   />
                     </ColumnGroup>
                    <ColumnGroup title={<p >Product Purchased</p>}>
                    <Column title={<p className="Cart__title">Image</p>} dataIndex='image'  render={(dataIndex) => <img src={dataIndex} alt={'my-garage'}  style={{width:100, height:100, objectFit:'contain'}}/>}  key={uuid()} width={30}/>
                    <Column title={<p className="Cart__title">Product Name</p>} dataIndex="name"  />
                        <Column title={<p className="Cart__title">Price</p>} dataIndex="price"  sorter={(a, b) => a.price - b.price} key={uuid()}  />
                        <Column title={<p className="Cart__title">Quantity</p>} dataIndex="quantity"  sorter={(a, b) => a.quantity - b.quantity} key={uuid()} width={10} />
                        <Column title={<p className="Cart__title">Purchased Date</p>} dataIndex="dateOfPurchase"  sorter={(a, b) => a.dateOfPurchase - b.dateOfPurchase} key={uuid()}   />
                    </ColumnGroup>
                     
                     </Table>
              
             
        </div>
    )
}

export default StoreStat
