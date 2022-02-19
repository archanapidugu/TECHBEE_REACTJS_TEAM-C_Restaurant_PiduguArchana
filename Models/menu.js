const mongoose=require('mongoose'),Schema=mongoose.Schema;
//Defining the Schema
const menuSchema=new Schema({
    name:{type:String,required:true},
    items: { type:Array,required: true },
    image: { type: String, required:true}
})
//Creating a model
const Menu=mongoose.model('Menu',menuSchema)
module.exports={Menu};

