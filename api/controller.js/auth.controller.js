   import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import {errorhandler} from '../utils/error.js'
import jwt from "jsonwebtoken";
  export const signup = async(req,res,next)=>{
    // fetch from req body 

      const {email,password,username}=req.body; 

      // hashed password for security purpose 
      const hashedpassword=bcryptjs.hashSync(password,10); 
      // create a new user  

      // we can also use create 

      const newuser=new User({username,email,password:hashedpassword});
     try{
      await newuser.save(); 
      res.status(201).json({
        success:"true",
        message:"user created successfully",
      })
        

     }
     catch(error)
     {
      next(error);
     }
     
   
  };


  export const signin =async(req,res,next)=>{
    try{
           const {email,password}=req.body;

           const validUser=await User.findOne({email});

           if(!validUser)
           {
            return next(errorhandler(404,'User not found'));

           }
           const vailidPassword=  bcryptjs.compareSync(password,validUser.password);

           if(!vailidPassword)
           {
            return next(errorhandler(401,'Wrong credentials'));
           } 

     const token = jwt.sign({id:validUser._id },process.env.JWT_SECRET)
     //removing password 
     const {password:pass,...rest}=validUser._doc;
     const options={
      httpOnly:true
     };
     res.cookie('access_token',token,options)
     .status(200).json(
      rest
     );
    }
    catch(error)
    {
      next(error);
    }
  }


export const google= async (req,res,next)=>{
  try{
const user= await User.findOne({email:req.body.email});
if(user)
{

  const token = jwt.sign({id:user._id },process.env.JWT_SECRET)
  //removing password 
  const {password:pass,...rest}=user._doc;
  const options={
   httpOnly:true
  };
  res.cookie('access_token', token,options)
  .status(200).json(
   rest
  );
}
else{
       const generatePassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
       const hashedpassword = bcryptjs.hashSync(generatePassword,10);
       const newuser= new User({username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
       ,email:req.body.email,password:hashedpassword,
      avatar:req.body.photo});
      await newuser.save();


      const token = jwt.sign({id:newuser._id },process.env.JWT_SECRET)
      //removing password 
      const {password:pass,...rest}=newuser._doc;
      const options={
       httpOnly:true
      };
      res.cookie('access_token', token,options)
      .status(200).json(
       rest
      );
}
  }catch(error)
  {
    next(error);

  }
}

export const signout= async(req,res,next)=>{
  try{
     res.clearCookie('access_token');
     res.status(200).json({
      message:"User has been logged out",
     })
  }catch(error){
    next(error);
  }
}