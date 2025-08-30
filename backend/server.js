// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js';
// import connectCloudinary from './config/cloudinary.js';
// import userRouter from './routes/userRoute.js';
// import productRouter from './routes/productRoute.js';
// import cloudinary from './config/cloudinary.js';



// // import dotenv from 'dotenv';
// // dotenv.config();


// //App Config 


// const port = process.env.PORT || 4000
// connectDB();
// // connectCloudinary();
// // cloudinary()

// const app=express();

// //middleware
// const origins = ['http://localhost:5174','http://localhost:5173']

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

// // app.use(cors(origins))
// app.use(cors({
//   origin: origins,  
//   credentials: true,  
// }));



// //api endpoint
// app.use('/api/user',userRouter)
// app.use('/api/product',productRouter);


// app.get('/',(req,res)=>{
//     res.send("Api Working");
// });

// app.listen(port,()=>console.log('Server Started on PORT : ' + port));

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cloudinary from './config/cloudinary.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



// import dotenv from 'dotenv';
// dotenv.config();


//App Config 
const app=express();
const port = process.env.PORT || 4000
connectDB();



connectCloudinary();
// cloudinary()


//middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));




//api endpoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)



app.get('/',(req,res)=>{
    res.send("Api Working");
});

//start the express server 

app.listen(port,()=>
    console.log('Server Started on PORT : ' + port));