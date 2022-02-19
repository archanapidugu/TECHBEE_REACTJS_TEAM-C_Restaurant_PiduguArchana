const {Bussiness}=require('../Models/Bussiness');
const express=require('express');
const { Router } = require('express');
const router=express.Router();

//POST for Investors
router.post('/investor',(req,res)=>{
    const newInvestor=new Bussiness(req.body)
    newInvestor.save((err,docs)=>{
        if(err){
            if(err.name==="ValidationError"){
                return res.status(409).send(err.message)
            }
        else{
                return res.sendStatus(500)
        }
        }
        return res.send(docs)
    })
})
//GET All Investor
router.post('/getinvestor',(req,res)=>{
    Bussiness.find({date_booked:req.body.date})
    .then(val=>res.send(val))
    .catch(err=>res.sendStatus(500))
})
module.exports=router;