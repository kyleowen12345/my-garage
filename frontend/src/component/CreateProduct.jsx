import React, {useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory,Link } from 'react-router-dom';
import { makeProduct } from '../actions/productAction';
import { getSingleStore } from '../actions/storeActions';
import Cookie from "js-cookie";
import Loader from "react-loader-spinner";
import { useAlert } from 'react-alert'
import { Form, Input, Button} from 'antd';

const CreateProduct = () => {
    const history= useHistory()
    const alert = useAlert()
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
    const storeNameFam=Cookie.getJSON("_stohremate");

 const storeName=  getStore?._id
 const storeOwner= userInfo?._id
 const token = userInfo?.token
 useEffect(()=>{
        dispatch(getSingleStore(storeNameFam))
},[dispatch,storeNameFam])

    const handleCreate=(e)=>{
      e.preventDefault()
      dispatch(makeProduct(productName,price,productStocks,description,storeName,storeOwner,token,history,alert))
    }
    

    return (
        <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      layout={"vertical"}
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
          },
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
          },
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
          },
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
      	<Button type="primary" htmlType="submit"  onClick={handleCreate} >
        Next
      </Button>
				)}
      
	  <Link to="/Store" className="sign__link">
					Back
				</Link>
    </Form>
    )
}

export default CreateProduct
