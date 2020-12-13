import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import Cookie from "js-cookie";
import { updateProductInfo } from '../../actions/productAction';
import { Form, Input, Button,message} from 'antd';
import { useParams } from 'react-router-dom';


const UpdateProduct = ({onClose}) => {
  const {id}=useParams()
    const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [productStocks, setProductStocks] = useState("");
    const [description, setDescription] = useState("");
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const getStoreProds = useSelector((state) => state.getStoreProds);
    const { loading,error } = getStoreProds;
    const dispatch = useDispatch();
    const userToken=userInfo?.token
    const productNameFam=Cookie.getJSON("_pductFam");
    const handlePost=()=>{
        
        dispatch(updateProductInfo(productName,price,productStocks,description,id,productNameFam,userToken,onClose,message))
    }
    return (
        <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
     layout={'vertical'}
     onFinish={handlePost}
     hideRequiredMark
  
    >
   
    <h2>Update Product</h2>
	<Form.Item
        label="Product Name"
        name="productname"
        rules={[
          {
            required: true,
            message: 'Please input your Product Name!',
          },{ min: 5, max:50, message: 'Product Name must contain 5-50 characters.' }
        ]}
      >
        <Input  type="text" onChange={(e) => setProductName(e.target.value)} placeholder='Please enter new product name' allowClear={true}/>
      </Form.Item>
	  <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input your Price!',
          }
        ]}
      >
        <Input  type="number" onChange={(e) => setPrice(e.target.value)} placeholder='Please enter your price ' allowClear={true}/>
      </Form.Item>
	  <Form.Item
        label="Product Stocks"
        name="Stocks"
        rules={[
          {
            required: true,
            message: 'Please input your Product Stocks',
          },
        ]}
      >
        <Input  type="number" onChange={(e) => setProductStocks(e.target.value)} placeholder='Please enter your product stocks' allowClear={true}/>
      </Form.Item>
	  <Form.Item
        label="Description"
        name="Description"
        rules={[
          {
            required: true,
            message: 'Please input your Description!',
          },{ min: 5,max:50, message: 'Description must be contain 5-50 characters.' }
        ]}
      >
        <Input type="text" onChange={(e) => setDescription(e.target.value)} placeholder='Please enter description' allowClear={true}/>
      </Form.Item>
      
      {error && <p className="error">{error}</p>}
				{loading ? (
				 <div className="sign__loader">
         <Loader type="TailSpin" color="#13CC0E" height={50} width={50} />
       </div>
				) : (
      	<Button type="primary" htmlType="submit"   >
        Update Product
      </Button>
				)}
      
      <div style={{display:loading?'none':"block"}}>
      <p onClick={onClose}>
					Cancel
				</p>
      </div>
    </Form>
    )
}

export default UpdateProduct
