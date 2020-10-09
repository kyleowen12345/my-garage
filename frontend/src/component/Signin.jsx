import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";

const Signin = () => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const userSignin = useSelector((state) => state.userSignin);
	const { loading, error, userInfo } = userSignin;
	const dispatch = useDispatch();
	useEffect(() => {
		if (userInfo) {
			history.push("/");
		}
	}, [history, userInfo]);

	const handlePost = (e) => {
		e.preventDefault();
		dispatch(signin(email, password, history));
		// history.push('/')
	};
	return (
		<div>
			<form className="sign__form">
				<h2>Sign-In</h2>

				<label>Email</label>
				<input type="email" onChange={(e) => setEmail(e.target.value)} />
				<label>Password</label>
				<input type="password" onChange={(e) => setPassword(e.target.value)} />
				{error ? <p>{error}</p> : <></>}
				{loading ? (
					<div className="sign__loader">
						<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
					</div>
				) : (
					<button onClick={handlePost} type="submit">
						Sign-in
					</button>
				)}

				<Link to="/reset-password" className="sign__link">
					forgot password?
				</Link>
				<Link to="/signup" className="sign__link">
					Don't have an account?
				</Link>
			</form>
		</div>
	);
};

export default Signin;
