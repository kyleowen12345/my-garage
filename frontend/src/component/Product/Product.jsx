import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getProdct } from '../../actions/productAction';
import Cookie from "js-cookie";
import Axios from 'axios';
import { addtocartact } from '../../actions/cartActions';
import { Popconfirm, message,Dropdown,Menu} from 'antd';
import ProductLoad from './ProductLoad';
import { PictureOutlined,AuditOutlined,DeleteOutlined,EditOutlined,ShoppingCartOutlined } from '@ant-design/icons';

const Product = ({openChildred,openUpdateprod,deleteClose}) => {
    const getProduct = useSelector((state) => state.getProduct);
    const { productInfo, loading, error } = getProduct;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const productNameFam=Cookie.getJSON("_pductFam");
  
    useEffect(()=>{
        dispatch(getProdct(productNameFam))
    },[productNameFam,dispatch])
    
    const handleDelete=()=>{
        Axios.post('https://mygarage23.herokuapp.com/removeProduct',{
            productNameFam:productNameFam
        },{
            headers: {
                Authorization: `Bearer${userInfo?.token}`,
            },
        }).then(result=>{
            deleteClose()
            message.success('Product deleted')
        }).catch(error=>{
            console.log(error)
            message.error('something went wrong')
        })
    }
    const editmenu=(
        <Menu>
          <Menu.Item key={1}>
          <p onClick={openChildred}><PictureOutlined />  Update Product Image</p>
          </Menu.Item>
          <Menu.Item key={3}>
          <p onClick={openUpdateprod}><AuditOutlined />  Update Product</p>
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
    const handleAdd=()=>{
        const token=userInfo?.token
        const productId=productNameFam
        dispatch(addtocartact(productId,token,message,productInfo?.productName))
    }
    return(
<div className="ProductInfo">
    {loading ?<ProductLoad/>
				: error ? (
				<div>{error}</div>
			):(
                <>
    <img src={productInfo?.image} alt="my-garage" style={{width:250,height:250}}/>
    <div className="ProductSettings">
    {userInfo?._id ===productInfo?.storeOwner._id&& <Dropdown overlay={editmenu} placement="bottomCenter" arrow trigger={['click']} key={2}><EditOutlined style={{fontSize:25,margin:20}}/></Dropdown>}
    {userInfo?._id ===productInfo?.storeOwner._id &&<Dropdown overlay={Deletemenu} placement="bottomCenter" arrow trigger={['click']} key={4}>
      <DeleteOutlined key="edit" style={{fontSize:25,margin:20}}/>
				</Dropdown>} 
    </div>
    <p> <span style={{fontWeight:'bold', fontSize:15}}>Product Name :</span> {productInfo?.productName}</p>
    <p><span style={{fontWeight:'bold', fontSize:15}}>Price :</span> ${productInfo?.price}</p>
    <p>  <span style={{fontWeight:'bold', fontSize:15}}>Product Stocks :</span> {productInfo?.productStocks}</p>
    <p><span style={{fontWeight:'bold', fontSize:15}}>Description :</span> {productInfo?.description}</p>
    <p> <span style={{fontWeight:'bold', fontSize:15}}>Store Name :</span> {productInfo?.storeName.storeName}</p>
    <p><span style={{fontWeight:'bold', fontSize:15}}>Store Owner :</span> {productInfo?.storeOwner.name}</p>
   {userInfo?._id !==productInfo?.storeOwner._id&&<button onClick={handleAdd}><ShoppingCartOutlined /> Add to cart</button>}
                </>
            )}
         
        
</div>
    ) 
}

export default Product
