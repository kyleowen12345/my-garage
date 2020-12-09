import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getAllPInS } from '../../actions/productAction';
import Cookie from "js-cookie";
import Axios from 'axios';
import {Table} from 'antd';
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
      Axios.post('/payments',{storeNameFam:storeNameFam},{headers:{
        Authorization: `Bearer${token}`,
      }}).then(data=>setStats(data.data)).catch(err=>console.log(err))
  },[token,storeNameFam])
    
    return (
        <div className="stats">
          <h1>Stats</h1>
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
                     <Table  size={'large'}  dataSource={stats} loading={loading}   scroll={{ x: true }} rowKey={yourStats=>(yourStats._id ||uuid() )} bordered={true} pagination={{ pageSize: 5 }}>
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
