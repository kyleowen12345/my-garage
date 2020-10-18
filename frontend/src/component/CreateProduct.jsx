import React, {useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { makeProduct } from '../actions/productAction';
import { getSingleStore } from '../actions/storeActions';
import Cookie from "js-cookie";

const CreateProduct = () => {
    const history= useHistory()
    const [productName,setProductName]=useState('')
    const [price,setPrice]=useState('')
    const [productStocks,setProductStocks]=useState('')
    const [description,setDescription]=useState('')
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const singleStore = useSelector((state) => state.singleStore);
    const { getStore } = singleStore;
    const createProduct = useSelector((state) => state.createProduct);
    const { prductInfo } = createProduct;
    const storeNameFam=Cookie.getJSON("_stohremate");

 const storeName=  getStore?._id
 const storeOwner= userInfo?._id
 const token = userInfo?.token
 useEffect(()=>{
        dispatch(getSingleStore(storeNameFam))
},[dispatch,storeNameFam])

    const handleCreate=(e)=>{
      e.preventDefault()
      dispatch(makeProduct(productName,price,productStocks,description,storeName,storeOwner,token,history))
    }
   console.log(prductInfo)
    return (
        <div className="sign__form">
            <form className="sign__form">
                 <h2>Create Your Product</h2>
				<label>Product Name</label>
				<input type="text" onChange={(e) => setProductName(e.target.value)} />
				<label>Price</label>
				<input type="text" onChange={(e) => setPrice(e.target.value)} />
				<label>Product Stocks</label>
				<input type="text" onChange={(e) => setProductStocks(e.target.value)} />
				<label>Description</label>
				<input type="text" onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" onClick={handleCreate}>Next</button>
                </form>
        </div>
    )
}

export default CreateProduct
