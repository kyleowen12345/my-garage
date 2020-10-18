import React from 'react'
import { useSelector } from "react-redux";
import Axios from "axios";
import {  useHistory } from "react-router-dom";
import { useState } from 'react';


const Seller = () => {
    const history = useHistory()
    const userProfile = useSelector((state) => state.userProfile);
    const { userProfileInfo } = userProfile;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [checked,setChecked]=useState(false)
    const userId = userInfo?._id;
   
    const handleSeller=(e)=>{
       e.preventDefault()
     Axios.post("/createSeller",{
         _id:userId
     },{
         headers:{
            Authorization: `Bearer${userInfo?.token}`,
         }
     }).then(data=>{
         console.log(data)
         history.push('/Store')
     }).catch(err=>{
         console.log(err.response?.data.error)
     })
    }
    return (
        <div  className="sign__form">
            <h2>Accept Terms and policy</h2>
            <ul>
                <li>You can create store </li>
                <li>You can create products </li>
                <li>You can sell </li>
                <li>You can also buy </li>
            </ul>
            <h2>Anything that is not on the list can't be done without the permission of the owner of this friking thing</h2>
            <input type="checkbox"  onChange={()=>{setChecked(!checked)}} defaultChecked={checked}/>
            <span>check to accept terms</span>
            {userProfileInfo?.data.Seller===false ? <button onClick={handleSeller} type="submit" disabled={checked === false}>Click to be a seller</button>: <p>You are a seller</p>}
        </div>
    )
}

export default Seller
