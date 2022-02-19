const {Menu}=require('../Models/menu');
const express=require('express');
const router=express.Router();
const multer=require('multer')
const ObjectId=require('mongoose').Types.ObjectId;

//POST for menus
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/' )
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype==='image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
var upload = multer({ 
                    storage: storage,
                    fileFilter:fileFilter
                 })
router.post('/menu',upload.single('image'),(req,res)=>{
    console.log(req.file)
    const split_items=req.body.items.split(',');
    const list={
        name:req.body.name,
        items:split_items,
        image:req.file.path
    }
    const newMenu=new Menu(list)
    newMenu.save((err,docs)=>{
        if(err){
            if(err.name==="ValidationError"){
                return res.status(401).send(err)
            }
        else{
                return res.sendStatus(500)
        }
        }
        return res.send(docs)
    })
})
//GET the Menu 
router.get('/menu',(req,res)=>{
    Menu.find({})
    .then(docs=>{
        res.send(docs)
    })
    .catch(err=>res.sendStatus(500))
})
function mid(req,res,next){
  if(!ObjectId.isValid(req.params.id)){
    return res.status(409).send("Id not Valid")
  }
  next()
}
//update only the Menu name and list items
router.put('/menu/:id',mid,(req,res)=>{
  const update={
      name:req.body.name,
      items:req.body.items
  }
  Menu.findByIdAndUpdate(req.params.id,{$set:update},{new:true},(err,docs)=>{
      if(err){
          return res.sendStatus(500)
      }
      return res.send(docs)
  })
})

//Update the Menu items ie(name,itemlist,image)
router.put('/menuall/:id',mid,upload.single('image'),(req,res)=>{
    console.log(req.file)
    const split_items=req.body.items.split(',');
    const update={
        name:req.body.name,
        items:split_items,
        image:req.file.path
    }
    Menu.findByIdAndUpdate(req.params.id,{$set:update},{new:true},(err,docs)=>{
        if(err){
            return res.sendStatus(500)
        }
        return res.send(docs)
    })
})
//Delete a menu
router.delete('/menu/:id',mid,(req,res)=>{
  Menu.findByIdAndRemove(req.params.id,(err,docs)=>{
    if(err){
      res.sendStatus(500)
    }
    else{
      res.send("Deleted Successfully")
    }
  })
})
module.exports=router;