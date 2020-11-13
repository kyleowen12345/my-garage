import React, {useState} from 'react'
import { updateStore } from '../actions/storeActions';
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { Form, Input, Button,message} from 'antd';


const UpdateStore = ({onClose}) => {
    const [storeName, setStoreName] = useState("");
	const [storeAddress, setStoreAddress] = useState("");
	const [storeDescription, setStoreDescription] = useState("");
	const [storeType, setStoreType] = useState("");
	const [socialMediaAcc, setSocialMediaAcc] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const storeNameFam=Cookie.getJSON("_stohremate")
    const userToken=userInfo?.token
    const handlePost=()=>{
		dispatch(updateStore(storeNameFam,storeName,storeAddress,storeDescription,storeType,contactNumber,socialMediaAcc,userToken,message,onClose))
    }
    return (
        <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      layout={"vertical"}
      onFinish={handlePost}
      hideRequiredMark
     
    >
   
    <h2>Update Store</h2>
	<Form.Item
        label="Store Name"
        name="storename"
        rules={[
          {
            required: true,
            message: 'Please input your storename!',
          },{ min: 5, max:50, message: 'Store Name must contain 5-50 characters.' }
          
        ]}
      >
        <Input  type="text" onChange={(e) => setStoreName(e.target.value)} placeholder='Please enter new store name'allowClear={true}/>
      </Form.Item>
	  <Form.Item
        label="Store Address"
        name="storeaddress"
        rules={[
          {
            required: true,
            message: 'Please input your Store Address!',
          },{ min: 5,max:50, message: 'Store Address must contain 5-50 characters.' },
        ]}
      >
        <Input  type="text" onChange={(e) => setStoreAddress(e.target.value)} placeholder='Please enter your store adddress' allowClear={true}/>
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
        <Input  type="text" onChange={(e) => setStoreDescription(e.target.value)} placeholder='Please enter your description' allowClear={true}/>
      </Form.Item>
	  <Form.Item
        label="Store Type"
        name="StoreType"
        rules={[
          {
            required: true,
            message: 'Please input your StoreType!',
          },{ min: 5, message: 'Store Type must be minimum 5 characters.' },
        ]}
      >
        <Input type="text" onChange={(e) => setStoreType(e.target.value)} placeholder='Please enter your store type' allowClear={true}/>
      </Form.Item>
      <Form.Item
        label="Social Media Account"
        name="Social Media Account"
        rules={[
          {
            required: true,
            message: 'Please input your Social Media Account!',
          },{ min: 5,max:50, message: 'Social Media Account must contain 5-50 characters.' },
        ]}
      >
        <Input  type="text" onChange={(e) => setSocialMediaAcc(e.target.value)} placeholder='Please enter your social media account' allowClear={true}/>
      </Form.Item>
	  <Form.Item
        label="Contact Number"
        name="Contact Number"
        rules={[
          {
            required: true,
            message: 'Please input your Contact Number!',
          },{pattern:new RegExp(/^[0-9]*$/),message:'Must Contain numbers'}
        ]}
      >
        <Input  type="number" onChange={(e) => setContactNumber(e.target.value)} placeholder='Please enter your contact number'allowClear={true} />
      </Form.Item>
      
      <Button type="primary" htmlType="submit" >
        Update Store
      </Button>
     
      
    </Form>
    )
}

export default UpdateStore
