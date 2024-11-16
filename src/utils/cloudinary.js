import { v2 as cloudinary  } from "cloudinary";
import fs from "fs"


cloudinary.config({ 
    cloud_name:process.env.CLOUDNARY_CLOUD_NAME,
    api_key:process.env.CLOUDNARY_CLOUD_APIKEY,
    api_secret:process.env.CLOUDNARY_CLOUD_APISECREAT,
});

const uploadoncloudinary=async (filepath)=>{
    try {
        if (!filepath) return null
        //upload the file on cloudianry
        const response=await cloudinary.uploader.upload(filepath,{
            resource_type:"auto"
        });
        //file has been upload successfulyy
        console.log(`file has been upload on cloudinary:${response.url}`);
        return response
    } catch (error) {
        fs.unlinkSync(filepath)//remove the locally save temp file as the upload operation got failed 
        return null
    }
}

export default uploadoncloudinary