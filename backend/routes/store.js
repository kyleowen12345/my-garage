import express from "express";
import { Store } from "../models/store.js";
import { User } from "../models/user.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router();


router.get('/homies',async(req,res)=>{
try {
 let stores= await Store.find({}).populate('sellerName','name profilePic').sort({createdAt:'desc'})
 res.json(stores)

} catch (error) {
	res.json(error)
}
})
router.post('/singlestore',async(req,res)=>{
	const { _id }=req.body
	try {
		let store=await Store.findOne({_id:_id}).populate('sellerName','name')
		res.status(200).json(store);
	} catch (error) {
		console.log(error)
	}
})
router.post('/searchresult',async(req,res)=>{
	const { storeName }=req.body
	try {
		const stores= await Store.find({storeName:new RegExp(storeName,'i')}).populate('sellerName','name profilePic').sort({createdAt:"desc"})
	res.json(stores)
	} catch (error) {
		console.log(error)
	}
})

router.post("/createStore", requireLogin, async (req, res) => {
	const {
		storeName,
		storeAddress,
		storeDescription,
		storeType,
		contactNumber,
		socialMediaAcc,
		_id
	} = req.body;
	if (!_id ) {
		return res.status(422).json({ error: "User does not exist" });
	}
	try {
		await User.findById({_id:_id}).then(result=>{
			if(result.Seller===false){
				return res.status(422).json({error:"you are not a Seller"});
			}
			if(!storeAddress||
				!storeDescription||
				!storeType||
				!contactNumber||
				!socialMediaAcc||
				!storeName){
					return res.status(422).json({error:"Complete the fields"});
				}
		 Store.findOne({storeName:storeName}).then(savedStore=>{
				if(savedStore){
					return res.status(422).json({ error: "Store Name is already taken use something else" });
				}
				const newStore = new Store({
					storeName,
					storeAddress,
					storeDescription,
					storeType,
					contactNumber,
					socialMediaAcc,
					sellerName: req.user,
				});
				 newStore.save().then((data) => {
					res.status(200).json({ store: data });
				});
			}).catch(err=>{
			res.status(422).json(err);
			})
			})
			
		
	} catch (error) {
		res.status(422).json(error);
	}
});
router.post('/updatestoreinfo',requireLogin,async(req,res)=>{
	const {
		_id,
		storeName,
		storeAddress,
		storeDescription,
		storeType,
		contactNumber,
		socialMediaAcc,
	} = req.body;
	if(!_id||
		!storeName||
		!storeAddress||
		!storeDescription||
		!storeType||
		!contactNumber||
		!socialMediaAcc){
			return res.status(422).json({ error: "complete the fields" })
		}
	try {
		const storeupdate=await Store.findOne({_id:_id})
		storeupdate.storeName=storeName
		storeupdate.storeAddress=storeAddress
		storeupdate.storeDescription=storeDescription
		storeupdate.storeType=storeType
		storeupdate.contactNumber=contactNumber
		storeupdate.socialMediaAcc=socialMediaAcc
		storeupdate.save()
		res.json(storeupdate)
	} catch (error) {
	return	res.json(error)
		
	}
})

router.post('/mystores',requireLogin,(req,res)=>{
 const {_id}=req.body

 Store.find({sellerName:_id})
    .populate("sellerName","_id name email").sort('-createdAt')
    .then(mypost=>{
		res.json(mypost)
    })
    .catch(err=>{
		console.log(err)
		res.json({error:'Invalid user'})
    })

	
})
router.post('/storebackgroundImage',requireLogin,async(req,res)=>{
	const {storeBackgroundImage,_id}=req.body
	if (!storeBackgroundImage) {
		return res.status(422).json({ error: "Put an image first" });
	}
try {
const result=await	Store.findOne({_id:_id})
result.storeBackgroundImage=storeBackgroundImage
result.save()
res.json(result)
} catch (error) {
	console.log(error)
}
})
router.post('/removeStorefam',requireLogin,async(req,res)=>{
	const {storeName}=req.body
	try {
		await Store.findOneAndDelete({storeName:storeName})
		res.json({message:'Store deleted'})
	} catch (error) {
	    console.log(error)
	}
})

export default router;




