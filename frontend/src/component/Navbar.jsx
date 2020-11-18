import React, { useEffect,useState,useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { viewCart } from '../actions/cartActions';
import Cookies from "js-cookie";
import { profile } from "../actions/userActions";
import { allStoresViewer, getSearchedStore } from '../actions/storeActions'
import { Drawer,message,Badge,Input,Empty } from 'antd';
import { MenuOutlined,ProfileOutlined,HomeOutlined,ShopOutlined,LogoutOutlined,LoginOutlined,QuestionOutlined,UserAddOutlined,ShoppingCartOutlined,SearchOutlined } from '@ant-design/icons';
import {v4 as uuid} from 'uuid'

const Navbar = () => {
	const history = useHistory();
	const [drawer,setDrawer]=useState(false)
	const [suggest,setSuggest]=useState(false)
	const [suggestContent,setSuggestContent]=useState('')
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userProfile = useSelector((state) => state.userProfile);
	const { userProfileInfo } = userProfile;
	const viewcahrt = useSelector((state) => state.viewcahrt);
	const { cartInfo } = viewcahrt;
	const viewAllStore = useSelector((state) => state.viewAllStore);
	const { allStores } = viewAllStore;
	const dispatch = useDispatch();
	const userId = userInfo?._id;
	const userToken = userInfo?.token;
	const ref = useRef(null);
	
	useEffect(()=>{
		dispatch(viewCart(userToken))
	},[dispatch,userToken])

	
	useEffect(() => {
	if (userInfo) {
		dispatch(profile(userId, userToken))
	}
	}, [dispatch, userId, userToken, userInfo]);
//   searchbar
	useEffect(()=>{
		dispatch(allStoresViewer())
	  },[dispatch])
	  
	  const onSelect = (data) => {
		  if(!suggestContent){
			return message.error('type in something..')
		  }
		dispatch(getSearchedStore(data,history))
		setSuggest(false)
		setSuggestContent(' ')
	  };

	const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setSuggest(false);
        }
    return { ref, suggest, setSuggest };
}
useEffect(() => {
	document.addEventListener('click', handleClickOutside, true);
	return () => {
		document.removeEventListener('click', handleClickOutside, true);
	};
});
	const { Search } = Input;
	// case insensitive for search
	const lowercased=suggestContent.toLowerCase()
	const allstore=allStores?.map(item=>item.storeName)
	const filteredStore=allstore?.filter(name=>name.toLowerCase().includes(lowercased))
	//   Drawer
	const showDrawer = () => {
		setDrawer(true)
		  };
		
	const onClose = () => {
		setDrawer(false)
		  };
console.log(cartInfo)
console.log(filteredStore)
	return (
		<header>
			<div className="header__right">
			<MenuOutlined onClick={showDrawer} style={{fontSize:30, padding:25, color:'#0063E0', fontWeight:'bolder'}} />
			<Drawer
          title={<img src={"https://res.cloudinary.com/kaking/image/upload/v1604108250/xyjvdcouhpdgau0hcfgn.png"} alt={'my-garage'} style={{width:70, objectFit:'contain'}}/>}
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
			</div>
			<div className="header__left">
				<div className="searchbox">
			<Search placeholder="Find Store..."  onSearch={onSelect}  onClick={()=>setSuggest(true)}  onChange={(e)=>{setSuggestContent(e.target.value)
			setSuggest(true)}} />
				<div className="suggest" style={{display:suggest? 'block':'none'}} ref={ref}>
			{suggestContent && <p>{filteredStore?.length} Results for "{suggestContent}"</p>}
				{filteredStore?.length < 1 ? <Empty description={'Not Found'} /> :filteredStore?.map(item=>{
					return(
					<p key={uuid()} className='suggest__items' onClick={()=>{dispatch(getSearchedStore(item,history)).then(data=>{setSuggest(false)})}}> <SearchOutlined style={{paddingRight:20}}/>{item}</p>
					)
				}
					)}
				</div>
				
				</div>
				{userInfo && <div className="cart__info">
				<Badge style={{marginTop:10, backgroundColor:'green'}}  count={cartInfo?.cartDetail?.length === undefined ? cartInfo?.length:cartInfo?.cartDetail?.length} >
				<Link to='/cart' >
				<ShoppingCartOutlined style={{fontSize:40, color:'#0063E0'}}/>
				</Link>
				</Badge>
				</div>}
				
			</div>
		</header>
	);
};

export default Navbar;
