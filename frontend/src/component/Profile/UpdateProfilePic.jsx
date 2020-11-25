import React, {useEffect,useState} from 'react'
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {updateProfilePicAct} from '../../actions/userActions'
import { message} from 'antd';

const UpdateProfilePic = ({onClose}) => {
	
	const dispatch=useDispatch()
    const [image, setImage] = useState("");
    const [photoload,setPhotoLoad]=useState(false)
    const [url, setUrl] = useState("");
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const token=userInfo?.token
    
    useEffect(() => {
		if (url) {
			dispatch(updateProfilePicAct(url,token,onClose,message) )
			
		}
	},[ url, dispatch, token, onClose]);

    const postPhoto = (e) => {
		e.preventDefault();
		if(!image){
			return message.error('Choose image first')
		}
		setPhotoLoad(true)
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "insta-clone");
		data.append("cloud_name", "kaking");
		const config = {
			headers: { "content-type": "multipart/form-data" },
		};
		Axios.post(
			"https://api.cloudinary.com/v1_1/kaking/image/upload",
			data,
			config
		)
			.then((data) => {
				setUrl(data?.data.secure_url);
				setPhotoLoad(false)
			})
			.catch((err) => {
				message.error(err.response?.data.error.message);
				setPhotoLoad(false)
			});
	};
    return (
        <div className="sign__form">
            <form >
						<input type="file" onChange={(e) => setImage(e.target.files[0])} />
						{photoload ? <p>Uploading...</p>
						:<input type="submit" onClick={postPhoto} />}
						
					</form>
        </div>
    )
}

export default UpdateProfilePic
