import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { updateStore } from '../actions/storeActions';
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import Cookie from "js-cookie";

const UpdateStore = () => {
    const history= useHistory()
    const [storeName, setStoreName] = useState("");
	const [storeAddress, setStoreAddress] = useState("");
	const [storeDescription, setStoreDescription] = useState("");
	const [storeType, setStoreType] = useState("");
	const [socialMediaAcc, setSocialMediaAcc] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const updateStoreAct = useSelector((state) => state.updateStoreAct);
	const {loading, error } = updateStoreAct;
    const dispatch = useDispatch();
    const storeNameFam=Cookie.getJSON("_stohremate")
    const userToken=userInfo?.token
    const handlePost=(e)=>{
        e.preventDefault()
        dispatch(updateStore(storeNameFam,storeName,storeAddress,storeDescription,storeType,contactNumber,socialMediaAcc,userToken,history))
    }
    return (
        <div className="sign__form">
             <form className="sign__form">
                 <h2>Update Store</h2>
				<label>store Name</label>
				<input type="text" onChange={(e) => setStoreName(e.target.value)} />
				<label>store Complete Address</label>
				<input type="text" onChange={(e) => setStoreAddress(e.target.value)} />
				<label>store Description</label>
				<input type="text" onChange={(e) => setStoreDescription(e.target.value)} />
				<label>store Type</label>
				<input type="text" onChange={(e) => setStoreType(e.target.value)} />
                <label>socialMediaAcc</label>
				<input type="text" onChange={(e) => setSocialMediaAcc(e.target.value)} />
				<label>Contact Number</label>
				<input
					type="number"
					onChange={(e) => setContactNumber(e.target.value)}
				/>
				{error ? <p>{error}</p> : <></>}
				{loading ? <div className="sign__loader">
										<Loader
											type="TailSpin"
											color="#ff4d4d"
											height={50}
											width={50}
										/>
									</div>:<button  onClick={handlePost} type="submit">
					Next
				</button>}
				
			</form>
        </div>
    )
}

export default UpdateStore
