import express from 'express'
import requireLogin from "../middleware/requireLogin.js";
import {Payment} from '../models/payment.js'

const router = express.Router();

router.get('/payments',requireLogin,async(req,res)=>{
    try {
    await Payment.find({})
    
    } catch (error) {
        res.status(422).send('something went wrong')
    }
})

export default router;