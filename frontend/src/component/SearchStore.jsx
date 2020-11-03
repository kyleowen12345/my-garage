import React,{useEffect} from 'react'
import { useSelector,useDispatch } from "react-redux";
import {Card,Spin,Avatar } from 'antd';
import { Link,useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import { getSearchedStore } from '../actions/storeActions';

const CartContent = () => {
    const history=useHistory()
    const searchedStore = useSelector((state) => state.searchedStore);
    const { searchStore, loading, error } = searchedStore;
    const { Meta } = Card;
    const searched=Cookie.getJSON("_sr");
    const dispatch = useDispatch();
    useEffect(()=>{
        if(searched)
        dispatch(getSearchedStore(searched,history))
    },[dispatch,searched,history])
    console.log(searchStore)
    return (
        <>
        <p className='result'>Result for "{searched}"</p>
        <div className="home">
            
            {loading ? (
				<Spin size="large" style={{ marginTop:50, marginLeft:600}} tip={`Finding ${searched}`}/>
			) :error ? (
				<div>{error}</div>
			) : (
				<> 
                {searchStore?.map(item=>{
                    console.log(item.storeName)
                    return(
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
        </>
    )
}

export default CartContent
