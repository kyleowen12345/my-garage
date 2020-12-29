import React,{ useEffect,useState } from 'react'
import { Link, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { viewMyStore } from '../../actions/storeActions';
import {Card,Avatar,Drawer,Empty,Pagination } from 'antd';
import {PlusCircleOutlined } from '@ant-design/icons';
import CreateStores from './CreateStores'
import StoreImage from './StoreImage'
import HomeLoading from '../Home/HomeLoading';
import { useHistory } from "react-router-dom";
import ErrorPage from '../ErrorPage';


const Store = () => {
  const [minValue,setMinValue]=useState(0)
	const [maxValue,setMaxValue]=useState(6)
  const history=useHistory()
    const [drawer,setDrawer]=useState(false)
    const [storechildren,setStoreChildren]=useState(false)
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const viewYourStore = useSelector((state) => state.viewYourStore);
    const { yourStore, loading,error } = viewYourStore;
    const dispatch = useDispatch();
    const userId = userInfo?._id;
    const userToken = userInfo?.token;
    const numEachPage=6
    const handleChange = (item) => {
      setMinValue((item-1)*numEachPage)
      setMaxValue(item * numEachPage)
      window.scrollTo(0, 0);
      };
    useEffect(()=>{
       if(userInfo){
            dispatch(viewMyStore(userId,userToken))
       }else{
        return history.push('/')
       }
    },[dispatch, userId, userToken, userInfo,history])
    
    const { Meta } = Card;
    const showDrawer = () => {
        setDrawer(true)
          };
        
    const onClose = () => {
        setDrawer(false)
          };
          const showDrawerimg = () => {
            setStoreChildren(true)
              };
    const onCloseImg = () => {
        dispatch(viewMyStore(userId,userToken))
        setStoreChildren(false)
        setDrawer(false)
              };   
    return (
        <>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center', padding:30}}>
        <h1>My Stores</h1>
         <p onClick={showDrawer} style={{cursor:'pointer' , color:'#0066CC'}}><PlusCircleOutlined style={{fontSize:20,margin:10}} />Create Store</p>
        
        <div className="home">
             {loading ?  <HomeLoading/>: error ? <p><ErrorPage/></p>:<>
             <Drawer
          title="Create Store"
          width={window.innerWidth < 1000 ? 300:600}
          onClose={onClose}
		  visible={drawer}
		  placement={'right'}
        >
			<CreateStores onClose={onClose}  openChildred={showDrawerimg}/> 
        </Drawer>
        <Drawer
          title="Create Store Picture"
          height={window.innerWidth < 1000 ? 250:200}
          onClose={onCloseImg}
          visible={storechildren}
		  placement={'top'}
        >
			<StoreImage  onClose={onCloseImg}/>
        </Drawer>
        {yourStore?.length===0 &&<Empty description={'You have no Stores'}/>}
               {yourStore && yourStore?.length >0 && yourStore?.slice(minValue,maxValue).map(item=>{
                   return (
                    <Link to={`/storeInfo/${item._id}/${item.storeName.replace(/\s/g,'_')}`}  key={item._id}>
                       <Card style={{ width: 300 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<img src={item.storeBackgroundImage} alt="my garage"/>}>
                          <Meta avatar={<Avatar src={item.sellerName.profilePic} alt='mygarage' />}
      title={item.storeName}
      description={item.socialMediaAcc}/>
                       </Card>
                       </Link>
                       
                   )
               })}
             </>}    
        </div>
        </div>
        {yourStore && <Pagination
		total={yourStore?.length}
		showTotal={total => `Total ${total} Stores`}
				  defaultCurrent={1}
				  size="small"
				  defaultPageSize={numEachPage} //default size of page
				  onChange={handleChange}
				  responsive={true}
      showQuickJumper
				  style={{display:'flex',justifyContent:'center', margin:30, padding:30}}
				/>}
        </>
    )
}

export default Store
