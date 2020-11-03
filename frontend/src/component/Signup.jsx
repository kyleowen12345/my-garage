import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button,message} from 'antd';

const Signup = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [confirmpass, setConfirmpass] = useState("");

	const handlePost = (e) => {
		e.preventDefault();
		if (password !== confirmpass) {
			return message.error("password does not match");
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
			<Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      layout={"vertical"}
      hideRequiredMark
    >
   
    <h2>Sign Up</h2>
	<Form.Item
        name="Username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
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
          },
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
          },
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
            message: 'Please input your Confirm Password!',
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
      	<Button type="primary" htmlType="submit"  onClick={handlePost} style={{marginLeft:160}}>
        Login
      </Button>
				)}
	  <Link to="/signin" className="sign__link">
					Already Have an Account?
				</Link>
    </Form>
		
	);
};

export default Signup;
