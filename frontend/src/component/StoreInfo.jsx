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
import { message,Dropdown,Menu,Card,Button,Image,Drawer,Empty,Popconfirm } from 'antd';
import { SettingOutlined,BarChartOutlined,PictureOutlined,AuditOutlined,AppstoreAddOutlined,DeleteOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import UpdateStore from './UpdateStore';
import StoreImage from './StoreImage';
import CreateProduct from './CreateProduct';
import ProductImage from './ProductImage';
import Product from './Product';
import UpdateProduct from './UpdateProduct';
import StoreInfoLoad from './StoreInfoLoad';
import Media from 'react-media';





const StoreInfo = () => {
    const history=useHistory()
    const alert = useAlert()
    const [drawer,setDrawer]=useState(false)
    const [imageDrawer,setImageDrawer]=useState(false)
    const [productDrawer,setProductDrawer]=useState(false)
    const [productchildren,setProductChildren]=useState(false)
    const [producInfo,setProductInfo]=useState(false)
    const [updateProduct,setUpdateProduct]=useState(false)
    const [productName,setProductName]=useState('')
    const singleStore = useSelector((state) => state.singleStore);
    const { getStore, loading } = singleStore;
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

// get store
    useEffect(()=>{
        if(storeNameFam ){
            dispatch(getSingleStore(storeNameFam))
        }
        
    },[dispatch,storeNameFam])
// get updated store

    const handleDelete=()=>{
        Axios.post('/removeStorefam',{
            storeName:storeNameFam
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
    // Drawer
    // Store
const showDrawer = () => {
	setDrawer(true)
	  };
	
const onClose = () => {
	setDrawer(false)
      };
    //   Store image
 const showDrawerimg = () => {
		setImageDrawer(true)
		  };
const onCloseImg = () => {
		setImageDrawer(false)
          };  
        //   add Product 
          const showDrawerProduct = () => {
            setProductDrawer(true)
              };
const onCloseProduct = () => {
        setProductDrawer(false)
              };   
            //   add Product Image
const showDrawerProductImg = () => {
                setProductChildren(true)
                  };
const onCloseProductImg =() => {
            setProductChildren(false)
            setProductDrawer(false)
            setProductInfo(false)
            dispatch(getAllPInS(storeId))
            dispatch(getSingleStore(storeNameFam))
                  };   
                //   Product Info
        const onCloseProducInfo=()=>{
            setProductInfo(false)
        }
        // Update Product
        const showUpdateProduct=()=>{
            setUpdateProduct(true)
        }
        const closeUpdateProduct=()=>{
            setUpdateProduct(false)
            setProductInfo(false)
            dispatch(getAllPInS(storeId))
        }
        // Delete Product
        const deleteClose=()=>{
            setProductInfo(false)
            dispatch(getAllPInS(storeId))
        }

    // Dropdown
    const menu = (
        <Menu>
          <Menu.Item key={1}>
          <p onClick={showDrawerimg}><PictureOutlined />  Update Store Image</p>
          </Menu.Item>
          <Menu.Item key={2}>
              <p>
              <Link to='/StoreStats' style={{color:'black'}}><BarChartOutlined />  Store Stat-sheet</Link>
              </p>
          </Menu.Item>
          <Menu.Item key={3}>
          <p onClick={showDrawer}><AuditOutlined />  Update Store</p>
          </Menu.Item>
          <Menu.Item key={4}>
          <p onClick={showDrawerProduct}><AppstoreAddOutlined /> Add product</p>
          </Menu.Item>
          <Menu.Item key={5}>
          <Popconfirm title="Sure to delete?" onConfirm={handleDelete}  >
          <p ><DeleteOutlined />  Remove Store</p>
            </Popconfirm>
          </Menu.Item>
        </Menu>
      )
 console.log(PinSInfo)
 console.log(userInfo?._id,getStore?.sellerName._id)
 console.log(getStore)
 console.log(window.innerWidth)
    return (
        <>
            {loading ? (
                <StoreInfoLoad/>
			):(
                <div className="Store__info">
            <div className="Store__fulldetails">
                <Image src={getStore?.storeBackgroundImage} alt="my-garage"  />
                <h1>  {getStore?.storeName}</h1>
                {userInfo?._id ===getStore?.sellerName._id&& <Dropdown overlay={menu} placement="bottomCenter" arrow trigger={['click']} key={1}>
      <SettingOutlined key="edit" style={{fontSize:30, color:'black', marginRight:'auto'}}/>
				</Dropdown>	}
               <div className="Store__details" >
                <p><span>StoreName:</span>   {getStore?.storeName}</p>
                <p><span>Store Type:</span>   {getStore?.storeType}</p>
                <p><span>Store Description:</span>   {getStore?.storeDescription}</p>
                <p><span>Store Address:</span>   {getStore?.storeAddress}</p>
                <p><span>Social Media Account:</span>   {getStore?.socialMediaAcc}</p>
                <p><span>Store Owner:</span>   {getStore?.sellerName.name}</p> 
                </div>
                {/* Store */}
                
                <Drawer
          title="Update Store"
          width={600}
          onClose={onClose}
		  visible={drawer}
		  placement={'right'}
        >
			<UpdateStore onClose={onClose}/> 
        </Drawer>
		<Drawer
          title="Update Store Picture"
		  height={200}
          onClose={onCloseImg}
          visible={imageDrawer}
		  placement={'top'}
        >
			<StoreImage  onClose={onCloseImg}/>
        </Drawer>
        {/* product */}
        <Drawer
          title="Create Product"
		  width={600}
          onClose={onCloseProduct}
          visible={productDrawer}
		  placement={'right'}
        >
		<CreateProduct  onClose={onCloseProduct} openChildred={showDrawerProductImg}/>
        </Drawer>
        <Drawer
          title="Add Photo for the Product"
          height={200}
          onClose={onCloseProductImg}
          visible={productchildren}
          placement={'top'}
        >
		<ProductImage  onClose={onCloseProductImg} />
        </Drawer>
        <Drawer
          title={productName}
		  width={window.innerWidth < 1000 ? 300:600}
          onClose={onCloseProducInfo}
          visible={producInfo}
          placement={'right'}
        >
		<Product onClose={onCloseProducInfo} openChildred={showDrawerProductImg} openUpdateprod={showUpdateProduct} deleteClose={deleteClose}/>
        </Drawer>
        <Drawer
          title='Update Product'
		  width={500}
          onClose={closeUpdateProduct}
          visible={updateProduct}
          placement={'right'}
        >
		<UpdateProduct onClose={closeUpdateProduct} openChildred={showDrawerProductImg}/>
        </Drawer>
                <div className="ProductList">
                    
                {PinSInfo?.length < 1 ?<Empty description={'Products unavailable'} /> :PinSInfo?.map(item=>{
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
               <h3 onClick={()=>{ Cookie.set('_pductFam',item._id)
    setProductInfo(true)
    setProductName(item.productName)}} className='product__clicked'>View More Info</h3>
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
