import React from 'react'
import {Table} from 'antd';
import {v4 as uuid} from 'uuid'
import Moment from 'react-moment';
const StoreProductsStat = ({PinSInfo,loading}) => {
    const { Column } = Table;
    const sorted=PinSInfo?.sort((a,b)=>{
        if(a.createdAt>b.createdAt) return -1
        if(a.createdAt<b.createdAt) return 1
        return 0
    })
    return (
        <Table  size={'large'}  dataSource={sorted} loading={loading}   rowKey={PinSInfo=>(PinSInfo._id ||uuid() )} bordered={true} scroll={{ x: true }} pagination={{ pageSize: 5 }}>
                     <Column title={<p className="Cart__title">Image</p>} dataIndex='image'  render={(dataIndex) => <img src={dataIndex} alt={'my-garage'}  style={{width:100, height:100, objectFit:'contain'}}/>}  key={uuid()} />
    <Column title={<p className="Cart__title">Product Name</p>} render={(record)=><p className="Stats__info">{record.productName}</p>} key={uuid()} />
                     <Column title={<p className="Cart__title">Price </p>} dataIndex="price"   render={(dataIndex) => <p className="Stats__info">$ {dataIndex}</p>} sorter={(a, b) => a.price - b.price}  key={uuid()}  />
    <Column title={<p className="Cart__title">Stocks</p>} render={(record)=><p className="Stats__info">{record.productStocks}</p>} sorter={(a, b) => a.productStocks - b.productStocks} key={uuid()}  />
    <Column title={<p className="Cart__title">Sales</p>}  render={(record)=><p className="Stats__info">{record.sold}</p>} sorter={(a, b) => a.sold - b.sold} key={uuid()}   />
    <Column title={<p className="Cart__title">createdAt</p>}  render={(record)=><p className="Stats__info"><Moment format="LLLL">{record.createdAt}</Moment></p>} sorter={(a, b) => a.createdAt - b.createdAt} key={uuid()}   />
                     </Table>
    )
}

export default StoreProductsStat
