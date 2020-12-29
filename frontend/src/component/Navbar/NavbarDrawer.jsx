import React from 'react'
import { Drawer,message} from 'antd';
import { Link } from "react-router-dom";
import { ProfileOutlined,HomeOutlined,ShopOutlined,LogoutOutlined,LoginOutlined,UserAddOutlined } from '@ant-design/icons';
import Cookies from "js-cookie";
const NavbarDrawer = ({onClose,drawer,userInfo,userProfileInfo,history}) => {
   
    return (
        <Drawer
          title='Blacked'
		  width={300}
          onClose={onClose}
		  visible={drawer}
		  placement={'left'}
        >
			{!userInfo ? (
					<div className='nav__link'>
						<Link className="header__link2" to="/" onClick={onClose}>
							<HomeOutlined />	Home 
							</Link>
							<Link className="header__link2" to="/signin" onClick={onClose}>
							<LoginOutlined />	Signin
							</Link>
							<Link className="header__link2" to="/signup" onClick={onClose}>
							<UserAddOutlined />	Signup
							</Link>	
					</div>
				) : (
						<div className='nav__link'> 
                <Link className="header__link2" to="/" onClick={onClose}>
				 <HomeOutlined />	Home
				</Link>
				<Link className="header__link2" to="/profile" onClick={onClose}>
				<ProfileOutlined />	Profile
				</Link>					
				<Link className="header__link2" to={userProfileInfo?.Seller===false ? "/Seller": "/Store"} onClick={onClose} >
				<ShopOutlined /> My	Store
				</Link>													
				<Link to="/signin"
				className="header__link2"
				onClick={() => {
				onClose()
				Cookies.remove("_plip");
				message.success('logged out successfully')
			    history.push("/signin");
				window.location.reload();			
				}}
				>
				<LogoutOutlined />	Logout
				</Link>
						</div>
					)}
        </Drawer>
    )
}

export default NavbarDrawer
