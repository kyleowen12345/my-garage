import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { buyCart, deleteItemFromCart, viewCart } from '../../actions/cartActions';
import Paypal from '../Paypal';
import {message,Table,Popconfirm} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import {v4 as uuid} from 'uuid'
import { useHistory } from "react-router-dom";
import ErrorPage from '../ErrorPage';

const Cart = () => {
    const history=useHistory()
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
    useEffect(()=>{
        if(!userInfo){
            return history.push('/')
        }
     },[userInfo,history])
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
         const handleDelete=(productId,name)=>{
            dispatch(deleteItemFromCart(productId,token,name,message))
       }
    return (
        <div className="cartTable" key={uuid()} >
            <h2>Your Cart</h2>
            {error ? (
			   <ErrorPage/>
            ):(
                <Table size={'large'}  dataSource={op} loading={loading}   pagination={{ pageSize: 5 }}  rowKey={op=>(op._id ||uuid() )} bordered={true} scroll={{ x: true }}>
                    <Column title={<p className="Cart__title">Image</p>} dataIndex='image'  render={(dataIndex) => <img src={dataIndex} alt={'my-garage'}  style={{width:window.innerWidth < 600 ? 30:100, height:window.innerWidth < 800 ? 40:100, objectFit:'contain'}}/>}  key={uuid()} />
                        <Column title={<p className="Cart__title">Product Name</p>} render={(record)=><p className="Cart__productName">{record.productName}</p>} key={uuid()}  />
            <Column title={<p className="Cart__title">Price</p>} dataIndex="price"   render={(dataIndex) => <p className='Cart__price'>$ {dataIndex}</p>} sorter={(a, b) => a.price - b.price}  key={uuid()}  />
            <Column title={<p className="Cart__title">Quantity</p>} render={(record)=> <p className='Cart__price'>{record.quantity}</p>}  sorter={(a, b) => a.quantity - b.quantity} key={uuid()}   />
                        <Column title={<p className="Cart__title">Remove</p>} dataIndex="Operation"  render={(text, record) =>
          op.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?._id,record?.productName)} key={uuid()} >
              <DeleteOutlined style={{color:'red'}} key={uuid()} />
            </Popconfirm>
          ) : null} width={10} key={uuid()}  />
                    </Table>
                    
            )}
            {op?.length > 0 && <div className="total"><p>Total: ${Total}</p><p>pay with Paypal</p><Paypal 
           toPay={Total}
           ontracSuccess={transactionSuccess}
           ontracError={transactionError}
           ontracCancel={transactionCancel}
           /> <p>Free acc: sb-lsca53536970@personal.example.com</p>
              <p>Password:qwert12345</p>
           </div>}
        </div>
    )
}

export default Cart
