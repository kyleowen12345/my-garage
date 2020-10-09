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
			default: "no picture",
		},
		contactNumber: { type: Number, default: 0 },
		country: {
			type: String,
			default: "no country",
		},
		State: {
			type: String,
			default: "no State",
		},
		city: {
			type: String,
			default: "no city",
		},
		zipcode: {
			type: Number,
			default: 0,
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
	})
);

export { User };
