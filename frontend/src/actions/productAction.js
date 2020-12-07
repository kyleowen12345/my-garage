import axios from "axios";
import Cookie from "js-cookie";
import {CREATE_PRODUCT_REQUEST,CREATE_PRODUCT_SUCCESS,CREATE_PRODUCT_FAIL,GET_PRODUCT_REQUEST,GET_PRODUCT_SUCCESS,GET_PRODUCT_FAIL,SINGLE_PRODUCT_REQUEST,SINGLE_PRODUCT_SUCCESS,SINGLE_PRODUCT_FAIL,UPDATE_PRODUCT_REQUEST,UPDATE_PRODUCT_SUCCESS,UPDATE_PRODUCT_FAIL,UPDATE_IMAGE_REQUEST,UPDATE_IMAGE_SUCCESS,UPDATE_IMAGE_FAIL} from '../constants/productContstants'



const makeProduct=(productName,price,productStocks,description,storeName,storeOwner,token,openChildred,message)=>async(dispatch)=>{
    dispatch({ type: CREATE_PRODUCT_REQUEST});
    try {
        const {data}=await axios.post('/createproduct',{
            productName,price,productStocks,description,storeName,storeOwner
        },{
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
        Cookie.set('_pductFam',data?._id)
        openChildred()
        message.success('Poduct created',1)
        message.info('Now add photo for the product',3)
    } catch (error) {
      dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.response?.data.error });
    }
}
const getAllPInS=(storeName)=>async(dispatch)=>{
    dispatch({ type: GET_PRODUCT_REQUEST });
    try {
        const {data}=await axios.post('/storeproduct',{storeName})
        dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_PRODUCT_FAIL, payload: error.response?.data.error });
    }
}
const getProdct=(_id)=>async(dispatch)=>{
    dispatch({ type: SINGLE_PRODUCT_REQUEST});
  try {
      const {data}=await axios.post('/singlestoreproduct',{_id})
    dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGLE_PRODUCT_FAIL, payload: error.response?.data.error });
  }
}
const updateProductInfo=(productName,price,productStocks,description,storeName,_id,token,onClose,message)=>async(dispatch)=>{
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        const {data}=await axios.post('/updateproduct',{
            productName,price,productStocks,description,storeName,_id
        },{
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
        message.success('Product Updated')
        onClose()
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response?.data.error });
    }
}
const makeProductImage=(_id,image,token,onClose)=>async(dispatch)=>{
    dispatch({ type: UPDATE_IMAGE_REQUEST });
    try {
        const {data}=await axios.post('/productimage',{
            _id,image
        },{
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        dispatch({ type: UPDATE_IMAGE_SUCCESS, payload: data });
      onClose()
    } catch (error) {
        dispatch({ type: UPDATE_IMAGE_FAIL, payload: error.response?.data.error });
    }
}

export {makeProduct,getAllPInS,getProdct,updateProductInfo,makeProductImage}