import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';
import Home from "./component/Home/Home";
import Navbar from "./component/Navbar/Navbar";
import Signin from "./component/Forms/Signin";
import Signup from "./component/Forms/Signup";
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
import NotFound from "./component/NotFound";


function App() {
	return (
		<Router>
			<Switch>
			<Route exact path="/" >
			<Navbar />
				<Home/>
				<Footer/>
			</Route>
				
			<Route path="/storetype/:name" >
			<Navbar />
				<StoreType/>
				</Route>
			<Route path="/storeInfo/:id" >
			<Navbar />
				<StoreInfo/>
			</Route>
			<Route path="/searchResult/:name" >
			<Navbar />
				<SearchStore/>
			</Route>
			<Route path="/profile">
						<Navbar />
							<Profile />
						</Route>
						 <Route path="/Seller">
						 <Navbar />
                                <Seller/>
						 </Route>
						 <Route path="/Store/:id">
						 <Navbar />
                                <Store/>
						 </Route>
						 <Route path="/Store/">
						 <Navbar />
                                <Store/>
						 </Route>
						 <Route path="/cart">
						 <Navbar />
							 <Cart/>
						 </Route>
						 <Route path="/storeStats/:id">
						 <Navbar />
                             <StoreStat/>
						 </Route>
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
						<Route component={NotFound}/>
			</Switch>
		</Router>
	);
}

export default App;
