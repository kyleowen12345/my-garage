import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";
import { Form, Input, Button,message} from 'antd';
import 'react-toastify/dist/ReactToastify.css';
const Signin = () => {
	const history = useHistory();
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const userSignin = useSelector((state) => state.userSignin);
	const { loading, userInfo } = userSignin;
	const dispatch = useDispatch();
	useEffect(() => {
		if (userInfo) {
			history.push("/");
		}
	}, [history, userInfo]);

	const handlePost = (e) => {
		e.preventDefault();
    dispatch(signin(email, password, history,message));
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
   
    <h2>Sign In</h2>
      <Form.Item
        label="Email"
        name="email"
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
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Please enter your password' />
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
	  <Link to="/reset-password" className="sign__link">
					forgot password?
				</Link>
				<Link to="/signup" className="sign__link">
					Don't have an account?
				</Link>
    </Form>
		
	);
};

export default Signin;
