import express from 'express'
import requireLogin from "../middleware/requireLogin.js";
import {Payment} from '../models/payment.js'

const router = express.Router();

router.post('/payments',requireLogin,async(req,res)=>{
    const {storeNameFam}=req.body
    try {
   const buyers= await Payment.find({})
       const result=buyers.map(i=>i.product)
       let statSheet=[]
       const work=result.forEach((info)=>{
        info.forEach((data)=>{
           statSheet.push(data)
        })
    })
    const yourStats=statSheet?.filter(i=>i.storeName?.includes(storeNameFam))
   res.status(200).json(yourStats)
    } catch (error) {
        res.status(422).send('something went wrong')
    }
})

export default router;