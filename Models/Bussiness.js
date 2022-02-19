const mongoose=require('mongoose'),Schema=mongoose.Schema;
//Defining the Schema
const bussinessSchema=new Schema({
    name:{type:String,required:true},
    mobile: { type:String,required: true },
    email: { type: String, required:true},
    amount:{type: String, required:true},
    msg:{type:String,set:setMessage},
    date_booked:{type: String, required:true}
})
function setMessage(value){
    if(value===""){
        return "-";
    }
    else{
        return value;
    }
}
//Creating a model
const Bussiness=mongoose.model('Bussiness',bussinessSchema)
module.exports={Bussiness};

