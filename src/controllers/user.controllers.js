import asynchandler from '../utils/asynchandler.js'
import Apierror from '../utils/Apierrors.js'
import {User} from '../models/user.model.js'
import uploadoncloudinary from '../utils/cloudinary.js'
import Apiresponse from '../utils/Apiresponse.js'

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
    const userexit= await User.findOne({
        $or:[{username},{email}]
    }) 
    if (userexit) {
        throw new Apierror(409,"useralready exit")
    }
    const avtarLocalPath=req.files?.avatar[0]?.path
    //const coverImageLocalpath=req.files?.coverImage[0]?.path
    let coverImageLocalpath;
    if (req.files && Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0) {
        coverImageLocalpath=req.files.coverImage[0].path
    } 
    if (!avtarLocalPath) {
        throw new Apierror(400,"Avtar file is  required")
    }
    const avatar=await uploadoncloudinary(avtarLocalPath)
    const coverImage=await uploadoncloudinary(coverImageLocalpath)
    if (!avatar) {
        throw new Apierror(400,"avatar is not uploaded on cloud")
    }
     const user=await  User.create({
        fullname,
        username:username.toLowerCase(),
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password 
    })
    const createduser=await User.findById(user._id).select("-password -refreshToken")
    console.log(createduser);

    if (!createduser) {
        throw new Apierror(500,"something went wrong while registring a user")
    }
    return res.status(201).json(
        new Apiresponse(200,createduser,"User is register succefully")
    )
}) 

export default registeruser