import express from "express";
import { User } from "../models/user.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router();

router.post("/profile", requireLogin, async (req, res) => {
	const { _id } = req.body;
	try {
		let userInfo = await User.findOne({ _id: _id });
		res.status(200).json(userInfo);
		console.log(userInfo);
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
	const { _id, name, contactNumber, country, State, city, zipcode } = req.body;
	if (
		!_id ||
		!name ||
		contactNumber < 1 ||
		!country ||
		!State ||
		!city ||
		zipcode < 1
	) {
		return res.status(422).json({ message: "complete the fields" });
	}
	try {
		const newUser = await User.findOneAndUpdate({ _id: _id });
		newUser.name = name;
		newUser.contactNumber = contactNumber;
		newUser.country = country;
		newUser.State = State;
		newUser.city = city;
		newUser.zipcode = zipcode;
		newUser
			.save()
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				console.log(err);
				res.status(422).json({ message: err });
			});
	} catch (error) {
		res.status(422).json({ message: "not found" });
	}
});

export default router;
