import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Form, Input, Button} from 'antd';
import QueueAnim from 'rc-queue-anim';

const Reset = () => {
	const [email, setEmail] = useState("");
	const [fillers, setFillers] = useState([]);
	const [loading, setLoading] = useState(false);
	const PostData = () => {
		setLoading(true);
		axios
			.post("https://mygarage23.herokuapp.com/reset-password", {
				email,
			})
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setFillers(data.data.message);
					setLoading(false);
				}
			})
			.catch((err) => {
				setFillers(err.response.data.error);
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
		onFinish={PostData}
		layout={'vertical'}
		key="a"
	  >
		  <h2>Enter You Email..</h2>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },{type:'email', message: "e-mail is not valid!"},
          {max:30, message:'Email should  contain up to 30 characters'}
        ]}
      >
        <Input  type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Please enter your email' allowClear={true}/>
      </Form.Item>
     
      {fillers && <p className="error">{fillers}</p>}
				{loading ? (
				 <div className="sign__loader">
         <Loader type="TailSpin" color="#13CC0E" height={50} width={50} />
       </div>
				) : (
      	<Button type="primary" htmlType="submit"  >
        Submit
      </Button>
				)}
     
	  <Link to="/signin" className="sign__link">Go Back to Sign-in</Link>
</Form>
</QueueAnim>
</div>
</div>
	);
};

export default Reset;
