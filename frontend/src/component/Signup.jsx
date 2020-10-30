import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button} from 'antd';

const Signup = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState("");
	const [confirmpass, setConfirmpass] = useState("");

	const handlePost = (e) => {
		e.preventDefault();
		if (password !== confirmpass) {
			return setErrors("password does not match");
		}

		setLoading(true);
		axios
			.post("/signup", {
				name,
				password,
				email,
			})
			.then((data) => {
				setLoading(false);
				history.push("/signin");
			})

			.catch((err) => {
				console.log(err.response.data);
				setErrors(err.response.data.error);
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
        <Input.Password  type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Please enter your password' allowClear={true}/>
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
        <Input.Password  type="password" onChange={(e) => setConfirmpass(e.target.value)} placeholder='Please enter confirm password' allowClear={true}/>
      </Form.Item>
      {errors && <p className="error">{errors}</p>}
				{loading ? (
				 <div className="sign__loader">
         <Loader type="TailSpin" color="#13CC0E" height={50} width={50} />
       </div>
				) : (
      	<Button type="primary" htmlType="submit"  onClick={handlePost} >
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
