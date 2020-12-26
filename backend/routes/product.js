import express from "express";
import {Product} from '../models/product.js'
import requireLogin from "../middleware/requireLogin.js";
import { Payment } from "../models/payment.js";

const router = express.Router();

router.post('/createproduct', requireLogin,async(req,res)=>{
    const {productName,price,productStocks,description,storeName,storeOwner}=req.body
    if(!storeName || !storeOwner ){
      return res.status(422).json({error:"invalid entities"});
    }
    if(!productName||
      !price||
      !productStocks||
      !description
  ){
        return res.status(422).json({ error: "complete the fields" })
      }
    try {
     const newProduct=new Product({
      productName,price,productStocks,description,storeName,storeOwner
     })
      newProduct.save()
     res.status(200).json(newProduct)
    } catch (error) {
      return  res.json(error)
      
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
        let product = await Product.find({storeName:storeName}).populate('storeName','storeName _id socialMediaAcc').populate('storeOwner','name').sort({createdAt:'desc'})
        product.createdAt=new Date()
        res.json(product)
    } catch (error) {
      console.log(error)  
    }
  })

  router.get('/buyers',requireLogin,async(req,res)=>{
    try {
      const payers =await Payment.find({})
      res.json(payers)
    } catch (error) {
      console.log(error)
    }
  })
router.post('/productimage',requireLogin,async(req,res)=>{
  const {image,_id}=req.body
  try {
  const newImage=await  Product.findOne({_id:_id}).populate('storeName','storeName _id socialMediaAcc').populate('storeOwner','name')
  newImage.image=image
  newImage.save(newImage)
  res.status(200).json(newImage)
  } catch (error) {
  return  res.status(422).json(error)
  }
  
})
router.post('/updateproduct',requireLogin,async(req,res)=>{
  const {productName,price,productStocks,description,storeName,_id}=req.body
  if(!storeName){
    return res.status(422).json({ error: "Invalid credentials" });
  }
  if(!productName||
		!price||
		!productStocks||
		!description||
		!storeName||
		!_id
){
			return res.status(422).json({ error: "complete the fields" })
		}
  try {
    
    const updateProduct=await Product.findOne({_id:_id}).populate('storeOwner','name').populate('storeName','storeName _id socialMediaAcc')
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
router.post('/removeProduct',requireLogin,async(req,res)=>{
  const {productNameFam}=req.body
  try {
    await Product.findByIdAndDelete({_id:productNameFam})
    res.json({message:'Successfully deleted the Product'})
  } catch (error) {
    console.log(error)
  }
})
router.post('/products',async(req,res)=>{
   try {
   const products= await Product.find({})
   const images=products.map(i=>i.image)
   const length=images[1].length
    res.json(images)

   } catch (error) {
     console.log(error)
   }
})


export default router