import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getSingleStore } from '../actions/storeActions';
import Cookie from "js-cookie";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getAllPInS } from '../actions/productAction';
import { addtocartact } from '../actions/cartActions';
import { useAlert } from 'react-alert'
import { message,Spin,Dropdown,Menu,Card,Button,Image } from 'antd';
import { SettingOutlined,BarChartOutlined,PictureOutlined,AuditOutlined,AppstoreAddOutlined,DeleteOutlined,ShoppingCartOutlined } from '@ant-design/icons';




const StoreInfo = () => {
    const history=useHistory()
    const alert = useAlert()
    const [viewDetails,setViewDetails]=useState(false)
    const singleStore = useSelector((state) => state.singleStore);
    const { getStore, loading, error } = singleStore;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const getStoreProds = useSelector((state) => state.getStoreProds);
    const { PinSInfo } = getStoreProds;
    const dispatch = useDispatch();
    const storeNameFam=Cookie.getJSON("_stohremate");
    
  console.log(getStore?._id)
  const storeId=getStore?._id

  useEffect(()=>{
    dispatch(getAllPInS(storeId))
  },[dispatch,storeId])

console.log(PinSInfo)
    useEffect(()=>{
        if(storeNameFam){
            dispatch(getSingleStore(storeNameFam))
        }
        
    },[dispatch,storeNameFam])

    const handleDelete=()=>{
        Axios.post('/removeStorefam',{
            storeName:getStore?.storeName
        },{
            headers: {
                Authorization: `Bearer${userInfo?.token}`,
            },
        }).then(result=>{
            console.log(result)
            alert.success(result?.data.message)
            history.push('/Store')
        }).catch(error=>{
            console.log(error)
        })
    }
    // Dropdown
    const menu = (
        <Menu>
          <Menu.Item key={1}>
          <Link to='/createStoreImage'><PictureOutlined />  Update Store Image</Link>
          </Menu.Item>
          <Menu.Item key={2}>
          <Link to='/StoreStats'><BarChartOutlined />  Store Stat-sheet</Link>
          </Menu.Item>
          <Menu.Item key={3}>
          <Link to='/updateStore'><AuditOutlined />  Update Store</Link>
          </Menu.Item>
          <Menu.Item key={4}>
          <Link to='/createProduct'><AppstoreAddOutlined /> Add product</Link>
          </Menu.Item>
          <Menu.Item key={5}>
          <p onClick={handleDelete}><DeleteOutlined />  Remove Store</p>
          </Menu.Item>
        </Menu>
      )
// Card
const { Meta } = Card;      
    return (
        <>
            {loading ? (
                <div className="StoreInfo__loader">
<Spin size="large"  tip={`Finding Store..`}/>
                </div>
				
			) : error ? (
				<div>{error}</div>
			) :(
                <div className="Store__info">
            <div className="Store__fulldetails">
            {userInfo?._id ===getStore?.sellerName._id&& <Dropdown overlay={menu} placement="bottomCenter" arrow trigger={['click']} key={1}>
      <SettingOutlined key="edit" style={{fontSize:30, color:'black', marginRight:'auto'}}/>
				</Dropdown>	}
                <h1>  {getStore?.storeName}</h1>
                <Image src={getStore?.storeBackgroundImage} alt="my-garage"  style={{objectFit:'contain', marginBottom:50}}/>
               <div className="Store__details" style={{display:viewDetails? 'block':'none'}}>
                <p><span>StoreName:</span>   {getStore?.storeName}</p>
                <p><span>Store Type:</span>   {getStore?.storeType}</p>
                <p><span>Store Description:</span>   {getStore?.storeDescription}</p>
                <p><span>Store Address:</span>   {getStore?.storeAddress}</p>
                <p><span>Social Media Account:</span>   {getStore?.socialMediaAcc}</p>
                <p><span>Store Owner:</span>   {getStore?.sellerName.name}</p> 
                </div>
                <div className="ProductList">
                    
                {PinSInfo?.map(item=>{
                const handleAdd=()=>{
                    const token=userInfo?.token
                    const productId=item._id
                    const name=item.productName
                            dispatch(addtocartact(productId,token,message,name))   
                }
               return(
                   <div className="Products" key={item._id} >
                       <Card
    hoverable
     cover={<Image src={item.image} alt="my garage"  height={250} width={250} />}
  >
               <h2>{item.productName}</h2>
               <p>${item.price}</p>
              
               {userInfo?._id !==getStore?.sellerName._id &&<Button onClick={handleAdd} ><ShoppingCartOutlined />Add to cart</Button>}
               <Link to={`/productInfo/${item.productName.replace(/\s/g,'_')}`} onClick={()=>{Cookie.set('_pductFam',item._id)}} className='product__clicked'>View More Info</Link>
  </Card>
        
                   </div>
               )
           })}
                </div>
                
                </div>
                
                </div>
            )}
        </>
    )
}

export default StoreInfo
