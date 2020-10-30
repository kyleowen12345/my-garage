import mongoose from "mongoose";

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
			validate: /^[a-zA-Z0-9,. ]*$/,
		},
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
			unique: true,
			validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
		},
		profilePic: {
			type: String,
			default: "https://res.cloudinary.com/kaking/image/upload/v1601705050/logo/3847644551_6514180c-9480-4b93-9c7f-65733c047be7_xu2buh.png",
		},
		contactNumber: { type: String },
		country: {
			type: String,
			default: "no country",
		},
		SocialMediaAcc: {
			type: String,
			default: "no SocialMediaAcc",
			minlength: 5,
			maxlength: 255,
		},
		city: {
			type: String,
			default: "no city",
		},
		zipcode: {
			type: String,
		
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 100,
		},
		resetToken: String,
		expireToken: Date,
		Seller: { type: Boolean, required: true, default: false },
		createdAt: {
			type: Date,
			default: new Date(),
		},
		cart: {
			type: Array,
			default: []
		},
		history:{
			type:Array,
			default:[]
		}
	})
);

export { User };
