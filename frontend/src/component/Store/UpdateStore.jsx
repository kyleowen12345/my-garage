import React, {useState} from 'react'
import { updateStore } from '../../actions/storeActions';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button,message,Select} from 'antd';
import { useParams } from 'react-router-dom';


const UpdateStore = ({onClose}) => {
  const {id}=useParams()
    const [storeName, setStoreName] = useState("");
	const [storeAddress, setStoreAddress] = useState("");
	const [storeDescription, setStoreDescription] = useState("");
	const [storeType, setStoreType] = useState("");
	const [socialMediaAcc, setSocialMediaAcc] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch()
    const userToken=userInfo?.token
    const { Option } = Select;
    const handlePost=()=>{
		dispatch(updateStore(id,storeName,storeAddress,storeDescription,storeType,contactNumber,socialMediaAcc,userToken,message,onClose))
    }
    const onChange=(value)=> {
      setStoreType(value)
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
        <Select
            placeholder="Select a option and change input text above"
            allowClear
            showSearch
            onChange={onChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Automotive">Automotive</Option>
            <Option value="Baby & Toddler">Baby & Toddler</Option>
            <Option value="Clothing & Shoes">Clothing & Shoes</Option>
            <Option value="Computers">Computers</Option>
            <Option value="Electronics">Electronics</Option>
            <Option value="Entertainment & Arts">Entertainment & Arts</Option>
            <Option value="Food & Gifts">Food & Gifts</Option>
            <Option value="Home & Garden">Home & Garden</Option>
            <Option value="Office & Professional Services">Office & Professional Services</Option>
            <Option value="Personal & Home Services">Personal & Home Services</Option>
            <Option value="Restaurants & Dining">Restaurants & Dining</Option>
            <Option value="Software">Software</Option>
            <Option value="Health & Beauty">Health & Beauty</Option>
            <Option value="Sports & Outdoors">Sports & Outdoors</Option>
            <Option value="Travel">Travel</Option>
          </Select>
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
