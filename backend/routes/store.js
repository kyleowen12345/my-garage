import express from "express";
import { Store } from "../models/store.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router();

router.post("/createStore", requireLogin, async (req, res) => {
	const {
		storeName,
		storeAddress,
		storeDescription,
		storeType,
		contactNumber,
		socialMediaAcc,
	} = req.body;
	try {
		const newStore = new Store({
			storeName,
			storeAddress,
			storeDescription,
			storeType,
			contactNumber,
			socialMediaAcc,
			sellerName: req.user,
		});
		await newStore.save().then((data) => {
			res.status(200).json({ store: data });
		});
	} catch (error) {
		res.status(422).json(error);
	}
});
router.post("/updateStore", requireLogin, async (req, res) => {});

export default router;
