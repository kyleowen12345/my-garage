import React,{ useEffect,useState } from 'react'
import { Link, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { viewMyStore } from '../../actions/storeActions';
import {Card,Avatar,Drawer } from 'antd';
import {PlusCircleOutlined } from '@ant-design/icons';
import CreateStores from './CreateStores'
import StoreImage from './StoreImage'
import HomeLoading from '../Home/HomeLoading';
import { useHistory } from "react-router-dom";


const Store = () => {
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
         <p onClick={showDrawer} style={{cursor:'pointer'}}><PlusCircleOutlined style={{fontSize:20,margin:10}} />Create Store</p>
        
        <div className="home">
             {loading ?  <HomeLoading/>: error ? <p>{error}</p>:<>
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
               {yourStore?.map(item=>{
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
        </>
    )
}

export default Store
