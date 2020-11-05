import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { buyCart, deleteItemFromCart, viewCart } from '../actions/cartActions';
import Paypal from './Paypal';
import { Link, } from "react-router-dom";
import {message,Table,Popconfirm} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import {v4 as uuid} from 'uuid'

const Cart = () => {
    const dispatch = useDispatch();
    const [Total,setTotal]=useState(0)
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const viewcahrt = useSelector((state) => state.viewcahrt);
    const { cartInfo,loading,error } = viewcahrt;
    const token =userInfo?.token
    const { Column } = Table;

    useEffect(()=>{
        dispatch(viewCart(token))
    },[dispatch,token])
 
    const mycartdetail=cartInfo?.cartDetail
    const mycart=cartInfo?.cart
    const op=mycartdetail?.map((e,i)=>{
        let temp=mycart?.find(elem=>elem.id===e._id)
        if(temp?.quantity){
            e.quantity=temp?.quantity
        }
        if(temp?.date){
            e.date=temp?.date
        }
        return e
    }).sort((a, b) =>{
        if(a.date>b.date) return -1
        if(a.date<b.date) return 1
        return 0
    });
    
    const calculateTotal = () => {
        let total = 0;

        op.map(item => {
          return  total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
    }

    useEffect(()=>{
        if(op){
            calculateTotal()
        }
    })
    const transactionSuccess=(pay)=>{
        let variables={
            cartDetail:op,paymentData:pay
        }
        dispatch(buyCart(variables,token,message))
    }
    const transactionError=()=>{
       console.log('Paypal Error')
    }
    const transactionCancel=()=>{
        console.log('Transaction has been canceled')
     }
    
    console.log(Total)
    console.log(op)
         const handleDelete=(productId,name)=>{
            dispatch(deleteItemFromCart(productId,token,name,message))
       }
    return (
        <div className="cartTable" key={uuid()} >
            {error ? (
				<div>{error}</div>
            ):(
                <Table size={'large'}  dataSource={op} loading={loading}   pagination={false}  rowKey={op=>(op._id ||uuid() )} bordered={true}>
                    <Column title={<p style={{fontSize:22, marginTop:20}}>Image</p>} dataIndex='image'  render={(dataIndex) => <img src={dataIndex} alt={'my-garage'}  style={{width:100, height:100, objectFit:'contain'}}/>}  key={uuid()} />
                        <Column title={<p style={{fontSize:22, marginTop:20}}>Product Name</p>} dataIndex="productName" key={uuid()}  />
            <Column title={<p style={{fontSize:22, marginTop:20}}>Price</p>} dataIndex="price"   render={(dataIndex) => <p>$ {dataIndex}</p>} sorter={(a, b) => a.price - b.price}  key={uuid()}  />
                        <Column title={<p style={{fontSize:22 , marginTop:20}}>Quantity</p>} dataIndex="quantity"  sorter={(a, b) => a.quantity - b.quantity} key={uuid()}   />
                        <Column title={<p style={{fontSize:22, marginTop:20}}>Remove</p>} dataIndex="Operation"  render={(text, record) =>
          op.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?._id,record?.productName)} key={uuid()} >
              <DeleteOutlined style={{color:'red', fontSize:20}} key={uuid()} />
            </Popconfirm>
          ) : null} width={50} key={uuid()}  />
                    </Table>
                    
            )}
            {op?.length > 0 && <div className="total"><p>Total: ${Total}</p><p>pay with Paypal</p><Paypal 
           toPay={Total}
           ontracSuccess={transactionSuccess}
           ontracError={transactionError}
           ontracCancel={transactionCancel}
           /></div>}
           <Link to='/history'>items that you bought</Link>
        </div>
    )
}

export default Cart
