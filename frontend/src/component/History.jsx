import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { cartHistory } from '../actions/cartActions';
import Loader from "react-loader-spinner";

const History = () => {
    const dispatch=useDispatch()
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const purchasedItems = useSelector((state) => state.purchasedItems);
    const { historyInfo,loading,error } = purchasedItems;
    const token =userInfo?.token
   
    useEffect(()=>{
        dispatch(cartHistory(token))
    },[dispatch,token])
    console.log(historyInfo)
    return (
        <div className="sign__form">
        {loading ?(<div className="sign__loader">
					<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
				</div>): error ? (
				<div>{error}</div>
			):(historyInfo?.map(item=>{
            return(
                < div className="sign__form" key={item.id}>
                <img src={item.image} alt="my-garage"/>
            <p>{item.name}</p>
            <p>{item.dateOfPurchase}</p>
            <p>{item.quantity}</p>
            </div >
            )
            }))}
        </div>
    )
}

export default History
