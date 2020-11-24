import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import { useSelector } from "react-redux";
import Reset from "./component/Reset";
import Newpassword from "./component/Newpassword";
import Profile from "./component/Profile";
import Seller from "./component/Seller";
import Store from "./component/Store";
import StoreInfo from "./component/StoreInfo";
import Cart from "./component/Cart";
import StoreStat from "./component/StoreStat";
import SearchStore from './component/SearchStore'
import StoreType from "./component/StoreType";
import Footer from "./component/Footer";






function App() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	return (
		<BrowserRouter>
			
			<Switch>
			<Route exact path="/" >
				
			<Navbar />
				<Home/>
				<Footer/>
				</Route>
				
			<Route path="/storetype/:name" component={StoreType}>
			<Navbar />
				<StoreType/>
				</Route>
			<Route path="/storeInfo" component={StoreInfo}>
			<Navbar />
				<StoreInfo/>
			</Route>
			<Route path="/searchResult/:name" component={SearchStore}>
			<Navbar />
				<SearchStore/>
			</Route>
                                   	
				{userInfo ? (
					<>
						<Route path="/profile">
						<Navbar />
							<Profile />
						</Route>
						 <Route path="/Seller">
                                <Seller/>
						 </Route>
						 <Route path="/Store">
						 <Navbar />
                                <Store/>
						 </Route>
						 <Route path="/cart">
						 <Navbar />
							 <Cart/>
						 </Route>
						 <Route path="/StoreStats">
						 <Navbar />
                             <StoreStat/>
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
