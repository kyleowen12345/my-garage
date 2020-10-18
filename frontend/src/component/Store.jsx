import React,{ useEffect } from 'react'
import { Link, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { viewMyStore } from '../actions/storeActions';
import Loader from "react-loader-spinner";
import Cookie from "js-cookie";



const Store = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const viewYourStore = useSelector((state) => state.viewYourStore);
    const { yourStore, loading,error } = viewYourStore;
    const dispatch = useDispatch();
    const userId = userInfo?._id;
    const userToken = userInfo?.token;
   
    useEffect(()=>{
       if(userInfo){
            dispatch(viewMyStore(userId,userToken))
       }
    },[dispatch, userId, userToken, userInfo])
    // const userStoreName= yourStore.map(info=>{
    //    return info.contactNumber})
    return (
        <div className="sign__form">
             {loading ?  (<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />): error ? <p>{error}</p>:<>
             <h1>Stores</h1>
               <Link to='/createStore'>Create Store</Link>
               {yourStore?.map(item=>{
                   return (
                       <div className="sign__form" key={item._id}>
                          
                           <img src={item.storeBackgroundImage} alt="my-garage"/>
                   <p>{item.storeName}</p>
                   <p>{item.socialMediaAcc}</p>
                   <Link to={`/storeInfo/${item.storeName.replace(/\s/g,'_')}`} onClick={()=>{Cookie.set('_stohremate',item._id)}}>View Store</Link>
                   </div>
                   )
               })}
             </>}
               
               
        </div>
    )
}

export default Store
