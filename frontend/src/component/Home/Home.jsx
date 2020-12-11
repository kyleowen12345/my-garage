import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allStoresViewer } from '../../actions/storeActions'
import { Link, } from "react-router-dom";
import {Card,Pagination,Avatar } from 'antd';
import HomeLoading from "./HomeLoading";
import ImageCarousel from "./ImageCarousel";
import OptionCarousel from "./OptionCarousel";


const Home = () => {
	const [minValue,setMinValue]=useState(0)
	const [maxValue,setMaxValue]=useState(6)
	const viewAllStore = useSelector((state) => state.viewAllStore);
	const { allStores, loading, error } = viewAllStore;
	const dispatch = useDispatch();
	
	useEffect(()=>{
	  dispatch(allStoresViewer())
	},[dispatch])
// Card
const { Meta } = Card;
const numEachPage=6
const handleChange = (item) => {
	setMinValue((item-1)*numEachPage)
	setMaxValue(item * numEachPage)
  };

	return (
		<>
		<ImageCarousel/>
		<OptionCarousel/>
		<h1 style={{textAlign:'center'}}>Stores</h1>
			{loading ? (
				<HomeLoading />
			) :error ? (
				<div>nag error</div>
			) : (
				<div className="home">
					{allStores && allStores?.length >0 && allStores?.slice(minValue,maxValue).map(item=>{
						return (
							<Link to={`/storeInfo/${item._id}/${item.storeName.replace(/\s/g,'_')}`}  key={item._id}>
							<Card style={{ width: 300 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<img src={item.storeBackgroundImage} alt="my garage"/>}>
								<Meta
      avatar={<Avatar src={item.sellerName.profilePic} alt='mygarage' />}
      title={item.storeName}
      description={item.storeDescription}
    />
	<p style={{color:'#125FA7'}}>Visit</p>
							</Card>
							</Link>
						)
						
					})}
					
				</div>
			)}
		{allStores && <Pagination
		total={allStores?.length}
		showTotal={total => `Total ${total} Stores`}
				  defaultCurrent={1}
				  size="small"
				  defaultPageSize={numEachPage} //default size of page
				  onChange={handleChange}
				  responsive={true}
      showQuickJumper
				  style={{display:'flex',justifyContent:'center', margin:30}}
				/>}
		
					</>
	);
};

export default Home;
