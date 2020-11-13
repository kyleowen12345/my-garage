import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { makeProduct } from '../actions/productAction';
import Loader from "react-loader-spinner";
import { Form, Input, Button,message} from 'antd';

const CreateProduct = ({openChildred,onClose}) => {
    const [productName,setProductName]=useState('')
    const [price,setPrice]=useState('')
    const [productStocks,setProductStocks]=useState('')
    const [description,setDescription]=useState('')
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const singleStore = useSelector((state) => state.singleStore);
    const { getStore } = singleStore;
    const createProduct = useSelector((state) => state.createProduct);
    const {  loading,error } = createProduct;
 const storeName=  getStore?._id
 const storeOwner= userInfo?._id
 const token = userInfo?.token
 

    const handleCreate=()=>{
      dispatch(makeProduct(productName,price,productStocks,description,storeName,storeOwner,token,openChildred,message))
    }
    

    return (
        <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      layout={"vertical"}
      onFinish={handleCreate}
      hideRequiredMark
    >
   
    <h2>Create Product</h2>
	<Form.Item
        label="Product Name"
        name="productname"
        rules={[
          {
            required: true,
            message: 'Please input your Product Name!',
          },{ min: 5, message: 'Product Name must be minimum 5 characters.' },
        ]}
      >
        <Input  type="text" onChange={(e) => setProductName(e.target.value)} placeholder='Please enter your product name' allowClear={true}/>
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
          }
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
          },{ min: 5, message: 'Description must be minimum 5 characters.' },
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
      	<Button type="primary" htmlType="submit" >
        Next
      </Button>
				)}
      
	  <p onClick={onClose} style={{display:loading ? 'none':'block'}}>
					Back
				</p>
    </Form>
    )
}

export default CreateProduct
