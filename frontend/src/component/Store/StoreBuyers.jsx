import React from 'react'
import {Table} from 'antd';
import {v4 as uuid} from 'uuid'
import Moment from 'react-moment';

const StoreBuyers = ({stats,loading}) => {
    const { Column,ColumnGroup } = Table;
    return (
        <Table  size={'large'}  dataSource={stats} loading={loading}   scroll={{ x: true }} rowKey={yourStats=>(yourStats._id ||uuid() )} bordered={true} pagination={{ pageSize: 5 }}>
                     <ColumnGroup title={<p >Buyer</p>} >
                     <Column title={<p className="Cart__title">Image</p>}    render={(dataIndex) =>  <img src={dataIndex.buyer.profile} alt={'my-garage'}  style={{width:100, height:100, objectFit:'contain'}}/>}  key={uuid()} width={50} />
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
    )
}

export default StoreBuyers
