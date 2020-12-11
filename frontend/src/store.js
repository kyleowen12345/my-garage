import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
	userProfileReducer,
	userSigninReducer,
} from "./reducers/userReducer";
import { createStoreReducer, viewMyStoreReducer,allStoreReducer, getSingleStoreReducer, searchStoreReducer, getStoretypeReducer } from "./reducers/storeReducer";
import { createProductReducer, getProductReducer, getStoreProductReducer } from "./reducers/productReducer";
import {  historyReducer, viewCartReducer } from "./reducers/cartReducer";



const userInfo = Cookie.getJSON("_plip");
const initialState = { userSignin: { userInfo } };
const reducer = combineReducers({
	// User
	userSignin: userSigninReducer,
	userProfile: userProfileReducer,
	// Store
	createStore:createStoreReducer,
	viewYourStore:viewMyStoreReducer,
	viewAllStore:allStoreReducer,
	singleStore:getSingleStoreReducer,
	storeType:getStoretypeReducer,
	// Product
	createProduct:createProductReducer,
	getStoreProds:getStoreProductReducer,
	getProduct:getProductReducer,
	// Cart
	viewcahrt:viewCartReducer,
	purchasedItems:historyReducer,
	searchedStore:searchStoreReducer
});


// const composeEnhancer =
// 	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
// 	(window.__REDUX_DEVTOOLS_EXTENSION__ &&
// 		window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducer, initialState, applyMiddleware(thunk));
export default store;
