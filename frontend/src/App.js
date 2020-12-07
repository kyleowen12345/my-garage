import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';
import Home from "./component/Home/Home";
import Navbar from "./component/Navbar/Navbar";
import Signin from "./component/Forms/Signin";
import Signup from "./component/Forms/Signup";
import { useSelector } from "react-redux";
import Reset from "./component/Forms/Reset";
import Newpassword from "./component/Forms/Newpassword";
import Profile from "./component/Profile/Profile";
import Seller from "./component/Seller";
import Store from "./component/Store/Store";
import StoreInfo from "./component/Store/StoreInfo";
import Cart from "./component/Cart/Cart";
import StoreStat from "./component/Store/StoreStat";
import SearchStore from './component/Store/SearchStore'
import StoreType from "./component/Store/StoreType";
import Footer from "./component/Footer";








function App() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	return (
		<BrowserRouter>
			
			<Switch>
				{/* <Route path="/sa">
					<HomeLoading/>
				</Route> */}
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
						 <Navbar />
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
