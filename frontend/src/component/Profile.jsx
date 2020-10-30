import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { profile } from "../actions/userActions";
import UpdateProfile from "./UpdateProfile";
import UpdateProfilePic from "./UpdateProfilePic";
import { Avatar,Card,Skeleton,Menu, Dropdown,Drawer } from 'antd';
import { AntDesignOutlined,EditOutlined,PictureOutlined,AuditOutlined } from '@ant-design/icons';

const Profile = () => {
	const [drawer,setDrawer]=useState(false)
	const [imageDrawer,setImageDrawer]=useState(false)
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userProfile = useSelector((state) => state.userProfile);
	const { userProfileInfo, loading, error } = userProfile;
	const dispatch = useDispatch();
	const userId = userInfo?._id;
	const userToken = userInfo?.token;
	console.log(userInfo)
	useEffect(() => {
		if (userInfo) {
		 dispatch(profile(userId, userToken))
		}
	}, [dispatch, userId, userToken, userInfo]);

const showDrawer = () => {
	setDrawer(true)
	  };
	
const onClose = () => {
	setDrawer(false)
	  };
	  const showDrawerimg = () => {
		setImageDrawer(true)
		  };
		
	const onCloseImg = () => {
		setImageDrawer(false)
		  };
		  const menu = (
			<Menu>
			  <Menu.Item key={1}>
				<p onClick={showDrawerimg}>
				<PictureOutlined />	Update Profille Picture
				</p>
			  </Menu.Item>
			  <Menu.Item key={2}>
				<p onClick={showDrawer}>
				<AuditOutlined />	Update Profile Info
				</p>
			  </Menu.Item>
			</Menu>
		  )
	return (
		<>
			{ error ? (
				<div>{error}</div>
			) : (
				<Card title="Profile" style={{ width: 300, marginTop: 16 }}  extra={[<Dropdown overlay={menu} placement="bottomCenter" arrow trigger={['click']} key={1}>
      <EditOutlined key="edit" style={{fontSize:25, color:'black'}}/>
				</Dropdown>	
				  ]} bordered={true} bodyStyle={{display:"flex", flexDirection:'column',alignItems:'center'}}>
 <Skeleton loading={loading} avatar active> 

<Avatar alt="my-garage" src={userProfileInfo?.profilePic}  size={{xs: 100,sm: 120,md: 140,lg: 160,xl: 180,xxl: 200,}}
    icon={<AntDesignOutlined />} style={{objectFit:'contain'}}/>
	<div className="Info">
	<p><span>Name:</span> {userProfileInfo?.name}</p>
					<p><span>Email:</span>   {userProfileInfo?.email}</p>
					<p><span>Social Media Account:</span>  {userProfileInfo?.SocialMediaAcc}</p>
					<p><span>Contact Number:</span>  {userProfileInfo?.contactNumber}</p>
					<p><span>Country:</span>   {userProfileInfo?.country}</p>
					<p><span>City:</span> {userProfileInfo?.city}</p>
					<p><span>Zipcode:</span>  {userProfileInfo?.zipcode}</p>
	</div>
	

					
					<Drawer
          title="Update Profile"
		  width={600}
          onClose={onClose}
		  visible={drawer}
		  placement={'right'}
        >
			<UpdateProfile onClose={onClose}/> 
        </Drawer>
		<Drawer
          title="Update Profile Picture"
		  height={200}
          onClose={onCloseImg}
          visible={imageDrawer}
		  placement={'top'}
        >
			<UpdateProfilePic  onClose={onCloseImg}/>
        </Drawer>
		  </Skeleton> 
		  </Card>
			)}
		</>
	);
};

export default Profile;
