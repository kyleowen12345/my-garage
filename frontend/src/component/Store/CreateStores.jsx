import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { makeStore } from '../../actions/storeActions';
import Loader from "react-loader-spinner";
import { Form, Input, Button,Select,message} from 'antd';
import { useHistory } from 'react-router-dom';


const CreateStores = ({onClose,openChildred}) => {
  const history=useHistory()
    const [storeName, setStoreName] = useState("");
	const [storeAddress, setStoreAddress] = useState("");
	const [storeDescription, setStoreDescription] = useState("");
	const [storeType, setStoreType] = useState("");
	const [socialMediaAcc, setSocialMediaAcc] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const createStore = useSelector((state) => state.createStore);
    const {  loading,error } = createStore;
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const userId=userInfo?._id
    const userToken=userInfo?.token
    const { Option } = Select;

    const handlePost=()=>{
		dispatch(makeStore(storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber,userId,openChildred,userToken,message,history))
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
   
    <h2>Create Store</h2>
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
        <Input  type="text" onChange={(e) => setStoreName(e.target.value)} placeholder='Please enter your store name' allowClear={true}/>
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
        <Input  type="number" onChange={(e) => setContactNumber(e.target.value)} placeholder='Please enter your contact number' allowClear={true}/>
      </Form.Item>
      
      {error && <p className="error">{error}</p>}
				{loading ? (
				 <div className="sign__loader">
         <Loader type="TailSpin" color="#13CC0E" height={50} width={50} />
       </div>
				) : (
      	<Button type="primary" htmlType="submit"  >
        Create Store
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

export default CreateStores
