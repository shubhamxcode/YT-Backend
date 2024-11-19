import asynchandler from '../utils/asynchandler.js'
import Apierror from '../utils/Apierrors.js'
const registeruser=asynchandler(async(req,res)=>{
    //get user details from frontend 
    //validation-not empty
    //check if user already exit :username,email,
    //check for images and avtar  
    //upload them in to cloudinary,avtar
    //create user object-create entry in db  
    //remove password and refresh token field from response 
    //check for user creation
    //return response  

    const {username,fullname,password,email}=req.body
    console.log("password:",email);
    if ([username,fullname,password,email].some((field)=>field?.trim()==="")) {
        throw new Apierror(400,"all field are required ")
    } 
}) 

export default registeruser