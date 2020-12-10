import React, {useEffect,useState} from 'react'
import Axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { message} from 'antd';
import { newStoreImage } from '../../actions/storeActions';
import imageCompressor from 'browser-image-compression'
import { useParams } from 'react-router-dom';

const StoreImage = ({onClose}) => {
	const {id}=useParams()
    const [image, setImage] = useState("");
	const [filler, setFiller] = useState('');
    const [photoload,setPhotoLoad]=useState(false)
    const [url, setUrl] = useState("");
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const dispatch=useDispatch()
   const token=userInfo?.token
   useEffect(() => {
	if(url){
  dispatch(newStoreImage(url,id,token,onClose,message))
	} 
},[dispatch,id,token,url,onClose]);
    const postPhoto = (e) => {
		e.preventDefault();
		if(!image){
			return setFiller('Choose image first')
		}
		setPhotoLoad(true)
		const options = {
			maxSizeMB: 0.5,
			maxWidthOrHeight: 1920,
			useWebWorker: true
		  }
		  imageCompressor(image,options).then(compressFile=>{
			  message.info('this will only take a few seconds please wait')
			const data = new FormData();
			data.append("file", compressFile);
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
					setPhotoLoad(false)
				});
		  }).catch(err=>{
			  console.log(err.messsage)
			  setPhotoLoad(false)
		  })
		
	};
	
    return (
        <div className="sign__form">
			<h2>Add a photo for your Store</h2>
        <form >
        <p>{filler}</p>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    {photoload ?<p>Uploading...</p>:<input type="submit" onClick={postPhoto} />}
                    
                </form>
    </div>
    )
}

export default StoreImage
