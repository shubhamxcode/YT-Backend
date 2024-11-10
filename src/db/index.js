import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB=async()=>{
    try {
       const connectinstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MongooDB!! connected DB HOST:${ connectinstance.connection.host}`);
    } catch (error) { 
        console.log(`mongooDB connection Failed`,error);
        process.exit(1)
    }
}

export default connectDB