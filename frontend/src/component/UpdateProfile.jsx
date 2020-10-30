import React, {  useState }  from 'react'
import { updateProfile } from "../actions/userActions";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button,message} from 'antd';

const UpdateProfile = ({onClose}) => {
    const [name, setName] = useState("");
	const [country, setCountry] = useState("");
	const [SocialMediaAcc, setSocialMediaAcc] = useState("");
	const [city, setCity] = useState("");
	const [contactNumber, setContactNumber] = useState('');
	const [zipcode, setZipcode] = useState('');
  const userProfile = useSelector((state) => state.userProfile);
	const {  loading } = userProfile;
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const handleUpdate = (e) => {
		e.preventDefault();
		const userId = userInfo?._id;
		if(!name|| !contactNumber|| !country|| !zipcode|| !SocialMediaAcc){
			return message.error('Complete the fields')
		}
		dispatch(
			updateProfile(
				userId,
				name,
				contactNumber,
				country,
				SocialMediaAcc,
				city,
				zipcode,
                userInfo?.token,
                message,
                onClose
			)
		);
		
  };
  
    return (
        <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      layout={"vertical"}
      hideRequiredMark
     
    >
	<Form.Item
        label="Username"
        name="Username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
        required
      >
        <Input  type="text" onChange={(e) => setName(e.target.value)} placeholder='Please enter new username' maxLength={30} allowClear={true} />
      </Form.Item>
	  <Form.Item
        label="Country"
        name="Country"
        rules={[
          {
            required: true,
            message: 'Please input your Country!',
          },
        ]}
      >
        <Input  type="text" onChange={(e) => setCountry(e.target.value)} placeholder='Please enter your country' maxLength={30} allowClear={true}/>
      </Form.Item>
	  <Form.Item
        label="City"
        name="City"
        rules={[
          {
            required: true,
            message: 'Please input your City!',
          },
        ]}
      >
        <Input  type="text" onChange={(e) => setCity(e.target.value)} placeholder='Please enter your city' maxLength={30} allowClear={true}/>
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
        <Input  type="text" onChange={(e) => setSocialMediaAcc(e.target.value)} placeholder='Please enter your social media account' maxLength={30} allowClear={true}/>
      </Form.Item>
      <Form.Item
        label="ContactNumber"
        name="ContactNumber"
        rules={[
          {
            required: true,
            message: 'Please input your ContactNumber!',
          },
        ]}
      >
        <Input  type="text" onChange={(e) => setContactNumber(e.target.value)} placeholder='Please enter your contact number'maxLength={30} allowClear={true}/>
      </Form.Item>
	  <Form.Item
        label="Zipcode"
        name="Zipcode"
        rules={[
          {
            required: true,
            message: 'Please input your Zipcode!',
          },
        ]}
      >
        <Input  type="text" onChange={(e) => setZipcode(e.target.value)} placeholder='Please enter your zipcode' maxLength={30} allowClear={true}/>
      </Form.Item>
				{loading ? (
				 <div className="sign__loader">
         <Loader type="TailSpin" color="#13CC0E" height={50} width={50} />
       </div>
				) : (
      	<Button type="primary" htmlType="submit"  onClick={handleUpdate} >
        Update Profile
      </Button>
				)}
      
    </Form>
    )
}

export default UpdateProfile
