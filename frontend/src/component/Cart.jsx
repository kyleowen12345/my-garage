import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { buyCart, deleteItemFromCart, viewCart } from '../actions/cartActions';
import Loader from "react-loader-spinner";
import CartContent from './CartContent';
import Paypal from './Paypal';
import { Link, } from "react-router-dom";
import {message} from 'antd';



const Cart = () => {
    const dispatch = useDispatch();
    const [Total,setTotal]=useState(0)
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const viewcahrt = useSelector((state) => state.viewcahrt);
    const { cartInfo,loading,error } = viewcahrt;
    const token =userInfo?.token
    

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
        return e
    })
    const calculateTotal = (cartDetail) => {
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
    return (
        <div className="sign__form">
            {loading ?(<div className="sign__loader">
					<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
				</div>): error ? (
				<div>{error}</div>
			):(cartInfo?.cartDetail?.length ===0 ? <p>Cart is empty</p>:
                op?.map(item=>{
                const productId=item._id
                 const handleDelete=()=>{
                     console.log(productId)
                    dispatch(deleteItemFromCart(productId,token,message))
               }
                return(
                     <CartContent  image={item.image} name={item.productName} handleDelete={handleDelete} price={item.price} quantity={item.quantity} key={item._id}/>
                ) 
            })
            )}
            {op ? <p>Total: $ {Total}</p>: <p>No Items In the Cart</p>}
            
           <Paypal 
           toPay={Total}
           ontracSuccess={transactionSuccess}
           ontracError={transactionError}
           ontracCancel={transactionCancel}
           />
           <Link to='/history'>items that you bought</Link>
        </div>
    )
}

export default Cart
