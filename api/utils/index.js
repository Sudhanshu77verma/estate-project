import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from '../routes/user.route.js'
import authRouter from '../routes/auth.route.js'
import cookieParser from "cookie-parser";
import listingRouter from "../routes/listing.route.js"
dotenv.config();


mongoose.connect(process.env.MONGO).then(()=>{
    console.log(" db connection is successful")
}).catch((error)=>{
    console.log(error);
})


const app= express();
app.use(cookieParser());

app.use(express.json());
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");

})

app.use('/api/user', userRouter);

app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);


// middleware
app.use((error,req,res,next)=>{
    const statuscode= error.statuscode || 500;
    const message=error.message || "Internal Server Error";
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    })
})