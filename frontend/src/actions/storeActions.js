import axios from "axios";
import Cookie from "js-cookie";
import {CREATE_STORE_REQUEST,CREATE_STORE_SUCCESS,CREATE_STORE_FAIL,VIEW_STORE_REQUEST,VIEW_STORE_SUCCESS,VIEW_STORE_FAIL,VIEWALL_STORE_REQUEST,VIEWALL_STORE_SUCCESS,VIEWALL_STORE_FAIL,VIEWSINGLE_STORE_REQUEST,VIEWSINGLE_STORE_SUCCESS,VIEWSINGLE_STORE_FAIL,UPDATE_STORE_REQUEST,UPDATE_STORE_SUCCESS,UPDATE_STORE_FAIL} from '../constants/storeContstants'



const makeStore=(storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber,userId,history,userToken)=>async(dispatch)=>{
    dispatch({ type: CREATE_STORE_REQUEST, payload: { storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber,userId } });
    try {
        const {data} = await axios.post('/createStore',{
            storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber,
            _id:userId
        },{
            headers: {
                Authorization: `Bearer${userToken}`,
            },
        })
        dispatch({ type: CREATE_STORE_SUCCESS, payload: data });
        Cookie.set('_stohremate', storeName)
        history.push('/createStoreImage')
    } catch (error) {
        dispatch({ type: CREATE_STORE_FAIL, payload: error.response?.data.error });
    }
}
const viewMyStore=(_id, token)=>async(dispatch)=>{
    dispatch({ type: VIEW_STORE_REQUEST, payload:{ _id, token } });
    try {
        const {data}=await axios.post('/mystores',{_id},{
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
        const {data}=await axios.get('/homies')
        dispatch({ type: VIEWALL_STORE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VIEWALL_STORE_FAIL, payload: error.response?.data.error });
    }
    
}
const getSingleStore=(_id)=>async(dispatch)=>{
    dispatch({ type: VIEWSINGLE_STORE_REQUEST, payload:_id });
    try {
        const {data}=await axios.post('/singlestore',{
            _id
        })
        dispatch({ type: VIEWSINGLE_STORE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VIEWSINGLE_STORE_FAIL, payload: error.response?.data.error });
    }

}
const updateStore=(_id,storeName,storeAddress,storeDescription,storeType,contactNumber,socialMediaAcc,token,history)=>async(dispatch)=>{
    dispatch({ type: UPDATE_STORE_REQUEST, payload:{_id,storeName,storeAddress,storeDescription,storeType,contactNumber,socialMediaAcc} });
    try {
        const {data}=await axios.post('/updatestoreinfo',{_id,storeName,storeAddress,storeDescription,storeType,contactNumber,socialMediaAcc},{
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        dispatch({ type: UPDATE_STORE_SUCCESS, payload: data });
        history.push(`/storeInfo/${storeName.replace(/\s/g,'_')}`)
    } catch (error) {
        dispatch({ type: UPDATE_STORE_FAIL, payload: error.response?.data.error });
    }
}
export {makeStore,viewMyStore,allStoresViewer,getSingleStore,updateStore}