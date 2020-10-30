import React, {useEffect,useState} from 'react'
import Loader from "react-loader-spinner";
import Axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useAlert } from 'react-alert'


const ProductImage = () => {
	const history=useHistory()
	const alert = useAlert()
    const [image, setImage] = useState("");
    const [filler, setFiller] = useState('');
    const [photoload,setPhotoLoad]=useState(false)
    const [url, setUrl] = useState("");
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
    const productNamefam=Cookie.getJSON('_pductFam')
    
    useEffect(() => {
		if (url) {
			Axios.post(
				"/productimage",
				{
					_id: productNamefam,
					image: url,
				},
				{
					headers: {
						Authorization: `Bearer${userInfo?.token}`,
					},
				}
			)
				.then((data) => {
                    console.log(data);
                    history.push(`/productInfo/${data?.data.content.productName.replace(/\s/g,'_')}`)
				})
				.catch((err) => {
					setFiller(err.response?.data.error);
				});
		}
	});

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
				setPhotoLoad(false)
				alert.success('Image Uploaded')
			})
			.catch((err) => {
				setFiller(err.response?.data.error.message);
				setPhotoLoad(false)
			});
	};
    return (
        <div className="sign__form">
        <h2>Add a photo for your Product</h2>
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

export default ProductImage
