import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getAllPInS } from '../../actions/productAction';
import Cookie from "js-cookie";
import Axios from 'axios';
import {Table} from 'antd';
import {Line} from 'react-chartjs-2';
import {v4 as uuid} from 'uuid'
import Moment from 'react-moment';




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
     const yourStats=statSheet?.filter(i=>i.storeName?.includes(storeNameFam))

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

   const chartLayouts=()=>{
    if(PinSInfo?.length <=2){
      return
    }
     else{
       return (
         <div>
<Line
        data={state}

        maintainAspectRatio
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
              }],
              xAxes: [{
                ticks: {
                 fontSize: 12
                }
               }]
           },
           responsive: true,
          maintainAspectRatio: true,
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
    <Column title={<p className="Cart__title">createdAt</p>}  render={(record)=><p className="Stats__info"><Moment format="LLLL">{record.createdAt}</Moment></p>} sorter={(a, b) => a.createdAt - b.createdAt} key={uuid()}   />
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
                        <Column title={<p className="Cart__title">Purchased Date</p>} render={(record)=> <p className='Cart__price'><Moment format="LLLL">{record.dateOfPurchase}</Moment></p>}  sorter={(a, b) => a.dateOfPurchase - b.dateOfPurchase} key={uuid()}   />
                    </ColumnGroup>
                     </Table>
        </div>
    )
}

export default StoreStat
