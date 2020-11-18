import {CREATE_STORE_REQUEST,CREATE_STORE_SUCCESS,CREATE_STORE_FAIL,VIEW_STORE_REQUEST,VIEW_STORE_SUCCESS,VIEW_STORE_FAIL,VIEWALL_STORE_REQUEST,VIEWALL_STORE_SUCCESS,VIEWALL_STORE_FAIL,VIEWSINGLE_STORE_REQUEST,VIEWSINGLE_STORE_SUCCESS,VIEWSINGLE_STORE_FAIL,UPDATE_STORE_REQUEST,UPDATE_STORE_SUCCESS,UPDATE_STORE_FAIL,SEARCH_STORE_REQUEST,SEARCH_STORE_SUCCESS,SEARCH_STORE_FAIL,UPDATE_IMAGE_REQUEST,UPDATE_IMAGE_SUCCESS,UPDATE_IMAGE_FAIL,STORETYPE_REQUEST,STORETYPE_SUCCESS,STORETYPE_FAIL} from '../constants/storeContstants'

const createStoreReducer =(state={},action)=>{
    switch (action.type) {
        case CREATE_STORE_REQUEST:
            return {loading:true}
            case CREATE_STORE_SUCCESS:
                return {loading:false, storeInfo:action.payload}
                case CREATE_STORE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}
const viewMyStoreReducer=(state={},action)=>{
    switch (action.type) {
        case VIEW_STORE_REQUEST:
            return {loading:true}
            case VIEW_STORE_SUCCESS:
                return {loading:false, yourStore:action.payload}
                case VIEW_STORE_FAIL:
            return {loading:false, error:action.payload}
    
        default:
            return state
    }
}
const allStoreReducer=(state={},action)=>{
    switch (action.type) {
        case VIEWALL_STORE_REQUEST:
            return {loading:true}
            case VIEWALL_STORE_SUCCESS:
                return {loading:false, allStores:action.payload}
                case VIEWALL_STORE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}
const searchStoreReducer=(state={},action)=>{
    switch (action.type) {
        case SEARCH_STORE_REQUEST:
            return {loading:true}
            case SEARCH_STORE_SUCCESS:
                return {loading:false, searchStore:action.payload}
                case SEARCH_STORE_FAIL:
            return {loading:false, error:action.payload}
    default:
        return state
    }
}
const getSingleStoreReducer=(state={},action)=>{
    switch (action.type) {
        case VIEWSINGLE_STORE_REQUEST:
            return {loading:true}
            case VIEWSINGLE_STORE_SUCCESS:
                return {loading:false, getStore:action.payload}
                case VIEWSINGLE_STORE_FAIL:
            return {loading:false, error:action.payload}
            case UPDATE_STORE_REQUEST:
            return {loading:true}
            case UPDATE_STORE_SUCCESS:
                return {loading:false, getStore:action.payload}
                case UPDATE_STORE_FAIL:
            return {loading:false, error:action.payload}
            case UPDATE_IMAGE_REQUEST:
                return {loading:true}
                case UPDATE_IMAGE_SUCCESS:
                    return {loading:false, getStore:action.payload}
                    case UPDATE_IMAGE_FAIL:
                return {loading:false, error:action.payload}
        default:
            return state
    }
}
const getStoretypeReducer=(state={},action)=>{
    switch (action.type) {
        case STORETYPE_REQUEST:
            return {loader:true}
            case STORETYPE_SUCCESS:
                return {loader:false, storeTypeOps:action.payload}
                case STORETYPE_FAIL:
            return {loader:false, error:action.payload}
    default:
        return state
    }
}


export {createStoreReducer,viewMyStoreReducer,allStoreReducer,getSingleStoreReducer,searchStoreReducer,getStoretypeReducer}