import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userschema=new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        index:true
    },
    avatar :{
        type:String,//cloudinary url
        required:true,
    },
    coverImage :{
        type:String
    },
    watchhistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:string
    }



},{timestamps:true})

userschema.pre("save",async function(next){
    if (!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next() 
});

userschema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userschema.methods.generateAccessToken=function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRE
    }
    )

}
userschema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    }, 
    process.env.REFRESH_TOKEN_SECREAT,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRE
    }
    )
}
export const User=mongoose.model("User",userschema);