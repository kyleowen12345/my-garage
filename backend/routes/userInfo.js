import express from "express";
import { User } from "../models/user.js";
import requireLogin from "../middleware/requireLogin.js";
import {Product} from '../models/product.js'
import {Payment} from '../models/payment.js'
import ASYNC from 'async'

const router = express.Router();

router.post("/profile", requireLogin, async (req, res) => {
	const { _id } = req.body;
	try {
		const userInfo = await User.findOne({ _id: _id });
		res.status(200).json(userInfo);
	
	} catch (error) {
		res.status(422).send("did not work");
	}
});
router.post("/updatephoto", requireLogin,async (req, res) => {
	const { profilePic } = req.body;
	if (!profilePic) {
		return res.status(422).json({ error: "Put an image first" });
	}
	try {
		const newPhoto=await User.findOne({ _id:req.user._id})
		newPhoto.profilePic = profilePic;
		newPhoto.save()
		res.json(newPhoto)
	} catch (error) {
		res.json(error);
	}

});
router.post("/updatebio", requireLogin, async (req, res) => {
	const { name, contactNumber, country, city, zipcode,SocialMediaAcc } = req.body;
	try {
		if(!name|| !contactNumber|| !country|| !zipcode|| !SocialMediaAcc || !city){
			return res.json({error:'complete the fields'})
		}
		const newUser = await User.findOne({ _id: req.user._id });
		newUser.name = name;
		newUser.contactNumber = contactNumber;
		newUser.country = country;
		newUser.city = city;
		newUser.zipcode = zipcode;
		newUser.SocialMediaAcc = SocialMediaAcc;
		newUser.save()
		res.status(200).json(newUser)
		
	} catch (error) {
		res.json(error);
	}
});
router.post("/createSeller",requireLogin, async (req, res) => {
	const { _id } = req.body;
		if (!_id ) {
			return res.status(422).json({ error: "User does not exist" });
		}
	try {
	const SellerInfo=await User.findOne({_id:_id})
	SellerInfo.Seller=true;
	  SellerInfo.save()	
	  res.json(SellerInfo)
	} catch (error) {
		res.json({ error: "User unknown" });
	}
});

router.post('/addtocart',requireLogin,async(req,res)=>{
	const {productId}=req.body
	 try {
	await	User.findOne({ _id: req.user._id }, (err, userInfo) => {
			let duplicate = false;
			userInfo.cart.map((item) => {
				if (item.id == productId) {
					duplicate = true;
				}
			})
			if (duplicate) {
			User.findOneAndUpdate(
					{ _id: req.user._id, "cart.id": productId },
					{ $inc: { "cart.$.quantity": 1 } },
					{ new: true },
					(err, userInfo) => {
						if (err) return res.json({ success: false, err });
						res.status(200).json({cartDetail:userInfo.cart})
					}
				)
			} else {
				User.findOneAndUpdate(
					{ _id: req.user._id },
					{
						$push: {
							cart: {
								id: productId,
								quantity: 1,
								date: Date.now()
							}
						}
					},
					{ new: true },
					(err, userInfo) => {
						if (err) return res.json({ success: false, err });
						res.status(200).json({cartDetail:userInfo.cart})
					}
				)
			}
		})
	 } catch (error) {
		 console.log(error)
	 }
 	
})
router.post('/removeitem',requireLogin,async(req,res)=>{
	const {productId}=req.body
try {
await	User.findOneAndUpdate(
	{ _id: req.user._id },
	{
		"$pull":
			{ "cart": { "id": productId } }
	},
	{ new: true },
	(err, userInfo) => {
		let cart = userInfo.cart;
		let array = cart.map(item => {
			return item.id
		})

		Product.find({ '_id': { $in: array } })
			.populate('storeName')
			.sort({date:'desc'})
			.exec((err, cartDetail) => {
				return res.status(200).json({
					cartDetail,
					cart
				})
			})
	}
)
} catch (error) {
	console.log(error)
}
})
router.get('/getCartInfo',requireLogin,async(req,res)=>{
     try {
		 await  User.findOne(
			{ _id: req.user._id },
			(err, userInfo) => {
				let cart = userInfo.cart;
				let array = cart.map(item => {
					return item.id
				})
	
	
				Product.find({ '_id': { $in: array } })
					.sort({date:'desc'})
					.exec((err, cartDetail) => {
						if (err) return console.log(err);
						return res.status(200).json({cartDetail, cart} )
					})
	
			}
		)
	 } catch (error) {
		 console.log(error)
	 }
})
router.post('/successBuy',requireLogin,(req,res)=>{
	let history=[]
	let transactionData={}
	req.body.cartDetail.forEach((item)=>{
		history.push({
			dateOfPurchase:Date.now(),
			name:item.productName,
			id: item._id,
			price: item.price,
			image:item.image,
			quantity: item.quantity,
			storeName:item.storeName,
			storeOwner:item.storeOwner,
            paymentId: req.body.paymentData.paymentID
		})
	})

	transactionData.user={
		id:req.user._id,
		name: req.user.name,
		email: req.user.email
	}
	transactionData.data=req.body.paymentData;
	transactionData.product=history;
	 
	User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });


            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
				if (err) return res.json({ success: false, err });
				
				let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                ASYNC.eachSeries(products, (item, callback) => {
                    Product.updateMany(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold":item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })

            })
        }
    )
})
router.get('/PurchasedItems',requireLogin,async(req,res)=>{
	try {
		const user=await User.findOne({_id:req.user._id})
		res.json(user.history)
	} catch (error) {
		res.json(error)
	}
})
router.post('/deleteHistory',requireLogin,async(req,res)=>{
	try {
	const user=	await User.findOneAndUpdate( { _id: req.user._id },
			{ $set: { history: [] } })
			res.json(user)
	} catch (error) {
		console.log(error)
	}
     
})
export default router;
