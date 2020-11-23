import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getProdct } from '../actions/productAction';
import Cookie from "js-cookie";
import Loader from "react-loader-spinner";
import Axios from 'axios';
import { addtocartact } from '../actions/cartActions';
import { Popconfirm, message} from 'antd';

const Product = ({openChildred,openUpdateprod,deleteClose}) => {
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
            productNameFam:productNameFam
        },{
            headers: {
                Authorization: `Bearer${userInfo?.token}`,
            },
        }).then(result=>{
            deleteClose()
            console.log(result)
            message.success('Product deleted')
        }).catch(error=>{
            console.log(error)
            message.error('something went wrong')
        })
    }

    const handleAdd=()=>{
        const token=userInfo?.token
        const productId=productNameFam
        dispatch(addtocartact(productId,token,message,productInfo?.productName))
    }
    return(
<div className="ProductInfo">
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
        {userInfo?._id ===productInfo?.storeOwner._id?<><p onClick={openUpdateprod}>Update Product</p><Popconfirm title="Sure to delete?" onConfirm={handleDelete}  ><button >Remove Product</button></Popconfirm></>:<><button onClick={handleAdd}>Add to cart</button>  </>}  
        
</div>
    ) 
}

export default Product
