
import User from "../models/user.model.js"
import {errorhandler} from '../utils/error.js'
import bcryptjs from "bcryptjs"
import Listing from "../models/listing.model.js"

export const test = async(req,res)=>{
    res.json({
        message:"heloo "
    })
}


export const uploadUserInfo =async(req,res,next) =>{
 
if(req.user.id !== req.params.id) return next(errorhandler(401,"You can only update your own account!"));
try{
    if( req.body.password)
    {
        req.body.password= bcryptjs.hashSync(req.body.password,10)

    }
    
    const updateUser= await User.findByIdAndUpdate(req.params.id,{$set:{
          username:req.body.username,
          email:req.body.email,
          password:req.body.password,
          avatar:req.body.avatar,
    }} , {new:true});

      // removing password 
      // destructing password from update user 
    const {password,...rest}=updateUser._doc;
    res.status(200).json(rest);


}catch(error)
{
    next(error)

}

}

export const deleteUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorhandler(401,'You can only delete your account'));
    
    try{
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json({
        message:"user has been deleted",
      })
          

    }catch(error)
    {

        next(error);
        
    }
};

export const getUserListing =async(req,res,next) =>{
  if(req.user.id ===req.params.id)
  {
    try{
         const listings=await Listing.find({userRef:req.params.id});
         res.status(200).json(listings);
    }catch(error)
    {
      next(error);
    }
    
  }
  else{
    return next(errorhandler(401,'You can only show your listing'));
  }
 
}
export const getuser = async(req,res,next)=>{
   try {
    const user=await User.findById(req.params.id);
  if(!user )
  {
    return next(errorhandler(404,'User not found'))
  
  } 
  const {password: pass, ...rest}=user._doc;
  res.status(200).json(rest);
  

   } catch (error) {
    next(error);

   }
}