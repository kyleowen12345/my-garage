import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

const Reset = () => {
	const [email, setEmail] = useState("");
	const [fillers, setFillers] = useState([]);
	const [loading, setLoading] = useState(false);
	const PostData = (e) => {
		e.preventDefault();
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			return setFillers("Incorrect Email");
		}
		setLoading(true);
		axios
			.post("/reset-password", {
				email,
			})
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setFillers(data.data.message);
					setLoading(false);
				}
			})
			.catch((err) => {
				setFillers(err.response.data.error);
				setLoading(false);
			});
	};
	return (
		<div>
			<form className="sign__form">
				<h2>Enter You Email..</h2>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<p>{fillers}</p>
				{loading ? (
					<div className="sign__loader">
						<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
					</div>
				) : (
					<button
						className="btn waves-effect waves-light #64b5f6 blue darken-1"
						onClick={PostData}
						type="submit"
						disabled={fillers === "check your email"}
					>
						reset password
					</button>
				)}
				<Link to="/signin">Go Back to Sign-in</Link>
			</form>
		</div>
	);
};

export default Reset;
