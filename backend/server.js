import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import userInfo from "./routes/userInfo.js";
import store from "./routes/store.js";
import product from './routes/product.js'
import payments from './routes/payments.js'
import cors from "cors";



// config
const app = express();
dotenv.config();
export const secret = process.env.JWT_SECRET;
const corsOptions = {
	origin: "https://blackedmarket-aec61.web.app" && "http://localhost:3000" ,
	optionsSuccessStatus: 200, // For legacy browser support
	// method: "GET, POST, DELETE,",
};
// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(auth);
app.use(userInfo);
app.use(store);
app.use(product)
app.use(payments)
// database
app.get('/',(req,res)=>{
	res.send('qwseqwe')
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
mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err);
  });
  
  mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected');
  });



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at port:${port}`));
