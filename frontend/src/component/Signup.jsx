import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useHistory, Link } from "react-router-dom";

const Signup = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState("");
	const [confirmpass, setConfirmpass] = useState("");

	const handlePost = (e) => {
		e.preventDefault();
		if (password !== confirmpass) {
			return setErrors("password does not match");
		}

		setLoading(true);
		axios
			.post("http://localhost:1234/signup", {
				name,
				password,
				email,
			})
			.then((data) => {
				setLoading(false);
				history.push("/signin");
			})

			.catch((err) => {
				console.log(err.response.data);
				setErrors(err.response.data.error);
				setLoading(false);
			});
	};
	return (
		<div>
			<form className="sign__form">
				<h2>Create new Account</h2>

				<label>Username</label>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				<label>Email</label>
				<input type="email" onChange={(e) => setEmail(e.target.value)} />
				<label>Password</label>
				<input type="password" onChange={(e) => setPassword(e.target.value)} />
				<label>Confirm-Password</label>
				<input
					type="password"
					value={confirmpass}
					onChange={(e) => setConfirmpass(e.target.value)}
				/>
				{errors ? <p>{errors}</p> : <></>}
				{loading ? (
					<div className="sign__loader">
						<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
					</div>
				) : (
					<button onClick={handlePost} type="submit">
						Sign-in
					</button>
				)}
				<Link to="/signin" className="sign__link">
					Already Have an Account?
				</Link>
			</form>
		</div>
	);
};

export default Signup;
