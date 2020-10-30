import React, {useState} from 'react'
import { useHistory, Link } from 'react-router-dom';
import { updateStore } from '../actions/storeActions';
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import Cookie from "js-cookie";
import { Form, Input, Button} from 'antd';
import { useAlert } from 'react-alert'

const UpdateStore = () => {
	const history= useHistory()
	const alert = useAlert()
    const [storeName, setStoreName] = useState("");
	const [storeAddress, setStoreAddress] = useState("");
	const [storeDescription, setStoreDescription] = useState("");
	const [storeType, setStoreType] = useState("");
	const [socialMediaAcc, setSocialMediaAcc] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const updateStoreAct = useSelector((state) => state.updateStoreAct);
	const {loading, error } = updateStoreAct;
    const dispatch = useDispatch();
    const storeNameFam=Cookie.getJSON("_stohremate")
    const userToken=userInfo?.token
    const handlePost=(e)=>{
        e.preventDefault()
		dispatch(updateStore(storeNameFam,storeName,storeAddress,storeDescription,storeType,contactNumber,socialMediaAcc,userToken,history,alert))
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
   
    <h2>Update Store</h2>
	<Form.Item
        label="Store Name"
        name="storename"
        rules={[
          {
            required: true,
            message: 'Please input your storename!',
          },
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
          },
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
          },
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
          },
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
          },
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
          },
        ]}
      >
        <Input  type="number" onChange={(e) => setContactNumber(e.target.value)} placeholder='Please enter your contact number'allowClear={true} />
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
      
	  <Link to="/Store" className="sign__link">
					Cancel
				</Link>
    </Form>
    )
}

export default UpdateStore
