//Exporting the required modules
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const env=require('dotenv');
const cokkieParser=require('cookie-parser');

const app=express();
env.config()
const {mongoose}=require('./DB/connection');
const menuRoute=require('./Routes/menus');
const userRoute=require('./Routes/User');
const BookingRoutes=require('./Routes/Booking');
const BussinessRoutes=require('./Routes/Bussiness');
const GalleryRoutes=require('./Routes/Gallery');
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(cokkieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));
app.use('/',menuRoute);
app.use('/',userRoute)
app.use('/',BookingRoutes)
app.use('/',BussinessRoutes);
app.use('/',GalleryRoutes);
app.listen(process.env.PORT,()=>console.log(`Server Started at PORT ${process.env.PORT}`))
