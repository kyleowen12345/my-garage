import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getSingleStore } from '../actions/storeActions';
import Cookie from "js-cookie";
import Loader from "react-loader-spinner";


const StoreInfo = () => {
    const singleStore = useSelector((state) => state.singleStore);
    const { getStore, loading, error } = singleStore;
    const dispatch = useDispatch();
    const storeNameFam=Cookie.getJSON("_stohremate");
  
    useEffect(()=>{
        if(storeNameFam){
            dispatch(getSingleStore(storeNameFam))
        }
        
    },[dispatch,storeNameFam])

    return (
        <div className="sign__form">
            {loading ? (
				<div className="sign__loader">
					<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
				</div>
			) : error ? (
				<div>{error}</div>
			) :(
            <>
                <img src={getStore?.storeBackgroundImage} alt="my-garage"/>
                <p>{getStore?.storeName}</p>
                <p>{getStore?.storeType}</p>
                <p>{getStore?.storeDescription}</p>
                <p>{getStore?.storeAddress}</p>
                <p>{getStore?.socialMediaAcc}</p>
                <p>{getStore?.createdAt}</p>
                <p>{getStore?.contactNumber}</p>
                <p>{getStore?.sellerName.name}</p> 
            </>
            )}
        </div>
    )
}

export default StoreInfo
