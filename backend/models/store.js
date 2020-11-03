import mongoose from "mongoose";
import moment from 'moment'

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
			unique:true
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
			type: String,
			default: moment().format('MMMM Do YYYY, h:mm:ss a'),
		},
	   storeBackgroundImage:{
		type: String,
		default:"https://res.cloudinary.com/kaking/image/upload/v1604108250/xyjvdcouhpdgau0hcfgn.png"
	   },
	   storeImages:{
		type: Array,
		default: []
	},
	})
);

export { Store };
