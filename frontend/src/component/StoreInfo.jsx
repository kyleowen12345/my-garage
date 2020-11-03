import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getSingleStore } from '../actions/storeActions';
import Cookie from "js-cookie";
import Loader from "react-loader-spinner";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getAllPInS } from '../actions/productAction';
import { addtocartact } from '../actions/cartActions';
import { useAlert } from 'react-alert'
import { message,Spin } from 'antd';




const StoreInfo = () => {
    const history=useHistory()
    const alert = useAlert()
    const singleStore = useSelector((state) => state.singleStore);
    const { getStore, loading, error } = singleStore;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const getStoreProds = useSelector((state) => state.getStoreProds);
    const { PinSInfo } = getStoreProds;
    const dispatch = useDispatch();
    const storeNameFam=Cookie.getJSON("_stohremate");
    
  console.log(getStore?._id)
  const storeId=getStore?._id

  useEffect(()=>{
    dispatch(getAllPInS(storeId))
  },[dispatch,storeId])

console.log(PinSInfo)
    useEffect(()=>{
        if(storeNameFam){
            dispatch(getSingleStore(storeNameFam))
        }
        
    },[dispatch,storeNameFam])

    const handleDelete=()=>{
        Axios.post('/removeStorefam',{
            storeName:getStore?.storeName
        },{
            headers: {
                Authorization: `Bearer${userInfo?.token}`,
            },
        }).then(result=>{
            console.log(result)
            alert.success(result?.data.message)
            history.push('/Store')
        }).catch(error=>{
            console.log(error)
        })
    }
   
      
    return (
        <div className="sign__form">
            
            {loading ? (
				<Spin size="large" style={{ marginTop:50, marginLeft:600}} tip='Gathering Stores .....'/>
			) : error ? (
				<div>{error}</div>
			) :(
            <>
            
                <img src={getStore?.storeBackgroundImage} alt="my-garage"/>
                {userInfo?._id ===getStore?.sellerName._id&& <><Link to='/createStoreImage'>Update Store Image</Link><Link to='/StoreStats'>Store Stat-sheet</Link></>}
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
            {userInfo?._id ===getStore?.sellerName._id &&<><Link to='/updateStore'>Update Store</Link><Link to='/createProduct'>Add product</Link> <button onClick={handleDelete}>Remove Store</button></>}
           {PinSInfo?.map(item=>{
                const handleAdd=()=>{
                    const token=userInfo?.token
                    const productId=item._id
                    const name=item.productName
                            dispatch(addtocartact(productId,token,message,name))   
                }
               return(
                   <div className="sign__form" key={item._id}>
                       <img src={item.image} alt="my garage"/>
               <p>{item.productName}</p>
               <p>${item.price}</p>
               <p>{item.description}</p>
               <Link to={`/productInfo/${item.productName.replace(/\s/g,'_')}`} onClick={()=>{Cookie.set('_pductFam',item._id)}}>View Product</Link>
               {userInfo?._id !==getStore?.sellerName._id && <><button onClick={handleAdd}>Add to cart</button>  </>}
                   </div>
               )
           })}
             
        
        </div>
    )
}

export default StoreInfo
