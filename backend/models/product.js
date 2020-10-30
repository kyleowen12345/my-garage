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
			unique:true
		},
		Rating: {
			type: String,
			min: 5,
			maxlength: 255,
			validate: /^[a-zA-Z0-9,. ]*$/,
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
		sold: {
			type: Number,
			default: 0,
		},
		image: {
			type: String,
			default: "https://res.cloudinary.com/kaking/image/upload/v1601705050/logo/3847644551_6514180c-9480-4b93-9c7f-65733c047be7_xu2buh.png",
		},
		description:{
			type: String,
			min: 5,
			maxlength: 255,
			validate: /^[a-zA-Z0-9,. ]*$/,
		
		}
	},{timestamps:true})
);

export { Product };
