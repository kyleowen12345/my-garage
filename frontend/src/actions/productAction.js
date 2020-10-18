import axios from "axios";
import Cookie from "js-cookie";
import {CREATE_PRODUCT_REQUEST,CREATE_PRODUCT_SUCCESS,CREATE_PRODUCT_FAIL,GET_PRODUCT_REQUEST,GET_PRODUCT_SUCCESS,GET_PRODUCT_FAIL,SINGLE_PRODUCT_REQUEST,SINGLE_PRODUCT_SUCCESS,SINGLE_PRODUCT_FAIL} from '../constants/productContstants'



const makeProduct=(productName,price,productStocks,description,storeName,storeOwner,token,history)=>async(dispatch)=>{
    dispatch({ type: CREATE_PRODUCT_REQUEST, payload: { productName,price,productStocks,description,storeName,storeOwner } });
    try {
        const {data}=await axios.post('/createproduct',{
            productName,price,productStocks,description,storeName,storeOwner
        },{
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
        Cookie.set('_pductFam',productName)
        history.push('/createProductImage')
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.response?.data.error });
    }
}
const getAllPInS=(storeName)=>async(dispatch)=>{
    dispatch({ type: GET_PRODUCT_REQUEST, payload:storeName });
    try {
        const {data}=await axios.post('/storeproduct',{storeName})
        dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_PRODUCT_FAIL, payload: error.response?.data.error });
    }
}
const getProdct=(_id)=>async(dispatch)=>{
    dispatch({ type: SINGLE_PRODUCT_REQUEST, payload:_id });
  try {
      const {data}=await axios.post('/singlestoreproduct',{_id})
    dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGLE_PRODUCT_FAIL, payload: error.response?.data.error });
  }
}

export {makeProduct,getAllPInS,getProdct}