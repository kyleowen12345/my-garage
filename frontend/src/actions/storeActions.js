import axios from "axios";
import {CREATE_STORE_REQUEST,CREATE_STORE_SUCCESS,CREATE_STORE_FAIL,VIEW_STORE_REQUEST,VIEW_STORE_SUCCESS,VIEW_STORE_FAIL,VIEWALL_STORE_REQUEST,VIEWALL_STORE_SUCCESS,VIEWALL_STORE_FAIL,VIEWSINGLE_STORE_REQUEST,VIEWSINGLE_STORE_SUCCESS,VIEWSINGLE_STORE_FAIL} from '../constants/storeContstants'



const makeStore=(storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber,userId,history,userToken)=>async(dispatch)=>{
    dispatch({ type: CREATE_STORE_REQUEST, payload: { storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber,userId } });
    try {
        const {data} = await axios.post('http://localhost:1234/createStore',{
            storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber,
            _id:userId
        },{
            headers: {
                Authorization: `Bearer${userToken}`,
            },
        })
        dispatch({ type: CREATE_STORE_SUCCESS, payload: data });
        history.push('/createStoreImage')
    } catch (error) {
        dispatch({ type: CREATE_STORE_FAIL, payload: error.response?.data.error });
    }
}
const viewMyStore=(_id, token)=>async(dispatch)=>{
    dispatch({ type: VIEW_STORE_REQUEST, payload:{ _id, token } });
    try {
        const {data}=await axios.post('http://localhost:1234/mystores',{_id},{
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        dispatch({ type: VIEW_STORE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VIEW_STORE_FAIL, payload: error.response?.data.error });
    }
}
const allStoresViewer=()=>async(dispatch)=>{
    dispatch({ type: VIEWALL_STORE_REQUEST });
    try {
        const {data}=await axios.get('http://localhost:1234/homies')
        dispatch({ type: VIEWALL_STORE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VIEWALL_STORE_FAIL, payload: error.response?.data.error });
    }
    
}
const getSingleStore=(storeName)=>async(dispatch)=>{
    dispatch({ type: VIEWSINGLE_STORE_REQUEST, payload:storeName });
    try {
        const {data}=await axios.post('http://localhost:1234/singlestore',{
            storeName
        })
        dispatch({ type: VIEWSINGLE_STORE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VIEWSINGLE_STORE_FAIL, payload: error.response?.data.error });
    }

}
export {makeStore,viewMyStore,allStoresViewer,getSingleStore}