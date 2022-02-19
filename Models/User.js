const mongoose=require('mongoose'),Schema=mongoose.Schema;
const bcrypt=require('bcryptjs');

//Defining the Schema
const userSchema=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true,set:bcryptPassword},
    type:{type:String,default:"user"}
})
//Bcrypt the password
function bcryptPassword(password){
    return bcrypt.hashSync(password, 8);
}
//validating the password
userSchema.methods.validatePassword=function(password){
    return bcrypt.compareSync(password,this.password)
}
//Creating a model
const User=mongoose.model('User',userSchema)
module.exports={User};
