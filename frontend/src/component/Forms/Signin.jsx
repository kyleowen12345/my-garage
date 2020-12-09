import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../actions/userActions";
import { Form, Input, Button,message} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
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

	const handlePost = () => {
    dispatch(signin(email, password, history,message));
  };
  
	return (
    <div className="signContent">
    <img src="https://res.cloudinary.com/kaking/image/upload/v1606036379/uj7islr70jtlfazl4hka.jpg" alt="weqweas"/>
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
    
    <h2 key="a">Sign In</h2>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },{type:'email', message: "e-mail is not valid!"}
        ]}
      >
        <Input  type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Please enter your email' allowClear={true} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          }
        ]}
      >
        <Input.Password type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Please enter your password' allowClear={true} />
      </Form.Item>
      
        
				{loading ? (
				 <div className="sign__loader">
         <Loader type="TailSpin" color="#13CC0E" height={50} width={50} />
       </div>
				) : (
      	<Button type="primary" htmlType="submit" >
        Login
      </Button>
				)}
	  <Link to="/reset-password" className="sign__link" >
					forgot password?
				</Link>
				<Link to="/signup" className="sign__link" >
					Don't have an account?
				</Link>
      
    </Form>
    </QueueAnim>
		</div>	
		</div>
	);
};

export default Signin;
