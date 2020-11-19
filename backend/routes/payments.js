import express from 'express'
import requireLogin from "../middleware/requireLogin.js";
import {Payment} from '../models/payment.js'

const router = express.Router();

router.post('/payments',requireLogin,async(req,res)=>{
    try {
   const buyers= await Payment.find({})
   const result=buyers.map(i=>i.product)
   res.status(200).json(result)
    } catch (error) {
        res.status(422).send('something went wrong')
    }
})

export default router;