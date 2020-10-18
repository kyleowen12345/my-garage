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
} from "../constants/userConstants";


const signin = (email, password, history) => async (dispatch) => {
	dispatch({ type: USER_SIGN_REQUEST, payload: { email, password } });
	try {
		const { data } = await axios.post("/signin", {
			password,
			email,
		});
		dispatch({ type: USER_SIGN_SUCCESS, payload: data });
		Cookie.set("_plip", JSON.stringify(data), {expires:7});
		history.push("/");
	} catch (err) {
		dispatch({ type: USER_SIGN_FAIL, payload: err.response?.data.error });
	}
};
const profile = (_id, token) => (dispatch) => {
	dispatch({ type: USER_PROFILE_REQUEST, payload: { _id, token } });

	axios
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
		.then((data) => {
			dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
		})
		.catch((err) => {
			dispatch({ type: USER_PROFILE_FAIL, payload: err.response?.data.error });
		});
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
	history
) => async (dispatch) => {
	dispatch({
		type: USER_UPDATEPROFILE_REQUEST,
		payload: { _id,name, contactNumber, country, SocialMediaAcc, city, zipcode, token },
	});
	try {
		const { data } = await axios.post(
			"/updatebio",
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
		history.push('/profile')
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: USER_UPDATEPROFILE_FAIL,
			payload: error.response?.data.error,
		});
	}
};
export { signin, profile, updateProfile };
