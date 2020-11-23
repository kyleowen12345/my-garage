import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from "react-redux";
import {Card,Spin,Avatar,Pagination } from 'antd';
import { Link,useHistory, useParams } from "react-router-dom";
import { getSearchedStore } from '../actions/storeActions';
import Cookie from "js-cookie";
import HomeLoading from './HomeLoading';

const CartContent = () => {
    const history=useHistory()
    const {name}=useParams()
    const [minValue,setMinValue]=useState(0)
	const [maxValue,setMaxValue]=useState(6)
    const searchedStore = useSelector((state) => state.searchedStore);
    const { searchStore, loading, error } = searchedStore;
    const { Meta } = Card;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getSearchedStore(name,history))
    },[dispatch,name,history])
    console.log(searchStore)
    // pagnation
    const numEachPage=6
    const handleChange = (item) => {
        setMinValue((item-1)*numEachPage)
        setMaxValue(item * numEachPage)
      };
    return (
        <>
        <h2 className='result' >Search Results for "{name}"</h2>
        {loading && <HomeLoading/>}
        <div className="home">
            
            {error ? (
				<div>{error}</div>
			) : (
				<> 
                {searchStore && searchStore.length >0 && searchStore.slice(minValue,maxValue)?.map(item=>{
                    console.log(item.storeName)
                    return(
                        <Link to={`/storeInfo/${item.storeName.replace(/\s/g,'_')}`} onClick={()=>{Cookie.set('_stohremate',item._id)}} key={item._id}>
							<Card style={{ width: 300, marginTop: 16, borderRadius:10 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}} cover={<img src={item.storeBackgroundImage} alt="my-garage" />}>
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
							
				</>
			)}
        </div>
        {searchStore && <Pagination
		total={searchStore?.length}
		showTotal={total => `Total ${total} Stores`}
				  defaultCurrent={1}
				  defaultPageSize={numEachPage} //default size of page
				  onChange={handleChange}
				  responsive={true}
				  style={{display:'flex',justifyContent:'center', margin:30}}
				/>}
        </>
    )
}

export default CartContent
