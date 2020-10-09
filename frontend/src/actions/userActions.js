import axios from "axios";
import Cookie from "js-cookie";
import {
	USER_SIGN_REQUEST,
	USER_SIGN_SUCCESS,
	USER_SIGN_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_SUCCESS,
	USER_PROFILE_FAIL,
} from "../constants/userConstants";

const signin = (email, password, history) => async (dispatch) => {
	dispatch({ type: USER_SIGN_REQUEST, payload: { email, password } });
	try {
		const { data } = await axios.post("http://localhost:1234/signin", {
			password,
			email,
		});
		dispatch({ type: USER_SIGN_SUCCESS, payload: data });
		// localStorage.setItem("token", data.data.token);
		Cookie.set("_plip", JSON.stringify(data));
		history.push("/");
	} catch (err) {
		dispatch({ type: USER_SIGN_FAIL, payload: err.response.data.error });
	}
};
const profile = (_id, token) => (dispatch) => {
	dispatch({ type: USER_PROFILE_REQUEST, payload: { _id, token } });

	axios
		.post(
			"http://localhost:1234/profile",
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
			dispatch({ type: USER_PROFILE_FAIL, payload: err.response.data.error });
		});
};

export { signin, profile };
