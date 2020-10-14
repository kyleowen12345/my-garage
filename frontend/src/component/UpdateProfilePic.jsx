import React, {useEffect,useState} from 'react'
import Axios from "axios";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import { useHistory } from 'react-router-dom';


const UpdateProfilePic = () => {
    const history=useHistory()
    const [image, setImage] = useState("");
    const [filler, setFiller] = useState('');
    const [photoload,setPhotoLoad]=useState(false)
    const [url, setUrl] = useState("");
    const userProfile = useSelector((state) => state.userProfile);
    const { userProfileInfo } = userProfile;
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
    
    useEffect(() => {
		const userEmail = userProfileInfo?.data.email;
		if (url) {
			setPhotoLoad(true)
			Axios.post(
				"http://localhost:1234/updatephoto",
				{
					email: userEmail,
					profilePic: url,
				},
				{
					headers: {
						Authorization: `Bearer${userInfo?.token}`,
					},
				}
			)
				.then((data) => {
					console.log(data);
					setPhotoLoad(false)
                    history.push('/profile')
				})
				.catch((err) => {
					setFiller(err.response?.data.error);
				});
		}
	},[userProfileInfo.data.email, url, userInfo.token, history]);

    const postPhoto = (e) => {
		e.preventDefault();
		if(!image){
			return setFiller('Choose image first')
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
				
			})
			.catch((err) => {
				setFiller(err.response?.data.error.message);
				setPhotoLoad(false)
			});
	};
    return (
        <div className="sign__form">
            <form >
			<p>{filler}</p>
						<input type="file" onChange={(e) => setImage(e.target.files[0])} />
						{photoload ? <div className="sign__loader">
					<Loader type="TailSpin" color="#ff4d4d" height={50} width={50} />
			</div>:<input type="submit" onClick={postPhoto} />}
						
					</form>
        </div>
    )
}

export default UpdateProfilePic
