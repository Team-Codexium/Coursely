// import {v2 as cloudinary} from 'cloudinary';
// import fs from 'fs';


//   // Configuration
// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true,
// });


// const fileUpload = async (pathToFile) => {
//   try {
//     const response = await cloudinary.uploader.upload(pathToFile, {
//       resource_type: "image",
//     });
//     console.log("File uploaded successfully:", response.url);
//     return response;
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
    
//     // Clean up the temporary file on failure
//     try {
//       await fs.unlink(pathToFile);
//       console.log("Temporary file deleted after failed upload.");
//     } catch (unlinkError) {
//       console.error("Error deleting temporary file:", unlinkError);
//     }
    
//     return null;
//   }
// }

// export {fileUpload}


import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}