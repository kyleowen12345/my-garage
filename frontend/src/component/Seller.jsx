import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import {  useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { updateSeller } from '../actions/userActions';
import { Card, Button, message,Checkbox } from 'antd';


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
      dispatch(updateSeller(userId,userInfo?.token,message))
      return  history.push('/Store')
    }
   
    return (
      <Card title="Terms and Policies" style={{ width: 300, marginTop: 16 }} 	
				bodyStyle={{display:"flex", flexDirection:'column',alignItems:'center'}}>
            <h1>Accept Terms and policy</h1>
            <ul>
                <li>You can create store </li>
                <li>You can create products </li>
                <li>You can sell </li>
                <li>You can also buy </li>
                <li>By Checking the checkbox you accept our cookie policy</li>
            </ul>
            <h3>Reminders</h3>
            <ul>
                <li>The Paypal Payment Process only work in US accounts </li>
                <li>The Payment Process is not in production mode </li>
                <li>By Checking the checkbox you can SUBMIT </li>
            </ul>
            <Checkbox   onChange={()=>{setChecked(!checked)}} defaultChecked={checked}/>
            <span>check the box to accept terms</span>
            {userProfileInfo?.Seller===false && <Button type="primary" htmlType="submit"  onClick={handleSeller} disabled={checked === false} style={{marginLeft:10 }}>Submit</Button>}
         </Card>
         
    )
}

export default Seller
