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

function App() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	return (
		<BrowserRouter>
			<Switch>
				{userInfo ? (
					<>
						<Navbar />
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
					</>
				) : (
					<>
						<Navbar />
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
