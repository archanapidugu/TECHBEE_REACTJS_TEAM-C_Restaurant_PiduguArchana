const mongoose=require('mongoose');

//DB connection
mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then(ok=>console.log("Connection made to DB"))
.catch(err=>console.log("Failed to connect to DB"))

module.exports={mongoose}