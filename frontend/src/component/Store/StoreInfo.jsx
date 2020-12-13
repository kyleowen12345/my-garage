import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getSingleStore } from '../../actions/storeActions';
import Axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { getAllPInS } from '../../actions/productAction';
import { addtocartact } from '../../actions/cartActions';
import { message,Dropdown,Menu,Image,Drawer,Popconfirm } from 'antd';
import { BarChartOutlined,PictureOutlined,AuditOutlined,AppstoreAddOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
import UpdateStore from '../Store/UpdateStore';
import StoreImage from '../Store/StoreImage';
import CreateProduct from '../Product/CreateProduct';
import ProductImage from '../Product/ProductImage';
import Product from '../Product/Product';
import UpdateProduct from '../Product/UpdateProduct';
import StoreInfoLoad from './StoreInfoLoad';
import StoreInfoProducts from './StoreInfoProducts';
import ErrorPage from '../ErrorPage';

const StoreInfo = () => {
    const history=useHistory()
    const {id}=useParams()
    const [drawer,setDrawer]=useState(false)
    const [imageDrawer,setImageDrawer]=useState(false)
    const [productDrawer,setProductDrawer]=useState(false)
    const [productchildren,setProductChildren]=useState(false)
    const [producInfo,setProductInfo]=useState(false)
    const [updateProduct,setUpdateProduct]=useState(false)
    const [productName,setProductName]=useState('')
    const singleStore = useSelector((state) => state.singleStore);
    const { getStore, loading,error } = singleStore;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const getStoreProds = useSelector((state) => state.getStoreProds);
    const { PinSInfo } = getStoreProds;
    const viewcahrt=useSelector((state) => state.viewcahrt);
    const {loader}=viewcahrt
    const dispatch = useDispatch();
  const storeId=getStore?._id

// get store
    useEffect(()=>{
        if(id ){
            dispatch(getSingleStore(id))
        }
        
    },[dispatch,id])
// StoreProducts
useEffect(()=>{
  dispatch(getAllPInS(storeId))
},[dispatch,storeId])
// get updated store

const handleDelete=()=>{
    Axios.post(`${process.env.REACT_APP_API_KEY}/removeStorefam`,{
            storeName:id
        },{
            headers: {
                Authorization: `Bearer${userInfo?.token}`,
            },
        }).then(result=>{
          message.success(result?.data.message)
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
            dispatch(getSingleStore(id))
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
  message.info('Please wait')
    setUpdateProduct(false)
    setProductInfo(false)
    window.location.reload()
    dispatch(getAllPInS(storeId))
        }
        // Delete Product
const deleteClose=()=>{
      setProductInfo(false)
     dispatch(getAllPInS(storeId))
        }
    // Dropdown
    const editmenu=(
        <Menu>
          <Menu.Item key={1}>
          <p onClick={showDrawerimg}><PictureOutlined />  Update Store Image</p>
          </Menu.Item>
          <Menu.Item key={3}>
          <p onClick={showDrawer}><AuditOutlined />  Update Store</p>
          </Menu.Item>
        </Menu>
    )
   
    const Statmenu = (
        <Menu>
          <Menu.Item key={2}>
              <p onClick={()=>history.push(`/storeStats/${id}`)}>
             <BarChartOutlined  />  Store Stat-sheet
              </p>
          </Menu.Item>
        </Menu>
      )
      const Addmenu = (
        <Menu>
          <Menu.Item key={4}>
          <p onClick={showDrawerProduct}><AppstoreAddOutlined /> Add product</p>
          </Menu.Item>
        </Menu>
      )
      const Deletemenu = (
        <Menu>
          <Menu.Item key={5}>
          <Popconfirm title="Sure to delete?" onConfirm={handleDelete}  >
          <p ><DeleteOutlined />  Remove Store</p>
            </Popconfirm>
          </Menu.Item> 
        </Menu>
      )

    return (
        <>
            {loading ? (
                <StoreInfoLoad/>
			):error ? <ErrorPage/>:(
                <div className="Store__info">
            <div className="Store__fulldetails">
                <Image src={getStore?.storeBackgroundImage} alt="my-garage"  />
                <h1>  {getStore?.storeName}</h1>
                {userInfo?._id ===getStore?.sellerName._id&&<div> <Dropdown overlay={Statmenu} placement="bottomCenter" arrow trigger={['click']} key={1}>
      <BarChartOutlined key="edit" style={{fontSize:25, margin:20}}/>
				</Dropdown> 
        <Dropdown overlay={editmenu} placement="bottomCenter" arrow trigger={['click']} key={2}><EditOutlined style={{fontSize:25,margin:20}}/></Dropdown>
         <Dropdown overlay={Addmenu} placement="bottomCenter" arrow trigger={['click']} key={3}>
      <AppstoreAddOutlined key="edit"style={{fontSize:25,margin:20}} />
				</Dropdown>
         <Dropdown overlay={Deletemenu} placement="bottomCenter" arrow trigger={['click']} key={4}>
      <DeleteOutlined key="edit" style={{fontSize:25,margin:20}}/>
				</Dropdown></div>	}
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
          width={window.innerWidth < 1000 ? 300:600}
          onClose={onClose}
		  visible={drawer}
		  placement={'right'}
        >
			<UpdateStore onClose={onClose}/> 
        </Drawer>
		<Drawer
          title="Update Store Picture"
          height={window.innerWidth < 1000 ? 250:200}
          onClose={onCloseImg}
          visible={imageDrawer}
		  placement={'top'}
        >
			<StoreImage  onClose={onCloseImg}/>
        </Drawer>
        {/* product */}
        <Drawer
          title="Create Product"
		  width={window.innerWidth < 1000 ? 300:600}
          onClose={onCloseProduct}
          visible={productDrawer}
		  placement={'right'}
        >
		<CreateProduct  onClose={onCloseProduct} openChildred={showDrawerProductImg}/>
        </Drawer>
        <Drawer
          title="Add Photo for the Product"
          height={window.innerWidth < 1000 ? 250:200}
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
		<Product onClose={onCloseProducInfo} openChildred={showDrawerProductImg} openUpdateprod={showUpdateProduct} deleteClose={deleteClose} />
        </Drawer>
        <Drawer
          title='Update Product'
		  width={window.innerWidth < 1000 ? 300:500}
          onClose={closeUpdateProduct}
          visible={updateProduct}
          placement={'right'}
        >
		<UpdateProduct onClose={closeUpdateProduct} openChildred={showDrawerProductImg}/>
        </Drawer>
                <StoreInfoProducts  PinSInfo={PinSInfo} userInfo={userInfo } getStore={getStore} setProductInfo={setProductInfo} setProductName={setProductName} addtocartact={addtocartact} dispatch={dispatch} loader={loader}/>
                </div>
                </div>
            )}
        </>
    )
}

export default StoreInfo
