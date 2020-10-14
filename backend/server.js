import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import userInfo from "./routes/userInfo.js";
import store from "./routes/store.js";
import cors from "cors";


// config
const app = express();
dotenv.config();
export const secret = process.env.JWT_SECRET;
export const api_key = process.env.api_key;
const corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200, // For legacy browser support
	// method: "GET, POST, DELETE,",
};
// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(auth);
app.use(userInfo);
app.use(store);
// database
app.get('/',(req,res)=>{
	res.send('qweqwe')
})


mongoose.connect(
	process.env.MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},()=>
		console.log("connected to mongoDB")
);





const port = process.env.PORT || 1234;

app.listen(port, () => console.log(`Server running at port:${port}`));
