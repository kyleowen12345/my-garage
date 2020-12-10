import axios from "axios";
import Cookie from "js-cookie";
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


const signin = (email, password, history,message) => async (dispatch) => {
	dispatch({ type: USER_SIGN_REQUEST});
	try {
		const { data } = await axios.post("/signin", {
			password,
			email,
		});
		dispatch({ type: USER_SIGN_SUCCESS, payload: data });
		Cookie.set("_plip", JSON.stringify(data), {expires:7});
		message.success('logged in successfully')
		history.push("/");
	} catch (err) {
		dispatch({ type: USER_SIGN_FAIL, payload: err.response?.data.error });
	}
};
const profile = (_id, token) =>async (dispatch) => {
	dispatch({ type: USER_PROFILE_REQUEST});
  try {
	  const {data}=await axios
	  .post(
		  "/profile",
		  {
			  _id,
		  },
		  {
			  headers: {
				  Authorization: `Bearer${token}`,
			  },
		  }
	  )
	  dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
	dispatch({ type: USER_PROFILE_FAIL, payload: error.response?.data.error });
  }
};
const updateProfile = (
	_id,
	name,
	contactNumber,
	country,
	SocialMediaAcc,
	city,
	zipcode,
	token,
	message,
	onClose
) => async (dispatch) => {
	dispatch({
		type: USER_UPDATEPROFILE_REQUEST
	});
	message.info('updating profile')
	try {
		const { data } = await axios.post(
			"https://mygarage23.herokuapp.com/updatebio",
			{
				_id,
				name,
				contactNumber,
				country,
				SocialMediaAcc,
				city,
				zipcode,
			},
			{
				headers: {
					Authorization: `Bearer${token}`,
				},
			}
		);
		dispatch({ type: USER_UPDATEPROFILE_SUCCESS, payload: data })
		message.success('Profile Updated')
		onClose()
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: USER_UPDATEPROFILE_FAIL,
			payload: error.response?.data.error
		});
		message.error(error.response?.data.error)
	}
};
const updateSeller=(_id,token,message)=>async(dispatch)=>{
	dispatch({ type: USER_SELLER_REQUEST })
	message.info('updating Seller Info')
	try {
	const {data}=await axios.post("https://mygarage23.herokuapp.com/createSeller",{
			_id
		},{
			headers:{
			   Authorization: `Bearer${token}`,
			}
		})
		dispatch({ type: USER_SELLER_SUCCESS, payload: data })
		message.success('You are now a Seller')
	} catch (error) {
		dispatch({
			type: USER_SELLER_FAIL,
			payload: error.response?.data.error,
		});
		message.error(error.response?.data.error)
	}

}
const updateProfilePicAct=(url,token,onClose,message)=>async(dispatch)=>{
	dispatch({ type: USER_IMAGE_REQUEST })
	message.info('uploading picture')
	try {
	const {data}=await	axios.post(
			"https://mygarage23.herokuapp.com/updatephoto",
			{
			
				profilePic: url,
			},
			{
				headers: {
					Authorization: `Bearer${token}`,
				},
			}
		)
		dispatch({ type: USER_IMAGE_SUCCESS, payload:data })
		message.success('Profile Picture Updated')
		onClose()
	} catch (error) {
		dispatch({ type: USER_IMAGE_FAIL,payload: error.response?.data.error, })
		message.error(error.response?.data.error)
	}
}
export { signin, profile, updateProfile,updateSeller,updateProfilePicAct };
