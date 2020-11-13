import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getProdct } from '../actions/productAction';
import Cookie from "js-cookie";
import { Link, useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";
import Axios from 'axios';
import { addtocartact } from '../actions/cartActions';

const Product = ({openChildred,openUpdateprod}) => {
    const history=useHistory()
    const getProduct = useSelector((state) => state.getProduct);
    const { productInfo, loading, error } = getProduct;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const productNameFam=Cookie.getJSON("_pductFam");
    console.log(productNameFam)
    useEffect(()=>{
        dispatch(getProdct(productNameFam))
    },[productNameFam,dispatch])
    console.log(productInfo)

    const handleDelete=()=>{
        Axios.post('/removeProduct',{
            productName:productInfo?.productName
        },{
            headers: {
                Authorization: `Bearer${userInfo?.token}`,
            },
        }).then(result=>{
            console.log(result)
           history.push(`/storeInfo/${productInfo.storeName.storeName}`)
        }).catch(error=>{
            console.log(error)
        })
    }

    const handleAdd=()=>{
        const token=userInfo?.token
        dispatch(addtocartact(productNameFam,token))
    }
    return(
<div className="sign__form">
    {loading ?(<div className="sign__loader">
					<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
				</div>): error ? (
				<div>{error}</div>
			):(
                <>
    <img src={productInfo?.image} alt="my-garage" style={{width:250,height:250}}/>
    {userInfo?._id ===productInfo?.storeOwner._id&& <p onClick={openChildred}>Update Product Image</p>}
    <p>{productInfo?.productName}</p>
    <p>${productInfo?.price}</p>
    <p>{productInfo?.productStocks}</p>
    <p>{productInfo?.description}</p>
    <p>{productInfo?.storeName.storeName}</p>
    <p>{productInfo?.storeOwner.name}</p>
                </>
            )}
        {userInfo?._id ===productInfo?.storeOwner._id?<><p onClick={openUpdateprod}>Update Product</p><button onClick={handleDelete}>Remove Product</button></>:<><button onClick={handleAdd}>Add to cart</button>  </>}  
        
</div>
    ) 
}

export default Product
