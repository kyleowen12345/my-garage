import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import { useSelector } from "react-redux";
import Reset from "./component/Reset";
import Newpassword from "./component/Newpassword";
import Profile from "./component/Profile";
import Seller from "./component/Seller";
import UpdateProfile from "./component/UpdateProfile";
import UpdateProfilePic from "./component/UpdateProfilePic";
import Store from "./component/Store";
import CreateStores from "./component/CreateStores";
import StoreImage from "./component/StoreImage";
import StoreInfo from "./component/StoreInfo";

function App() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				{userInfo ? (
					<>
					
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
						<Route path="/updateProfile">
                               <UpdateProfile/>
						 </Route>
						 <Route path="/updataPhoto">
                              <UpdateProfilePic/>
						 </Route>
						 <Route path="/Seller">
                                <Seller/>
						 </Route>
						 <Route path="/Store">
                                <Store/>
						 </Route>
						 <Route path="/createStore">
                              <CreateStores/>
						 </Route>
						 <Route path="/createStoreImage">
                              <StoreImage/>
						 </Route>
						 <Route path="/storeInfo/:name">
                              <StoreInfo/>
						 </Route>
					</>
				) : (
					<>
						<Route path="/signup">
							<Signup />
						</Route>
						<Route path="/signin">
							<Signin />
						</Route>
						<Route exact path="/reset-password">
							<Reset />
						</Route>
						<Route exact path="/reset-password/:token">
							<Newpassword />
						</Route>
					</>
				)}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
