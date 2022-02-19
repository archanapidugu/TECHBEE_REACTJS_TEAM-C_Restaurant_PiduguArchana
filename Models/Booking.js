const mongoose=require('mongoose'),Schema=mongoose.Schema;

//Defining the Schema
const bookingSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    date:{type:String,required:true},
    slot:{type:String,required:true},
    branch:{type:String,required:true},
    guest:{type:String,required:true},
    msg:{type:String,set:setMessage},
    user:{type:String,required:true},
    date_booked:{type:String,required:true}
})
function setMessage(value){
    if(value===""){
        return "-";
    }
    else{
        return value;
    }
}
const Booking=mongoose.model('Booking',bookingSchema)
module.exports={Booking};
