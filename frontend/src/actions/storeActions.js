import axios from "axios";

import {CREATE_STORE_REQUEST,CREATE_STORE_SUCCESS,CREATE_STORE_FAIL,VIEW_STORE_REQUEST,VIEW_STORE_SUCCESS,VIEW_STORE_FAIL,VIEWALL_STORE_REQUEST,VIEWALL_STORE_SUCCESS,VIEWALL_STORE_FAIL,VIEWSINGLE_STORE_REQUEST,VIEWSINGLE_STORE_SUCCESS,VIEWSINGLE_STORE_FAIL,UPDATE_STORE_REQUEST,UPDATE_STORE_SUCCESS,UPDATE_STORE_FAIL,SEARCH_STORE_REQUEST,SEARCH_STORE_SUCCESS,SEARCH_STORE_FAIL,UPDATE_IMAGE_REQUEST,UPDATE_IMAGE_SUCCESS,UPDATE_IMAGE_FAIL,STORETYPE_REQUEST,STORETYPE_SUCCESS,STORETYPE_FAIL} from '../constants/storeContstants'



const makeStore=(storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber,userId,openChildred,userToken,message,history)=>async(dispatch)=>{
    dispatch({ type: CREATE_STORE_REQUEST});
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_API_KEY}/createStore`,{
            storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber,
            _id:userId
        },{
            headers: {
                Authorization: `Bearer${userToken}`,
            },
        })
        dispatch({ type: CREATE_STORE_SUCCESS, payload: data });
        history.push(`/Store/${data.store._id}`)
        message.success('Store Created')
        openChildred()
        
    } catch (error) {
        dispatch({ type: CREATE_STORE_FAIL, payload: error.response?.data.error });
    }
}
const viewMyStore=(_id, token)=>async(dispatch)=>{
    dispatch({ type: VIEW_STORE_REQUEST});
    try {
        const {data}=await axios.post(`${process.env.REACT_APP_API_KEY}/mystores`,{_id},{
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        dispatch({ type: VIEW_STORE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VIEW_STORE_FAIL, payload: error });
    }
}
const allStoresViewer=()=>async(dispatch)=>{
    dispatch({ type: VIEWALL_STORE_REQUEST });
    try {
        const {data}=await axios.get(`${process.env.REACT_APP_API_KEY}/homies`)
        dispatch({ type: VIEWALL_STORE_SUCCESS, payload: data });
    } catch (error) {
        console.log(error)
        dispatch({ type: VIEWALL_STORE_FAIL, payload: error });
    }
    
}
const getSingleStore=(_id)=>async(dispatch)=>{
    dispatch({ type: VIEWSINGLE_STORE_REQUEST});
    try {
        const {data}=await axios.post(`${process.env.REACT_APP_API_KEY}/singlestore`,{
            _id
        })
        dispatch({ type: VIEWSINGLE_STORE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VIEWSINGLE_STORE_FAIL, payload: error });
    }

}
const getSearchedStore=(storeName,history)=>async(dispatch)=>{
    dispatch({ type: SEARCH_STORE_REQUEST});
    try {
        const {data}=await axios.post(`${process.env.REACT_APP_API_KEY}/searchresult`,{
            storeName
        })
        dispatch({ type: SEARCH_STORE_SUCCESS, payload: data });
        history.push(`/searchResult/${storeName}`)
    } catch (error) {
        dispatch({ type: SEARCH_STORE_FAIL, payload: error });
    }

}
const updateStore=(_id,storeName,storeAddress,storeDescription,storeType,contactNumber,socialMediaAcc,token,message,onClose)=>async(dispatch)=>{
    dispatch({ type: UPDATE_STORE_REQUEST});
    message.info('Updating Store',1)
    try {
        const {data}=await axios.post(`${process.env.REACT_APP_API_KEY}/updatestoreinfo`,{_id,storeName,storeAddress,storeDescription,storeType,contactNumber,socialMediaAcc},{
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        dispatch({ type: UPDATE_STORE_SUCCESS, payload: data });
        message.success('Updated',1)
        onClose()
    } catch (error) {
        dispatch({ type: UPDATE_STORE_FAIL, payload: error.response?.data.error });
        message.error(error.response?.data.error)
    }
}
const newStoreImage=(storeBackgroundImage,_id,token,onClose,message)=>async(dispatch)=>{
    dispatch({ type: UPDATE_IMAGE_REQUEST});
    try {
        const {data}=await axios.post(`${process.env.REACT_APP_API_KEY}/storebackgroundImage`,{
            storeBackgroundImage,_id
        },{
            headers: {
                Authorization: `Bearer${token}`,
            },
        })
        dispatch({ type: UPDATE_IMAGE_SUCCESS, payload: data });
        message.success('Uploaded..',1)
        onClose()
    } catch (error) {
        dispatch({ type: UPDATE_IMAGE_FAIL, payload: error.response?.data.error }); 
        message.error(error.response?.data.error)
    }
}
const getStoreType=(storeType,history)=>async(dispatch)=>{
    dispatch({ type: STORETYPE_REQUEST});
    try {
        const {data}=await axios.post(`${process.env.REACT_APP_API_KEY}/storeOption`,{
            storeType
        })
        dispatch({ type: STORETYPE_SUCCESS, payload: data });
        history.push(`/storetype/${storeType}`)
    } catch (error) {
        dispatch({ type: STORETYPE_FAIL, payload: error }); 
       
    }
}

export  {makeStore,viewMyStore,allStoresViewer,getSingleStore,updateStore,getSearchedStore,newStoreImage,getStoreType}