import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Input, Button} from 'antd';
import QueueAnim from 'rc-queue-anim';

const Newpassword = () => {
	const [password, setPasword] = useState("");
	const [confirmpass, setConfirmpass] = useState("");
	const [warn, setWarn] = useState("");
	const [loading, setLoading] = useState(false);
	const { token } = useParams();

	const PostData = () => {
		if (password !== confirmpass) {
			return setWarn("password does not match");
		}
		if (!password || !confirmpass) {
			return setWarn("Complete the fields");
		}
		setLoading(true);
		axios
			.post(`${process.env.REACT_APP_API_KEY}/new-password`, {
				password,
				token,
			})
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setLoading(false);
					setWarn(`password update success, go to signin`);
				}
			})
			.catch((err) => {
				console.log(err.response.data.error);
				setWarn(err.response.data.error);
				setLoading(false);
			});
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
	  hideRequiredMark
	  layout={'vertical'}
	  onFinish={PostData}
    >
   <h2>Enter Your New Password</h2>
   <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },{pattern:new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),message:"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"},
          {max:30, message:'Password should  contain up to 30 characters'}
        ]}
      >
        <Input.Password  type="password" onChange={(e) => setPasword(e.target.value)} placeholder='Please enter a password'/>
      </Form.Item>

      <Form.Item
        label="Confirmpassword"
        name="Confirmpassword"
        rules={[
          {
            required: true,
            message: 'Please input your Confirm password!',
          },
        ]}
      >
        <Input.Password  type="password" onChange={(e) => setConfirmpass(e.target.value)} placeholder='Please enter a password' allowClear={true}/>
      </Form.Item>
      
      {warn && <p className="error">{warn}</p>}
				{loading ? (
				 <div className="sign__loader">
         <Loader type="TailSpin" color="#13CC0E" height={50} width={50} />
       </div>
				) : (
      	<Button type="primary" htmlType="submit"   >
        Reset Password
      </Button>
				)}
      
				<Link to="/signin"  className="sign__link">Go Back to Sign-in</Link>
    </Form>
	</QueueAnim>
	</div>
</div>
	);
};

export default Newpassword;
