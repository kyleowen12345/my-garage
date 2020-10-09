import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;
const Store = mongoose.model(
	"Store",
	new mongoose.Schema({
		sellerName: {
			type: ObjectId,
			ref: "User",
		},
		storeName: {
			type: String,
			min: 5,
			maxlength: 100,
			validate: /^[a-zA-Z0-9,. ]*$/,
		},
		storeAddress: {
			type: String,
			min: 5,
			maxlength: 100,
			validate: /^[a-zA-Z0-9,. ]*$/,
		},
		storeDescription: {
			type: String,
			min: 5,
			maxlength: 255,
			validate: /^[a-zA-Z0-9,. ]*$/,
		},
		storeType: {
			type: String,
			min: 5,
			maxlength: 100,
			validate: /^[a-zA-Z0-9,. ]*$/,
		},
	})
);

export { Store };
