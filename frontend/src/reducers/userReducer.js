import {
	USER_SIGN_REQUEST,
	USER_SIGN_SUCCESS,
	USER_SIGN_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_SUCCESS,
	USER_PROFILE_FAIL,
	USER_UPDATEPROFILE_REQUEST,
	USER_UPDATEPROFILE_SUCCESS,
	USER_UPDATEPROFILE_FAIL,
	USER_SELLER_REQUEST,
	USER_SELLER_SUCCESS,
	USER_SELLER_FAIL,
	USER_IMAGE_REQUEST,
	USER_IMAGE_SUCCESS,
	USER_IMAGE_FAIL
} from "../constants/userConstants";


const userSigninReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_SIGN_REQUEST:
			return { loading: true };
		case USER_SIGN_SUCCESS:
			return { loading: false, userInfo: action.payload, loginStatus: true };
		case USER_SIGN_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
const userProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_REQUEST:
			return { loading: true };
		case USER_PROFILE_SUCCESS:
			return {
				loading: false,
				userProfileInfo: action.payload,
				
			};
		case USER_PROFILE_FAIL:
			return { loading: false, error: action.payload };
			case USER_SELLER_REQUEST:
			return { loading: true };
		case USER_SELLER_SUCCESS:
			return {
				loading: false,
				userProfileInfo: action.payload,
			
			};
		case USER_SELLER_FAIL:
			return { loading: false, error: action.payload };
			case USER_UPDATEPROFILE_REQUEST:
			return { loading: true };
		case USER_UPDATEPROFILE_SUCCESS:
			return {
				loading: false,
				userProfileInfo: action.payload,
				loginStatus: true,
			};
		case USER_UPDATEPROFILE_FAIL:
			return { loading: false, error: action.payload };
			case USER_IMAGE_REQUEST:
			return { loading: true };
		case USER_IMAGE_SUCCESS:
			return {
				loading: false,
				userProfileInfo: action.payload,
				loginStatus: true,
			};
		case USER_IMAGE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};


export { userSigninReducer, userProfileReducer };
