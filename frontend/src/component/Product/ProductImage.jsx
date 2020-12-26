import React, {useEffect,useState} from 'react'
import Axios from "axios";
import Cookie from "js-cookie";
import { useSelector,useDispatch } from "react-redux";
import {makeProductImage} from '../../actions/productAction'
import imageCompressor from 'browser-image-compression'
import { message} from 'antd';



const ProductImage = ({onClose}) => {
    const [image, setImage] = useState("");
    const [filler, setFiller] = useState('');
    const [photoload,setPhotoLoad]=useState(false)
    const [url, setUrl] = useState("");
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
    const productNamefam=Cookie.getJSON('_pductFam')
	const dispatch = useDispatch();
	const token=userInfo?.token
    useEffect(() => {
		if (url) {
			// eslint-disable-next-line
			String.prototype.insert = function(index, string) { 
				if (index > 0) {
				  return this.substring(0, index) + string + this.substr(index);
				}
			  
				return string + this;
			  };
			const fetched=url.insert(47,'f_auto/')
			dispatch(makeProductImage(productNamefam,fetched,token,onClose,message))
		}
	},[dispatch,productNamefam,url,token,onClose]);

    const postPhoto = (e) => {
		e.preventDefault();
		if(!image){
			return setFiller('Choose image first')
		}
		setPhotoLoad(true)
		const url="https://api.cloudinary.com/v1_1/kaking/image/upload"
		const options = {
			maxSizeMB: 0.1,
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
				url,
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
        <h2>Add a photo for your Product</h2>
    <form >
    <p>{filler}</p>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                {photoload ? <p>Uploading...</p>:<input type="submit" onClick={postPhoto} />}
                
            </form>
</div>
    )
}

export default ProductImage
