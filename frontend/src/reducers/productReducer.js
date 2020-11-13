import {CREATE_PRODUCT_REQUEST,CREATE_PRODUCT_SUCCESS,CREATE_PRODUCT_FAIL,GET_PRODUCT_REQUEST,GET_PRODUCT_SUCCESS,GET_PRODUCT_FAIL,SINGLE_PRODUCT_REQUEST,SINGLE_PRODUCT_SUCCESS,SINGLE_PRODUCT_FAIL,UPDATE_PRODUCT_REQUEST,UPDATE_PRODUCT_SUCCESS,UPDATE_PRODUCT_FAIL,UPDATE_IMAGE_REQUEST,UPDATE_IMAGE_SUCCESS,UPDATE_IMAGE_FAIL} from '../constants/productContstants'



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
            case UPDATE_IMAGE_REQUEST:
            return {loading:true}
            case UPDATE_IMAGE_SUCCESS:
                return {loading:false, PinSInfo:action.payload}
                case UPDATE_IMAGE_FAIL:
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
const updateProductReducer=(state={},action)=>{
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {loading:true}
            case UPDATE_PRODUCT_SUCCESS:
                return {loading:false, updateProd:action.payload}
                case UPDATE_PRODUCT_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export {createProductReducer,getStoreProductReducer,getProductReducer,updateProductReducer}