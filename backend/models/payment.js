import mongoose from "mongoose";


const Payment = mongoose.model(
	"Payment",
	new mongoose.Schema({
        user: {
            type: Array,
            default: []
        },
        data: {
            type: Array,
            default: []
        },
        product: {
            type: Array,
            default: []
        }
		
	},{timestamps:true})
);

export { Payment };