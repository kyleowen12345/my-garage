import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import Loader from "react-loader-spinner";
import { updateProfile } from "../actions/userActions";
// import { profile } from "../actions/userActions";

const Profile = () => {
	const [image, setImage] = useState("");
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userProfile = useSelector((state) => state.userProfile);
	const { userProfileInfo, loading, error } = userProfile;
	const [url, setUrl] = useState("");
	const [name, setName] = useState("");
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [contactNumber, setContactNumber] = useState(0);
	const [zipcode, setZipcode] = useState(0);
	const [filler, setFiller] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const userEmail = userProfileInfo?.data.email;
		if (url) {
			Axios.post(
				"http://localhost:1234/updatephoto",
				{
					email: userEmail,
					profilePic: url,
				},
				{
					headers: {
						Authorization: `Bearer${userInfo?.token}`,
					},
				}
			)
				.then((data) => {
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
	// useEffect(() => {
	// 	dispatch(profile(userInfo._id, userInfo.token));
	// }, [dispatch, userInfo._id, userInfo.token]);

	const postPhoto = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "insta-clone");
		data.append("cloud_name", "kaking");
		const config = {
			headers: { "content-type": "multipart/form-data" },
		};
		Axios.post(
			"https://api.cloudinary.com/v1_1/kaking/image/upload",
			data,
			config
		)
			.then((data) => {
				setUrl(data?.data.secure_url);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleUpdate = (e) => {
		e.preventDefault();
		const userId = userInfo?._id;
		if (
			!name ||
			contactNumber < 1 ||
			!country ||
			!state ||
			!city ||
			zipcode < 1
		) {
			return setFiller("complete the fields");
		}
		dispatch(
			updateProfile(
				userId,
				name,
				contactNumber,
				country,
				state,
				city,
				zipcode,
				userInfo?.token
			)
		);
	};

	return (
		<div className="sign__form">
			{loading ? (
				<div className="sign__loader">
					<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
				</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<>
					<Avatar alt="my-garage" src={userProfileInfo?.data.profilePic} />
					<form action="">
						<input type="file" onChange={(e) => setImage(e.target.files[0])} />
						<input type="submit" onClick={postPhoto} />
					</form>
					<p>{userProfileInfo?.data.name}</p>
					<p>{userProfileInfo?.data.email}</p>
					<p>{userProfileInfo?.data.country}</p>
					<p>{userProfileInfo?.data.city}</p>
					<p>{userProfileInfo?.data.State}</p>
					<p>{userProfileInfo?.data.contactNumber}</p>
					<p>{userProfileInfo?.data.zipcode}</p>
				</>
			)}

			<form className="sign__form">
				<label>Name</label>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				<label>Country</label>
				<input type="text" onChange={(e) => setCountry(e.target.value)} />
				<label>State</label>
				<input type="text" onChange={(e) => setState(e.target.value)} />
				<label>City</label>
				<input type="text" onChange={(e) => setCity(e.target.value)} />
				<label>ContactNumber</label>
				<input
					type="number"
					onChange={(e) => setContactNumber(e.target.value)}
				/>
				<label>Zipcode</label>
				<input type="number" onChange={(e) => setZipcode(e.target.value)} />
				{filler ? <p>{filler}</p> : <></>}
				<button onClick={handleUpdate} type="submit">
					Update profile
				</button>
			</form>
		</div>
	);
};

export default Profile;
