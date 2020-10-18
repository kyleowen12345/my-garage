import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allStoresViewer } from '../actions/storeActions'
import Loader from "react-loader-spinner";
import { Link, } from "react-router-dom";
import Cookie from "js-cookie";
const Home = () => {
	const viewAllStore = useSelector((state) => state.viewAllStore);
	const { allStores, loading, error } = viewAllStore;
	const dispatch = useDispatch();
	useEffect(()=>{
	  dispatch(allStoresViewer())
	},[dispatch])


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
					{allStores?.map(item=>{
						return (
							<div className="sign__form" key={item._id}>
								<img src={item.storeBackgroundImage} alt="my-garage"/>
						<p>{item.storeName}</p>
						<p>{item.sellerName.name}</p>
						<Link to={`/storeInfo/${item.storeName.replace(/\s/g,'_')}`} onClick={()=>{Cookie.set('_stohremate',item._id)}}>View Store</Link>
							</div>
						)
					})}
				</>
			)}
		</div>
	);
};

export default Home;
