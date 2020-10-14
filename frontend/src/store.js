import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
	updateProfileReducer,
	userProfileReducer,
	userSigninReducer,
} from "./reducers/userReducer";
import { createStoreReducer, viewMyStoreReducer,allStoreReducer, getSingleStoreReducer } from "./reducers/storeReducer";



const userInfo = Cookie.getJSON("_plip");
const initialState = { userSignin: { userInfo } };
const reducer = combineReducers({
	userSignin: userSigninReducer,
	userProfile: userProfileReducer,
	updateProfileBio: updateProfileReducer,
	createStore:createStoreReducer,
	viewYourStore:viewMyStoreReducer,
	viewAllStore:allStoreReducer,
	singleStore:getSingleStoreReducer
});


// const composeEnhancer =
// 	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
// 	(window.__REDUX_DEVTOOLS_EXTENSION__ &&
// 		window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducer, initialState, applyMiddleware(thunk));
export default store;
