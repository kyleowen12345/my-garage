import React, { useEffect,useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { viewCart } from '../actions/cartActions';
import Cookies from "js-cookie";
import { profile } from "../actions/userActions";
import { Drawer,message,Badge  } from 'antd';
import { MenuOutlined,ProfileOutlined,HomeOutlined,ShopOutlined,LogoutOutlined,LoginOutlined,QuestionOutlined,UserAddOutlined,ShoppingCartOutlined } from '@ant-design/icons';



const Navbar = () => {
	const history = useHistory();
	const [drawer,setDrawer]=useState(false)
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userProfile = useSelector((state) => state.userProfile);
	const { userProfileInfo } = userProfile;
	const viewcahrt = useSelector((state) => state.viewcahrt);
    const { cartInfo } = viewcahrt;
	const dispatch = useDispatch();
	const userId = userInfo?._id;
	const userToken = userInfo?.token;
	

		useEffect(()=>{
			dispatch(viewCart(userToken))
		},[dispatch,userToken])

	
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
console.log(cartInfo?.cartDetail)
	return (
		<header>
			<div className="header__right">
			<MenuOutlined onClick={showDrawer} style={{fontSize:30, padding:25, color:'white',backgroundColor:'black',borderRadius:50}} />
			<Drawer
          title="My Garage"
		  width={300}
          onClose={onClose}
		  visible={drawer}
		  placement={'left'}
        >
			{!userInfo ? (
					<div className='nav__link'>
						
							<Link className="header__link2" to="/signin" onClick={onClose}>
							<LoginOutlined />	Signin
							</Link>
							<Link className="header__link2" to="/signup" onClick={onClose}>
							<UserAddOutlined />	Signup
							</Link>
							<Link className="header__link2" to="/about" onClick={onClose}>
							<QuestionOutlined />	About
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
				<ShopOutlined />	Store
				</Link>													
				<Link to="/signin"
				className="header__link2"
				onClick={() => {
				onClose()
			    Cookies.remove("_plip");
			    history.push("/signin");
			    message.success('logged out successfully')
				window.location.reload();			
				}}
				>
				<LogoutOutlined />	Logout
				</Link>
						</div>
					)}
        </Drawer>
			</div>
			<div className="header__left">
				<div className="cart__info">
				<Badge style={{marginTop:10, backgroundColor:'green'}}  count={cartInfo?.cartDetail?.length} >
				<Link to='/cart' >
				<ShoppingCartOutlined style={{fontSize:40, color:'black'}}/>
				</Link>
				</Badge>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
