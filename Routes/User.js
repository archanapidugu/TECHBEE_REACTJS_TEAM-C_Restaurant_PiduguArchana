const {User}=require('../Models/User');
const router=require('express').Router();
const jwt=require('jsonwebtoken');

//POST for SignUp
router.post('/signup',async(req,res)=>{
    try{    
        const exist=await User.findOne({username:req.body.username})
        if(exist!==null){
           return res.status(409).send({error:"username already taken"})
        }
        const newUser=await new User(req.body)
        const docs=await newUser.save()
        return  res.send(docs)
    }
    catch(err){
        if(err.name==="ValidationError"){
            res.status(400).send(err)
        }
        else{
            res.sendStatus(500)
        }
    } 
})

//POST for signin
router.post('/signin',async(req,res)=>{
    try{
       const docs=await User.findOne({username:req.body.username});
       console.log(docs);
        if(docs===null){
            return res.status(409).send({error:"No user found"})
        }
        if(await docs.validatePassword(req.body.password)){
            const token=jwt.sign({_id:docs._id,type:docs.type},process.env.SECRET);
            //Storing the jwt in httpOnly cookie for security purpose
            return res.cookie('token', token, {
                expires: new Date(new Date().getTime() + 3000*1000),
                secure: true, 
                httpOnly: true
              }).send({user:docs});
        }
        else{
            res.status(409).send({error:"Incorrect Password"})
        }
    }
    catch(err){
        res.sendStatus(500)
    }
    
})

//verifying the jwt in the cookies by GET
router.get('/verify',async(req,res)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(409).send({error:"You need to login"})
        }
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if(err){
                return res.status(409).send({error:"Invalid token"})
            }
            else{
                return res.send({message:token,type:decoded.type,id:decoded._id})
            }   
        });
    }
    catch(err){
        res.sendStatus(500)
    }
})

//GET for logout
router.get('/logout',async(req,res)=>{
    try{
        res.status(200).clearCookie('token').send({msg:"Logout Success"})
    }
    catch(err){
        res.sendStatus(500)
    }
})

module.exports=router;