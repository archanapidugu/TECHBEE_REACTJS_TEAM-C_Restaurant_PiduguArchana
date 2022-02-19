const {Gallery}=require('../Models/Gallery');
const express=require('express');
const router=express.Router();
const multer=require('multer')

//MULTER for uploading images
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

//POST for Gallery
router.post('/gallery',upload.single('image'),(req,res)=>{
    const image={image:req.file.path}
    const newBooking=new Gallery(image)
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
//GET Images for Gallery
router.get('/gallery',(req,res)=>{
    Gallery.find()
    .then(val=>res.send(val))
    .catch(err=>res.sendStatus(500))
})
module.exports=router;
