import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;
const Product = mongoose.model(
	"Product",
	new mongoose.Schema({
		storeName: {
			type: ObjectId,
			ref: "Store",
		},
		storeOwner: {
			type: ObjectId,
			ref: "User",
		},
		productName: {
			type: String,
			min: 5,
			maxlength: 100,
			validate: /^[a-zA-Z0-9,. ]*$/,
			required: true,
		},
		Rating: {
			type: String,
			min: 5,
			maxlength: 255,
			validate: /^[a-zA-Z0-9,. ]*$/,
			required: true,
		},
		price: {
			type: String,
			min: 5,
			maxlength: 100,
			validate: /^[a-zA-Z0-9,. ]*$/,
			required: true,
		},
		productStocks: {
			type: Number,
			default: 0,
			required: true,
		},
		image: {
			type: String,
			default: "my garage",
			required: true,
		},
	})
);

export { Product };
