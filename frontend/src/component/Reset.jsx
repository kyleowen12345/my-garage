import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Form, Input, Button} from 'antd';

const Reset = () => {
	const [email, setEmail] = useState("");
	const [fillers, setFillers] = useState([]);
	const [loading, setLoading] = useState(false);
	const PostData = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post("/reset-password", {
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
			
		<Form
		name="basic"
		initialValues={{
		  remember: true,
		}}
		hideRequiredMark
		layout={'vertical'}
	  >
		  <h2>Enter You Email..</h2>
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
     
      {fillers && <p className="error">{fillers}</p>}
				{loading ? (
				 <div className="sign__loader">
         <Loader type="TailSpin" color="#13CC0E" height={50} width={50} />
       </div>
				) : (
      	<Button type="primary" htmlType="submit"  onClick={PostData} >
        Submit
      </Button>
				)}
     
	  <Link to="/signin" className="sign__link">Go Back to Sign-in</Link>
</Form>
	
	);
};

export default Reset;
