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
			required: true,
		},
		storeAddress: {
			type: String,
			min: 5,
			maxlength: 100,
			validate: /^[a-zA-Z0-9,. ]*$/,
			required: true,
		},
		storeDescription: {
			type: String,
			min: 5,
			maxlength: 255,
			validate: /^[a-zA-Z0-9,. ]*$/,
			required: true,
		},
		storeType: {
			type: String,
			min: 5,
			maxlength: 100,
			validate: /^[a-zA-Z0-9,. ]*$/,
			required: true,
		},
		contactNumber: {
			type: Number,
			required: true,
		},
		socialMediaAcc: {
			type: String,
			min: 5,
			maxlength: 225,
			required: true,
		},
		createdAt: {
			type: Date,
			default: new Date(),
		},
	   storeBackgroundImage:{
		type: String,
		default:"https://res.cloudinary.com/kaking/image/upload/v1601705050/logo/3847644551_6514180c-9480-4b93-9c7f-65733c047be7_xu2buh.png"
	   },
	   storeImages:[{
		type: String
	   }]
	})
);

export { Store };
