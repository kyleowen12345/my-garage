import express from "express";
import { User } from "../models/user.js";
import requireLogin from "../middleware/requireLogin.js";




const router = express.Router();

router.post("/profile", requireLogin, async (req, res) => {
	const { _id } = req.body;
	try {
		let userInfo = await User.findOne({ _id: _id });
		res.status(200).json(userInfo);
	
	} catch (error) {
		res.status(422).send("did not work");
	}
});
router.post("/updatephoto", requireLogin, (req, res) => {
	const { profilePic, email } = req.body;
	if (!profilePic) {
		return res.status(422).json({ error: "Put an image first" });
	}
	if (!email) {
		return res.status(422).json({ error: "login first" });
	}
	User.findOne({ email: email })
		.then((savedUser) => {
			savedUser.profilePic = profilePic;
			savedUser.save().then((data) => {
				res.json({ message: "successfully upadated the profile picture" }); 
			});
		})
		.catch((err) => {
			res.json({ message: err });
			console.log(err);
		});
});
router.post("/updatebio", requireLogin, async (req, res) => {
	const { _id,name, contactNumber, country, State, city, zipcode,SocialMediaAcc } = req.body;
	try {
		const newUser = await User.findOne({ _id: _id });
		newUser.name = name;
		newUser.contactNumber = contactNumber;
		newUser.country = country;
		newUser.State = State;
		newUser.city = city;
		newUser.zipcode = zipcode;
		newUser.SocialMediaAcc = SocialMediaAcc;
		newUser
			.save()
			.then((data) => {
				res.status(200).json(data);
				
			})
			.catch((err) => {
				res.status(422).json(err);
			});
	} catch (error) {
		console.log(error);
		res.status(422).json({ message: "User not found" });
	}
});
router.post("/createSeller",requireLogin, async (req, res) => {
	const { _id } = req.body;
		if (!_id ) {
			return res.status(422).json({ error: "User does not exist" });
		}
	try {
		await User.findOne({_id:_id}).then((savedUser) => {
			savedUser.Seller=true;
			savedUser.save().then(result=>{
				res.status(200).json({result})
			}).catch(err=>{
				console.log(err)
			})
		});
	} catch (error) {
		res.json({ error: "User unknown" });
	}
});
router.post("/profileAll", requireLogin, async (req, res) => {
	const {_id} = req.body
	if (!_id ) {
		return res.status(422).json({ error: "User does not exist" });
	}
	try {
		await User.findById({_id:_id}).then(result=>{
			console.log(result)
		}).catch(err=>{
		return	res.status(422).send(err);
		})
		let userInfo = await User.find({});
		res.status(200).json(userInfo);
	
	} catch (error) {
		res.status(422).send(error);
	}
});

export default router;
