import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getStoreType } from '../../actions/storeActions';
import {useHistory,useParams,Link} from 'react-router-dom'
import HomeLoading from '../Home/HomeLoading';
import {Card,Pagination,Avatar,Empty } from 'antd';
import StoreTypeSort from '../Home/StoreTypeSort';


const StoreType = () => {
    const storeType = useSelector((state) => state.storeType);
    const [minValue,setMinValue]=useState(0)
	const [maxValue,setMaxValue]=useState(6)
    const { loader,storeTypeOps } = storeType;
    const dispatch = useDispatch();
    const history=useHistory()
    const {name}=useParams()
    
    const { Meta } = Card;
    useEffect(() => {
        dispatch(getStoreType(name,history))
    }, [dispatch,name,history])
    const numEachPage=6
const handleChange = (item) => {
	setMinValue((item-1)*numEachPage)
	setMaxValue(item * numEachPage)
  };
    return (
        <div>
            <StoreTypeSort/>
  <h1 className="result">Results for {name}</h1>
  {storeTypeOps?.length < 1 && <Empty description={'Store Type unavailable'} />}
        {loader ? <HomeLoading/>:<div className="home">
					{storeTypeOps && storeTypeOps.length >0 && storeTypeOps.slice(minValue,maxValue).map(item=>{
						return (
							<Link to={`/storeInfo/${item._id}/${item.storeName.replace(/\s/g,'_')}`} key={item._id}>
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
					
				</div>}
                {storeTypeOps && <Pagination
		total={storeTypeOps?.length}
		showTotal={total => `Total ${total} Stores`}
				  defaultCurrent={1}
				  defaultPageSize={numEachPage} //default size of page
				  onChange={handleChange}
                  responsive={true}
                  size="small"
      showQuickJumper={storeTypeOps?.length > 6 ? true: false}
				  style={{display:'flex',justifyContent:'center', margin:30, padding:30}}
				/>}
        </div>
    )
}

export default StoreType
