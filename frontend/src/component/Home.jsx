import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allStoresViewer } from '../actions/storeActions'
import { Link, } from "react-router-dom";
import Cookie from "js-cookie";
import {Card,Spin,Pagination,Avatar } from 'antd';


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
		<div className="home">
			{loading ? (
				<Spin size="large" style={{ marginTop:50, marginLeft:600}} tip='Gathering Stores .....'/>
			) :error ? (
				<div>{error}</div>
			) : (
				<>
					{allStores && allStores.length >0 && allStores.slice(minValue,maxValue).map(item=>{
						return (
							<Link to={`/storeInfo/${item.storeName.replace(/\s/g,'_')}`} onClick={()=>{Cookie.set('_stohremate',item._id)}} key={item._id}>
							<Card title={item.storeName} style={{ width: 300, marginTop: 16, borderRadius:10 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}} headStyle={{border:'none',alignItems:'center'}}>
								<img src={item.storeBackgroundImage} alt="my-garage" style={{width:350, height:350, objectFit:'contain'}}/>
								<Meta
      avatar={<Avatar src={item.sellerName.profilePic} alt='mygarage' />}
      title={item.sellerName.name}
      description={item.storeDescription}
    />
	<p style={{color:'#125FA7'}}>Visit</p>
							</Card>
							</Link>
						)
						
					})}
					
				</>
			)}
			
			
		</div>
		{allStores && <Pagination
		total={allStores?.length}
		showTotal={total => `Total ${total} Stores`}
				  defaultCurrent={1}
				  defaultPageSize={numEachPage} //default size of page
				  onChange={handleChange}
				  responsive={true}
				  style={{display:'flex',justifyContent:'center', margin:30}}
				/>}
		
					</>
	);
};

export default Home;
