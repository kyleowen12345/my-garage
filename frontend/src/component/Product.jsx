import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getProdct } from '../actions/productAction';
import Cookie from "js-cookie";
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";

const Product = () => {
    const getProduct = useSelector((state) => state.getProduct);
    const { productInfo, loading, error } = getProduct;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const productNameFam=Cookie.getJSON("_pductFam");
    console.log(productNameFam)
    useEffect(()=>{
        dispatch(getProdct(productNameFam,))
    },[productNameFam,dispatch])
    console.log(productInfo)

    return(
<div className="sign__form">
    {loading ?(<div className="sign__loader">
					<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
				</div>): error ? (
				<div>{error}</div>
			):(
                <>
    <img src={productInfo?.image} alt="my-garage"/>
    {userInfo?._id ===productInfo?.storeOwner._id? <Link to='/createProductImage'>Update Store Image</Link>:<></>}
    <p>{productInfo?.productName}</p>
    <p>${productInfo?.price}</p>
    <p>{productInfo?.productStocks}</p>
    <p>{productInfo?.description}</p>
    <p>{productInfo?.storeName.storeName}</p>
    <p>{productInfo?.storeOwner.name}</p>
                </>
            )}
            <Link to='/updateProduct'>Update Product</Link>
</div>
    ) 
}

export default Product
