import axios from 'axios'
import {ADD__TO__CART__REQUEST,ADD__TO__CART__SUCCESS,ADD__TO__CART__FAIL,VIEW__CART__REQUEST,VIEW__CART__SUCCESS,VIEW__CART__FAIL,REMOVE__CART__REQUEST,REMOVE__CART__SUCCESS,REMOVE__CART__FAIL,BUY__CART__REQUEST,BUY__CART__SUCCESS,BUY__CART__FAIL,HISTORY__REQUEST,HISTORY__SUCCESS,HISTORY__FAIL} from '../constants/cartConstants'

const addtocartact=(productId,token,message,name)=>async(dispatch)=>{
    dispatch({ type: ADD__TO__CART__REQUEST });
    message.info(`adding ${name}`)
  try {
    const {data}=await axios.post('/addtocart',{productId},{
        headers: {
            Authorization: `Bearer${token}`,
        },
      })
     
      dispatch({ type: ADD__TO__CART__SUCCESS, payload: data }); 
      message.success(`added ${name}`)
  } catch (error) {
    dispatch({ type: ADD__TO__CART__FAIL, payload: error.response?.data.error })
    message.error(error.response?.data.error)
  }
}
const viewCart=(token)=>async(dispatch)=>{
    dispatch({ type: VIEW__CART__REQUEST});
    try {
        const {data}=await axios.get('/getCartInfo',{
            headers: {
                Authorization: `Bearer${token}`,
            },
          })
          dispatch({ type: VIEW__CART__SUCCESS, payload: data }); 
    } catch (error) {
        dispatch({ type: VIEW__CART__FAIL, payload: error.response?.data.error })
    }
}
const deleteItemFromCart=(productId,token,name,message)=>async(dispatch)=>{
  dispatch({ type: REMOVE__CART__REQUEST });
  message.info(`deleting ${name}`)
  try {
    const {data}=await axios.post('/removeitem',{productId},{
      headers: {
          Authorization: `Bearer${token}`,
      },
    })
    dispatch({ type: REMOVE__CART__SUCCESS, payload: data }); 
    message.success(`${name} deleted`)
    console.log(data)
  } catch (error) {
    dispatch({ type: REMOVE__CART__FAIL, payload: error.response?.data.error })
    message.error(error.response?.data.error)
  }

}
const buyCart=(variables,token,message)=>async(dispatch)=>{
  dispatch({ type: BUY__CART__REQUEST });
  message.info('Processing Payment..')
  try {
    const {data}=await  axios.post('/successBuy',variables,{headers: {
      Authorization: `Bearer${token}`,
  },})
  dispatch({ type: BUY__CART__SUCCESS, payload: data });
  message.success('Cart Purchased')
  } catch (error) {
   dispatch({ type: BUY__CART__FAIL, payload: error.response?.data.error });
  message.error(error.response?.data.error)
  }
}
const cartHistory=(token)=>async(dispatch)=>{
  dispatch({ type: HISTORY__REQUEST });
  try {
    const {data}=await axios.get('/PurchasedItems',{headers: {
      Authorization: `Bearer${token}`,
  }})
    dispatch({ type: HISTORY__SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HISTORY__FAIL, payload: error.response?.data.error  });
  }
}

export {addtocartact,viewCart,deleteItemFromCart,buyCart,cartHistory}