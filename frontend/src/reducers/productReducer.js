import {CREATE_PRODUCT_REQUEST,CREATE_PRODUCT_SUCCESS,CREATE_PRODUCT_FAIL,GET_PRODUCT_REQUEST,GET_PRODUCT_SUCCESS,GET_PRODUCT_FAIL,SINGLE_PRODUCT_REQUEST,SINGLE_PRODUCT_SUCCESS,SINGLE_PRODUCT_FAIL} from '../constants/productContstants'


const createProductReducer=(state={},action)=>{
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {loading:true}
            case CREATE_PRODUCT_SUCCESS:
                return {loading:false, prductInfo:action.payload}
                case CREATE_PRODUCT_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}
const getStoreProductReducer=(state={},action)=>{
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {loading:true}
            case GET_PRODUCT_SUCCESS:
                return {loading:false, PinSInfo:action.payload}
                case GET_PRODUCT_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}
const getProductReducer=(state={},action)=>{
    switch (action.type) {
        case SINGLE_PRODUCT_REQUEST:
            return {loading:true}
            case SINGLE_PRODUCT_SUCCESS:
                return {loading:false, productInfo:action.payload}
                case SINGLE_PRODUCT_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export {createProductReducer,getStoreProductReducer,getProductReducer}