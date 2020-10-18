import express from "express";
import { Store } from "../models/store.js";
import { User } from "../models/user.js";
import {Product} from '../models/product.js'
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router();

router.post('/createproduct', requireLogin,async(req,res)=>{
    const {productName,price,productStocks,description,storeName,storeOwner}=req.body
    if(!storeName || !storeOwner){
      return res.status(422).json({error:"invalid entities"});
    }
    try {
     await User.findOne({storeOwner:storeOwner})
  await Store.findOne({storeName:storeName})
     await Product.findOne({productName:productName})
     const newProduct=new Product({
      productName,price,productStocks,description,storeName,storeOwner
     })
     await newProduct.save()
     res.status(200).json(newProduct)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
})
router.post('/singlestoreproduct',async(req,res)=>{
    const {_id}=req.body
  try {
      let product = await Product.findOne({_id:_id}).populate('storeName','storeName _id').populate('storeOwner','name')
      res.json(product)
  } catch (error) {
    console.log(error)  
  }
})
router.post('/storeproduct',async(req,res)=>{
  const {storeName}=req.body
    try {
        let product = await Product.find({storeName:storeName}).populate('storeName','storeName _id socialMediaAcc').populate('storeOwner','name')
        res.json(product)
    } catch (error) {
      console.log(error)  
    }
  })
router.post('/productimage',requireLogin,(req,res)=>{
  const {image,productName}=req.body

    Product.findOne({productName:productName}).then(result=>{
			result.image=image
			result.save().then((data) => {
				res.json({ message: "successfully upadated the profile picture" , content:data}); 
			});
		}).catch(err=>{
			res.json({ message: err });
			console.log(err);
		})
})
router.post('/updateproduct',requireLogin,async(req,res)=>{
  const {productName,price,productStocks,description,storeOwner,_id}=req.body
  if(!storeOwner){
    return res.status(422).json({ error: "Invalid credentials" });
  }
  try {
    const updateProduct=await Product.findOne({_id:_id})
    updateProduct.productName=productName
    updateProduct.price=price
    updateProduct.productStocks=productStocks
    updateProduct.description=description
    updateProduct.save()
    res.status(200).json(updateProduct)
  } catch (error) {
    console.log(error)
  }
})


export default router