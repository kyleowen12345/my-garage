import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useSelector,useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner";
import { profile } from "../actions/userActions";



const Profile = () => {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userProfile = useSelector((state) => state.userProfile);
	const { userProfileInfo, loading, error } = userProfile;
	const dispatch = useDispatch();
	const userId = userInfo?._id;
	const userToken = userInfo?.token;
	
	useEffect(() => {
		if (userInfo) {
			return dispatch(profile(userId, userToken))
		}
	}, [dispatch, userId, userToken, userInfo]);


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
					<Link to="/updataPhoto">Update ProfilePicture</Link>
					<p>{userProfileInfo?.data.name}</p>
					<p>{userProfileInfo?.data.email}</p>
					<p>{userProfileInfo?.data.country}</p>
					<p>{userProfileInfo?.data.city}</p>
					<p>{userProfileInfo?.data.SocialMediaAcc}</p>
					<p>{userProfileInfo?.data.contactNumber}</p>
					<p>{userProfileInfo?.data.zipcode}</p>
					<Link to="/updateProfile">Update Profile</Link>
				</>
			)}
         
			
		</div>
	);
};

export default Profile;
