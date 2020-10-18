import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import { Link } from "react-router-dom";

const Newpassword = () => {
	const [password, setPasword] = useState("");
	const [confirmpass, setConfirmpass] = useState("");
	const [warn, setWarn] = useState("");
	const [loading, setLoading] = useState(false);
	const { token } = useParams();

	const PostData = (e) => {
		e.preventDefault();
		if (password !== confirmpass) {
			return setWarn("password does not match");
		}
		if (!password || !confirmpass) {
			return setWarn("Complete the fields");
		}
		setLoading(true);
		axios
			.post("/new-password", {
				password,
				token,
			})
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setLoading(false);
					setWarn(`password update success, go to signin`);
				}
			})
			.catch((err) => {
				console.log(err.response.data.error);
				setWarn(err.response.data.error);
				setLoading(false);
			});
	};

	return (
		<div>
			<form className="sign__form">
				<h2>Enter Your New Password</h2>
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPasword(e.target.value)}
				/>
				<label>Confirm-Password</label>
				<input
					type="password"
					value={confirmpass}
					onChange={(e) => setConfirmpass(e.target.value)}
				/>
				<p>{warn}</p>
				{loading ? (
					<div className="sign__loader">
						<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
					</div>
				) : (
					<button
						className="btn waves-effect waves-light #64b5f6 blue darken-1"
						onClick={PostData}
						type="submit"
					>
						Update password
					</button>
				)}
				<Link to="/signin">Go Back to Sign-in</Link>
			</form>
		</div>
	);
};

export default Newpassword;
