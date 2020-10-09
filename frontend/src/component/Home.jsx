import React from "react";

import { useSelector } from "react-redux";
const Home = () => {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	console.log(userInfo);
	// useEffect(() => {
	// 	if (userInfo) {
	// 		history.push("/");
	// 	}
	// });
	return <div></div>;
};

export default Home;
