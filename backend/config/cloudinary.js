import {v2 as cloudinary } from "cloudinary"

const connectCloudinary=async()=>{

    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY,
    });
};

export default connectCloudinary;

///////////////

// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY,
// });

// export default cloudinary;


// import { v2 as cloudinary } from "cloudinary";

// const connectCloudinary = async () => {
//   try {
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_SECRET_KEY,
//       secure: true // ensure secure connections
//     });
//     console.log("Cloudinary connected successfully");
//   } catch (error) {
//     console.error("Cloudinary connection error:", error);
//     throw error;
//   }
// };

// export { cloudinary, connectCloudinary };