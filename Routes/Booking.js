const {Booking}=require('../Models/Booking');
const express=require('express');
const router=express.Router();

//POST for Booking
router.post('/booktable',(req,res)=>{
    const newBooking=new Booking(req.body)
    newBooking.save((err,docs)=>{
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
//GET All Bookings to Admin Based on Branch
router.post('/getbookingadmin',(req,res)=>{
    Booking.find({date_booked:req.body.date})
    .then(val=>res.send(val))
    .catch(err=>res.sendStatus(500))
})

//GET All Bookings of User
router.post('/getbookinguser',(req,res)=>{
    Booking.find({user:req.body.user})
    .then(val=>res.send(val))
    .catch(err=>res.sendStatus(500))
})
module.exports=router;
