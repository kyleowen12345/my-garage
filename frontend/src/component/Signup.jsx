import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button,message} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';

const Signup = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [confirmpass, setConfirmpass] = useState("");

	const handlePost = () => {
		if (password !== confirmpass) {
			return message.error("Please match the passwords");
		}

    setLoading(true);
    message.info('creating account',2)
		axios
			.post("/signup", {
				name,
				password,
				email,
			})
			.then((data) => {
        setLoading(false);
        message.success('account created',2)
        message.info('sign in with your new account',5)
				history.push("/signin");
			})

			.catch((err) => {
				console.log(err.response.data);
        message.error(err.response.data.error)
				setLoading(false);
			});
	};
	return (
    <div className="signContent">
      <img src="https://res.cloudinary.com/kaking/image/upload/v1606038744/nop2b4gthru9gxf07vp4.jpg" alt="weqweas"/>
    <div className="signup">
    <QueueAnim ease={[[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1]]}>
			<Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      layout={"vertical"}
       onFinish={handlePost}
      hideRequiredMark
      key="a"
    >
   <HomeOutlined onClick={()=>history.push('/')}style={{fontSize:30}}/>
    <h2>Sign Up</h2>
	<Form.Item
        name="Username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },{ pattern:new RegExp(/^[a-zA-Z0-9,. ]*$/),message:'Dont use special characters'},
          {max:30, message:'Username should  contain up to 30  characters'}
        ]}
      >
        <Input  type="text" onChange={(e) => setName(e.target.value)} placeholder='Please enter your name' allowClear={true}/>
      </Form.Item>
      
      <Form.Item
       name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },{type:'email', message: "e-mail is not valid!"},
          {min:5, max:30, message:'Email should  contain 5-30  characters'}
        ]}
      >
        <Input  type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Please enter your email' allowClear={true}/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },{pattern:new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),message:"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"},
          {min:5,max:30, message:'Password should  contain 5-30 characters'}
        ]}
     
      >
        <Input.Password  type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Please enter your password' />
      </Form.Item>
	  <Form.Item
        name="Confirm Password"
        label="Confirm Password"
        rules={[
          {
            required: true,
            message: 'Please Confirm your Password!',
          },
        ]}
       
      >
        <Input.Password  type="password" onChange={(e) => setConfirmpass(e.target.value)} placeholder='Please enter confirm password' />
      </Form.Item>
				{loading ? (
				 <div className="sign__loader">
         <Loader type="TailSpin" color="#13CC0E" height={50} width={50} />
       </div>
				) : (
      	<Button type="primary" htmlType="submit"  >
        Sign-Up
      </Button>
				)}
	  <Link to="/signin" className="sign__link">
					Already Have an Account?
				</Link>
    </Form>
		</QueueAnim>
    </div>
    </div>
	);
};

export default Signup;
