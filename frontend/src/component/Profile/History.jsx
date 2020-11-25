import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { cartHistory } from '../../actions/cartActions';
import {v4 as uuid} from 'uuid'
import {Table} from 'antd';
import Moment from 'react-moment';

const History = () => {
    const dispatch=useDispatch()
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const purchasedItems = useSelector((state) => state.purchasedItems);
    const { historyInfo,loading,error } = purchasedItems;
    const token =userInfo?.token
    const { Column,ColumnGroup } = Table;
   
    useEffect(()=>{
        dispatch(cartHistory(token))
    },[dispatch,token])
    console.log(historyInfo)
    return (
        <div className="history">
        { error ? (
				<div>{error}</div>
			):(
                <Table size={'large'}  dataSource={historyInfo} loading={loading}   pagination={{ pageSize: 5 }}  rowKey={op=>(op._id ||uuid() )} bordered={true} scroll={{ x: true }}>
                   <ColumnGroup title='Purchase History'>
                   <Column title={<p className="Cart__title">Image</p>} dataIndex='image'  render={(dataIndex) => <img src={dataIndex} alt={'my-garage'}  style={{width:window.innerWidth < 600 ? 30:100, height:window.innerWidth < 800 ? 40:100, objectFit:'contain'}}/>}  key={uuid()} />
                        <Column title={<p className="Cart__title"> Name</p>} render={(record)=><p className="Cart__productName">{record.name}</p>} key={uuid()}  />
            <Column title={<p className="Cart__title">Price</p>} dataIndex="price"   render={(dataIndex) => <p className='Cart__price'>$ {dataIndex}</p>} sorter={(a, b) => a.price - b.price}  key={uuid()}  />
            <Column title={<p className="Cart__title">Quantity</p>} render={(record)=> <p className='Cart__price'>{record.quantity}</p>}  sorter={(a, b) => a.quantity - b.quantity} key={uuid()}   />
            <Column title={<p className="Cart__title">Purchased Date</p>}  render={(record)=> <p className='Cart__price'><Moment format="LLLL">{record.dateOfPurchase}</Moment></p>} sorter={(a, b) => a.dateOfPurchase - b.dateOfPurchase} key={uuid()}   />
                   </ColumnGroup>
                    
                    </Table>
            )}
        </div>
    )
}

export default History
