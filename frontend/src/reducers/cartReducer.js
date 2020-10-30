import {ADD__TO__CART__REQUEST,ADD__TO__CART__SUCCESS,ADD__TO__CART__FAIL,VIEW__CART__REQUEST,VIEW__CART__SUCCESS,VIEW__CART__FAIL,REMOVE__CART__REQUEST,REMOVE__CART__SUCCESS,REMOVE__CART__FAIL,BUY__CART__REQUEST,BUY__CART__SUCCESS,BUY__CART__FAIL,HISTORY__REQUEST,HISTORY__SUCCESS,HISTORY__FAIL} from '../constants/cartConstants'


const viewCartReducer=(state={},action)=>{
    switch (action.type) {
        case ADD__TO__CART__REQUEST:
            return{loader:true}
            case ADD__TO__CART__SUCCESS:
                return{loader:false, cartInfo:action.payload}
                case ADD__TO__CART__FAIL:
            return{loader:false, error:action.payload}
        case VIEW__CART__REQUEST:
            return{loading:true}
            case VIEW__CART__SUCCESS:
                return{loading:false, cartInfo:action.payload}
                case VIEW__CART__FAIL:
            return{loading:false, error:action.payload}
            case REMOVE__CART__REQUEST:
            return{loading:true}
            case REMOVE__CART__SUCCESS:
                return{loading:false, cartInfo:action.payload}
                case REMOVE__CART__FAIL:
            return{loading:false, error:action.payload}
            case BUY__CART__REQUEST:
            return{loading:true}
            case BUY__CART__SUCCESS:
                return{loading:false, cartInfo:action.payload}
                case BUY__CART__FAIL:
            return{loading:false, error:action.payload}
        default:
          return state
    }
}
const historyReducer=(state={},action)=>{
    switch (action.type) {
        case HISTORY__REQUEST:
         return{loading:true}
         case HISTORY__SUCCESS:
            return{loading:false, historyInfo:action.payload}
            case HISTORY__FAIL:
                return{loading:false, error:action.payload}
        default:
            return state
    }
}

export {viewCartReducer,historyReducer}