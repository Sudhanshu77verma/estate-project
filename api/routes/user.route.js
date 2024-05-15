import express from "express"
import {deleteUser, getUserListing, getuser, test} from "../controller.js/user.controller.js" 
import { uploadUserInfo } from "../controller.js/user.controller.js"; 
import { verifyToken } from "../utils/verifyUser.js";


const router=express.Router();
router.get('/test', test)


router.post('/update/:id' ,verifyToken, uploadUserInfo);
router.delete('/delete/:id' ,verifyToken, deleteUser);
router.get('/listing/:id',verifyToken,getUserListing);
router.get('/:id',verifyToken,getuser);


export default router;


