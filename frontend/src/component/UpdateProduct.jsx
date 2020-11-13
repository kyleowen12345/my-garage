import React, {useState} from 'react'
import { useHistory,Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import Cookie from "js-cookie";
import { updateProductInfo } from '../actions/productAction';
import { Form, Input, Button} from 'antd';
import { useAlert } from 'react-alert'


const UpdateProduct = ({onClose}) => {
    const history= useHistory()
    const alert = useAlert()
    const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [productStocks, setProductStocks] = useState("");
    const [description, setDescription] = useState("");
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const updateProduct = useSelector((state) => state.updateProduct);
    const { loading ,error } = updateProduct;
    const dispatch = useDispatch();
    const userToken=userInfo?.token
    const productNameFam=Cookie.getJSON("_pductFam");
    const storeNameFam=Cookie.getJSON("_stohremate")
    const handlePost=(e)=>{
        e.preventDefault()
        dispatch(updateProductInfo(productName,price,productStocks,description,storeNameFam,productNameFam,userToken,history,alert))
    }
    return (
        <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
     layout={'vertical'}
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
          },
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
      	<Button type="primary" htmlType="submit"  onClick={handlePost} >
        Create Store
      </Button>
				)}
      
	  <p onClick={onClose}>
					Cancel
				</p>
    </Form>
    )
}

export default UpdateProduct
