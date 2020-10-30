import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import {  useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { updateSeller } from '../actions/userActions';


const Seller = () => {
    const history = useHistory()
    const userProfile = useSelector((state) => state.userProfile);
    const { userProfileInfo } = userProfile;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [checked,setChecked]=useState(false)
    const dispatch = useDispatch();
    const userId = userInfo?._id;
    useEffect(()=>{
      if(userProfileInfo?.Seller===true) {
      return  history.push('/Store')
      }
    })
   
    const handleSeller=(e)=>{
      e.preventDefault()
      dispatch(updateSeller(userId,userInfo?.token))
      return  history.push('/Store')
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
            {userProfileInfo?.Seller===false ? <button onClick={handleSeller} type="submit" disabled={checked === false}>Click to be a seller</button>: <p>You are a seller</p>}
        </div>
    )
}

export default Seller
