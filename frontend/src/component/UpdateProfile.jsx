import React, {  useState }  from 'react'
import { updateProfile } from "../actions/userActions";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

const UpdateProfile = () => {
    const history=useHistory()
    const [name, setName] = useState("");
	const [country, setCountry] = useState("");
	const [SocialMediaAcc, setSocialMediaAcc] = useState("");
	const [city, setCity] = useState("");
	const [contactNumber, setContactNumber] = useState('');
    const [zipcode, setZipcode] = useState('');
    const updateProfileBio = useSelector((state) => state.updateProfileBio);
    const {  loading } = updateProfileBio;
    const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
    const [filler, setFiller] = useState('');
    const dispatch = useDispatch();
    const handleUpdate = (e) => {
		e.preventDefault();
		const userId = userInfo?._id;
		if (
			!name ||
			!contactNumber||
			!zipcode||
			!country ||
			!city ||
			!SocialMediaAcc
		) {
			return setFiller("complete the fields");
		}
		dispatch(
			updateProfile(
				userId,
				name,
				contactNumber,
				country,
				SocialMediaAcc,
				city,
				zipcode,
                userInfo?.token,
                history
			)
		);
		
	};
    return (
        <div>
            <form className="sign__form">
				<label>Name</label>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				<label>Country</label>
				<input type="text" onChange={(e) => setCountry(e.target.value)} />
				<label>City</label>
				<input type="text" onChange={(e) => setCity(e.target.value)} />
				<label>SocialMediaAcc</label>
				<input type="text" onChange={(e) => setSocialMediaAcc(e.target.value)} />
				<label>ContactNumber</label>
				<input
					type="number"
					onChange={(e) => setContactNumber(e.target.value)}
				/>
				<label>Zipcode</label>
				<input type="number" onChange={(e) => setZipcode(e.target.value)} />
				{filler ? <p>{filler}</p> : <></>}
				{loading ? <div className="sign__loader">
										<Loader
											type="TailSpin"
											color="#ff4d4d"
											height={50}
											width={50}
										/>
									</div>:<button onClick={handleUpdate} type="submit">
					Update profile
				</button>}
				
			</form>
        </div>
    )
}

export default UpdateProfile
