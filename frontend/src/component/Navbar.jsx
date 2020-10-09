import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { profile } from "../actions/userActions";
import Loader from "react-loader-spinner";

const Navbar = () => {
	const history = useHistory();
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userProfile = useSelector((state) => state.userProfile);
	const { userProfileInfo, loading, error } = userProfile;
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const userId = userInfo?._id;
	const userToken = userInfo?.token;

	useEffect(() => {
		if (userInfo) {
			return dispatch(profile(userId, userToken));
		}
	}, [dispatch, userId, userToken, userInfo]);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<header>
			<div className="header__right">
				<Link className="header__link" to="/">
					<img
						src="https://res.cloudinary.com/kaking/image/upload/v1601705050/logo/3847644551_6514180c-9480-4b93-9c7f-65733c047be7_xu2buh.png"
						alt="logo"
					/>
				</Link>
			</div>
			<div className="header__left">
				{!userInfo ? (
					<div className="header__nouser">
						<p>
							<Link className="header__link" to="/signin">
								Signin
							</Link>
						</p>
						<p>
							<Link className="header__link" to="/signup">
								Signup
							</Link>
						</p>
						<p>
							<Link className="header__link" to="/about">
								About
							</Link>
						</p>
					</div>
				) : (
					<>
						<Button
							ref={anchorRef}
							aria-controls={open ? "menu-list-grow" : undefined}
							aria-haspopup="true"
							onClick={handleToggle}
						>
							{loading || error ? (
								<div className="sign__loader">
									<Loader
										type="TailSpin"
										color="#ff4d4d"
										height={50}
										width={50}
									/>
								</div>
							) : (
								<p>{userProfileInfo?.data.name}</p>
							)}
						</Button>
						<Popper
							open={open}
							anchorEl={anchorRef.current}
							role={undefined}
							transition
							disablePortal
						>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									style={{
										transformOrigin:
											placement === "bottom" ? "center top" : "center bottom",
									}}
								>
									<Paper>
										<ClickAwayListener onClickAway={handleClose}>
											<MenuList
												autoFocusItem={open}
												id="menu-list-grow"
												onKeyDown={handleListKeyDown}
											>
												<MenuItem onClick={handleClose}>
													<Link className="header__link2" to="/profile">
														Profile
													</Link>
												</MenuItem>
												<MenuItem onClick={handleClose}>
													<Link className="header__link2" to="/profile">
														Be a Seller
													</Link>
												</MenuItem>
												<MenuItem onClick={handleClose}>
													<span
														className="header__link2"
														onClick={() => {
															Cookies.remove("_plip");
															history.push("/signin");
															window.location.reload();
														}}
													>
														Logout
													</span>
												</MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</>
				)}
			</div>
		</header>
	);
};

export default Navbar;
